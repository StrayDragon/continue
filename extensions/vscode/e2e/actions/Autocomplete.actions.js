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
exports.AutocompleteActions = void 0;
var chai_1 = require("chai");
var vscode_extension_tester_1 = require("vscode-extension-tester");
var constants_1 = require("../constants");
var Autocomplete_selectors_1 = require("../selectors/Autocomplete.selectors");
var TestUtils_1 = require("../TestUtils");
var AutocompleteActions = /** @class */ (function () {
    function AutocompleteActions() {
    }
    AutocompleteActions.testCompletions = function (editor) {
        return __awaiter(this, void 0, void 0, function () {
            var driver, messagePair0, ghostText0, messagePair1, ghostText1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        driver = editor.getDriver();
                        messagePair0 = TestUtils_1.TestUtils.generateTestMessagePair(0);
                        return [4 /*yield*/, editor.typeTextAt(1, 1, messagePair0.userMessage)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, editor.typeTextAt(1, messagePair0.userMessage.length + 1, " ")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, TestUtils_1.TestUtils.waitForSuccess(function () { return Autocomplete_selectors_1.AutocompleteSelectors.getGhostTextContent(driver); }, 
                            // The first completion takes longer because Continue needs to load
                            constants_1.DEFAULT_TIMEOUT.XL)];
                    case 3:
                        ghostText0 = _a.sent();
                        (0, chai_1.expect)(ghostText0).to.equal(messagePair0.llmResponse);
                        return [4 /*yield*/, editor.clearText()];
                    case 4:
                        _a.sent();
                        messagePair1 = TestUtils_1.TestUtils.generateTestMessagePair(1);
                        return [4 /*yield*/, editor.typeTextAt(1, 1, messagePair1.userMessage)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, editor.typeTextAt(1, messagePair1.userMessage.length + 1, " ")];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, TestUtils_1.TestUtils.waitForSuccess(function () {
                                return Autocomplete_selectors_1.AutocompleteSelectors.getGhostTextContent(driver);
                            })];
                    case 7:
                        ghostText1 = _a.sent();
                        (0, chai_1.expect)(ghostText1).to.equal(messagePair1.llmResponse);
                        return [2 /*return*/];
                }
            });
        });
    };
    AutocompleteActions.forceCompletion = function (editor) {
        return __awaiter(this, void 0, void 0, function () {
            var ghostText;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, editor.setText("def main():\n    ")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, editor.moveCursor(2, 5)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, new vscode_extension_tester_1.Workbench().executeCommand("Continue: Force Autocomplete")];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, TestUtils_1.TestUtils.waitForSuccess(function () {
                                return Autocomplete_selectors_1.AutocompleteSelectors.getGhostTextContent(vscode_extension_tester_1.VSBrowser.instance.driver);
                            })];
                    case 4:
                        ghostText = _a.sent();
                        return [2 /*return*/, ghostText];
                }
            });
        });
    };
    return AutocompleteActions;
}());
exports.AutocompleteActions = AutocompleteActions;
