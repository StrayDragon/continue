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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var fetch_1 = require("@continuedev/fetch");
var uuid_1 = require("uuid");
var parseArgs_js_1 = require("../../tools/parseArgs.js");
var messageContent_js_1 = require("../../util/messageContent.js");
var index_js_1 = require("../index.js");
var gemini_types_1 = require("./gemini-types");
var Gemini = /** @class */ (function (_super) {
    __extends(Gemini, _super);
    function Gemini() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Function to convert completion options to Gemini format
    Gemini.prototype.convertArgs = function (options) {
        var _a;
        // should be public for use within VertexAI
        var finalOptions = {}; // Initialize an empty object
        // Map known options
        if (options.topK) {
            finalOptions.topK = options.topK;
        }
        if (options.topP) {
            finalOptions.topP = options.topP;
        }
        if (options.temperature !== undefined && options.temperature !== null) {
            finalOptions.temperature = options.temperature;
        }
        if (options.maxTokens) {
            finalOptions.maxOutputTokens = options.maxTokens;
        }
        if (options.stop) {
            finalOptions.stopSequences = options.stop
                .filter(function (x) { return x.trim() !== ""; })
                .slice(0, (_a = this.maxStopWords) !== null && _a !== void 0 ? _a : Gemini.defaultOptions.maxStopWords);
        }
        return finalOptions;
    };
    Gemini.prototype._streamComplete = function (prompt, signal, options) {
        return __asyncGenerator(this, arguments, function _streamComplete_1() {
            var _a, _b, _c, message, e_1_1;
            var _d, e_1, _e, _f;
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
                        e_1_1 = _g.sent();
                        e_1 = { error: e_1_1 };
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
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 12: return [7 /*endfinally*/];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Removes the system message and merges it with the next user message if present.
     * @param messages Array of chat messages
     * @returns Modified array with system message merged into user message if applicable
     */
    Gemini.prototype.removeSystemMessage = function (messages) {
        var _a;
        // If no messages or first message isn't system, return copy of original messages
        if (messages.length === 0 || ((_a = messages[0]) === null || _a === void 0 ? void 0 : _a.role) !== "system") {
            return __spreadArray([], messages, true);
        }
        // Extract system message
        var systemMessage = messages[0];
        // Extract system content based on its type
        var systemContent = "";
        if (typeof systemMessage.content === "string") {
            systemContent = systemMessage.content;
        }
        else if (Array.isArray(systemMessage.content)) {
            var contentArray = systemMessage.content;
            var concatenatedText = contentArray
                .filter(function (part) { return part.type === "text"; })
                .map(function (part) { return part.text; })
                .join(" ");
            systemContent = concatenatedText ? concatenatedText : "";
        }
        else if (systemMessage.content &&
            typeof systemMessage.content === "object") {
            var typedContent = systemMessage.content;
            systemContent = (typedContent === null || typedContent === void 0 ? void 0 : typedContent.text) || "";
        }
        // Create new array without the system message
        var remainingMessages = messages.slice(1);
        // Check if there's a user message to merge with
        if (remainingMessages.length > 0 && remainingMessages[0].role === "user") {
            var userMessage = remainingMessages[0];
            var prefix = "System message - follow these instructions in every response: ".concat(systemContent, "\n\n---\n\n");
            // Merge based on user content type
            if (typeof userMessage.content === "string") {
                userMessage.content = prefix + userMessage.content;
            }
            else if (Array.isArray(userMessage.content)) {
                var contentArray = userMessage.content;
                var textPart = contentArray.find(function (part) { return part.type === "text"; });
                if (textPart) {
                    textPart.text = prefix + textPart.text;
                }
                else {
                    userMessage.content.push({
                        type: "text",
                        text: prefix,
                    });
                }
            }
            else if (userMessage.content &&
                typeof userMessage.content === "object") {
                var typedContent = userMessage.content;
                userMessage.content = [
                    {
                        type: "text",
                        text: prefix + (typedContent.text || ""),
                    },
                ];
            }
        }
        return remainingMessages;
    };
    Gemini.prototype._streamChat = function (messages, signal, options) {
        return __asyncGenerator(this, arguments, function _streamChat_1() {
            var isV1API, convertedMsgs, _a, _b, _c, message, e_2_1, _d, _e, _f, message, e_3_1;
            var _g, e_2, _h, _j, _k, e_3, _l, _m;
            var _o;
            return __generator(this, function (_p) {
                switch (_p.label) {
                    case 0:
                        isV1API = (_o = this.apiBase) === null || _o === void 0 ? void 0 : _o.includes("/v1/");
                        convertedMsgs = isV1API
                            ? this.removeSystemMessage(messages)
                            : messages;
                        if (!options.model.includes("bison")) return [3 /*break*/, 15];
                        _p.label = 1;
                    case 1:
                        _p.trys.push([1, 8, 9, 14]);
                        _a = true, _b = __asyncValues(this.streamChatBison(convertedMsgs, signal, options));
                        _p.label = 2;
                    case 2: return [4 /*yield*/, __await(_b.next())];
                    case 3:
                        if (!(_c = _p.sent(), _g = _c.done, !_g)) return [3 /*break*/, 7];
                        _j = _c.value;
                        _a = false;
                        message = _j;
                        return [4 /*yield*/, __await(message)];
                    case 4: return [4 /*yield*/, _p.sent()];
                    case 5:
                        _p.sent();
                        _p.label = 6;
                    case 6:
                        _a = true;
                        return [3 /*break*/, 2];
                    case 7: return [3 /*break*/, 14];
                    case 8:
                        e_2_1 = _p.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 14];
                    case 9:
                        _p.trys.push([9, , 12, 13]);
                        if (!(!_a && !_g && (_h = _b.return))) return [3 /*break*/, 11];
                        return [4 /*yield*/, __await(_h.call(_b))];
                    case 10:
                        _p.sent();
                        _p.label = 11;
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        if (e_2) throw e_2.error;
                        return [7 /*endfinally*/];
                    case 13: return [7 /*endfinally*/];
                    case 14: return [3 /*break*/, 28];
                    case 15:
                        _p.trys.push([15, 22, 23, 28]);
                        _d = true, _e = __asyncValues(this.streamChatGemini(convertedMsgs, signal, options));
                        _p.label = 16;
                    case 16: return [4 /*yield*/, __await(_e.next())];
                    case 17:
                        if (!(_f = _p.sent(), _k = _f.done, !_k)) return [3 /*break*/, 21];
                        _m = _f.value;
                        _d = false;
                        message = _m;
                        return [4 /*yield*/, __await(message)];
                    case 18: return [4 /*yield*/, _p.sent()];
                    case 19:
                        _p.sent();
                        _p.label = 20;
                    case 20:
                        _d = true;
                        return [3 /*break*/, 16];
                    case 21: return [3 /*break*/, 28];
                    case 22:
                        e_3_1 = _p.sent();
                        e_3 = { error: e_3_1 };
                        return [3 /*break*/, 28];
                    case 23:
                        _p.trys.push([23, , 26, 27]);
                        if (!(!_d && !_k && (_l = _e.return))) return [3 /*break*/, 25];
                        return [4 /*yield*/, __await(_l.call(_e))];
                    case 24:
                        _p.sent();
                        _p.label = 25;
                    case 25: return [3 /*break*/, 27];
                    case 26:
                        if (e_3) throw e_3.error;
                        return [7 /*endfinally*/];
                    case 27: return [7 /*endfinally*/];
                    case 28: return [2 /*return*/];
                }
            });
        });
    };
    Gemini.prototype.continuePartToGeminiPart = function (part) {
        var _a;
        return part.type === "text"
            ? {
                text: part.text,
            }
            : {
                inlineData: {
                    mimeType: "image/jpeg",
                    data: (_a = part.imageUrl) === null || _a === void 0 ? void 0 : _a.url.split(",")[1],
                },
            };
    };
    Gemini.prototype.prepareBody = function (messages, options, isV1API, includeToolIds) {
        var _this = this;
        var _a, _b;
        var toolCallIdToNameMap = new Map();
        messages.forEach(function (msg) {
            if (msg.role === "assistant" && msg.toolCalls) {
                msg.toolCalls.forEach(function (call) {
                    var _a;
                    if (call.id && ((_a = call.function) === null || _a === void 0 ? void 0 : _a.name)) {
                        toolCallIdToNameMap.set(call.id, call.function.name);
                    }
                });
            }
        });
        var systemMessage = (_a = messages.find(function (msg) { return msg.role === "system"; })) === null || _a === void 0 ? void 0 : _a.content;
        var body = {
            contents: messages
                .filter(function (msg) { return !(msg.role === "system" && isV1API); })
                .map(function (msg) {
                if (msg.role === "tool") {
                    var functionName = toolCallIdToNameMap.get(msg.toolCallId);
                    if (!functionName) {
                        console.warn("Sending tool call response for unidentified tool call");
                    }
                    return {
                        role: "user",
                        parts: [
                            {
                                functionResponse: {
                                    id: includeToolIds ? msg.toolCallId : undefined,
                                    name: functionName || "unknown",
                                    response: {
                                        output: msg.content, // "output" key is opinionated - not all functions will output objects
                                    },
                                },
                            },
                        ],
                    };
                }
                if (msg.role === "assistant") {
                    var assistantMsg_1 = {
                        role: "model",
                        parts: typeof msg.content === "string"
                            ? [{ text: msg.content }]
                            : msg.content.map(_this.continuePartToGeminiPart),
                    };
                    if (msg.toolCalls) {
                        msg.toolCalls.forEach(function (toolCall) {
                            var _a;
                            if ((_a = toolCall.function) === null || _a === void 0 ? void 0 : _a.name) {
                                assistantMsg_1.parts.push({
                                    functionCall: {
                                        name: toolCall.function.name,
                                        args: (0, parseArgs_js_1.safeParseToolCallArgs)(toolCall),
                                    },
                                });
                            }
                        });
                    }
                    return assistantMsg_1;
                }
                return {
                    role: "user",
                    parts: typeof msg.content === "string"
                        ? [{ text: msg.content }]
                        : msg.content.map(_this.continuePartToGeminiPart),
                };
            }),
        };
        if (options) {
            body.generationConfig = this.convertArgs(options);
        }
        // https://ai.google.dev/gemini-api/docs/api-versions
        if (!isV1API) {
            if (systemMessage) {
                body.systemInstruction = {
                    parts: [{ text: (0, messageContent_js_1.stripImages)(systemMessage) }],
                };
            }
            // Convert and add tools if present
            if ((_b = options.tools) === null || _b === void 0 ? void 0 : _b.length) {
                // Choosing to map all tools to the functionDeclarations of one tool
                // Rather than map each tool to its own tool + functionDeclaration
                // Same difference
                var functions_1 = [];
                options.tools.forEach(function (tool) {
                    try {
                        functions_1.push((0, gemini_types_1.convertContinueToolToGeminiFunction)(tool));
                    }
                    catch (e) {
                        console.warn("Failed to convert tool to gemini function definition. Skipping: ".concat(JSON.stringify(tool, null, 2)));
                    }
                });
                if (functions_1.length) {
                    body.tools = [
                        {
                            functionDeclarations: functions_1,
                        },
                    ];
                }
            }
        }
        return body;
    };
    Gemini.prototype.processGeminiResponse = function (stream) {
        return __asyncGenerator(this, arguments, function processGeminiResponse_1() {
            var buffer, _a, stream_1, stream_1_1, chunk, parts, foundIncomplete, i, part, data, contentParts, textParts, toolCalls, _i, contentParts_1, part_1, assistantMessage, e_4_1;
            var _b, e_4, _c, _d;
            var _e, _f, _g, _h;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        buffer = "";
                        _j.label = 1;
                    case 1:
                        _j.trys.push([1, 13, 14, 19]);
                        _a = true, stream_1 = __asyncValues(stream);
                        _j.label = 2;
                    case 2: return [4 /*yield*/, __await(stream_1.next())];
                    case 3:
                        if (!(stream_1_1 = _j.sent(), _b = stream_1_1.done, !_b)) return [3 /*break*/, 12];
                        _d = stream_1_1.value;
                        _a = false;
                        chunk = _d;
                        buffer += chunk;
                        if (buffer.startsWith("[")) {
                            buffer = buffer.slice(1);
                        }
                        if (buffer.endsWith("]")) {
                            buffer = buffer.slice(0, -1);
                        }
                        if (buffer.startsWith(",")) {
                            buffer = buffer.slice(1);
                        }
                        parts = buffer.split("\n,");
                        foundIncomplete = false;
                        i = 0;
                        _j.label = 4;
                    case 4:
                        if (!(i < parts.length)) return [3 /*break*/, 10];
                        part = parts[i];
                        data = void 0;
                        try {
                            data = JSON.parse(part);
                        }
                        catch (e) {
                            foundIncomplete = true;
                            return [3 /*break*/, 9]; // yo!
                        }
                        if ("error" in data) {
                            throw new Error(data.error.message);
                        }
                        contentParts = (_g = (_f = (_e = data === null || data === void 0 ? void 0 : data.candidates) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.content) === null || _g === void 0 ? void 0 : _g.parts;
                        if (!contentParts) return [3 /*break*/, 8];
                        textParts = [];
                        toolCalls = [];
                        for (_i = 0, contentParts_1 = contentParts; _i < contentParts_1.length; _i++) {
                            part_1 = contentParts_1[_i];
                            if ("text" in part_1) {
                                textParts.push({ type: "text", text: part_1.text });
                            }
                            else if ("functionCall" in part_1) {
                                toolCalls.push({
                                    type: "function",
                                    id: (_h = part_1.functionCall.id) !== null && _h !== void 0 ? _h : (0, uuid_1.v4)(),
                                    function: {
                                        name: part_1.functionCall.name,
                                        arguments: typeof part_1.functionCall.args === "string"
                                            ? part_1.functionCall.args
                                            : JSON.stringify(part_1.functionCall.args),
                                    },
                                });
                            }
                            else {
                                // Note: function responses shouldn't be streamed, images not supported
                                console.warn("Unsupported gemini part type received", part_1);
                            }
                        }
                        assistantMessage = {
                            role: "assistant",
                            content: textParts.length ? textParts : "",
                        };
                        if (toolCalls.length > 0) {
                            assistantMessage.toolCalls = toolCalls;
                        }
                        if (!(textParts.length || toolCalls.length)) return [3 /*break*/, 7];
                        return [4 /*yield*/, __await(assistantMessage)];
                    case 5: return [4 /*yield*/, _j.sent()];
                    case 6:
                        _j.sent();
                        _j.label = 7;
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        // Handle the case where the expected data structure is not found
                        console.warn("Unexpected response format:", data);
                        _j.label = 9;
                    case 9:
                        i++;
                        return [3 /*break*/, 4];
                    case 10:
                        if (foundIncomplete) {
                            buffer = parts[parts.length - 1];
                        }
                        else {
                            buffer = "";
                        }
                        _j.label = 11;
                    case 11:
                        _a = true;
                        return [3 /*break*/, 2];
                    case 12: return [3 /*break*/, 19];
                    case 13:
                        e_4_1 = _j.sent();
                        e_4 = { error: e_4_1 };
                        return [3 /*break*/, 19];
                    case 14:
                        _j.trys.push([14, , 17, 18]);
                        if (!(!_a && !_b && (_c = stream_1.return))) return [3 /*break*/, 16];
                        return [4 /*yield*/, __await(_c.call(stream_1))];
                    case 15:
                        _j.sent();
                        _j.label = 16;
                    case 16: return [3 /*break*/, 18];
                    case 17:
                        if (e_4) throw e_4.error;
                        return [7 /*endfinally*/];
                    case 18: return [7 /*endfinally*/];
                    case 19: return [2 /*return*/];
                }
            });
        });
    };
    Gemini.prototype.streamChatGemini = function (messages, signal, options) {
        return __asyncGenerator(this, arguments, function streamChatGemini_1() {
            var apiURL, isV1API, body, response, _a, _b, _c, message, e_5_1;
            var _d, e_5, _e, _f;
            var _g;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        apiURL = new URL("models/".concat(options.model, ":streamGenerateContent?key=").concat(this.apiKey), this.apiBase);
                        isV1API = !!((_g = this.apiBase) === null || _g === void 0 ? void 0 : _g.includes("/v1/"));
                        body = this.prepareBody(messages, options, isV1API, true);
                        return [4 /*yield*/, __await(this.fetch(apiURL, {
                                method: "POST",
                                body: JSON.stringify(body),
                                signal: signal,
                            }))];
                    case 1:
                        response = _h.sent();
                        _h.label = 2;
                    case 2:
                        _h.trys.push([2, 9, 10, 15]);
                        _a = true, _b = __asyncValues(this.processGeminiResponse((0, fetch_1.streamResponse)(response)));
                        _h.label = 3;
                    case 3: return [4 /*yield*/, __await(_b.next())];
                    case 4:
                        if (!(_c = _h.sent(), _d = _c.done, !_d)) return [3 /*break*/, 8];
                        _f = _c.value;
                        _a = false;
                        message = _f;
                        return [4 /*yield*/, __await(message)];
                    case 5: return [4 /*yield*/, _h.sent()];
                    case 6:
                        _h.sent();
                        _h.label = 7;
                    case 7:
                        _a = true;
                        return [3 /*break*/, 3];
                    case 8: return [3 /*break*/, 15];
                    case 9:
                        e_5_1 = _h.sent();
                        e_5 = { error: e_5_1 };
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
                        if (e_5) throw e_5.error;
                        return [7 /*endfinally*/];
                    case 14: return [7 /*endfinally*/];
                    case 15: return [2 /*return*/];
                }
            });
        });
    };
    Gemini.prototype.streamChatBison = function (messages, signal, options) {
        return __asyncGenerator(this, arguments, function streamChatBison_1() {
            var msgList, _i, messages_1, message, apiURL, body, response, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        msgList = [];
                        for (_i = 0, messages_1 = messages; _i < messages_1.length; _i++) {
                            message = messages_1[_i];
                            msgList.push({ content: message.content });
                        }
                        apiURL = new URL("models/".concat(options.model, ":generateMessage?key=").concat(this.apiKey), this.apiBase);
                        body = { prompt: { messages: msgList } };
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
                        return [4 /*yield*/, __await({ role: "assistant", content: data.candidates[0].content })];
                    case 5: return [4 /*yield*/, _a.sent()];
                    case 6:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Gemini.prototype._embed = function (batch) {
        return __awaiter(this, void 0, void 0, function () {
            var requests, resp, _a, data;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        requests = batch.map(function (text) { return ({
                            model: _this.model,
                            content: {
                                role: "user",
                                parts: [{ text: text }],
                            },
                        }); });
                        return [4 /*yield*/, this.fetch(new URL("".concat(this.model, ":batchEmbedContents"), this.apiBase), {
                                method: "POST",
                                body: JSON.stringify({
                                    requests: requests,
                                }),
                                headers: {
                                    "x-goog-api-key": this.apiKey,
                                    "Content-Type": "application/json",
                                },
                            })];
                    case 1:
                        resp = _b.sent();
                        if (!!resp.ok) return [3 /*break*/, 3];
                        _a = Error.bind;
                        return [4 /*yield*/, resp.text()];
                    case 2: throw new (_a.apply(Error, [void 0, _b.sent()]))();
                    case 3: return [4 /*yield*/, resp.json()];
                    case 4:
                        data = (_b.sent());
                        return [2 /*return*/, data.embeddings.map(function (embedding) { return embedding.values; })];
                }
            });
        });
    };
    Gemini.providerName = "gemini";
    Gemini.defaultOptions = {
        model: "gemini-pro",
        apiBase: "https://generativelanguage.googleapis.com/v1beta/",
        maxStopWords: 5,
        maxEmbeddingBatchSize: 100,
    };
    return Gemini;
}(index_js_1.BaseLLM));
exports.default = Gemini;
