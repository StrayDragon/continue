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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleLLMError = handleLLMError;
var llm_1 = require("core/llm");
var vscode = require("vscode");
/**
 * @param error Handles common LLM errors. Currently handles Ollama and Lemonade-related errors.
 * @returns true if error is handled, false otherwise
 */
function handleLLMError(error) {
    return __awaiter(this, void 0, void 0, function () {
        var message_1, options_1, message, options, modelName, llm, _a;
        var _b, _c;
        var _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    if (!error || !(error instanceof Error) || !error.message) {
                        return [2 /*return*/, false];
                    }
                    // Handle Lemonade errors
                    if (error.message.toLowerCase().includes("lemonade")) {
                        message_1 = error.message;
                        // For Windows, offer to start Lemonade if it's installed but not running
                        if (process.platform === "win32" &&
                            message_1.includes("Lemonade server may not be running")) {
                            options_1 = ["Start Lemonade", "Setup Instructions"];
                        }
                        else {
                            // For all other cases (Linux, not installed, etc.), direct to setup instructions
                            options_1 = ["Setup Instructions"];
                        }
                        (_b = vscode.window).showErrorMessage.apply(_b, __spreadArray([message_1], options_1, false)).then(function (val) {
                            if (val === "Setup Instructions") {
                                vscode.env.openExternal(vscode.Uri.parse("https://lemonade-server.ai"));
                            }
                            else if (val === "Start Lemonade") {
                                vscode.commands.executeCommand("continue.startLocalLemonade");
                            }
                        });
                        return [2 /*return*/, true];
                    }
                    // Handle Ollama errors
                    if (!error.message.toLowerCase().includes("ollama")) {
                        return [2 /*return*/, false];
                    }
                    message = error.message;
                    modelName = undefined;
                    if (!message.includes("Ollama may not be installed")) return [3 /*break*/, 1];
                    options = ["Download Ollama"];
                    return [3 /*break*/, 5];
                case 1:
                    if (!message.includes("Ollama may not be running")) return [3 /*break*/, 2];
                    options = ["Start Ollama"]; // We want "Start" to be the only choice
                    return [3 /*break*/, 5];
                case 2:
                    if (!(message.includes("ollama run") && "llm" in error)) return [3 /*break*/, 5];
                    //extract model name from error message matching the pattern "ollama run <model-name>"
                    modelName = (_d = message.match(/`ollama run (.*)`/)) === null || _d === void 0 ? void 0 : _d[1];
                    llm = error.llm;
                    _a = (0, llm_1.isModelInstaller)(llm);
                    if (!_a) return [3 /*break*/, 4];
                    return [4 /*yield*/, llm.isInstallingModel(modelName)];
                case 3:
                    _a = (_e.sent());
                    _e.label = 4;
                case 4:
                    if (_a) {
                        console.log("".concat(llm.providerName, " already installing ").concat(modelName));
                        return [2 /*return*/, false];
                    }
                    message = "Model \"".concat(modelName, "\" is not found in Ollama. You need to install it.");
                    options = ["Install Model"];
                    _e.label = 5;
                case 5:
                    if (options === undefined) {
                        console.log("Found an unhandled Ollama error: ", message);
                        return [2 /*return*/, false];
                    }
                    (_c = vscode.window).showErrorMessage.apply(_c, __spreadArray([message], options, false)).then(function (val) {
                        if (val === "Download Ollama") {
                            vscode.env.openExternal(vscode.Uri.parse("https://ollama.ai/download"));
                        }
                        else if (val === "Start Ollama") {
                            vscode.commands.executeCommand("continue.startLocalOllama");
                        }
                        else if (val === "Install Model" && "llm" in error) {
                            //Eventually, we might be able to support installing models for other LLM providers than Ollama
                            vscode.commands.executeCommand("continue.installModel", modelName, error.llm);
                        }
                    });
                    return [2 /*return*/, true];
            }
        });
    });
}
