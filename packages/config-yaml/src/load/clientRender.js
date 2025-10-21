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
Object.defineProperty(exports, "__esModule", { value: true });
exports.continuePropertiesSchema = void 0;
exports.renderSecrets = renderSecrets;
exports.getUnrenderedSecretLocation = getUnrenderedSecretLocation;
exports.packageIdentifierToShorthandSlug = packageIdentifierToShorthandSlug;
exports.useProxyForUnrenderedSecrets = useProxyForUnrenderedSecrets;
var zod_1 = require("zod");
var SecretResult_js_1 = require("../interfaces/SecretResult.js");
var slugs_js_1 = require("../interfaces/slugs.js");
var unroll_js_1 = require("./unroll.js");
function renderSecrets(packageIdentifier, unrolledConfigContent, clientSecretStore, orgScopeId, // The "scope" that the user is logged in with
onPremProxyUrl, platformClient) {
    return __awaiter(this, void 0, void 0, function () {
        var secrets, secretsTemplateData, unresolvedFQSNs, secretResults, _i, secretResults_1, secretResult, renderedYaml, parsedYaml, finalConfig;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    secrets = (0, unroll_js_1.getTemplateVariables)(unrolledConfigContent);
                    secretsTemplateData = {};
                    unresolvedFQSNs = secrets.map(function (secret) {
                        return (0, slugs_js_1.decodeFQSN)(secret.replace("secrets.", ""));
                    });
                    if (!platformClient) return [3 /*break*/, 2];
                    return [4 /*yield*/, platformClient.resolveFQSNs(unresolvedFQSNs)];
                case 1:
                    secretResults = _a.sent();
                    // 4. (back to the client) Any “user” secrets that were returned back are added to the local secret store so we don’t have to request them again
                    for (_i = 0, secretResults_1 = secretResults; _i < secretResults_1.length; _i++) {
                        secretResult = secretResults_1[_i];
                        if (!secretResult) {
                            continue;
                        }
                        if ("value" in secretResult) {
                            // clientSecretStore.set(secretResult.fqsn.secretName, secretResult.value);
                            // const secretValue = await clientSecretStore.get(fqsn.secretName);
                            secretsTemplateData[(0, slugs_js_1.encodeFQSN)(secretResult.fqsn)] = secretResult.value;
                        }
                        secretsTemplateData["secrets." + (0, slugs_js_1.encodeFQSN)(secretResult.fqsn)] =
                            "value" in secretResult
                                ? secretResult.value
                                : "${{ secrets.".concat((0, SecretResult_js_1.encodeSecretLocation)(secretResult.secretLocation), " }}");
                    }
                    _a.label = 2;
                case 2:
                    renderedYaml = (0, unroll_js_1.fillTemplateVariables)(unrolledConfigContent, secretsTemplateData);
                    parsedYaml = (0, unroll_js_1.parseAssistantUnrolled)(renderedYaml);
                    finalConfig = useProxyForUnrenderedSecrets(parsedYaml, packageIdentifier, orgScopeId, onPremProxyUrl);
                    return [2 /*return*/, finalConfig];
            }
        });
    });
}
function getUnrenderedSecretLocation(value) {
    if (!value)
        return undefined;
    var templateVars = (0, unroll_js_1.getTemplateVariables)(value);
    if (templateVars.length === 1) {
        var secretLocationEncoded = templateVars[0].split("secrets.")[1];
        try {
            var secretLocation = (0, SecretResult_js_1.decodeSecretLocation)(secretLocationEncoded);
            return secretLocation;
        }
        catch (e) {
            // If it's a templated secret but not a valid secret location, leave it be
            // in case on-prem proxy has the secret in an env variable
            if (templateVars[0].startsWith("secrets.")) {
                return undefined; // TODO
            }
            return undefined;
        }
    }
    return undefined;
}
function packageIdentifierToShorthandSlug(id) {
    switch (id.uriType) {
        case "slug":
            return "".concat(id.fullSlug.ownerSlug, "/").concat(id.fullSlug.packageSlug);
        case "file":
            return "/";
    }
}
function getContinueProxyModelName(packageIdentifier, provider, model) {
    return "".concat(packageIdentifierToShorthandSlug(packageIdentifier), "/").concat(provider, "/").concat(model);
}
function useProxyForUnrenderedSecrets(config, packageIdentifier, orgScopeId, onPremProxyUrl) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    if (config.models) {
        var _loop_1 = function (i) {
            var apiKeyLocation = getUnrenderedSecretLocation((_a = config.models[i]) === null || _a === void 0 ? void 0 : _a.apiKey);
            var encodedApiKeyLocation = apiKeyLocation
                ? (0, SecretResult_js_1.encodeSecretLocation)(apiKeyLocation)
                : undefined;
            var encodedEnvSecretLocations = undefined;
            if ((_b = config.models[i]) === null || _b === void 0 ? void 0 : _b.env) {
                Object.entries((_c = config.models[i]) === null || _c === void 0 ? void 0 : _c.env).forEach(function (_a) {
                    var _b;
                    var key = _a[0], value = _a[1];
                    if (typeof value === "string") {
                        var secretLocation = getUnrenderedSecretLocation(value);
                        if (secretLocation) {
                            encodedEnvSecretLocations = __assign(__assign({}, encodedEnvSecretLocations), (_b = {}, _b[key] = (0, SecretResult_js_1.encodeSecretLocation)(secretLocation), _b));
                        }
                    }
                });
            }
            if (encodedApiKeyLocation || encodedEnvSecretLocations) {
                config.models[i] = __assign(__assign({}, config.models[i]), { name: (_e = (_d = config.models[i]) === null || _d === void 0 ? void 0 : _d.name) !== null && _e !== void 0 ? _e : "", provider: "continue-proxy", model: getContinueProxyModelName(packageIdentifier, (_g = (_f = config.models[i]) === null || _f === void 0 ? void 0 : _f.provider) !== null && _g !== void 0 ? _g : "", (_j = (_h = config.models[i]) === null || _h === void 0 ? void 0 : _h.model) !== null && _j !== void 0 ? _j : ""), apiKeyLocation: encodedApiKeyLocation, envSecretLocations: encodedEnvSecretLocations, orgScopeId: orgScopeId, onPremProxyUrl: onPremProxyUrl, apiKey: undefined });
            }
        };
        for (var i = 0; i < config.models.length; i++) {
            _loop_1(i);
        }
    }
    return config;
}
/** The additional properties that are added to the otherwise OpenAI-compatible body when requesting a Continue proxy */
exports.continuePropertiesSchema = zod_1.z.object({
    apiKeyLocation: zod_1.z.string().optional(),
    envSecretLocations: zod_1.z.record(zod_1.z.string(), zod_1.z.string()).optional(),
    apiBase: zod_1.z.string().optional(),
    orgScopeId: zod_1.z.string().nullable(),
    env: zod_1.z.record(zod_1.z.string(), zod_1.z.any()).optional(),
});
