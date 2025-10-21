"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toChatMessage = toChatMessage;
exports.toChatBody = toChatBody;
exports.toCompleteBody = toCompleteBody;
exports.toFimBody = toFimBody;
exports.fromChatResponse = fromChatResponse;
exports.fromChatCompletionChunk = fromChatCompletionChunk;
function toChatMessage(message) {
    var _a;
    if (message.role === "tool") {
        return {
            role: "tool",
            content: message.content,
            tool_call_id: message.toolCallId,
        };
    }
    if (message.role === "system") {
        return {
            role: "system",
            content: message.content,
        };
    }
    if (message.role === "assistant") {
        var msg = {
            role: "assistant",
            content: typeof message.content === "string"
                ? message.content || " " // LM Studio (and other providers) don't accept empty content
                : message.content
                    .filter(function (part) { return part.type === "text"; })
                    .map(function (part) { return part; }), // can remove with newer typescript version
        };
        if (message.toolCalls) {
            msg.tool_calls = message.toolCalls.map(function (toolCall) {
                var _a, _b;
                return ({
                    id: toolCall.id,
                    type: toolCall.type,
                    function: {
                        name: (_a = toolCall.function) === null || _a === void 0 ? void 0 : _a.name,
                        arguments: ((_b = toolCall.function) === null || _b === void 0 ? void 0 : _b.arguments) || "{}",
                    },
                });
            });
        }
        return msg;
    }
    else {
        if (typeof message.content === "string") {
            return {
                role: "user",
                content: (_a = message.content) !== null && _a !== void 0 ? _a : " ", // LM Studio (and other providers) don't accept empty content
            };
        }
        // If no multi-media is in the message, just send as text
        // for compatibility with OpenAI-"compatible" servers
        // that don't support multi-media format
        return {
            role: "user",
            content: !message.content.some(function (item) { return item.type !== "text"; })
                ? message.content
                    .map(function (item) { return item.text; })
                    .join("") || " "
                : message.content.map(function (part) {
                    if (part.type === "imageUrl") {
                        return {
                            type: "image_url",
                            image_url: {
                                url: part.imageUrl.url,
                                detail: "auto",
                            },
                        };
                    }
                    return part;
                }),
        };
    }
}
function toChatBody(messages, options) {
    var _a, _b;
    var params = {
        messages: messages.map(toChatMessage),
        model: options.model,
        max_tokens: options.maxTokens,
        temperature: options.temperature,
        top_p: options.topP,
        frequency_penalty: options.frequencyPenalty,
        presence_penalty: options.presencePenalty,
        stream: (_a = options.stream) !== null && _a !== void 0 ? _a : true,
        stop: options.stop,
        prediction: options.prediction,
        tool_choice: options.toolChoice,
    };
    if ((_b = options.tools) === null || _b === void 0 ? void 0 : _b.length) {
        params.tools = options.tools
            .filter(function (tool) { return !tool.type || tool.type === "function"; })
            .map(function (tool) { return ({
            type: tool.type,
            function: {
                name: tool.function.name,
                description: tool.function.description,
                parameters: tool.function.parameters,
                strict: tool.function.strict,
            },
        }); });
    }
    return params;
}
function toCompleteBody(prompt, options) {
    var _a;
    return {
        prompt: prompt,
        model: options.model,
        max_tokens: options.maxTokens,
        temperature: options.temperature,
        top_p: options.topP,
        frequency_penalty: options.frequencyPenalty,
        presence_penalty: options.presencePenalty,
        stream: (_a = options.stream) !== null && _a !== void 0 ? _a : true,
        stop: options.stop,
    };
}
function toFimBody(prefix, suffix, options) {
    return {
        model: options.model,
        prompt: prefix,
        suffix: suffix,
        max_tokens: options.maxTokens,
        temperature: options.temperature,
        top_p: options.topP,
        frequency_penalty: options.frequencyPenalty,
        presence_penalty: options.presencePenalty,
        stop: options.stop,
        stream: true,
    };
}
function fromChatResponse(response) {
    var _a, _b, _c;
    var message = response.choices[0].message;
    var toolCall = (_a = message.tool_calls) === null || _a === void 0 ? void 0 : _a[0];
    if (toolCall) {
        return {
            role: "assistant",
            content: "",
            toolCalls: (_b = message.tool_calls) === null || _b === void 0 ? void 0 : _b.filter(function (tc) { return !tc.type || tc.type === "function"; }).map(function (tc) {
                var _a, _b;
                return ({
                    id: tc.id,
                    type: "function",
                    function: {
                        name: (_a = tc.function) === null || _a === void 0 ? void 0 : _a.name,
                        arguments: (_b = tc.function) === null || _b === void 0 ? void 0 : _b.arguments,
                    },
                });
            }),
        };
    }
    return {
        role: "assistant",
        content: (_c = message.content) !== null && _c !== void 0 ? _c : "",
    };
}
function fromChatCompletionChunk(chunk) {
    var _a, _b;
    var delta = (_b = (_a = chunk.choices) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.delta;
    if (delta === null || delta === void 0 ? void 0 : delta.content) {
        return {
            role: "assistant",
            content: delta.content,
        };
    }
    else if (delta === null || delta === void 0 ? void 0 : delta.tool_calls) {
        var toolCalls = delta === null || delta === void 0 ? void 0 : delta.tool_calls.filter(function (tool_call) { return !tool_call.type || tool_call.type === "function"; }).map(function (tool_call) {
            var _a, _b;
            return ({
                id: tool_call.id,
                type: "function",
                function: {
                    name: (_a = tool_call.function) === null || _a === void 0 ? void 0 : _a.name,
                    arguments: (_b = tool_call.function) === null || _b === void 0 ? void 0 : _b.arguments,
                },
            });
        });
        if (toolCalls.length > 0) {
            return {
                role: "assistant",
                content: "",
                toolCalls: toolCalls,
            };
        }
    }
    return undefined;
}
