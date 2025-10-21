"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplySelectors = void 0;
var SelectorUtils_1 = require("./SelectorUtils");
var ApplySelectors = /** @class */ (function () {
    function ApplySelectors() {
    }
    ApplySelectors.getCodeblockToolbarAction = function (view, action) {
        return SelectorUtils_1.SelectorUtils.getElementByDataTestId(view, "codeblock-toolbar-".concat(action));
    };
    return ApplySelectors;
}());
exports.ApplySelectors = ApplySelectors;
