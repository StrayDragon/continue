"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shouldCompleteMultiline = shouldCompleteMultiline;
function isMidlineCompletion(prefix, suffix) {
    return !suffix.startsWith("\n");
}
function shouldCompleteMultilineBasedOnLanguage(language, prefix, suffix) {
    var _a, _b;
    return (_b = (_a = language.useMultiline) === null || _a === void 0 ? void 0 : _a.call(language, { prefix: prefix, suffix: suffix })) !== null && _b !== void 0 ? _b : true;
}
function shouldCompleteMultiline(helper) {
    var _a;
    switch (helper.options.multilineCompletions) {
        case "always":
            return true;
        case "never":
            return false;
        case true:
            return true;
        case false:
            return false;
        default:
            break;
    }
    // Always single-line if an intellisense option is selected
    if (helper.input.selectedCompletionInfo) {
        return true;
    }
    // // Don't complete multi-line if you are mid-line
    // if (isMidlineCompletion(helper.fullPrefix, helper.fullSuffix)) {
    //   return false;
    // }
    // Don't complete multi-line for single-line comments
    if (helper.lang.singleLineComment &&
        ((_a = helper.fullPrefix
            .split("\n")
            .slice(-1)[0]) === null || _a === void 0 ? void 0 : _a.trimStart().startsWith(helper.lang.singleLineComment))) {
        return false;
    }
    return shouldCompleteMultilineBasedOnLanguage(helper.lang, helper.prunedPrefix, helper.prunedSuffix);
}
