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
var OpenAI_1 = require("./OpenAI");
var Kindo = /** @class */ (function (_super) {
    __extends(Kindo, _super);
    function Kindo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Kindo.providerName = "kindo";
    Kindo.defaultOptions = {
        apiBase: "https://llm.kindo.ai/v1/",
        requestOptions: {
            headers: {
                "kindo-token-transaction-type": "CONTINUE",
            },
        },
    };
    return Kindo;
}(OpenAI_1.default));
exports.default = Kindo;
