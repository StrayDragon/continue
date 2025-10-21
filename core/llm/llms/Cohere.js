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
var fetch_1 = require("@continuedev/fetch");
var messageContent_js_1 = require("../../util/messageContent.js");
var index_js_1 = require("../index.js");
var Cohere = /** @class */ (function (_super) {
    __extends(Cohere, _super);
    function Cohere() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Cohere.prototype._convertMessages = function (msgs) {
        var messages = [];
        var lastToolPlan;
        for (var _i = 0, msgs_1 = msgs; _i < msgs_1.length; _i++) {
            var m = msgs_1[_i];
            if (!m.content) {
                continue;
            }
            switch (m.role) {
                case "user":
                    if (typeof m.content === "string") {
                        messages.push({
                            role: m.role,
                            content: m.content,
                        });
                        break;
                    }
                    messages.push({
                        role: m.role,
                        content: m.content.map(function (part) {
                            if (part.type === "imageUrl") {
                                return {
                                    type: "image_url",
                                    image_url: { url: part.imageUrl.url },
                                };
                            }
                            return part;
                        }),
                    });
                    break;
                case "thinking":
                    lastToolPlan = m.content;
                    break;
                case "assistant":
                    if (m.toolCalls) {
                        if (!lastToolPlan) {
                            throw new Error("No tool plan found");
                        }
                        messages.push({
                            role: m.role,
                            tool_calls: m.toolCalls.map(function (toolCall) {
                                var _a, _b;
                                return ({
                                    id: toolCall.id,
                                    type: "function",
                                    function: {
                                        name: (_a = toolCall.function) === null || _a === void 0 ? void 0 : _a.name,
                                        arguments: (_b = toolCall.function) === null || _b === void 0 ? void 0 : _b.arguments,
                                    },
                                });
                            }),
                            // Ideally the tool plan would be in this message, but it is
                            // split in another, usually the previous, this one's content is
                            // a space.
                            // tool_plan: m.content,
                            tool_plan: lastToolPlan,
                        });
                        lastToolPlan = undefined;
                        break;
                    }
                    messages.push({
                        role: m.role,
                        content: m.content,
                    });
                    break;
                case "system":
                    messages.push({
                        role: m.role,
                        content: (0, messageContent_js_1.stripImages)(m.content),
                    });
                    break;
                case "tool":
                    messages.push({
                        role: m.role,
                        content: m.content,
                        tool_call_id: m.toolCallId,
                    });
                    break;
                default:
                    break;
            }
        }
        return messages;
    };
    Cohere.prototype._convertArgs = function (options) {
        var _a, _b, _c;
        return {
            model: options.model,
            stream: (_a = options.stream) !== null && _a !== void 0 ? _a : true,
            temperature: options.temperature,
            max_tokens: options.maxTokens,
            k: options.topK,
            p: options.topP,
            stop_sequences: (_b = options.stop) === null || _b === void 0 ? void 0 : _b.slice(0, Cohere.maxStopSequences),
            frequency_penalty: options.frequencyPenalty,
            presence_penalty: options.presencePenalty,
            tools: (_c = options.tools) === null || _c === void 0 ? void 0 : _c.map(function (tool) { return ({
                type: "function",
                function: {
                    name: tool.function.name,
                    parameters: tool.function.parameters,
                    description: tool.function.description,
                },
            }); }),
        };
    };
    Cohere.prototype._streamComplete = function (prompt, signal, options) {
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
    Cohere.prototype._streamChat = function (messages, signal, options) {
        return __asyncGenerator(this, arguments, function _streamChat_1() {
            var headers, resp, data, lastToolUseId, lastToolUseName, _a, _b, _c, value, _d, e_2_1;
            var _e, e_2, _f, _g;
            var _h;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        headers = __assign({ "Content-Type": "application/json", Authorization: "Bearer ".concat(this.apiKey) }, (_h = this.requestOptions) === null || _h === void 0 ? void 0 : _h.headers);
                        return [4 /*yield*/, __await(this.fetch(new URL("chat", this.apiBase), {
                                method: "POST",
                                headers: headers,
                                body: JSON.stringify(__assign(__assign({}, this._convertArgs(options)), { messages: this._convertMessages(messages) })),
                                signal: signal,
                            }))];
                    case 1:
                        resp = _j.sent();
                        if (!(resp.status === 499)) return [3 /*break*/, 3];
                        return [4 /*yield*/, __await(void 0)];
                    case 2: return [2 /*return*/, _j.sent()]; // Aborted by user
                    case 3:
                        if (!(options.stream === false)) return [3 /*break*/, 14];
                        return [4 /*yield*/, __await(resp.json())];
                    case 4:
                        data = _j.sent();
                        if (!data.message.tool_calls) return [3 /*break*/, 10];
                        return [4 /*yield*/, __await({
                                // Use the "thinking" role for `tool_plan`, since there is no such
                                // role in the Cohere API at the moment and it is a "a
                                // chain-of-thought style reflection".
                                role: "thinking",
                                content: data.message.tool_plan,
                            })];
                    case 5: return [4 /*yield*/, _j.sent()];
                    case 6:
                        _j.sent();
                        return [4 /*yield*/, __await({
                                role: "assistant",
                                content: "",
                                toolCalls: data.message.tool_calls.map(function (toolCall) {
                                    var _a, _b;
                                    return ({
                                        id: toolCall.id,
                                        type: "function",
                                        function: {
                                            name: (_a = toolCall.function) === null || _a === void 0 ? void 0 : _a.name,
                                            arguments: (_b = toolCall.function) === null || _b === void 0 ? void 0 : _b.arguments,
                                        },
                                    });
                                }),
                            })];
                    case 7: return [4 /*yield*/, _j.sent()];
                    case 8:
                        _j.sent();
                        return [4 /*yield*/, __await(void 0)];
                    case 9: return [2 /*return*/, _j.sent()];
                    case 10: return [4 /*yield*/, __await({ role: "assistant", content: data.message.content[0].text })];
                    case 11: return [4 /*yield*/, _j.sent()];
                    case 12:
                        _j.sent();
                        return [4 /*yield*/, __await(void 0)];
                    case 13: return [2 /*return*/, _j.sent()];
                    case 14:
                        _j.trys.push([14, 33, 34, 39]);
                        _a = true, _b = __asyncValues((0, fetch_1.streamSse)(resp));
                        _j.label = 15;
                    case 15: return [4 /*yield*/, __await(_b.next())];
                    case 16:
                        if (!(_c = _j.sent(), _e = _c.done, !_e)) return [3 /*break*/, 32];
                        _g = _c.value;
                        _a = false;
                        value = _g;
                        _d = value.type;
                        switch (_d) {
                            case "content-delta": return [3 /*break*/, 17];
                            case "tool-plan-delta": return [3 /*break*/, 20];
                            case "tool-call-start": return [3 /*break*/, 23];
                            case "tool-call-delta": return [3 /*break*/, 26];
                            case "tool-call-end": return [3 /*break*/, 29];
                        }
                        return [3 /*break*/, 30];
                    case 17: return [4 /*yield*/, __await({
                            role: "assistant",
                            content: value.delta.message.content.text,
                        })];
                    case 18: return [4 /*yield*/, _j.sent()];
                    case 19:
                        _j.sent();
                        return [3 /*break*/, 31];
                    case 20: return [4 /*yield*/, __await({
                            role: "thinking",
                            content: value.delta.message.tool_plan,
                        })];
                    case 21: 
                    // Use the "thinking" role for `tool_plan`, since there is no such
                    // role in the Cohere API at the moment and it is a "a
                    // chain-of-thought style reflection".
                    return [4 /*yield*/, _j.sent()];
                    case 22:
                        // Use the "thinking" role for `tool_plan`, since there is no such
                        // role in the Cohere API at the moment and it is a "a
                        // chain-of-thought style reflection".
                        _j.sent();
                        return [3 /*break*/, 31];
                    case 23:
                        lastToolUseId = value.delta.message.tool_calls.id;
                        lastToolUseName = value.delta.message.tool_calls.function.name;
                        return [4 /*yield*/, __await({
                                role: "assistant",
                                content: "",
                                toolCalls: [
                                    {
                                        id: lastToolUseId,
                                        type: "function",
                                        function: {
                                            name: lastToolUseName,
                                            arguments: value.delta.message.tool_calls.function.arguments,
                                        },
                                    },
                                ],
                            })];
                    case 24: return [4 /*yield*/, _j.sent()];
                    case 25:
                        _j.sent();
                        return [3 /*break*/, 31];
                    case 26:
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
                                            arguments: value.delta.message.tool_calls.function.arguments,
                                        },
                                    },
                                ],
                            })];
                    case 27: return [4 /*yield*/, _j.sent()];
                    case 28:
                        _j.sent();
                        return [3 /*break*/, 31];
                    case 29:
                        lastToolUseId = undefined;
                        lastToolUseName = undefined;
                        return [3 /*break*/, 31];
                    case 30: return [3 /*break*/, 31];
                    case 31:
                        _a = true;
                        return [3 /*break*/, 15];
                    case 32: return [3 /*break*/, 39];
                    case 33:
                        e_2_1 = _j.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 39];
                    case 34:
                        _j.trys.push([34, , 37, 38]);
                        if (!(!_a && !_e && (_f = _b.return))) return [3 /*break*/, 36];
                        return [4 /*yield*/, __await(_f.call(_b))];
                    case 35:
                        _j.sent();
                        _j.label = 36;
                    case 36: return [3 /*break*/, 38];
                    case 37:
                        if (e_2) throw e_2.error;
                        return [7 /*endfinally*/];
                    case 38: return [7 /*endfinally*/];
                    case 39: return [2 /*return*/];
                }
            });
        });
    };
    Cohere.prototype._embed = function (chunks) {
        return __awaiter(this, void 0, void 0, function () {
            var resp, _a, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.fetch(new URL("embed", this.apiBase), {
                            method: "POST",
                            body: JSON.stringify({
                                texts: chunks,
                                model: this.model,
                                input_type: "search_document",
                                embedding_types: ["float"],
                                truncate: "END",
                            }),
                            headers: {
                                Authorization: "Bearer ".concat(this.apiKey),
                                "Content-Type": "application/json",
                            },
                        })];
                    case 1:
                        resp = _b.sent();
                        if (!!resp.ok) return [3 /*break*/, 3];
                        _a = Error.bind;
                        return [4 /*yield*/, resp.text()];
                    case 2: throw new (_a.apply(Error, [void 0, _b.sent()]))();
                    case 3: return [4 /*yield*/, resp.json()];
                    case 4:
                        data = (_b.sent());
                        return [2 /*return*/, data.embeddings.float];
                }
            });
        });
    };
    Cohere.prototype.rerank = function (query, chunks) {
        return __awaiter(this, void 0, void 0, function () {
            var resp, _a, data, results;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.fetch(new URL("rerank", this.apiBase), {
                            method: "POST",
                            headers: {
                                Authorization: "Bearer ".concat(this.apiKey),
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                model: this.model,
                                query: query,
                                documents: chunks.map(function (chunk) { return chunk.content; }),
                            }),
                        })];
                    case 1:
                        resp = _b.sent();
                        if (!!resp.ok) return [3 /*break*/, 3];
                        _a = Error.bind;
                        return [4 /*yield*/, resp.text()];
                    case 2: throw new (_a.apply(Error, [void 0, _b.sent()]))();
                    case 3: return [4 /*yield*/, resp.json()];
                    case 4:
                        data = (_b.sent());
                        results = data.results.sort(function (a, b) { return a.index - b.index; });
                        return [2 /*return*/, results.map(function (result) { return result.relevance_score; })];
                }
            });
        });
    };
    Cohere.providerName = "cohere";
    Cohere.defaultOptions = {
        apiBase: "https://api.cohere.ai/v2",
        maxEmbeddingBatchSize: 96,
    };
    Cohere.maxStopSequences = 5;
    return Cohere;
}(index_js_1.BaseLLM));
exports.default = Cohere;
