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
var Groq = /** @class */ (function (_super) {
    __extends(Groq, _super);
    function Groq() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.maxStopWords = 4;
        return _this;
    }
    Groq.prototype._convertModelName = function (model) {
        var _a;
        return (_a = Groq.modelConversion[model]) !== null && _a !== void 0 ? _a : model;
    };
    Groq.providerName = "groq";
    Groq.defaultOptions = {
        apiBase: "https://api.groq.com/openai/v1/",
    };
    Groq.modelConversion = {
        "mistral-8x7b": "mixtral-8x7b-32768",
        gemma2: "gemma2-9b-it",
        "llama3-8b": "llama3-8b-8192",
        "llama3-70b": "llama3-70b-8192",
        "llama3.1-8b": "llama-3.1-8b-instant",
        "llama3.2-1b": "llama-3.2-1b-preview",
        "llama3.2-3b": "llama-3.2-3b-preview",
        "llama3.2-11b": "llama-3.2-11b-vision-preview",
        "llama3.2-90b": "llama-3.2-90b-vision-preview",
        "llama3.3-70b": "llama-3.3-70b-versatile",
    };
    return Groq;
}(OpenAI_js_1.default));
exports.default = Groq;
