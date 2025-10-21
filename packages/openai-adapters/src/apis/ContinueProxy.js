"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.ContinueProxyApi = void 0;
var OpenAI_js_1 = require("./OpenAI.js");
var ContinueProxyApi = /** @class */ (function (_super) {
    __extends(ContinueProxyApi, _super);
    function ContinueProxyApi(config) {
        var _this = this;
        var _a, _b;
        // Convert ContinueProxyConfigSchema to OpenAIConfigSchema format
        var openaiConfig = {
            provider: "openai",
            apiKey: config.apiKey,
            apiBase: ((_a = config.env) === null || _a === void 0 ? void 0 : _a.proxyUrl)
                ? new URL("model-proxy/v1/", (_b = config.env) === null || _b === void 0 ? void 0 : _b.proxyUrl).toString()
                : "https://api.continue.dev/model-proxy/v1/",
            requestOptions: config.requestOptions,
        };
        _this = _super.call(this, openaiConfig) || this;
        _this.continueProxyConfig = config;
        _this.configEnv = config.env;
        _this.actualApiBase = config.apiBase;
        return _this;
    }
    ContinueProxyApi.prototype.extraBodyProperties = function () {
        var _a, _b, _c, _d;
        var continueProperties = {
            apiKeyLocation: (_a = this.continueProxyConfig.env) === null || _a === void 0 ? void 0 : _a.apiKeyLocation,
            envSecretLocations: (_b = this.continueProxyConfig.env) === null || _b === void 0 ? void 0 : _b.envSecretLocations,
            apiBase: this.actualApiBase,
            orgScopeId: (_d = (_c = this.continueProxyConfig.env) === null || _c === void 0 ? void 0 : _c.orgScopeId) !== null && _d !== void 0 ? _d : null,
            env: this.configEnv,
        };
        return {
            continueProperties: continueProperties,
        };
    };
    ContinueProxyApi.prototype.modifyBodyWithContinueProperties = function (body) {
        return __assign(__assign({}, body), this.extraBodyProperties());
    };
    ContinueProxyApi.prototype.modifyChatBody = function (body) {
        // First apply OpenAI-specific modifications
        var modifiedBody = _super.prototype.modifyChatBody.call(this, body);
        // Then add Continue properties
        return this.modifyBodyWithContinueProperties(modifiedBody);
    };
    ContinueProxyApi.prototype.modifyCompletionBody = function (body) {
        return this.modifyBodyWithContinueProperties(body);
    };
    ContinueProxyApi.prototype.modifyFimBody = function (body) {
        var modifiedBody = _super.prototype.modifyFimBody.call(this, body);
        return this.modifyBodyWithContinueProperties(modifiedBody);
    };
    ContinueProxyApi.prototype.getHeaders = function () {
        var _a;
        return {
            "Content-Type": "application/json",
            Accept: "application/json",
            "x-api-key": (_a = this.continueProxyConfig.apiKey) !== null && _a !== void 0 ? _a : "",
            Authorization: "Bearer ".concat(this.continueProxyConfig.apiKey),
        };
    };
    ContinueProxyApi.prototype.modifyEmbedBody = function (body) {
        return this.modifyBodyWithContinueProperties(body);
    };
    ContinueProxyApi.prototype.modifyRerankBody = function (body) {
        return __assign(__assign({}, body), this.extraBodyProperties());
    };
    return ContinueProxyApi;
}(OpenAI_js_1.OpenAIApi));
exports.ContinueProxyApi = ContinueProxyApi;
