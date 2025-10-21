"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configSchema = exports.autoindentExtensionsSchema = exports.sidebarSchema = exports.languageMarkerSchema = exports.continueCommandSchema = exports.blockSchema = exports.isAssistantUnrolledNonNullable = exports.assistantUnrolledSchemaNonNullable = exports.assistantUnrolledSchema = exports.configYamlSchema = exports.baseConfigYamlSchema = exports.commonMetadataSchema = exports.blockOrSchema = exports.blockItemWrapperSchema = exports.rulesJsonSchema = exports.contextSchema = void 0;
var z = require("zod");
var commonSlugs_js_1 = require("./commonSlugs.js");
var index_js_1 = require("./data/index.js");
var index_js_2 = require("./mcp/index.js");
var models_js_1 = require("./models.js");
exports.contextSchema = z.object({
    name: z.string().optional(),
    provider: z.string(),
    params: z.any().optional(),
});
var promptSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    prompt: z.string(),
    sourceFile: z.string().optional(),
});
var docSchema = z.object({
    name: z.string(),
    startUrl: z.string(),
    rootUrl: z.string().optional(),
    faviconUrl: z.string().optional(),
    useLocalCrawling: z.boolean().optional(),
    sourceFile: z.string().optional(),
});
var ruleObjectSchema = z.object({
    name: z.string(),
    rule: z.string(),
    description: z.string().optional(),
    globs: z.union([z.string(), z.array(z.string())]).optional(),
    regex: z.union([z.string(), z.array(z.string())]).optional(),
    alwaysApply: z.boolean().optional(),
    invokable: z.boolean().optional(),
    sourceFile: z.string().optional(),
});
var ruleSchema = z.union([z.string(), ruleObjectSchema]);
/**
 * A schema for rules.json files
 */
exports.rulesJsonSchema = z.object({
    name: z.string(),
    version: z.string(),
    author: z.string().optional(),
    license: z.string().optional(),
    rules: z.record(z.string(), z.string()).optional(),
});
var defaultUsesSchema = z.string();
var blockItemWrapperSchema = function (schema, usesSchema) {
    if (usesSchema === void 0) { usesSchema = defaultUsesSchema; }
    return z.object({
        uses: usesSchema,
        with: z.record(z.string()).optional(),
        override: schema.partial().optional(),
    });
};
exports.blockItemWrapperSchema = blockItemWrapperSchema;
var blockOrSchema = function (schema, usesSchema) {
    if (usesSchema === void 0) { usesSchema = defaultUsesSchema; }
    return z.union([schema, (0, exports.blockItemWrapperSchema)(schema, usesSchema)]);
};
exports.blockOrSchema = blockOrSchema;
exports.commonMetadataSchema = z.object({
    tags: z.string().optional(),
    sourceCodeUrl: z.string().optional(),
    description: z.string().optional(),
    author: z.string().optional(),
    license: z.string().optional(),
    iconUrl: z.string().optional(),
});
var envRecord = z.record(z.string(), z.union([z.string(), z.number(), z.boolean()]));
exports.baseConfigYamlSchema = z.object({
    name: z.string(),
    version: z.string(),
    schema: z.string().optional(),
    metadata: z.record(z.string()).and(exports.commonMetadataSchema.partial()).optional(),
    env: envRecord.optional(),
    requestOptions: models_js_1.requestOptionsSchema.optional(),
});
var modelsUsesSchema = z
    .string()
    .or(z.enum(commonSlugs_js_1.commonModelSlugs));
