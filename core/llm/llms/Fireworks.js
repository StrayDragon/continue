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
var Fireworks = /** @class */ (function (_super) {
    __extends(Fireworks, _super);
    function Fireworks() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Fireworks.prototype._convertModelName = function (model) {
        var _a;
        return (_a = Fireworks.modelConversion[model]) !== null && _a !== void 0 ? _a : model;
    };
    Fireworks.providerName = "fireworks";
    Fireworks.defaultOptions = {
        apiBase: "https://api.fireworks.ai/inference/v1/",
    };
    Fireworks.modelConversion = {
        "starcoder-7b": "accounts/fireworks/models/starcoder-7b",
    };
    return Fireworks;
}(OpenAI_js_1.default));
exports.default = Fireworks;
