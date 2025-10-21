"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zephyrTemplateMessages = exports.xWinCoderTemplateMessages = exports.templateAlpacaMessages = exports.phindTemplateMessages = exports.phi2TemplateMessages = exports.openchatTemplateMessages = exports.neuralChatTemplateMessages = exports.llavaTemplateMessages = exports.llama3TemplateMessages = exports.graniteTemplateMessages = exports.gemmaTemplateMessage = exports.chatmlTemplateMessages = void 0;
exports.anthropicTemplateMessages = anthropicTemplateMessages;
exports.codeLlama70bTemplateMessages = codeLlama70bTemplateMessages;
exports.deepseekTemplateMessages = deepseekTemplateMessages;
exports.llama2TemplateMessages = llama2TemplateMessages;
exports.codestralTemplateMessages = codestralTemplateMessages;
var messageContent_js_1 = require("../../util/messageContent.js");
function templateFactory(systemMessage, userPrompt, assistantPrompt, separator, prefix, emptySystemMessage) {
    return function (msgs) {
        var prompt = prefix !== null && prefix !== void 0 ? prefix : "";
        // Skip assistant messages at the beginning
        while (msgs.length > 0 && msgs[0].role === "assistant") {
            msgs.shift();
        }
        if (msgs.length > 0 && msgs[0].role === "system") {
            prompt += systemMessage(msgs.shift());
        }
        else if (emptySystemMessage) {
            prompt += emptySystemMessage;
        }
        for (var i = 0; i < msgs.length; i++) {
            var msg = msgs[i];
            prompt += msg.role === "user" ? userPrompt : assistantPrompt;
            prompt += msg.content;
            if (i < msgs.length - 1) {
                prompt += separator;
            }
        }
        if (msgs.length > 0 && msgs[msgs.length - 1].role === "user") {
            prompt += separator;
            prompt += assistantPrompt;
        }
        return prompt;
    };
}
/**
 * @description Template for LLAMA2 messages:
 *
 * <s>[INST] <<SYS>>
 * {{ system_prompt }}
 * <</SYS>>
 *
 * {{ user_msg_1 }} [/INST] {{ model_answer_1 }} </s><s>[INST] {{ user_msg_2 }} [/INST] {{ model_answer_2 }} </s><s>[INST] {{ user_msg_3 }} [/INST]
 */
function llama2TemplateMessages(msgs) {
    if (msgs.length === 0) {
        return "";
    }
    if (msgs[0].role === "assistant") {
        // These models aren't trained to handle assistant message coming first,
        // and typically these are just introduction messages from Continue
        msgs.shift();
    }
    var prompt = "";
    var hasSystem = msgs[0].role === "system";
    if (hasSystem && (0, messageContent_js_1.renderChatMessage)(msgs[0]).trim() === "") {
        hasSystem = false;
        msgs = msgs.slice(1);
    }
    if (hasSystem) {
        var systemMessage = "<<SYS>>\n ".concat(msgs[0].content, "\n<</SYS>>\n\n");
        if (msgs.length > 1) {
            prompt += "<s>[INST] ".concat(systemMessage, " ").concat(msgs[1].content, " [/INST]");
        }
        else {
            prompt += "[INST] ".concat(systemMessage, " [/INST]");
            return prompt;
        }
    }
    for (var i = hasSystem ? 2 : 0; i < msgs.length; i++) {
        if (msgs[i].role === "user") {
            prompt += "[INST] ".concat(msgs[i].content, " [/INST]");
        }
        else {
            prompt += msgs[i].content;
            if (i < msgs.length - 1) {
                prompt += "</s>\n<s>";
            }
        }
    }
    return prompt;
}
// Llama2 template with added \n to prevent Codestral from continuing user message
function codestralTemplateMessages(msgs) {
    var template = llama2TemplateMessages(msgs);
    if (template.length === 0) {
        return template;
    }
    return template + "\n";
}
function anthropicTemplateMessages(messages) {
    var HUMAN_PROMPT = "\n\nHuman:";
    var AI_PROMPT = "\n\nAssistant:";
    var prompt = "";
    // Anthropic prompt must start with a Human turn
    if (messages.length > 0 &&
        messages[0].role !== "user" &&
        messages[0].role !== "system") {
        prompt += "".concat(HUMAN_PROMPT, " Hello.");
    }
    for (var _i = 0, messages_1 = messages; _i < messages_1.length; _i++) {
        var msg = messages_1[_i];
        prompt += "".concat(msg.role === "user" || msg.role === "system" ? HUMAN_PROMPT : AI_PROMPT, " ").concat(msg.content, " ");
    }
    prompt += AI_PROMPT;
    return prompt;
}
"A chat between a curious user and an artificial intelligence assistant. The assistant gives helpful, detailed, and polite answers to the user's questions.\nUSER: <image>{prompt}\nASSISTANT:";
var llavaTemplateMessages = templateFactory(function () { return ""; }, "USER: <image>", "ASSISTANT: ", "\n", "A chat between a curious user and an artificial intelligence assistant. The assistant gives helpful, detailed, and polite answers to the user's questions.");
exports.llavaTemplateMessages = llavaTemplateMessages;
var zephyrTemplateMessages = templateFactory(function (msg) { return "<|system|>".concat(msg.content, "</s>\n"); }, "<|user|>\n", "<|assistant|>\n", "</s>\n", undefined, "<|system|> </s>\n");
exports.zephyrTemplateMessages = zephyrTemplateMessages;
var chatmlTemplateMessages = templateFactory(function (msg) { return "<|im_start|>".concat(msg.role, "\n").concat(msg.content, "<|im_end|>\n"); }, "<|im_start|>user\n", "<|im_start|>assistant\n", "<|im_end|>\n");
exports.chatmlTemplateMessages = chatmlTemplateMessages;
var templateAlpacaMessages = templateFactory(function (msg) { return "".concat(msg.content, "\n\n"); }, "### Instruction:\n", "### Response:\n", "\n\n", undefined, "Below is an instruction that describes a task. Write a response that appropriately completes the request.\n\n");
exports.templateAlpacaMessages = templateAlpacaMessages;
function deepseekTemplateMessages(msgs) {
    var prompt = "";
    var system = null;
    prompt +=
        "You are an AI programming assistant, utilizing the DeepSeek Coder model, developed by DeepSeek Company, and your  role is to assist with questions related to computer science. For politically sensitive questions, security and privacy issues, and other non-computer science questions, you will not answer.\n";
    if (msgs[0].role === "system") {
        system = (0, messageContent_js_1.renderChatMessage)(msgs.shift());
    }
    for (var i = 0; i < msgs.length; i++) {
        var msg = msgs[i];
        prompt += msg.role === "user" ? "### Instruction:\n" : "### Response:\n";
        if (system && msg.role === "user" && i === msgs.length - 1) {
            prompt += "".concat(system, "\n");
        }
        prompt += "".concat(msg.content);
        if (i < msgs.length - 1) {
            prompt += msg.role === "user" ? "\n" : "<|EOT|>\n";
        }
    }
    if (msgs.length > 0 && msgs[msgs.length - 1].role === "user") {
        prompt += "\n";
        prompt += "### Response:\n";
    }
    return prompt;
}
// See https://huggingface.co/microsoft/phi-2#qa-format
var phi2TemplateMessages = templateFactory(function (msg) { return "\n\nInstruct: ".concat(msg.content, " "); }, "\n\nInstruct: ", "\n\nOutput: ", " ");
exports.phi2TemplateMessages = phi2TemplateMessages;
var phindTemplateMessages = templateFactory(function (msg) { return "### System Prompt\n".concat(msg.content, "\n\n"); }, "### User Message\n", "### Assistant\n", "\n");
exports.phindTemplateMessages = phindTemplateMessages;
/**
 * OpenChat Template, used by CodeNinja
 * GPT4 Correct User: Hello<|end_of_turn|>GPT4 Correct Assistant: Hi<|end_of_turn|>GPT4 Correct User: How are you today?<|end_of_turn|>GPT4 Correct Assistant:
 */
