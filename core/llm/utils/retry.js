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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncDelegator = (this && this.__asyncDelegator) || function (o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
};
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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withRetry = withRetry;
exports.retryAsync = retryAsync;
exports.withLLMRetry = withLLMRetry;
/**
 * Default configuration for retry behavior
 */
var DEFAULT_RETRY_OPTIONS = {
    maxAttempts: 3,
    baseDelay: 1000,
    maxDelay: 30000,
    jitterFactor: 0.3,
    shouldRetry: defaultShouldRetry,
    onRetry: defaultOnRetry,
};
/**
 * Default function to determine if an error should be retried
 * Retries on:
 * - Network errors
 * - HTTP 429 (Too Many Requests)
 * - HTTP 5xx (Server errors)
 * - Specific AWS errors
 * - Timeout errors
 */
function defaultShouldRetry(error, attempt) {
    // Note: maxAttempts check is handled by the retry logic itself
    // This function only determines if the error type is retryable
    var _a, _b;
    // Network/connection errors
    if (error.code === "ENOTFOUND" ||
        error.code === "ECONNRESET" ||
        error.code === "ECONNREFUSED" ||
        error.code === "ETIMEDOUT") {
        return true;
    }
    // AWS SDK specific errors (v3 - check for AWS error structure and retryable types)
    var isAwsError = error.$fault || error.$metadata || (error.name && error.__type);
    var awsRetryableErrors = [
        "ThrottlingException",
        "ServiceUnavailableException",
        "InternalServerError",
        "RequestTimeout",
        "ModelNotReadyException",
        "ModelTimeoutException",
        "ResourceNotFoundException",
    ];
    if (isAwsError && error.name && awsRetryableErrors.includes(error.name)) {
        return true;
    }
    // HTTP status codes
    if (error.status || error.statusCode) {
        var status_1 = error.status || error.statusCode;
        // Rate limiting
        if (status_1 === 429) {
            return true;
        }
        // Server errors (5xx)
        if (status_1 >= 500 && status_1 < 600) {
            return true;
        }
        // Don't retry client errors (4xx except 429)
        if (status_1 >= 400 && status_1 < 500) {
            return false;
        }
    }
    // Timeout errors
    if (error.name === "TimeoutError" ||
        ((_a = error.message) === null || _a === void 0 ? void 0 : _a.includes("timeout")) ||
        ((_b = error.message) === null || _b === void 0 ? void 0 : _b.includes("TIMEOUT"))) {
        return true;
    }
    // Abort signal errors should not be retried
    if (error.name === "AbortError" || error.code === "ABORT_ERR") {
        return false;
    }
    // Default to not retrying unknown errors
    return false;
}
/**
 * Default function called on each retry attempt
 */
function defaultOnRetry(error, attempt, delay) {
    console.warn("Retry attempt ".concat(attempt, " after ").concat(delay, "ms delay. Error: ").concat(error.message || error));
}
/**
 * Calculate delay with rate limit header awareness and exponential backoff fallback
 */
function calculateDelay(attempt, baseDelay, maxDelay, jitterFactor, error) {
    // Check for rate limiting headers first (more accurate than exponential backoff)
    if (error === null || error === void 0 ? void 0 : error.headers) {
        var retryAfter = error.headers["retry-after"] ||
            error.headers["x-ratelimit-reset"] ||
            error.headers["ratelimit-reset"] ||
            error.headers["Retry-After"] ||
            error.headers["X-RateLimit-Reset"] ||
            error.headers["RateLimit-Reset"];
        if (retryAfter) {
            var delayMs = void 0;
            // Parse retry-after header (can be seconds or HTTP date)
            if (typeof retryAfter === "string" && isNaN(Number(retryAfter))) {
                // HTTP date format
                var resetTime = new Date(retryAfter).getTime();
                var now = Date.now();
                delayMs = Math.max(0, resetTime - now);
            }
            else {
                // Seconds format
                delayMs = Number(retryAfter) * 1000;
            }
            // Apply small jitter to spread requests, then respect maxDelay as hard limit
            var jitterMultiplier_1 = 1 + (Math.random() * 0.1 - 0.05); // Small jitter ±5%
            var jitteredDelay_1 = delayMs * jitterMultiplier_1;
            return Math.max(0, Math.floor(Math.min(jitteredDelay_1, maxDelay)));
        }
    }
    // Fallback to exponential backoff if no rate limit headers
    var exponentialDelay = baseDelay * Math.pow(2, attempt - 1);
    var cappedDelay = Math.min(exponentialDelay, maxDelay);
    // Add jitter: random value between (1 - jitterFactor) and (1 + jitterFactor)
    var jitterMultiplier = 1 + (Math.random() * 2 - 1) * jitterFactor;
    var jitteredDelay = cappedDelay * jitterMultiplier;
    return Math.max(0, Math.floor(jitteredDelay));
}
/**
 * Sleep for the specified number of milliseconds
 */
