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
var edit_js_1 = require("../templates/edit.js");
var OpenAI_js_1 = require("./OpenAI.js");
var OpenRouter = /** @class */ (function (_super) {
    __extends(OpenRouter, _super);
    function OpenRouter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Detect if the model is an Anthropic/Claude model
     */
    OpenRouter.prototype.isAnthropicModel = function (model) {
        if (!model)
            return false;
        var modelLower = model.toLowerCase();
        return modelLower.includes("claude");
    };
    /**
     * Add cache_control to message content for Anthropic models
     */
    OpenRouter.prototype.addCacheControlToContent = function (content, addCaching) {
        if (!addCaching)
            return content;
        if (typeof content === "string") {
            return [
                {
                    type: "text",
                    text: content,
                    cache_control: { type: "ephemeral" },
                },
            ];
        }
        if (Array.isArray(content)) {
            // For array content, add cache_control to the last text item
            return content.map(function (part, idx) {
                if (part.type === "text" && idx === content.length - 1) {
                    return __assign(__assign({}, part), { cache_control: { type: "ephemeral" } });
                }
                return part;
            });
        }
        return content;
    };
    /**
     * Override modifyChatBody to add Anthropic caching when appropriate
     */
    OpenRouter.prototype.modifyChatBody = function (body) {
        var _this = this;
        var _a, _b;
        // First apply parent modifications
        body = _super.prototype.modifyChatBody.call(this, body);
        // Check if we should apply Anthropic caching
        if (!this.isAnthropicModel(body.model) ||
            (!this.cacheBehavior && !this.completionOptions.promptCaching)) {
            return body;
        }
        var shouldCacheConversation = ((_a = this.cacheBehavior) === null || _a === void 0 ? void 0 : _a.cacheConversation) ||
            this.completionOptions.promptCaching;
        var shouldCacheSystemMessage = ((_b = this.cacheBehavior) === null || _b === void 0 ? void 0 : _b.cacheSystemMessage) ||
            this.completionOptions.promptCaching;
        if (!shouldCacheConversation && !shouldCacheSystemMessage) {
            return body;
        }
        // Follow the same logic as Anthropic.ts: filter out system messages first
        var filteredMessages = body.messages.filter(function (m) { return m.role !== "system" && !!m.content; });
        // Find the last two user message indices from the filtered array
        var lastTwoUserMsgIndices = filteredMessages
            .map(function (msg, index) { return (msg.role === "user" ? index : -1); })
            .filter(function (index) { return index !== -1; })
            .slice(-2);
        // Create a mapping from filtered indices to original indices
        var filteredIndex = 0;
        var filteredToOriginalIndexMap = [];
        body.messages.forEach(function (msg, originalIndex) {
            if (msg.role !== "system" && !!msg.content) {
                filteredToOriginalIndexMap[filteredIndex] = originalIndex;
                filteredIndex++;
            }
        });
        // Modify messages to add cache_control
        body.messages = body.messages.map(function (message, idx) {
            // Handle system message caching
            if (message.role === "system" && shouldCacheSystemMessage) {
                return __assign(__assign({}, message), { content: _this.addCacheControlToContent(message.content, true) });
            }
            // Handle conversation caching for last two user messages
            // Check if this message's index (in filtered array) is one of the last two user messages
            var filteredIdx = filteredToOriginalIndexMap.indexOf(idx);
            if (message.role === "user" &&
                shouldCacheConversation &&
                filteredIdx !== -1 &&
                lastTwoUserMsgIndices.includes(filteredIdx)) {
                return __assign(__assign({}, message), { content: _this.addCacheControlToContent(message.content, true) });
            }
            return message;
        });
        return body;
    };
    OpenRouter.providerName = "openrouter";
    OpenRouter.defaultOptions = {
        apiBase: "https://openrouter.ai/api/v1/",
        model: "gpt-4o-mini",
        promptTemplates: {
            edit: edit_js_1.osModelsEditPrompt,
        },
        useLegacyCompletionsEndpoint: false,
    };
    return OpenRouter;
}(OpenAI_js_1.default));
exports.default = OpenRouter;