var openchatTemplateMessages = templateFactory(function () { return ""; }, "GPT4 Correct User: ", "GPT4 Correct Assistant: ", "<|end_of_turn|>");
exports.openchatTemplateMessages = openchatTemplateMessages;
/**
 * Chat template used by https://huggingface.co/TheBloke/XwinCoder-13B-GPTQ
 *

<system>: You are an AI coding assistant that helps people with programming. Write a response that appropriately completes the user's request.
<user>: {prompt}
<AI>:
 */
var xWinCoderTemplateMessages = templateFactory(function (msg) { return "<system>: ".concat(msg.content); }, "\n<user>: ", "\n<AI>: ", "", undefined, "<system>: You are an AI coding assistant that helps people with programming. Write a response that appropriately completes the user's request.");
exports.xWinCoderTemplateMessages = xWinCoderTemplateMessages;
/**
 * NeuralChat Template
 * ### System:\n{system_input}\n### User:\n{user_input}\n### Assistant:\n
 */
var neuralChatTemplateMessages = templateFactory(function (msg) { return "### System:\n".concat(msg.content, "\n"); }, "### User:\n", "### Assistant:\n", "\n");
exports.neuralChatTemplateMessages = neuralChatTemplateMessages;
/**
'<s>Source: system\n\n System prompt <step> Source: user\n\n First user query <step> Source: assistant\n\n Model response to first query <step> Source: user\n\n Second user query <step> Source: assistant\nDestination: user\n\n '
 */
function codeLlama70bTemplateMessages(msgs) {
    var prompt = "<s>";
    for (var _i = 0, msgs_1 = msgs; _i < msgs_1.length; _i++) {
        var msg = msgs_1[_i];
        prompt += "Source: ".concat(msg.role, "\n\n ").concat((0, messageContent_js_1.renderChatMessage)(msg).trim());
        prompt += " <step> ";
    }
    prompt += "Source: assistant\nDestination: user\n\n";
    return prompt;
}
var llama3TemplateMessages = templateFactory(function (msg) {
    return "<|begin_of_text|><|start_header_id|>".concat(msg.role, "<|end_header_id|>\n").concat(msg.content, "<|eot_id|>\n");
}, "<|start_header_id|>user<|end_header_id|>\n", "<|start_header_id|>assistant<|end_header_id|>\n", "<|eot_id|>");
exports.llama3TemplateMessages = llama3TemplateMessages;
/**
 <start_of_turn>user
 What is Cramer's Rule?<end_of_turn>
 <start_of_turn>model
 */
var gemmaTemplateMessage = templateFactory(function () { return ""; }, "<start_of_turn>user\n", "<start_of_turn>model\n", "<end_of_turn>\n");
exports.gemmaTemplateMessage = gemmaTemplateMessage;
var graniteTemplateMessages = templateFactory(function (msg) { return (!!msg ? "\n\nSystem:\n ".concat(msg.content, "\n\n") : ""); }, "Question:\n", "Answer:\n", "\n\n", "", "");
exports.graniteTemplateMessages = graniteTemplateMessages;
