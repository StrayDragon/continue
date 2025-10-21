"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getThemeString = getThemeString;
exports.getTheme = getTheme;
var fs = require("node:fs");
var path = require("node:path");
var merge_1 = require("core/util/merge");
var cjs_1 = require("monaco-vscode-textmate-theme-converter/lib/cjs");
var vscode = require("vscode");
/**
 * Strip comments from theme
 */
function stripInLineComment(line) {
    var inString = false;
    var pCh = "";
    for (var i = 0; i < line.length - 1; i++) {
        var ch = line[i];
        var nCh = line[i + 1];
        // If we're not in a string and we see '//' this is a comment.
        if (!inString && ch === "/" && nCh === "/") {
            // Stop processing this line from here.
            return line.substring(0, i);
        }
        // Toggle inString state if we see a double quote not escaped by a backslash.
        if (ch === '"' && pCh !== "\\") {
            inString = !inString;
        }
        pCh = ch;
    }
    return line;
}
function parseThemeString(themeString) {
    themeString = themeString === null || themeString === void 0 ? void 0 : themeString.split("\n").filter(function (line) {
        return !line.trim().startsWith("//");
    }).map(stripInLineComment).join("\n");
    return JSON.parse(themeString !== null && themeString !== void 0 ? themeString : "{}");
}
function getThemeString() {
    var _a;
    var workbenchConfig = vscode.workspace.getConfiguration();
    var themeString = (_a = workbenchConfig.get("workbench.colorTheme")) !== null && _a !== void 0 ? _a : "Default Dark Modern";
    return themeString;
}
function getTheme() {
    var _a, _b, _c, _d;
    var currentTheme = undefined;
    // Get color theme from settings
    // use user settings if available
    // otherwise use default
    var colorTheme = undefined;
    // Get color theme from settings
    var workbenchConfig = vscode.workspace.getConfiguration();
    var autoDetectColorScheme = workbenchConfig.get("window.autoDetectColorScheme");
    var autoDetectHighContrast = workbenchConfig.get("window.autoDetectHighContrast");
    var activeColorTheme = vscode.window.activeColorTheme.kind;
    // prettier-ignore
    switch (true) {
        case autoDetectColorScheme && vscode.ColorThemeKind.Dark === activeColorTheme:
            colorTheme = workbenchConfig.get("workbench.preferredDarkColorTheme");
            break;
        case autoDetectColorScheme && vscode.ColorThemeKind.Light === activeColorTheme:
            colorTheme = workbenchConfig.get("workbench.preferredLightColorTheme");
            break;
        case autoDetectHighContrast && vscode.ColorThemeKind.HighContrast === activeColorTheme:
            colorTheme = workbenchConfig.get("workbench.preferredHighContrastColorTheme");
            break;
        case autoDetectHighContrast && vscode.ColorThemeKind.HighContrastLight === activeColorTheme:
            colorTheme = workbenchConfig.get("workbench.preferredHighContrastLightColorTheme");
            break;
        default:
            colorTheme =
                (_a = workbenchConfig.get("workbench.colorTheme")) !== null && _a !== void 0 ? _a : "Default Dark Modern";
            break;
    }
    var parsed;
    try {
        // Pass color theme to webview for syntax highlighting
        for (var i = vscode.extensions.all.length - 1; i >= 0; i--) {
            var extension = vscode.extensions.all[i];
            if (((_d = (_c = (_b = extension.packageJSON) === null || _b === void 0 ? void 0 : _b.contributes) === null || _c === void 0 ? void 0 : _c.themes) === null || _d === void 0 ? void 0 : _d.length) > 0) {
                if (currentTheme) {
                    break;
                }
                for (var _i = 0, _e = extension.packageJSON.contributes.themes; _i < _e.length; _i++) {
                    var theme = _e[_i];
                    if (theme.id === colorTheme || theme.label === colorTheme) {
                        var themePath = path.join(extension.extensionPath, theme.path);
                        currentTheme = fs.readFileSync(themePath).toString();
                        parsed = parseThemeString(currentTheme);
                        // Handle nested includes
                        var currentParsedTheme = parsed;
                        var currentThemePath = themePath;
                        var mergedTheme = currentParsedTheme;
                        while (currentParsedTheme.include) {
                            var themeDir = path.dirname(currentThemePath);
                            var includeThemePath = path.join(themeDir, currentParsedTheme.include);
                            if (fs.existsSync(includeThemePath)) {
                                var includeThemeString = fs
                                    .readFileSync(includeThemePath)
                                    .toString();
                                var includeTheme = parseThemeString(includeThemeString);
                                // Merge with base theme taking precedence, then overlay current customizations
                                mergedTheme = (0, merge_1.default)((0, merge_1.default)({}, includeTheme), // Start with base
                                mergedTheme);
                                // Update for next iteration - only update path and parsed theme for include checking
                                currentThemePath = includeThemePath;
                                currentParsedTheme = includeTheme;
                            }
                            else {
                                console.log("include theme not found for ".concat(currentTheme, " looked for ").concat(currentParsedTheme.include, " in ").concat(themeDir), includeThemePath);
                                break;
                            }
                        }
                        parsed = mergedTheme;
                        break;
                    }
                }
            }
        }
        if (!currentTheme) {
            console.warn("did not find any theme files for theme ".concat(colorTheme));
            return undefined;
        }
        var convertedTheme = (0, cjs_1.convertTheme)(parsed);
        convertedTheme.base = (["vs", "hc-black"].includes(convertedTheme.base)
            ? convertedTheme.base
            : activeColorTheme === vscode.ColorThemeKind.Light ||
                activeColorTheme === vscode.ColorThemeKind.HighContrastLight
                ? "vs"
                : "vs-dark");
        return convertedTheme;
    }
    catch (e) {
        console.log("Error loading color theme: ", e);
    }
    return undefined;
}
