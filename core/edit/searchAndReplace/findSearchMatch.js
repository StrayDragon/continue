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
exports.findSearchMatch = findSearchMatch;
exports.findSearchMatches = findSearchMatches;
/**
 * Exact string matching strategy
 */
function exactMatch(fileContent, searchContent) {
    var exactIndex = fileContent.indexOf(searchContent);
    if (exactIndex !== -1) {
        return {
            startIndex: exactIndex,
            endIndex: exactIndex + searchContent.length,
        };
    }
    return null;
}
/**
 * Trimmed content matching strategy
 */
function trimmedMatch(fileContent, searchContent) {
    var trimmedSearchContent = searchContent.trim();
    var trimmedIndex = fileContent.indexOf(trimmedSearchContent);
    if (trimmedIndex !== -1) {
        return {
            startIndex: trimmedIndex,
            endIndex: trimmedIndex + trimmedSearchContent.length,
        };
    }
    return null;
}
/**
 * Whitespace-ignored matching strategy
 * Removes all whitespace from both content and search, then finds the match
 */
function whitespaceIgnoredMatch(fileContent, searchContent) {
    // Remove all whitespace (spaces, tabs, newlines, etc.)
    var strippedFileContent = fileContent.replace(/\s/g, "");
    var strippedSearchContent = searchContent.replace(/\s/g, "");
    if (strippedSearchContent === "") {
        return null; // Empty search after stripping whitespace
    }
    var strippedIndex = strippedFileContent.indexOf(strippedSearchContent);
    if (strippedIndex === -1) {
        return null;
    }
    // Map the stripped position back to the original file content
    var originalStartIndex = -1;
    var strippedCharCount = 0;
    // Find the original start position by counting non-whitespace characters
    for (var i = 0; i < fileContent.length; i++) {
        if (!/\s/.test(fileContent[i])) {
            if (strippedCharCount === strippedIndex) {
                originalStartIndex = i;
                break;
            }
            strippedCharCount++;
        }
    }
    if (originalStartIndex === -1) {
        return null; // Should not happen if strippedIndex was valid
    }
    // Find the end position by counting through all characters (including whitespace)
    // that correspond to the stripped search content length
    var originalEndIndex = originalStartIndex;
    var matchedNonWhitespaceChars = 0;
    for (var i = originalStartIndex; i < fileContent.length; i++) {
        if (!/\s/.test(fileContent[i])) {
            matchedNonWhitespaceChars++;
            if (matchedNonWhitespaceChars === strippedSearchContent.length) {
                originalEndIndex = i + 1;
                break;
            }
        }
        // Always update end index to include current position (whether whitespace or not)
        originalEndIndex = i + 1;
    }
    return {
        startIndex: originalStartIndex,
        endIndex: originalEndIndex,
    };
}
/**
 * Calculate the Jaro similarity between two strings
 * TODO Restore this functionality - current implementation has some kind of bug where it only returns one line for the match
 */
function jaroSimilarity(s1, s2) {
    if (s1 === s2)
        return 1.0;
    if (s1.length === 0 || s2.length === 0)
        return 0.0;
    var matchDistance = Math.floor(Math.max(s1.length, s2.length) / 2) - 1;
    if (matchDistance < 0)
        return 0.0;
    var s1Matches = new Array(s1.length).fill(false);
    var s2Matches = new Array(s2.length).fill(false);
    var matches = 0;
    var transpositions = 0;
    // Find matches
    for (var i = 0; i < s1.length; i++) {
        var start = Math.max(0, i - matchDistance);
        var end = Math.min(i + matchDistance + 1, s2.length);
        for (var j = start; j < end; j++) {
            if (s2Matches[j] || s1[i] !== s2[j])
                continue;
            s1Matches[i] = true;
            s2Matches[j] = true;
            matches++;
            break;
        }
    }
    if (matches === 0)
        return 0.0;
    // Count transpositions
    var k = 0;
    for (var i = 0; i < s1.length; i++) {
        if (!s1Matches[i])
            continue;
        while (!s2Matches[k])
            k++;
        if (s1[i] !== s2[k])
            transpositions++;
        k++;
    }
    return ((matches / s1.length +
        matches / s2.length +
        (matches - transpositions / 2) / matches) /
        3.0);
}
/**
 * Calculate the Jaro-Winkler similarity between two strings
 */
function jaroWinklerSimilarity(s1, s2, prefixScale) {
    if (prefixScale === void 0) { prefixScale = 0.1; }
    var jaroSim = jaroSimilarity(s1, s2);
    if (jaroSim < 0.7)
        return jaroSim;
    // Calculate common prefix length (up to 4 characters)
    var prefixLength = 0;
    var maxPrefix = Math.min(4, Math.min(s1.length, s2.length));
    for (var i = 0; i < maxPrefix; i++) {
        if (s1[i] === s2[i]) {
            prefixLength++;
        }
        else {
            break;
        }
    }
    return jaroSim + prefixLength * prefixScale * (1 - jaroSim);
}
/**
 * Find the best fuzzy match for search content in file content using Jaro-Winkler
 */
