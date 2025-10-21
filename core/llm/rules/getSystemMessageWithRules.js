"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSystemMessageWithRules = exports.getApplicableRules = exports.shouldApplyRule = void 0;
exports.getRuleId = getRuleId;
var minimatch_1 = require("minimatch");
var messageContent_1 = require("../../util/messageContent");
var uri_1 = require("../../util/uri");
var extractContentFromCodeBlocks_1 = require("../utils/extractContentFromCodeBlocks");
var extractPathsFromCodeBlocks_1 = require("../utils/extractPathsFromCodeBlocks");
/**
 * Checks if a path matches any of the provided globs
 * Supports negative patterns with ! prefix
 */
var matchesGlobs = function (filePath, globs) {
    if (!globs)
        return true;
    // Handle single string glob
    if (typeof globs === "string") {
        if (globs.startsWith("!")) {
            // Negative pattern - return false if it matches
            return !(0, minimatch_1.minimatch)(filePath, globs.substring(1));
        }
        return (0, minimatch_1.minimatch)(filePath, globs);
    }
    // Handle array of globs
    if (Array.isArray(globs)) {
        // Split into positive and negative patterns
        var positivePatterns = globs.filter(function (g) { return !g.startsWith("!"); });
        var negativePatterns = globs
            .filter(function (g) { return g.startsWith("!"); })
            .map(function (g) { return g.substring(1); }); // Remove ! prefix
        // If there are no positive patterns, the file matches unless it matches a negative pattern
        if (positivePatterns.length === 0) {
            return !negativePatterns.some(function (pattern) { return (0, minimatch_1.minimatch)(filePath, pattern); });
        }
        // File must match at least one positive pattern AND not match any negative patterns
        return (positivePatterns.some(function (pattern) { return (0, minimatch_1.minimatch)(filePath, pattern); }) &&
            !negativePatterns.some(function (pattern) { return (0, minimatch_1.minimatch)(filePath, pattern); }));
    }
    return false;
};
/**
 * Checks if file content matches any of the provided regex regex
 *
 * @param fileContent - The content of the file to check
 * @param regex - A single regex pattern string or array of regex pattern strings
 * @returns true if the content matches any pattern (or if no regex is provided), false otherwise
 */
var contentMatchesRegex = function (fileContent, regex) {
    // Handle single string pattern
    if (typeof regex === "string") {
        try {
            var expression = new RegExp(regex);
            return expression.test(fileContent);
        }
        catch (e) {
            console.error("Invalid regex pattern: ".concat(regex), e);
            return false;
        }
    }
    // Handle array of regex
    if (Array.isArray(regex)) {
        if (regex.length === 0)
            return true;
        // Content must match at least one pattern
        return regex.some(function (pattern) {
            try {
                var regex_1 = new RegExp(pattern);
                return regex_1.test(fileContent);
            }
            catch (e) {
                console.error("Invalid regex pattern: ".concat(pattern), e);
                return false;
            }
        });
    }
    return false;
};
/**
 * Determines if a file path is within a specific directory or its subdirectories
 *
 * @param filePath - The file path to check
 * @param directoryPath - The directory path to check against
 * @returns true if the file is in the directory or subdirectory, false otherwise
 */
