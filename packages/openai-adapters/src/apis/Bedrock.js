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
exports.BedrockApi = void 0;
var client_bedrock_runtime_1 = require("@aws-sdk/client-bedrock-runtime");
var uuid_1 = require("uuid");
var credential_providers_1 = require("@aws-sdk/credential-providers");
var token_providers_1 = require("@aws-sdk/token-providers");
var util_js_1 = require("../util.js");
var parseArgs_js_1 = require("../util/parseArgs.js");
// Utility function to get or generate UUID for prompt caching
function getSecureID() {
    // Adding a type declaration for the static property
    if (!getSecureID.uuid) {
        getSecureID.uuid = (0, uuid_1.v4)();
    }
    return "<!-- SID: ".concat(getSecureID.uuid, " -->");
}
var BedrockApi = /** @class */ (function () {
    function BedrockApi(config) {
        var _a, _b, _c, _d;
        this.config = config;
        if (((_a = config.env) === null || _a === void 0 ? void 0 : _a.accessKeyId) || ((_b = config === null || config === void 0 ? void 0 : config.env) === null || _b === void 0 ? void 0 : _b.secretAccessKey)) {
            if (!((_c = config.env) === null || _c === void 0 ? void 0 : _c.accessKeyId)) {
                throw new Error("accessKeyId is required for Bedrock API. Only found secretAccessKey");
            }
            if (!((_d = config.env) === null || _d === void 0 ? void 0 : _d.secretAccessKey)) {
                throw new Error("secretAccessKey is required for Bedrock API. Only found accessKeyId");
            }
        }
    }
    BedrockApi.prototype.getCreds = function () {
        return __awaiter(this, void 0, void 0, function () {
            var profile, e_1;
            var _a, _b, _c, _d, _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        if (((_b = (_a = this.config) === null || _a === void 0 ? void 0 : _a.env) === null || _b === void 0 ? void 0 : _b.accessKeyId) && ((_d = (_c = this.config) === null || _c === void 0 ? void 0 : _c.env) === null || _d === void 0 ? void 0 : _d.secretAccessKey)) {
                            return [2 /*return*/, {
                                    accessKeyId: this.config.env.accessKeyId,
                                    secretAccessKey: this.config.env.secretAccessKey,
                                }];
                        }
                        profile = (_f = (_e = this.config.env) === null || _e === void 0 ? void 0 : _e.profile) !== null && _f !== void 0 ? _f : "bedrock";
                        _g.label = 1;
                    case 1:
                        _g.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, (0, credential_providers_1.fromNodeProviderChain)({
                                profile: profile,
                                ignoreCache: true,
                            })()];
                    case 2: return [2 /*return*/, _g.sent()];
                    case 3:
                        e_1 = _g.sent();
                        console.warn("AWS profile with name ".concat(profile, " not found in ~/.aws/credentials, using default profile"));
                        return [3 /*break*/, 4];
                    case 4: return [4 /*yield*/, (0, credential_providers_1.fromNodeProviderChain)()()];
                    case 5: return [2 /*return*/, _g.sent()];
                }
            });
        });
    };
    BedrockApi.prototype.getClient = function () {
        return __awaiter(this, void 0, void 0, function () {
            var region, creds;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        region = (_a = this.config.env) === null || _a === void 0 ? void 0 : _a.region;
                        // If apiKey is provided, use bearer token authentication
                        if (this.config.apiKey) {
                            return [2 /*return*/, new client_bedrock_runtime_1.BedrockRuntimeClient({
                                    region: region,
                                    token: (0, token_providers_1.fromStatic)({
                                        token: { token: this.config.apiKey },
                                    }),
                                })];
                        }
                        return [4 /*yield*/, this.getCreds()];
                    case 1:
                        creds = _b.sent();
                        return [2 /*return*/, new client_bedrock_runtime_1.BedrockRuntimeClient({
                                region: region,
                                credentials: creds,
                            })];
                }
            });
        });
    };
    BedrockApi.prototype._oaiPartToBedrockPart = function (part) {
        var _a;
        switch (part.type) {
            case "refusal":
                return {
                    text: part.refusal,
                };
            case "text":
                return {
                    text: part.text,
                };
            case "input_audio":
                throw new Error("Unsupported part type: input_audio");
            case "image_url":
            default:
                try {
                    var _b = part.image_url.url.split(","), mimeType = _b[0], base64Data = _b[1];
                    var format = ((_a = mimeType.split("/")[1]) === null || _a === void 0 ? void 0 : _a.split(";")[0]) || "jpeg";
                    if (format === client_bedrock_runtime_1.ImageFormat.JPEG ||
                        format === client_bedrock_runtime_1.ImageFormat.PNG ||
                        format === client_bedrock_runtime_1.ImageFormat.WEBP ||
                        format === client_bedrock_runtime_1.ImageFormat.GIF) {
                        return {
                            image: {
                                format: format,
                                source: {
                                    bytes: Uint8Array.from(Buffer.from(base64Data, "base64")),
                                },
                            },
                        };
                    }
                    else {
                        console.warn("Bedrock: skipping unsupported image part format: ".concat(format));
                        return { text: "[Unsupported image format]" };
                    }
                }
                catch (error) {
                    console.warn("Bedrock: failed to process image part", error);
                    return { text: "[Failed to process image]" };
                }
        }
    };
    BedrockApi.prototype._convertMessages = function (oaiMessages, availableTools) {
        var _this = this;
        var _a, _b, _c, _d;
        var currentRole = "user";
        var currentBlocks = [];
        var converted = [];
        var hasAddedToolCallIds = new Set();
        var pushCurrentMessage = function () {
            if (currentBlocks.length > 0) {
                converted.push({
                    role: currentRole,
                    content: currentBlocks,
                });
                currentBlocks = [];
            }
        };
        var nonSystemMessages = oaiMessages.filter(function (m) { return m.role !== "system"; });
        for (var idx = 0; idx < nonSystemMessages.length; idx++) {
            var message = nonSystemMessages[idx];
            if (message.role === "user" || message.role === "tool") {
                // Detect conversational turn change
                if (currentRole !== client_bedrock_runtime_1.ConversationRole.USER) {
                    pushCurrentMessage();
                    currentRole = client_bedrock_runtime_1.ConversationRole.USER;
                }
                // USER messages
                if (message.role === "user") {
                    var content = message.content;
                    if (content) {
                        if (typeof content === "string") {
                            currentBlocks.push({ text: content });
                        }
                        else {
                            content.forEach(function (part) {
                                currentBlocks.push(_this._oaiPartToBedrockPart(part));
                            });
                        }
                    }
                }
                // TOOL messages
                else if (message.role === "tool") {
                    var trimmedContent = typeof message.content === "string"
                        ? message.content.trim()
                        : message.content
                            .map(function (c) { return c.text; })
                            .join("\n")
                            .trim();
                    if (hasAddedToolCallIds.has(message.tool_call_id)) {
                        currentBlocks.push({
                            toolResult: {
                                toolUseId: message.tool_call_id,
                                content: [
                                    {
                                        text: trimmedContent || "No tool output",
                                    },
                                ],
                            },
                        });
                    }
                    else {
                        currentBlocks.push({
                            text: "Tool call output for Tool Call ID ".concat(message.tool_call_id, ":\n\n").concat(trimmedContent || "No tool output"),
                        });
                    }
                }
            }
            else if (message.role === "assistant") {
                // Detect conversational turn change
                if (currentRole !== client_bedrock_runtime_1.ConversationRole.ASSISTANT) {
                    pushCurrentMessage();
                    currentRole = client_bedrock_runtime_1.ConversationRole.ASSISTANT;
                }
                // ASSISTANT messages
                if (typeof message.content === "string") {
                    var trimmedText = message.content.trim();
                    if (trimmedText) {
                        currentBlocks.push({ text: trimmedText });
                    }
                }
                else {
                    (_a = message.content) === null || _a === void 0 ? void 0 : _a.forEach(function (part) {
                        var text = part.type === "text" ? part.text : part.refusal;
                        var trimmedText = text.trim();
                        if (trimmedText) {
                            currentBlocks.push({ text: trimmedText });
                        }
                    });
                }
                // TOOL CALLS
                if (message.tool_calls) {
                    for (var _i = 0, _e = message.tool_calls; _i < _e.length; _i++) {
                        var toolCall = _e[_i];
                        // Type guard for function tool calls
                        if (toolCall.type === "function" &&
                            "function" in toolCall &&
                            toolCall.id &&
                            ((_b = toolCall.function) === null || _b === void 0 ? void 0 : _b.name)) {
                            if (availableTools.has(toolCall.function.name)) {
                                currentBlocks.push({
                                    toolUse: {
                                        toolUseId: toolCall.id,
                                        name: toolCall.function.name,
                                        input: (0, parseArgs_js_1.safeParseArgs)(toolCall.function.arguments, "Call: ".concat(toolCall.function.name, " ").concat(toolCall.id)),
                                    },
                                });
                                hasAddedToolCallIds.add(toolCall.id);
                            }
                            else {
                                var toolCallText = "Assistant tool call:\nTool name: ".concat(toolCall.function.name, "\nTool Call ID: ").concat(toolCall.id, "\nArguments: ").concat((_d = (_c = toolCall.function) === null || _c === void 0 ? void 0 : _c.arguments) !== null && _d !== void 0 ? _d : "{}");
                                currentBlocks.push({
                                    text: toolCallText,
                                });
                            }
                        }
                        else {
                            console.warn("Unsupported tool call type in Bedrock: ".concat(toolCall.type));
                        }
                    }
                }
            }
        }
        if (currentBlocks.length > 0) {
            pushCurrentMessage();
        }
        // If caching is enabled, add cache points
        // if (this.config.cacheBehavior?.cacheConversation) {
        //   this._addCachingToLastTwoUserMessages(converted);
        // }
        return converted;
    };
    BedrockApi.prototype._addCachingToLastTwoUserMessages = function (converted) {
        var _a, _b;
        var numCached = 0;
        for (var i = converted.length - 1; i >= 0; i--) {
            var message = converted[i];
            if (message.role === "user") {
                (_a = message.content) === null || _a === void 0 ? void 0 : _a.forEach(function (block) {
                    if (block.text) {
                        block.text += getSecureID();
                    }
                });
                (_b = message.content) === null || _b === void 0 ? void 0 : _b.push({ cachePoint: { type: "default" } });
                numCached++;
            }
            if (numCached === 2) {
                break;
            }
        }
    };
    BedrockApi.prototype._convertBody = function (oaiBody) {
        var _a;
        // Extract system message
        var systemMessage = ((_a = oaiBody.messages.find(function (msg) { return msg.role === "system"; })) === null || _a === void 0 ? void 0 : _a.content) || "";
        var systemMessageText = typeof systemMessage === "string"
            ? systemMessage
            : systemMessage
                .map(function (part) {
                return part.type === "text" ? part.text : "[Non-text content]";
            })
                .join(" ");
        // Check for tools
        var availableTools = new Set();
        var toolConfig = undefined;
        if (oaiBody.tools && oaiBody.tools.length > 0) {
            toolConfig = {
                tools: oaiBody.tools.map(function (tool) {
                    // Type guard for function tools
                    if (tool.type === "function" && "function" in tool) {
                        return {
                            toolSpec: {
                                name: tool.function.name,
                                description: tool.function.description,
                                inputSchema: {
                                    json: tool.function.parameters,
                                },
                            },
                        };
                    }
                    else {
                        throw new Error("Unsupported tool type in Bedrock: ".concat(tool.type));
                    }
                }),
            };
            // Add cache point if needed
            // if (this.config.cacheBehavior?.cacheSystemMessage) {
            //   toolConfig!.tools!.push({ cachePoint: { type: "default" } });
            // }
            oaiBody.tools.forEach(function (tool) {
                if (tool.type === "function" && "function" in tool) {
                    availableTools.add(tool.function.name);
                }
            });
        }
        // Convert messages
        var convertedMessages = this._convertMessages(oaiBody.messages, availableTools);
        // Build final request body
        var body = {
            modelId: oaiBody.model,
            messages: convertedMessages,
            inferenceConfig: {
                temperature: oaiBody.temperature,
                topP: oaiBody.top_p,
                maxTokens: oaiBody.max_tokens,
                stopSequences: Array.isArray(oaiBody.stop)
                    ? oaiBody.stop.filter(function (s) { return s.trim() !== ""; }).slice(0, 4)
                    : oaiBody.stop
                        ? [oaiBody.stop].filter(function (s) { return s.trim() !== ""; })
                        : undefined,
            },
        };
        // Add system message if present
        if (systemMessageText) {
            body.system = false // this.config.cacheBehavior?.cacheSystemMessage // TODO
                ? [{ text: systemMessageText }, { cachePoint: { type: "default" } }]
                : [{ text: systemMessageText }];
        }
        // Add tool config if present
        if (toolConfig) {
            body.toolConfig = toolConfig;
        }
        // Add reasoning if needed
        // TODO REASONING
        // if (this.c) {
        //   body.additionalModelRequestFields = {
        //     thinking: {
        //       type: "enabled",
        //       budget_tokens:
        //         oaiBody.additionalModelRequestFields.reasoningBudgetTokens,
        //     },
        //   };
        // }
        return body;
    };
    BedrockApi.prototype.chatCompletionNonStream = function (body, signal) {
        return __awaiter(this, void 0, void 0, function () {
            var completion, toolCalls, _a, _b, _c, chunk, e_2_1;
            var _d, e_2, _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        completion = "";
                        toolCalls = [];
                        _g.label = 1;
                    case 1:
                        _g.trys.push([1, 6, 7, 12]);
                        _a = true, _b = __asyncValues(this.chatCompletionStream(__assign(__assign({}, body), { stream: true }), signal));
                        _g.label = 2;
                    case 2: return [4 /*yield*/, _b.next()];
                    case 3:
                        if (!(_c = _g.sent(), _d = _c.done, !_d)) return [3 /*break*/, 5];
                        _f = _c.value;
                        _a = false;
                        chunk = _f;
                        if (chunk.choices[0].delta.content) {
                            completion += chunk.choices[0].delta.content;
                        }
                        _g.label = 4;
                    case 4:
                        _a = true;
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 12];
                    case 6:
                        e_2_1 = _g.sent();
                        e_2 = { error: e_2_1 };
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
                        if (e_2) throw e_2.error;
                        return [7 /*endfinally*/];
                    case 11: return [7 /*endfinally*/];
                    case 12: return [2 /*return*/, {
                            id: (0, uuid_1.v4)(),
                            object: "chat.completion",
                            model: body.model,
                            created: Date.now(),
                            choices: [
                                {
                                    index: 0,
                                    logprobs: null,
                                    finish_reason: "stop",
                                    message: {
                                        role: "assistant",
                                        content: completion,
                                        tool_calls: toolCalls.length > 0 ? toolCalls : undefined,
                                        refusal: null,
                                    },
                                },
                            ],
                            usage: undefined,
                        }];
                }
            });
        });
    };
    BedrockApi.prototype.chatCompletionStream = function (body, signal) {
        return __asyncGenerator(this, arguments, function chatCompletionStream_1() {
            var requestBody, command, client, response, _a, _b, _c, chunk, delta, start, e_3_1, error_1;
            var _d, e_3, _e, _f;
            var _g, _h, _j;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        requestBody = this._convertBody(body);
                        _k.label = 1;
                    case 1:
                        _k.trys.push([1, 24, , 25]);
                        command = new client_bedrock_runtime_1.ConverseStreamCommand(__assign({}, requestBody));
                        return [4 /*yield*/, __await(this.getClient())];
                    case 2:
                        client = _k.sent();
                        return [4 /*yield*/, __await(client.send(command, { abortSignal: signal }))];
                    case 3:
                        response = _k.sent();
                        if (!(response === null || response === void 0 ? void 0 : response.stream)) {
                            throw new Error("No stream received from Bedrock API");
                        }
                        _k.label = 4;
                    case 4:
                        _k.trys.push([4, 17, 18, 23]);
                        _a = true, _b = __asyncValues(response.stream);
                        _k.label = 5;
                    case 5: return [4 /*yield*/, __await(_b.next())];
                    case 6:
                        if (!(_c = _k.sent(), _d = _c.done, !_d)) return [3 /*break*/, 16];
                        _f = _c.value;
                        _a = false;
                        chunk = _f;
                        if (!((_g = chunk.contentBlockDelta) === null || _g === void 0 ? void 0 : _g.delta)) return [3 /*break*/, 12];
                        delta = chunk.contentBlockDelta.delta;
                        if (!delta.text) return [3 /*break*/, 9];
                        return [4 /*yield*/, __await((0, util_js_1.chatChunk)({
                                content: delta.text,
                                model: body.model,
                            }))];
                    case 7: return [4 /*yield*/, _k.sent()];
                    case 8:
                        _k.sent();
                        return [3 /*break*/, 15];
                    case 9:
                        // Handle thinking content (if reasoning enabled)
                        if ((_h = delta.reasoningContent) === null || _h === void 0 ? void 0 : _h.text) {
                            // TODO reasoning
                            // Reasoning is not directly supported in OpenAI format,
                            // but we could add it as a special message
                            return [3 /*break*/, 15];
                        }
                        if (!delta.toolUse) return [3 /*break*/, 12];
                        return [4 /*yield*/, __await((0, util_js_1.chatChunkFromDelta)({
                                model: body.model,
                                delta: {
                                    tool_calls: [
                                        {
                                            index: 0,
                                            id: delta.toolUse.toolUseId,
                                            type: "function",
                                            function: {
                                                name: delta.toolUse.name,
                                                arguments: delta.toolUse.input,
                                            },
                                        },
                                    ],
                                },
                            }))];
                    case 10: return [4 /*yield*/, _k.sent()];
                    case 11:
                        _k.sent();
                        _k.label = 12;
                    case 12:
                        if (!((_j = chunk.contentBlockStart) === null || _j === void 0 ? void 0 : _j.start)) return [3 /*break*/, 15];
                        start = chunk.contentBlockStart.start;
                        if (!start.toolUse) return [3 /*break*/, 15];
                        return [4 /*yield*/, __await((0, util_js_1.chatChunkFromDelta)({
                                model: body.model,
                                delta: {
                                    tool_calls: [
                                        {
                                            index: 0,
                                            id: start.toolUse.toolUseId,
                                            type: "function",
                                            function: {
                                                name: start.toolUse.name,
                                                arguments: undefined,
                                            },
                                        },
                                    ],
                                },
                            }))];
                    case 13: return [4 /*yield*/, _k.sent()];
                    case 14:
                        _k.sent();
                        _k.label = 15;
                    case 15:
                        _a = true;
                        return [3 /*break*/, 5];
                    case 16: return [3 /*break*/, 23];
                    case 17:
                        e_3_1 = _k.sent();
                        e_3 = { error: e_3_1 };
                        return [3 /*break*/, 23];
                    case 18:
                        _k.trys.push([18, , 21, 22]);
                        if (!(!_a && !_d && (_e = _b.return))) return [3 /*break*/, 20];
                        return [4 /*yield*/, __await(_e.call(_b))];
                    case 19:
                        _k.sent();
                        _k.label = 20;
                    case 20: return [3 /*break*/, 22];
                    case 21:
                        if (e_3) throw e_3.error;
                        return [7 /*endfinally*/];
                    case 22: return [7 /*endfinally*/];
                    case 23: return [3 /*break*/, 25];
                    case 24:
                        error_1 = _k.sent();
                        if (error_1 instanceof Error) {
                            if ("code" in error_1) {
                                throw new Error("AWS Bedrock stream error (".concat(error_1.code, "): ").concat(error_1.message));
                            }
                            throw new Error("Error processing Bedrock stream: ".concat(error_1.message));
                        }
                        throw new Error("Error processing Bedrock stream: Unknown error occurred");
                    case 25: return [2 /*return*/];
                }
            });
        });
    };
    BedrockApi.prototype.completionNonStream = function (body) {
        throw new Error("Bedrock does not support completions API");
    };
    BedrockApi.prototype.completionStream = function (body) {
        throw new Error("Bedrock does not support completions API");
    };
    BedrockApi.prototype.fimStream = function (body) {
        throw new Error("Bedrock does not support FIM directly");
    };
    BedrockApi.prototype.getInvokeModelResponseBody = function (model, jsonBody) {
        return __awaiter(this, void 0, void 0, function () {
            var payload, command, client, response, decoder, decoded;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        payload = {
                            body: JSON.stringify(jsonBody),
                            modelId: model,
                            accept: "*/*",
                            contentType: "application/json",
                        };
                        command = new client_bedrock_runtime_1.InvokeModelCommand(payload);
                        return [4 /*yield*/, this.getClient()];
                    case 1:
                        client = _a.sent();
                        return [4 /*yield*/, client.send(command)];
                    case 2:
                        response = _a.sent();
                        if (!response.body) {
                            throw new Error("No response body");
                        }
                        decoder = new TextDecoder();
                        decoded = decoder.decode(response.body);
                        return [2 /*return*/, JSON.parse(decoded)];
                }
            });
        });
    };
    BedrockApi.prototype.getEmbedTexts = function (body) {
        var texts = [];
        if (typeof body.input === "string") {
            texts.push(body.input);
        }
        else if (body.input.length > 0) {
            var firstVal = body.input[0];
            if (Array.isArray(firstVal)) {
                throw new Error("Unsupported embeddings type received: number[][]");
            }
            if (typeof firstVal === "string") {
                texts.push.apply(texts, body.input);
            }
            else {
                throw new Error("Unsupported embeddings type received: number[]");
            }
        }
        return texts;
    };
    BedrockApi.prototype.embed = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var texts, embeddings, payload, output;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        texts = this.getEmbedTexts(body);
                        if (!body.model.startsWith("cohere")) return [3 /*break*/, 2];
                        payload = {
                            texts: texts,
                            input_type: "search_document",
                            truncate: "END",
                        };
                        return [4 /*yield*/, this.getInvokeModelResponseBody(body.model, payload)];
                    case 1:
                        output = _a.sent();
                        embeddings = [output.embedding];
                        return [3 /*break*/, 5];
                    case 2:
                        if (!body.model.startsWith("amazon.titan-embed")) return [3 /*break*/, 4];
                        return [4 /*yield*/, Promise.all(texts.map(function (text) { return __awaiter(_this, void 0, void 0, function () {
                                var payload, output;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            payload = {
                                                inputText: text,
                                            };
                                            return [4 /*yield*/, this.getInvokeModelResponseBody(body.model, payload)];
                                        case 1:
                                            output = _a.sent();
                                            return [2 /*return*/, output.embeddings || []];
                                    }
                                });
                            }); }))];
                    case 3:
                        embeddings = _a.sent();
                        return [3 /*break*/, 5];
                    case 4: throw new Error("Unsupported model: ".concat(body.model));
                    case 5: return [2 /*return*/, (0, util_js_1.embedding)({
                            data: embeddings,
                            model: body.model,
                            usage: {
                                prompt_tokens: 0,
                                total_tokens: 0,
                            },
                        })];
                }
            });
        });
    };
    BedrockApi.prototype.rerank = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var payload, responseBody, scores, error_2;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!body.query || !body.documents.length) {
                            throw new Error("Query and chunks must not be empty");
                        }
                        payload = {
                            query: body.query,
                            documents: body.documents,
                            top_n: (_a = body.top_k) !== null && _a !== void 0 ? _a : body.documents.length,
                        };
                        // Add api_version for Cohere model
                        if (body.model.startsWith("cohere.rerank")) {
                            payload.api_version = 2;
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.getInvokeModelResponseBody(body.model, payload)];
                    case 2:
                        responseBody = _b.sent();
                        scores = responseBody.results
                            .sort(function (a, b) { return a.index - b.index; })
                            .map(function (result) { return result.relevance_score; });
                        return [2 /*return*/, (0, util_js_1.rerank)({
                                model: body.model,
                                usage: {
                                    total_tokens: 0,
                                },
                                data: scores,
                            })];
                    case 3:
                        error_2 = _b.sent();
                        if (error_2 instanceof Error) {
                            if ("code" in error_2) {
                                // AWS SDK specific errors
                                throw new Error("AWS Bedrock rerank error (".concat(error_2.code, "): ").concat(error_2.message));
                            }
                            throw new Error("Error in BedrockReranker.rerank: ".concat(error_2.message));
                        }
                        throw new Error("Error in BedrockReranker.rerank: Unknown error occurred");
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BedrockApi.prototype.list = function () {
        throw new Error("Method not implemented.");
    };
    return BedrockApi;
}());
exports.BedrockApi = BedrockApi;
