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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TEMPLATE_VAR_REGEX = void 0;
exports.parseConfigYaml = parseConfigYaml;
exports.parseAssistantUnrolled = parseAssistantUnrolled;
exports.parseBlock = parseBlock;
exports.getTemplateVariables = getTemplateVariables;
exports.fillTemplateVariables = fillTemplateVariables;
exports.unrollAssistant = unrollAssistant;
exports.unrollAssistantFromContent = unrollAssistantFromContent;
exports.unrollBlocks = unrollBlocks;
exports.resolveBlock = resolveBlock;
exports.parseMarkdownRuleOrAssistantUnrolled = parseMarkdownRuleOrAssistantUnrolled;
exports.mergeOverrides = mergeOverrides;
var YAML = require("yaml");
var zod_1 = require("zod");
var browser_js_1 = require("../browser.js");
var SecretResult_js_1 = require("../interfaces/SecretResult.js");
var slugs_js_1 = require("../interfaces/slugs.js");
var index_js_1 = require("../markdown/index.js");
var index_js_2 = require("../schemas/index.js");
var blockDuplicationDetector_js_1 = require("./blockDuplicationDetector.js");
var clientRender_js_1 = require("./clientRender.js");
var getBlockType_js_1 = require("./getBlockType.js");
function parseConfigYaml(configYaml) {
    try {
        var parsed = YAML.parse(configYaml);
        var result = index_js_2.configYamlSchema.safeParse(parsed);
        if (result.success) {
            return result.data;
        }
        throw new Error(formatZodError(result.error), {
            cause: "result.success was false",
        });
    }
    catch (e) {
        console.error("Failed to parse rolled assistant:", configYaml);
        if (e instanceof Error &&
            "cause" in e &&
            e.cause === "result.success was false") {
            throw new Error("Failed to parse agent: ".concat(e.message));
        }
        else if (e instanceof zod_1.ZodError) {
            throw new Error("Failed to parse agent: ".concat(formatZodError(e)));
        }
        else {
            throw new Error("Failed to parse agent: ".concat(e instanceof Error ? e.message : e));
        }
    }
}
function parseAssistantUnrolled(configYaml) {
    try {
        var parsed = YAML.parse(configYaml);
        var result = index_js_2.assistantUnrolledSchema.parse(parsed);
        return result;
    }
    catch (e) {
        console.error("Failed to parse unrolled assistant: ".concat(e.message, "\n\n").concat(configYaml));
        throw new Error("Failed to parse agent: ".concat(formatZodError(e)));
    }
}
function parseBlock(configYaml) {
    try {
        var parsed = YAML.parse(configYaml);
        var result = index_js_2.blockSchema.parse(parsed);
        return result;
    }
    catch (e) {
        throw new Error("Failed to parse block: ".concat(formatZodError(e)));
    }
}
exports.TEMPLATE_VAR_REGEX = /\${{[\s]*([^}\s]+)[\s]*}}/g;
function getTemplateVariables(templatedYaml) {
    var variables = new Set();
    var matches = templatedYaml.matchAll(exports.TEMPLATE_VAR_REGEX);
    for (var _i = 0, matches_1 = matches; _i < matches_1.length; _i++) {
        var match = matches_1[_i];
        variables.add(match[1]);
    }
    return Array.from(variables);
}
function fillTemplateVariables(templatedYaml, data) {
    return templatedYaml.replace(exports.TEMPLATE_VAR_REGEX, function (match, variableName) {
        // Inject data
        if (variableName in data) {
            return data[variableName];
        }
        // If variable doesn't exist, return the original expression
        return match;
    });
}
function flattenTemplateData(templateData) {
    var flattened = {};
    if (templateData.inputs) {
        for (var _i = 0, _a = Object.entries(templateData.inputs); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            flattened["inputs.".concat(key)] = value;
        }
    }
    if (templateData.secrets) {
        for (var _c = 0, _d = Object.entries(templateData.secrets); _c < _d.length; _c++) {
            var _e = _d[_c], key = _e[0], value = _e[1];
            flattened["secrets.".concat(key)] = value;
        }
    }
    return flattened;
}
function secretToFQSNMap(secretNames, parentPackages) {
    var map = {};
    for (var _i = 0, secretNames_1 = secretNames; _i < secretNames_1.length; _i++) {
        var secret = secretNames_1[_i];
        var parentSlugs = parentPackages.map(clientRender_js_1.packageIdentifierToShorthandSlug);
        var parts = __spreadArray(__spreadArray([], parentSlugs, true), [secret], false);
        var fqsn = parts.join("/");
        map[secret] = "${{ secrets.".concat(fqsn, " }}");
    }
    return map;
}
function extractFQSNMap(rawContent, parentPackages) {
    var templateVars = getTemplateVariables(rawContent);
    var secrets = templateVars
        .filter(function (v) { return v.startsWith("secrets."); })
        .map(function (v) { return v.replace("secrets.", ""); });
    return secretToFQSNMap(secrets, parentPackages);
}
/**
 * All template vars are already FQSNs, here we just resolve them to either locations or values
 */
