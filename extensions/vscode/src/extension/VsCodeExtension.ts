import fs from "fs";
import path from "path";

import { ConfigHandler } from "core/config/ConfigHandler";
import { Core } from "core/core";
import { FromCoreProtocol, ToCoreProtocol } from "core/protocol";
import { InProcessMessenger } from "core/protocol/messenger";
import {
  getConfigJsonPath,
  getConfigTsPath,
  getConfigYamlPath,
  getContinueGlobalPath,
} from "core/util/paths";
import { v4 as uuidv4 } from "uuid";
import * as vscode from "vscode";

import { ContinueCompletionProvider } from "../autocomplete/completionProvider";
import {
  monitorBatteryChanges,
  setupStatusBar,
  StatusBarStatus,
} from "../autocomplete/statusBar";
import { registerAllCommands } from "../commands";
import { getAst } from "core/autocomplete/util/ast";
import { modelSupportsNextEdit } from "core/llm/autodetect";
import { NEXT_EDIT_MODELS } from "core/llm/constants";
import { DocumentHistoryTracker } from "core/nextEdit/DocumentHistoryTracker";
import { NextEditProvider } from "core/nextEdit/NextEditProvider";
import { isNextEditTest } from "core/nextEdit/utils";
import { localPathOrUriToPath } from "core/util/pathToUri";
import { JumpManager } from "../activation/JumpManager";
import setupNextEditWindowManager, {
  NextEditWindowManager,
} from "../activation/NextEditWindowManager";
import {
  HandlerPriority,
  SelectionChangeManager,
} from "../activation/SelectionChangeManager";
import { GhostTextAcceptanceTracker } from "../autocomplete/GhostTextAcceptanceTracker";
import { getDefinitionsFromLsp } from "../autocomplete/lsp";
import { handleTextDocumentChange } from "../util/editLoggingUtils";

import { ConfigYamlDocumentLinkProvider } from "./ConfigYamlDocumentLinkProvider";
import { VsCodeMessenger } from "./VsCodeMessenger";
import { VsCodeWebviewProtocol } from "../webviewProtocol";
import { Battery } from "../util/battery";
import { VsCodeIdeUtils } from "../util/ideUtils";
import { VsCodeIde } from "../VsCodeIde";
import { ContiConfigManager } from "../config/ContiConfigManager";
import { MemoryOptimizer } from "../optimization/MemoryOptimizer";

export class VsCodeExtension {
  private configHandler: ConfigHandler;
  private contiConfigManager: ContiConfigManager;
  private memoryOptimizer: MemoryOptimizer;
  private extensionContext: vscode.ExtensionContext;
  private ide: VsCodeIde;
  private ideUtils: VsCodeIdeUtils;
  private windowId: string;
  private webviewProtocolPromise: Promise<VsCodeWebviewProtocol>;
  private core: Core;
  private battery: Battery;
  private fileSearch: any;
  private uriHandler = new (class {
    event = new vscode.EventEmitter<vscode.Uri>();
    onDidCatchExternalUri = this.event.event;
  })();
  private completionProvider: ContinueCompletionProvider;

  private ARBITRARY_TYPING_DELAY = 2000;

