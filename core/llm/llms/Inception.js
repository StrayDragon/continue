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
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
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
var __asyncDelegator = (this && this.__asyncDelegator) || function (o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
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
var fetch_1 = require("@continuedev/fetch");
var constants_js_1 = require("../../edit/constants.js");
var constants_js_2 = require("../../nextEdit/constants.js");
var OpenAI_js_1 = require("./OpenAI.js");
/**
 * Inception Labs provider
 *
 * Integrates with Inception Labs' OpenAI-compatible API endpoints.
 * Provides access to Mercury models for autocomplete and other tasks.
 *
 * Different models use different API endpoints:
 * - mercury-editor-mini-experimental: zaragoza.api.inceptionlabs.ai
 * - mercury-editor-small-experimental: copenhagen.api.inceptionlabs.ai
 *
 * More information at: https://docs.inceptionlabs.ai/
 */
var Inception = /** @class */ (function (_super) {
    __extends(Inception, _super);
    function Inception() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Inception.prototype.supportsFim = function () {
        return true;
    };
    // It seems like this should be inherited automatically from the parent OpenAI class, but it sometimes doesn't.
    // protected useOpenAIAdapterFor: (LlmApiRequestType | "*")[] = [
    //   "chat",
    //   "embed",
    //   "list",
    //   "rerank",
    //   "streamChat",
    //   "streamFim",
    // ];
    Inception.prototype.modifyChatBody = function (body) {
        var _a, _b;
        var hasNextEditCapability = (_b = (_a = this.capabilities) === null || _a === void 0 ? void 0 : _a.nextEdit) !== null && _b !== void 0 ? _b : false;
        // Add the nextEdit parameter for Inception-specific routing.
        body.nextEdit = hasNextEditCapability;
        return body;
    };
    Inception.prototype._streamFim = function (prefix, suffix, signal, options) {
        return __asyncGenerator(this, arguments, function _streamFim_1() {
            var endpoint, resp, _a, _b, _c, chunk, e_1_1;
            var _d, e_1, _e, _f;
            var _g, _h;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        endpoint = new URL("completions", this.apiBase);
                        return [4 /*yield*/, __await(this.fetch(endpoint, {
                                method: "POST",
                                body: JSON.stringify({
                                    model: options.model,
                                    prompt: prefix,
                                    suffix: suffix.trim() === "" ? "<|endoftext|>" : suffix,
                                    max_tokens: (_g = options.maxTokens) !== null && _g !== void 0 ? _g : 150, // Only want this for /fim, not chat
                                    temperature: options.temperature,
                                    top_p: options.topP,
                                    frequency_penalty: options.frequencyPenalty,
                                    presence_penalty: options.presencePenalty,
                                    stop: __spreadArray(__spreadArray([], ((_h = options.stop) !== null && _h !== void 0 ? _h : []), true), ["\n\n", "\n \n"], false),
                                    stream: true,
                                }),
                                headers: {
                                    "Content-Type": "application/json",
                                    Accept: "application/json",
                                    Authorization: "Bearer ".concat(this.apiKey),
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
                        return [4 /*yield*/, __await(chunk.choices[0].text)];
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
    Inception.prototype._streamChat = function (messages, signal, options) {
        return __asyncGenerator(this, arguments, function _streamChat_1() {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.isNextEdit(messages)) return [3 /*break*/, 3];
                        messages = this.removeToken(messages, constants_js_2.UNIQUE_TOKEN);
                        return [5 /*yield**/, __values(__asyncDelegator(__asyncValues(this.streamSpecialEndpoint("edit/completions", messages, signal, options))))];
                    case 1: return [4 /*yield*/, __await.apply(void 0, [_a.sent()])];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 9];
                    case 3:
                        if (!this.isApply(messages)) return [3 /*break*/, 6];
                        messages = this.removeToken(messages, constants_js_1.APPLY_UNIQUE_TOKEN);
                        return [5 /*yield**/, __values(__asyncDelegator(__asyncValues(this.streamSpecialEndpoint("apply/completions", messages, signal, options))))];
                    case 4: return [4 /*yield*/, __await.apply(void 0, [_a.sent()])];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 9];
                    case 6: 
                    // Use regular chat/completions endpoint - call parent OpenAI implementation.
                    return [5 /*yield**/, __values(__asyncDelegator(__asyncValues(_super.prototype._streamChat.call(this, messages, signal, options))))];
                    case 7: 
                    // Use regular chat/completions endpoint - call parent OpenAI implementation.
                    return [4 /*yield*/, __await.apply(void 0, [_a.sent()])];
                    case 8:
                        // Use regular chat/completions endpoint - call parent OpenAI implementation.
                        _a.sent();
                        _a.label = 9;
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    Inception.prototype.isNextEdit = function (messages) {
        // Check if any message contains the unique next edit token.
        return messages.some(function (message) {
            return typeof message.content === "string" &&
                message.content.endsWith(constants_js_2.UNIQUE_TOKEN);
        });
    };
    Inception.prototype.isApply = function (messages) {
        return messages.some(function (message) {
            return typeof message.content === "string" &&
                message.content.endsWith(constants_js_1.APPLY_UNIQUE_TOKEN);
        });
    };
    Inception.prototype.removeToken = function (messages, token) {
        var lastMessage = messages[messages.length - 1];
        if (typeof (lastMessage === null || lastMessage === void 0 ? void 0 : lastMessage.content) === "string" &&
            lastMessage.content.endsWith(token)) {
            var cleanedMessages = __spreadArray([], messages, true);
            cleanedMessages[cleanedMessages.length - 1] = __assign(__assign({}, lastMessage), { content: lastMessage.content.slice(0, -token.length) });
            return cleanedMessages;
        }
        return messages;
    };
    Inception.prototype.streamSpecialEndpoint = function (path, messages, signal, options) {
        return __asyncGenerator(this, arguments, function streamSpecialEndpoint_1() {
            var endpoint, resp, _a, _b, _c, chunk, content, e_2_1;
            var _d, e_2, _e, _f;
            var _g, _h, _j;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        endpoint = new URL(path, this.apiBase);
                        return [4 /*yield*/, __await(this.fetch(endpoint, {
                                method: "POST",
                                body: JSON.stringify({
                                    model: options.model,
                                    messages: messages,
                                    max_tokens: options.maxTokens,
                                    temperature: options.temperature,
                                    top_p: options.topP,
                                    frequency_penalty: options.frequencyPenalty,
                                    presence_penalty: options.presencePenalty,
                                    stop: options.stop,
                                    stream: true,
                                }),
                                headers: {
                                    "Content-Type": "application/json",
                                    Accept: "application/json",
                                    Authorization: "Bearer ".concat(this.apiKey),
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
                        content = (_j = (_h = (_g = chunk.choices) === null || _g === void 0 ? void 0 : _g[0]) === null || _h === void 0 ? void 0 : _h.delta) === null || _j === void 0 ? void 0 : _j.content;
                        if (!content) return [3 /*break*/, 7];
                        return [4 /*yield*/, __await({ role: "assistant", content: content })];
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
    Inception.providerName = "inception";
    Inception.defaultOptions = {
        apiBase: "https://api.inceptionlabs.ai/v1/",
        model: "mercury-coder-small",
        completionOptions: {
            temperature: 0.0,
            presencePenalty: 1.5,
            stop: ["<|endoftext|>"],
            model: "mercury-editor-small-experimental", // Added model to fix TypeScript error
        },
    };
    return Inception;
}(OpenAI_js_1.default));
exports.default = Inception;
