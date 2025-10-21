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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAIApi = void 0;
var fetch_1 = require("@continuedev/fetch");
var index_1 = require("openai/index");
var util_js_1 = require("../util.js");
var OpenAIApi = /** @class */ (function () {
    function OpenAIApi(config) {
        var _a, _b;
        this.config = config;
        this.apiBase = "https://api.openai.com/v1/";
        this.apiBase = (_a = config.apiBase) !== null && _a !== void 0 ? _a : this.apiBase;
        this.openai = new index_1.OpenAI({
            // Necessary because `new OpenAI()` will throw an error if there is no API Key
            apiKey: (_b = config.apiKey) !== null && _b !== void 0 ? _b : "",
            baseURL: this.apiBase,
            fetch: (0, util_js_1.customFetch)(config.requestOptions),
        });
    }
    OpenAIApi.prototype.modifyChatBody = function (body) {
        var _a;
        // Add stream_options to include usage in streaming responses
        if (body.stream) {
            body.stream_options = { include_usage: true };
        }
        // o-series models - only apply for official OpenAI API
        var isOfficialOpenAIAPI = this.apiBase === "https://api.openai.com/v1/";
        if (isOfficialOpenAIAPI) {
            if (body.model.startsWith("o") || body.model.includes("gpt-5")) {
                // a) use max_completion_tokens instead of max_tokens
                body.max_completion_tokens = body.max_tokens;
                body.max_tokens = undefined;
                // b) use "developer" message role rather than "system"
                body.messages = body.messages.map(function (message) {
                    if (message.role === "system") {
                        return __assign(__assign({}, message), { role: "developer" });
                    }
                    return message;
                });
            }
            if (((_a = body.tools) === null || _a === void 0 ? void 0 : _a.length) && !body.model.startsWith("o3")) {
                body.parallel_tool_calls = false;
            }
        }
        return body;
    };
    OpenAIApi.prototype.modifyCompletionBody = function (body) {
        return body;
    };
    OpenAIApi.prototype.modifyEmbedBody = function (body) {
        return body;
    };
    OpenAIApi.prototype.modifyFimBody = function (body) {
        return body;
    };
    OpenAIApi.prototype.modifyRerankBody = function (body) {
        return body;
    };
    OpenAIApi.prototype.getHeaders = function () {
        var _a;
        return {
            "Content-Type": "application/json",
            Accept: "application/json",
            "x-api-key": (_a = this.config.apiKey) !== null && _a !== void 0 ? _a : "",
            Authorization: "Bearer ".concat(this.config.apiKey),
        };
    };
    OpenAIApi.prototype.chatCompletionNonStream = function (body, signal) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.openai.chat.completions.create(this.modifyChatBody(body), {
                            signal: signal,
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    OpenAIApi.prototype.chatCompletionStream = function (body, signal) {
        return __asyncGenerator(this, arguments, function chatCompletionStream_1() {
            var response, lastChunkWithUsage, _a, response_1, response_1_1, result, e_1_1;
            var _b, e_1, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, __await(this.openai.chat.completions.create(this.modifyChatBody(body), {
                            signal: signal,
                        }))];
                    case 1:
                        response = _e.sent();
                        _e.label = 2;
                    case 2:
                        _e.trys.push([2, 10, 11, 16]);
                        _a = true, response_1 = __asyncValues(response);
                        _e.label = 3;
                    case 3: return [4 /*yield*/, __await(response_1.next())];
                    case 4:
                        if (!(response_1_1 = _e.sent(), _b = response_1_1.done, !_b)) return [3 /*break*/, 9];
                        _d = response_1_1.value;
                        _a = false;
                        result = _d;
                        if (!result.usage) return [3 /*break*/, 5];
                        // Store it to emit after all content chunks
                        lastChunkWithUsage = result;
                        return [3 /*break*/, 8];
                    case 5: return [4 /*yield*/, __await(result)];
                    case 6: return [4 /*yield*/, _e.sent()];
                    case 7:
                        _e.sent();
                        _e.label = 8;
                    case 8:
                        _a = true;
                        return [3 /*break*/, 3];
                    case 9: return [3 /*break*/, 16];
                    case 10:
                        e_1_1 = _e.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 16];
                    case 11:
                        _e.trys.push([11, , 14, 15]);
                        if (!(!_a && !_b && (_c = response_1.return))) return [3 /*break*/, 13];
                        return [4 /*yield*/, __await(_c.call(response_1))];
                    case 12:
                        _e.sent();
                        _e.label = 13;
                    case 13: return [3 /*break*/, 15];
                    case 14:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 15: return [7 /*endfinally*/];
                    case 16:
                        if (!lastChunkWithUsage) return [3 /*break*/, 19];
                        return [4 /*yield*/, __await(lastChunkWithUsage)];
                    case 17: return [4 /*yield*/, _e.sent()];
                    case 18:
                        _e.sent();
                        _e.label = 19;
                    case 19: return [2 /*return*/];
                }
            });
        });
    };
    OpenAIApi.prototype.completionNonStream = function (body, signal) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.openai.completions.create(this.modifyCompletionBody(body), { signal: signal })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    OpenAIApi.prototype.completionStream = function (body, signal) {
        return __asyncGenerator(this, arguments, function completionStream_1() {
            var response, _a, response_2, response_2_1, result, e_2_1;
            var _b, e_2, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, __await(this.openai.completions.create(this.modifyCompletionBody(body), { signal: signal }))];
                    case 1:
                        response = _e.sent();
                        _e.label = 2;
                    case 2:
                        _e.trys.push([2, 9, 10, 15]);
                        _a = true, response_2 = __asyncValues(response);
                        _e.label = 3;
                    case 3: return [4 /*yield*/, __await(response_2.next())];
                    case 4:
                        if (!(response_2_1 = _e.sent(), _b = response_2_1.done, !_b)) return [3 /*break*/, 8];
                        _d = response_2_1.value;
                        _a = false;
                        result = _d;
                        return [4 /*yield*/, __await(result)];
                    case 5: return [4 /*yield*/, _e.sent()];
                    case 6:
                        _e.sent();
                        _e.label = 7;
                    case 7:
                        _a = true;
                        return [3 /*break*/, 3];
                    case 8: return [3 /*break*/, 15];
                    case 9:
                        e_2_1 = _e.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 15];
                    case 10:
                        _e.trys.push([10, , 13, 14]);
                        if (!(!_a && !_b && (_c = response_2.return))) return [3 /*break*/, 12];
                        return [4 /*yield*/, __await(_c.call(response_2))];
                    case 11:
                        _e.sent();
                        _e.label = 12;
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
    OpenAIApi.prototype.fimStream = function (body, signal) {
        return __asyncGenerator(this, arguments, function fimStream_1() {
            var endpoint, modifiedBody, resp, _a, _b, _c, chunk, e_3_1;
            var _d, e_3, _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        endpoint = new URL("fim/completions", this.apiBase);
                        modifiedBody = this.modifyFimBody(body);
                        return [4 /*yield*/, __await((0, util_js_1.customFetch)(this.config.requestOptions)(endpoint, {
                                method: "POST",
                                body: JSON.stringify({
                                    model: modifiedBody.model,
                                    prompt: modifiedBody.prompt,
                                    suffix: modifiedBody.suffix,
                                    max_tokens: modifiedBody.max_tokens,
                                    max_completion_tokens: modifiedBody.max_completion_tokens,
                                    temperature: modifiedBody.temperature,
                                    top_p: modifiedBody.top_p,
                                    frequency_penalty: modifiedBody.frequency_penalty,
                                    presence_penalty: modifiedBody.presence_penalty,
                                    stop: modifiedBody.stop,
                                    stream: true,
                                }),
                                headers: this.getHeaders(),
                                signal: signal,
                            }))];
                    case 1:
                        resp = _g.sent();
                        _g.label = 2;
                    case 2:
                        _g.trys.push([2, 9, 10, 15]);
                        _a = true, _b = __asyncValues((0, fetch_1.streamSse)(resp));
                        _g.label = 3;
                    case 3: return [4 /*yield*/, __await(_b.next())];
                    case 4:
                        if (!(_c = _g.sent(), _d = _c.done, !_d)) return [3 /*break*/, 8];
                        _f = _c.value;
                        _a = false;
                        chunk = _f;
                        if (!(chunk.choices && chunk.choices.length > 0)) return [3 /*break*/, 7];
                        return [4 /*yield*/, __await(chunk)];
                    case 5: return [4 /*yield*/, _g.sent()];
                    case 6:
                        _g.sent();
                        _g.label = 7;
                    case 7:
                        _a = true;
                        return [3 /*break*/, 3];
                    case 8: return [3 /*break*/, 15];
                    case 9:
                        e_3_1 = _g.sent();
                        e_3 = { error: e_3_1 };
                        return [3 /*break*/, 15];
                    case 10:
                        _g.trys.push([10, , 13, 14]);
                        if (!(!_a && !_d && (_e = _b.return))) return [3 /*break*/, 12];
                        return [4 /*yield*/, __await(_e.call(_b))];
                    case 11:
                        _g.sent();
                        _g.label = 12;
                    case 12: return [3 /*break*/, 14];
                    case 13:
                        if (e_3) throw e_3.error;
                        return [7 /*endfinally*/];
                    case 14: return [7 /*endfinally*/];
                    case 15: return [2 /*return*/];
                }
            });
        });
    };
    OpenAIApi.prototype.embed = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.openai.embeddings.create(this.modifyEmbedBody(body))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    OpenAIApi.prototype.rerank = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, modifiedBody, response, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        endpoint = new URL("rerank", this.apiBase);
                        modifiedBody = this.modifyRerankBody(body);
                        return [4 /*yield*/, (0, util_js_1.customFetch)(this.config.requestOptions)(endpoint, {
                                method: "POST",
                                body: JSON.stringify(modifiedBody),
                                headers: this.getHeaders(),
                            })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    OpenAIApi.prototype.list = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.openai.models.list()];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    return OpenAIApi;
}());
exports.OpenAIApi = OpenAIApi;
