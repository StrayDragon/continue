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
exports.formatSnippets = void 0;
var uri_1 = require("../../util/uri");
var types_1 = require("../snippets/types");
var getCommentMark = function (helper) {
    return helper.lang.singleLineComment;
};
var addCommentMarks = function (text, helper) {
    var commentMark = getCommentMark(helper);
    return text
        .trim()
        .split("\n")
        .map(function (line) { return "".concat(commentMark, " ").concat(line); })
        .join("\n");
};
var formatClipboardSnippet = function (snippet, workspaceDirs) {
    return formatCodeSnippet({
        filepath: "file:///Untitled.txt",
        content: snippet.content,
        type: types_1.AutocompleteSnippetType.Code,
    }, workspaceDirs);
};
var formatCodeSnippet = function (snippet, workspaceDirs) {
    return __assign(__assign({}, snippet), { content: "Path: ".concat((0, uri_1.getLastNUriRelativePathParts)(workspaceDirs, snippet.filepath, 2), "\n").concat(snippet.content) });
};
var formatDiffSnippet = function (snippet) {
    return snippet;
};
var formatStaticSnippet = function (snippet) {
    return snippet;
};
var commentifySnippet = function (helper, snippet) {
    return __assign(__assign({}, snippet), { content: addCommentMarks(snippet.content, helper) });
};
var formatSnippets = function (helper, snippets, workspaceDirs) {
    var currentFilepathComment = addCommentMarks((0, uri_1.getLastNUriRelativePathParts)(workspaceDirs, helper.filepath, 2), helper);
    return (snippets
        .map(function (snippet) {
        switch (snippet.type) {
            case types_1.AutocompleteSnippetType.Code:
                return formatCodeSnippet(snippet, workspaceDirs);
            case types_1.AutocompleteSnippetType.Diff:
                return formatDiffSnippet(snippet);
            case types_1.AutocompleteSnippetType.Clipboard:
                return formatClipboardSnippet(snippet, workspaceDirs);
            case types_1.AutocompleteSnippetType.Static:
                return formatStaticSnippet(snippet);
        }
    })
        .map(function (item) {
        return commentifySnippet(helper, item).content;
    })
        .join("\n") + "\n".concat(currentFilepathComment));
};
exports.formatSnippets = formatSnippets;
