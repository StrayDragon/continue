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
var Azure = /** @class */ (function (_super) {
    __extends(Azure, _super);
    function Azure(options) {
        var _a;
        var _this = _super.call(this, options) || this;
        _this.useOpenAIAdapterFor = [];
        _this.deployment = (_a = options.deployment) !== null && _a !== void 0 ? _a : options.model;
        return _this;
    }
    Azure.prototype.supportsPrediction = function (model) {
        return false;
    };
    Azure.providerName = "azure";
    Azure.defaultOptions = {
        apiVersion: "2024-02-15-preview",
        apiType: "azure-openai",
    };
    return Azure;
}(OpenAI_js_1.default));
exports.default = Azure;
