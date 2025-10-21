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
var messageContent_js_1 = require("../../util/messageContent.js");
var index_js_1 = require("../index.js");
var CustomLLMClass = /** @class */ (function (_super) {
    __extends(CustomLLMClass, _super);
    function CustomLLMClass(custom) {
        var _this = _super.call(this, custom.options || { model: "custom" }) || this;
        _this.customStreamCompletion = custom.streamCompletion;
        _this.customStreamChat = custom.streamChat;
        return _this;
    }
    Object.defineProperty(CustomLLMClass.prototype, "providerName", {
        get: function () {
            return "custom";
        },
        enumerable: false,
        configurable: true
    });
    CustomLLMClass.prototype._streamChat = function (messages, signal, options) {
        return __asyncGenerator(this, arguments, function _streamChat_1() {
            var _a, _b, _c, content, e_1_1, _d, _e, _f, update, e_2_1;
            var _this = this;
            var _g, e_1, _h, _j, _k, e_2, _l, _m;
            return __generator(this, function (_o) {
                switch (_o.label) {
                    case 0:
                        if (!this.customStreamChat) return [3 /*break*/, 18];
                        _o.label = 1;
                    case 1:
                        _o.trys.push([1, 11, 12, 17]);
                        _a = true, _b = __asyncValues(this.customStreamChat(messages, signal, options, function () {
                            var args = [];
                            for (var _i = 0; _i < arguments.length; _i++) {
                                args[_i] = arguments[_i];
                            }
                            return _this.fetch.apply(_this, args);
                        }));
                        _o.label = 2;
                    case 2: return [4 /*yield*/, __await(_b.next())];
                    case 3:
                        if (!(_c = _o.sent(), _g = _c.done, !_g)) return [3 /*break*/, 10];
                        _j = _c.value;
                        _a = false;
                        content = _j;
                        if (!(typeof content === "string")) return [3 /*break*/, 6];
                        return [4 /*yield*/, __await({ role: "assistant", content: content })];
                    case 4: return [4 /*yield*/, _o.sent()];
                    case 5:
                        _o.sent();
                        return [3 /*break*/, 9];
                    case 6: return [4 /*yield*/, __await(content)];
                    case 7: return [4 /*yield*/, _o.sent()];
                    case 8:
                        _o.sent();
                        _o.label = 9;
                    case 9:
                        _a = true;
                        return [3 /*break*/, 2];
                    case 10: return [3 /*break*/, 17];
                    case 11:
                        e_1_1 = _o.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 17];
                    case 12:
                        _o.trys.push([12, , 15, 16]);
                        if (!(!_a && !_g && (_h = _b.return))) return [3 /*break*/, 14];
                        return [4 /*yield*/, __await(_h.call(_b))];
                    case 13:
                        _o.sent();
                        _o.label = 14;
                    case 14: return [3 /*break*/, 16];
                    case 15:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 16: return [7 /*endfinally*/];
                    case 17: return [3 /*break*/, 31];
                    case 18:
                        _o.trys.push([18, 25, 26, 31]);
                        _d = true, _e = __asyncValues(_super.prototype._streamChat.call(this, messages, signal, options));
                        _o.label = 19;
                    case 19: return [4 /*yield*/, __await(_e.next())];
                    case 20:
                        if (!(_f = _o.sent(), _k = _f.done, !_k)) return [3 /*break*/, 24];
                        _m = _f.value;
                        _d = false;
                        update = _m;
                        return [4 /*yield*/, __await(update)];
                    case 21: return [4 /*yield*/, _o.sent()];
                    case 22:
                        _o.sent();
                        _o.label = 23;
                    case 23:
                        _d = true;
                        return [3 /*break*/, 19];
                    case 24: return [3 /*break*/, 31];
                    case 25:
                        e_2_1 = _o.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 31];
                    case 26:
                        _o.trys.push([26, , 29, 30]);
                        if (!(!_d && !_k && (_l = _e.return))) return [3 /*break*/, 28];
                        return [4 /*yield*/, __await(_l.call(_e))];
                    case 27:
                        _o.sent();
                        _o.label = 28;
                    case 28: return [3 /*break*/, 30];
                    case 29:
                        if (e_2) throw e_2.error;
                        return [7 /*endfinally*/];
                    case 30: return [7 /*endfinally*/];
                    case 31: return [2 /*return*/];
                }
            });
        });
    };
    CustomLLMClass.prototype._streamComplete = function (prompt, signal, options) {
        return __asyncGenerator(this, arguments, function _streamComplete_1() {
            var _a, _b, _c, content, e_3_1, _d, _e, _f, content, e_4_1;
            var _this = this;
            var _g, e_3, _h, _j, _k, e_4, _l, _m;
            return __generator(this, function (_o) {
                switch (_o.label) {
                    case 0:
                        if (!this.customStreamCompletion) return [3 /*break*/, 15];
                        _o.label = 1;
                    case 1:
                        _o.trys.push([1, 8, 9, 14]);
                        _a = true, _b = __asyncValues(this.customStreamCompletion(prompt, signal, options, function () {
                            var args = [];
                            for (var _i = 0; _i < arguments.length; _i++) {
                                args[_i] = arguments[_i];
                            }
                            return _this.fetch.apply(_this, args);
                        }));
                        _o.label = 2;
                    case 2: return [4 /*yield*/, __await(_b.next())];
                    case 3:
                        if (!(_c = _o.sent(), _g = _c.done, !_g)) return [3 /*break*/, 7];
                        _j = _c.value;
                        _a = false;
                        content = _j;
                        return [4 /*yield*/, __await(content)];
                    case 4: return [4 /*yield*/, _o.sent()];
                    case 5:
                        _o.sent();
                        _o.label = 6;
                    case 6:
                        _a = true;
                        return [3 /*break*/, 2];
                    case 7: return [3 /*break*/, 14];
                    case 8:
                        e_3_1 = _o.sent();
                        e_3 = { error: e_3_1 };
                        return [3 /*break*/, 14];
                    case 9:
                        _o.trys.push([9, , 12, 13]);
                        if (!(!_a && !_g && (_h = _b.return))) return [3 /*break*/, 11];
                        return [4 /*yield*/, __await(_h.call(_b))];
                    case 10:
                        _o.sent();
                        _o.label = 11;
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        if (e_3) throw e_3.error;
                        return [7 /*endfinally*/];
                    case 13: return [7 /*endfinally*/];
                    case 14: return [3 /*break*/, 34];
                    case 15:
                        if (!this.customStreamChat) return [3 /*break*/, 33];
                        _o.label = 16;
                    case 16:
                        _o.trys.push([16, 26, 27, 32]);
                        _d = true, _e = __asyncValues(this.customStreamChat([{ role: "user", content: prompt }], signal, options, function () {
                            var args = [];
                            for (var _i = 0; _i < arguments.length; _i++) {
                                args[_i] = arguments[_i];
                            }
                            return _this.fetch.apply(_this, args);
                        }));
                        _o.label = 17;
                    case 17: return [4 /*yield*/, __await(_e.next())];
                    case 18:
                        if (!(_f = _o.sent(), _k = _f.done, !_k)) return [3 /*break*/, 25];
                        _m = _f.value;
                        _d = false;
                        content = _m;
                        if (!(typeof content === "string")) return [3 /*break*/, 21];
                        return [4 /*yield*/, __await(content)];
                    case 19: return [4 /*yield*/, _o.sent()];
                    case 20:
                        _o.sent();
                        return [3 /*break*/, 24];
                    case 21: return [4 /*yield*/, __await((0, messageContent_js_1.renderChatMessage)(content))];
                    case 22: return [4 /*yield*/, _o.sent()];
                    case 23:
                        _o.sent();
                        _o.label = 24;
                    case 24:
                        _d = true;
                        return [3 /*break*/, 17];
                    case 25: return [3 /*break*/, 32];
                    case 26:
                        e_4_1 = _o.sent();
                        e_4 = { error: e_4_1 };
                        return [3 /*break*/, 32];
                    case 27:
                        _o.trys.push([27, , 30, 31]);
                        if (!(!_d && !_k && (_l = _e.return))) return [3 /*break*/, 29];
                        return [4 /*yield*/, __await(_l.call(_e))];
                    case 28:
                        _o.sent();
                        _o.label = 29;
                    case 29: return [3 /*break*/, 31];
                    case 30:
                        if (e_4) throw e_4.error;
                        return [7 /*endfinally*/];
                    case 31: return [7 /*endfinally*/];
                    case 32: return [3 /*break*/, 34];
                    case 33: throw new Error("Either streamCompletion or streamChat must be defined in a custom LLM in config.ts");
                    case 34: return [2 /*return*/];
                }
            });
        });
    };
    return CustomLLMClass;
}(index_js_1.BaseLLM));
exports.default = CustomLLMClass;
