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
exports.ENGLISH_POST_PHRASES = exports.ENGLISH_START_PHRASES = exports.LINES_TO_REMOVE_BEFORE_START = exports.LINES_TO_SKIP = exports.LINES_TO_STOP_AT = exports.PREFIXES_TO_SKIP = exports.BRACKET_ENDING_CHARS = exports.CODE_STOP_BLOCK = exports.CODE_KEYWORDS_ENDING_IN_SEMICOLON = exports.USELESS_LINES = exports.filterCodeBlockLines = void 0;
exports.validatePatternInLine = validatePatternInLine;
exports.shouldChangeLineAndStop = shouldChangeLineAndStop;
exports.hasNestedMarkdownBlocks = hasNestedMarkdownBlocks;
exports.processBlockNesting = processBlockNesting;
exports.noTopLevelKeywordsMidline = noTopLevelKeywordsMidline;
exports.avoidPathLine = avoidPathLine;
exports.avoidEmptyComments = avoidEmptyComments;
exports.streamWithNewLines = streamWithNewLines;
exports.lineIsRepeated = lineIsRepeated;
exports.stopAtSimilarLine = stopAtSimilarLine;
exports.stopAtLines = stopAtLines;
exports.stopAtLinesExact = stopAtLinesExact;
exports.skipPrefixes = skipPrefixes;
exports.skipLines = skipLines;
exports.removeTrailingWhitespace = removeTrailingWhitespace;
exports.filterEnglishLinesAtStart = filterEnglishLinesAtStart;
exports.filterEnglishLinesAtEnd = filterEnglishLinesAtEnd;
exports.filterLeadingNewline = filterLeadingNewline;
exports.fixCodeLlamaFirstLineIndentation = fixCodeLlamaFirstLineIndentation;
exports.filterLeadingAndTrailingNewLineInsertion = filterLeadingAndTrailingNewLineInsertion;
exports.stopAtRepeatingLines = stopAtRepeatingLines;
exports.logLines = logLines;
exports.showWhateverWeHaveAtXMs = showWhateverWeHaveAtXMs;
exports.noDoubleNewLine = noDoubleNewLine;
var fastest_levenshtein_1 = require("fastest-levenshtein");
var markdownUtils_1 = require("../../../utils/markdownUtils");
var streamMarkdownUtils_1 = require("../../../utils/streamMarkdownUtils");
var filterCodeBlock_1 = require("./filterCodeBlock");
Object.defineProperty(exports, "filterCodeBlockLines", { enumerable: true, get: function () { return filterCodeBlock_1.filterCodeBlockLines; } });
function isBracketEnding(line) {
    return line
        .trim()
        .split("")
        .some(function (char) { return exports.BRACKET_ENDING_CHARS.includes(char); });
}
function isEnglishFirstLine(line) {
    line = line.trim().toLowerCase();
    if (line.endsWith(":") &&
        !exports.CODE_KEYWORDS_ENDING_IN_SEMICOLON.some(function (keyword) {
            return line.startsWith(keyword);
        })) {
        return true;
    }
    return exports.ENGLISH_START_PHRASES.some(function (phrase) { return line.startsWith(phrase); });
}
function isEnglishPostExplanation(line) {
    var lower = line.toLowerCase();
    return exports.ENGLISH_POST_PHRASES.some(function (phrase) { return lower.startsWith(phrase); });
}
function shouldRemoveLineBeforeStart(line) {
    return (line.trimStart().startsWith("```") ||
        exports.LINES_TO_REMOVE_BEFORE_START.some(function (l) { return line.trim() === l; }));
}
/**
 * Shared utility for validating patterns in lines to avoid code duplication.
 * Checks if a pattern appears in a valid context (not inside quotes or identifiers).
 */
