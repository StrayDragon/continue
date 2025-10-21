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
exports.anonymizeFilePath = anonymizeFilePath;
exports.anonymizeStackTrace = anonymizeStackTrace;
exports.anonymizeUserInfo = anonymizeUserInfo;
exports.anonymizeSentryEvent = anonymizeSentryEvent;
/**
 * Minimalist Sentry anonymization utilities
 */
// Browser-compatible hash function (avoids Node.js crypto dependency)
function simpleHash(input) {
    var hash = 0;
    for (var i = 0; i < input.length; i++) {
        var char = input.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(16).substring(0, 8);
}
/**
 * Anonymize file paths - keep package names, remove user paths
 */
function anonymizeFilePath(filePath) {
    if (!filePath)
        return filePath;
    var normalized = filePath.replace(/\\/g, "/");
    // Keep node_modules package names for debugging
    if (normalized.includes("node_modules")) {
        var match = normalized.match(/node_modules\/([^\/]+)/);
        if (match) {
            return "node_modules/".concat(match[1], "/<file>");
        }
    }
    // Replace absolute paths with generic identifier
    if (normalized.startsWith("/") || normalized.match(/^[A-Za-z]:/)) {
        return "<file>";
    }
    return normalized;
}
/**
 * Clean stack trace frames - remove sensitive data but keep the event
 */
function anonymizeStackTrace(frames) {
    if (!Array.isArray(frames))
        return frames;
    return frames.map(function (frame) { return (__assign(__assign({}, frame), { filename: frame.filename
            ? anonymizeFilePath(frame.filename)
            : frame.filename, abs_path: "", 
        // Remove local variables and source code context
        vars: undefined, pre_context: undefined, post_context: undefined, context_line: frame.context_line ? "<code>" : frame.context_line })); });
}
/**
 * Anonymize user information - hash ID, remove PII
 */
function anonymizeUserInfo(user) {
    if (!user)
        return user;
    return {
        id: user.id ? simpleHash(String(user.id)) : user.id,
        username: undefined,
        email: undefined,
        ip_address: undefined,
    };
}
/**
 * Main anonymization function - minimalist approach like Rasa
 */
function anonymizeSentryEvent(event) {
    var _a, _b, _c, _d;
    try {
        // Deep copy to avoid mutating the original event
        var anonymized = structuredClone(event);
        // Clean exception stack traces
        if ((_a = anonymized.exception) === null || _a === void 0 ? void 0 : _a.values) {
            anonymized.exception.values = anonymized.exception.values.map(function (exception) { return (__assign(__assign({}, exception), { stacktrace: exception.stacktrace
                    ? __assign(__assign({}, exception.stacktrace), { frames: exception.stacktrace.frames
                            ? anonymizeStackTrace(exception.stacktrace.frames)
                            : exception.stacktrace.frames }) : exception.stacktrace })); });
        }
        // Clean thread stack traces
        if ((_b = anonymized.threads) === null || _b === void 0 ? void 0 : _b.values) {
            anonymized.threads.values = anonymized.threads.values.map(function (thread) { return (__assign(__assign({}, thread), { stacktrace: thread.stacktrace
                    ? __assign(__assign({}, thread.stacktrace), { frames: thread.stacktrace.frames
                            ? anonymizeStackTrace(thread.stacktrace.frames)
                            : thread.stacktrace.frames }) : thread.stacktrace })); });
        }
        // Anonymize user info
        if (anonymized.user) {
            anonymized.user = anonymizeUserInfo(anonymized.user);
        }
        // Remove OS environment variables
        if ((_d = (_c = anonymized.contexts) === null || _c === void 0 ? void 0 : _c.os) === null || _d === void 0 ? void 0 : _d.environment) {
            anonymized.contexts.os.environment = undefined;
        }
        return anonymized;
    }
    catch (error) {
        console.error("Error anonymizing Sentry event:", error);
        return null; // Drop event if anonymization fails
    }
}
