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
exports.NextEditLoggingService = void 0;
var parameters_1 = require("../util/parameters");
var fetch_1 = require("@continuedev/fetch");
var env_1 = require("../control-plane/env");
var log_1 = require("../data/log");
var posthog_1 = require("../util/posthog");
var NextEditLoggingService = /** @class */ (function () {
    function NextEditLoggingService() {
        // Key is completionId
        this._abortControllers = new Map();
        this._logRejectionTimeouts = new Map();
        this._outcomes = new Map();
        // Track minimal data for completions that get aborted before we have full outcome.
        this._pendingCompletions = new Map();
        this._lastDisplayedCompletion = undefined;
    }
    NextEditLoggingService.getInstance = function () {
        if (!NextEditLoggingService.instance) {
            NextEditLoggingService.instance = new NextEditLoggingService();
        }
        return NextEditLoggingService.instance;
    };
    NextEditLoggingService.prototype.createAbortController = function (completionId) {
        var abortController = new AbortController();
        this._abortControllers.set(completionId, abortController);
        this.trackPendingCompletion(completionId);
        return abortController;
    };
    NextEditLoggingService.prototype.deleteAbortController = function (completionId) {
        this._abortControllers.delete(completionId);
        this._pendingCompletions.delete(completionId);
    };
    // Keep track of a new completion request.
    NextEditLoggingService.prototype.trackPendingCompletion = function (completionId) {
        this._pendingCompletions.set(completionId, {
            startTime: Date.now(),
        });
    };
    // Update pending completion info as it becomes available.
    NextEditLoggingService.prototype.updatePendingCompletion = function (completionId, data) {
        var pending = this._pendingCompletions.get(completionId);
        if (pending) {
            this._pendingCompletions.set(completionId, __assign(__assign({}, pending), data));
        }
        else {
            // If we haven't tracked it yet, create new entry with provided data.
            this._pendingCompletions.set(completionId, __assign({ startTime: Date.now() }, data));
        }
    };
    NextEditLoggingService.prototype.cancel = function () {
        var _this = this;
        this._abortControllers.forEach(function (abortController, completionId) {
            _this.handleAbort(completionId);
            abortController.abort();
        });
        this._abortControllers.clear();
    };
    NextEditLoggingService.prototype.accept = function (completionId) {
        this._pendingCompletions.delete(completionId);
        if (this._logRejectionTimeouts.has(completionId)) {
            clearTimeout(this._logRejectionTimeouts.get(completionId));
            this._logRejectionTimeouts.delete(completionId);
        }
        if (this._outcomes.has(completionId)) {
            var outcome = this._outcomes.get(completionId);
            outcome.accepted = true;
            outcome.aborted = false;
            this.logNextEditOutcome(outcome);
            this._outcomes.delete(completionId);
            return outcome;
        }
    };
    NextEditLoggingService.prototype.reject = function (completionId) {
        this._pendingCompletions.delete(completionId);
        if (this._logRejectionTimeouts.has(completionId)) {
            clearTimeout(this._logRejectionTimeouts.get(completionId));
            this._logRejectionTimeouts.delete(completionId);
        }
        if (this._outcomes.has(completionId)) {
            var outcome = this._outcomes.get(completionId);
            outcome.accepted = false;
            outcome.aborted = false;
            this.logNextEditOutcome(outcome);
            this._outcomes.delete(completionId);
            return outcome;
        }
    };
    NextEditLoggingService.prototype.cancelRejectionTimeout = function (completionId) {
        if (this._logRejectionTimeouts.has(completionId)) {
            clearTimeout(this._logRejectionTimeouts.get(completionId));
            this._logRejectionTimeouts.delete(completionId);
        }
        if (this._outcomes.has(completionId)) {
            this._outcomes.delete(completionId);
        }
    };
    NextEditLoggingService.prototype.cancelRejectionTimeoutButKeepCompletionId = function (completionId) {
        if (this._logRejectionTimeouts.has(completionId)) {
            clearTimeout(this._logRejectionTimeouts.get(completionId));
        }
    };
    NextEditLoggingService.prototype.markDisplayed = function (completionId, outcome) {
        var _this = this;
        var _a;
        // Remove from pending since we now have full data.
        this._pendingCompletions.delete(completionId);
        outcome.aborted = false;
        var logRejectionTimeout = setTimeout(function () {
            // Wait 10 seconds, then assume it wasn't accepted
            outcome.accepted = false;
            outcome.aborted = false;
            _this.logNextEditOutcome(outcome);
            _this._logRejectionTimeouts.delete(completionId);
            _this._outcomes.delete(completionId);
        }, parameters_1.COUNT_COMPLETION_REJECTED_AFTER);
        this._outcomes.set(completionId, outcome);
        this._logRejectionTimeouts.set(completionId, logRejectionTimeout);
        // If the previously displayed completion is still waiting for rejection,
        // and this one is a continuation of that (the outcome.completion is the same modulo prefix)
        // then we should cancel the rejection timeout
        var previous = this._lastDisplayedCompletion;
        var now = Date.now();
        if (previous && this._logRejectionTimeouts.has(previous.id)) {
            var previousOutcome = this._outcomes.get(previous.id);
            var c1 = (_a = previousOutcome === null || previousOutcome === void 0 ? void 0 : previousOutcome.completion.split("\n")[0]) !== null && _a !== void 0 ? _a : "";
            var c2 = outcome.completion.split("\n")[0];
            if (previousOutcome &&
                (c1.endsWith(c2) ||
                    c2.endsWith(c1) ||
                    c1.startsWith(c2) ||
                    c2.startsWith(c1))) {
                this.cancelRejectionTimeout(previous.id);
            }
            else if (now - previous.displayedAt < 500) {
                // If a completion isn't shown for more than
                this.cancelRejectionTimeout(previous.id);
            }
        }
        this._lastDisplayedCompletion = {
            id: completionId,
            displayedAt: now,
        };
    };
    NextEditLoggingService.prototype.handleAbort = function (completionId) {
        // Clear any pending rejection timeout.
        if (this._logRejectionTimeouts.has(completionId)) {
            clearTimeout(this._logRejectionTimeouts.get(completionId));
            this._logRejectionTimeouts.delete(completionId);
        }
        // Only log if the completion was displayed to the user.
        // This aligns with Autocomplete behavior and prevents logging
        // of cancelled requests that never reached the user.
        if (this._outcomes.has(completionId)) {
            var outcome = this._outcomes.get(completionId);
            // outcome.accepted = false;
            outcome.aborted = true;
            this.logNextEditOutcome(outcome);
            this._outcomes.delete(completionId);
        }
        // Clean up.
        this._pendingCompletions.delete(completionId);
    };
    NextEditLoggingService.prototype.logNextEditOutcome = function (outcome) {
        if (outcome.aborted === undefined) {
            outcome.aborted = false;
        }
        void log_1.DataLogger.getInstance().logDevData({
            name: "nextEditOutcome",
            data: outcome,
            // data: {
            //   ...outcome, // TODO: this is somehow getting messed up with autocomplete schema.
            // },
        });
        // const { prompt, completion, prefix, suffix, ...restOfOutcome } = outcome;
        if (outcome.requestId && outcome.accepted !== undefined) {
            void this.logAcceptReject(outcome.requestId, outcome.accepted);
        }
        void posthog_1.Telemetry.capture("nextEditOutcome", outcome, true);
    };
    NextEditLoggingService.prototype.logAcceptReject = function (requestId, accepted) {
        return __awaiter(this, void 0, void 0, function () {
            var controlPlaneEnv, resp, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!posthog_1.Telemetry.client) {
                            return [2 /*return*/];
                        }
                        controlPlaneEnv = (0, env_1.getControlPlaneEnvSync)("production");
                        return [4 /*yield*/, (0, fetch_1.fetchwithRequestOptions)(new URL("model-proxy/v1/feedback", controlPlaneEnv.CONTROL_PLANE_URL), {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    requestId: requestId,
                                    accepted: accepted,
                                }),
                            })];
                    case 1:
                        resp = _a.sent();
                        console.debug("Feedback: ", resp);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.debug("Error capturing feedback: ".concat(error_1.message));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return NextEditLoggingService;
}());
exports.NextEditLoggingService = NextEditLoggingService;
