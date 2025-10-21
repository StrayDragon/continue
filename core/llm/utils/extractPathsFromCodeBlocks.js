"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractPathsFromCodeBlocks = extractPathsFromCodeBlocks;
/**
 * Extracts file paths from markdown code blocks
 */
function extractPathsFromCodeBlocks(content) {
    var paths = [];
    // Match code block opening patterns:
    // 1. ```language filepath
    // 2. ```filepath
    // 3. ```language filepath (range)
    // First match all code block starts
    var codeBlockStarts = content.match(/```[^\n]+/g) || [];
    for (var _i = 0, codeBlockStarts_1 = codeBlockStarts; _i < codeBlockStarts_1.length; _i++) {
        var blockStart = codeBlockStarts_1[_i];
        // Try to extract a valid filename with extension
        var filenameMatches = blockStart.match(/([^\s()```]+\.[a-zA-Z0-9]+)/);
        if (filenameMatches && filenameMatches[1]) {
            var filename = filenameMatches[1];
            // Verify this is a legitimate filename (not part of something else)
            if (
            // Check if valid extension
            /\.[a-zA-Z0-9]+$/.test(filename) &&
                // Make sure it's not a URL
                !filename.includes("://") &&
                // Avoid duplicates
                !paths.includes(filename)) {
                paths.push(filename);
            }
        }
    }
    return paths;
}
