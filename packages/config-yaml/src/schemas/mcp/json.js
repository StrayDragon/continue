"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.claudeCodeLikeConfigFileSchema = exports.claudeDesktopLikeConfigFileSchema = exports.mcpServersRecordSchema = exports.mcpServersJsonSchema = void 0;
var zod_1 = require("zod");
// This is the schema for an entry in e.g. Claude Desktop, Claude code mcp config
var httpOrSseMcpJsonSchema = zod_1.default.object({
    type: zod_1.default.union([zod_1.default.literal("sse"), zod_1.default.literal("http")]).optional(),
    url: zod_1.default.string(), // .url() fails with e.g. IP addresses
    headers: zod_1.default.record(zod_1.default.string(), zod_1.default.string()).optional(),
});
var stdioMcpJsonSchema = zod_1.default.object({
    type: zod_1.default.literal("stdio").optional(),
    command: zod_1.default.string(),
    args: zod_1.default.array(zod_1.default.string()).optional(),
    env: zod_1.default.record(zod_1.default.string(), zod_1.default.string()).optional(),
    envFile: zod_1.default.string().optional(),
});
exports.mcpServersJsonSchema = zod_1.default.union([
    httpOrSseMcpJsonSchema,
    stdioMcpJsonSchema,
]);
exports.mcpServersRecordSchema = zod_1.default.record(zod_1.default.string(), exports.mcpServersJsonSchema);
exports.claudeDesktopLikeConfigFileSchema = zod_1.default.object({
    mcpServers: exports.mcpServersRecordSchema,
});
exports.claudeCodeLikeConfigFileSchema = zod_1.default.object({
    mcpServers: exports.mcpServersRecordSchema.optional(),
    projects: zod_1.default.record(zod_1.default.string(), zod_1.default.object({
        mcpServers: exports.mcpServersRecordSchema.optional(),
    })),
});