function sleep(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
/**
 * Retry decorator for async functions with exponential backoff and jitter
 *
 * @param options Retry configuration options
 * @returns Decorator function
 *
 * @example
 * ```typescript
 * class MyLLM {
 *   @withRetry({ maxAttempts: 5, baseDelay: 2000 })
 *   async streamChat(messages: ChatMessage[]): Promise<AsyncGenerator<ChatMessage>> {
 *     // Implementation that might fail
 *   }
 * }
 * ```
 */
function withRetry(options) {
    if (options === void 0) { options = {}; }
    var config = __assign(__assign({}, DEFAULT_RETRY_OPTIONS), options);
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // Handle different decorator calling patterns
        var target = args[0], propertyName = args[1], descriptor = args[2];
        // Get the original method
        var originalMethod;
        if (descriptor && descriptor.value) {
            originalMethod = descriptor.value;
        }
        else {
            // Get method from prototype
            originalMethod = target[propertyName];
        }
        if (!originalMethod || typeof originalMethod !== "function") {
            throw new Error("@withRetry can only be applied to methods");
        }
        // Check if the original method is an async generator function
        var isAsyncGenerator = originalMethod.constructor.name === "AsyncGeneratorFunction";
        var wrappedMethod = isAsyncGenerator
            ? function () {
                var methodArgs = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    methodArgs[_i] = arguments[_i];
                }
                return __asyncGenerator(this, arguments, function () {
                    var lastError, attempt, generator, error_1, delay;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                attempt = 1;
                                _a.label = 1;
                            case 1:
                                if (!(attempt <= config.maxAttempts)) return [3 /*break*/, 9];
                                _a.label = 2;
                            case 2:
                                _a.trys.push([2, 6, , 8]);
                                generator = originalMethod.apply(this, methodArgs);
                                return [5 /*yield**/, __values(__asyncDelegator(__asyncValues(createRetryableAsyncGenerator(generator, config, originalMethod, this, methodArgs, attempt))))];
                            case 3: return [4 /*yield*/, __await.apply(void 0, [_a.sent()])];
                            case 4:
                                _a.sent();
                                return [4 /*yield*/, __await(void 0)];
                            case 5: return [2 /*return*/, _a.sent()]; // Successfully completed
                            case 6:
                                error_1 = _a.sent();
                                lastError = error_1;
                                // Check if we should retry this error
                                if (!config.shouldRetry(error_1, attempt)) {
                                    throw error_1;
                                }
                                // Don't delay on the last attempt
                                if (attempt === config.maxAttempts) {
                                    return [3 /*break*/, 9];
                                }
                                delay = calculateDelay(attempt, config.baseDelay, config.maxDelay, config.jitterFactor, error_1);
                                config.onRetry(error_1, attempt, delay);
                                return [4 /*yield*/, __await(sleep(delay))];
                            case 7:
                                _a.sent();
                                return [3 /*break*/, 8];
                            case 8:
                                attempt++;
                                return [3 /*break*/, 1];
                            case 9: 
                            // If we get here, all attempts failed
                            throw lastError;
                        }
                    });
                });
            }
            : function () {
                var methodArgs = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    methodArgs[_i] = arguments[_i];
                }
                return __awaiter(this, void 0, void 0, function () {
                    var lastError, attempt, result, error_2, delay;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                attempt = 1;
                                _a.label = 1;
                            case 1:
                                if (!(attempt <= config.maxAttempts)) return [3 /*break*/, 7];
                                _a.label = 2;
                            case 2:
                                _a.trys.push([2, 4, , 6]);
                                result = originalMethod.apply(this, methodArgs);
                                return [4 /*yield*/, result];
                            case 3: return [2 /*return*/, _a.sent()];
                            case 4:
                                error_2 = _a.sent();
                                lastError = error_2;
                                // Check if we should retry this error
                                if (!config.shouldRetry(error_2, attempt)) {
                                    throw error_2;
                                }
                                // Don't delay on the last attempt
                                if (attempt === config.maxAttempts) {
                                    return [3 /*break*/, 7];
                                }
                                delay = calculateDelay(attempt, config.baseDelay, config.maxDelay, config.jitterFactor, error_2);
                                config.onRetry(error_2, attempt, delay);
                                return [4 /*yield*/, sleep(delay)];
                            case 5:
                                _a.sent();
                                return [3 /*break*/, 6];
                            case 6:
                                attempt++;
                                return [3 /*break*/, 1];
                            case 7: 
                            // If we get here, all attempts failed
                            throw lastError;
                        }
                    });
                });
            };
        // Apply the wrapped method based on how the decorator was called
        if (descriptor) {
            descriptor.value = wrappedMethod;
            return descriptor;
        }
        else {
            // Handle case where descriptor is not provided
            target[propertyName] = wrappedMethod;
            return wrappedMethod;
        }
    };
}
/**
 * Creates a retryable async generator that handles errors during iteration
 */
