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
exports.contextSnippetsBlock = contextSnippetsBlock;
exports.currentFileContentBlock = currentFileContentBlock;
exports.editHistoryBlock = editHistoryBlock;
var constants_1 = require("../constants");
var utils_1 = require("./utils");
/**
 * @param contextSnippets Codestral style snippet with +++++ filename\ncontent or an empty string.
 */
function contextSnippetsBlock(contextSnippets) {
    var headerRegex = /^(\+\+\+\+\+ )(.*)/;
    var lines = contextSnippets.split("\n");
    return lines
        .reduce(function (acc, line) {
        var matches = line.match(headerRegex);
        if (matches) {
            var filename = matches[2];
            acc.push("".concat(constants_1.INSTINCT_CONTEXT_FILE_TOKEN, ": ").concat(filename));
        }
        else {
            if (acc.length > 0 &&
                acc[acc.length - 1].startsWith(constants_1.INSTINCT_CONTEXT_FILE_TOKEN) // if header was added just before
            ) {
                acc.push("".concat(constants_1.INSTINCT_SNIPPET_TOKEN));
            }
            acc.push(line);
        }
        return acc;
    }, [])
        .join("\n");
}
function currentFileContentBlock(currentFileContent, windowStart, windowEnd, editableRegionStartLine, editableRegionEndLine, cursorPosition) {
    var currentFileContentLines = currentFileContent.split("\n");
    var insertedCursorLines = (0, utils_1.insertCursorToken)(currentFileContentLines, cursorPosition, constants_1.INSTINCT_USER_CURSOR_IS_HERE_TOKEN);
    var instrumentedLines = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], insertedCursorLines.slice(windowStart, editableRegionStartLine), true), [
        constants_1.INSTINCT_EDITABLE_REGION_START_TOKEN
    ], false), insertedCursorLines.slice(editableRegionStartLine, editableRegionEndLine + 1), true), [
        constants_1.INSTINCT_EDITABLE_REGION_END_TOKEN
    ], false), insertedCursorLines.slice(editableRegionEndLine + 1, windowEnd + 1), true);
    return instrumentedLines.join("\n");
}
function editHistoryBlock(editDiffHistories) {
    if (!editDiffHistories.length) {
        return "";
    }
    var blocks = [];
    for (var _i = 0, editDiffHistories_1 = editDiffHistories; _i < editDiffHistories_1.length; _i++) {
        var editDiffHistory = editDiffHistories_1[_i];
        if (!editDiffHistory.trim()) {
            continue;
        }
        // Split on Index: lines to get the unified diff.
        var diffSections = editDiffHistory
            .split(/^Index: /m)
            .filter(function (section) { return section.trim(); });
        for (var _a = 0, diffSections_1 = diffSections; _a < diffSections_1.length; _a++) {
            var section = diffSections_1[_a];
            var lines = section.split("\n");
            // Extract filename from the first line (after "Index: " was split off).
            var filename = lines[0];
            // Find the start of the actual diff content (skip ---, +++, and === lines).
            var diffLines = lines
                .filter(function (line) {
                return !line.startsWith("---") &&
                    !line.startsWith("+++") &&
                    !line.startsWith("===") &&
                    line.trim() !== "";
            })
                .slice(1); // remove the filename line
            // Only include lines that are actual diff content (@@, +, -, or context lines).
            var actualDiffContent = diffLines.filter(function (line) {
                return line.startsWith("@@") ||
                    line.startsWith("+") ||
                    line.startsWith("-") ||
                    line.startsWith(" ");
            });
            if (actualDiffContent.length === 0)
                continue;
            var diffBlock = [
                "User edited file \"".concat(filename, "\""),
                "",
                "```diff",
                actualDiffContent.join("\n"),
                "```",
            ].join("\n");
            blocks.push(diffBlock);
        }
    }
    return blocks.join("\n");
}
