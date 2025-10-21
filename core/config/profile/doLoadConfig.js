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
exports.default = doLoadConfig;
var fs_1 = require("fs");
var mcpSlashCommand_1 = require("../../commands/slash/mcpSlashCommand");
var ruleBlockSlashCommand_1 = require("../../commands/slash/ruleBlockSlashCommand");
var MCPManagerSingleton_1 = require("../../context/mcp/MCPManagerSingleton");
var MCPContextProvider_1 = require("../../context/providers/MCPContextProvider");
var env_js_1 = require("../../control-plane/env.js");
var PolicySingleton_1 = require("../../control-plane/PolicySingleton");
var TeamAnalytics_js_1 = require("../../control-plane/TeamAnalytics.js");
var initPrompt_1 = require("../../promptFiles/initPrompt");
var tools_1 = require("../../tools");
var callTool_1 = require("../../tools/callTool");
var mcpToolName_1 = require("../../tools/mcpToolName");
var GlobalContext_1 = require("../../util/GlobalContext");
var paths_1 = require("../../util/paths");
var pathToUri_1 = require("../../util/pathToUri");
var posthog_1 = require("../../util/posthog");
var SentryLogger_1 = require("../../util/sentry/SentryLogger");
var tts_1 = require("../../util/tts");
var getWorkspaceContinueRuleDotFiles_1 = require("../getWorkspaceContinueRuleDotFiles");
var load_1 = require("../load");
var loadCodebaseRules_1 = require("../markdown/loadCodebaseRules");
var loadMarkdownRules_1 = require("../markdown/loadMarkdownRules");
var migrateSharedConfig_1 = require("../migrateSharedConfig");
var selectedModels_1 = require("../selectedModels");
var loadYaml_1 = require("../yaml/loadYaml");
function loadRules(ide) {
    return __awaiter(this, void 0, void 0, function () {
        var rules, errors, _a, yamlRules, continueRulesErrors, _b, markdownRules, markdownRulesErrors, codebaseRulesCache;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    rules = [];
                    errors = [];
                    return [4 /*yield*/, (0, getWorkspaceContinueRuleDotFiles_1.getWorkspaceContinueRuleDotFiles)(ide)];
                case 1:
                    _a = _c.sent(), yamlRules = _a.rules, continueRulesErrors = _a.errors;
                    rules.unshift.apply(rules, yamlRules);
                    errors.push.apply(errors, continueRulesErrors);
                    return [4 /*yield*/, (0, loadMarkdownRules_1.loadMarkdownRules)(ide)];
                case 2:
                    _b = _c.sent(), markdownRules = _b.rules, markdownRulesErrors = _b.errors;
                    rules.unshift.apply(rules, markdownRules);
                    errors.push.apply(errors, markdownRulesErrors);
                    codebaseRulesCache = loadCodebaseRules_1.CodebaseRulesCache.getInstance();
                    rules.unshift.apply(rules, codebaseRulesCache.rules);
                    errors.push.apply(errors, codebaseRulesCache.errors);
                    return [2 /*return*/, { rules: rules, errors: errors }];
            }
        });
    });
}
function doLoadConfig(options) {
    return __awaiter(this, void 0, void 0, function () {
        var ide, controlPlaneClient, llmLogger, overrideConfigJson, overrideConfigYaml, profileId, overrideConfigYamlByPath, orgScopeId, packageIdentifier, ideInfo, uniqueId, ideSettings, workOsAccessToken, isSignedIn, configJsonPath, configYamlPath, newConfig, errors, configLoadInterrupted, result, result, _a, rules, rulesErrors, _i, _b, rule, slashCommand, proxyContextProvider, globalContext, mcpManager, mcpServerStatuses, serializableStatuses, _loop_1, _c, mcpServerStatuses_1, server, _d, _e, _f, _g, counts, ruleCounts, policy, _h, _j, _k, userEmail, sessionInfo, error_1, _l, _m, _o, controlPlane, useOnPremProxy, env, controlPlaneProxyUrl, controlPlaneProxyInfo;
        var _p, _q, _r;
        var _this = this;
        var _s, _t, _u, _v, _w, _x, _y, _z, _0;
        return __generator(this, function (_1) {
            switch (_1.label) {
                case 0:
                    ide = options.ide, controlPlaneClient = options.controlPlaneClient, llmLogger = options.llmLogger, overrideConfigJson = options.overrideConfigJson, overrideConfigYaml = options.overrideConfigYaml, profileId = options.profileId, overrideConfigYamlByPath = options.overrideConfigYamlByPath, orgScopeId = options.orgScopeId, packageIdentifier = options.packageIdentifier;
                    return [4 /*yield*/, ide.getIdeInfo()];
                case 1:
                    ideInfo = _1.sent();
                    return [4 /*yield*/, ide.getUniqueId()];
                case 2:
                    uniqueId = _1.sent();
                    return [4 /*yield*/, ide.getIdeSettings()];
                case 3:
                    ideSettings = _1.sent();
                    return [4 /*yield*/, controlPlaneClient.getAccessToken()];
                case 4:
                    workOsAccessToken = _1.sent();
                    return [4 /*yield*/, controlPlaneClient.isSignedIn()];
                case 5:
                    isSignedIn = _1.sent();
                    configJsonPath = (0, paths_1.getConfigJsonPath)();
                    if (fs_1.default.existsSync(configJsonPath)) {
                        (0, migrateSharedConfig_1.migrateJsonSharedConfig)(configJsonPath, ide);
                    }
                    configYamlPath = (0, pathToUri_1.localPathOrUriToPath)(overrideConfigYamlByPath || (0, paths_1.getConfigYamlPath)(ideInfo.ideType));
                    configLoadInterrupted = false;
                    if (!(overrideConfigYaml || fs_1.default.existsSync(configYamlPath))) return [3 /*break*/, 7];
                    return [4 /*yield*/, (0, loadYaml_1.loadContinueConfigFromYaml)({
                            ide: ide,
                            ideSettings: ideSettings,
                            ideInfo: ideInfo,
                            uniqueId: uniqueId,
                            llmLogger: llmLogger,
                            overrideConfigYaml: overrideConfigYaml,
                            controlPlaneClient: controlPlaneClient,
                            orgScopeId: orgScopeId,
                            packageIdentifier: packageIdentifier,
                            workOsAccessToken: workOsAccessToken,
                        })];
                case 6:
                    result = _1.sent();
                    newConfig = result.config;
                    errors = result.errors;
                    configLoadInterrupted = result.configLoadInterrupted;
                    return [3 /*break*/, 9];
                case 7: return [4 /*yield*/, (0, load_1.loadContinueConfigFromJson)(ide, ideSettings, ideInfo, uniqueId, llmLogger, workOsAccessToken, overrideConfigJson)];
                case 8:
                    result = _1.sent();
                    newConfig = result.config;
                    errors = result.errors;
                    configLoadInterrupted = result.configLoadInterrupted;
                    _1.label = 9;
                case 9:
                    if (configLoadInterrupted || !newConfig) {
                        return [2 /*return*/, { errors: errors, config: newConfig, configLoadInterrupted: true }];
                    }
                    // TODO using config result but result with non-fatal errors is an antipattern?
                    // Remove ability have undefined errors, just have an array
                    errors = __spreadArray([], (errors !== null && errors !== void 0 ? errors : []), true);
                    return [4 /*yield*/, loadRules(ide)];
                case 10:
                    _a = _1.sent(), rules = _a.rules, rulesErrors = _a.errors;
                    errors.push.apply(errors, rulesErrors);
                    (_p = newConfig.rules).unshift.apply(_p, rules);
                    // Convert invokable rules to slash commands
                    for (_i = 0, _b = newConfig.rules; _i < _b.length; _i++) {
                        rule = _b[_i];
                        if (rule.invokable) {
                            try {
                                slashCommand = (0, ruleBlockSlashCommand_1.convertRuleBlockToSlashCommand)(rule);
                                ((_s = newConfig.slashCommands) !== null && _s !== void 0 ? _s : (newConfig.slashCommands = [])).push(slashCommand);
                            }
                            catch (e) {
                                errors.push({
                                    message: "Error converting invokable rule ".concat(rule.name, " to slash command: ").concat(e instanceof Error ? e.message : e),
                                    fatal: false,
                                });
                            }
                        }
                    }
                    newConfig.slashCommands.push(initPrompt_1.initSlashCommand);
                    proxyContextProvider = (_t = newConfig.contextProviders) === null || _t === void 0 ? void 0 : _t.find(function (cp) { return cp.description.title === "continue-proxy"; });
                    if (proxyContextProvider) {
                        proxyContextProvider.workOsAccessToken =
                            workOsAccessToken;
                    }
                    globalContext = new GlobalContext_1.GlobalContext();
                    newConfig.contextProviders.forEach(function (provider) {
                        var _a;
                        var _b;
                        if (provider.deprecationMessage) {
                            var providerTitle = provider.description.title;
                            var shownWarnings = (_b = globalContext.get("shownDeprecatedProviderWarnings")) !== null && _b !== void 0 ? _b : {};
                            if (!shownWarnings[providerTitle]) {
                                void ide.showToast("warning", provider.deprecationMessage);
                                globalContext.update("shownDeprecatedProviderWarnings", __assign(__assign({}, shownWarnings), (_a = {}, _a[providerTitle] = true, _a)));
                            }
                        }
                    });
                    // Rectify model selections for each role
                    newConfig = (0, selectedModels_1.rectifySelectedModelsFromGlobalContext)(newConfig, profileId);
                    mcpManager = MCPManagerSingleton_1.MCPManagerSingleton.getInstance();
                    mcpServerStatuses = mcpManager.getStatuses();
                    serializableStatuses = mcpServerStatuses.map(function (server) {
                        var client = server.client, rest = __rest(server, ["client"]);
                        return rest;
                    });
                    newConfig.mcpServerStatuses = serializableStatuses;
                    _loop_1 = function (server) {
                        var serverTools, serverSlashCommands, submenuItems, serverContextProvider;
                        var _2, _3;
                        return __generator(this, function (_4) {
                            switch (_4.label) {
                                case 0:
                                    server.errors.forEach(function (error) {
                                        // MCP errors will also show as config loading errors
                                        errors.push({
                                            fatal: false,
                                            message: error,
                                        });
                                    });
                                    if (!(server.status === "connected")) return [3 /*break*/, 2];
                                    serverTools = server.tools.map(function (tool) { return ({
                                        displayTitle: server.name + " " + tool.name,
                                        function: {
                                            description: tool.description,
                                            name: (0, mcpToolName_1.getMCPToolName)(server, tool),
                                            parameters: tool.inputSchema,
                                        },
                                        faviconUrl: server.faviconUrl,
                                        readonly: false,
                                        type: "function",
                                        uri: (0, callTool_1.encodeMCPToolUri)(server.id, tool.name),
                                        group: server.name,
                                        originalFunctionName: tool.name,
                                    }); });
                                    (_2 = newConfig.tools).push.apply(_2, serverTools);
                                    return [4 /*yield*/, Promise.all(server.prompts.map(function (prompt) { return __awaiter(_this, void 0, void 0, function () {
                                            var promptContent, mcpPromptResponse, error_2;
                                            var _a;
                                            return __generator(this, function (_b) {
                                                switch (_b.label) {
                                                    case 0:
                                                        _b.trys.push([0, 2, , 3]);
                                                        return [4 /*yield*/, mcpManager.getPrompt(server.name, prompt.name, {})];
                                                    case 1:
                                                        mcpPromptResponse = _b.sent();
                                                        promptContent = (0, mcpSlashCommand_1.stringifyMcpPrompt)(mcpPromptResponse);
                                                        return [3 /*break*/, 3];
                                                    case 2:
                                                        error_2 = _b.sent();
                                                        console.warn("Failed to fetch MCP prompt content for ".concat(prompt.name, " from server ").concat(server.name, ":"), error_2);
                                                        return [3 /*break*/, 3];
                                                    case 3: return [2 /*return*/, {
                                                            name: prompt.name,
                                                            description: (_a = prompt.description) !== null && _a !== void 0 ? _a : "MCP Prompt",
                                                            source: "mcp-prompt",
                                                            isLegacy: false,
                                                            prompt: promptContent, // Store the actual prompt content
                                                            mcpServerName: server.name, // Used in client to retrieve prompt
                                                            mcpArgs: prompt.arguments,
                                                        }];
                                                }
                                            });
                                        }); }))];
                                case 1:
                                    serverSlashCommands = _4.sent();
                                    (_3 = newConfig.slashCommands).push.apply(_3, serverSlashCommands);
                                    submenuItems = server.resources
                                        .map(function (resource) {
                                        var _a;
                                        return ({
                                            title: resource.name,
                                            description: (_a = resource.description) !== null && _a !== void 0 ? _a : resource.name,
                                            id: resource.uri,
                                            icon: server.faviconUrl,
                                        });
                                    })
                                        .concat(server.resourceTemplates.map(function (template) {
                                        var _a;
                                        return ({
                                            title: template.name,
                                            description: (_a = template.description) !== null && _a !== void 0 ? _a : template.name,
                                            id: template.uriTemplate,
                                            icon: server.faviconUrl,
                                        });
                                    }));
                                    if (submenuItems.length > 0) {
                                        serverContextProvider = new MCPContextProvider_1.default({
                                            submenuItems: submenuItems,
                                            mcpId: server.id,
                                            serverName: server.name,
                                        });
                                        newConfig.contextProviders.push(serverContextProvider);
                                    }
                                    _4.label = 2;
                                case 2: return [2 /*return*/];
                            }
                        });
                    };
                    _c = 0, mcpServerStatuses_1 = mcpServerStatuses;
                    _1.label = 11;
                case 11:
                    if (!(_c < mcpServerStatuses_1.length)) return [3 /*break*/, 14];
                    server = mcpServerStatuses_1[_c];
                    return [5 /*yield**/, _loop_1(server)];
                case 12:
                    _1.sent();
                    _1.label = 13;
                case 13:
                    _c++;
                    return [3 /*break*/, 11];
                case 14:
                    _e = (_d = (_q = newConfig.tools).push).apply;
                    _f = [_q];
                    _g = tools_1.getConfigDependentToolDefinitions;
                    _r = {
                        rules: newConfig.rules,
                        enableExperimentalTools: (_v = (_u = newConfig.experimental) === null || _u === void 0 ? void 0 : _u.enableExperimentalTools) !== null && _v !== void 0 ? _v : false,
                        isSignedIn: isSignedIn
                    };
                    return [4 /*yield*/, ide.isWorkspaceRemote()];
                case 15:
                    _e.apply(_d, _f.concat([_g.apply(void 0, [(_r.isRemote = _1.sent(),
                                _r.modelName = (_w = newConfig.selectedModelByRole.chat) === null || _w === void 0 ? void 0 : _w.model,
                                _r)])]));
                    counts = {};
                    newConfig.tools.forEach(function (tool) {
                        if (counts[tool.function.name]) {
                            counts[tool.function.name] = counts[tool.function.name] + 1;
                        }
                        else {
                            counts[tool.function.name] = 1;
                        }
                    });
                    Object.entries(counts).forEach(function (_a) {
                        var toolName = _a[0], count = _a[1];
                        if (count > 1) {
                            errors.push({
                                fatal: false,
                                message: "Duplicate (".concat(count, ") tools named \"").concat(toolName, "\" detected. Permissions will conflict and usage may be unpredictable"),
                            });
                        }
                    });
                    ruleCounts = {};
                    newConfig.rules.forEach(function (rule) {
                        if (rule.name) {
                            if (ruleCounts[rule.name]) {
                                ruleCounts[rule.name] = ruleCounts[rule.name] + 1;
                            }
                            else {
                                ruleCounts[rule.name] = 1;
                            }
                        }
                    });
                    Object.entries(ruleCounts).forEach(function (_a) {
                        var ruleName = _a[0], count = _a[1];
                        if (count > 1) {
                            errors.push({
                                fatal: false,
                                message: "Duplicate (".concat(count, ") rules named \"").concat(ruleName, "\" detected. This may cause unexpected behavior"),
                            });
                        }
                    });
                    if (!(newConfig.allowAnonymousTelemetry !== false)) return [3 /*break*/, 17];
                    return [4 /*yield*/, ide.isTelemetryEnabled()];
                case 16:
                    if ((_1.sent()) === false) {
                        newConfig.allowAnonymousTelemetry = false;
                    }
                    _1.label = 17;
                case 17:
                    policy = (_x = PolicySingleton_1.PolicySingleton.getInstance().policy) === null || _x === void 0 ? void 0 : _x.policy;
                    if ((policy === null || policy === void 0 ? void 0 : policy.allowAnonymousTelemetry) === false) {
                        newConfig.allowAnonymousTelemetry = false;
                    }
                    if ((policy === null || policy === void 0 ? void 0 : policy.allowCodebaseIndexing) === false) {
                        newConfig.disableIndexing = true;
                    }
                    _j = (_h = posthog_1.Telemetry).setup;
                    _k = [(_y = newConfig.allowAnonymousTelemetry) !== null && _y !== void 0 ? _y : true];
                    return [4 /*yield*/, ide.getUniqueId()];
                case 18: 
                // Setup telemetry only after (and if) we know it is enabled
                return [4 /*yield*/, _j.apply(_h, _k.concat([_1.sent(), ideInfo]))];
                case 19:
                    // Setup telemetry only after (and if) we know it is enabled
                    _1.sent();
                    _1.label = 20;
                case 20:
                    _1.trys.push([20, 22, , 23]);
                    return [4 /*yield*/, controlPlaneClient.sessionInfoPromise];
                case 21:
                    sessionInfo = _1.sent();
                    userEmail = (_z = sessionInfo === null || sessionInfo === void 0 ? void 0 : sessionInfo.account) === null || _z === void 0 ? void 0 : _z.id;
                    return [3 /*break*/, 23];
                case 22:
                    error_1 = _1.sent();
                    return [3 /*break*/, 23];
                case 23:
                    _m = (_l = SentryLogger_1.SentryLogger).setup;
                    _o = [(_0 = newConfig.allowAnonymousTelemetry) !== null && _0 !== void 0 ? _0 : false];
                    return [4 /*yield*/, ide.getUniqueId()];
                case 24: return [4 /*yield*/, _m.apply(_l, _o.concat([_1.sent(), ideInfo,
                        userEmail]))];
                case 25:
                    _1.sent();
                    // TODO: pass config to pre-load non-system TTS models
                    return [4 /*yield*/, tts_1.TTS.setup()];
                case 26:
                    // TODO: pass config to pre-load non-system TTS models
                    _1.sent();
                    controlPlane = newConfig.controlPlane;
                    useOnPremProxy = (controlPlane === null || controlPlane === void 0 ? void 0 : controlPlane.useContinueForTeamsProxy) === false && (controlPlane === null || controlPlane === void 0 ? void 0 : controlPlane.proxyUrl);
                    return [4 /*yield*/, (0, env_js_1.getControlPlaneEnv)(Promise.resolve(ideSettings))];
                case 27:
                    env = _1.sent();
                    controlPlaneProxyUrl = useOnPremProxy
                        ? controlPlane === null || controlPlane === void 0 ? void 0 : controlPlane.proxyUrl
                        : env.DEFAULT_CONTROL_PLANE_PROXY_URL;
                    if (!controlPlaneProxyUrl.endsWith("/")) {
                        controlPlaneProxyUrl += "/";
                    }
                    controlPlaneProxyInfo = {
                        profileId: profileId,
                        controlPlaneProxyUrl: controlPlaneProxyUrl,
                        workOsAccessToken: workOsAccessToken,
                    };
                    if (!newConfig.analytics) return [3 /*break*/, 28];
                    return [3 /*break*/, 30];
                case 28: return [4 /*yield*/, TeamAnalytics_js_1.TeamAnalytics.shutdown()];
                case 29:
                    _1.sent();
                    _1.label = 30;
                case 30: return [4 /*yield*/, injectControlPlaneProxyInfo(newConfig, controlPlaneProxyInfo)];
                case 31:
                    newConfig = _1.sent();
                    return [2 /*return*/, { config: newConfig, errors: errors, configLoadInterrupted: false }];
            }
        });
    });
}
// Pass ControlPlaneProxyInfo to objects that need it
function injectControlPlaneProxyInfo(config, info) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            Object.keys(config.modelsByRole).forEach(function (key) {
                config.modelsByRole[key].forEach(function (model) {
                    if (model.providerName === "continue-proxy") {
                        model.controlPlaneProxyInfo = info;
                    }
                });
            });
            Object.keys(config.selectedModelByRole).forEach(function (key) {
                var model = config.selectedModelByRole[key];
                if ((model === null || model === void 0 ? void 0 : model.providerName) === "continue-proxy") {
                    model.controlPlaneProxyInfo = info;
                }
            });
            config.modelsByRole.chat.forEach(function (model) {
                if (model.providerName === "continue-proxy") {
                    model.controlPlaneProxyInfo = info;
                }
            });
            return [2 /*return*/, config];
        });
    });
}
