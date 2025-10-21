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
exports.CompletionStreamer = void 0;
var StreamTransformPipeline_1 = require("../filtering/streamTransforms/StreamTransformPipeline");
var GeneratorReuseManager_1 = require("./GeneratorReuseManager");
var utils_1 = require("./utils");
var CompletionStreamer = /** @class */ (function () {
    function CompletionStreamer(onError) {
        this.streamTransformPipeline = new StreamTransformPipeline_1.StreamTransformPipeline();
        this.generatorReuseManager = new GeneratorReuseManager_1.GeneratorReuseManager(onError);
    }
    CompletionStreamer.prototype.streamCompletionWithFilters = function (token, llm, prefix, suffix, prompt, multiline, completionOptions, helper) {
        return __asyncGenerator(this, arguments, function streamCompletionWithFilters_1() {
            var fullStop, generator, generatorWithCancellation, initialGenerator, transformedGenerator, _a, transformedGenerator_1, transformedGenerator_1_1, update, e_1_1;
            var _this = this;
            var _b, e_1, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        fullStop = function () { var _a; return (_a = _this.generatorReuseManager.currentGenerator) === null || _a === void 0 ? void 0 : _a.cancel(); };
                        generator = this.generatorReuseManager.getGenerator(prefix, function (abortSignal) {
                            var generator = llm.supportsFim()
                                ? llm.streamFim(prefix, suffix, abortSignal, completionOptions)
                                : llm.streamComplete(prompt, abortSignal, __assign(__assign({}, completionOptions), { raw: true }));
                            /**
                             * This transformer applies even on reused generator. We are deliberately
                             * not using streamTransformPipeline because we want to capture and stop
                             * the request even if the generator is being reused.
                             */
                            return helper.options.transform
                                ? (0, utils_1.stopAfterMaxProcessingTime)(generator, helper.options.modelTimeout * 2.5, fullStop)
                                : generator;
                        }, multiline);
                        generatorWithCancellation = function () {
                            return __asyncGenerator(this, arguments, function () {
                                var _a, generator_1, generator_1_1, update, e_2_1;
                                var _b, e_2, _c, _d;
                                return __generator(this, function (_e) {
                                    switch (_e.label) {
                                        case 0:
                                            _e.trys.push([0, 9, 10, 15]);
                                            _a = true, generator_1 = __asyncValues(generator);
                                            _e.label = 1;
                                        case 1: return [4 /*yield*/, __await(generator_1.next())];
                                        case 2:
                                            if (!(generator_1_1 = _e.sent(), _b = generator_1_1.done, !_b)) return [3 /*break*/, 8];
                                            _d = generator_1_1.value;
                                            _a = false;
                                            update = _d;
                                            if (!token.aborted) return [3 /*break*/, 4];
                                            return [4 /*yield*/, __await(void 0)];
                                        case 3: return [2 /*return*/, _e.sent()];
                                        case 4: return [4 /*yield*/, __await(update)];
                                        case 5: return [4 /*yield*/, _e.sent()];
                                        case 6:
                                            _e.sent();
                                            _e.label = 7;
                                        case 7:
                                            _a = true;
                                            return [3 /*break*/, 1];
                                        case 8: return [3 /*break*/, 15];
                                        case 9:
                                            e_2_1 = _e.sent();
                                            e_2 = { error: e_2_1 };
                                            return [3 /*break*/, 15];
                                        case 10:
                                            _e.trys.push([10, , 13, 14]);
                                            if (!(!_a && !_b && (_c = generator_1.return))) return [3 /*break*/, 12];
                                            return [4 /*yield*/, __await(_c.call(generator_1))];
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
                        initialGenerator = generatorWithCancellation();
                        transformedGenerator = helper.options.transform
                            ? this.streamTransformPipeline.transform(initialGenerator, prefix, suffix, multiline, (completionOptions === null || completionOptions === void 0 ? void 0 : completionOptions.stop) || [], fullStop, helper)
                            : initialGenerator;
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 8, 9, 14]);
                        _a = true, transformedGenerator_1 = __asyncValues(transformedGenerator);
                        _e.label = 2;
                    case 2: return [4 /*yield*/, __await(transformedGenerator_1.next())];
                    case 3:
                        if (!(transformedGenerator_1_1 = _e.sent(), _b = transformedGenerator_1_1.done, !_b)) return [3 /*break*/, 7];
                        _d = transformedGenerator_1_1.value;
                        _a = false;
                        update = _d;
                        return [4 /*yield*/, __await(update)];
                    case 4: return [4 /*yield*/, _e.sent()];
                    case 5:
                        _e.sent();
                        _e.label = 6;
                    case 6:
                        _a = true;
                        return [3 /*break*/, 2];
                    case 7: return [3 /*break*/, 14];
                    case 8:
                        e_1_1 = _e.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 14];
                    case 9:
                        _e.trys.push([9, , 12, 13]);
                        if (!(!_a && !_b && (_c = transformedGenerator_1.return))) return [3 /*break*/, 11];
                        return [4 /*yield*/, __await(_c.call(transformedGenerator_1))];
                    case 10:
                        _e.sent();
                        _e.label = 11;
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 13: return [7 /*endfinally*/];
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    return CompletionStreamer;
}());
exports.CompletionStreamer = CompletionStreamer;
