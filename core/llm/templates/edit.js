"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zephyrEditPrompt = exports.xWinCoderEditPrompt = exports.simplifiedEditPrompt = exports.simplestEditPrompt = exports.phindEditPrompt = exports.osModelsEditPrompt = exports.openchatEditPrompt = exports.neuralChatEditPrompt = exports.mistralEditPrompt = exports.llama3EditPrompt = exports.gptEditPrompt = exports.gemmaEditPrompt = exports.deepseekEditPrompt = exports.codellamaInfillEditPrompt = exports.codeLlama70bEditPrompt = exports.claudeEditPrompt = exports.alpacaEditPrompt = void 0;
var gpt_js_1 = require("./edit/gpt.js");
Object.defineProperty(exports, "gptEditPrompt", { enumerable: true, get: function () { return gpt_js_1.gptEditPrompt; } });
var simplifiedEditPrompt = "Consider the following code:\n```{{{language}}}\n{{{codeToEdit}}}\n```\nEdit the code to perfectly satisfy the following user request:\n{{{userInput}}}\nOutput nothing except for the code. No code block, no English explanation, no start/end tags.";
exports.simplifiedEditPrompt = simplifiedEditPrompt;
var simplestEditPrompt = "Here is the code before editing:\n```{{{language}}}\n{{{codeToEdit}}}\n```\n\nHere is the edit requested:\n\"{{{userInput}}}\"\n\nHere is the code after editing:";
exports.simplestEditPrompt = simplestEditPrompt;
var codellamaInfillEditPrompt = "{{filePrefix}}<FILL>{{fileSuffix}}";
exports.codellamaInfillEditPrompt = codellamaInfillEditPrompt;
var START_TAG = "<START EDITING HERE>";
var osModelsEditPrompt = function (history, otherData) {
    var _a, _b, _c, _d, _e, _f;
    // "No sufix" means either there is no suffix OR
    // it's a clean break at end of function or something
    // (what we're trying to avoid is just the language model trying to complete the closing brackets of a function or something)
    var firstCharOfFirstLine = (_c = (_b = (_a = otherData.suffix) === null || _a === void 0 ? void 0 : _a.split("\n")[0]) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.trim();
    var isSuffix = ((_d = otherData.suffix) === null || _d === void 0 ? void 0 : _d.trim()) !== "" &&
        // First character of first line is whitespace
        // Otherwise we assume it's a clean break
        !firstCharOfFirstLine;
    var suffixTag = isSuffix ? "<STOP EDITING HERE>" : "";
    var suffixExplanation = isSuffix
        ? ' When you get to "<STOP EDITING HERE>", end your response.'
        : "";
    // If neither prefilling nor /v1/completions are supported, we have to use a chat prompt without putting words in the model's mouth
    if (otherData.supportsCompletions !== "true" &&
        otherData.supportsPrefill !== "true") {
        return (0, gpt_js_1.gptEditPrompt)(history, otherData);
    }
    // Use a different prompt when there's neither prefix nor suffix
    if (((_e = otherData.prefix) === null || _e === void 0 ? void 0 : _e.trim()) === "" && ((_f = otherData.suffix) === null || _f === void 0 ? void 0 : _f.trim()) === "") {
        return [
            {
                role: "user",
                content: "```".concat(otherData.language, "\n").concat(otherData.codeToEdit, "\n").concat(suffixTag, "\n```\n\nPlease rewrite the entire code block above in order to satisfy the following request: \"").concat(otherData.userInput, "\". You should rewrite the entire code block without leaving placeholders, even if the code is the same as before.").concat(suffixExplanation),
            },
            {
                role: "assistant",
                content: "Sure! Here's the entire rewritten code block:\n```".concat(otherData.language, "\n"),
            },
        ];
    }
    return [
        {
            role: "user",
            content: "```".concat(otherData.language, "\n").concat(otherData.prefix).concat(START_TAG, "\n").concat(otherData.codeToEdit, "\n").concat(suffixTag, "\n```\n\nPlease rewrite the entire code block above, editing the portion below \"").concat(START_TAG, "\" in order to satisfy the following request: \"").concat(otherData.userInput, "\". You should rewrite the entire code block without leaving placeholders, even if the code is the same as before.").concat(suffixExplanation, "\n"),
        },
        {
            role: "assistant",
            content: "Sure! Here's the entire code block, including the rewritten portion:\n```".concat(otherData.language, "\n").concat(otherData.prefix).concat(START_TAG, "\n"),
        },
    ];
};
exports.osModelsEditPrompt = osModelsEditPrompt;
var mistralEditPrompt = "[INST] You are a helpful code assistant. Your task is to rewrite the following code with these instructions: \"{{{userInput}}}\"\n```{{{language}}}\n{{{codeToEdit}}}\n```\n\nJust rewrite the code without explanations: [/INST]\n```{{{language}}}";
exports.mistralEditPrompt = mistralEditPrompt;
var alpacaEditPrompt = "Below is an instruction that describes a task, paired with an input that provides further context. Write a response that appropriately completes the request.\n\n### Instruction: Rewrite the code to satisfy this request: \"{{{userInput}}}\"\n\n### Input:\n\n```{{{language}}}\n{{{codeToEdit}}}\n```\n\n### Response:\n\nSure! Here's the code you requested:\n```{{{language}}}\n";
exports.alpacaEditPrompt = alpacaEditPrompt;
var phindEditPrompt = "### System Prompt\nYou are an expert programmer and write code on the first attempt without any errors or fillers.\n\n### User Message:\nRewrite the code to satisfy this request: \"{{{userInput}}}\"\n\n```{{{language}}}\n{{{codeToEdit}}}\n```\n\n### Assistant:\nSure! Here's the code you requested:\n\n```{{{language}}}\n";
exports.phindEditPrompt = phindEditPrompt;
var deepseekEditPrompt = "### System Prompt\nYou are an AI programming assistant, utilizing the DeepSeek Coder model, developed by DeepSeek Company, and your  role is to assist with questions related to computer science. For politically sensitive questions, security and privacy issues, and other non-computer science questions, you will not answer.\n### Instruction:\nRewrite the code to satisfy this request: \"{{{userInput}}}\"\n\n```{{{language}}}\n{{{codeToEdit}}}\n```<|EOT|>\n### Response:\nSure! Here's the code you requested:\n\n```{{{language}}}\n";
exports.deepseekEditPrompt = deepseekEditPrompt;
var zephyrEditPrompt = "<|system|>\nYou are an expert programmer and write code on the first attempt without any errors or fillers.</s>\n<|user|>\nRewrite the code to satisfy this request: \"{{{userInput}}}\"\n\n```{{{language}}}\n{{{codeToEdit}}}\n```</s>\n<|assistant|>\nSure! Here's the code you requested:\n\n```{{{language}}}\n";
exports.zephyrEditPrompt = zephyrEditPrompt;
var openchatEditPrompt = "GPT4 Correct User: You are an expert programmer and personal assistant. You are asked to rewrite the following code in order to {{{userInput}}}.\n```{{{language}}}\n{{{codeToEdit}}}\n```\nPlease only respond with code and put it inside of a markdown code block. Do not give any explanation, but your code should perfectly satisfy the user request.<|end_of_turn|>GPT4 Correct Assistant: Sure thing! Here is the rewritten code that you requested:\n```{{{language}}}\n";
exports.openchatEditPrompt = openchatEditPrompt;
var xWinCoderEditPrompt = "<system>: You are an AI coding agent that helps people with programming. Write a response that appropriately completes the user's request.\n<user>: Please rewrite the following code with these instructions: \"{{{userInput}}}\"\n```{{{language}}}\n{{{codeToEdit}}}\n```\n\nJust rewrite the code without explanations:\n<AI>:\n```{{{language}}}";
exports.xWinCoderEditPrompt = xWinCoderEditPrompt;
var neuralChatEditPrompt = "### System:\nYou are an expert programmer and write code on the first attempt without any errors or fillers.\n### User:\nRewrite the code to satisfy this request: \"{{{userInput}}}\"\n\n```{{{language}}}\n{{{codeToEdit}}}\n```\n### Assistant:\nSure! Here's the code you requested:\n\n```{{{language}}}\n";
exports.neuralChatEditPrompt = neuralChatEditPrompt;
var codeLlama70bEditPrompt = "<s>Source: system\n\n You are an expert programmer and write code on the first attempt without any errors or fillers. <step> Source: user\n\n Rewrite the code to satisfy this request: \"{{{userInput}}}\"\n\n```{{{language}}}\n{{{codeToEdit}}}\n``` <step> Source: assistant\nDestination: user\n\n ";
exports.codeLlama70bEditPrompt = codeLlama70bEditPrompt;
var claudeEditPrompt = function (history, otherData) { return [
    {
        role: "user",
        content: "```".concat(otherData.language, "\n").concat(otherData.codeToEdit, "\n```\n\nYou are an expert programmer. You will rewrite the above code to do the following:\n\n").concat(otherData.userInput, "\n\nOutput only a code block with the rewritten code:\n"),
    },
    {
        role: "assistant",
        content: "Sure! Here is the rewritten code:\n```".concat(otherData.language),
    },
]; };
exports.claudeEditPrompt = claudeEditPrompt;
var llama3EditPrompt = "<|begin_of_text|><|start_header_id|>user<|end_header_id|>\n```{{{language}}}\n{{{codeToEdit}}}\n```\n\nRewrite the above code to satisfy this request: \"{{{userInput}}}\"<|eot_id|><|start_header_id|>assistant<|end_header_id|>\nSure! Here's the code you requested:\n```{{{language}}}";
exports.llama3EditPrompt = llama3EditPrompt;
var gemmaEditPrompt = "<start_of_turn>user\nYou are an expert programmer and write code on the first attempt without any errors or fillers. Rewrite the code to satisfy this request: \"{{{userInput}}}\"\n\n```{{{language}}}\n{{{codeToEdit}}}\n```<end_of_turn>\n<start_of_turn>model\nSure! Here's the code you requested:\n\n```{{{language}}}\n";
exports.gemmaEditPrompt = gemmaEditPrompt;
