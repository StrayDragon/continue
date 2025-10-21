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
exports.JinaApi = void 0;
var util_js_1 = require("../util.js");
var JinaApi = /** @class */ (function () {
    function JinaApi(config) {
        var _a;
        this.config = config;
        this.apiBase = "https://api.jina.ai/v1/";
        this.apiBase = (_a = config.apiBase) !== null && _a !== void 0 ? _a : this.apiBase;
    }
    JinaApi.prototype.chatCompletionNonStream = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error("Method not implemented.");
            });
        });
    };
    JinaApi.prototype.chatCompletionStream = function (body) {
        return __asyncGenerator(this, arguments, function chatCompletionStream_1() {
            return __generator(this, function (_a) {
                throw new Error("Method not implemented.");
            });
        });
    };
    JinaApi.prototype.completionNonStream = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error("Method not implemented.");
            });
        });
    };
    JinaApi.prototype.completionStream = function (body) {
        return __asyncGenerator(this, arguments, function completionStream_1() {
            return __generator(this, function (_a) {
                throw new Error("Method not implemented.");
            });
        });
    };
    JinaApi.prototype.fimStream = function (body) {
        return __asyncGenerator(this, arguments, function fimStream_1() {
            return __generator(this, function (_a) {
                throw new Error("Method not implemented.");
            });
        });
    };
    JinaApi.prototype.embed = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error("Method not implemented.");
            });
        });
    };
    JinaApi.prototype.rerank = function (body) {
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
                        return [2 /*return*/, (0, util_js_1.rerank)({
                                model: body.model,
                                usage: {
                                    total_tokens: 0,
                                },
                                data: data.results.map(function (result) { return result.relevance_score; }),
                            })];
                }
            });
        });
    };
    JinaApi.prototype.list = function () {
        throw new Error("Method not implemented.");
    };
    return JinaApi;
}());
exports.JinaApi = JinaApi;
