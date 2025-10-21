"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editOutcomeEventAllSchema = void 0;
var zod_1 = require("zod");
var base_js_1 = require("../base.js");
exports.editOutcomeEventAllSchema = base_js_1.baseDevDataAllSchema.extend({
    modelProvider: zod_1.z.string(),
    modelName: zod_1.z.string(),
    modelTitle: zod_1.z.string(),
    prompt: zod_1.z.string(),
    completion: zod_1.z.string(),
    previousCode: zod_1.z.string(),
    newCode: zod_1.z.string(),
    previousCodeLines: zod_1.z.number(),
    newCodeLines: zod_1.z.number(),
    lineChange: zod_1.z.number(),
    accepted: zod_1.z.boolean(),
    filepath: zod_1.z.string(),
});