function createRetryableAsyncGenerator(generator, config, originalMethod, context, args, initialAttempt) {
    return __asyncGenerator(this, arguments, function createRetryableAsyncGenerator_1() {
        var currentGenerator, attempt, _a, currentGenerator_1, currentGenerator_1_1, value, e_1_1, error_3, lastError, retryAttempt, delay, newGenerator, _b, newGenerator_1, newGenerator_1_1, value, e_2_1, retryError_1;
        var _c, e_1, _d, _e, _f, e_2, _g, _h;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    currentGenerator = generator;
                    attempt = initialAttempt;
                    _j.label = 1;
                case 1:
                    _j.trys.push([1, 16, , 41]);
                    _j.label = 2;
                case 2:
                    _j.trys.push([2, 9, 10, 15]);
                    _a = true, currentGenerator_1 = __asyncValues(currentGenerator);
                    _j.label = 3;
                case 3: return [4 /*yield*/, __await(currentGenerator_1.next())];
                case 4:
                    if (!(currentGenerator_1_1 = _j.sent(), _c = currentGenerator_1_1.done, !_c)) return [3 /*break*/, 8];
                    _e = currentGenerator_1_1.value;
                    _a = false;
                    value = _e;
                    return [4 /*yield*/, __await(value)];
                case 5: return [4 /*yield*/, _j.sent()];
                case 6:
                    _j.sent();
                    _j.label = 7;
                case 7:
                    _a = true;
                    return [3 /*break*/, 3];
                case 8: return [3 /*break*/, 15];
                case 9:
                    e_1_1 = _j.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 15];
                case 10:
                    _j.trys.push([10, , 13, 14]);
                    if (!(!_a && !_c && (_d = currentGenerator_1.return))) return [3 /*break*/, 12];
                    return [4 /*yield*/, __await(_d.call(currentGenerator_1))];
                case 11:
                    _j.sent();
                    _j.label = 12;
                case 12: return [3 /*break*/, 14];
                case 13:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 14: return [7 /*endfinally*/];
                case 15: return [3 /*break*/, 41];
                case 16:
                    error_3 = _j.sent();
                    lastError = error_3;
                    retryAttempt = attempt + 1;
                    _j.label = 17;
                case 17:
                    if (!(retryAttempt <= config.maxAttempts)) return [3 /*break*/, 40];
                    // Check if we should retry this error
                    if (!config.shouldRetry(error_3, retryAttempt)) {
                        throw error_3;
                    }
                    // Don't delay on the last attempt
                    if (retryAttempt === config.maxAttempts) {
                        return [3 /*break*/, 40];
                    }
                    delay = calculateDelay(retryAttempt, config.baseDelay, config.maxDelay, config.jitterFactor, error_3);
                    config.onRetry(error_3, retryAttempt, delay);
                    return [4 /*yield*/, __await(sleep(delay))];
                case 18:
                    _j.sent();
                    _j.label = 19;
                case 19:
                    _j.trys.push([19, 38, , 39]);
                    return [4 /*yield*/, __await(originalMethod.apply(context, args))];
                case 20:
                    newGenerator = _j.sent();
                    if (!(newGenerator &&
                        typeof newGenerator[Symbol.asyncIterator] === "function")) return [3 /*break*/, 36];
                    _j.label = 21;
                case 21:
                    _j.trys.push([21, 28, 29, 34]);
                    _b = true, newGenerator_1 = (e_2 = void 0, __asyncValues(newGenerator));
                    _j.label = 22;
                case 22: return [4 /*yield*/, __await(newGenerator_1.next())];
                case 23:
                    if (!(newGenerator_1_1 = _j.sent(), _f = newGenerator_1_1.done, !_f)) return [3 /*break*/, 27];
                    _h = newGenerator_1_1.value;
                    _b = false;
                    value = _h;
                    return [4 /*yield*/, __await(value)];
                case 24: return [4 /*yield*/, _j.sent()];
                case 25:
                    _j.sent();
                    _j.label = 26;
                case 26:
                    _b = true;
                    return [3 /*break*/, 22];
                case 27: return [3 /*break*/, 34];
                case 28:
                    e_2_1 = _j.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 34];
                case 29:
                    _j.trys.push([29, , 32, 33]);
                    if (!(!_b && !_f && (_g = newGenerator_1.return))) return [3 /*break*/, 31];
                    return [4 /*yield*/, __await(_g.call(newGenerator_1))];
                case 30:
                    _j.sent();
                    _j.label = 31;
                case 31: return [3 /*break*/, 33];
                case 32:
                    if (e_2) throw e_2.error;
                    return [7 /*endfinally*/];
                case 33: return [7 /*endfinally*/];
                case 34: return [4 /*yield*/, __await(void 0)];
                case 35: return [2 /*return*/, _j.sent()]; // Successfully completed
                case 36: throw new Error("Method did not return an async generator on retry");
                case 37: return [3 /*break*/, 39];
                case 38:
                    retryError_1 = _j.sent();
                    lastError = retryError_1;
                    error_3 = retryError_1;
                    return [3 /*break*/, 39];
                case 39:
                    retryAttempt++;
                    return [3 /*break*/, 17];
                case 40: 
                // If we get here, all retry attempts failed
                throw lastError;
                case 41: return [2 /*return*/];
            }
        });
    });
}
/**
 * Functional version of retry for use without decorators
 *
 * @param fn Function to retry
 * @param options Retry configuration options
 * @returns Promise that resolves with the function result or rejects with the last error
 *
 * @example
 * ```typescript
 * const result = await retryAsync(
 *   () => someApiCall(),
 *   { maxAttempts: 3, baseDelay: 1000 }
 * );
 * ```
 */
