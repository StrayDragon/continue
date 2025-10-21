"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromptTemplateRenderer = exports.NEXT_EDIT_MODEL_TEMPLATES = void 0;
exports.getTemplateForModel = getTemplateForModel;
var handlebars_1 = require("handlebars");
var constants_1 = require("../constants");
// Keep the template registry
exports.NEXT_EDIT_MODEL_TEMPLATES = {
    "mercury-coder": {
        template: "".concat(constants_1.MERCURY_RECENTLY_VIEWED_CODE_SNIPPETS_OPEN, "\n{{{recentlyViewedCodeSnippets}}}\n").concat(constants_1.MERCURY_RECENTLY_VIEWED_CODE_SNIPPETS_CLOSE, "\n\n").concat(constants_1.MERCURY_CURRENT_FILE_CONTENT_OPEN, "\n{{{currentFileContent}}}\n").concat(constants_1.MERCURY_CURRENT_FILE_CONTENT_CLOSE, "\n\n").concat(constants_1.MERCURY_EDIT_DIFF_HISTORY_OPEN, "\n{{{editDiffHistory}}}\n").concat(constants_1.MERCURY_EDIT_DIFF_HISTORY_CLOSE, "\n"),
    },
    instinct: {
        template: "".concat(constants_1.INSTINCT_USER_PROMPT_PREFIX, "\n\n### Context:\n{{{contextSnippets}}}\n\n### User Edits:\n\n{{{editDiffHistory}}}\n\n### User Excerpt:\n{{{currentFilePath}}}\n\n{{{currentFileContent}}}```\n### Response:"),
    },
};
// Export a utility for providers to use
var PromptTemplateRenderer = /** @class */ (function () {
    function PromptTemplateRenderer(template) {
        this.compiledTemplate = handlebars_1.default.compile(template);
    }
    PromptTemplateRenderer.prototype.render = function (vars) {
        return this.compiledTemplate(vars);
    };
    return PromptTemplateRenderer;
}());
exports.PromptTemplateRenderer = PromptTemplateRenderer;
// Keep for backward compatibility or remove if not needed
function getTemplateForModel(modelName) {
    var template = exports.NEXT_EDIT_MODEL_TEMPLATES[modelName];
    if (!template) {
        throw new Error("Model ".concat(modelName, " is not supported for next edit."));
    }
    return template.template;
}
