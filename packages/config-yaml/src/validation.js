"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateConfigYaml = validateConfigYaml;
var index_js_1 = require("./schemas/index.js");
function validateConfigYaml(config) {
    var _a;
    var errors = [];
    try {
        index_js_1.configYamlSchema.parse(config);
    }
    catch (e) {
        return [
            {
                fatal: true,
                message: e.message,
            },
        ];
    }
    (_a = config.models) === null || _a === void 0 ? void 0 : _a.forEach(function (model) {
        var _a, _b, _c, _d, _e, _f, _g;
        if ("uses" in model) {
            return;
        }
        // Max tokens not too close to context length
        if (((_a = model.defaultCompletionOptions) === null || _a === void 0 ? void 0 : _a.contextLength) &&
            ((_b = model.defaultCompletionOptions) === null || _b === void 0 ? void 0 : _b.maxTokens)) {
            var difference = ((_c = model.defaultCompletionOptions) === null || _c === void 0 ? void 0 : _c.contextLength) -
                ((_d = model.defaultCompletionOptions) === null || _d === void 0 ? void 0 : _d.maxTokens);
            if (difference < 1000) {
                errors.push({
                    fatal: false,
                    message: "Model \"".concat(model.name, "\" has a contextLength of ").concat((_e = model.defaultCompletionOptions) === null || _e === void 0 ? void 0 : _e.contextLength, " and a maxTokens of ").concat((_f = model.defaultCompletionOptions) === null || _f === void 0 ? void 0 : _f.maxTokens, ". This leaves only ").concat(difference, " tokens for input context and will likely result in your inputs being truncated."),
                });
            }
        }
        if ((_g = model.roles) === null || _g === void 0 ? void 0 : _g.includes("autocomplete")) {
            var modelName_1 = model.model.toLocaleLowerCase();
            var nonAutocompleteModels = [
                // "gpt",
                // "claude",
                "mistral",
                "instruct",
            ];
            if (nonAutocompleteModels.some(function (m) { return modelName_1.includes(m); }) &&
                !modelName_1.includes("deepseek") &&
                !modelName_1.includes("codestral") &&
                !modelName_1.toLowerCase().includes("coder")) {
                errors.push({
                    fatal: false,
                    message: "".concat(model.model, " is not trained for tab-autocomplete, and will result in low-quality suggestions. See the docs to learn more about why: https://docs.continue.dev/features/tab-autocomplete#i-want-better-completions-should-i-use-gpt-4"),
                });
            }
        }
    });
    return errors;
}
