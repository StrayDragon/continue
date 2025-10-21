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
exports.getStrategyDescription = exports.getAvailableStrategies = exports.CACHING_STRATEGIES = void 0;
var MAX_CACHING_MESSAGES = 4;
// Utility function to estimate token count
var estimateTokenCount = function (text) { return Math.ceil(text.length / 4); };
// Strategy 1: No Caching
var noCachingStrategy = function (body) { return body; };
// Strategy 2: System Messages Only
var systemOnlyStrategy = function (body) {
    var availableCacheMessages = MAX_CACHING_MESSAGES;
    if (body.system && Array.isArray(body.system)) {
        return __assign(__assign({}, body), { system: body.system.map(function (item) {
                if (availableCacheMessages > 0) {
                    availableCacheMessages -= 1;
                    return __assign(__assign({}, item), { cache_control: { type: "ephemeral" } });
                }
                return item;
            }) });
    }
    return body;
};
// Strategy 3: System and Tools (High Impact)
var systemAndToolsStrategy = function (body) {
    var result = __assign({}, body);
    var availableCacheMessages = MAX_CACHING_MESSAGES;
    // Cache system messages
    if (result.system && Array.isArray(result.system)) {
        result.system = result.system.map(function (item) {
            if (availableCacheMessages > 0) {
                availableCacheMessages -= 1;
                return __assign(__assign({}, item), { cache_control: { type: "ephemeral" } });
            }
            return item;
        });
    }
    // Cache tool definitions
    if (result.tools && Array.isArray(result.tools) && result.tools.length > 0) {
        result.tools = result.tools.map(function (tool, index) {
            if (index === result.tools.length - 1 && availableCacheMessages > 0) {
                availableCacheMessages -= 1;
                return __assign(__assign({}, tool), { cache_control: { type: "ephemeral" } });
            }
            return tool;
        });
    }
    return result;
};
// Strategy 4: Optimized (Intelligent Caching)
var optimizedStrategy = function (body) {
    var result = __assign({}, body);
    var availableCacheMessages = MAX_CACHING_MESSAGES;
    // Always cache system messages
    if (result.system && Array.isArray(result.system)) {
        result.system = result.system.map(function (item) {
            if (availableCacheMessages > 0) {
                availableCacheMessages -= 1;
                return __assign(__assign({}, item), { cache_control: { type: "ephemeral" } });
            }
            return item;
        });
    }
    // Cache tool definitions
    if (result.tools && Array.isArray(result.tools) && result.tools.length > 0) {
        result.tools = result.tools.map(function (tool, index) {
            if (index === result.tools.length - 1 && availableCacheMessages > 0) {
                availableCacheMessages -= 1;
                return __assign(__assign({}, tool), { cache_control: { type: "ephemeral" } });
            }
            return tool;
        });
    }
    // Cache large messages (>500 tokens)
    if (result.messages && Array.isArray(result.messages)) {
        result.messages = result.messages.map(function (message) {
            if (message.content && typeof message.content === "string") {
                var tokens = estimateTokenCount(message.content);
                if (tokens > 500 && availableCacheMessages > 0) {
                    availableCacheMessages -= 1;
                    return __assign(__assign({}, message), { content: [
                            {
                                type: "text",
                                text: message.content,
                                cache_control: { type: "ephemeral" },
                            },
                        ] });
                }
            }
            else if (message.content && Array.isArray(message.content)) {
                // Only add one cache control per message with array content
                var addedCacheControl_1 = false;
                var updatedContent = message.content.map(function (item) {
                    if (item.type === "text" && item.text) {
                        var tokens = estimateTokenCount(item.text);
                        if (tokens > 500 &&
                            availableCacheMessages > 0 &&
                            !addedCacheControl_1) {
                            availableCacheMessages -= 1;
                            addedCacheControl_1 = true;
                            return __assign(__assign({}, item), { cache_control: { type: "ephemeral" } });
                        }
                    }
                    return item;
                });
                return __assign(__assign({}, message), { content: updatedContent });
            }
            return message;
        });
    }
    return result;
};
// Available caching strategies
exports.CACHING_STRATEGIES = {
    none: noCachingStrategy,
    systemOnly: systemOnlyStrategy,
    systemAndTools: systemAndToolsStrategy,
    optimized: optimizedStrategy,
};
// Helper function to get available strategies
var getAvailableStrategies = function () {
    return Object.keys(exports.CACHING_STRATEGIES);
};
exports.getAvailableStrategies = getAvailableStrategies;
// Helper function to get strategy description
var getStrategyDescription = function (strategy) {
    var descriptions = {
        none: "No caching - baseline for comparison",
        systemOnly: "Cache only system messages (current implementation)",
        systemAndTools: "Cache system messages and tool definitions (high impact)",
        optimized: "Intelligent caching - system, tools, and large content (best performance)",
    };
    return descriptions[strategy];
};
exports.getStrategyDescription = getStrategyDescription;
