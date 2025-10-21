"use strict";
// Simplified logging service for autocomplete
// Replaces complex telemetry and data logging with basic console logging
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutocompleteLoggingService = void 0;
var AutocompleteLoggingService = /** @class */ (function () {
    function AutocompleteLoggingService() {
        // Key is completionId
        this._abortControllers = new Map();
    }
    AutocompleteLoggingService.prototype.createAbortController = function (completionId) {
        var controller = new AbortController();
        this._abortControllers.set(completionId, controller);
        return controller;
    };
    AutocompleteLoggingService.prototype.deleteAbortController = function (completionId) {
        this._abortControllers.delete(completionId);
    };
    AutocompleteLoggingService.prototype.accept = function (completionId) {
        // Simplified acceptance tracking - just log to console
        console.log("[Conti] Autocomplete accepted: ".concat(completionId));
        return undefined;
    };
    AutocompleteLoggingService.prototype.markDisplayed = function (completionId, outcome) {
        // Simplified display tracking
        console.log("[Conti] Autocomplete displayed: ".concat(completionId), {
            model: outcome.modelName,
            provider: outcome.modelProvider,
            time: outcome.time,
            cacheHit: outcome.cacheHit,
        });
    };
    AutocompleteLoggingService.prototype.cancel = function () {
        // Cancel all ongoing requests
        for (var _i = 0, _a = this._abortControllers.values(); _i < _a.length; _i++) {
            var controller = _a[_i];
            controller.abort();
        }
        this._abortControllers.clear();
        console.log("[Conti] All autocomplete requests cancelled");
    };
    AutocompleteLoggingService.prototype.trackPendingCompletion = function (completionId) {
        console.log("[Conti] Pending completion: ".concat(completionId));
    };
    AutocompleteLoggingService.prototype.handleAbort = function (completionId) {
        this._abortControllers.delete(completionId);
        console.log("[Conti] Completion aborted: ".concat(completionId));
    };
    AutocompleteLoggingService.prototype.cancelRejectionTimeout = function (completionId) {
        // Simplified - just log
        console.log("[Conti] Rejection timeout cancelled: ".concat(completionId));
    };
    AutocompleteLoggingService.getInstance = function () {
        if (!AutocompleteLoggingService.instance) {
            AutocompleteLoggingService.instance = new AutocompleteLoggingService();
        }
        return AutocompleteLoggingService.instance;
    };
    AutocompleteLoggingService.reset = function () {
        AutocompleteLoggingService.instance = null;
    };
    // Static methods for singleton pattern
    AutocompleteLoggingService.instance = null;
    return AutocompleteLoggingService;
}());
exports.AutocompleteLoggingService = AutocompleteLoggingService;
