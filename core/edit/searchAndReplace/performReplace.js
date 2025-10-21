"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeFindAndReplace = executeFindAndReplace;
exports.executeMultiFindAndReplace = executeMultiFindAndReplace;
var errors_1 = require("../../util/errors");
var findSearchMatch_1 = require("./findSearchMatch");
function executeFindAndReplace(fileContent, oldString, newString, replaceAll, editIndex) {
    if (editIndex === void 0) { editIndex = 0; }
    var matches = (0, findSearchMatch_1.findSearchMatches)(fileContent, oldString);
    if (matches.length === 0) {
        throw new errors_1.ContinueError(errors_1.ContinueErrorReason.FindAndReplaceOldStringNotFound, "Edit at index ".concat(editIndex, ": string not found in file: \"").concat(oldString, "\""));
    }
    if (replaceAll) {
        // Apply replacements in reverse order to maintain correct positions
        var result = fileContent;
        for (var i = matches.length - 1; i >= 0; i--) {
            var match = matches[i];
            result =
                result.substring(0, match.startIndex) +
                    newString +
                    result.substring(match.endIndex);
        }
        return result;
    }
    else {
        // For single replacement, check for multiple matches first
        if (matches.length > 1) {
            throw new errors_1.ContinueError(errors_1.ContinueErrorReason.FindAndReplaceMultipleOccurrences, "Edit at index ".concat(editIndex, ": String \"").concat(oldString, "\" appears ").concat(matches.length, " times in the file. Either provide a more specific string with surrounding context to make it unique, or use replace_all=true to replace all occurrences."));
        }
        // Apply single replacement
        var match = matches[0];
        return (fileContent.substring(0, match.startIndex) +
            newString +
            fileContent.substring(match.endIndex));
    }
}
function executeMultiFindAndReplace(fileContent, edits) {
    var _a;
    var result = fileContent;
    // Apply edits in sequence
    for (var editIndex = 0; editIndex < edits.length; editIndex++) {
        var edit = edits[editIndex];
        result = executeFindAndReplace(result, edit.old_string, edit.new_string, (_a = edit.replace_all) !== null && _a !== void 0 ? _a : false, editIndex);
    }
    return result;
}
