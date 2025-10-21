"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toolUsageEventAllSchema = void 0;
var zod_1 = require("zod");
var base_js_1 = require("../base.js");
exports.toolUsageEventAllSchema = base_js_1.baseDevDataAllSchema.extend({
    toolCallId: zod_1.z.string(),
    functionName: zod_1.z.string(),
    functionParams: zod_1.z.record(zod_1.z.string(), zod_1.z.any()).optional(),
    toolCallArgs: zod_1.z.string(),
    accepted: zod_1.z.boolean(),
    succeeded: zod_1.z.boolean(),
    output: zod_1.z.array(zod_1.z.any()).optional(),
});
