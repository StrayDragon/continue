"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseWorkflowFile = parseWorkflowFile;
exports.serializeWorkflowFile = serializeWorkflowFile;
exports.parseWorkflowTools = parseWorkflowTools;
var YAML = require("yaml");
var zod_1 = require("zod");
var markdownToRule_js_1 = require("./markdownToRule.js");
/*
    Experimental/internal config format for workflows
*/
var workflowFileFrontmatterSchema = zod_1.default.object({
    name: zod_1.default.string().min(1, "Name cannot be empty"),
    description: zod_1.default.string().optional(),
    model: zod_1.default.string().optional(),
    tools: zod_1.default.string().optional(), // TODO also accept yaml array
    rules: zod_1.default.string().optional(), // TODO also accept yaml array
});
var workflowFileSchema = workflowFileFrontmatterSchema.extend({
    prompt: zod_1.default.string(),
});
/**
 * Parses and validates a workflow file from markdown content
 * Workflow files must have frontmatter with at least a name
 */
function parseWorkflowFile(content) {
    var _a = (0, markdownToRule_js_1.parseMarkdownRule)(content), frontmatter = _a.frontmatter, markdown = _a.markdown;
    if (!frontmatter.name) {
        throw new Error("Workflow file must contain YAML frontmatter with a 'name' field");
    }
    var validationResult = workflowFileFrontmatterSchema.safeParse(frontmatter);
    if (!validationResult.success) {
        var errorDetails = validationResult.error.issues
            .map(function (issue) { return "".concat(issue.path.join("."), ": ").concat(issue.message); })
            .join(", ");
        throw new Error("Invalid workflow file frontmatter: ".concat(errorDetails));
    }
    return __assign(__assign({}, validationResult.data), { prompt: markdown });
}
/**
 * Serializes a Workflow file back to markdown with YAML frontmatter
 */
function serializeWorkflowFile(workflowFile) {
    var prompt = workflowFile.prompt, frontmatter = __rest(workflowFile, ["prompt"]);
    // Filter out undefined values from frontmatter
    var cleanFrontmatter = Object.fromEntries(Object.entries(frontmatter).filter(function (_a) {
        var value = _a[1];
        return value !== undefined;
    }));
    var yamlFrontmatter = YAML.stringify(cleanFrontmatter).trim();
    return "---\n".concat(yamlFrontmatter, "\n---\n").concat(prompt);
}
/**
 * Parse workflow tools string into structured format
 *
 * Supports formats:
 * - owner/package - all tools from MCP server
 * - owner/package:tool_name - specific tool from MCP server
 * - ToolName or tool_name - built-in tool
 * - built_in - all built-in tools
 *
 * @param toolsString Comma-separated tools string
 * @returns Parsed tools configuration
 */
function parseWorkflowTools(toolsString) {
    if (!(toolsString === null || toolsString === void 0 ? void 0 : toolsString.trim())) {
        return { tools: [], mcpServers: [], allBuiltIn: false };
    }
    var tools = [];
    var mcpServerSet = new Set();
    var allBuiltIn = false;
    var toolRefs = toolsString
        .split(",")
        .map(function (t) { return t.trim(); })
        .filter(Boolean);
    for (var _i = 0, toolRefs_1 = toolRefs; _i < toolRefs_1.length; _i++) {
        var toolRef = toolRefs_1[_i];
        if (toolRef === "built_in") {
            // Special keyword for all built-in tools
            allBuiltIn = true;
        }
        else if (toolRef.includes("/")) {
            // MCP tool reference: "owner/package" or "owner/package:tool_name"
            var colonIndex = toolRef.indexOf(":");
            if (colonIndex > 0) {
                // Specific tool: "owner/package:tool_name"
                // Reject references with whitespace to prevent silent misconfigurations
                if (/\s/.test(toolRef)) {
                    throw new Error("Invalid MCP tool reference \"".concat(toolRef, "\": colon-separated tool references cannot contain whitespace. ") +
                        "Use format \"owner/slug:tool_name\" without spaces.");
                }
                var mcpServer = toolRef.substring(0, colonIndex);
                var toolName = toolRef.substring(colonIndex + 1);
                tools.push({ mcpServer: mcpServer, toolName: toolName });
                mcpServerSet.add(mcpServer);
            }
            else {
                // All tools from server: "owner/package"
                var mcpServer = toolRef;
                tools.push({ mcpServer: mcpServer });
                mcpServerSet.add(mcpServer);
            }
        }
        else {
            // Built-in tool
            tools.push({ toolName: toolRef });
        }
    }
    return {
        tools: tools,
        mcpServers: Array.from(mcpServerSet),
        allBuiltIn: allBuiltIn,
    };
}