exports.configYamlSchema = exports.baseConfigYamlSchema.extend({
    models: z
        .array(z.union([
        models_js_1.modelSchema,
        z.object({
            uses: modelsUsesSchema,
            with: z.record(z.string()).optional(),
            override: models_js_1.partialModelSchema.optional(),
        }),
    ]))
        .optional(),
    context: z.array((0, exports.blockOrSchema)(exports.contextSchema)).optional(),
    data: z.array((0, exports.blockOrSchema)(index_js_1.dataSchema)).optional(),
    mcpServers: z
        .array(z.union([
        index_js_2.mcpServerSchema,
        z.object({
            uses: defaultUsesSchema,
            with: z.record(z.string()).optional(),
            override: index_js_2.partialMcpServerSchema.optional(),
        }),
    ]))
        .optional(),
    rules: z
        .array(z.union([
        ruleSchema,
        z.object({
            uses: defaultUsesSchema,
            with: z.record(z.string()).optional(),
        }),
    ]))
        .optional(),
    prompts: z.array((0, exports.blockOrSchema)(promptSchema)).optional(),
    docs: z.array((0, exports.blockOrSchema)(docSchema)).optional(),
});
exports.assistantUnrolledSchema = exports.baseConfigYamlSchema.extend({
    models: z.array(models_js_1.modelSchema.nullable()).optional(),
    context: z.array(exports.contextSchema.nullable()).optional(),
    data: z.array(index_js_1.dataSchema.nullable()).optional(),
    mcpServers: z.array(index_js_2.mcpServerSchema.nullable()).optional(),
    rules: z.array(ruleSchema.nullable()).optional(),
    prompts: z.array(promptSchema.nullable()).optional(),
    docs: z.array(docSchema.nullable()).optional(),
});
exports.assistantUnrolledSchemaNonNullable = exports.baseConfigYamlSchema.extend({
    models: z.array(models_js_1.modelSchema).optional(),
    context: z.array(exports.contextSchema).optional(),
    data: z.array(index_js_1.dataSchema).optional(),
    mcpServers: z.array(index_js_2.mcpServerSchema).optional(),
    rules: z.array(ruleSchema).optional(),
    prompts: z.array(promptSchema).optional(),
    docs: z.array(docSchema).optional(),
});
var isAssistantUnrolledNonNullable = function (a) {
    return (!a.models || a.models.every(function (m) { return m !== null; })) &&
        (!a.context || a.context.every(function (c) { return c !== null; })) &&
        (!a.data || a.data.every(function (d) { return d !== null; })) &&
        (!a.mcpServers || a.mcpServers.every(function (s) { return s !== null; })) &&
        (!a.rules || a.rules.every(function (r) { return r !== null; })) &&
        (!a.prompts || a.prompts.every(function (p) { return p !== null; })) &&
        (!a.docs || a.docs.every(function (d) { return d !== null; }));
};
exports.isAssistantUnrolledNonNullable = isAssistantUnrolledNonNullable;
exports.blockSchema = exports.baseConfigYamlSchema.and(z.union([
    z.object({ models: z.array(models_js_1.modelSchema).length(1) }),
    z.object({ context: z.array(exports.contextSchema).length(1) }),
    z.object({ data: z.array(index_js_1.dataSchema).length(1) }),
    z.object({ mcpServers: z.array(index_js_2.mcpServerSchema).length(1) }),
    z.object({
        rules: z.array(ruleSchema).length(1),
    }),
    z.object({ prompts: z.array(promptSchema).length(1) }),
    z.object({ docs: z.array(docSchema).length(1) }),
]));
exports.continueCommandSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    prompt: z.string(),
    placeholders: z.array(z.string()).optional(),
    context: z.string().optional(),
    contextWindowSize: z.number().optional(),
    model: z.string().optional(),
    systemMessage: z.string().optional(),
    slashCommand: z.string().optional(),
    hideFromCommandPalette: z.boolean().optional(),
    hideFromSlashCommands: z.boolean().optional(),
    mode: z.enum(["insert", "replace", "diff"]).optional(),
    addEnhancedContext: z.boolean().optional(),
});
exports.languageMarkerSchema = z.object({
    language: z.string(),
    markers: z.array(z.string()),
});
exports.sidebarSchema = z.object({
    enabled: z.boolean().optional(),
    defaultOpen: z.boolean().optional(),
    defaultWidth: z.number().optional(),
    showButtonsThreshold: z.number().optional(),
});
var toolSchema = z.object({
    name: z.string(),
    description: z.string(),
    defaultIcon: z.string().optional(),
});
exports.autoindentExtensionsSchema = z.array(z.string());
exports.configSchema = z.object({
    models: z.array(models_js_1.modelSchema).optional(),
    defaultModel: z.string().optional(),
    defaultRecentMessages: z.number().optional(),
    commands: z.array(exports.continueCommandSchema).optional(),
    tools: z.array(toolSchema).optional(),
    contextProviders: z.array(z.any()).optional(),
    langMarkers: z.array(exports.languageMarkerSchema).optional(),
    sidebar: exports.sidebarSchema.optional(),
    tabAutocompleteModel: z.string().optional(),
    rules: z.array(ruleObjectSchema).optional(),
    doneWithBannerForever: z.boolean().optional(),
    autoindentExtensions: exports.autoindentExtensionsSchema.optional(),
    proxy: z.string().optional(),
    api_base: z.string().optional(),
    api_key: z.string().optional(),
    env: envRecord.optional(),
    requestOptions: models_js_1.requestOptionsSchema.optional(),
});
