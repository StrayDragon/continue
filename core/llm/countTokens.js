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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenCountingBufferSafety = getTokenCountingBufferSafety;
exports.cleanupAsyncEncoders = cleanupAsyncEncoders;
exports.compileChatMessages = compileChatMessages;
exports.countTokens = countTokens;
exports.countTokensAsync = countTokensAsync;
exports.extractToolSequence = extractToolSequence;
exports.pruneLinesFromBottom = pruneLinesFromBottom;
exports.pruneLinesFromTop = pruneLinesFromTop;
exports.pruneRawPromptFromTop = pruneRawPromptFromTop;
exports.pruneStringFromBottom = pruneStringFromBottom;
exports.pruneStringFromTop = pruneStringFromTop;
var js_tiktoken_1 = require("js-tiktoken");
var autodetect_js_1 = require("./autodetect.js");
var messages_js_1 = require("./messages.js");
var messageContent_js_1 = require("../util/messageContent.js");
var asyncEncoder_js_1 = require("./asyncEncoder.js");
var constants_js_1 = require("./constants.js");
var llamaTokenizer_js_1 = require("./llamaTokenizer.js");
var LlamaEncoding = /** @class */ (function () {
    function LlamaEncoding() {
    }
    LlamaEncoding.prototype.encode = function (text) {
        return llamaTokenizer_js_1.default.encode(text);
    };
    LlamaEncoding.prototype.decode = function (tokens) {
        return llamaTokenizer_js_1.default.decode(tokens);
    };
    return LlamaEncoding;
}());
var NonWorkerAsyncEncoder = /** @class */ (function () {
    function NonWorkerAsyncEncoder(encoding) {
        this.encoding = encoding;
    }
    NonWorkerAsyncEncoder.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    NonWorkerAsyncEncoder.prototype.encode = function (text) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.encoding.encode(text)];
            });
        });
    };
    NonWorkerAsyncEncoder.prototype.decode = function (tokens) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.encoding.decode(tokens)];
            });
        });
    };
    return NonWorkerAsyncEncoder;
}());
var gptEncoding = null;
var llamaEncoding = new LlamaEncoding();
var llamaAsyncEncoder = new asyncEncoder_js_1.LlamaAsyncEncoder();
function asyncEncoderForModel(modelName) {
    // Temporary due to issues packaging the worker files
    if (process.env.IS_BINARY) {
        var encoding = encodingForModel(modelName);
        return new NonWorkerAsyncEncoder(encoding);
    }
    var modelType = (0, autodetect_js_1.autodetectTemplateType)(modelName);
    if (!modelType || modelType === "none") {
        // Right now there is a problem packaging js-tiktoken in workers. Until then falling back
        // Cannot find package 'js-tiktoken' imported from /Users/nate/gh/continuedev/continue/extensions/vscode/out/tiktokenWorkerPool.mjs
        // return gptAsyncEncoder;
        return llamaAsyncEncoder;
    }
    return llamaAsyncEncoder;
}
function encodingForModel(modelName) {
    var modelType = (0, autodetect_js_1.autodetectTemplateType)(modelName);
    if (!modelType || modelType === "none") {
        if (!gptEncoding) {
            gptEncoding = (0, js_tiktoken_1.encodingForModel)("gpt-4");
        }
        return gptEncoding;
    }
    return llamaEncoding;
}
function countImageTokens(content) {
    if (content.type === "imageUrl") {
        return 1024;
    }
    throw new Error("Non-image content type");
}
function countTokensAsync(content_1) {
    return __awaiter(this, arguments, void 0, function (content, 
    // defaults to llama2 because the tokenizer tends to produce more tokens
    modelName) {
        var encoding, promises;
        var _this = this;
        if (modelName === void 0) { modelName = "llama2"; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    encoding = asyncEncoderForModel(modelName);
                    if (!Array.isArray(content)) return [3 /*break*/, 2];
                    promises = content.map(function (part) { return __awaiter(_this, void 0, void 0, function () {
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (part.type === "imageUrl") {
                                        return [2 /*return*/, countImageTokens(part)];
                                    }
                                    return [4 /*yield*/, encoding.encode((_a = part.text) !== null && _a !== void 0 ? _a : "")];
                                case 1: return [2 /*return*/, (_b.sent()).length];
                            }
                        });
                    }); });
                    return [4 /*yield*/, Promise.all(promises)];
                case 1: return [2 /*return*/, (_a.sent()).reduce(function (sum, val) { return sum + val; }, 0)];
                case 2: return [4 /*yield*/, encoding.encode(content !== null && content !== void 0 ? content : "")];
                case 3: return [2 /*return*/, (_a.sent()).length];
            }
        });
    });
}
function countTokens(content, 
// defaults to llama2 because the tokenizer tends to produce more tokens
modelName) {
    if (modelName === void 0) { modelName = "llama2"; }
    var encoding = encodingForModel(modelName);
    if (Array.isArray(content)) {
        return content.reduce(function (acc, part) {
            var _a;
            return (acc +
                (part.type === "text"
                    ? encoding.encode((_a = part.text) !== null && _a !== void 0 ? _a : "", "all", []).length
                    : countImageTokens(part)));
        }, 0);
    }
    else {
        return encoding.encode(content !== null && content !== void 0 ? content : "", "all", []).length;
    }
}
// https://community.openai.com/t/how-to-calculate-the-tokens-when-using-function-call/266573/10
function countToolsTokens(tools, modelName) {
    var _a;
    var count = function (value) {
        return encodingForModel(modelName).encode(value).length;
    };
    var numTokens = 12;
    for (var _i = 0, tools_1 = tools; _i < tools_1.length; _i++) {
        var tool = tools_1[_i];
        var functionTokens = count(tool.function.name);
        if (tool.function.description) {
            functionTokens += count(tool.function.description);
        }
        var props = (_a = tool.function.parameters) === null || _a === void 0 ? void 0 : _a.properties;
        if (props) {
            for (var key in props) {
                functionTokens += count(key);
                var fields = props[key];
                if (fields) {
                    var fieldType = fields["type"];
                    var fieldDesc = fields["description"];
                    var fieldEnum = fields["enum"];
                    if (fieldType && typeof fieldType === "string") {
                        functionTokens += 2;
                        functionTokens += count(fieldType);
                    }
                    if (fieldDesc && typeof fieldDesc === "string") {
                        functionTokens += 2;
                        functionTokens += count(fieldDesc);
                    }
                    if (fieldEnum && Array.isArray(fieldEnum)) {
                        functionTokens -= 3;
                        for (var _b = 0, fieldEnum_1 = fieldEnum; _b < fieldEnum_1.length; _b++) {
                            var e = fieldEnum_1[_b];
                            functionTokens += 3;
                            functionTokens += typeof e === "string" ? count(e) : 5;
                        }
                    }
                }
            }
        }
        numTokens += functionTokens;
    }
    return numTokens + 12;
}
function countChatMessageTokens(modelName, chatMessage) {
    // Doing simpler, safer version of what is here:
    // https://github.com/openai/openai-cookbook/blob/main/examples/How_to_count_tokens_with_tiktoken.ipynb
    // every message follows <|im_start|>{role/name}\n{content}<|end|>\n
    var BASE_TOKENS = 4;
    var TOOL_CALL_EXTRA_TOKENS = 10;
    var TOOL_OUTPUT_EXTRA_TOKENS = 10;
    var tokens = BASE_TOKENS;
    if (chatMessage.content) {
        tokens += countTokens(chatMessage.content, modelName);
    }
    if ("toolCalls" in chatMessage && chatMessage.toolCalls) {
        for (var _i = 0, _a = chatMessage.toolCalls; _i < _a.length; _i++) {
            var call = _a[_i];
            tokens += TOOL_CALL_EXTRA_TOKENS;
            tokens += countTokens(JSON.stringify(call), modelName); // TODO hone this
        }
    }
    if (chatMessage.role === "thinking") {
        if (chatMessage.redactedThinking) {
            tokens += countTokens(chatMessage.redactedThinking, modelName);
        }
        if (chatMessage.signature) {
            tokens += countTokens(chatMessage.signature, modelName);
        }
    }
    if (chatMessage.role === "tool") {
        tokens += TOOL_OUTPUT_EXTRA_TOKENS; // safety
        if (chatMessage.toolCallId) {
            tokens += countTokens(chatMessage.toolCallId, modelName);
        }
    }
    return tokens;
}
/**
 * Extracts and validates the tool call sequence from the end of a message array.
 * Tool sequences consist of: [assistant_with_tool_calls, tool_response_1, tool_response_2, ...]
 * or just a single user message.
 *
 * @param messages - Array of chat messages (will be modified by popping messages)
 * @returns Array of messages that form the tool sequence
 */
