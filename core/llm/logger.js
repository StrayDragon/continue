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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LLMInteractionLog = exports.LLMLogger = void 0;
var LLMLogger = /** @class */ (function () {
    function LLMLogger() {
        this.nextId = 0;
        this.logItemListeners = [];
    }
    LLMLogger.prototype.createInteractionLog = function () {
        return new LLMInteractionLog(this, (this.nextId++).toString());
    };
    LLMLogger.prototype.onLogItem = function (listener) {
        this.logItemListeners.push(listener);
    };
    LLMLogger.prototype._logItem = function (item) {
        for (var _i = 0, _a = this.logItemListeners; _i < _a.length; _i++) {
            var listener = _a[_i];
            listener(item);
        }
    };
    return LLMLogger;
}());
exports.LLMLogger = LLMLogger;
var LLMInteractionLog = /** @class */ (function () {
    function LLMInteractionLog(logger, interactionId) {
        this.logger = logger;
        this.interactionId = interactionId;
    }
    LLMInteractionLog.prototype.logItem = function (item) {
        this.logger._logItem(__assign(__assign({}, item), { interactionId: this.interactionId, timestamp: Date.now() }));
    };
    return LLMInteractionLog;
}());
exports.LLMInteractionLog = LLMInteractionLog;
