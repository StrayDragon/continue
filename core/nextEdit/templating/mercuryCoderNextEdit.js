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
exports.recentlyViewedCodeSnippetsBlock = recentlyViewedCodeSnippetsBlock;
exports.currentFileContentBlock = currentFileContentBlock;
exports.editHistoryBlock = editHistoryBlock;
var constants_1 = require("../constants");
var utils_1 = require("./utils");
function recentlyViewedCodeSnippetsBlock(recentlyViewedCodeSnippets) {
    return recentlyViewedCodeSnippets.reduce(function (acc, snippet, i) {
        var block = [
            constants_1.MERCURY_RECENTLY_VIEWED_CODE_SNIPPET_OPEN,
            "code_snippet_file_path: ".concat(snippet.filepath),
            snippet.content,
            constants_1.MERCURY_RECENTLY_VIEWED_CODE_SNIPPET_CLOSE,
        ].join("\n");
        return (acc + block + (i === recentlyViewedCodeSnippets.length - 1 ? "" : "\n"));
    }, "");
}
function currentFileContentBlock(currentFileContent, editableRegionStartLine, editableRegionEndLine, cursorPosition) {
    var currentFileContentLines = currentFileContent.split("\n");
    var insertedCursorLines = (0, utils_1.insertCursorToken)(currentFileContentLines, cursorPosition, constants_1.MERCURY_CURSOR);
    var instrumentedLines = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], insertedCursorLines.slice(0, editableRegionStartLine), true), [
        constants_1.MERCURY_CODE_TO_EDIT_OPEN
    ], false), insertedCursorLines.slice(editableRegionStartLine, editableRegionEndLine + 1), true), [
        constants_1.MERCURY_CODE_TO_EDIT_CLOSE
    ], false), insertedCursorLines.slice(editableRegionEndLine + 1), true);
    return instrumentedLines.join("\n");
}
function editHistoryBlock(editDiffHistory) {
    // diffHistory is made from createDiff.
    // This uses createPatch from npm diff library, which includes an index line and a separator.
    // We get rid of these first two lines.
    return editDiffHistory
        .map(function (diff) { return diff.split("\n").slice(2).join("\n"); })
        .join("\n");
    // return editDiffHistory.split("\n").slice(2).join("\n");
}
function mercuryNextEditTemplateBuilder(recentlyViewedCodeSnippets, currentFileContent, codeToEdit, codeToEditRange, cursorPosition, editDiffHistory) {
    return "";
}
