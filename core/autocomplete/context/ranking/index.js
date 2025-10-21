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
exports.getSymbolsForSnippet = getSymbolsForSnippet;
exports.rankAndOrderSnippets = rankAndOrderSnippets;
exports.fillPromptWithSnippets = fillPromptWithSnippets;
var countTokens_1 = require("../../../llm/countTokens");
var rx = /[\s.,\/#!$%\^&\*;:{}=\-_`~()\[\]]/g;
function getSymbolsForSnippet(snippet) {
    var symbols = snippet
        .split(rx)
        .map(function (s) { return s.trim(); })
        .filter(function (s) { return s !== ""; });
    return new Set(symbols);
}
/**
 * Calculate similarity as number of shared symbols divided by total number of unique symbols between both.
 */
function jaccardSimilarity(a, b) {
    var aSet = getSymbolsForSnippet(a);
    var bSet = getSymbolsForSnippet(b);
    var union = new Set(__spreadArray(__spreadArray([], aSet, true), bSet, true)).size;
    // Avoid division by zero
    if (union === 0) {
        return 0;
    }
    var intersection = 0;
    for (var _i = 0, aSet_1 = aSet; _i < aSet_1.length; _i++) {
        var symbol = aSet_1[_i];
        if (bSet.has(symbol)) {
            intersection++;
        }
    }
    return intersection / union;
}
/**
 * Rank code snippets to be used in tab-autocomplete prompt. Returns a sorted version of the snippet array.
 */
function rankAndOrderSnippets(ranges, helper) {
    var windowAroundCursor = helper.fullPrefix.slice(-helper.options.slidingWindowSize *
        helper.options.slidingWindowPrefixPercentage) +
        helper.fullSuffix.slice(helper.options.slidingWindowSize *
            (1 - helper.options.slidingWindowPrefixPercentage));
    var snippets = ranges.map(function (snippet) {
        var _a;
        return (__assign({ score: (_a = snippet.score) !== null && _a !== void 0 ? _a : jaccardSimilarity(snippet.contents, windowAroundCursor) }, snippet));
    });
    var uniqueSnippets = deduplicateSnippets(snippets);
    return uniqueSnippets.sort(function (a, b) { return a.score - b.score; });
}
/**
 * Deduplicate code snippets by merging overlapping ranges into a single range.
 */
function deduplicateSnippets(snippets) {
    // Group by file
    var fileGroups = {};
    for (var _i = 0, snippets_1 = snippets; _i < snippets_1.length; _i++) {
        var snippet = snippets_1[_i];
        if (!fileGroups[snippet.filepath]) {
            fileGroups[snippet.filepath] = [];
        }
        fileGroups[snippet.filepath].push(snippet);
    }
    // Merge overlapping ranges
    var allRanges = [];
    for (var _a = 0, _b = Object.keys(fileGroups); _a < _b.length; _a++) {
        var file = _b[_a];
        allRanges.push.apply(allRanges, mergeSnippetsByRange(fileGroups[file]));
    }
    return allRanges;
}
function mergeSnippetsByRange(snippets) {
    if (snippets.length <= 1) {
        return snippets;
    }
    var sorted = snippets.sort(function (a, b) { return a.range.start.line - b.range.start.line; });
    var merged = [];
    while (sorted.length > 0) {
        var next = sorted.shift();
        var last = merged[merged.length - 1];
        if (merged.length > 0 && last.range.end.line >= next.range.start.line) {
            // Merge with previous snippet
            last.score = Math.max(last.score, next.score);
            try {
                last.range.end = next.range.end;
            }
            catch (e) {
                console.log("Error merging ranges", e);
            }
            last.contents = mergeOverlappingRangeContents(last, next);
        }
        else {
            merged.push(next);
        }
    }
    return merged;
}
function mergeOverlappingRangeContents(first, second) {
    var firstLines = first.contents.split("\n");
    var numOverlapping = first.range.end.line - second.range.start.line;
    return "".concat(firstLines.slice(-numOverlapping).join("\n"), "\n").concat(second.contents);
}
/**
 * Fill the allowed space with snippets.
 * It is assumed that the snippets are sorted by score.
 */
function fillPromptWithSnippets(snippets, maxSnippetTokens, modelName) {
    var tokensRemaining = maxSnippetTokens;
    var keptSnippets = [];
    for (var i = 0; i < snippets.length; i++) {
        var snippet = snippets[i];
        var tokenCount = (0, countTokens_1.countTokens)(snippet.contents, modelName);
        if (tokensRemaining - tokenCount >= 0) {
            tokensRemaining -= tokenCount;
            keptSnippets.push(snippet);
        }
        else {
        }
    }
    return keptSnippets;
}
