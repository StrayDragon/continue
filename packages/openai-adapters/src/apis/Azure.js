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
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function () { return this; }, i;
    function awaitReturn(f) { return function (v) { return Promise.resolve(v).then(f, reject); }; }
    function verb(n, f) { if (g[n]) { i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; if (f) i[n] = f(i[n]); } }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AzureApi = void 0;
var index_1 = require("openai/index");
var util_js_1 = require("../util.js");
var OpenAI_js_1 = require("./OpenAI.js");
var AzureApi = /** @class */ (function (_super) {
    __extends(AzureApi, _super);
    function AzureApi(azureConfig) {
        var _this = _super.call(this, __assign(__assign({}, azureConfig), { provider: "openai" })) || this;
        _this.azureConfig = azureConfig;
        var _a = _this._getAzureBaseURL(azureConfig), baseURL = _a.baseURL, defaultQuery = _a.defaultQuery;
        _this.openai = new index_1.OpenAI({
            apiKey: azureConfig.apiKey,
            baseURL: baseURL,
            fetch: (0, util_js_1.customFetch)(azureConfig.requestOptions),
            defaultQuery: defaultQuery,
        });
        return _this;
    }
    /**
     * Default is `azure-openai`, but previously was `azure`
     * @param apiType
     * @returns
     */
    AzureApi.prototype._isAzureOpenAI = function (apiType) {
        return apiType === "azure-openai" || apiType === "azure";
    };
    AzureApi.prototype._getAzureBaseURL = function (config) {
        var _a, _b, _c;
        var url = new URL(this.apiBase);
        // Copy search params to separate object for OpenAI
        var queryParams = {};
        for (var _i = 0, _d = url.searchParams.entries(); _i < _d.length; _i++) {
            var _e = _d[_i], key = _e[0], value = _e[1];
            queryParams[key] = value;
        }
        url.pathname = url.pathname.replace(/\/$/, ""); // Remove trailing slash if present
        url.search = ""; // Clear original search params
        // Default is `azure-openai` in docs, but previously was `azure`
        if (this._isAzureOpenAI((_a = config.env) === null || _a === void 0 ? void 0 : _a.apiType)) {
            if (!((_b = config.env) === null || _b === void 0 ? void 0 : _b.deployment)) {
                throw new Error("`env.deployment` is a required configuration property for Azure OpenAI");
            }
            if (!((_c = config.env) === null || _c === void 0 ? void 0 : _c.apiVersion)) {
                throw new Error("`env.apiVersion` is a required configuration property for Azure OpenAI");
            }
            var basePathname = "openai/deployments/".concat(config.env.deployment);
            url.pathname =
                url.pathname === "/" ? basePathname : "".concat(url.pathname, "/").concat(basePathname);
            queryParams["api-version"] = config.env.apiVersion;
        }
        return {
            baseURL: url.toString(),
            defaultQuery: queryParams,
        };
    };
    /**
     * Filters out empty text content parts from messages.
     *
     * Azure models may not support empty content parts, which can cause issues.
     * This function removes any text content parts that are empty or contain only whitespace.
     */
    AzureApi.prototype._filterEmptyContentParts = function (body) {
        var result = __assign({}, body);
        result.messages = result.messages.map(function (message) {
            if (Array.isArray(message.content)) {
                var filteredContent = message.content.filter(function (part) {
                    return !(part.type === "text" &&
                        (!part.text || part.text.trim() === ""));
                });
                return __assign(__assign({}, message), { content: filteredContent.length > 0 ? filteredContent : message.content });
            }
            return message;
        });
        return result;
    };
    AzureApi.prototype.modifyChatBody = function (body) {
        var modifiedBody = _super.prototype.modifyChatBody.call(this, body);
        modifiedBody = this._filterEmptyContentParts(modifiedBody);
        return modifiedBody;
    };
    AzureApi.prototype.chatCompletionStream = function (body, signal) {
        return __asyncGenerator(this, arguments, function chatCompletionStream_1() {
            var response, _a, response_1, response_1_1, result, e_1_1;
            var _b, e_1, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, __await(this.openai.chat.completions.create(this.modifyChatBody(body), { signal: signal }))];
                    case 1:
                        response = _e.sent();
                        _e.label = 2;
                    case 2:
                        _e.trys.push([2, 9, 10, 15]);
                        _a = true, response_1 = __asyncValues(response);
                        _e.label = 3;
                    case 3: return [4 /*yield*/, __await(response_1.next())];
                    case 4:
                        if (!(response_1_1 = _e.sent(), _b = response_1_1.done, !_b)) return [3 /*break*/, 8];
                        _d = response_1_1.value;
                        _a = false;
                        result = _d;
                        if (!(result.choices && result.choices.length > 0)) return [3 /*break*/, 7];
                        return [4 /*yield*/, __await(result)];
                    case 5: return [4 /*yield*/, _e.sent()];
                    case 6:
                        _e.sent();
                        _e.label = 7;
                    case 7:
                        _a = true;
                        return [3 /*break*/, 3];
                    case 8: return [3 /*break*/, 15];
                    case 9:
                        e_1_1 = _e.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 15];
                    case 10:
                        _e.trys.push([10, , 13, 14]);
                        if (!(!_a && !_b && (_c = response_1.return))) return [3 /*break*/, 12];
                        return [4 /*yield*/, __await(_c.call(response_1))];
                    case 11:
                        _e.sent();
                        _e.label = 12;
                    case 12: return [3 /*break*/, 14];
                    case 13:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 14: return [7 /*endfinally*/];
                    case 15: return [2 /*return*/];
                }
            });
        });
    };
    return AzureApi;
}(OpenAI_js_1.OpenAIApi));
exports.AzureApi = AzureApi;
