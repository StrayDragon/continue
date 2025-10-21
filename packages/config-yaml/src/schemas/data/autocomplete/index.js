"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.autocompleteEventAllSchema = void 0;
var zod_1 = require("zod");
var models_js_1 = require("../../models.js");
var base_js_1 = require("../base.js");
exports.autocompleteEventAllSchema = base_js_1.baseDevDataAllSchema.extend({
    // Tab autocomplete options - TODO - old json version?
    disable: zod_1.z.boolean(),
    useFileSuffix: zod_1.z.boolean(),
    maxPromptTokens: zod_1.z.number(),
    debounceDelay: zod_1.z.number(),
    maxSuffixPercentage: zod_1.z.number(),
    prefixPercentage: zod_1.z.number(),
    transform: zod_1.z.boolean().optional(),
    template: zod_1.z.string().optional(),
    multilineCompletions: zod_1.z.enum(["always", "never", "auto"]),
    slidingWindowPrefixPercentage: zod_1.z.number(),
    slidingWindowSize: zod_1.z.number(),
    useCache: zod_1.z.boolean(),
    onlyMyCode: zod_1.z.boolean(),
    useRecentlyEdited: zod_1.z.boolean(),
    useImports: zod_1.z.boolean().optional(),
    // Other
    accepted: zod_1.z.boolean().optional(),
    time: zod_1.z.number(),
    prefix: zod_1.z.string(),
    suffix: zod_1.z.string(),
    prompt: zod_1.z.string(),
    completion: zod_1.z.string(),
    modelProvider: zod_1.z.string(),
    modelName: zod_1.z.string(),
    cacheHit: zod_1.z.boolean(),
    filepath: zod_1.z.string(),
    gitRepo: zod_1.z.string().optional(),
    completionId: zod_1.z.string(),
    uniqueId: zod_1.z.string(),
    timestamp: zod_1.z.string(),
    // For static contextualization.
    enabledStaticContextualization: zod_1.z.boolean().optional(),
    // DEPRECATED - no more nested objects after v0.1.0, all flat values
    completionOptions: models_js_1.completionOptionsSchema.optional(),
    disableInFiles: zod_1.z.array(zod_1.z.string()).optional(),
});
