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
exports.getAnthropicMediaTypeFromDataUrl = exports.getAnthropicHeaders = exports.getAnthropicErrorMessage = exports.addCacheControlToLastTwoUserMessages = void 0;
exports.constructLlmApi = constructLlmApi;
var dotenv_1 = require("dotenv");
var Anthropic_js_1 = require("./apis/Anthropic.js");
var Azure_js_1 = require("./apis/Azure.js");
var Bedrock_js_1 = require("./apis/Bedrock.js");
var Cohere_js_1 = require("./apis/Cohere.js");
var CometAPI_js_1 = require("./apis/CometAPI.js");
var ContinueProxy_js_1 = require("./apis/ContinueProxy.js");
var DeepSeek_js_1 = require("./apis/DeepSeek.js");
var Gemini_js_1 = require("./apis/Gemini.js");
var Inception_js_1 = require("./apis/Inception.js");
var Jina_js_1 = require("./apis/Jina.js");
var LlamaStack_js_1 = require("./apis/LlamaStack.js");
var Mock_js_1 = require("./apis/Mock.js");
var Moonshot_js_1 = require("./apis/Moonshot.js");
var OpenAI_js_1 = require("./apis/OpenAI.js");
var OpenRouter_js_1 = require("./apis/OpenRouter.js");
var Relace_js_1 = require("./apis/Relace.js");
var VertexAI_js_1 = require("./apis/VertexAI.js");
var WatsonX_js_1 = require("./apis/WatsonX.js");
var appendPathToUrl_js_1 = require("./util/appendPathToUrl.js");
dotenv_1.default.config();
function openAICompatible(apiBase, config) {
    var _a;
    return new OpenAI_js_1.OpenAIApi(__assign(__assign({}, config), { apiBase: (_a = config.apiBase) !== null && _a !== void 0 ? _a : apiBase }));
}
/**
 * Detects if a HuggingFace API URL is using an OpenAI-compatible router
 * @param url The URL to check
 * @returns true if the URL appears to be using an OpenAI-compatible router
 */
