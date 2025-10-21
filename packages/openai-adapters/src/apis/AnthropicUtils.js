"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnthropicErrorMessage = getAnthropicErrorMessage;
exports.getAnthropicHeaders = getAnthropicHeaders;
exports.addCacheControlToLastTwoUserMessages = addCacheControlToLastTwoUserMessages;
exports.openAiToolChoiceToAnthropicToolChoice = openAiToolChoiceToAnthropicToolChoice;
exports.openaiToolToAnthropicTool = openaiToolToAnthropicTool;
exports.getAnthropicMediaTypeFromDataUrl = getAnthropicMediaTypeFromDataUrl;
function getAnthropicErrorMessage(response) {
    switch (response.error.type) {
        case "api_error":
            return "An unexpected error has occurred internal to Anthropic's systems.";
        case "invalid_request_error":
            return "There was an issue with the format or content of your request.";
        case "authentication_error":
            return "There's an issue with your API key.";
        case "permission_error":
            return "Your API key does not have permission to use the specified resource.";
        case "not_found_error":
            return "The requested resource was not found.";
        case "rate_limit_error":
            return "Your account has hit a rate limit.";
        case "overloaded_error":
            return "Anthropic's API is temporarily overloaded. Please check their status page: https://status.anthropic.com/#past-incidents";
        case "timeout_error":
            return "Anthropic API timed out. Please check their status page: https://status.anthropic.com/#past-incidents";
        case "billing_error":
        default:
            return response.error.message;
    }
}
function getAnthropicHeaders(apiKey, enableCaching) {
    var headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        "anthropic-version": "2023-06-01",
        "x-api-key": apiKey,
    };
    if (enableCaching) {
        headers["anthropic-beta"] = "prompt-caching-2024-07-31";
    }
    return headers;
}
function addCacheControlToLastTwoUserMessages(messages) {
    var userMessages = 0;
    for (var i = messages.length - 1; i >= 0; i--) {
        var msg = messages[i];
        if (msg.role === "user") {
            userMessages++;
            if (typeof msg.content === "string") {
                continue;
            }
            for (var j = msg.content.length - 1; j >= 0; j--) {
                var part = msg.content[j];
                if (part.type === "text") {
                    part.cache_control = { type: "ephemeral" };
                    break;
                }
            }
            if (userMessages >= 2) {
                break;
            }
        }
    }
}
function openAiToolChoiceToAnthropicToolChoice(toolChoice) {
    if (!toolChoice) {
        return undefined;
    }
    switch (toolChoice) {
        case "none":
            // "none" is handled by excluding tools
            return undefined;
        case "required":
            return {
                type: "any",
            };
        case "auto":
            return {
                type: "auto",
            };
        default:
            switch (toolChoice.type) {
                case "allowed_tools":
                    // Filtering of tools is handled elsewhere
                    return {
                        type: toolChoice.allowed_tools.mode === "auto" ? "auto" : "any",
                    };
                case "custom":
                    return undefined; // TODO not supported yet
                case "function":
                    return {
                        type: "tool",
                        name: toolChoice.function.name,
                    };
            }
    }
}
function openaiToolToAnthropicTool(tool) {
    if (tool.type === "function" && "function" in tool) {
        return {
            name: tool.function.name,
            description: tool.function.description,
            input_schema: tool.function.parameters, // TODO unsafe cast, may be differences between openai tool schema and anthropic tool schema,
        };
    }
    else {
        throw new Error("Unsupported tool type in Anthropic: ".concat(tool.type));
    }
}
// Extract media type from data URL (ex. "data:image/png;base64,..." -> "image/png")
function getAnthropicMediaTypeFromDataUrl(dataUrl) {
    var match = dataUrl.match(/^data:([^;]+);base64,/);
    if (match) {
        switch (match[1]) {
            case "image/png":
            case "image/gif":
            case "image/webp":
                return match[1];
        }
    }
    return "image/jpeg";
}
