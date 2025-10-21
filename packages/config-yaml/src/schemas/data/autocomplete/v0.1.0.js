"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.autocompleteEventSchema_0_1_0_noCode = exports.autocompleteEventSchema_0_1_0 = void 0;
var index_js_1 = require("./index.js");
exports.autocompleteEventSchema_0_1_0 = index_js_1.autocompleteEventAllSchema.pick({
    disable: true,
    useFileSuffix: true,
    maxPromptTokens: true,
    debounceDelay: true,
    maxSuffixPercentage: true,
    prefixPercentage: true,
    transform: true,
    template: true,
    multilineCompletions: true,
    slidingWindowPrefixPercentage: true,
    slidingWindowSize: true,
    useCache: true,
    onlyMyCode: true,
    useRecentlyEdited: true,
    disableInFiles: true,
    useImports: true,
    accepted: true,
    time: true,
    prefix: true,
    suffix: true,
    prompt: true,
    completion: true,
    modelProvider: true,
    modelName: true,
    completionOptions: true,
    cacheHit: true,
    filepath: true,
    gitRepo: true,
    completionId: true,
    uniqueId: true,
    timestamp: true,
});
exports.autocompleteEventSchema_0_1_0_noCode = exports.autocompleteEventSchema_0_1_0.omit({
    prefix: true,
    suffix: true,
    prompt: true,
    completion: true,
});
