"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseDevDataAllSchema = void 0;
var zod_1 = require("zod");
exports.baseDevDataAllSchema = zod_1.z.object({
    eventName: zod_1.z.string(),
    schema: zod_1.z.string(),
    timestamp: zod_1.z.string().datetime(),
    userId: zod_1.z.string(),
    userAgent: zod_1.z.string(),
    selectedProfileId: zod_1.z.string(),
    // gitCommitHash: z.string(),
});
