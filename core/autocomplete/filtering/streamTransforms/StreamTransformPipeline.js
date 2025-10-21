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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamTransformPipeline = void 0;
var util_1 = require("../../../diff/util");
var charStream_1 = require("./charStream");
var lineStream_1 = require("./lineStream");
var STOP_AT_PATTERNS = ["diff --git"];
var StreamTransformPipeline = /** @class */ (function () {
    function StreamTransformPipeline() {
    }
    StreamTransformPipeline.prototype.transform = function (generator, prefix, suffix, multiline, stopTokens, fullStop, helper) {
        return __asyncGenerator(this, arguments, function transform_1() {
            var charGenerator, _i, _a, charFilter, lineGenerator, lineBelowCursor, _b, _c, lineFilter, timeoutValue, finalGenerator, _d, finalGenerator_1, finalGenerator_1_1, update, e_1_1;
            var _e, e_1, _f, _g;
            var _h, _j;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        charGenerator = generator;
                        charGenerator = (0, charStream_1.stopAtStopTokens)(generator, __spreadArray(__spreadArray([], stopTokens, true), STOP_AT_PATTERNS, true));
                        charGenerator = (0, charStream_1.stopAtStartOf)(charGenerator, suffix);
                        for (_i = 0, _a = (_h = helper.lang.charFilters) !== null && _h !== void 0 ? _h : []; _i < _a.length; _i++) {
                            charFilter = _a[_i];
                            charGenerator = charFilter({
                                chars: charGenerator,
                                prefix: prefix,
                                suffix: suffix,
                                filepath: helper.filepath,
                                multiline: multiline,
                            });
                        }
                        lineGenerator = (0, util_1.streamLines)(charGenerator);
                        lineGenerator = (0, lineStream_1.stopAtLines)(lineGenerator, fullStop);
                        lineBelowCursor = this.getLineBelowCursor(helper);
                        if (lineBelowCursor.trim() !== "") {
                            lineGenerator = (0, lineStream_1.stopAtLinesExact)(lineGenerator, fullStop, [
                                lineBelowCursor,
                            ]);
                        }
                        lineGenerator = (0, lineStream_1.stopAtRepeatingLines)(lineGenerator, fullStop);
                        lineGenerator = (0, lineStream_1.avoidEmptyComments)(lineGenerator, helper.lang.singleLineComment);
                        lineGenerator = (0, lineStream_1.avoidPathLine)(lineGenerator, helper.lang.singleLineComment);
                        lineGenerator = (0, lineStream_1.skipPrefixes)(lineGenerator);
                        lineGenerator = (0, lineStream_1.noDoubleNewLine)(lineGenerator);
                        for (_b = 0, _c = (_j = helper.lang.lineFilters) !== null && _j !== void 0 ? _j : []; _b < _c.length; _b++) {
                            lineFilter = _c[_b];
                            lineGenerator = lineFilter({ lines: lineGenerator, fullStop: fullStop });
                        }
                        lineGenerator = (0, lineStream_1.stopAtSimilarLine)(lineGenerator, this.getLineBelowCursor(helper), fullStop);
                        timeoutValue = helper.options.modelTimeout;
                        lineGenerator = (0, lineStream_1.showWhateverWeHaveAtXMs)(lineGenerator, timeoutValue);
                        finalGenerator = (0, lineStream_1.streamWithNewLines)(lineGenerator);
                        _k.label = 1;
                    case 1:
                        _k.trys.push([1, 8, 9, 14]);
                        _d = true, finalGenerator_1 = __asyncValues(finalGenerator);
                        _k.label = 2;
                    case 2: return [4 /*yield*/, __await(finalGenerator_1.next())];
                    case 3:
                        if (!(finalGenerator_1_1 = _k.sent(), _e = finalGenerator_1_1.done, !_e)) return [3 /*break*/, 7];
                        _g = finalGenerator_1_1.value;
                        _d = false;
                        update = _g;
                        return [4 /*yield*/, __await(update)];
                    case 4: return [4 /*yield*/, _k.sent()];
                    case 5:
                        _k.sent();
                        _k.label = 6;
                    case 6:
                        _d = true;
                        return [3 /*break*/, 2];
                    case 7: return [3 /*break*/, 14];
                    case 8:
                        e_1_1 = _k.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 14];
                    case 9:
                        _k.trys.push([9, , 12, 13]);
                        if (!(!_d && !_e && (_f = finalGenerator_1.return))) return [3 /*break*/, 11];
                        return [4 /*yield*/, __await(_f.call(finalGenerator_1))];
                    case 10:
                        _k.sent();
                        _k.label = 11;
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
    StreamTransformPipeline.prototype.getLineBelowCursor = function (helper) {
        var lineBelowCursor = "";
        var i = 1;
        while (lineBelowCursor.trim() === "" &&
            helper.pos.line + i <= helper.fileLines.length - 1) {
            lineBelowCursor =
                helper.fileLines[Math.min(helper.pos.line + i, helper.fileLines.length - 1)];
            i++;
        }
        return lineBelowCursor;
    };
    return StreamTransformPipeline;
}());
exports.StreamTransformPipeline = StreamTransformPipeline;
