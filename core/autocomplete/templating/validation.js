"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidSnippet = void 0;
var types_1 = require("../snippets/types");
var MAX_CLIPBOARD_AGE = 5 * 60 * 1000;
var isValidClipboardSnippet = function (snippet) {
    var currDate = new Date();
    var isTooOld = currDate.getTime() - new Date(snippet.copiedAt).getTime() >
        MAX_CLIPBOARD_AGE;
    return !isTooOld;
};
var isValidSnippet = function (snippet) {
    var _a;
    if (snippet.content.trim() === "")
        return false;
    if (snippet.type === types_1.AutocompleteSnippetType.Clipboard) {
        return isValidClipboardSnippet(snippet);
    }
    if ((_a = snippet.filepath) === null || _a === void 0 ? void 0 : _a.startsWith("output:extension-output-Continue.continue")) {
        return false;
    }
    return true;
};
exports.isValidSnippet = isValidSnippet;
