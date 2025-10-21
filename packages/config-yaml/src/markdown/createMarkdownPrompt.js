"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMarkdownWithPromptFrontmatter = createMarkdownWithPromptFrontmatter;
exports.createPromptMarkdown = createPromptMarkdown;
var YAML = require("yaml");
/**
 * Creates markdown content with YAML frontmatter for prompts
 */
function createMarkdownWithPromptFrontmatter(frontmatter, prompt) {
    var frontmatterStr = YAML.stringify(frontmatter).trim();
    return "---\n".concat(frontmatterStr, "\n---\n\n").concat(prompt);
}
/**
 * Creates a prompt markdown file content from prompt components
 */
function createPromptMarkdown(name, promptContent, options) {
    if (options === void 0) { options = {}; }
    var frontmatter = {
        name: name.trim(),
    };
    if (options.description) {
        frontmatter.description = options.description.trim();
    }
    if (options.invokable !== undefined) {
        frontmatter.invokable = options.invokable;
    }
    return createMarkdownWithPromptFrontmatter(frontmatter, promptContent);
}
