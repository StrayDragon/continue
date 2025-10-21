"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUnifiedDiffFormat = isUnifiedDiffFormat;
exports.applyUnifiedDiff = applyUnifiedDiff;
/**
 * Checks if a string matches unified diff format by validating:
 * 1. Has at least one hunk header (@@ -n,m +n,m @@)
 * 2. Contains valid diff content lines (starting with +, -, or space) which are not header lines
 */
function isUnifiedDiffFormat(diff) {
    var lines = diff.trim().split("\n");
    if (lines.length < 3) {
        return false;
    }
    var hasHunkHeader = false;
    var hasValidContent = false;
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var line = lines_1[_i];
        if (line.startsWith("---") || line.startsWith("+++")) {
            // ignore file headers - they are not required or useful
        }
        else if (line.match(/^@@ -\d+,?\d* \+\d+,?\d* @@/)) {
            hasHunkHeader = true;
        }
        else if (line.match(/^[+ -]/) || line === "") {
            hasValidContent = true;
        }
    }
    return hasHunkHeader && hasValidContent;
}
function extractBeforeLines(hunkLines) {
    return hunkLines
        .filter(function (line) { return line.startsWith("-") || !line.startsWith("+"); })
        .map(function (line) { return line.substring(1); });
}
/**
 * Applies a unified diff to source code and returns an array of DiffLine objects.
 * Each DiffLine contains a type ("same", "new", or "old") and the line content.
 *
 * @throws Error if the diff cannot be cleanly applied to the source
 */
function applyUnifiedDiff(sourceCode, unifiedDiffText) {
    var sourceLines = sourceCode.split(/\r?\n/);
    var hunks = parseUnifiedDiff(unifiedDiffText);
    var diffResult = [];
    var currentPos = 0; // pointer in sourceLines
    for (var _i = 0, hunks_1 = hunks; _i < hunks_1.length; _i++) {
        var hunk = hunks_1[_i];
        var hunkBeforeLines = extractBeforeLines(hunk.lines);
        var hunkStart = findHunkInSource(sourceLines, hunkBeforeLines, currentPos);
        if (hunkStart === -1) {
            // All hunks must be found in the source code. If not, throw an error.
            throw new Error("Hunk could not be applied cleanly to source code.");
        }
        // Emit any unchanged lines that come before this hunk.
        for (var i = currentPos; i < hunkStart; i++) {
            diffResult.push({ type: "same", line: sourceLines[i] });
        }
        var hunkSourcePos = hunkStart;
        for (var _a = 0, _b = hunk.lines; _a < _b.length; _a++) {
            var dline = _b[_a];
            var srcLine = sourceLines[hunkSourcePos];
            if (dline.startsWith("+")) {
                // Insertion: output new line (strip the '+' marker)
                diffResult.push({ type: "new", line: dline.substring(1) });
            }
            else if (dline.startsWith("-")) {
                // Removal: output the removed (old) line and advance the pointer.
                diffResult.push({ type: "old", line: srcLine });
                hunkSourcePos++;
            }
            else {
                // Context line: use the source line (in case the diff’s context has a minor whitespace error)
                // and advance the pointer.
                diffResult.push({ type: "same", line: srcLine });
                hunkSourcePos++;
            }
        }
        currentPos = hunkSourcePos;
    }
    for (var i = currentPos; i < sourceLines.length; i++) {
        diffResult.push({ type: "same", line: sourceLines[i] });
    }
    return diffResult;
}
/**
 * Parses a unified diff string into an array of hunks.
 * It skips the file header lines (starting with "---" or "+++") and hunk header lines (starting with "@@"),
 * then collects the remaining lines (which may start with '+' or '-' or have no prefix).
 */
function parseUnifiedDiff(diffText) {
    var lines = diffText.split(/\r?\n/);
    var hunks = [];
    var currentHunk = null;
    for (var _i = 0, lines_2 = lines; _i < lines_2.length; _i++) {
        var line = lines_2[_i];
        if (line.startsWith("---") || line.startsWith("+++")) {
            // Skip file header lines.
            continue;
        }
        if (line.startsWith("@@")) {
            if (currentHunk) {
                hunks.push(currentHunk);
            }
            currentHunk = { lines: [] };
            continue;
        }
        currentHunk === null || currentHunk === void 0 ? void 0 : currentHunk.lines.push(line);
    }
    if (currentHunk) {
        hunks.push(currentHunk);
    }
    return hunks;
}
/**
 * Searches for an occurrence of the block of lines (the “before” block) in sourceLines,
 * starting at startIndex. Comparison is done by checking if the lines are exactly equal,
 * or if their trimmed versions are equal.
 *
 * Returns the index in sourceLines where the block begins, or -1 if no match is found.
 */
function findHunkInSource(sourceLines, hunkBeforeLines, startIndex) {
    for (var i = startIndex; i <= sourceLines.length - hunkBeforeLines.length; i++) {
        var match = true;
        for (var j = 0; j < hunkBeforeLines.length; j++) {
            var sl = sourceLines[i + j];
            var hl = hunkBeforeLines[j];
            if (!linesMatch(sl, hl)) {
                match = false;
                break;
            }
        }
        if (match) {
            return i;
        }
    }
    return -1;
}
/**
 * Returns true if the two lines are either exactly equal or equal after trimming whitespace and tabs.
 */
function linesMatch(a, b) {
    var trimmedA = a.replace(/^\s+/, "");
    var trimmedB = b.replace(/^\s+/, "");
    return trimmedA === trimmedB;
}
