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
var edit_js_1 = require("../templates/edit.js");
var OpenAI_js_1 = require("./OpenAI.js");
var TARS = /** @class */ (function (_super) {
    __extends(TARS, _super);
    function TARS() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TARS.providerName = "tars";
    TARS.defaultOptions = {
        apiBase: "https://api.router.tetrate.ai/v1",
        model: "gpt-5-mini",
        promptTemplates: {
            edit: edit_js_1.osModelsEditPrompt,
        },
        useLegacyCompletionsEndpoint: false,
    };
    return TARS;
}(OpenAI_js_1.default));
exports.default = TARS;