function validatePatternInLine(line, pattern) {
    var patternIndex = line.indexOf(pattern);
    if (patternIndex === -1) {
        return { isValid: false, patternIndex: -1, beforePattern: "" };
    }
    // Check if pattern is preceded by a non-whitespace character
    // If so, it might be part of an identifier, so don't handle it
    if (patternIndex > 0) {
        var charBefore = line[patternIndex - 1];
        if (charBefore && !charBefore.match(/\s/)) {
            return { isValid: false, patternIndex: patternIndex, beforePattern: "" };
        }
    }
    // Check if pattern appears to be inside quotes
    // Simple heuristic: count unmatched quotes before the pattern
    var beforePattern = line.substring(0, patternIndex);
    var singleQuotes = (beforePattern.match(/'/g) || []).length;
    var doubleQuotes = (beforePattern.match(/"/g) || []).length;
    // If there's an odd number of quotes before pattern, we're likely inside quotes
    if (singleQuotes % 2 !== 0 || doubleQuotes % 2 !== 0) {
        return { isValid: false, patternIndex: patternIndex, beforePattern: beforePattern };
    }
    return { isValid: true, patternIndex: patternIndex, beforePattern: beforePattern };
}
function shouldChangeLineAndStop(line) {
    if (line.trimStart() === "```") {
        return line;
    }
    // Check if [/CODE] appears in the line
    if (line.includes(exports.CODE_STOP_BLOCK)) {
        var validation = validatePatternInLine(line, exports.CODE_STOP_BLOCK);
        if (!validation.isValid) {
            return undefined;
        }
        // Get the trimmed line to check if [/CODE] is at logical start
        var trimmedLine = line.trimStart();
        if (trimmedLine.startsWith(exports.CODE_STOP_BLOCK)) {
            // [/CODE] is at the logical start (after whitespace only)
            if (trimmedLine === exports.CODE_STOP_BLOCK) {
                return line; // Return the whole line including leading whitespace
            }
        }
        // [/CODE] appears after some content (separated by whitespace) - return part before
        return validation.beforePattern.trimEnd();
    }
    return undefined;
}
function isUselessLine(line) {
    var trimmed = line.trim().toLowerCase();
    var hasUselessLine = exports.USELESS_LINES.some(function (uselessLine) { return trimmed === uselessLine; });
    return hasUselessLine || trimmed.startsWith("// end");
}
/**
 * Determines if the code block has nested markdown blocks.
 */
function hasNestedMarkdownBlocks(firstLine, filepath) {
    return ((firstLine.startsWith("```") &&
        (0, markdownUtils_1.headerIsMarkdown)(firstLine.replace(/`/g, ""))) ||
        Boolean(filepath && (0, markdownUtils_1.isMarkdownFile)(filepath)));
}
// Wrapper for processBlockNesting with local shouldRemoveLineBeforeStart function
function processBlockNesting(line, seenFirstFence) {
    return (0, streamMarkdownUtils_1.processBlockNesting)(line, seenFirstFence, shouldRemoveLineBeforeStart);
}
exports.USELESS_LINES = [""];
exports.CODE_KEYWORDS_ENDING_IN_SEMICOLON = ["def"];
exports.CODE_STOP_BLOCK = "[/CODE]";
exports.BRACKET_ENDING_CHARS = [")", "]", "}", ";"];
exports.PREFIXES_TO_SKIP = ["<COMPLETION>"];
exports.LINES_TO_STOP_AT = [
    "# End of file.",
    "<STOP EDITING HERE",
    "<|/updated_code|>",
    "```",
];
exports.LINES_TO_SKIP = ["</START EDITING HERE>", "<|updated_code|>"];
exports.LINES_TO_REMOVE_BEFORE_START = [
    "<COMPLETION>",
    "[CODE]",
    "<START EDITING HERE>",
    "{{FILL_HERE}}",
];
exports.ENGLISH_START_PHRASES = [
    "here is",
    "here's",
    "sure, here",
    "sure thing",
    "sure!",
    "to fill",
    "certainly",
    "of course",
    "the code should",
];
exports.ENGLISH_POST_PHRASES = [
    "explanation:",
    "here is",
    "here's how",
    "the above",
];
function noTopLevelKeywordsMidline(lines, topLevelKeywords, fullStop) {
    return __asyncGenerator(this, arguments, function noTopLevelKeywordsMidline_1() {
        var _a, lines_1, lines_1_1, line, _i, topLevelKeywords_1, keyword, indexOf, e_1_1;
        var _b, e_1, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 12, 13, 18]);
                    _a = true, lines_1 = __asyncValues(lines);
                    _e.label = 1;
                case 1: return [4 /*yield*/, __await(lines_1.next())];
                case 2:
                    if (!(lines_1_1 = _e.sent(), _b = lines_1_1.done, !_b)) return [3 /*break*/, 11];
                    _d = lines_1_1.value;
                    _a = false;
                    line = _d;
                    _i = 0, topLevelKeywords_1 = topLevelKeywords;
                    _e.label = 3;
                case 3:
                    if (!(_i < topLevelKeywords_1.length)) return [3 /*break*/, 7];
                    keyword = topLevelKeywords_1[_i];
                    indexOf = line.indexOf("".concat(keyword, " "));
                    if (!(indexOf >= 0 && line.slice(indexOf - 1, indexOf).trim() !== "")) return [3 /*break*/, 6];
                    return [4 /*yield*/, __await(line.slice(0, indexOf))];
                case 4: return [4 /*yield*/, _e.sent()];
                case 5:
                    _e.sent();
                    fullStop();
                    return [3 /*break*/, 7];
                case 6:
                    _i++;
                    return [3 /*break*/, 3];
                case 7: return [4 /*yield*/, __await(line)];
                case 8: return [4 /*yield*/, _e.sent()];
                case 9:
                    _e.sent();
                    _e.label = 10;
                case 10:
                    _a = true;
                    return [3 /*break*/, 1];
                case 11: return [3 /*break*/, 18];
                case 12:
                    e_1_1 = _e.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 18];
                case 13:
                    _e.trys.push([13, , 16, 17]);
                    if (!(!_a && !_b && (_c = lines_1.return))) return [3 /*break*/, 15];
                    return [4 /*yield*/, __await(_c.call(lines_1))];
                case 14:
                    _e.sent();
                    _e.label = 15;
                case 15: return [3 /*break*/, 17];
                case 16:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 17: return [7 /*endfinally*/];
                case 18: return [2 /*return*/];
            }
        });
    });
}
/**
 * Filters out lines starting with '// Path: <PATH>' from a LineStream.
 *
 * @param {LineStream} stream - The input stream of lines to filter.
 * @param {string} comment - The comment syntax to filter (e.g., '//' for JavaScript-style comments).
 * @yields {string} The filtered lines, excluding unwanted path lines.
 */
function avoidPathLine(stream, comment) {
    return __asyncGenerator(this, arguments, function avoidPathLine_1() {
        var _a, stream_1, stream_1_1, line, e_2_1;
        var _b, e_2, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 7, 8, 13]);
                    _a = true, stream_1 = __asyncValues(stream);
                    _e.label = 1;
                case 1: return [4 /*yield*/, __await(stream_1.next())];
                case 2:
                    if (!(stream_1_1 = _e.sent(), _b = stream_1_1.done, !_b)) return [3 /*break*/, 6];
                    _d = stream_1_1.value;
                    _a = false;
                    line = _d;
                    if (line.startsWith("".concat(comment, " Path: "))) {
                        return [3 /*break*/, 5]; // continue in the Continue codebase! How meta!
                    }
                    return [4 /*yield*/, __await(line)];
                case 3: return [4 /*yield*/, _e.sent()];
                case 4:
                    _e.sent();
                    _e.label = 5;
                case 5:
                    _a = true;
                    return [3 /*break*/, 1];
                case 6: return [3 /*break*/, 13];
                case 7:
                    e_2_1 = _e.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 13];
                case 8:
                    _e.trys.push([8, , 11, 12]);
                    if (!(!_a && !_b && (_c = stream_1.return))) return [3 /*break*/, 10];
                    return [4 /*yield*/, __await(_c.call(stream_1))];
                case 9:
                    _e.sent();
                    _e.label = 10;
                case 10: return [3 /*break*/, 12];
                case 11:
                    if (e_2) throw e_2.error;
                    return [7 /*endfinally*/];
                case 12: return [7 /*endfinally*/];
                case 13: return [2 /*return*/];
            }
        });
    });
}
/**
 * Filters out empty comment lines from a LineStream.
 *
 * @param {LineStream} stream - The input stream of lines to filter.
 * @param {string} comment - The comment syntax to filter (e.g., '//' for JavaScript-style comments).
 * @yields {string} The filtered lines, excluding empty comments.
 */
