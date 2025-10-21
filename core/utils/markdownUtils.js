"use strict";
/**
 * Utility functions for working with markdown files and code blocks
 */
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkdownBlockStateTracker = void 0;
exports.headerIsMarkdown = headerIsMarkdown;
exports.isMarkdownFile = isMarkdownFile;
exports.collectAllLines = collectAllLines;
/**
 * Determines if a code block header indicates markdown content
 */
function headerIsMarkdown(header) {
    var _a, _b, _c;
    return (header === "md" ||
        header === "markdown" ||
        header === "gfm" ||
        header === "github-markdown" ||
        header.includes(" md") ||
        header.includes(" markdown") ||
        header.includes(" gfm") ||
        header.includes(" github-markdown") ||
        ((_a = header.split(" ")[0]) === null || _a === void 0 ? void 0 : _a.split(".").pop()) === "md" ||
        ((_b = header.split(" ")[0]) === null || _b === void 0 ? void 0 : _b.split(".").pop()) === "markdown" ||
        ((_c = header.split(" ")[0]) === null || _c === void 0 ? void 0 : _c.split(".").pop()) === "gfm");
}
/**
 * Determines if a file is a markdown file based on its filepath.
 */
function isMarkdownFile(filepath) {
    var _a;
    if (!filepath) {
        return false;
    }
    var ext = ((_a = filepath.split(".").pop()) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || "";
    return ["md", "markdown", "gfm"].includes(ext);
}
/**
 * State tracker for markdown block analysis to avoid recomputing on each call.
 * Optimized to handle nested markdown code blocks.
 */
var MarkdownBlockStateTracker = /** @class */ (function () {
    function MarkdownBlockStateTracker(allLines) {
        this.markdownNestCount = 0;
        this.lastProcessedIndex = -1;
        this.trimmedLines = allLines.map(function (l) { return l.trim(); });
        // Pre-compute positions of all bare backtick lines for faster lookup
        this.bareBacktickPositions = [];
        for (var i = 0; i < this.trimmedLines.length; i++) {
            if (this.trimmedLines[i].match(/^`+$/)) {
                this.bareBacktickPositions.push(i);
            }
        }
    }
    /**
     * Determines if we should stop at the given markdown block position.
     * Maintains state across calls to avoid redundant computation.
     */
    MarkdownBlockStateTracker.prototype.shouldStopAtPosition = function (currentIndex) {
        if (this.trimmedLines[currentIndex] !== "```") {
            return false;
        }
        // Process any lines we haven't seen yet up to currentIndex
        for (var j = this.lastProcessedIndex + 1; j <= currentIndex; j++) {
            var currentLine = this.trimmedLines[j];
            if (this.markdownNestCount > 0) {
                // Inside a markdown block
                if (currentLine.match(/^`+$/)) {
                    // Found bare backticks - check if this is the last one
                    if (j === currentIndex) {
                        var remainingBareBackticks = this.getRemainingBareBackticksAfter(j);
                        if (remainingBareBackticks === 0) {
                            this.markdownNestCount = 0;
                            this.lastProcessedIndex = j;
                            return true;
                        }
                    }
                }
                else if (currentLine.startsWith("```")) {
                    // Going into a nested codeblock
                    this.markdownNestCount++;
                }
            }
            else {
                // Not inside a markdown block yet
                if (currentLine.startsWith("```")) {
                    var header = currentLine.replaceAll("`", "");
                    if (headerIsMarkdown(header)) {
                        this.markdownNestCount = 1;
                    }
                }
            }
        }
        this.lastProcessedIndex = currentIndex;
        return false;
    };
    /**
     * Efficiently determines if there are remaining bare backticks after the given position.
     */
    MarkdownBlockStateTracker.prototype.getRemainingBareBackticksAfter = function (currentIndex) {
        return this.bareBacktickPositions.filter(function (pos) { return pos > currentIndex; })
            .length;
    };
    /**
     * Checks if the line at the given index is a bare backtick line.
     */
    MarkdownBlockStateTracker.prototype.isBareBacktickLine = function (index) {
        return this.bareBacktickPositions.includes(index);
    };
    /**
     * Gets the trimmed lines array.
     */
    MarkdownBlockStateTracker.prototype.getTrimmedLines = function () {
        return this.trimmedLines;
    };
    return MarkdownBlockStateTracker;
}());
exports.MarkdownBlockStateTracker = MarkdownBlockStateTracker;
/**
 * Collects all lines from a LineStream into an array for analysis.
 */
function collectAllLines(stream) {
    return __awaiter(this, void 0, void 0, function () {
        var allLines, line, e_1_1;
        var _a, stream_1, stream_1_1;
        var _b, e_1, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    allLines = [];
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 6, 7, 12]);
                    _a = true, stream_1 = __asyncValues(stream);
                    _e.label = 2;
                case 2: return [4 /*yield*/, stream_1.next()];
                case 3:
                    if (!(stream_1_1 = _e.sent(), _b = stream_1_1.done, !_b)) return [3 /*break*/, 5];
                    _d = stream_1_1.value;
                    _a = false;
                    line = _d;
                    allLines.push(line);
                    _e.label = 4;
                case 4:
                    _a = true;
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_1_1 = _e.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 12];
                case 7:
                    _e.trys.push([7, , 10, 11]);
                    if (!(!_a && !_b && (_c = stream_1.return))) return [3 /*break*/, 9];
                    return [4 /*yield*/, _c.call(stream_1)];
                case 8:
                    _e.sent();
                    _e.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 11: return [7 /*endfinally*/];
                case 12: return [2 /*return*/, allLines];
            }
        });
    });
}
