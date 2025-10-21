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
exports.VsCodeWebviewProtocol = void 0;
var extractMinimalStackTraceInfo_1 = require("core/util/extractMinimalStackTraceInfo");
var posthog_1 = require("core/util/posthog");
var uuid_1 = require("uuid");
var vscode = require("vscode");
var errorHandling_1 = require("./util/errorHandling");
var VsCodeWebviewProtocol = /** @class */ (function () {
    function VsCodeWebviewProtocol() {
        this.listeners = new Map();
    }
    VsCodeWebviewProtocol.prototype.send = function (messageType, data, messageId) {
        var _a;
        var id = messageId !== null && messageId !== void 0 ? messageId : (0, uuid_1.v4)();
        (_a = this.webview) === null || _a === void 0 ? void 0 : _a.postMessage({
            messageType: messageType,
            data: data,
            messageId: id,
        });
        return id;
    };
    VsCodeWebviewProtocol.prototype.on = function (messageType, handler) {
        var _a;
        if (!this.listeners.has(messageType)) {
            this.listeners.set(messageType, []);
        }
        (_a = this.listeners.get(messageType)) === null || _a === void 0 ? void 0 : _a.push(handler);
    };
    Object.defineProperty(VsCodeWebviewProtocol.prototype, "webview", {
        get: function () {
            return this._webview;
        },
        set: function (webView) {
            var _this = this;
            var _a;
            this._webview = webView;
            (_a = this._webviewListener) === null || _a === void 0 ? void 0 : _a.dispose();
            var handleMessage = function (msg) { return __awaiter(_this, void 0, void 0, function () {
                var respond, handlers, _i, handlers_1, handler, response, next, e_1, message, stringified;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!("messageType" in msg) || !("messageId" in msg)) {
                                throw new Error("Invalid webview protocol msg: ".concat(JSON.stringify(msg)));
                            }
                            respond = function (message) {
                                return _this.send(msg.messageType, message, msg.messageId);
                            };
                            handlers = this.listeners.get(msg.messageType) || [];
                            _i = 0, handlers_1 = handlers;
                            _a.label = 1;
                        case 1:
                            if (!(_i < handlers_1.length)) return [3 /*break*/, 13];
                            handler = handlers_1[_i];
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 10, , 12]);
                            return [4 /*yield*/, handler(msg)];
                        case 3:
                            response = _a.sent();
                            if (!(response &&
                                typeof response[Symbol.asyncIterator] === "function")) return [3 /*break*/, 8];
                            return [4 /*yield*/, response.next()];
                        case 4:
                            next = _a.sent();
                            _a.label = 5;
                        case 5:
                            if (!!next.done) return [3 /*break*/, 7];
                            respond({
                                done: false,
                                content: next.value,
                                status: "success",
                            });
                            return [4 /*yield*/, response.next()];
                        case 6:
                            next = _a.sent();
                            return [3 /*break*/, 5];
                        case 7:
                            respond({
                                done: true,
                                content: next.value,
                                status: "success",
                            });
                            return [3 /*break*/, 9];
                        case 8:
                            respond({ done: true, content: response, status: "success" });
                            _a.label = 9;
                        case 9: return [3 /*break*/, 12];
                        case 10:
                            e_1 = _a.sent();
                            return [4 /*yield*/, (0, errorHandling_1.handleLLMError)(e_1)];
                        case 11:
                            if (_a.sent()) {
                                // Respond without an error, so the UI doesn't show the error component
                                respond({ done: true, status: "error" });
                            }
                            message = e_1.message;
                            respond({ done: true, error: message, status: "error" });
                            stringified = JSON.stringify({ msg: msg }, null, 2);
                            console.error("Error handling webview message: ".concat(stringified, "\n\n").concat(e_1));
                            if (stringified.includes("llm/streamChat") ||
                                stringified.includes("chatDescriber/describe")) {
                                return [2 /*return*/];
                            }
                            if (e_1.cause) {
                                if (e_1.cause.name === "ConnectTimeoutError") {
                                    message = "Connection timed out. If you expect it to take a long time to connect, you can increase the timeout in your config by setting \"requestOptions\": { \"timeout\": 10000 }. You can find the full config reference here: https://docs.continue.dev/reference/config";
                                }
                                else if (e_1.cause.code === "ECONNREFUSED") {
                                    message = "Connection was refused. This likely means that there is no server running at the specified URL. If you are running your own server you may need to set the \"apiBase\" parameter in config.json. For example, you can set up an OpenAI-compatible server like here: https://docs.continue.dev/reference/Model%20Providers/openai#openai-compatible-servers--apis";
                                }
                                else {
                                    message = "The request failed with \"".concat(e_1.cause.name, "\": ").concat(e_1.cause.message, ". If you're having trouble setting up Continue, please see the troubleshooting guide for help.");
                                }
                            }
                            if (message.includes("https://proxy-server")) {
                                message = message.split("\n").filter(function (l) { return l !== ""; })[1];
                                try {
                                    message = JSON.parse(message).message;
                                }
                                catch (_b) { }
                                if (message.includes("exceeded")) {
                                    message +=
                                        " To keep using Continue, you can set up a local model or use your own API key.";
                                }
                                vscode.window
                                    .showInformationMessage(message, "Add API Key", "Use Local Model")
                                    .then(function (selection) {
                                    if (selection === "Add API Key") {
                                        _this.request("setupApiKey", undefined);
                                    }
                                    else if (selection === "Use Local Model") {
                                        _this.request("setupLocalConfig", undefined);
                                    }
                                });
                            }
                            else {
                                posthog_1.Telemetry.capture("webview_protocol_error", {
                                    messageType: msg.messageType,
                                    errorMsg: message.split("\n\n")[0],
                                    stack: (0, extractMinimalStackTraceInfo_1.extractMinimalStackTraceInfo)(e_1.stack),
                                }, false);
                            }
                            return [3 /*break*/, 12];
                        case 12:
                            _i++;
                            return [3 /*break*/, 1];
                        case 13: return [2 /*return*/];
                    }
                });
            }); };
            this._webviewListener = this._webview.onDidReceiveMessage(handleMessage);
        },
        enumerable: false,
        configurable: true
    });
    VsCodeWebviewProtocol.prototype.invoke = function (messageType, data, messageId) {
        throw new Error("Method not implemented.");
    };
    VsCodeWebviewProtocol.prototype.onError = function (handler) {
        throw new Error("Method not implemented.");
    };
    VsCodeWebviewProtocol.prototype.request = function (messageType, data, retry) {
        var _this = this;
        if (retry === void 0) { retry = true; }
        var messageId = (0, uuid_1.v4)();
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            var i_1, disposable_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!retry) return [3 /*break*/, 5];
                        i_1 = 0;
                        _a.label = 1;
                    case 1:
                        if (!!this.webview) return [3 /*break*/, 5];
                        if (!(i_1 >= 10)) return [3 /*break*/, 2];
                        resolve(undefined);
                        return [2 /*return*/];
                    case 2: return [4 /*yield*/, new Promise(function (res) { return setTimeout(res, i_1 >= 5 ? 1000 : 500); })];
                    case 3:
                        _a.sent();
                        i_1++;
                        _a.label = 4;
                    case 4: return [3 /*break*/, 1];
                    case 5:
                        this.send(messageType, data, messageId);
                        if (this.webview) {
                            disposable_1 = this.webview.onDidReceiveMessage(function (msg) {
                                if (msg.messageId === messageId) {
                                    resolve(msg.data);
                                    disposable_1 === null || disposable_1 === void 0 ? void 0 : disposable_1.dispose();
                                }
                            });
                        }
                        else if (!retry) {
                            resolve(undefined);
                        }
                        return [2 /*return*/];
                }
            });
        }); });
    };
    return VsCodeWebviewProtocol;
}());
exports.VsCodeWebviewProtocol = VsCodeWebviewProtocol;
