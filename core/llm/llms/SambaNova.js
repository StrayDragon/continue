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
Object.defineProperty(exports, "__esModule", { value: true });
var OpenAI_js_1 = require("./OpenAI.js");
var SambaNova = /** @class */ (function (_super) {
    __extends(SambaNova, _super);
    function SambaNova() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SambaNova.prototype._convertModelName = function (model) {
        return SambaNova.MODEL_IDS[model] || this.model;
    };
    SambaNova.providerName = "sambanova";
    SambaNova.defaultOptions = {
        apiBase: "https://api.sambanova.ai/v1/",
    };
    SambaNova.MODEL_IDS = {
        "llama4-maverick": "Llama-4-Maverick-17B-128E-Instruct",
        "llama3.3-70b": "Meta-Llama-3.3-70B-Instruct",
        "llama3.3-swalllow-70b": "Llama-3.3-Swallow-70B-Instruct-v0.4",
        "llama3.1-8b": "Meta-Llama-3.1-8B-Instruct",
        "deepseek-r1-distill-llama-70b": "DeepSeek-R1-Distill-Llama-70B",
        "deepseek-r1": "DeepSeek-R1",
        "deepseek-v3": "DeepSeek-V3-0324",
        "deepseek-v3.1": "DeepSeek-V3-0324",
        "gpt-oss-120b": "gpt-oss-120b",
        "qwen3-32b": "Qwen3-32B",
    };
    return SambaNova;
}(OpenAI_js_1.default));
exports.default = SambaNova;
