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
exports.InProcessMessenger = void 0;
var uuid_1 = require("uuid");
var Logger_js_1 = require("../../util/Logger.js");
var InProcessMessenger = /** @class */ (function () {
    function InProcessMessenger() {
        // Listeners for the entity that owns this messenger (right now, always Core)
        this.myTypeListeners = new Map();
        // Listeners defined by the other side of the protocol (right now, always IDE)
        this.externalTypeListeners = new Map();
        this._onErrorHandlers = [];
    }
    InProcessMessenger.prototype.onError = function (handler) {
        this._onErrorHandlers.push(handler);
    };
    InProcessMessenger.prototype.invoke = function (messageType, data, messageId) {
        var listener = this.myTypeListeners.get(messageType);
        if (!listener) {
            return;
        }
        var msg = {
            messageType: messageType,
            data: data,
            messageId: messageId !== null && messageId !== void 0 ? messageId : (0, uuid_1.v4)(),
        };
        try {
            return listener(msg);
        }
        catch (error) {
            // Capture message handling errors to Sentry
            Logger_js_1.Logger.error(error, {
                messageType: String(messageType),
                messageId: msg.messageId,
            });
            // Re-throw the original error
            throw error;
        }
    };
    InProcessMessenger.prototype.send = function (messageType, message, _messageId) {
        var _a;
        var messageId = _messageId !== null && _messageId !== void 0 ? _messageId : (0, uuid_1.v4)();
        var data = {
            messageType: messageType,
            data: message,
            messageId: messageId,
        };
        (_a = this.externalTypeListeners.get(messageType)) === null || _a === void 0 ? void 0 : _a(data);
        return messageId;
    };
    InProcessMessenger.prototype.on = function (messageType, handler) {
        this.myTypeListeners.set(messageType, handler);
    };
    InProcessMessenger.prototype.request = function (messageType, data) {
        return __awaiter(this, void 0, void 0, function () {
            var messageId, listener, response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        messageId = (0, uuid_1.v4)();
                        listener = this.externalTypeListeners.get(messageType);
                        if (!listener) {
                            throw new Error("No handler for message type \"".concat(String(messageType), "\""));
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, listener({
                                messageType: messageType,
                                data: data,
                                messageId: messageId,
                            })];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response];
                    case 3:
                        error_1 = _a.sent();
                        // Capture message handling errors to Sentry
                        Logger_js_1.Logger.error(error_1, {
                            messageType: String(messageType),
                            messageId: messageId,
                        });
                        // Re-throw the original error
                        throw error_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    InProcessMessenger.prototype.externalOn = function (messageType, handler) {
        this.externalTypeListeners.set(messageType, handler);
    };
    InProcessMessenger.prototype.externalRequest = function (messageType, data, _messageId) {
        var messageId = _messageId !== null && _messageId !== void 0 ? _messageId : (0, uuid_1.v4)();
        var listener = this.myTypeListeners.get(messageType);
        if (!listener) {
            throw new Error("No handler for message type \"".concat(String(messageType), "\""));
        }
        try {
            var response = listener({
                messageType: messageType,
                data: data,
                messageId: messageId,
            });
            return Promise.resolve(response);
        }
        catch (error) {
            // Capture message handling errors to Sentry
            Logger_js_1.Logger.error(error, {
                messageType: String(messageType),
                messageId: messageId,
            });
            // Re-throw the original error
            throw error;
        }
    };
    return InProcessMessenger;
}());
exports.InProcessMessenger = InProcessMessenger;
