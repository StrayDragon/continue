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
exports.OpenRouterApi = void 0;
var OpenAI_js_1 = require("./OpenAI.js");
var OpenRouterCaching_js_1 = require("./OpenRouterCaching.js");
var OpenRouterApi = /** @class */ (function (_super) {
    __extends(OpenRouterApi, _super);
    function OpenRouterApi(config) {
        var _a;
        return _super.call(this, __assign(__assign({}, config), { apiBase: (_a = config.apiBase) !== null && _a !== void 0 ? _a : "https://openrouter.ai/api/v1/" })) || this;
    }
    OpenRouterApi.prototype.isAnthropicModel = function (model) {
        if (!model) {
            return false;
        }
        var modelLower = model.toLowerCase();
        return modelLower.includes("claude");
    };
    OpenRouterApi.prototype.modifyChatBody = function (body) {
        var _a;
        var modifiedBody = _super.prototype.modifyChatBody.call(this, body);
        if (!this.isAnthropicModel(modifiedBody.model)) {
            return modifiedBody;
        }
        (0, OpenRouterCaching_js_1.applyAnthropicCachingToOpenRouterBody)(modifiedBody, (_a = this.config.cachingStrategy) !== null && _a !== void 0 ? _a : "systemAndTools");
        return modifiedBody;
    };
    return OpenRouterApi;
}(OpenAI_js_1.OpenAIApi));
exports.OpenRouterApi = OpenRouterApi;
exports.default = OpenRouterApi;
