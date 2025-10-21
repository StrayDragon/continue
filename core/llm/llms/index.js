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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LLMClasses = void 0;
exports.llmFromDescription = llmFromDescription;
exports.llmFromProviderAndOptions = llmFromProviderAndOptions;
var handlebars_1 = require("handlebars");
var renderTemplatedString_1 = require("../../util/handlebars/renderTemplatedString");
var Anthropic_1 = require("./Anthropic");
var Asksage_1 = require("./Asksage");
var Azure_1 = require("./Azure");
var Bedrock_1 = require("./Bedrock");
var BedrockImport_1 = require("./BedrockImport");
var Cerebras_1 = require("./Cerebras");
var Cloudflare_1 = require("./Cloudflare");
var Cohere_1 = require("./Cohere");
var CometAPI_1 = require("./CometAPI");
var DeepInfra_1 = require("./DeepInfra");
var Deepseek_1 = require("./Deepseek");
var Docker_1 = require("./Docker");
var Fireworks_1 = require("./Fireworks");
var Flowise_1 = require("./Flowise");
var FunctionNetwork_1 = require("./FunctionNetwork");
var Gemini_1 = require("./Gemini");
var Groq_1 = require("./Groq");
var HuggingFaceInferenceAPI_1 = require("./HuggingFaceInferenceAPI");
var HuggingFaceTEI_1 = require("./HuggingFaceTEI");
var HuggingFaceTGI_1 = require("./HuggingFaceTGI");
var Inception_1 = require("./Inception");
var Kindo_1 = require("./Kindo");
var LlamaCpp_1 = require("./LlamaCpp");
var Llamafile_1 = require("./Llamafile");
var LlamaStack_1 = require("./LlamaStack");
var Lemonade_1 = require("./Lemonade");
var LMStudio_1 = require("./LMStudio");
var Mistral_1 = require("./Mistral");
var Mock_1 = require("./Mock");
var Moonshot_1 = require("./Moonshot");
var Msty_1 = require("./Msty");
var NCompass_1 = require("./NCompass");
var Nebius_1 = require("./Nebius");
var Novita_1 = require("./Novita");
var Nvidia_1 = require("./Nvidia");
var Ollama_1 = require("./Ollama");
var OpenAI_1 = require("./OpenAI");
var OpenRouter_1 = require("./OpenRouter");
var OVHcloud_1 = require("./OVHcloud");
var Relace_1 = require("./Relace");
var Replicate_1 = require("./Replicate");
var SageMaker_1 = require("./SageMaker");
var SambaNova_1 = require("./SambaNova");
var Scaleway_1 = require("./Scaleway");
var SiliconFlow_1 = require("./SiliconFlow");
var ContinueProxy_1 = require("./stubs/ContinueProxy");
var TARS_1 = require("./TARS");
var Test_1 = require("./Test");
var TextGenWebUI_1 = require("./TextGenWebUI");
var Together_1 = require("./Together");
var Venice_1 = require("./Venice");
var VertexAI_1 = require("./VertexAI");
var Vllm_1 = require("./Vllm");
var Voyage_1 = require("./Voyage");
var WatsonX_1 = require("./WatsonX");
var xAI_1 = require("./xAI");
exports.LLMClasses = [
    Anthropic_1.default,
    Cohere_1.default,
    CometAPI_1.default,
    FunctionNetwork_1.default,
    Gemini_1.default,
    Llamafile_1.default,
    Moonshot_1.default,
    Ollama_1.default,
    Replicate_1.default,
    TextGenWebUI_1.default,
    Together_1.default,
    Novita_1.default,
    HuggingFaceTGI_1.default,
    HuggingFaceTEI_1.default,
    HuggingFaceInferenceAPI_1.default,
    Kindo_1.default,
    LlamaCpp_1.default,
    OpenAI_1.default,
    OVHcloud_1.default,
    Lemonade_1.default,
    LMStudio_1.default,
    Mistral_1.default,
    Bedrock_1.default,
    BedrockImport_1.default,
    SageMaker_1.default,
    DeepInfra_1.default,
    Flowise_1.default,
    Groq_1.default,
    Fireworks_1.default,
    NCompass_1.default,
    ContinueProxy_1.default,
    Cloudflare_1.default,
    Deepseek_1.default,
    Docker_1.default,
    Msty_1.default,
    Azure_1.default,
    WatsonX_1.default,
    OpenRouter_1.default,
    Nvidia_1.default,
    Vllm_1.default,
    SambaNova_1.default,
    Mock_1.default,
    Test_1.default,
    Cerebras_1.default,
    Asksage_1.default,
    Nebius_1.default,
    Venice_1.default,
    VertexAI_1.default,
    xAI_1.default,
    SiliconFlow_1.default,
    Scaleway_1.default,
    Relace_1.Relace,
    Inception_1.default,
    Voyage_1.default,
    LlamaStack_1.default,
    TARS_1.default,
];
function llmFromDescription(desc, readFile, getUriFromPath, uniqueId, ideSettings, llmLogger, completionOptions) {
    return __awaiter(this, void 0, void 0, function () {
        var cls, finalCompletionOptions, baseChatSystemMessage, options;
        var _a, _b, _c, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    cls = exports.LLMClasses.find(function (llm) { return llm.providerName === desc.provider; });
                    if (!cls) {
                        return [2 /*return*/, undefined];
                    }
                    finalCompletionOptions = __assign(__assign({}, completionOptions), desc.completionOptions);
                    baseChatSystemMessage = undefined;
                    if (!(desc.systemMessage !== undefined)) return [3 /*break*/, 2];
                    return [4 /*yield*/, (0, renderTemplatedString_1.renderTemplatedString)(handlebars_1.default, desc.systemMessage, {}, [], readFile, getUriFromPath)];
                case 1:
                    // baseChatSystemMessage = DEFAULT_CHAT_SYSTEM_MESSAGE;
                    // baseChatSystemMessage += "\n\n";
                    baseChatSystemMessage = _f.sent();
                    _f.label = 2;
                case 2:
                    options = __assign(__assign({}, desc), { completionOptions: __assign(__assign({}, finalCompletionOptions), { model: (_b = (desc.model || ((_a = cls.defaultOptions) === null || _a === void 0 ? void 0 : _a.model))) !== null && _b !== void 0 ? _b : "codellama-7b", maxTokens: (_c = finalCompletionOptions.maxTokens) !== null && _c !== void 0 ? _c : (_e = (_d = cls.defaultOptions) === null || _d === void 0 ? void 0 : _d.completionOptions) === null || _e === void 0 ? void 0 : _e.maxTokens }), baseChatSystemMessage: baseChatSystemMessage, basePlanSystemMessage: baseChatSystemMessage, baseAgentSystemMessage: baseChatSystemMessage, logger: llmLogger, uniqueId: uniqueId });
                    if (desc.provider === "continue-proxy") {
                        options.apiKey = ideSettings.userToken;
                        if (ideSettings.remoteConfigServerUrl) {
                            options.apiBase = new URL("/proxy/v1", ideSettings.remoteConfigServerUrl).toString();
                        }
                    }
                    return [2 /*return*/, new cls(options)];
            }
        });
    });
}
function llmFromProviderAndOptions(providerName, llmOptions) {
    var cls = exports.LLMClasses.find(function (llm) { return llm.providerName === providerName; });
    if (!cls) {
        throw new Error("Unknown LLM provider type \"".concat(providerName, "\""));
    }
    return new cls(llmOptions);
}