function extractToolSequence(messages) {
    var lastMsg = messages.pop();
    if (!lastMsg || !(0, messages_js_1.isUserOrToolMsg)(lastMsg)) {
        throw new Error("Error parsing chat history: no user/tool message found");
    }
    var toolSequence = [];
    if (lastMsg.role === "tool") {
        toolSequence.push(lastMsg);
        // Collect all consecutive tool messages from the end
        while (messages.length > 0 &&
            messages[messages.length - 1].role === "tool") {
            toolSequence.unshift(messages.pop());
        }
        // Get the assistant message with tool calls
        var assistantMsg = messages.pop();
        if (assistantMsg) {
            toolSequence.unshift(assistantMsg);
            // Validate that all tool messages have matching tool call IDs
            for (var _i = 0, _a = toolSequence.slice(1); _i < _a.length; _i++) {
                var toolMsg = _a[_i];
                // Skip assistant message
                if (toolMsg.role === "tool" &&
                    !(0, messages_js_1.messageHasToolCallId)(assistantMsg, toolMsg.toolCallId)) {
                    throw new Error("Error parsing chat history: no tool call found to match tool output for id \"".concat(toolMsg.toolCallId, "\""));
                }
            }
        }
    }
    else {
        // Single user message
        toolSequence.push(lastMsg);
    }
    return toolSequence;
}
function pruneLinesFromTop(prompt, maxTokens, modelName) {
    var lines = prompt.split("\n");
    // Preprocess tokens for all lines and cache them.
    var lineTokens = lines.map(function (line) { return countTokens(line, modelName); });
    var totalTokens = lineTokens.reduce(function (sum, tokens) { return sum + tokens; }, 0);
    var start = 0;
    var currentLines = lines.length;
    // Calculate initial token count including newlines
    totalTokens += Math.max(0, currentLines - 1); // Add tokens for joining newlines
    // Using indexes instead of array modifications.
    // Remove lines from the top until the token count is within the limit.
    while (totalTokens > maxTokens && start < currentLines) {
        totalTokens -= lineTokens[start];
        // Decrement token count for the removed line and its preceding/joining newline (if not the last line)
        if (currentLines - start > 1) {
            totalTokens--;
        }
        start++;
    }
    return lines.slice(start).join("\n");
}
function pruneLinesFromBottom(prompt, maxTokens, modelName) {
    var lines = prompt.split("\n");
    var lineTokens = lines.map(function (line) { return countTokens(line, modelName); });
    var totalTokens = lineTokens.reduce(function (sum, tokens) { return sum + tokens; }, 0);
    var end = lines.length;
    // Calculate initial token count including newlines
    totalTokens += Math.max(0, end - 1); // Add tokens for joining newlines
    // Reverse traversal to avoid array modification
    // Remove lines from the bottom until the token count is within the limit.
    while (totalTokens > maxTokens && end > 0) {
        end--;
        totalTokens -= lineTokens[end];
        // Decrement token count for the removed line and its following/joining newline (if not the first line)
        if (end > 0) {
            totalTokens--;
        }
    }
    return lines.slice(0, end).join("\n");
}
function pruneStringFromBottom(modelName, maxTokens, prompt) {
    var encoding = encodingForModel(modelName);
    var tokens = encoding.encode(prompt, "all", []);
    if (tokens.length <= maxTokens) {
        return prompt;
    }
    return encoding.decode(tokens.slice(0, maxTokens));
}
function pruneStringFromTop(modelName, maxTokens, prompt) {
    var encoding = encodingForModel(modelName);
    var tokens = encoding.encode(prompt, "all", []);
    if (tokens.length <= maxTokens) {
        return prompt;
    }
    return encoding.decode(tokens.slice(tokens.length - maxTokens));
}
var MAX_TOKEN_SAFETY_BUFFER = 1000;
var TOKEN_SAFETY_PROPORTION = 0.02;
function getTokenCountingBufferSafety(contextLength) {
    return Math.min(MAX_TOKEN_SAFETY_BUFFER, contextLength * TOKEN_SAFETY_PROPORTION);
}
var MIN_RESPONSE_TOKENS = 1000;
function pruneRawPromptFromTop(modelName, contextLength, prompt, tokensForCompletion) {
    var maxTokens = contextLength -
        tokensForCompletion -
        getTokenCountingBufferSafety(contextLength);
    return pruneStringFromTop(modelName, maxTokens, prompt);
}
/**
 * Reconciles chat messages with available context length by intelligently pruning older messages
 * while preserving critical conversation elements.
 *
 * Core Guidelines:
 * - Always preserve the last user/tool message sequence (including any associated assistant message with tool calls)
 * - Always preserve the system message and tools
 * - Never allow orphaned tool responses without their corresponding tool calls
 * - Remove older messages first when pruning is necessary
 * - Maintain conversation coherence by flattening adjacent similar messages
 *
 * Process:
 * 1. Handle image content conversion for models that don't support images
 * 2. Extract and preserve system message
 * 3. Filter out empty messages and trailing non-user/tool messages
 * 4. Extract the complete tool sequence from the end (user message or assistant + tool responses)
 * 5. Calculate token requirements for non-negotiable elements (system, tools, last sequence)
 * 6. Prune older messages until within available token budget
 * 7. Reassemble with proper ordering and flatten adjacent similar messages
 *
 * @param params - Configuration object containing:
 *   - modelName: LLM model name for token counting
 *   - msgs: Array of chat messages to process
 *   - contextLength: Maximum context length supported by the model
 *   - maxTokens: Maximum tokens to reserve for the response
 *   - supportsImages: Whether the model supports image content
 *   - tools: Optional array of available tools
 * @returns Processed array of chat messages that fit within context constraints
 * @throws Error if non-negotiable elements exceed available context
 */
