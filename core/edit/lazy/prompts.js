"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UNCHANGED_CODE = void 0;
exports.lazyApplyPromptForModel = lazyApplyPromptForModel;
var util_1 = require("../../util");
exports.UNCHANGED_CODE = "UNCHANGED CODE";
var RULES = [
    "Your response should be a code block containing a rewritten version of the file.",
    "Whenever any part of the code is the same as before, you may simply indicate this with a comment that says \"".concat(exports.UNCHANGED_CODE, "\" instead of rewriting."),
    "You must keep at least one line above and below from the original code, so that we can identify what the previous code was.",
    "Do not place miscellaneous \"".concat(exports.UNCHANGED_CODE, "\" comments at the top or bottom of the file when there is nothing to replace them."),
    // `You should write "${UNCHANGED_CODE}" at least for each function that is unchanged, rather than grouping them into a single comment.`,
    // `You should lean toward using a smaller number of these comments rather than rewriting it for every function if all of them are unchanged.`,
    // `You may do this for imports as well if needed.`,
    // `Do not explain your changes either before or after the code block.`,
    "The code should always be syntactically valid, even with the comments.",
];
function claude35SonnetLazyApplyPrompt() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var userContent = (0, util_1.dedent)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    ORIGINAL CODE:\n    ```", "\n    ", "\n    ```\n\n    NEW CODE:\n    ```\n    ", "\n    ```\n\n    Above is a code block containing the original version of a file (ORIGINAL CODE) and below it is a code snippet (NEW CODE) that was suggested as modification to the original file. Your task is to apply the NEW CODE to the ORIGINAL CODE and show what the entire file would look like after it is applied.\n    - ", "\n  "], ["\n    ORIGINAL CODE:\n    \\`\\`\\`", "\n    ", "\n    \\`\\`\\`\n\n    NEW CODE:\n    \\`\\`\\`\n    ", "\n    \\`\\`\\`\n\n    Above is a code block containing the original version of a file (ORIGINAL CODE) and below it is a code snippet (NEW CODE) that was suggested as modification to the original file. Your task is to apply the NEW CODE to the ORIGINAL CODE and show what the entire file would look like after it is applied.\n    - ", "\n  "])), args[1], args[0], args[2], RULES.join("\n- "));
    var assistantContent = (0, util_1.dedent)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    Sure! Here's the modified version of the file after applying the new code:\n    ```", "\n  "], ["\n    Sure! Here's the modified version of the file after applying the new code:\n    \\`\\`\\`", "\n  "])), args[1]);
    return [
        { role: "user", content: userContent },
        { role: "assistant", content: assistantContent },
    ];
}
function lazyApplyPromptForModel(model, provider) {
    if (model.includes("sonnet")) {
        return claude35SonnetLazyApplyPrompt;
    }
    return undefined;
}
var templateObject_1, templateObject_2;