var isFileInDirectory = function (filePath, directoryPath) {
    // Normalize paths for consistent comparison
    var normalizedFilePath = filePath.replace(/\\/g, "/");
    var normalizedDirPath = directoryPath.replace(/\\/g, "/");
    // Strip the file:// protocol if present
    normalizedFilePath = normalizedFilePath.replace(/^file:\/\//, "");
    normalizedDirPath = normalizedDirPath.replace(/^file:\/\//, "");
    // Extract the last parts of the paths for comparison
    // This allows matching relative paths with absolute paths
    // e.g., "nested-folder/file.py" should match "/path/to/nested-folder/"
    var dirPathParts = normalizedDirPath.split("/");
    // Get the directory name (last part of the directory path)
    var dirName = dirPathParts[dirPathParts.length - 1];
    // Check if the file path contains this directory followed by a slash
    // This is a simple check to see if the file might be in this directory
    var containsDir = normalizedFilePath.includes("".concat(dirName, "/"));
    return containsDir;
};
/**
 * Checks if a rule is a root-level rule (.continue directory or no file path)
 */
var isRootLevelRule = function (rule) {
    return !rule.sourceFile || rule.sourceFile.includes(".continue/"); // sourceFile path is absolute - hence we need to check for it in between
};
/**
 * Determines if a rule should be considered global and always applied
 * This includes rules with alwaysApply: true OR root-level rules with no globs
 */
var isGlobalRule = function (rule) {
    // Rules with alwaysApply: true are always global
    if (rule.alwaysApply === true) {
        return true;
    }
    // Root-level rules with no globs or regex are implicitly global
    if (isRootLevelRule(rule) &&
        !rule.globs &&
        !rule.regex &&
        rule.alwaysApply !== false) {
        return true;
    }
    return false;
};
var checkGlobsAndRegex = function (_a) {
    var rule = _a.rule, filePaths = _a.filePaths, fileContents = _a.fileContents;
    var matchingFiles = rule.globs
        ? filePaths.filter(function (filePath) { return matchesGlobs(filePath, rule.globs); })
        : filePaths;
    // If no files match the globs, don't apply the rule
    if (matchingFiles.length === 0) {
        return false;
    }
    // Now check for pattern matches in file contents if regex are specified
    if (rule.regex) {
        // Check if any of the matching files also match the content regex
        return matchingFiles.some(function (filePath) {
            var content = fileContents[filePath];
            // If we don't have the content, we can't check regex
            if (!content)
                return false;
            return contentMatchesRegex(content, rule.regex);
        });
    }
    // If we have no regex or if we couldn't check regex (no content),
    // just go with the glob matches
    return matchingFiles.length > 0;
};
/**
 * Determines if a rule should be applied based on its properties and file matching
 *
 * @param rule - The rule to check
 * @param filePaths - Array of file paths to check against the rule's globs
 * @param fileContents - Map of file paths to their contents for pattern matching
 * @param rulePolicies - Optional policies that can override normal rule behavior
 * @returns true if the rule should be applied, false otherwise
 */
var shouldApplyRule = function (rule, filePaths, rulePolicies, fileContents) {
    if (rulePolicies === void 0) { rulePolicies = {}; }
    if (fileContents === void 0) { fileContents = {}; }
    var policy = rulePolicies[rule.name || ""];
    // Never apply if policy is "off"
    if (policy === "off") {
        return false;
    }
    // If it's a global rule, always apply it regardless of file paths
    if (isGlobalRule(rule)) {
        return true;
    }
    // If there are no file paths to check and we've made it here:
    // - We've already handled global rules above
    // - Don't apply other rules since we have no files to match against
    if (filePaths.length === 0) {
        return false;
    }
    // Check if this is a root-level rule (in .continue directory or no file path)
    var isRootRule = isRootLevelRule(rule);
    // For non-root rules, we need to check if any files are in the rule's directory
    if (!isRootRule && rule.sourceFile) {
        var ruleDirectory = (0, uri_1.getCleanUriPath)(rule.sourceFile);
        var lastSlashIndex = ruleDirectory.lastIndexOf("/");
        var ruleDirPath_1 = lastSlashIndex !== -1 ? ruleDirectory.substring(0, lastSlashIndex) : "";
        // Filter to only files in this directory or its subdirectories
        var filesInRuleDirectory = filePaths.filter(function (filePath) {
            return isFileInDirectory(filePath, ruleDirPath_1);
        });
        return checkGlobsAndRegex({
            filePaths: filesInRuleDirectory,
            fileContents: fileContents,
            rule: rule,
        });
    }
    // If alwaysApply is explicitly false, we need to check globs and/or regex
    if (rule.alwaysApply === false &&
        rule.globs === undefined &&
        rule.regex === undefined) {
        return false;
    }
    return checkGlobsAndRegex({
        filePaths: filePaths,
        fileContents: fileContents,
        rule: rule,
    });
};
exports.shouldApplyRule = shouldApplyRule;
/**
 * Filters rules that apply to the given message and/or context items
 *
 * @param userMessage - The user or tool message to check for file paths in code blocks
 * @param rules - The list of rules to filter
 * @param contextItems - Context items to check for file paths
 * @returns List of applicable rules
 */
var getApplicableRules = function (userMessage, rules, contextItems, rulePolicies) {
    if (rulePolicies === void 0) { rulePolicies = {}; }
    // Get file paths from message and context for rule matching
    var filePathsFromMessage = userMessage
        ? (0, extractPathsFromCodeBlocks_1.extractPathsFromCodeBlocks)((0, messageContent_1.renderChatMessage)(userMessage))
        : [];
    // Extract file paths from context items
    var filePathsFromContextItems = contextItems
        .filter(function (item) { var _a, _b; return ((_a = item.uri) === null || _a === void 0 ? void 0 : _a.type) === "file" && ((_b = item.uri) === null || _b === void 0 ? void 0 : _b.value); })
        .map(function (item) { return item.uri.value; });
    // Combine file paths from both sources
    var allFilePaths = __spreadArray(__spreadArray([], filePathsFromMessage, true), filePathsFromContextItems, true);
    // Create a map of file paths to their contents for pattern matching
    var fileContents = {};
    // Extract contents from context items with file URIs
    contextItems.forEach(function (item) {
        var _a, _b;
        if (((_a = item.uri) === null || _a === void 0 ? void 0 : _a.type) === "file" && ((_b = item.uri) === null || _b === void 0 ? void 0 : _b.value)) {
            fileContents[item.uri.value] = item.content;
        }
    });
    // Extract contents from code blocks in the message for paths that don't have content yet
    if (userMessage) {
        var messageContent_2 = (0, messageContent_1.renderChatMessage)(userMessage);
        filePathsFromMessage.forEach(function (path) {
            // Only extract content if we don't already have it from context items
            if (!fileContents[path]) {
                var blockContent = (0, extractContentFromCodeBlocks_1.extractContentFromCodeBlock)(messageContent_2, path);
                if (blockContent) {
                    fileContents[path] = blockContent;
                }
            }
        });
    }
    // Apply shouldApplyRule to all rules - this will handle global rules, rule policies,
    // and path matching in a consistent way
    var applicableRules = rules.filter(function (rule) {
        return (0, exports.shouldApplyRule)(rule, allFilePaths, rulePolicies, fileContents);
    });
    return applicableRules;
};
exports.getApplicableRules = getApplicableRules;
function getRuleId(rule) {
    var _a, _b, _c;
    return (_c = (_b = (_a = rule.slug) !== null && _a !== void 0 ? _a : rule.sourceFile) !== null && _b !== void 0 ? _b : rule.name) !== null && _c !== void 0 ? _c : rule.source;
}
var getSystemMessageWithRules = function (_a) {
    var baseSystemMessage = _a.baseSystemMessage, userMessage = _a.userMessage, availableRules = _a.availableRules, contextItems = _a.contextItems, _b = _a.rulePolicies, rulePolicies = _b === void 0 ? {} : _b;
    var appliedRules = (0, exports.getApplicableRules)(userMessage, availableRules, contextItems, rulePolicies);
    var systemMessage = baseSystemMessage !== null && baseSystemMessage !== void 0 ? baseSystemMessage : "";
    for (var _i = 0, appliedRules_1 = appliedRules; _i < appliedRules_1.length; _i++) {
        var rule = appliedRules_1[_i];
        if (systemMessage) {
            systemMessage += "\n\n";
        }
        systemMessage += rule.rule;
    }
    return {
        systemMessage: systemMessage,
        appliedRules: appliedRules,
    };
};
exports.getSystemMessageWithRules = getSystemMessageWithRules;
