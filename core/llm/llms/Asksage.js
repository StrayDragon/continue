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
var form_data_1 = require("form-data");
var index_js_1 = require("../index.js");
var DEFAULT_API_URL = "https://api.asksage.ai/server";
var DEFAULT_USER_API_URL = "https://api.asksage.ai/user";
var TOKEN_TTL = 3600000; // 1 hour in milliseconds
var Asksage = /** @class */ (function (_super) {
    __extends(Asksage, _super);
    function Asksage(options) {
        var _a;
        var _this = _super.call(this, options) || this;
        _this.sessionTokenPromise = null;
        _this.tokenTimestamp = 0;
        _this.apiVersion = (_a = options.apiVersion) !== null && _a !== void 0 ? _a : "v1.2.4";
        _this.email = process.env.ASKSAGE_EMAIL;
        _this.userApiUrl = process.env.ASKSAGE_USER_API_URL || DEFAULT_USER_API_URL;
        return _this;
    }
    Asksage.prototype.getSessionToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, res, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.apiKey) {
                            throw new Error("AskSage adapter: missing ASKSAGE_API_KEY. Provide it in your environment variables or .env file.");
                        }
                        // If no email, use API key directly
                        if (!this.email || this.email.length === 0) {
                            return [2 /*return*/, this.apiKey];
                        }
                        url = this.userApiUrl.replace(/\/$/, "") + "/get-token-with-api-key";
                        return [4 /*yield*/, this.fetch(url, {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ email: this.email, api_key: this.apiKey }),
                            })];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2:
                        data = (_a.sent());
                        if (parseInt(String(data.status)) !== 200) {
                            throw new Error("Error getting access token: " + JSON.stringify(data));
                        }
                        return [2 /*return*/, data.response.access_token];
                }
            });
        });
    };
    Asksage.prototype.getToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // Check if token needs refresh
                if (!this.sessionTokenPromise ||
                    Date.now() - this.tokenTimestamp > TOKEN_TTL) {
                    this.sessionTokenPromise = this.getSessionToken();
                    this.tokenTimestamp = Date.now();
                }
                return [2 /*return*/, this.sessionTokenPromise];
            });
        });
    };
    Asksage.prototype.isFileLike = function (val) {
        return (val !== null &&
            val !== undefined &&
            ((typeof File !== "undefined" && val instanceof File) ||
                (typeof Buffer !== "undefined" && val instanceof Buffer) ||
                (typeof val === "object" &&
                    ("path" in val || "name" in val || "type" in val))));
    };
    Asksage.prototype.toFormData = function (args) {
        var form = new form_data_1.default();
        for (var _i = 0, _a = Object.entries(args); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            if (value === undefined || value === null)
                continue;
            if (key === "file" && value) {
                if (Buffer.isBuffer(value)) {
                    form.append("file", value, "file");
                }
                else if (typeof value === "string") {
                    form.append("file", value);
                }
                else {
                    form.append("file", value);
                }
            }
            else if (Array.isArray(value) || typeof value === "object") {
                form.append(key, JSON.stringify(value));
            }
            else {
                form.append(key, String(value));
            }
        }
        return form;
    };
    Asksage.prototype._convertMessage = function (message) {
        return {
            user: message.role === "assistant" ? "gpt" : "me",
            message: typeof message.content === "string"
                ? message.content
                : message.content
                    .filter(function (part) { return part.type === "text"; })
                    .map(function (part) { return part.text; })
                    .join(""),
        };
    };
    Asksage.prototype._convertArgs = function (options, messages) {
        var _a, _b, _c;
        var formattedMessage;
        if (messages.length === 1) {
            formattedMessage = messages[0].content;
        }
        else {
            formattedMessage = messages.map(this._convertMessage);
        }
        var args = {
            message: formattedMessage,
            model: options.model,
            temperature: (_a = options.temperature) !== null && _a !== void 0 ? _a : 0.0,
            mode: "chat", // Always use chat mode
            limit_references: 0, // Always use 0
            persona: options.persona,
            system_prompt: (_c = (_b = options.systemPrompt) !== null && _b !== void 0 ? _b : process.env.ASKSAGE_SYSTEM_PROMPT) !== null && _c !== void 0 ? _c : "You are an expert software developer. You give helpful and concise responses.",
            tools: options.askSageTools,
            // enabled_mcp_tools: options.enabledMcpTools as string[] | undefined,
            // tools_to_execute: options.toolsToExecute as string[] | undefined,
            tool_choice: options.askSageToolChoice,
            reasoning_effort: options.reasoningEffort,
            deep_agent_id: options.deepAgentId,
            streaming: options.streaming,
            file: options.file,
        };
        // Remove undefined values
        Object.keys(args).forEach(function (key) {
            return args[key] === undefined &&
                delete args[key];
        });
        return args;
    };
    Asksage.prototype._getHeaders = function () {
        return __awaiter(this, arguments, void 0, function (hasFile) {
            var token, headers;
            if (hasFile === void 0) { hasFile = false; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getToken()];
                    case 1:
                        token = _a.sent();
                        headers = {
                            accept: "application/json",
                            "x-access-tokens": token,
                        };
                        if (!hasFile) {
                            headers["Content-Type"] = "application/json";
                        }
                        return [2 /*return*/, headers];
                }
            });
        });
    };
    Asksage.prototype._getEndpoint = function (endpoint) {
        if (!this.apiBase) {
            throw new Error("No API base URL provided. Please set the 'apiBase' option.");
        }
        return new URL(endpoint, this.apiBase);
    };
    Asksage.prototype._complete = function (prompt, signal, options) {
        return __awaiter(this, void 0, void 0, function () {
            var messages, args, hasFile, endpoint, response, form, headers, headers, errText, data, error_1;
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (typeof prompt !== "string" || prompt.trim() === "") {
                            throw new Error("Prompt must be a non-empty string.");
                        }
                        messages = [{ role: "user", content: prompt }];
                        args = this._convertArgs(options, messages);
                        hasFile = this.isFileLike(args.file);
                        endpoint = hasFile ? "query_with_file" : "query";
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 11, , 12]);
                        response = void 0;
                        if (!hasFile) return [3 /*break*/, 4];
                        form = this.toFormData(args);
                        return [4 /*yield*/, this._getHeaders(true)];
                    case 2:
                        headers = _d.sent();
                        return [4 /*yield*/, this.fetch(this._getEndpoint(endpoint), {
                                method: "POST",
                                headers: __assign(__assign({}, headers), form.getHeaders()),
                                body: form,
                                signal: signal,
                            })];
                    case 3:
                        response = _d.sent();
                        return [3 /*break*/, 7];
                    case 4: return [4 /*yield*/, this._getHeaders(false)];
                    case 5:
                        headers = _d.sent();
                        return [4 /*yield*/, this.fetch(this._getEndpoint(endpoint), {
                                method: "POST",
                                headers: headers,
                                body: JSON.stringify(args),
                                signal: signal,
                            })];
                    case 6:
                        response = _d.sent();
                        _d.label = 7;
                    case 7:
                        if (response.status === 499) {
                            return [2 /*return*/, ""]; // Aborted by user
                        }
                        if (!!response.ok) return [3 /*break*/, 9];
                        return [4 /*yield*/, response.text()];
                    case 8:
                        errText = _d.sent();
                        // Clear token cache on 401
                        if (response.status === 401) {
                            this.sessionTokenPromise = null;
                            this.tokenTimestamp = 0;
                        }
                        throw new Error("AskSage API error: ".concat(response.status, " ").concat(response.statusText, ": ").concat(errText));
                    case 9: return [4 /*yield*/, response.json()];
                    case 10:
                        data = (_d.sent());
                        return [2 /*return*/, (data.text ||
                                data.answer ||
                                data.message ||
                                ((_c = (_b = (_a = data.choices) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.message) === null || _c === void 0 ? void 0 : _c.content) ||
                                "")];
                    case 11:
                        error_1 = _d.sent();
                        if (error_1 instanceof Error) {
                            throw new Error("AskSage client error: ".concat(error_1.message));
                        }
                        throw error_1;
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    Asksage.prototype._streamComplete = function (prompt, signal, options) {
        return __asyncGenerator(this, arguments, function _streamComplete_1() {
            var completion;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, __await(this._complete(prompt, signal, options))];
                    case 1:
                        completion = _a.sent();
                        return [4 /*yield*/, __await(completion)];
                    case 2: return [4 /*yield*/, _a.sent()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Asksage.prototype._streamChat = function (messages, signal, options) {
        return __asyncGenerator(this, arguments, function _streamChat_1() {
            var args, hasFile, endpoint, response, form, headers, headers, errText, data, assistantMessage, error_2;
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        args = this._convertArgs(options, messages);
                        hasFile = this.isFileLike(args.file);
                        endpoint = hasFile ? "query_with_file" : "query";
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 15, , 16]);
                        response = void 0;
                        if (!hasFile) return [3 /*break*/, 4];
                        form = this.toFormData(args);
                        return [4 /*yield*/, __await(this._getHeaders(true))];
                    case 2:
                        headers = _d.sent();
                        return [4 /*yield*/, __await(this.fetch(this._getEndpoint(endpoint), {
                                method: "POST",
                                headers: __assign(__assign({}, headers), form.getHeaders()),
                                body: form,
                                signal: signal,
                            }))];
                    case 3:
                        response = _d.sent();
                        return [3 /*break*/, 7];
                    case 4: return [4 /*yield*/, __await(this._getHeaders(false))];
                    case 5:
                        headers = _d.sent();
                        return [4 /*yield*/, __await(this.fetch(this._getEndpoint(endpoint), {
                                method: "POST",
                                headers: headers,
                                body: JSON.stringify(args),
                                signal: signal,
                            }))];
                    case 6:
                        response = _d.sent();
                        _d.label = 7;
                    case 7:
                        if (!(response.status === 499)) return [3 /*break*/, 9];
                        return [4 /*yield*/, __await(void 0)];
                    case 8: return [2 /*return*/, _d.sent()]; // Aborted by user
                    case 9:
                        if (!!response.ok) return [3 /*break*/, 11];
                        return [4 /*yield*/, __await(response.text())];
                    case 10:
                        errText = _d.sent();
                        // Clear token cache on 401
                        if (response.status === 401) {
                            this.sessionTokenPromise = null;
                            this.tokenTimestamp = 0;
                        }
                        throw new Error("AskSage API error: ".concat(response.status, " ").concat(response.statusText, ": ").concat(errText));
                    case 11: return [4 /*yield*/, __await(response.json())];
                    case 12:
                        data = (_d.sent());
                        assistantMessage = {
                            role: "assistant",
                            content: data.text ||
                                data.answer ||
                                data.message ||
                                ((_c = (_b = (_a = data.choices) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.message) === null || _c === void 0 ? void 0 : _c.content) ||
                                "",
                        };
                        return [4 /*yield*/, __await(assistantMessage)];
                    case 13: return [4 /*yield*/, _d.sent()];
                    case 14:
                        _d.sent();
                        return [3 /*break*/, 16];
                    case 15:
                        error_2 = _d.sent();
                        if (error_2 instanceof Error) {
                            throw new Error("AskSage client error: ".concat(error_2.message));
                        }
                        throw error_2;
                    case 16: return [2 /*return*/];
                }
            });
        });
    };
    Asksage.prototype.listModels = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, []];
            });
        });
    };
    Asksage.providerName = "askSage";
    Asksage.defaultOptions = {
        apiBase: DEFAULT_API_URL,
        model: "gpt-4o",
    };
    return Asksage;
}(index_js_1.BaseLLM));
exports.default = Asksage;
