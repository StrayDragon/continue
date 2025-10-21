"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function () { return this; }, i;
    function awaitReturn(f) { return function (v) { return Promise.resolve(v).then(f, reject); }; }
    function verb(n, f) { if (g[n]) { i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; if (f) i[n] = f(i[n]); } }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseLLM = exports.LLMError = void 0;
exports.isModelInstaller = isModelInstaller;
var fetch_1 = require("@continuedev/fetch");
var llm_info_1 = require("@continuedev/llm-info");
var openai_adapters_1 = require("@continuedev/openai-adapters");
var handlebars_1 = require("handlebars");
var devdataSqlite_js_1 = require("../data/devdataSqlite.js");
var log_js_1 = require("../data/log.js");
var lemonadeHelper_js_1 = require("../util/lemonadeHelper.js");
var Logger_js_1 = require("../util/Logger.js");
var merge_js_1 = require("../util/merge.js");
var messageContent_js_1 = require("../util/messageContent.js");
var ollamaHelper_js_1 = require("../util/ollamaHelper.js");
var TokensBatchingService_js_1 = require("../util/TokensBatchingService.js");
var withExponentialBackoff_js_1 = require("../util/withExponentialBackoff.js");
var autodetect_js_1 = require("./autodetect.js");
var constants_js_1 = require("./constants.js");
var countTokens_js_1 = require("./countTokens.js");
var openaiTypeConverters_js_1 = require("./openaiTypeConverters.js");
var LLMError = /** @class */ (function (_super) {
    __extends(LLMError, _super);
    function LLMError(message, llm) {
        var _this = _super.call(this, message) || this;
        _this.llm = llm;
        return _this;
    }
    return LLMError;
}(Error));
exports.LLMError = LLMError;
function isModelInstaller(provider) {
    return (provider &&
        typeof provider.installModel === "function" &&
        typeof provider.isInstallingModel === "function");
}
var BaseLLM = /** @class */ (function () {
    function BaseLLM(_options) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        this.useOpenAIAdapterFor = [];
        this._llmOptions = _options;
        this.lastRequestId = undefined;
        // Set default options
        var options = __assign(__assign({ title: this.constructor.providerName }, this.constructor.defaultOptions), _options);
        this.model = options.model;
        // Use @continuedev/llm-info package to autodetect certain parameters
        var modelSearchString = this.providerName === "continue-proxy"
            ? ((_a = this.model) === null || _a === void 0 ? void 0 : _a.split("/").pop()) || this.model
            : this.model;
        var llmInfo = (0, llm_info_1.findLlmInfo)(modelSearchString, this.underlyingProviderName);
        var templateType = (_b = options.template) !== null && _b !== void 0 ? _b : (0, autodetect_js_1.autodetectTemplateType)(options.model);
        this.title = options.title;
        this.uniqueId = (_c = options.uniqueId) !== null && _c !== void 0 ? _c : "None";
        this.baseAgentSystemMessage = options.baseAgentSystemMessage;
        this.basePlanSystemMessage = options.basePlanSystemMessage;
        this.baseChatSystemMessage = options.baseChatSystemMessage;
        this._contextLength = (_d = options.contextLength) !== null && _d !== void 0 ? _d : llmInfo === null || llmInfo === void 0 ? void 0 : llmInfo.contextLength;
        this.maxStopWords = (_e = options.maxStopWords) !== null && _e !== void 0 ? _e : this.maxStopWords;
        this.completionOptions = __assign(__assign({}, options.completionOptions), { model: options.model || "gpt-4", maxTokens: (_g = (_f = options.completionOptions) === null || _f === void 0 ? void 0 : _f.maxTokens) !== null && _g !== void 0 ? _g : ((llmInfo === null || llmInfo === void 0 ? void 0 : llmInfo.maxCompletionTokens)
                ? Math.min(llmInfo.maxCompletionTokens, 
                // Even if the model has a large maxTokens, we don't want to use that every time,
                // because it takes away from the context length
                this.contextLength / 4)
                : constants_js_1.DEFAULT_MAX_TOKENS) });
        this.requestOptions = options.requestOptions;
        this.promptTemplates = __assign(__assign({}, (0, autodetect_js_1.autodetectPromptTemplates)(options.model, templateType)), options.promptTemplates);
        this.templateMessages =
            (_j = (_h = options.templateMessages) !== null && _h !== void 0 ? _h : (0, autodetect_js_1.autodetectTemplateFunction)(options.model, this.providerName, options.template)) !== null && _j !== void 0 ? _j : undefined;
        this.logger = options.logger;
        this.llmRequestHook = options.llmRequestHook;
        this.apiKey = options.apiKey;
        // continueProperties
        this.apiKeyLocation = options.apiKeyLocation;
        this.envSecretLocations = options.envSecretLocations;
        this.orgScopeId = options.orgScopeId;
        this.apiBase = options.apiBase;
        this.onPremProxyUrl = options.onPremProxyUrl;
        this.aiGatewaySlug = options.aiGatewaySlug;
        this.cacheBehavior = options.cacheBehavior;
        // watsonx deploymentId
        this.deploymentId = options.deploymentId;
        if (this.apiBase && !this.apiBase.endsWith("/")) {
            this.apiBase = "".concat(this.apiBase, "/");
        }
        this.accountId = options.accountId;
        this.capabilities = options.capabilities;
        this.roles = options.roles;
        this.deployment = options.deployment;
        this.apiVersion = options.apiVersion;
        this.apiType = options.apiType;
        this.region = options.region;
        this.projectId = options.projectId;
        this.profile = options.profile;
        this.accessKeyId = options.accessKeyId;
        this.secretAccessKey = options.secretAccessKey;
        this.openaiAdapter = this.createOpenAiAdapter();
        this.maxEmbeddingBatchSize =
            (_k = options.maxEmbeddingBatchSize) !== null && _k !== void 0 ? _k : constants_js_1.DEFAULT_MAX_BATCH_SIZE;
        this.maxEmbeddingChunkSize =
            (_l = options.maxEmbeddingChunkSize) !== null && _l !== void 0 ? _l : constants_js_1.DEFAULT_MAX_CHUNK_SIZE;
        this.embeddingId = "".concat(this.constructor.name, "::").concat(this.model, "::").concat(this.maxEmbeddingChunkSize);
        this.autocompleteOptions = options.autocompleteOptions;
        this.sourceFile = options.sourceFile;
        this.isFromAutoDetect = options.isFromAutoDetect;
    }
    Object.defineProperty(BaseLLM.prototype, "providerName", {
        get: function () {
            return this.constructor.providerName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseLLM.prototype, "underlyingProviderName", {
        /**
         * This exists because for the continue-proxy, sometimes we want to get the value of the underlying provider that is used on the server
         * For example, the underlying provider should always be sent with dev data
         */
        get: function () {
            return this.providerName;
        },
        enumerable: false,
        configurable: true
    });
    BaseLLM.prototype.supportsFim = function () {
        return false;
    };
    BaseLLM.prototype.supportsImages = function () {
        return (0, autodetect_js_1.modelSupportsImages)(this.providerName, this.model, this.title, this.capabilities);
    };
    BaseLLM.prototype.supportsCompletions = function () {
        var _a, _b, _c, _d, _e;
        if (["openai", "azure"].includes(this.providerName)) {
            if (((_a = this.apiBase) === null || _a === void 0 ? void 0 : _a.includes("api.groq.com")) ||
                ((_b = this.apiBase) === null || _b === void 0 ? void 0 : _b.includes("api.mistral.ai")) ||
                ((_c = this.apiBase) === null || _c === void 0 ? void 0 : _c.includes(":1337")) ||
                ((_d = this.apiBase) === null || _d === void 0 ? void 0 : _d.includes("integrate.api.nvidia.com")) ||
                ((_e = this._llmOptions.useLegacyCompletionsEndpoint) === null || _e === void 0 ? void 0 : _e.valueOf()) === false) {
                // Jan + Groq + Mistral don't support completions : (
                // Seems to be going out of style...
                return false;
            }
        }
        if (["groq", "mistral", "deepseek"].includes(this.providerName)) {
            return false;
        }
        return true;
    };
    BaseLLM.prototype.supportsPrefill = function () {
        return ["ollama", "anthropic", "mistral"].includes(this.providerName);
    };
    Object.defineProperty(BaseLLM.prototype, "contextLength", {
        get: function () {
            var _a;
            return (_a = this._contextLength) !== null && _a !== void 0 ? _a : constants_js_1.DEFAULT_CONTEXT_LENGTH;
        },
        enumerable: false,
        configurable: true
    });
    BaseLLM.prototype.getConfigurationStatus = function () {
        return constants_js_1.LLMConfigurationStatuses.VALID;
    };
    BaseLLM.prototype.createOpenAiAdapter = function () {
        var _a;
        return (0, openai_adapters_1.constructLlmApi)({
            provider: this.providerName,
            apiKey: (_a = this.apiKey) !== null && _a !== void 0 ? _a : "",
            apiBase: this.apiBase,
            requestOptions: this.requestOptions,
            env: this._llmOptions.env,
        });
    };
    BaseLLM.prototype.listModels = function () {
        return Promise.resolve([]);
    };
    BaseLLM.prototype._templatePromptLikeMessages = function (prompt) {
        if (!this.templateMessages) {
            return prompt;
        }
        // NOTE system message no longer supported here
        var msgs = [{ role: "user", content: prompt }];
        return this.templateMessages(msgs);
    };
    BaseLLM.prototype._logEnd = function (model, prompt, completion, thinking, interaction, usage, error) {
        var _a;
        var promptTokens = this.countTokens(prompt);
        var generatedTokens = this.countTokens(completion);
        var thinkingTokens = thinking ? this.countTokens(thinking) : 0;
        TokensBatchingService_js_1.TokensBatchingService.getInstance().addTokens(model, this.providerName, promptTokens, generatedTokens);
        void devdataSqlite_js_1.DevDataSqliteDb.logTokensGenerated(model, this.providerName, promptTokens, generatedTokens);
        void log_js_1.DataLogger.getInstance().logDevData({
            name: "tokensGenerated",
            data: {
                model: model,
                provider: this.underlyingProviderName,
                promptTokens: promptTokens,
                generatedTokens: generatedTokens,
            },
        });
        if (typeof error === "undefined") {
            interaction === null || interaction === void 0 ? void 0 : interaction.logItem({
                kind: "success",
                promptTokens: promptTokens,
                generatedTokens: generatedTokens,
                thinkingTokens: thinkingTokens,
                usage: usage,
            });
            return "success";
        }
        else {
            if (error === "cancel" || ((_a = error === null || error === void 0 ? void 0 : error.name) === null || _a === void 0 ? void 0 : _a.includes("AbortError"))) {
                interaction === null || interaction === void 0 ? void 0 : interaction.logItem({
                    kind: "cancel",
                    promptTokens: promptTokens,
                    generatedTokens: generatedTokens,
                    thinkingTokens: thinkingTokens,
                    usage: usage,
                });
                return "cancelled";
            }
            else {
                console.log(error);
                interaction === null || interaction === void 0 ? void 0 : interaction.logItem({
                    kind: "error",
                    name: error.name,
                    message: error.message,
                    promptTokens: promptTokens,
                    generatedTokens: generatedTokens,
                    thinkingTokens: thinkingTokens,
                    usage: usage,
                });
                return "error";
            }
        }
    };
    BaseLLM.prototype.parseError = function (resp) {
        return __awaiter(this, void 0, void 0, function () {
            var text, parsedError, errorMessageRaw, error, model;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, resp.text()];
                    case 1:
                        text = _c.sent();
                        if (resp.status === 404 && !resp.url.includes("/v1")) {
                            parsedError = JSON.parse(text);
                            errorMessageRaw = (_a = parsedError === null || parsedError === void 0 ? void 0 : parsedError.error) !== null && _a !== void 0 ? _a : parsedError === null || parsedError === void 0 ? void 0 : parsedError.message;
                            error = typeof errorMessageRaw === "string"
                                ? errorMessageRaw.replace(/"/g, "'")
                                : undefined;
                            model = (_b = error === null || error === void 0 ? void 0 : error.match(/model '(.*)' not found/)) === null || _b === void 0 ? void 0 : _b[1];
                            if (model && resp.url.match("127.0.0.1:11434")) {
                                text = "The model \"".concat(model, "\" was not found. To download it, run `ollama run ").concat(model, "`.");
                                return [2 /*return*/, new LLMError(text, this)]; // No need to add HTTP status details
                            }
                            else if (text.includes("/api/chat")) {
                                text =
                                    "The /api/chat endpoint was not found. This may mean that you are using an older version of Ollama that does not support /api/chat. Upgrading to the latest version will solve the issue.";
                            }
                            else {
                                text =
                                    "This may mean that you forgot to add '/v1' to the end of your 'apiBase' in config.json.";
                            }
                        }
                        else if (resp.status === 404 && resp.url.includes("api.openai.com")) {
                            text =
                                "You may need to add pre-paid credits before using the OpenAI API.";
                        }
                        else if (resp.status === 401 &&
                            (resp.url.includes("api.mistral.ai") ||
                                resp.url.includes("codestral.mistral.ai"))) {
                            if (resp.url.includes("codestral.mistral.ai")) {
                                return [2 /*return*/, new Error("You are using a Mistral API key, which is not compatible with the Codestral API. Please either obtain a Codestral API key, or use the Mistral API by setting 'apiBase' to 'https://api.mistral.ai/v1' in config.json.")];
                            }
                            else {
                                return [2 /*return*/, new Error("You are using a Codestral API key, which is not compatible with the Mistral API. Please either obtain a Mistral API key, or use the the Codestral API by setting 'apiBase' to 'https://codestral.mistral.ai/v1' in config.json.")];
                            }
                        }
                        return [2 /*return*/, new Error("HTTP ".concat(resp.status, " ").concat(resp.statusText, " from ").concat(resp.url, "\n\n").concat(text))];
                }
            });
        });
    };
    BaseLLM.prototype.fetch = function (url, init) {
        var _this = this;
        // Custom Node.js fetch
        var customFetch = function (input, init) { return __awaiter(_this, void 0, void 0, function () {
            var resp, error, e_1, message, isInstalled, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 11]);
                        return [4 /*yield*/, (0, fetch_1.fetchwithRequestOptions)(new URL(input), __assign({}, init), __assign({}, this.requestOptions))];
                    case 1:
                        resp = _a.sent();
                        if (!!resp.ok) return [3 /*break*/, 3];
                        if (resp.status === 499) {
                            return [2 /*return*/, resp]; // client side cancellation
                        }
                        return [4 /*yield*/, this.parseError(resp)];
                    case 2:
                        error = _a.sent();
                        throw error;
                    case 3: return [2 /*return*/, resp];
                    case 4:
                        e_1 = _a.sent();
                        // Capture all fetch errors to Sentry for monitoring
                        Logger_js_1.Logger.error(e_1, {
                            context: "llm_fetch",
                            url: String(input),
                            method: (init === null || init === void 0 ? void 0 : init.method) || "GET",
                            model: this.model,
                            provider: this.providerName,
                        });
                        if (!e_1.message.includes("/api/tags")) return [3 /*break*/, 5];
                        throw new Error("Error fetching tags: ".concat(e_1.message));
                    case 5:
                        if (!e_1.message.includes("/api/show")) return [3 /*break*/, 6];
                        throw new Error("HTTP ".concat(e_1.response.status, " ").concat(e_1.response.statusText, " from ").concat(e_1.response.url, "\n\n").concat(e_1.response.body));
                    case 6:
                        if (e_1.name !== "AbortError") {
                            // Don't pollute console with abort errors. Check on name instead of instanceof, to avoid importing node-fetch here
                            console.debug("".concat(e_1.message, "\n\nCode: ").concat(e_1.code, "\nError number: ").concat(e_1.errno, "\nSyscall: ").concat(e_1.erroredSysCall, "\nType: ").concat(e_1.type, "\n\n").concat(e_1.stack));
                        }
                        if (!(e_1.code === "ECONNREFUSED" &&
                            e_1.message.includes("http://127.0.0.1:11434"))) return [3 /*break*/, 8];
                        return [4 /*yield*/, (0, ollamaHelper_js_1.isOllamaInstalled)()];
                    case 7:
                        message = (_a.sent())
                            ? "Unable to connect to local Ollama instance. Ollama may not be running."
                            : "Unable to connect to local Ollama instance. Ollama may not be installed or may not running.";
                        throw new Error(message);
                    case 8:
                        if (!(e_1.code === "ECONNREFUSED" &&
                            e_1.message.includes("http://localhost:8000"))) return [3 /*break*/, 10];
                        return [4 /*yield*/, (0, lemonadeHelper_js_1.isLemonadeInstalled)()];
                    case 9:
                        isInstalled = _a.sent();
                        message = void 0;
                        if (process.platform === "linux") {
                            // On Linux, isLemonadeInstalled checks if it's running (via health endpoint)
                            message =
                                "Unable to connect to local Lemonade instance. Please ensure Lemonade is running. Visit http://lemonade-server.ai for setup instructions.";
                        }
                        else {
                            // On Windows, we can check if it's installed
                            message = isInstalled
                                ? "Unable to connect to local Lemonade instance. Lemonade server may not be running."
                                : "Unable to connect to local Lemonade instance. Lemonade may not be installed or may not be running.";
                        }
                        throw new Error(message);
                    case 10: throw e_1;
                    case 11: return [2 /*return*/];
                }
            });
        }); };
        return (0, withExponentialBackoff_js_1.withExponentialBackoff)(function () { return customFetch(url, init); }, 5, 0.5);
    };
    BaseLLM.prototype._parseCompletionOptions = function (options) {
        var _a, _b;
        var log = (_a = options.log) !== null && _a !== void 0 ? _a : true;
        var raw = (_b = options.raw) !== null && _b !== void 0 ? _b : false;
        options.log = undefined;
        var completionOptions = (0, merge_js_1.default)(this.completionOptions, options);
        return { completionOptions: completionOptions, logEnabled: log, raw: raw };
    };
    BaseLLM.prototype._formatChatMessages = function (messages) {
        var msgsCopy = messages ? messages.map(function (msg) { return (__assign({}, msg)); }) : [];
        var formatted = "";
        for (var _i = 0, msgsCopy_1 = msgsCopy; _i < msgsCopy_1.length; _i++) {
            var msg = msgsCopy_1[_i];
            formatted += this._formatChatMessage(msg);
        }
        return formatted;
    };
    BaseLLM.prototype._formatChatMessage = function (msg) {
        var _a, _b;
        var contentToShow = (0, messageContent_js_1.renderChatMessage)(msg);
        if (msg.role === "assistant" && ((_a = msg.toolCalls) === null || _a === void 0 ? void 0 : _a.length)) {
            contentToShow +=
                "\n" +
                    ((_b = msg.toolCalls) === null || _b === void 0 ? void 0 : _b.map(function (toolCall) { var _a, _b; return "".concat((_a = toolCall.function) === null || _a === void 0 ? void 0 : _a.name, "(").concat((_b = toolCall.function) === null || _b === void 0 ? void 0 : _b.arguments, ")"); }).join("\n"));
        }
        return "<".concat(msg.role, ">\n").concat(contentToShow, "\n\n");
    };
    BaseLLM.prototype._streamFim = function (prefix, suffix, signal, options) {
        return __asyncGenerator(this, arguments, function _streamFim_1() {
            return __generator(this, function (_a) {
                throw new Error("Not implemented");
            });
        });
    };
    BaseLLM.prototype.shouldUseOpenAIAdapter = function (requestType) {
        return (this.useOpenAIAdapterFor.includes(requestType) ||
            this.useOpenAIAdapterFor.includes("*"));
    };
    BaseLLM.prototype.streamFim = function (prefix_1, suffix_1, signal_1) {
        return __asyncGenerator(this, arguments, function streamFim_1(prefix, suffix, signal, options) {
            var _a, completionOptions, logEnabled, interaction, status, fimLog, completion, stream, _b, stream_1, stream_1_1, chunk, result, content, formattedContent, e_2_1, _c, _d, _e, chunk, e_3_1, e_4;
            var _f, e_2, _g, _h, _j, e_3, _k, _l;
            var _m;
            if (options === void 0) { options = {}; }
            return __generator(this, function (_o) {
                switch (_o.label) {
                    case 0:
                        this.lastRequestId = undefined;
                        _a = this._parseCompletionOptions(options), completionOptions = _a.completionOptions, logEnabled = _a.logEnabled;
                        interaction = logEnabled
                            ? (_m = this.logger) === null || _m === void 0 ? void 0 : _m.createInteractionLog()
                            : undefined;
                        status = "in_progress";
                        fimLog = "Prefix: ".concat(prefix, "\nSuffix: ").concat(suffix);
                        if (logEnabled) {
                            interaction === null || interaction === void 0 ? void 0 : interaction.logItem({
                                kind: "startFim",
                                prefix: prefix,
                                suffix: suffix,
                                options: completionOptions,
                                provider: this.providerName,
                            });
                            if (this.llmRequestHook) {
                                this.llmRequestHook(completionOptions.model, fimLog);
                            }
                        }
                        completion = "";
                        _o.label = 1;
                    case 1:
                        _o.trys.push([1, 30, 31, 32]);
                        if (!(this.shouldUseOpenAIAdapter("streamFim") && this.openaiAdapter)) return [3 /*break*/, 16];
                        stream = this.openaiAdapter.fimStream((0, openaiTypeConverters_js_1.toFimBody)(prefix, suffix, completionOptions), signal);
                        _o.label = 2;
                    case 2:
                        _o.trys.push([2, 9, 10, 15]);
                        _b = true, stream_1 = __asyncValues(stream);
                        _o.label = 3;
                    case 3: return [4 /*yield*/, __await(stream_1.next())];
                    case 4:
                        if (!(stream_1_1 = _o.sent(), _f = stream_1_1.done, !_f)) return [3 /*break*/, 8];
                        _h = stream_1_1.value;
                        _b = false;
                        chunk = _h;
                        if (!this.lastRequestId && typeof chunk.id === "string") {
                            this.lastRequestId = chunk.id;
                        }
                        result = (0, openaiTypeConverters_js_1.fromChatCompletionChunk)(chunk);
                        if (!result) return [3 /*break*/, 7];
                        content = (0, messageContent_js_1.renderChatMessage)(result);
                        formattedContent = this._formatChatMessage(result);
                        interaction === null || interaction === void 0 ? void 0 : interaction.logItem({
                            kind: "chunk",
                            chunk: formattedContent,
                        });
                        completion += formattedContent;
                        return [4 /*yield*/, __await(content)];
                    case 5: return [4 /*yield*/, _o.sent()];
                    case 6:
                        _o.sent();
                        _o.label = 7;
                    case 7:
                        _b = true;
                        return [3 /*break*/, 3];
                    case 8: return [3 /*break*/, 15];
                    case 9:
                        e_2_1 = _o.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 15];
                    case 10:
                        _o.trys.push([10, , 13, 14]);
                        if (!(!_b && !_f && (_g = stream_1.return))) return [3 /*break*/, 12];
                        return [4 /*yield*/, __await(_g.call(stream_1))];
                    case 11:
                        _o.sent();
                        _o.label = 12;
                    case 12: return [3 /*break*/, 14];
                    case 13:
                        if (e_2) throw e_2.error;
                        return [7 /*endfinally*/];
                    case 14: return [7 /*endfinally*/];
                    case 15: return [3 /*break*/, 29];
                    case 16:
                        _o.trys.push([16, 23, 24, 29]);
                        _c = true, _d = __asyncValues(this._streamFim(prefix, suffix, signal, completionOptions));
                        _o.label = 17;
                    case 17: return [4 /*yield*/, __await(_d.next())];
                    case 18:
                        if (!(_e = _o.sent(), _j = _e.done, !_j)) return [3 /*break*/, 22];
                        _l = _e.value;
                        _c = false;
                        chunk = _l;
                        interaction === null || interaction === void 0 ? void 0 : interaction.logItem({
                            kind: "chunk",
                            chunk: chunk,
                        });
                        completion += chunk;
                        return [4 /*yield*/, __await(chunk)];
                    case 19: return [4 /*yield*/, _o.sent()];
                    case 20:
                        _o.sent();
                        _o.label = 21;
                    case 21:
                        _c = true;
                        return [3 /*break*/, 17];
                    case 22: return [3 /*break*/, 29];
                    case 23:
                        e_3_1 = _o.sent();
                        e_3 = { error: e_3_1 };
                        return [3 /*break*/, 29];
                    case 24:
                        _o.trys.push([24, , 27, 28]);
                        if (!(!_c && !_j && (_k = _d.return))) return [3 /*break*/, 26];
                        return [4 /*yield*/, __await(_k.call(_d))];
                    case 25:
                        _o.sent();
                        _o.label = 26;
                    case 26: return [3 /*break*/, 28];
                    case 27:
                        if (e_3) throw e_3.error;
                        return [7 /*endfinally*/];
                    case 28: return [7 /*endfinally*/];
                    case 29:
                        status = this._logEnd(completionOptions.model, fimLog, completion, undefined, interaction, undefined);
                        return [3 /*break*/, 32];
                    case 30:
                        e_4 = _o.sent();
                        // Capture FIM (Fill-in-the-Middle) completion failures to Sentry
                        Logger_js_1.Logger.error(e_4, {
                            context: "llm_stream_fim",
                            model: completionOptions.model,
                            provider: this.providerName,
                            useOpenAIAdapter: this.shouldUseOpenAIAdapter("streamFim"),
                        });
                        status = this._logEnd(completionOptions.model, fimLog, completion, undefined, interaction, undefined, e_4);
                        throw e_4;
                    case 31:
                        if (status === "in_progress") {
                            this._logEnd(completionOptions.model, fimLog, completion, undefined, interaction, undefined, "cancel");
                        }
                        return [7 /*endfinally*/];
                    case 32: return [4 /*yield*/, __await({
                            prompt: fimLog,
                            completion: completion,
                            completionOptions: completionOptions,
                        })];
                    case 33: return [2 /*return*/, _o.sent()];
                }
            });
        });
    };
    BaseLLM.prototype.streamComplete = function (_prompt_1, signal_1) {
        return __asyncGenerator(this, arguments, function streamComplete_1(_prompt, signal, options) {
            var _a, completionOptions, logEnabled, raw, interaction, status, prompt, completion, response, _b, _c, _d, chunk, content, e_5_1, _e, _f, _g, chunk, e_6_1, e_7;
            var _h, e_5, _j, _k, _l, e_6, _m, _o;
            var _p, _q, _r, _s, _t, _u, _v, _w;
            if (options === void 0) { options = {}; }
            return __generator(this, function (_x) {
                switch (_x.label) {
                    case 0:
                        this.lastRequestId = undefined;
                        _a = this._parseCompletionOptions(options), completionOptions = _a.completionOptions, logEnabled = _a.logEnabled, raw = _a.raw;
                        interaction = logEnabled
                            ? (_p = this.logger) === null || _p === void 0 ? void 0 : _p.createInteractionLog()
                            : undefined;
                        status = "in_progress";
                        prompt = (0, countTokens_js_1.pruneRawPromptFromTop)(completionOptions.model, this.contextLength, _prompt, (_q = completionOptions.maxTokens) !== null && _q !== void 0 ? _q : constants_js_1.DEFAULT_MAX_TOKENS);
                        if (!raw) {
                            prompt = this._templatePromptLikeMessages(prompt);
                        }
                        if (logEnabled) {
                            interaction === null || interaction === void 0 ? void 0 : interaction.logItem({
                                kind: "startComplete",
                                prompt: prompt,
                                options: completionOptions,
                                provider: this.providerName,
                            });
                            if (this.llmRequestHook) {
                                this.llmRequestHook(completionOptions.model, prompt);
                            }
                        }
                        completion = "";
                        _x.label = 1;
                    case 1:
                        _x.trys.push([1, 33, 34, 35]);
                        if (!(this.shouldUseOpenAIAdapter("streamComplete") && this.openaiAdapter)) return [3 /*break*/, 19];
                        if (!(completionOptions.stream === false)) return [3 /*break*/, 5];
                        return [4 /*yield*/, __await(this.openaiAdapter.completionNonStream(__assign(__assign({}, (0, openaiTypeConverters_js_1.toCompleteBody)(prompt, completionOptions)), { stream: false }), signal))];
                    case 2:
                        response = _x.sent();
                        this.lastRequestId = (_r = response.id) !== null && _r !== void 0 ? _r : this.lastRequestId;
                        completion = (_t = (_s = response.choices[0]) === null || _s === void 0 ? void 0 : _s.text) !== null && _t !== void 0 ? _t : "";
                        return [4 /*yield*/, __await(completion)];
                    case 3: return [4 /*yield*/, _x.sent()];
                    case 4:
                        _x.sent();
                        return [3 /*break*/, 18];
                    case 5:
                        _x.trys.push([5, 12, 13, 18]);
                        _b = true, _c = __asyncValues(this.openaiAdapter.completionStream(__assign(__assign({}, (0, openaiTypeConverters_js_1.toCompleteBody)(prompt, completionOptions)), { stream: true }), signal));
                        _x.label = 6;
                    case 6: return [4 /*yield*/, __await(_c.next())];
                    case 7:
                        if (!(_d = _x.sent(), _h = _d.done, !_h)) return [3 /*break*/, 11];
                        _k = _d.value;
                        _b = false;
                        chunk = _k;
                        if (!this.lastRequestId && typeof chunk.id === "string") {
                            this.lastRequestId = chunk.id;
                        }
                        content = (_v = (_u = chunk.choices[0]) === null || _u === void 0 ? void 0 : _u.text) !== null && _v !== void 0 ? _v : "";
                        completion += content;
                        interaction === null || interaction === void 0 ? void 0 : interaction.logItem({
                            kind: "chunk",
                            chunk: content,
                        });
                        return [4 /*yield*/, __await(content)];
                    case 8: return [4 /*yield*/, _x.sent()];
                    case 9:
                        _x.sent();
                        _x.label = 10;
                    case 10:
                        _b = true;
                        return [3 /*break*/, 6];
                    case 11: return [3 /*break*/, 18];
                    case 12:
                        e_5_1 = _x.sent();
                        e_5 = { error: e_5_1 };
                        return [3 /*break*/, 18];
                    case 13:
                        _x.trys.push([13, , 16, 17]);
                        if (!(!_b && !_h && (_j = _c.return))) return [3 /*break*/, 15];
                        return [4 /*yield*/, __await(_j.call(_c))];
                    case 14:
                        _x.sent();
                        _x.label = 15;
                    case 15: return [3 /*break*/, 17];
                    case 16:
                        if (e_5) throw e_5.error;
                        return [7 /*endfinally*/];
                    case 17: return [7 /*endfinally*/];
                    case 18: return [3 /*break*/, 32];
                    case 19:
                        _x.trys.push([19, 26, 27, 32]);
                        _e = true, _f = __asyncValues(this._streamComplete(prompt, signal, completionOptions));
                        _x.label = 20;
                    case 20: return [4 /*yield*/, __await(_f.next())];
                    case 21:
                        if (!(_g = _x.sent(), _l = _g.done, !_l)) return [3 /*break*/, 25];
                        _o = _g.value;
                        _e = false;
                        chunk = _o;
                        completion += chunk;
                        interaction === null || interaction === void 0 ? void 0 : interaction.logItem({
                            kind: "chunk",
                            chunk: chunk,
                        });
                        return [4 /*yield*/, __await(chunk)];
                    case 22: return [4 /*yield*/, _x.sent()];
                    case 23:
                        _x.sent();
                        _x.label = 24;
                    case 24:
                        _e = true;
                        return [3 /*break*/, 20];
                    case 25: return [3 /*break*/, 32];
                    case 26:
                        e_6_1 = _x.sent();
                        e_6 = { error: e_6_1 };
                        return [3 /*break*/, 32];
                    case 27:
                        _x.trys.push([27, , 30, 31]);
                        if (!(!_e && !_l && (_m = _f.return))) return [3 /*break*/, 29];
                        return [4 /*yield*/, __await(_m.call(_f))];
                    case 28:
                        _x.sent();
                        _x.label = 29;
                    case 29: return [3 /*break*/, 31];
                    case 30:
                        if (e_6) throw e_6.error;
                        return [7 /*endfinally*/];
                    case 31: return [7 /*endfinally*/];
                    case 32:
                        status = this._logEnd(completionOptions.model, prompt, completion, undefined, interaction, undefined);
                        return [3 /*break*/, 35];
                    case 33:
                        e_7 = _x.sent();
                        // Capture streaming completion failures to Sentry
                        Logger_js_1.Logger.error(e_7, {
                            context: "llm_stream_complete",
                            model: completionOptions.model,
                            provider: this.providerName,
                            useOpenAIAdapter: this.shouldUseOpenAIAdapter("streamComplete"),
                            streamEnabled: completionOptions.stream !== false,
                        });
                        status = this._logEnd(completionOptions.model, prompt, completion, undefined, interaction, undefined, e_7);
                        throw e_7;
                    case 34:
                        if (status === "in_progress") {
                            this._logEnd(completionOptions.model, prompt, completion, undefined, interaction, undefined, "cancel");
                        }
                        return [7 /*endfinally*/];
                    case 35: return [4 /*yield*/, __await({
                            modelTitle: (_w = this.title) !== null && _w !== void 0 ? _w : completionOptions.model,
                            modelProvider: this.underlyingProviderName,
                            prompt: prompt,
                            completion: completion,
                            completionOptions: completionOptions,
                        })];
                    case 36: return [2 /*return*/, _x.sent()];
                }
            });
        });
    };
    BaseLLM.prototype.complete = function (_prompt_1, signal_1) {
        return __awaiter(this, arguments, void 0, function (_prompt, signal, options) {
            var _a, completionOptions, logEnabled, raw, interaction, status, prompt, completion, result, e_8;
            var _b, _c, _d;
            if (options === void 0) { options = {}; }
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        this.lastRequestId = undefined;
                        _a = this._parseCompletionOptions(options), completionOptions = _a.completionOptions, logEnabled = _a.logEnabled, raw = _a.raw;
                        interaction = logEnabled
                            ? (_b = this.logger) === null || _b === void 0 ? void 0 : _b.createInteractionLog()
                            : undefined;
                        status = "in_progress";
                        prompt = (0, countTokens_js_1.pruneRawPromptFromTop)(completionOptions.model, this.contextLength, _prompt, (_c = completionOptions.maxTokens) !== null && _c !== void 0 ? _c : constants_js_1.DEFAULT_MAX_TOKENS);
                        if (!raw) {
                            prompt = this._templatePromptLikeMessages(prompt);
                        }
                        if (logEnabled) {
                            interaction === null || interaction === void 0 ? void 0 : interaction.logItem({
                                kind: "startComplete",
                                prompt: prompt,
                                options: completionOptions,
                                provider: this.providerName,
                            });
                            if (this.llmRequestHook) {
                                this.llmRequestHook(completionOptions.model, prompt);
                            }
                        }
                        completion = "";
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 6, 7, 8]);
                        if (!(this.shouldUseOpenAIAdapter("complete") && this.openaiAdapter)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.openaiAdapter.completionNonStream(__assign(__assign({}, (0, openaiTypeConverters_js_1.toCompleteBody)(prompt, completionOptions)), { stream: false }), signal)];
                    case 2:
                        result = _e.sent();
                        this.lastRequestId = (_d = result.id) !== null && _d !== void 0 ? _d : this.lastRequestId;
                        completion = result.choices[0].text;
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this._complete(prompt, signal, completionOptions)];
                    case 4:
                        completion = _e.sent();
                        _e.label = 5;
                    case 5:
                        interaction === null || interaction === void 0 ? void 0 : interaction.logItem({
                            kind: "chunk",
                            chunk: completion,
                        });
                        status = this._logEnd(completionOptions.model, prompt, completion, undefined, interaction, undefined);
                        return [3 /*break*/, 8];
                    case 6:
                        e_8 = _e.sent();
                        // Capture completion failures to Sentry
                        Logger_js_1.Logger.error(e_8, {
                            context: "llm_complete",
                            model: completionOptions.model,
                            provider: this.providerName,
                            useOpenAIAdapter: this.shouldUseOpenAIAdapter("complete"),
                        });
                        status = this._logEnd(completionOptions.model, prompt, completion, undefined, interaction, undefined, e_8);
                        throw e_8;
                    case 7:
                        if (status === "in_progress") {
                            this._logEnd(completionOptions.model, prompt, completion, undefined, interaction, undefined, "cancel");
                        }
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/, completion];
                }
            });
        });
    };
    BaseLLM.prototype.chat = function (messages_1, signal_1) {
        return __awaiter(this, arguments, void 0, function (messages, signal, options) {
            var completion, _a, _b, _c, message, e_9_1;
            var _d, e_9, _e, _f;
            if (options === void 0) { options = {}; }
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        completion = "";
                        _g.label = 1;
                    case 1:
                        _g.trys.push([1, 6, 7, 12]);
                        _a = true, _b = __asyncValues(this.streamChat(messages, signal, options));
                        _g.label = 2;
                    case 2: return [4 /*yield*/, _b.next()];
                    case 3:
                        if (!(_c = _g.sent(), _d = _c.done, !_d)) return [3 /*break*/, 5];
                        _f = _c.value;
                        _a = false;
                        message = _f;
                        completion += (0, messageContent_js_1.renderChatMessage)(message);
                        _g.label = 4;
                    case 4:
                        _a = true;
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 12];
                    case 6:
                        e_9_1 = _g.sent();
                        e_9 = { error: e_9_1 };
                        return [3 /*break*/, 12];
                    case 7:
                        _g.trys.push([7, , 10, 11]);
                        if (!(!_a && !_d && (_e = _b.return))) return [3 /*break*/, 9];
                        return [4 /*yield*/, _e.call(_b)];
                    case 8:
                        _g.sent();
                        _g.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        if (e_9) throw e_9.error;
                        return [7 /*endfinally*/];
                    case 11: return [7 /*endfinally*/];
                    case 12: return [2 /*return*/, { role: "assistant", content: completion }];
                }
            });
        });
    };
    BaseLLM.prototype.compileChatMessages = function (message, options) {
        var _a;
        var completionOptions = this._parseCompletionOptions(options).completionOptions;
        completionOptions = this._modifyCompletionOptions(completionOptions);
        return (0, countTokens_js_1.compileChatMessages)({
            modelName: completionOptions.model,
            msgs: message,
            knownContextLength: this._contextLength,
            maxTokens: (_a = completionOptions.maxTokens) !== null && _a !== void 0 ? _a : constants_js_1.DEFAULT_MAX_TOKENS,
            supportsImages: this.supportsImages(),
            tools: options.tools,
        });
    };
    BaseLLM.prototype.modifyChatBody = function (body) {
        return body;
    };
    BaseLLM.prototype._modifyCompletionOptions = function (completionOptions) {
        // As of 01/14/25 streaming is currently not available with o1
        // See these threads:
        // - https://github.com/continuedev/continue/issues/3698
        // - https://community.openai.com/t/streaming-support-for-o1-o1-2024-12-17-resulting-in-400-unsupported-value/1085043
        if (completionOptions.model === "o1") {
            completionOptions.stream = false;
        }
        return completionOptions;
    };
    BaseLLM.prototype.streamChat = function (_messages_1, signal_1) {
        return __asyncGenerator(this, arguments, function streamChat_1(_messages, signal, options, messageOptions) {
            var _a, completionOptions, logEnabled, interaction, status, messages, compiledChatMessages, prompt, thinking, completion, usage, _b, _c, _d, chunk, e_10_1, body, response, msg, stream, _e, stream_2, stream_2_1, chunk, result, e_11_1, _f, _g, _h, chunk, e_12_1, e_13;
            var _j, e_10, _k, _l, _m, e_11, _o, _p, _q, e_12, _r, _s;
            var _t, _u, _v, _w;
            if (options === void 0) { options = {}; }
            return __generator(this, function (_x) {
                switch (_x.label) {
                    case 0:
                        this.lastRequestId = undefined;
                        _a = this._parseCompletionOptions(options), completionOptions = _a.completionOptions, logEnabled = _a.logEnabled;
                        interaction = logEnabled
                            ? (_t = this.logger) === null || _t === void 0 ? void 0 : _t.createInteractionLog()
                            : undefined;
                        status = "in_progress";
                        completionOptions = this._modifyCompletionOptions(completionOptions);
                        messages = _messages;
                        // If not precompiled, compile the chat messages
                        if (!(messageOptions === null || messageOptions === void 0 ? void 0 : messageOptions.precompiled)) {
                            compiledChatMessages = (0, countTokens_js_1.compileChatMessages)({
                                modelName: completionOptions.model,
                                msgs: _messages,
                                knownContextLength: this._contextLength,
                                maxTokens: (_u = completionOptions.maxTokens) !== null && _u !== void 0 ? _u : constants_js_1.DEFAULT_MAX_TOKENS,
                                supportsImages: this.supportsImages(),
                                tools: options.tools,
                            }).compiledChatMessages;
                            messages = compiledChatMessages;
                        }
                        prompt = this.templateMessages
                            ? this.templateMessages(messages)
                            : this._formatChatMessages(messages);
                        if (logEnabled) {
                            interaction === null || interaction === void 0 ? void 0 : interaction.logItem({
                                kind: "startChat",
                                messages: messages,
                                options: completionOptions,
                                provider: this.providerName,
                            });
                            if (this.llmRequestHook) {
                                this.llmRequestHook(completionOptions.model, prompt);
                            }
                        }
                        thinking = "";
                        completion = "";
                        usage = undefined;
                        _x.label = 1;
                    case 1:
                        _x.trys.push([1, 49, 50, 51]);
                        if (!this.templateMessages) return [3 /*break*/, 16];
                        _x.label = 2;
                    case 2:
                        _x.trys.push([2, 9, 10, 15]);
                        _b = true, _c = __asyncValues(this._streamComplete(prompt, signal, completionOptions));
                        _x.label = 3;
                    case 3: return [4 /*yield*/, __await(_c.next())];
                    case 4:
                        if (!(_d = _x.sent(), _j = _d.done, !_j)) return [3 /*break*/, 8];
                        _l = _d.value;
                        _b = false;
                        chunk = _l;
                        completion += chunk;
                        interaction === null || interaction === void 0 ? void 0 : interaction.logItem({
                            kind: "chunk",
                            chunk: chunk,
                        });
                        return [4 /*yield*/, __await({ role: "assistant", content: chunk })];
                    case 5: return [4 /*yield*/, _x.sent()];
                    case 6:
                        _x.sent();
                        _x.label = 7;
                    case 7:
                        _b = true;
                        return [3 /*break*/, 3];
                    case 8: return [3 /*break*/, 15];
                    case 9:
                        e_10_1 = _x.sent();
                        e_10 = { error: e_10_1 };
                        return [3 /*break*/, 15];
                    case 10:
                        _x.trys.push([10, , 13, 14]);
                        if (!(!_b && !_j && (_k = _c.return))) return [3 /*break*/, 12];
                        return [4 /*yield*/, __await(_k.call(_c))];
                    case 11:
                        _x.sent();
                        _x.label = 12;
                    case 12: return [3 /*break*/, 14];
                    case 13:
                        if (e_10) throw e_10.error;
                        return [7 /*endfinally*/];
                    case 14: return [7 /*endfinally*/];
                    case 15: return [3 /*break*/, 48];
                    case 16:
                        if (!(this.shouldUseOpenAIAdapter("streamChat") && this.openaiAdapter)) return [3 /*break*/, 35];
                        body = (0, openaiTypeConverters_js_1.toChatBody)(messages, completionOptions);
                        body = this.modifyChatBody(body);
                        if (!(completionOptions.stream === false)) return [3 /*break*/, 20];
                        return [4 /*yield*/, __await(this.openaiAdapter.chatCompletionNonStream(__assign(__assign({}, body), { stream: false }), signal))];
                    case 17:
                        response = _x.sent();
                        this.lastRequestId = (_v = response.id) !== null && _v !== void 0 ? _v : this.lastRequestId;
                        msg = (0, openaiTypeConverters_js_1.fromChatResponse)(response);
                        return [4 /*yield*/, __await(msg)];
                    case 18: return [4 /*yield*/, _x.sent()];
                    case 19:
                        _x.sent();
                        completion = this._formatChatMessage(msg);
                        interaction === null || interaction === void 0 ? void 0 : interaction.logItem({
                            kind: "message",
                            message: msg,
                        });
                        return [3 /*break*/, 34];
                    case 20:
                        stream = this.openaiAdapter.chatCompletionStream(__assign(__assign({}, body), { stream: true }), signal);
                        _x.label = 21;
                    case 21:
                        _x.trys.push([21, 28, 29, 34]);
                        _e = true, stream_2 = __asyncValues(stream);
                        _x.label = 22;
                    case 22: return [4 /*yield*/, __await(stream_2.next())];
                    case 23:
                        if (!(stream_2_1 = _x.sent(), _m = stream_2_1.done, !_m)) return [3 /*break*/, 27];
                        _p = stream_2_1.value;
                        _e = false;
                        chunk = _p;
                        if (!this.lastRequestId &&
                            typeof chunk.id === "string") {
                            this.lastRequestId = chunk.id;
                        }
                        result = (0, openaiTypeConverters_js_1.fromChatCompletionChunk)(chunk);
                        if (!result) return [3 /*break*/, 26];
                        completion += this._formatChatMessage(result);
                        interaction === null || interaction === void 0 ? void 0 : interaction.logItem({
                            kind: "message",
                            message: result,
                        });
                        return [4 /*yield*/, __await(result)];
                    case 24: return [4 /*yield*/, _x.sent()];
                    case 25:
                        _x.sent();
                        _x.label = 26;
                    case 26:
                        _e = true;
                        return [3 /*break*/, 22];
                    case 27: return [3 /*break*/, 34];
                    case 28:
                        e_11_1 = _x.sent();
                        e_11 = { error: e_11_1 };
                        return [3 /*break*/, 34];
                    case 29:
                        _x.trys.push([29, , 32, 33]);
                        if (!(!_e && !_m && (_o = stream_2.return))) return [3 /*break*/, 31];
                        return [4 /*yield*/, __await(_o.call(stream_2))];
                    case 30:
                        _x.sent();
                        _x.label = 31;
                    case 31: return [3 /*break*/, 33];
                    case 32:
                        if (e_11) throw e_11.error;
                        return [7 /*endfinally*/];
                    case 33: return [7 /*endfinally*/];
                    case 34: return [3 /*break*/, 48];
                    case 35:
                        _x.trys.push([35, 42, 43, 48]);
                        _f = true, _g = __asyncValues(this._streamChat(messages, signal, completionOptions));
                        _x.label = 36;
                    case 36: return [4 /*yield*/, __await(_g.next())];
                    case 37:
                        if (!(_h = _x.sent(), _q = _h.done, !_q)) return [3 /*break*/, 41];
                        _s = _h.value;
                        _f = false;
                        chunk = _s;
                        if (chunk.role === "assistant") {
                            completion += this._formatChatMessage(chunk);
                        }
                        else if (chunk.role === "thinking") {
                            thinking += chunk.content;
                        }
                        interaction === null || interaction === void 0 ? void 0 : interaction.logItem({
                            kind: "message",
                            message: chunk,
                        });
                        if (chunk.role === "assistant" && chunk.usage) {
                            usage = chunk.usage;
                        }
                        return [4 /*yield*/, __await(chunk)];
                    case 38: return [4 /*yield*/, _x.sent()];
                    case 39:
                        _x.sent();
                        _x.label = 40;
                    case 40:
                        _f = true;
                        return [3 /*break*/, 36];
                    case 41: return [3 /*break*/, 48];
                    case 42:
                        e_12_1 = _x.sent();
                        e_12 = { error: e_12_1 };
                        return [3 /*break*/, 48];
                    case 43:
                        _x.trys.push([43, , 46, 47]);
                        if (!(!_f && !_q && (_r = _g.return))) return [3 /*break*/, 45];
                        return [4 /*yield*/, __await(_r.call(_g))];
                    case 44:
                        _x.sent();
                        _x.label = 45;
                    case 45: return [3 /*break*/, 47];
                    case 46:
                        if (e_12) throw e_12.error;
                        return [7 /*endfinally*/];
                    case 47: return [7 /*endfinally*/];
                    case 48:
                        status = this._logEnd(completionOptions.model, prompt, completion, thinking, interaction, usage);
                        return [3 /*break*/, 51];
                    case 49:
                        e_13 = _x.sent();
                        // Capture chat streaming failures to Sentry
                        Logger_js_1.Logger.error(e_13, {
                            context: "llm_stream_chat",
                            model: completionOptions.model,
                            provider: this.providerName,
                            useOpenAIAdapter: this.shouldUseOpenAIAdapter("streamChat"),
                            streamEnabled: completionOptions.stream !== false,
                            templateMessages: !!this.templateMessages,
                        });
                        status = this._logEnd(completionOptions.model, prompt, completion, thinking, interaction, usage, e_13);
                        throw e_13;
                    case 50:
                        if (status === "in_progress") {
                            this._logEnd(completionOptions.model, prompt, completion, undefined, interaction, usage, "cancel");
                        }
                        return [7 /*endfinally*/];
                    case 51: return [4 /*yield*/, __await({
                            modelTitle: (_w = this.title) !== null && _w !== void 0 ? _w : completionOptions.model,
                            modelProvider: this.underlyingProviderName,
                            prompt: prompt,
                            completion: completion,
                        })];
                    case 52: 
                    /*
                    TODO: According to: https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking
                    During tool use, you must pass thinking and redacted_thinking blocks back to the API,
                    and you must include the complete unmodified block back to the API. This is critical
                    for maintaining the model's reasoning flow and conversation integrity.
                
                    On the other hand, adding thinking and redacted_thinking blocks are ignored on subsequent
                    requests when not using tools, so it's the simplest option to always add to history.
                    */
                    return [2 /*return*/, _x.sent()];
                }
            });
        });
    };
    BaseLLM.prototype.getBatchedChunks = function (chunks) {
        var batchedChunks = [];
        for (var i = 0; i < chunks.length; i += this.maxEmbeddingBatchSize) {
            batchedChunks.push(chunks.slice(i, i + this.maxEmbeddingBatchSize));
        }
        return batchedChunks;
    };
    BaseLLM.prototype.embed = function (chunks) {
        return __awaiter(this, void 0, void 0, function () {
            var batches;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        batches = this.getBatchedChunks(chunks);
                        return [4 /*yield*/, Promise.all(batches.map(function (batch) { return __awaiter(_this, void 0, void 0, function () {
                                var embeddings;
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (batch.length === 0) {
                                                return [2 /*return*/, []];
                                            }
                                            return [4 /*yield*/, (0, withExponentialBackoff_js_1.withExponentialBackoff)(function () { return __awaiter(_this, void 0, void 0, function () {
                                                    var result;
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                if (!(this.shouldUseOpenAIAdapter("embed") && this.openaiAdapter)) return [3 /*break*/, 2];
                                                                return [4 /*yield*/, this.openaiAdapter.embed({
                                                                        model: this.model,
                                                                        input: batch,
                                                                    })];
                                                            case 1:
                                                                result = _a.sent();
                                                                return [2 /*return*/, result.data.map(function (chunk) { return chunk.embedding; })];
                                                            case 2: return [4 /*yield*/, this._embed(batch)];
                                                            case 3: return [2 /*return*/, _a.sent()];
                                                        }
                                                    });
                                                }); })];
                                        case 1:
                                            embeddings = _a.sent();
                                            return [2 /*return*/, embeddings];
                                    }
                                });
                            }); }))];
                    case 1: return [2 /*return*/, (_a.sent()).flat()];
                }
            });
        });
    };
    BaseLLM.prototype.rerank = function (query, chunks) {
        return __awaiter(this, void 0, void 0, function () {
            var results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.shouldUseOpenAIAdapter("rerank") && this.openaiAdapter)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.openaiAdapter.rerank({
                                model: this.model,
                                query: query,
                                documents: chunks.map(function (chunk) { return chunk.content; }),
                            })];
                    case 1:
                        results = _a.sent();
                        // Standard OpenAI format
                        if (results.data && Array.isArray(results.data)) {
                            return [2 /*return*/, results.data
                                    .sort(function (a, b) { return a.index - b.index; })
                                    .map(function (result) { return result.relevance_score; })];
                        }
                        throw new Error("Unexpected rerank response format from ".concat(this.providerName, ". ") +
                            "Expected 'data' array but got: ".concat(JSON.stringify(Object.keys(results))));
                    case 2: throw new Error("Reranking is not supported for provider type ".concat(this.providerName));
                }
            });
        });
    };
    BaseLLM.prototype._streamComplete = function (prompt, signal, options) {
        return __asyncGenerator(this, arguments, function _streamComplete_1() {
            return __generator(this, function (_a) {
                throw new Error("Not implemented");
            });
        });
    };
    BaseLLM.prototype._streamChat = function (messages, signal, options) {
        return __asyncGenerator(this, arguments, function _streamChat_1() {
            var _a, _b, _c, chunk, e_14_1;
            var _d, e_14, _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        if (!this.templateMessages) {
                            throw new Error("You must either implement templateMessages or _streamChat");
                        }
                        _g.label = 1;
                    case 1:
                        _g.trys.push([1, 8, 9, 14]);
                        _a = true, _b = __asyncValues(this._streamComplete(this.templateMessages(messages), signal, options));
                        _g.label = 2;
                    case 2: return [4 /*yield*/, __await(_b.next())];
                    case 3:
                        if (!(_c = _g.sent(), _d = _c.done, !_d)) return [3 /*break*/, 7];
                        _f = _c.value;
                        _a = false;
                        chunk = _f;
                        return [4 /*yield*/, __await({ role: "assistant", content: chunk })];
                    case 4: return [4 /*yield*/, _g.sent()];
                    case 5:
                        _g.sent();
                        _g.label = 6;
                    case 6:
                        _a = true;
                        return [3 /*break*/, 2];
                    case 7: return [3 /*break*/, 14];
                    case 8:
                        e_14_1 = _g.sent();
                        e_14 = { error: e_14_1 };
                        return [3 /*break*/, 14];
                    case 9:
                        _g.trys.push([9, , 12, 13]);
                        if (!(!_a && !_d && (_e = _b.return))) return [3 /*break*/, 11];
                        return [4 /*yield*/, __await(_e.call(_b))];
                    case 10:
                        _g.sent();
                        _g.label = 11;
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        if (e_14) throw e_14.error;
                        return [7 /*endfinally*/];
                    case 13: return [7 /*endfinally*/];
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    BaseLLM.prototype._complete = function (prompt, signal, options) {
        return __awaiter(this, void 0, void 0, function () {
            var completion, _a, _b, _c, chunk, e_15_1;
            var _d, e_15, _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        completion = "";
                        _g.label = 1;
                    case 1:
                        _g.trys.push([1, 6, 7, 12]);
                        _a = true, _b = __asyncValues(this._streamComplete(prompt, signal, options));
                        _g.label = 2;
                    case 2: return [4 /*yield*/, _b.next()];
                    case 3:
                        if (!(_c = _g.sent(), _d = _c.done, !_d)) return [3 /*break*/, 5];
                        _f = _c.value;
                        _a = false;
                        chunk = _f;
                        completion += chunk;
                        _g.label = 4;
                    case 4:
                        _a = true;
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 12];
                    case 6:
                        e_15_1 = _g.sent();
                        e_15 = { error: e_15_1 };
                        return [3 /*break*/, 12];
                    case 7:
                        _g.trys.push([7, , 10, 11]);
                        if (!(!_a && !_d && (_e = _b.return))) return [3 /*break*/, 9];
                        return [4 /*yield*/, _e.call(_b)];
                    case 8:
                        _g.sent();
                        _g.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        if (e_15) throw e_15.error;
                        return [7 /*endfinally*/];
                    case 11: return [7 /*endfinally*/];
                    case 12: return [2 /*return*/, completion];
                }
            });
        });
    };
    BaseLLM.prototype._embed = function (chunks) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error("Embedding is not supported for provider type ".concat(this.providerName));
            });
        });
    };
    BaseLLM.prototype.countTokens = function (text) {
        return (0, countTokens_js_1.countTokens)(text, this.model);
    };
    BaseLLM.prototype.collectArgs = function (options) {
        return __assign(__assign({}, constants_js_1.DEFAULT_ARGS), options);
    };
    BaseLLM.prototype.renderPromptTemplate = function (template, history, otherData, canPutWordsInModelsMouth) {
        var _a;
        if (canPutWordsInModelsMouth === void 0) { canPutWordsInModelsMouth = false; }
        if (typeof template === "string") {
            var data = __assign({ history: history }, otherData);
            if (history.length > 0 && history[0].role === "system") {
                data.system_message = history.shift().content;
            }
            var compiledTemplate = handlebars_1.default.compile(template);
            return compiledTemplate(data);
        }
        var rendered = template(history, __assign(__assign({}, otherData), { supportsCompletions: this.supportsCompletions() ? "true" : "false", supportsPrefill: this.supportsPrefill() ? "true" : "false" }));
        if (typeof rendered !== "string" &&
            ((_a = rendered[rendered.length - 1]) === null || _a === void 0 ? void 0 : _a.role) === "assistant" &&
            !canPutWordsInModelsMouth) {
            // Some providers don't allow you to put words in the model's mouth
            // So we have to manually compile the prompt template and use
            // raw /completions, not /chat/completions
            var templateMessages = (0, autodetect_js_1.autodetectTemplateFunction)(this.model, this.providerName, (0, autodetect_js_1.autodetectTemplateType)(this.model));
            if (templateMessages) {
                return templateMessages(rendered);
            }
        }
        return rendered;
    };
    BaseLLM.defaultOptions = undefined;
    return BaseLLM;
}());
exports.BaseLLM = BaseLLM;