function retryAsync(fn_1) {
    return __awaiter(this, arguments, void 0, function (fn, options) {
        var config, lastError, attempt, error_4, delay;
        if (options === void 0) { options = {}; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    config = __assign(__assign({}, DEFAULT_RETRY_OPTIONS), options);
                    attempt = 1;
                    _a.label = 1;
                case 1:
                    if (!(attempt <= config.maxAttempts)) return [3 /*break*/, 7];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 6]);
                    return [4 /*yield*/, fn()];
                case 3: return [2 /*return*/, _a.sent()];
                case 4:
                    error_4 = _a.sent();
                    lastError = error_4;
                    // Check if we should retry this error
                    if (!config.shouldRetry(error_4, attempt)) {
                        throw error_4;
                    }
                    // Don't delay on the last attempt
                    if (attempt === config.maxAttempts) {
                        return [3 /*break*/, 7];
                    }
                    delay = calculateDelay(attempt, config.baseDelay, config.maxDelay, config.jitterFactor, error_4);
                    config.onRetry(error_4, attempt, delay);
                    return [4 /*yield*/, sleep(delay)];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 6:
                    attempt++;
                    return [3 /*break*/, 1];
                case 7: 
                // If we get here, all attempts failed
                throw lastError;
            }
        });
    });
}
/**
 * Retry decorator specifically configured for LLM providers
 * Uses sensible defaults for LLM API calls, including longer delays
 * for capacity provisioning (e.g., AWS Bedrock can require up to 59+ seconds)
 */
function withLLMRetry(options) {
    if (options === void 0) { options = {}; }
    return withRetry(__assign({ maxAttempts: 5, baseDelay: 2000, maxDelay: 90000, jitterFactor: 0.4 }, options));
}
