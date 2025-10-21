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
exports.matchLine = matchLine;
exports.streamLines = streamLines;
exports.generateLines = generateLines;
var fastest_levenshtein_1 = require("fastest-levenshtein");
var messageContent_js_1 = require("../util/messageContent.js");
function linesMatchPerfectly(lineA, lineB) {
    return lineA === lineB && lineA !== "";
}
var END_BRACKETS = ["}", "});", "})"];
function linesMatch(lineA, lineB, linesBetween) {
    if (linesBetween === void 0) { linesBetween = 0; }
    // Require a perfect (without padding) match for these lines
    // Otherwise they are edit distance 1 from empty lines and other single char lines (e.g. each other)
    if (["}", "*", "});", "})"].includes(lineA.trim())) {
        return lineA.trim() === lineB.trim();
    }
    var d = (0, fastest_levenshtein_1.distance)(lineA, lineB);
    return (
    // Should be more unlikely for lines to fuzzy match if they are further away
    (d / Math.max(lineA.length, lineB.length) <=
        Math.max(0, 0.48 - linesBetween * 0.06) ||
        lineA.trim() === lineB.trim()) &&
        lineA.trim() !== "");
}
/**
 * Used to find a match for a new line in an array of old lines.
 *
 * Return the index of the first match and whether it is a perfect match
 * Also return a version of the line with correct indentation if needs fixing
 */
function matchLine(newLine, oldLines, permissiveAboutIndentation) {
    var _a;
    if (permissiveAboutIndentation === void 0) { permissiveAboutIndentation = false; }
    // Only match empty lines if it's the next one:
    if (newLine.trim() === "" && ((_a = oldLines[0]) === null || _a === void 0 ? void 0 : _a.trim()) === "") {
        return {
            matchIndex: 0,
            isPerfectMatch: true,
            newLine: newLine.trim(),
        };
    }
    var isEndBracket = END_BRACKETS.includes(newLine.trim());
    for (var i = 0; i < oldLines.length; i++) {
        // trims trailing whitespaces from the lines before comparison
        //this ensures trailing spaces don't affect matching.
        var oldLineTrimmed = oldLines[i].trimEnd();
        var newLineTrimmed = newLine.trimEnd();
        // Don't match end bracket lines if too far away
        if (i > 4 && isEndBracket) {
            return { matchIndex: -1, isPerfectMatch: false, newLine: newLine };
        }
        if (linesMatchPerfectly(newLineTrimmed, oldLineTrimmed)) {
            return { matchIndex: i, isPerfectMatch: true, newLine: newLine };
        }
        if (linesMatch(newLineTrimmed, oldLineTrimmed, i)) {
            // This is a way to fix indentation, but only for sufficiently long lines to avoid matching whitespace or short lines
            if (newLineTrimmed.trimStart() === oldLineTrimmed.trimStart() &&
                (permissiveAboutIndentation || newLine.trim().length > 8)) {
                return {
                    matchIndex: i,
                    isPerfectMatch: true,
                    newLine: oldLines[i],
                };
            }
            return { matchIndex: i, isPerfectMatch: false, newLine: newLine };
        }
    }
    return { matchIndex: -1, isPerfectMatch: false, newLine: newLine };
}
/**
 * Convert a stream of arbitrary chunks to a stream of lines
 */
function streamLines(streamCompletion_1) {
    return __asyncGenerator(this, arguments, function streamLines_1(streamCompletion, log) {
        var allLines, buffer, _a, streamCompletion_2, streamCompletion_2_1, update, chunk, lines, _i, lines_1, line, e_1_1;
        var _b, e_1, _c, _d;
        var _e;
        if (log === void 0) { log = false; }
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    allLines = [];
                    buffer = "";
                    _f.label = 1;
                case 1:
                    _f.trys.push([1, , 21, 22]);
                    _f.label = 2;
                case 2:
                    _f.trys.push([2, 11, 12, 17]);
                    _a = true, streamCompletion_2 = __asyncValues(streamCompletion);
                    _f.label = 3;
                case 3: return [4 /*yield*/, __await(streamCompletion_2.next())];
                case 4:
                    if (!(streamCompletion_2_1 = _f.sent(), _b = streamCompletion_2_1.done, !_b)) return [3 /*break*/, 10];
                    _d = streamCompletion_2_1.value;
                    _a = false;
                    update = _d;
                    chunk = typeof update === "string" ? update : (0, messageContent_js_1.renderChatMessage)(update);
                    buffer += chunk;
                    lines = buffer.split("\n");
                    buffer = (_e = lines.pop()) !== null && _e !== void 0 ? _e : "";
                    _i = 0, lines_1 = lines;
                    _f.label = 5;
                case 5:
                    if (!(_i < lines_1.length)) return [3 /*break*/, 9];
                    line = lines_1[_i];
                    return [4 /*yield*/, __await(line)];
                case 6: return [4 /*yield*/, _f.sent()];
                case 7:
                    _f.sent();
                    allLines.push(line);
                    _f.label = 8;
                case 8:
                    _i++;
                    return [3 /*break*/, 5];
                case 9:
                    _a = true;
                    return [3 /*break*/, 3];
                case 10: return [3 /*break*/, 17];
                case 11:
                    e_1_1 = _f.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 17];
                case 12:
                    _f.trys.push([12, , 15, 16]);
                    if (!(!_a && !_b && (_c = streamCompletion_2.return))) return [3 /*break*/, 14];
                    return [4 /*yield*/, __await(_c.call(streamCompletion_2))];
                case 13:
                    _f.sent();
                    _f.label = 14;
                case 14: return [3 /*break*/, 16];
                case 15:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 16: return [7 /*endfinally*/];
                case 17:
                    if (!(buffer.length > 0)) return [3 /*break*/, 20];
                    return [4 /*yield*/, __await(buffer)];
                case 18: return [4 /*yield*/, _f.sent()];
                case 19:
                    _f.sent();
                    allLines.push(buffer);
                    _f.label = 20;
                case 20: return [3 /*break*/, 22];
                case 21:
                    if (log) {
                        console.log("Streamed lines: ", allLines.join("\n"));
                    }
                    return [7 /*endfinally*/];
                case 22: return [2 /*return*/];
            }
        });
    });
}
function generateLines(lines) {
    return __asyncGenerator(this, arguments, function generateLines_1() {
        var _i, lines_2, line;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _i = 0, lines_2 = lines;
                    _a.label = 1;
                case 1:
                    if (!(_i < lines_2.length)) return [3 /*break*/, 5];
                    line = lines_2[_i];
                    return [4 /*yield*/, __await(line)];
                case 2: return [4 /*yield*/, _a.sent()];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 1];
                case 5: return [2 /*return*/];
            }
        });
    });
}
