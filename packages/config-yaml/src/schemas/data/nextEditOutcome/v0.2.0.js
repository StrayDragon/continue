"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nextEditOutcomeEventSchema_0_2_0_noCode = exports.nextEditOutcomeEventSchema_0_2_0 = void 0;
var index_js_1 = require("./index.js");
exports.nextEditOutcomeEventSchema_0_2_0 = index_js_1.nextEditOutcomeEventAllSchema.pick({
    // base
    timestamp: true,
    userId: true,
    userAgent: true,
    selectedProfileId: true,
    eventName: true,
    schema: true,
    // nextEditOutcome-specific
    elapsed: true,
    completionOptions: true,
    completionId: true,
    requestId: true,
    gitRepo: true,
    uniqueId: true,
    // timestamp: z.number(),
    fileUri: true,
    workspaceDirUri: true,
    prompt: true,
    userEdits: true,
    userExcerpts: true,
    originalEditableRange: true,
    completion: true,
    cursorPosition: true,
    accepted: true,
    aborted: true,
    modelProvider: true,
    modelName: true,
});
exports.nextEditOutcomeEventSchema_0_2_0_noCode = exports.nextEditOutcomeEventSchema_0_2_0.omit({
    fileUri: true,
    workspaceDirUri: true,
    prompt: true,
    userEdits: true,
    userExcerpts: true,
    originalEditableRange: true,
    completion: true,
});
