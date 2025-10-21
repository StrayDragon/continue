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
exports.GUIActions = void 0;
var vscode_extension_tester_1 = require("vscode-extension-tester");
var constants_1 = require("../constants");
var GUI_selectors_1 = require("../selectors/GUI.selectors");
var TestUtils_1 = require("../TestUtils");
var GUIActions = /** @class */ (function () {
    function GUIActions() {
    }
    GUIActions.sendMessage = function (_b) {
        return __awaiter(this, arguments, void 0, function (_c) {
            var editor;
            var view = _c.view, message = _c.message, inputFieldIndex = _c.inputFieldIndex;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, GUI_selectors_1.GUISelectors.getMessageInputFieldAtIndex(view, inputFieldIndex)];
                    case 1:
                        editor = _d.sent();
                        return [4 /*yield*/, editor.sendKeys(message)];
                    case 2:
                        _d.sent();
                        return [4 /*yield*/, editor.sendKeys(vscode_extension_tester_1.Key.ENTER)];
                    case 3:
                        _d.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    GUIActions.executeFocusContinueInputShortcut = function (driver) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, driver
                        .actions()
                        .keyDown(TestUtils_1.TestUtils.osControlKey)
                        .sendKeys("l")
                        .keyUp(TestUtils_1.TestUtils.osControlKey)
                        .perform()];
            });
        });
    };
    GUIActions.toggleToolPolicy = function (view, toolName, desiredState) {
        return __awaiter(this, void 0, void 0, function () {
            var settingsButton, toolsTab, toolPolicyButton, targetStates, stateMap, maxAttempts, _loop_1, state_1, backButton;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, TestUtils_1.TestUtils.waitForSuccess(function () {
                            return GUI_selectors_1.GUISelectors.getSettingsNavButton(view);
                        })];
                    case 1:
                        settingsButton = _b.sent();
                        return [4 /*yield*/, settingsButton.click()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, TestUtils_1.TestUtils.waitForTimeout(500)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, TestUtils_1.TestUtils.waitForSuccess(function () {
                                return GUI_selectors_1.GUISelectors.getToolsTab(view);
                            })];
                    case 4:
                        toolsTab = _b.sent();
                        return [4 /*yield*/, toolsTab.click()];
                    case 5:
                        _b.sent();
                        return [4 /*yield*/, TestUtils_1.TestUtils.waitForTimeout(500)];
                    case 6:
                        _b.sent();
                        return [4 /*yield*/, TestUtils_1.TestUtils.waitForSuccess(function () {
                                return GUI_selectors_1.GUISelectors.getToolPolicyButton(view, toolName);
                            })];
                    case 7:
                        toolPolicyButton = _b.sent();
                        return [4 /*yield*/, TestUtils_1.TestUtils.waitForTimeout(500)];
                    case 8:
                        _b.sent();
                        if (typeof desiredState === "number") {
                            stateMap = [
                                ["Automatic", "Auto"], // 0
                                ["Excluded", "Off"], // 1
                                ["Ask First", "Ask"], // 2
                            ];
                            targetStates = stateMap[desiredState] || ["Ask First", "Ask"];
                        }
                        else {
                            targetStates = [desiredState];
                        }
                        maxAttempts = 5;
                        _loop_1 = function () {
                            var currentText;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0: return [4 /*yield*/, toolPolicyButton.getText()];
                                    case 1:
                                        currentText = _c.sent();
                                        // Check if we've reached any of the target states
                                        if (targetStates.some(function (state) { return currentText.includes(state); })) {
                                            return [2 /*return*/, "break"];
                                        }
                                        // Click to move to next state
                                        return [4 /*yield*/, toolPolicyButton.click()];
                                    case 2:
                                        // Click to move to next state
                                        _c.sent();
                                        return [4 /*yield*/, TestUtils_1.TestUtils.waitForTimeout(200)];
                                    case 3:
                                        _c.sent(); // Small delay for UI update
                                        maxAttempts--;
                                        return [2 /*return*/];
                                }
                            });
                        };
                        _b.label = 9;
                    case 9:
                        if (!(maxAttempts > 0)) return [3 /*break*/, 11];
                        return [5 /*yield**/, _loop_1()];
                    case 10:
                        state_1 = _b.sent();
                        if (state_1 === "break")
                            return [3 /*break*/, 11];
                        return [3 /*break*/, 9];
                    case 11:
                        if (maxAttempts === 0) {
                            throw new Error("Failed to set tool policy to ".concat(targetStates.join(" or "), " after 5 attempts"));
                        }
                        return [4 /*yield*/, TestUtils_1.TestUtils.waitForSuccess(function () {
                                return GUI_selectors_1.GUISelectors.getBackButton(view);
                            })];
                    case 12:
                        backButton = _b.sent();
                        return [4 /*yield*/, backButton.click()];
                    case 13:
                        _b.sent();
                        return [4 /*yield*/, TestUtils_1.TestUtils.waitForTimeout(500)];
                    case 14:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    var _a;
    _a = GUIActions;
    GUIActions.moveContinueToSidebar = function (driver) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, _a.toggleGui()];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, TestUtils_1.TestUtils.waitForSuccess(function () { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0: return [4 /*yield*/, new vscode_extension_tester_1.Workbench().executeCommand("View: Move View")];
                                    case 1:
                                        _b.sent();
                                        return [4 /*yield*/, vscode_extension_tester_1.InputBox.create(constants_1.DEFAULT_TIMEOUT.MD)];
                                    case 2: return [4 /*yield*/, (_b.sent()).selectQuickPick("Continue")];
                                    case 3:
                                        _b.sent();
                                        return [4 /*yield*/, vscode_extension_tester_1.InputBox.create(constants_1.DEFAULT_TIMEOUT.MD)];
                                    case 4: return [4 /*yield*/, (_b.sent()).selectQuickPick("New Secondary Side Bar Entry")];
                                    case 5:
                                        _b.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 2:
                    _b.sent();
                    // first call focuses the input
                    return [4 /*yield*/, TestUtils_1.TestUtils.waitForTimeout(constants_1.DEFAULT_TIMEOUT.XS)];
                case 3:
                    // first call focuses the input
                    _b.sent();
                    return [4 /*yield*/, _a.executeFocusContinueInputShortcut(driver)];
                case 4:
                    _b.sent();
                    // second call closes the gui
                    return [4 /*yield*/, TestUtils_1.TestUtils.waitForTimeout(constants_1.DEFAULT_TIMEOUT.XS)];
                case 5:
                    // second call closes the gui
                    _b.sent();
                    return [4 /*yield*/, _a.executeFocusContinueInputShortcut(driver)];
                case 6:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    GUIActions.switchToReactIframe = function () { return __awaiter(void 0, void 0, void 0, function () {
        var view, driver, iframes, continueIFrame, i, iframe, src, reactIFrame;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    view = new vscode_extension_tester_1.WebView();
                    driver = view.getDriver();
                    return [4 /*yield*/, GUI_selectors_1.GUISelectors.getAllIframes(driver)];
                case 1:
                    iframes = _b.sent();
                    continueIFrame = undefined;
                    i = 0;
                    _b.label = 2;
                case 2:
                    if (!(i < iframes.length)) return [3 /*break*/, 5];
                    iframe = iframes[i];
                    return [4 /*yield*/, iframe.getAttribute("src")];
                case 3:
                    src = _b.sent();
                    if (src.includes("extensionId=Continue.continue")) {
                        continueIFrame = iframe;
                        return [3 /*break*/, 5];
                    }
                    _b.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 2];
                case 5:
                    if (!continueIFrame) {
                        throw new Error("Could not find Continue iframe");
                    }
                    return [4 /*yield*/, driver.switchTo().frame(continueIFrame)];
                case 6:
                    _b.sent();
                    return [4 /*yield*/, new Promise(function (res) {
                            setTimeout(res, 500);
                        })];
                case 7:
                    _b.sent();
                    return [4 /*yield*/, GUI_selectors_1.GUISelectors.getReactIframe(driver)];
                case 8:
                    reactIFrame = _b.sent();
                    if (!reactIFrame) {
                        throw new Error("Could not find React iframe");
                    }
                    return [4 /*yield*/, driver.switchTo().frame(reactIFrame)];
                case 9:
                    _b.sent();
                    return [2 /*return*/, {
                            view: view,
                            driver: driver,
                        }];
            }
        });
    }); };
    GUIActions.toggleGui = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(_a, function (_b) {
            return [2 /*return*/, TestUtils_1.TestUtils.waitForSuccess(function () {
                    return new vscode_extension_tester_1.Workbench().executeCommand("continue.focusContinueInput");
                })];
        });
    }); };
    GUIActions.selectModelFromDropdown = function (view, option) { return __awaiter(void 0, void 0, void 0, function () {
        var dropdownButton, dropdownOption;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, GUI_selectors_1.GUISelectors.getModelDropdownButton(view)];
                case 1:
                    dropdownButton = _b.sent();
                    return [4 /*yield*/, dropdownButton.click()];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, TestUtils_1.TestUtils.waitForSuccess(function () {
                            return GUI_selectors_1.GUISelectors.getModelDropdownOption(view, option);
                        })];
                case 3:
                    dropdownOption = _b.sent();
                    return [4 /*yield*/, dropdownOption.click()];
                case 4:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    GUIActions.selectModeFromDropdown = function (view, option) { return __awaiter(void 0, void 0, void 0, function () {
        var dropdownButton, dropdownOption;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, GUI_selectors_1.GUISelectors.getModeDropdownButton(view)];
                case 1:
                    dropdownButton = _b.sent();
                    return [4 /*yield*/, dropdownButton.click()];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, TestUtils_1.TestUtils.waitForSuccess(function () {
                            return GUI_selectors_1.GUISelectors.getModeDropdownOption(view, option);
                        })];
                case 3:
                    dropdownOption = _b.sent();
                    return [4 /*yield*/, dropdownOption.click()];
                case 4:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    return GUIActions;
}());
exports.GUIActions = GUIActions;