function findFuzzyMatch(fileContent, searchContent, threshold) {
    if (threshold === void 0) { threshold = 0.9; }
    var searchLines = searchContent.split("\n");
    var fileLines = fileContent.split("\n");
    var bestMatch = null;
    var bestSimilarity = 0;
    // Try matching the search content as a whole block
    var searchBlock = searchContent.trim();
    if (searchBlock.length > 5) {
        // Require minimum length for meaningful matches
        // Use sliding window approach for multi-line search
        for (var i = 0; i <= fileLines.length - searchLines.length; i++) {
            var candidateLines = fileLines.slice(i, i + searchLines.length);
            var candidateBlock = candidateLines.join("\n").trim();
            if (candidateBlock.length < 5)
                continue; // Skip very short blocks
            var similarity = jaroWinklerSimilarity(searchBlock, candidateBlock);
            if (similarity >= threshold && similarity > bestSimilarity) {
                // Calculate character positions
                var linesBeforeMatch = fileLines.slice(0, i);
                var startIndex = linesBeforeMatch.join("\n").length +
                    (linesBeforeMatch.length > 0 ? 1 : 0);
                var endIndex = startIndex + candidateBlock.length;
                bestMatch = {
                    startIndex: startIndex,
                    endIndex: endIndex,
                };
                bestSimilarity = similarity;
            }
        }
    }
    // Also try line-by-line matching for better granularity
    for (var searchLineIdx = 0; searchLineIdx < searchLines.length; searchLineIdx++) {
        var searchLine = searchLines[searchLineIdx].trim();
        if (searchLine.length === 0 || searchLine.length < 3)
            continue; // Skip very short lines
        for (var fileLineIdx = 0; fileLineIdx < fileLines.length; fileLineIdx++) {
            var fileLine = fileLines[fileLineIdx].trim();
            if (fileLine.length === 0 || fileLine.length < 3)
                continue; // Skip very short lines
            var similarity = jaroWinklerSimilarity(searchLine, fileLine);
            if (similarity >= threshold && similarity > bestSimilarity) {
                // Calculate character positions for the line
                var linesBeforeMatch = fileLines.slice(0, fileLineIdx);
                var startIndex = linesBeforeMatch.join("\n").length +
                    (linesBeforeMatch.length > 0 ? 1 : 0);
                var endIndex = startIndex + fileLines[fileLineIdx].length;
                bestMatch = {
                    startIndex: startIndex,
                    endIndex: endIndex,
                };
                bestSimilarity = similarity;
            }
        }
    }
    return bestMatch;
}
/**
 * Ordered list of matching strategies to try with their names
 */
var matchingStrategies = [
    { strategy: exactMatch, name: "exactMatch" },
    { strategy: trimmedMatch, name: "trimmedMatch" },
    { strategy: whitespaceIgnoredMatch, name: "whitespaceIgnoredMatch" },
    // { strategy: findFuzzyMatch, name: "jaroWinklerFuzzyMatch" },
];
/**
 * Find the exact match position for search content in file content.
 * Uses multiple matching strategies in order of preference.
 *
 * Matching Strategy:
 * 1. If search content is empty, matches at the beginning of file (position 0)
 * 2. Try each matching strategy in order until one succeeds
 *
 * @param fileContent - The complete content of the file to search in
 * @param searchContent - The content to search for
 * @param config - Configuration options for matching behavior
 * @returns Match result with character positions, or null if no match found
 */
function findSearchMatch(fileContent, searchContent) {
    var trimmedSearchContent = searchContent.trim();
    if (trimmedSearchContent === "") {
        // Empty search content matches the beginning of the file
        return { startIndex: 0, endIndex: 0, strategyName: "emptySearch" };
    }
    // Try each matching strategy in order
    for (var _i = 0, matchingStrategies_1 = matchingStrategies; _i < matchingStrategies_1.length; _i++) {
        var _a = matchingStrategies_1[_i], strategy = _a.strategy, name_1 = _a.name;
        var result = strategy(fileContent, searchContent);
        if (result !== null) {
            return __assign(__assign({}, result), { strategyName: name_1 });
        }
    }
    return null;
}
/**
 * Find all matches for search content in file content.
 * Uses the same matching strategies as findSearchMatch, applied iteratively.
 *
 * @param fileContent - The complete content of the file to search in
 * @param searchContent - The content to search for
 * @returns Array of match results with character positions, empty array if no matches found
 */
function findSearchMatches(fileContent, searchContent) {
    var matches = [];
    // Special case: empty search string always matches at position 0
    if (searchContent.trim() === "") {
        return [{ startIndex: 0, endIndex: 0, strategyName: "emptySearch" }];
    }
    var remainingContent = fileContent;
    var currentOffset = 0;
    while (remainingContent.length > 0) {
        var match = findSearchMatch(remainingContent, searchContent);
        if (match === null) {
            break;
        }
        // Adjust match positions to account for the current offset
        var adjustedMatch = {
            startIndex: match.startIndex + currentOffset,
            endIndex: match.endIndex + currentOffset,
            strategyName: match.strategyName,
        };
        // Prevent infinite loops by ensuring we're making progress
        // If the new match starts at or before the last match's start position, break
        if (matches.length > 0 &&
            adjustedMatch.startIndex <= matches[matches.length - 1].startIndex) {
            break;
        }
        matches.push(adjustedMatch);
        // Update offset and truncate content after the current match
        currentOffset = adjustedMatch.endIndex;
        remainingContent = fileContent.slice(currentOffset);
    }
    return matches;
}
