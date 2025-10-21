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
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __asyncDelegator = (this && this.__asyncDelegator) || function (o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var google_auth_library_1 = require("google-auth-library");
var fetch_1 = require("@continuedev/fetch");
var messageContent_js_1 = require("../../util/messageContent.js");
var index_js_1 = require("../index.js");
var Anthropic_js_1 = require("./Anthropic.js");
var Gemini_js_1 = require("./Gemini.js");
var VertexAI = /** @class */ (function (_super) {
    __extends(VertexAI, _super);
    /*
        Vertex Supports 3 different URL formats
        1. Standard VertexAI: e.g. https://{location}-aiplatform.googleapis.com/v1/projects/{project}/locations/{location}/publishers/google/models/{model}:streamGenerateContent
        2. Tuned model:       e.g. https://{location}-aiplatform.googleapis.com/v1/projects/{project}/locations/{location}/endpoints/{endpoint}:streamGenerateContent
        3. Express mode:      e.g. https://aiplatform.googleapis.com/v1/publishers/google/models/{model}:streamGenerateContent?key={API_KEY} // see https://cloud.google.com/vertex-ai/generative-ai/docs/start/express-mode/overview
  
        Authentication can be done using the following
        2. Access token obtained using Google Auth client, passed to endpoint that includes full model path with project id and region
        1. API Key (express mode), region and projectId will be ignored
  
        In all cases we have defined apiBase to be up to everything including the location.
        Standard api base: https://{location}-aiplatform.googleapis.com/v1/projects/{project}/locations/{location}/
        Express api base: https://aiplatform.googleapis.com/v1/
        TODO endpoints is not currently supported (api base is same as standard but we don't have a way to add endpoint name yet
  
        Note that VertexAI uses the term "service endpoint" and "model", like:
        {service-endpoint}/v1/{model}:streamGenerateContent
        So "model" includes the project, location, publisher, etc
  
        Express mode has limited support
        and CRITICALLY is only available to NEW users who had NOT used cloud services before.
        However it is pretty common as gemini becomes more popular.
        Only Gemini models are supported for now
        https://cloud.google.com/vertex-ai/generative-ai/docs/start/express-mode/overview#models
    */
    function VertexAI(_options) {
        var _this = this;
        var _a;
        if (_options.region !== "us-central1") {
            // Any region outside of us-central1 has a max batch size of 5.
            _options.maxEmbeddingBatchSize = Math.min((_a = _options.maxEmbeddingBatchSize) !== null && _a !== void 0 ? _a : 5, 5);
        }
        _this = _super.call(this, _options) || this;
        _this.vertexProvider =
            _options.model.includes("mistral") ||
                _options.model.includes("codestral") ||
                _options.model.includes("mixtral")
                ? "mistral"
                : _options.model.includes("claude")
                    ? "anthropic"
                    : _options.model.includes("gemini")
                        ? "gemini"
                        : "unknown";
        // Set client authentication promise
        var apiKey = _options.apiKey, region = _options.region, projectId = _options.projectId, env = _options.env;
        var keyFile = env === null || env === void 0 ? void 0 : env.keyFile;
        var keyJson = env === null || env === void 0 ? void 0 : env.keyJson;
        // Acceptable authentication methods:
        // apiKey only
        // region and projectId AND (keyFile OR keyJson OR nothing)
        if (apiKey) {
            // Consider warning here instead of throwing error
            if (region || projectId || keyFile || keyJson) {
                throw new Error("Vertex in express mode (api key only) cannot be configured with region, projectId, keyFile, or keyJson");
                // console.warn(
                //   "Region, projectId, and key path/file are ignored when apiKey is set. See VertexAI Express Mode docs https://cloud.google.com/vertex-ai/generative-ai/docs/start/express-mode/overview",
                // );
            }
            if (_this.vertexProvider !== "gemini") {
                throw new Error("VertexAI: only gemini models are supported in express (apiKey) mode. See https://cloud.google.com/vertex-ai/generative-ai/docs/start/express-mode/overview#models");
            }
        }
        else {
            if (!region && !projectId) {
                throw new Error("region and projectId are required for VertexAI (when not using express/apiKey mode)");
            }
            if (keyFile && keyJson) {
                throw new Error("VertexAI credentials can be configured with either keyFile or keyJson but not both");
            }
        }
        if (keyJson) {
            // Loading keys from manually set JSON
            if (typeof keyJson !== "string") {
                throw new Error("VertexAI: keyJson must be a JSON string");
            }
            try {
                var parsed = JSON.parse(keyJson);
                if (!(parsed === null || parsed === void 0 ? void 0 : parsed.private_key)) {
                    throw new Error("VertexAI: keyJson must contain a valid private key");
                }
                parsed.private_key = parsed.private_key.replace(/\\n/g, "\n");
                var jsonClient = google_auth_library_1.auth.fromJSON(parsed);
                if (jsonClient instanceof google_auth_library_1.JWT) {
                    jsonClient.scopes = [VertexAI.AUTH_SCOPES];
                }
                else {
                    throw new Error("VertexAI: keyJson must be a valid JWT");
                }
                _this.clientPromise = Promise.resolve(jsonClient);
            }
            catch (e) {
                throw new Error("VertexAI: Failed to parse keyJson");
            }
        }
        else if (keyFile) {
            // Loading keys from manually set file path
            if (typeof keyFile !== "string") {
                throw new Error("VertexAI: keyFile must be a string");
            }
            _this.clientPromise = new google_auth_library_1.GoogleAuth({
                scopes: VertexAI.AUTH_SCOPES,
                keyFile: keyFile,
            })
                .getClient()
                .catch(function (e) {
                console.warn("Failed to load credentials for Vertex AI: ".concat(e.message));
            });
        }
        else {
            // Loading keys from local credentials or environment variable
            _this.clientPromise = new google_auth_library_1.GoogleAuth({
                scopes: VertexAI.AUTH_SCOPES,
            })
                .getClient()
                .catch(function (e) {
                console.warn("Failed to load credentials for Vertex AI: ".concat(e.message));
            });
        }
        // Set api base
        if (!_this.apiBase) {
            if (apiKey) {
                // Express mode
                _this.apiBase = "https://aiplatform.googleapis.com/v1/";
            }
            else {
                _this.apiBase = "https://".concat(region, "-aiplatform.googleapis.com/v1/projects/").concat(projectId, "/locations/").concat(region, "/");
            }
        }
        // Uses instances of other LLMs since underlying functionality is the same
        _this.anthropicInstance = new Anthropic_js_1.default(_options);
        _this.geminiInstance = new Gemini_js_1.default(_options);
        return _this;
    }
    VertexAI.prototype.fetch = function (url, init) {
        return __awaiter(this, void 0, void 0, function () {
            var headers, client, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        headers = {
                            "Content-Type": "application/json",
                        };
                        if (!this.apiKey) return [3 /*break*/, 1];
                        url.searchParams.set("key", this.apiKey);
                        return [3 /*break*/, 4];
                    case 1: return [4 /*yield*/, this.clientPromise];
                    case 2:
                        client = _a.sent();
                        return [4 /*yield*/, (client === null || client === void 0 ? void 0 : client.getAccessToken())];
                    case 3:
                        result = _a.sent();
                        if (!(result === null || result === void 0 ? void 0 : result.token)) {
                            throw new Error("Could not get an access token. Set up your Google Application Default Credentials.");
                        }
                        headers.Authorization = "Bearer ".concat(result.token);
                        _a.label = 4;
                    case 4: return [4 /*yield*/, _super.prototype.fetch.call(this, url, __assign(__assign({}, init), { headers: __assign(__assign({}, init === null || init === void 0 ? void 0 : init.headers), headers) }))];
                    case 5: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Anthropic functions
    VertexAI.prototype._anthropicConvertArgs = function (options) {
        var convertedArgs = this.anthropicInstance.convertArgs(options);
        // Remove the `model` property and add `anthropic_version`
        // For claude 4 models
        // anthropic_version is a required parameter and must be set to "vertex-2024-10-22".
        // const
        var model = convertedArgs.model, finalOptions = __rest(convertedArgs, ["model"]);
        return __assign(__assign({}, finalOptions), { anthropic_version: "vertex-2023-10-16" });
    };
    VertexAI.prototype.StreamChatAnthropic = function (messages, options, signal) {
        return __asyncGenerator(this, arguments, function StreamChatAnthropic_1() {
            var systemMessage, shouldCacheSystemMessage, shouldCachePrompt, apiURL, response;
            var _a, _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        systemMessage = (0, messageContent_js_1.stripImages)((_b = (_a = messages.filter(function (m) { return m.role === "system"; })[0]) === null || _a === void 0 ? void 0 : _a.content) !== null && _b !== void 0 ? _b : "");
                        shouldCacheSystemMessage = !!(((_c = this.cacheBehavior) === null || _c === void 0 ? void 0 : _c.cacheSystemMessage) && systemMessage);
                        shouldCachePrompt = !!((_e = (_d = this.cacheBehavior) === null || _d === void 0 ? void 0 : _d.cacheConversation) !== null && _e !== void 0 ? _e : this.completionOptions.promptCaching);
                        apiURL = new URL("publishers/anthropic/models/".concat(options.model, ":streamRawPredict"), this.apiBase);
                        return [4 /*yield*/, __await(this.fetch(apiURL, {
                                method: "POST",
                                headers: __assign({}, (shouldCacheSystemMessage || shouldCachePrompt
                                    ? { "anthropic-beta": "prompt-caching-2024-07-31" }
                                    : {})),
                                body: JSON.stringify(__assign(__assign({}, this._anthropicConvertArgs(options)), { messages: this.anthropicInstance.convertMessages(messages, shouldCachePrompt), system: shouldCacheSystemMessage
                                        ? [
                                            {
                                                type: "text",
                                                text: systemMessage,
                                                cache_control: { type: "ephemeral" },
                                            },
                                        ]
                                        : systemMessage })),
                                signal: signal,
                            }))];
                    case 1:
                        response = _f.sent();
                        return [5 /*yield**/, __values(__asyncDelegator(__asyncValues(this.anthropicInstance.handleResponse(response, options.stream))))];
                    case 2: return [4 /*yield*/, __await.apply(void 0, [_f.sent()])];
                    case 3:
                        _f.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // Gemini
    VertexAI.prototype.streamChatGemini = function (messages, options, signal) {
        return __asyncGenerator(this, arguments, function streamChatGemini_1() {
            var apiURL, body, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        apiURL = new URL("publishers/google/models/".concat(options.model, ":streamGenerateContent"), this.apiBase);
                        body = this.geminiInstance.prepareBody(messages, options, false, false);
                        return [4 /*yield*/, __await(this.fetch(apiURL, {
                                method: "POST",
                                body: JSON.stringify(body),
                                signal: signal,
                            }))];
                    case 1:
                        response = _a.sent();
                        return [5 /*yield**/, __values(__asyncDelegator(__asyncValues(this.geminiInstance.processGeminiResponse((0, fetch_1.streamResponse)(response)))))];
                    case 2: return [4 /*yield*/, __await.apply(void 0, [_a.sent()])];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    VertexAI.prototype.streamChatBison = function (messages, options, signal) {
        return __asyncGenerator(this, arguments, function streamChatBison_1() {
            var instances, apiURL, body, response, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        instances = messages.map(function (message) { return ({ prompt: message.content }); });
                        apiURL = new URL("publishers/google/models/".concat(options.model, ":predict"), this.apiBase);
                        body = {
                            instances: instances,
                            parameters: {
                                temperature: options.temperature,
                                maxOutputTokens: options.maxTokens,
                                topP: options.topP,
                                topK: options.topK,
                                stopSequences: options.stop,
                                presencePenalty: options.presencePenalty,
                                frequencyPenalty: options.frequencyPenalty,
                            },
                        };
                        return [4 /*yield*/, __await(this.fetch(apiURL, {
                                method: "POST",
                                body: JSON.stringify(body),
                                signal: signal,
                            }))];
                    case 1:
                        response = _a.sent();
                        if (!(response.status === 499)) return [3 /*break*/, 3];
                        return [4 /*yield*/, __await(void 0)];
                    case 2: return [2 /*return*/, _a.sent()]; // Aborted by user
                    case 3: return [4 /*yield*/, __await(response.json())];
                    case 4:
                        data = _a.sent();
                        return [4 /*yield*/, __await({ role: "assistant", content: data.predictions[0].content })];
                    case 5: return [4 /*yield*/, _a.sent()];
                    case 6:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //Mistral
    VertexAI.prototype.StreamChatMistral = function (messages, options, signal) {
        return __asyncGenerator(this, arguments, function StreamChatMistral_1() {
            var apiBase, apiURL, lastMessage, body, response, _a, _b, _c, chunk, e_1_1;
            var _d, e_1, _e, _f;
            var _g, _h;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        apiBase = this.apiBase;
                        apiURL = new URL("publishers/mistralai/models/".concat(options.model, ":streamRawPredict"), apiBase);
                        lastMessage = messages[messages.length - 1];
                        if ((lastMessage === null || lastMessage === void 0 ? void 0 : lastMessage.role) === "assistant") {
                            lastMessage.prefix = true;
                        }
                        body = {
                            model: options.model,
                            temperature: options.temperature,
                            top_p: options.topP,
                            max_tokens: options.maxTokens,
                            stream: (_g = options.stream) !== null && _g !== void 0 ? _g : true,
                            stop: options.stop,
                            messages: messages,
                        };
                        return [4 /*yield*/, __await(this.fetch(apiURL, {
                                method: "POST",
                                body: JSON.stringify(body),
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
                        chunk = _f;
                        if (!((_h = chunk.choices) === null || _h === void 0 ? void 0 : _h[0])) return [3 /*break*/, 7];
                        return [4 /*yield*/, __await(chunk.choices[0].delta)];
                    case 5: 
                    // At the end vertexai will return a empty chunk.
                    return [4 /*yield*/, _j.sent()];
                    case 6:
                        // At the end vertexai will return a empty chunk.
                        _j.sent();
                        _j.label = 7;
                    case 7:
                        _a = true;
                        return [3 /*break*/, 3];
                    case 8: return [3 /*break*/, 15];
                    case 9:
                        e_1_1 = _j.sent();
                        e_1 = { error: e_1_1 };
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
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 14: return [7 /*endfinally*/];
                    case 15: return [2 /*return*/];
                }
            });
        });
    };
    VertexAI.prototype.StreamFimMistral = function (prefix, suffix, signal, options) {
        return __asyncGenerator(this, arguments, function StreamFimMistral_1() {
            var apiBase, apiURL, body, response, _a, _b, _c, chunk, e_2_1;
            var _d, e_2, _e, _f;
            var _g, _h;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        apiBase = this.apiBase;
                        apiURL = new URL("publishers/mistralai/models/".concat(options.model, ":streamRawPredict"), apiBase);
                        body = {
                            model: options.model,
                            max_tokens: options.maxTokens,
                            temperature: options.temperature,
                            top_p: options.topP,
                            stream: (_g = options.stream) !== null && _g !== void 0 ? _g : true,
                            stop: options.stop,
                            prompt: prefix,
                            suffix: suffix,
                        };
                        return [4 /*yield*/, __await(this.fetch(apiURL, {
                                method: "POST",
                                body: JSON.stringify(body),
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
                        chunk = _f;
                        if (!((_h = chunk.choices) === null || _h === void 0 ? void 0 : _h[0].delta)) return [3 /*break*/, 7];
                        return [4 /*yield*/, __await(chunk.choices[0].delta.content)];
                    case 5: return [4 /*yield*/, _j.sent()];
                    case 6:
                        _j.sent();
                        _j.label = 7;
                    case 7:
                        _a = true;
                        return [3 /*break*/, 3];
                    case 8: return [3 /*break*/, 15];
                    case 9:
                        e_2_1 = _j.sent();
                        e_2 = { error: e_2_1 };
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
                        if (e_2) throw e_2.error;
                        return [7 /*endfinally*/];
                    case 14: return [7 /*endfinally*/];
                    case 15: return [2 /*return*/];
                }
            });
        });
    };
    //gecko
    VertexAI.prototype.streamFimGecko = function (prefix, suffix, signal, options) {
        return __asyncGenerator(this, arguments, function streamFimGecko_1() {
            var endpoint, resp;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        endpoint = new URL("publishers/google/models/code-gecko:predict", this.apiBase);
                        return [4 /*yield*/, __await(this.fetch(endpoint, {
                                method: "POST",
                                body: JSON.stringify({
                                    instances: [
                                        {
                                            prefix: prefix,
                                            suffix: suffix,
                                        },
                                    ],
                                    parameters: {
                                        temperature: options.temperature,
                                        maxOutputTokens: Math.min((_a = options.maxTokens) !== null && _a !== void 0 ? _a : 64, 64),
                                        stopSequences: (_b = options.stop) === null || _b === void 0 ? void 0 : _b.splice(0, 5),
                                        frequencyPenalty: options.frequencyPenalty,
                                        presencePenalty: options.frequencyPenalty,
                                    },
                                }),
                                signal: signal,
                            }))];
                    case 1:
                        resp = _c.sent();
                        if (!(resp.status === 499)) return [3 /*break*/, 3];
                        return [4 /*yield*/, __await(void 0)];
                    case 2: return [2 /*return*/, _c.sent()]; // Aborted by user
                    case 3: return [4 /*yield*/, __await(resp.json())];
                    case 4: return [4 /*yield*/, __await.apply(void 0, [(_c.sent()).predictions[0].content])];
                    case 5: 
                    // Streaming is not supported by code-gecko
                    // TODO: convert to non-streaming fim method when one exist in continue.
                    return [4 /*yield*/, _c.sent()];
                    case 6:
                        // Streaming is not supported by code-gecko
                        // TODO: convert to non-streaming fim method when one exist in continue.
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // Manager functions
    VertexAI.prototype._streamChat = function (messages, signal, options) {
        return __asyncGenerator(this, arguments, function _streamChat_1() {
            var isV1API, convertedMsgs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isV1API = this.apiBase.includes("/v1/");
                        convertedMsgs = isV1API
                            ? this.geminiInstance.removeSystemMessage(messages)
                            : messages;
                        if (!(this.vertexProvider === "gemini")) return [3 /*break*/, 3];
                        return [5 /*yield**/, __values(__asyncDelegator(__asyncValues(this.streamChatGemini(convertedMsgs, options, signal))))];
                    case 1: return [4 /*yield*/, __await.apply(void 0, [_a.sent()])];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 13];
                    case 3:
                        if (!(this.vertexProvider === "mistral")) return [3 /*break*/, 6];
                        return [5 /*yield**/, __values(__asyncDelegator(__asyncValues(this.StreamChatMistral(messages, options, signal))))];
                    case 4: return [4 /*yield*/, __await.apply(void 0, [_a.sent()])];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 13];
                    case 6:
                        if (!(this.vertexProvider === "anthropic")) return [3 /*break*/, 9];
                        return [5 /*yield**/, __values(__asyncDelegator(__asyncValues(this.StreamChatAnthropic(messages, options, signal))))];
                    case 7: return [4 /*yield*/, __await.apply(void 0, [_a.sent()])];
                    case 8:
                        _a.sent();
                        return [3 /*break*/, 13];
                    case 9:
                        if (!options.model.includes("bison")) return [3 /*break*/, 12];
                        return [5 /*yield**/, __values(__asyncDelegator(__asyncValues(this.streamChatBison(convertedMsgs, options, signal))))];
                    case 10: return [4 /*yield*/, __await.apply(void 0, [_a.sent()])];
                    case 11:
                        _a.sent();
                        return [3 /*break*/, 13];
                    case 12: throw new Error("Unsupported model: ".concat(options.model));
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    VertexAI.prototype._streamComplete = function (prompt, signal, options) {
        return __asyncGenerator(this, arguments, function _streamComplete_1() {
            var _a, _b, _c, message, e_3_1;
            var _d, e_3, _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _g.trys.push([0, 7, 8, 13]);
                        _a = true, _b = __asyncValues(this._streamChat([{ content: prompt, role: "user" }], signal, options));
                        _g.label = 1;
                    case 1: return [4 /*yield*/, __await(_b.next())];
                    case 2:
                        if (!(_c = _g.sent(), _d = _c.done, !_d)) return [3 /*break*/, 6];
                        _f = _c.value;
                        _a = false;
                        message = _f;
                        return [4 /*yield*/, __await((0, messageContent_js_1.renderChatMessage)(message))];
                    case 3: return [4 /*yield*/, _g.sent()];
                    case 4:
                        _g.sent();
                        _g.label = 5;
                    case 5:
                        _a = true;
                        return [3 /*break*/, 1];
                    case 6: return [3 /*break*/, 13];
                    case 7:
                        e_3_1 = _g.sent();
                        e_3 = { error: e_3_1 };
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
                        if (e_3) throw e_3.error;
                        return [7 /*endfinally*/];
                    case 12: return [7 /*endfinally*/];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    VertexAI.prototype._streamFim = function (prefix, suffix, signal, options) {
        return __asyncGenerator(this, arguments, function _streamFim_1() {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.model === "code-gecko")) return [3 /*break*/, 3];
                        return [5 /*yield**/, __values(__asyncDelegator(__asyncValues(this.streamFimGecko(prefix, suffix, signal, options))))];
                    case 1: return [4 /*yield*/, __await.apply(void 0, [_a.sent()])];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 3:
                        if (!this.model.includes("codestral")) return [3 /*break*/, 6];
                        return [5 /*yield**/, __values(__asyncDelegator(__asyncValues(this.StreamFimMistral(prefix, suffix, signal, options))))];
                    case 4: return [4 /*yield*/, __await.apply(void 0, [_a.sent()])];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 6: throw new Error("Unsupported model: ".concat(this.model));
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    VertexAI.prototype.supportsFim = function () {
        return (this.model.includes("code-gecko") || this.model.includes("codestral"));
    };
    VertexAI.prototype._embed = function (chunks) {
        return __awaiter(this, void 0, void 0, function () {
            var client, result, resp, _a, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.clientPromise];
                    case 1:
                        client = _b.sent();
                        return [4 /*yield*/, (client === null || client === void 0 ? void 0 : client.getAccessToken())];
                    case 2:
                        result = _b.sent();
                        if (!(result === null || result === void 0 ? void 0 : result.token)) {
                            throw new Error("Could not get an access token. Set up your Google Application Default Credentials.");
                        }
                        return [4 /*yield*/, this.fetch(new URL("publishers/google/models/".concat(this.model, ":predict"), this.apiBase), {
                                method: "POST",
                                body: JSON.stringify({
                                    instances: chunks.map(function (chunk) { return ({ content: chunk }); }),
                                }),
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: "Bearer ".concat(result.token),
                                },
                            })];
                    case 3:
                        resp = _b.sent();
                        if (!!resp.ok) return [3 /*break*/, 5];
                        _a = Error.bind;
                        return [4 /*yield*/, resp.text()];
                    case 4: throw new (_a.apply(Error, [void 0, _b.sent()]))();
                    case 5: return [4 /*yield*/, resp.json()];
                    case 6:
                        data = (_b.sent());
                        return [2 /*return*/, data.predictions.map(function (prediction) { return prediction.embeddings.values; })];
                }
            });
        });
    };
    VertexAI.providerName = "vertexai";
    VertexAI.AUTH_SCOPES = "https://www.googleapis.com/auth/cloud-platform";
    VertexAI.defaultOptions = {
        maxEmbeddingBatchSize: 250,
        region: "us-central1",
    };
    return VertexAI;
}(index_js_1.BaseLLM));
exports.default = VertexAI;
