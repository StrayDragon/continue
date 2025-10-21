"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NextEditProviderFactory = void 0;
var constants_js_1 = require("../llm/constants.js");
var InstinctNextEditProvider_js_1 = require("./providers/InstinctNextEditProvider.js");
var MercuryCoderNextEditProvider_js_1 = require("./providers/MercuryCoderNextEditProvider.js");
var NextEditProviderFactory = /** @class */ (function () {
    function NextEditProviderFactory() {
    }
    NextEditProviderFactory.createProvider = function (modelName) {
        if (modelName.includes(constants_js_1.NEXT_EDIT_MODELS.MERCURY_CODER)) {
            return new MercuryCoderNextEditProvider_js_1.MercuryCoderProvider();
        }
        else if (modelName.includes(constants_js_1.NEXT_EDIT_MODELS.INSTINCT)) {
            return new InstinctNextEditProvider_js_1.InstinctProvider();
        }
        else {
            throw new Error("Unsupported model: ".concat(modelName));
        }
    };
    return NextEditProviderFactory;
}());
exports.NextEditProviderFactory = NextEditProviderFactory;
