import { v4 as uuidv4 } from "uuid";

import { CompletionProvider } from "./autocomplete/CompletionProvider";
import {
  openedFilesLruCache,
  prevFilepaths,
} from "./autocomplete/util/openedFilesLruCache";
import { ConfigHandler } from "./config/ConfigHandler";
import { countTokens } from "./llm/countTokens";

import {
  ModelDescription,
  Position,
  RangeInFile,
  type IDE,
} from ".";

import type { FromCoreProtocol, ToCoreProtocol } from "./protocol";
import type { IMessenger, Message } from "./protocol/messenger";
import { ContinueError, ContinueErrorReason } from "./util/errors";
import { Logger } from "./util/Logger.js";

export class Core {
  configHandler: ConfigHandler;
  completionProvider: CompletionProvider;

  private messageAbortControllers = new Map<string, AbortController>();
  private addMessageAbortController(id: string): AbortController {
    const controller = new AbortController();
    this.messageAbortControllers.set(id, controller);
    return controller;
  }

  constructor(private readonly ide: IDE, private readonly messenger: IMessenger<ToCoreProtocol, FromCoreProtocol>) {
    this.configHandler = new ConfigHandler(ide);

    // Initialize completion provider
    this.completionProvider = new CompletionProvider(
      this.configHandler,
      this.ide,
      async () => {
        const { config } = await this.configHandler.loadConfig();
        if (!config) {
          return undefined;
        }
        return config.selectedModelByRole.autocomplete ?? undefined;
      },
      this.onError.bind(this),
      async (filepath: string, position: Position) => {
        return await this.ide.getDefinitions(filepath, position);
      },
    );

    // Setup message handlers
    this.setupMessengerHandlers();
  }

  private onError(e: any) {
    if (e instanceof ContinueError) {
      this.messenger.sendError(e.message, e.reason);
    } else {
      const errorMessage = e?.message || e?.toString() || "Unknown error";
      this.messenger.sendError(errorMessage, ContinueErrorReason.UNKNOWN);
    }
    console.error("Core Error:", e);
  }

  private setupMessengerHandlers() {
    this.messenger.onRequest("config/getConfig", async () => {
      return await this.configHandler.loadConfig();
    });

    this.messenger.onRequest("config/setConfig", async (request) => {
      await this.configHandler.updateConfig(request.config);
    });

    this.messenger.onRequest("autocomplete/getCompletion", async (request) => {
      const completionId = uuidv4();
      const input = {
        completionId,
        pos: request.position,
        filepath: request.filepath,
        document: request.document,
        manuallyPassFileContents: request.manuallyPassFileContents,
        manuallyPassPrefix: request.manuallyPassPrefix,
        selectedCompletionInfo: request.selectedCompletionInfo,
        isUntitledFile: request.isUntitledFile,
        recentlyVisitedRanges: request.recentlyVisitedRanges || [],
        recentlyEditedRanges: request.recentlyEditedRanges || [],
      };

      const controller = this.addMessageAbortController(completionId);

      try {
        const result = await this.completionProvider.provideInlineCompletionItems(
          input,
          controller.signal,
          request.force
        );

        if (result && !controller.signal.aborted) {
          return {
            completionId,
            completion: result.completion,
            range: result.range,
          };
        }
      } catch (error) {
        this.onError(error);
      } finally {
        this.messageAbortControllers.delete(completionId);
      }

      return null;
    });

    this.messenger.onRequest("autocomplete/acceptCompletion", async (request) => {
      this.completionProvider.accept(request.completionId);
    });

    this.messenger.onRequest("autocomplete/cancelCompletion", async (request) => {
      if (request.completionId) {
        const controller = this.messageAbortControllers.get(request.completionId);
        if (controller) {
          controller.abort();
          this.messageAbortControllers.delete(request.completionId);
        }
      }
      this.completionProvider.cancel();
    });

    this.messenger.onRequest("healthCheck", async () => {
      return { status: "ok" };
    });
  }

  // Public methods
  async reloadConfig() {
    await this.configHandler.loadConfig();
  }

  getIDEInfo() {
    return this.ide.getIdeInfo();
  }

  dispose() {
    // Abort all ongoing requests
    for (const controller of this.messageAbortControllers.values()) {
      controller.abort();
    }
    this.messageAbortControllers.clear();
  }
}