"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var OpenAI_1 = require("./OpenAI");
var Scaleway = /** @class */ (function (_super) {
    __extends(Scaleway, _super);
    function Scaleway() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Scaleway.prototype._convertModelName = function (model) {
        return Scaleway.MODEL_IDS[model] || this.model;
    };
    Scaleway.prototype._convertArgs = function (options, messages) {
        // Convert model name in the options before passing to parent
        var modifiedOptions = __assign(__assign({}, options), { model: this._convertModelName(options.model) });
        return _super.prototype._convertArgs.call(this, modifiedOptions, messages);
    };
    Scaleway.providerName = "scaleway";
    Scaleway.defaultOptions = {
        apiBase: "https://api.scaleway.ai/v1/",
        model: "qwen3-coder-30b-a3b-instruct",
        useLegacyCompletionsEndpoint: false,
    };
    Scaleway.MODEL_IDS = {
        "llama3.1-8b": "llama-3.1-8b-instruct",
        "llama3.3-70b": "llama-3.3-70b-instruct",
        "pixtral-12b": "pixtral-12b-2409",
        "mistral-small3.1": "mistral-small-3.1-24b-instruct-2503",
        "mistral-small3.2": "mistral-small-3.2-24b-instruct-2506",
        "devstral-small": "devstral-small-2505",
        "deepseek-r1-distill-llama-70b": "deepseek-r1-distill-llama-70b",
        "qwen2.5-coder-32b": "qwen2.5-coder-32b-instruct",
        "qwen3-coder-30b-a3b": "qwen3-coder-30b-a3b-instruct",
        "qwen3-235b-a22b": "qwen3-235b-a22b-instruct-2507",
        "gemma-3-27b": "gemma-3-27b-it",
        "gpt-oss-120b": "gpt-oss-120b",
    };
    return Scaleway;
}(OpenAI_1.default));
exports.default = Scaleway;
