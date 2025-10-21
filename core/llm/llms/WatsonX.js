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
var index_js_1 = require("../index.js");
var openaiTypeConverters_js_1 = require("../openaiTypeConverters.js");
var watsonxToken = {
    expiration: 0,
    token: "",
};
var WatsonX = /** @class */ (function (_super) {
    __extends(WatsonX, _super);
    function WatsonX(options) {
        return _super.call(this, options) || this;
    }
    WatsonX.prototype.getBearerToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var wxToken, userPass, wxToken, wxTokenExpiry;
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (!((_a = this.apiBase) === null || _a === void 0 ? void 0 : _a.includes("cloud.ibm.com"))) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.fetch("https://iam.cloud.ibm.com/identity/token?apikey=".concat(this.apiKey, "&grant_type=urn:ibm:params:oauth:grant-type:apikey"), {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/x-www-form-urlencoded",
                                    Accept: "application/json",
                                },
                            })];
                    case 1: return [4 /*yield*/, (_e.sent()).json()];
                    case 2:
                        wxToken = _e.sent();
                        return [2 /*return*/, {
                                token: wxToken["access_token"],
                                expiration: wxToken["expiration"],
                            }];
                    case 3:
                        if (!!((_b = this.apiKey) === null || _b === void 0 ? void 0 : _b.includes(":"))) return [3 /*break*/, 4];
                        // Using ZenApiKey auth
                        return [2 /*return*/, {
                                token: (_c = this.apiKey) !== null && _c !== void 0 ? _c : "",
                                expiration: -1,
                            }];
                    case 4:
                        userPass = (_d = this.apiKey) === null || _d === void 0 ? void 0 : _d.split(":");
                        return [4 /*yield*/, this.fetch("".concat(this.apiBase, "/icp4d-api/v1/authorize"), {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    Accept: "application/json",
                                },
                                body: JSON.stringify({
                                    username: userPass[0],
                                    password: userPass[1],
                                }),
                            })];
                    case 5: return [4 /*yield*/, (_e.sent()).json()];
                    case 6:
                        wxToken = _e.sent();
                        return [4 /*yield*/, this.fetch("".concat(this.apiBase, "/usermgmt/v1/user/tokenExpiry"), {
                                method: "GET",
                                headers: {
                                    Accept: "application/json",
                                    Authorization: "Bearer ".concat(wxToken["token"]),
                                },
                            })];
                    case 7: return [4 /*yield*/, (_e.sent()).json()];
                    case 8:
                        wxTokenExpiry = _e.sent();
                        return [2 /*return*/, {
                                token: wxToken["token"],
                                expiration: wxTokenExpiry["exp"],
                            }];
                }
            });
        });
    };
    WatsonX.prototype._getEndpoint = function (endpoint) {
        return "".concat(this.apiBase, "/ml/v1/").concat(this.deploymentId ? "deployments/".concat(this.deploymentId, "/") : "", "text/").concat(endpoint, "_stream?version=").concat(this.apiVersion);
    };
    WatsonX.prototype._convertMessage = function (message) {
        var message_ = message;
        if (message_.role === "tool") {
            message_.tool_call_id = message.toolCallId;
            delete message_.toolCallId;
        }
        else if (message.role === "assistant" && !!message.toolCalls) {
            message_.tool_calls = message.toolCalls.map(function (t) { return (__assign(__assign({}, t), { type: "function" })); });
            delete message_.toolCalls;
            delete message_.content;
        }
        else if (message_.role === "user" &&
            typeof message_.content === "string") {
            message_.content = [{ type: "text", text: message_.content }];
        }
        return message_;
    };
    WatsonX.prototype._convertArgs = function (options, messages) {
        var finalOptions = {
            messages: messages.map(this._convertMessage).filter(Boolean),
            model: options.model,
            max_tokens: options.maxTokens,
            temperature: options.temperature,
            top_p: options.topP,
            frequency_penalty: options.frequencyPenalty,
            presence_penalty: options.presencePenalty,
        };
        return finalOptions;
    };
    WatsonX.prototype._getHeaders = function () {
        return {
            "Content-Type": "application/json",
            Authorization: "".concat(watsonxToken.expiration === -1 ? "ZenApiKey" : "Bearer", " ").concat(watsonxToken.token),
        };
    };
    WatsonX.prototype.updateWatsonxToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var now;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        now = new Date().getTime() / 1000;
                        if (!(watsonxToken === undefined ||
                            now > watsonxToken.expiration ||
                            watsonxToken.token === undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getBearerToken()];
                    case 1:
                        watsonxToken = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        console.log("Reusing token (expires in ".concat((watsonxToken.expiration - now) / 60, " mins)"));
                        _a.label = 3;
                    case 3:
                        if (watsonxToken.token === undefined) {
                            throw new Error("Something went wrong. Check your credentials, please.");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    WatsonX.prototype._complete = function (prompt, signal, options) {
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
    WatsonX.prototype._streamComplete = function (prompt, signal, options) {
        return __asyncGenerator(this, arguments, function _streamComplete_1() {
            var stopSequences, url, headers, parameters, payload, response, _loop_1, _a, _b, _c, e_2_1;
            var _d, e_2, _e, _f;
            var _g, _h, _j, _k;
            return __generator(this, function (_l) {
                switch (_l.label) {
                    case 0: return [4 /*yield*/, __await(this.updateWatsonxToken())];
                    case 1:
                        _l.sent();
                        stopSequences = (_h = (_g = options.stop) === null || _g === void 0 ? void 0 : _g.slice(0, 6)) !== null && _h !== void 0 ? _h : [];
                        url = this._getEndpoint("generation");
                        headers = this._getHeaders();
                        parameters = {
                            decoding_method: "greedy",
                            max_new_tokens: (_j = options.maxTokens) !== null && _j !== void 0 ? _j : 1024,
                            min_new_tokens: 1,
                            stop_sequences: stopSequences,
                            include_stop_sequence: false,
                            truncate_input_tokens: this.contextLength - ((_k = options.maxTokens) !== null && _k !== void 0 ? _k : 1024),
                            repetition_penalty: options.frequencyPenalty || 1,
                        };
                        if (!!options.temperature) {
                            parameters.decoding_method = "sample";
                            parameters.temperature = options.temperature;
                            parameters.top_p = options.topP || 1.0;
                            parameters.top_k = options.topK || 100;
                        }
                        payload = {
                            input: prompt,
                            parameters: parameters,
                        };
                        if (!this.deploymentId) {
                            payload.model_id = options.model;
                            payload.project_id = this.projectId;
                        }
                        return [4 /*yield*/, __await(this.fetch(url, {
                                method: "POST",
                                headers: headers,
                                body: JSON.stringify(payload),
                                signal: signal,
                            }))];
                    case 2:
                        response = _l.sent();
                        _l.label = 3;
                    case 3:
                        _l.trys.push([3, 9, 10, 15]);
                        _loop_1 = function () {
                            var value, lines, generatedChunk, generatedTextIndex;
                            return __generator(this, function (_m) {
                                switch (_m.label) {
                                    case 0:
                                        _f = _c.value;
                                        _a = false;
                                        value = _f;
                                        lines = value.split("\n");
                                        generatedChunk = "";
                                        generatedTextIndex = undefined;
                                        lines.forEach(function (el) {
                                            // console.log(`${el}`);
                                            if (el.startsWith("id:")) {
                                                generatedTextIndex = parseInt(el.replace(/^id:\s+/, ""));
                                                if (isNaN(generatedTextIndex)) {
                                                    console.error("Unable to parse stream chunk ID: ".concat(el));
                                                }
                                            }
                                            else if (el.startsWith("data:")) {
                                                var dataStr = el.replace(/^data:\s+/, "");
                                                try {
                                                    var data = JSON.parse(dataStr);
                                                    data.results.forEach(function (result) {
                                                        generatedChunk += result.generated_text || "";
                                                    });
                                                }
                                                catch (e) {
                                                    // parsing error is expected with streaming response
                                                    // console.error(`Error parsing JSON string: ${dataStr}`, e);
                                                }
                                            }
                                        });
                                        return [4 /*yield*/, __await(generatedChunk)];
                                    case 1: return [4 /*yield*/, _m.sent()];
                                    case 2:
                                        _m.sent();
                                        return [2 /*return*/];
                                }
                            });
                        };
                        _a = true, _b = __asyncValues((0, fetch_1.streamResponse)(response));
                        _l.label = 4;
                    case 4: return [4 /*yield*/, __await(_b.next())];
                    case 5:
                        if (!(_c = _l.sent(), _d = _c.done, !_d)) return [3 /*break*/, 8];
                        return [5 /*yield**/, _loop_1()];
                    case 6:
                        _l.sent();
                        _l.label = 7;
                    case 7:
                        _a = true;
                        return [3 /*break*/, 4];
                    case 8: return [3 /*break*/, 15];
                    case 9:
                        e_2_1 = _l.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 15];
                    case 10:
                        _l.trys.push([10, , 13, 14]);
                        if (!(!_a && !_d && (_e = _b.return))) return [3 /*break*/, 12];
                        return [4 /*yield*/, __await(_e.call(_b))];
                    case 11:
                        _l.sent();
                        _l.label = 12;
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
    WatsonX.prototype._streamChat = function (messages, signal, options) {
        return __asyncGenerator(this, arguments, function _streamChat_1() {
            var stopSequences, url, headers, payload, response, toolName, toolCallId, accumulatedArgs, _a, _b, _c, value, message, chunk, args, toolCall, e_3_1;
            var _d, e_3, _e, _f;
            var _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8;
            return __generator(this, function (_9) {
                switch (_9.label) {
                    case 0: return [4 /*yield*/, __await(this.updateWatsonxToken())];
                    case 1:
                        _9.sent();
                        stopSequences = (_h = (_g = options.stop) === null || _g === void 0 ? void 0 : _g.slice(0, 6)) !== null && _h !== void 0 ? _h : [];
                        url = this._getEndpoint("chat");
                        headers = this._getHeaders();
                        payload = {
                            messages: messages.map(this._convertMessage).filter(Boolean),
                            max_tokens: (_j = options.maxTokens) !== null && _j !== void 0 ? _j : 1024,
                            stop: stopSequences,
                            frequency_penalty: (_k = options.frequencyPenalty) !== null && _k !== void 0 ? _k : 0,
                            presence_penalty: (_l = options.presencePenalty) !== null && _l !== void 0 ? _l : 0,
                        };
                        if (!this.deploymentId) {
                            payload.model_id = options.model;
                            payload.project_id = this.projectId;
                        }
                        if (!!options.temperature) {
                            payload.temperature = options.temperature;
                        }
                        if (!!options.topP) {
                            payload.top_p = options.topP;
                        }
                        if (!!options.tools) {
                            payload.tools = options.tools;
                            if (options.toolChoice) {
                                payload.tool_choice = options.toolChoice;
                            }
                            else {
                                payload.tool_choice_option = "auto";
                            }
                        }
                        return [4 /*yield*/, __await(this.fetch(url, {
                                method: "POST",
                                headers: headers,
                                body: JSON.stringify(payload),
                                signal: signal,
                            }))];
                    case 2:
                        response = _9.sent();
                        toolCallId = null;
                        accumulatedArgs = "";
                        _9.label = 3;
                    case 3:
                        _9.trys.push([3, 13, 14, 19]);
                        _a = true, _b = __asyncValues((0, fetch_1.streamSse)(response));
                        _9.label = 4;
                    case 4: return [4 /*yield*/, __await(_b.next())];
                    case 5:
                        if (!(_c = _9.sent(), _d = _c.done, !_d)) return [3 /*break*/, 12];
                        _f = _c.value;
                        _a = false;
                        value = _f;
                        message = (0, openaiTypeConverters_js_1.fromChatCompletionChunk)(value);
                        if (!!!message) return [3 /*break*/, 11];
                        if (!((message === null || message === void 0 ? void 0 : message.toolCalls) &&
                            ((_m = message.toolCalls) === null || _m === void 0 ? void 0 : _m.length) !== 0)) return [3 /*break*/, 8];
                        chunk = message;
                        if (!!((_p = (_o = chunk.toolCalls) === null || _o === void 0 ? void 0 : _o[0]) === null || _p === void 0 ? void 0 : _p.id)) {
                            toolCallId = (_r = (_q = chunk.toolCalls) === null || _q === void 0 ? void 0 : _q[0]) === null || _r === void 0 ? void 0 : _r.id;
                        }
                        if (!!((_u = (_t = (_s = chunk.toolCalls) === null || _s === void 0 ? void 0 : _s[0]) === null || _t === void 0 ? void 0 : _t.function) === null || _u === void 0 ? void 0 : _u.name)) {
                            accumulatedArgs = "";
                            toolName = chunk.toolCalls[0].function.name;
                            return [3 /*break*/, 11];
                        }
                        if (!!toolName) {
                            if (((_w = (_v = value === null || value === void 0 ? void 0 : value.choices) === null || _v === void 0 ? void 0 : _v[0]) === null || _w === void 0 ? void 0 : _w.finish_reason) === "tool_calls") {
                                args = void 0;
                                try {
                                    accumulatedArgs += (_z = (_y = (_x = chunk.toolCalls) === null || _x === void 0 ? void 0 : _x[0]) === null || _y === void 0 ? void 0 : _y.function) === null || _z === void 0 ? void 0 : _z.arguments;
                                    // Check if accumulated argument chunks are parsable
                                    args = JSON.stringify(JSON.parse(accumulatedArgs));
                                }
                                catch (e) {
                                    // Otherwise use arguments from final assistant tool call message
                                    args = (_2 = (_1 = (_0 = chunk.toolCalls) === null || _0 === void 0 ? void 0 : _0[0]) === null || _1 === void 0 ? void 0 : _1.function) === null || _2 === void 0 ? void 0 : _2.arguments;
                                }
                                toolCall = {
                                    function: { name: toolName, arguments: args },
                                    id: toolCallId,
                                };
                                chunk.toolCalls = [toolCall];
                            }
                            else {
                                if (!!((_5 = (_4 = (_3 = chunk.toolCalls) === null || _3 === void 0 ? void 0 : _3[0]) === null || _4 === void 0 ? void 0 : _4.function) === null || _5 === void 0 ? void 0 : _5.arguments))
                                    accumulatedArgs += (_8 = (_7 = (_6 = chunk.toolCalls) === null || _6 === void 0 ? void 0 : _6[0]) === null || _7 === void 0 ? void 0 : _7.function) === null || _8 === void 0 ? void 0 : _8.arguments;
                                return [3 /*break*/, 11];
                            }
                        }
                        return [4 /*yield*/, __await(chunk)];
                    case 6: return [4 /*yield*/, _9.sent()];
                    case 7:
                        _9.sent();
                        return [3 /*break*/, 11];
                    case 8: return [4 /*yield*/, __await(message)];
                    case 9: return [4 /*yield*/, _9.sent()];
                    case 10:
                        _9.sent();
                        _9.label = 11;
                    case 11:
                        _a = true;
                        return [3 /*break*/, 4];
                    case 12: return [3 /*break*/, 19];
                    case 13:
                        e_3_1 = _9.sent();
                        e_3 = { error: e_3_1 };
                        return [3 /*break*/, 19];
                    case 14:
                        _9.trys.push([14, , 17, 18]);
                        if (!(!_a && !_d && (_e = _b.return))) return [3 /*break*/, 16];
                        return [4 /*yield*/, __await(_e.call(_b))];
                    case 15:
                        _9.sent();
                        _9.label = 16;
                    case 16: return [3 /*break*/, 18];
                    case 17:
                        if (e_3) throw e_3.error;
                        return [7 /*endfinally*/];
                    case 18: return [7 /*endfinally*/];
                    case 19: return [2 /*return*/];
                }
            });
        });
    };
    WatsonX.prototype._embed = function (chunks) {
        return __awaiter(this, void 0, void 0, function () {
            var payload, headers, resp, _a, _b, data, embeddings;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.updateWatsonxToken()];
                    case 1:
                        _c.sent();
                        payload = {
                            inputs: chunks,
                            parameters: {
                                truncate_input_tokens: 500,
                                return_options: { input_text: false },
                            },
                            model_id: this.model,
                            project_id: this.projectId,
                        };
                        headers = {
                            "Content-Type": "application/json",
                            Authorization: "".concat(watsonxToken.expiration === -1 ? "ZenApiKey" : "Bearer", " ").concat(watsonxToken.token),
                        };
                        return [4 /*yield*/, this.fetch(new URL("".concat(this.apiBase, "/ml/v1/text/embeddings?version=").concat(this.apiVersion)), {
                                method: "POST",
                                body: JSON.stringify(payload),
                                headers: headers,
                            })];
                    case 2:
                        resp = _c.sent();
                        if (!!resp.ok) return [3 /*break*/, 4];
                        _a = Error.bind;
                        _b = "Failed to embed chunk: ".concat;
                        return [4 /*yield*/, resp.text()];
                    case 3: throw new (_a.apply(Error, [void 0, _b.apply("Failed to embed chunk: ", [_c.sent()])]))();
                    case 4: return [4 /*yield*/, resp.json()];
                    case 5:
                        data = _c.sent();
                        embeddings = data.results;
                        if (!embeddings || embeddings.length === 0) {
                            throw new Error("Watsonx generated empty embedding");
                        }
                        return [2 /*return*/, embeddings.map(function (e) { return e.embedding; })];
                }
            });
        });
    };
    WatsonX.prototype.rerank = function (query, chunks) {
        return __awaiter(this, void 0, void 0, function () {
            var headers, payload, resp, _a, _b, data, ranking, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!query || !chunks.length) {
                            throw new Error("Query and chunks must not be empty");
                        }
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 7, , 8]);
                        return [4 /*yield*/, this.updateWatsonxToken()];
                    case 2:
                        _c.sent();
                        headers = {
                            "Content-Type": "application/json",
                            Authorization: "".concat(watsonxToken.expiration === -1 ? "ZenApiKey" : "Bearer", " ").concat(watsonxToken.token),
                        };
                        payload = {
                            inputs: chunks.map(function (chunk) { return ({ text: chunk.content }); }),
                            query: query,
                            parameters: {
                                truncate_input_tokens: 500,
                                return_options: {
                                    top_n: chunks.length,
                                },
                            },
                            model_id: this.model,
                            project_id: this.projectId,
                        };
                        return [4 /*yield*/, this.fetch(new URL("".concat(this.apiBase, "/ml/v1/text/rerank?version=").concat(this.apiVersion)), {
                                method: "POST",
                                headers: headers,
                                body: JSON.stringify(payload),
                            })];
                    case 3:
                        resp = _c.sent();
                        if (!!resp.ok) return [3 /*break*/, 5];
                        _a = Error.bind;
                        _b = "Failed to rerank chunks: ".concat;
                        return [4 /*yield*/, resp.text()];
                    case 4: throw new (_a.apply(Error, [void 0, _b.apply("Failed to rerank chunks: ", [_c.sent()])]))();
                    case 5: return [4 /*yield*/, resp.json()];
                    case 6:
                        data = _c.sent();
                        ranking = data.results;
                        if (!ranking) {
                            throw new Error("Empty response received from Watsonx");
                        }
                        // Sort results by index to maintain original order
                        return [2 /*return*/, ranking
                                .sort(function (a, b) { return a.index - b.index; })
                                .map(function (result) { return result.score; })];
                    case 7:
                        error_1 = _c.sent();
                        console.error("Error in WatsonxReranker.rerank:", error_1);
                        throw error_1;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    WatsonX.defaultOptions = {
        maxEmbeddingBatchSize: 1000,
    };
    WatsonX.providerName = "watsonx";
    return WatsonX;
}(index_js_1.BaseLLM));
exports.default = WatsonX;
