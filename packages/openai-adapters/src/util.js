"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatChunk = chatChunk;
exports.usageChatChunk = usageChatChunk;
exports.chatChunkFromDelta = chatChunkFromDelta;
exports.chatCompletion = chatCompletion;
exports.embedding = embedding;
exports.rerank = rerank;
exports.model = model;
exports.customFetch = customFetch;
var fetch_1 = require("@continuedev/fetch");
function chatChunk(options) {
    var _a, _b;
    return {
        choices: [
            {
                delta: {
                    content: options.content,
                    role: "assistant",
                },
                finish_reason: (_a = options.finish_reason) !== null && _a !== void 0 ? _a : "stop",
                index: 0,
                logprobs: null,
            },
        ],
        usage: options.usage,
        created: Date.now(),
        id: (_b = options.id) !== null && _b !== void 0 ? _b : "",
        model: options.model,
        object: "chat.completion.chunk",
    };
}
function usageChatChunk(options) {
    var _a;
    return {
        choices: [],
        usage: options.usage,
        created: Date.now(),
        id: (_a = options.id) !== null && _a !== void 0 ? _a : "",
        model: options.model,
        object: "chat.completion.chunk",
    };
}
function chatChunkFromDelta(options) {
    var _a, _b;
    return {
        choices: [
            {
                delta: options.delta,
                finish_reason: (_a = options.finish_reason) !== null && _a !== void 0 ? _a : "stop",
                index: 0,
                logprobs: null,
            },
        ],
        usage: options.usage,
        created: Date.now(),
        id: (_b = options.id) !== null && _b !== void 0 ? _b : "",
        model: options.model,
        object: "chat.completion.chunk",
    };
}
function chatCompletion(options) {
    var _a, _b, _c, _d;
    return {
        choices: [
            {
                finish_reason: (_a = options.finish_reason) !== null && _a !== void 0 ? _a : "stop",
                index: (_b = options.index) !== null && _b !== void 0 ? _b : 0,
                logprobs: null,
                message: {
                    content: (_c = options.content) !== null && _c !== void 0 ? _c : null,
                    role: "assistant",
                    refusal: null,
                },
            },
        ],
        usage: options.usage,
        created: Date.now(),
        id: (_d = options.id) !== null && _d !== void 0 ? _d : "",
        model: options.model,
        object: "chat.completion",
    };
}
function embedding(options) {
    var _a;
    return {
        data: options.data.map(function (embedding, i) { return ({
            index: i,
            embedding: embedding,
            object: "embedding",
        }); }),
        model: options.model,
        object: "list",
        usage: (_a = options.usage) !== null && _a !== void 0 ? _a : {
            prompt_tokens: 0,
            total_tokens: 0,
        },
    };
}
function rerank(options) {
    var _a;
    return {
        data: options.data.map(function (score, index) { return ({
            index: index,
            relevance_score: score,
        }); }),
        model: options.model,
        object: "list",
        usage: (_a = options.usage) !== null && _a !== void 0 ? _a : {
            total_tokens: 0,
        },
    };
}
function model(options) {
    var _a;
    return {
        id: options.id,
        object: "model",
        created: Date.now(),
        owned_by: (_a = options.owned_by) !== null && _a !== void 0 ? _a : "organization-owner",
    };
}
function customFetch(requestOptions) {
    if (process.env.FEATURE_FLAG_DISABLE_CUSTOM_FETCH) {
        return fetch_1.patchedFetch;
    }
    return function (req, init) {
        if (typeof req === "string" || req instanceof URL) {
            return (0, fetch_1.fetchwithRequestOptions)(req, init, requestOptions);
        }
        else {
            return (0, fetch_1.fetchwithRequestOptions)(req.url, init, requestOptions);
        }
    };
}
