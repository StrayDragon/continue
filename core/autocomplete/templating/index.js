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
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderPrompt = renderPrompt;
exports.renderPromptWithTokenLimit = renderPromptWithTokenLimit;
var handlebars_1 = require("handlebars");
var constants_js_1 = require("../../llm/constants.js");
var countTokens_1 = require("../../llm/countTokens");
var uri_1 = require("../../util/uri");
var AutocompleteTemplate_1 = require("./AutocompleteTemplate");
var filtering_1 = require("./filtering");
var formatting_1 = require("./formatting");
var getStopTokens_1 = require("./getStopTokens");
function getTemplate(helper) {
    if (helper.options.template) {
        return {
            template: helper.options.template,
            completionOptions: {},
            compilePrefixSuffix: undefined,
        };
    }
    return (0, AutocompleteTemplate_1.getTemplateForModel)(helper.modelName);
}
function renderStringTemplate(template, prefix, suffix, lang, filepath, reponame) {
    var filename = (0, uri_1.getUriPathBasename)(filepath);
    var compiledTemplate = handlebars_1.default.compile(template);
    return compiledTemplate({
        prefix: prefix,
        suffix: suffix,
        filename: filename,
        reponame: reponame,
        language: lang.name,
    });
}
/** Consolidates shared setup between renderPrompt and renderPromptWithTokenLimit. */
function preparePromptContext(_a) {
    var _b;
    var snippetPayload = _a.snippetPayload, workspaceDirs = _a.workspaceDirs, helper = _a.helper;
    // Determine base prefix/suffix, accounting for any manually supplied prefix.
    var prefix = helper.input.manuallyPassPrefix || helper.prunedPrefix;
    var suffix = helper.input.manuallyPassPrefix ? "" : helper.prunedSuffix;
    if (suffix === "") {
        suffix = "\n";
    }
    var reponame = (0, uri_1.getUriPathBasename)((_b = workspaceDirs[0]) !== null && _b !== void 0 ? _b : "myproject");
    var _c = getTemplate(helper), template = _c.template, compilePrefixSuffix = _c.compilePrefixSuffix, completionOptions = _c.completionOptions;
    var snippets = (0, filtering_1.getSnippets)(helper, snippetPayload);
    return {
        prefix: prefix,
        suffix: suffix,
        reponame: reponame,
        template: template,
        compilePrefixSuffix: compilePrefixSuffix,
        completionOptions: completionOptions,
        snippets: snippets,
    };
}
function renderPrompt(_a) {
    var snippetPayload = _a.snippetPayload, workspaceDirs = _a.workspaceDirs, helper = _a.helper;
    var _b = preparePromptContext({ snippetPayload: snippetPayload, workspaceDirs: workspaceDirs, helper: helper }), prefix = _b.prefix, suffix = _b.suffix, reponame = _b.reponame, template = _b.template, compilePrefixSuffix = _b.compilePrefixSuffix, completionOptions = _b.completionOptions, snippets = _b.snippets;
    // Delegate prompt construction to buildPrompt to avoid duplication.
    var _c = buildPrompt(template, compilePrefixSuffix, prefix, suffix, helper, snippets, workspaceDirs, reponame), prompt = _c.prompt, compiledPrefix = _c.prefix, compiledSuffix = _c.suffix;
    var stopTokens = (0, getStopTokens_1.getStopTokens)(completionOptions, helper.lang, helper.modelName);
    return {
        prompt: prompt,
        prefix: compiledPrefix,
        suffix: compiledSuffix,
        completionOptions: __assign(__assign({}, completionOptions), { stop: stopTokens }),
    };
}
/** Builds the final prompt by applying prefix/suffix compilation or snippet formatting, then rendering the template. */
function buildPrompt(template, compilePrefixSuffix, prefix, suffix, helper, snippets, workspaceDirs, reponame) {
    var _a;
    if (compilePrefixSuffix) {
        _a = compilePrefixSuffix(prefix, suffix, helper.filepath, reponame, snippets, helper.workspaceUris), prefix = _a[0], suffix = _a[1];
    }
    else {
        var formatted = (0, formatting_1.formatSnippets)(helper, snippets, workspaceDirs);
        prefix = [formatted, prefix].join("\n");
    }
    var prompt = typeof template === "string"
        ? renderStringTemplate(template, prefix, suffix, helper.lang, helper.filepath, reponame)
        : template(prefix, suffix, helper.filepath, reponame, helper.lang.name, snippets, helper.workspaceUris);
    return { prompt: prompt, prefix: prefix, suffix: suffix };
}
function pruneLength(llm, prompt) {
    var _a;
    var contextLength = llm.contextLength;
    var reservedTokens = (_a = llm.completionOptions.maxTokens) !== null && _a !== void 0 ? _a : constants_js_1.DEFAULT_MAX_TOKENS;
    var safetyBuffer = (0, countTokens_1.getTokenCountingBufferSafety)(contextLength);
    var maxAllowedPromptTokens = contextLength - reservedTokens - safetyBuffer;
    var promptTokenCount = (0, countTokens_1.countTokens)(prompt, llm.model);
    return promptTokenCount - maxAllowedPromptTokens;
}
function renderPromptWithTokenLimit(_a) {
    var _b;
    var snippetPayload = _a.snippetPayload, workspaceDirs = _a.workspaceDirs, helper = _a.helper, llm = _a.llm;
    var _c = preparePromptContext({ snippetPayload: snippetPayload, workspaceDirs: workspaceDirs, helper: helper }), initialPrefix = _c.prefix, initialSuffix = _c.suffix, reponame = _c.reponame, template = _c.template, compilePrefixSuffix = _c.compilePrefixSuffix, completionOptions = _c.completionOptions, snippets = _c.snippets;
    // We'll mutate prefix/suffix during pruning, so copy them.
    var prefix = initialPrefix;
    var suffix = initialSuffix;
    var _d = buildPrompt(template, compilePrefixSuffix, prefix, suffix, helper, snippets, workspaceDirs, reponame), prompt = _d.prompt, compiledPrefix = _d.prefix, compiledSuffix = _d.suffix;
    // Truncate prefix and suffix if prompt tokens exceed maxAllowedPromptTokens
    if (llm) {
        var prune = pruneLength(llm, prompt);
        if (prune > 0) {
            var tokensToDrop = prune;
            var prefixTokenCount = (0, countTokens_1.countTokens)(prefix, helper.modelName);
            var suffixTokenCount = (0, countTokens_1.countTokens)(suffix, helper.modelName);
            var totalContextTokens = prefixTokenCount + suffixTokenCount;
            if (totalContextTokens > 0) {
                var dropPrefix = Math.ceil(tokensToDrop * (prefixTokenCount / totalContextTokens));
                var dropSuffix = Math.ceil(tokensToDrop - dropPrefix);
                var allowedPrefixTokens = Math.max(0, prefixTokenCount - dropPrefix);
                var allowedSuffixTokens = Math.max(0, suffixTokenCount - dropSuffix);
                prefix = (0, countTokens_1.pruneLinesFromTop)(prefix, allowedPrefixTokens, helper.modelName);
                suffix = (0, countTokens_1.pruneLinesFromBottom)(suffix, allowedSuffixTokens, helper.modelName);
            }
            (_b = buildPrompt(template, compilePrefixSuffix, prefix, suffix, helper, snippets, workspaceDirs, reponame), prompt = _b.prompt, compiledPrefix = _b.prefix, compiledSuffix = _b.suffix);
        }
    }
    var stopTokens = (0, getStopTokens_1.getStopTokens)(completionOptions, helper.lang, helper.modelName);
    return {
        prompt: prompt,
        prefix: compiledPrefix,
        suffix: compiledSuffix,
        completionOptions: __assign(__assign({}, completionOptions), { stop: stopTokens }),
    };
}
