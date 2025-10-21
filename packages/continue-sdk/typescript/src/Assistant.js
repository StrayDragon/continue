"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Assistant = void 0;
/**
 * Class that wraps an assistant configuration with utility methods
 */
var Assistant = /** @class */ (function () {
    /**
     * Create a new Assistant instance
     *
     * @param config - The raw assistant configuration
     */
    function Assistant(config) {
        this.config = config;
    }
    /**
     * Get a model from the assistant by name
     *
     * @param modelName - The name of the model to find
     * @returns The model configuration or the first model if no name is provided
     */
    Assistant.prototype.getModel = function (modelName) {
        var _a, _b;
        var firstModel = (_b = (_a = this.config) === null || _a === void 0 ? void 0 : _a.models) === null || _b === void 0 ? void 0 : _b[0];
        if (!this.config.models || !firstModel) {
            throw new Error("No models available in assistant configuration");
        }
        if (!modelName) {
            return firstModel.model;
        }
        // Look for a model matching the provided name
        var model = this.config.models.find(function (m) {
            return (m === null || m === void 0 ? void 0 : m.model) === modelName ||
                (m === null || m === void 0 ? void 0 : m.model.includes(modelName)) ||
                (m === null || m === void 0 ? void 0 : m.model.endsWith("/".concat(modelName)));
        });
        if (!model) {
            throw new Error("Model ".concat(modelName, " not found in assistant configuration"));
        }
        return model.model;
    };
    Object.defineProperty(Assistant.prototype, "systemMessage", {
        /**
         * Get the system message from the assistant rules
         *
         * @returns The concatenated rules as a single string
         */
        get: function () {
            var _a;
            if (!this.config.rules || !Array.isArray(this.config.rules)) {
                return "";
            }
            return (_a = this.config.rules) === null || _a === void 0 ? void 0 : _a.filter(function (rule) { return !!rule; }).map(function (rule) { return (typeof rule === "string" ? rule : rule === null || rule === void 0 ? void 0 : rule.rule); }).join("\n");
        },
        enumerable: false,
        configurable: true
    });
    return Assistant;
}());
exports.Assistant = Assistant;
