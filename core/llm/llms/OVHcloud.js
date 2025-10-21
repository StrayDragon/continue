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
exports.OVHcloud = void 0;
var OpenAI_js_1 = require("./OpenAI.js");
var OVHcloud = /** @class */ (function (_super) {
    __extends(OVHcloud, _super);
    function OVHcloud() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OVHcloud.prototype._convertModelName = function (model) {
        return OVHcloud.MODEL_IDS[model] || this.model;
    };
    OVHcloud.prototype._convertArgs = function (options, messages) {
        var modifiedOptions = __assign(__assign({}, options), { model: this._convertModelName(options.model) });
        return _super.prototype._convertArgs.call(this, modifiedOptions, messages);
    };
    OVHcloud.providerName = "ovhcloud";
    OVHcloud.defaultOptions = {
        apiBase: "https://oai.endpoints.kepler.ai.cloud.ovh.net/v1/",
        model: "Qwen2.5-Coder-32B-Instruct",
        useLegacyCompletionsEndpoint: false,
    };
    OVHcloud.MODEL_IDS = {
        "llama3.1-8b": "Llama-3.1-8B-Instruct",
        "llama3.1-70b": "Meta-Llama-3_1-70B-Instruct",
        "llama3.3-70b": "Meta-Llama-3_3-70B-Instruct",
        "qwen2.5-coder-32b": "Qwen2.5-Coder-32B-Instruct",
        "codestral-mamba-latest": "mamba-codestral-7B-v0.1",
        "mistral-7b": "Mistral-7B-Instruct-v0.3",
        "mistral-8x7b": "Mixtral-8x7B-Instruct-v0.1",
        "mistral-nemo": "Mistral-Nemo-Instruct-2407",
        "DeepSeek-R1-Distill-Llama-70B": "DeepSeek-R1-Distill-Llama-70B",
    };
    return OVHcloud;
}(OpenAI_js_1.default));
exports.OVHcloud = OVHcloud;
exports.default = OVHcloud;
