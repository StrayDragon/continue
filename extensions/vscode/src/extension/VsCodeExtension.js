"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VsCodeExtension = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
var core_1 = require("core/core");
var messenger_1 = require("core/protocol/messenger");
var paths_1 = require("core/util/paths");
var uuid_1 = require("uuid");
var vscode = require("vscode");
var completionProvider_1 = require("../autocomplete/completionProvider");
var statusBar_1 = require("../autocomplete/statusBar");
var commands_1 = require("../commands");
var ast_1 = require("core/autocomplete/util/ast");
var autodetect_1 = require("core/llm/autodetect");
var constants_1 = require("core/llm/constants");
var DocumentHistoryTracker_1 = require("core/nextEdit/DocumentHistoryTracker");
var NextEditProvider_1 = require("core/nextEdit/NextEditProvider");
var utils_1 = require("core/nextEdit/utils");
var pathToUri_1 = require("core/util/pathToUri");
var JumpManager_1 = require("../activation/JumpManager");
var NextEditWindowManager_1 = require("../activation/NextEditWindowManager");
var SelectionChangeManager_1 = require("../activation/SelectionChangeManager");
var GhostTextAcceptanceTracker_1 = require("../autocomplete/GhostTextAcceptanceTracker");
var lsp_1 = require("../autocomplete/lsp");
var editLoggingUtils_1 = require("../util/editLoggingUtils");
var ConfigYamlDocumentLinkProvider_1 = require("./ConfigYamlDocumentLinkProvider");
var VsCodeMessenger_1 = require("./VsCodeMessenger");
var webviewProtocol_1 = require("../webviewProtocol");
var battery_1 = require("../util/battery");
var ideUtils_1 = require("../util/ideUtils");
var VsCodeIde_1 = require("../VsCodeIde");
var VsCodeExtension = /** @class */ (function () {
    function VsCodeExtension(context) {
        var _this = this;
        this.uriHandler = new (/** @class */ (function () {
            function class_1() {
                this.event = new vscode.EventEmitter();
                this.onDidCatchExternalUri = this.event.event;
            }
            return class_1;
        }()))();
        this.ARBITRARY_TYPING_DELAY = 2000;
        this.extensionContext = context;
        this.windowId = (0, uuid_1.v4)();
        var getUsingFullFileDiff = function () { return __awaiter(_this, void 0, void 0, function () {
            var config, autocompleteModel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.configHandler.loadConfig()];
                    case 1:
                        config = (_a.sent()).config;
                        autocompleteModel = config === null || config === void 0 ? void 0 : config.selectedModelByRole.autocomplete;
                        if (!autocompleteModel) {
                            return [2 /*return*/, false];
                        }
                        if (!(0, autodetect_1.modelSupportsNextEdit)(autocompleteModel.capabilities, autocompleteModel.model, autocompleteModel.title)) {
                            return [2 /*return*/, false];
                        }
                        if (autocompleteModel.model.includes(constants_1.NEXT_EDIT_MODELS.INSTINCT)) {
                            return [2 /*return*/, false];
                        }
                        return [2 /*return*/, true];
                }
            });
        }); };
        var usingFullFileDiff = true;
        var selectionManager = SelectionChangeManager_1.SelectionChangeManager.getInstance();
        selectionManager.initialize(this.ide, usingFullFileDiff);
        selectionManager.registerListener("typing", function (e, state) { return __awaiter(_this, void 0, void 0, function () {
            var timeSinceLastDocChange;
            return __generator(this, function (_a) {
                timeSinceLastDocChange = Date.now() - state.lastDocumentChangeTime;
                if (state.isTypingSession &&
                    timeSinceLastDocChange < this.ARBITRARY_TYPING_DELAY &&
                    !NextEditWindowManager_1.NextEditWindowManager.getInstance().hasAccepted()) {
                    console.debug("VsCodeExtension: typing in progress, preserving chain");
                    return [2 /*return*/, true];
                }
                return [2 /*return*/, false];
            });
        }); }, SelectionChangeManager_1.HandlerPriority.NORMAL);
        // Create a simple webview protocol placeholder
        var resolveWebviewProtocol;
        this.webviewProtocolPromise = new Promise(function (resolve) {
            resolveWebviewProtocol = resolve;
        });
        this.ideUtils = new ideUtils_1.VsCodeIdeUtils();
        this.ide = new VsCodeIde_1.VsCodeIde(this.webviewProtocolPromise, context);
        // Simple webview protocol for autocomplete-only extension
        var simpleWebviewProtocol = new webviewProtocol_1.VsCodeWebviewProtocol();
        resolveWebviewProtocol(simpleWebviewProtocol);
        var inProcessMessenger = new messenger_1.InProcessMessenger();
        new VsCodeMessenger_1.VsCodeMessenger(inProcessMessenger, simpleWebviewProtocol, this.ide, Promise.resolve(undefined), // verticalDiffManagerPromise
        Promise.resolve(this.configHandler), // configHandlerPromise
        undefined, // workOsAuthProvider
        undefined, // editDecorationManager
        context, this);
        this.core = new core_1.Core(inProcessMessenger, this.ide);
        this.configHandler = this.core.configHandler;
        void this.configHandler.loadConfig();
        void this.configHandler.loadConfig().then(function (_a) { return __awaiter(_this, [_a], void 0, function (_b) {
            var shouldUseFullFileDiff;
            var config = _b.config;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, getUsingFullFileDiff()];
                    case 1:
                        shouldUseFullFileDiff = _c.sent();
                        this.completionProvider.updateUsingFullFileDiff(shouldUseFullFileDiff);
                        selectionManager.updateUsingFullFileDiff(shouldUseFullFileDiff);
                        return [2 /*return*/];
                }
            });
        }); });
        this.configHandler.onConfigUpdate(function (_a) { return __awaiter(_this, [_a], void 0, function (_b) {
            var shouldUseFullFileDiff;
            var newConfig = _b.config, configLoadInterrupted = _b.configLoadInterrupted;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, getUsingFullFileDiff()];
                    case 1:
                        shouldUseFullFileDiff = _c.sent();
                        this.completionProvider.updateUsingFullFileDiff(shouldUseFullFileDiff);
                        selectionManager.updateUsingFullFileDiff(shouldUseFullFileDiff);
                        return [4 /*yield*/, this.updateNextEditState(context)];
                    case 2:
                        _c.sent();
                        if (configLoadInterrupted) {
                            (0, statusBar_1.setupStatusBar)(undefined, undefined, true);
                        }
                        else if (newConfig) {
                            (0, statusBar_1.setupStatusBar)(undefined, undefined, false);
                        }
                        return [2 /*return*/];
                }
            });
        }); });
        // Tab autocomplete
        var config = vscode.workspace.getConfiguration("conti");
        var enabled = config.get("enableTabAutocomplete");
        (0, statusBar_1.setupStatusBar)(enabled ? statusBar_1.StatusBarStatus.Enabled : statusBar_1.StatusBarStatus.Disabled);
        this.completionProvider = new completionProvider_1.ContinueCompletionProvider(this.configHandler, this.ide, simpleWebviewProtocol, usingFullFileDiff);
        context.subscriptions.push(vscode.languages.registerInlineCompletionItemProvider([{ pattern: "**" }], this.completionProvider));
        // Battery
        this.battery = new battery_1.Battery();
        context.subscriptions.push(this.battery);
        context.subscriptions.push((0, statusBar_1.monitorBatteryChanges)(this.battery));
        // FileSearch - simplified for autocomplete
        this.fileSearch = new (/** @class */ (function () {
            function class_2(ide) {
                this.ide = ide;
            }
            return class_2;
        }()))(this.ide);
        // Commands
        (0, commands_1.registerAllCommands)(context, this.ide, this.configHandler, this.battery);
        // Listen for file saving
        fs_1.default.watchFile((0, paths_1.getConfigJsonPath)(), { interval: 1000 }, function (stats) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (stats.size === 0) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.configHandler.reloadConfig("Global JSON config updated - fs file watch")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        fs_1.default.watchFile((0, paths_1.getConfigYamlPath)("vscode"), { interval: 1000 }, function (stats) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (stats.size === 0) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.configHandler.reloadConfig("Global YAML config updated - fs file watch")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        fs_1.default.watchFile((0, paths_1.getConfigTsPath)(), { interval: 1000 }, function (stats) {
            if (stats.size === 0) {
                return;
            }
            void _this.configHandler.reloadConfig("config.ts updated - fs file watch");
        });
        // watch global rules directory for changes
        var globalRulesDir = path_1.default.join((0, paths_1.getContinueGlobalPath)(), "rules");
        if (fs_1.default.existsSync(globalRulesDir)) {
            fs_1.default.watch(globalRulesDir, { recursive: true }, function (eventType, filename) {
                if (filename && filename.endsWith(".md")) {
                    void _this.configHandler.reloadConfig("Global rules directory updated - fs file watch");
                }
            });
        }
        vscode.workspace.onDidChangeTextDocument(function (event) { return __awaiter(_this, void 0, void 0, function () {
            var editInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (event.contentChanges.length > 0) {
                            selectionManager.documentChanged();
                        }
                        return [4 /*yield*/, (0, editLoggingUtils_1.handleTextDocumentChange)(event, this.configHandler, this.ide, this.completionProvider, lsp_1.getDefinitionsFromLsp)];
                    case 1:
                        editInfo = _a.sent();
                        if (editInfo)
                            this.core.invoke("files/smallEdit", editInfo);
                        return [2 /*return*/];
                }
            });
        }); });
        vscode.workspace.onDidSaveTextDocument(function (event) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.core.invoke("files/changed", {
                    uris: [event.uri.toString()],
                });
                return [2 /*return*/];
            });
        }); });
        vscode.workspace.onDidDeleteFiles(function (event) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.core.invoke("files/deleted", {
                    uris: event.files.map(function (uri) { return uri.toString(); }),
                });
                return [2 /*return*/];
            });
        }); });
        vscode.workspace.onDidCloseTextDocument(function (event) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.core.invoke("files/closed", {
                    uris: [event.uri.toString()],
                });
                return [2 /*return*/];
            });
        }); });
        vscode.workspace.onDidCreateFiles(function (event) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.core.invoke("files/created", {
                    uris: event.files.map(function (uri) { return uri.toString(); }),
                });
                return [2 /*return*/];
            });
        }); });
        vscode.workspace.onDidChangeWorkspaceFolders(function (event) { return __awaiter(_this, void 0, void 0, function () {
            var dirs;
            var _a;
            return __generator(this, function (_b) {
                dirs = (_a = vscode.workspace.workspaceFolders) === null || _a === void 0 ? void 0 : _a.map(function (folder) { return folder.uri; });
                this.ideUtils.setWokspaceDirectories(dirs);
                this.core.invoke("index/forceReIndex", {
                    dirs: __spreadArray(__spreadArray([], event.added.map(function (folder) { return folder.uri.toString(); }), true), event.removed.map(function (folder) { return folder.uri.toString(); }), true),
                });
                return [2 /*return*/];
            });
        }); });
        vscode.workspace.onDidOpenTextDocument(function (event) { return __awaiter(_this, void 0, void 0, function () {
            var ast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, ast_1.getAst)(event.fileName, event.getText())];
                    case 1:
                        ast = _a.sent();
                        if (ast) {
                            DocumentHistoryTracker_1.DocumentHistoryTracker.getInstance().addDocument((0, pathToUri_1.localPathOrUriToPath)(event.fileName), event.getText(), ast);
                        }
                        return [2 /*return*/];
                }
            });
        }); });
        // Listen for editor changes to clean up decorations when editor closes.
        vscode.window.onDidChangeVisibleTextEditors(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("deleteChain called from onDidChangeVisibleTextEditors");
                        return [4 /*yield*/, NextEditProvider_1.NextEditProvider.getInstance().deleteChain()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        // Listen for selection changes to hide tooltip when cursor moves.
        vscode.window.onDidChangeTextEditorSelection(function (e) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, selectionManager.handleSelectionChange(e)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        // Register a content provider for the readonly virtual documents
        var documentContentProvider = new (/** @class */ (function () {
            function class_3() {
                this.onDidChangeEmitter = new vscode.EventEmitter();
                this.onDidChange = this.onDidChangeEmitter.event;
            }
            class_3.prototype.provideTextDocumentContent = function (uri) {
                return uri.query;
            };
            return class_3;
        }()))();
        context.subscriptions.push(vscode.workspace.registerTextDocumentContentProvider("conti", documentContentProvider));
        var linkProvider = vscode.languages.registerDocumentLinkProvider({ language: "yaml" }, new ConfigYamlDocumentLinkProvider_1.ConfigYamlDocumentLinkProvider());
        context.subscriptions.push(linkProvider);
        this.ide.onDidChangeActiveTextEditor(function (filepath) {
            void _this.core.invoke("files/opened", { uris: [filepath] });
        });
        // initializes openedFileLruCache with files that are already open when the extension is activated
        var initialOpenedFilePaths = this.ideUtils
            .getOpenFiles()
            .map(function (uri) { return uri.toString(); });
        this.core.invoke("files/opened", { uris: initialOpenedFilePaths });
        vscode.workspace.onDidChangeConfiguration(function (event) { return __awaiter(_this, void 0, void 0, function () {
            var settings;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!event.affectsConfiguration("conti")) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.ide.getIdeSettings()];
                    case 1:
                        settings = _a.sent();
                        void this.core.invoke("config/ideSettingsUpdate", settings);
                        if (!event.affectsConfiguration("conti.enableNextEdit")) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.updateNextEditState(context)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    }
    /**
     * This is how you turn next edit on or off at the extension level.
     */
    VsCodeExtension.prototype.updateNextEditState = function (context) {
        return __awaiter(this, void 0, void 0, function () {
            var continueConfig, autocompleteModel, vscodeConfig, modelSupportsNext, nextEditEnabled, shouldEnableNextEdit, jumpManager, ghostTextAcceptanceTracker, nextEditWindowManager;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.configHandler.loadConfig()];
                    case 1:
                        continueConfig = (_a.sent()).config;
                        autocompleteModel = continueConfig === null || continueConfig === void 0 ? void 0 : continueConfig.selectedModelByRole.autocomplete;
                        vscodeConfig = vscode.workspace.getConfiguration("conti");
                        modelSupportsNext = autocompleteModel &&
                            (0, autodetect_1.modelSupportsNextEdit)(autocompleteModel.capabilities, autocompleteModel.model, autocompleteModel.title);
                        nextEditEnabled = vscodeConfig.get("enableNextEdit");
                        if (!(nextEditEnabled === undefined)) return [3 /*break*/, 3];
                        nextEditEnabled = modelSupportsNext !== null && modelSupportsNext !== void 0 ? modelSupportsNext : false;
                        return [4 /*yield*/, vscodeConfig.update("enableNextEdit", nextEditEnabled, vscode.ConfigurationTarget.Global)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        if (nextEditEnabled &&
                            !modelSupportsNext &&
                            !(0, utils_1.isNextEditTest)() &&
                            process.env.CONTINUE_E2E_NON_NEXT_EDIT_TEST === "true") {
                            vscode.window
                                .showWarningMessage("The current autocomplete model (".concat((autocompleteModel === null || autocompleteModel === void 0 ? void 0 : autocompleteModel.title) || "unknown", ") does not support Next Edit."), "Disable Next Edit", "Select different model")
                                .then(function (selection) {
                                if (selection === "Disable Next Edit") {
                                    vscodeConfig.update("enableNextEdit", false, vscode.ConfigurationTarget.Global);
                                }
                            });
                        }
                        shouldEnableNextEdit = (modelSupportsNext && nextEditEnabled) || (0, utils_1.isNextEditTest)();
                        if (!shouldEnableNextEdit) return [3 /*break*/, 6];
                        return [4 /*yield*/, (0, NextEditWindowManager_1.default)(context)];
                    case 4:
                        _a.sent();
                        this.activateNextEdit();
                        return [4 /*yield*/, NextEditWindowManager_1.NextEditWindowManager.freeTabAndEsc()];
                    case 5:
                        _a.sent();
                        jumpManager = JumpManager_1.JumpManager.getInstance();
                        jumpManager.registerSelectionChangeHandler();
                        ghostTextAcceptanceTracker = GhostTextAcceptanceTracker_1.GhostTextAcceptanceTracker.getInstance();
                        ghostTextAcceptanceTracker.registerSelectionChangeHandler();
                        nextEditWindowManager = NextEditWindowManager_1.NextEditWindowManager.getInstance();
                        nextEditWindowManager.registerSelectionChangeHandler();
                        return [3 /*break*/, 8];
                    case 6:
                        NextEditWindowManager_1.NextEditWindowManager.clearInstance();
                        this.deactivateNextEdit();
                        return [4 /*yield*/, NextEditWindowManager_1.NextEditWindowManager.freeTabAndEsc()];
                    case 7:
                        _a.sent();
                        JumpManager_1.JumpManager.clearInstance();
                        GhostTextAcceptanceTracker_1.GhostTextAcceptanceTracker.clearInstance();
                        _a.label = 8;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    VsCodeExtension.prototype.registerCustomContextProvider = function (contextProvider) {
        this.configHandler.registerCustomContextProvider(contextProvider);
    };
    VsCodeExtension.prototype.activateNextEdit = function () {
        this.completionProvider.activateNextEdit();
    };
    VsCodeExtension.prototype.deactivateNextEdit = function () {
        this.completionProvider.deactivateNextEdit();
    };
    VsCodeExtension.continueVirtualDocumentScheme = "conti";
    return VsCodeExtension;
}());
exports.VsCodeExtension = VsCodeExtension;
