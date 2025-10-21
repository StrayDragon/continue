"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clipboardCache = void 0;
var ClipboardCache = /** @class */ (function () {
    function ClipboardCache() {
        this.maxSize = 30;
        this.cache = new Map();
        this.order = [];
    }
    /*
    Returns true if added, false if not.
    */
    ClipboardCache.prototype.add = function (id, content) {
        if (!content) {
            return false;
        }
        // Check if the content already exists in the cache
        for (var _i = 0, _a = this.cache.entries(); _i < _a.length; _i++) {
            var _b = _a[_i], existingId = _b[0], existingContent = _b[1];
            if (existingContent === content) {
                // Remove the existing entry with the same content
                this.cache.delete(existingId);
                var index = this.order.indexOf(existingId);
                if (index > -1) {
                    this.order.splice(index, 1);
                }
                return false;
            }
        }
        // Remove the oldest entry if the cache exceeds the maximum size
        if (this.order.length >= this.maxSize) {
            var oldest = this.order.pop();
            if (oldest) {
                this.cache.delete(oldest);
            }
        }
        // Add the new entry to the cache and update the order
        this.cache.set(id, content);
        this.order.unshift(id);
        return true;
    };
    ClipboardCache.prototype.getNItems = function (count) {
        var _this = this;
        return this.order.slice(0, count).map(function (id) { return ({
            id: id,
            content: _this.cache.get(id) || "",
        }); });
    };
    ClipboardCache.prototype.get = function (id) {
        return this.cache.get(id);
    };
    ClipboardCache.prototype.select = function (id) {
        var index = this.order.indexOf(id);
        if (index > -1) {
            this.order.splice(index, 1);
            this.order.unshift(id);
        }
    };
    ClipboardCache.prototype.clear = function () {
        this.cache.clear();
        this.order = [];
    };
    return ClipboardCache;
}());
exports.clipboardCache = new ClipboardCache();