function avoidEmptyComments(stream, comment) {
    return __asyncGenerator(this, arguments, function avoidEmptyComments_1() {
        var _a, stream_2, stream_2_1, line, e_3_1;
        var _b, e_3, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 7, 8, 13]);
                    _a = true, stream_2 = __asyncValues(stream);
                    _e.label = 1;
                case 1: return [4 /*yield*/, __await(stream_2.next())];
                case 2:
                    if (!(stream_2_1 = _e.sent(), _b = stream_2_1.done, !_b)) return [3 /*break*/, 6];
                    _d = stream_2_1.value;
                    _a = false;
                    line = _d;
                    if (!(!comment || line.trim() !== comment)) return [3 /*break*/, 5];
                    return [4 /*yield*/, __await(line)];
                case 3: return [4 /*yield*/, _e.sent()];
                case 4:
                    _e.sent();
                    _e.label = 5;
                case 5:
                    _a = true;
                    return [3 /*break*/, 1];
                case 6: return [3 /*break*/, 13];
                case 7:
                    e_3_1 = _e.sent();
                    e_3 = { error: e_3_1 };
                    return [3 /*break*/, 13];
                case 8:
                    _e.trys.push([8, , 11, 12]);
                    if (!(!_a && !_b && (_c = stream_2.return))) return [3 /*break*/, 10];
                    return [4 /*yield*/, __await(_c.call(stream_2))];
                case 9:
                    _e.sent();
                    _e.label = 10;
                case 10: return [3 /*break*/, 12];
                case 11:
                    if (e_3) throw e_3.error;
                    return [7 /*endfinally*/];
                case 12: return [7 /*endfinally*/];
                case 13: return [2 /*return*/];
            }
        });
    });
}
/**
 * Transforms a LineStream by adding newline characters between lines.
 *
 * @param {LineStream} stream - The input stream of lines.
 * @yields {string} The lines from the input stream with newline characters added between them.
 */
function streamWithNewLines(stream) {
    return __asyncGenerator(this, arguments, function streamWithNewLines_1() {
        var firstLine, _a, stream_3, stream_3_1, nextLine, e_4_1;
        var _b, e_4, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    firstLine = true;
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 11, 12, 17]);
                    _a = true, stream_3 = __asyncValues(stream);
                    _e.label = 2;
                case 2: return [4 /*yield*/, __await(stream_3.next())];
                case 3:
                    if (!(stream_3_1 = _e.sent(), _b = stream_3_1.done, !_b)) return [3 /*break*/, 10];
                    _d = stream_3_1.value;
                    _a = false;
                    nextLine = _d;
                    if (!!firstLine) return [3 /*break*/, 6];
                    return [4 /*yield*/, __await("\n")];
                case 4: return [4 /*yield*/, _e.sent()];
                case 5:
                    _e.sent();
                    _e.label = 6;
                case 6:
                    firstLine = false;
                    return [4 /*yield*/, __await(nextLine)];
                case 7: return [4 /*yield*/, _e.sent()];
                case 8:
                    _e.sent();
                    _e.label = 9;
                case 9:
                    _a = true;
                    return [3 /*break*/, 2];
                case 10: return [3 /*break*/, 17];
                case 11:
                    e_4_1 = _e.sent();
                    e_4 = { error: e_4_1 };
                    return [3 /*break*/, 17];
                case 12:
                    _e.trys.push([12, , 15, 16]);
                    if (!(!_a && !_b && (_c = stream_3.return))) return [3 /*break*/, 14];
                    return [4 /*yield*/, __await(_c.call(stream_3))];
                case 13:
                    _e.sent();
                    _e.label = 14;
                case 14: return [3 /*break*/, 16];
                case 15:
                    if (e_4) throw e_4.error;
                    return [7 /*endfinally*/];
                case 16: return [7 /*endfinally*/];
                case 17: return [2 /*return*/];
            }
        });
    });
}
/**
 * Determines if two lines of text are considered repeated or very similar.
 *
 * @param {string} a - The first line of text to compare.
 * @param {string} b - The second line of text to compare.
 * @returns {boolean} True if the lines are considered repeated, false otherwise.
 *
 * @description
 * This function checks if the Levenshtein distance between them is less than 10% of the length of the second line.
 * Lines shorter than 5 characters are never considered repeated.
 */
function lineIsRepeated(a, b) {
    if (a.length <= 4 || b.length <= 4) {
        return false;
    }
    var aTrim = a.trim();
    var bTrim = b.trim();
    return (0, fastest_levenshtein_1.distance)(aTrim, bTrim) / bTrim.length < 0.1;
}
/**
 * Filters a LineStream, stopping when a line similar to the provided one is encountered.
 *
 * @param {LineStream} stream - The input stream of lines to filter.
 * @param {string} line - The line to compare against for similarity.
 * @param {() => void} fullStop - Function to call when stopping the stream.
 * @yields {string} Filtered lines until a similar line is encountered.
 *
 * @description
 * This generator function processes the input stream, yielding lines until it encounters:
 * 1. An exact match to the provided line.
 * 2. A line that is considered repeated or very similar to the provided line.
 * 3. For lines ending with brackets, it allows exact matches of trimmed content.
 * When any of these conditions are met, it calls the fullStop function and stops yielding.
 */
function stopAtSimilarLine(stream, line, fullStop) {
    return __asyncGenerator(this, arguments, function stopAtSimilarLine_1() {
        var trimmedLine, lineIsBracketEnding, _a, stream_4, stream_4_1, nextLine, e_5_1;
        var _b, e_5, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    trimmedLine = line.trim();
                    lineIsBracketEnding = isBracketEnding(trimmedLine);
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 14, 15, 20]);
                    _a = true, stream_4 = __asyncValues(stream);
                    _e.label = 2;
                case 2: return [4 /*yield*/, __await(stream_4.next())];
                case 3:
                    if (!(stream_4_1 = _e.sent(), _b = stream_4_1.done, !_b)) return [3 /*break*/, 13];
                    _d = stream_4_1.value;
                    _a = false;
                    nextLine = _d;
                    if (!(trimmedLine === "")) return [3 /*break*/, 6];
                    return [4 /*yield*/, __await(nextLine)];
                case 4: return [4 /*yield*/, _e.sent()];
                case 5:
                    _e.sent();
                    return [3 /*break*/, 12];
                case 6:
                    if (!(lineIsBracketEnding && trimmedLine.trim() === nextLine.trim())) return [3 /*break*/, 9];
                    return [4 /*yield*/, __await(nextLine)];
                case 7: return [4 /*yield*/, _e.sent()];
                case 8:
                    _e.sent();
                    return [3 /*break*/, 12];
                case 9:
                    if (nextLine === line) {
                        fullStop();
                        return [3 /*break*/, 13];
                    }
                    if (lineIsRepeated(nextLine, trimmedLine)) {
                        fullStop();
                        return [3 /*break*/, 13];
                    }
                    return [4 /*yield*/, __await(nextLine)];
                case 10: return [4 /*yield*/, _e.sent()];
                case 11:
                    _e.sent();
                    _e.label = 12;
                case 12:
                    _a = true;
                    return [3 /*break*/, 2];
                case 13: return [3 /*break*/, 20];
                case 14:
                    e_5_1 = _e.sent();
                    e_5 = { error: e_5_1 };
                    return [3 /*break*/, 20];
                case 15:
                    _e.trys.push([15, , 18, 19]);
                    if (!(!_a && !_b && (_c = stream_4.return))) return [3 /*break*/, 17];
                    return [4 /*yield*/, __await(_c.call(stream_4))];
                case 16:
                    _e.sent();
                    _e.label = 17;
                case 17: return [3 /*break*/, 19];
                case 18:
                    if (e_5) throw e_5.error;
                    return [7 /*endfinally*/];
                case 19: return [7 /*endfinally*/];
                case 20: return [2 /*return*/];
            }
        });
    });
}
/**
 * Filters a LineStream, stopping when a line contains any of the specified stop phrases.
 * @param {LineStream} stream - The input stream of lines.
 * @param {() => void} fullStop - Function to call when stopping.
 * @yields {string} Filtered lines until a stop phrase is encountered.
 */