function extractRenderedSecretsMap(rawContent_1, platformClient_1) {
    return __awaiter(this, arguments, void 0, function (rawContent, platformClient, alwaysUseProxy) {
        var templateVars, secrets, fqsns, secretResults, map, _i, secretResults_1, secretResult;
        if (alwaysUseProxy === void 0) { alwaysUseProxy = false; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    templateVars = getTemplateVariables(rawContent);
                    secrets = templateVars
                        .filter(function (v) { return v.startsWith("secrets."); })
                        .map(function (v) { return v.replace("secrets.", ""); });
                    fqsns = secrets.map(slugs_js_1.decodeFQSN);
                    return [4 /*yield*/, platformClient.resolveFQSNs(fqsns)];
                case 1:
                    secretResults = _a.sent();
                    map = {};
                    for (_i = 0, secretResults_1 = secretResults; _i < secretResults_1.length; _i++) {
                        secretResult = secretResults_1[_i];
                        if (!secretResult) {
                            continue;
                        }
                        // User secrets are rendered
                        if ("value" in secretResult && !alwaysUseProxy) {
                            map[(0, slugs_js_1.encodeFQSN)(secretResult.fqsn)] = secretResult.value;
                        }
                        else {
                            // Other secrets are rendered as secret locations and then converted to proxy types later
                            map[(0, slugs_js_1.encodeFQSN)(secretResult.fqsn)] =
                                "${{ secrets.".concat((0, SecretResult_js_1.encodeSecretLocation)(secretResult.secretLocation), " }}");
                        }
                    }
                    return [2 /*return*/, map];
            }
        });
    });
}
function unrollAssistant(id, registry, options) {
    return __awaiter(this, void 0, void 0, function () {
        var rawContent, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, registry.getContent(id)];
                case 1:
                    rawContent = _a.sent();
                    result = unrollAssistantFromContent(id, rawContent, registry, options);
                    return [2 /*return*/, result];
            }
        });
    });
}
function renderTemplateData(rawYaml, templateData) {
    var fullTemplateData = __assign({ inputs: {}, secrets: {}, continue: {} }, templateData);
    var templatedYaml = fillTemplateVariables(rawYaml, flattenTemplateData(fullTemplateData));
    return templatedYaml;
}
function unrollAssistantFromContent(id, rawYaml, registry, options) {
    return __awaiter(this, void 0, void 0, function () {
        var parsedYaml, _a, unrolledAssistant, configLoadInterrupted, errors, rawUnrolledYaml, templatedYaml, secrets, renderedYaml, renderedConfig;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    parsedYaml = parseMarkdownRuleOrConfigYaml(rawYaml, id);
                    return [4 /*yield*/, unrollBlocks(parsedYaml, registry, options.injectBlocks, options.allowlistedBlocks, options.blocklistedBlocks, options.injectRequestOptions)];
                case 1:
                    _a = _b.sent(), unrolledAssistant = _a.config, configLoadInterrupted = _a.configLoadInterrupted, errors = _a.errors;
                    rawUnrolledYaml = YAML.stringify(unrolledAssistant);
                    templatedYaml = renderTemplateData(rawUnrolledYaml, {
                        secrets: extractFQSNMap(rawUnrolledYaml, [id]),
                    });
                    if (!options.renderSecrets) {
                        return [2 /*return*/, {
                                config: parseAssistantUnrolled(templatedYaml),
                                errors: [],
                                configLoadInterrupted: false,
                            }];
                    }
                    return [4 /*yield*/, extractRenderedSecretsMap(templatedYaml, options.platformClient, options.alwaysUseProxy)];
                case 2:
                    secrets = _b.sent();
                    renderedYaml = renderTemplateData(templatedYaml, { secrets: secrets });
                    renderedConfig = (0, clientRender_js_1.useProxyForUnrenderedSecrets)(parseAssistantUnrolled(renderedYaml), id, options.orgScopeId, options.onPremProxyUrl);
                    return [2 /*return*/, { config: renderedConfig, errors: errors, configLoadInterrupted: configLoadInterrupted }];
            }
        });
    });
}
function isPackageAllowed(pkgId, allowlistedBlocks, blocklistedBlocks) {
    // Only "slug" type blocks can be allow/block listed
    if (pkgId.uriType !== "slug") {
        return true;
    }
    var packageSlug = {
        ownerSlug: pkgId.fullSlug.ownerSlug,
        packageSlug: pkgId.fullSlug.packageSlug,
    };
    if (allowlistedBlocks &&
        !allowlistedBlocks.some(function (block) { return (0, slugs_js_1.packageSlugsEqual)(block, packageSlug); })) {
        return false;
    }
    if (blocklistedBlocks &&
        blocklistedBlocks.some(function (block) { return (0, slugs_js_1.packageSlugsEqual)(block, packageSlug); })) {
        return false;
    }
    return true;
}
function unrollBlocks(assistant, registry, injectBlocks, allowlistedBlocks, blocklistedBlocks, injectRequestOptions) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, unrolledAssistant, sections, sectionPromises, rulesPromise, injectedBlocksPromise, _a, sectionResults, rulesResult, injectedResult, _i, sectionResults_1, sectionResult, detector, _loop_1, _b, sectionResults_2, sectionResult, _loop_2, _c, _d, _e, blockType, resolvedBlock, source, configResult;
        var _this = this;
        var _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    errors = [];
                    unrolledAssistant = {
                        name: assistant.name,
                        version: assistant.version,
                        requestOptions: assistant.requestOptions,
                    };
                    if (injectRequestOptions) {
                        unrolledAssistant.requestOptions = (0, browser_js_1.mergeConfigYamlRequestOptions)(assistant.requestOptions, injectRequestOptions);
                    }
                    else {
                        unrolledAssistant.requestOptions = assistant.requestOptions;
                    }
                    sections = ["models", "context", "data", "mcpServers", "prompts", "docs"];
                    sectionPromises = sections.map(function (section) { return __awaiter(_this, void 0, void 0, function () {
                        var blockPromises, blockResults, sectionBlocks, sectionErrors, _i, blockResults_1, result;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!assistant[section]) {
                                        return [2 /*return*/, { section: section, blocks: null }];
                                    }
                                    blockPromises = assistant[section].map(function (unrolledBlock, index) { return __awaiter(_this, void 0, void 0, function () {
                                        var blockIdentifier, blockConfigYaml, block, err_1, msg;
                                        var _a, _b;
                                        return __generator(this, function (_c) {
                                            switch (_c.label) {
                                                case 0:
                                                    if (!("uses" in unrolledBlock)) return [3 /*break*/, 5];
                                                    _c.label = 1;
                                                case 1:
                                                    _c.trys.push([1, 3, , 4]);
                                                    blockIdentifier = (0, slugs_js_1.decodePackageIdentifier)(unrolledBlock.uses);
                                                    if (!isPackageAllowed(blockIdentifier, allowlistedBlocks, blocklistedBlocks)) {
                                                        throw new Error("".concat(blockIdentifier.uriType === "slug"
                                                            ? (0, slugs_js_1.encodePackageSlug)({
                                                                ownerSlug: blockIdentifier.fullSlug.ownerSlug,
                                                                packageSlug: blockIdentifier.fullSlug.packageSlug,
                                                            })
                                                            : (0, slugs_js_1.encodePackageIdentifier)(blockIdentifier), " is block listed and can not be used."));
                                                    }
                                                    return [4 /*yield*/, resolveBlock(blockIdentifier, unrolledBlock.with, registry)];
                                                case 2:
                                                    blockConfigYaml = _c.sent();
                                                    block = (_a = blockConfigYaml[section]) === null || _a === void 0 ? void 0 : _a[0];
                                                    if (block) {
                                                        return [2 /*return*/, {
                                                                index: index,
                                                                block: mergeOverrides(block, (_b = unrolledBlock.override) !== null && _b !== void 0 ? _b : {}),
                                                                error: null,
                                                            }];
                                                    }
                                                    return [2 /*return*/, { index: index, block: null, error: null }];
                                                case 3:
                                                    err_1 = _c.sent();
                                                    msg = "";
                                                    if (typeof unrolledBlock.uses !== "string" &&
                                                        "filePath" in unrolledBlock.uses) {
                                                        msg = "".concat(err_1.message, ".\n> ").concat(unrolledBlock.uses.filePath);
                                                    }
                                                    else {
                                                        msg = "".concat(err_1.message, ".\n> ").concat(JSON.stringify(unrolledBlock.uses));
                                                    }
                                                    console.error("Failed to unroll block ".concat(JSON.stringify(unrolledBlock.uses), ": ").concat(err_1.message));
                                                    return [2 /*return*/, {
                                                            index: index,
                                                            block: null,
                                                            error: { fatal: false, message: msg },
                                                        }];
                                                case 4: return [3 /*break*/, 6];
                                                case 5: 
                                                // Normal block
                                                return [2 /*return*/, { index: index, block: unrolledBlock, error: null }];
                                                case 6: return [2 /*return*/];
                                            }
                                        });
                                    }); });
                                    return [4 /*yield*/, Promise.all(blockPromises)];
                                case 1:
                                    blockResults = _a.sent();
                                    sectionBlocks = [];
                                    sectionErrors = [];
                                    for (_i = 0, blockResults_1 = blockResults; _i < blockResults_1.length; _i++) {
                                        result = blockResults_1[_i];
                                        if (result.error) {
                                            sectionErrors.push(result.error);
                                        }
                                        sectionBlocks[result.index] = result.block;
                                    }
                                    return [2 /*return*/, { section: section, blocks: sectionBlocks, errors: sectionErrors }];
                            }
                        });
                    }); });
                    rulesPromise = assistant.rules
                        ? (function () { return __awaiter(_this, void 0, void 0, function () {
                            var rulePromises, ruleResults, rules, ruleErrors, _i, ruleResults_1, result;
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        rulePromises = assistant.rules.map(function (rule, index) { return __awaiter(_this, void 0, void 0, function () {
                                            var blockConfigYaml, block, err_2;
                                            var _a;
                                            return __generator(this, function (_b) {
                                                switch (_b.label) {
                                                    case 0:
                                                        if (!(typeof rule === "string" || !("uses" in rule))) return [3 /*break*/, 1];
                                                        return [2 /*return*/, { index: index, rule: rule, error: null }];
                                                    case 1:
                                                        if (!("uses" in rule)) return [3 /*break*/, 5];
                                                        _b.label = 2;
                                                    case 2:
                                                        _b.trys.push([2, 4, , 5]);
                                                        return [4 /*yield*/, resolveBlock((0, slugs_js_1.decodePackageIdentifier)(rule.uses), rule.with, registry)];
                                                    case 3:
                                                        blockConfigYaml = _b.sent();
                                                        block = (_a = blockConfigYaml.rules) === null || _a === void 0 ? void 0 : _a[0];
                                                        return [2 /*return*/, { index: index, rule: block || null, error: null }];
                                                    case 4:
                                                        err_2 = _b.sent();
                                                        console.error("Failed to unroll block ".concat(rule.uses, ": ").concat(err_2.message));
                                                        return [2 /*return*/, {
                                                                index: index,
                                                                rule: null,
                                                                error: {
                                                                    fatal: false,
                                                                    message: "".concat(err_2.message, ":\n").concat(rule.uses),
                                                                },
                                                            }];
                                                    case 5: return [2 /*return*/, { index: index, rule: null, error: null }];
                                                }
                                            });
                                        }); });
                                        return [4 /*yield*/, Promise.all(rulePromises)];
                                    case 1:
                                        ruleResults = _a.sent();
                                        rules = [];
                                        ruleErrors = [];
                                        for (_i = 0, ruleResults_1 = ruleResults; _i < ruleResults_1.length; _i++) {
                                            result = ruleResults_1[_i];
                                            if (result.error) {
                                                ruleErrors.push(result.error);
                                            }
                                            rules[result.index] = result.rule;
                                        }
                                        return [2 /*return*/, { rules: rules, errors: ruleErrors }];
                                }
                            });
                        }); })()
                        : Promise.resolve({ rules: undefined, errors: [] });
                    injectedBlocksPromise = injectBlocks
                        ? (function () { return __awaiter(_this, void 0, void 0, function () {
                            var injectedBlockPromises, injectedResults, injectedErrors, injectedBlocks, _i, injectedResults_1, result;
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        injectedBlockPromises = injectBlocks.map(function (injectBlock) { return __awaiter(_this, void 0, void 0, function () {
                                            var blockConfigYaml, parsedBlock, blockType, resolvedBlock, err_3, msg;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        _a.trys.push([0, 3, , 4]);
                                                        return [4 /*yield*/, registry.getContent(injectBlock)];
                                                    case 1:
                                                        blockConfigYaml = _a.sent();
                                                        parsedBlock = parseMarkdownRuleOrConfigYaml(blockConfigYaml, injectBlock);
                                                        blockType = (0, getBlockType_js_1.getBlockType)(parsedBlock);
                                                        return [4 /*yield*/, resolveBlock(injectBlock, undefined, registry)];
                                                    case 2:
                                                        resolvedBlock = _a.sent();
                                                        return [2 /*return*/, {
                                                                blockType: blockType,
                                                                resolvedBlock: resolvedBlock,
                                                                source: injectBlock.uriType === "file"
                                                                    ? injectBlock.fileUri
                                                                    : undefined,
                                                                error: null,
                                                            }];
                                                    case 3:
                                                        err_3 = _a.sent();
                                                        msg = "";
                                                        if (injectBlock.uriType === "file") {
                                                            msg = "".concat(err_3.message, ".\n> ").concat(injectBlock.fileUri);
                                                        }
                                                        else {
                                                            msg = "".concat(err_3.message, ".\n> ").concat(injectBlock.fullSlug);
                                                        }
                                                        console.error("Failed to unroll block ".concat(JSON.stringify(injectBlock), ": ").concat(err_3.message));
                                                        return [2 /*return*/, {
                                                                blockType: null,
                                                                resolvedBlock: null,
                                                                error: { fatal: false, message: msg },
                                                            }];
                                                    case 4: return [2 /*return*/];
                                                }
                                            });
                                        }); });
                                        return [4 /*yield*/, Promise.all(injectedBlockPromises)];
                                    case 1:
                                        injectedResults = _a.sent();
                                        injectedErrors = [];
                                        injectedBlocks = [];
                                        for (_i = 0, injectedResults_1 = injectedResults; _i < injectedResults_1.length; _i++) {
                                            result = injectedResults_1[_i];
                                            if (result.error) {
                                                injectedErrors.push(result.error);
                                            }
                                            else if (result.blockType && result.resolvedBlock) {
                                                injectedBlocks.push({
                                                    blockType: result.blockType,
                                                    resolvedBlock: result.resolvedBlock,
                                                    source: result.source,
                                                });
                                            }
                                        }
                                        return [2 /*return*/, { injectedBlocks: injectedBlocks, errors: injectedErrors }];
                                }
                            });
                        }); })()
                        : Promise.resolve({ injectedBlocks: [], errors: [] });
                    return [4 /*yield*/, Promise.all([
                            Promise.all(sectionPromises),
                            rulesPromise,
                            injectedBlocksPromise,
                        ])];
                case 1:
                    _a = _g.sent(), sectionResults = _a[0], rulesResult = _a[1], injectedResult = _a[2];
                    // Collect all errors
                    for (_i = 0, sectionResults_1 = sectionResults; _i < sectionResults_1.length; _i++) {
                        sectionResult = sectionResults_1[_i];
                        if (sectionResult.errors) {
                            errors.push.apply(errors, sectionResult.errors);
                        }
                    }
                    errors.push.apply(errors, rulesResult.errors);
                    errors.push.apply(errors, injectedResult.errors);
                    detector = new blockDuplicationDetector_js_1.BlockDuplicationDetector();
                    _loop_1 = function (sectionResult) {
                        if (sectionResult.blocks) {
                            unrolledAssistant[sectionResult.section] = sectionResult.blocks.filter(function (block) { return !detector.isDuplicated(block, sectionResult.section); });
                        }
                    };
                    // Assign section results
                    for (_b = 0, sectionResults_2 = sectionResults; _b < sectionResults_2.length; _b++) {
                        sectionResult = sectionResults_2[_b];
                        _loop_1(sectionResult);
                    }
                    // Assign rules result
                    if (rulesResult.rules) {
                        unrolledAssistant.rules = rulesResult.rules.filter(function (rule) { return !detector.isDuplicated(rule, "rules"); });
                    }
                    _loop_2 = function (blockType, resolvedBlock, source) {
                        var key = blockType;
                        if (!unrolledAssistant[key]) {
                            unrolledAssistant[key] = [];
                        }
                        var filteredBlocks = injectLocalSourceFile(key, resolvedBlock, source).filter(function (block) { return !detector.isDuplicated(block, blockType); });
                        (_f = unrolledAssistant[key]) === null || _f === void 0 ? void 0 : _f.push.apply(_f, filteredBlocks);
                    };
                    // Add injected blocks
                    for (_c = 0, _d = injectedResult.injectedBlocks; _c < _d.length; _c++) {
                        _e = _d[_c], blockType = _e.blockType, resolvedBlock = _e.resolvedBlock, source = _e.source;
                        _loop_2(blockType, resolvedBlock, source);
                    }
                    configResult = {
                        config: undefined,
                        errors: undefined,
                        configLoadInterrupted: false,
                    };
                    configResult.config = unrolledAssistant;
                    if (errors.length > 0) {
                        configResult.errors = errors;
                    }
                    return [2 /*return*/, configResult];
            }
        });
    });
}
function injectLocalSourceFile(blockType, resolvedBlock, source) {
    var _a;
    var blocks = (_a = resolvedBlock[blockType]) !== null && _a !== void 0 ? _a : [];
    if (source === undefined) {
        // If no source is provided, return blocks as is
        return blocks;
    }
    if (blockType === "rules") {
        // For rules, we need to ensure they are wrapped in an object with a `source
        return blocks.map(function (block) {
            if (typeof block === "string") {
                var rule = {
                    sourceFile: source,
                    name: block,
                    rule: block,
                };
                return rule;
            }
            else if (typeof block === "object") {
                block.sourceFile = source;
            }
            return block;
        });
    }
    // For other block types, we can directly inject the source file
    return blocks.map(function (block) { return (__assign(__assign({}, block), { sourceFile: source })); });
}
function resolveBlock(id, inputs, registry) {
    return __awaiter(this, void 0, void 0, function () {
        var rawYaml, renderedInputs, templatedYaml;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, registry.getContent(id)];
                case 1:
                    rawYaml = _a.sent();
                    if (rawYaml === undefined) {
                        throw new Error("Block ".concat((0, clientRender_js_1.packageIdentifierToShorthandSlug)(id), " not found"));
                    }
                    renderedInputs = inputsToFQSNs(inputs || {}, id);
                    templatedYaml = renderTemplateData(rawYaml, {
                        inputs: renderedInputs,
                        secrets: extractFQSNMap(rawYaml, [id]),
                    });
                    return [2 /*return*/, parseMarkdownRuleOrAssistantUnrolled(templatedYaml, id)];
            }
        });
    });
}
function parseMarkdownRuleOrAssistantUnrolled(content, id) {
    return parseYamlOrMarkdownRule(content, id, parseBlock);
}
function parseMarkdownRuleOrConfigYaml(content, id) {
    return parseYamlOrMarkdownRule(content, id, parseConfigYaml);
}
function parseYamlOrMarkdownRule(content, id, parseYamlFn) {
    var parsedYaml;
    try {
        // Try to parse as YAML first, then as markdown rule if that fails
        parsedYaml = parseYamlFn(content);
    }
    catch (yamlError) {
        if (id.uriType === "file" &&
            [".yaml", ".yml"].some(function (ext) { return id.fileUri.endsWith(ext); })) {
            throw yamlError;
        }
        // If YAML parsing fails, try parsing as markdown rule
        try {
            var rule = (0, index_js_1.markdownToRule)(content, id);
            // Convert the rule object to the expected format
            parsedYaml = { name: rule.name, version: "1.0.0", rules: [rule] };
        }
        catch (markdownError) {
            // If both fail, throw the original YAML error
            throw yamlError;
        }
    }
    return parsedYaml;
}
function inputsToFQSNs(inputs, blockIdentifier) {
    var renderedInputs = {};
    for (var _i = 0, _a = Object.entries(inputs); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        renderedInputs[key] = renderTemplateData(value, {
            secrets: extractFQSNMap(value, [blockIdentifier]),
        });
    }
    return renderedInputs;
}
function mergeOverrides(block, overrides) {
    for (var key in overrides) {
        if (overrides.hasOwnProperty(key)) {
            block[key] = overrides[key];
        }
    }
    return block;
}
function formatZodError(error) {
    if (error.errors && Array.isArray(error.errors)) {
        return error.errors
            .map(function (e) {
            var path = e.path.length > 0 ? "".concat(e.path.join("."), ": ") : "";
            return "".concat(path).concat(e.message);
        })
            .join(", ");
    }
    return error.message || "Validation failed";
}
