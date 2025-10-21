"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.capitalizeFirstLetter = void 0;
exports.replaceEscapedCharacters = replaceEscapedCharacters;
exports.escapeForSVG = escapeForSVG;
exports.kebabOfStr = kebabOfStr;
exports.kebabOfThemeStr = kebabOfThemeStr;
var capitalizeFirstLetter = function (val) {
    if (val.length === 0) {
        return "";
    }
    return val[0].toUpperCase() + val.slice(1);
};
exports.capitalizeFirstLetter = capitalizeFirstLetter;
function replaceEscapedCharacters(str) {
    return str.replaceAll(/\\(n|t|r|\\|"|')/g, function (match, p1) {
        switch (p1) {
            case "n":
                return "\n";
            case "t":
                return "\t";
            case "r":
                return "\r";
            case "\\":
                return "\\";
            case '"':
                return '"';
            case "'":
                return "'";
            default:
                return match; // NOTE: Handle unexpected escapes better than this.
        }
    });
}
function escapeForSVG(text) {
    return text
        .replace(/&/g, "&amp;") // must be first
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;")
        .replace(/\n/g, "\\n") // newlines
        .replace(/\t/g, "\\t") // tabs
        .replace(/\r/g, "\\r"); // carriage returns
}
function kebabOfStr(str) {
    return str
        .replace(/([a-z0-9])([A-Z])/g, "$1-$2") // handle camelCase, PascalCase, and numbers followed by uppercase
        .replace(/[\s_]+/g, "-") // replace spaces and underscores with hyphens
        .toLowerCase();
}
function kebabOfThemeStr(str) {
    return str
        .toLowerCase()
        .replace(/[\s_]+/g, "-") // replace spaces and underscores with hyphens
        .replace(/\(|\)/g, ""); // remove parentheses
}
