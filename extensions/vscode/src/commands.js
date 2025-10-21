"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.registerAllCommands = registerAllCommands;
/* eslint-disable @typescript-eslint/naming-convention */
var vscode = require("vscode");
var posthog_1 = require("core/util/posthog");
var statusBar_1 = require("./autocomplete/statusBar");
/**
 * Helper method to add the `isCommandEvent` to all telemetry captures
 */
function captureCommandTelemetry(commandName, properties) {
    if (properties === void 0) { properties = {}; }
    posthog_1.Telemetry.capture(commandName, __assign({ isCommandEvent: true }, properties));
}
var getCommandsMap = function (ide, configHandler, battery) {
    return {
        "conti.toggleTabAutocompleteEnabled": function () {
            captureCommandTelemetry("toggleTabAutocompleteEnabled");
            var config = vscode.workspace.getConfiguration("conti");
            var enabled = config.get("enableTabAutocomplete");
            var pauseOnBattery = config.get("pauseTabAutocompleteOnBattery");
            if (!pauseOnBattery || battery.isACConnected()) {
                config.update("enableTabAutocomplete", !enabled, vscode.ConfigurationTarget.Global);
            }
            else {
                if (enabled) {
                    var paused = (0, statusBar_1.getStatusBarStatus)() === statusBar_1.StatusBarStatus.Paused;
                    if (paused) {
                        (0, statusBar_1.setupStatusBar)(statusBar_1.StatusBarStatus.Enabled);
                    }
                    else {
                        config.update("enableTabAutocomplete", false, vscode.ConfigurationTarget.Global);
                    }
                }
                else {
                    (0, statusBar_1.setupStatusBar)(statusBar_1.StatusBarStatus.Paused);
                    config.update("enableTabAutocomplete", true, vscode.ConfigurationTarget.Global);
                }
            }
        },
        "conti.forceAutocomplete": function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        captureCommandTelemetry("forceAutocomplete");
                        // 1. Explicitly hide any existing suggestion. This clears VS Code's cache for the current position.
                        return [4 /*yield*/, vscode.commands.executeCommand("editor.action.inlineSuggest.hide")];
                    case 1:
                        // 1. Explicitly hide any existing suggestion. This clears VS Code's cache for the current position.
                        _a.sent();
                        // 2. Now trigger a new one. VS Code has no cached suggestion, so it's forced to call our provider.
                        return [4 /*yield*/, vscode.commands.executeCommand("editor.action.inlineSuggest.trigger")];
                    case 2:
                        // 2. Now trigger a new one. VS Code has no cached suggestion, so it's forced to call our provider.
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); },
        "conti.toggleNextEditEnabled": function () { return __awaiter(void 0, void 0, void 0, function () {
            var config, tabAutocompleteEnabled, nextEditEnabled;
            var _a;
            return __generator(this, function (_b) {
                captureCommandTelemetry("toggleNextEditEnabled");
                config = vscode.workspace.getConfiguration("conti");
                tabAutocompleteEnabled = config.get("enableTabAutocomplete");
                if (!tabAutocompleteEnabled) {
                    vscode.window.showInformationMessage("Please enable tab autocomplete first to use Next Edit");
                    return [2 /*return*/];
                }
                nextEditEnabled = (_a = config.get("enableNextEdit")) !== null && _a !== void 0 ? _a : false;
                // updateNextEditState in VsCodeExtension.ts will handle the validation.
                config.update("enableNextEdit", !nextEditEnabled, vscode.ConfigurationTarget.Global);
                return [2 /*return*/];
            });
        }); },
        "conti.openConfigPage": function () {
            vscode.commands.executeCommand("workbench.action.openSettings", "conti");
        },
    };
};
function registerAllCommands(context, ide, configHandler, battery) {
    for (var _i = 0, _a = Object.entries(getCommandsMap(ide, configHandler, battery)); _i < _a.length; _i++) {
        var _b = _a[_i], command = _b[0], callback = _b[1];
        context.subscriptions.push(vscode.commands.registerCommand(command, callback));
    }
}
