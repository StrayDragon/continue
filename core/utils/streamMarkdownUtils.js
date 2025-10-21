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
exports.shouldStopAtMarkdownBlock = shouldStopAtMarkdownBlock;
exports.processBlockNesting = processBlockNesting;
exports.stopAtLinesWithMarkdownSupport = stopAtLinesWithMarkdownSupport;
var markdownUtils_1 = require("./markdownUtils");
/**
 * Determines if we should stop at a markdown block based on nested markdown logic.
 * This handles the complex case where markdown blocks contain other markdown blocks.
 * Uses optimized state tracking to avoid redundant computation.
 */
function shouldStopAtMarkdownBlock(stateTracker, currentIndex) {
    return stateTracker.shouldStopAtPosition(currentIndex);
}
/**
 * Processes block nesting logic and returns updated state.
 */
function processBlockNesting(line, seenFirstFence, shouldRemoveLineBeforeStart) {
    if (!seenFirstFence && shouldRemoveLineBeforeStart(line)) {
        return { newSeenFirstFence: false, shouldSkip: true };
    }
    if (!seenFirstFence) {
        return { newSeenFirstFence: true, shouldSkip: false };
    }
    return { newSeenFirstFence: seenFirstFence, shouldSkip: false };
}
/**
 * Stream transformation that stops when encountering a markdown code block ending.
 * Handles nested markdown blocks in markdown files.
 */
