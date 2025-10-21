"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_FILE_EXTENSION = void 0;
exports.sanitizeRuleName = sanitizeRuleName;
exports.createMarkdownWithFrontmatter = createMarkdownWithFrontmatter;
exports.createRuleMarkdown = createRuleMarkdown;
var YAML = require("yaml");
exports.RULE_FILE_EXTENSION = "md";
/**
 * Sanitizes a rule name for use in filenames (removes special chars, replaces spaces with dashes)
 */
function sanitizeRuleName(name) {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/^-+|-+$/g, ""); // Remove leading/trailing dashes
}
/**
 * Creates markdown content with YAML frontmatter in the format expected by parseMarkdownRule
 */
function createMarkdownWithFrontmatter(frontmatter, markdown) {
    var frontmatterStr = YAML.stringify(frontmatter).trim();
    return "---\n".concat(frontmatterStr, "\n---\n\n").concat(markdown);
}
/**
 * Creates a rule markdown file content from rule components
 */
function createRuleMarkdown(name, ruleContent, options) {
    if (options === void 0) { options = {}; }
    var frontmatter = {};
    if (options.globs) {
        frontmatter.globs =
            typeof options.globs === "string" ? options.globs.trim() : options.globs;
    }
    if (options.regex) {
        frontmatter.regex =
            typeof options.regex === "string" ? options.regex.trim() : options.regex;
    }
    if (options.description) {
        frontmatter.description = options.description.trim();
    }
    if (options.invokable !== undefined) {
        frontmatter.invokable = options.invokable;
    }
    if (options.alwaysApply !== undefined) {
        frontmatter.alwaysApply = options.alwaysApply;
    }
    return createMarkdownWithFrontmatter(frontmatter, ruleContent);
}
