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
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
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
Object.defineProperty(exports, "__esModule", { value: true });
var client_bedrock_runtime_1 = require("@aws-sdk/client-bedrock-runtime");
var credential_providers_1 = require("@aws-sdk/credential-providers");
var parseArgs_js_1 = require("../../tools/parseArgs.js");
var messageContent_js_1 = require("../../util/messageContent.js");
var index_js_1 = require("../index.js");
var toolSupport_js_1 = require("../toolSupport.js");
var getSecureID_js_1 = require("../utils/getSecureID.js");
var retry_js_1 = require("../utils/retry.js");
var Bedrock = function () {
    var _a;
    var _classSuper = index_js_1.BaseLLM;
    var _instanceExtraInitializers = [];
    var __streamChat_decorators;
    return _a = /** @class */ (function (_super) {
            __extends(Bedrock, _super);
            function Bedrock(options) {
                var _this = _super.call(this, options) || this;
                _this._promptCachingMetrics = (__runInitializers(_this, _instanceExtraInitializers), {
                    cacheReadInputTokens: 0,
                    cacheWriteInputTokens: 0,
                });
                if (!options.apiBase) {
                    _this.apiBase = "https://bedrock-runtime.".concat(options.region, ".amazonaws.com");
                }
                _this.requestOptions = {
                    region: options.region,
                    headers: {},
                };
                return _this;
            }
            Bedrock.prototype._streamComplete = function (prompt, signal, options) {
                return __asyncGenerator(this, arguments, function _streamComplete_1() {
                    var messages, _b, _c, _d, update, e_1_1;
                    var _e, e_1, _f, _g;
                    return __generator(this, function (_h) {
                        switch (_h.label) {
                            case 0:
                                messages = [{ role: "user", content: prompt }];
                                _h.label = 1;
                            case 1:
                                _h.trys.push([1, 8, 9, 14]);
                                _b = true, _c = __asyncValues(this._streamChat(messages, signal, options));
                                _h.label = 2;
                            case 2: return [4 /*yield*/, __await(_c.next())];
                            case 3:
                                if (!(_d = _h.sent(), _e = _d.done, !_e)) return [3 /*break*/, 7];
                                _g = _d.value;
                                _b = false;
                                update = _g;
                                return [4 /*yield*/, __await((0, messageContent_js_1.renderChatMessage)(update))];
                            case 4: return [4 /*yield*/, _h.sent()];
                            case 5:
                                _h.sent();
                                _h.label = 6;
                            case 6:
                                _b = true;
                                return [3 /*break*/, 2];
                            case 7: return [3 /*break*/, 14];
                            case 8:
                                e_1_1 = _h.sent();
                                e_1 = { error: e_1_1 };
                                return [3 /*break*/, 14];
                            case 9:
                                _h.trys.push([9, , 12, 13]);
                                if (!(!_b && !_e && (_f = _c.return))) return [3 /*break*/, 11];
                                return [4 /*yield*/, __await(_f.call(_c))];
                            case 10:
                                _h.sent();
                                _h.label = 11;
                            case 11: return [3 /*break*/, 13];
                            case 12:
                                if (e_1) throw e_1.error;
                                return [7 /*endfinally*/];
                            case 13: return [7 /*endfinally*/];
                            case 14: return [2 /*return*/];
                        }
                    });
                });
            };
            Bedrock.prototype._streamChat = function (messages, signal, options) {
                return __asyncGenerator(this, arguments, function _streamChat_1() {
                    var credentials, client, config_headers, input, command, response, _b, _c, _d, chunk, contentBlockDelta, reasoningDelta, toolUseBlockDelta, toolUseBlock, contentBlockStart, start, toolUseBlock_1, e_2_1, error_1;
                    var _this = this;
                    var _e, e_2, _f, _g;
                    var _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
                    return __generator(this, function (_t) {
                        switch (_t.label) {
                            case 0: return [4 /*yield*/, __await(this._getCredentials())];
                            case 1:
                                credentials = _t.sent();
                                client = new client_bedrock_runtime_1.BedrockRuntimeClient({
                                    region: this.region,
                                    endpoint: this.apiBase,
                                    credentials: {
                                        accessKeyId: credentials.accessKeyId,
                                        secretAccessKey: credentials.secretAccessKey,
                                        sessionToken: credentials.sessionToken || "",
                                    },
                                });
                                config_headers = this.requestOptions && this.requestOptions.headers
                                    ? this.requestOptions.headers
                                    : {};
                                // AWS SigV4 requires strict canonicalization of headers.
                                // DO NOT USE "_" in your header name. It will return an error like below.
                                // "The request signature we calculated does not match the signature you provided."
                                client.middlewareStack.add(function (next) { return function (args) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_b) {
                                        args.request.headers = __assign(__assign({}, args.request.headers), config_headers);
                                        return [2 /*return*/, next(args)];
                                    });
                                }); }; }, {
                                    step: "build",
                                });
                                input = this._generateConverseInput(messages, __assign(__assign({}, options), { stream: true }));
                                command = new client_bedrock_runtime_1.ConverseStreamCommand(input);
                                return [4 /*yield*/, __await(client.send(command, {
                                        abortSignal: signal,
                                    }))];
                            case 2:
                                response = (_t.sent());
                                if (!(response === null || response === void 0 ? void 0 : response.stream)) {
                                    throw new Error("No stream received from Bedrock API");
                                }
                                // Reset cache metrics for new request
                                this._promptCachingMetrics = {
                                    cacheReadInputTokens: 0,
                                    cacheWriteInputTokens: 0,
                                };
                                _t.label = 3;
                            case 3:
                                _t.trys.push([3, 33, , 34]);
                                _t.label = 4;
                            case 4:
                                _t.trys.push([4, 26, 27, 32]);
                                _b = true, _c = __asyncValues(response.stream);
                                _t.label = 5;
                            case 5: return [4 /*yield*/, __await(_c.next())];
                            case 6:
                                if (!(_d = _t.sent(), _e = _d.done, !_e)) return [3 /*break*/, 25];
                                _g = _d.value;
                                _b = false;
                                chunk = _g;
                                if ((_h = chunk.metadata) === null || _h === void 0 ? void 0 : _h.usage) {
                                    console.log("".concat(JSON.stringify(chunk.metadata.usage)));
                                }
                                contentBlockDelta = (_j = chunk.contentBlockDelta) === null || _j === void 0 ? void 0 : _j.delta;
                                if (!contentBlockDelta) return [3 /*break*/, 15];
                                if (!contentBlockDelta.text) return [3 /*break*/, 9];
                                return [4 /*yield*/, __await({
                                        role: "assistant",
                                        content: contentBlockDelta.text,
                                    })];
                            case 7: return [4 /*yield*/, _t.sent()];
                            case 8:
                                _t.sent();
                                return [3 /*break*/, 24];
                            case 9:
                                if (!((_k = contentBlockDelta.reasoningContent) === null || _k === void 0 ? void 0 : _k.text)) return [3 /*break*/, 12];
                                return [4 /*yield*/, __await({
                                        role: "thinking",
                                        content: contentBlockDelta.reasoningContent.text,
                                    })];
                            case 10: return [4 /*yield*/, _t.sent()];
                            case 11:
                                _t.sent();
                                return [3 /*break*/, 24];
                            case 12:
                                if (!((_l = contentBlockDelta.reasoningContent) === null || _l === void 0 ? void 0 : _l.signature)) return [3 /*break*/, 15];
                                return [4 /*yield*/, __await({
                                        role: "thinking",
                                        content: "",
                                        signature: contentBlockDelta.reasoningContent.signature,
                                    })];
                            case 13: return [4 /*yield*/, _t.sent()];
                            case 14:
                                _t.sent();
                                return [3 /*break*/, 24];
                            case 15:
                                reasoningDelta = (_m = chunk
                                    .contentBlockDelta) === null || _m === void 0 ? void 0 : _m.delta;
                                if (!reasoningDelta) return [3 /*break*/, 18];
                                if (!reasoningDelta.redactedContent) return [3 /*break*/, 18];
                                return [4 /*yield*/, __await({
                                        role: "thinking",
                                        content: "",
                                        redactedThinking: reasoningDelta.text,
                                    })];
                            case 16: return [4 /*yield*/, _t.sent()];
                            case 17:
                                _t.sent();
                                return [3 /*break*/, 24];
                            case 18:
                                toolUseBlockDelta = (_p = (_o = chunk
                                    .contentBlockDelta) === null || _o === void 0 ? void 0 : _o.delta) === null || _p === void 0 ? void 0 : _p.toolUse;
                                toolUseBlock = (_r = (_q = chunk.contentBlockDelta) === null || _q === void 0 ? void 0 : _q.delta) === null || _r === void 0 ? void 0 : _r.toolUse;
                                if (!(toolUseBlockDelta && toolUseBlock)) return [3 /*break*/, 21];
                                return [4 /*yield*/, __await({
                                        role: "assistant",
                                        content: "",
                                        toolCalls: [
                                            {
                                                id: toolUseBlock.toolUseId,
                                                type: "function",
                                                function: {
                                                    name: toolUseBlock.name,
                                                    arguments: toolUseBlockDelta.input,
                                                },
                                            },
                                        ],
                                    })];
                            case 19: return [4 /*yield*/, _t.sent()];
                            case 20:
                                _t.sent();
                                return [3 /*break*/, 24];
                            case 21:
                                contentBlockStart = chunk.contentBlockStart;
                                if (!contentBlockStart) return [3 /*break*/, 24];
                                start = (_s = chunk.contentBlockStart) === null || _s === void 0 ? void 0 : _s.start;
                                if (!start) return [3 /*break*/, 24];
                                toolUseBlock_1 = start.toolUse;
                                if (!((toolUseBlock_1 === null || toolUseBlock_1 === void 0 ? void 0 : toolUseBlock_1.toolUseId) && (toolUseBlock_1 === null || toolUseBlock_1 === void 0 ? void 0 : toolUseBlock_1.name))) return [3 /*break*/, 24];
                                return [4 /*yield*/, __await({
                                        role: "assistant",
                                        content: "",
                                        toolCalls: [
                                            {
                                                id: toolUseBlock_1.toolUseId,
                                                type: "function",
                                                function: {
                                                    name: toolUseBlock_1.name,
                                                    arguments: "",
                                                },
                                            },
                                        ],
                                    })];
                            case 22: return [4 /*yield*/, _t.sent()];
                            case 23:
                                _t.sent();
                                return [3 /*break*/, 24];
                            case 24:
                                _b = true;
                                return [3 /*break*/, 5];
                            case 25: return [3 /*break*/, 32];
                            case 26:
                                e_2_1 = _t.sent();
                                e_2 = { error: e_2_1 };
                                return [3 /*break*/, 32];
                            case 27:
                                _t.trys.push([27, , 30, 31]);
                                if (!(!_b && !_e && (_f = _c.return))) return [3 /*break*/, 29];
                                return [4 /*yield*/, __await(_f.call(_c))];
                            case 28:
                                _t.sent();
                                _t.label = 29;
                            case 29: return [3 /*break*/, 31];
                            case 30:
                                if (e_2) throw e_2.error;
                                return [7 /*endfinally*/];
                            case 31: return [7 /*endfinally*/];
                            case 32: return [3 /*break*/, 34];
                            case 33:
                                error_1 = _t.sent();
                                // Clean up state and let the original error bubble up to the retry decorator
                                throw error_1;
                            case 34: return [2 /*return*/];
                        }
                    });
                });
            };
            /**
             * Generates the input payload for the Bedrock Converse API
             * @param messages - Array of chat messages
             * @param options - Completion options
             * @returns Formatted input payload for the API
             */
            Bedrock.prototype._generateConverseInput = function (messages, options) {
                var _b, _c, _d, _e, _f, _g, _h, _j;
                var systemMessage = (0, messageContent_js_1.stripImages)((_c = (_b = messages.find(function (m) { return m.role === "system"; })) === null || _b === void 0 ? void 0 : _b.content) !== null && _c !== void 0 ? _c : "");
                // Prompt and system message caching settings
                var shouldCacheSystemMessage = (!!systemMessage && ((_d = this.cacheBehavior) === null || _d === void 0 ? void 0 : _d.cacheSystemMessage)) ||
                    this.completionOptions.promptCaching;
                var enablePromptCaching = shouldCacheSystemMessage ||
                    ((_e = this.cacheBehavior) === null || _e === void 0 ? void 0 : _e.cacheConversation) ||
                    this.completionOptions.promptCaching;
                if (enablePromptCaching) {
                    this.requestOptions.headers = __assign(__assign({}, this.requestOptions.headers), { "x-amzn-bedrock-enablepromptcaching": "true" });
                }
                // First get tools
                var supportsTools = (_h = (((_f = this.capabilities) === null || _f === void 0 ? void 0 : _f.tools) ||
                    ((_g = toolSupport_js_1.PROVIDER_TOOL_SUPPORT.bedrock) === null || _g === void 0 ? void 0 : _g.call(toolSupport_js_1.PROVIDER_TOOL_SUPPORT, options.model)))) !== null && _h !== void 0 ? _h : false;
                var toolConfig = undefined;
                var availableTools = new Set();
                if (supportsTools && options.tools && options.tools.length > 0) {
                    toolConfig = {
                        tools: options.tools.map(function (tool) { return ({
                            toolSpec: {
                                name: tool.function.name,
                                description: tool.function.description,
                                inputSchema: {
                                    json: tool.function.parameters,
                                },
                            },
                        }); }),
                    };
                    var shouldCacheToolsConfig = this.completionOptions.promptCaching;
                    if (shouldCacheToolsConfig) {
                        toolConfig.tools.push({ cachePoint: { type: "default" } });
                    }
                    options.tools.forEach(function (tool) {
                        availableTools.add(tool.function.name);
                    });
                }
                var convertedMessages = this._convertMessages(messages, availableTools);
                return {
                    modelId: options.model,
                    system: systemMessage
                        ? shouldCacheSystemMessage
                            ? [{ text: systemMessage }, { cachePoint: { type: "default" } }]
                            : [{ text: systemMessage }]
                        : undefined,
                    toolConfig: toolConfig,
                    messages: convertedMessages,
                    inferenceConfig: {
                        maxTokens: options.maxTokens,
                        temperature: options.temperature,
                        topP: options.topP,
                        // TODO: The current approach selects the first 4 items from the list to comply with Bedrock's requirement
                        // of having at most 4 stop sequences, as per the AWS documentation:
                        // https://docs.aws.amazon.com/bedrock/latest/APIReference/API_agent_InferenceConfiguration.html
                        // However, it might be better to implement a strategy that dynamically selects the most appropriate stop sequences
                        // based on the context.
                        // TODO: Additionally, consider implementing a global exception handler for the providers to give users clearer feedback.
                        // For example, differentiate between client-side errors (4XX status codes) and server-side issues (5XX status codes),
                        // providing meaningful error messages to improve the user experience.
                        stopSequences: (_j = options.stop) === null || _j === void 0 ? void 0 : _j.filter(function (stop) { return stop.trim() !== ""; }).slice(0, 4),
                    },
                    additionalModelRequestFields: {
                        thinking: options.reasoning
                            ? {
                                type: "enabled",
                                budget_tokens: options.reasoningBudgetTokens,
                            }
                            : undefined,
                        anthropic_beta: options.model.includes("claude")
                            ? ["fine-grained-tool-streaming-2025-05-14"]
                            : undefined,
                    },
                };
            };
            /*
              Converts the messages to the format expected by the Bedrock API.
              
              */
            Bedrock.prototype._convertMessages = function (messages, availableTools) {
                var _b, _c, _d, _e;
                var currentRole = "user";
                var currentBlocks = [];
                var converted = [];
                var pushCurrentMessage = function () {
                    if (currentBlocks.length === 0 && converted.length > 1) {
                        throw new Error("Bedrock: no content in ".concat(currentRole, " message before conversational turn change"));
                    }
                    if (currentBlocks.length > 0) {
                        converted.push({
                            role: currentRole,
                            content: currentBlocks,
                        });
                    }
                    currentBlocks = [];
                };
                var nonSystemMessages = messages.filter(function (m) { return m.role !== "system"; });
                var hasAddedToolCallIds = new Set();
                for (var idx = 0; idx < nonSystemMessages.length; idx++) {
                    var message = nonSystemMessages[idx];
                    if (message.role === "user" || message.role === "tool") {
                        // Detect conversational turn change
                        if (currentRole !== client_bedrock_runtime_1.ConversationRole.USER) {
                            pushCurrentMessage();
                            currentRole = client_bedrock_runtime_1.ConversationRole.USER;
                        }
                        // USER messages:
                        // Non-empty user message content is converted to "text" and "image" blocks
                        // If ANY user message part is cached, we add a single cache point block when we push the message
                        if (message.role === "user") {
                            var trimmedContent = typeof message.content === "string"
                                ? message.content.trim()
                                : message.content;
                            if (trimmedContent) {
                                currentBlocks.push.apply(currentBlocks, this._convertMessageContentToBlocks(trimmedContent));
                            }
                        }
                        // TOOL messages:
                        // Tool messages are represented by "toolResult" blocks
                        // toolResult blocks must follow valid toolUse blocks (which also verifies that the tool name is present in toolConfig)
                        // If it doesn't, we convert it to a text block
                        else if (message.role === "tool") {
                            var trimmedContent = message.content.trim() || "No tool output";
                            if (hasAddedToolCallIds.has(message.toolCallId)) {
                                currentBlocks.push({
                                    toolResult: {
                                        toolUseId: message.toolCallId,
                                        content: [
                                            {
                                                text: trimmedContent,
                                            },
                                        ],
                                    },
                                });
                            }
                            else {
                                currentBlocks.push({
                                    text: "Tool call output for Tool Call ID ".concat(message.toolCallId, ":\n\n").concat(trimmedContent),
                                });
                            }
                        }
                    }
                    else if (message.role === "assistant" || message.role === "thinking") {
                        // Detect conversational turn change
                        if (currentRole !== client_bedrock_runtime_1.ConversationRole.ASSISTANT) {
                            pushCurrentMessage();
                            currentRole = client_bedrock_runtime_1.ConversationRole.ASSISTANT;
                        }
                        // ASSISTANT messages:
                        // Non-empty assistant message content is converted to "text" and "image" blocks
                        if (message.role === "assistant") {
                            var trimmedContent = typeof message.content === "string"
                                ? message.content.trim()
                                : message.content;
                            if (trimmedContent) {
                                currentBlocks.push.apply(currentBlocks, this._convertMessageContentToBlocks(trimmedContent));
                            }
                            // TOOL CALLS:
                            // Tool calls are represented by "toolUse" blocks
                            // Each tool call must have an id and a function name
                            // The function name must match one of the available tools
                            // Otherwise, we will convert it to a text block (e.g. Chat mode will pass no tools)
                            if (message.toolCalls) {
                                for (var _i = 0, _f = message.toolCalls; _i < _f.length; _i++) {
                                    var toolCall = _f[_i];
                                    if (toolCall.id && ((_b = toolCall.function) === null || _b === void 0 ? void 0 : _b.name)) {
                                        if (availableTools.has(toolCall.function.name)) {
                                            currentBlocks.push({
                                                toolUse: {
                                                    toolUseId: toolCall.id,
                                                    name: toolCall.function.name,
                                                    input: (0, parseArgs_js_1.safeParseToolCallArgs)(toolCall),
                                                },
                                            });
                                            hasAddedToolCallIds.add(toolCall.id);
                                        }
                                        else {
                                            var toolCallText = "Assistant tool call:\nTool name: ".concat(toolCall.function.name, "\nTool Call ID: ").concat(toolCall.id, "\nArguments: ").concat((_d = (_c = toolCall.function) === null || _c === void 0 ? void 0 : _c.arguments) !== null && _d !== void 0 ? _d : "{}");
                                            currentBlocks.push({
                                                text: toolCallText,
                                            });
                                        }
                                    }
                                    else {
                                        console.warn("Bedrock: tool call missing id or name, skipping tool call: ".concat(JSON.stringify(toolCall)));
                                        continue;
                                    }
                                }
                            }
                        }
                        else if (message.role === "thinking") {
                            // THINKING:
                            // Thinking messages are represented by "reasoningContent" blocks which can have redacted content or reasoning content
                            if (message.redactedThinking) {
                                var block = {
                                    reasoningContent: {
                                        redactedContent: new Uint8Array(Buffer.from(message.redactedThinking)),
                                    },
                                };
                                currentBlocks.push(block);
                            }
                            else {
                                var block = {
                                    reasoningContent: {
                                        reasoningText: {
                                            text: message.content || "",
                                            signature: message.signature,
                                        },
                                    },
                                };
                                currentBlocks.push(block);
                            }
                        }
                    }
                }
                if (currentBlocks.length > 0) {
                    pushCurrentMessage();
                }
                // If caching is enabled, we add cache_control parameter to the last two user messages
                // The second-to-last because it retrieves potentially already cached contents,
                // The last one because we want it cached for later retrieval.
                // See: https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-caching.html
                if (((_e = this.cacheBehavior) === null || _e === void 0 ? void 0 : _e.cacheConversation) ||
                    this.completionOptions.promptCaching) {
                    this._addCachingToLastTwoUserMessages(converted);
                }
                return converted;
            };
            Bedrock.prototype._addCachingToLastTwoUserMessages = function (converted) {
                var _b, _c;
                var numCached = 0;
                for (var i = converted.length - 1; i >= 0; i--) {
                    var message = converted[i];
                    if (message.role === "user") {
                        (_b = message.content) === null || _b === void 0 ? void 0 : _b.forEach(function (block) {
                            if (block.text) {
                                block.text += (0, getSecureID_js_1.getSecureID)();
                            }
                        });
                        (_c = message.content) === null || _c === void 0 ? void 0 : _c.push({ cachePoint: { type: "default" } });
                        numCached++;
                    }
                    if (numCached === 2) {
                        break;
                    }
                }
            };
            // Converts Continue message content (string/parts) to Bedrock ContentBlock format.
            // Unsupported/problematic image formats are skipped with a warning.
            Bedrock.prototype._convertMessageContentToBlocks = function (content) {
                var _b;
                var blocks = [];
                if (typeof content === "string") {
                    blocks.push({ text: content });
                }
                else {
                    for (var _i = 0, content_1 = content; _i < content_1.length; _i++) {
                        var part = content_1[_i];
                        if (part.type === "text") {
                            blocks.push({ text: part.text });
                        }
                        else if (part.type === "imageUrl" && part.imageUrl) {
                            try {
                                var _c = part.imageUrl.url.split(","), mimeType = _c[0], base64Data = _c[1];
                                var format = ((_b = mimeType.split("/")[1]) === null || _b === void 0 ? void 0 : _b.split(";")[0]) || "jpeg";
                                if (format === client_bedrock_runtime_1.ImageFormat.JPEG ||
                                    format === client_bedrock_runtime_1.ImageFormat.PNG ||
                                    format === client_bedrock_runtime_1.ImageFormat.WEBP ||
                                    format === client_bedrock_runtime_1.ImageFormat.GIF) {
                                    blocks.push({
                                        image: {
                                            format: format,
                                            source: {
                                                bytes: Uint8Array.from(Buffer.from(base64Data, "base64")),
                                            },
                                        },
                                    });
                                }
                                else {
                                    console.warn("Bedrock: skipping unsupported image part format: ".concat(format), part);
                                }
                            }
                            catch (error) {
                                console.warn("Bedrock: failed to process image part", error, part);
                            }
                        }
                    }
                }
                return blocks;
            };
            Bedrock.prototype._getCredentials = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var profile, e_3;
                    var _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                if (this.accessKeyId && this.secretAccessKey) {
                                    return [2 /*return*/, {
                                            accessKeyId: this.accessKeyId,
                                            secretAccessKey: this.secretAccessKey,
                                        }];
                                }
                                profile = (_b = this.profile) !== null && _b !== void 0 ? _b : "bedrock";
                                _c.label = 1;
                            case 1:
                                _c.trys.push([1, 3, , 4]);
                                return [4 /*yield*/, (0, credential_providers_1.fromNodeProviderChain)({
                                        profile: profile,
                                        ignoreCache: true,
                                    })()];
                            case 2: return [2 /*return*/, _c.sent()];
                            case 3:
                                e_3 = _c.sent();
                                console.warn("AWS profile with name ".concat(profile, " not found in ~/.aws/credentials, using default profile"));
                                return [3 /*break*/, 4];
                            case 4: return [4 /*yield*/, (0, credential_providers_1.fromNodeProviderChain)()()];
                            case 5: return [2 /*return*/, _c.sent()];
                        }
                    });
                });
            };
            // EMBED //
            Bedrock.prototype._embed = function (chunks) {
                return __awaiter(this, void 0, void 0, function () {
                    var credentials, client;
                    var _this = this;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, this._getCredentials()];
                            case 1:
                                credentials = _b.sent();
                                client = new client_bedrock_runtime_1.BedrockRuntimeClient({
                                    region: this.region,
                                    credentials: {
                                        accessKeyId: credentials.accessKeyId,
                                        secretAccessKey: credentials.secretAccessKey,
                                        sessionToken: credentials.sessionToken || "",
                                    },
                                });
                                return [4 /*yield*/, Promise.all(chunks.map(function (chunk) { return __awaiter(_this, void 0, void 0, function () {
                                        var input, command, response, decoder, decoded, responseBody;
                                        return __generator(this, function (_b) {
                                            switch (_b.label) {
                                                case 0:
                                                    input = this._generateInvokeModelCommandInput(chunk);
                                                    command = new client_bedrock_runtime_1.InvokeModelCommand(input);
                                                    return [4 /*yield*/, client.send(command)];
                                                case 1:
                                                    response = _b.sent();
                                                    if (response.body) {
                                                        decoder = new TextDecoder();
                                                        decoded = decoder.decode(response.body);
                                                        try {
                                                            responseBody = JSON.parse(decoded);
                                                            return [2 /*return*/, this._extractEmbeddings(responseBody)];
                                                        }
                                                        catch (e) {
                                                            console.error("Error parsing response body from:\n".concat(decoded), e);
                                                        }
                                                    }
                                                    return [2 /*return*/, []];
                                            }
                                        });
                                    }); }))];
                            case 2: return [2 /*return*/, (_b.sent()).flat()];
                        }
                    });
                });
            };
            Bedrock.prototype._generateInvokeModelCommandInput = function (text) {
                var modelConfig = this._getModelConfig();
                var payload = modelConfig.formatPayload(text);
                return {
                    body: JSON.stringify(payload),
                    modelId: this.model,
                    accept: "*/*",
                    contentType: "application/json",
                };
            };
            Bedrock.prototype._extractEmbeddings = function (responseBody) {
                var modelConfig = this._getModelConfig();
                return modelConfig.extractEmbeddings(responseBody);
            };
            Bedrock.prototype._getModelConfig = function () {
                var _this = this;
                var modelConfigs = {
                    cohere: {
                        formatPayload: function (text) { return ({
                            texts: [text],
                            input_type: "search_document",
                            truncate: "END",
                        }); },
                        extractEmbeddings: function (responseBody) { return responseBody.embeddings || []; },
                    },
                    "amazon.titan-embed": {
                        formatPayload: function (text) { return ({
                            inputText: text,
                        }); },
                        extractEmbeddings: function (responseBody) {
                            return responseBody.embedding ? [responseBody.embedding] : [];
                        },
                    },
                };
                var modelPrefix = Object.keys(modelConfigs).find(function (prefix) {
                    return _this.model.startsWith(prefix);
                });
                if (!modelPrefix) {
                    throw new Error("Unsupported model: ".concat(this.model));
                }
                return modelConfigs[modelPrefix];
            };
            Bedrock.prototype.rerank = function (query, chunks) {
                return __awaiter(this, void 0, void 0, function () {
                    var credentials, client, payload, input, command, response, decoder, decoded, responseBody, error_2;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                if (!query || !chunks.length) {
                                    throw new Error("Query and chunks must not be empty");
                                }
                                _b.label = 1;
                            case 1:
                                _b.trys.push([1, 4, , 5]);
                                return [4 /*yield*/, this._getCredentials()];
                            case 2:
                                credentials = _b.sent();
                                client = new client_bedrock_runtime_1.BedrockRuntimeClient({
                                    region: this.region,
                                    credentials: {
                                        accessKeyId: credentials.accessKeyId,
                                        secretAccessKey: credentials.secretAccessKey,
                                        sessionToken: credentials.sessionToken || "",
                                    },
                                });
                                payload = {
                                    query: query,
                                    documents: chunks.map(function (chunk) { return chunk.content; }),
                                    top_n: chunks.length,
                                };
                                // Add api_version for Cohere model
                                if (this.model.startsWith("cohere.rerank")) {
                                    payload.api_version = 2;
                                }
                                input = {
                                    body: JSON.stringify(payload),
                                    modelId: this.model,
                                    accept: "*/*",
                                    contentType: "application/json",
                                };
                                command = new client_bedrock_runtime_1.InvokeModelCommand(input);
                                return [4 /*yield*/, client.send(command)];
                            case 3:
                                response = _b.sent();
                                if (!response.body) {
                                    throw new Error("Empty response received from Bedrock");
                                }
                                decoder = new TextDecoder();
                                decoded = decoder.decode(response.body);
                                try {
                                    responseBody = JSON.parse(decoded);
                                    // Sort results by index to maintain original order
                                    return [2 /*return*/, responseBody.results
                                            .sort(function (a, b) { return a.index - b.index; })
                                            .map(function (result) { return result.relevance_score; })];
                                }
                                catch (e) {
                                    throw new Error("Error parsing JSON from Bedrock response body:\n".concat(decoded, ", ").concat(JSON.stringify(e)));
                                }
                                return [3 /*break*/, 5];
                            case 4:
                                error_2 = _b.sent();
                                if (error_2 instanceof Error) {
                                    if ("code" in error_2) {
                                        // AWS SDK specific errors
                                        throw new Error("AWS Bedrock rerank error (".concat(error_2.code, "): ").concat(error_2.message));
                                    }
                                    throw new Error("Error in BedrockReranker.rerank: ".concat(error_2.message));
                                }
                                throw new Error("Error in BedrockReranker.rerank: Unknown error occurred");
                            case 5: return [2 /*return*/];
                        }
                    });
                });
            };
            return Bedrock;
        }(_classSuper)),
        (function () {
            var _b;
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            __streamChat_decorators = [(0, retry_js_1.withLLMRetry)()];
            __esDecorate(_a, null, __streamChat_decorators, { kind: "method", name: "_streamChat", static: false, private: false, access: { has: function (obj) { return "_streamChat" in obj; }, get: function (obj) { return obj._streamChat; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a.providerName = "bedrock",
        _a.defaultOptions = {
            region: "us-east-1",
            model: "anthropic.claude-3-sonnet-20240229-v1:0",
            profile: "bedrock",
        },
        _a;
}();
exports.default = Bedrock;