function stopAtLines(stream_5, fullStop_1) {
    return __asyncGenerator(this, arguments, function stopAtLines_1(stream, fullStop, linesToStopAt) {
        var _a, stream_6, stream_6_1, line, shouldStop, _i, linesToStopAt_1, stopAt, validation, trimmedLine, contentBeforeStopPhrase, e_6_1;
        var _b, e_6, _c, _d;
        if (linesToStopAt === void 0) { linesToStopAt = exports.LINES_TO_STOP_AT; }
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 7, 8, 13]);
                    _a = true, stream_6 = __asyncValues(stream);
                    _e.label = 1;
                case 1: return [4 /*yield*/, __await(stream_6.next())];
                case 2:
                    if (!(stream_6_1 = _e.sent(), _b = stream_6_1.done, !_b)) return [3 /*break*/, 6];
                    _d = stream_6_1.value;
                    _a = false;
                    line = _d;
                    shouldStop = false;
                    // Check each stop phrase
                    for (_i = 0, linesToStopAt_1 = linesToStopAt; _i < linesToStopAt_1.length; _i++) {
                        stopAt = linesToStopAt_1[_i];
                        if (line.includes(stopAt)) {
                            validation = validatePatternInLine(line, stopAt);
                            if (!validation.isValid) {
                                continue;
                            }
                            trimmedLine = line.trimStart();
                            if (trimmedLine.startsWith(stopAt)) {
                                // Stop phrase is at the logical start (after whitespace only) - should stop
                                shouldStop = true;
                                break;
                            }
                            else {
                                contentBeforeStopPhrase = validation.beforePattern.trimEnd();
                                if (contentBeforeStopPhrase.length < validation.beforePattern.length) {
                                    // There's whitespace before the stop phrase, so it's properly separated
                                    shouldStop = true;
                                    break;
                                }
                                // If no whitespace separation, it's part of larger text, so continue
                            }
                        }
                    }
                    if (shouldStop) {
                        fullStop();
                        return [3 /*break*/, 6];
                    }
                    return [4 /*yield*/, __await(line)];
                case 3: return [4 /*yield*/, _e.sent()];
                case 4:
                    _e.sent();
                    _e.label = 5;
                case 5:
                    _a = true;
                    return [3 /*break*/, 1];
                case 6: return [3 /*break*/, 13];
                case 7:
                    e_6_1 = _e.sent();
                    e_6 = { error: e_6_1 };
                    return [3 /*break*/, 13];
                case 8:
                    _e.trys.push([8, , 11, 12]);
                    if (!(!_a && !_b && (_c = stream_6.return))) return [3 /*break*/, 10];
                    return [4 /*yield*/, __await(_c.call(stream_6))];
                case 9:
                    _e.sent();
                    _e.label = 10;
                case 10: return [3 /*break*/, 12];
                case 11:
                    if (e_6) throw e_6.error;
                    return [7 /*endfinally*/];
                case 12: return [7 /*endfinally*/];
                case 13: return [2 /*return*/];
            }
        });
    });
}
function stopAtLinesExact(stream, fullStop, linesToStopAt) {
    return __asyncGenerator(this, arguments, function stopAtLinesExact_1() {
        var _loop_1, _a, stream_5, stream_5_1, state_1, e_7_1;
        var _b, e_7, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 6, 7, 12]);
                    _loop_1 = function () {
                        var line;
                        return __generator(this, function (_f) {
                            switch (_f.label) {
                                case 0:
                                    _d = stream_5_1.value;
                                    _a = false;
                                    line = _d;
                                    if (linesToStopAt.some(function (stopAt) { return line === stopAt; })) {
                                        fullStop();
                                        return [2 /*return*/, "break"];
                                    }
                                    return [4 /*yield*/, __await(line)];
                                case 1: return [4 /*yield*/, _f.sent()];
                                case 2:
                                    _f.sent();
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _a = true, stream_5 = __asyncValues(stream);
                    _e.label = 1;
                case 1: return [4 /*yield*/, __await(stream_5.next())];
                case 2:
                    if (!(stream_5_1 = _e.sent(), _b = stream_5_1.done, !_b)) return [3 /*break*/, 5];
                    return [5 /*yield**/, _loop_1()];
                case 3:
                    state_1 = _e.sent();
                    if (state_1 === "break")
                        return [3 /*break*/, 5];
                    _e.label = 4;
                case 4:
                    _a = true;
                    return [3 /*break*/, 1];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_7_1 = _e.sent();
                    e_7 = { error: e_7_1 };
                    return [3 /*break*/, 12];
                case 7:
                    _e.trys.push([7, , 10, 11]);
                    if (!(!_a && !_b && (_c = stream_5.return))) return [3 /*break*/, 9];
                    return [4 /*yield*/, __await(_c.call(stream_5))];
                case 8:
                    _e.sent();
                    _e.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    if (e_7) throw e_7.error;
                    return [7 /*endfinally*/];
                case 11: return [7 /*endfinally*/];
                case 12: return [2 /*return*/];
            }
        });
    });
}
/**
 * Filters a LineStream, skipping specified prefixes on the first line.
 * @param {LineStream} lines - The input stream of lines.
 * @yields {string} Filtered lines with prefixes removed from the first line if applicable.
 */
