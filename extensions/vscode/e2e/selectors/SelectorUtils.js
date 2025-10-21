"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectorUtils = void 0;
var vscode_extension_tester_1 = require("vscode-extension-tester");
var SelectorUtils = /** @class */ (function () {
    function SelectorUtils() {
    }
    /**
     * Finds a web element by its data-testid attribute within a WebView.
     * @param view - The WebView to search within.
     * @param testId - The data-testid value to search for.
     * @returns A promise that resolves to the WebElement found.
     */
    SelectorUtils.getElementByDataTestId = function (view, testId) {
        return view.findWebElement(vscode_extension_tester_1.By.css("[data-testid='".concat(testId, "']")));
    };
    /**
     * Finds a web element by its aria-label attribute within a WebView.
     * @param view - The WebView to search within.
     * @param ariaLabel - The aria-label value to search for.
     * @returns A promise that resolves to the WebElement found.
     */
    SelectorUtils.getElementByAriaLabel = function (view, ariaLabel) {
        return view.findWebElement(vscode_extension_tester_1.By.css("[aria-label='".concat(ariaLabel, "']")));
    };
    SelectorUtils.getElementByClassName = function (driver, className) {
        return driver.findElement(
        // By.xpath("//*[contains(@class, 'ced-') and matches(@class, 'ced-2-TextEditorDecorationType[0-9]+-4')]")
        vscode_extension_tester_1.By.css("*[class*='".concat(className, "']")));
    };
    return SelectorUtils;
}());
exports.SelectorUtils = SelectorUtils;
