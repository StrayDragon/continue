"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.partialMcpServerSchema = exports.mcpServerSchema = void 0;
var zod_1 = require("zod");
var models_js_1 = require("../../schemas/models.js");
var baseMcpServerSchema = zod_1.default.object({
    name: zod_1.default.string(),
    serverName: zod_1.default.string().optional(),
    faviconUrl: zod_1.default.string().optional(),
    sourceFile: zod_1.default.string().optional(), // Added during loading
    connectionTimeout: zod_1.default.number().gt(0).optional(),
});
var stdioMcpServerSchema = baseMcpServerSchema.extend({
    command: zod_1.default.string(),
    type: zod_1.default.literal("stdio").optional(),
    args: zod_1.default.array(zod_1.default.string()).optional(),
    env: zod_1.default.record(zod_1.default.string()).optional(),
    cwd: zod_1.default.string().optional(),
});
var sseOrHttpMcpServerSchema = baseMcpServerSchema.extend({
    url: zod_1.default.string(), // .url() fails with e.g. IP addresses
    type: zod_1.default.union([zod_1.default.literal("sse"), zod_1.default.literal("streamable-http")]).optional(),
    apiKey: zod_1.default.string().optional(),
    requestOptions: models_js_1.requestOptionsSchema.optional(),
});
exports.mcpServerSchema = zod_1.default.union([
    stdioMcpServerSchema,
    sseOrHttpMcpServerSchema,
]);
exports.partialMcpServerSchema = zod_1.default.union([
    stdioMcpServerSchema.partial(),
    sseOrHttpMcpServerSchema.partial(),
]);
