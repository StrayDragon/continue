"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nextEditOutcomeEventAllSchema = void 0;
var zod_1 = require("zod");
var base_js_1 = require("../base.js");
exports.nextEditOutcomeEventAllSchema = base_js_1.baseDevDataAllSchema.extend({
    elapsed: zod_1.z.number(),
    completionOptions: zod_1.z.any(),
    completionId: zod_1.z.string(),
    requestId: zod_1.z.string().optional(),
    gitRepo: zod_1.z.string().optional(),
    uniqueId: zod_1.z.string(),
    timestamp: zod_1.z.number(),
    fileUri: zod_1.z.string(),
    workspaceDirUri: zod_1.z.string(),
    prompt: zod_1.z.string(),
    userEdits: zod_1.z.string(),
    userExcerpts: zod_1.z.string(),
    originalEditableRange: zod_1.z.string(),
    completion: zod_1.z.string(),
    cursorPosition: zod_1.z.object({ line: zod_1.z.number(), character: zod_1.z.number() }),
    accepted: zod_1.z.boolean().optional(),
    aborted: zod_1.z.boolean().optional(),
    modelProvider: zod_1.z.string(),
    modelName: zod_1.z.string(),
});
