"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.partialModelSchema = exports.modelSchema = exports.autocompleteOptionsSchema = exports.chatOptionsSchema = exports.embedOptionsSchema = exports.cacheBehaviorSchema = exports.embeddingPrefixesSchema = exports.embeddingTasksSchema = exports.completionOptionsSchema = exports.modelCapabilitySchema = exports.modelRolesSchema = exports.requestOptionsSchema = exports.clientCertificateOptionsSchema = void 0;
var zod_1 = require("zod");
exports.clientCertificateOptionsSchema = zod_1.z.object({
    cert: zod_1.z.string(),
    key: zod_1.z.string(),
    passphrase: zod_1.z.string().optional(),
});
exports.requestOptionsSchema = zod_1.z.object({
    timeout: zod_1.z.number().optional(),
    verifySsl: zod_1.z.boolean().optional(),
    caBundlePath: zod_1.z.union([zod_1.z.string(), zod_1.z.array(zod_1.z.string())]).optional(),
    proxy: zod_1.z.string().optional(),
    headers: zod_1.z.record(zod_1.z.string()).optional(),
    extraBodyProperties: zod_1.z.record(zod_1.z.any()).optional(),
    noProxy: zod_1.z.array(zod_1.z.string()).optional(),
    clientCertificate: exports.clientCertificateOptionsSchema.optional(),
});
exports.modelRolesSchema = zod_1.z.enum([
    "chat",
    "autocomplete",
    "embed",
    "rerank",
    "edit",
    "apply",
    "summarize",
]);
// TODO consider just using array of strings for model capabilities
// To allow more dynamic string parsing
exports.modelCapabilitySchema = zod_1.z.union([
    zod_1.z.literal("tool_use"),
    zod_1.z.literal("image_input"),
    zod_1.z.literal("next_edit"),
    zod_1.z.string(), // Needed for forwards compatibility, see https://github.com/continuedev/continue/pull/7676
]);
exports.completionOptionsSchema = zod_1.z.object({
    contextLength: zod_1.z.number().optional(),
    maxTokens: zod_1.z.number().optional(),
    temperature: zod_1.z.number().optional(),
    topP: zod_1.z.number().optional(),
    topK: zod_1.z.number().optional(),
    minP: zod_1.z.number().optional(),
    presencePenalty: zod_1.z.number().optional(),
    frequencyPenalty: zod_1.z.number().optional(),
    stop: zod_1.z.array(zod_1.z.string()).optional(),
    n: zod_1.z.number().optional(),
    reasoning: zod_1.z.boolean().optional(),
    reasoningBudgetTokens: zod_1.z.number().optional(),
    promptCaching: zod_1.z.boolean().optional(),
    stream: zod_1.z.boolean().optional(),
});
exports.embeddingTasksSchema = zod_1.z.union([
    zod_1.z.literal("chunk"),
    zod_1.z.literal("query"),
]);
exports.embeddingPrefixesSchema = zod_1.z.record(exports.embeddingTasksSchema, zod_1.z.string());
exports.cacheBehaviorSchema = zod_1.z.object({
    cacheSystemMessage: zod_1.z.boolean().optional(),
    cacheConversation: zod_1.z.boolean().optional(),
});
exports.embedOptionsSchema = zod_1.z.object({
    maxChunkSize: zod_1.z.number().optional(),
    maxBatchSize: zod_1.z.number().optional(),
    embeddingPrefixes: exports.embeddingPrefixesSchema.optional(),
});
exports.chatOptionsSchema = zod_1.z.object({
    baseSystemMessage: zod_1.z.string().optional(),
    baseAgentSystemMessage: zod_1.z.string().optional(),
    basePlanSystemMessage: zod_1.z.string().optional(),
});
var templateSchema = zod_1.z.enum([
    "llama2",
    "alpaca",
    "zephyr",
    "phi2",
    "phind",
    "anthropic",
    "chatml",
    "none",
    "openchat",
    "deepseek",
    "xwin-coder",
    "neural-chat",
    "codellama-70b",
    "llava",
    "gemma",
    "granite",
    "llama3",
    "codestral",
]);
exports.autocompleteOptionsSchema = zod_1.z.object({
    disable: zod_1.z.boolean().optional(),
    maxPromptTokens: zod_1.z.number().optional(),
    debounceDelay: zod_1.z.number().optional(),
    modelTimeout: zod_1.z.number().optional(),
    maxSuffixPercentage: zod_1.z.number().optional(),
    prefixPercentage: zod_1.z.number().optional(),
    transform: zod_1.z.boolean().optional(),
    template: zod_1.z.string().optional(),
    onlyMyCode: zod_1.z.boolean().optional(),
    useCache: zod_1.z.boolean().optional(),
    useImports: zod_1.z.boolean().optional(),
    useRecentlyEdited: zod_1.z.boolean().optional(),
    useRecentlyOpened: zod_1.z.boolean().optional(),
    // Experimental options: true = enabled, false = disabled, number = enabled w priority
    experimental_includeClipboard: zod_1.z.boolean().optional(),
    experimental_includeRecentlyVisitedRanges: zod_1.z.boolean().optional(),
    experimental_includeRecentlyEditedRanges: zod_1.z.boolean().optional(),
    experimental_includeDiff: zod_1.z.boolean().optional(),
    experimental_enableStaticContextualization: zod_1.z.boolean().optional(),
});
/** Prompt templates use Handlebars syntax */
var promptTemplatesSchema = zod_1.z.object({
    apply: zod_1.z.string().optional(),
    chat: templateSchema.optional(),
    edit: zod_1.z.string().optional(),
    autocomplete: zod_1.z.string().optional(),
});
var baseModelFields = {
    name: zod_1.z.string(),
    model: zod_1.z.string(),
    apiKey: zod_1.z.string().optional(),
    apiBase: zod_1.z.string().optional(),
    maxStopWords: zod_1.z.number().optional(),
    roles: exports.modelRolesSchema.array().optional(),
    capabilities: exports.modelCapabilitySchema.array().optional(),
    defaultCompletionOptions: exports.completionOptionsSchema.optional(),
    cacheBehavior: exports.cacheBehaviorSchema.optional(),
    requestOptions: exports.requestOptionsSchema.optional(),
    embedOptions: exports.embedOptionsSchema.optional(),
    chatOptions: exports.chatOptionsSchema.optional(),
    promptTemplates: promptTemplatesSchema.optional(),
    useLegacyCompletionsEndpoint: zod_1.z.boolean().optional(),
    env: zod_1.z
        .record(zod_1.z.string(), zod_1.z.union([zod_1.z.string(), zod_1.z.boolean(), zod_1.z.number()]))
        .optional(),
    autocompleteOptions: exports.autocompleteOptionsSchema.optional(),
};
exports.modelSchema = zod_1.z.union([
    zod_1.z.object(__assign(__assign({}, baseModelFields), { provider: zod_1.z.literal("continue-proxy"), apiKeyLocation: zod_1.z.string().optional(), envSecretLocations: zod_1.z.record(zod_1.z.string(), zod_1.z.string()).optional(), orgScopeId: zod_1.z.string().nullable(), onPremProxyUrl: zod_1.z.string().nullable() })),
    zod_1.z.object(__assign(__assign({}, baseModelFields), { provider: zod_1.z.string().refine(function (val) { return val !== "continue-proxy"; }), sourceFile: zod_1.z.string().optional() })),
]);
exports.partialModelSchema = zod_1.z.union([
    zod_1.z
        .object(__assign(__assign({}, baseModelFields), { provider: zod_1.z.literal("continue-proxy"), apiKeyLocation: zod_1.z.string().optional(), envSecretLocations: zod_1.z.record(zod_1.z.string(), zod_1.z.string()).optional() }))
        .partial(),
    zod_1.z
        .object(__assign(__assign({}, baseModelFields), { provider: zod_1.z.string().refine(function (val) { return val !== "continue-proxy"; }) }))
        .partial(),
]);
