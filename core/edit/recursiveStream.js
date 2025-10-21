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
exports.recursiveStream = recursiveStream;
var constants_1 = require("../llm/constants");
var countTokens_1 = require("../llm/countTokens");
var messageContent_1 = require("../util/messageContent");
var constants_js_1 = require("./constants.js");
var INFINITE_STREAM_SAFETY = 0.9;
var DUD_PROMPT_LOG = {
    modelTitle: "",
    modelProvider: "",
    prompt: "",
    completion: "",
};
var RECURSIVE_PROMPT = "Continue EXACTLY where you left";
function recursiveStream(llm_1, abortController_1, type_1, prompt_1, prediction_1) {
    return __asyncGenerator(this, arguments, function recursiveStream_1(llm, abortController, type, prompt, prediction, currentBuffer, isContinuation) {
        var maxTokens, safeTokens, totalTokens, buffer, injectApplyToken, finalPrompt, generator, _a, generator_1, generator_1_1, chunk, e_1_1, promptMessages, generator, _b, generator_2, generator_2_1, chunk, rendered, e_2_1;
        var _c, e_1, _d, _e, _f, e_2, _g, _h;
        var _j, _k;
        if (currentBuffer === void 0) { currentBuffer = ""; }
        if (isContinuation === void 0) { isContinuation = false; }
        return __generator(this, function (_l) {
            switch (_l.label) {
                case 0:
                    maxTokens = (_k = (_j = llm.completionOptions) === null || _j === void 0 ? void 0 : _j.maxTokens) !== null && _k !== void 0 ? _k : constants_1.DEFAULT_MAX_TOKENS;
                    safeTokens = maxTokens * INFINITE_STREAM_SAFETY;
                    totalTokens = 0;
                    buffer = currentBuffer;
                    injectApplyToken = type === "apply" && shouldInjectApplyToken(llm);
                    if (!(typeof prompt === "string")) return [3 /*break*/, 15];
                    finalPrompt = injectApplyToken ? prompt + constants_js_1.APPLY_UNIQUE_TOKEN : prompt;
                    generator = llm.streamComplete(finalPrompt, abortController.signal, {
                        raw: true,
                        prediction: undefined,
                        reasoning: false,
                    });
                    _l.label = 1;
                case 1:
                    _l.trys.push([1, 8, 9, 14]);
                    _a = true, generator_1 = __asyncValues(generator);
                    _l.label = 2;
                case 2: return [4 /*yield*/, __await(generator_1.next())];
                case 3:
                    if (!(generator_1_1 = _l.sent(), _c = generator_1_1.done, !_c)) return [3 /*break*/, 7];
                    _e = generator_1_1.value;
                    _a = false;
                    chunk = _e;
                    return [4 /*yield*/, __await(chunk)];
                case 4: return [4 /*yield*/, _l.sent()];
                case 5:
                    _l.sent();
                    buffer += chunk;
                    totalTokens += (0, countTokens_1.countTokens)(chunk);
                    if (totalTokens >= safeTokens) {
                        throw new Error("Token limit reached. File/range likely too large for this edit");
                        // const continuationPrompt = `${RECURSIVE_PROMPT}:\n\n${buffer}`;
                        // await generator.return(DUD_PROMPT_LOG); // kill the previous generator
                        // // TODO - Prediction capabilities lost because of partial input
                        // yield* recursiveStream(
                        //   llm,
                        //   abortController,
                        //   continuationPrompt,
                        //   undefined,
                        //   buffer,
                        //   true,
                        // ); // Recursively stream the continuation
                        // return;
                    }
                    _l.label = 6;
                case 6:
                    _a = true;
                    return [3 /*break*/, 2];
                case 7: return [3 /*break*/, 14];
                case 8:
                    e_1_1 = _l.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 14];
                case 9:
                    _l.trys.push([9, , 12, 13]);
                    if (!(!_a && !_c && (_d = generator_1.return))) return [3 /*break*/, 11];
                    return [4 /*yield*/, __await(_d.call(generator_1))];
                case 10:
                    _l.sent();
                    _l.label = 11;
                case 11: return [3 /*break*/, 13];
                case 12:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 13: return [7 /*endfinally*/];
                case 14: return [3 /*break*/, 29];
                case 15:
                    promptMessages = injectApplyToken
                        ? appendTokenToLastMessage(prompt, constants_js_1.APPLY_UNIQUE_TOKEN)
                        : prompt;
                    generator = llm.streamChat(promptMessages, abortController.signal, {
                        raw: true,
                        prediction: undefined,
                        reasoning: false,
                    });
                    _l.label = 16;
                case 16:
                    _l.trys.push([16, 23, 24, 29]);
                    _b = true, generator_2 = __asyncValues(generator);
                    _l.label = 17;
                case 17: return [4 /*yield*/, __await(generator_2.next())];
                case 18:
                    if (!(generator_2_1 = _l.sent(), _f = generator_2_1.done, !_f)) return [3 /*break*/, 22];
                    _h = generator_2_1.value;
                    _b = false;
                    chunk = _h;
                    return [4 /*yield*/, __await(chunk)];
                case 19: return [4 /*yield*/, _l.sent()];
                case 20:
                    _l.sent();
                    rendered = (0, messageContent_1.renderChatMessage)(chunk);
                    buffer += rendered;
                    totalTokens += (0, countTokens_1.countTokens)(chunk.content);
                    if (totalTokens >= safeTokens) {
                        throw new Error("Token limit reached. File/range likely too large for this edit");
                        // const continuationPrompt: ChatMessage[] = [
                        //   ...(isContinuation ? prompt.slice(0, -2) : prompt),
                        //   {
                        //     role: "assistant",
                        //     content: buffer,
                        //   },
                        //   {
                        //     role: "user",
                        //     content: RECURSIVE_PROMPT,
                        //   },
                        // ];
                        // await generator.return(DUD_PROMPT_LOG);
                        // yield* recursiveStream(
                        //   llm,
                        //   abortController,
                        //   continuationPrompt,
                        //   undefined,
                        //   buffer,
                        //   true,
                        // );
                        // return;
                    }
                    _l.label = 21;
                case 21:
                    _b = true;
                    return [3 /*break*/, 17];
                case 22: return [3 /*break*/, 29];
                case 23:
                    e_2_1 = _l.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 29];
                case 24:
                    _l.trys.push([24, , 27, 28]);
                    if (!(!_b && !_f && (_g = generator_2.return))) return [3 /*break*/, 26];
                    return [4 /*yield*/, __await(_g.call(generator_2))];
                case 25:
                    _l.sent();
                    _l.label = 26;
                case 26: return [3 /*break*/, 28];
                case 27:
                    if (e_2) throw e_2.error;
                    return [7 /*endfinally*/];
                case 28: return [7 /*endfinally*/];
                case 29: return [2 /*return*/];
            }
        });
    });
}
function shouldInjectApplyToken(llm) {
    var _a, _b;
    var model = (_b = (_a = llm.model) === null || _a === void 0 ? void 0 : _a.toLowerCase()) !== null && _b !== void 0 ? _b : "";
    return (llm.underlyingProviderName === "inception" && model.includes("mercury"));
}
function appendTokenToLastMessage(messages, token) {
    if (messages.length === 0) {
        return messages;
    }
    var lastMessage = messages[messages.length - 1];
    if (typeof lastMessage.content !== "string") {
        return messages;
    }
    if (lastMessage.content.endsWith(token)) {
        return messages;
    }
    var updatedMessages = __spreadArray([], messages, true);
    updatedMessages[updatedMessages.length - 1] = __assign(__assign({}, lastMessage), { content: lastMessage.content + token });
    return updatedMessages;
}
