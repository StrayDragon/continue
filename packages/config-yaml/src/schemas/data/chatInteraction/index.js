"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatInteractionEventAllSchema = void 0;
var zod_1 = require("zod");
var base_js_1 = require("../base.js");
exports.chatInteractionEventAllSchema = base_js_1.baseDevDataAllSchema.extend({
    modelProvider: zod_1.z.string(),
    modelName: zod_1.z.string(),
    modelTitle: zod_1.z.string(),
    prompt: zod_1.z.string(),
    completion: zod_1.z.string(),
    sessionId: zod_1.z.string(),
    tools: zod_1.z.array(zod_1.z.string()).optional(),
    rules: zod_1.z
        .array(zod_1.z.object({
        id: zod_1.z.string(),
        rule: zod_1.z.string(),
        slug: zod_1.z.string().optional(),
    }))
        .optional(),
});
