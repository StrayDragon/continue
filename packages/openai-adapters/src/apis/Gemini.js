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
exports.GeminiApi = void 0;
var fetch_1 = require("@continuedev/fetch");
var uuid_1 = require("uuid");
var util_js_1 = require("../util.js");
var gemini_types_js_1 = require("../util/gemini-types.js");
var parseArgs_js_1 = require("../util/parseArgs.js");
var GeminiApi = /** @class */ (function () {
    function GeminiApi(config) {
        var _a;
        this.config = config;
        this.apiBase = "https://generativelanguage.googleapis.com/v1beta/";
        this.apiBase = (_a = config.apiBase) !== null && _a !== void 0 ? _a : this.apiBase;
    }
    GeminiApi.prototype._convertMessages = function (msgs) {
        return msgs.map(function (m) { return ({
            role: m.role === "assistant" ? "CHATBOT" : "USER",
            message: m.content,
        }); });
    };
    GeminiApi.prototype._oaiPartToGeminiPart = function (part) {
        var _a;
        switch (part.type) {
            case "refusal":
                return {
                    text: part.refusal,
                };
            case "text":
                return {
                    text: part.text,
                };
            case "input_audio":
                throw new Error("Unsupported part type: input_audio");
            case "image_url":
            default:
                return {
                    inlineData: {
                        mimeType: "image/jpeg",
                        data: (_a = part.image_url) === null || _a === void 0 ? void 0 : _a.url.split(",")[1],
                    },
                };
        }
    };
    GeminiApi.prototype._convertBody = function (oaiBody, url, includeToolCallIds, overrideIsV1) {
        var _this = this;
        var _a;
        var generationConfig = {};
        if (oaiBody.top_p) {
            generationConfig.topP = oaiBody.top_p;
        }
        if (oaiBody.temperature !== undefined && oaiBody.temperature !== null) {
            generationConfig.temperature = oaiBody.temperature;
        }
        if (oaiBody.max_tokens) {
            generationConfig.maxOutputTokens = oaiBody.max_tokens;
        }
        if (oaiBody.stop) {
            var stop_1 = Array.isArray(oaiBody.stop) ? oaiBody.stop : [oaiBody.stop];
            generationConfig.stopSequences = stop_1.filter(function (x) { return x.trim() !== ""; });
        }
        var isV1API = overrideIsV1 !== null && overrideIsV1 !== void 0 ? overrideIsV1 : url.includes("/v1/");
        var toolCallIdToNameMap = new Map();
        oaiBody.messages.forEach(function (msg) {
            if (msg.role === "assistant" && msg.tool_calls) {
                msg.tool_calls.forEach(function (call) {
                    // Type guard for function tool calls
                    if (call.type === "function" && "function" in call) {
                        toolCallIdToNameMap.set(call.id, call.function.name);
                    }
                });
            }
        });
        var contents = oaiBody.messages
            .map(function (msg) {
            var _a;
            if (msg.role === "system" && !isV1API) {
                return null; // Don't include system message in contents
            }
            if (msg.role === "assistant" && ((_a = msg.tool_calls) === null || _a === void 0 ? void 0 : _a.length)) {
                for (var _i = 0, _b = msg.tool_calls; _i < _b.length; _i++) {
                    var toolCall = _b[_i];
                    // Type guard for function tool calls
                    if (toolCall.type === "function" && "function" in toolCall) {
                        toolCallIdToNameMap.set(toolCall.id, toolCall.function.name);
                    }
                }
                return {
                    role: "model",
                    parts: msg.tool_calls.map(function (toolCall) {
                        // Type guard for function tool calls
                        if (toolCall.type === "function" && "function" in toolCall) {
                            return {
                                functionCall: {
                                    id: includeToolCallIds ? toolCall.id : undefined,
                                    name: toolCall.function.name,
                                    args: (0, parseArgs_js_1.safeParseArgs)(toolCall.function.arguments, "Call: ".concat(toolCall.function.name, " ").concat(toolCall.id)),
                                },
                            };
                        }
                        else {
                            throw new Error("Unsupported tool call type in Gemini: ".concat(toolCall.type));
                        }
                    }),
                };
            }
            if (msg.role === "tool") {
                var functionName = toolCallIdToNameMap.get(msg.tool_call_id);
                return {
                    role: "user",
                    parts: [
                        {
                            functionResponse: {
                                id: includeToolCallIds ? msg.tool_call_id : undefined,
                                name: functionName !== null && functionName !== void 0 ? functionName : "unknown",
                                response: {
                                    content: typeof msg.content === "string"
                                        ? msg.content
                                        : msg.content.map(function (part) { return part.text; }).join(""),
                                },
                            },
                        },
                    ],
                };
            }
            if (!msg.content) {
                return null;
            }
            return {
                role: msg.role === "assistant" ? "model" : "user",
                parts: typeof msg.content === "string"
                    ? [{ text: msg.content }]
                    : msg.content.map(_this._oaiPartToGeminiPart),
            };
        })
            .filter(function (c) { return c !== null; });
        var sysMsg = oaiBody.messages.find(function (msg) { return msg.role === "system"; });
        var finalBody = __assign({ generationConfig: generationConfig, contents: contents }, (sysMsg &&
            !isV1API && {
            systemInstruction: { parts: [{ text: sysMsg.content }] },
        }));
        if (!isV1API) {
            // Convert and add tools if present
            if ((_a = oaiBody.tools) === null || _a === void 0 ? void 0 : _a.length) {
                // Choosing to map all tools to the functionDeclarations of one tool
                // Rather than map each tool to its own tool + functionDeclaration
                // Same difference
                var functions_1 = [];
                oaiBody.tools.forEach(function (tool) {
                    try {
                        functions_1.push((0, gemini_types_js_1.convertOpenAIToolToGeminiFunction)(tool));
                    }
                    catch (e) {
                        console.warn("Failed to convert tool to gemini function definition. Skipping: ".concat(JSON.stringify(tool, null, 2)));
                    }
                });
                if (functions_1.length) {
                    finalBody.tools = [
                        {
                            functionDeclarations: functions_1,
                        },
                    ];
                }
            }
        }
        return finalBody;
    };
    GeminiApi.prototype.chatCompletionNonStream = function (body, signal) {
        return __awaiter(this, void 0, void 0, function () {
            var completion, usage, _a, _b, _c, chunk, e_1_1;
            var _d, e_1, _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        completion = "";
                        usage = undefined;
                        _g.label = 1;
                    case 1:
                        _g.trys.push([1, 6, 7, 12]);
                        _a = true, _b = __asyncValues(this.chatCompletionStream(__assign(__assign({}, body), { stream: true }), signal));
                        _g.label = 2;
                    case 2: return [4 /*yield*/, _b.next()];
                    case 3:
                        if (!(_c = _g.sent(), _d = _c.done, !_d)) return [3 /*break*/, 5];
                        _f = _c.value;
                        _a = false;
                        chunk = _f;
                        if (chunk.choices.length > 0) {
                            completion += chunk.choices[0].delta.content || "";
                        }
                        if (chunk.usage) {
                            usage = chunk.usage;
                        }
                        _g.label = 4;
                    case 4:
                        _a = true;
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 12];
                    case 6:
                        e_1_1 = _g.sent();
                        e_1 = { error: e_1_1 };
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
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 11: return [7 /*endfinally*/];
                    case 12: return [2 /*return*/, {
                            id: "",
                            object: "chat.completion",
                            model: body.model,
                            created: Date.now(),
                            choices: [
                                {
                                    index: 0,
                                    logprobs: null,
                                    finish_reason: "stop",
                                    message: {
                                        role: "assistant",
                                        content: completion,
                                        refusal: null,
                                    },
                                },
                            ],
                            usage: usage,
                        }];
                }
            });
        });
    };
    GeminiApi.prototype.handleStreamResponse = function (response, model) {
        return __asyncGenerator(this, arguments, function handleStreamResponse_1() {
            var buffer, usage, _a, _b, _c, chunk, parts, foundIncomplete, i, part, data, contentParts, _i, contentParts_1, part_1, e_2_1;
            var _d, e_2, _e, _f;
            var _g, _h, _j, _k;
            return __generator(this, function (_l) {
                switch (_l.label) {
                    case 0:
                        buffer = "";
                        usage = undefined;
                        _l.label = 1;
                    case 1:
                        _l.trys.push([1, 18, 19, 24]);
                        _a = true, _b = __asyncValues((0, fetch_1.streamResponse)(response));
                        _l.label = 2;
                    case 2: return [4 /*yield*/, __await(_b.next())];
                    case 3:
                        if (!(_c = _l.sent(), _d = _c.done, !_d)) return [3 /*break*/, 17];
                        _f = _c.value;
                        _a = false;
                        chunk = _f;
                        buffer += chunk;
                        if (buffer.startsWith("[")) {
                            buffer = buffer.slice(1);
                        }
                        if (buffer.endsWith("]")) {
                            buffer = buffer.slice(0, -1);
                        }
                        if (buffer.startsWith(",")) {
                            buffer = buffer.slice(1);
                        }
                        parts = buffer.split("\n,");
                        foundIncomplete = false;
                        i = 0;
                        _l.label = 4;
                    case 4:
                        if (!(i < parts.length)) return [3 /*break*/, 15];
                        part = parts[i];
                        data = void 0;
                        try {
                            data = JSON.parse(part);
                        }
                        catch (e) {
                            foundIncomplete = true;
                            return [3 /*break*/, 14]; // yo!
                        }
                        if (data.error) {
                            throw new Error(data.error.message);
                        }
                        // Check for usage metadata
                        if (data.usageMetadata) {
                            usage = {
                                prompt_tokens: data.usageMetadata.promptTokenCount || 0,
                                completion_tokens: data.usageMetadata.candidatesTokenCount || 0,
                                total_tokens: data.usageMetadata.totalTokenCount || 0,
                            };
                        }
                        contentParts = (_j = (_h = (_g = data === null || data === void 0 ? void 0 : data.candidates) === null || _g === void 0 ? void 0 : _g[0]) === null || _h === void 0 ? void 0 : _h.content) === null || _j === void 0 ? void 0 : _j.parts;
                        if (!contentParts) return [3 /*break*/, 13];
                        _i = 0, contentParts_1 = contentParts;
                        _l.label = 5;
                    case 5:
                        if (!(_i < contentParts_1.length)) return [3 /*break*/, 12];
                        part_1 = contentParts_1[_i];
                        if (!("text" in part_1)) return [3 /*break*/, 8];
                        return [4 /*yield*/, __await((0, util_js_1.chatChunk)({
                                content: part_1.text,
                                model: model,
                            }))];
                    case 6: return [4 /*yield*/, _l.sent()];
                    case 7:
                        _l.sent();
                        return [3 /*break*/, 11];
                    case 8:
                        if (!("functionCall" in part_1)) return [3 /*break*/, 11];
                        return [4 /*yield*/, __await((0, util_js_1.chatChunkFromDelta)({
                                model: model,
                                delta: {
                                    tool_calls: [
                                        {
                                            index: 0,
                                            id: (_k = part_1.functionCall.id) !== null && _k !== void 0 ? _k : (0, uuid_1.v4)(),
                                            type: "function",
                                            function: {
                                                name: part_1.functionCall.name,
                                                arguments: JSON.stringify(part_1.functionCall.args),
                                            },
                                        },
                                    ],
                                },
                            }))];
                    case 9: return [4 /*yield*/, _l.sent()];
                    case 10:
                        _l.sent();
                        _l.label = 11;
                    case 11:
                        _i++;
                        return [3 /*break*/, 5];
                    case 12: return [3 /*break*/, 14];
                    case 13:
                        console.warn("Unexpected response format:", data);
                        _l.label = 14;
                    case 14:
                        i++;
                        return [3 /*break*/, 4];
                    case 15:
                        if (foundIncomplete) {
                            buffer = parts[parts.length - 1];
                        }
                        else {
                            buffer = "";
                        }
                        _l.label = 16;
                    case 16:
                        _a = true;
                        return [3 /*break*/, 2];
                    case 17: return [3 /*break*/, 24];
                    case 18:
                        e_2_1 = _l.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 24];
                    case 19:
                        _l.trys.push([19, , 22, 23]);
                        if (!(!_a && !_d && (_e = _b.return))) return [3 /*break*/, 21];
                        return [4 /*yield*/, __await(_e.call(_b))];
                    case 20:
                        _l.sent();
                        _l.label = 21;
                    case 21: return [3 /*break*/, 23];
                    case 22:
                        if (e_2) throw e_2.error;
                        return [7 /*endfinally*/];
                    case 23: return [7 /*endfinally*/];
                    case 24:
                        if (!usage) return [3 /*break*/, 27];
                        return [4 /*yield*/, __await((0, util_js_1.usageChatChunk)({
                                model: model,
                                usage: usage,
                            }))];
                    case 25: return [4 /*yield*/, _l.sent()];
                    case 26:
                        _l.sent();
                        _l.label = 27;
                    case 27: return [2 /*return*/];
                }
            });
        });
    };
    GeminiApi.prototype.chatCompletionStream = function (body, signal) {
        return __asyncGenerator(this, arguments, function chatCompletionStream_1() {
            var apiURL, convertedBody, resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        apiURL = new URL("models/".concat(body.model, ":streamGenerateContent?key=").concat(this.config.apiKey), this.apiBase).toString();
                        convertedBody = this._convertBody(body, apiURL, true);
                        return [4 /*yield*/, __await((0, util_js_1.customFetch)(this.config.requestOptions)(apiURL, {
                                method: "POST",
                                body: JSON.stringify(convertedBody),
                                signal: signal,
                            }))];
                    case 1:
                        resp = _a.sent();
                        return [5 /*yield**/, __values(__asyncDelegator(__asyncValues(this.handleStreamResponse(resp, body.model))))];
                    case 2: return [4 /*yield*/, __await.apply(void 0, [_a.sent()])];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    GeminiApi.prototype.completionNonStream = function (body) {
        throw new Error("Method not implemented.");
    };
    GeminiApi.prototype.completionStream = function (body) {
        throw new Error("Method not implemented.");
    };
    GeminiApi.prototype.fimStream = function (body) {
        throw new Error("Method not implemented.");
    };
    GeminiApi.prototype.rerank = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error("Method not implemented.");
            });
        });
    };
    GeminiApi.prototype.embed = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var inputs, response, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        inputs = Array.isArray(body.input) ? body.input : [body.input];
                        return [4 /*yield*/, (0, util_js_1.customFetch)(this.config.requestOptions)(new URL("".concat(body.model, ":batchEmbedContents"), this.apiBase), {
                                method: "POST",
                                body: JSON.stringify({
                                    requests: inputs.map(function (input) { return ({
                                        model: body.model,
                                        content: {
                                            role: "user",
                                            parts: [{ text: input }],
                                        },
                                    }); }),
                                }),
                                headers: {
                                    // eslint-disable-next-line @typescript-eslint/naming-convention
                                    "x-goog-api-key": this.config.apiKey,
                                    // eslint-disable-next-line @typescript-eslint/naming-convention
                                    "Content-Type": "application/json",
                                },
                            })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = (_a.sent());
                        return [2 /*return*/, (0, util_js_1.embedding)({
                                model: body.model,
                                usage: {
                                    total_tokens: data.total_tokens,
                                    prompt_tokens: data.prompt_tokens,
                                },
                                data: data.batchEmbedContents.map(function (embedding) { return embedding.values; }),
                            })];
                }
            });
        });
    };
    GeminiApi.prototype.list = function () {
        throw new Error("Method not implemented.");
    };
    GeminiApi.maxStopSequences = 5;
    return GeminiApi;
}());
exports.GeminiApi = GeminiApi;
