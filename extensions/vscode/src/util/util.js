"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertSingleToDoubleQuoteJSON = convertSingleToDoubleQuoteJSON;
exports.debounced = debounced;
exports.getPlatform = getPlatform;
exports.getArchitecture = getArchitecture;
exports.isUnsupportedPlatform = isUnsupportedPlatform;
exports.getAltOrOption = getAltOrOption;
exports.getMetaKeyLabel = getMetaKeyLabel;
exports.getMetaKeyName = getMetaKeyName;
exports.getExtensionVersion = getExtensionVersion;
exports.getvsCodeUriScheme = getvsCodeUriScheme;
exports.isExtensionPrerelease = isExtensionPrerelease;
var os = require("node:os");
var vscode = require("vscode");
function charIsEscapedAtIndex(index, str) {
    if (index === 0) {
        return false;
    }
    if (str[index - 1] !== "\\") {
        return false;
    }
    return !charIsEscapedAtIndex(index - 1, str);
}
function convertSingleToDoubleQuoteJSON(json) {
    var singleQuote = "'";
    var doubleQuote = '"';
    var isQuote = function (char) {
        return char === doubleQuote || char === singleQuote;
    };
    var newJson = "";
    var insideString = false;
    var enclosingQuoteType = doubleQuote;
    for (var i = 0; i < json.length; i++) {
        if (insideString) {
            if (json[i] === enclosingQuoteType && !charIsEscapedAtIndex(i, json)) {
                // Close string with a double quote
                insideString = false;
                newJson += doubleQuote;
            }
            else if (json[i] === singleQuote) {
                if (charIsEscapedAtIndex(i, json)) {
                    // Unescape single quote
                    newJson = newJson.slice(0, -1);
                }
                newJson += singleQuote;
            }
            else if (json[i] === doubleQuote) {
                if (!charIsEscapedAtIndex(i, json)) {
                    // Escape double quote
                    newJson += "\\";
                }
                newJson += doubleQuote;
            }
            else {
                newJson += json[i];
            }
        }
        else {
            if (isQuote(json[i])) {
                insideString = true;
                enclosingQuoteType = json[i];
                newJson += doubleQuote;
            }
            else {
                newJson += json[i];
            }
        }
    }
    return newJson;
}
function debounced(delay, fn) {
    var timerId;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (timerId) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(function () {
            fn.apply(void 0, args);
            timerId = null;
        }, delay);
    };
}
function getPlatform() {
    var platform = os.platform();
    if (platform === "darwin") {
        return "mac";
    }
    else if (platform === "linux") {
        return "linux";
    }
    else if (platform === "win32") {
        return "windows";
    }
    else {
        return "unknown";
    }
}
function getArchitecture() {
    var arch = os.arch();
    if (arch === "x64" || arch === "ia32") {
        return "x64";
    }
    else if (arch === "arm64" || arch === "arm") {
        return "arm64";
    }
    else {
        return "unknown";
    }
}
function isUnsupportedPlatform() {
    var platform = getPlatform();
    var arch = getArchitecture();
    if (platform === "windows" && arch === "arm64") {
        return {
            isUnsupported: true,
            reason: "Windows ARM64 is not currently supported due to missing native dependencies (sqlite3, onnxruntime). Please use the extension on Windows x64, macOS, or Linux instead.",
        };
    }
    // if (platform === "unknown" || arch === "unknown") {
    //   return {
    //     isUnsupported: true,
    //     reason: `Unsupported platform combination: ${os.platform()}-${os.arch()}. Continue extension supports Windows x64, macOS (Intel/Apple Silicon), and Linux (x64/ARM64).`,
    //   };
    // }
    return { isUnsupported: false };
}
function getAltOrOption() {
    if (getPlatform() === "mac") {
        return "⌥";
    }
    else {
        return "Alt";
    }
}
function getMetaKeyLabel() {
    var platform = getPlatform();
    switch (platform) {
        case "mac":
            return "⌘";
        case "linux":
        case "windows":
            return "Ctrl";
        default:
            return "Ctrl";
    }
}
function getMetaKeyName() {
    var platform = getPlatform();
    switch (platform) {
        case "mac":
            return "Cmd";
        case "linux":
        case "windows":
            return "Ctrl";
        default:
            return "Ctrl";
    }
}
function getExtensionVersion() {
    var extension = vscode.extensions.getExtension("continue.continue");
    return (extension === null || extension === void 0 ? void 0 : extension.packageJSON.version) || "0.1.0";
}
function getvsCodeUriScheme() {
    return vscode.env.uriScheme;
}
function isExtensionPrerelease() {
    var extensionVersion = getExtensionVersion();
    var versionParts = extensionVersion.split(".");
    if (versionParts.length >= 2) {
        var minorVersion = parseInt(versionParts[1], 10);
        if (!isNaN(minorVersion)) {
            return minorVersion % 2 !== 0;
        }
    }
    return false;
}
