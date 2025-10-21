"use strict";
// Simplified in-memory LRU cache for autocomplete
// Replaces the complex SQLite-based implementation
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
exports.AutocompleteLruCache = void 0;
var AutocompleteLruCache = /** @class */ (function () {
    function AutocompleteLruCache(maxSize, ttl) {
        if (maxSize === void 0) { maxSize = 1000; }
        if (ttl === void 0) { ttl = 3600000; }
        this.cache = new Map();
        this.maxSize = maxSize;
        this.ttl = ttl;
    }
    AutocompleteLruCache.prototype.cleanExpired = function () {
        var now = Date.now();
        for (var _i = 0, _a = this.cache.entries(); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], entry = _b[1];
            if (now - entry.timestamp > this.ttl) {
                this.cache.delete(key);
            }
        }
    };
    AutocompleteLruCache.prototype.ensureSize = function () {
        var _this = this;
        if (this.cache.size > this.maxSize) {
            // Delete oldest entries
            var entries = Array.from(this.cache.entries());
            var toDelete = entries.slice(0, this.cache.size - this.maxSize);
            toDelete.forEach(function (_a) {
                var key = _a[0];
                return _this.cache.delete(key);
            });
        }
    };
    AutocompleteLruCache.prototype.get = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var entry;
            return __generator(this, function (_a) {
                this.cleanExpired();
                entry = this.cache.get(key);
                if (entry) {
                    // Move to end (LRU behavior)
                    this.cache.delete(key);
                    this.cache.set(key, entry);
                    return [2 /*return*/, entry.completion];
                }
                return [2 /*return*/, undefined];
            });
        });
    };
    AutocompleteLruCache.prototype.put = function (key, completion) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.cleanExpired();
                this.ensureSize();
                this.cache.set(key, {
                    completion: completion,
                    timestamp: Date.now(),
                });
                return [2 /*return*/];
            });
        });
    };
    AutocompleteLruCache.prototype.clear = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.cache.clear();
                return [2 /*return*/];
            });
        });
    };
    AutocompleteLruCache.prototype.size = function () {
        return this.cache.size;
    };
    AutocompleteLruCache.get = function () {
        if (!AutocompleteLruCache.instance) {
            AutocompleteLruCache.instance = new AutocompleteLruCache();
        }
        return Promise.resolve(AutocompleteLruCache.instance);
    };
    AutocompleteLruCache.reset = function () {
        AutocompleteLruCache.instance = null;
    };
    // Static method to get singleton instance
    AutocompleteLruCache.instance = null;
    return AutocompleteLruCache;
}());
exports.AutocompleteLruCache = AutocompleteLruCache;
