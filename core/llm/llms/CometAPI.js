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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
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
exports.CometAPIQuotaExceededError = exports.CometAPIAuthenticationError = exports.CometAPIError = void 0;
var llm_info_1 = require("@continuedev/llm-info");
var OpenAI_js_1 = require("./OpenAI.js");
/**
 * CometAPI-specific error types for better error handling
 */
var CometAPIError = /** @class */ (function (_super) {
    __extends(CometAPIError, _super);
    function CometAPIError(message, code, statusCode) {
        var _this = _super.call(this, message) || this;
        _this.code = code;
        _this.statusCode = statusCode;
        _this.name = "CometAPIError";
        return _this;
    }
    return CometAPIError;
}(Error));
exports.CometAPIError = CometAPIError;
var CometAPIAuthenticationError = /** @class */ (function (_super) {
    __extends(CometAPIAuthenticationError, _super);
    function CometAPIAuthenticationError(message) {
        if (message === void 0) { message = "Invalid CometAPI API key"; }
        var _this = _super.call(this, message, "AUTHENTICATION_ERROR", 401) || this;
        _this.name = "CometAPIAuthenticationError";
        return _this;
    }
    return CometAPIAuthenticationError;
}(CometAPIError));
exports.CometAPIAuthenticationError = CometAPIAuthenticationError;
var CometAPIQuotaExceededError = /** @class */ (function (_super) {
    __extends(CometAPIQuotaExceededError, _super);
    function CometAPIQuotaExceededError(message) {
        if (message === void 0) { message = "CometAPI quota exceeded"; }
        var _this = _super.call(this, message, "QUOTA_EXCEEDED", 429) || this;
        _this.name = "CometAPIQuotaExceededError";
        return _this;
    }
    return CometAPIQuotaExceededError;
}(CometAPIError));
exports.CometAPIQuotaExceededError = CometAPIQuotaExceededError;
/**
 * CometAPI LLM provider - aggregates multiple mainstream models
 * from various providers (GPT, Claude, Gemini, Grok, DeepSeek, Qwen, etc.)
 *
 * Uses OpenAI-compatible API format with bearer token authentication
 */
