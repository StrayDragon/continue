"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatFeedbackEventAllSchema = void 0;
var zod_1 = require("zod");
var base_js_1 = require("../base.js");
exports.chatFeedbackEventAllSchema = base_js_1.baseDevDataAllSchema.extend({
    modelProvider: zod_1.z.string(),
    modelName: zod_1.z.string(),
    modelTitle: zod_1.z.string(),
    completionOptions: zod_1.z.object({}),
    prompt: zod_1.z.string(),
    completion: zod_1.z.string(),
    feedback: zod_1.z.boolean().optional(),
    sessionId: zod_1.z.string().uuid(),
});
