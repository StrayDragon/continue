"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
exports.Logger = void 0;
var winston_1 = require("winston");
var SentryLogger_1 = require("./sentry/SentryLogger");
var LoggerClass = /** @class */ (function () {
    function LoggerClass() {
        this.winston = winston_1.default.createLogger({
            level: "info",
            format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.timestamp(), winston_1.default.format.printf(function (_a) {
                var level = _a.level, message = _a.message, timestamp = _a.timestamp, meta = __rest(_a, ["level", "message", "timestamp"]);
                var metaStr = Object.keys(meta).length
                    ? " ".concat(JSON.stringify(meta))
                    : "";
                return "[@continuedev] ".concat(level, ": ").concat(message).concat(metaStr);
            })),
            transports: __spreadArray(__spreadArray([], (process.env.NODE_ENV === "test"
                ? [
                    new winston_1.default.transports.File({
                        filename: "e2e.log",
                        level: "info",
                    }),
                ]
                : []), true), [
                // Normal console.log behavior
                new winston_1.default.transports.Console(),
            ], false),
        });
    }
    LoggerClass.getInstance = function () {
        if (!LoggerClass.instance) {
            LoggerClass.instance = new LoggerClass();
        }
        return LoggerClass.instance;
    };
    LoggerClass.prototype.shouldSendToSentry = function () {
        return process.env.NODE_ENV !== "test" && process.env.NODE_ENV !== "e2e";
    };
    LoggerClass.prototype.log = function (message, meta) {
        this.winston.info(message, meta);
    };
    LoggerClass.prototype.debug = function (message, meta) {
        this.winston.debug(message, meta);
    };
    LoggerClass.prototype.info = function (message, meta) {
        this.winston.info(message, meta);
    };
    LoggerClass.prototype.warn = function (message, meta) {
        this.winston.warn(message, meta);
    };
    LoggerClass.prototype.error = function (error, context) {
        var errorMessage;
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        else if (typeof error === "string") {
            errorMessage = error;
        }
        else {
            errorMessage = "An unknown error occurred";
        }
        this.winston.error(errorMessage, context);
        if (this.shouldSendToSentry() && error instanceof Error) {
            (0, SentryLogger_1.captureException)(error, context);
        }
    };
    return LoggerClass;
}());
exports.Logger = LoggerClass.getInstance();
