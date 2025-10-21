"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMarkdownRule = parseMarkdownRule;
exports.getRuleName = getRuleName;
exports.markdownToRule = markdownToRule;
var YAML = require("yaml");
var browser_js_1 = require("../browser.js");
/**
 * Parses markdown content with YAML frontmatter
 */
function parseMarkdownRule(content) {
    // Normalize line endings to \n
    var normalizedContent = content.replace(/\r\n/g, "\n");
    // More reliable frontmatter detection
    var parts = normalizedContent.split(/^---\s*$/m);
    // If we have at least 3 parts (before ---, frontmatter, after ---), we have frontmatter
    if (parts.length >= 3) {
        var frontmatterStr = parts[1];
        // Join the remaining parts back together (in case there are more --- in the markdown)
        var markdownContent = parts.slice(2).join("---");
        try {
            // Parse YAML frontmatter
            var frontmatter = YAML.parse(frontmatterStr) || {}; // Handle empty frontmatter
            return { frontmatter: frontmatter, markdown: markdownContent.trim() };
        }
        catch (e) {
            // Error parsing frontmatter, treat as markdown only
            console.warn("Error parsing markdown frontmatter:", e);
            return { frontmatter: {}, markdown: normalizedContent };
        }
    }
    // No frontmatter found
    return { frontmatter: {}, markdown: normalizedContent };
}
function getRuleName(frontmatter, id) {
    if (frontmatter.name) {
        return frontmatter.name;
    }
    var displayName = (0, browser_js_1.packageIdentifierToDisplayName)(id);
    // If it's a file identifier, extract the last two parts of the file path
    if (id.uriType === "file") {
        // Handle both forward slashes and backslashes, get the last two segments
        var segments = displayName.split(/[/\\]/);
        var lastTwoParts = segments.slice(-2);
        return lastTwoParts.filter(Boolean).join("/");
    }
    // Otherwise return the display name as-is (for slug identifiers)
    return displayName;
}
function getGlobPattern(globs, relativeDir) {
    if (relativeDir === undefined) {
        return globs;
    }
    if (relativeDir.includes(".continue")) {
        return globs;
    }
    if (!relativeDir.endsWith("/")) {
        relativeDir = relativeDir.concat("/");
    }
    var prependDirAndApplyGlobstar = function (glob) {
        if (glob.startsWith("**")) {
            return relativeDir.concat(glob);
        }
        return relativeDir.concat("**/", glob);
    };
    if (!globs) {
        return relativeDir.concat("**/*");
    }
    if (Array.isArray(globs)) {
        return globs.map(prependDirAndApplyGlobstar);
    }
    return prependDirAndApplyGlobstar(globs);
}
function markdownToRule(rule, id, relativePathForGlobs) {
    var _a = parseMarkdownRule(rule), frontmatter = _a.frontmatter, markdown = _a.markdown;
    return {
        name: getRuleName(frontmatter, id),
        rule: markdown,
        globs: getGlobPattern(frontmatter.globs, relativePathForGlobs),
        regex: frontmatter.regex,
        description: frontmatter.description,
        alwaysApply: frontmatter.alwaysApply,
        invokable: frontmatter.invokable,
        sourceFile: id.uriType === "file" ? id.fileUri : undefined,
    };
}
