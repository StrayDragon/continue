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
Object.defineProperty(exports, "__esModule", { value: true });
var fetch_1 = require("@continuedev/fetch");
var messageContent_js_1 = require("../../util/messageContent.js");
var index_js_1 = require("../index.js");
var Cloudflare = /** @class */ (function (_super) {
    __extends(Cloudflare, _super);
    function Cloudflare() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Cloudflare.prototype._convertArgs = function (options) {
        var finalOptions = {
            max_tokens: options.maxTokens,
        };
        return finalOptions;
    };
    Cloudflare.prototype._streamChat = function (messages, signal, options) {
        return __asyncGenerator(this, arguments, function _streamChat_1() {
            var headers, url, resp, _a, _b, _c, value, e_1_1;
            var _d, e_1, _e, _f;
            var _g, _h, _j, _k;
            return __generator(this, function (_l) {
                switch (_l.label) {
                    case 0:
                        headers = __assign({ "Content-Type": "application/json", Authorization: "Bearer ".concat(this.apiKey) }, (_g = this.requestOptions) === null || _g === void 0 ? void 0 : _g.headers);
                        url = this.aiGatewaySlug
                            ? "https://gateway.ai.cloudflare.com/v1/".concat(this.accountId, "/").concat(this.aiGatewaySlug, "/workers-ai/v1/chat/completions")
                            : "https://api.cloudflare.com/client/v4/accounts/".concat(this.accountId, "/ai/v1/chat/completions");
                        return [4 /*yield*/, __await(this.fetch(new URL(url), {
                                method: "POST",
                                headers: headers,
                                body: JSON.stringify(__assign({ messages: messages, stream: true, model: this.model }, this._convertArgs(options))),
                                signal: signal,
                            }))];
                    case 1:
                        resp = _l.sent();
                        _l.label = 2;
                    case 2:
                        _l.trys.push([2, 9, 10, 15]);
                        _a = true, _b = __asyncValues((0, fetch_1.streamSse)(resp));
                        _l.label = 3;
                    case 3: return [4 /*yield*/, __await(_b.next())];
                    case 4:
                        if (!(_c = _l.sent(), _d = _c.done, !_d)) return [3 /*break*/, 8];
                        _f = _c.value;
                        _a = false;
                        value = _f;
                        if (!((_k = (_j = (_h = value.choices) === null || _h === void 0 ? void 0 : _h[0]) === null || _j === void 0 ? void 0 : _j.delta) === null || _k === void 0 ? void 0 : _k.content)) return [3 /*break*/, 7];
                        return [4 /*yield*/, __await({
                                role: "assistant",
                                content: value.choices[0].delta.content,
                            })];
                    case 5: return [4 /*yield*/, _l.sent()];
                    case 6:
                        _l.sent();
                        _l.label = 7;
                    case 7:
                        _a = true;
                        return [3 /*break*/, 3];
                    case 8: return [3 /*break*/, 15];
                    case 9:
                        e_1_1 = _l.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 15];
                    case 10:
                        _l.trys.push([10, , 13, 14]);
                        if (!(!_a && !_d && (_e = _b.return))) return [3 /*break*/, 12];
                        return [4 /*yield*/, __await(_e.call(_b))];
                    case 11:
                        _l.sent();
                        _l.label = 12;
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
    Cloudflare.prototype._streamComplete = function (prompt, signal, options) {
        return __asyncGenerator(this, arguments, function _streamComplete_1() {
            var _a, _b, _c, chunk, e_2_1;
            var _d, e_2, _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _g.trys.push([0, 7, 8, 13]);
                        _a = true, _b = __asyncValues(this._streamChat([{ role: "user", content: prompt }], signal, options));
                        _g.label = 1;
                    case 1: return [4 /*yield*/, __await(_b.next())];
                    case 2:
                        if (!(_c = _g.sent(), _d = _c.done, !_d)) return [3 /*break*/, 6];
                        _f = _c.value;
                        _a = false;
                        chunk = _f;
                        return [4 /*yield*/, __await((0, messageContent_js_1.renderChatMessage)(chunk))];
                    case 3: return [4 /*yield*/, _g.sent()];
                    case 4:
                        _g.sent();
                        _g.label = 5;
                    case 5:
                        _a = true;
                        return [3 /*break*/, 1];
                    case 6: return [3 /*break*/, 13];
                    case 7:
                        e_2_1 = _g.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 13];
                    case 8:
                        _g.trys.push([8, , 11, 12]);
                        if (!(!_a && !_d && (_e = _b.return))) return [3 /*break*/, 10];
                        return [4 /*yield*/, __await(_e.call(_b))];
                    case 9:
                        _g.sent();
                        _g.label = 10;
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        if (e_2) throw e_2.error;
                        return [7 /*endfinally*/];
                    case 12: return [7 /*endfinally*/];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    Cloudflare.providerName = "cloudflare";
    return Cloudflare;
}(index_js_1.BaseLLM));
exports.default = Cloudflare;
