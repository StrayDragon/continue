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
exports.allLlms = exports.allModelProviders = void 0;
exports.findLlmInfo = findLlmInfo;
exports.getAllRecommendedFor = getAllRecommendedFor;
var anthropic_js_1 = require("./providers/anthropic.js");
var azure_js_1 = require("./providers/azure.js");
var bedrock_js_1 = require("./providers/bedrock.js");
var cohere_js_1 = require("./providers/cohere.js");
var cometapi_js_1 = require("./providers/cometapi.js");
var gemini_js_1 = require("./providers/gemini.js");
var mistral_js_1 = require("./providers/mistral.js");
var ollama_js_1 = require("./providers/ollama.js");
var openai_js_1 = require("./providers/openai.js");
var vllm_js_1 = require("./providers/vllm.js");
var voyage_js_1 = require("./providers/voyage.js");
var xAI_js_1 = require("./providers/xAI.js");
exports.allModelProviders = [
    openai_js_1.OpenAi,
    gemini_js_1.Gemini,
    anthropic_js_1.Anthropic,
    mistral_js_1.Mistral,
    voyage_js_1.Voyage,
    azure_js_1.Azure,
    ollama_js_1.Ollama,
    vllm_js_1.Vllm,
    bedrock_js_1.Bedrock,
    cohere_js_1.Cohere,
    cometapi_js_1.CometAPI,
    xAI_js_1.xAI,
];
exports.allLlms = exports.allModelProviders.flatMap(function (provider) {
    return provider.models.map(function (model) { return (__assign(__assign({}, model), { provider: provider.id })); });
});
function findLlmInfo(model, preferProviderId) {
    if (preferProviderId) {
        var provider = exports.allModelProviders.find(function (p) { return p.id === preferProviderId; });
        var info = provider === null || provider === void 0 ? void 0 : provider.models.find(function (llm) {
            return llm.regex ? llm.regex.test(model) : llm.model === model;
        });
        if (info) {
            return __assign(__assign({}, info), { provider: preferProviderId });
        }
    }
    return exports.allLlms.find(function (llm) {
        return llm.regex ? llm.regex.test(model) : llm.model === model;
    });
}
function getAllRecommendedFor(useCase) {
    return exports.allLlms.filter(function (llm) { var _a; return (_a = llm.recommendedFor) === null || _a === void 0 ? void 0 : _a.includes(useCase); });
}