var CometAPI = /** @class */ (function (_super) {
    __extends(CometAPI, _super);
    function CometAPI(options) {
        var _this = this;
        // Validate required configuration before calling super
        CometAPI.validateConfig(options);
        _this = _super.call(this, options) || this;
        // Align contextLength with llm-info for cometapi specifically (non-breaking for others)
        try {
            var cometProvider = llm_info_1.allModelProviders.find(function (p) { return p.id === "cometapi"; });
            var info = cometProvider === null || cometProvider === void 0 ? void 0 : cometProvider.models.find(function (m) {
                return m.regex ? m.regex.test(_this.model) : m.model === _this.model;
            });
            if (info === null || info === void 0 ? void 0 : info.contextLength) {
                // Always prefer cometapi-specific llm-info over generic provider matches
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore - accessing protected for targeted fix
                _this._contextLength = info.contextLength;
            }
        }
        catch (_a) {
            // no-op: do not fail construction on metadata issues
        }
        return _this;
    }
    /**
     * Validate CometAPI configuration
     */
    CometAPI.validateConfig = function (options) {
        var _a, _b;
        // Allow constructing without API key (tests that only instantiate should pass).
        // Enforce credentials at request time instead.
        if (!options.apiKey) {
            if (typeof process !== "undefined" && ((_a = process.env) === null || _a === void 0 ? void 0 : _a.NODE_ENV) !== "test") {
                console.warn("CometAPI: No API key provided. Requests will fail until an API key is configured. Get one at https://api.cometapi.com/console/token");
            }
            return;
        }
        if (options.apiBase && !CometAPI.isValidApiBase(options.apiBase)) {
            throw new CometAPIError("Invalid CometAPI base URL: ".concat(options.apiBase, ". Expected https://api.cometapi.com/v1/ or compatible endpoint"));
        }
        if (options.model &&
            !CometAPI.isValidModelFormat(options.model) &&
            typeof process !== "undefined" &&
            ((_b = process.env) === null || _b === void 0 ? void 0 : _b.NODE_ENV) !== "test") {
            console.warn("CometAPI: Model \"".concat(options.model, "\" may not be supported. Check CometAPI documentation for available models."));
        }
    };
    /**
     * Validate API base URL format
     */
    CometAPI.isValidApiBase = function (apiBase) {
        try {
            var url = new URL(apiBase);
            return (url.protocol === "https:" &&
                (url.hostname === "api.cometapi.com" ||
                    url.hostname.endsWith(".cometapi.com") ||
                    apiBase.includes("v1")) // Allow custom compatible endpoints
            );
        }
        catch (_a) {
            return false;
        }
    };
    /**
     * Basic model format validation
     */
    CometAPI.isValidModelFormat = function (model) {
        // Allow common model patterns
        var validPatterns = [
            /^gpt-/i,
            /^claude-/i,
            /^gemini-/i,
            /^grok/i,
            /^deepseek/i,
            /^qwen/i,
            /^text-/i,
            /^chat/i,
        ];
        return validPatterns.some(function (pattern) { return pattern.test(model); });
    };
    /**
     * Filter model list to exclude non-chat models
     * Uses pattern matching against model names
     */
    CometAPI.prototype.filterChatModels = function (models) {
        if (!models || !Array.isArray(models)) {
            return [];
        }
        return models.filter(function (model) {
            var modelId = model.id || model.model || "";
            var modelName = modelId.toLowerCase();
            // Check if model matches any ignore pattern
            var shouldIgnore = CometAPI.IGNORE_PATTERNS.some(function (pattern) {
                return modelName.includes(pattern.toLowerCase());
            });
            return !shouldIgnore;
        });
    };
    /**
     * Get recommended models for CometAPI
     * Returns predefined list since CometAPI model info is limited
     */
    CometAPI.prototype.getRecommendedModels = function () {
        return __spreadArray([], CometAPI.RECOMMENDED_MODELS, true);
    };
    /**
     * Override listModels method to apply model filtering with enhanced error handling
     */
    CometAPI.prototype.listModels = function () {
        return __awaiter(this, void 0, void 0, function () {
            var allModels, filteredModels, error_1, errorMessage, statusCode;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, _super.prototype.listModels.call(this)];
                    case 1:
                        allModels = _a.sent();
                        filteredModels = this.filterChatModels(allModels.map(function (id) { return ({ id: id }); }));
                        // If filtered list is empty or very limited, return recommended models
                        if (filteredModels.length < 5) {
                            console.info("CometAPI: Limited models available, using recommended set");
                            return [2 /*return*/, this.getRecommendedModels()];
                        }
                        return [2 /*return*/, filteredModels.map(function (model) { return model.id; })];
                    case 2:
                        error_1 = _a.sent();
                        errorMessage = (error_1 === null || error_1 === void 0 ? void 0 : error_1.message) || "Unknown error";
                        statusCode = (error_1 === null || error_1 === void 0 ? void 0 : error_1.status) || (error_1 === null || error_1 === void 0 ? void 0 : error_1.statusCode);
                        if (statusCode === 401) {
                            throw new CometAPIAuthenticationError("CometAPI authentication failed. Please check your API key.");
                        }
                        else if (statusCode === 429) {
                            throw new CometAPIQuotaExceededError("CometAPI rate limit exceeded. Please try again later.");
                        }
                        else if (statusCode >= 400 && statusCode < 500) {
                            throw new CometAPIError("CometAPI client error: ".concat(errorMessage), "CLIENT_ERROR", statusCode);
                        }
                        else if (statusCode >= 500) {
                            console.warn("CometAPI server error, falling back to recommended models:", errorMessage);
                            return [2 /*return*/, this.getRecommendedModels()];
                        }
                        else {
                            // Network or other errors - fallback gracefully
                            console.warn("CometAPI: Failed to fetch model list, using recommended models", errorMessage);
                            return [2 /*return*/, this.getRecommendedModels()];
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Override chat completion with enhanced error handling
     */
    CometAPI.prototype._streamChat = function (messages_1, signal_1) {
        return __asyncGenerator(this, arguments, function _streamChat_1(messages, signal, options) {
            var error_2, statusCode, errorMessage;
            if (options === void 0) { options = {}; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [5 /*yield**/, __values(__asyncDelegator(__asyncValues(_super.prototype._streamChat.call(this, messages, signal, options))))];
                    case 1: return [4 /*yield*/, __await.apply(void 0, [_a.sent()])];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        statusCode = (error_2 === null || error_2 === void 0 ? void 0 : error_2.status) || (error_2 === null || error_2 === void 0 ? void 0 : error_2.statusCode);
                        errorMessage = (error_2 === null || error_2 === void 0 ? void 0 : error_2.message) || "Unknown error";
                        if (statusCode === 401) {
                            throw new CometAPIAuthenticationError("CometAPI authentication failed during chat completion");
                        }
                        else if (statusCode === 429) {
                            throw new CometAPIQuotaExceededError("CometAPI rate limit exceeded during chat completion");
                        }
                        else if (errorMessage.includes("model") &&
                            errorMessage.includes("not found")) {
                            throw new CometAPIError("Model \"".concat(this.model, "\" is not available on CometAPI. Please check available models."), "MODEL_NOT_FOUND", 404);
                        }
                        else {
                            // Re-throw with more context
                            throw new CometAPIError("CometAPI chat completion failed: ".concat(errorMessage), "COMPLETION_ERROR", statusCode);
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CometAPI.providerName = "cometapi";
    CometAPI.defaultOptions = {
        apiBase: "https://api.cometapi.com/v1/",
        model: "gpt-4o-mini", // Default to a commonly available model
    };
    /**
     * Patterns to filter out non-chat models from the model list
     * Based on CometAPI documentation requirements
     */
    CometAPI.IGNORE_PATTERNS = [
        // Image generation models
        "dall-e",
        "dalle",
        "midjourney",
        "mj_",
        "stable-diffusion",
        "sd-",
        "flux-",
        "playground-v",
        "ideogram",
        "recraft-",
        "black-forest-labs",
        "/recraft-v3",
        "recraftv3",
        "stability-ai/",
        "sdxl",
        // Audio generation models
        "suno_",
        "tts",
        "whisper",
        // Video generation models
        "runway",
        "luma_",
        "luma-",
        "veo",
        "kling_",
        "minimax_video",
        "hunyuan-t1",
        // Utility models
        "embedding",
        "search-gpts",
        "files_retrieve",
        "moderation",
    ];
    /**
     * Recommended chat models from CometAPI documentation
     */
    CometAPI.RECOMMENDED_MODELS = [
        // GPT series
        "gpt-5-chat-latest",
        "chatgpt-4o-latest",
        "gpt-5-mini",
        "gpt-5-nano",
        "gpt-5",
        "gpt-4.1-mini",
        "gpt-4.1-nano",
        "gpt-4.1",
        "gpt-4o-mini",
        "o4-mini-2025-04-16",
        "o3-pro-2025-06-10",
        // Claude series
        "claude-opus-4-1-20250805",
        "claude-opus-4-1-20250805-thinking",
        "claude-sonnet-4-20250514",
        "claude-sonnet-4-20250514-thinking",
        "claude-3-7-sonnet-latest",
        "claude-3-5-haiku-latest",
        // Gemini series
        "gemini-2.5-pro",
        "gemini-2.5-flash",
        "gemini-2.5-flash-lite",
        "gemini-2.0-flash",
        // Grok series
        "grok-4-0709",
        "grok-3",
        "grok-3-mini",
        "grok-2-image-1212",
        // DeepSeek series
        "deepseek-v3.1",
        "deepseek-v3",
        "deepseek-r1-0528",
        "deepseek-chat",
        "deepseek-reasoner",
        // Qwen series
        "qwen3-30b-a3b",
        "qwen3-coder-plus-2025-07-22",
    ];
    return CometAPI;
}(OpenAI_js_1.default));
exports.default = CometAPI;
