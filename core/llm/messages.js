"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageHasToolCalls = messageHasToolCalls;
exports.messageIsEmpty = messageIsEmpty;
exports.addSpaceToAnyEmptyMessages = addSpaceToAnyEmptyMessages;
exports.isUserOrToolMsg = isUserOrToolMsg;
exports.isToolMessageForId = isToolMessageForId;
exports.messageHasToolCallId = messageHasToolCallId;
exports.chatMessageIsEmpty = chatMessageIsEmpty;
function messageHasToolCalls(msg) {
    return msg.role === "assistant" && !!msg.toolCalls;
}
function messageIsEmpty(message) {
    if (typeof message.content === "string") {
        return message.content.trim() === "";
    }
    if (Array.isArray(message.content)) {
        return message.content.every(function (item) { var _a; return item.type === "text" && ((_a = item.text) === null || _a === void 0 ? void 0 : _a.trim()) === ""; });
    }
    return false;
}
// some providers don't support empty messages
function addSpaceToAnyEmptyMessages(messages) {
    return messages.map(function (message) {
        if (messageIsEmpty(message)) {
            message.content = " ";
        }
        return message;
    });
}
function isUserOrToolMsg(msg) {
    if (!msg) {
        return false;
    }
    return msg.role === "user" || msg.role === "tool";
}
function isToolMessageForId(msg, toolCallId) {
    return !!msg && msg.role === "tool" && msg.toolCallId === toolCallId;
}
function messageHasToolCallId(msg, toolCallId) {
    var _a;
    return (!!msg &&
        msg.role === "assistant" &&
        !!((_a = msg.toolCalls) === null || _a === void 0 ? void 0 : _a.find(function (call) { return call.id === toolCallId; })));
}
function chatMessageIsEmpty(message) {
    switch (message.role) {
        case "system":
        case "user":
            return (typeof message.content === "string" && message.content.trim() === "");
        case "assistant":
            return (typeof message.content === "string" &&
                message.content.trim() === "" &&
                !message.toolCalls);
        case "thinking":
        case "tool":
            return false;
    }
}
