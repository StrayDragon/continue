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
exports.filterCodeBlockLines = filterCodeBlockLines;
var markdownUtils_1 = require("../../../utils/markdownUtils");
var streamMarkdownUtils_1 = require("../../../utils/streamMarkdownUtils");
var lineStream_1 = require("./lineStream");
/**
 * Filters and processes lines from a code block, removing unnecessary markers and handling edge cases.
 * Now includes markdown-aware processing to handle nested markdown blocks properly.
 *
 * @param {LineStream} rawLines - The input stream of lines to filter.
 * @param {string} filepath - Optional filepath to determine if this is a markdown file.
 * @yields {string} Filtered and processed lines from the code block.
 *
 * @description
 * This generator function performs the following tasks:
 * 1. Removes initial lines that should be removed before the actual code starts.
 * 2. For markdown files, applies nested markdown block logic to avoid premature termination.
 * 3. For mixed content, uses simplified processing to avoid premature termination.
 * 4. For traditional code blocks, uses original logic.
 * 5. Yields processed lines that are part of the actual code block content.
 */
function filterCodeBlockLines(rawLines, filepath) {
    return __asyncGenerator(this, arguments, function filterCodeBlockLines_1() {
        var allLines, firstLine, hasNestedMarkdown, hasMarkdownHeaders, hasCodeBlocks, isMixedContent, i, line, seenFirstFence, nestCount, markdownStateTracker, i, line, nesting, changedEndLine;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, __await((0, markdownUtils_1.collectAllLines)(rawLines))];
                case 1:
                    allLines = _a.sent();
                    firstLine = allLines[0] || "";
                    hasNestedMarkdown = (0, lineStream_1.hasNestedMarkdownBlocks)(firstLine, filepath);
                    hasMarkdownHeaders = allLines.some(function (line) { return line.trim().startsWith("#") && !line.trim().startsWith("```"); });
                    hasCodeBlocks = allLines.some(function (line) { return line.trim().startsWith("```") && line.trim().length >= 3; });
                    isMixedContent = hasMarkdownHeaders && hasCodeBlocks && !hasNestedMarkdown;
                    if (!isMixedContent) return [3 /*break*/, 8];
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < allLines.length)) return [3 /*break*/, 6];
                    line = allLines[i];
                    // Skip initial wrapper lines if they exist
                    if (i === 0 && shouldRemoveLineBeforeStart(line)) {
                        return [3 /*break*/, 5];
                    }
                    return [4 /*yield*/, __await(line)];
                case 3: return [4 /*yield*/, _a.sent()];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    i++;
                    return [3 /*break*/, 2];
                case 6: return [4 /*yield*/, __await(void 0)];
                case 7: return [2 /*return*/, _a.sent()];
                case 8:
                    seenFirstFence = false;
                    nestCount = 0;
                    if (hasNestedMarkdown) {
                        markdownStateTracker = new markdownUtils_1.MarkdownBlockStateTracker(allLines);
                    }
                    i = 0;
                    _a.label = 9;
                case 9:
                    if (!(i < allLines.length)) return [3 /*break*/, 27];
                    line = allLines[i];
                    nesting = (0, streamMarkdownUtils_1.processBlockNesting)(line, seenFirstFence, shouldRemoveLineBeforeStart);
                    if (nesting.shouldSkip) {
                        return [3 /*break*/, 26]; // Filter out starting ``` or START block
                    }
                    if (!seenFirstFence && nesting.newSeenFirstFence) {
                        seenFirstFence = true;
                        nestCount = 1;
                    }
                    if (!(nestCount > 0)) return [3 /*break*/, 26];
                    changedEndLine = (0, lineStream_1.shouldChangeLineAndStop)(line);
                    if (!(typeof changedEndLine === "string")) return [3 /*break*/, 20];
                    if (!(hasNestedMarkdown &&
                        line.trim() === "```" &&
                        markdownStateTracker)) return [3 /*break*/, 14];
                    if (!(0, streamMarkdownUtils_1.shouldStopAtMarkdownBlock)(markdownStateTracker, i)) return [3 /*break*/, 11];
                    return [4 /*yield*/, __await(void 0)];
                case 10: return [2 /*return*/, _a.sent()]; // Stop without yielding the final closing ```
                case 11: return [4 /*yield*/, __await(line)];
                case 12: 
                // This is an inner block delimiter, yield it as content
                return [4 /*yield*/, _a.sent()];
                case 13:
                    // This is an inner block delimiter, yield it as content
                    _a.sent();
                    return [3 /*break*/, 26];
                case 14:
                    // Original logic for non-markdown files or simple cases
                    nestCount--;
                    if (!(nestCount === 0)) return [3 /*break*/, 16];
                    return [4 /*yield*/, __await(void 0)];
                case 15: 
                // We've closed the outer wrapper - stop without yielding the closing ```
                return [2 /*return*/, _a.sent()];
                case 16: return [4 /*yield*/, __await(line)];
                case 17: 
                // This is a nested block closing, yield it as content
                return [4 /*yield*/, _a.sent()];
                case 18:
                    // This is a nested block closing, yield it as content
                    _a.sent();
                    _a.label = 19;
                case 19: return [3 /*break*/, 26];
                case 20:
                    if (!line.startsWith("```")) return [3 /*break*/, 23];
                    // Going into a nested codeblock
                    nestCount++;
                    return [4 /*yield*/, __await(line)];
                case 21: return [4 /*yield*/, _a.sent()];
                case 22:
                    _a.sent();
                    return [3 /*break*/, 26];
                case 23: return [4 /*yield*/, __await(line)];
                case 24: 
                // Otherwise just yield the line as content
                return [4 /*yield*/, _a.sent()];
                case 25:
                    // Otherwise just yield the line as content
                    _a.sent();
                    _a.label = 26;
                case 26:
                    i++;
                    return [3 /*break*/, 9];
                case 27: return [2 /*return*/];
            }
        });
    });
}
function shouldRemoveLineBeforeStart(line) {
    return (line.trimStart().startsWith("```") ||
        line.trim() === "[CODE]" ||
        line.trim() === "<COMPLETION>" ||
        line.trim() === "<START EDITING HERE>" ||
        line.trim() === "{{FILL_HERE}}");
}
