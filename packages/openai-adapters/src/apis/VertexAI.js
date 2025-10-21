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
exports.VertexAIApi = void 0;
var fetch_1 = require("@continuedev/fetch");
var google_auth_library_1 = require("google-auth-library");
var util_js_1 = require("../util.js");
var Anthropic_js_1 = require("./Anthropic.js");
var Gemini_js_1 = require("./Gemini.js");
var OpenAI_js_1 = require("./OpenAI.js");
var VertexAIApi = /** @class */ (function () {
    function VertexAIApi(config) {
        this.config = config;
        this.setupAuthentication();
        // These sub-instances are only used to convert and handle responses,
        // So do not need apiKey, etc
        this.anthropicInstance = new Anthropic_js_1.AnthropicApi({
            provider: "anthropic",
            apiKey: "dud",
        });
        this.geminiInstance = new Gemini_js_1.GeminiApi({
            provider: "gemini",
            apiKey: "dud",
        });
        this.mistralInstance = new OpenAI_js_1.OpenAIApi({
            provider: "mistral",
            apiKey: "dud",
        });
    }
    VertexAIApi.prototype.setupAuthentication = function () {
        var _a = this.config, apiKey = _a.apiKey, env = _a.env;
        var _b = env || {}, region = _b.region, projectId = _b.projectId, keyFile = _b.keyFile, keyJson = _b.keyJson;
        // Validate authentication configuration
        if (apiKey) {
            // Express mode validation
            if (region || projectId || keyFile || keyJson) {
                throw new Error("VertexAI in express mode (apiKey only) cannot be configured with region, projectId, keyFile, or keyJson");
            }
        }
        else {
            // Standard mode validation
            if (!region || !projectId) {
                throw new Error("region and projectId are required for VertexAI (when not using express/apiKey mode)");
            }
            if (keyFile && keyJson) {
                throw new Error("VertexAI credentials can be configured with either keyFile or keyJson but not both");
            }
        }
        // Set up authentication client
        if (keyJson) {
            try {
                var parsed = JSON.parse(keyJson);
                if (!(parsed === null || parsed === void 0 ? void 0 : parsed.private_key)) {
                    throw new Error("VertexAI: keyJson must contain a valid private key");
                }
                parsed.private_key = parsed.private_key.replace(/\\n/g, "\n");
                var jsonClient = google_auth_library_1.auth.fromJSON(parsed);
                if (jsonClient instanceof google_auth_library_1.JWT) {
                    jsonClient.scopes = [VertexAIApi.AUTH_SCOPES];
                }
                else {
                    throw new Error("VertexAI: keyJson must be a valid JWT");
                }
                this.clientPromise = Promise.resolve(jsonClient);
            }
            catch (e) {
                throw new Error("VertexAI: Failed to parse keyJson");
            }
        }
        else if (keyFile) {
            if (typeof keyFile !== "string") {
                throw new Error("VertexAI: keyFile must be a string");
            }
            this.clientPromise = new google_auth_library_1.GoogleAuth({
                scopes: VertexAIApi.AUTH_SCOPES,
                keyFile: keyFile,
            })
                .getClient()
                .catch(function (e) {
                console.warn("Failed to load credentials for Vertex AI: ".concat(e.message));
            });
        }
        else if (!apiKey) {
            // Application Default Credentials
            this.clientPromise = new google_auth_library_1.GoogleAuth({
                scopes: VertexAIApi.AUTH_SCOPES,
            })
                .getClient()
                .catch(function (e) {
                console.warn("Failed to load credentials for Vertex AI: ".concat(e.message));
            });
        }
    };
    VertexAIApi.prototype.getApiBase = function () {
        var _a = this.config, apiKey = _a.apiKey, env = _a.env;
        if (this.config.apiBase) {
            return this.config.apiBase;
        }
        if (apiKey) {
            // Express mode
            return "https://aiplatform.googleapis.com/v1/";
        }
        else {
            // Standard mode
            var _b = env, region = _b.region, projectId = _b.projectId;
            return "https://".concat(region, "-aiplatform.googleapis.com/v1/projects/").concat(projectId, "/locations/").concat(region, "/");
        }
    };
    VertexAIApi.prototype.determineVertexProvider = function (model) {
        if (model.includes("mistral") ||
            model.includes("codestral") ||
            model.includes("mixtral")) {
            return "mistral";
        }
        else if (model.includes("claude")) {
            return "anthropic";
        }
        else if (model.includes("gemini")) {
            return "gemini";
        }
        return "unknown";
    };
    VertexAIApi.prototype.getAuthHeaders = function () {
        return __awaiter(this, void 0, void 0, function () {
            var headers, client, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        headers = {
                            "Content-Type": "application/json",
                            // Accept: "application/json"
                        };
                        if (!this.config.apiKey) return [3 /*break*/, 1];
                        // Express mode - no Authorization header needed, API key is in URL
                        return [2 /*return*/, headers];
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
                        return [2 /*return*/, headers];
                }
            });
        });
    };
    VertexAIApi.prototype.buildUrl = function (endpoint, model) {
        var apiBase = this.getApiBase();
        var url = new URL(endpoint, apiBase);
        if (this.config.apiKey) {
            url.searchParams.set("key", this.config.apiKey);
        }
        return url;
    };
    VertexAIApi.prototype.convertAnthropicBody = function (oaiBody) {
        var body = this.anthropicInstance._convertToCleanAnthropicBody(oaiBody);
        var model = body.model, exceptModel = __rest(body, ["model"]);
        return __assign(__assign({}, exceptModel), { anthropic_version: "vertex-2023-10-16" });
    };
    VertexAIApi.prototype.convertGeminiBody = function (oaiBody, url) {
        return this.geminiInstance._convertBody(oaiBody, url.toString(), false, false);
    };
    VertexAIApi.prototype.chatCompletionNonStream = function (body, signal) {
        return __awaiter(this, void 0, void 0, function () {
            var vertexProvider, headers, url, requestBody, response, data;
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            return __generator(this, function (_l) {
                switch (_l.label) {
                    case 0:
                        vertexProvider = this.determineVertexProvider(body.model);
                        if (this.config.apiKey && vertexProvider !== "gemini") {
                            throw new Error("VertexAI: only gemini models are supported in express (apiKey) mode");
                        }
                        return [4 /*yield*/, this.getAuthHeaders()];
                    case 1:
                        headers = _l.sent();
                        switch (vertexProvider) {
                            case "anthropic":
                                url = this.buildUrl("publishers/anthropic/models/".concat(body.model, ":rawPredict"));
                                requestBody = this.convertAnthropicBody(body);
                                break;
                            case "gemini":
                                url = this.buildUrl("publishers/google/models/".concat(body.model, ":generateContent"));
                                requestBody = this.convertGeminiBody(body, url);
                                break;
                            case "mistral":
                                url = this.buildUrl("publishers/mistralai/models/".concat(body.model, ":rawPredict"));
                                requestBody = body;
                                break;
                            default:
                                throw new Error("Unsupported model: ".concat(body.model));
                        }
                        return [4 /*yield*/, (0, util_js_1.customFetch)(this.config.requestOptions)(url.toString(), {
                                method: "POST",
                                headers: headers,
                                body: JSON.stringify(requestBody),
                                signal: signal,
                            })];
                    case 2:
                        response = _l.sent();
                        return [4 /*yield*/, response.json()];
                    case 3:
                        data = _l.sent();
                        if (!response.ok) {
                            throw new Error("VertexAI API error: ".concat(response.status, " ").concat(response.statusText, "\n").concat(JSON.stringify(data)));
                        }
                        // Convert response to OpenAI format
                        switch (vertexProvider) {
                            case "anthropic":
                                return [2 /*return*/, (0, util_js_1.chatCompletion)({
                                        content: ((_b = (_a = data.content) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.text) || "",
                                        model: body.model,
                                    })];
                            case "gemini":
                                return [2 /*return*/, (0, util_js_1.chatCompletion)({
                                        content: ((_g = (_f = (_e = (_d = (_c = data.candidates) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.content) === null || _e === void 0 ? void 0 : _e.parts) === null || _f === void 0 ? void 0 : _f[0]) === null || _g === void 0 ? void 0 : _g.text) || "",
                                        model: body.model,
                                    })];
                            case "mistral":
                                return [2 /*return*/, (0, util_js_1.chatCompletion)({
                                        content: ((_k = (_j = (_h = data.choices) === null || _h === void 0 ? void 0 : _h[0]) === null || _j === void 0 ? void 0 : _j.message) === null || _k === void 0 ? void 0 : _k.content) || "",
                                        model: body.model,
                                    })];
                            default:
                                throw new Error("Unsupported provider: ".concat(vertexProvider));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    VertexAIApi.prototype.chatCompletionStream = function (body, signal) {
        return __asyncGenerator(this, arguments, function chatCompletionStream_1() {
            var vertexProvider, headers, url, requestBody, _a, mistralResponse, _b, mistralResponse_1, mistralResponse_1_1, result, e_1_1, response, data;
            var _c, e_1, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        vertexProvider = this.determineVertexProvider(body.model);
                        if (this.config.apiKey && vertexProvider !== "gemini") {
                            throw new Error("VertexAI: only gemini models are supported in express (apiKey) mode");
                        }
                        return [4 /*yield*/, __await(this.getAuthHeaders())];
                    case 1:
                        headers = _f.sent();
                        switch (vertexProvider) {
                            case "anthropic":
                                url = this.buildUrl("publishers/anthropic/models/".concat(body.model, ":streamRawPredict"));
                                requestBody = this.convertAnthropicBody(body);
                                break;
                            case "gemini":
                                url = this.buildUrl("publishers/google/models/".concat(body.model, ":streamGenerateContent"));
                                requestBody = this.convertGeminiBody(body, url);
                                break;
                            case "mistral":
                                url = this.buildUrl("publishers/mistralai/models/".concat(body.model, ":streamRawPredict"));
                                requestBody = body;
                                break;
                            default:
                                throw new Error("Unsupported model: ".concat(body.model));
                        }
                        _a = vertexProvider;
                        switch (_a) {
                            case "mistral": return [3 /*break*/, 2];
                            case "anthropic": return [3 /*break*/, 18];
                            case "gemini": return [3 /*break*/, 18];
                        }
                        return [3 /*break*/, 30];
                    case 2: return [4 /*yield*/, __await(this.mistralInstance.openai.chat.completions.create(this.mistralInstance.modifyChatBody(body), {
                            signal: signal,
                            headers: headers,
                        }))];
                    case 3:
                        mistralResponse = _f.sent();
                        _f.label = 4;
                    case 4:
                        _f.trys.push([4, 11, 12, 17]);
                        _b = true, mistralResponse_1 = __asyncValues(mistralResponse);
                        _f.label = 5;
                    case 5: return [4 /*yield*/, __await(mistralResponse_1.next())];
                    case 6:
                        if (!(mistralResponse_1_1 = _f.sent(), _c = mistralResponse_1_1.done, !_c)) return [3 /*break*/, 10];
                        _e = mistralResponse_1_1.value;
                        _b = false;
                        result = _e;
                        return [4 /*yield*/, __await(result)];
                    case 7: return [4 /*yield*/, _f.sent()];
                    case 8:
                        _f.sent();
                        _f.label = 9;
                    case 9:
                        _b = true;
                        return [3 /*break*/, 5];
                    case 10: return [3 /*break*/, 17];
                    case 11:
                        e_1_1 = _f.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 17];
                    case 12:
                        _f.trys.push([12, , 15, 16]);
                        if (!(!_b && !_c && (_d = mistralResponse_1.return))) return [3 /*break*/, 14];
                        return [4 /*yield*/, __await(_d.call(mistralResponse_1))];
                    case 13:
                        _f.sent();
                        _f.label = 14;
                    case 14: return [3 /*break*/, 16];
                    case 15:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 16: return [7 /*endfinally*/];
                    case 17: return [3 /*break*/, 30];
                    case 18: return [4 /*yield*/, __await((0, util_js_1.customFetch)(this.config.requestOptions)(url.toString(), {
                            method: "POST",
                            headers: headers,
                            body: JSON.stringify(requestBody),
                            signal: signal,
                        }))];
                    case 19:
                        response = _f.sent();
                        if (!!response.ok) return [3 /*break*/, 21];
                        return [4 /*yield*/, __await(response.json())];
                    case 20:
                        data = _f.sent();
                        throw new Error("VertexAI API error: ".concat(response.status, " ").concat(response.statusText, "\n").concat(JSON.stringify(data)));
                    case 21:
                        if (!(response.status === 499)) return [3 /*break*/, 23];
                        return [4 /*yield*/, __await(void 0)];
                    case 22: return [2 /*return*/, _f.sent()]; // Aborted by user
                    case 23:
                        if (!(vertexProvider === "gemini")) return [3 /*break*/, 26];
                        return [5 /*yield**/, __values(__asyncDelegator(__asyncValues(this.geminiInstance.handleStreamResponse(response, body.model))))];
                    case 24: return [4 /*yield*/, __await.apply(void 0, [_f.sent()])];
                    case 25:
                        _f.sent();
                        return [3 /*break*/, 29];
                    case 26: return [5 /*yield**/, __values(__asyncDelegator(__asyncValues(this.anthropicInstance.handleStreamResponse(response, body.model))))];
                    case 27: return [4 /*yield*/, __await.apply(void 0, [_f.sent()])];
                    case 28:
                        _f.sent();
                        _f.label = 29;
                    case 29: return [3 /*break*/, 30];
                    case 30: return [2 /*return*/];
                }
            });
        });
    };
    VertexAIApi.prototype.completionNonStream = function (body, signal) {
        return __awaiter(this, void 0, void 0, function () {
            var promptText, chatBody, chatResponse;
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        promptText = typeof body.prompt === "string"
                            ? body.prompt
                            : Array.isArray(body.prompt)
                                ? body.prompt.join("")
                                : "";
                        chatBody = {
                            model: body.model,
                            messages: [{ role: "user", content: promptText }],
                            max_tokens: body.max_tokens,
                            temperature: body.temperature,
                            top_p: body.top_p,
                            stop: body.stop,
                            stream: false,
                        };
                        return [4 /*yield*/, this.chatCompletionNonStream(chatBody, signal)];
                    case 1:
                        chatResponse = _d.sent();
                        return [2 /*return*/, {
                                id: chatResponse.id,
                                object: "text_completion",
                                created: chatResponse.created,
                                model: chatResponse.model,
                                choices: [
                                    {
                                        text: ((_b = (_a = chatResponse.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content) || "",
                                        index: 0,
                                        logprobs: null,
                                        finish_reason: ((_c = chatResponse.choices[0]) === null || _c === void 0 ? void 0 : _c.finish_reason) || null,
                                    },
                                ],
                                usage: chatResponse.usage,
                            }];
                }
            });
        });
    };
    VertexAIApi.prototype.completionStream = function (body, signal) {
        return __asyncGenerator(this, arguments, function completionStream_1() {
            var promptText, chatBody, _a, _b, _c, chatChunk_1, e_2_1;
            var _d, e_2, _e, _f;
            var _g, _h, _j;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        promptText = typeof body.prompt === "string"
                            ? body.prompt
                            : Array.isArray(body.prompt)
                                ? body.prompt.join("")
                                : "";
                        chatBody = {
                            model: body.model,
                            messages: [{ role: "user", content: promptText }],
                            max_tokens: body.max_tokens,
                            temperature: body.temperature,
                            top_p: body.top_p,
                            stop: body.stop,
                            stream: true,
                        };
                        _k.label = 1;
                    case 1:
                        _k.trys.push([1, 8, 9, 14]);
                        _a = true, _b = __asyncValues(this.chatCompletionStream(chatBody, signal));
                        _k.label = 2;
                    case 2: return [4 /*yield*/, __await(_b.next())];
                    case 3:
                        if (!(_c = _k.sent(), _d = _c.done, !_d)) return [3 /*break*/, 7];
                        _f = _c.value;
                        _a = false;
                        chatChunk_1 = _f;
                        return [4 /*yield*/, __await({
                                id: chatChunk_1.id,
                                object: "text_completion",
                                created: chatChunk_1.created,
                                model: chatChunk_1.model,
                                choices: [
                                    {
                                        text: ((_h = (_g = chatChunk_1.choices[0]) === null || _g === void 0 ? void 0 : _g.delta) === null || _h === void 0 ? void 0 : _h.content) || "",
                                        index: 0,
                                        logprobs: null,
                                        finish_reason: ((_j = chatChunk_1.choices[0]) === null || _j === void 0 ? void 0 : _j.finish_reason) || null,
                                    },
                                ],
                            })];
                    case 4: return [4 /*yield*/, _k.sent()];
                    case 5:
                        _k.sent();
                        _k.label = 6;
                    case 6:
                        _a = true;
                        return [3 /*break*/, 2];
                    case 7: return [3 /*break*/, 14];
                    case 8:
                        e_2_1 = _k.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 14];
                    case 9:
                        _k.trys.push([9, , 12, 13]);
                        if (!(!_a && !_d && (_e = _b.return))) return [3 /*break*/, 11];
                        return [4 /*yield*/, __await(_e.call(_b))];
                    case 10:
                        _k.sent();
                        _k.label = 11;
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        if (e_2) throw e_2.error;
                        return [7 /*endfinally*/];
                    case 13: return [7 /*endfinally*/];
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    VertexAIApi.prototype.fimStream = function (body, signal) {
        return __asyncGenerator(this, arguments, function fimStream_1() {
            var headers, url, requestBody, response, _a, _b, _c, chunk, e_3_1;
            var _d, e_3, _e, _f;
            var _g, _h, _j, _k;
            return __generator(this, function (_l) {
                switch (_l.label) {
                    case 0:
                        // Only Codestral (Mistral) supports FIM in VertexAI
                        if (!body.model.includes("codestral")) {
                            throw new Error("FIM is only supported for Codestral models, got: ".concat(body.model));
                        }
                        return [4 /*yield*/, __await(this.getAuthHeaders())];
                    case 1:
                        headers = _l.sent();
                        url = this.buildUrl("publishers/mistralai/models/".concat(body.model, ":streamRawPredict"));
                        requestBody = {
                            model: body.model,
                            max_tokens: body.max_tokens,
                            temperature: body.temperature,
                            top_p: body.top_p,
                            stream: (_g = body.stream) !== null && _g !== void 0 ? _g : true,
                            stop: body.stop,
                            prompt: body.prompt,
                            suffix: body.suffix,
                        };
                        return [4 /*yield*/, __await((0, util_js_1.customFetch)(this.config.requestOptions)(url.toString(), {
                                method: "POST",
                                headers: headers,
                                body: JSON.stringify(requestBody),
                                signal: signal,
                            }))];
                    case 2:
                        response = _l.sent();
                        if (!response.ok) {
                            throw new Error("VertexAI API error: ".concat(response.status, " ").concat(response.statusText));
                        }
                        _l.label = 3;
                    case 3:
                        _l.trys.push([3, 10, 11, 16]);
                        _a = true, _b = __asyncValues((0, fetch_1.streamSse)(response));
                        _l.label = 4;
                    case 4: return [4 /*yield*/, __await(_b.next())];
                    case 5:
                        if (!(_c = _l.sent(), _d = _c.done, !_d)) return [3 /*break*/, 9];
                        _f = _c.value;
                        _a = false;
                        chunk = _f;
                        if (!((_k = (_j = (_h = chunk.choices) === null || _h === void 0 ? void 0 : _h[0]) === null || _j === void 0 ? void 0 : _j.delta) === null || _k === void 0 ? void 0 : _k.content)) return [3 /*break*/, 8];
                        return [4 /*yield*/, __await((0, util_js_1.chatChunk)({
                                content: chunk.choices[0].delta.content,
                                model: body.model,
                            }))];
                    case 6: return [4 /*yield*/, _l.sent()];
                    case 7:
                        _l.sent();
                        _l.label = 8;
                    case 8:
                        _a = true;
                        return [3 /*break*/, 4];
                    case 9: return [3 /*break*/, 16];
                    case 10:
                        e_3_1 = _l.sent();
                        e_3 = { error: e_3_1 };
                        return [3 /*break*/, 16];
                    case 11:
                        _l.trys.push([11, , 14, 15]);
                        if (!(!_a && !_d && (_e = _b.return))) return [3 /*break*/, 13];
                        return [4 /*yield*/, __await(_e.call(_b))];
                    case 12:
                        _l.sent();
                        _l.label = 13;
                    case 13: return [3 /*break*/, 15];
                    case 14:
                        if (e_3) throw e_3.error;
                        return [7 /*endfinally*/];
                    case 15: return [7 /*endfinally*/];
                    case 16: return [2 /*return*/];
                }
            });
        });
    };
    VertexAIApi.prototype.embed = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var headers, url, textInputs, requestBody, response, data, embeddings;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAuthHeaders()];
                    case 1:
                        headers = _a.sent();
                        url = this.buildUrl("publishers/google/models/".concat(body.model, ":predict"));
                        textInputs = Array.isArray(body.input)
                            ? body.input.map(function (item) {
                                return typeof item === "string" ? item : JSON.stringify(item);
                            })
                            : [
                                typeof body.input === "string"
                                    ? body.input
                                    : JSON.stringify(body.input),
                            ];
                        requestBody = {
                            instances: textInputs.map(function (text) { return ({ content: text }); }),
                        };
                        return [4 /*yield*/, (0, util_js_1.customFetch)(this.config.requestOptions)(url.toString(), {
                                method: "POST",
                                headers: headers,
                                body: JSON.stringify(requestBody),
                            })];
                    case 2:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error("VertexAI API error: ".concat(response.status, " ").concat(response.statusText));
                        }
                        return [4 /*yield*/, response.json()];
                    case 3:
                        data = _a.sent();
                        embeddings = data.predictions.map(function (prediction) { return prediction.embeddings.values; });
                        return [2 /*return*/, (0, util_js_1.embedding)({
                                data: embeddings,
                                model: body.model,
                            })];
                }
            });
        });
    };
    VertexAIApi.prototype.rerank = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error("Reranking is not supported by VertexAI");
            });
        });
    };
    VertexAIApi.prototype.list = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error("VertexAI provider does not support model listing.");
            });
        });
    };
    VertexAIApi.AUTH_SCOPES = "https://www.googleapis.com/auth/cloud-platform";
    return VertexAIApi;
}());
exports.VertexAIApi = VertexAIApi;
