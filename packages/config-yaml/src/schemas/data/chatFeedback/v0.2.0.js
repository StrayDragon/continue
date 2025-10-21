"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatFeedbackEventSchema_0_2_0_noCode = exports.chatFeedbackEventSchema_0_2_0 = void 0;
var index_js_1 = require("./index.js");
exports.chatFeedbackEventSchema_0_2_0 = index_js_1.chatFeedbackEventAllSchema.pick({
    // base
    timestamp: true,
    userId: true,
    userAgent: true,
    selectedProfileId: true,
    eventName: true,
    schema: true,
    // other
    prompt: true,
    completion: true,
    modelProvider: true,
    modelName: true,
    modelTitle: true,
    feedback: true,
    sessionId: true,
});
exports.chatFeedbackEventSchema_0_2_0_noCode = exports.chatFeedbackEventSchema_0_2_0.omit({
    prompt: true,
    completion: true,
});