function stopAtLinesWithMarkdownSupport(lines, filename) {
    return __asyncGenerator(this, arguments, function stopAtLinesWithMarkdownSupport_1() {
        var _a, lines_1, lines_1_1, line, e_1_1, allLines, _b, lines_2, lines_2_1, line, e_2_1, source, foundStandaloneBackticks, i, j, _i, allLines_1, line, stateTracker, i, j, _c, allLines_2, line;
        var _d, e_1, _e, _f, _g, e_2, _h, _j;
        return __generator(this, function (_k) {
            switch (_k.label) {
                case 0:
                    if (!!(0, markdownUtils_1.isMarkdownFile)(filename)) return [3 /*break*/, 18];
                    _k.label = 1;
                case 1:
                    _k.trys.push([1, 10, 11, 16]);
                    _a = true, lines_1 = __asyncValues(lines);
                    _k.label = 2;
                case 2: return [4 /*yield*/, __await(lines_1.next())];
                case 3:
                    if (!(lines_1_1 = _k.sent(), _d = lines_1_1.done, !_d)) return [3 /*break*/, 9];
                    _f = lines_1_1.value;
                    _a = false;
                    line = _f;
                    if (!(line.trim() === "```")) return [3 /*break*/, 5];
                    return [4 /*yield*/, __await(void 0)];
                case 4: return [2 /*return*/, _k.sent()];
                case 5: return [4 /*yield*/, __await(line)];
                case 6: return [4 /*yield*/, _k.sent()];
                case 7:
                    _k.sent();
                    _k.label = 8;
                case 8:
                    _a = true;
                    return [3 /*break*/, 2];
                case 9: return [3 /*break*/, 16];
                case 10:
                    e_1_1 = _k.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 16];
                case 11:
                    _k.trys.push([11, , 14, 15]);
                    if (!(!_a && !_d && (_e = lines_1.return))) return [3 /*break*/, 13];
                    return [4 /*yield*/, __await(_e.call(lines_1))];
                case 12:
                    _k.sent();
                    _k.label = 13;
                case 13: return [3 /*break*/, 15];
                case 14:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 15: return [7 /*endfinally*/];
                case 16: return [4 /*yield*/, __await(void 0)];
                case 17: return [2 /*return*/, _k.sent()];
                case 18:
                    allLines = [];
                    _k.label = 19;
                case 19:
                    _k.trys.push([19, 24, 25, 30]);
                    _b = true, lines_2 = __asyncValues(lines);
                    _k.label = 20;
                case 20: return [4 /*yield*/, __await(lines_2.next())];
                case 21:
                    if (!(lines_2_1 = _k.sent(), _g = lines_2_1.done, !_g)) return [3 /*break*/, 23];
                    _j = lines_2_1.value;
                    _b = false;
                    line = _j;
                    allLines.push(line);
                    _k.label = 22;
                case 22:
                    _b = true;
                    return [3 /*break*/, 20];
                case 23: return [3 /*break*/, 30];
                case 24:
                    e_2_1 = _k.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 30];
                case 25:
                    _k.trys.push([25, , 28, 29]);
                    if (!(!_b && !_g && (_h = lines_2.return))) return [3 /*break*/, 27];
                    return [4 /*yield*/, __await(_h.call(lines_2))];
                case 26:
                    _k.sent();
                    _k.label = 27;
                case 27: return [3 /*break*/, 29];
                case 28:
                    if (e_2) throw e_2.error;
                    return [7 /*endfinally*/];
                case 29: return [7 /*endfinally*/];
                case 30:
                    source = allLines.join("\n");
                    if (!!source.match(/```(\w*|.*)(md|markdown|gfm|github-markdown)/)) return [3 /*break*/, 46];
                    foundStandaloneBackticks = false;
                    i = 0;
                    _k.label = 31;
                case 31:
                    if (!(i < allLines.length)) return [3 /*break*/, 39];
                    if (!(allLines[i].trim() === "```")) return [3 /*break*/, 38];
                    j = 0;
                    _k.label = 32;
                case 32:
                    if (!(j < i)) return [3 /*break*/, 36];
                    return [4 /*yield*/, __await(allLines[j])];
                case 33: return [4 /*yield*/, _k.sent()];
                case 34:
                    _k.sent();
                    _k.label = 35;
                case 35:
                    j++;
                    return [3 /*break*/, 32];
                case 36:
                    foundStandaloneBackticks = true;
                    return [4 /*yield*/, __await(void 0)];
                case 37: return [2 /*return*/, _k.sent()];
                case 38:
                    i++;
                    return [3 /*break*/, 31];
                case 39:
                    if (!!foundStandaloneBackticks) return [3 /*break*/, 44];
                    _i = 0, allLines_1 = allLines;
                    _k.label = 40;
                case 40:
                    if (!(_i < allLines_1.length)) return [3 /*break*/, 44];
                    line = allLines_1[_i];
                    return [4 /*yield*/, __await(line)];
                case 41: return [4 /*yield*/, _k.sent()];
                case 42:
                    _k.sent();
                    _k.label = 43;
                case 43:
                    _i++;
                    return [3 /*break*/, 40];
                case 44: return [4 /*yield*/, __await(void 0)];
                case 45: return [2 /*return*/, _k.sent()];
                case 46:
                    stateTracker = new markdownUtils_1.MarkdownBlockStateTracker(allLines);
                    i = 0;
                    _k.label = 47;
                case 47:
                    if (!(i < allLines.length)) return [3 /*break*/, 55];
                    if (!stateTracker.shouldStopAtPosition(i)) return [3 /*break*/, 54];
                    j = 0;
                    _k.label = 48;
                case 48:
                    if (!(j < i)) return [3 /*break*/, 52];
                    return [4 /*yield*/, __await(allLines[j])];
                case 49: return [4 /*yield*/, _k.sent()];
                case 50:
                    _k.sent();
                    _k.label = 51;
                case 51:
                    j++;
                    return [3 /*break*/, 48];
                case 52: return [4 /*yield*/, __await(void 0)];
                case 53: return [2 /*return*/, _k.sent()];
                case 54:
                    i++;
                    return [3 /*break*/, 47];
                case 55:
                    _c = 0, allLines_2 = allLines;
                    _k.label = 56;
                case 56:
                    if (!(_c < allLines_2.length)) return [3 /*break*/, 60];
                    line = allLines_2[_c];
                    return [4 /*yield*/, __await(line)];
                case 57: return [4 /*yield*/, _k.sent()];
                case 58:
                    _k.sent();
                    _k.label = 59;
                case 59:
                    _c++;
                    return [3 /*break*/, 56];
                case 60: return [2 /*return*/];
            }
        });
    });
}
