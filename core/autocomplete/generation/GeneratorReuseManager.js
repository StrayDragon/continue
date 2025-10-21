"use strict";
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
exports.GeneratorReuseManager = void 0;
var ListenableGenerator_1 = require("./ListenableGenerator");
var GeneratorReuseManager = /** @class */ (function () {
    function GeneratorReuseManager(onError) {
        this.onError = onError;
        this.pendingCompletion = "";
    }
    GeneratorReuseManager.prototype._createListenableGenerator = function (abortController, gen, prefix) {
        var _this = this;
        var _a;
        (_a = this.currentGenerator) === null || _a === void 0 ? void 0 : _a.cancel();
        var listenableGen = new ListenableGenerator_1.ListenableGenerator(gen, this.onError, abortController);
        listenableGen.listen(function (chunk) { return (_this.pendingCompletion += chunk !== null && chunk !== void 0 ? chunk : ""); });
        this.pendingGeneratorPrefix = prefix;
        this.pendingCompletion = "";
        this.currentGenerator = listenableGen;
    };
    GeneratorReuseManager.prototype.shouldReuseExistingGenerator = function (prefix) {
        var _a;
        return (!!this.currentGenerator &&
            !!this.pendingGeneratorPrefix &&
            (this.pendingGeneratorPrefix + this.pendingCompletion).startsWith(prefix) &&
            // for e.g. backspace
            ((_a = this.pendingGeneratorPrefix) === null || _a === void 0 ? void 0 : _a.length) <= (prefix === null || prefix === void 0 ? void 0 : prefix.length));
    };
    GeneratorReuseManager.prototype.getGenerator = function (prefix, newGenerator, multiline) {
        return __asyncGenerator(this, arguments, function getGenerator_1() {
            var abortController, typedSinceLastGenerator, _a, _b, _c, chunk, newLineIndex, e_1_1;
            var _d, e_1, _e, _f;
            var _g, _h, _j;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        // If we can't reuse, then create a new generator
                        if (!this.shouldReuseExistingGenerator(prefix)) {
                            abortController = new AbortController();
                            this._createListenableGenerator(abortController, newGenerator(abortController.signal), prefix);
                        }
                        typedSinceLastGenerator = prefix.slice((_g = this.pendingGeneratorPrefix) === null || _g === void 0 ? void 0 : _g.length) || "";
                        _k.label = 1;
                    case 1:
                        _k.trys.push([1, 11, 12, 17]);
                        _a = true, _b = __asyncValues((_j = (_h = this.currentGenerator) === null || _h === void 0 ? void 0 : _h.tee()) !== null && _j !== void 0 ? _j : []);
                        _k.label = 2;
                    case 2: return [4 /*yield*/, __await(_b.next())];
                    case 3:
                        if (!(_c = _k.sent(), _d = _c.done, !_d)) return [3 /*break*/, 10];
                        _f = _c.value;
                        _a = false;
                        chunk = _f;
                        if (!chunk) {
                            return [3 /*break*/, 9];
                        }
                        // Ignore already typed characters in the completion
                        while (chunk.length && typedSinceLastGenerator.length) {
                            if (chunk[0] === typedSinceLastGenerator[0]) {
                                typedSinceLastGenerator = typedSinceLastGenerator.slice(1);
                                chunk = chunk.slice(1);
                            }
                            else {
                                break;
                            }
                        }
                        newLineIndex = chunk.indexOf("\n");
                        if (!(newLineIndex >= 0 && !multiline)) return [3 /*break*/, 6];
                        return [4 /*yield*/, __await(chunk.slice(0, newLineIndex))];
                    case 4: return [4 /*yield*/, _k.sent()];
                    case 5:
                        _k.sent();
                        return [3 /*break*/, 10];
                    case 6:
                        if (!(chunk !== "")) return [3 /*break*/, 9];
                        return [4 /*yield*/, __await(chunk)];
                    case 7: return [4 /*yield*/, _k.sent()];
                    case 8:
                        _k.sent();
                        _k.label = 9;
                    case 9:
                        _a = true;
                        return [3 /*break*/, 2];
                    case 10: return [3 /*break*/, 17];
                    case 11:
                        e_1_1 = _k.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 17];
                    case 12:
                        _k.trys.push([12, , 15, 16]);
                        if (!(!_a && !_d && (_e = _b.return))) return [3 /*break*/, 14];
                        return [4 /*yield*/, __await(_e.call(_b))];
                    case 13:
                        _k.sent();
                        _k.label = 14;
                    case 14: return [3 /*break*/, 16];
                    case 15:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 16: return [7 /*endfinally*/];
                    case 17: return [2 /*return*/];
                }
            });
        });
    };
    return GeneratorReuseManager;
}());
exports.GeneratorReuseManager = GeneratorReuseManager;
