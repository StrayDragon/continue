"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatGrepSearchResults = formatGrepSearchResults;
/*
  Formats the output of a grep search to reduce unnecessary indentation, lines, etc
  Assumes a command with these params
    ripgrep -i --ignore-file .continueignore --ignore-file .gitignore -C 2 --heading -m 100 -e <query> .
  
  Also can truncate the output to a specified number of characters
*/
function formatGrepSearchResults(results, maxChars) {
    var numResults = 0;
    var keepLines = [];
    function countLeadingSpaces(line) {
        var _a, _b;
        return (_b = (_a = line === null || line === void 0 ? void 0 : line.match(/^ */)) === null || _a === void 0 ? void 0 : _a[0].length) !== null && _b !== void 0 ? _b : 0;
    }
    var processResult = function (lines) {
        // Skip results in which only the file path was kept
        var resultPath = lines[0];
        var resultContent = lines.slice(1);
        if (resultContent.length === 0) {
            return;
        }
        // Add path
        keepLines.push(resultPath);
        // Find the minimum indentation of content lines
        var minIndent = Infinity;
        for (var _i = 0, resultContent_1 = resultContent; _i < resultContent_1.length; _i++) {
            var line = resultContent_1[_i];
            var indent = countLeadingSpaces(line);
            if (indent < minIndent) {
                minIndent = indent;
            }
        }
        // Make all lines line up to 2-space indent
        var changeIndentBy = 2 - minIndent;
        if (changeIndentBy === 0) {
            keepLines.push.apply(keepLines, resultContent);
        }
        else if (changeIndentBy < 0) {
            keepLines.push.apply(keepLines, resultContent.map(function (line) { return line.substring(-changeIndentBy); }));
        }
        else {
            keepLines.push.apply(keepLines, resultContent.map(function (line) { return " ".repeat(changeIndentBy) + line; }));
        }
    };
    var resultLines = [];
    for (var _i = 0, _a = results.split("\n").filter(function (l) { return !!l; }); _i < _a.length; _i++) {
        var line = _a[_i];
        if (line.startsWith("./") || line === "--") {
            processResult(resultLines); // process previous result
            resultLines = [line];
            numResults++;
            continue;
        }
        // Exclude leading zero- or single-char lines
        if (resultLines.length === 1 && line.trim().length <= 1) {
            continue;
        }
        resultLines.push(line);
    }
    processResult(resultLines);
    var formatted = keepLines.join("\n");
    if (maxChars && formatted.length > maxChars) {
        return {
            formatted: formatted.substring(0, maxChars),
            numResults: numResults,
            truncated: true,
        };
    }
    else {
        return {
            formatted: formatted,
            numResults: numResults,
            truncated: false,
        };
    }
}
