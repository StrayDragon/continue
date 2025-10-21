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
Object.defineProperty(exports, "__esModule", { value: true });
exports.setLogStats = exports.rankByScore = exports.getRecencyAndSizeScore = void 0;
exports.formatOpenedFilesContext = formatOpenedFilesContext;
exports.trimSnippetForContext = trimSnippetForContext;
var countTokens_1 = require("../../llm/countTokens");
var types_1 = require("../snippets/types");
var logMin;
var logMax;
var numFilesConsidered = 10;
var defaultNumFilesUsed = 5;
var recencyWeight = 0.6;
var sizeWeight = 0.4;
var minSize = 10;
var minTokensInSnippet = 125;
// Fits opened-file snippets into the remaining amount of prompt tokens
function formatOpenedFilesContext(recentlyOpenedFilesSnippets, remainingTokenCount, helper, alreadyAddedSnippets, TOKEN_BUFFER) {
    if (recentlyOpenedFilesSnippets.length === 0) {
        return [];
    }
    var _loop_1 = function (snippet) {
        if (snippet.type !== types_1.AutocompleteSnippetType.Code) {
            return "continue";
        }
        recentlyOpenedFilesSnippets = recentlyOpenedFilesSnippets.filter(function (s) { return s.filepath !== snippet.filepath; });
    };
    // deduplication; if a snippet is already added, don't include it here
    for (var _i = 0, alreadyAddedSnippets_1 = alreadyAddedSnippets; _i < alreadyAddedSnippets_1.length; _i++) {
        var snippet = alreadyAddedSnippets_1[_i];
        _loop_1(snippet);
    }
    // Calculate how many full snippets would fit within the remaining token count
    var numSnippetsThatFit = 0;
    var totalTokens = 0;
    var numFilesUsed = Math.min(defaultNumFilesUsed, recentlyOpenedFilesSnippets.length);
    for (var i = 0; i < recentlyOpenedFilesSnippets.length; i++) {
        var snippetTokens = (0, countTokens_1.countTokens)(recentlyOpenedFilesSnippets[i].content, helper.modelName);
        if (totalTokens + snippetTokens < remainingTokenCount - TOKEN_BUFFER) {
            totalTokens += snippetTokens;
            numSnippetsThatFit++;
        }
        else {
            break;
        }
    }
    // if all the untrimmed snippets, or more than a default value, fit, return the untrimmed snippets
    if (numSnippetsThatFit >= numFilesUsed) {
        return recentlyOpenedFilesSnippets.slice(0, numSnippetsThatFit);
    }
    // If they don't fit, adaptively trim them.
    setLogStats(recentlyOpenedFilesSnippets);
    var topScoredSnippets = rankByScore(recentlyOpenedFilesSnippets);
    var N = topScoredSnippets.length;
    while (remainingTokenCount - TOKEN_BUFFER < N * minTokensInSnippet) {
        topScoredSnippets.pop();
        N = topScoredSnippets.length;
        if (N === 0)
            break;
    }
    var trimmedSnippets = new Array();
    while (N > 0) {
        var W = 2 / (N + 1);
        var snippetTokenLimit = Math.floor(minTokensInSnippet +
            W * (remainingTokenCount - TOKEN_BUFFER - N * minTokensInSnippet));
        var trimmedSnippetAndTokenCount = trimSnippetForContext(topScoredSnippets[0], snippetTokenLimit, helper.modelName);
        trimmedSnippets.push(trimmedSnippetAndTokenCount.newSnippet);
        remainingTokenCount -= trimmedSnippetAndTokenCount.newTokens;
        topScoredSnippets.shift();
        N = topScoredSnippets.length;
    }
    return trimmedSnippets;
}
// Rank snippets by recency and size
var rankByScore = function (snippets) {
    if (snippets.length === 0)
        return [];
    var topSnippets = snippets.slice(0, numFilesConsidered);
    // Sort by score (using original index for recency calculation)
    var scoredSnippets = topSnippets.map(function (snippet, i) { return ({
        snippet: snippet,
        originalIndex: i,
        score: getRecencyAndSizeScore(i, snippet),
    }); });
    // Uncomment to debug. Logs the table of snippets with their scores (in order of recency).
    /* console.table(
      topSnippets.map((snippet, i) => ({
        filepath: "filepath" in snippet ? snippet.filepath : "unknown",
        recencyAndSizeScore: getRecencyAndSizeScore(i, snippet),
      })),
    ); */
    scoredSnippets.sort(function (a, b) { return b.score - a.score; });
    return scoredSnippets
        .slice(0, Math.min(defaultNumFilesUsed, scoredSnippets.length))
        .map(function (item) { return item.snippet; });
};
exports.rankByScore = rankByScore;
// Returns linear combination of recency and size scores
// recency score is exponential decay over recency; log normalized score is used for size
var getRecencyAndSizeScore = function (index, snippet) {
    var recencyScore = Math.pow(1.15, -1 * index);
    var logCurrent = Math.log(Math.max(snippet.content.length, minSize));
    var sizeScore = logMax === logMin ? 0.5 : 1 - (logCurrent - logMin) / (logMax - logMin);
    return recencyWeight * recencyScore + sizeWeight * sizeScore;
};
exports.getRecencyAndSizeScore = getRecencyAndSizeScore;
var setLogStats = function (snippets) {
    var contentSizes = snippets
        .slice(0, 10)
        .map(function (snippet) { return snippet.content.length; });
    logMin = Math.log(Math.max(Math.min.apply(Math, contentSizes), minSize));
    logMax = Math.log(Math.max(Math.max.apply(Math, contentSizes), minSize));
    return;
};
exports.setLogStats = setLogStats;
function trimSnippetForContext(snippet, maxTokens, modelName) {
    var numTokensInSnippet = (0, countTokens_1.countTokens)(snippet.content, modelName);
    if (numTokensInSnippet <= maxTokens) {
        return { newSnippet: snippet, newTokens: numTokensInSnippet };
    }
    var trimmedCode = (0, countTokens_1.pruneStringFromBottom)(modelName, maxTokens, snippet.content);
    return {
        newSnippet: __assign(__assign({}, snippet), { content: trimmedCode }),
        newTokens: (0, countTokens_1.countTokens)(trimmedCode, modelName),
    };
}
