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
exports.GlobalActions = void 0;
var vscode_extension_tester_1 = require("vscode-extension-tester");
var constants_1 = require("../constants");
var TestUtils_1 = require("../TestUtils");
var GlobalActions = /** @class */ (function () {
    function GlobalActions() {
    }
    GlobalActions.openTestWorkspace = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, vscode_extension_tester_1.VSBrowser.instance.openResources(GlobalActions.defaultFolder)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, new vscode_extension_tester_1.Workbench().executeCommand("Notifications: Clear All Notifications")];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    GlobalActions.clearAllNotifications = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new vscode_extension_tester_1.Workbench().executeCommand("Notifications: Clear All Notifications")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    GlobalActions.createAndOpenNewTextFile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var editor;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new vscode_extension_tester_1.Workbench().executeCommand("Create: New File...")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, vscode_extension_tester_1.InputBox.create(constants_1.DEFAULT_TIMEOUT.MD)];
                    case 2: return [4 /*yield*/, (_a.sent()).selectQuickPick("Text File")];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, new vscode_extension_tester_1.EditorView().openEditor("Untitled-1")];
                    case 4:
                        editor = (_a.sent());
                        return [2 /*return*/, { editor: editor }];
                }
            });
        });
    };
    GlobalActions.createAndSaveNewFile = function () {
        return __awaiter(this, arguments, void 0, function (filename) {
            var editor, inputBox, currentPath, pathParts, newPath;
            if (filename === void 0) { filename = GlobalActions.defaultNewFilename; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, GlobalActions.createAndOpenNewTextFile()];
                    case 1:
                        editor = (_a.sent()).editor;
                        return [4 /*yield*/, new vscode_extension_tester_1.Workbench().executeCommand("File: Save As...")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, vscode_extension_tester_1.InputBox.create(constants_1.DEFAULT_TIMEOUT.MD)];
                    case 3:
                        inputBox = _a.sent();
                        return [4 /*yield*/, inputBox.getText()];
                    case 4:
                        currentPath = _a.sent();
                        pathParts = currentPath.split(/[\/\\]/);
                        pathParts[pathParts.length - 1] = filename;
                        newPath = pathParts.join("/");
                        return [4 /*yield*/, inputBox.setText(newPath)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, inputBox.confirm()];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, TestUtils_1.TestUtils.waitForTimeout(constants_1.DEFAULT_TIMEOUT.XS)];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, new vscode_extension_tester_1.EditorView().openEditor(filename)];
                    case 8:
                        editor = (_a.sent());
                        return [2 /*return*/, { editor: editor }];
                }
            });
        });
    };
    GlobalActions.deleteFileFromFolder = function () {
        return __awaiter(this, arguments, void 0, function (filename, folder) {
            var fs, path, folderPath, filePath, error_1;
            if (filename === void 0) { filename = GlobalActions.defaultNewFilename; }
            if (folder === void 0) { folder = GlobalActions.defaultFolder; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fs = require("fs");
                        path = require("path");
                        folderPath = path.join(process.cwd(), folder);
                        filePath = path.join(folderPath, filename);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, fs.promises.unlink(filePath)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.warn("Failed to delete file ".concat(filePath, ":"), error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GlobalActions.setNextEditEnabled = function (enabled) {
        return __awaiter(this, void 0, void 0, function () {
            var workbench, statusBar, continueItem, text, hasNE;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        workbench = new vscode_extension_tester_1.Workbench();
                        return [4 /*yield*/, workbench.openCommandPrompt()];
                    case 1:
                        _a.sent();
                        process.env.CONTINUE_E2E_NON_NEXT_EDIT_TEST = "true";
                        // Initial wait and clear
                        return [4 /*yield*/, TestUtils_1.TestUtils.waitForTimeout(1000)];
                    case 2:
                        // Initial wait and clear
                        _a.sent();
                        return [4 /*yield*/, GlobalActions.clearAllNotifications()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, workbench.getStatusBar()];
                    case 4:
                        statusBar = _a.sent();
                        return [4 /*yield*/, TestUtils_1.TestUtils.waitForSuccess(function () { return __awaiter(_this, void 0, void 0, function () {
                                var e_1, element, text, textContent;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            _a.trys.push([0, 2, , 3]);
                                            return [4 /*yield*/, GlobalActions.clearAllNotifications()];
                                        case 1:
                                            _a.sent();
                                            return [3 /*break*/, 3];
                                        case 2:
                                            e_1 = _a.sent();
                                            return [3 /*break*/, 3];
                                        case 3: return [4 /*yield*/, statusBar.findElement(vscode_extension_tester_1.By.xpath("//*[contains(text(), 'Continue')]"))];
                                        case 4:
                                            element = _a.sent();
                                            return [4 /*yield*/, element.getText()];
                                        case 5:
                                            text = _a.sent();
                                            if (!(!text || text.trim() === "")) return [3 /*break*/, 7];
                                            return [4 /*yield*/, element.getAttribute("textContent")];
                                        case 6:
                                            textContent = _a.sent();
                                            if (!textContent || textContent.trim() === "") {
                                                throw new Error("Text not yet available");
                                            }
                                            _a.label = 7;
                                        case 7: return [2 /*return*/, element];
                                    }
                                });
                            }); }, constants_1.DEFAULT_TIMEOUT.MD)];
                    case 5:
                        continueItem = _a.sent();
                        return [4 /*yield*/, TestUtils_1.TestUtils.waitForSuccess(function () { return __awaiter(_this, void 0, void 0, function () {
                                var itemText, textContent;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, continueItem.getText()];
                                        case 1:
                                            itemText = _a.sent();
                                            if (!(!itemText || itemText.trim() === "")) return [3 /*break*/, 3];
                                            return [4 /*yield*/, continueItem.getAttribute("textContent")];
                                        case 2:
                                            textContent = _a.sent();
                                            if (textContent && textContent.trim() !== "") {
                                                return [2 /*return*/, textContent];
                                            }
                                            throw new Error("Text content not yet available");
                                        case 3: return [2 /*return*/, itemText];
                                    }
                                });
                            }); }, constants_1.DEFAULT_TIMEOUT.MD)];
                    case 6:
                        text = _a.sent();
                        console.log("Final text:", text);
                        hasNE = text.includes("(NE)");
                        console.log("hasNE:", hasNE);
                        if (!(hasNE !== enabled)) return [3 /*break*/, 10];
                        return [4 /*yield*/, workbench.executeCommand("Continue: Toggle Next Edit")];
                    case 7:
                        _a.sent();
                        // Clear any resulting notifications
                        return [4 /*yield*/, TestUtils_1.TestUtils.waitForTimeout(500)];
                    case 8:
                        // Clear any resulting notifications
                        _a.sent();
                        return [4 /*yield*/, GlobalActions.clearAllNotifications()];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    GlobalActions.disableNextEdit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.setNextEditEnabled(false)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    GlobalActions.defaultFolder = "e2e/test-continue";
    GlobalActions.defaultNewFilename = "test.py";
    return GlobalActions;
}());
exports.GlobalActions = GlobalActions;
