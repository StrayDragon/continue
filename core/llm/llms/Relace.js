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
exports.Relace = void 0;
var constants_1 = require("../constants");
var OpenAI_1 = require("./OpenAI");
var Relace = /** @class */ (function (_super) {
    __extends(Relace, _super);
    function Relace() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.useOpenAIAdapterFor = ["*"];
        return _this;
    }
    Relace.prototype.supportsPrediction = function (model) {
        return true;
    };
    Relace.prototype.getConfigurationStatus = function () {
        if (!this.apiKey) {
            return constants_1.LLMConfigurationStatuses.MISSING_API_KEY;
        }
        return constants_1.LLMConfigurationStatuses.VALID;
    };
    Relace.providerName = "relace";
    Relace.defaultOptions = {
        apiBase: "https://instantapply.endpoint.relace.run/v1/",
    };
    return Relace;
}(OpenAI_1.default));
exports.Relace = Relace;
