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
var Lemonade = /** @class */ (function (_super) {
    __extends(Lemonade, _super);
    function Lemonade() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Lemonade.providerName = "lemonade";
    Lemonade.defaultOptions = {
        apiBase: "http://localhost:8000/api/v1/",
    };
    return Lemonade;
}(OpenAI_js_1.default));
exports.default = Lemonade;