function skipPrefixes(lines) {
    return __asyncGenerator(this, arguments, function skipPrefixes_1() {
        var isFirstLine, _loop_2, _a, lines_2, lines_2_1, e_8_1;
        var _b, e_8, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    isFirstLine = true;
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 7, 8, 13]);
                    _loop_2 = function () {
                        var line, match;
                        return __generator(this, function (_f) {
                            switch (_f.label) {
                                case 0:
                                    _d = lines_2_1.value;
                                    _a = false;
                                    line = _d;
                                    if (!isFirstLine) return [3 /*break*/, 4];
                                    match = exports.PREFIXES_TO_SKIP.find(function (prefix) { return line.startsWith(prefix); });
                                    if (!match) return [3 /*break*/, 3];
                                    return [4 /*yield*/, __await(line.slice(match.length))];
                                case 1: return [4 /*yield*/, _f.sent()];
                                case 2:
                                    _f.sent();
                                    return [2 /*return*/, "continue"];
                                case 3:
                                    isFirstLine = false;
                                    _f.label = 4;
                                case 4: return [4 /*yield*/, __await(line)];
                                case 5: return [4 /*yield*/, _f.sent()];
                                case 6:
                                    _f.sent();
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _a = true, lines_2 = __asyncValues(lines);
                    _e.label = 2;
                case 2: return [4 /*yield*/, __await(lines_2.next())];
                case 3:
                    if (!(lines_2_1 = _e.sent(), _b = lines_2_1.done, !_b)) return [3 /*break*/, 6];
                    return [5 /*yield**/, _loop_2()];
                case 4:
                    _e.sent();
                    _e.label = 5;
                case 5:
                    _a = true;
                    return [3 /*break*/, 2];
                case 6: return [3 /*break*/, 13];
                case 7:
                    e_8_1 = _e.sent();
                    e_8 = { error: e_8_1 };
                    return [3 /*break*/, 13];
                case 8:
                    _e.trys.push([8, , 11, 12]);
                    if (!(!_a && !_b && (_c = lines_2.return))) return [3 /*break*/, 10];
                    return [4 /*yield*/, __await(_c.call(lines_2))];
                case 9:
                    _e.sent();
                    _e.label = 10;
                case 10: return [3 /*break*/, 12];
                case 11:
                    if (e_8) throw e_8.error;
                    return [7 /*endfinally*/];
                case 12: return [7 /*endfinally*/];
                case 13: return [2 /*return*/];
            }
        });
    });
}
/**
 * Filters out lines starting with specified prefixes from a LineStream.
 * @param {LineStream} stream - The input stream of lines.
 * @yields {string} Filtered lines that don't start with any of the LINES_TO_SKIP prefixes.
 */
function skipLines(stream) {
    return __asyncGenerator(this, arguments, function skipLines_1() {
        var _loop_3, _a, stream_7, stream_7_1, e_9_1;
        var _b, e_9, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 6, 7, 12]);
                    _loop_3 = function () {
                        var line;
                        return __generator(this, function (_f) {
                            switch (_f.label) {
                                case 0:
                                    _d = stream_7_1.value;
                                    _a = false;
                                    line = _d;
                                    if (!!exports.LINES_TO_SKIP.some(function (skipAt) { return line.startsWith(skipAt); })) return [3 /*break*/, 3];
                                    return [4 /*yield*/, __await(line)];
                                case 1: return [4 /*yield*/, _f.sent()];
                                case 2:
                                    _f.sent();
                                    _f.label = 3;
                                case 3: return [2 /*return*/];
                            }
                        });
                    };
                    _a = true, stream_7 = __asyncValues(stream);
                    _e.label = 1;
                case 1: return [4 /*yield*/, __await(stream_7.next())];
                case 2:
                    if (!(stream_7_1 = _e.sent(), _b = stream_7_1.done, !_b)) return [3 /*break*/, 5];
                    return [5 /*yield**/, _loop_3()];
                case 3:
                    _e.sent();
                    _e.label = 4;
                case 4:
                    _a = true;
                    return [3 /*break*/, 1];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_9_1 = _e.sent();
                    e_9 = { error: e_9_1 };
                    return [3 /*break*/, 12];
                case 7:
                    _e.trys.push([7, , 10, 11]);
                    if (!(!_a && !_b && (_c = stream_7.return))) return [3 /*break*/, 9];
                    return [4 /*yield*/, __await(_c.call(stream_7))];
                case 8:
                    _e.sent();
                    _e.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    if (e_9) throw e_9.error;
                    return [7 /*endfinally*/];
                case 11: return [7 /*endfinally*/];
                case 12: return [2 /*return*/];
            }
        });
    });
}
/**
 * Handles cases where original lines have a trailing whitespace, but new lines do not.
 * @param {LineStream} stream - The input stream of lines.
 * @yields {string} Filtered lines that are stripped of trailing whitespace
 */
function removeTrailingWhitespace(stream) {
    return __asyncGenerator(this, arguments, function removeTrailingWhitespace_1() {
        var _a, stream_8, stream_8_1, line, e_10_1;
        var _b, e_10, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 7, 8, 13]);
                    _a = true, stream_8 = __asyncValues(stream);
                    _e.label = 1;
                case 1: return [4 /*yield*/, __await(stream_8.next())];
                case 2:
                    if (!(stream_8_1 = _e.sent(), _b = stream_8_1.done, !_b)) return [3 /*break*/, 6];
                    _d = stream_8_1.value;
                    _a = false;
                    line = _d;
                    return [4 /*yield*/, __await(line.trimEnd())];
                case 3: return [4 /*yield*/, _e.sent()];
                case 4:
                    _e.sent();
                    _e.label = 5;
                case 5:
                    _a = true;
                    return [3 /*break*/, 1];
                case 6: return [3 /*break*/, 13];
                case 7:
                    e_10_1 = _e.sent();
                    e_10 = { error: e_10_1 };
                    return [3 /*break*/, 13];
                case 8:
                    _e.trys.push([8, , 11, 12]);
                    if (!(!_a && !_b && (_c = stream_8.return))) return [3 /*break*/, 10];
                    return [4 /*yield*/, __await(_c.call(stream_8))];
                case 9:
                    _e.sent();
                    _e.label = 10;
                case 10: return [3 /*break*/, 12];
                case 11:
                    if (e_10) throw e_10.error;
                    return [7 /*endfinally*/];
                case 12: return [7 /*endfinally*/];
                case 13: return [2 /*return*/];
            }
        });
    });
}
/**
 * Filters out English explanations at the start of a code block.
 *
 * @param {LineStream} lines - The input stream of lines.
 * @yields {string} Filtered lines with English explanations removed from the start.
 *
 * @description
 * This generator function performs the following tasks:
 * 1. Skips initial blank lines.
 * 2. Removes the first line if it's identified as an English explanation.
 * 3. Removes a subsequent blank line if the first line was an English explanation.
 * 4. Yields all remaining lines.
 */
