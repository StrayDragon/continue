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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
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
var fetch_1 = require("@continuedev/fetch");
var messageContent_js_1 = require("../../util/messageContent.js");
var index_js_1 = require("../index.js");
var openaiTypeConverters_js_1 = require("../openaiTypeConverters.js");
var NON_CHAT_MODELS = [
    "text-davinci-002",
    "text-davinci-003",
    "code-davinci-002",
    "text-ada-001",
    "text-babbage-001",
    "text-curie-001",
    "davinci",
    "curie",
    "babbage",
    "ada",
];
function isChatOnlyModel(model) {
    // gpt and o-series models
    return model.startsWith("gpt") || model.startsWith("o");
}
var formatMessageForO1OrGpt5 = function (messages) {
    return messages === null || messages === void 0 ? void 0 : messages.map(function (message) {
        if ((message === null || message === void 0 ? void 0 : message.role) === "system") {
            return __assign(__assign({}, message), { role: "developer" });
        }
        return message;
    });
};
var OpenAI = /** @class */ (function (_super) {
    __extends(OpenAI, _super);
    function OpenAI(options) {
        var _a;
        var _this = _super.call(this, options) || this;
        _this.useLegacyCompletionsEndpoint = undefined;
        _this.useOpenAIAdapterFor = [
            "chat",
            "embed",
            "list",
            "rerank",
            "streamChat",
            "streamFim",
        ];
        _this.useLegacyCompletionsEndpoint = options.useLegacyCompletionsEndpoint;
        _this.apiVersion = (_a = options.apiVersion) !== null && _a !== void 0 ? _a : "2023-07-01-preview";
        return _this;
    }
    OpenAI.prototype._convertModelName = function (model) {
        return model;
    };
    OpenAI.prototype.isOSeriesOrGpt5Model = function (model) {
        return !!model && (!!model.match(/^o[0-9]+/) || model.includes("gpt-5"));
    };
    OpenAI.prototype.isFireworksAiModel = function (model) {
        return !!model && model.startsWith("accounts/fireworks/models");
    };
    OpenAI.prototype.supportsPrediction = function (model) {
        var SUPPORTED_MODELS = [
            "gpt-4o-mini",
            "gpt-4o",
            "mistral-large",
            "Fast-Apply",
        ];
        return SUPPORTED_MODELS.some(function (m) { return model.includes(m); });
    };
    OpenAI.prototype.convertTool = function (tool) {
        return {
            type: tool.type,
            function: {
                name: tool.function.name,
                description: tool.function.description,
                parameters: tool.function.parameters,
                strict: tool.function.strict,
            },
        };
    };
    OpenAI.prototype.extraBodyProperties = function () {
        return {};
    };
    OpenAI.prototype.getMaxStopWords = function () {
        var url = new URL(this.apiBase);
        if (this.maxStopWords !== undefined) {
            return this.maxStopWords;
        }
        else if (url.host === "api.deepseek.com") {
            return 16;
        }
        else if (url.port === "1337" ||
            url.host === "api.openai.com" ||
            url.host === "api.groq.com" ||
            this.apiType === "azure") {
            return 4;
        }
        else {
            return Infinity;
        }
    };
    OpenAI.prototype._convertArgs = function (options, messages) {
        var _a;
        var finalOptions = (0, openaiTypeConverters_js_1.toChatBody)(messages, options);
        finalOptions.stop = (_a = options.stop) === null || _a === void 0 ? void 0 : _a.slice(0, this.getMaxStopWords());
        // OpenAI o1-preview and o1-mini or o3-mini:
        if (this.isOSeriesOrGpt5Model(options.model)) {
            // a) use max_completion_tokens instead of max_tokens
            finalOptions.max_completion_tokens = options.maxTokens;
            finalOptions.max_tokens = undefined;
            // b) don't support system message
            finalOptions.messages = formatMessageForO1OrGpt5(finalOptions.messages);
        }
        if (options.model === "o1") {
            finalOptions.stream = false;
        }
        if (options.prediction && this.supportsPrediction(options.model)) {
            if (finalOptions.presence_penalty) {
                // prediction doesn't support > 0
                finalOptions.presence_penalty = undefined;
            }
            if (finalOptions.frequency_penalty) {
                // prediction doesn't support > 0
                finalOptions.frequency_penalty = undefined;
            }
            finalOptions.max_completion_tokens = undefined;
            finalOptions.prediction = options.prediction;
        }
        else {
            finalOptions.prediction = undefined;
        }
        return finalOptions;
    };
    OpenAI.prototype._getHeaders = function () {
        var _a;
        return __assign(__assign({ "Content-Type": "application/json" }, (this.apiKey && { Authorization: "Bearer ".concat(this.apiKey) })), { "api-key": (_a = this.apiKey) !== null && _a !== void 0 ? _a : "" });
    };
    OpenAI.prototype._complete = function (prompt, signal, options) {
        return __awaiter(this, void 0, void 0, function () {
            var completion, _a, _b, _c, chunk, e_1_1;
            var _d, e_1, _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        completion = "";
                        _g.label = 1;
                    case 1:
                        _g.trys.push([1, 6, 7, 12]);
                        _a = true, _b = __asyncValues(this._streamChat([{ role: "user", content: prompt }], signal, options));
                        _g.label = 2;
                    case 2: return [4 /*yield*/, _b.next()];
                    case 3:
                        if (!(_c = _g.sent(), _d = _c.done, !_d)) return [3 /*break*/, 5];
                        _f = _c.value;
                        _a = false;
                        chunk = _f;
                        completion += chunk.content;
                        _g.label = 4;
                    case 4:
                        _a = true;
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 12];
                    case 6:
                        e_1_1 = _g.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 12];
                    case 7:
                        _g.trys.push([7, , 10, 11]);
                        if (!(!_a && !_d && (_e = _b.return))) return [3 /*break*/, 9];
                        return [4 /*yield*/, _e.call(_b)];
                    case 8:
                        _g.sent();
                        _g.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 11: return [7 /*endfinally*/];
                    case 12: return [2 /*return*/, completion];
                }
            });
        });
    };
    OpenAI.prototype._getEndpoint = function (endpoint) {
        var _a;
        if (!this.apiBase) {
            throw new Error("No API base URL provided. Please set the 'apiBase' option in config.json");
        }
        if ((_a = this.apiType) === null || _a === void 0 ? void 0 : _a.includes("azure")) {
            // Default is `azure-openai`, but previously was `azure`
            var isAzureOpenAI = this.apiType === "azure-openai" || this.apiType === "azure";
            var path = isAzureOpenAI
                ? "openai/deployments/".concat(this.deployment, "/").concat(endpoint)
                : endpoint;
            var version = this.apiVersion ? "?api-version=".concat(this.apiVersion) : "";
            return new URL("".concat(path).concat(version), this.apiBase);
        }
        return new URL(endpoint, this.apiBase);
    };
    OpenAI.prototype._streamComplete = function (prompt, signal, options) {
        return __asyncGenerator(this, arguments, function _streamComplete_1() {
            var _a, _b, _c, chunk, e_2_1;
            var _d, e_2, _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _g.trys.push([0, 7, 8, 13]);
                        _a = true, _b = __asyncValues(this._streamChat([{ role: "user", content: prompt }], signal, options));
                        _g.label = 1;
                    case 1: return [4 /*yield*/, __await(_b.next())];
                    case 2:
                        if (!(_c = _g.sent(), _d = _c.done, !_d)) return [3 /*break*/, 6];
                        _f = _c.value;
                        _a = false;
                        chunk = _f;
                        return [4 /*yield*/, __await((0, messageContent_js_1.renderChatMessage)(chunk))];
                    case 3: return [4 /*yield*/, _g.sent()];
                    case 4:
                        _g.sent();
                        _g.label = 5;
                    case 5:
                        _a = true;
                        return [3 /*break*/, 1];
                    case 6: return [3 /*break*/, 13];
                    case 7:
                        e_2_1 = _g.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 13];
                    case 8:
                        _g.trys.push([8, , 11, 12]);
                        if (!(!_a && !_d && (_e = _b.return))) return [3 /*break*/, 10];
                        return [4 /*yield*/, __await(_e.call(_b))];
                    case 9:
                        _g.sent();
                        _g.label = 10;
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        if (e_2) throw e_2.error;
                        return [7 /*endfinally*/];
                    case 12: return [7 /*endfinally*/];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    OpenAI.prototype.modifyChatBody = function (body) {
        var _a, _b;
        body.stop = (_a = body.stop) === null || _a === void 0 ? void 0 : _a.slice(0, this.getMaxStopWords());
        // OpenAI o1-preview and o1-mini or o3-mini:
        if (this.isOSeriesOrGpt5Model(body.model)) {
            // a) use max_completion_tokens instead of max_tokens
            body.max_completion_tokens = body.max_tokens;
            body.max_tokens = undefined;
            // b) don't support system message
            body.messages = formatMessageForO1OrGpt5(body.messages);
        }
        if (body.model === "o1") {
            // o1 doesn't support streaming
            body.stream = false;
        }
        if (body.prediction && this.supportsPrediction(body.model)) {
            if (body.presence_penalty) {
                // prediction doesn't support > 0
                body.presence_penalty = undefined;
            }
            if (body.frequency_penalty) {
                // prediction doesn't support > 0
                body.frequency_penalty = undefined;
            }
            body.max_completion_tokens = undefined;
        }
        if ((_b = body.tools) === null || _b === void 0 ? void 0 : _b.length) {
            if (this.isFireworksAiModel(body.model)) {
                // fireworks.ai does not support parallel tool calls, but their api expects this to be true anyway otherwise they return an error.
                // tooling works with them as a inference provider once this is set to true.
                // https://docs.fireworks.ai/guides/function-calling#openai-compatibility
                body.parallel_tool_calls = true;
            }
            // To ensure schema adherence: https://platform.openai.com/docs/guides/function-calling#parallel-function-calling-and-structured-outputs
            // In practice, setting this to true and asking for multiple tool calls
            // leads to "arguments" being something like '{"file": "test.ts"}{"file": "test.js"}'
            // o3 does not support this
            if (!body.model.startsWith("o3")) {
                body.parallel_tool_calls = false;
            }
        }
        return body;
    };
    OpenAI.prototype._legacystreamComplete = function (prompt, signal, options) {
        return __asyncGenerator(this, arguments, function _legacystreamComplete_1() {
            var args, response, _a, _b, _c, value, e_3_1;
            var _d, e_3, _e, _f;
            var _g, _h;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        args = this._convertArgs(options, []);
                        args.prompt = prompt;
                        args.messages = undefined;
                        return [4 /*yield*/, __await(this.fetch(this._getEndpoint("completions"), {
                                method: "POST",
                                headers: this._getHeaders(),
                                body: JSON.stringify(__assign(__assign(__assign({}, args), { stream: true }), this.extraBodyProperties())),
                                signal: signal,
                            }))];
                    case 1:
                        response = _j.sent();
                        _j.label = 2;
                    case 2:
                        _j.trys.push([2, 9, 10, 15]);
                        _a = true, _b = __asyncValues((0, fetch_1.streamSse)(response));
                        _j.label = 3;
                    case 3: return [4 /*yield*/, __await(_b.next())];
                    case 4:
                        if (!(_c = _j.sent(), _d = _c.done, !_d)) return [3 /*break*/, 8];
                        _f = _c.value;
                        _a = false;
                        value = _f;
                        if (!(((_h = (_g = value.choices) === null || _g === void 0 ? void 0 : _g[0]) === null || _h === void 0 ? void 0 : _h.text) && value.finish_reason !== "eos")) return [3 /*break*/, 7];
                        return [4 /*yield*/, __await(value.choices[0].text)];
                    case 5: return [4 /*yield*/, _j.sent()];
                    case 6:
                        _j.sent();
                        _j.label = 7;
                    case 7:
                        _a = true;
                        return [3 /*break*/, 3];
                    case 8: return [3 /*break*/, 15];
                    case 9:
                        e_3_1 = _j.sent();
                        e_3 = { error: e_3_1 };
                        return [3 /*break*/, 15];
                    case 10:
                        _j.trys.push([10, , 13, 14]);
                        if (!(!_a && !_d && (_e = _b.return))) return [3 /*break*/, 12];
                        return [4 /*yield*/, __await(_e.call(_b))];
                    case 11:
                        _j.sent();
                        _j.label = 12;
                    case 12: return [3 /*break*/, 14];
                    case 13:
                        if (e_3) throw e_3.error;
                        return [7 /*endfinally*/];
                    case 14: return [7 /*endfinally*/];
                    case 15: return [2 /*return*/];
                }
            });
        });
    };
    OpenAI.prototype._streamChat = function (messages, signal, options) {
        return __asyncGenerator(this, arguments, function _streamChat_1() {
            var _a, _b, _c, content, e_4_1, body, response, data, _d, _e, _f, value, chunk, e_5_1;
            var _g, e_4, _h, _j, _k, e_5, _l, _m;
            return __generator(this, function (_o) {
                switch (_o.label) {
                    case 0:
                        if (!(!isChatOnlyModel(options.model) &&
                            this.supportsCompletions() &&
                            (NON_CHAT_MODELS.includes(options.model) ||
                                this.useLegacyCompletionsEndpoint ||
                                options.raw))) return [3 /*break*/, 16];
                        _o.label = 1;
                    case 1:
                        _o.trys.push([1, 8, 9, 14]);
                        _a = true, _b = __asyncValues(this._legacystreamComplete((0, messageContent_js_1.renderChatMessage)(messages[messages.length - 1]), signal, options));
                        _o.label = 2;
                    case 2: return [4 /*yield*/, __await(_b.next())];
                    case 3:
                        if (!(_c = _o.sent(), _g = _c.done, !_g)) return [3 /*break*/, 7];
                        _j = _c.value;
                        _a = false;
                        content = _j;
                        return [4 /*yield*/, __await({
                                role: "assistant",
                                content: content,
                            })];
                    case 4: return [4 /*yield*/, _o.sent()];
                    case 5:
                        _o.sent();
                        _o.label = 6;
                    case 6:
                        _a = true;
                        return [3 /*break*/, 2];
                    case 7: return [3 /*break*/, 14];
                    case 8:
                        e_4_1 = _o.sent();
                        e_4 = { error: e_4_1 };
                        return [3 /*break*/, 14];
                    case 9:
                        _o.trys.push([9, , 12, 13]);
                        if (!(!_a && !_g && (_h = _b.return))) return [3 /*break*/, 11];
                        return [4 /*yield*/, __await(_h.call(_b))];
                    case 10:
                        _o.sent();
                        _o.label = 11;
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        if (e_4) throw e_4.error;
                        return [7 /*endfinally*/];
                    case 13: return [7 /*endfinally*/];
                    case 14: return [4 /*yield*/, __await(void 0)];
                    case 15: return [2 /*return*/, _o.sent()];
                    case 16:
                        body = this._convertArgs(options, messages);
                        return [4 /*yield*/, __await(this.fetch(this._getEndpoint("chat/completions"), {
                                method: "POST",
                                headers: this._getHeaders(),
                                body: JSON.stringify(__assign(__assign({}, body), this.extraBodyProperties())),
                                signal: signal,
                            }))];
                    case 17:
                        response = _o.sent();
                        if (!(body.stream === false)) return [3 /*break*/, 24];
                        if (!(response.status === 499)) return [3 /*break*/, 19];
                        return [4 /*yield*/, __await(void 0)];
                    case 18: return [2 /*return*/, _o.sent()]; // Aborted by user
                    case 19: return [4 /*yield*/, __await(response.json())];
                    case 20:
                        data = _o.sent();
                        return [4 /*yield*/, __await(data.choices[0].message)];
                    case 21: return [4 /*yield*/, _o.sent()];
                    case 22:
                        _o.sent();
                        return [4 /*yield*/, __await(void 0)];
                    case 23: return [2 /*return*/, _o.sent()];
                    case 24:
                        _o.trys.push([24, 31, 32, 37]);
                        _d = true, _e = __asyncValues((0, fetch_1.streamSse)(response));
                        _o.label = 25;
                    case 25: return [4 /*yield*/, __await(_e.next())];
                    case 26:
                        if (!(_f = _o.sent(), _k = _f.done, !_k)) return [3 /*break*/, 30];
                        _m = _f.value;
                        _d = false;
                        value = _m;
                        chunk = (0, openaiTypeConverters_js_1.fromChatCompletionChunk)(value);
                        if (!chunk) return [3 /*break*/, 29];
                        return [4 /*yield*/, __await(chunk)];
                    case 27: return [4 /*yield*/, _o.sent()];
                    case 28:
                        _o.sent();
                        _o.label = 29;
                    case 29:
                        _d = true;
                        return [3 /*break*/, 25];
                    case 30: return [3 /*break*/, 37];
                    case 31:
                        e_5_1 = _o.sent();
                        e_5 = { error: e_5_1 };
                        return [3 /*break*/, 37];
                    case 32:
                        _o.trys.push([32, , 35, 36]);
                        if (!(!_d && !_k && (_l = _e.return))) return [3 /*break*/, 34];
                        return [4 /*yield*/, __await(_l.call(_e))];
                    case 33:
                        _o.sent();
                        _o.label = 34;
                    case 34: return [3 /*break*/, 36];
                    case 35:
                        if (e_5) throw e_5.error;
                        return [7 /*endfinally*/];
                    case 36: return [7 /*endfinally*/];
                    case 37: return [2 /*return*/];
                }
            });
        });
    };
    OpenAI.prototype._streamFim = function (prefix, suffix, signal, options) {
        return __asyncGenerator(this, arguments, function _streamFim_1() {
            var endpoint, resp, _a, _b, _c, chunk, e_6_1;
            var _d, e_6, _e, _f;
            var _g;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        endpoint = new URL("fim/completions", this.apiBase);
                        return [4 /*yield*/, __await(this.fetch(endpoint, {
                                method: "POST",
                                body: JSON.stringify(__assign({ model: options.model, prompt: prefix, suffix: suffix, max_tokens: options.maxTokens, temperature: options.temperature, top_p: options.topP, frequency_penalty: options.frequencyPenalty, presence_penalty: options.presencePenalty, stop: options.stop, stream: true }, this.extraBodyProperties())),
                                headers: {
                                    "Content-Type": "application/json",
                                    Accept: "application/json",
                                    "x-api-key": (_g = this.apiKey) !== null && _g !== void 0 ? _g : "",
                                    Authorization: "Bearer ".concat(this.apiKey),
                                },
                                signal: signal,
                            }))];
                    case 1:
                        resp = _h.sent();
                        _h.label = 2;
                    case 2:
                        _h.trys.push([2, 9, 10, 15]);
                        _a = true, _b = __asyncValues((0, fetch_1.streamSse)(resp));
                        _h.label = 3;
                    case 3: return [4 /*yield*/, __await(_b.next())];
                    case 4:
                        if (!(_c = _h.sent(), _d = _c.done, !_d)) return [3 /*break*/, 8];
                        _f = _c.value;
                        _a = false;
                        chunk = _f;
                        return [4 /*yield*/, __await(chunk.choices[0].delta.content)];
                    case 5: return [4 /*yield*/, _h.sent()];
                    case 6:
                        _h.sent();
                        _h.label = 7;
                    case 7:
                        _a = true;
                        return [3 /*break*/, 3];
                    case 8: return [3 /*break*/, 15];
                    case 9:
                        e_6_1 = _h.sent();
                        e_6 = { error: e_6_1 };
                        return [3 /*break*/, 15];
                    case 10:
                        _h.trys.push([10, , 13, 14]);
                        if (!(!_a && !_d && (_e = _b.return))) return [3 /*break*/, 12];
                        return [4 /*yield*/, __await(_e.call(_b))];
                    case 11:
                        _h.sent();
                        _h.label = 12;
                    case 12: return [3 /*break*/, 14];
                    case 13:
                        if (e_6) throw e_6.error;
                        return [7 /*endfinally*/];
                    case 14: return [7 /*endfinally*/];
                    case 15: return [2 /*return*/];
                }
            });
        });
    };
    OpenAI.prototype.listModels = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetch(this._getEndpoint("models"), {
                            method: "GET",
                            headers: this._getHeaders(),
                        })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        return [2 /*return*/, data.data.map(function (m) { return m.id; })];
                }
            });
        });
    };
    OpenAI.prototype._getEmbedEndpoint = function () {
        if (!this.apiBase) {
            throw new Error("No API base URL provided. Please set the 'apiBase' option in config.json");
        }
        if (this.apiType === "azure") {
            return new URL("openai/deployments/".concat(this.deployment, "/embeddings?api-version=").concat(this.apiVersion), this.apiBase);
        }
        return new URL("embeddings", this.apiBase);
    };
    OpenAI.prototype._embed = function (chunks) {
        return __awaiter(this, void 0, void 0, function () {
            var resp, _a, data;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.fetch(this._getEmbedEndpoint(), {
                            method: "POST",
                            body: JSON.stringify(__assign({ input: chunks, model: this.model }, this.extraBodyProperties())),
                            headers: {
                                Authorization: "Bearer ".concat(this.apiKey),
                                "Content-Type": "application/json",
                                "api-key": (_b = this.apiKey) !== null && _b !== void 0 ? _b : "", // For Azure
                            },
                        })];
                    case 1:
                        resp = _c.sent();
                        if (!!resp.ok) return [3 /*break*/, 3];
                        _a = Error.bind;
                        return [4 /*yield*/, resp.text()];
                    case 2: throw new (_a.apply(Error, [void 0, _c.sent()]))();
                    case 3: return [4 /*yield*/, resp.json()];
                    case 4:
                        data = (_c.sent());
                        return [2 /*return*/, data.data.map(function (result) { return result.embedding; })];
                }
            });
        });
    };
    OpenAI.providerName = "openai";
    OpenAI.defaultOptions = {
        apiBase: "https://api.openai.com/v1/",
        maxEmbeddingBatchSize: 128,
    };
    return OpenAI;
}(index_js_1.BaseLLM));
exports.default = OpenAI;
