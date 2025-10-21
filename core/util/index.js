"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeQuotesAndEscapes = removeQuotesAndEscapes;
exports.dedentAndGetCommonWhitespace = dedentAndGetCommonWhitespace;
exports.getMarkdownLanguageTagForFile = getMarkdownLanguageTagForFile;
exports.copyOf = copyOf;
exports.deduplicateArray = deduplicateArray;
exports.dedent = dedent;
exports.removeCodeBlocksAndTrim = removeCodeBlocksAndTrim;
exports.splitCamelCaseAndNonAlphaNumeric = splitCamelCaseAndNonAlphaNumeric;
function removeQuotesAndEscapes(input) {
    var output = input.trim();
    // Replace smart quotes
    output = output.replaceAll("“", '"');
    output = output.replaceAll("”", '"');
    output = output.replaceAll("‘", "'");
    output = output.replaceAll("’", "'");
    // Remove escapes
    output = output.replaceAll('\\"', '"');
    output = output.replaceAll("\\'", "'");
    output = output.replaceAll("\\n", "\n");
    output = output.replaceAll("\\t", "\t");
    output = output.replaceAll("\\\\", "\\");
    while ((output.startsWith('"') && output.endsWith('"')) ||
        (output.startsWith("'") && output.endsWith("'"))) {
        output = output.slice(1, -1);
    }
    while (output.startsWith("`") && output.endsWith("`")) {
        output = output.slice(1, -1);
    }
    return output;
}
function dedentAndGetCommonWhitespace(s) {
    var lines = s.split("\n");
    if (lines.length === 0 || (lines[0].trim() === "" && lines.length === 1)) {
        return ["", ""];
    }
    // Longest common whitespace prefix
    var lcp = lines[0].split(lines[0].trim())[0];
    // Iterate through the lines
    for (var i = 1; i < lines.length; i++) {
        // Empty lines are wildcards
        if (lines[i].trim() === "") {
            continue; // hey that's us!
        }
        if (lcp === undefined) {
            lcp = lines[i].split(lines[i].trim())[0];
        }
        // Iterate through the leading whitespace characters of the current line
        for (var j = 0; j < lcp.length; j++) {
            // If it doesn't have the same whitespace as lcp, then update lcp
            if (j >= lines[i].length || lcp[j] !== lines[i][j]) {
                lcp = lcp.slice(0, j);
                if (lcp === "") {
                    return [s, ""];
                }
                break;
            }
        }
    }
    if (lcp === undefined) {
        return [s, ""];
    }
    return [lines.map(function (x) { return x.replace(lcp, ""); }).join("\n"), lcp];
}
function getMarkdownLanguageTagForFile(filepath) {
    var _a;
    var extToLangMap = {
        py: "python",
        js: "javascript",
        jsx: "jsx",
        tsx: "tsx",
        ts: "typescript",
        java: "java",
        class: "java", //.class files decompile to Java
        go: "go",
        rb: "ruby",
        rs: "rust",
        c: "c",
        cpp: "cpp",
        cs: "csharp",
        php: "php",
        scala: "scala",
        swift: "swift",
        kt: "kotlin",
        md: "markdown",
        json: "json",
        html: "html",
        css: "css",
        sh: "shell",
        yaml: "yaml",
        toml: "toml",
        tex: "latex",
        sql: "sql",
        ps1: "powershell",
    };
    var ext = sanitizeExtension(filepath.split(".").pop());
    return ext ? ((_a = extToLangMap[ext]) !== null && _a !== void 0 ? _a : ext) : "";
}
function sanitizeExtension(ext) {
    if (ext) {
        //ignore ranges in extension eg. "java (11-23)"
        var match = ext.match(/^(\S+)\s*(\(.*\))?$/);
        if (match) {
            ext = match[1];
        }
    }
    return ext;
}
function copyOf(obj) {
    if (obj === null || obj === undefined) {
        return obj;
    }
    return JSON.parse(JSON.stringify(obj));
}
function deduplicateArray(array, equal) {
    var result = [];
    var _loop_1 = function (item) {
        if (!result.some(function (existingItem) { return equal(existingItem, item); })) {
            result.push(item);
        }
    };
    for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
        var item = array_1[_i];
        _loop_1(item);
    }
    return result;
}
function dedent(strings) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    var raw = "";
    var _loop_2 = function (i) {
        raw += strings[i];
        // Handle the value if it exists
        if (i < values.length) {
            var value = String(values[i]);
            // If the value contains newlines, we need to adjust the indentation
            if (value.includes("\n")) {
                // Find the indentation level of the last line in strings[i]
                var lines_1 = strings[i].split("\n");
                var lastLine = lines_1[lines_1.length - 1];
                var match = lastLine.match(/(^|\n)([^\S\n]*)$/);
                var indent_1 = match ? match[2] : "";
                // Add indentation to all lines except the first line of value
                var valueLines = value.split("\n");
                valueLines = valueLines.map(function (line, index) {
                    return index === 0 ? line : indent_1 + line;
                });
                value = valueLines.join("\n");
            }
            raw += value;
        }
    };
    for (var i = 0; i < strings.length; i++) {
        _loop_2(i);
    }
    // Now dedent the full string
    var result = raw.replace(/^\n/, "").replace(/\n\s*$/, "");
    var lines = result.split("\n");
    // Remove leading/trailing blank lines
    while (lines.length > 0 && lines[0].trim() === "") {
        lines.shift();
    }
    while (lines.length > 0 && lines[lines.length - 1].trim() === "") {
        lines.pop();
    }
    // Calculate minimum indentation (excluding empty lines)
    var minIndent = lines.reduce(function (min, line) {
        if (line.trim() === "")
            return min;
        var match = line.match(/^(\s*)/);
        var indent = match ? match[1].length : 0;
        return min === null ? indent : Math.min(min, indent);
    }, null);
    if (minIndent !== null && minIndent > 0) {
        // Remove the minimum indentation from each line
        lines = lines.map(function (line) { return line.slice(minIndent); });
    }
    return lines.join("\n");
}
/**
 * Removes code blocks from a message.
 *
 * Return modified message text.
 */
function removeCodeBlocksAndTrim(text) {
    var codeBlockRegex = /```[\s\S]*?```/g;
    // Remove code blocks from the message text
    var textWithoutCodeBlocks = text.replace(codeBlockRegex, "");
    return textWithoutCodeBlocks.trim();
}
function splitCamelCaseAndNonAlphaNumeric(value) {
    return value
        .split(/(?<=[a-z0-9])(?=[A-Z])|[^a-zA-Z0-9]/)
        .filter(function (t) { return t.length > 0; })
        .map(function (t) { return t.toLowerCase(); });
}