function filterEnglishLinesAtStart(lines) {
    return __asyncGenerator(this, arguments, function filterEnglishLinesAtStart_1() {
        var i, wasEnglishFirstLine, _a, lines_3, lines_3_1, line, e_11_1;
        var _b, e_11, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    i = 0;
                    wasEnglishFirstLine = false;
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 8, 9, 14]);
                    _a = true, lines_3 = __asyncValues(lines);
                    _e.label = 2;
                case 2: return [4 /*yield*/, __await(lines_3.next())];
                case 3:
                    if (!(lines_3_1 = _e.sent(), _b = lines_3_1.done, !_b)) return [3 /*break*/, 7];
                    _d = lines_3_1.value;
                    _a = false;
                    line = _d;
                    if (i === 0 && line.trim() === "") {
                        return [3 /*break*/, 6];
                    }
                    if (i === 0) {
                        if (isEnglishFirstLine(line)) {
                            wasEnglishFirstLine = true;
                            i++;
                            return [3 /*break*/, 6];
                        }
                    }
                    else if (i === 1 && wasEnglishFirstLine && line.trim() === "") {
                        i++;
                        return [3 /*break*/, 6];
                    }
                    i++;
                    return [4 /*yield*/, __await(line)];
                case 4: return [4 /*yield*/, _e.sent()];
                case 5:
                    _e.sent();
                    _e.label = 6;
                case 6:
                    _a = true;
                    return [3 /*break*/, 2];
                case 7: return [3 /*break*/, 14];
                case 8:
                    e_11_1 = _e.sent();
                    e_11 = { error: e_11_1 };
                    return [3 /*break*/, 14];
                case 9:
                    _e.trys.push([9, , 12, 13]);
                    if (!(!_a && !_b && (_c = lines_3.return))) return [3 /*break*/, 11];
                    return [4 /*yield*/, __await(_c.call(lines_3))];
                case 10:
                    _e.sent();
                    _e.label = 11;
                case 11: return [3 /*break*/, 13];
                case 12:
                    if (e_11) throw e_11.error;
                    return [7 /*endfinally*/];
                case 13: return [7 /*endfinally*/];
                case 14: return [2 /*return*/];
            }
        });
    });
}
/**
 * Filters out English explanations at the end of a code block.
 * @param {LineStream} lines - The input stream of lines.
 * @yields {string} Lines up to the end of the code block or start of English explanation.
 */
function filterEnglishLinesAtEnd(lines) {
    return __asyncGenerator(this, arguments, function filterEnglishLinesAtEnd_1() {
        var finishedCodeBlock, _a, lines_4, lines_4_1, line, e_12_1;
        var _b, e_12, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    finishedCodeBlock = false;
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 8, 9, 14]);
                    _a = true, lines_4 = __asyncValues(lines);
                    _e.label = 2;
                case 2: return [4 /*yield*/, __await(lines_4.next())];
                case 3:
                    if (!(lines_4_1 = _e.sent(), _b = lines_4_1.done, !_b)) return [3 /*break*/, 7];
                    _d = lines_4_1.value;
                    _a = false;
                    line = _d;
                    if (line.trim() === "```") {
                        finishedCodeBlock = true;
                    }
                    if (finishedCodeBlock && isEnglishPostExplanation(line)) {
                        return [3 /*break*/, 7];
                    }
                    return [4 /*yield*/, __await(line)];
                case 4: return [4 /*yield*/, _e.sent()];
                case 5:
                    _e.sent();
                    _e.label = 6;
                case 6:
                    _a = true;
                    return [3 /*break*/, 2];
                case 7: return [3 /*break*/, 14];
                case 8:
                    e_12_1 = _e.sent();
                    e_12 = { error: e_12_1 };
                    return [3 /*break*/, 14];
                case 9:
                    _e.trys.push([9, , 12, 13]);
                    if (!(!_a && !_b && (_c = lines_4.return))) return [3 /*break*/, 11];
                    return [4 /*yield*/, __await(_c.call(lines_4))];
                case 10:
                    _e.sent();
                    _e.label = 11;
                case 11: return [3 /*break*/, 13];
                case 12:
                    if (e_12) throw e_12.error;
                    return [7 /*endfinally*/];
                case 13: return [7 /*endfinally*/];
                case 14: return [2 /*return*/];
            }
        });
    });
}
function filterLeadingNewline(lines) {
    return __asyncGenerator(this, arguments, function filterLeadingNewline_1() {
        var firstLine, _a, lines_5, lines_5_1, line, e_13_1;
        var _b, e_13, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    firstLine = true;
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 8, 9, 14]);
                    _a = true, lines_5 = __asyncValues(lines);
                    _e.label = 2;
                case 2: return [4 /*yield*/, __await(lines_5.next())];
                case 3:
                    if (!(lines_5_1 = _e.sent(), _b = lines_5_1.done, !_b)) return [3 /*break*/, 7];
                    _d = lines_5_1.value;
                    _a = false;
                    line = _d;
                    if (firstLine && line.trim() === "") {
                        firstLine = false;
                        return [3 /*break*/, 6];
                    }
                    return [4 /*yield*/, __await(line)];
                case 4: return [4 /*yield*/, _e.sent()];
                case 5:
                    _e.sent();
                    _e.label = 6;
                case 6:
                    _a = true;
                    return [3 /*break*/, 2];
                case 7: return [3 /*break*/, 14];
                case 8:
                    e_13_1 = _e.sent();
                    e_13 = { error: e_13_1 };
                    return [3 /*break*/, 14];
                case 9:
                    _e.trys.push([9, , 12, 13]);
                    if (!(!_a && !_b && (_c = lines_5.return))) return [3 /*break*/, 11];
                    return [4 /*yield*/, __await(_c.call(lines_5))];
                case 10:
                    _e.sent();
                    _e.label = 11;
                case 11: return [3 /*break*/, 13];
                case 12:
                    if (e_13) throw e_13.error;
                    return [7 /*endfinally*/];
                case 13: return [7 /*endfinally*/];
                case 14: return [2 /*return*/];
            }
        });
    });
}
/**
 * Removes leading indentation from the first line of a CodeLlama output.
 * @param {LineStream} lines - The input stream of lines.
 * @yields {string} Lines with the first line's indentation fixed if necessary.
 */
