"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configJsonSchema = exports.controlPlaneConfigSchema = exports.siteIndexingConfigSchema = exports.devDataSchema = exports.analyticsSchema = exports.rerankerSchema = exports.contextProviderSchema = exports.customCommandSchema = exports.slashCommandSchema = exports.tabAutocompleteOptionsSchema = exports.uiOptionsSchema = exports.embeddingsProviderSchema = exports.modelDescriptionSchema = exports.requestOptionsSchema = exports.clientCertificateOptionsSchema = exports.completionOptionsSchema = void 0;
var zod_1 = require("zod");
exports.completionOptionsSchema = zod_1.z.object({
    temperature: zod_1.z.number().optional(),
    topP: zod_1.z.number().optional(),
    topK: zod_1.z.number().optional(),
    minP: zod_1.z.number().optional(),
    presencePenalty: zod_1.z.number().optional(),
    frequencyPenalty: zod_1.z.number().optional(),
    mirostat: zod_1.z.number().optional(),
    stop: zod_1.z.array(zod_1.z.string()).optional(),
    maxTokens: zod_1.z.number().optional(),
    numThreads: zod_1.z.number().optional(),
    useMmap: zod_1.z.boolean().optional(),
    keepAlive: zod_1.z.number().optional(),
    numGpu: zod_1.z.number().optional(),
    raw: zod_1.z.boolean().optional(),
    stream: zod_1.z.boolean().optional(),
});
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
exports.modelDescriptionSchema = zod_1.z.object({
    title: zod_1.z.string(),
    provider: zod_1.z.enum([
        "openai",
        "anthropic",
        "cohere",
        "ollama",
        "huggingface-tgi",
        "huggingface-inference-api",
        "replicate",
        "gemini",
        "mistral",
        "bedrock",
        "sagemaker",
        "cloudflare",
        "azure",
        "ovhcloud",
        "continue-proxy",
        "nebius",
        "scaleway",
        "watsonx",
    ]),
    model: zod_1.z.string(),
    apiKey: zod_1.z.string().optional(),
    apiBase: zod_1.z.string().optional(),
    contextLength: zod_1.z.number().optional(),
    template: zod_1.z
        .enum([
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
        "llama3",
    ])
        .optional(),
    completionOptions: exports.completionOptionsSchema.optional(),
    systemMessage: zod_1.z.string().optional(),
    requestOptions: zod_1.z
        .object({
        timeout: zod_1.z.number().optional(),
        verifySsl: zod_1.z.boolean().optional(),
        caBundlePath: zod_1.z.union([zod_1.z.string(), zod_1.z.array(zod_1.z.string())]).optional(),
        proxy: zod_1.z.string().optional(),
        headers: zod_1.z.record(zod_1.z.string()).optional(),
        extraBodyProperties: zod_1.z.record(zod_1.z.any()).optional(),
        noProxy: zod_1.z.array(zod_1.z.string()).optional(),
    })
        .optional(),
    promptTemplates: zod_1.z.record(zod_1.z.string()).optional(),
});
exports.embeddingsProviderSchema = zod_1.z.object({
    provider: zod_1.z.enum([
        "transformers.js",
        "ollama",
        "openai",
        "cohere",
        "gemini",
        "ovhcloud",
        "continue-proxy",
        "nebius",
        "scaleway",
        "watsonx",
    ]),
    apiBase: zod_1.z.string().optional(),
    apiKey: zod_1.z.string().optional(),
    model: zod_1.z.string().optional(),
    deployment: zod_1.z.string().optional(),
    apiType: zod_1.z.string().optional(),
    apiVersion: zod_1.z.string().optional(),
    requestOptions: exports.requestOptionsSchema.optional(),
});
exports.uiOptionsSchema = zod_1.z.object({
    codeBlockToolbarPosition: zod_1.z.enum(["top", "bottom"]).optional(),
    fontSize: zod_1.z.number().optional(),
    displayRawMarkdown: zod_1.z.boolean().optional(),
    showChatScrollbar: zod_1.z.boolean().optional(),
    codeWrap: zod_1.z.boolean().optional(),
});
exports.tabAutocompleteOptionsSchema = zod_1.z.object({
    disable: zod_1.z.boolean(),
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
    disableInFiles: zod_1.z.array(zod_1.z.string()).optional(),
    useImports: zod_1.z.boolean().optional(),
    // Experimental options: true = enabled, false = disabled, number = enabled w priority
    experimental_includeClipboard: zod_1.z.union([zod_1.z.boolean(), zod_1.z.number()]).optional(),
    experimental_includeRecentlyVisitedRanges: zod_1.z
        .union([zod_1.z.boolean(), zod_1.z.number()])
        .optional(),
    experimental_includeRecentlyEditedRanges: zod_1.z
        .union([zod_1.z.boolean(), zod_1.z.number()])
        .optional(),
    experimental_includeDiff: zod_1.z.union([zod_1.z.boolean(), zod_1.z.number()]).optional(),
    experimental_enableStaticContextualization: zod_1.z.boolean().optional(),
});
exports.slashCommandSchema = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    params: zod_1.z.record(zod_1.z.any()).optional(),
});
exports.customCommandSchema = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    params: zod_1.z.record(zod_1.z.any()).optional(),
});
exports.contextProviderSchema = zod_1.z.object({
    name: zod_1.z.string(),
    params: zod_1.z.record(zod_1.z.string(), zod_1.z.any()),
});
exports.rerankerSchema = zod_1.z.object({
    name: zod_1.z.enum(["cohere", "voyage", "watsonx", "llm", "continue-proxy"]),
    params: zod_1.z.record(zod_1.z.any()).optional(),
});
exports.analyticsSchema = zod_1.z.object({
    provider: zod_1.z.enum([
        "posthog",
        "amplitude",
        "segment",
        "logstash",
        "mixpanel",
        "splunk",
        "datadog",
        "continue-proxy",
    ]),
    url: zod_1.z.string().optional(),
    clientKey: zod_1.z.string().optional(),
});
exports.devDataSchema = zod_1.z.object({
    url: zod_1.z.string().optional(),
});
exports.siteIndexingConfigSchema = zod_1.z.object({
    startUrl: zod_1.z.string(),
    rootUrl: zod_1.z.string().optional(),
    title: zod_1.z.string(),
    maxDepth: zod_1.z.number().optional(),
    faviconUrl: zod_1.z.string().optional(),
    useLocalCrawling: zod_1.z.boolean().optional(),
    sourceFile: zod_1.z.string().optional(),
});
exports.controlPlaneConfigSchema = zod_1.z.object({
    useContinueForTeamsProxy: zod_1.z.boolean().optional(),
    proxyUrl: zod_1.z.string().optional(),
});
exports.configJsonSchema = zod_1.z.object({
    models: zod_1.z.array(exports.modelDescriptionSchema),
    tabAutocompleteModel: exports.modelDescriptionSchema.optional(),
    embeddingsProvider: exports.embeddingsProviderSchema.optional(),
    reranker: exports.rerankerSchema.optional(),
    analytics: exports.analyticsSchema,
    devData: exports.devDataSchema,
    allowAnonymousTelemetry: zod_1.z.boolean().optional(),
    systemMessage: zod_1.z.string().optional(),
    completionOptions: exports.completionOptionsSchema.optional(),
    requestOptions: exports.requestOptionsSchema.optional(),
    slashCommands: zod_1.z.array(exports.slashCommandSchema).optional(),
    customCommands: zod_1.z.array(exports.customCommandSchema).optional(),
    contextProviders: zod_1.z.array(exports.contextProviderSchema).optional(),
    disableIndexing: zod_1.z.boolean().optional(),
    tabAutocompleteOptions: exports.tabAutocompleteOptionsSchema.optional(),
    ui: exports.uiOptionsSchema.optional(),
    docs: zod_1.z.array(exports.siteIndexingConfigSchema).optional(),
    controlPlane: exports.controlPlaneConfigSchema.optional(),
});