  /**
   * This is how you turn next edit on or off at the extension level.
   */
  private async updateNextEditState(
    context: vscode.ExtensionContext,
  ): Promise<void> {
    const { config: continueConfig } = await this.configHandler.loadConfig();
    const autocompleteModel = continueConfig?.selectedModelByRole.autocomplete;
    const vscodeConfig = vscode.workspace.getConfiguration("conti");

    const modelSupportsNext =
      autocompleteModel &&
      modelSupportsNextEdit(
        autocompleteModel.capabilities,
        autocompleteModel.model,
        autocompleteModel.title,
      );

    let nextEditEnabled = vscodeConfig.get<boolean>("enableNextEdit");
    if (nextEditEnabled === undefined) {
      nextEditEnabled = modelSupportsNext ?? false;
      await vscodeConfig.update(
        "enableNextEdit",
        nextEditEnabled,
        vscode.ConfigurationTarget.Global,
      );
    }

    if (
      nextEditEnabled &&
      !modelSupportsNext &&
      !isNextEditTest() &&
      process.env.CONTINUE_E2E_NON_NEXT_EDIT_TEST === "true"
    ) {
      vscode.window
        .showWarningMessage(
          `The current autocomplete model (${autocompleteModel?.title || "unknown"}) does not support Next Edit.`,
          "Disable Next Edit",
          "Select different model",
        )
        .then((selection) => {
          if (selection === "Disable Next Edit") {
            vscodeConfig.update(
              "enableNextEdit",
              false,
              vscode.ConfigurationTarget.Global,
            );
          }
        });
    }

    const shouldEnableNextEdit =
      (modelSupportsNext && nextEditEnabled) || isNextEditTest();

    if (shouldEnableNextEdit) {
      await setupNextEditWindowManager(context);
      this.activateNextEdit();
      await NextEditWindowManager.freeTabAndEsc();

      const jumpManager = JumpManager.getInstance();
      jumpManager.registerSelectionChangeHandler();

      const ghostTextAcceptanceTracker =
        GhostTextAcceptanceTracker.getInstance();
      ghostTextAcceptanceTracker.registerSelectionChangeHandler();

      const nextEditWindowManager = NextEditWindowManager.getInstance();
      nextEditWindowManager.registerSelectionChangeHandler();
    } else {
      NextEditWindowManager.clearInstance();
      this.deactivateNextEdit();
      await NextEditWindowManager.freeTabAndEsc();

      JumpManager.clearInstance();
      GhostTextAcceptanceTracker.clearInstance();
    }
  }

