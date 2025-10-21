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
exports.Core = void 0;
var uuid_1 = require("uuid");
var CompletionProvider_1 = require("./autocomplete/CompletionProvider");
var ConfigHandler_1 = require("./config/ConfigHandler");
var errors_1 = require("./util/errors");
var Core = /** @class */ (function () {
    function Core(ide, messenger) {
        var _this = this;
        this.ide = ide;
        this.messenger = messenger;
        this.messageAbortControllers = new Map();
        this.configHandler = new ConfigHandler_1.ConfigHandler(ide);
        // Initialize completion provider
        this.completionProvider = new CompletionProvider_1.CompletionProvider(this.configHandler, this.ide, function () { return __awaiter(_this, void 0, void 0, function () {
            var config;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.configHandler.loadConfig()];
                    case 1:
                        config = (_b.sent()).config;
                        if (!config) {
                            return [2 /*return*/, undefined];
                        }
                        return [2 /*return*/, (_a = config.selectedModelByRole.autocomplete) !== null && _a !== void 0 ? _a : undefined];
                }
            });
        }); }, this.onError.bind(this), function (filepath, position) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ide.getDefinitions(filepath, position)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); });
        // Setup message handlers
        this.setupMessengerHandlers();
    }
    Core.prototype.addMessageAbortController = function (id) {
        var controller = new AbortController();
        this.messageAbortControllers.set(id, controller);
        return controller;
    };
    Core.prototype.onError = function (e) {
        if (e instanceof errors_1.ContinueError) {
            this.messenger.sendError(e.message, e.reason);
        }
        else {
            var errorMessage = (e === null || e === void 0 ? void 0 : e.message) || (e === null || e === void 0 ? void 0 : e.toString()) || "Unknown error";
            this.messenger.sendError(errorMessage, errors_1.ContinueErrorReason.UNKNOWN);
        }
        console.error("Core Error:", e);
    };
    Core.prototype.setupMessengerHandlers = function () {
        var _this = this;
        this.messenger.onRequest("config/getConfig", function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.configHandler.loadConfig()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); });
        this.messenger.onRequest("config/setConfig", function (request) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.configHandler.updateConfig(request.config)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        this.messenger.onRequest("autocomplete/getCompletion", function (request) { return __awaiter(_this, void 0, void 0, function () {
            var completionId, input, controller, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        completionId = (0, uuid_1.v4)();
                        input = {
                            completionId: completionId,
                            pos: request.position,
                            filepath: request.filepath,
                            document: request.document,
                            manuallyPassFileContents: request.manuallyPassFileContents,
                            manuallyPassPrefix: request.manuallyPassPrefix,
                            selectedCompletionInfo: request.selectedCompletionInfo,
                            isUntitledFile: request.isUntitledFile,
                            recentlyVisitedRanges: request.recentlyVisitedRanges || [],
                            recentlyEditedRanges: request.recentlyEditedRanges || [],
                        };
                        controller = this.addMessageAbortController(completionId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, this.completionProvider.provideInlineCompletionItems(input, controller.signal, request.force)];
                    case 2:
                        result = _a.sent();
                        if (result && !controller.signal.aborted) {
                            return [2 /*return*/, {
                                    completionId: completionId,
                                    completion: result.completion,
                                    range: result.range,
                                }];
                        }
                        return [3 /*break*/, 5];
                    case 3:
                        error_1 = _a.sent();
                        this.onError(error_1);
                        return [3 /*break*/, 5];
                    case 4:
                        this.messageAbortControllers.delete(completionId);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/, null];
                }
            });
        }); });
        this.messenger.onRequest("autocomplete/acceptCompletion", function (request) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.completionProvider.accept(request.completionId);
                return [2 /*return*/];
            });
        }); });
        this.messenger.onRequest("autocomplete/cancelCompletion", function (request) { return __awaiter(_this, void 0, void 0, function () {
            var controller;
            return __generator(this, function (_a) {
                if (request.completionId) {
                    controller = this.messageAbortControllers.get(request.completionId);
                    if (controller) {
                        controller.abort();
                        this.messageAbortControllers.delete(request.completionId);
                    }
                }
                this.completionProvider.cancel();
                return [2 /*return*/];
            });
        }); });
        this.messenger.onRequest("healthCheck", function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, { status: "ok" }];
            });
        }); });
    };
    // Public methods
    Core.prototype.reloadConfig = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.configHandler.loadConfig()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Core.prototype.getIDEInfo = function () {
        return this.ide.getIdeInfo();
    };
    Core.prototype.dispose = function () {
        // Abort all ongoing requests
        for (var _i = 0, _a = this.messageAbortControllers.values(); _i < _a.length; _i++) {
            var controller = _a[_i];
            controller.abort();
        }
        this.messageAbortControllers.clear();
    };
    return Core;
}());
exports.Core = Core;
