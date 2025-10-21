"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractMinimalStackTraceInfo = extractMinimalStackTraceInfo;
/**
 * It's helpful to know what functions errors occur in, but absolute
 * file paths are sensitive information, so we want to remove them.
 * @param stack The stack trace to extract minimal information from.
 * @returns A string containing the minimal stack trace information.
 */
function extractMinimalStackTraceInfo(stack) {
    if (typeof stack !== "string") {
        return "";
    }
    var lines = stack
        .trim()
        .split("\n")
        .map(function (line) { return line.trim(); });
    var minimalLines = lines.filter(function (line) {
        return (line.startsWith("at ") &&
            !line.includes("node_modules") &&
            !line.includes("node:internal"));
    });
    return minimalLines
        .map(function (line) { return line.replace("at ", "").split(" (").slice(0, 1); })
        .flatMap(function (parts) {
        return parts.map(
        // to be safe, remove any lingering paths - anonymous function case
        function (part) {
            return part.replace(/(?:[A-Za-z]:[\\/]|[\\/])[^\n]*?:\d+:\d+/g, "").trim();
        });
    })
        .filter(function (part) { return !!part; }) // remove empty string parts (anonymous functions case)
        .join(", ");
}
