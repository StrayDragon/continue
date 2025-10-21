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
var __asyncDelegator = (this && this.__asyncDelegator) || function (o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
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
exports.InceptionApi = exports.INCEPTION_API_BASE = exports.APPLY_UNIQUE_TOKEN = exports.UNIQUE_TOKEN = void 0;
var fetch_1 = require("@continuedev/fetch");
var util_js_1 = require("../util.js");
var OpenAI_js_1 = require("./OpenAI.js");
// export type InceptionChatCompletionCreateParamsStreaming =
//   ChatCompletionCreateParamsStreaming & {
//     nextEdit?: boolean;
//   };
// export type InceptionChatCompletionCreateParamsNonStreaming =
//   ChatCompletionCreateParamsNonStreaming & {
//     nextEdit?: boolean;
//   };
exports.UNIQUE_TOKEN = "<|!@#IS_NEXT_EDIT!@#|>";
exports.APPLY_UNIQUE_TOKEN = "<|!@#IS_APPLY!@#|>";
exports.INCEPTION_API_BASE = "https://api.inceptionlabs.ai/v1/";
var InceptionApi = /** @class */ (function (_super) {
    __extends(InceptionApi, _super);
    function InceptionApi(config) {
        var _a;
        return _super.call(this, __assign(__assign({}, config), { provider: "openai", apiBase: (_a = config.apiBase) !== null && _a !== void 0 ? _a : exports.INCEPTION_API_BASE })) || this;
    }
    // Add custom edit completions method.
    InceptionApi.prototype.editCompletionStream = function (body, signal) {
        return __asyncGenerator(this, arguments, function editCompletionStream_1() {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [5 /*yield**/, __values(__asyncDelegator(__asyncValues(this.streamCustomEndpoint("edit/completions", body, signal))))];
                    case 1: return [4 /*yield*/, __await.apply(void 0, [_a.sent()])];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // Add custom edit completions method (non-streaming).
    InceptionApi.prototype.editCompletionNonStream = function (body, signal) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.nonStreamCustomEndpoint("edit/completions", body, signal)];
            });
        });
    };
    // Override the regular chat stream method to route to edit endpoint for next edit requests.
    InceptionApi.prototype.chatCompletionStream = function (body, signal) {
        return __asyncGenerator(this, arguments, function chatCompletionStream_1() {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.isNextEdit(body.messages)) return [3 /*break*/, 3];
                        body.messages = this.removeToken(body.messages, exports.UNIQUE_TOKEN);
                        return [5 /*yield**/, __values(__asyncDelegator(__asyncValues(this.editCompletionStream(body, signal))))];
                    case 1: return [4 /*yield*/, __await.apply(void 0, [_a.sent()])];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 9];
                    case 3:
                        if (!this.isApply(body.messages)) return [3 /*break*/, 6];
                        body.messages = this.removeToken(body.messages, exports.APPLY_UNIQUE_TOKEN);
                        return [5 /*yield**/, __values(__asyncDelegator(__asyncValues(this.applyCompletionStream(body, signal))))];
                    case 4: return [4 /*yield*/, __await.apply(void 0, [_a.sent()])];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 9];
                    case 6: return [5 /*yield**/, __values(__asyncDelegator(__asyncValues(_super.prototype.chatCompletionStream.call(this, body, signal))))];
                    case 7: return [4 /*yield*/, __await.apply(void 0, [_a.sent()])];
                    case 8:
                        _a.sent();
                        _a.label = 9;
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    // Override the regular chat non stream method to route to edit endpoint for next edit requests.
    InceptionApi.prototype.chatCompletionNonStream = function (body, signal) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.isNextEdit(body.messages)) {
                    body.messages = this.removeToken(body.messages, exports.UNIQUE_TOKEN);
                    return [2 /*return*/, this.editCompletionNonStream(body, signal)];
                }
                else if (this.isApply(body.messages)) {
                    body.messages = this.removeToken(body.messages, exports.APPLY_UNIQUE_TOKEN);
                    return [2 /*return*/, this.applyCompletionNonStream(body, signal)];
                }
                else {
                    return [2 /*return*/, _super.prototype.chatCompletionNonStream.call(this, body, signal)];
                }
                return [2 /*return*/];
            });
        });
    };
    InceptionApi.prototype.applyCompletionStream = function (body, signal) {
        return __asyncGenerator(this, arguments, function applyCompletionStream_1() {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [5 /*yield**/, __values(__asyncDelegator(__asyncValues(this.streamCustomEndpoint("apply/completions", body, signal))))];
                    case 1: return [4 /*yield*/, __await.apply(void 0, [_a.sent()])];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    InceptionApi.prototype.applyCompletionNonStream = function (body, signal) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.nonStreamCustomEndpoint("apply/completions", body, signal)];
            });
        });
    };
    InceptionApi.prototype.fimStream = function (body, signal) {
        return __asyncGenerator(this, arguments, function fimStream_1() {
            var endpoint, resp, _a, _b, _c, chunk, e_1_1;
            var _d, e_1, _e, _f;
            var _g, _h;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        endpoint = new URL("completions", this.apiBase);
                        return [4 /*yield*/, __await((0, util_js_1.customFetch)(this.config.requestOptions)(endpoint, {
                                method: "POST",
                                body: JSON.stringify({
                                    model: body.model,
                                    prompt: body.prompt,
                                    suffix: body.suffix.trim() === "" ? "<|endoftext|>" : body.suffix,
                                    max_tokens: (_g = body.max_tokens) !== null && _g !== void 0 ? _g : 150, // Only want this for /fim, not chat
                                    temperature: body.temperature,
                                    top_p: body.top_p,
                                    frequency_penalty: body.frequency_penalty,
                                    presence_penalty: body.presence_penalty,
                                    stop: __spreadArray(__spreadArray([], ((_h = body.stop) !== null && _h !== void 0 ? _h : []), true), ["\n\n", "\n \n"], false),
                                    stream: true,
                                }),
                                headers: {
                                    "Content-Type": "application/json",
                                    Accept: "application/json",
                                    Authorization: "Bearer ".concat(this.config.apiKey),
                                },
                                signal: signal,
                            }))];
                    case 1:
                        resp = _j.sent();
                        _j.label = 2;
                    case 2:
                        _j.trys.push([2, 9, 10, 15]);
                        _a = true, _b = __asyncValues((0, fetch_1.streamSse)(resp));
                        _j.label = 3;
                    case 3: return [4 /*yield*/, __await(_b.next())];
                    case 4:
                        if (!(_c = _j.sent(), _d = _c.done, !_d)) return [3 /*break*/, 8];
                        _f = _c.value;
                        _a = false;
                        chunk = _f;
                        if (!chunk.choices[0]) {
                            return [3 /*break*/, 7];
                        }
                        return [4 /*yield*/, __await((0, util_js_1.chatChunk)({
                                content: chunk.choices[0].text,
                                finish_reason: null,
                                model: body.model,
                            }))];
                    case 5: return [4 /*yield*/, _j.sent()];
                    case 6:
                        _j.sent();
                        _j.label = 7;
                    case 7:
                        _a = true;
                        return [3 /*break*/, 3];
                    case 8: return [3 /*break*/, 15];
                    case 9:
                        e_1_1 = _j.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 15];
                    case 10:
                        _j.trys.push([10, , 13, 14]);
                        if (!(!_a && !_d && (_e = _b.return))) return [3 /*break*/, 12];
                        return [4 /*yield*/, __await(_e.call(_b))];
                    case 11:
                        _j.sent();
                        _j.label = 12;
                    case 12: return [3 /*break*/, 14];
                    case 13:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 14: return [7 /*endfinally*/];
                    case 15: return [2 /*return*/];
                }
            });
        });
    };
    InceptionApi.prototype.list = function () {
        throw new Error("Method not implemented.");
    };
    // Check if any message contains the unique next edit token.
    InceptionApi.prototype.isNextEdit = function (messages) {
        return messages.some(function (message) {
            return typeof message.content === "string" &&
                message.content.endsWith(exports.UNIQUE_TOKEN);
        });
    };
    InceptionApi.prototype.isApply = function (messages) {
        return messages.some(function (message) {
            return typeof message.content === "string" &&
                message.content.endsWith(exports.APPLY_UNIQUE_TOKEN);
        });
    };
    // Remove the unique token from messages.
    InceptionApi.prototype.removeToken = function (messages, token) {
        var lastMessage = messages[messages.length - 1];
        if (typeof (lastMessage === null || lastMessage === void 0 ? void 0 : lastMessage.content) === "string" &&
            lastMessage.content.endsWith(token)) {
            var cleanedMessages = __spreadArray([], messages, true);
            cleanedMessages[cleanedMessages.length - 1] = __assign(__assign({}, lastMessage), { content: lastMessage.content.slice(0, -token.length) });
            return cleanedMessages;
        }
        return messages;
    };
    InceptionApi.prototype.streamCustomEndpoint = function (path, body, signal) {
        return __asyncGenerator(this, arguments, function streamCustomEndpoint_1() {
            var endpoint, resp, _a, _b, _c, chunk, deltaContent, e_2_1;
            var _d, e_2, _e, _f;
            var _g, _h, _j;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        endpoint = new URL(path, this.apiBase);
                        return [4 /*yield*/, __await((0, util_js_1.customFetch)(this.config.requestOptions)(endpoint, {
                                method: "POST",
                                body: JSON.stringify({
                                    model: body.model,
                                    messages: body.messages,
                                    max_tokens: body.max_tokens,
                                    temperature: body.temperature,
                                    top_p: body.top_p,
                                    frequency_penalty: body.frequency_penalty,
                                    presence_penalty: body.presence_penalty,
                                    stop: body.stop,
                                    stream: true,
                                }),
                                headers: {
                                    "Content-Type": "application/json",
                                    Accept: "application/json",
                                    Authorization: "Bearer ".concat(this.config.apiKey),
                                },
                                signal: signal,
                            }))];
                    case 1:
                        resp = _k.sent();
                        _k.label = 2;
                    case 2:
                        _k.trys.push([2, 9, 10, 15]);
                        _a = true, _b = __asyncValues((0, fetch_1.streamSse)(resp));
                        _k.label = 3;
                    case 3: return [4 /*yield*/, __await(_b.next())];
                    case 4:
                        if (!(_c = _k.sent(), _d = _c.done, !_d)) return [3 /*break*/, 8];
                        _f = _c.value;
                        _a = false;
                        chunk = _f;
                        deltaContent = (_j = (_h = (_g = chunk.choices) === null || _g === void 0 ? void 0 : _g[0]) === null || _h === void 0 ? void 0 : _h.delta) === null || _j === void 0 ? void 0 : _j.content;
                        if (!deltaContent) return [3 /*break*/, 7];
                        return [4 /*yield*/, __await((0, util_js_1.chatChunk)({
                                content: deltaContent,
                                finish_reason: chunk.choices[0].finish_reason || null,
                                model: body.model,
                            }))];
                    case 5: return [4 /*yield*/, _k.sent()];
                    case 6:
                        _k.sent();
                        _k.label = 7;
                    case 7:
                        _a = true;
                        return [3 /*break*/, 3];
                    case 8: return [3 /*break*/, 15];
                    case 9:
                        e_2_1 = _k.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 15];
                    case 10:
                        _k.trys.push([10, , 13, 14]);
                        if (!(!_a && !_d && (_e = _b.return))) return [3 /*break*/, 12];
                        return [4 /*yield*/, __await(_e.call(_b))];
                    case 11:
                        _k.sent();
                        _k.label = 12;
                    case 12: return [3 /*break*/, 14];
                    case 13:
                        if (e_2) throw e_2.error;
                        return [7 /*endfinally*/];
                    case 14: return [7 /*endfinally*/];
                    case 15: return [2 /*return*/];
                }
            });
        });
    };
    InceptionApi.prototype.nonStreamCustomEndpoint = function (path, body, signal) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, resp, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        endpoint = new URL(path, this.apiBase);
                        return [4 /*yield*/, (0, util_js_1.customFetch)(this.config.requestOptions)(endpoint, {
                                method: "POST",
                                body: JSON.stringify({
                                    model: body.model,
                                    messages: body.messages,
                                    max_tokens: body.max_tokens,
                                    temperature: body.temperature,
                                    top_p: body.top_p,
                                    frequency_penalty: body.frequency_penalty,
                                    presence_penalty: body.presence_penalty,
                                    stop: body.stop,
                                    stream: false,
                                }),
                                headers: {
                                    "Content-Type": "application/json",
                                    Accept: "application/json",
                                    Authorization: "Bearer ".concat(this.config.apiKey),
                                },
                                signal: signal,
                            })];
                    case 1:
                        resp = _a.sent();
                        return [4 /*yield*/, resp.json()];
                    case 2:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    return InceptionApi;
}(OpenAI_js_1.OpenAIApi));
exports.InceptionApi = InceptionApi;
