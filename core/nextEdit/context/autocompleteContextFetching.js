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
exports.getAutocompleteContext = void 0;
var ContextRetrievalService_1 = require("../../autocomplete/context/ContextRetrievalService");
var getAllSnippets_1 = require("../../autocomplete/snippets/getAllSnippets");
var templating_1 = require("../../autocomplete/templating");
var HelperVars_1 = require("../../autocomplete/util/HelperVars");
var ignore_1 = require("../../indexing/ignore");
var parameters_1 = require("../../util/parameters");
/**
 * Gets the formatted autocomplete context string that would be used for autocomplete at the given position.
 * This function mimics the context generation pipeline from the autocomplete system without triggering
 * an actual completion.
 *
 * @param filepath - The file path where context is being requested
 * @param pos - The position in the file where context is being requested
 * @param ide - The IDE interface for file system operations
 * @param configHandler - The config handler to load user configuration
 * @param getDefinitionsFromLsp - Function to get LSP definitions (can be a no-op function if not needed)
 * @param autocompleteModel - Optional autocomplete model to use (if not provided, uses configured autocomplete model)
 * @param recentlyEditedRanges - Recently edited ranges (defaults to empty array)
 * @param recentlyVisitedRanges - Recently visited ranges (if not provided, will fetch current live data like real autocomplete)
 * @param maxPromptTokens - Optional override for maximum number of tokens (if not provided, uses config)
 * @param manuallyPassFileContents - Optional file contents to use instead of reading from disk (should match current editor state)
 * @returns Promise that resolves to the formatted context string
 */
var getAutocompleteContext = function (filepath_1, pos_1, ide_1, configHandler_1) {
    var args_1 = [];
    for (var _i = 4; _i < arguments.length; _i++) {
        args_1[_i - 4] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([filepath_1, pos_1, ide_1, configHandler_1], args_1, true), void 0, function (filepath, pos, ide, configHandler, getDefinitionsFromLsp, recentlyEditedRanges, recentlyVisitedRanges, maxPromptTokens, manuallyPassFileContents, autocompleteModel) {
        var input, config, finalModel, modelNameForTemplating, foundModel, configuredModel, configuredModel, options, helper, contextRetrievalService, _a, snippetPayload, workspaceDirs, _b, prompt, prefix, suffix, completionOptions;
        var _c;
        if (getDefinitionsFromLsp === void 0) { getDefinitionsFromLsp = function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, []];
        }); }); }; }
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (!recentlyEditedRanges)
                        recentlyEditedRanges = [];
                    if (!recentlyVisitedRanges)
                        recentlyVisitedRanges = [];
                    input = {
                        isUntitledFile: false,
                        completionId: "context-fetch-".concat(Date.now()),
                        filepath: filepath,
                        pos: pos,
                        recentlyVisitedRanges: recentlyVisitedRanges,
                        recentlyEditedRanges: recentlyEditedRanges,
                        manuallyPassFileContents: manuallyPassFileContents,
                    };
                    return [4 /*yield*/, configHandler.loadConfig()];
                case 1:
                    config = (_d.sent()).config;
                    if (!config) {
                        throw new Error("No config available");
                    }
                    if ((0, ignore_1.isSecurityConcern)(input.filepath)) {
                        throw new Error("File is a security concern, autocomplete disabled");
                    }
                    if (autocompleteModel) {
                        if (typeof autocompleteModel === "string") {
                            foundModel = config.modelsByRole.autocomplete.find(function (m) { return m.title === autocompleteModel; });
                            if (foundModel) {
                                finalModel = foundModel;
                                modelNameForTemplating = foundModel.model;
                            }
                            else {
                                configuredModel = config.selectedModelByRole.autocomplete;
                                if (!configuredModel) {
                                    throw new Error("No autocomplete model configured and provided model not found in config");
                                }
                                finalModel = configuredModel;
                                modelNameForTemplating = autocompleteModel; // Use the provided string for template selection
                            }
                        }
                        else {
                            finalModel = autocompleteModel;
                            modelNameForTemplating = autocompleteModel.model;
                        }
                    }
                    else {
                        configuredModel = config.selectedModelByRole.autocomplete;
                        if (!configuredModel) {
                            throw new Error("No autocomplete model configured and no model provided");
                        }
                        finalModel = configuredModel;
                        modelNameForTemplating = configuredModel.model;
                    }
                    options = __assign(__assign(__assign(__assign({}, parameters_1.DEFAULT_AUTOCOMPLETE_OPTS), config.tabAutocompleteOptions), finalModel.autocompleteOptions), (maxPromptTokens && { maxPromptTokens: maxPromptTokens }));
                    if ((_c = finalModel.promptTemplates) === null || _c === void 0 ? void 0 : _c.autocomplete) {
                        options.template = finalModel.promptTemplates.autocomplete;
                    }
                    return [4 /*yield*/, HelperVars_1.HelperVars.create(input, options, modelNameForTemplating, ide)];
                case 2:
                    helper = _d.sent();
                    contextRetrievalService = new ContextRetrievalService_1.ContextRetrievalService(ide);
                    return [4 /*yield*/, contextRetrievalService.initializeForFile(filepath)];
                case 3:
                    _d.sent();
                    return [4 /*yield*/, Promise.all([
                            (0, getAllSnippets_1.getAllSnippetsWithoutRace)({
                                helper: helper,
                                ide: ide,
                                getDefinitionsFromLsp: getDefinitionsFromLsp,
                                contextRetrievalService: contextRetrievalService,
                            }),
                            ide.getWorkspaceDirs(),
                        ])];
                case 4:
                    _a = _d.sent(), snippetPayload = _a[0], workspaceDirs = _a[1];
                    _b = (0, templating_1.renderPrompt)({
                        snippetPayload: snippetPayload,
                        workspaceDirs: workspaceDirs,
                        helper: helper,
                    }), prompt = _b.prompt, prefix = _b.prefix, suffix = _b.suffix, completionOptions = _b.completionOptions;
                    return [2 /*return*/, prefix];
            }
        });
    });
};
exports.getAutocompleteContext = getAutocompleteContext;
