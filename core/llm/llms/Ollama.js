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
var async_mutex_1 = require("async-mutex");
var uuid_1 = require("uuid");
var fetch_1 = require("@continuedev/fetch");
var messageContent_js_1 = require("../../util/messageContent.js");
var ollamaHelper_js_1 = require("../../util/ollamaHelper.js");
var index_js_1 = require("../index.js");
var Ollama = /** @class */ (function (_super) {
    __extends(Ollama, _super);
    function Ollama(options) {
        var _this = _super.call(this, options) || this;
        _this.fimSupported = false;
        // Map of "continue model name" to Ollama actual model name
        _this.modelMap = {
            "mistral-7b": "mistral:7b",
            "mixtral-8x7b": "mixtral:8x7b",
            "llama2-7b": "llama2:7b",
            "llama2-13b": "llama2:13b",
            "codellama-7b": "codellama:7b",
            "codellama-13b": "codellama:13b",
            "codellama-34b": "codellama:34b",
            "codellama-70b": "codellama:70b",
            "llama3-8b": "llama3:8b",
            "llama3-70b": "llama3:70b",
            "llama3.1-8b": "llama3.1:8b",
            "llama3.1-70b": "llama3.1:70b",
            "llama3.1-405b": "llama3.1:405b",
            "llama3.2-1b": "llama3.2:1b",
            "llama3.2-3b": "llama3.2:3b",
            "llama3.2-11b": "llama3.2:11b",
            "llama3.2-90b": "llama3.2:90b",
            "phi-2": "phi:2.7b",
            "phind-codellama-34b": "phind-codellama:34b-v2",
            "qwen2.5-coder-0.5b": "qwen2.5-coder:0.5b",
            "qwen2.5-coder-1.5b": "qwen2.5-coder:1.5b",
            "qwen2.5-coder-3b": "qwen2.5-coder:3b",
            "qwen2.5-coder-7b": "qwen2.5-coder:7b",
            "qwen2.5-coder-14b": "qwen2.5-coder:14b",
            "qwen2.5-coder-32b": "qwen2.5-coder:32b",
            "wizardcoder-7b": "wizardcoder:7b-python",
            "wizardcoder-13b": "wizardcoder:13b-python",
            "wizardcoder-34b": "wizardcoder:34b-python",
            "zephyr-7b": "zephyr:7b",
            "codeup-13b": "codeup:13b",
            "deepseek-1b": "deepseek-coder:1.3b",
            "deepseek-7b": "deepseek-coder:6.7b",
            "deepseek-33b": "deepseek-coder:33b",
            "neural-chat-7b": "neural-chat:7b-v3.3",
            "starcoder-1b": "starcoder:1b",
            "starcoder-3b": "starcoder:3b",
            "starcoder2-3b": "starcoder2:3b",
            "stable-code-3b": "stable-code:3b",
            "granite-code-3b": "granite-code:3b",
            "granite-code-8b": "granite-code:8b",
            "granite-code-20b": "granite-code:20b",
            "granite-code-34b": "granite-code:34b",
        };
        if (options.model === "AUTODETECT") {
            return _this;
        }
        var headers = {
            "Content-Type": "application/json",
        };
        if (_this.apiKey) {
            headers.Authorization = "Bearer ".concat(_this.apiKey);
        }
        _this.fetch(_this.getEndpoint("api/show"), {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ name: _this._getModel() }),
        })
            .then(function (response) { return __awaiter(_this, void 0, void 0, function () {
            var body, params, _i, _a, line, parts, key, value;
            var _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if ((response === null || response === void 0 ? void 0 : response.status) !== 200) {
                            // console.warn(
                            //   "Error calling Ollama /api/show endpoint: ",
                            //   await response.text(),
                            // );
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, response.json()];
                    case 1:
                        body = _d.sent();
                        if (body.parameters) {
                            params = [];
                            for (_i = 0, _a = body.parameters.split("\n"); _i < _a.length; _i++) {
                                line = _a[_i];
                                parts = line.match(/^(\S+)\s+((?:".*")|\S+)$/);
                                if (parts.length < 2) {
                                    continue;
                                }
                                key = parts[1];
                                value = parts[2];
                                switch (key) {
                                    case "num_ctx":
                                        this._contextLength =
                                            (_b = options.contextLength) !== null && _b !== void 0 ? _b : Number.parseInt(value);
                                        break;
                                    case "stop":
                                        if (!this.completionOptions.stop) {
                                            this.completionOptions.stop = [];
                                        }
                                        try {
                                            this.completionOptions.stop.push(JSON.parse(value));
                                        }
                                        catch (e) {
                                            console.warn("Error parsing stop parameter value \"{value}: ".concat(e));
                                        }
                                        break;
                                    default:
                                        break;
                                }
                            }
                        }
                        /**
                         * There is no API to get the model's FIM capabilities, so we have to
                         * make an educated guess. If a ".Suffix" variable appears in the template
                         * it's a good indication the model supports FIM.
                         */
                        this.fimSupported = !!((_c = body === null || body === void 0 ? void 0 : body.template) === null || _c === void 0 ? void 0 : _c.includes(".Suffix"));
                        return [2 /*return*/];
                }
            });
        }); })
            .catch(function (e) {
            // console.warn("Error calling the Ollama /api/show endpoint: ", e);
        });
        return _this;
    }
    Ollama.prototype._getModel = function () {
        var _a;
        return (_a = this.modelMap[this.model]) !== null && _a !== void 0 ? _a : this.model;
    };
    Object.defineProperty(Ollama.prototype, "contextLength", {
        get: function () {
            var _a;
            var DEFAULT_OLLAMA_CONTEXT_LENGTH = 8192; // twice of https://github.com/ollama/ollama/blob/29ddfc2cab7f5a83a96c3133094f67b22e4f27d1/envconfig/config.go#L185
            return (_a = this._contextLength) !== null && _a !== void 0 ? _a : DEFAULT_OLLAMA_CONTEXT_LENGTH;
        },
        enumerable: false,
        configurable: true
    });
    Ollama.prototype._getModelFileParams = function (options) {
        return {
            temperature: options.temperature,
            top_p: options.topP,
            top_k: options.topK,
            num_predict: options.maxTokens,
            stop: options.stop,
            num_ctx: this.contextLength,
            mirostat: options.mirostat,
            num_thread: options.numThreads,
            use_mmap: options.useMmap,
            min_p: options.minP,
            num_gpu: options.numGpu,
        };
    };
    Ollama.prototype._convertToOllamaMessage = function (message) {
        var ollamaMessage = {
            role: message.role,
            content: "",
        };
        ollamaMessage.content = (0, messageContent_js_1.renderChatMessage)(message);
        if (Array.isArray(message.content)) {
            var images_1 = [];
            message.content.forEach(function (part) {
                var _a;
                if (part.type === "imageUrl" && part.imageUrl) {
                    var image = (_a = part.imageUrl) === null || _a === void 0 ? void 0 : _a.url.split(",").at(-1);
                    if (image) {
                        images_1.push(image);
                    }
                }
            });
            if (images_1.length > 0) {
                ollamaMessage.images = images_1;
            }
        }
        return ollamaMessage;
    };
    Ollama.prototype._getGenerateOptions = function (options, prompt, suffix) {
        var _a;
        return {
            model: this._getModel(),
            prompt: prompt,
            suffix: suffix,
            raw: options.raw,
            options: this._getModelFileParams(options),
            keep_alive: (_a = options.keepAlive) !== null && _a !== void 0 ? _a : 60 * 30, // 30 minutes
            stream: options.stream,
            // Not supported yet: context, images, system, template, format
        };
    };
    Ollama.prototype.getEndpoint = function (endpoint) {
        var base = this.apiBase;
        if (process.env.IS_BINARY) {
            base = base === null || base === void 0 ? void 0 : base.replace("localhost", "127.0.0.1");
        }
        return new URL(endpoint, base);
    };
    Ollama.prototype._streamComplete = function (prompt, signal, options) {
        return __asyncGenerator(this, arguments, function _streamComplete_1() {
            var headers, response, buffer, _a, _b, _c, value, chunks, i, chunk, j, e_1, e_2_1;
            var _d, e_2, _e, _f;
            var _g, _h;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        headers = {
                            "Content-Type": "application/json",
                        };
                        if (this.apiKey) {
                            headers.Authorization = "Bearer ".concat(this.apiKey);
                        }
                        return [4 /*yield*/, __await(this.fetch(this.getEndpoint("api/generate"), {
                                method: "POST",
                                headers: headers,
                                body: JSON.stringify(this._getGenerateOptions(options, prompt)),
                                signal: signal,
                            }))];
                    case 1:
                        response = _j.sent();
                        buffer = "";
                        _j.label = 2;
                    case 2:
                        _j.trys.push([2, 13, 14, 19]);
                        _a = true, _b = __asyncValues((0, fetch_1.streamResponse)(response));
                        _j.label = 3;
                    case 3: return [4 /*yield*/, __await(_b.next())];
                    case 4:
                        if (!(_c = _j.sent(), _d = _c.done, !_d)) return [3 /*break*/, 12];
                        _f = _c.value;
                        _a = false;
                        value = _f;
                        // Append the received chunk to the buffer
                        buffer += value;
                        chunks = buffer.split("\n");
                        buffer = (_g = chunks.pop()) !== null && _g !== void 0 ? _g : "";
                        i = 0;
                        _j.label = 5;
                    case 5:
                        if (!(i < chunks.length)) return [3 /*break*/, 11];
                        chunk = chunks[i];
                        if (!(chunk.trim() !== "")) return [3 /*break*/, 10];
                        _j.label = 6;
                    case 6:
                        _j.trys.push([6, 9, , 10]);
                        j = JSON.parse(chunk);
                        if ("error" in j) {
                            throw new Error(j.error);
                        }
                        (_h = j.response) !== null && _h !== void 0 ? _h : (j.response = "");
                        return [4 /*yield*/, __await(j.response)];
                    case 7: return [4 /*yield*/, _j.sent()];
                    case 8:
                        _j.sent();
                        return [3 /*break*/, 10];
                    case 9:
                        e_1 = _j.sent();
                        throw new Error("Error parsing Ollama response: ".concat(e_1, " ").concat(chunk));
                    case 10:
                        i++;
                        return [3 /*break*/, 5];
                    case 11:
                        _a = true;
                        return [3 /*break*/, 3];
                    case 12: return [3 /*break*/, 19];
                    case 13:
                        e_2_1 = _j.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 19];
                    case 14:
                        _j.trys.push([14, , 17, 18]);
                        if (!(!_a && !_d && (_e = _b.return))) return [3 /*break*/, 16];
                        return [4 /*yield*/, __await(_e.call(_b))];
                    case 15:
                        _j.sent();
                        _j.label = 16;
                    case 16: return [3 /*break*/, 18];
                    case 17:
                        if (e_2) throw e_2.error;
                        return [7 /*endfinally*/];
                    case 18: return [7 /*endfinally*/];
                    case 19: return [2 /*return*/];
                }
            });
        });
    };
    Ollama.prototype._streamChat = function (messages, signal, options) {
        return __asyncGenerator(this, arguments, function _streamChat_1() {
            function convertChatMessage(res) {
                if ("error" in res) {
                    throw new Error(res.error);
                }
                var _a = res.message, role = _a.role, content = _a.content, thinking = _a.thinking, toolCalls = _a.tool_calls;
                if (role === "tool") {
                    throw new Error("Unexpected message received from Ollama with role = tool");
                }
                if (role === "assistant") {
                    var thinkingMessage = thinking
                        ? { role: "thinking", content: thinking }
                        : null;
                    if (thinkingMessage && !content) {
                        // When Streaming you can't have both thinking and content
                        return [thinkingMessage];
                    }
                    // Either not thinking, or not streaming
                    var chatMessage = { role: "assistant", content: content };
                    if (toolCalls === null || toolCalls === void 0 ? void 0 : toolCalls.length) {
                        // Continue handles the response as a tool call delta but
                        // But ollama returns the full object in one response with no streaming
                        chatMessage.toolCalls = toolCalls.map(function (tc) { return ({
                            type: "function",
                            id: "tc_".concat((0, uuid_1.v4)()), // Generate a proper UUID with a prefix
                            function: {
                                name: tc.function.name,
                                arguments: JSON.stringify(tc.function.arguments),
                            },
                        }); });
                    }
                    // Return both thinking and chat messages if applicable
                    return thinkingMessage ? [thinkingMessage, chatMessage] : [chatMessage];
                }
                // Fallback for all other roles
                return [{ role: role, content: content }];
            }
            var ollamaMessages, chatOptions, headers, response, json, _i, _a, msg, buffer, _b, _c, _d, value, chunks, i, chunk, j, _e, _f, msg, e_3, e_4_1;
            var _g, e_4, _h, _j;
            var _k, _l, _m, _o;
            return __generator(this, function (_p) {
                switch (_p.label) {
                    case 0:
                        ollamaMessages = messages.map(this._convertToOllamaMessage);
                        chatOptions = {
                            model: this._getModel(),
                            messages: ollamaMessages,
                            options: this._getModelFileParams(options),
                            think: options.reasoning,
                            keep_alive: (_k = options.keepAlive) !== null && _k !== void 0 ? _k : 60 * 30, // 30 minutes
                            stream: options.stream,
                            // format: options.format, // Not currently in base completion options
                        };
                        // This logic is because tools can ONLY be included with user message for ollama
                        if (((_l = options.tools) === null || _l === void 0 ? void 0 : _l.length) && ((_m = ollamaMessages.at(-1)) === null || _m === void 0 ? void 0 : _m.role) === "user") {
                            chatOptions.tools = options.tools.map(function (tool) { return ({
                                type: "function",
                                function: {
                                    name: tool.function.name,
                                    description: tool.function.description,
                                    parameters: tool.function.parameters,
                                },
                            }); });
                        }
                        headers = {
                            "Content-Type": "application/json",
                        };
                        if (this.apiKey) {
                            headers.Authorization = "Bearer ".concat(this.apiKey);
                        }
                        return [4 /*yield*/, __await(this.fetch(this.getEndpoint("api/chat"), {
                                method: "POST",
                                headers: headers,
                                body: JSON.stringify(chatOptions),
                                signal: signal,
                            }))];
                    case 1:
                        response = _p.sent();
                        if (!(chatOptions.stream === false)) return [3 /*break*/, 10];
                        if (!(response.status === 499)) return [3 /*break*/, 3];
                        return [4 /*yield*/, __await(void 0)];
                    case 2: return [2 /*return*/, _p.sent()]; // Aborted by user
                    case 3: return [4 /*yield*/, __await(response.json())];
                    case 4:
                        json = (_p.sent());
                        _i = 0, _a = convertChatMessage(json);
                        _p.label = 5;
                    case 5:
                        if (!(_i < _a.length)) return [3 /*break*/, 9];
                        msg = _a[_i];
                        return [4 /*yield*/, __await(msg)];
                    case 6: return [4 /*yield*/, _p.sent()];
                    case 7:
                        _p.sent();
                        _p.label = 8;
                    case 8:
                        _i++;
                        return [3 /*break*/, 5];
                    case 9: return [3 /*break*/, 31];
                    case 10:
                        buffer = "";
                        _p.label = 11;
                    case 11:
                        _p.trys.push([11, 25, 26, 31]);
                        _b = true, _c = __asyncValues((0, fetch_1.streamResponse)(response));
                        _p.label = 12;
                    case 12: return [4 /*yield*/, __await(_c.next())];
                    case 13:
                        if (!(_d = _p.sent(), _g = _d.done, !_g)) return [3 /*break*/, 24];
                        _j = _d.value;
                        _b = false;
                        value = _j;
                        // Append the received chunk to the buffer
                        buffer += value;
                        chunks = buffer.split("\n");
                        buffer = (_o = chunks.pop()) !== null && _o !== void 0 ? _o : "";
                        i = 0;
                        _p.label = 14;
                    case 14:
                        if (!(i < chunks.length)) return [3 /*break*/, 23];
                        chunk = chunks[i];
                        if (!(chunk.trim() !== "")) return [3 /*break*/, 22];
                        _p.label = 15;
                    case 15:
                        _p.trys.push([15, 21, , 22]);
                        j = JSON.parse(chunk);
                        _e = 0, _f = convertChatMessage(j);
                        _p.label = 16;
                    case 16:
                        if (!(_e < _f.length)) return [3 /*break*/, 20];
                        msg = _f[_e];
                        return [4 /*yield*/, __await(msg)];
                    case 17: return [4 /*yield*/, _p.sent()];
                    case 18:
                        _p.sent();
                        _p.label = 19;
                    case 19:
                        _e++;
                        return [3 /*break*/, 16];
                    case 20: return [3 /*break*/, 22];
                    case 21:
                        e_3 = _p.sent();
                        throw new Error("Error parsing Ollama response: ".concat(e_3, " ").concat(chunk));
                    case 22:
                        i++;
                        return [3 /*break*/, 14];
                    case 23:
                        _b = true;
                        return [3 /*break*/, 12];
                    case 24: return [3 /*break*/, 31];
                    case 25:
                        e_4_1 = _p.sent();
                        e_4 = { error: e_4_1 };
                        return [3 /*break*/, 31];
                    case 26:
                        _p.trys.push([26, , 29, 30]);
                        if (!(!_b && !_g && (_h = _c.return))) return [3 /*break*/, 28];
                        return [4 /*yield*/, __await(_h.call(_c))];
                    case 27:
                        _p.sent();
                        _p.label = 28;
                    case 28: return [3 /*break*/, 30];
                    case 29:
                        if (e_4) throw e_4.error;
                        return [7 /*endfinally*/];
                    case 30: return [7 /*endfinally*/];
                    case 31: return [2 /*return*/];
                }
            });
        });
    };
    Ollama.prototype.supportsFim = function () {
        return this.fimSupported;
    };
    Ollama.prototype._streamFim = function (prefix, suffix, signal, options) {
        return __asyncGenerator(this, arguments, function _streamFim_1() {
            var headers, response, buffer, _a, _b, _c, value, chunks, i, chunk, j, e_5, e_6_1;
            var _d, e_6, _e, _f;
            var _g;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        headers = {
                            "Content-Type": "application/json",
                        };
                        if (this.apiKey) {
                            headers.Authorization = "Bearer ".concat(this.apiKey);
                        }
                        return [4 /*yield*/, __await(this.fetch(this.getEndpoint("api/generate"), {
                                method: "POST",
                                headers: headers,
                                body: JSON.stringify(this._getGenerateOptions(options, prefix, suffix)),
                                signal: signal,
                            }))];
                    case 1:
                        response = _h.sent();
                        buffer = "";
                        _h.label = 2;
                    case 2:
                        _h.trys.push([2, 15, 16, 21]);
                        _a = true, _b = __asyncValues((0, fetch_1.streamResponse)(response));
                        _h.label = 3;
                    case 3: return [4 /*yield*/, __await(_b.next())];
                    case 4:
                        if (!(_c = _h.sent(), _d = _c.done, !_d)) return [3 /*break*/, 14];
                        _f = _c.value;
                        _a = false;
                        value = _f;
                        // Append the received chunk to the buffer
                        buffer += value;
                        chunks = buffer.split("\n");
                        buffer = (_g = chunks.pop()) !== null && _g !== void 0 ? _g : "";
                        i = 0;
                        _h.label = 5;
                    case 5:
                        if (!(i < chunks.length)) return [3 /*break*/, 13];
                        chunk = chunks[i];
                        if (!(chunk.trim() !== "")) return [3 /*break*/, 12];
                        _h.label = 6;
                    case 6:
                        _h.trys.push([6, 11, , 12]);
                        j = JSON.parse(chunk);
                        if (!("response" in j)) return [3 /*break*/, 9];
                        return [4 /*yield*/, __await(j.response)];
                    case 7: return [4 /*yield*/, _h.sent()];
                    case 8:
                        _h.sent();
                        return [3 /*break*/, 10];
                    case 9:
                        if ("error" in j) {
                            throw new Error(j.error);
                        }
                        _h.label = 10;
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        e_5 = _h.sent();
                        throw new Error("Error parsing Ollama response: ".concat(e_5, " ").concat(chunk));
                    case 12:
                        i++;
                        return [3 /*break*/, 5];
                    case 13:
                        _a = true;
                        return [3 /*break*/, 3];
                    case 14: return [3 /*break*/, 21];
                    case 15:
                        e_6_1 = _h.sent();
                        e_6 = { error: e_6_1 };
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
                        if (e_6) throw e_6.error;
                        return [7 /*endfinally*/];
                    case 20: return [7 /*endfinally*/];
                    case 21: return [2 /*return*/];
                }
            });
        });
    };
    Ollama.prototype.listModels = function () {
        return __awaiter(this, void 0, void 0, function () {
            var headers, response, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        headers = {
                            "Content-Type": "application/json",
                        };
                        if (this.apiKey) {
                            headers.Authorization = "Bearer ".concat(this.apiKey);
                        }
                        return [4 /*yield*/, this.fetch(
                            // localhost was causing fetch failed in pkg binary only for this Ollama endpoint
                            this.getEndpoint("api/tags"), {
                                method: "GET",
                                headers: headers,
                            })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        if (response.ok) {
                            return [2 /*return*/, data.models.map(function (model) { return model.name; })];
                        }
                        else {
                            throw new Error("Failed to list Ollama models. Make sure Ollama is running.");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Ollama.prototype._embed = function (chunks) {
        return __awaiter(this, void 0, void 0, function () {
            var headers, resp, _a, _b, data, embedding;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        headers = {
                            "Content-Type": "application/json",
                        };
                        if (this.apiKey) {
                            headers.Authorization = "Bearer ".concat(this.apiKey);
                        }
                        return [4 /*yield*/, this.fetch(new URL("api/embed", this.apiBase), {
                                method: "POST",
                                body: JSON.stringify({
                                    model: this.model,
                                    input: chunks,
                                }),
                                headers: headers,
                            })];
                    case 1:
                        resp = _c.sent();
                        if (!!resp.ok) return [3 /*break*/, 3];
                        _a = Error.bind;
                        _b = "Failed to embed chunk: ".concat;
                        return [4 /*yield*/, resp.text()];
                    case 2: throw new (_a.apply(Error, [void 0, _b.apply("Failed to embed chunk: ", [_c.sent()])]))();
                    case 3: return [4 /*yield*/, resp.json()];
                    case 4:
                        data = _c.sent();
                        embedding = data.embeddings;
                        if (!embedding || embedding.length === 0) {
                            throw new Error("Ollama generated empty embedding");
                        }
                        return [2 /*return*/, embedding];
                }
            });
        });
    };
    Ollama.prototype.installModel = function (modelName, signal, progressReporter) {
        return __awaiter(this, void 0, void 0, function () {
            var modelInfo, release, response, reader, _a, done, value, chunk, lines, _i, lines_1, line, data, release_1;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, (0, ollamaHelper_js_1.getRemoteModelInfo)(modelName, signal)];
                    case 1:
                        modelInfo = _c.sent();
                        if (!modelInfo) {
                            throw new Error("'".concat(modelName, "' not found in the Ollama registry!"));
                        }
                        return [4 /*yield*/, Ollama.modelsBeingInstalledMutex.acquire()];
                    case 2:
                        release = _c.sent();
                        try {
                            if (Ollama.modelsBeingInstalled.has(modelName)) {
                                throw new Error("Model '".concat(modelName, "' is already being installed."));
                            }
                            Ollama.modelsBeingInstalled.add(modelName);
                        }
                        finally {
                            release();
                        }
                        _c.label = 3;
                    case 3:
                        _c.trys.push([3, , 8, 10]);
                        return [4 /*yield*/, fetch(this.getEndpoint("api/pull"), {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: "Bearer ".concat(this.apiKey),
                                },
                                body: JSON.stringify({ name: modelName }),
                                signal: signal,
                            })];
                    case 4:
                        response = _c.sent();
                        reader = (_b = response.body) === null || _b === void 0 ? void 0 : _b.getReader();
                        _c.label = 5;
                    case 5:
                        if (!true) return [3 /*break*/, 7];
                        return [4 /*yield*/, (reader === null || reader === void 0 ? void 0 : reader.read())];
                    case 6:
                        _a = (_c.sent()) || {
                            done: true,
                            value: undefined,
                        }, done = _a.done, value = _a.value;
                        if (done) {
                            return [3 /*break*/, 7];
                        }
                        chunk = new TextDecoder().decode(value);
                        lines = chunk.split("\n").filter(Boolean);
                        for (_i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
                            line = lines_1[_i];
                            data = JSON.parse(line);
                            progressReporter === null || progressReporter === void 0 ? void 0 : progressReporter(data.status, data.completed, data.total);
                        }
                        return [3 /*break*/, 5];
                    case 7: return [3 /*break*/, 10];
                    case 8: return [4 /*yield*/, Ollama.modelsBeingInstalledMutex.acquire()];
                    case 9:
                        release_1 = _c.sent();
                        try {
                            Ollama.modelsBeingInstalled.delete(modelName);
                        }
                        finally {
                            release_1();
                        }
                        return [7 /*endfinally*/];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    Ollama.prototype.isInstallingModel = function (modelName) {
        return __awaiter(this, void 0, void 0, function () {
            var release;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Ollama.modelsBeingInstalledMutex.acquire()];
                    case 1:
                        release = _a.sent();
                        try {
                            return [2 /*return*/, Ollama.modelsBeingInstalled.has(modelName)];
                        }
                        finally {
                            release();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Ollama.providerName = "ollama";
    Ollama.defaultOptions = {
        apiBase: "http://localhost:11434/",
        model: "codellama-7b",
        maxEmbeddingBatchSize: 64,
    };
    Ollama.modelsBeingInstalled = new Set();
    Ollama.modelsBeingInstalledMutex = new async_mutex_1.Mutex();
    return Ollama;
}(index_js_1.BaseLLM));
exports.default = Ollama;
