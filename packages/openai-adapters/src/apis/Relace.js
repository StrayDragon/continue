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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelaceApi = void 0;
var util_js_1 = require("../util.js");
// Relace only supports apply through a /v1/apply endpoint
var RelaceApi = /** @class */ (function () {
    function RelaceApi(config) {
        var _a;
        this.config = config;
        this.apiBase = "https://instantapply.endpoint.relace.run/v1/";
        this.apiBase = (_a = config.apiBase) !== null && _a !== void 0 ? _a : this.apiBase;
        if (!this.apiBase.endsWith("/")) {
            this.apiBase += "/";
        }
        this.config = config;
    }
    RelaceApi.prototype.chatCompletionNonStream = function (body, signal) {
        return __awaiter(this, void 0, void 0, function () {
            var content, usage, streamingBody, _a, _b, _c, chunk, e_1_1;
            var _d, e_1, _e, _f;
            var _g, _h;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        content = "";
                        usage = undefined;
                        streamingBody = __assign(__assign({}, body), { stream: true });
                        _j.label = 1;
                    case 1:
                        _j.trys.push([1, 6, 7, 12]);
                        _a = true, _b = __asyncValues(this.chatCompletionStream(streamingBody, signal));
                        _j.label = 2;
                    case 2: return [4 /*yield*/, _b.next()];
                    case 3:
                        if (!(_c = _j.sent(), _d = _c.done, !_d)) return [3 /*break*/, 5];
                        _f = _c.value;
                        _a = false;
                        chunk = _f;
                        if (chunk.choices.length > 0) {
                            content += ((_h = (_g = chunk.choices[0]) === null || _g === void 0 ? void 0 : _g.delta) === null || _h === void 0 ? void 0 : _h.content) || "";
                        }
                        if (chunk.usage) {
                            usage = chunk.usage;
                        }
                        _j.label = 4;
                    case 4:
                        _a = true;
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 12];
                    case 6:
                        e_1_1 = _j.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 12];
                    case 7:
                        _j.trys.push([7, , 10, 11]);
                        if (!(!_a && !_d && (_e = _b.return))) return [3 /*break*/, 9];
                        return [4 /*yield*/, _e.call(_b)];
                    case 8:
                        _j.sent();
                        _j.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 11: return [7 /*endfinally*/];
                    case 12: return [2 /*return*/, (0, util_js_1.chatCompletion)({
                            content: content,
                            model: body.model,
                            usage: usage,
                        })];
                }
            });
        });
    };
    // We convert from what would be sent to OpenAI (a prediction for the existing code and a user message with the new code)
    // to Relace's format
    RelaceApi.prototype.chatCompletionStream = function (body, signal) {
        return __asyncGenerator(this, arguments, function chatCompletionStream_1() {
            var headers, prediction, initialCode, userContent, editSnippet, data, url, response, result, mergedCode;
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        headers = {
                            "Content-Type": "application/json",
                            Authorization: "Bearer ".concat(this.config.apiKey),
                        };
                        prediction = (_b = (_a = body.prediction) === null || _a === void 0 ? void 0 : _a.content) !== null && _b !== void 0 ? _b : "";
                        initialCode = typeof prediction === "string"
                            ? prediction
                            : prediction.map(function (p) { return p.text; }).join("");
                        userContent = (_c = body.messages.find(function (m) { return m.role === "user"; })) === null || _c === void 0 ? void 0 : _c.content;
                        if (!userContent) {
                            throw new Error("No edit snippet provided.");
                        }
                        editSnippet = typeof userContent === "string"
                            ? userContent
                            : userContent
                                .filter(function (p) { return p.type === "text"; })
                                .map(function (p) { return p.text; })
                                .join("");
                        data = {
                            initialCode: initialCode,
                            editSnippet: editSnippet,
                        };
                        url = this.apiBase + "code/apply";
                        return [4 /*yield*/, __await((0, util_js_1.customFetch)(this.config.requestOptions)(url, {
                                method: "POST",
                                headers: headers,
                                body: JSON.stringify(data),
                                signal: signal,
                            }))];
                    case 1:
                        response = _d.sent();
                        if (!(response.status === 499)) return [3 /*break*/, 3];
                        return [4 /*yield*/, __await(void 0)];
                    case 2: return [2 /*return*/, _d.sent()]; // Aborted by user
                    case 3: return [4 /*yield*/, __await(response.json())];
                    case 4:
                        result = (_d.sent());
                        mergedCode = result.mergedCode;
                        return [4 /*yield*/, __await((0, util_js_1.chatChunk)({
                                content: mergedCode,
                                model: body.model,
                            }))];
                    case 5: return [4 /*yield*/, _d.sent()];
                    case 6:
                        _d.sent();
                        return [4 /*yield*/, __await((0, util_js_1.usageChatChunk)({
                                model: body.model,
                                usage: {
                                    prompt_tokens: result.usage.prompt_tokens || 0,
                                    completion_tokens: result.usage.completion_tokens || 0,
                                    total_tokens: result.usage.total_tokens,
                                },
                            }))];
                    case 7: return [4 /*yield*/, _d.sent()];
                    case 8:
                        _d.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    RelaceApi.prototype.completionNonStream = function (body, signal) {
        throw new Error("Relace provider does not support non-streaming completion.");
    };
    RelaceApi.prototype.completionStream = function (body, signal) {
        throw new Error("Relace provider does not support streaming completion.");
    };
    RelaceApi.prototype.fimStream = function (body, signal) {
        throw new Error("Relace provider does not support streaming FIM completion.");
    };
    RelaceApi.prototype.embed = function (body) {
        throw new Error("Relace provider does not support embeddings.");
    };
    RelaceApi.prototype.rerank = function (body) {
        throw new Error("Relace provider does not support reranking.");
    };
    RelaceApi.prototype.list = function () {
        throw new Error("Relace provider does not support model listing.");
    };
    return RelaceApi;
}());
exports.RelaceApi = RelaceApi;
