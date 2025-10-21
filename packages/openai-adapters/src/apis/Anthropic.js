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
exports.AnthropicApi = void 0;
var fetch_1 = require("@continuedev/fetch");
var util_js_1 = require("../util.js");
var emptyChatCompletion_js_1 = require("../util/emptyChatCompletion.js");
var parseArgs_js_1 = require("../util/parseArgs.js");
var AnthropicCachingStrategies_js_1 = require("./AnthropicCachingStrategies.js");
var AnthropicUtils_js_1 = require("./AnthropicUtils.js");
var AnthropicApi = /** @class */ (function () {
    function AnthropicApi(config) {
        var _a;
        this.config = config;
        this.apiBase = "https://api.anthropic.com/v1/";
        this.apiBase = (_a = config.apiBase) !== null && _a !== void 0 ? _a : this.apiBase;
        if (!this.apiBase.endsWith("/")) {
            this.apiBase += "/";
        }
    }
    AnthropicApi.prototype._convertBody = function (oaiBody) {
        var _a;
        // Step 1: Convert to clean Anthropic body (no caching)
        var cleanBody = this._convertToCleanAnthropicBody(oaiBody);
        // Step 2: Apply caching strategy
        var cachingStrategy = AnthropicCachingStrategies_js_1.CACHING_STRATEGIES[(_a = this.config.cachingStrategy) !== null && _a !== void 0 ? _a : "systemAndTools"];
        return cachingStrategy(cleanBody);
    };
    AnthropicApi.prototype.maxTokensForModel = function (model) {
        if (model.includes("haiku")) {
            return 8192;
        }
        return 32000;
    };
    AnthropicApi.prototype._convertToCleanAnthropicBody = function (oaiBody) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        var stop = undefined;
        if (oaiBody.stop && Array.isArray(oaiBody.stop)) {
            stop = oaiBody.stop.filter(function (x) { return x.trim() !== ""; });
        }
        else if (typeof oaiBody.stop === "string" && oaiBody.stop.trim() !== "") {
            stop = [oaiBody.stop];
        }
        var systemMessage = (_a = oaiBody.messages.find(function (msg) { return msg.role === "system"; })) === null || _a === void 0 ? void 0 : _a.content;
        // TODO support custom tools
        var functionTools = (_b = oaiBody.tools) === null || _b === void 0 ? void 0 : _b.filter(function (t) { return t.type === "function"; });
        var tools = undefined;
        if (oaiBody.tool_choice !== "none" &&
            functionTools &&
            functionTools.length > 0) {
            if (typeof oaiBody.tool_choice !== "string" &&
                ((_c = oaiBody.tool_choice) === null || _c === void 0 ? void 0 : _c.type) === "allowed_tools") {
                var allowedToolNames_1 = new Set((_e = (_d = oaiBody.tool_choice) === null || _d === void 0 ? void 0 : _d.allowed_tools.tools.map(function (tool) { return tool["name"]; })) !== null && _e !== void 0 ? _e : []);
                var allowedTools = functionTools.filter(function (t) {
                    return allowedToolNames_1.has(t.function.name);
                });
                tools = allowedTools.map(AnthropicUtils_js_1.openaiToolToAnthropicTool);
            }
            else {
                tools = functionTools.map(AnthropicUtils_js_1.openaiToolToAnthropicTool);
            }
        }
        var anthropicBody = {
            messages: this._convertMessages(oaiBody.messages.filter(function (msg) { return msg.role !== "system"; })),
            system: typeof systemMessage === "string"
                ? [
                    {
                        type: "text",
                        text: systemMessage,
                    },
                ]
                : systemMessage,
            top_p: (_f = oaiBody.top_p) !== null && _f !== void 0 ? _f : undefined,
            temperature: (_g = oaiBody.temperature) !== null && _g !== void 0 ? _g : undefined,
            max_tokens: (_h = oaiBody.max_tokens) !== null && _h !== void 0 ? _h : this.maxTokensForModel(oaiBody.model), // max_tokens is required
            model: oaiBody.model,
            stop_sequences: stop,
            stream: (_j = oaiBody.stream) !== null && _j !== void 0 ? _j : undefined,
            tools: tools,
            tool_choice: (0, AnthropicUtils_js_1.openAiToolChoiceToAnthropicToolChoice)(oaiBody.tool_choice),
        };
        return anthropicBody;
    };
    AnthropicApi.prototype.convertToolCallsToBlocks = function (toolCall) {
        var _a;
        var toolCallId = toolCall.id;
        var toolName = (_a = toolCall.function) === null || _a === void 0 ? void 0 : _a.name;
        if (toolCallId && toolName) {
            return {
                type: "tool_use",
                id: toolCallId,
                name: toolName,
                input: (0, parseArgs_js_1.safeParseArgs)(toolCall.function.arguments, "".concat(toolName, " ").concat(toolCallId)),
            };
        }
    };
    // 1. ignores empty content
    // 2. converts string content to text parts
    // 3. converts text and refusal parts to text blocks
    // 4. converts image parts to image blocks
    AnthropicApi.prototype.convertMessageContentToBlocks = function (content) {
        var blocks = [];
        if (typeof content === "string") {
            if (content) {
                blocks.push({
                    type: "text",
                    text: content,
                });
            }
        }
        else {
            var supportedParts = content.filter(function (p) {
                return p.type === "text" || p.type === "image_url" || p.type === "refusal";
            });
            for (var _i = 0, supportedParts_1 = supportedParts; _i < supportedParts_1.length; _i++) {
                var part = supportedParts_1[_i];
                if (part.type === "image_url") {
                    var dataUrl = part.image_url.url;
                    if (dataUrl === null || dataUrl === void 0 ? void 0 : dataUrl.startsWith("data:")) {
                        blocks.push({
                            type: "image",
                            source: {
                                type: "base64",
                                media_type: (0, AnthropicUtils_js_1.getAnthropicMediaTypeFromDataUrl)(dataUrl),
                                data: dataUrl.split(",")[1],
                            },
                        });
                    }
                }
                else {
                    var text = part.type === "text" ? part.text : part.refusal;
                    if (text) {
                        blocks.push({
                            type: "text",
                            text: text,
                        });
                    }
                }
            }
        }
        return blocks;
    };
    AnthropicApi.prototype.getContentBlocksFromChatMessage = function (message) {
        var _a;
        switch (message.role) {
            // One tool message = one tool_result block
            case "tool":
                return [
                    {
                        type: "tool_result",
                        tool_use_id: message.tool_call_id,
                        content: message.content,
                    },
                ];
            case "user":
                return this.convertMessageContentToBlocks(message.content);
            case "assistant":
                var blocks = message.content
                    ? this.convertMessageContentToBlocks(message.content)
                    : [];
                // If any tool calls are present, always put them last
                // Loses order vs what was originally sent, but they typically come last
                for (var _i = 0, _b = (_a = message.tool_calls) !== null && _a !== void 0 ? _a : []; _i < _b.length; _i++) {
                    var toolCall = _b[_i];
                    if (toolCall.type !== "function") {
                        // TODO support custom tool calls
                        continue;
                    }
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
    AnthropicApi.prototype._convertMessages = function (msgs) {
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
        return convertedMessages;
    };
    AnthropicApi.prototype.chatCompletionNonStream = function (body, signal) {
        return __awaiter(this, void 0, void 0, function () {
            var response, completion, usage;
            var _a, _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0: return [4 /*yield*/, (0, util_js_1.customFetch)(this.config.requestOptions)(new URL("messages", this.apiBase), {
                            method: "POST",
                            headers: this.getHeaders(),
                            body: JSON.stringify(this._convertBody(body)),
                            signal: signal,
                        })];
                    case 1:
                        response = _f.sent();
                        if (response.status === 499) {
                            return [2 /*return*/, emptyChatCompletion_js_1.EMPTY_CHAT_COMPLETION];
                        }
                        return [4 /*yield*/, response.json()];
                    case 2:
                        completion = _f.sent();
                        usage = completion.usage;
                        return [2 /*return*/, {
                                id: completion.id,
                                object: "chat.completion",
                                model: body.model,
                                created: Date.now(),
                                usage: {
                                    total_tokens: ((_a = usage === null || usage === void 0 ? void 0 : usage.input_tokens) !== null && _a !== void 0 ? _a : 0) + ((_b = usage === null || usage === void 0 ? void 0 : usage.output_tokens) !== null && _b !== void 0 ? _b : 0),
                                    completion_tokens: (_c = usage === null || usage === void 0 ? void 0 : usage.output_tokens) !== null && _c !== void 0 ? _c : 0,
                                    prompt_tokens: (_d = usage === null || usage === void 0 ? void 0 : usage.input_tokens) !== null && _d !== void 0 ? _d : 0,
                                    prompt_tokens_details: {
                                        cached_tokens: (_e = usage === null || usage === void 0 ? void 0 : usage.cache_read_input_tokens) !== null && _e !== void 0 ? _e : 0,
                                    },
                                },
                                choices: [
                                    {
                                        logprobs: null,
                                        finish_reason: "stop",
                                        message: {
                                            role: "assistant",
                                            content: completion.content[0].text,
                                            refusal: null,
                                        },
                                        index: 0,
                                    },
                                ],
                            }];
                }
            });
        });
    };
    // This is split off so e.g. VertexAI can use it
    AnthropicApi.prototype.handleStreamResponse = function (response, model) {
        return __asyncGenerator(this, arguments, function handleStreamResponse_1() {
            var lastToolUseId, lastToolUseName, usage, _a, _b, _c, event_1, rawEvent, _d, blockStartEvent, startEvent, deltaEvent, blockDeltaEvent, _e, e_1_1;
            var _f, e_1, _g, _h;
            var _j, _k, _l, _m, _o, _p;
            return __generator(this, function (_q) {
                switch (_q.label) {
                    case 0:
                        usage = {
                            completion_tokens: 0,
                            prompt_tokens: 0,
                            total_tokens: 0,
                        };
                        _q.label = 1;
                    case 1:
                        _q.trys.push([1, 19, 20, 25]);
                        _a = true, _b = __asyncValues((0, fetch_1.streamSse)(response));
                        _q.label = 2;
                    case 2: return [4 /*yield*/, __await(_b.next())];
                    case 3:
                        if (!(_c = _q.sent(), _f = _c.done, !_f)) return [3 /*break*/, 18];
                        _h = _c.value;
                        _a = false;
                        event_1 = _h;
                        rawEvent = event_1;
                        _d = rawEvent.type;
                        switch (_d) {
                            case "content_block_start": return [3 /*break*/, 4];
                            case "message_start": return [3 /*break*/, 5];
                            case "message_delta": return [3 /*break*/, 6];
                            case "content_block_delta": return [3 /*break*/, 7];
                            case "content_block_stop": return [3 /*break*/, 15];
                        }
                        return [3 /*break*/, 16];
                    case 4:
                        blockStartEvent = rawEvent;
                        if (blockStartEvent.content_block.type === "tool_use") {
                            lastToolUseId = blockStartEvent.content_block.id;
                            lastToolUseName = blockStartEvent.content_block.name;
                        }
                        return [3 /*break*/, 17];
                    case 5:
                        startEvent = rawEvent;
                        usage.prompt_tokens = (_k = (_j = startEvent.message.usage) === null || _j === void 0 ? void 0 : _j.input_tokens) !== null && _k !== void 0 ? _k : 0;
                        usage.prompt_tokens_details = {
                            cached_tokens: (_m = (_l = startEvent.message.usage) === null || _l === void 0 ? void 0 : _l.cache_read_input_tokens) !== null && _m !== void 0 ? _m : 0,
                        };
                        return [3 /*break*/, 17];
                    case 6:
                        deltaEvent = rawEvent;
                        usage.completion_tokens = (_p = (_o = deltaEvent.usage) === null || _o === void 0 ? void 0 : _o.output_tokens) !== null && _p !== void 0 ? _p : 0;
                        return [3 /*break*/, 17];
                    case 7:
                        blockDeltaEvent = rawEvent;
                        _e = blockDeltaEvent.delta.type;
                        switch (_e) {
                            case "text_delta": return [3 /*break*/, 8];
                            case "input_json_delta": return [3 /*break*/, 11];
                        }
                        return [3 /*break*/, 14];
                    case 8: return [4 /*yield*/, __await((0, util_js_1.chatChunk)({
                            content: blockDeltaEvent.delta.text,
                            model: model,
                        }))];
                    case 9: return [4 /*yield*/, _q.sent()];
                    case 10:
                        _q.sent();
                        return [3 /*break*/, 14];
                    case 11:
                        if (!lastToolUseId || !lastToolUseName) {
                            throw new Error("No tool use found");
                        }
                        return [4 /*yield*/, __await((0, util_js_1.chatChunkFromDelta)({
                                model: model,
                                delta: {
                                    tool_calls: [
                                        {
                                            id: lastToolUseId,
                                            type: "function",
                                            index: 0,
                                            function: {
                                                name: lastToolUseName,
                                                arguments: blockDeltaEvent.delta.partial_json,
                                            },
                                        },
                                    ],
                                },
                            }))];
                    case 12: return [4 /*yield*/, _q.sent()];
                    case 13:
                        _q.sent();
                        return [3 /*break*/, 14];
                    case 14: return [3 /*break*/, 17];
                    case 15:
                        lastToolUseId = undefined;
                        lastToolUseName = undefined;
                        return [3 /*break*/, 17];
                    case 16: return [3 /*break*/, 17];
                    case 17:
                        _a = true;
                        return [3 /*break*/, 2];
                    case 18: return [3 /*break*/, 25];
                    case 19:
                        e_1_1 = _q.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 25];
                    case 20:
                        _q.trys.push([20, , 23, 24]);
                        if (!(!_a && !_f && (_g = _b.return))) return [3 /*break*/, 22];
                        return [4 /*yield*/, __await(_g.call(_b))];
                    case 21:
                        _q.sent();
                        _q.label = 22;
                    case 22: return [3 /*break*/, 24];
                    case 23:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 24: return [7 /*endfinally*/];
                    case 25: return [4 /*yield*/, __await((0, util_js_1.usageChatChunk)({
                            model: model,
                            usage: __assign(__assign({}, usage), { total_tokens: usage.completion_tokens + usage.prompt_tokens }),
                        }))];
                    case 26: return [4 /*yield*/, _q.sent()];
                    case 27:
                        _q.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AnthropicApi.prototype.chatCompletionStream = function (body, signal) {
        return __asyncGenerator(this, arguments, function chatCompletionStream_1() {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, __await((0, util_js_1.customFetch)(this.config.requestOptions)(new URL("messages", this.apiBase), {
                            method: "POST",
                            headers: this.getHeaders(),
                            body: JSON.stringify(this._convertBody(body)),
                            signal: signal,
                        }))];
                    case 1:
                        response = _a.sent();
                        return [5 /*yield**/, __values(__asyncDelegator(__asyncValues(this.handleStreamResponse(response, body.model))))];
                    case 2: return [4 /*yield*/, __await.apply(void 0, [_a.sent()])];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AnthropicApi.prototype.getHeaders = function () {
        var _a;
        var enableCaching = ((_a = this.config) === null || _a === void 0 ? void 0 : _a.cachingStrategy) !== "none";
        return (0, AnthropicUtils_js_1.getAnthropicHeaders)(this.config.apiKey, enableCaching);
    };
    AnthropicApi.prototype.completionNonStream = function (body, signal) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error("Method not implemented.");
            });
        });
    };
    AnthropicApi.prototype.completionStream = function (body, signal) {
        return __asyncGenerator(this, arguments, function completionStream_1() {
            return __generator(this, function (_a) {
                throw new Error("Method not implemented.");
            });
        });
    };
    AnthropicApi.prototype.fimStream = function (body, signal) {
        return __asyncGenerator(this, arguments, function fimStream_1() {
            return __generator(this, function (_a) {
                throw new Error("Method not implemented.");
            });
        });
    };
    AnthropicApi.prototype.embed = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error("Method not implemented.");
            });
        });
    };
    AnthropicApi.prototype.rerank = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error("Method not implemented.");
            });
        });
    };
    AnthropicApi.prototype.list = function () {
        throw new Error("Method not implemented.");
    };
    return AnthropicApi;
}());
exports.AnthropicApi = AnthropicApi;
