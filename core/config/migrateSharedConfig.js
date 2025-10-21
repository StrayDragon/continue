"use strict";
/**
 * I'm disabling this rule for the entire file under the assumption
 * that this is a one-time migration script. I'm expecting this
 * code to be removed in the future.
 */
/* eslint-disable max-statements */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateJsonSharedConfig = migrateJsonSharedConfig;
var util_1 = require("../util");
var GlobalContext_1 = require("../util/GlobalContext");
var load_1 = require("./load");
/*
  This migration function eliminates deprecated values from the json file
  And writes them to the shared config
*/
function migrateJsonSharedConfig(filepath, ide) {
    var globalContext = new GlobalContext_1.GlobalContext();
    var currentSharedConfig = globalContext.getSharedConfig(); // for merging security concerns
    try {
        var config = (0, load_1.resolveSerializedConfig)(filepath);
        var shareConfigUpdates = {};
        var effected = false;
        var allowAnonymousTelemetry = config.allowAnonymousTelemetry, withoutAllowTelemetry = __rest(config, ["allowAnonymousTelemetry"]);
        if (allowAnonymousTelemetry !== undefined) {
            if (currentSharedConfig.allowAnonymousTelemetry !== false) {
                // safe merge for security
                shareConfigUpdates.allowAnonymousTelemetry = allowAnonymousTelemetry;
            }
            config = withoutAllowTelemetry;
            effected = true;
        }
        var disableIndexing = config.disableIndexing, withoutDisableIndexing = __rest(config, ["disableIndexing"]);
        if (disableIndexing !== undefined) {
            if (currentSharedConfig.disableIndexing !== true) {
                // safe merge for security
                shareConfigUpdates.disableIndexing = disableIndexing;
            }
            config = withoutDisableIndexing;
            effected = true;
        }
        var disableSessionTitles = config.disableSessionTitles, withoutDisableSessionTitles = __rest(config, ["disableSessionTitles"]);
        if (config.disableSessionTitles !== undefined) {
            if (currentSharedConfig.disableSessionTitles !== true) {
                // safe merge for security
                shareConfigUpdates.disableSessionTitles = config.disableSessionTitles;
            }
            config = withoutDisableSessionTitles;
            effected = true;
        }
        var tabAutocompleteOptions = config.tabAutocompleteOptions, withoutAutocompleteOptions = __rest(config, ["tabAutocompleteOptions"]);
        if (tabAutocompleteOptions !== undefined) {
            var migratedAutocomplete = __assign({}, tabAutocompleteOptions);
            var useCache = migratedAutocomplete.useCache, withoutUseCache = __rest(migratedAutocomplete, ["useCache"]);
            if (useCache !== undefined) {
                shareConfigUpdates.useAutocompleteCache = useCache;
                migratedAutocomplete = withoutUseCache;
                effected = true;
            }
            var multilineCompletions = migratedAutocomplete.multilineCompletions, withoutMultiline = __rest(migratedAutocomplete, ["multilineCompletions"]);
            if (multilineCompletions !== undefined) {
                shareConfigUpdates.useAutocompleteMultilineCompletions =
                    multilineCompletions;
                migratedAutocomplete = withoutMultiline;
                effected = true;
            }
            var disableInFiles = migratedAutocomplete.disableInFiles, withoutDisableInFiles = __rest(migratedAutocomplete, ["disableInFiles"]);
            if (disableInFiles !== undefined) {
                if (currentSharedConfig.disableAutocompleteInFiles !== undefined) {
                    // safe merge for security
                    shareConfigUpdates.disableAutocompleteInFiles = (0, util_1.deduplicateArray)(__spreadArray(__spreadArray([], currentSharedConfig.disableAutocompleteInFiles, true), disableInFiles, true), function (a, b) { return a === b; });
                }
                else {
                    shareConfigUpdates.disableAutocompleteInFiles = disableInFiles;
                }
                shareConfigUpdates.disableAutocompleteInFiles = disableInFiles;
                migratedAutocomplete = withoutDisableInFiles;
                effected = true;
            }
            if (Object.keys(migratedAutocomplete).length > 0) {
                config = __assign(__assign({}, withoutAutocompleteOptions), { tabAutocompleteOptions: migratedAutocomplete });
            }
            else {
                config = withoutAutocompleteOptions;
            }
        }
        var experimental = config.experimental, withoutExperimental = __rest(config, ["experimental"]);
        if (experimental !== undefined) {
            var migratedExperimental = __assign({}, experimental);
            var useChromiumForDocsCrawling = migratedExperimental.useChromiumForDocsCrawling, rest10 = __rest(migratedExperimental, ["useChromiumForDocsCrawling"]);
            if (useChromiumForDocsCrawling !== undefined) {
                shareConfigUpdates.useChromiumForDocsCrawling =
                    useChromiumForDocsCrawling;
                migratedExperimental = rest10;
                effected = true;
            }
            var promptPath = migratedExperimental.promptPath, withoutPromptPath = __rest(migratedExperimental, ["promptPath"]);
            if (promptPath !== undefined) {
                shareConfigUpdates.promptPath = promptPath;
                migratedExperimental = withoutPromptPath;
                effected = true;
            }
            var readResponseTTS = migratedExperimental.readResponseTTS, withoutReadTTS = __rest(migratedExperimental, ["readResponseTTS"]);
            if (readResponseTTS !== undefined) {
                shareConfigUpdates.readResponseTTS = readResponseTTS;
                migratedExperimental = withoutReadTTS;
                effected = true;
            }
            if (Object.keys(migratedExperimental).length > 0) {
                config = __assign(__assign({}, withoutExperimental), { experimental: migratedExperimental });
            }
            else {
                config = withoutExperimental;
            }
        }
        var ui = config.ui, withoutUI = __rest(config, ["ui"]);
        if (ui !== undefined) {
            var migratedUI = __assign({}, ui);
            var codeBlockToolbarPosition = migratedUI.codeBlockToolbarPosition, withoutToolbarPosition = __rest(migratedUI, ["codeBlockToolbarPosition"]);
            if (codeBlockToolbarPosition !== undefined) {
                shareConfigUpdates.codeBlockToolbarPosition = codeBlockToolbarPosition;
                migratedUI = withoutToolbarPosition;
                effected = true;
            }
            var fontSize = migratedUI.fontSize, withoutFontSize = __rest(migratedUI, ["fontSize"]);
            if (fontSize !== undefined) {
                shareConfigUpdates.fontSize = fontSize;
                migratedUI = withoutFontSize;
                effected = true;
            }
            var codeWrap = migratedUI.codeWrap, withoutCodeWrap = __rest(migratedUI, ["codeWrap"]);
            if (codeWrap !== undefined) {
                shareConfigUpdates.codeWrap = codeWrap;
                migratedUI = withoutCodeWrap;
                effected = true;
            }
            var displayRawMarkdown = migratedUI.displayRawMarkdown, withoutMD = __rest(migratedUI, ["displayRawMarkdown"]);
            if (displayRawMarkdown !== undefined) {
                shareConfigUpdates.displayRawMarkdown = displayRawMarkdown;
                migratedUI = withoutMD;
                effected = true;
            }
            var autoAcceptEditToolDiffs = migratedUI.autoAcceptEditToolDiffs, withoutAutoApply = __rest(migratedUI, ["autoAcceptEditToolDiffs"]);
            if (autoAcceptEditToolDiffs !== undefined) {
                shareConfigUpdates.autoAcceptEditToolDiffs = autoAcceptEditToolDiffs;
                migratedUI = withoutAutoApply;
                effected = true;
            }
            var showChatScrollbar = migratedUI.showChatScrollbar, withoutShowChatScrollbar = __rest(migratedUI, ["showChatScrollbar"]);
            if (showChatScrollbar !== undefined) {
                shareConfigUpdates.showChatScrollbar = showChatScrollbar;
                migratedUI = withoutShowChatScrollbar;
                effected = true;
            }
            // Ancient param to overwrite disableSessionTitles
            if ("getChatTitles" in migratedUI) {
                var getChatTitles = migratedUI.getChatTitles, withoutChatTitles = __rest(migratedUI, ["getChatTitles"]);
                if (getChatTitles === false) {
                    shareConfigUpdates.disableSessionTitles = true;
                    migratedUI = withoutChatTitles;
                    effected = true;
                }
            }
            if (Object.keys(migratedUI).length > 0) {
                config = __assign(__assign({}, withoutUI), { ui: migratedUI });
            }
            else {
                config = withoutUI;
            }
        }
        if (effected) {
            new GlobalContext_1.GlobalContext().updateSharedConfig(shareConfigUpdates);
        }
    }
    catch (e) {
        console.error("Migration: Failed to parse config.json: ".concat(e));
    }
}
