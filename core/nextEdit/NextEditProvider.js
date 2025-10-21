"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NextEditProvider = void 0;
var uuid_1 = require("uuid");
var OpenAI_js_1 = require("../llm/llms/OpenAI.js");
var parameters_js_1 = require("../util/parameters.js");
var ContextRetrievalService_js_1 = require("../autocomplete/context/ContextRetrievalService.js");
var BracketMatchingService_js_1 = require("../autocomplete/filtering/BracketMatchingService.js");
var CompletionStreamer_js_1 = require("../autocomplete/generation/CompletionStreamer.js");
var index_js_1 = require("../autocomplete/postprocessing/index.js");
var index_js_2 = require("../autocomplete/prefiltering/index.js");
var index_js_3 = require("../autocomplete/snippets/index.js");
var ast_js_1 = require("../autocomplete/util/ast.js");
var AutocompleteDebouncer_js_1 = require("../autocomplete/util/AutocompleteDebouncer.js");
var AutocompleteLruCache_js_1 = require("../autocomplete/util/AutocompleteLruCache.js");
var HelperVars_js_1 = require("../autocomplete/util/HelperVars.js");
var ignore_js_1 = require("../indexing/ignore.js");
var autodetect_js_1 = require("../llm/autodetect.js");
var pathToUri_js_1 = require("../util/pathToUri.js");
var diffFormatting_js_1 = require("./context/diffFormatting.js");
var DocumentHistoryTracker_js_1 = require("./DocumentHistoryTracker.js");
var NextEditLoggingService_js_1 = require("./NextEditLoggingService.js");
var NextEditPrefetchQueue_js_1 = require("./NextEditPrefetchQueue.js");
var NextEditProviderFactory_js_1 = require("./NextEditProviderFactory.js");
var autocompleteCache = AutocompleteLruCache_js_1.default.get();
// Errors that can be expected on occasion even during normal functioning should not be shown.
// Not worth disrupting the user to tell them that a single autocomplete request didn't go through
var ERRORS_TO_IGNORE = [
    // From Ollama
    "unexpected server status",
    "operation was aborted",
];
/**
 * This is the next edit analogue to autocomplete's CompletionProvider.
 * You will see a lot of similar if not identical methods to CompletionProvider methods.
 * All logic used to live inside this class, but that became untenable quickly.
 * I moved a lot of the model-specific logic (prompt building, pre/post processing, etc.) to the BaseNextEditProvider and the children inheriting from it.
 * Keeping this class around might be a good idea because it handles lots of delicate logic such as abort signals, chains, logging, etc.
 * There being a singleton also gives a lot of guarantees about the state of the next edit state machine.
 */
