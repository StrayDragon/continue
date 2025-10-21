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
var OpenAI_js_1 = require("./OpenAI.js");
var Cerebras = /** @class */ (function (_super) {
    __extends(Cerebras, _super);
    function Cerebras(options) {
        var _this = _super.call(this, options) || this;
        _this.maxStopWords = 4;
        // Set context length based on whether the model is the free version
        if (options.model === "qwen-3-coder-480b-free") {
            _this._contextLength = 64000;
        }
        else if (options.model === "qwen-3-coder-480b") {
            _this._contextLength = 128000;
        }
        return _this;
    }
    Cerebras.prototype.filterThinkingTags = function (content) {
        // Remove <thinking>...</thinking> tags (including multiline)
        return content.replace(/<thinking>[\s\S]*?<\/thinking>/gi, "").trim();
    };
    Cerebras.prototype.filterThinkingFromMessages = function (messages) {
        var _this = this;
        return messages.map(function (message) {
            if (typeof message.content === "string") {
                return __assign(__assign({}, message), { content: _this.filterThinkingTags(message.content) });
            }
            else if (Array.isArray(message.content)) {
                return __assign(__assign({}, message), { content: message.content.map(function (part) {
                        if (part.type === "text" && typeof part.text === "string") {
                            return __assign(__assign({}, part), { text: _this.filterThinkingTags(part.text) });
                        }
                        return part;
                    }) });
            }
            return message;
        });
    };
    Cerebras.prototype._convertArgs = function (options, messages) {
        // Filter thinking tags from messages before processing
        var filteredMessages = this.filterThinkingFromMessages(messages);
        return _super.prototype._convertArgs.call(this, options, filteredMessages);
    };
    Cerebras.prototype._convertModelName = function (model) {
        var _a;
        return (_a = Cerebras.modelConversion[model]) !== null && _a !== void 0 ? _a : model;
    };
    Cerebras.providerName = "cerebras";
    Cerebras.defaultOptions = {
        apiBase: "https://api.cerebras.ai/v1/",
    };
    Cerebras.modelConversion = {
        "qwen-3-coder-480b-free": "qwen-3-coder-480b", // Maps free version to base model
        "qwen-3-coder-480b": "qwen-3-coder-480b",
        "qwen-3-235b-a22b-instruct-2507": "qwen-3-235b-a22b-instruct-2507",
        "llama-3.3-70b": "llama-3.3-70b",
        "qwen-3-32b": "qwen-3-32b",
        "qwen-3-235b-a22b-thinking-2507": "qwen-3-235b-a22b-thinking-2507",
    };
    return Cerebras;
}(OpenAI_js_1.default));
exports.default = Cerebras;
