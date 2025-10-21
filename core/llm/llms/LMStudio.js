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
var LMStudio = /** @class */ (function (_super) {
    __extends(LMStudio, _super);
    function LMStudio() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LMStudio.providerName = "lmstudio";
    LMStudio.defaultOptions = {
        apiBase: "http://localhost:1234/v1/",
    };
    return LMStudio;
}(OpenAI_js_1.default));
exports.default = LMStudio;
