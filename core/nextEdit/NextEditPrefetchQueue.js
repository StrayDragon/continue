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
exports.PrefetchQueue = void 0;
var NextEditProvider_1 = require("./NextEditProvider");
/**
 * Keeps a queue of the broken down diffs from a changed editable range, as determined in core/nextEdit/diff.ts
 */
/**
 * This is where the chain is stored. Think of it as a regular queue, but being a singleton because we need one source of truth for the chain.
 * I originally intended this to be a separate data structure to handle prefetching next edit outcomes from the model in the background.
 * Due to subpar results, lack of satisfactory next edit location suggestion algorithms and token cost/latency issues, I scratched the idea.
 */
var PrefetchQueue = /** @class */ (function () {
    function PrefetchQueue(prefetchLimit) {
        if (prefetchLimit === void 0) { prefetchLimit = 3; }
        this.unprocessedQueue = [];
        this.processedQueue = [];
        this.usingFullFileDiff = true;
        this.prefetchLimit = prefetchLimit;
        this.abortController = new AbortController();
    }
    PrefetchQueue.getInstance = function (prefetchLimit) {
        if (prefetchLimit === void 0) { prefetchLimit = 3; }
        if (!PrefetchQueue.instance) {
            PrefetchQueue.instance = new PrefetchQueue(prefetchLimit);
        }
        return PrefetchQueue.instance;
    };
    PrefetchQueue.prototype.initialize = function (usingFullFileDiff) {
        this.usingFullFileDiff = usingFullFileDiff;
    };
    // Queue management methods
    PrefetchQueue.prototype.enqueueUnprocessed = function (location) {
        this.unprocessedQueue.push(location);
    };
    PrefetchQueue.prototype.dequeueUnprocessed = function () {
        return this.unprocessedQueue.shift();
    };
    PrefetchQueue.prototype.enqueueProcessed = function (item) {
        this.processedQueue.push(item);
    };
    PrefetchQueue.prototype.dequeueProcessed = function () {
        return this.processedQueue.shift();
    };
    // Process items from unprocessed queue
    PrefetchQueue.prototype.process = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var location_1, outcome, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.unprocessedQueue.length > 0 &&
                            this.processedQueue.length < this.prefetchLimit &&
                            !this.abortController.signal.aborted)) return [3 /*break*/, 5];
                        location_1 = this.dequeueUnprocessed();
                        console.log("processing:");
                        console.log((location_1 === null || location_1 === void 0 ? void 0 : location_1.range.start.line) + " to " + (location_1 === null || location_1 === void 0 ? void 0 : location_1.range.end.line));
                        if (!location_1)
                            return [3 /*break*/, 5];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, NextEditProvider_1.NextEditProvider.getInstance().provideInlineCompletionItemsWithChain(ctx, location_1, this.abortController.signal, this.usingFullFileDiff)];
                    case 2:
                        outcome = _a.sent();
                        if (!outcome) {
                            console.log("outcome is undefined");
                            return [3 /*break*/, 0];
                        }
                        this.enqueueProcessed({
                            location: location_1,
                            outcome: outcome,
                        });
                        console.log("the length of processed queue after processing is:", this.processedQueue.length);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        if (!this.abortController.signal.aborted) {
                            // Handle error
                            console.error("Error processing item:", error_1);
                        }
                        // If aborted, we just stop processing
                        return [3 /*break*/, 5];
                    case 4: return [3 /*break*/, 0];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    // Abort all operations
    PrefetchQueue.prototype.abort = function () {
        this.abortController.abort();
        this.clear();
        // Create a new AbortController for future operations
        this.abortController = new AbortController();
    };
    // Clear all queues
    PrefetchQueue.prototype.clear = function () {
        this.unprocessedQueue = [];
        this.processedQueue = [];
    };
    Object.defineProperty(PrefetchQueue.prototype, "unprocessedCount", {
        // Additional helper methods
        get: function () {
            return this.unprocessedQueue.length;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PrefetchQueue.prototype, "processedCount", {
        get: function () {
            return this.processedQueue.length;
        },
        enumerable: false,
        configurable: true
    });
    PrefetchQueue.prototype.peekProcessed = function () {
        return this.processedQueue[0];
    };
    PrefetchQueue.prototype.peekThreeProcessed = function () {
        var count = Math.min(3, this.processedQueue.length);
        var firstThree = this.processedQueue.slice(0, count);
        firstThree.forEach(function (item, index) {
            console.debug("Item ".concat(index + 1, ": ").concat(item.location.range.start.line, " to ").concat(item.location.range.end.line));
        });
    };
    PrefetchQueue.prototype.setPreetchLimit = function (limit) {
        this.prefetchLimit = limit;
    };
    PrefetchQueue.instance = null;
    return PrefetchQueue;
}());
exports.PrefetchQueue = PrefetchQueue;
