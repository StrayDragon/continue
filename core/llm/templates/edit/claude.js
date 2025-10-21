"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.claudeEditPrompt = void 0;
var claudeEditPrompt = function (_, otherData) {
    var _a, _b, _c;
    if (((_a = otherData === null || otherData === void 0 ? void 0 : otherData.codeToEdit) === null || _a === void 0 ? void 0 : _a.trim().length) === 0) {
        return "```".concat(otherData.language, "\n").concat(otherData.prefix, "[BLANK]").concat(otherData.codeToEdit).concat(otherData.suffix, "\n```\n\nAbove is the file of code that the user is currently editing in. Their cursor is located at the \"[BLANK]\". They have requested that you fill in the \"[BLANK]\" with code that satisfies the following request:\n\n\"").concat(otherData.userInput, "\"\n\nPlease generate this code. Your output will be only the code that should replace the \"[BLANK]\", without repeating any of the prefix or suffix, without any natural language explanation, and without messing up indentation. Here is the code that will replace the \"[BLANK]\":");
    }
    var paragraphs = [
        "The user has requested a section of code in a file to be rewritten.",
    ];
    if (((_b = otherData.prefix) === null || _b === void 0 ? void 0 : _b.trim().length) > 0) {
        paragraphs.push("This is the prefix of the file:\n```".concat(otherData.language, "\n").concat(otherData.prefix, "\n```"));
    }
    if (((_c = otherData.suffix) === null || _c === void 0 ? void 0 : _c.trim().length) > 0) {
        paragraphs.push("This is the suffix of the file:\n```".concat(otherData.language, "\n").concat(otherData.suffix, "\n```"));
    }
    paragraphs.push("This is the code to rewrite:\n```".concat(otherData.language, "\n").concat(otherData.codeToEdit, "\n```\n\nThe user's request is: \"").concat(otherData.userInput, "\"\n\nHere is the rewritten code:"));
    return paragraphs.join("\n\n");
};
exports.claudeEditPrompt = claudeEditPrompt;
