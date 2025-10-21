"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.autocompleteEventSchema_0_2_0_noCode = exports.autocompleteEventSchema_0_2_0 = void 0;
var index_js_1 = require("./index.js");
exports.autocompleteEventSchema_0_2_0 = index_js_1.autocompleteEventAllSchema.pick({
    // base
    timestamp: true,
    userId: true,
    userAgent: true,
    selectedProfileId: true,
    eventName: true,
    schema: true,
    // autocomplete-specific
    disable: true,
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
    useImports: true,
    accepted: true,
    time: true,
    prefix: true,
    suffix: true,
    prompt: true,
    completion: true,
    modelProvider: true,
    modelName: true,
    cacheHit: true,
    filepath: true,
    gitRepo: true,
    completionId: true,
    uniqueId: true,
    // For static contextualization.
    enabledStaticContextualization: true,
    // Note objects (completionOptions and disableInfiles) removed from 0.1.0 => 0.2.0
});
exports.autocompleteEventSchema_0_2_0_noCode = exports.autocompleteEventSchema_0_2_0.omit({
    prefix: true,
    suffix: true,
    prompt: true,
    completion: true,
});
