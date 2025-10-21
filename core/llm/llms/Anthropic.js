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
var __asyncDelegator = (this && this.__asyncDelegator) || function (o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var fetch_1 = require("@continuedev/fetch");
var openai_adapters_1 = require("@continuedev/openai-adapters");
var parseArgs_js_1 = require("../../tools/parseArgs.js");
var messageContent_js_1 = require("../../util/messageContent.js");
var constants_js_1 = require("../constants.js");
var index_js_1 = require("../index.js");
var Anthropic = /** @class */ (function (_super) {
    __extends(Anthropic, _super);
    function Anthropic() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Anthropic.prototype.convertToolToAnthropicTool = function (tool) {
        var _a;
        return {
            name: tool.function.name,
            description: tool.function.description,
            input_schema: (_a = tool.function.parameters) !== null && _a !== void 0 ? _a : {
                // TODO unsafe tool.function.parameters casting
                type: "object",
            },
        };
    };
    // Public for use within VertexAI
    Anthropic.prototype.convertArgs = function (options) {
        var _a, _b, _c, _d, _e;
        var finalOptions = {
            top_k: options.topK,
            top_p: options.topP,
            temperature: options.temperature,
            max_tokens: (_a = options.maxTokens) !== null && _a !== void 0 ? _a : 2048,
            model: options.model === "claude-2" ? "claude-2.1" : options.model,
            stop_sequences: (_b = options.stop) === null || _b === void 0 ? void 0 : _b.filter(function (x) { return x.trim() !== ""; }),
            stream: (_c = options.stream) !== null && _c !== void 0 ? _c : true,
            tools: (_d = options.tools) === null || _d === void 0 ? void 0 : _d.map(this.convertToolToAnthropicTool),
            thinking: options.reasoning
                ? {
                    type: "enabled",
                    budget_tokens: (_e = options.reasoningBudgetTokens) !== null && _e !== void 0 ? _e : constants_js_1.DEFAULT_REASONING_TOKENS,
                }
                : undefined,
            tool_choice: options.toolChoice
                ? {
                    type: "tool",
                    name: options.toolChoice.function.name,
                }
                : undefined,
        };
        return finalOptions;
    };
    Anthropic.prototype.convertMessageContentToBlocks = function (content) {
        if (typeof content === "string") {
            return [
                {
                    type: "text",
                    text: content,
                },
            ];
        }
        return content.map(function (part) {
            if (part.type === "text") {
                return {
                    type: "text",
                    text: part.text,
                };
            }
            return {
                type: "image",
                source: {
                    type: "base64",
                    media_type: (0, openai_adapters_1.getAnthropicMediaTypeFromDataUrl)(part.imageUrl.url),
                    data: part.imageUrl.url.split(",")[1],
                },
            };
        });
    };
    Anthropic.prototype.convertToolCallsToBlocks = function (toolCall) {
        var _a;
        var toolCallId = toolCall.id;
        var toolName = (_a = toolCall.function) === null || _a === void 0 ? void 0 : _a.name;
        if (toolCallId && toolName) {
            return {
                type: "tool_use",
                id: toolCallId,
                name: toolName,
                input: (0, parseArgs_js_1.safeParseToolCallArgs)(toolCall),
            };
        }
    };
    Anthropic.prototype.getContentBlocksFromChatMessage = function (message) {
        var _a, _b;
        switch (message.role) {
            // One tool message = one tool_result block
            case "tool":
                return [
                    {
                        type: "tool_result",
                        tool_use_id: message.toolCallId,
                        content: (0, messageContent_js_1.renderChatMessage)(message) || undefined,
                    },
                ];
            case "user":
                return this.convertMessageContentToBlocks(message.content);
            case "thinking":
                if (message.redactedThinking) {
                    return [
                        {
                            type: "redacted_thinking",
                            data: message.redactedThinking,
                        },
                    ];
                }
                if (typeof message.content === "string") {
                    return [
                        {
                            type: "thinking",
                            thinking: message.content,
                            signature: (_a = message.signature) !== null && _a !== void 0 ? _a : "", // TODO - unsafe signature
                        },
                    ];
                }
                var textParts = message.content.filter(function (p) { return p.type === "text"; });
                return textParts.map(function (part) {
                    var _a;
                    return ({
                        type: "thinking",
                        thinking: part.text,
                        signature: (_a = message.signature) !== null && _a !== void 0 ? _a : "", // TODO - unsafe signature
                    });
                });
            case "assistant":
                var blocks = this.convertMessageContentToBlocks(message.content);
                // If any tool calls are present, always put them last
                // Loses order vs what was originally sent, but they typically come last
                for (var _i = 0, _c = (_b = message.toolCalls) !== null && _b !== void 0 ? _b : []; _i < _c.length; _i++) {
                    var toolCall = _c[_i];
                    var block = this.convertToolCallsToBlocks(toolCall);
                    if (block) {
                        blocks.push(block);
                    }
                }
                return blocks;
            // system, etc.
            default:
                return [];
        }
    };
    Anthropic.prototype.convertMessages = function (msgs, cachePrompt) {
        var nonSystemMessages = msgs.filter(function (m) { return m.role !== "system"; });
        var convertedMessages = [];
        var currentRole = undefined;
        var currentParts = [];
        var flushCurrentMessage = function () {
            if (currentRole && currentParts.length > 0) {
                convertedMessages.push({
                    role: currentRole,
                    content: currentParts,
                });
                currentParts = [];
            }
        };
        for (var _i = 0, nonSystemMessages_1 = nonSystemMessages; _i < nonSystemMessages_1.length; _i++) {
            var message = nonSystemMessages_1[_i];
            var newRole = message.role === "user" || message.role === "tool"
                ? "user"
                : "assistant";
            if (currentRole !== newRole) {
                flushCurrentMessage();
                currentRole = newRole;
            }
            currentParts.push.apply(currentParts, this.getContentBlocksFromChatMessage(message));
        }
        flushCurrentMessage();
        if (cachePrompt) {
            (0, openai_adapters_1.addCacheControlToLastTwoUserMessages)(convertedMessages);
        }
        return convertedMessages;
    };
    Anthropic.prototype._streamComplete = function (prompt, signal, options) {
        return __asyncGenerator(this, arguments, function _streamComplete_1() {
            var messages, _a, _b, _c, update, e_1_1;
            var _d, e_1, _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        messages = [{ role: "user", content: prompt }];
                        _g.label = 1;
                    case 1:
                        _g.trys.push([1, 8, 9, 14]);
                        _a = true, _b = __asyncValues(this._streamChat(messages, signal, options));
                        _g.label = 2;
                    case 2: return [4 /*yield*/, __await(_b.next())];
                    case 3:
                        if (!(_c = _g.sent(), _d = _c.done, !_d)) return [3 /*break*/, 7];
                        _f = _c.value;
                        _a = false;
                        update = _f;
                        return [4 /*yield*/, __await((0, messageContent_js_1.renderChatMessage)(update))];
                    case 4: return [4 /*yield*/, _g.sent()];
                    case 5:
                        _g.sent();
                        _g.label = 6;
                    case 6:
                        _a = true;
                        return [3 /*break*/, 2];
                    case 7: return [3 /*break*/, 14];
                    case 8:
                        e_1_1 = _g.sent();
                        e_1 = { error: e_1_1 };
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
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 13: return [7 /*endfinally*/];
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    Anthropic.prototype.handleResponse = function (response, stream) {
        return __asyncGenerator(this, arguments, function handleResponse_1() {
            var json, json, cost, lastToolUseId, lastToolUseName, usage, _a, _b, _c, event_1, rawEvent, _d, startEvent, deltaEvent, blockStartEvent, blockDeltaEvent, _e, e_2_1;
            var _f, e_2, _g, _h;
            var _j, _k;
            return __generator(this, function (_l) {
                switch (_l.label) {
                    case 0:
                        if (!(response.status === 499)) return [3 /*break*/, 2];
                        return [4 /*yield*/, __await(void 0)];
                    case 1: return [2 /*return*/, _l.sent()]; // Aborted by user
                    case 2:
                        if (!!response.ok) return [3 /*break*/, 4];
                        return [4 /*yield*/, __await(response.json())];
                    case 3:
                        json = _l.sent();
                        if (json.type === "error") {
                            throw new Error((0, openai_adapters_1.getAnthropicErrorMessage)(json));
                        }
                        throw new Error("Anthropic API sent back ".concat(response.status, ": ").concat(JSON.stringify(json)));
                    case 4:
                        if (!(stream === false)) return [3 /*break*/, 9];
                        return [4 /*yield*/, __await(response.json())];
                    case 5:
                        json = _l.sent();
                        cost = json.usage
                            ? {
                                inputTokens: json.usage.input_tokens,
                                outputTokens: json.usage.output_tokens,
                                totalTokens: json.usage.input_tokens + json.usage.output_tokens,
                            }
                            : {};
                        return [4 /*yield*/, __await(__assign({ role: "assistant", content: json.content[0].text }, (Object.keys(cost).length > 0 ? { cost: cost } : {})))];
                    case 6: return [4 /*yield*/, _l.sent()];
                    case 7:
                        _l.sent();
                        return [4 /*yield*/, __await(void 0)];
                    case 8: return [2 /*return*/, _l.sent()];
                    case 9:
                        usage = {
                            promptTokens: 0,
                            completionTokens: 0,
                            promptTokensDetails: {
                                cachedTokens: 0,
                                cacheWriteTokens: 0,
                            },
                        };
                        _l.label = 10;
                    case 10:
                        _l.trys.push([10, 37, 38, 43]);
                        _a = true, _b = __asyncValues((0, fetch_1.streamSse)(response));
                        _l.label = 11;
                    case 11: return [4 /*yield*/, __await(_b.next())];
                    case 12:
                        if (!(_c = _l.sent(), _f = _c.done, !_f)) return [3 /*break*/, 36];
                        _h = _c.value;
                        _a = false;
                        event_1 = _h;
                        rawEvent = event_1;
                        _d = event_1.type;
                        switch (_d) {
                            case "message_start": return [3 /*break*/, 13];
                            case "message_delta": return [3 /*break*/, 14];
                            case "content_block_start": return [3 /*break*/, 15];
                            case "content_block_delta": return [3 /*break*/, 19];
                            case "content_block_stop": return [3 /*break*/, 33];
                        }
                        return [3 /*break*/, 34];
                    case 13:
                        startEvent = rawEvent;
                        usage.promptTokens = startEvent.message.usage.input_tokens;
                        usage.promptTokensDetails.cachedTokens =
                            (_j = startEvent.message.usage.cache_read_input_tokens) !== null && _j !== void 0 ? _j : undefined;
                        usage.promptTokensDetails.cacheWriteTokens =
                            (_k = startEvent.message.usage.cache_creation_input_tokens) !== null && _k !== void 0 ? _k : undefined;
                        return [3 /*break*/, 35];
                    case 14:
                        deltaEvent = rawEvent;
                        if (deltaEvent.usage) {
                            usage.completionTokens = deltaEvent.usage.output_tokens;
                        }
                        return [3 /*break*/, 35];
                    case 15:
                        blockStartEvent = rawEvent;
                        if (blockStartEvent.content_block.type === "tool_use") {
                            lastToolUseId = blockStartEvent.content_block.id;
                            lastToolUseName = blockStartEvent.content_block.name;
                        }
                        if (!(blockStartEvent.content_block.type === "redacted_thinking")) return [3 /*break*/, 18];
                        return [4 /*yield*/, __await({
                                role: "thinking",
                                content: "",
                                redactedThinking: blockStartEvent.content_block.data,
                            })];
                    case 16: return [4 /*yield*/, _l.sent()];
                    case 17:
                        _l.sent();
                        _l.label = 18;
                    case 18: return [3 /*break*/, 35];
                    case 19:
                        blockDeltaEvent = rawEvent;
                        _e = blockDeltaEvent.delta.type;
                        switch (_e) {
                            case "text_delta": return [3 /*break*/, 20];
                            case "thinking_delta": return [3 /*break*/, 23];
                            case "signature_delta": return [3 /*break*/, 26];
                            case "input_json_delta": return [3 /*break*/, 29];
                        }
                        return [3 /*break*/, 32];
                    case 20: return [4 /*yield*/, __await({ role: "assistant", content: blockDeltaEvent.delta.text })];
                    case 21: return [4 /*yield*/, _l.sent()];
                    case 22:
                        _l.sent();
                        return [3 /*break*/, 32];
                    case 23: return [4 /*yield*/, __await({
                            role: "thinking",
                            content: blockDeltaEvent.delta.thinking,
                        })];
                    case 24: return [4 /*yield*/, _l.sent()];
                    case 25:
                        _l.sent();
                        return [3 /*break*/, 32];
                    case 26: return [4 /*yield*/, __await({
                            role: "thinking",
                            content: "",
                            signature: blockDeltaEvent.delta.signature,
                        })];
                    case 27: return [4 /*yield*/, _l.sent()];
                    case 28:
                        _l.sent();
                        return [3 /*break*/, 32];
                    case 29:
                        if (!lastToolUseId || !lastToolUseName) {
                            throw new Error("No tool use found");
                        }
                        return [4 /*yield*/, __await({
                                role: "assistant",
                                content: "",
                                toolCalls: [
                                    {
                                        id: lastToolUseId,
                                        type: "function",
                                        function: {
                                            name: lastToolUseName,
                                            arguments: blockDeltaEvent.delta.partial_json,
                                        },
                                    },
                                ],
                            })];
                    case 30: return [4 /*yield*/, _l.sent()];
                    case 31:
                        _l.sent();
                        return [3 /*break*/, 32];
                    case 32: return [3 /*break*/, 35];
                    case 33:
                        lastToolUseId = undefined;
                        lastToolUseName = undefined;
                        return [3 /*break*/, 35];
                    case 34: return [3 /*break*/, 35];
                    case 35:
                        _a = true;
                        return [3 /*break*/, 11];
                    case 36: return [3 /*break*/, 43];
                    case 37:
                        e_2_1 = _l.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 43];
                    case 38:
                        _l.trys.push([38, , 41, 42]);
                        if (!(!_a && !_f && (_g = _b.return))) return [3 /*break*/, 40];
                        return [4 /*yield*/, __await(_g.call(_b))];
                    case 39:
                        _l.sent();
                        _l.label = 40;
                    case 40: return [3 /*break*/, 42];
                    case 41:
                        if (e_2) throw e_2.error;
                        return [7 /*endfinally*/];
                    case 42: return [7 /*endfinally*/];
                    case 43: return [4 /*yield*/, __await({
                            role: "assistant",
                            content: "",
                            usage: usage,
                        })];
                    case 44: return [4 /*yield*/, _l.sent()];
                    case 45:
                        _l.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Anthropic.prototype._streamChat = function (messages, signal, options) {
        return __asyncGenerator(this, arguments, function _streamChat_1() {
            var systemMessage, shouldCacheSystemMessage, shouldCachePrompt, msgs, headers, body, response;
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (!this.apiKey || this.apiKey === "") {
                            throw new Error("Request not sent. You have an Anthropic model configured in your config.json, but the API key is not set.");
                        }
                        systemMessage = (0, messageContent_js_1.stripImages)((_b = (_a = messages.filter(function (m) { return m.role === "system"; })[0]) === null || _a === void 0 ? void 0 : _a.content) !== null && _b !== void 0 ? _b : "");
                        shouldCacheSystemMessage = !!(((_c = this.cacheBehavior) === null || _c === void 0 ? void 0 : _c.cacheSystemMessage) && systemMessage);
                        shouldCachePrompt = !!(((_d = this.cacheBehavior) === null || _d === void 0 ? void 0 : _d.cacheConversation) ||
                            this.completionOptions.promptCaching);
                        msgs = this.convertMessages(messages, shouldCachePrompt);
                        headers = (0, openai_adapters_1.getAnthropicHeaders)(this.apiKey, shouldCacheSystemMessage || shouldCachePrompt);
                        body = __assign(__assign({}, this.convertArgs(options)), { messages: msgs, system: shouldCacheSystemMessage
                                ? [
                                    {
                                        type: "text",
                                        text: systemMessage,
                                        cache_control: { type: "ephemeral" },
                                    },
                                ]
                                : systemMessage });
                        return [4 /*yield*/, __await(this.fetch(new URL("messages", this.apiBase), {
                                method: "POST",
                                headers: headers,
                                body: JSON.stringify(body),
                                signal: signal,
                            }))];
                    case 1:
                        response = _e.sent();
                        return [5 /*yield**/, __values(__asyncDelegator(__asyncValues(this.handleResponse(response, options.stream))))];
                    case 2: return [4 /*yield*/, __await.apply(void 0, [_e.sent()])];
                    case 3:
                        _e.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Anthropic.providerName = "anthropic";
    Anthropic.defaultOptions = {
        model: "claude-3-5-sonnet-latest",
        completionOptions: {
            model: "claude-3-5-sonnet-latest",
            maxTokens: 8192,
        },
        apiBase: "https://api.anthropic.com/v1/",
    };
    return Anthropic;
}(index_js_1.BaseLLM));
exports.default = Anthropic;
