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
exports.TestUtils = void 0;
var chai_1 = require("chai");
var vscode_extension_tester_1 = require("vscode-extension-tester");
var promises_1 = require("fs/promises");
var path = require("path");
var constants_1 = require("./constants");
var TestUtils = /** @class */ (function () {
    function TestUtils() {
    }
    TestUtils.getGlobalContextFilePath = function () {
        return path.join(TestUtils.CONTINUE_GLOBAL_DIR, "index", "globalContext.json");
    };
    TestUtils.fileExists = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, (0, promises_1.access)(path, promises_1.constants.F_OK)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, true];
                    case 2:
                        _a = _b.sent();
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * In many cases it might be more useful to use existing Selenium
     * utilities. For example:
     *
     * await driver.wait(until.elementLocated(By.xpath(xpath)), 5000);
     *
     * There's also 'waitForAttributeValue'.
     */
    TestUtils.waitForSuccess = function (locatorFn_1) {
        return __awaiter(this, arguments, void 0, function (locatorFn, timeout, interval) {
            var startTime, result, e_1;
            if (timeout === void 0) { timeout = constants_1.DEFAULT_TIMEOUT.MD; }
            if (interval === void 0) { interval = 500; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        startTime = Date.now();
                        _a.label = 1;
                    case 1:
                        if (!(Date.now() - startTime < timeout)) return [3 /*break*/, 7];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, locatorFn()];
                    case 3:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 4:
                        e_1 = _a.sent();
                        if (Date.now() - startTime >= timeout) {
                            throw new Error("Element not found after ".concat(timeout, "ms timeout: ").concat(locatorFn));
                        }
                        return [3 /*break*/, 5];
                    case 5: return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, interval); })];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 7: throw new Error("Element not found after ".concat(timeout, "ms timeout: ").concat(locatorFn));
                }
            });
        });
    };
    TestUtils.logFailure = function (locatorFn) {
        return __awaiter(this, void 0, void 0, function () {
            var result, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, locatorFn()];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 2:
                        e_2 = _a.sent();
                        throw new Error("Element not found: ".concat(locatorFn));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TestUtils.expectNoElement = function (locatorFn_1) {
        return __awaiter(this, arguments, void 0, function (locatorFn, timeout, interval) {
            var startTime, elementFound, element, e_3;
            if (timeout === void 0) { timeout = 1000; }
            if (interval === void 0) { interval = 200; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        startTime = Date.now();
                        elementFound = false;
                        _a.label = 1;
                    case 1:
                        if (!(Date.now() - startTime < timeout)) return [3 /*break*/, 7];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, locatorFn()];
                    case 3:
                        element = _a.sent();
                        console.log("ELEMENT", element);
                        if (element) {
                            elementFound = true;
                            return [3 /*break*/, 7];
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        e_3 = _a.sent();
                        return [3 /*break*/, 5];
                    case 5: return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, interval); })];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 7:
                        (0, chai_1.expect)(elementFound).to.be.false;
                        return [2 /*return*/];
                }
            });
        });
    };
    TestUtils.generateTestMessagePair = function (id) {
        if (id === void 0) { id = 0; }
        return {
            userMessage: "TEST_USER_MESSAGE_".concat(id),
            llmResponse: "TEST_LLM_RESPONSE_".concat(id),
        };
    };
    TestUtils.waitForTimeout = function (ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    };
    Object.defineProperty(TestUtils, "isMacOS", {
        get: function () {
            return process.platform === "darwin";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TestUtils, "osControlKey", {
        get: function () {
            return TestUtils.isMacOS ? vscode_extension_tester_1.Key.META : vscode_extension_tester_1.Key.CONTROL;
        },
        enumerable: false,
        configurable: true
    });
    var _a;
    TestUtils.CONTINUE_GLOBAL_DIR = (_a = process.env.CONTINUE_GLOBAL_DIR) !== null && _a !== void 0 ? _a : "";
    return TestUtils;
}());
exports.TestUtils = TestUtils;
