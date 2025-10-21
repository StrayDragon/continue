"use strict";
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
exports.convertJsonEnvToYamlEnv = convertJsonEnvToYamlEnv;
exports.convertYamlEnvToJsonEnv = convertYamlEnvToJsonEnv;
exports.convertJsonMcpConfigToYamlMcpConfig = convertJsonMcpConfigToYamlMcpConfig;
exports.convertYamlMcpConfigToJsonMcpConfig = convertYamlMcpConfigToJsonMcpConfig;
exports.converMcpServersJsonConfigFileToYamlBlocks = converMcpServersJsonConfigFileToYamlBlocks;
/**
 * Convert environment variable references from JSON format (${VAR}) to YAML format (${{ secrets.VAR }})
 */
function convertJsonEnvToYamlEnv(env) {
    if (!env)
        return undefined;
    return Object.fromEntries(Object.entries(env).map(function (_a) {
        var key = _a[0], value = _a[1];
        return [
            key,
            value.replace(/\$\{([^}]+)\}/g, "${{ secrets.$1 }}"),
        ];
    }));
}
/**
 * Convert environment variable references from YAML format (${{ secrets.VAR }} or ${{ inputs.VAR }}) to JSON format (${VAR})
 */
function convertYamlEnvToJsonEnv(env) {
    if (!env)
        return undefined;
    return Object.fromEntries(Object.entries(env).map(function (_a) {
        var key = _a[0], value = _a[1];
        return [
            key,
            value.replace(/\$\{\{\s*(?:secrets|inputs)\.([^}\s]+)\s*\}\}/g, "${$1}"),
        ];
    }));
}
/**
 * Convert from JSON schema (used in Claude Desktop) to YAML schema (used in Continue)
 */
function convertJsonMcpConfigToYamlMcpConfig(name, jsonConfig) {
    var warnings = [];
    // STDIO
    if ("command" in jsonConfig) {
        if (jsonConfig.envFile) {
            warnings.push("envFile is not supported in Continue MCP config (server \"".concat(name, "\"). Environment variables from this file will not be used."));
        }
        var stdioConfig = {
            name: name,
            type: "stdio",
            command: jsonConfig.command,
            args: jsonConfig.args,
            env: convertJsonEnvToYamlEnv(jsonConfig.env),
        };
        return {
            warnings: warnings,
            yamlConfig: stdioConfig,
        };
    }
    // SSE/HTTP
    if ("url" in jsonConfig) {
        var sseOrHttpConfig = {
            name: name,
            url: jsonConfig.url,
        };
        if (jsonConfig.type) {
            sseOrHttpConfig.type =
                jsonConfig.type === "http" ? "streamable-http" : "sse";
        }
        if (jsonConfig.headers) {
            sseOrHttpConfig.requestOptions = {
                headers: jsonConfig.headers,
            };
        }
        return {
            warnings: warnings,
            yamlConfig: sseOrHttpConfig,
        };
    }
    throw new Error("Invalid MCP server configuration");
}
/**
 * Convert from YAML schema (used in Continue) to JSON schema (e.g. used in Claude Desktop)
 */
function convertYamlMcpConfigToJsonMcpConfig(yamlConfig) {
    var _a;
    var name = yamlConfig.name, faviconUrl = yamlConfig.faviconUrl;
    var warnings = [];
    if (faviconUrl) {
        warnings.push("`faviconUrl` from YAML MCP config not supported in Claude-style JSON, will be removed from server ".concat(name));
    }
    // Claude uses MCP_TIMEOUT env variable rather than a configuration for stdio
    var MCP_TIMEOUT = (_a = yamlConfig.connectionTimeout) === null || _a === void 0 ? void 0 : _a.toString();
    // STDIO
    if ("command" in yamlConfig) {
        var command = yamlConfig.command, args = yamlConfig.args, env = yamlConfig.env, cwd = yamlConfig.cwd;
        if (cwd) {
            warnings.push("`cwd` from YAML MCP config not supported in Claude-style JSON, will be removed from server ".concat(name));
        }
        return {
            name: name,
            MCP_TIMEOUT: MCP_TIMEOUT,
            warnings: warnings,
            jsonConfig: {
                type: "stdio",
                command: command,
                args: args,
                env: convertYamlEnvToJsonEnv(env),
            },
        };
    }
    // SSE/HTTP
    if ("url" in yamlConfig) {
        var url = yamlConfig.url, requestOptions = yamlConfig.requestOptions;
        var _b = requestOptions !== null && requestOptions !== void 0 ? requestOptions : {}, headers = _b.headers, unsupportedReqOptions = __rest(_b, ["headers"]);
        for (var _i = 0, _c = Object.keys(unsupportedReqOptions); _i < _c.length; _i++) {
            var key = _c[_i];
            warnings.push("".concat(key, " requestOption from YAML MCP config not supported in Claude-style JSON, will be ignored in server ").concat(name));
        }
        var httpOrSseJsonConfig = {
            url: url,
            headers: headers,
        };
        if (yamlConfig.type) {
            httpOrSseJsonConfig.type =
                yamlConfig.type === "streamable-http" ? "http" : "sse";
        }
        return {
            name: name,
            warnings: warnings,
            jsonConfig: httpOrSseJsonConfig,
            MCP_TIMEOUT: MCP_TIMEOUT,
        };
    }
    throw new Error("Invalid MCP server configuration");
}
function converMcpServersJsonConfigFileToYamlBlocks(jsonFile) {
    var _a;
    var allWarnings = [];
    var jsonEntries = Object.entries((_a = jsonFile.mcpServers) !== null && _a !== void 0 ? _a : {});
    var yamlConfigs = jsonEntries.map(function (_a) {
        var name = _a[0], config = _a[1];
        var _b = convertJsonMcpConfigToYamlMcpConfig(name, config), warnings = _b.warnings, yamlConfig = _b.yamlConfig;
        allWarnings.push.apply(allWarnings, warnings);
        return yamlConfig;
    });
    return {
        warnings: allWarnings,
        yamlConfigs: yamlConfigs,
    };
}