  constructor(context: vscode.ExtensionContext) {
    this.extensionContext = context;
    this.windowId = uuidv4();

    // Initialize simplified configuration manager
    this.contiConfigManager = ContiConfigManager.getInstance(this.configHandler);

    // Initialize memory optimizer
    this.memoryOptimizer = MemoryOptimizer.getInstance();

    const getUsingFullFileDiff = async () => {
      const { config } = await this.configHandler.loadConfig();
      const autocompleteModel = config?.selectedModelByRole.autocomplete;

      if (!autocompleteModel) {
        return false;
      }

      if (
        !modelSupportsNextEdit(
          autocompleteModel.capabilities,
          autocompleteModel.model,
          autocompleteModel.title,
        )
      ) {
        return false;
      }

      if (autocompleteModel.model.includes(NEXT_EDIT_MODELS.INSTINCT)) {
        return false;
      }

      return true;
    };

    const usingFullFileDiff = true;
    const selectionManager = SelectionChangeManager.getInstance();
    selectionManager.initialize(this.ide, usingFullFileDiff);

    selectionManager.registerListener(
      "typing",
      async (e, state) => {
        const timeSinceLastDocChange =
          Date.now() - state.lastDocumentChangeTime;
        if (
          state.isTypingSession &&
          timeSinceLastDocChange < this.ARBITRARY_TYPING_DELAY &&
          !NextEditWindowManager.getInstance().hasAccepted()
        ) {
          console.debug(
            "VsCodeExtension: typing in progress, preserving chain",
          );
          return true;
        }

        return false;
      },
      HandlerPriority.NORMAL,
    );

    // Create a simple webview protocol placeholder
    let resolveWebviewProtocol: (protocol: VsCodeWebviewProtocol) => void;
    this.webviewProtocolPromise = new Promise<VsCodeWebviewProtocol>((resolve) => {
      resolveWebviewProtocol = resolve;
    });

    this.ideUtils = new VsCodeIdeUtils();
    this.ide = new VsCodeIde(this.webviewProtocolPromise, context);

    // Simple webview protocol for autocomplete-only extension
    const simpleWebviewProtocol = new VsCodeWebviewProtocol();
    resolveWebviewProtocol(simpleWebviewProtocol);

    const inProcessMessenger = new InProcessMessenger<
      ToCoreProtocol,
      FromCoreProtocol
    >();

    new VsCodeMessenger(
      inProcessMessenger,
      simpleWebviewProtocol,
      this.ide,
      Promise.resolve(undefined), // verticalDiffManagerPromise
      Promise.resolve(this.configHandler), // configHandlerPromise
      undefined, // workOsAuthProvider
      undefined, // editDecorationManager
      context,
      this,
    );

    this.core = new Core(inProcessMessenger, this.ide);
    this.configHandler = this.core.configHandler;

    void this.configHandler.loadConfig();

    void this.configHandler.loadConfig().then(async ({ config }) => {
      const shouldUseFullFileDiff = await getUsingFullFileDiff();
      this.completionProvider.updateUsingFullFileDiff(shouldUseFullFileDiff);
      selectionManager.updateUsingFullFileDiff(shouldUseFullFileDiff);
    });

    this.configHandler.onConfigUpdate(
      async ({ config: newConfig, configLoadInterrupted }) => {
        const shouldUseFullFileDiff = await getUsingFullFileDiff();
        this.completionProvider.updateUsingFullFileDiff(shouldUseFullFileDiff);
        selectionManager.updateUsingFullFileDiff(shouldUseFullFileDiff);

        await this.updateNextEditState(context);

        if (configLoadInterrupted) {
          setupStatusBar(undefined, undefined, true);
        } else if (newConfig) {
          setupStatusBar(undefined, undefined, false);
        }
      },
    );

    // Tab autocomplete
    const config = vscode.workspace.getConfiguration("conti");
    const enabled = config.get<boolean>("enableTabAutocomplete");

    setupStatusBar(
      enabled ? StatusBarStatus.Enabled : StatusBarStatus.Disabled,
    );
    this.completionProvider = new ContinueCompletionProvider(
      this.configHandler,
      this.ide,
      simpleWebviewProtocol,
      usingFullFileDiff,
    );
    context.subscriptions.push(
      vscode.languages.registerInlineCompletionItemProvider(
        [{ pattern: "**" }],
        this.completionProvider,
      ),
    );

    // Battery
    this.battery = new Battery();
    context.subscriptions.push(this.battery);
    context.subscriptions.push(monitorBatteryChanges(this.battery));

    // FileSearch - simplified for autocomplete
    this.fileSearch = new (class {
      constructor(private ide: VsCodeIde) {}
    })(this.ide);

    // Commands
    registerAllCommands(
      context,
      this.ide,
      this.configHandler,
      this.battery,
    );

    // Listen for file saving
    fs.watchFile(getConfigJsonPath(), { interval: 1000 }, async (stats) => {
      if (stats.size === 0) {
        return;
      }
      await this.configHandler.reloadConfig(
        "Global JSON config updated - fs file watch",
      );
    });

    fs.watchFile(
      getConfigYamlPath("vscode"),
      { interval: 1000 },
      async (stats) => {
        if (stats.size === 0) {
          return;
        }
        await this.configHandler.reloadConfig(
          "Global YAML config updated - fs file watch",
        );
      },
    );

    fs.watchFile(getConfigTsPath(), { interval: 1000 }, (stats) => {
      if (stats.size === 0) {
        return;
      }
      void this.configHandler.reloadConfig("config.ts updated - fs file watch");
    });

    // watch global rules directory for changes
    const globalRulesDir = path.join(getContinueGlobalPath(), "rules");
    if (fs.existsSync(globalRulesDir)) {
      fs.watch(globalRulesDir, { recursive: true }, (eventType, filename) => {
        if (filename && filename.endsWith(".md")) {
          void this.configHandler.reloadConfig(
            "Global rules directory updated - fs file watch",
          );
        }
      });
    }

    vscode.workspace.onDidChangeTextDocument(async (event) => {
      if (event.contentChanges.length > 0) {
        selectionManager.documentChanged();
      }

      const editInfo = await handleTextDocumentChange(
        event,
        this.configHandler,
        this.ide,
        this.completionProvider,
        getDefinitionsFromLsp,
      );

      if (editInfo) this.core.invoke("files/smallEdit", editInfo);
    });

    vscode.workspace.onDidSaveTextDocument(async (event) => {
      this.core.invoke("files/changed", {
        uris: [event.uri.toString()],
      });
    });

    vscode.workspace.onDidDeleteFiles(async (event) => {
      this.core.invoke("files/deleted", {
        uris: event.files.map((uri) => uri.toString()),
      });
    });

    vscode.workspace.onDidCloseTextDocument(async (event) => {
      this.core.invoke("files/closed", {
        uris: [event.uri.toString()],
      });
    });

    vscode.workspace.onDidCreateFiles(async (event) => {
      this.core.invoke("files/created", {
        uris: event.files.map((uri) => uri.toString()),
      });
    });

    vscode.workspace.onDidChangeWorkspaceFolders(async (event) => {
      const dirs = vscode.workspace.workspaceFolders?.map(
        (folder) => folder.uri,
      );

      this.ideUtils.setWokspaceDirectories(dirs);

      this.core.invoke("index/forceReIndex", {
        dirs: [
          ...event.added.map((folder) => folder.uri.toString()),
          ...event.removed.map((folder) => folder.uri.toString()),
        ],
      });
    });

    vscode.workspace.onDidOpenTextDocument(async (event) => {
      const ast = await getAst(event.fileName, event.getText());
      if (ast) {
        DocumentHistoryTracker.getInstance().addDocument(
          localPathOrUriToPath(event.fileName),
          event.getText(),
          ast,
        );
      }
    });

    // Listen for editor changes to clean up decorations when editor closes.
    vscode.window.onDidChangeVisibleTextEditors(async () => {
      console.log("deleteChain called from onDidChangeVisibleTextEditors");
      await NextEditProvider.getInstance().deleteChain();
    });

    // Listen for selection changes to hide tooltip when cursor moves.
    vscode.window.onDidChangeTextEditorSelection(async (e) => {
      await selectionManager.handleSelectionChange(e);
    });

    // Register a content provider for the readonly virtual documents
    const documentContentProvider = new (class
      implements vscode.TextDocumentContentProvider
    {
      onDidChangeEmitter = new vscode.EventEmitter<vscode.Uri>();
      onDidChange = this.onDidChangeEmitter.event;

      provideTextDocumentContent(uri: vscode.Uri): string {
        return uri.query;
      }
    })();
    context.subscriptions.push(
      vscode.workspace.registerTextDocumentContentProvider(
        "conti",
        documentContentProvider,
      ),
    );

    const linkProvider = vscode.languages.registerDocumentLinkProvider(
      { language: "yaml" },
      new ConfigYamlDocumentLinkProvider(),
    );
    context.subscriptions.push(linkProvider);

    this.ide.onDidChangeActiveTextEditor((filepath) => {
      void this.core.invoke("files/opened", { uris: [filepath] });
    });

    // initializes openedFileLruCache with files that are already open when the extension is activated
    let initialOpenedFilePaths = this.ideUtils
      .getOpenFiles()
      .map((uri) => uri.toString());
    this.core.invoke("files/opened", { uris: initialOpenedFilePaths });

    vscode.workspace.onDidChangeConfiguration(async (event) => {
      if (event.affectsConfiguration("conti")) {
        const settings = await this.ide.getIdeSettings();
        void this.core.invoke("config/ideSettingsUpdate", settings);

        if (event.affectsConfiguration("conti.enableNextEdit")) {
          await this.updateNextEditState(context);
        }
      }
    });
  }

  static continueVirtualDocumentScheme = "conti";

  registerCustomContextProvider(contextProvider: any) {
    this.configHandler.registerCustomContextProvider(contextProvider);
  }

  public activateNextEdit() {
    this.completionProvider.activateNextEdit();
  }

  public deactivateNextEdit() {
    this.completionProvider.deactivateNextEdit();
  }
}