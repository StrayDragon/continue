"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EMPTY_CHAT_COMPLETION = void 0;
exports.EMPTY_CHAT_COMPLETION = {
    choices: [
        {
            finish_reason: "stop",
            index: 0,
            logprobs: null,
            message: {
                content: null,
                role: "assistant",
                refusal: null,
            },
        },
    ],
    usage: undefined,
    created: Date.now(),
    id: "",
    model: "UNSPECIFIED",
    object: "chat.completion",
};
