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
var client_sagemaker_runtime_1 = require("@aws-sdk/client-sagemaker-runtime");
var credential_providers_1 = require("@aws-sdk/credential-providers");
// @ts-ignore
var jinja_js_1 = require("jinja-js");
var index_js_1 = require("../index.js");
var SageMaker = /** @class */ (function (_super) {
    __extends(SageMaker, _super);
    function SageMaker(options) {
        var _a;
        var _this = _super.call(this, options) || this;
        if (!options.apiBase) {
            _this.apiBase = "https://runtime.sagemaker.".concat(options.region, ".amazonaws.com");
        }
        (_a = _this.profile) !== null && _a !== void 0 ? _a : (_this.profile = SageMaker.DEFAULT_PROFILE_NAME);
        return _this;
    }
    SageMaker.prototype._streamComplete = function (prompt, signal, options) {
        return __asyncGenerator(this, arguments, function _streamComplete_1() {
            var credentials, client, toolkit, command, response, buffer, _a, _b, _c, rawValue, binaryChunk, value, position, line, data, text, e_1, e_2_1;
            var _d, e_2, _e, _f;
            var _g;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0: return [4 /*yield*/, __await(this._getCredentials())];
                    case 1:
                        credentials = _h.sent();
                        client = new client_sagemaker_runtime_1.SageMakerRuntimeClient({
                            region: this.region,
                            credentials: {
                                accessKeyId: credentials.accessKeyId,
                                secretAccessKey: credentials.secretAccessKey,
                                sessionToken: credentials.sessionToken || "",
                            },
                        });
                        toolkit = new CompletionAPIToolkit(this);
                        command = toolkit.generateCommand([], prompt, options);
                        return [4 /*yield*/, __await(client.send(command, { abortSignal: signal }))];
                    case 2:
                        response = _h.sent();
                        if (!response.Body) return [3 /*break*/, 21];
                        buffer = "";
                        _h.label = 3;
                    case 3:
                        _h.trys.push([3, 15, 16, 21]);
                        _a = true, _b = __asyncValues(response.Body);
                        _h.label = 4;
                    case 4: return [4 /*yield*/, __await(_b.next())];
                    case 5:
                        if (!(_c = _h.sent(), _d = _c.done, !_d)) return [3 /*break*/, 14];
                        _f = _c.value;
                        _a = false;
                        rawValue = _f;
                        binaryChunk = (_g = rawValue.PayloadPart) === null || _g === void 0 ? void 0 : _g.Bytes;
                        value = new TextDecoder().decode(binaryChunk);
                        buffer += value;
                        position = void 0;
                        _h.label = 6;
                    case 6:
                        if (!((position = buffer.indexOf("\n")) >= 0)) return [3 /*break*/, 13];
                        line = buffer.slice(0, position);
                        _h.label = 7;
                    case 7:
                        _h.trys.push([7, 11, , 12]);
                        data = JSON.parse(line.replace(/^data:/, ""));
                        text = undefined;
                        if ("choices" in data) {
                            if ("delta" in data.choices[0]) {
                                text = data.choices[0].delta.content;
                            }
                            else {
                                text = data.choices[0].text;
                            }
                        }
                        else if ("token" in data) {
                            text = data.token.text;
                        }
                        if (!(text !== undefined)) return [3 /*break*/, 10];
                        return [4 /*yield*/, __await(text)];
                    case 8: return [4 /*yield*/, _h.sent()];
                    case 9:
                        _h.sent();
                        _h.label = 10;
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        e_1 = _h.sent();
                        return [3 /*break*/, 12];
                    case 12:
                        buffer = buffer.slice(position + 1);
                        return [3 /*break*/, 6];
                    case 13:
                        _a = true;
                        return [3 /*break*/, 4];
                    case 14: return [3 /*break*/, 21];
                    case 15:
                        e_2_1 = _h.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 21];
                    case 16:
                        _h.trys.push([16, , 19, 20]);
                        if (!(!_a && !_d && (_e = _b.return))) return [3 /*break*/, 18];
                        return [4 /*yield*/, __await(_e.call(_b))];
                    case 17:
                        _h.sent();
                        _h.label = 18;
                    case 18: return [3 /*break*/, 20];
                    case 19:
                        if (e_2) throw e_2.error;
                        return [7 /*endfinally*/];
                    case 20: return [7 /*endfinally*/];
                    case 21: return [2 /*return*/];
                }
            });
        });
    };
    SageMaker.prototype._streamChat = function (messages, signal, options) {
        return __asyncGenerator(this, arguments, function _streamChat_1() {
            var credentials, client, toolkit, command, response, buffer, _a, _b, _c, rawValue, binaryChunk, value, position, line, data, text, e_3, e_4_1;
            var _d, e_4, _e, _f;
            var _g;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0: return [4 /*yield*/, __await(this._getCredentials())];
                    case 1:
                        credentials = _h.sent();
                        client = new client_sagemaker_runtime_1.SageMakerRuntimeClient({
                            region: this.region,
                            credentials: {
                                accessKeyId: credentials.accessKeyId,
                                secretAccessKey: credentials.secretAccessKey,
                                sessionToken: credentials.sessionToken || "",
                            },
                        });
                        toolkit = new MessageAPIToolkit(this);
                        command = toolkit.generateCommand(messages, "", options);
                        return [4 /*yield*/, __await(client.send(command, { abortSignal: signal }))];
                    case 2:
                        response = _h.sent();
                        if (!response.Body) return [3 /*break*/, 21];
                        buffer = "";
                        _h.label = 3;
                    case 3:
                        _h.trys.push([3, 15, 16, 21]);
                        _a = true, _b = __asyncValues(response.Body);
                        _h.label = 4;
                    case 4: return [4 /*yield*/, __await(_b.next())];
                    case 5:
                        if (!(_c = _h.sent(), _d = _c.done, !_d)) return [3 /*break*/, 14];
                        _f = _c.value;
                        _a = false;
                        rawValue = _f;
                        binaryChunk = (_g = rawValue.PayloadPart) === null || _g === void 0 ? void 0 : _g.Bytes;
                        value = new TextDecoder().decode(binaryChunk);
                        buffer += value;
                        position = void 0;
                        _h.label = 6;
                    case 6:
                        if (!((position = buffer.indexOf("\n")) >= 0)) return [3 /*break*/, 13];
                        line = buffer.slice(0, position);
                        _h.label = 7;
                    case 7:
                        _h.trys.push([7, 11, , 12]);
                        data = JSON.parse(line.replace(/^data:/, ""));
                        text = undefined;
                        if ("choices" in data) {
                            if ("delta" in data.choices[0]) {
                                text = data.choices[0].delta.content;
                            }
                            else {
                                text = data.choices[0].text;
                            }
                        }
                        else if ("token" in data) {
                            text = data.token.text;
                        }
                        if (!(text !== undefined)) return [3 /*break*/, 10];
                        return [4 /*yield*/, __await({ role: "assistant", content: text })];
                    case 8: return [4 /*yield*/, _h.sent()];
                    case 9:
                        _h.sent();
                        _h.label = 10;
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        e_3 = _h.sent();
                        return [3 /*break*/, 12];
                    case 12:
                        buffer = buffer.slice(position + 1);
                        return [3 /*break*/, 6];
                    case 13:
                        _a = true;
                        return [3 /*break*/, 4];
                    case 14: return [3 /*break*/, 21];
                    case 15:
                        e_4_1 = _h.sent();
                        e_4 = { error: e_4_1 };
                        return [3 /*break*/, 21];
                    case 16:
                        _h.trys.push([16, , 19, 20]);
                        if (!(!_a && !_d && (_e = _b.return))) return [3 /*break*/, 18];
                        return [4 /*yield*/, __await(_e.call(_b))];
                    case 17:
                        _h.sent();
                        _h.label = 18;
                    case 18: return [3 /*break*/, 20];
                    case 19:
                        if (e_4) throw e_4.error;
                        return [7 /*endfinally*/];
                    case 20: return [7 /*endfinally*/];
                    case 21: return [2 /*return*/];
                }
            });
        });
    };
    SageMaker.prototype._getCredentials = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 4]);
                        return [4 /*yield*/, (0, credential_providers_1.fromNodeProviderChain)({
                                profile: this.profile,
                            })()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_5 = _a.sent();
                        console.warn("AWS profile with name ".concat(this.profile, " not found in ~/.aws/credentials, using default profile"));
                        return [4 /*yield*/, (0, credential_providers_1.fromNodeProviderChain)()()];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SageMaker.prototype._embed = function (chunks) {
        return __awaiter(this, void 0, void 0, function () {
            var credentials, client, input, command, response, decoder, decoded, responseBody, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._getCredentials()];
                    case 1:
                        credentials = _a.sent();
                        client = new client_sagemaker_runtime_1.SageMakerRuntimeClient({
                            region: this.region,
                            credentials: {
                                accessKeyId: credentials.accessKeyId,
                                secretAccessKey: credentials.secretAccessKey,
                                sessionToken: credentials.sessionToken || "",
                            },
                        });
                        input = this._generateInvokeModelCommandInput(chunks);
                        command = new client_sagemaker_runtime_1.InvokeEndpointCommand(input);
                        return [4 /*yield*/, client.send(command)];
                    case 2:
                        response = _a.sent();
                        if (response.Body) {
                            decoder = new TextDecoder();
                            decoded = decoder.decode(response.Body);
                            try {
                                responseBody = JSON.parse(decoded);
                                // If the body contains a key called "embedding" or "embeddings", return the value, otherwise return the whole body
                                if (responseBody.embedding) {
                                    return [2 /*return*/, responseBody.embedding];
                                }
                                else if (responseBody.embeddings) {
                                    return [2 /*return*/, responseBody.embeddings];
                                }
                                else {
                                    return [2 /*return*/, responseBody];
                                }
                            }
                            catch (e) {
                                message = e instanceof Error ? e.message : String(e);
                                throw new Error("Failed to parse response from SageMaker:\n".concat(decoded, "\nError: ").concat(message));
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    SageMaker.prototype._generateInvokeModelCommandInput = function (prompts) {
        var _a;
        var payload = {
            inputs: prompts,
            normalize: true,
            // ...(options.requestOptions?.extraBodyProperties || {}),
        };
        if ((_a = this.requestOptions) === null || _a === void 0 ? void 0 : _a.extraBodyProperties) {
            Object.assign(payload, this.requestOptions.extraBodyProperties);
        }
        return {
            EndpointName: this.model,
            Body: JSON.stringify(payload),
            ContentType: "application/json",
            CustomAttributes: "accept_eula=false",
        };
    };
    SageMaker.DEFAULT_PROFILE_NAME = "sagemaker";
    SageMaker.providerName = "sagemaker";
    SageMaker.defaultOptions = {
        region: "us-west-2",
        contextLength: 200000,
        maxEmbeddingBatchSize: 1,
    };
    return SageMaker;
}(index_js_1.BaseLLM));
var MessageAPIToolkit = /** @class */ (function () {
    function MessageAPIToolkit(sagemaker) {
        this.sagemaker = sagemaker;
    }
    MessageAPIToolkit.prototype.generateCommand = function (messages, prompt, options) {
        if ("chat_template" in this.sagemaker.completionOptions) {
            // for some model you can apply chat_template to the model
            var prompt_1 = jinja_js_1.default
                .compile(this.sagemaker.completionOptions.chat_template)
                .render({ messages: messages, add_generation_prompt: true }, { autoEscape: false });
            var payload = {
                inputs: prompt_1,
                parameters: this.sagemaker.completionOptions,
                stream: true,
            };
            return new client_sagemaker_runtime_1.InvokeEndpointWithResponseStreamCommand({
                EndpointName: options.model,
                Body: new TextEncoder().encode(JSON.stringify(payload)),
                ContentType: "application/json",
                CustomAttributes: "accept_eula=false",
            });
        }
        else {
            var payload = {
                messages: messages,
                max_tokens: options.maxTokens,
                temperature: options.temperature,
                top_p: options.topP,
                top_k: options.topK,
                stop: options.stop,
                frequencyPenalty: options.frequencyPenalty,
                presencePenalty: options.presencePenalty,
                stream: true,
            };
            return new client_sagemaker_runtime_1.InvokeEndpointWithResponseStreamCommand({
                EndpointName: options.model,
                Body: new TextEncoder().encode(JSON.stringify(payload)),
                ContentType: "application/json",
                CustomAttributes: "accept_eula=false",
            });
        }
    };
    return MessageAPIToolkit;
}());
var CompletionAPIToolkit = /** @class */ (function () {
    function CompletionAPIToolkit(sagemaker) {
        this.sagemaker = sagemaker;
    }
    CompletionAPIToolkit.prototype.generateCommand = function (messages, prompt, options) {
        var payload = {
            inputs: prompt,
            prompt: prompt,
            parameters: this.sagemaker.completionOptions,
            stream: true,
        };
        return new client_sagemaker_runtime_1.InvokeEndpointWithResponseStreamCommand({
            EndpointName: options.model,
            Body: new TextEncoder().encode(JSON.stringify(payload)),
            ContentType: "application/json",
            CustomAttributes: "accept_eula=false",
        });
    };
    return CompletionAPIToolkit;
}());
exports.default = SageMaker;
