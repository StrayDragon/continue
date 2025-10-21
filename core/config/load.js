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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
exports.resolveSerializedConfig = resolveSerializedConfig;
exports.isContextProviderWithParams = isContextProviderWithParams;
exports.finalToBrowserConfig = finalToBrowserConfig;
exports.loadContinueConfigFromJson = loadContinueConfigFromJson;
var child_process_1 = require("child_process");
var fs = require("fs");
var os_1 = require("os");
var path_1 = require("path");
var config_yaml_1 = require("@continuedev/config-yaml");
var JSONC = require("comment-json");
var tar = require("tar");
var built_in_legacy_1 = require("../commands/slash/built-in-legacy");
var customSlashCommand_1 = require("../commands/slash/customSlashCommand");
var promptFileSlashCommand_1 = require("../commands/slash/promptFileSlashCommand");
var MCPManagerSingleton_1 = require("../context/mcp/MCPManagerSingleton");
var env_1 = require("../control-plane/env");
var llms_1 = require("../llm/llms");
var CustomLLM_1 = require("../llm/llms/CustomLLM");
var llm_1 = require("../llm/llms/llm");
var TransformersJsEmbeddingsProvider_1 = require("../llm/llms/TransformersJsEmbeddingsProvider");
var getPromptFiles_1 = require("../promptFiles/getPromptFiles");
var util_1 = require("../util");
var GlobalContext_1 = require("../util/GlobalContext");
var merge_1 = require("../util/merge");
var paths_1 = require("../util/paths");
var pathToUri_1 = require("../util/pathToUri");
var loadJsonMcpConfigs_1 = require("../context/mcp/json/loadJsonMcpConfigs");
var CustomContextProvider_1 = require("../context/providers/CustomContextProvider");
var PolicySingleton_1 = require("../control-plane/PolicySingleton");
var tools_1 = require("../tools");
var ideUtils_1 = require("../util/ideUtils");
var loadRcConfigs_1 = require("./json/loadRcConfigs");
var loadContextProviders_1 = require("./loadContextProviders");
var sharedConfig_1 = require("./sharedConfig");
var util_2 = require("./util");
var validation_js_1 = require("./validation.js");
function resolveSerializedConfig(filepath) {
    var content = fs.readFileSync(filepath, "utf8");
    var config = JSONC.parse(content);
    if (config.env && Array.isArray(config.env)) {
        var env_2 = __assign(__assign({}, process.env), (0, paths_1.getContinueDotEnv)());
        config.env.forEach(function (envVar) {
            if (envVar in env_2) {
                content = content.replaceAll(new RegExp("\"".concat(envVar, "\""), "g"), "\"".concat(env_2[envVar], "\""));
            }
        });
    }
    return JSONC.parse(content);
}
var configMergeKeys = {
    models: function (a, b) { return a.title === b.title; },
    contextProviders: function (a, b) {
        var _a, _b;
        // If not HTTP providers, use the name only
        if (a.name !== "http" || b.name !== "http") {
            return a.name === b.name;
        }
        // For HTTP providers, consider them different if they have different URLs
        return a.name === b.name && ((_a = a.params) === null || _a === void 0 ? void 0 : _a.url) === ((_b = b.params) === null || _b === void 0 ? void 0 : _b.url);
    },
    slashCommands: function (a, b) { return a.name === b.name; },
    customCommands: function (a, b) { return a.name === b.name; },
};
function loadSerializedConfig(workspaceConfigs, ideSettings, ideType, overrideConfigJson, ide) {
    var config = overrideConfigJson;
    if (!config) {
        try {
            config = resolveSerializedConfig((0, paths_1.getConfigJsonPath)());
        }
        catch (e) {
            throw new Error("Failed to parse config.json: ".concat(e));
        }
    }
    var errors = (0, validation_js_1.validateConfig)(config);
    if (errors === null || errors === void 0 ? void 0 : errors.some(function (error) { return error.fatal; })) {
        return {
            errors: errors,
            config: undefined,
            configLoadInterrupted: true,
        };
    }
    if (config.allowAnonymousTelemetry === undefined) {
        config.allowAnonymousTelemetry = true;
    }
    if (ideSettings.remoteConfigServerUrl) {
        try {
            var remoteConfigJson = resolveSerializedConfig((0, paths_1.getConfigJsonPathForRemote)(ideSettings.remoteConfigServerUrl));
            config = (0, merge_1.default)(config, remoteConfigJson, "merge", configMergeKeys);
        }
        catch (e) {
            console.warn("Error loading remote config: ", e);
        }
    }
    for (var _i = 0, workspaceConfigs_1 = workspaceConfigs; _i < workspaceConfigs_1.length; _i++) {
        var workspaceConfig = workspaceConfigs_1[_i];
        config = (0, merge_1.default)(config, workspaceConfig, workspaceConfig.mergeBehavior, configMergeKeys);
    }
    if (os_1.default.platform() === "linux" && !(0, util_2.isSupportedLanceDbCpuTargetForLinux)(ide)) {
        config.disableIndexing = true;
    }
    return { config: config, errors: errors, configLoadInterrupted: false };
}
function serializedToIntermediateConfig(initial, ide) {
    return __awaiter(this, void 0, void 0, function () {
        var slashCommands, _i, _a, command, newCommand, _b, _c, command, promptFiles, _d, promptFiles_1, file, slashCommand, config;
        var _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    slashCommands = [];
                    for (_i = 0, _a = initial.slashCommands || []; _i < _a.length; _i++) {
                        command = _a[_i];
                        newCommand = (0, built_in_legacy_1.getLegacyBuiltInSlashCommandFromDescription)(command);
                        if (newCommand) {
                            slashCommands.push(newCommand);
                        }
                    }
                    for (_b = 0, _c = initial.customCommands || []; _b < _c.length; _b++) {
                        command = _c[_b];
                        slashCommands.push((0, customSlashCommand_1.convertCustomCommandToSlashCommand)(command));
                    }
                    return [4 /*yield*/, (0, getPromptFiles_1.getAllPromptFiles)(ide, (_e = initial.experimental) === null || _e === void 0 ? void 0 : _e.promptPath, true)];
                case 1:
                    promptFiles = _f.sent();
                    for (_d = 0, promptFiles_1 = promptFiles; _d < promptFiles_1.length; _d++) {
                        file = promptFiles_1[_d];
                        slashCommand = (0, promptFileSlashCommand_1.slashCommandFromPromptFile)(file.path, file.content);
                        if (slashCommand) {
                            slashCommands.push(slashCommand);
                        }
                    }
                    config = __assign(__assign({}, initial), { slashCommands: slashCommands, contextProviders: initial.contextProviders || [] });
                    return [2 /*return*/, config];
            }
        });
    });
}
// Merge request options set for entire config with model specific options
function applyRequestOptionsToModels(models, config, roles) {
    var _a;
    if (roles === void 0) { roles = undefined; }
    // Prepare models
    for (var _i = 0, models_1 = models; _i < models_1.length; _i++) {
        var model = models_1[_i];
        model.requestOptions = __assign(__assign({}, config.requestOptions), model.requestOptions);
        if (roles !== undefined) {
            model.roles = (_a = model.roles) !== null && _a !== void 0 ? _a : roles;
        }
    }
}
function isContextProviderWithParams(contextProvider) {
    return "name" in contextProvider && !!contextProvider.name;
}
/** Only difference between intermediate and final configs is the `models` array */
function intermediateToFinalConfig(_a) {
    return __awaiter(this, arguments, void 0, function (_b) {
        // Embeddings Provider
        function getEmbeddingsILLM(embedConfig) {
            var _a;
            if (embedConfig) {
                // config.ts-injected ILLM
                if ("providerName" in embedConfig) {
                    return embedConfig;
                }
                var provider_1 = embedConfig.provider, options = __rest(embedConfig, ["provider"]);
                if (provider_1 === "transformers.js" || provider_1 === "free-trial") {
                    if (provider_1 === "free-trial") {
                        warnAboutFreeTrial = true;
                    }
                    return new TransformersJsEmbeddingsProvider_1.default();
                }
                else {
                    var cls = llms_1.LLMClasses.find(function (c) { return c.providerName === provider_1; });
                    if (cls) {
                        var llmOptions = __assign({ model: (_a = options.model) !== null && _a !== void 0 ? _a : "UNSPECIFIED" }, options);
                        return new cls(llmOptions);
                    }
                    else {
                        errors.push({
                            fatal: false,
                            message: "Embeddings provider ".concat(provider_1, " not found"),
                        });
                    }
                }
            }
            if (ideInfo.ideType === "vscode") {
                return new TransformersJsEmbeddingsProvider_1.default();
            }
            return null;
        }
        // Reranker
        function getRerankingILLM(rerankingConfig) {
            var _a;
            if (!rerankingConfig) {
                return null;
            }
            // config.ts-injected ILLM
            if ("providerName" in rerankingConfig) {
                return rerankingConfig;
            }
            var _b = config.reranker, name = _b.name, params = _b.params;
            if (name === "free-trial") {
                warnAboutFreeTrial = true;
                return null;
            }
            if (name === "llm") {
                var llm = models.find(function (model) { return model.title === (params === null || params === void 0 ? void 0 : params.modelTitle); });
                if (!llm) {
                    errors.push({
                        fatal: false,
                        message: "Unknown reranking model ".concat(params === null || params === void 0 ? void 0 : params.modelTitle),
                    });
                    return null;
                }
                else {
                    return new llm_1.LLMReranker(llm);
                }
            }
            else {
                var cls = llms_1.LLMClasses.find(function (c) { return c.providerName === name; });
                if (cls) {
                    var llmOptions = __assign({ model: (_a = params === null || params === void 0 ? void 0 : params.model) !== null && _a !== void 0 ? _a : "UNSPECIFIED" }, params);
                    return new cls(llmOptions);
                }
                else {
                    errors.push({
                        fatal: false,
                        message: "Unknown reranking provider ".concat(name),
                    });
                }
            }
            return null;
        }
        var errors, workspaceDirs, getUriFromPath, models, warnAboutFreeTrial, tabAutocompleteModels, autocompleteConfigs, _c, contextProviders, contextErrors, _i, _d, cp, newEmbedder, newReranker, continueConfig, _e, _f, cmd, mcpManager, orgPolicy, mcpOptions, _g, jsonMcpErrors, mcpServers, inlineEditModel, match, applyBlockModel, match;
        var _this = this;
        var _h, _j, _k, _l, _m, _o, _p, _q, _r;
        var config = _b.config, ide = _b.ide, ideSettings = _b.ideSettings, ideInfo = _b.ideInfo, uniqueId = _b.uniqueId, llmLogger = _b.llmLogger, workOsAccessToken = _b.workOsAccessToken, _s = _b.loadPromptFiles, loadPromptFiles = _s === void 0 ? true : _s;
        return __generator(this, function (_t) {
            switch (_t.label) {
                case 0:
                    errors = [];
                    return [4 /*yield*/, ide.getWorkspaceDirs()];
                case 1:
                    workspaceDirs = _t.sent();
                    getUriFromPath = function (path) {
                        return (0, ideUtils_1.resolveRelativePathInDir)(path, ide, workspaceDirs);
                    };
                    models = [];
                    return [4 /*yield*/, Promise.all(config.models.map(function (desc) { return __awaiter(_this, void 0, void 0, function () {
                            var llm, modelNames, detectedModels, e_1, llm, modelNames, models_2, e_2;
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!("title" in desc)) return [3 /*break*/, 9];
                                        return [4 /*yield*/, (0, llms_1.llmFromDescription)(desc, ide.readFile.bind(ide), getUriFromPath, uniqueId, ideSettings, llmLogger, config.completionOptions)];
                                    case 1:
                                        llm = _a.sent();
                                        if (!llm) {
                                            return [2 /*return*/];
                                        }
                                        if (!(llm.model === "AUTODETECT")) return [3 /*break*/, 7];
                                        _a.label = 2;
                                    case 2:
                                        _a.trys.push([2, 5, , 6]);
                                        return [4 /*yield*/, llm.listModels()];
                                    case 3:
                                        modelNames = _a.sent();
                                        return [4 /*yield*/, Promise.all(modelNames.map(function (modelName) { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0: return [4 /*yield*/, (0, llms_1.llmFromDescription)(__assign(__assign({}, desc), { model: modelName, title: modelName, isFromAutoDetect: true }), ide.readFile.bind(ide), getUriFromPath, uniqueId, ideSettings, llmLogger, (0, util_1.copyOf)(config.completionOptions))];
                                                        case 1: return [2 /*return*/, _a.sent()];
                                                    }
                                                });
                                            }); }))];
                                    case 4:
                                        detectedModels = _a.sent();
                                        models.push.apply(models, detectedModels.filter(function (x) { return typeof x !== "undefined"; }));
                                        return [3 /*break*/, 6];
                                    case 5:
                                        e_1 = _a.sent();
                                        console.warn("Error listing models: ", e_1);
                                        return [3 /*break*/, 6];
                                    case 6: return [3 /*break*/, 8];
                                    case 7:
                                        models.push(llm);
                                        _a.label = 8;
                                    case 8: return [3 /*break*/, 15];
                                    case 9:
                                        llm = new CustomLLM_1.default(__assign(__assign({}, desc), { options: __assign(__assign({}, desc.options), { logger: llmLogger }) }));
                                        if (!(llm.model === "AUTODETECT")) return [3 /*break*/, 14];
                                        _a.label = 10;
                                    case 10:
                                        _a.trys.push([10, 12, , 13]);
                                        return [4 /*yield*/, llm.listModels()];
                                    case 11:
                                        modelNames = _a.sent();
                                        models_2 = modelNames.map(function (modelName) {
                                            return new CustomLLM_1.default(__assign(__assign({}, desc), { options: __assign(__assign({}, desc.options), { model: modelName, logger: llmLogger, isFromAutoDetect: true }) }));
                                        });
                                        models_2.push.apply(models_2, models_2);
                                        return [3 /*break*/, 13];
                                    case 12:
                                        e_2 = _a.sent();
                                        console.warn("Error listing models: ", e_2);
                                        return [3 /*break*/, 13];
                                    case 13: return [3 /*break*/, 15];
                                    case 14:
                                        models.push(llm);
                                        _a.label = 15;
                                    case 15: return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 2:
                    _t.sent();
                    applyRequestOptionsToModels(models, config, [
                        "chat",
                        "apply",
                        "edit",
                        "summarize",
                    ]); // Default to chat role if not specified
                    warnAboutFreeTrial = false;
                    models = models.filter(function (model) { return model.providerName !== "free-trial"; });
                    if (models.filter(function (m) { return m.providerName === "free-trial"; }).length) {
                        warnAboutFreeTrial = true;
                    }
                    tabAutocompleteModels = [];
                    if (!config.tabAutocompleteModel) return [3 /*break*/, 4];
                    autocompleteConfigs = Array.isArray(config.tabAutocompleteModel)
                        ? config.tabAutocompleteModel
                        : [config.tabAutocompleteModel];
                    return [4 /*yield*/, Promise.all(autocompleteConfigs.map(function (desc) { return __awaiter(_this, void 0, void 0, function () {
                            var llm;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!("title" in desc)) return [3 /*break*/, 2];
                                        return [4 /*yield*/, (0, llms_1.llmFromDescription)(desc, ide.readFile.bind(ide), getUriFromPath, uniqueId, ideSettings, llmLogger, config.completionOptions)];
                                    case 1:
                                        llm = _a.sent();
                                        if (llm) {
                                            if (llm.providerName === "free-trial") {
                                                warnAboutFreeTrial = true;
                                            }
                                            else {
                                                tabAutocompleteModels.push(llm);
                                            }
                                        }
                                        return [3 /*break*/, 3];
                                    case 2:
                                        tabAutocompleteModels.push(new CustomLLM_1.default(desc));
                                        _a.label = 3;
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 3:
                    _t.sent();
                    _t.label = 4;
                case 4:
                    applyRequestOptionsToModels(tabAutocompleteModels, config);
                    _c = (0, loadContextProviders_1.loadConfigContextProviders)((_h = config.contextProviders) === null || _h === void 0 ? void 0 : _h.filter(function (cp) { return isContextProviderWithParams(cp); }).map(function (cp) { return ({
                        provider: cp.name,
                        params: cp.params,
                    }); }), !!((_j = config.docs) === null || _j === void 0 ? void 0 : _j.length), ideInfo.ideType), contextProviders = _c.providers, contextErrors = _c.errors;
                    for (_i = 0, _d = (_k = config.contextProviders) !== null && _k !== void 0 ? _k : []; _i < _d.length; _i++) {
                        cp = _d[_i];
                        if (!isContextProviderWithParams(cp)) {
                            contextProviders.push(new CustomContextProvider_1.default(cp));
                        }
                    }
                    errors.push.apply(errors, contextErrors);
                    newEmbedder = getEmbeddingsILLM(config.embeddingsProvider);
                    newReranker = getRerankingILLM(config.reranker);
                    if (warnAboutFreeTrial) {
                        errors.push({
                            fatal: false,
                            message: "Model provider 'free-trial' is no longer supported, will be ignored",
                        });
                    }
                    continueConfig = __assign(__assign({}, config), { contextProviders: contextProviders, tools: (0, tools_1.getBaseToolDefinitions)(), mcpServerStatuses: [], slashCommands: [], modelsByRole: {
                            chat: models,
                            edit: models,
                            apply: models,
                            summarize: models,
                            autocomplete: __spreadArray([], tabAutocompleteModels, true),
                            embed: newEmbedder ? [newEmbedder] : [],
                            rerank: newReranker ? [newReranker] : [],
                        }, selectedModelByRole: {
                            chat: null, // Not implemented (uses GUI defaultModel)
                            edit: null,
                            apply: null,
                            embed: newEmbedder !== null && newEmbedder !== void 0 ? newEmbedder : null,
                            autocomplete: null,
                            rerank: newReranker !== null && newReranker !== void 0 ? newReranker : null,
                            summarize: null, // Not implemented
                        }, rules: [] });
                    for (_e = 0, _f = (_l = config.slashCommands) !== null && _l !== void 0 ? _l : []; _e < _f.length; _e++) {
                        cmd = _f[_e];
                        if ("source" in cmd) {
                            continueConfig.slashCommands.push(cmd);
                        }
                        else {
                            continueConfig.slashCommands.push(__assign(__assign({}, cmd), { source: "config-ts-slash-command" }));
                        }
                    }
                    if (config.systemMessage) {
                        continueConfig.rules.unshift({
                            rule: config.systemMessage,
                            source: "json-systemMessage",
                        });
                    }
                    mcpManager = MCPManagerSingleton_1.MCPManagerSingleton.getInstance();
                    orgPolicy = PolicySingleton_1.PolicySingleton.getInstance().policy;
                    if (!(((_m = orgPolicy === null || orgPolicy === void 0 ? void 0 : orgPolicy.policy) === null || _m === void 0 ? void 0 : _m.allowMcpServers) === false)) return [3 /*break*/, 6];
                    return [4 /*yield*/, mcpManager.shutdown()];
                case 5:
                    _t.sent();
                    return [3 /*break*/, 8];
                case 6:
                    mcpOptions = ((_p = (_o = config.experimental) === null || _o === void 0 ? void 0 : _o.modelContextProtocolServers) !== null && _p !== void 0 ? _p : []).map(function (server, index) { return (__assign({ id: "continue-mcp-server-".concat(index + 1), name: "MCP Server", requestOptions: (0, config_yaml_1.mergeConfigYamlRequestOptions)(server.transport.type !== "stdio"
                            ? server.transport.requestOptions
                            : undefined, config.requestOptions) }, server.transport)); });
                    return [4 /*yield*/, (0, loadJsonMcpConfigs_1.loadJsonMcpConfigs)(ide, true, config.requestOptions)];
                case 7:
                    _g = _t.sent(), jsonMcpErrors = _g.errors, mcpServers = _g.mcpServers;
                    errors.push.apply(errors, jsonMcpErrors);
                    mcpOptions.push.apply(mcpOptions, mcpServers);
                    mcpManager.setConnections(mcpOptions, false);
                    _t.label = 8;
                case 8:
                    inlineEditModel = (_q = (0, util_2.getModelByRole)(continueConfig, "inlineEdit")) === null || _q === void 0 ? void 0 : _q.title;
                    if (inlineEditModel) {
                        match = continueConfig.modelsByRole.chat.find(function (m) { return m.title === inlineEditModel; });
                        if (match) {
                            continueConfig.selectedModelByRole.edit = match;
                            continueConfig.modelsByRole.edit = [match]; // The only option if inlineEdit role is set
                        }
                        else {
                            errors.push({
                                fatal: false,
                                message: "experimental.modelRoles.inlineEdit model title ".concat(inlineEditModel, " not found in models array"),
                            });
                        }
                    }
                    applyBlockModel = (_r = (0, util_2.getModelByRole)(continueConfig, "applyCodeBlock")) === null || _r === void 0 ? void 0 : _r.title;
                    if (applyBlockModel) {
                        match = continueConfig.modelsByRole.chat.find(function (m) { return m.title === applyBlockModel; });
                        if (match) {
                            continueConfig.selectedModelByRole.apply = match;
                            continueConfig.modelsByRole.apply = [match]; // The only option if applyCodeBlock role is set
                        }
                        else {
                            errors.push({
                                fatal: false,
                                message: "experimental.modelRoles.applyCodeBlock model title ".concat(inlineEditModel, " not found in models array"),
                            });
                        }
                    }
                    // Add transformers JS to the embed models list if not already added
                    if (ideInfo.ideType === "vscode" &&
                        !continueConfig.modelsByRole.embed.find(function (m) { return m.providerName === "transformers.js"; })) {
                        continueConfig.modelsByRole.embed.push(new TransformersJsEmbeddingsProvider_1.default());
                    }
                    return [2 /*return*/, { config: continueConfig, errors: errors }];
            }
        });
    });
}
function llmToSerializedModelDescription(llm) {
    var _a;
    return {
        provider: llm.providerName,
        underlyingProviderName: llm.underlyingProviderName,
        model: llm.model,
        title: (_a = llm.title) !== null && _a !== void 0 ? _a : llm.model,
        apiKey: llm.apiKey,
        apiBase: llm.apiBase,
        contextLength: llm.contextLength,
        template: llm.template,
        completionOptions: llm.completionOptions,
        baseAgentSystemMessage: llm.baseAgentSystemMessage,
        basePlanSystemMessage: llm.basePlanSystemMessage,
        baseChatSystemMessage: llm.baseChatSystemMessage,
        requestOptions: llm.requestOptions,
        promptTemplates: (0, util_2.serializePromptTemplates)(llm.promptTemplates),
        capabilities: llm.capabilities,
        roles: llm.roles,
        configurationStatus: llm.getConfigurationStatus(),
        apiKeyLocation: llm.apiKeyLocation,
        envSecretLocations: llm.envSecretLocations,
        sourceFile: llm.sourceFile,
        isFromAutoDetect: llm.isFromAutoDetect,
    };
}
function finalToBrowserConfig(final, ide) {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        var _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = {
                        allowAnonymousTelemetry: final.allowAnonymousTelemetry,
                        completionOptions: final.completionOptions,
                        slashCommands: (_b = final.slashCommands) === null || _b === void 0 ? void 0 : _b.map(function (_a) {
                            var run = _a.run, rest = __rest(_a, ["run"]);
                            return (__assign(__assign({}, rest), { isLegacy: !!run }));
                        }),
                        contextProviders: (_c = final.contextProviders) === null || _c === void 0 ? void 0 : _c.map(function (c) { return c.description; }),
                        disableIndexing: final.disableIndexing,
                        disableSessionTitles: final.disableSessionTitles,
                        userToken: final.userToken,
                        ui: final.ui,
                        experimental: final.experimental,
                        rules: final.rules,
                        docs: final.docs,
                        tools: final.tools.map(tools_1.serializeTool),
                        mcpServerStatuses: final.mcpServerStatuses,
                        tabAutocompleteOptions: final.tabAutocompleteOptions
                    };
                    return [4 /*yield*/, (0, env_1.useHub)(ide.getIdeSettings())];
                case 1: return [2 /*return*/, (_a.usePlatform = _d.sent(),
                        _a.modelsByRole = Object.fromEntries(Object.entries(final.modelsByRole).map(function (_a) {
                            var k = _a[0], v = _a[1];
                            return [
                                k,
                                v.map(llmToSerializedModelDescription),
                            ];
                        })),
                        _a.selectedModelByRole = Object.fromEntries(Object.entries(final.selectedModelByRole).map(function (_a) {
                            var k = _a[0], v = _a[1];
                            return [
                                k,
                                v ? llmToSerializedModelDescription(v) : null,
                            ];
                        })),
                        _a)];
            }
        });
    });
}
function escapeSpacesInPath(p) {
    return p.replace(/ /g, "\\ ");
}
function handleEsbuildInstallation(ide, ideType) {
    return __awaiter(this, void 0, void 0, function () {
        var globalContext, esbuildPath, shouldInstall;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // JetBrains is currently the only IDE that we've reached the plugin size limit and
                    // therefore need to install esbuild manually to reduce the size
                    if (ideType !== "jetbrains") {
                        return [2 /*return*/];
                    }
                    globalContext = new GlobalContext_1.GlobalContext();
                    if (globalContext.get("hasDismissedConfigTsNoticeJetBrains")) {
                        return [2 /*return*/];
                    }
                    esbuildPath = (0, paths_1.getEsbuildBinaryPath)();
                    if (fs.existsSync(esbuildPath)) {
                        return [2 /*return*/];
                    }
                    console.debug("No esbuild binary detected");
                    return [4 /*yield*/, promptEsbuildInstallation(ide)];
                case 1:
                    shouldInstall = _a.sent();
                    if (!shouldInstall) return [3 /*break*/, 3];
                    return [4 /*yield*/, downloadAndInstallEsbuild(ide)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function promptEsbuildInstallation(ide) {
    return __awaiter(this, void 0, void 0, function () {
        var installMsg, dismissMsg, res, globalContext;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    installMsg = "Install esbuild";
                    dismissMsg = "Dismiss";
                    return [4 /*yield*/, ide.showToast("warning", "You're using a custom 'config.ts' file, which requires 'esbuild' to be installed. Would you like to install it now?", dismissMsg, installMsg)];
                case 1:
                    res = _a.sent();
                    if (res === dismissMsg) {
                        globalContext = new GlobalContext_1.GlobalContext();
                        globalContext.update("hasDismissedConfigTsNoticeJetBrains", true);
                        return [2 /*return*/, false];
                    }
                    return [2 /*return*/, res === installMsg];
            }
        });
    });
}
/**
 * The download logic is adapted from here: https://esbuild.github.io/getting-started/#download-a-build
 */
function downloadAndInstallEsbuild(ide) {
    return __awaiter(this, void 0, void 0, function () {
        var esbuildPath, tempDir, target, version, url, tgzPath, destDir, extractedBinaryPath, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    esbuildPath = (0, paths_1.getEsbuildBinaryPath)();
                    tempDir = fs.mkdtempSync(path_1.default.join(os_1.default.tmpdir(), "esbuild-"));
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    target = "".concat(os_1.default.platform(), "-").concat(os_1.default.arch());
                    version = "0.19.11";
                    url = "https://registry.npmjs.org/@esbuild/".concat(target, "/-/").concat(target, "-").concat(version, ".tgz");
                    tgzPath = path_1.default.join(tempDir, "esbuild-".concat(version, ".tgz"));
                    console.debug("Downloading esbuild from: ".concat(url));
                    (0, child_process_1.execSync)("curl -fo \"".concat(tgzPath, "\" \"").concat(url, "\""));
                    console.debug("Extracting tgz file to: ".concat(tempDir));
                    return [4 /*yield*/, tar.x({
                            file: tgzPath,
                            cwd: tempDir,
                            strip: 2, // Remove the top two levels of directories
                        })];
                case 2:
                    _a.sent();
                    destDir = path_1.default.dirname(esbuildPath);
                    if (!fs.existsSync(destDir)) {
                        fs.mkdirSync(destDir, { recursive: true });
                    }
                    extractedBinaryPath = path_1.default.join(tempDir, "esbuild");
                    fs.renameSync(extractedBinaryPath, esbuildPath);
                    // Ensure the binary is executable (not needed on Windows)
                    if (os_1.default.platform() !== "win32") {
                        fs.chmodSync(esbuildPath, 493);
                    }
                    // Clean up
                    fs.unlinkSync(tgzPath);
                    fs.rmSync(tempDir, { recursive: true });
                    return [4 /*yield*/, ide.showToast("info", "'esbuild' successfully installed to ".concat(esbuildPath))];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.error("Error downloading or saving esbuild binary:", error_1);
                    throw error_1;
                case 5: return [2 /*return*/];
            }
        });
    });
}
function tryBuildConfigTs() {
    return __awaiter(this, void 0, void 0, function () {
        var e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    if (!(process.env.IS_BINARY === "true")) return [3 /*break*/, 2];
                    return [4 /*yield*/, buildConfigTsWithBinary()];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, buildConfigTsWithNodeModule()];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    e_3 = _a.sent();
                    console.log("Build error. Please check your ~/.continue/config.ts file: ".concat(e_3));
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function buildConfigTsWithBinary() {
    return __awaiter(this, void 0, void 0, function () {
        var cmd;
        return __generator(this, function (_a) {
            cmd = [
                escapeSpacesInPath((0, paths_1.getEsbuildBinaryPath)()),
                escapeSpacesInPath((0, paths_1.getConfigTsPath)()),
                "--bundle",
                "--outfile=".concat(escapeSpacesInPath((0, paths_1.getConfigJsPath)())),
                "--platform=node",
                "--format=cjs",
                "--sourcemap",
                "--external:fetch",
                "--external:fs",
                "--external:path",
                "--external:os",
                "--external:child_process",
            ].join(" ");
            (0, child_process_1.execSync)(cmd);
            return [2 /*return*/];
        });
    });
}
function buildConfigTsWithNodeModule() {
    return __awaiter(this, void 0, void 0, function () {
        var build;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require("esbuild"); })];
                case 1:
                    build = (_a.sent()).build;
                    return [4 /*yield*/, build({
                            entryPoints: [(0, paths_1.getConfigTsPath)()],
                            bundle: true,
                            platform: "node",
                            format: "cjs",
                            outfile: (0, paths_1.getConfigJsPath)(),
                            external: ["fetch", "fs", "path", "os", "child_process"],
                            sourcemap: true,
                        })];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function readConfigJs() {
    var configJsPath = (0, paths_1.getConfigJsPath)();
    if (!fs.existsSync(configJsPath)) {
        return undefined;
    }
    return fs.readFileSync(configJsPath, "utf8");
}
function buildConfigTsandReadConfigJs(ide, ideType) {
    return __awaiter(this, void 0, void 0, function () {
        var configTsPath, currentContent;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    configTsPath = (0, paths_1.getConfigTsPath)();
                    if (!fs.existsSync(configTsPath)) {
                        return [2 /*return*/];
                    }
                    currentContent = fs.readFileSync(configTsPath, "utf8");
                    // If the user hasn't modified the default config.ts, don't bother building
                    if (currentContent.trim() === paths_1.DEFAULT_CONFIG_TS_CONTENTS.trim()) {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, handleEsbuildInstallation(ide, ideType)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, tryBuildConfigTs()];
                case 2:
                    _a.sent();
                    return [2 /*return*/, readConfigJs()];
            }
        });
    });
}
function loadContinueConfigFromJson(ide, ideSettings, ideInfo, uniqueId, llmLogger, workOsAccessToken, overrideConfigJson) {
    return __awaiter(this, void 0, void 0, function () {
        var workspaceConfigs, _a, serialized, errors, configLoadInterrupted, sharedConfig, withShared, intermediate, configJsContents, configJsPath, module, e_4, e_5, e_6, configJsPathForRemote, module, e_7, _b, finalConfig, finalErrors;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, (0, loadRcConfigs_1.getWorkspaceRcConfigs)(ide)];
                case 1:
                    workspaceConfigs = _c.sent();
                    _a = loadSerializedConfig(workspaceConfigs, ideSettings, ideInfo.ideType, overrideConfigJson, ide), serialized = _a.config, errors = _a.errors, configLoadInterrupted = _a.configLoadInterrupted;
                    if (!serialized || configLoadInterrupted) {
                        return [2 /*return*/, { errors: errors, config: undefined, configLoadInterrupted: true }];
                    }
                    sharedConfig = new GlobalContext_1.GlobalContext().getSharedConfig();
                    withShared = (0, sharedConfig_1.modifyAnyConfigWithSharedConfig)(serialized, sharedConfig);
                    return [4 /*yield*/, serializedToIntermediateConfig(withShared, ide)];
                case 2:
                    intermediate = _c.sent();
                    return [4 /*yield*/, buildConfigTsandReadConfigJs(ide, ideInfo.ideType)];
                case 3:
                    configJsContents = _c.sent();
                    if (!configJsContents) return [3 /*break*/, 14];
                    _c.label = 4;
                case 4:
                    _c.trys.push([4, 13, , 14]);
                    configJsPath = (0, paths_1.getConfigJsPath)();
                    module = void 0;
                    _c.label = 5;
                case 5:
                    _c.trys.push([5, 7, , 12]);
                    return [4 /*yield*/, Promise.resolve("".concat(configJsPath)).then(function (s) { return require(s); })];
                case 6:
                    module = _c.sent();
                    return [3 /*break*/, 12];
                case 7:
                    e_4 = _c.sent();
                    console.log(e_4);
                    console.log("Could not load config.ts as absolute path, retrying as file url ...");
                    _c.label = 8;
                case 8:
                    _c.trys.push([8, 10, , 11]);
                    return [4 /*yield*/, Promise.resolve("".concat((0, pathToUri_1.localPathToUri)(configJsPath))).then(function (s) { return require(s); })];
                case 9:
                    module = _c.sent();
                    return [3 /*break*/, 11];
                case 10:
                    e_5 = _c.sent();
                    throw new Error("Could not load config.ts as file url either", {
                        cause: e_5,
                    });
                case 11: return [3 /*break*/, 12];
                case 12:
                    if (typeof require !== "undefined") {
                        delete require.cache[require.resolve(configJsPath)];
                    }
                    if (!module.modifyConfig) {
                        throw new Error("config.ts does not export a modifyConfig function.");
                    }
                    intermediate = module.modifyConfig(intermediate);
                    return [3 /*break*/, 14];
                case 13:
                    e_6 = _c.sent();
                    console.log("Error loading config.ts: ", e_6);
                    return [3 /*break*/, 14];
                case 14:
                    if (!ideSettings.remoteConfigServerUrl) return [3 /*break*/, 18];
                    _c.label = 15;
                case 15:
                    _c.trys.push([15, 17, , 18]);
                    configJsPathForRemote = (0, paths_1.getConfigJsPathForRemote)(ideSettings.remoteConfigServerUrl);
                    return [4 /*yield*/, Promise.resolve("".concat(configJsPathForRemote)).then(function (s) { return require(s); })];
                case 16:
                    module = _c.sent();
                    if (typeof require !== "undefined") {
                        delete require.cache[require.resolve(configJsPathForRemote)];
                    }
                    if (!module.modifyConfig) {
                        throw new Error("config.ts does not export a modifyConfig function.");
                    }
                    intermediate = module.modifyConfig(intermediate);
                    return [3 /*break*/, 18];
                case 17:
                    e_7 = _c.sent();
                    console.log("Error loading remotely set config.js: ", e_7);
                    return [3 /*break*/, 18];
                case 18: return [4 /*yield*/, intermediateToFinalConfig({
                        config: intermediate,
                        ide: ide,
                        ideSettings: ideSettings,
                        ideInfo: ideInfo,
                        uniqueId: uniqueId,
                        llmLogger: llmLogger,
                        workOsAccessToken: workOsAccessToken,
                    })];
                case 19:
                    _b = _c.sent(), finalConfig = _b.config, finalErrors = _b.errors;
                    return [2 /*return*/, {
                            config: finalConfig,
                            errors: __spreadArray(__spreadArray([], (errors !== null && errors !== void 0 ? errors : []), true), finalErrors, true),
                            configLoadInterrupted: false,
                        }];
            }
        });
    });
}
