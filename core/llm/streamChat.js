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
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function () { return this; }, i;
    function awaitReturn(f) { return function (v) { return Promise.resolve(v).then(f, reject); }; }
    function verb(n, f) { if (g[n]) { i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; if (f) i[n] = f(i[n]); } }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.llmStreamChat = llmStreamChat;
var fetch_1 = require("@continuedev/fetch");
var usesFreeTrialApiKey_1 = require("../config/usesFreeTrialApiKey");
var posthog_1 = require("../util/posthog");
var tts_1 = require("../util/tts");
var starterCredits_1 = require("./utils/starterCredits");
function llmStreamChat(configHandler, abortController, msg, ide, messenger) {
    return __asyncGenerator(this, arguments, function llmStreamChat_1() {
        var config, _a, legacySlashCommandData, completionOptions, messages, messageOptions, model, errorPromptLog, command_1, contextItems, historyIndex_1, input, selectedCode, slashCommand, gen, next, gen, next, chunk, error_1;
        var _b, _c, _d, _e, _f, _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0: return [4 /*yield*/, __await(configHandler.loadConfig())];
                case 1:
                    config = (_h.sent()).config;
                    if (!config) {
                        throw new Error("Config not loaded");
                    }
                    // Stop TTS on new StreamChat
                    if ((_b = config.experimental) === null || _b === void 0 ? void 0 : _b.readResponseTTS) {
                        void tts_1.TTS.kill();
                    }
                    _a = msg.data, legacySlashCommandData = _a.legacySlashCommandData, completionOptions = _a.completionOptions, messages = _a.messages, messageOptions = _a.messageOptions;
                    model = config.selectedModelByRole.chat;
                    if (!model) {
                        throw new Error("No chat model selected");
                    }
                    errorPromptLog = {
                        modelTitle: (_c = model === null || model === void 0 ? void 0 : model.title) !== null && _c !== void 0 ? _c : model === null || model === void 0 ? void 0 : model.model,
                        modelProvider: (_d = model === null || model === void 0 ? void 0 : model.underlyingProviderName) !== null && _d !== void 0 ? _d : "unknown",
                        completion: "",
                        prompt: "",
                        completionOptions: __assign(__assign({}, msg.data.completionOptions), { model: model === null || model === void 0 ? void 0 : model.model }),
                    };
                    _h.label = 2;
                case 2:
                    _h.trys.push([2, 24, , 25]);
                    if (!legacySlashCommandData) return [3 /*break*/, 13];
                    command_1 = legacySlashCommandData.command, contextItems = legacySlashCommandData.contextItems, historyIndex_1 = legacySlashCommandData.historyIndex, input = legacySlashCommandData.input, selectedCode = legacySlashCommandData.selectedCode;
                    slashCommand = (_e = config.slashCommands) === null || _e === void 0 ? void 0 : _e.find(function (sc) { return sc.name === command_1.name; });
                    if (!slashCommand) {
                        throw new Error("Unknown slash command ".concat(command_1.name));
                    }
                    void posthog_1.Telemetry.capture("useSlashCommand", {
                        name: command_1.name,
                    }, true);
                    if (!slashCommand.run) {
                        console.error("Slash command ".concat(command_1.name, " (").concat(command_1.source, ") has no run function"));
                        throw new Error("Slash command not found");
                    }
                    gen = slashCommand.run({
                        input: input,
                        history: messages,
                        llm: model,
                        contextItems: contextItems,
                        params: command_1.params,
                        ide: ide,
                        addContextItem: function (item) {
                            void messenger.request("addContextItem", {
                                item: item,
                                historyIndex: historyIndex_1,
                            });
                        },
                        selectedCode: selectedCode,
                        config: config,
                        fetch: function (url, init) {
                            return (0, fetch_1.fetchwithRequestOptions)(url, __assign(__assign({}, init), { signal: abortController.signal }), model.requestOptions);
                        },
                        completionOptions: completionOptions,
                        abortController: abortController,
                    });
                    return [4 /*yield*/, __await(gen.next())];
                case 3:
                    next = _h.sent();
                    _h.label = 4;
                case 4:
                    if (!!next.done) return [3 /*break*/, 11];
                    if (!abortController.signal.aborted) return [3 /*break*/, 6];
                    return [4 /*yield*/, __await(gen.return(errorPromptLog))];
                case 5:
                    next = _h.sent();
                    return [3 /*break*/, 11];
                case 6:
                    if (!next.value) return [3 /*break*/, 9];
                    return [4 /*yield*/, __await({
                            role: "assistant",
                            content: next.value,
                        })];
                case 7: return [4 /*yield*/, _h.sent()];
                case 8:
                    _h.sent();
                    _h.label = 9;
                case 9: return [4 /*yield*/, __await(gen.next())];
                case 10:
                    next = _h.sent();
                    return [3 /*break*/, 4];
                case 11:
                    if (!next.done) {
                        throw new Error("Will never happen");
                    }
                    return [4 /*yield*/, __await(next.value)];
                case 12: return [2 /*return*/, _h.sent()];
                case 13:
                    gen = model.streamChat(messages, abortController.signal, completionOptions, messageOptions);
                    return [4 /*yield*/, __await(gen.next())];
                case 14:
                    next = _h.sent();
                    _h.label = 15;
                case 15:
                    if (!!next.done) return [3 /*break*/, 21];
                    if (!abortController.signal.aborted) return [3 /*break*/, 17];
                    return [4 /*yield*/, __await(gen.return(errorPromptLog))];
                case 16:
                    next = _h.sent();
                    return [3 /*break*/, 21];
                case 17:
                    chunk = next.value;
                    return [4 /*yield*/, __await(chunk)];
                case 18: return [4 /*yield*/, _h.sent()];
                case 19:
                    _h.sent();
                    return [4 /*yield*/, __await(gen.next())];
                case 20:
                    next = _h.sent();
                    return [3 /*break*/, 15];
                case 21:
                    if (((_f = config.experimental) === null || _f === void 0 ? void 0 : _f.readResponseTTS) && "completion" in next.value) {
                        void tts_1.TTS.read((_g = next.value) === null || _g === void 0 ? void 0 : _g.completion);
                    }
                    void posthog_1.Telemetry.capture("chat", {
                        model: model.model,
                        provider: model.providerName,
                    }, true);
                    void checkForOutOfStarterCredits(configHandler, messenger);
                    if (!next.done) {
                        throw new Error("Will never happen");
                    }
                    return [4 /*yield*/, __await(next.value)];
                case 22: return [2 /*return*/, _h.sent()];
                case 23: return [3 /*break*/, 25];
                case 24:
                    error_1 = _h.sent();
                    if (error_1 instanceof Error &&
                        error_1.message.toLowerCase().includes("premature close")) {
                        void posthog_1.Telemetry.capture("stream_premature_close_error", __assign({ model: model.model, provider: model.providerName, errorMessage: error_1.message, context: legacySlashCommandData ? "slash_command" : "regular_chat" }, (legacySlashCommandData && {
                            command: legacySlashCommandData.command.name,
                        })), false);
                    }
                    throw error_1;
                case 25: return [2 /*return*/];
            }
        });
    });
}
function checkForOutOfStarterCredits(configHandler, messenger) {
    return __awaiter(this, void 0, void 0, function () {
        var config, creditStatus, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, configHandler.getSerializedConfig()];
                case 1:
                    config = (_a.sent()).config;
                    return [4 /*yield*/, configHandler.controlPlaneClient.getCreditStatus()];
                case 2:
                    creditStatus = _a.sent();
                    if (config &&
                        creditStatus &&
                        (0, starterCredits_1.isOutOfStarterCredits)((0, usesFreeTrialApiKey_1.usesCreditsBasedApiKey)(config), creditStatus)) {
                        void messenger.request("freeTrialExceeded", undefined);
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error("Error checking free trial status:", error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
