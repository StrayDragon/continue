"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.policySchema = void 0;
var z = require("zod");
exports.policySchema = z.object({
    allowAnonymousTelemetry: z.boolean().optional(),
    allowOtherOrgs: z.boolean().optional(),
    allowCodebaseIndexing: z.boolean().optional(),
    allowMcpServers: z.boolean().optional(),
    // allowLocalConfigFile: z.boolean().optional(),
});
