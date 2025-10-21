"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuleTypeDescriptions = exports.RuleType = void 0;
exports.getRuleType = getRuleType;
var RuleType;
(function (RuleType) {
    RuleType["Always"] = "Always";
    RuleType["AutoAttached"] = "Auto Attached";
    RuleType["AgentRequested"] = "Agent Requested";
    RuleType["Manual"] = "Manual";
})(RuleType || (exports.RuleType = RuleType = {}));
exports.RuleTypeDescriptions = (_a = {},
    _a[RuleType.Always] = "Always included in model context",
    _a[RuleType.AutoAttached] = "Included when files matching a glob pattern are referenced",
    _a[RuleType.AgentRequested] = "Available to AI, which decides whether to include it. Must provide a description",
    _a[RuleType.Manual] = "Only included when explicitly mentioned using @ruleName",
    _a);
/**
 * Determines the rule type based on the rule properties
 */
function getRuleType(rule) {
    // Check if globs/regex have meaningful values (not empty arrays/strings)
    var hasGlobs = rule.globs &&
        (Array.isArray(rule.globs)
            ? rule.globs.length > 0
            : rule.globs.trim().length > 0);
    var hasRegex = rule.regex &&
        (Array.isArray(rule.regex)
            ? rule.regex.length > 0
            : rule.regex.trim().length > 0);
    // Auto Attached: has globs and/or regex patterns
    if (hasGlobs || hasRegex) {
        return RuleType.AutoAttached;
    }
    // Check if description has meaningful value
    var hasDescription = rule.description && rule.description.trim().length > 0;
    // Agent Requested: has description and alwaysApply is false
    if (hasDescription && rule.alwaysApply === false) {
        return RuleType.AgentRequested;
    }
    // Manual: alwaysApply is false but no description
    if (rule.alwaysApply === false && !hasDescription) {
        return RuleType.Manual;
    }
    // Always: default case (alwaysApply true/undefined, no globs/regex)
    return RuleType.Always;
}
