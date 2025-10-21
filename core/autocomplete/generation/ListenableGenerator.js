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
exports.ListenableGenerator = void 0;
var ListenableGenerator = /** @class */ (function () {
    function ListenableGenerator(source, onError, abortController) {
        this.onError = onError;
        this._buffer = [];
        this._listeners = new Set();
        this._isEnded = false;
        this._source = source;
        this._abortController = abortController;
        this._start().catch(function (e) {
            return console.log("Listenable generator failed: ".concat(e.message));
        });
    }
    ListenableGenerator.prototype.cancel = function () {
        this._abortController.abort();
        this._isEnded = true;
    };
    ListenableGenerator.prototype._start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, value, _i, _d, listener, e_1_1, e_2, _e, _f, listener;
            var _g, e_1, _h, _j;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        _k.trys.push([0, 13, 14, 15]);
                        _k.label = 1;
                    case 1:
                        _k.trys.push([1, 6, 7, 12]);
                        _a = true, _b = __asyncValues(this._source);
                        _k.label = 2;
                    case 2: return [4 /*yield*/, _b.next()];
                    case 3:
                        if (!(_c = _k.sent(), _g = _c.done, !_g)) return [3 /*break*/, 5];
                        _j = _c.value;
                        _a = false;
                        value = _j;
                        if (this._isEnded) {
                            return [3 /*break*/, 5];
                        }
                        this._buffer.push(value);
                        for (_i = 0, _d = this._listeners; _i < _d.length; _i++) {
                            listener = _d[_i];
                            listener(value);
                        }
                        _k.label = 4;
                    case 4:
                        _a = true;
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 12];
                    case 6:
                        e_1_1 = _k.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 12];
                    case 7:
                        _k.trys.push([7, , 10, 11]);
                        if (!(!_a && !_g && (_h = _b.return))) return [3 /*break*/, 9];
                        return [4 /*yield*/, _h.call(_b)];
                    case 8:
                        _k.sent();
                        _k.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 11: return [7 /*endfinally*/];
                    case 12: return [3 /*break*/, 15];
                    case 13:
                        e_2 = _k.sent();
                        this.onError(e_2);
                        return [3 /*break*/, 15];
                    case 14:
                        this._isEnded = true;
                        for (_e = 0, _f = this._listeners; _e < _f.length; _e++) {
                            listener = _f[_e];
                            listener(null);
                        }
                        return [7 /*endfinally*/];
                    case 15: return [2 /*return*/];
                }
            });
        });
    };
    ListenableGenerator.prototype.listen = function (listener) {
        this._listeners.add(listener);
        for (var _i = 0, _a = this._buffer; _i < _a.length; _i++) {
            var value = _a[_i];
            listener(value);
        }
        if (this._isEnded) {
            listener(null);
        }
    };
    ListenableGenerator.prototype.tee = function () {
        return __asyncGenerator(this, arguments, function tee_1() {
            var i, _loop_1, this_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, , 8, 9]);
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < this._buffer.length)) return [3 /*break*/, 4];
                        return [4 /*yield*/, __await(this._buffer[i++])];
                    case 2: return [4 /*yield*/, _a.sent()];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 4:
                        _loop_1 = function () {
                            var resolve, promise;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        promise = new Promise(function (res) {
                                            resolve = res;
                                            _this._listeners.add(resolve);
                                        });
                                        return [4 /*yield*/, __await(promise)];
                                    case 1:
                                        _b.sent();
                                        this_1._listeners.delete(resolve);
                                        _b.label = 2;
                                    case 2:
                                        if (!(i < this_1._buffer.length)) return [3 /*break*/, 5];
                                        return [4 /*yield*/, __await(this_1._buffer[i++])];
                                    case 3: return [4 /*yield*/, _b.sent()];
                                    case 4:
                                        _b.sent();
                                        return [3 /*break*/, 2];
                                    case 5: return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _a.label = 5;
                    case 5:
                        if (!!this._isEnded) return [3 /*break*/, 7];
                        return [5 /*yield**/, _loop_1()];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 7: return [3 /*break*/, 9];
                    case 8: return [7 /*endfinally*/];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    return ListenableGenerator;
}());
exports.ListenableGenerator = ListenableGenerator;
