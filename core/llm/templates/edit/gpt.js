"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultApplyPrompt = exports.gptEditPrompt = void 0;
var util_1 = require("../../../util");
var gptInsertionEditPrompt = function (_, otherData) {
    return (0, util_1.dedent)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    ```", "\n    ", "[BLANK]", "", "\n    ```\n\n    Above is the file of code that the user is currently editing in. Their cursor is located at the \"[BLANK]\". They have requested that you fill in the \"[BLANK]\" with code that satisfies the following request:\n\n    \"", "\"\n\n    Please generate this code. Your output will be only the code that should replace the \"[BLANK]\", without repeating any of the prefix or suffix, without any natural language explanation, and without messing up indentation. Here is the code that will replace the \"[BLANK]\":"], ["\n    \\`\\`\\`", "\n    ", "[BLANK]", "", "\n    \\`\\`\\`\n\n    Above is the file of code that the user is currently editing in. Their cursor is located at the \"[BLANK]\". They have requested that you fill in the \"[BLANK]\" with code that satisfies the following request:\n\n    \"", "\"\n\n    Please generate this code. Your output will be only the code that should replace the \"[BLANK]\", without repeating any of the prefix or suffix, without any natural language explanation, and without messing up indentation. Here is the code that will replace the \"[BLANK]\":"])), otherData.language, otherData.prefix, otherData.codeToEdit, otherData.suffix, otherData.userInput);
};
var gptFullFileEditPrompt = function (_, otherData) {
    return (0, util_1.dedent)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    ```", "\n    ", "\n    ```\n\n    Please rewrite the above file to address the following request:\n\n    ", "\n\n    You should rewrite the entire file without any natural language explanation. DO NOT surround the code in a code block and DO NOT explain yourself."], ["\n    \\`\\`\\`", "\n    ", "\n    \\`\\`\\`\n\n    Please rewrite the above file to address the following request:\n\n    ", "\n\n    You should rewrite the entire file without any natural language explanation. DO NOT surround the code in a code block and DO NOT explain yourself."])), otherData.language, otherData.codeToEdit, otherData.userInput);
};
var gptEditPrompt = function (history, otherData) {
    var _a, _b, _c, _d, _e;
    if (((_a = otherData === null || otherData === void 0 ? void 0 : otherData.codeToEdit) === null || _a === void 0 ? void 0 : _a.trim().length) === 0) {
        return gptInsertionEditPrompt(history, otherData);
    }
    else if (((_b = otherData === null || otherData === void 0 ? void 0 : otherData.prefix) === null || _b === void 0 ? void 0 : _b.trim().length) === 0 &&
        ((_c = otherData === null || otherData === void 0 ? void 0 : otherData.suffix) === null || _c === void 0 ? void 0 : _c.trim().length) === 0) {
        return gptFullFileEditPrompt(history, otherData);
    }
    var paragraphs = [
        "The user has requested a section of code in a file to be rewritten.",
    ];
    if (((_d = otherData.prefix) === null || _d === void 0 ? void 0 : _d.trim().length) > 0) {
        paragraphs.push((0, util_1.dedent)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n        This is the prefix of the file:\n        ```", "\n        ", "\n        ```"], ["\n        This is the prefix of the file:\n        \\`\\`\\`", "\n        ", "\n        \\`\\`\\`"])), otherData.language, otherData.prefix));
    }
    if (((_e = otherData.suffix) === null || _e === void 0 ? void 0 : _e.trim().length) > 0) {
        paragraphs.push((0, util_1.dedent)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n        This is the suffix of the file:\n        ```", "\n        ", "\n        ```"], ["\n        This is the suffix of the file:\n        \\`\\`\\`", "\n        ", "\n        \\`\\`\\`"])), otherData.language, otherData.suffix));
    }
    paragraphs.push((0, util_1.dedent)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n        This is the code to rewrite:\n        ```", "\n        ", "\n        ```\n\n        The user's request is: \"", "\"\n        \n        DO NOT output any natural language, only output the code changes.\n\n        Here is the rewritten code:"], ["\n        This is the code to rewrite:\n        \\`\\`\\`", "\n        ", "\n        \\`\\`\\`\n\n        The user's request is: \"", "\"\n        \n        DO NOT output any natural language, only output the code changes.\n\n        Here is the rewritten code:"])), otherData.language, otherData.codeToEdit, otherData.userInput));
    return paragraphs.join("\n\n");
};
exports.gptEditPrompt = gptEditPrompt;
var defaultApplyPrompt = function (history, otherData) {
    return "".concat(otherData.original_code, "\n\nThe following code was suggested as an edit:\n```\n").concat(otherData.new_code, "\n```\nPlease apply it to the previous code.");
};
exports.defaultApplyPrompt = defaultApplyPrompt;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