function isHuggingFaceOpenAICompatible(url) {
    if (!url) {
        return false;
    }
    // Normalize the URL to lowercase for case-insensitive matching
    var normalizedUrl = url.toLowerCase();
    // Check for common OpenAI-compatible patterns
    var openAIPatterns = [
        "/v1/", // Standard OpenAI v1 API pattern
        "/openai/", // Explicit OpenAI compatibility path
        "/v1/chat/completions", // Specific OpenAI chat completions endpoint
        "/v1/completions", // OpenAI completions endpoint
        "/v1/embeddings", // OpenAI embeddings endpoint
        "/v1/models", // OpenAI models endpoint
    ];
    // Check if the URL contains any of the OpenAI-compatible patterns
    return openAIPatterns.some(function (pattern) { return normalizedUrl.includes(pattern); });
}
function constructLlmApi(config) {
    switch (config.provider) {
        case "openai":
            return new OpenAI_js_1.OpenAIApi(config);
        case "azure":
            return new Azure_js_1.AzureApi(config);
        case "bedrock":
            return new Bedrock_js_1.BedrockApi(config);
        case "cohere":
            return new Cohere_js_1.CohereApi(config);
        case "cometapi":
            return new CometAPI_js_1.CometAPIApi(config);
        case "anthropic":
            return new Anthropic_js_1.AnthropicApi(config);
        case "gemini":
            return new Gemini_js_1.GeminiApi(config);
        case "jina":
            return new Jina_js_1.JinaApi(config);
        case "deepseek":
            return new DeepSeek_js_1.DeepSeekApi(config);
        case "moonshot":
            return new Moonshot_js_1.MoonshotApi(config);
        case "relace":
            return new Relace_js_1.RelaceApi(config);
        case "inception":
            return new Inception_js_1.InceptionApi(config);
        case "watsonx":
            return new WatsonX_js_1.WatsonXApi(config);
        case "vertexai":
            return new VertexAI_js_1.VertexAIApi(config);
        case "llamastack":
            return new LlamaStack_js_1.LlamastackApi(config);
        case "continue-proxy":
            return new ContinueProxy_js_1.ContinueProxyApi(config);
        case "xAI":
            return openAICompatible("https://api.x.ai/v1/", config);
        case "voyage":
            return openAICompatible("https://api.voyageai.com/v1/", config);
        case "mistral":
            return openAICompatible("https://api.mistral.ai/v1/", config);
        case "deepinfra":
            return openAICompatible("https://api.deepinfra.com/v1/openai/", config);
        case "vllm":
            return openAICompatible("http://localhost:8000/v1/", config);
        case "groq":
            return openAICompatible("https://api.groq.com/openai/v1/", config);
        case "sambanova":
            return openAICompatible("https://api.sambanova.ai/v1/", config);
        case "text-gen-webui":
            return openAICompatible("http://127.0.0.1:5000/v1/", config);
        case "cerebras":
            return openAICompatible("https://api.cerebras.ai/v1/", config);
        case "kindo":
            return openAICompatible("https://llm.kindo.ai/v1/", config);
        case "msty":
            return openAICompatible("http://localhost:10000", config);
        case "nvidia":
            return openAICompatible("https://integrate.api.nvidia.com/v1/", config);
        case "ovhcloud":
            return openAICompatible("https://oai.endpoints.kepler.ai.cloud.ovh.net/v1/", config);
        case "scaleway":
            return openAICompatible("https://api.scaleway.ai/v1/", config);
        case "fireworks":
            return openAICompatible("https://api.fireworks.ai/inference/v1/", config);
        case "together":
            return openAICompatible("https://api.together.xyz/v1/", config);
        case "ncompass":
            return openAICompatible("https://api.ncompass.tech/v1", config);
        case "novita":
            return openAICompatible("https://api.novita.ai/v3/openai", config);
        case "nebius":
            return openAICompatible("https://api.studio.nebius.ai/v1/", config);
        case "function-network":
            return openAICompatible("https://api.function.network/v1/", config);
        case "openrouter":
            return new OpenRouter_js_1.OpenRouterApi(config);
        case "llama.cpp":
        case "llamafile":
            return openAICompatible("http://localhost:8000/", config);
        case "lmstudio":
            return openAICompatible("http://localhost:1234/", config);
        case "ollama":
            // for openai compaitability, we need to add /v1 to the end of the url
            // this is required for cli (for core, endpoints are overriden by core/llm/llms/Ollama.ts)
            if (config.apiBase)
                config.apiBase = (0, appendPathToUrl_js_1.appendPathToUrlIfNotPresent)(config.apiBase, "v1");
            return openAICompatible("http://localhost:11434/v1/", config);
        case "mock":
            return new Mock_js_1.MockApi();
        case "huggingface-inference-api":
            // Check if it's an OpenAI-compatible router
            if (config.apiBase && isHuggingFaceOpenAICompatible(config.apiBase)) {
                return openAICompatible(config.apiBase, config);
            }
            // Return undefined for native HuggingFace endpoints
            // (handled by HuggingFaceInferenceAPI class in core)
            return undefined;
        default:
            return undefined;
    }
}
var AnthropicUtils_js_1 = require("./apis/AnthropicUtils.js");
Object.defineProperty(exports, "addCacheControlToLastTwoUserMessages", { enumerable: true, get: function () { return AnthropicUtils_js_1.addCacheControlToLastTwoUserMessages; } });
Object.defineProperty(exports, "getAnthropicErrorMessage", { enumerable: true, get: function () { return AnthropicUtils_js_1.getAnthropicErrorMessage; } });
Object.defineProperty(exports, "getAnthropicHeaders", { enumerable: true, get: function () { return AnthropicUtils_js_1.getAnthropicHeaders; } });
Object.defineProperty(exports, "getAnthropicMediaTypeFromDataUrl", { enumerable: true, get: function () { return AnthropicUtils_js_1.getAnthropicMediaTypeFromDataUrl; } });
