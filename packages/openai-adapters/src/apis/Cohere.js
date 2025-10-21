"use strict";
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
exports.CohereApi = void 0;
var fetch_1 = require("@continuedev/fetch");
var util_js_1 = require("../util.js");
var emptyChatCompletion_js_1 = require("../util/emptyChatCompletion.js");
var CohereApi = /** @class */ (function () {
    function CohereApi(config) {
        var _a;
        this.config = config;
        this.apiBase = "https://api.cohere.com/v1";
        this.apiBase = (_a = config.apiBase) !== null && _a !== void 0 ? _a : this.apiBase;
    }
    CohereApi.prototype._convertMessages = function (msgs) {
        return msgs.map(function (m) { return ({
            role: m.role === "assistant" ? "CHATBOT" : "USER",
            message: m.content,
        }); });
    };
    CohereApi.prototype._convertBody = function (oaiBody) {
        var _a, _b, _c;
        return {
            message: (_a = oaiBody.messages.pop()) === null || _a === void 0 ? void 0 : _a.content,
            chat_history: this._convertMessages(oaiBody.messages.filter(function (msg) { return msg.role !== "system"; })),
            preamble: (_b = oaiBody.messages.find(function (msg) { return msg.role === "system"; })) === null || _b === void 0 ? void 0 : _b.content,
            model: oaiBody.model,
            stream: oaiBody.stream,
            temperature: oaiBody.temperature,
            max_tokens: oaiBody.max_tokens,
            p: oaiBody.top_p,
            stop_sequences: (_c = oaiBody.stop) === null || _c === void 0 ? void 0 : _c.slice(0, CohereApi.maxStopSequences),
            frequency_penalty: oaiBody.frequency_penalty,
            presence_penalty: oaiBody.presence_penalty,
        };
    };
    CohereApi.prototype.chatCompletionNonStream = function (body, signal) {
        return __awaiter(this, void 0, void 0, function () {
            var headers, resp, data, _a, input_tokens, output_tokens;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        headers = {
                            "Content-Type": "application/json",
                            Authorization: "Bearer ".concat(this.config.apiKey),
                        };
                        return [4 /*yield*/, (0, util_js_1.customFetch)(this.config.requestOptions)(new URL("chat", this.apiBase), {
                                method: "POST",
                                headers: headers,
                                body: JSON.stringify(this._convertBody(body)),
                                signal: signal,
                            })];
                    case 1:
                        resp = _b.sent();
                        if (resp.status === 499) {
                            return [2 /*return*/, emptyChatCompletion_js_1.EMPTY_CHAT_COMPLETION];
                        }
                        return [4 /*yield*/, resp.json()];
                    case 2:
                        data = (_b.sent());
                        _a = data.meta.tokens, input_tokens = _a.input_tokens, output_tokens = _a.output_tokens;
                        return [2 /*return*/, (0, util_js_1.chatCompletion)({
                                model: body.model,
                                id: data.id,
                                content: data.text,
                                usage: {
                                    total_tokens: input_tokens + output_tokens,
                                    completion_tokens: output_tokens,
                                    prompt_tokens: input_tokens,
                                },
                            })];
                }
            });
        });
    };
    CohereApi.prototype.chatCompletionStream = function (body, signal) {
        return __asyncGenerator(this, arguments, function chatCompletionStream_1() {
            var headers, resp, _a, _b, _c, value, e_1_1;
            var _d, e_1, _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        headers = {
                            "Content-Type": "application/json",
                            Authorization: "Bearer ".concat(this.config.apiKey),
                        };
                        return [4 /*yield*/, __await((0, util_js_1.customFetch)(this.config.requestOptions)(new URL("chat", this.apiBase), {
                                method: "POST",
                                headers: headers,
                                body: JSON.stringify(this._convertBody(body)),
                                signal: signal,
                            }))];
                    case 1:
                        resp = _g.sent();
                        _g.label = 2;
                    case 2:
                        _g.trys.push([2, 9, 10, 15]);
                        _a = true, _b = __asyncValues((0, fetch_1.streamJSON)(resp));
                        _g.label = 3;
                    case 3: return [4 /*yield*/, __await(_b.next())];
                    case 4:
                        if (!(_c = _g.sent(), _d = _c.done, !_d)) return [3 /*break*/, 8];
                        _f = _c.value;
                        _a = false;
                        value = _f;
                        if (!(value.event_type === "text-generation")) return [3 /*break*/, 7];
                        return [4 /*yield*/, __await({
                                id: value.id,
                                object: "chat.completion.chunk",
                                model: body.model,
                                created: Date.now(),
                                choices: [
                                    {
                                        index: 0,
                                        logprobs: undefined,
                                        finish_reason: null,
                                        delta: {
                                            role: "assistant",
                                            content: value.text,
                                        },
                                    },
                                ],
                                usage: undefined,
                            })];
                    case 5: return [4 /*yield*/, _g.sent()];
                    case 6:
                        _g.sent();
                        _g.label = 7;
                    case 7:
                        _a = true;
                        return [3 /*break*/, 3];
                    case 8: return [3 /*break*/, 15];
                    case 9:
                        e_1_1 = _g.sent();
                        e_1 = { error: e_1_1 };
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
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 14: return [7 /*endfinally*/];
                    case 15: return [2 /*return*/];
                }
            });
        });
    };
    CohereApi.prototype.completionNonStream = function (body) {
        throw new Error("Method not implemented.");
    };
    CohereApi.prototype.completionStream = function (body) {
        throw new Error("Method not implemented.");
    };
    CohereApi.prototype.fimStream = function (body) {
        throw new Error("Method not implemented.");
    };
    CohereApi.prototype.rerank = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, response, data;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        endpoint = new URL("rerank", this.apiBase);
                        return [4 /*yield*/, (0, util_js_1.customFetch)(this.config.requestOptions)(endpoint, {
                                method: "POST",
                                body: JSON.stringify(body),
                                headers: {
                                    "Content-Type": "application/json",
                                    Accept: "application/json",
                                    "x-api-key": (_a = this.config.apiKey) !== null && _a !== void 0 ? _a : "",
                                    Authorization: "Bearer ".concat(this.config.apiKey),
                                },
                            })];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = (_b.sent());
                        return [2 /*return*/, {
                                object: "list",
                                data: data.results.map(function (result) { return ({
                                    index: result.index,
                                    relevance_score: result.relevance_score,
                                }); }),
                                model: body.model,
                                usage: {
                                    total_tokens: 0,
                                },
                            }];
                }
            });
        });
    };
    CohereApi.prototype.embed = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var url, texts, response, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = new URL("/embed", this.apiBase);
                        texts = typeof body.input === "string" ? [body.input] : body.input;
                        return [4 /*yield*/, (0, util_js_1.customFetch)(this.config.requestOptions)(url, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: "Bearer ".concat(this.config.apiKey),
                                },
                                body: JSON.stringify({
                                    texts: texts,
                                    model: body.model,
                                    input_type: "search_document",
                                }),
                            })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = (_a.sent());
                        return [2 /*return*/, (0, util_js_1.embedding)({
                                model: body.model,
                                usage: {
                                    total_tokens: 0,
                                    prompt_tokens: 0,
                                },
                                data: data.embeddings.map(function (embedding) { return embedding; }),
                            })];
                }
            });
        });
    };
    CohereApi.prototype.list = function () {
        throw new Error("Method not implemented.");
    };
    CohereApi.maxStopSequences = 5;
    return CohereApi;
}());
exports.CohereApi = CohereApi;
