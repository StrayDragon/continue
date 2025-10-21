"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditSelectors = void 0;
var SelectorUtils_1 = require("./SelectorUtils");
var EditSelectors = /** @class */ (function () {
    function EditSelectors() {
    }
    EditSelectors.getEditAcceptButton = function (view) {
        return SelectorUtils_1.SelectorUtils.getElementByDataTestId(view, "edit-accept-button");
    };
    EditSelectors.getEditRejectButton = function (view) {
        return SelectorUtils_1.SelectorUtils.getElementByDataTestId(view, "edit-reject-button");
    };
    return EditSelectors;
}());
exports.EditSelectors = EditSelectors;
