"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateRequestCost = calculateRequestCost;
function calculateAnthropicCost(model, usage) {
    // Normalize model name to handle various formats
    var normalizedModel = model.toLowerCase();
    // Define pricing per million tokens (MTok)
    var pricing = {
        // Claude Opus 4 (most intelligent model)
        "claude-3-opus": {
            input: 15,
            output: 75,
            cacheWrite: 18.75,
            cacheRead: 1.5,
        },
        "claude-3-opus-20240229": {
            input: 15,
            output: 75,
            cacheWrite: 18.75,
            cacheRead: 1.5,
        },
        // Claude Sonnet 4 (optimal balance)
        "claude-3-5-sonnet": {
            input: 3,
            output: 15,
            cacheWrite: 3.75,
            cacheRead: 0.3,
        },
        "claude-3-5-sonnet-20241022": {
            input: 3,
            output: 15,
            cacheWrite: 3.75,
            cacheRead: 0.3,
        },
        "claude-3-5-sonnet-20240620": {
            input: 3,
            output: 15,
            cacheWrite: 3.75,
            cacheRead: 0.3,
        },
        // Claude Haiku 3.5 (fastest, most cost-effective)
        "claude-3-5-haiku": {
            input: 0.8,
            output: 4,
            cacheWrite: 1,
            cacheRead: 0.08,
        },
        "claude-3-5-haiku-20241022": {
            input: 0.8,
            output: 4,
            cacheWrite: 1,
            cacheRead: 0.08,
        },
        // Legacy Claude 3 Haiku
        "claude-3-haiku": {
            input: 0.25,
            output: 1.25,
            cacheWrite: 0.3,
            cacheRead: 0.03,
        },
        "claude-3-haiku-20240307": {
            input: 0.25,
            output: 1.25,
            cacheWrite: 0.3,
            cacheRead: 0.03,
        },
    };
    // Find matching pricing model
    var modelPricing = pricing[normalizedModel];
    // If exact match not found, try to find by partial match
    if (!modelPricing) {
        for (var _i = 0, _a = Object.entries(pricing); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            if (normalizedModel.includes(key) || key.includes(normalizedModel)) {
                modelPricing = value;
                break;
            }
        }
    }
    // If still no match, try common patterns
    if (!modelPricing) {
        if (normalizedModel.includes("opus")) {
            modelPricing = pricing["claude-3-opus"];
        }
        else if (normalizedModel.includes("sonnet")) {
            modelPricing = pricing["claude-3-5-sonnet"];
        }
        else if (normalizedModel.includes("haiku")) {
            modelPricing = pricing["claude-3-5-haiku"];
        }
    }
    if (!modelPricing) {
        return null; // Unknown model
    }
    // Calculate costs
    var inputCost = (usage.promptTokens / 1000000) * modelPricing.input;
    var outputCost = (usage.completionTokens / 1000000) * modelPricing.output;
    // Build breakdown components
    var breakdownParts = [];
    // Input tokens breakdown
    if (usage.promptTokens > 0) {
        breakdownParts.push("Input: ".concat(usage.promptTokens.toLocaleString(), " tokens \u00D7 $").concat(modelPricing.input, "/MTok = $").concat(inputCost.toFixed(6)));
    }
    // Output tokens breakdown
    if (usage.completionTokens > 0) {
        breakdownParts.push("Output: ".concat(usage.completionTokens.toLocaleString(), " tokens \u00D7 $").concat(modelPricing.output, "/MTok = $").concat(outputCost.toFixed(6)));
    }
    // Handle prompt caching costs if available
    var cacheCost = 0;
    if (usage.promptTokensDetails) {
        var _c = usage.promptTokensDetails, cachedTokens = _c.cachedTokens, cacheWriteTokens = _c.cacheWriteTokens;
        if (cacheWriteTokens && cacheWriteTokens > 0) {
            var cacheWriteCost = (cacheWriteTokens / 1000000) * modelPricing.cacheWrite;
            cacheCost += cacheWriteCost;
            breakdownParts.push("Cache Write: ".concat(cacheWriteTokens.toLocaleString(), " tokens \u00D7 $").concat(modelPricing.cacheWrite, "/MTok = $").concat(cacheWriteCost.toFixed(6)));
        }
        if (cachedTokens && cachedTokens > 0) {
            var cacheReadCost = (cachedTokens / 1000000) * modelPricing.cacheRead;
            cacheCost += cacheReadCost;
            breakdownParts.push("Cache Read: ".concat(cachedTokens.toLocaleString(), " tokens \u00D7 $").concat(modelPricing.cacheRead, "/MTok = $").concat(cacheReadCost.toFixed(6)));
        }
    }
    var totalCost = inputCost + outputCost + cacheCost;
    // Build final breakdown string
    var breakdown = "Model: ".concat(model, "\n");
    breakdown += breakdownParts.join("\n");
    if (breakdownParts.length > 1) {
        breakdown += "\nTotal: $".concat(totalCost.toFixed(6));
    }
    return {
        cost: totalCost,
        breakdown: breakdown,
    };
}
function calculateRequestCost(provider, model, usage) {
    switch (provider) {
        case "anthropic":
            return calculateAnthropicCost(model, usage);
        default:
            return null;
    }
}
