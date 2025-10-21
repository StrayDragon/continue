"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertJsonToYamlConfig = convertJsonToYamlConfig;
function convertModel(m, roles) {
    return {
        name: m.title,
        provider: m.provider,
        model: m.model,
        apiKey: m.apiKey,
        apiBase: m.apiBase,
        roles: roles,
        requestOptions: m.requestOptions,
        defaultCompletionOptions: m.completionOptions,
    };
}
function convertEmbeddingsProvider(m) {
    var _a;
    return {
        name: "Embeddings Model",
        provider: m.provider,
        model: (_a = m.model) !== null && _a !== void 0 ? _a : "",
        apiKey: m.apiKey,
        apiBase: m.apiBase,
        roles: ["embed"],
    };
}
function convertReranker(m) {
    var _a, _b, _c, _d;
    return {
        name: "Reranker",
        provider: m.name,
        model: (_b = (_a = m.params) === null || _a === void 0 ? void 0 : _a.model) !== null && _b !== void 0 ? _b : "",
        apiKey: (_c = m.params) === null || _c === void 0 ? void 0 : _c.apiKey,
        apiBase: (_d = m.params) === null || _d === void 0 ? void 0 : _d.apiBase,
        roles: ["rerank"],
    };
}
function withFromContextProvider(contextProvider) {
    var _a, _b, _c, _d;
    var name = contextProvider.name, params = contextProvider.params;
    switch (name) {
        case "greptile":
            return {
                GITHUB_TOKEN: (_a = params === null || params === void 0 ? void 0 : params.GithubToken) !== null && _a !== void 0 ? _a : "",
                GREPTILE_TOKEN: (_b = params === null || params === void 0 ? void 0 : params.GreptileToken) !== null && _b !== void 0 ? _b : "",
            };
        case "jira":
            return {
                JIRA_TOKEN: (_c = params === null || params === void 0 ? void 0 : params.JiraToken) !== null && _c !== void 0 ? _c : "",
                JIRA_API_VERSION: params === null || params === void 0 ? void 0 : params.JiraEmail,
                JIRA_DOMAIN: (_d = params === null || params === void 0 ? void 0 : params.JiraDomain) !== null && _d !== void 0 ? _d : "",
            };
        case "postgres":
            return {
                POSTGRES_HOST: params === null || params === void 0 ? void 0 : params.host,
                POSTGRES_PORT: params === null || params === void 0 ? void 0 : params.port,
                POSTGRES_USER: params === null || params === void 0 ? void 0 : params.user,
                POSTGRES_PASSWORD: params === null || params === void 0 ? void 0 : params.password,
                POSTGRES_DATABASE: params === null || params === void 0 ? void 0 : params.database,
                POSTGRES_SCHEMA: params === null || params === void 0 ? void 0 : params.schema,
            };
        case "gitlab-mr":
            return {
                GITLAB_TOKEN: params === null || params === void 0 ? void 0 : params.token,
                DOMAIN: params === null || params === void 0 ? void 0 : params.domain,
            };
        case "discord":
            return {
                DISCORD_KEY: params === null || params === void 0 ? void 0 : params.discordKey,
                DISCORD_GUILD_ID: params === null || params === void 0 ? void 0 : params.guildId,
                DISCORD_CHANNELS: params === null || params === void 0 ? void 0 : params.channels,
            };
        case "commits":
            return {
                DEPTH: params === null || params === void 0 ? void 0 : params.Depth,
                LAST_N_COMMITS_DEPTH: params === null || params === void 0 ? void 0 : params.LastXCommitsDepth,
            };
        default:
            return undefined;
    }
}
function convertContext(configJson) {
    var _a, _b;
    var context = (_b = (_a = configJson.contextProviders) === null || _a === void 0 ? void 0 : _a.map(function (ctx) {
        // ctx providers that weren't given official blocks
        if (["web", "debugger", "issue", "database", "google", "http"].includes(ctx.name)) {
            return {
                provider: ctx.name,
                params: ctx.params,
            };
        }
        return {
            uses: "continuedev/".concat(ctx.name === "open" ? "open-files" : ctx.name, "-context"),
            with: ctx.params,
        };
    })) !== null && _b !== void 0 ? _b : [];
    return context;
}
function convertCustomCommand(cmd) {
    return {
        name: cmd.name,
        description: cmd.description,
        prompt: cmd.prompt, // The type is wrong in @continuedev/config-types
    };
}
function convertMcp(mcp) {
    var transport = mcp.transport;
    var command = transport.command, args = transport.args, env = transport.env, server_name = transport.server_name;
    return {
        command: command,
        args: args,
        env: env,
        name: server_name || "MCP Server",
    };
}
function convertDoc(doc) {
    return {
        name: doc.title,
        startUrl: doc.startUrl,
        rootUrl: doc.rootUrl,
        faviconUrl: doc.faviconUrl,
    };
}
function convertJsonToYamlConfig(configJson) {
    var _a, _b, _c, _d;
    // models
    var models = configJson.models.map(function (m) { return convertModel(m, ["chat"]); });
    var autocompleteModels = Array.isArray(configJson.tabAutocompleteModel)
        ? configJson.tabAutocompleteModel
        : configJson.tabAutocompleteModel
            ? [configJson.tabAutocompleteModel]
            : [];
    models.push.apply(models, autocompleteModels.map(function (m) { return convertModel(m, ["autocomplete"]); }));
    if (configJson.embeddingsProvider) {
        models.push(convertEmbeddingsProvider(configJson.embeddingsProvider));
    }
    if (configJson.reranker) {
        models.push(convertReranker(configJson.reranker));
    }
    // context
    var context = convertContext(configJson);
    // mcpServers
    // Types for "experimental" don't exist
    var mcpServers = (_b = (_a = configJson.experimental) === null || _a === void 0 ? void 0 : _a.modelContextProtocolServers) === null || _b === void 0 ? void 0 : _b.map(convertMcp);
    // prompts
    var prompts = (_c = configJson.customCommands) === null || _c === void 0 ? void 0 : _c.map(convertCustomCommand);
    // docs
    var docs = (_d = configJson.docs) === null || _d === void 0 ? void 0 : _d.map(convertDoc);
    var configYaml = {
        name: "Continue Config",
        version: "0.0.1",
        models: models,
        context: context,
        rules: configJson.systemMessage ? [configJson.systemMessage] : undefined,
        prompts: prompts,
        mcpServers: mcpServers,
        docs: docs,
        requestOptions: configJson.requestOptions,
    };
    return configYaml;
}