function fixCodeLlamaFirstLineIndentation(lines) {
    return __asyncGenerator(this, arguments, function fixCodeLlamaFirstLineIndentation_1() {
        var isFirstLine, _a, lines_6, lines_6_1, line, e_14_1;
        var _b, e_14, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    isFirstLine = true;
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 11, 12, 17]);
                    _a = true, lines_6 = __asyncValues(lines);
                    _e.label = 2;
                case 2: return [4 /*yield*/, __await(lines_6.next())];
                case 3:
                    if (!(lines_6_1 = _e.sent(), _b = lines_6_1.done, !_b)) return [3 /*break*/, 10];
                    _d = lines_6_1.value;
                    _a = false;
                    line = _d;
                    if (!(isFirstLine && line.startsWith("  "))) return [3 /*break*/, 6];
                    return [4 /*yield*/, __await(line.slice(2))];
                case 4: return [4 /*yield*/, _e.sent()];
                case 5:
                    _e.sent();
                    isFirstLine = false;
                    return [3 /*break*/, 9];
                case 6: return [4 /*yield*/, __await(line)];
                case 7: return [4 /*yield*/, _e.sent()];
                case 8:
                    _e.sent();
                    _e.label = 9;
                case 9:
                    _a = true;
                    return [3 /*break*/, 2];
                case 10: return [3 /*break*/, 17];
                case 11:
                    e_14_1 = _e.sent();
                    e_14 = { error: e_14_1 };
                    return [3 /*break*/, 17];
                case 12:
                    _e.trys.push([12, , 15, 16]);
                    if (!(!_a && !_b && (_c = lines_6.return))) return [3 /*break*/, 14];
                    return [4 /*yield*/, __await(_c.call(lines_6))];
                case 13:
                    _e.sent();
                    _e.label = 14;
                case 14: return [3 /*break*/, 16];
                case 15:
                    if (e_14) throw e_14.error;
                    return [7 /*endfinally*/];
                case 16: return [7 /*endfinally*/];
                case 17: return [2 /*return*/];
            }
        });
    });
}
/**
 * Filters leading and trailing blank line insertions from a stream of diff lines.
 *
 * @param {AsyncGenerator<DiffLine>} diffLines - An async generator that yields DiffLine objects.
 * @yields {DiffLine} Filtered DiffLine objects, with leading and trailing blank line insertions removed.
 *
 * @description
 * This generator function processes a stream of diff lines, removing leading and trailing
 * blank line insertions. It performs the following tasks:
 * 1. Skips the first blank line insertion if it occurs at the beginning.
 * 2. Buffers subsequent blank line insertions.
 * 3. Yields buffered blank lines when a non-blank insertion is encountered.
 * 4. Clears the buffer when an old line is encountered.
 * 5. Yields all non-blank insertions and old lines.
 */
function filterLeadingAndTrailingNewLineInsertion(diffLines) {
    return __asyncGenerator(this, arguments, function filterLeadingAndTrailingNewLineInsertion_1() {
        var isFirst, buffer, _a, diffLines_1, diffLines_1_1, diffLine, isBlankLineInsertion, e_15_1;
        var _b, e_15, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    isFirst = true;
                    buffer = [];
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 13, 14, 19]);
                    _a = true, diffLines_1 = __asyncValues(diffLines);
                    _e.label = 2;
                case 2: return [4 /*yield*/, __await(diffLines_1.next())];
                case 3:
                    if (!(diffLines_1_1 = _e.sent(), _b = diffLines_1_1.done, !_b)) return [3 /*break*/, 12];
                    _d = diffLines_1_1.value;
                    _a = false;
                    diffLine = _d;
                    isBlankLineInsertion = diffLine.type === "new" && isUselessLine(diffLine.line);
                    if (isFirst && isBlankLineInsertion) {
                        isFirst = false;
                        return [3 /*break*/, 11];
                    }
                    isFirst = false;
                    if (!isBlankLineInsertion) return [3 /*break*/, 4];
                    buffer.push(diffLine);
                    return [3 /*break*/, 11];
                case 4:
                    if (!(diffLine.type === "old")) return [3 /*break*/, 5];
                    buffer = [];
                    return [3 /*break*/, 8];
                case 5:
                    if (!(buffer.length > 0)) return [3 /*break*/, 8];
                    return [4 /*yield*/, __await(buffer.shift())];
                case 6: return [4 /*yield*/, _e.sent()];
                case 7:
                    _e.sent();
                    return [3 /*break*/, 5];
                case 8: return [4 /*yield*/, __await(diffLine)];
                case 9: return [4 /*yield*/, _e.sent()];
                case 10:
                    _e.sent();
                    _e.label = 11;
                case 11:
                    _a = true;
                    return [3 /*break*/, 2];
                case 12: return [3 /*break*/, 19];
                case 13:
                    e_15_1 = _e.sent();
                    e_15 = { error: e_15_1 };
                    return [3 /*break*/, 19];
                case 14:
                    _e.trys.push([14, , 17, 18]);
                    if (!(!_a && !_b && (_c = diffLines_1.return))) return [3 /*break*/, 16];
                    return [4 /*yield*/, __await(_c.call(diffLines_1))];
                case 15:
                    _e.sent();
                    _e.label = 16;
                case 16: return [3 /*break*/, 18];
                case 17:
                    if (e_15) throw e_15.error;
                    return [7 /*endfinally*/];
                case 18: return [7 /*endfinally*/];
                case 19: return [2 /*return*/];
            }
        });
    });
}
/**
 * Filters a LineStream, stopping when a line repeats more than a specified number of times.
 *
 * @param {LineStream} lines - The input stream of lines to filter.
 * @param {() => void} fullStop - Function to call when stopping the stream.
 * @yields {string} Filtered lines until excessive repetition is detected.
 *
 * @description
 * This function yields lines from the input stream until a line is repeated
 * for a maximum of 3 consecutive times. When this limit is reached, it calls
 * the fullStop function and stops yielding. Only the first of the repeating
 * lines is yieled.
 */
function stopAtRepeatingLines(lines, fullStop) {
    return __asyncGenerator(this, arguments, function stopAtRepeatingLines_1() {
        var previousLine, repeatCount, MAX_REPEATS, _a, lines_7, lines_7_1, line, e_16_1;
        var _b, e_16, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    repeatCount = 0;
                    MAX_REPEATS = 3;
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 12, 13, 18]);
                    _a = true, lines_7 = __asyncValues(lines);
                    _e.label = 2;
                case 2: return [4 /*yield*/, __await(lines_7.next())];
                case 3:
                    if (!(lines_7_1 = _e.sent(), _b = lines_7_1.done, !_b)) return [3 /*break*/, 11];
                    _d = lines_7_1.value;
                    _a = false;
                    line = _d;
                    if (!(line === previousLine)) return [3 /*break*/, 6];
                    repeatCount++;
                    if (!(repeatCount === MAX_REPEATS)) return [3 /*break*/, 5];
                    fullStop();
                    return [4 /*yield*/, __await(void 0)];
                case 4: return [2 /*return*/, _e.sent()];
                case 5: return [3 /*break*/, 9];
                case 6: return [4 /*yield*/, __await(line)];
                case 7: return [4 /*yield*/, _e.sent()];
                case 8:
                    _e.sent();
                    repeatCount = 1;
                    _e.label = 9;
                case 9:
                    previousLine = line;
                    _e.label = 10;
                case 10:
                    _a = true;
                    return [3 /*break*/, 2];
                case 11: return [3 /*break*/, 18];
                case 12:
                    e_16_1 = _e.sent();
                    e_16 = { error: e_16_1 };
                    return [3 /*break*/, 18];
                case 13:
                    _e.trys.push([13, , 16, 17]);
                    if (!(!_a && !_b && (_c = lines_7.return))) return [3 /*break*/, 15];
                    return [4 /*yield*/, __await(_c.call(lines_7))];
                case 14:
                    _e.sent();
                    _e.label = 15;
                case 15: return [3 /*break*/, 17];
                case 16:
                    if (e_16) throw e_16.error;
                    return [7 /*endfinally*/];
                case 17: return [7 /*endfinally*/];
                case 18: return [2 /*return*/];
            }
        });
    });
}
/**
 * Pass-through, except logs the total output at the end
 * @param lines a `LineStream`
 */
