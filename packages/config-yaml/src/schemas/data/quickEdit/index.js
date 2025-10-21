"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quickEditEventAllSchema = void 0;
var zod_1 = require("zod");
exports.quickEditEventAllSchema = zod_1.z.object({
    prompt: zod_1.z.string(),
    path: zod_1.z.string().optional(),
    label: zod_1.z.string(),
    diffs: zod_1.z
        .array(zod_1.z.object({
        type: zod_1.z.enum(["new", "old", "same"]),
        line: zod_1.z.string(),
    }))
        .optional(),
    model: zod_1.z.string().optional(),
});
