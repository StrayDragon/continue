"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
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
var socket_io_client_1 = require("socket.io-client");
var messageContent_js_1 = require("../../util/messageContent.js");
var index_js_1 = require("../index.js");
var Flowise = /** @class */ (function (_super) {
    __extends(Flowise, _super);
    function Flowise(options) {
        var _a, _b, _c;
        var _this = _super.call(this, options) || this;
        _this.additionalFlowiseConfiguration = [];
        _this.timeout = 5000;
        _this.additionalHeaders = [];
        _this.timeout = (_a = options.timeout) !== null && _a !== void 0 ? _a : 5000;
        _this.additionalHeaders = (_b = options.additionalHeaders) !== null && _b !== void 0 ? _b : [];
        _this.additionalFlowiseConfiguration =
            (_c = options.additionalFlowiseConfiguration) !== null && _c !== void 0 ? _c : [];
        return _this;
    }
    Flowise.prototype._getChatUrl = function () {
        return String(this.apiBase);
    };
    Flowise.prototype._getSocketUrl = function () {
        return new URL(this._getChatUrl()).origin;
    };
    Flowise.prototype._getHeaders = function () {
        var headers = {
            "Content-Type": "application/json",
        };
        if (this.apiKey) {
            headers.Authorization = "Bearer ".concat(this.apiKey);
        }
        for (var _i = 0, _a = this.additionalHeaders; _i < _a.length; _i++) {
            var additionalHeader = _a[_i];
            headers[additionalHeader.key] = additionalHeader.value;
        }
        return headers;
    };
    Flowise.prototype._convertArgs = function (options) {
        var finalOptions = {
            temperature: options.temperature,
            maxTokens: options.maxTokens,
            topP: options.topP,
            topK: options.topK,
            presencePenalty: options.presencePenalty,
            frequencyPenalty: options.frequencyPenalty,
        };
        for (var _i = 0, _a = this.additionalFlowiseConfiguration; _i < _a.length; _i++) {
            var additionalConfig = _a[_i];
            finalOptions[additionalConfig.key] = additionalConfig.value;
        }
        return finalOptions;
    };
    Flowise.prototype._streamComplete = function (prompt, signal, options) {
        return __asyncGenerator(this, arguments, function _streamComplete_1() {
            var message, _a, _b, _c, chunk, e_1_1;
            var _d, e_1, _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        message = { role: "user", content: prompt };
                        _g.label = 1;
                    case 1:
                        _g.trys.push([1, 8, 9, 14]);
                        _a = true, _b = __asyncValues(this._streamChat([message], signal, options));
                        _g.label = 2;
                    case 2: return [4 /*yield*/, __await(_b.next())];
                    case 3:
                        if (!(_c = _g.sent(), _d = _c.done, !_d)) return [3 /*break*/, 7];
                        _f = _c.value;
                        _a = false;
                        chunk = _f;
                        return [4 /*yield*/, __await((0, messageContent_js_1.renderChatMessage)(chunk))];
                    case 4: return [4 /*yield*/, _g.sent()];
                    case 5:
                        _g.sent();
                        _g.label = 6;
                    case 6:
                        _a = true;
                        return [3 /*break*/, 2];
                    case 7: return [3 /*break*/, 14];
                    case 8:
                        e_1_1 = _g.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 14];
                    case 9:
                        _g.trys.push([9, , 12, 13]);
                        if (!(!_a && !_d && (_e = _b.return))) return [3 /*break*/, 11];
                        return [4 /*yield*/, __await(_e.call(_b))];
                    case 10:
                        _g.sent();
                        _g.label = 11;
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 13: return [7 /*endfinally*/];
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    Flowise.prototype._streamChat = function (messages, signal, options) {
        return __asyncGenerator(this, arguments, function _streamChat_1() {
            var requestBody, _a, socket, socketInfo, response, error_1;
            var _b;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        requestBody = this._getRequestBody(messages, options);
                        return [4 /*yield*/, __await(this._initializeSocket())];
                    case 1:
                        _a = _d.sent(), socket = _a.socket, socketInfo = _a.socketInfo;
                        return [4 /*yield*/, __await(this.fetch(this._getChatUrl(), {
                                method: "POST",
                                headers: this._getHeaders(),
                                body: JSON.stringify(__assign(__assign({}, requestBody), { socketIOClientId: socket.id })),
                                signal: signal,
                            }))];
                    case 2:
                        response = _d.sent();
                        if (!(response.status === 499)) return [3 /*break*/, 4];
                        return [4 /*yield*/, __await(void 0)];
                    case 3: return [2 /*return*/, _d.sent()]; // Aborted by user
                    case 4: return [4 /*yield*/, __await(socketInfo.hasNextToken())];
                    case 5:
                        if (!_d.sent()) return [3 /*break*/, 8];
                        return [4 /*yield*/, __await({ role: "assistant", content: socketInfo.getCurrentMessage() })];
                    case 6: return [4 /*yield*/, _d.sent()];
                    case 7:
                        _d.sent();
                        return [3 /*break*/, 4];
                    case 8:
                        if (!socketInfo.error) return [3 /*break*/, 16];
                        socket.disconnect();
                        _d.label = 9;
                    case 9:
                        _d.trys.push([9, 13, , 16]);
                        _b = { role: "assistant" };
                        return [4 /*yield*/, __await(response.text())];
                    case 10: return [4 /*yield*/, __await.apply(void 0, [(_b.content = _d.sent(), _b)])];
                    case 11: return [4 /*yield*/, _d.sent()];
                    case 12:
                        _d.sent();
                        return [3 /*break*/, 16];
                    case 13:
                        error_1 = _d.sent();
                        return [4 /*yield*/, __await({ role: "assistant", content: (_c = error_1.message) !== null && _c !== void 0 ? _c : error_1 })];
                    case 14: return [4 /*yield*/, _d.sent()];
                    case 15:
                        _d.sent();
                        return [3 /*break*/, 16];
                    case 16:
                        socket.disconnect();
                        return [2 /*return*/];
                }
            });
        });
    };
    Flowise.prototype._getRequestBody = function (messages, options) {
        var lastMessage = messages[messages.length - 1];
        var history = messages
            .filter(function (m) { return m !== lastMessage; })
            .map(function (m) { return ({
            type: m.role === "user"
                ? Flowise.FlowiseMessageType.User
                : Flowise.FlowiseMessageType.Assistant,
            message: m.content,
        }); });
        var requestBody = {
            question: lastMessage.content,
            history: history,
            overrideConfig: this._convertArgs(options),
        };
        return requestBody;
    };
    Flowise.prototype._initializeSocket = function () {
        var _this = this;
        return new Promise(function (res, rej) {
            var socket = (0, socket_io_client_1.default)(_this._getSocketUrl());
            var socketInfo = {
                isConnected: false,
                hasNextToken: function () { return Promise.resolve(false); },
                internal: {
                    hasNextTokenPromiseResolve: function () { },
                    hasNextTokenPromiseReject: function () { },
                    messageHistory: [],
                },
                getCurrentMessage: function () { return ""; },
            };
            socketInfo.getCurrentMessage = function () { var _a; return (_a = socketInfo.internal.messageHistory.shift()) !== null && _a !== void 0 ? _a : ""; };
            socketInfo.hasNextToken = function () {
                return new Promise(function (hasNextTokenResolve, hasNextTokenReject) {
                    socketInfo.internal.hasNextTokenPromiseResolve =
                        hasNextTokenResolve;
                    socketInfo.internal.hasNextTokenPromiseReject = hasNextTokenReject;
                });
            };
            var resetTimeout = function () {
                clearTimeout(socketInfo.internal.timeout);
                socketInfo.internal.timeout = setTimeout(function () {
                    socketInfo.error = new Error("Timeout occurred");
                    socketInfo.internal.hasNextTokenPromiseResolve(false);
                    rej("Timeout trying to connect to socket: ".concat(_this._getSocketUrl()));
                }, _this.timeout);
            };
            resetTimeout();
            socket.on("connect", function () {
                socketInfo.isConnected = true;
                resetTimeout();
                res({ socket: socket, socketInfo: socketInfo });
            });
            socket.on("token", function (token) {
                if (socketInfo.isConnected) {
                    socketInfo.internal.messageHistory.push(token);
                    resetTimeout();
                    socketInfo.internal.hasNextTokenPromiseResolve(true);
                }
            });
            socket.on("error", function (error) {
                clearTimeout(socketInfo.internal.timeout);
                socketInfo.error = error;
                socketInfo.internal.hasNextTokenPromiseResolve(false);
                rej("Error trying to connect to socket: ".concat(_this._getSocketUrl()));
            });
            socket.on("end", function () {
                clearTimeout(socketInfo.internal.timeout);
                socketInfo.hasNextToken = function () {
                    return Promise.resolve(Boolean(socketInfo.internal.messageHistory.length));
                };
            });
            socket.on("disconnect", function () {
                socketInfo.isConnected = false;
                clearTimeout(socketInfo.internal.timeout);
                socketInfo.internal.hasNextTokenPromiseResolve(false);
            });
        });
    };
    Flowise.providerName = "flowise";
    Flowise.defaultOptions = {
        apiBase: "http://localhost:3000",
    };
    Flowise.FlowiseMessageType = {
        User: "userMessage",
        Assistant: "apiMessage",
    };
    return Flowise;
}(index_js_1.BaseLLM));
exports.default = Flowise;
