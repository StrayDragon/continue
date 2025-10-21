"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PROVIDER_TOOL_SUPPORT = void 0;
exports.isRecommendedAgentModel = isRecommendedAgentModel;
exports.modelSupportsNativeTools = modelSupportsNativeTools;
var config_yaml_1 = require("@continuedev/config-yaml");
exports.PROVIDER_TOOL_SUPPORT = {
    "continue-proxy": function (model) {
        try {
            var _a = (0, config_yaml_1.parseProxyModelName)(model), provider = _a.provider, _model = _a.model;
            if (provider && _model && provider !== "continue-proxy") {
                var fn = exports.PROVIDER_TOOL_SUPPORT[provider];
                if (fn) {
                    return fn(_model);
                }
            }
        }
        catch (e) { }
        return [
            "claude-3-5",
            "claude-3.5",
            "claude-3-7",
            "claude-3.7",
            "claude-sonnet-4",
            "claude-4-sonnet",
            "gpt-4",
            "o3",
            "gemini",
            "claude-opus-4",
            "gemma",
        ].some(function (part) { return model.toLowerCase().startsWith(part); });
    },
    anthropic: function (model) {
        if ([
            "claude-3-5",
            "claude-3.5",
            "claude-3-7",
            "claude-3.7",
            "claude-sonnet-4",
            "claude-4-sonnet",
            "claude-opus-4",
        ].some(function (part) { return model.toLowerCase().startsWith(part); })) {
            return true;
        }
        return false;
    },
    azure: function (model) {
        if (model.toLowerCase().startsWith("gpt-4") ||
            model.toLowerCase().startsWith("o3"))
            return true;
        return false;
    },
    openai: function (model) {
        var lower = model.toLowerCase();
        // https://platform.openai.com/docs/guides/function-calling#models-supporting-function-calling
        if (lower.startsWith("gpt-4") ||
            lower.startsWith("gpt-5") ||
            lower.startsWith("o3")) {
            return true;
        }
        // LGAI EXAONE models expose an OpenAI-compatible API with tool
        // calling support when served via frameworks like vLLM
        if (lower.includes("exaone")) {
            return true;
        }
        if (lower.includes("gpt-oss")) {
            return true;
        }
        // https://ai.google.dev/gemma/docs/capabilities/function-calling
        if (lower.startsWith("gemma")) {
            return true;
        }
        // firworks-ai https://docs.fireworks.ai/guides/function-calling
        if (model.startsWith("accounts/fireworks/models/")) {
            switch (model.substring(26)) {
                case "llama-v3p1-405b-instruct":
                case "llama-v3p1-70b-instruct":
                case "qwen2p5-72b-instruct":
                case "firefunction-v1":
                case "firefunction-v2":
                    return true;
                default:
                    return false;
            }
        }
        return false;
    },
    cohere: function (model) {
        return model.toLowerCase().startsWith("command");
    },
    gemini: function (model) {
        // All gemini models support function calling
        return model.toLowerCase().includes("gemini");
    },
    vertexai: function (model) {
        var lowerCaseModel = model.toLowerCase();
        // All gemini models except flash 2.0 lite support function calling
        if (lowerCaseModel.includes("lite")) {
            return false;
        }
        return ["claude", "gemini"].some(function (val) { return lowerCaseModel.includes(val); });
    },
    xAI: function (model) {
        var lowerCaseModel = model.toLowerCase();
        return ["grok-3", "grok-4"].some(function (val) { return lowerCaseModel.includes(val); });
    },
    bedrock: function (model) {
        if ([
            "claude-3-5-sonnet",
            "claude-3.5-sonnet",
            "claude-3-7-sonnet",
            "claude-3.7-sonnet",
            "claude-sonnet-4",
            "claude-4-sonnet",
            "claude-opus-4",
            "nova-lite",
            "nova-pro",
            "nova-micro",
            "nova-premier",
            "gpt-oss",
        ].some(function (part) { return model.toLowerCase().includes(part); })) {
            return true;
        }
        return false;
    },
    mistral: function (model) {
        // https://docs.mistral.ai/capabilities/function_calling/
        return (!model.toLowerCase().includes("mamba") &&
            [
                "devstral",
                "codestral",
                "mistral-large",
                "mistral-small",
                "pixtral",
                "ministral",
                "mistral-nemo",
                "devstral",
            ].some(function (part) { return model.toLowerCase().includes(part); }));
    },
    // https://ollama.com/search?c=tools
    ollama: function (model) {
        var modelName = "";
        // Extract the model name after the last slash to support other registries
        if (model.includes("/")) {
            var parts = model.split("/");
            modelName = parts[parts.length - 1];
        }
        else {
            modelName = model;
        }
        if (["vision", "math", "guard", "mistrallite", "mistral-openorca"].some(function (part) { return modelName.toLowerCase().includes(part); })) {
            return false;
        }
        if ([
            "cogito",
            "llama3.3",
            "qwq",
            "llama3.2",
            "llama3.1",
            "qwen2",
            "qwen3",
            "mixtral",
            "command-r",
            "command-a",
            "smollm2",
            "hermes3",
            "athene-v2",
            "nemotron",
            "llama3-groq",
            "granite3",
            "granite-3",
            "aya-expanse",
            "firefunction-v2",
            "mistral",
            "devstral",
            "exaone",
            "gpt-oss",
        ].some(function (part) { return modelName.toLowerCase().includes(part); })) {
            return true;
        }
        return false;
    },
    sambanova: function (model) {
        // https://docs.sambanova.ai/cloud/docs/capabilities/function-calling
        if (model.toLowerCase().startsWith("meta-llama-3") ||
            model.toLowerCase().includes("llama-4") ||
            model.toLowerCase().includes("deepseek") ||
            model.toLowerCase().includes("gpt") ||
            model.toLowerCase().includes("qwen")) {
            return true;
        }
        return false;
    },
    deepseek: function (model) {
        // https://api-docs.deepseek.com/quick_start/pricing
        // https://api-docs.deepseek.com/guides/function_calling
        if (model === "deepseek-reasoner" || model === "deepseek-chat") {
            return true;
        }
        return false;
    },
    watsonx: function (model) {
        if (model.toLowerCase().includes("guard")) {
            return false;
        }
        if ([
            "llama-3",
            "llama-4",
            "mistral",
            "codestral",
            "granite-3",
            "devstral",
        ].some(function (part) { return model.toLowerCase().includes(part); })) {
            return true;
        }
        return false;
    },
    openrouter: function (model) {
        // https://openrouter.ai/models?fmt=cards&supported_parameters=tools
        // Specific free models that don't support tools
        // Fixes issue #6619 - moonshotai/kimi-k2:free causing 400 errors
        if (model.toLowerCase() === "moonshotai/kimi-k2:free") {
            return false;
        }
        if (["vision", "math", "guard", "mistrallite", "mistral-openorca"].some(function (part) { return model.toLowerCase().includes(part); })) {
            return false;
        }
        var supportedPrefixes = [
            "openai/gpt-3.5",
            "openai/gpt-4",
            "openai/o1",
            "openai/o3",
            "openai/o4",
            "openai/gpt-oss",
            "anthropic/claude-3",
            "anthropic/claude-4",
            "microsoft/phi-3",
            "google/gemini-flash-1.5",
            "google/gemini-2",
            "google/gemini-pro",
            "x-ai/grok",
            "qwen/qwen3",
            "qwen/qwen-",
            "cohere/command-r",
            "cohere/command-a",
            "ai21/jamba-1.6",
            "mistralai/mistral",
            "mistralai/ministral",
            "mistralai/codestral",
            "mistralai/mixtral",
            "mistral/ministral",
            "mistral/devstral",
            "mistralai/pixtral",
            "meta-llama/llama-3.3",
            "amazon/nova",
            "deepseek/deepseek-r1",
            "deepseek/deepseek-chat",
            "meta-llama/llama-4",
            "all-hands/openhands-lm-32b",
            "lgai-exaone/exaone",
        ];
        for (var _i = 0, supportedPrefixes_1 = supportedPrefixes; _i < supportedPrefixes_1.length; _i++) {
            var prefix = supportedPrefixes_1[_i];
            if (model.toLowerCase().startsWith(prefix)) {
                return true;
            }
        }
        var specificModels = [
            "qwen/qwq-32b",
            "qwen/qwen-2.5-72b-instruct",
            "meta-llama/llama-3.2-3b-instruct",
            "meta-llama/llama-3-8b-instruct",
            "meta-llama/llama-3-70b-instruct",
            "arcee-ai/caller-large",
            "nousresearch/hermes-3-llama-3.1-70b",
            "moonshotai/kimi-k2",
        ];
        for (var _a = 0, specificModels_1 = specificModels; _a < specificModels_1.length; _a++) {
            var model_1 = specificModels_1[_a];
            if (model_1.toLowerCase() === model_1) {
                return true;
            }
        }
        var supportedContains = ["llama-3.1"];
        for (var _b = 0, supportedContains_1 = supportedContains; _b < supportedContains_1.length; _b++) {
            var model_2 = supportedContains_1[_b];
            if (model_2.toLowerCase().includes(model_2)) {
                return true;
            }
        }
        return false;
    },
    moonshot: function (model) {
        // support moonshot models
        // https://platform.moonshot.ai/docs/pricing/chat#concepts
        if (model.toLowerCase().startsWith("kimi") &&
            model.toLowerCase() !== "kimi-thinking-preview") {
            return true;
        }
        if (model.toLowerCase().startsWith("moonshot")) {
            return true;
        }
        return false;
    },
    novita: function (model) {
        var lower = model.toLowerCase();
        // Exact match models
        var exactMatches = [
            "deepseek/deepseek-r1-0528",
            "deepseek/deepseek-r1-turbo",
            "deepseek/deepseek-v3-0324",
            "deepseek/deepseek-v3-turbo",
            "meta-llama/llama-3.3-70b-instruct",
            "qwen/qwen-2.5-72b-instruct",
            "zai-org/glm-4.5",
            "moonshotai/kimi-k2-instruct",
        ];
        if (exactMatches.includes(lower)) {
            return true;
        }
        // Prefix match models
        var prefixMatches = ["qwen/qwen3", "openai/gpt-oss"];
        for (var _i = 0, prefixMatches_1 = prefixMatches; _i < prefixMatches_1.length; _i++) {
            var prefix = prefixMatches_1[_i];
            if (lower.startsWith(prefix)) {
                return true;
            }
        }
        return false;
    },
};
function isRecommendedAgentModel(modelName) {
    // AND behavior
    var recs = [
        [/o[134]/],
        [/deepseek/, /r1|reasoner/],
        [/gemini/, /2\.5/, /pro/],
        [/gpt-5/],
        [/claude/, /sonnet/, /3\.7|3-7|-4/],
        [/claude/, /opus/, /-4/],
    ];
    for (var _i = 0, recs_1 = recs; _i < recs_1.length; _i++) {
        var combo = recs_1[_i];
        if (combo.every(function (regex) { return modelName.toLowerCase().match(regex); })) {
            return true;
        }
    }
    return false;
}
function modelSupportsNativeTools(modelDescription) {
    var _a, _b;
    if (((_a = modelDescription.capabilities) === null || _a === void 0 ? void 0 : _a.tools) !== undefined) {
        return modelDescription.capabilities.tools;
    }
    var providerSupport = exports.PROVIDER_TOOL_SUPPORT[modelDescription.provider];
    if (!providerSupport) {
        return false;
    }
    return (_b = providerSupport(modelDescription.model)) !== null && _b !== void 0 ? _b : false;
}
