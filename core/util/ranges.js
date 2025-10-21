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
exports.getRangeInString = getRangeInString;
exports.intersection = intersection;
exports.union = union;
exports.maxPosition = maxPosition;
exports.minPosition = minPosition;
function getRangeInString(content, range) {
    var _a, _b, _c, _d, _e, _f;
    var lines = content.split("\n");
    if (range.start.line === range.end.line) {
        return ((_b = (_a = lines[range.start.line]) === null || _a === void 0 ? void 0 : _a.substring(range.start.character, range.end.character)) !== null && _b !== void 0 ? _b : "");
    }
    var firstLine = (_d = (_c = lines[range.start.line]) === null || _c === void 0 ? void 0 : _c.substring(range.start.character, lines[range.start.line].length)) !== null && _d !== void 0 ? _d : "";
    var middleLines = lines.slice(range.start.line + 1, range.end.line);
    var lastLine = (_f = (_e = lines[range.end.line]) === null || _e === void 0 ? void 0 : _e.substring(0, range.end.character)) !== null && _f !== void 0 ? _f : "";
    return __spreadArray(__spreadArray([firstLine], middleLines, true), [lastLine], false).join("\n");
}
function intersection(a, b) {
    var startLine = Math.max(a.start.line, b.start.line);
    var endLine = Math.min(a.end.line, b.end.line);
    if (startLine > endLine) {
        return null;
    }
    if (startLine === endLine) {
        var startCharacter_1 = Math.max(a.start.character, b.start.character);
        var endCharacter_1 = Math.min(a.end.character, b.end.character);
        if (startCharacter_1 > endCharacter_1) {
            return null;
        }
        return {
            start: { line: startLine, character: startCharacter_1 },
            end: { line: endLine, character: endCharacter_1 },
        };
    }
    var startCharacter = startLine === a.start.line ? a.start.character : b.start.character;
    var endCharacter = endLine === a.end.line ? a.end.character : b.end.character;
    return {
        start: { line: startLine, character: startCharacter },
        end: { line: endLine, character: endCharacter },
    };
}
function union(a, b) {
    var start;
    if (a.start.line === b.start.line) {
        start = {
            line: a.start.line,
            character: Math.min(a.start.character, b.start.character),
        };
    }
    else if (a.start.line < b.start.line)
        start = a.start;
    else
        start = b.start;
    var end;
    if (a.end.line === b.end.line) {
        end = {
            line: a.end.line,
            character: Math.max(a.end.character, b.end.character),
        };
    }
    else if (a.end.line > b.end.line)
        end = a.end;
    else
        end = b.end;
    return {
        start: start,
        end: end,
    };
}
function maxPosition(a, b) {
    if (a.line > b.line) {
        return a;
    }
    else if (a.line < b.line) {
        return b;
    }
    else {
        return a.character > b.character ? a : b;
    }
}
function minPosition(a, b) {
    if (a.line < b.line) {
        return a;
    }
    else if (a.line > b.line) {
        return b;
    }
    else {
        return a.character < b.character ? a : b;
    }
}
