"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GUISelectors = void 0;
var vscode_extension_tester_1 = require("vscode-extension-tester");
var SelectorUtils_1 = require("./SelectorUtils");
var GUISelectors = /** @class */ (function () {
    function GUISelectors() {
    }
    GUISelectors.getDescription = function (view) {
        return view.findWebElement(vscode_extension_tester_1.By.xpath("//*[contains(text(), 'quickly')]"));
    };
    GUISelectors.getMessageInputFields = function (view) {
        return view.findWebElements(vscode_extension_tester_1.By.className("tiptap"));
    };
    GUISelectors.getMessageInputFieldAtIndex = function (view, index) {
        return __awaiter(this, void 0, void 0, function () {
            var elements;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getMessageInputFields(view)];
                    case 1:
                        elements = _a.sent();
                        return [2 /*return*/, elements[index]];
                }
            });
        });
    };
    GUISelectors.getAllIframes = function (driver) {
        return driver.findElements(vscode_extension_tester_1.By.css("iframe"));
    };
    GUISelectors.getReactIframe = function (driver) {
        return driver.findElement(vscode_extension_tester_1.By.css("iframe"));
    };
    GUISelectors.getSubmitInputButton = function (view) {
        return SelectorUtils_1.SelectorUtils.getElementByDataTestId(view, "submit-input-button");
    };
    GUISelectors.getAcceptToolCallButton = function (view) {
        return view.findWebElement(vscode_extension_tester_1.By.css("[data-testid*='accept-tool-call-button']"));
    };
    GUISelectors.getRejectToolCallButton = function (view) {
        return view.findWebElement(vscode_extension_tester_1.By.css("[data-testid*='reject-tool-call-button']"));
    };
    GUISelectors.getToolCallStatusMessage = function (view) {
        return SelectorUtils_1.SelectorUtils.getElementByDataTestId(view, "tool-call-title");
    };
    GUISelectors.getToolsTab = function (view) {
        return SelectorUtils_1.SelectorUtils.getElementByDataTestId(view, "tab-tools");
    };
    GUISelectors.getBackButton = function (view) {
        return SelectorUtils_1.SelectorUtils.getElementByDataTestId(view, "tab-back");
    };
    GUISelectors.getToolPolicyButton = function (view, toolName) {
        return SelectorUtils_1.SelectorUtils.getElementByDataTestId(view, "tool-policy-item-".concat(toolName));
    };
    GUISelectors.getModelDropdownButton = function (view) {
        return SelectorUtils_1.SelectorUtils.getElementByDataTestId(view, "model-select-button");
    };
    GUISelectors.getModeDropdownButton = function (view) {
        return SelectorUtils_1.SelectorUtils.getElementByDataTestId(view, "mode-select-button");
    };
    GUISelectors.getFirstContextProviderDropdownItem = function (view) {
        return SelectorUtils_1.SelectorUtils.getElementByDataTestId(view, "context-provider-dropdown-item");
    };
    GUISelectors.getContextItemsPeek = function (view) {
        return SelectorUtils_1.SelectorUtils.getElementByDataTestId(view, "context-items-peek");
    };
    GUISelectors.getFirstContextItemsPeekItem = function (view) {
        return SelectorUtils_1.SelectorUtils.getElementByDataTestId(view, "context-items-peek-item");
    };
    GUISelectors.getRulesPeek = function (view) {
        return SelectorUtils_1.SelectorUtils.getElementByDataTestId(view, "rules-peek");
    };
    GUISelectors.getFirstRulesPeekItem = function (view) {
        return SelectorUtils_1.SelectorUtils.getElementByDataTestId(view, "rules-peek-item");
    };
    GUISelectors.getNthHistoryTableRow = function (view, index) {
        return SelectorUtils_1.SelectorUtils.getElementByDataTestId(view, "history-row-".concat(index));
    };
    GUISelectors.getNthMessageDeleteButton = function (view, index) {
        return SelectorUtils_1.SelectorUtils.getElementByDataTestId(view, "delete-button-".concat(index));
    };
    GUISelectors.getModelDropdownOption = function (view, option) {
        return view.findWebElement(vscode_extension_tester_1.By.xpath("//*[@role=\"listbox\"]//*[contains(text(), \"".concat(option, "\")]")));
    };
    GUISelectors.getModeDropdownOption = function (view, option) {
        return view.findWebElement(vscode_extension_tester_1.By.xpath("//*[@role=\"listbox\"]//*[contains(text(), \"".concat(option, "\")]")));
    };
    GUISelectors.getOnboardingTabButton = function (view, title) {
        return SelectorUtils_1.SelectorUtils.getElementByDataTestId(view, "onboarding-tab-".concat(title));
    };
    GUISelectors.getBestChatApiKeyInput = function (view) {
        return SelectorUtils_1.SelectorUtils.getElementByDataTestId(view, "best-chat-api-key-input");
    };
    GUISelectors.getBestAutocompleteApiKeyInput = function (view) {
        return SelectorUtils_1.SelectorUtils.getElementByDataTestId(view, "best-autocomplete-api-key-input");
    };
    GUISelectors.getTutorialCard = function (view) {
        return SelectorUtils_1.SelectorUtils.getElementByDataTestId(view, "tutorial-card");
    };
    GUISelectors.getThreadMessageByText = function (view, text) {
        return view.findWebElement(vscode_extension_tester_1.By.xpath("//*[@class=\"thread-message\"]//*[contains(text(), \"".concat(text, "\")]")));
    };
    GUISelectors.getHistoryNavButton = function (view) {
        return SelectorUtils_1.SelectorUtils.getElementByAriaLabel(view, "View History");
    };
    GUISelectors.getSettingsNavButton = function (view) {
        return SelectorUtils_1.SelectorUtils.getElementByAriaLabel(view, "Open Settings");
    };
    GUISelectors.getNewSessionNavButton = function (view) {
        return SelectorUtils_1.SelectorUtils.getElementByAriaLabel(view, "New Session");
    };
    GUISelectors.getInputBoxCodeBlockAtIndex = function (view, index) {
        return __awaiter(this, void 0, void 0, function () {
            var firstInputField, codeBlockElement;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getMessageInputFieldAtIndex(view, index)];
                    case 1:
                        firstInputField = _a.sent();
                        return [4 /*yield*/, firstInputField.findElement(vscode_extension_tester_1.By.xpath(".//code"))];
                    case 2:
                        codeBlockElement = _a.sent();
                        return [2 /*return*/, codeBlockElement];
                }
            });
        });
    };
    GUISelectors.getContinueExtensionBadge = function (view) {
        return SelectorUtils_1.SelectorUtils.getElementByAriaLabel(view, "Continue");
    };
    return GUISelectors;
}());
exports.GUISelectors = GUISelectors;
