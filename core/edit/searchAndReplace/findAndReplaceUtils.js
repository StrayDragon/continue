"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FOUND_MULTIPLE_FIND_STRINGS_ERROR = void 0;
exports.validateSingleEdit = validateSingleEdit;
exports.trimEmptyLines = trimEmptyLines;
var errors_1 = require("../../util/errors");
exports.FOUND_MULTIPLE_FIND_STRINGS_ERROR = "Either provide a more specific string with surrounding context to make it unique, or use replace_all=true to replace all occurrences.";
/**
 * Validates a single edit operation
 */
function validateSingleEdit(oldString, newString, replaceAll, index) {
    var context = index !== undefined ? "edit at index ".concat(index, ": ") : "";
    if (oldString === undefined || typeof oldString !== "string") {
        throw new errors_1.ContinueError(errors_1.ContinueErrorReason.FindAndReplaceMissingOldString, "".concat(context, "string old_string is required"));
    }
    if (newString === undefined || typeof newString !== "string") {
        throw new errors_1.ContinueError(errors_1.ContinueErrorReason.FindAndReplaceMissingNewString, "".concat(context, "string new_string is required"));
    }
    if (oldString === newString) {
        throw new errors_1.ContinueError(errors_1.ContinueErrorReason.FindAndReplaceIdenticalOldAndNewStrings, "".concat(context, "old_string and new_string must be different"));
    }
    if (replaceAll !== undefined && typeof replaceAll !== "boolean") {
        throw new errors_1.ContinueError(errors_1.ContinueErrorReason.FindAndReplaceInvalidReplaceAll, "".concat(context, "replace_all must be a valid boolean"));
    }
    return { oldString: oldString, newString: newString, replaceAll: replaceAll };
}
function trimEmptyLines(_a) {
    var lines = _a.lines, fromEnd = _a.fromEnd;
    lines = fromEnd ? lines.slice().reverse() : lines.slice();
    var newLines = [];
    var shouldContinueRemoving = true;
    for (var index = 0; index < lines.length; index++) {
        var line = lines[index];
        if (shouldContinueRemoving && line.trim() === "")
            continue;
        shouldContinueRemoving = false;
        newLines.push(line);
    }
    return fromEnd ? newLines.reverse() : newLines;
}
