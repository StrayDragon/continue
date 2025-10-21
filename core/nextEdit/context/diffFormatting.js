"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBeforeAfterDiff = exports.createDiff = exports.DiffFormatType = void 0;
exports.extractMetadataFromUnifiedDiff = extractMetadataFromUnifiedDiff;
var diff_1 = require("diff");
var uri_1 = require("../../util/uri");
var DiffFormatType;
(function (DiffFormatType) {
    DiffFormatType["Unified"] = "unified";
    DiffFormatType["RawBeforeAfter"] = "beforeAfter";
    DiffFormatType["TokenLineDiff"] = "linediff";
})(DiffFormatType || (exports.DiffFormatType = DiffFormatType = {}));
var createDiff = function (_a) {
    var beforeContent = _a.beforeContent, afterContent = _a.afterContent, filePath = _a.filePath, diffType = _a.diffType, contextLines = _a.contextLines, workspaceDir = _a.workspaceDir;
    switch (diffType) {
        case DiffFormatType.Unified:
            return createUnifiedDiff(beforeContent, afterContent, filePath, contextLines, workspaceDir);
        case DiffFormatType.TokenLineDiff:
            return createTokenLineDiff(beforeContent, afterContent, filePath);
    }
    return "";
};
exports.createDiff = createDiff;
var createUnifiedDiff = function (beforeContent, afterContent, filePath, contextLines, workspaceDir) {
    var normalizedBefore = beforeContent.endsWith("\n")
        ? beforeContent
        : beforeContent + "\n";
    var normalizedAfter = afterContent.endsWith("\n")
        ? afterContent
        : afterContent + "\n";
    // Use relative path if workspace directory is provided
    var displayPath = filePath;
    if (workspaceDir && filePath.startsWith(workspaceDir)) {
        displayPath = filePath.slice(workspaceDir.length).replace(/^[\/]/, "");
    }
    else if (workspaceDir) {
        // Fallback to just the basename if we can't determine relative path
        displayPath = (0, uri_1.getUriPathBasename)(filePath);
    }
    var patch = (0, diff_1.createPatch)(displayPath, normalizedBefore, normalizedAfter, undefined, undefined, { context: contextLines });
    return patch;
};
var createBeforeAfterDiff = function (beforeContent, afterContent, filePath) {
    var normalizedBefore = beforeContent.endsWith("\n")
        ? beforeContent
        : beforeContent + "\n";
    var normalizedAfter = afterContent.endsWith("\n")
        ? afterContent
        : afterContent + "\n";
    var result = {
        filePath: filePath,
        beforeContent: normalizedBefore,
        afterContent: normalizedAfter,
    };
    return result;
};
exports.createBeforeAfterDiff = createBeforeAfterDiff;
var createTokenLineDiff = function (beforeContent, afterContent, filePath) {
    // TODO: Implement token line diff
    return "";
};
function extractMetadataFromUnifiedDiff(unifiedDiff) {
    var metadata = {};
    var lines = unifiedDiff.split("\n");
    // Parse the header lines (first two lines)
    if (lines.length >= 2) {
        // Parse original file info (--- line)
        var oldFileMatch = lines[0].match(/^--- (a\/)?(.+?)(?:\t(.+))?$/);
        if (oldFileMatch) {
            metadata.oldFilename = oldFileMatch[2];
            metadata.oldTimestamp = oldFileMatch[3];
            // Check if this is a new file
            if (metadata.oldFilename === "/dev/null") {
                metadata.isNew = true;
            }
        }
        // Parse modified file info (+++ line)
        var newFileMatch = lines[1].match(/^\+\+\+ (b\/)?(.+?)(?:\t(.+))?$/);
        if (newFileMatch) {
            metadata.newFilename = newFileMatch[2];
            metadata.newTimestamp = newFileMatch[3];
            // Check if this file was deleted
            if (metadata.newFilename === "/dev/null") {
                metadata.isDeleted = true;
            }
        }
        // Check if this is a rename (different old and new names)
        if (metadata.oldFilename &&
            metadata.newFilename &&
            metadata.oldFilename !== "/dev/null" &&
            metadata.newFilename !== "/dev/null" &&
            metadata.oldFilename !== metadata.newFilename) {
            metadata.isRename = true;
        }
    }
    // Parse hunk headers and content
    metadata.hunks = [];
    var hunkHeaderRegex = /^@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@(?:\s(.*))?$/;
    var currentHunk = null;
    var oldLineNumber = 0;
    var newLineNumber = 0;
    for (var i = 2; i < lines.length; i++) {
        var line = lines[i];
        var hunkMatch = line.match(hunkHeaderRegex);
        if (hunkMatch) {
            currentHunk = {
                oldStart: parseInt(hunkMatch[1], 10), // line number where changes start in original file
                oldCount: hunkMatch[2] ? parseInt(hunkMatch[2], 10) : 1, // number of changed lines in original file, default to 1 if not specified
                newStart: parseInt(hunkMatch[3], 10), // line number where changes start in modified file
                newCount: hunkMatch[4] ? parseInt(hunkMatch[4], 10) : 1, // number of changed lines in modified file, default to 1 if not specified
                header: hunkMatch[5], // the line starting with @@
                lines: [], // the actual line changes
            };
            oldLineNumber = currentHunk.oldStart;
            newLineNumber = currentHunk.newStart;
            metadata.hunks.push(currentHunk);
        }
        else if (currentHunk &&
            (line.startsWith(" ") || line.startsWith("+") || line.startsWith("-"))) {
            // Process hunk content lines.
            var lineType = line[0];
            var content = line.slice(1);
            if (lineType === " ") {
                // Context line (unchanged).
                currentHunk.lines.push({
                    type: "context",
                    content: content,
                    oldLineNumber: oldLineNumber++,
                    newLineNumber: newLineNumber++,
                });
            }
            else if (lineType === "+") {
                currentHunk.lines.push({
                    type: "addition",
                    content: content,
                    newLineNumber: newLineNumber++,
                });
            }
            else if (lineType === "-") {
                currentHunk.lines.push({
                    type: "deletion",
                    content: content,
                    oldLineNumber: oldLineNumber++,
                });
            }
        }
        // Check for binary file marker
        if (line.includes("Binary files") || line.includes("GIT binary patch")) {
            metadata.isBinary = true;
        }
    }
    return metadata;
}