function logLines(lines_8) {
    return __asyncGenerator(this, arguments, function logLines_1(lines, prefix) {
        var linesToLog, _a, lines_9, lines_9_1, line, e_17_1;
        var _b, e_17, _c, _d;
        if (prefix === void 0) { prefix = "STREAMED LINES"; }
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    linesToLog = [];
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 8, 9, 14]);
                    _a = true, lines_9 = __asyncValues(lines);
                    _e.label = 2;
                case 2: return [4 /*yield*/, __await(lines_9.next())];
                case 3:
                    if (!(lines_9_1 = _e.sent(), _b = lines_9_1.done, !_b)) return [3 /*break*/, 7];
                    _d = lines_9_1.value;
                    _a = false;
                    line = _d;
                    return [4 /*yield*/, __await(line)];
                case 4: return [4 /*yield*/, _e.sent()];
                case 5:
                    _e.sent();
                    linesToLog.push(line);
                    _e.label = 6;
                case 6:
                    _a = true;
                    return [3 /*break*/, 2];
                case 7: return [3 /*break*/, 14];
                case 8:
                    e_17_1 = _e.sent();
                    e_17 = { error: e_17_1 };
                    return [3 /*break*/, 14];
                case 9:
                    _e.trys.push([9, , 12, 13]);
                    if (!(!_a && !_b && (_c = lines_9.return))) return [3 /*break*/, 11];
                    return [4 /*yield*/, __await(_c.call(lines_9))];
                case 10:
                    _e.sent();
                    _e.label = 11;
                case 11: return [3 /*break*/, 13];
                case 12:
                    if (e_17) throw e_17.error;
                    return [7 /*endfinally*/];
                case 13: return [7 /*endfinally*/];
                case 14:
                    console.log("".concat(prefix, ":\n").concat(linesToLog.join("\n"), "\n\n"));
                    return [2 /*return*/];
            }
        });
    });
}
function showWhateverWeHaveAtXMs(lines, ms) {
    return __asyncGenerator(this, arguments, function showWhateverWeHaveAtXMs_1() {
        var startTime, firstNonWhitespaceLineYielded, _a, lines_8, lines_8_1, line, isTakingTooLong, e_18_1;
        var _b, e_18, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    startTime = Date.now();
                    firstNonWhitespaceLineYielded = false;
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 8, 9, 14]);
                    _a = true, lines_8 = __asyncValues(lines);
                    _e.label = 2;
                case 2: return [4 /*yield*/, __await(lines_8.next())];
                case 3:
                    if (!(lines_8_1 = _e.sent(), _b = lines_8_1.done, !_b)) return [3 /*break*/, 7];
                    _d = lines_8_1.value;
                    _a = false;
                    line = _d;
                    return [4 /*yield*/, __await(line)];
                case 4: return [4 /*yield*/, _e.sent()];
                case 5:
                    _e.sent();
                    if (!firstNonWhitespaceLineYielded && line.trim() !== "") {
                        firstNonWhitespaceLineYielded = true;
                    }
                    isTakingTooLong = Date.now() - startTime > ms;
                    if (isTakingTooLong && firstNonWhitespaceLineYielded) {
                        return [3 /*break*/, 7];
                    }
                    _e.label = 6;
                case 6:
                    _a = true;
                    return [3 /*break*/, 2];
                case 7: return [3 /*break*/, 14];
                case 8:
                    e_18_1 = _e.sent();
                    e_18 = { error: e_18_1 };
                    return [3 /*break*/, 14];
                case 9:
                    _e.trys.push([9, , 12, 13]);
                    if (!(!_a && !_b && (_c = lines_8.return))) return [3 /*break*/, 11];
                    return [4 /*yield*/, __await(_c.call(lines_8))];
                case 10:
                    _e.sent();
                    _e.label = 11;
                case 11: return [3 /*break*/, 13];
                case 12:
                    if (e_18) throw e_18.error;
                    return [7 /*endfinally*/];
                case 13: return [7 /*endfinally*/];
                case 14: return [2 /*return*/];
            }
        });
    });
}
function noDoubleNewLine(lines) {
    return __asyncGenerator(this, arguments, function noDoubleNewLine_1() {
        var isFirstLine, _a, lines_10, lines_10_1, line, e_19_1;
        var _b, e_19, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    isFirstLine = true;
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 10, 11, 16]);
                    _a = true, lines_10 = __asyncValues(lines);
                    _e.label = 2;
                case 2: return [4 /*yield*/, __await(lines_10.next())];
                case 3:
                    if (!(lines_10_1 = _e.sent(), _b = lines_10_1.done, !_b)) return [3 /*break*/, 9];
                    _d = lines_10_1.value;
                    _a = false;
                    line = _d;
                    if (!(line.trim() === "" && !isFirstLine)) return [3 /*break*/, 5];
                    return [4 /*yield*/, __await(void 0)];
                case 4: return [2 /*return*/, _e.sent()];
                case 5:
                    isFirstLine = false;
                    return [4 /*yield*/, __await(line)];
                case 6: return [4 /*yield*/, _e.sent()];
                case 7:
                    _e.sent();
                    _e.label = 8;
                case 8:
                    _a = true;
                    return [3 /*break*/, 2];
                case 9: return [3 /*break*/, 16];
                case 10:
                    e_19_1 = _e.sent();
                    e_19 = { error: e_19_1 };
                    return [3 /*break*/, 16];
                case 11:
                    _e.trys.push([11, , 14, 15]);
                    if (!(!_a && !_b && (_c = lines_10.return))) return [3 /*break*/, 13];
                    return [4 /*yield*/, __await(_c.call(lines_10))];
                case 12:
                    _e.sent();
                    _e.label = 13;
                case 13: return [3 /*break*/, 15];
                case 14:
                    if (e_19) throw e_19.error;
                    return [7 /*endfinally*/];
                case 15: return [7 /*endfinally*/];
                case 16: return [2 /*return*/];
            }
        });
    });
}
