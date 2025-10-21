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
exports.streamDiff = streamDiff;
var util_js_1 = require("./util.js");
/**
 * https://blog.jcoglan.com/2017/02/12/the-myers-diff-algorithm-part-1/
 * Invariants:
 * - new + same = newLines.length
 * - old + same = oldLinesCopy.length
 * ^ (above two guarantee that all lines get represented)
 * - Lines are always output in order, at least among old and new separately
 * - Old lines in a hunk are always output before the new lines
 */
function streamDiff(oldLines, newLines) {
    return __asyncGenerator(this, arguments, function streamDiff_1() {
        var oldLinesCopy, seenIndentationMistake, newLineResult, _a, matchIndex, isPerfectMatch, newLine, type, isNewLine, i, _b, _i, oldLinesCopy_1, oldLine, _c, newLines_1, newLines_1_1, newLine, e_1_1;
        var _d, e_1, _e, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    oldLinesCopy = __spreadArray([], oldLines, true);
                    seenIndentationMistake = false;
                    return [4 /*yield*/, __await(newLines.next())];
                case 1:
                    newLineResult = _g.sent();
                    _g.label = 2;
                case 2:
                    if (!(oldLinesCopy.length > 0 && !newLineResult.done)) return [3 /*break*/, 24];
                    _a = (0, util_js_1.matchLine)(newLineResult.value, oldLinesCopy, seenIndentationMistake), matchIndex = _a.matchIndex, isPerfectMatch = _a.isPerfectMatch, newLine = _a.newLine;
                    if (!seenIndentationMistake && newLineResult.value !== newLine) {
                        seenIndentationMistake = true;
                    }
                    type = void 0;
                    isNewLine = matchIndex === -1;
                    if (!isNewLine) return [3 /*break*/, 3];
                    type = "new";
                    return [3 /*break*/, 9];
                case 3:
                    i = 0;
                    _g.label = 4;
                case 4:
                    if (!(i < matchIndex)) return [3 /*break*/, 8];
                    return [4 /*yield*/, __await({ type: "old", line: oldLinesCopy.shift() })];
                case 5: return [4 /*yield*/, _g.sent()];
                case 6:
                    _g.sent();
                    _g.label = 7;
                case 7:
                    i++;
                    return [3 /*break*/, 4];
                case 8:
                    type = isPerfectMatch ? "same" : "old";
                    _g.label = 9;
                case 9:
                    _b = type;
                    switch (_b) {
                        case "new": return [3 /*break*/, 10];
                        case "same": return [3 /*break*/, 13];
                        case "old": return [3 /*break*/, 16];
                    }
                    return [3 /*break*/, 21];
                case 10: return [4 /*yield*/, __await({ type: type, line: newLine })];
                case 11: return [4 /*yield*/, _g.sent()];
                case 12:
                    _g.sent();
                    return [3 /*break*/, 22];
                case 13: return [4 /*yield*/, __await({ type: type, line: oldLinesCopy.shift() })];
                case 14: return [4 /*yield*/, _g.sent()];
                case 15:
                    _g.sent();
                    return [3 /*break*/, 22];
                case 16: return [4 /*yield*/, __await({ type: type, line: oldLinesCopy.shift() })];
                case 17: return [4 /*yield*/, _g.sent()];
                case 18:
                    _g.sent();
                    return [4 /*yield*/, __await({ type: "new", line: newLine })];
                case 19: return [4 /*yield*/, _g.sent()];
                case 20:
                    _g.sent();
                    return [3 /*break*/, 22];
                case 21:
                    console.error("Error streaming diff, unrecognized diff type: ".concat(type));
                    _g.label = 22;
                case 22: return [4 /*yield*/, __await(newLines.next())];
                case 23:
                    newLineResult = _g.sent();
                    return [3 /*break*/, 2];
                case 24:
                    if (!(newLineResult.done && oldLinesCopy.length > 0)) return [3 /*break*/, 29];
                    _i = 0, oldLinesCopy_1 = oldLinesCopy;
                    _g.label = 25;
                case 25:
                    if (!(_i < oldLinesCopy_1.length)) return [3 /*break*/, 29];
                    oldLine = oldLinesCopy_1[_i];
                    return [4 /*yield*/, __await({ type: "old", line: oldLine })];
                case 26: return [4 /*yield*/, _g.sent()];
                case 27:
                    _g.sent();
                    _g.label = 28;
                case 28:
                    _i++;
                    return [3 /*break*/, 25];
                case 29:
                    if (!(!newLineResult.done && oldLinesCopy.length === 0)) return [3 /*break*/, 45];
                    return [4 /*yield*/, __await({ type: "new", line: newLineResult.value })];
                case 30: return [4 /*yield*/, _g.sent()];
                case 31:
                    _g.sent();
                    _g.label = 32;
                case 32:
                    _g.trys.push([32, 39, 40, 45]);
                    _c = true, newLines_1 = __asyncValues(newLines);
                    _g.label = 33;
                case 33: return [4 /*yield*/, __await(newLines_1.next())];
                case 34:
                    if (!(newLines_1_1 = _g.sent(), _d = newLines_1_1.done, !_d)) return [3 /*break*/, 38];
                    _f = newLines_1_1.value;
                    _c = false;
                    newLine = _f;
                    return [4 /*yield*/, __await({ type: "new", line: newLine })];
                case 35: return [4 /*yield*/, _g.sent()];
                case 36:
                    _g.sent();
                    _g.label = 37;
                case 37:
                    _c = true;
                    return [3 /*break*/, 33];
                case 38: return [3 /*break*/, 45];
                case 39:
                    e_1_1 = _g.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 45];
                case 40:
                    _g.trys.push([40, , 43, 44]);
                    if (!(!_c && !_d && (_e = newLines_1.return))) return [3 /*break*/, 42];
                    return [4 /*yield*/, __await(_e.call(newLines_1))];
                case 41:
                    _g.sent();
                    _g.label = 42;
                case 42: return [3 /*break*/, 44];
                case 43:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 44: return [7 /*endfinally*/];
                case 45: return [2 /*return*/];
            }
        });
    });
}
