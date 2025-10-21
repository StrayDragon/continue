"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatFeedbackEventSchema_0_1_0_noCode = exports.chatFeedbackEventSchema_0_1_0 = void 0;
var index_js_1 = require("./index.js");
exports.chatFeedbackEventSchema_0_1_0 = index_js_1.chatFeedbackEventAllSchema.pick({
    modelName: true,
    completionOptions: true,
    prompt: true,
    completion: true,
    feedback: true,
    sessionId: true,
});
exports.chatFeedbackEventSchema_0_1_0_noCode = exports.chatFeedbackEventSchema_0_1_0.omit({
    prompt: true,
    completion: true,
});
