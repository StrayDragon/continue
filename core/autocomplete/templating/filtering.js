"use strict";
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
exports.getSnippets = void 0;
var countTokens_1 = require("../../llm/countTokens");
var types_1 = require("../snippets/types");
var formatOpenedFilesContext_1 = require("./formatOpenedFilesContext");
var validation_1 = require("./validation");
var getRemainingTokenCount = function (helper) {
    var tokenCount = (0, countTokens_1.countTokens)(helper.prunedCaretWindow, helper.modelName);
    return helper.options.maxPromptTokens - tokenCount;
};
var TOKEN_BUFFER = 10; // We may need extra tokens for snippet description etc.
/**
 * Shuffles an array in place using the Fisher-Yates algorithm.
 * @param array The array to shuffle.
 * @returns The shuffled array.
 */
var shuffleArray = function (array) {
    var _a;
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        _a = [array[j], array[i]], array[i] = _a[0], array[j] = _a[1];
    }
    return array;
};
function filterSnippetsAlreadyInCaretWindow(snippets, caretWindow) {
    return snippets.filter(function (s) { return s.content.trim() !== "" && !caretWindow.includes(s.content.trim()); });
}
var getSnippets = function (helper, payload) {
    var snippets = {
        clipboard: payload.clipboardSnippets,
        recentlyVisitedRanges: payload.recentlyVisitedRangesSnippets,
        recentlyEditedRanges: payload.recentlyEditedRangeSnippets,
        diff: payload.diffSnippets,
        recentlyOpenedFiles: payload.recentlyOpenedFileSnippets,
        base: shuffleArray(filterSnippetsAlreadyInCaretWindow(__spreadArray(__spreadArray(__spreadArray([], payload.rootPathSnippets, true), payload.importDefinitionSnippets, true), payload.staticSnippet, true), helper.prunedCaretWindow)),
    };
    // Define snippets with their priorities
    var snippetConfigs = [
        {
            key: "clipboard",
            enabledOrPriority: helper.options.experimental_includeClipboard,
            defaultPriority: 1,
            snippets: payload.clipboardSnippets,
        },
        {
            key: "recentlyOpenedFiles",
            enabledOrPriority: helper.options.useRecentlyOpened,
            defaultPriority: 2,
            snippets: payload.recentlyOpenedFileSnippets,
        },
        {
            key: "recentlyVisitedRanges",
            enabledOrPriority: helper.options.experimental_includeRecentlyVisitedRanges,
            defaultPriority: 3,
            snippets: payload.recentlyVisitedRangesSnippets,
            /* TODO: recentlyVisitedRanges also contain contents from other windows like terminal or output
            if they are visible. We should handle them separately so that we can control their priority
            and whether they should be included or not. */
        },
        {
            key: "recentlyEditedRanges",
            enabledOrPriority: helper.options.experimental_includeRecentlyEditedRanges,
            defaultPriority: 4,
            snippets: payload.recentlyEditedRangeSnippets,
        },
        {
            key: "diff",
            enabledOrPriority: helper.options.experimental_includeDiff,
            defaultPriority: 5,
            snippets: payload.diffSnippets,
            // TODO: diff is commonly too large, thus anything lower in priority is not included.
        },
        {
            key: "base",
            enabledOrPriority: true,
            defaultPriority: 99, // make sure it's the last one to be processed, but still possible to override
            snippets: shuffleArray(filterSnippetsAlreadyInCaretWindow(__spreadArray(__spreadArray(__spreadArray([], payload.rootPathSnippets, true), payload.importDefinitionSnippets, true), payload.staticSnippet, true), helper.prunedCaretWindow)),
            // TODO: Add this too to experimental config, maybe move upper in the order, since it's almost
            // always not inlucded due to diff being commonly large
        },
    ];
    // Create a readable order of enabled snippets
    var snippetOrder = snippetConfigs
        .filter(function (_a) {
        var enabledOrPriority = _a.enabledOrPriority;
        return enabledOrPriority;
    })
        .map(function (_a) {
        var key = _a.key, enabledOrPriority = _a.enabledOrPriority, defaultPriority = _a.defaultPriority;
        return ({
            key: key,
            priority: typeof enabledOrPriority === "number"
                ? enabledOrPriority
                : defaultPriority,
        });
    })
        .sort(function (a, b) { return a.priority - b.priority; });
    var finalSnippets = [];
    var remainingTokenCount = getRemainingTokenCount(helper);
    // tracks already added filepaths for deduplication
    var addedFilepaths = new Set();
    // Process snippets in priority order
    for (var _i = 0, snippetOrder_1 = snippetOrder; _i < snippetOrder_1.length; _i++) {
        var key = snippetOrder_1[_i].key;
        // Special handling for recentlyOpenedFiles
        if (key === "recentlyOpenedFiles" && helper.options.useRecentlyOpened) {
            // Custom trimming
            var processedSnippets = (0, formatOpenedFilesContext_1.formatOpenedFilesContext)(payload.recentlyOpenedFileSnippets, remainingTokenCount, helper, finalSnippets, TOKEN_BUFFER);
            // Add processed snippets to finalSnippets respecting token limits
            for (var _a = 0, processedSnippets_1 = processedSnippets; _a < processedSnippets_1.length; _a++) {
                var snippet = processedSnippets_1[_a];
                if (!(0, validation_1.isValidSnippet)(snippet))
                    continue;
                var snippetSize = (0, countTokens_1.countTokens)(snippet.content, helper.modelName) + TOKEN_BUFFER;
                if (remainingTokenCount >= snippetSize) {
                    finalSnippets.push(snippet);
                    addedFilepaths.add(snippet.filepath);
                    remainingTokenCount -= snippetSize;
                }
                else {
                    continue; // Not enough tokens, try again with next snippet
                }
            }
        }
        else {
            // Normal processing for other snippet types
            var snippetsToProcess = snippets[key].filter(function (snippet) {
                return snippet.type !== types_1.AutocompleteSnippetType.Code ||
                    !addedFilepaths.has(snippet.filepath);
            });
            for (var _b = 0, snippetsToProcess_1 = snippetsToProcess; _b < snippetsToProcess_1.length; _b++) {
                var snippet = snippetsToProcess_1[_b];
                if (!(0, validation_1.isValidSnippet)(snippet))
                    continue;
                var snippetSize = (0, countTokens_1.countTokens)(snippet.content, helper.modelName) + TOKEN_BUFFER;
                if (remainingTokenCount >= snippetSize) {
                    finalSnippets.push(snippet);
                    if (snippet.filepath) {
                        addedFilepaths.add(snippet.filepath);
                    }
                    remainingTokenCount -= snippetSize;
                }
                else {
                    continue; // Not enough tokens, try again with next snippet
                }
            }
        }
        // If we're out of tokens, no need to process more snippet types
        if (remainingTokenCount <= 0)
            break;
    }
    return finalSnippets;
};
exports.getSnippets = getSnippets;
