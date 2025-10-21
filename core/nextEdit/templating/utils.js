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
exports.insertCursorToken = insertCursorToken;
exports.insertEditableRegionTokensWithStaticRange = insertEditableRegionTokensWithStaticRange;
var constants_1 = require("../constants");
function insertCursorToken(lines, cursorPos, cursorToken) {
    if (cursorPos.line < 0 || cursorPos.line >= lines.length) {
        return lines;
    }
    // Ensure character position is within bounds or at the end of the line.
    var lineLength = lines[cursorPos.line].length;
    var charPos = Math.min(Math.max(0, cursorPos.character), lineLength);
    lines[cursorPos.line] =
        lines[cursorPos.line].slice(0, charPos) +
            cursorToken +
            lines[cursorPos.line].slice(charPos);
    return lines;
}
function insertEditableRegionTokensWithStaticRange(lines, cursorPos, editableRegionStart, editableRegionEnd) {
    if (cursorPos.line < 0 || cursorPos.line >= lines.length) {
        return lines;
    }
    // Ensure editable regions are within bounds.
    if (editableRegionStart === undefined) {
        editableRegionStart = Math.max(cursorPos.line - constants_1.NEXT_EDIT_EDITABLE_REGION_TOP_MARGIN, 0);
    }
    if (editableRegionEnd === undefined) {
        editableRegionEnd = Math.min(cursorPos.line + constants_1.NEXT_EDIT_EDITABLE_REGION_BOTTOM_MARGIN, lines.length - 1);
    }
    var instrumentedLines = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], lines.slice(0, editableRegionStart), true), [
        constants_1.INSTINCT_EDITABLE_REGION_START_TOKEN
    ], false), lines.slice(editableRegionStart, editableRegionEnd + 1), true), [
        constants_1.INSTINCT_EDITABLE_REGION_END_TOKEN
    ], false), lines.slice(editableRegionEnd + 1), true);
    return instrumentedLines;
}
