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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompletionProvider = void 0;
var OpenAI_js_1 = require("../llm/llms/OpenAI.js");
var parameters_js_1 = require("../util/parameters.js");
var shouldCompleteMultiline_js_1 = require("./classification/shouldCompleteMultiline.js");
var ContextRetrievalService_js_1 = require("./context/ContextRetrievalService.js");
// Security check removed for simplicity
var BracketMatchingService_js_1 = require("./filtering/BracketMatchingService.js");
var CompletionStreamer_js_1 = require("./generation/CompletionStreamer.js");
var index_js_1 = require("./postprocessing/index.js");
var index_js_2 = require("./prefiltering/index.js");
var index_js_3 = require("./snippets/index.js");
var index_js_4 = require("./templating/index.js");
var AutocompleteDebouncer_js_1 = require("./util/AutocompleteDebouncer.js");
var AutocompleteLoggingService_js_1 = require("./util/AutocompleteLoggingService.js");
var AutocompleteLruCache_js_1 = require("./util/AutocompleteLruCache.js");
var HelperVars_js_1 = require("./util/HelperVars.js");
var autocompleteCache = AutocompleteLruCache_js_1.AutocompleteLruCache.get();
// Errors that can be expected on occasion even during normal functioning should not be shown.
// Not worth disrupting the user to tell them that a single autocomplete request didn't go through
var ERRORS_TO_IGNORE = [
    // From Ollama
    "unexpected server status",
    "operation was aborted",
];
var CompletionProvider = /** @class */ (function () {
    function CompletionProvider(configHandler, ide, _injectedGetLlm, _onError, getDefinitionsFromLsp) {
        this.configHandler = configHandler;
        this.ide = ide;
        this._injectedGetLlm = _injectedGetLlm;
        this._onError = _onError;
        this.getDefinitionsFromLsp = getDefinitionsFromLsp;
        this.autocompleteCache = AutocompleteLruCache_js_1.AutocompleteLruCache.get();
        this.errorsShown = new Set();
        this.bracketMatchingService = new BracketMatchingService_js_1.BracketMatchingService();
        this.debouncer = new AutocompleteDebouncer_js_1.AutocompleteDebouncer();
        this.loggingService = new AutocompleteLoggingService_js_1.AutocompleteLoggingService();
        this.completionStreamer = new CompletionStreamer_js_1.CompletionStreamer(this.onError.bind(this));
        this.contextRetrievalService = new ContextRetrievalService_js_1.ContextRetrievalService(this.ide);
    }
    CompletionProvider.prototype._prepareLlm = function () {
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
                        return [2 /*return*/, llm];
                }
            });
        });
    };
    CompletionProvider.prototype.onError = function (e) {
        var errorMessage = typeof e === "string" ? e : (e === null || e === void 0 ? void 0 : e.message) || "Unknown error";
        if (ERRORS_TO_IGNORE.some(function (err) { return errorMessage.includes(err); })) {
            return;
        }
        console.warn("Error generating autocompletion: ", e);
        if (!this.errorsShown.has(errorMessage)) {
            this.errorsShown.add(errorMessage);
            this._onError(e);
        }
    };
    CompletionProvider.prototype.cancel = function () {
        this.loggingService.cancel();
    };
    CompletionProvider.prototype.accept = function (completionId) {
        var outcome = this.loggingService.accept(completionId);
        if (!outcome) {
            return;
        }
        this.bracketMatchingService.handleAcceptedCompletion(outcome.completion, outcome.filepath);
    };
    CompletionProvider.prototype.markDisplayed = function (completionId, outcome) {
        this.loggingService.markDisplayed(completionId, outcome);
    };
    CompletionProvider.prototype._getAutocompleteOptions = function (llm) {
        return __awaiter(this, void 0, void 0, function () {
            var config, options;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.configHandler.loadConfig()];
                    case 1:
                        config = (_b.sent()).config;
                        options = __assign(__assign(__assign({}, parameters_js_1.DEFAULT_AUTOCOMPLETE_OPTS), config === null || config === void 0 ? void 0 : config.tabAutocompleteOptions), llm.autocompleteOptions);
                        // Enable static contextualization if defined.
                        if ((_a = config === null || config === void 0 ? void 0 : config.experimental) === null || _a === void 0 ? void 0 : _a.enableStaticContextualization) {
                            options.experimental_enableStaticContextualization = true;
                        }
                        return [2 /*return*/, options];
                }
            });
        });
    };
    CompletionProvider.prototype.provideInlineCompletionItems = function (input, token, force) {
        return __awaiter(this, void 0, void 0, function () {
            var controller, startTime, llm, options, helper, _a, snippetPayload, workspaceDirs, _b, prompt_1, prefix, suffix, completionOptions, completion, cache, cachedCompletion, _c, cacheHit, multiline, completionStream, _d, completionStream_1, completionStream_1_1, update, e_1_1, processedCompletion, outcome, ideType, e_2;
            var _e;
            var _f, e_1, _g, _h;
            var _j, _k;
            return __generator(this, function (_l) {
                switch (_l.label) {
                    case 0:
                        _l.trys.push([0, 31, 32, 33]);
                        // Create abort signal if not given
                        if (!token) {
                            controller = this.loggingService.createAbortController(input.completionId);
                            token = controller.signal;
                        }
                        startTime = Date.now();
                        return [4 /*yield*/, this._prepareLlm()];
                    case 1:
                        llm = _l.sent();
                        if (!llm) {
                            return [2 /*return*/, undefined];
                        }
                        // Security check removed for simplicity
                        if (false) { // Disabled security check
                            return [2 /*return*/, undefined];
                        }
                        return [4 /*yield*/, this._getAutocompleteOptions(llm)];
                    case 2:
                        options = _l.sent();
                        if (!!force) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.debouncer.delayAndShouldDebounce(options.debounceDelay)];
                    case 3:
                        if (_l.sent()) {
                            return [2 /*return*/, undefined];
                        }
                        _l.label = 4;
                    case 4:
                        if ((_j = llm.promptTemplates) === null || _j === void 0 ? void 0 : _j.autocomplete) {
                            options.template = llm.promptTemplates.autocomplete;
                        }
                        return [4 /*yield*/, HelperVars_js_1.HelperVars.create(input, options, llm.model || "", this.ide)];
                    case 5:
                        helper = _l.sent();
                        return [4 /*yield*/, (0, index_js_2.shouldPrefilter)(helper, this.ide)];
                    case 6:
                        if (_l.sent()) {
                            return [2 /*return*/, undefined];
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
                    case 7:
                        _a = _l.sent(), snippetPayload = _a[0], workspaceDirs = _a[1];
                        _b = (0, index_js_4.renderPromptWithTokenLimit)({
                            snippetPayload: snippetPayload,
                            workspaceDirs: workspaceDirs,
                            helper: helper,
                            llm: llm,
                        }), prompt_1 = _b.prompt, prefix = _b.prefix, suffix = _b.suffix, completionOptions = _b.completionOptions;
                        completion = "";
                        return [4 /*yield*/, autocompleteCache];
                    case 8:
                        cache = _l.sent();
                        if (!helper.options.useCache) return [3 /*break*/, 10];
                        return [4 /*yield*/, cache.get(helper.prunedPrefix)];
                    case 9:
                        _c = _l.sent();
                        return [3 /*break*/, 11];
                    case 10:
                        _c = undefined;
                        _l.label = 11;
                    case 11:
                        cachedCompletion = _c;
                        cacheHit = false;
                        if (!cachedCompletion) return [3 /*break*/, 12];
                        // Cache
                        cacheHit = true;
                        completion = cachedCompletion;
                        return [3 /*break*/, 25];
                    case 12:
                        multiline = !helper.options.transform || (0, shouldCompleteMultiline_js_1.shouldCompleteMultiline)(helper);
                        completionStream = this.completionStreamer.streamCompletionWithFilters(token, llm, prefix, suffix, prompt_1, multiline, completionOptions, helper);
                        _l.label = 13;
                    case 13:
                        _l.trys.push([13, 18, 19, 24]);
                        _d = true, completionStream_1 = __asyncValues(completionStream);
                        _l.label = 14;
                    case 14: return [4 /*yield*/, completionStream_1.next()];
                    case 15:
                        if (!(completionStream_1_1 = _l.sent(), _f = completionStream_1_1.done, !_f)) return [3 /*break*/, 17];
                        _h = completionStream_1_1.value;
                        _d = false;
                        update = _h;
                        completion += update;
                        _l.label = 16;
                    case 16:
                        _d = true;
                        return [3 /*break*/, 14];
                    case 17: return [3 /*break*/, 24];
                    case 18:
                        e_1_1 = _l.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 24];
                    case 19:
                        _l.trys.push([19, , 22, 23]);
                        if (!(!_d && !_f && (_g = completionStream_1.return))) return [3 /*break*/, 21];
                        return [4 /*yield*/, _g.call(completionStream_1)];
                    case 20:
                        _l.sent();
                        _l.label = 21;
                    case 21: return [3 /*break*/, 23];
                    case 22:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 23: return [7 /*endfinally*/];
                    case 24:
                        // Don't postprocess if aborted
                        if (token.aborted) {
                            return [2 /*return*/, undefined];
                        }
                        processedCompletion = helper.options.transform
                            ? (0, index_js_1.postprocessCompletion)({
                                completion: completion,
                                prefix: helper.prunedPrefix,
                                suffix: helper.prunedSuffix,
                                llm: llm,
                            })
                            : completion;
                        completion = processedCompletion;
                        _l.label = 25;
                    case 25:
                        if (!completion) {
                            return [2 /*return*/, undefined];
                        }
                        _e = { time: Date.now() - startTime, completion: completion, prefix: prefix, suffix: suffix, prompt: prompt_1, modelProvider: llm.underlyingProviderName, modelName: llm.model || "", completionOptions: completionOptions, cacheHit: cacheHit, filepath: helper.filepath, numLines: completion.split("\n").length, completionId: helper.input.completionId };
                        return [4 /*yield*/, this.ide.getRepoName(helper.filepath)];
                    case 26:
                        _e.gitRepo = _l.sent();
                        return [4 /*yield*/, this.ide.getUniqueId()];
                    case 27:
                        outcome = __assign.apply(void 0, [(_e.uniqueId = _l.sent(), _e.timestamp = new Date().toISOString(), _e.profileType = (_k = this.configHandler.currentProfile) === null || _k === void 0 ? void 0 : _k.profileDescription.profileType, _e), helper.options]);
                        if (options.experimental_enableStaticContextualization) {
                            outcome.enabledStaticContextualization = true;
                        }
                        if (!(!outcome.cacheHit && helper.options.useCache)) return [3 /*break*/, 29];
                        return [4 /*yield*/, this.autocompleteCache];
                    case 28:
                        (_l.sent())
                            .put(outcome.prefix, outcome.completion)
                            .catch(function (e) { return console.warn("Failed to save to cache: ".concat(e.message)); });
                        _l.label = 29;
                    case 29: return [4 /*yield*/, this.ide.getIdeInfo()];
                    case 30:
                        ideType = (_l.sent()).ideType;
                        if (ideType === "jetbrains") {
                            this.markDisplayed(input.completionId, outcome);
                        }
                        return [2 /*return*/, outcome];
                    case 31:
                        e_2 = _l.sent();
                        this.onError(e_2);
                        return [3 /*break*/, 33];
                    case 32:
                        this.loggingService.deleteAbortController(input.completionId);
                        return [7 /*endfinally*/];
                    case 33: return [2 /*return*/];
                }
            });
        });
    };
    return CompletionProvider;
}());
exports.CompletionProvider = CompletionProvider;
