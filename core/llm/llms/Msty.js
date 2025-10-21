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
var Ollama_js_1 = require("./Ollama.js");
var Msty = /** @class */ (function (_super) {
    __extends(Msty, _super);
    function Msty() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Msty.providerName = "msty";
    Msty.defaultOptions = {
        apiBase: "http://localhost:10000",
        model: "codellama-7b",
    };
    return Msty;
}(Ollama_js_1.default));
exports.default = Msty;
