"use strict";
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
exports.getStopTokens = getStopTokens;
var DOUBLE_NEWLINE = "\n\n";
var WINDOWS_DOUBLE_NEWLINE = "\r\n\r\n";
// TODO: Do we want to stop completions when reaching a `/src/` string?
var SRC_DIRECTORY = "/src/";
// Starcoder2 tends to output artifacts starting with the letter "t"
var STARCODER2_T_ARTIFACTS = ["t.", "\nt", "<file_sep>"];
var PYTHON_ENCODING = "#- coding: utf-8";
var CODE_BLOCK_END = "```";
// const multilineStops: string[] = [DOUBLE_NEWLINE, WINDOWS_DOUBLE_NEWLINE];
var commonStops = [SRC_DIRECTORY, PYTHON_ENCODING, CODE_BLOCK_END];
function getStopTokens(completionOptions, lang, model) {
    var stopTokens = __spreadArray(__spreadArray(__spreadArray([], ((completionOptions === null || completionOptions === void 0 ? void 0 : completionOptions.stop) || []), true), commonStops, true), (model.toLowerCase().includes("starcoder2")
        ? STARCODER2_T_ARTIFACTS
        : []), true);
    return stopTokens;
}
