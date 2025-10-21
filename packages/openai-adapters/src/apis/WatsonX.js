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
exports.WatsonXApi = void 0;
var fetch_1 = require("@continuedev/fetch");
var util_js_1 = require("../util.js");
var WatsonXApi = /** @class */ (function () {
    function WatsonXApi(config) {
        var _a, _b;
        this.config = config;
        this.apiVersion = "2023-05-29";
        this.apiBase = (_a = config.apiBase) !== null && _a !== void 0 ? _a : "https://us-south.ml.cloud.ibm.com";
        if (!this.apiBase.endsWith("/")) {
            this.apiBase += "/";
        }
        this.apiVersion = (_b = config.env.apiVersion) !== null && _b !== void 0 ? _b : this.apiVersion;
        this.projectId = config.env.projectId;
        this.deploymentId = config.env.deploymentId;
    }
    WatsonXApi.prototype.getBearerToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var wxToken, base64Decoded, _a, username, api_key, wxToken;
            var _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (!((_b = this.apiBase) === null || _b === void 0 ? void 0 : _b.includes("cloud.ibm.com"))) return [3 /*break*/, 3];
                        return [4 /*yield*/, (0, util_js_1.customFetch)(this.config.requestOptions)("https://iam.cloud.ibm.com/identity/token?apikey=".concat(this.config.apiKey, "&grant_type=urn:ibm:params:oauth:grant-type:apikey"), {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/x-www-form-urlencoded",
                                    Accept: "application/json",
                                },
                            })];
                    case 1: return [4 /*yield*/, (_e.sent()).json()];
                    case 2:
                        wxToken = (_e.sent());
                        return [2 /*return*/, {
                                token: wxToken["access_token"],
                                expiration: wxToken["expiration"],
                            }];
                    case 3:
                        base64Decoded = Buffer.from((_c = this.config.apiKey) !== null && _c !== void 0 ? _c : "", "base64").toString();
                        _a = base64Decoded.split(":"), username = _a[0], api_key = _a[1];
                        return [4 /*yield*/, (0, util_js_1.customFetch)(this.config.requestOptions)(new URL("icp4d-api/v1/authorize", this.apiBase), {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    Accept: "application/json",
                                },
                                body: JSON.stringify({
                                    username: username === null || username === void 0 ? void 0 : username.trim(),
                                    api_key: api_key === null || api_key === void 0 ? void 0 : api_key.trim(),
                                }),
                            })];
                    case 4: return [4 /*yield*/, (_e.sent()).json()];
                    case 5:
                        wxToken = (_e.sent());
                        return [2 /*return*/, {
                                token: (_d = wxToken["access_token"]) !== null && _d !== void 0 ? _d : wxToken["token"],
                                expiration: 0,
                            }];
                }
            });
        });
    };
    WatsonXApi.prototype.getEndpoint = function (endpoint) {
        return "".concat(this.apiBase, "ml/v1/").concat(this.deploymentId ? "deployments/".concat(this.deploymentId, "/") : "", "text/").concat(endpoint, "_stream?version=").concat(this.apiVersion);
    };
    WatsonXApi.prototype._convertBody = function (oaiBody) {
        var _a;
        var stopSequences = oaiBody.stop
            ? Array.isArray(oaiBody.stop)
                ? oaiBody.stop.filter(function (s) { return s.trim() !== ""; })
                : [oaiBody.stop]
            : undefined;
        var payload = {
            messages: oaiBody.messages,
            max_tokens: (_a = oaiBody.max_tokens) !== null && _a !== void 0 ? _a : 1024,
            stop: stopSequences,
            frequency_penalty: oaiBody.frequency_penalty,
            presence_penalty: oaiBody.presence_penalty,
        };
        if (!this.deploymentId) {
            payload.model_id = oaiBody.model;
            payload.project_id = this.projectId;
        }
        if (oaiBody.temperature !== undefined) {
            payload.temperature = oaiBody.temperature;
        }
        if (oaiBody.top_p !== undefined) {
            payload.top_p = oaiBody.top_p;
        }
        if (oaiBody.tools) {
            payload.tools = oaiBody.tools;
            if (oaiBody.tool_choice) {
                payload.tool_choice = oaiBody.tool_choice;
            }
            else {
                payload.tool_choice_option = "auto";
            }
        }
        return payload;
    };
    WatsonXApi.prototype.getHeaders = function () {
        return __awaiter(this, void 0, void 0, function () {
            var bearer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getBearerToken()];
                    case 1:
                        bearer = _a.sent();
                        // const isZenApiKey = bearer.expiration === -1;
                        return [2 /*return*/, {
                                "Content-Type": "application/json",
                                // Authorization: `${isZenApiKey ? "ZenApiKey" : "Bearer"} ${bearer.token}`,
                                Authorization: "Bearer ".concat(bearer.token),
                            }];
                }
            });
        });
    };
    WatsonXApi.prototype.chatCompletionNonStream = function (body, signal) {
        return __awaiter(this, void 0, void 0, function () {
            var generator, content, _a, generator_1, generator_1_1, chunk, e_1_1;
            var _b, e_1, _c, _d;
            var _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        generator = this.chatCompletionStream(__assign(__assign({}, body), { stream: true }), signal);
                        content = "";
                        _f.label = 1;
                    case 1:
                        _f.trys.push([1, 6, 7, 12]);
                        _a = true, generator_1 = __asyncValues(generator);
                        _f.label = 2;
                    case 2: return [4 /*yield*/, generator_1.next()];
                    case 3:
                        if (!(generator_1_1 = _f.sent(), _b = generator_1_1.done, !_b)) return [3 /*break*/, 5];
                        _d = generator_1_1.value;
                        _a = false;
                        chunk = _d;
                        content += (_e = chunk.choices[0].delta.content) !== null && _e !== void 0 ? _e : "";
                        _f.label = 4;
                    case 4:
                        _a = true;
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 12];
                    case 6:
                        e_1_1 = _f.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 12];
                    case 7:
                        _f.trys.push([7, , 10, 11]);
                        if (!(!_a && !_b && (_c = generator_1.return))) return [3 /*break*/, 9];
                        return [4 /*yield*/, _c.call(generator_1)];
                    case 8:
                        _f.sent();
                        _f.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 11: return [7 /*endfinally*/];
                    case 12: return [2 /*return*/, (0, util_js_1.chatCompletion)({
                            content: content,
                            model: body.model,
                        })];
                }
            });
        });
    };
    WatsonXApi.prototype.chatCompletionStream = function (body, signal) {
        return __asyncGenerator(this, arguments, function chatCompletionStream_1() {
            var url, headers, stringifiedBody, response, _a, _b, _c, _d, _e, value, e_2_1;
            var _f, e_2, _g, _h;
            var _j;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        url = this.getEndpoint("chat");
                        return [4 /*yield*/, __await(this.getHeaders())];
                    case 1:
                        headers = _k.sent();
                        stringifiedBody = JSON.stringify(__assign(__assign({ time_limit: 8000 }, this._convertBody(body)), { stream: true }));
                        return [4 /*yield*/, __await((0, util_js_1.customFetch)(this.config.requestOptions)(url, {
                                method: "POST",
                                headers: headers,
                                body: stringifiedBody,
                                signal: signal,
                            }))];
                    case 2:
                        response = _k.sent();
                        if (!(!response.ok || !response.body)) return [3 /*break*/, 4];
                        _a = Error.bind;
                        _b = "Failed to stream chat completion: ".concat;
                        return [4 /*yield*/, __await(response.text())];
                    case 3: throw new (_a.apply(Error, [void 0, _b.apply("Failed to stream chat completion: ", [_k.sent()])]))();
                    case 4:
                        _k.trys.push([4, 11, 12, 17]);
                        _c = true, _d = __asyncValues((0, fetch_1.streamSse)(response));
                        _k.label = 5;
                    case 5: return [4 /*yield*/, __await(_d.next())];
                    case 6:
                        if (!(_e = _k.sent(), _f = _e.done, !_f)) return [3 /*break*/, 10];
                        _h = _e.value;
                        _c = false;
                        value = _h;
                        if (!((_j = value.choices) === null || _j === void 0 ? void 0 : _j[0])) {
                            return [3 /*break*/, 9];
                        }
                        return [4 /*yield*/, __await(value)];
                    case 7: return [4 /*yield*/, _k.sent()];
                    case 8:
                        _k.sent();
                        _k.label = 9;
                    case 9:
                        _c = true;
                        return [3 /*break*/, 5];
                    case 10: return [3 /*break*/, 17];
                    case 11:
                        e_2_1 = _k.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 17];
                    case 12:
                        _k.trys.push([12, , 15, 16]);
                        if (!(!_c && !_f && (_g = _d.return))) return [3 /*break*/, 14];
                        return [4 /*yield*/, __await(_g.call(_d))];
                    case 13:
                        _k.sent();
                        _k.label = 14;
                    case 14: return [3 /*break*/, 16];
                    case 15:
                        if (e_2) throw e_2.error;
                        return [7 /*endfinally*/];
                    case 16: return [7 /*endfinally*/];
                    case 17: return [2 /*return*/];
                }
            });
        });
    };
    WatsonXApi.prototype.completionNonStream = function (body, signal) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error("Method not implemented.");
            });
        });
    };
    WatsonXApi.prototype.completionStream = function (body, signal) {
        return __asyncGenerator(this, arguments, function completionStream_1() {
            var params, payload, url, response, _a, _b, _c, _d, generatedText, _loop_1, _e, _f, _g, e_3_1;
            var _h;
            var _j, e_3, _k, _l;
            var _m;
            return __generator(this, function (_o) {
                switch (_o.label) {
                    case 0:
                        params = {
                            decoding_method: body.temperature ? "sample" : "greedy",
                            max_new_tokens: (_m = body.max_tokens) !== null && _m !== void 0 ? _m : 1024,
                            min_new_tokens: 1,
                            stop_sequences: body.stop
                                ? Array.isArray(body.stop)
                                    ? body.stop
                                    : [body.stop]
                                : [],
                            include_stop_sequence: false,
                            repetition_penalty: body.frequency_penalty || 1,
                            temperature: body.temperature,
                            top_p: body.top_p,
                            top_k: 100,
                        };
                        payload = {
                            input: body.prompt,
                            parameters: params,
                        };
                        if (!this.deploymentId) {
                            payload.model_id = body.model;
                            payload.project_id = this.projectId;
                        }
                        url = this.getEndpoint("generation");
                        _a = (0, util_js_1.customFetch)(this.config.requestOptions);
                        _b = [url];
                        _h = {
                            method: "POST"
                        };
                        return [4 /*yield*/, __await(this.getHeaders())];
                    case 1: return [4 /*yield*/, __await.apply(void 0, [_a.apply(void 0, _b.concat([(_h.headers = _o.sent(),
                                    _h.body = JSON.stringify(payload),
                                    _h.signal = signal,
                                    _h)]))])];
                    case 2:
                        response = _o.sent();
                        if (!(!response.ok || !response.body)) return [3 /*break*/, 4];
                        _c = Error.bind;
                        _d = "Failed to stream completion: ".concat;
                        return [4 /*yield*/, __await(response.text())];
                    case 3: throw new (_c.apply(Error, [void 0, _d.apply("Failed to stream completion: ", [_o.sent()])]))();
                    case 4:
                        generatedText = "";
                        _o.label = 5;
                    case 5:
                        _o.trys.push([5, 11, 12, 17]);
                        _loop_1 = function () {
                            var value, lines, generatedChunk;
                            return __generator(this, function (_p) {
                                switch (_p.label) {
                                    case 0:
                                        _l = _g.value;
                                        _e = false;
                                        value = _l;
                                        lines = value.toString().split("\n");
                                        generatedChunk = "";
                                        lines.forEach(function (line) {
                                            if (line.startsWith("data:")) {
                                                var dataStr = line.replace(/^data:\s+/, "");
                                                try {
                                                    var data = JSON.parse(dataStr);
                                                    data.results.forEach(function (result) {
                                                        generatedChunk += result.generated_text || "";
                                                    });
                                                }
                                                catch (e) {
                                                    // parsing error is expected with streaming response
                                                }
                                            }
                                        });
                                        if (!generatedChunk) return [3 /*break*/, 3];
                                        generatedText += generatedChunk;
                                        return [4 /*yield*/, __await({
                                                id: "watsonx-".concat(Date.now()),
                                                object: "text_completion",
                                                created: Date.now(),
                                                model: body.model,
                                                choices: [
                                                    {
                                                        text: generatedChunk,
                                                        index: 0,
                                                        logprobs: null,
                                                        finish_reason: "stop",
                                                    },
                                                ],
                                            })];
                                    case 1: return [4 /*yield*/, _p.sent()];
                                    case 2:
                                        _p.sent();
                                        _p.label = 3;
                                    case 3: return [2 /*return*/];
                                }
                            });
                        };
                        _e = true, _f = __asyncValues((0, fetch_1.streamSse)(response));
                        _o.label = 6;
                    case 6: return [4 /*yield*/, __await(_f.next())];
                    case 7:
                        if (!(_g = _o.sent(), _j = _g.done, !_j)) return [3 /*break*/, 10];
                        return [5 /*yield**/, _loop_1()];
                    case 8:
                        _o.sent();
                        _o.label = 9;
                    case 9:
                        _e = true;
                        return [3 /*break*/, 6];
                    case 10: return [3 /*break*/, 17];
                    case 11:
                        e_3_1 = _o.sent();
                        e_3 = { error: e_3_1 };
                        return [3 /*break*/, 17];
                    case 12:
                        _o.trys.push([12, , 15, 16]);
                        if (!(!_e && !_j && (_k = _f.return))) return [3 /*break*/, 14];
                        return [4 /*yield*/, __await(_k.call(_f))];
                    case 13:
                        _o.sent();
                        _o.label = 14;
                    case 14: return [3 /*break*/, 16];
                    case 15:
                        if (e_3) throw e_3.error;
                        return [7 /*endfinally*/];
                    case 16: return [7 /*endfinally*/];
                    case 17: return [2 /*return*/];
                }
            });
        });
    };
    WatsonXApi.prototype.fimStream = function (body, signal) {
        return __asyncGenerator(this, arguments, function fimStream_1() {
            return __generator(this, function (_a) {
                throw new Error("Method not implemented.");
            });
        });
    };
    WatsonXApi.prototype.embed = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error("Method not implemented.");
            });
        });
    };
    WatsonXApi.prototype.rerank = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error("Method not implemented.");
            });
        });
    };
    WatsonXApi.prototype.list = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error("Method not implemented.");
            });
        });
    };
    return WatsonXApi;
}());
exports.WatsonXApi = WatsonXApi;
