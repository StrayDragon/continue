"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LLMConfigSchema = exports.VertexAIConfigSchema = exports.InceptionConfigSchema = exports.JinaConfigSchema = exports.WatsonXConfigSchema = exports.AnthropicConfigSchema = exports.GeminiConfigSchema = exports.AzureConfigSchema = exports.CometAPIConfigSchema = exports.CohereConfigSchema = exports.MockConfigSchema = exports.ContinueProxyConfigSchema = exports.LlamastackConfigSchema = exports.BedrockConfigSchema = exports.DeepseekConfigSchema = exports.MoonshotConfigSchema = exports.OpenAIConfigSchema = exports.BasePlusConfig = exports.BaseConfig = exports.RequestOptionsSchema = exports.ClientCertificateOptionsSchema = void 0;
var z = require("zod");
exports.ClientCertificateOptionsSchema = z.object({
    cert: z.string(),
    key: z.string(),
    passphrase: z.string().optional(),
});
exports.RequestOptionsSchema = z.object({
    timeout: z.number().optional(),
    verifySsl: z.boolean().optional(),
    caBundlePath: z.union([z.string(), z.array(z.string())]).optional(),
    proxy: z.string().optional(),
    headers: z.record(z.string()).optional(),
    extraBodyProperties: z.record(z.unknown()).optional(),
    noProxy: z.array(z.string()).optional(),
    clientCertificate: z.lazy(function () { return exports.ClientCertificateOptionsSchema; }).optional(),
});
// Base config objects
exports.BaseConfig = z.object({
    provider: z.string(),
    requestOptions: exports.RequestOptionsSchema.optional(),
});
exports.BasePlusConfig = exports.BaseConfig.extend({
    apiBase: z.string().optional(),
    apiKey: z.string().optional(),
});
// OpenAI and compatible
exports.OpenAIConfigSchema = exports.BasePlusConfig.extend({
    provider: z.union([
        z.literal("openai"),
        z.literal("mistral"),
        z.literal("voyage"),
        z.literal("deepinfra"),
        z.literal("groq"),
        z.literal("nvidia"),
        z.literal("ovhcloud"),
        z.literal("fireworks"),
        z.literal("together"),
        z.literal("novita"),
        z.literal("nebius"),
        z.literal("function-network"),
        z.literal("llama.cpp"),
        z.literal("llamafile"),
        z.literal("lmstudio"),
        z.literal("ollama"),
        z.literal("cerebras"),
        z.literal("kindo"),
        z.literal("msty"),
        z.literal("openrouter"),
        z.literal("sambanova"),
        z.literal("text-gen-webui"),
        z.literal("vllm"),
        z.literal("xAI"),
        z.literal("scaleway"),
        z.literal("ncompass"),
        z.literal("relace"),
        z.literal("huggingface-inference-api"),
    ]),
});
exports.MoonshotConfigSchema = exports.OpenAIConfigSchema.extend({
    provider: z.literal("moonshot"),
});
exports.DeepseekConfigSchema = exports.OpenAIConfigSchema.extend({
    provider: z.literal("deepseek"),
});
exports.BedrockConfigSchema = exports.OpenAIConfigSchema.extend({
    provider: z.literal("bedrock"),
    // cacheBehavior: z.object({
    //   cacheSystemMessage: z.boolean().optional(),
    //   cacheConversation: z.boolean().optional(),
    // }).optional(),
    env: z
        .object({
        region: z.string().optional(),
        accessKeyId: z.string().optional(),
        secretAccessKey: z.string().optional(),
        profile: z.string().optional(),
    })
        .optional(),
});
exports.LlamastackConfigSchema = exports.OpenAIConfigSchema.extend({
    provider: z.literal("llamastack"),
});
exports.ContinueProxyConfigSchema = exports.BasePlusConfig.extend({
    provider: z.literal("continue-proxy"),
    env: z.object({
        apiKeyLocation: z.string().optional(),
        envSecretLocations: z.record(z.string(), z.string()).optional(),
        orgScopeId: z.string().nullable(),
        proxyUrl: z.string().optional(),
    }),
});
exports.MockConfigSchema = exports.BasePlusConfig.extend({
    provider: z.literal("mock"),
});
// Other APIs
exports.CohereConfigSchema = exports.OpenAIConfigSchema.extend({
    provider: z.literal("cohere"),
});
exports.CometAPIConfigSchema = exports.OpenAIConfigSchema.extend({
    provider: z.literal("cometapi"),
});
exports.AzureConfigSchema = exports.OpenAIConfigSchema.extend({
    provider: z.literal("azure"),
    env: z
        .object({
        apiVersion: z.string().optional(),
        apiType: z
            .union([
            z.literal("azure-foundry"),
            z.literal("azure-openai"),
            z.literal("azure"), // Legacy
        ])
            .optional(),
        deployment: z.string().optional(),
    })
        .optional(),
});
exports.GeminiConfigSchema = exports.OpenAIConfigSchema.extend({
    provider: z.literal("gemini"),
    apiKey: z.string(),
});
exports.AnthropicConfigSchema = exports.OpenAIConfigSchema.extend({
    provider: z.literal("anthropic"),
    apiKey: z.string(),
});
exports.WatsonXConfigSchema = exports.BasePlusConfig.extend({
    provider: z.literal("watsonx"),
    apiKey: z.string(),
    env: z.object({
        apiVersion: z.string().optional(),
        projectId: z.string().optional(),
        deploymentId: z.string().optional(),
    }),
});
exports.JinaConfigSchema = exports.OpenAIConfigSchema.extend({
    provider: z.literal("jina"),
});
exports.InceptionConfigSchema = exports.OpenAIConfigSchema.extend({
    provider: z.literal("inception"),
});
exports.VertexAIConfigSchema = exports.BasePlusConfig.extend({
    provider: z.literal("vertexai"),
    env: z
        .object({
        region: z.string().optional(),
        projectId: z.string().optional(),
        keyFile: z.string().optional(),
        keyJson: z.string().optional(),
    })
        .optional(),
});
// Discriminated union
exports.LLMConfigSchema = z.discriminatedUnion("provider", [
    exports.OpenAIConfigSchema,
    exports.BedrockConfigSchema,
    exports.MoonshotConfigSchema,
    exports.DeepseekConfigSchema,
    exports.CohereConfigSchema,
    exports.AzureConfigSchema,
    exports.GeminiConfigSchema,
    exports.AnthropicConfigSchema,
    exports.WatsonXConfigSchema,
    exports.JinaConfigSchema,
    exports.MockConfigSchema,
    exports.InceptionConfigSchema,
    exports.VertexAIConfigSchema,
    exports.LlamastackConfigSchema,
    exports.ContinueProxyConfigSchema,
    exports.CometAPIConfigSchema,
]);