function compileChatMessages(_a) {
    var _b;
    var modelName = _a.modelName, msgs = _a.msgs, knownContextLength = _a.knownContextLength, maxTokens = _a.maxTokens, supportsImages = _a.supportsImages, tools = _a.tools;
    var didPrune = false;
    var msgsCopy = msgs.map(function (m) { return (__assign({}, m)); });
    // If images not supported, convert MessagePart[] to string
    if (!supportsImages) {
        for (var _i = 0, msgsCopy_1 = msgsCopy; _i < msgsCopy_1.length; _i++) {
            var msg = msgsCopy_1[_i];
            if ("content" in msg && Array.isArray(msg.content)) {
                var content = (0, messageContent_js_1.renderChatMessage)(msg);
                msg.content = content;
            }
        }
    }
    // Extract system message
    var systemMsg = msgsCopy.find(function (msg) { return msg.role === "system"; });
    msgsCopy = msgsCopy.filter(function (msg) { return msg.role !== "system"; });
    // Remove any empty messages or non-user/tool trailing messages
    msgsCopy = msgsCopy.filter(function (msg) { return !(0, messages_js_1.chatMessageIsEmpty)(msg); });
    msgsCopy = (0, messages_js_1.addSpaceToAnyEmptyMessages)(msgsCopy);
    // Extract the tool sequence from the end of the message array
    var toolSequence = extractToolSequence(msgsCopy);
    // Count tokens for all messages in the tool sequence
    var lastMessagesTokens = 0;
    for (var _c = 0, toolSequence_1 = toolSequence; _c < toolSequence_1.length; _c++) {
        var msg = toolSequence_1[_c];
        lastMessagesTokens += countChatMessageTokens(modelName, msg);
    }
    // System message
    var systemMsgTokens = 0;
    if (systemMsg) {
        systemMsgTokens = countChatMessageTokens(modelName, systemMsg);
    }
    // Tools
    var toolTokens = 0;
    if (tools) {
        toolTokens = countToolsTokens(tools, modelName);
    }
    var contextLength = knownContextLength !== null && knownContextLength !== void 0 ? knownContextLength : constants_js_1.DEFAULT_PRUNING_LENGTH;
    var countingSafetyBuffer = getTokenCountingBufferSafety(contextLength);
    var minOutputTokens = Math.min(MIN_RESPONSE_TOKENS, maxTokens);
    var inputTokensAvailable = contextLength;
    // Leave space for output/safety
    inputTokensAvailable -= countingSafetyBuffer;
    inputTokensAvailable -= minOutputTokens;
    // Non-negotiable messages
    inputTokensAvailable -= toolTokens;
    inputTokensAvailable -= systemMsgTokens;
    inputTokensAvailable -= lastMessagesTokens;
    // Make sure there's enough context for the non-excludable items
    if (knownContextLength !== undefined && inputTokensAvailable < 0) {
        throw new Error("Not enough context available to include the system message, last user message, and tools.\n        There must be at least ".concat(minOutputTokens, " tokens remaining for output.\n        Request had the following token counts:\n        - contextLength: ").concat(knownContextLength, "\n        - counting safety buffer: ").concat(countingSafetyBuffer, "\n        - tools: ~").concat(toolTokens, "\n        - system message: ~").concat(systemMsgTokens, "\n        - max output tokens: ").concat(maxTokens));
    }
    // Now remove messages till we're under the limit
    var currentTotal = 0;
    var historyWithTokens = msgsCopy.map(function (message) {
        var tokens = countChatMessageTokens(modelName, message);
        currentTotal += tokens;
        return __assign(__assign({}, message), { tokens: tokens });
    });
    while (historyWithTokens.length > 0 && currentTotal > inputTokensAvailable) {
        var message = historyWithTokens.shift();
        currentTotal -= message.tokens;
        didPrune = true;
        // At this point make sure no latent tool response without corresponding call
        while (((_b = historyWithTokens[0]) === null || _b === void 0 ? void 0 : _b.role) === "tool") {
            var message_1 = historyWithTokens.shift();
            currentTotal -= message_1.tokens;
        }
    }
    // Now reassemble
    var reassembled = [];
    if (systemMsg) {
        reassembled.push(systemMsg);
    }
    reassembled.push.apply(reassembled, historyWithTokens.map(function (_a) {
        var tokens = _a.tokens, rest = __rest(_a, ["tokens"]);
        return rest;
    }));
    reassembled.push.apply(reassembled, toolSequence);
    var inputTokens = currentTotal + systemMsgTokens + toolTokens + lastMessagesTokens;
    var availableTokens = contextLength - countingSafetyBuffer - minOutputTokens;
    var contextPercentage = inputTokens / availableTokens;
    return {
        compiledChatMessages: reassembled,
        didPrune: didPrune,
        contextPercentage: contextPercentage,
    };
}
function cleanupAsyncEncoders() {
    return __awaiter(this, void 0, void 0, function () {
        var e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, llamaAsyncEncoder.close()];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _a.sent();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