var NextEditProvider = /** @class */ (function () {
    function NextEditProvider(configHandler, ide, _injectedGetLlm, _onError, getDefinitionsFromLsp, endpointType) {
        this.configHandler = configHandler;
        this.ide = ide;
        this._injectedGetLlm = _injectedGetLlm;
        this._onError = _onError;
        this.getDefinitionsFromLsp = getDefinitionsFromLsp;
        this.autocompleteCache = AutocompleteLruCache_js_1.default.get();
        this.errorsShown = new Set();
        this.bracketMatchingService = new BracketMatchingService_js_1.BracketMatchingService();
        this.debouncer = new AutocompleteDebouncer_js_1.AutocompleteDebouncer();
        this.diffContext = [];
        this.autocompleteContext = "";
        this.promptMetadata = null;
        this.currentEditChainId = null;
        this.previousRequest = null;
        this.previousCompletions = [];
        // Model-specific provider instance.
        this.modelProvider = null;
        this.completionStreamer = new CompletionStreamer_js_1.CompletionStreamer(this.onError.bind(this));
        this.contextRetrievalService = new ContextRetrievalService_js_1.ContextRetrievalService(this.ide);
        this.endpointType = endpointType;
        this.loggingService = NextEditLoggingService_js_1.NextEditLoggingService.getInstance();
    }
    NextEditProvider.initialize = function (configHandler, ide, injectedGetLlm, onError, getDefinitionsFromLsp, endpointType) {
        if (!NextEditProvider.instance) {
            NextEditProvider.instance = new NextEditProvider(configHandler, ide, injectedGetLlm, onError, getDefinitionsFromLsp, endpointType);
        }
        return NextEditProvider.instance;
    };
    NextEditProvider.getInstance = function () {
        if (!NextEditProvider.instance) {
            throw new Error("NextEditProvider has not been initialized. Call initialize() first.");
        }
        return NextEditProvider.instance;
    };
    NextEditProvider.prototype.addDiffToContext = function (diff) {
        this.diffContext.push(diff);
        if (this.diffContext.length > 5) {
            this.diffContext.shift();
        }
    };
    NextEditProvider.prototype.addAutocompleteContext = function (ctx) {
        this.autocompleteContext = ctx;
    };
    NextEditProvider.prototype._prepareLlm = function () {
        return __awaiter(this, void 0, void 0, function () {
            var llm;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this._injectedGetLlm()];
                    case 1:
                        llm = _b.sent();
                        if (!llm) {
                            return [2 /*return*/, undefined];
                        }
                        // Temporary fix for JetBrains autocomplete bug as described in https://github.com/continuedev/continue/pull/3022
                        if (llm.model === undefined && ((_a = llm.completionOptions) === null || _a === void 0 ? void 0 : _a.model) !== undefined) {
                            llm.model = llm.completionOptions.model;
                        }
                        // Ignore empty API keys for Mistral since we currently write
                        // a template provider without one during onboarding
                        if (llm.providerName === "mistral" && llm.apiKey === "") {
                            return [2 /*return*/, undefined];
                        }
                        // Set temperature (but don't override)
                        if (llm.completionOptions.temperature === undefined) {
                            llm.completionOptions.temperature = 0.01;
                        }
                        if (llm instanceof OpenAI_js_1.default) {
                            llm.useLegacyCompletionsEndpoint = true;
                        }
                        // TODO: Resolve import error with TRIAL_FIM_MODEL
                        // else if (
                        //   llm.providerName === "free-trial" &&
                        //   llm.model !== TRIAL_FIM_MODEL
                        // ) {
                        //   llm.model = TRIAL_FIM_MODEL;
                        // }
                        return [2 /*return*/, llm];
                }
            });
        });
    };
    NextEditProvider.prototype.onError = function (e) {
        if (ERRORS_TO_IGNORE.some(function (err) { var _a; return typeof e === "string" ? e.includes(err) : (_a = e === null || e === void 0 ? void 0 : e.message) === null || _a === void 0 ? void 0 : _a.includes(err); })) {
            return;
        }
        console.warn("Error generating autocompletion: ", e);
        if (!this.errorsShown.has(e.message)) {
            this.errorsShown.add(e.message);
            this._onError(e);
        }
    };
    NextEditProvider.prototype.cancel = function () {
        this.loggingService.cancel();
    };
    NextEditProvider.prototype.accept = function (completionId) {
        var outcome = this.loggingService.accept(completionId);
        if (!outcome) {
            return;
        }
    };
    NextEditProvider.prototype.reject = function (completionId) {
        var outcome = this.loggingService.reject(completionId);
        if (!outcome) {
            return;
        }
    };
    NextEditProvider.prototype.markDisplayed = function (completionId, outcome) {
        this.loggingService.markDisplayed(completionId, outcome);
    };
    NextEditProvider.prototype._getAutocompleteOptions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var config, options;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.configHandler.loadConfig()];
                    case 1:
                        config = (_a.sent()).config;
                        options = __assign(__assign({}, parameters_js_1.DEFAULT_AUTOCOMPLETE_OPTS), config === null || config === void 0 ? void 0 : config.tabAutocompleteOptions);
                        return [2 /*return*/, options];
                }
            });
        });
    };
    NextEditProvider.prototype.chainExists = function () {
        return this.currentEditChainId !== null;
    };
    NextEditProvider.prototype.getChainLength = function () {
        return this.previousCompletions.length;
    };
    NextEditProvider.prototype.getPreviousCompletion = function () {
        return this.previousCompletions[0];
    };
    NextEditProvider.prototype.deleteChain = function () {
        return __awaiter(this, void 0, void 0, function () {
            var fileContent, ast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        NextEditPrefetchQueue_js_1.PrefetchQueue.getInstance().abort();
                        this.currentEditChainId = null;
                        this.previousCompletions = [];
                        if (!this.previousRequest) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.ide.readFile(this.previousRequest.filepath)];
                    case 1:
                        fileContent = (_a.sent()).toString();
                        return [4 /*yield*/, (0, ast_js_1.getAst)(this.previousRequest.filepath, fileContent)];
                    case 2:
                        ast = _a.sent();
                        if (ast) {
                            DocumentHistoryTracker_js_1.DocumentHistoryTracker.getInstance().push((0, pathToUri_js_1.localPathOrUriToPath)(this.previousRequest.filepath), fileContent, ast);
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    NextEditProvider.prototype.startChain = function (id) {
        this.currentEditChainId = id !== null && id !== void 0 ? id : (0, uuid_1.v4)();
    };
    NextEditProvider.prototype.getChain = function () {
        return this.previousCompletions;
    };
    NextEditProvider.prototype.isStartOfChain = function () {
        return this.previousCompletions.length === 1;
    };
    /**
     * This is the main entry point to this class.
     */
    NextEditProvider.prototype.provideInlineCompletionItems = function (input, token, opts) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, abortToken, startTime, helper, _b, editableRegionStartLine, editableRegionEndLine, prompts, e_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if ((0, ignore_js_1.isSecurityConcern)(input.filepath)) {
                            return [2 /*return*/, undefined];
                        }
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 5, 6, 7]);
                        this.previousRequest = input;
                        return [4 /*yield*/, this._initializeCompletionRequest(input, token)];
                    case 2:
                        _a = _c.sent(), abortToken = _a.token, startTime = _a.startTime, helper = _a.helper;
                        if (!helper)
                            return [2 /*return*/, undefined];
                        // Create model-specific provider based on the model name.
                        this.modelProvider = NextEditProviderFactory_js_1.NextEditProviderFactory.createProvider(helper.modelName);
                        return [4 /*yield*/, this._generatePrompts(helper, opts)];
                    case 3:
                        _b = _c.sent(), editableRegionStartLine = _b.editableRegionStartLine, editableRegionEndLine = _b.editableRegionEndLine, prompts = _b.prompts;
                        return [4 /*yield*/, this._handleCompletion(helper, prompts, abortToken, startTime, editableRegionStartLine, editableRegionEndLine, opts)];
                    case 4: return [2 /*return*/, _c.sent()];
                    case 5:
                        e_1 = _c.sent();
                        this.onError(e_1);
                        return [3 /*break*/, 7];
                    case 6:
                        this.loggingService.deleteAbortController(input.completionId);
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    NextEditProvider.prototype._initializeCompletionRequest = function (input, token) {
        return __awaiter(this, void 0, void 0, function () {
            var controller, startTime, options, llm, helper;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        // Create abort signal if not given
                        if (!token) {
                            controller = this.loggingService.createAbortController(input.completionId);
                            token = controller.signal;
                        }
                        else {
                            // Token was provided externally, just track the completion.
                            this.loggingService.trackPendingCompletion(input.completionId);
                        }
                        startTime = Date.now();
                        return [4 /*yield*/, this._getAutocompleteOptions()];
                    case 1:
                        options = _b.sent();
                        return [4 /*yield*/, this.debouncer.delayAndShouldDebounce(options.debounceDelay)];
                    case 2:
                        // Debounce
                        if (_b.sent()) {
                            return [2 /*return*/, { token: token, startTime: startTime, helper: undefined }];
                        }
                        return [4 /*yield*/, this._prepareLlm()];
                    case 3:
                        llm = _b.sent();
                        if (!llm) {
                            return [2 /*return*/, { token: token, startTime: startTime, helper: undefined }];
                        }
                        // Update pending completion with model info.
                        this.loggingService.updatePendingCompletion(input.completionId, {
                            modelName: llm.model,
                            modelProvider: llm.providerName,
                            filepath: input.filepath,
                        });
                        // Check model capabilities
                        if (!(0, autodetect_js_1.modelSupportsNextEdit)(llm.capabilities, llm.model, llm.title)) {
                            console.error("".concat(llm.model, " is not capable of next edit."));
                            return [2 /*return*/, { token: token, startTime: startTime, helper: undefined }];
                        }
                        if ((_a = llm.promptTemplates) === null || _a === void 0 ? void 0 : _a.autocomplete) {
                            options.template = llm.promptTemplates.autocomplete;
                        }
                        return [4 /*yield*/, HelperVars_js_1.HelperVars.create(input, options, llm.model, this.ide)];
                    case 4:
                        helper = _b.sent();
                        return [4 /*yield*/, (0, index_js_2.shouldPrefilter)(helper, this.ide)];
                    case 5:
                        if (_b.sent()) {
                            return [2 /*return*/, { token: token, startTime: startTime, helper: undefined }];
                        }
                        return [2 /*return*/, { token: token, startTime: startTime, helper: helper }];
                }
            });
        });
    };
    NextEditProvider.prototype._generatePrompts = function (helper, opts) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, snippetPayload, workspaceDirs, _b, editableRegionStartLine, editableRegionEndLine, context, prompts;
            var _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (!this.modelProvider) {
                            throw new Error("Model provider not initialized");
                        }
                        return [4 /*yield*/, Promise.all([
                                (0, index_js_3.getAllSnippetsWithoutRace)({
                                    helper: helper,
                                    ide: this.ide,
                                    getDefinitionsFromLsp: this.getDefinitionsFromLsp,
                                    contextRetrievalService: this.contextRetrievalService,
                                }),
                                this.ide.getWorkspaceDirs(),
                            ])];
                    case 1:
                        _a = _e.sent(), snippetPayload = _a[0], workspaceDirs = _a[1];
                        _b = this.modelProvider.calculateEditableRegion(helper, (_c = opts === null || opts === void 0 ? void 0 : opts.usingFullFileDiff) !== null && _c !== void 0 ? _c : false), editableRegionStartLine = _b.editableRegionStartLine, editableRegionEndLine = _b.editableRegionEndLine;
                        context = {
                            helper: helper,
                            snippetPayload: snippetPayload,
                            editableRegionStartLine: editableRegionStartLine,
                            editableRegionEndLine: editableRegionEndLine,
                            diffContext: this.diffContext,
                            autocompleteContext: this.autocompleteContext,
                            historyDiff: (0, diffFormatting_js_1.createDiff)({
                                beforeContent: (_d = DocumentHistoryTracker_js_1.DocumentHistoryTracker.getInstance().getMostRecentDocumentHistory((0, pathToUri_js_1.localPathOrUriToPath)(helper.filepath))) !== null && _d !== void 0 ? _d : "",
                                afterContent: helper.fileContents,
                                filePath: helper.filepath,
                                diffType: diffFormatting_js_1.DiffFormatType.Unified,
                                contextLines: 3,
                                workspaceDir: workspaceDirs[0], // Use first workspace directory
                            }),
                        };
                        return [4 /*yield*/, this.modelProvider.generatePrompts(context)];
                    case 2:
                        prompts = _e.sent();
                        this.promptMetadata = this.modelProvider.buildPromptMetadata(context);
                        return [2 /*return*/, { editableRegionStartLine: editableRegionStartLine, editableRegionEndLine: editableRegionEndLine, prompts: prompts }];
                }
            });
        });
    };
    NextEditProvider.prototype._handleCompletion = function (helper, prompts, token, startTime, editableRegionStartLine, editableRegionEndLine, opts) {
        return __awaiter(this, void 0, void 0, function () {
            var llm, uniqueToken, lastPrompt, msg, nextCompletion, postprocessed, outcome, profileType;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.modelProvider) {
                            throw new Error("Model provider not initialized");
                        }
                        return [4 /*yield*/, this._prepareLlm()];
                    case 1:
                        llm = _b.sent();
                        if (!llm)
                            return [2 /*return*/, undefined];
                        // Inject unique token if needed (for Mercury models).
                        if (this.modelProvider.shouldInjectUniqueToken()) {
                            uniqueToken = this.modelProvider.getUniqueToken();
                            if (uniqueToken) {
                                lastPrompt = prompts[prompts.length - 1];
                                if (lastPrompt && typeof lastPrompt.content === "string") {
                                    lastPrompt.content += uniqueToken;
                                }
                            }
                        }
                        return [4 /*yield*/, llm.chat([prompts[1]], token, {
                                stream: false,
                            })];
                    case 2:
                        msg = _b.sent();
                        if (typeof msg.content !== "string") {
                            return [2 /*return*/, undefined];
                        }
                        nextCompletion = this.modelProvider.extractCompletion(msg.content);
                        postprocessed = (0, index_js_1.postprocessCompletion)({
                            completion: nextCompletion,
                            llm: llm,
                            prefix: helper.prunedPrefix,
                            suffix: helper.prunedSuffix,
                        });
                        // Return early if postprocessing filtered out the completion.
                        if (!postprocessed) {
                            return [2 /*return*/, undefined];
                        }
                        nextCompletion = postprocessed;
                        profileType = (_a = this.configHandler.currentProfile) === null || _a === void 0 ? void 0 : _a.profileDescription.profileType;
                        if (!((opts === null || opts === void 0 ? void 0 : opts.usingFullFileDiff) === false || !(opts === null || opts === void 0 ? void 0 : opts.usingFullFileDiff))) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.modelProvider.handlePartialFileDiff({
                                helper: helper,
                                editableRegionStartLine: editableRegionStartLine,
                                editableRegionEndLine: editableRegionEndLine,
                                startTime: startTime,
                                llm: llm,
                                nextCompletion: nextCompletion,
                                promptMetadata: this.promptMetadata,
                                ide: this.ide,
                                profileType: profileType,
                            })];
                    case 3:
                        outcome = _b.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, this.modelProvider.handleFullFileDiff({
                            helper: helper,
                            editableRegionStartLine: editableRegionStartLine,
                            editableRegionEndLine: editableRegionEndLine,
                            startTime: startTime,
                            llm: llm,
                            nextCompletion: nextCompletion,
                            promptMetadata: this.promptMetadata,
                            ide: this.ide,
                            profileType: profileType,
                        })];
                    case 5:
                        outcome = _b.sent();
                        _b.label = 6;
                    case 6:
                        if (!outcome) return [3 /*break*/, 8];
                        // Handle NextEditProvider-specific state.
                        this.previousCompletions.push(outcome);
                        // Mark as displayed for JetBrains
                        return [4 /*yield*/, this._markDisplayedIfJetBrains(helper.input.completionId, outcome)];
                    case 7:
                        // Mark as displayed for JetBrains
                        _b.sent();
                        _b.label = 8;
                    case 8: return [2 /*return*/, outcome];
                }
            });
        });
    };
    NextEditProvider.prototype._markDisplayedIfJetBrains = function (completionId, outcome) {
        return __awaiter(this, void 0, void 0, function () {
            var ideType;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ide.getIdeInfo()];
                    case 1:
                        ideType = (_a.sent()).ideType;
                        if (ideType === "jetbrains") {
                            this.markDisplayed(completionId, outcome);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * This is a wrapper around provideInlineCompletionItems.
     * This is invoked when we call the model in the background using prefetch.
     * It's not currently used anywhere (references are not used either), but I decided to keep it in case we actually need to use prefetch.
     * You will see that calls to this method is made from NextEditPrefetchQueue.proecss(), which is wrapped in `if (!this.usingFullFileDiff)`.
     */
    NextEditProvider.prototype.provideInlineCompletionItemsWithChain = function (ctx, nextEditLocation, token, usingFullFileDiff) {
        return __awaiter(this, void 0, void 0, function () {
            var previousOutcome, input, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        previousOutcome = this.getPreviousCompletion();
                        if (!previousOutcome) {
                            console.log("previousOutcome is undefined");
                            return [2 /*return*/, undefined];
                        }
                        input = this.buildAutocompleteInputFromChain(previousOutcome, nextEditLocation, ctx);
                        if (!input) {
                            console.log("input is undefined");
                            return [2 /*return*/, undefined];
                        }
                        return [4 /*yield*/, this.provideInlineCompletionItems(input, token, {
                                withChain: true,
                                usingFullFileDiff: usingFullFileDiff,
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_2 = _a.sent();
                        this.onError(e_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    NextEditProvider.prototype.buildAutocompleteInputFromChain = function (previousOutcome, nextEditableRegion, ctx) {
        var input = __assign({ pos: {
                line: nextEditableRegion.range.start.line,
                character: nextEditableRegion.range.start.character,
            }, filepath: previousOutcome.fileUri }, ctx);
        return input;
    };
    NextEditProvider.instance = null;
    return NextEditProvider;
}());
exports.NextEditProvider = NextEditProvider;
