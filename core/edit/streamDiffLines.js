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
Object.defineProperty(exports, "__esModule", { value: true });
exports.addIndentation = addIndentation;
exports.streamDiffLines = streamDiffLines;
var lineStream_1 = require("../autocomplete/filtering/streamTransforms/lineStream");
var streamDiff_1 = require("../diff/streamDiff");
var util_1 = require("../diff/util");
var getSystemMessageWithRules_1 = require("../llm/rules/getSystemMessageWithRules");
var edit_1 = require("../llm/templates/edit");
var gpt_1 = require("../llm/templates/edit/gpt");
var findLast_1 = require("../util/findLast");
var posthog_1 = require("../util/posthog");
var recursiveStream_1 = require("./recursiveStream");
function constructEditPrompt(prefix, highlighted, suffix, llm, userInput, language) {
    var _a, _b;
    var template = (_b = (_a = llm.promptTemplates) === null || _a === void 0 ? void 0 : _a.edit) !== null && _b !== void 0 ? _b : edit_1.gptEditPrompt;
    return llm.renderPromptTemplate(template, [], {
        userInput: userInput,
        prefix: prefix,
        codeToEdit: highlighted,
        suffix: suffix,
        language: language !== null && language !== void 0 ? language : "",
    });
}
function constructApplyPrompt(originalCode, newCode, llm) {
    var _a, _b;
    var template = (_b = (_a = llm.promptTemplates) === null || _a === void 0 ? void 0 : _a.apply) !== null && _b !== void 0 ? _b : gpt_1.defaultApplyPrompt;
    var rendered = llm.renderPromptTemplate(template, [], {
        original_code: originalCode,
        new_code: newCode,
    });
    return rendered;
}
function addIndentation(diffLineGenerator, indentation) {
    return __asyncGenerator(this, arguments, function addIndentation_1() {
        var _a, diffLineGenerator_1, diffLineGenerator_1_1, diffLine, e_1_1;
        var _b, e_1, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 7, 8, 13]);
                    _a = true, diffLineGenerator_1 = __asyncValues(diffLineGenerator);
                    _e.label = 1;
                case 1: return [4 /*yield*/, __await(diffLineGenerator_1.next())];
                case 2:
                    if (!(diffLineGenerator_1_1 = _e.sent(), _b = diffLineGenerator_1_1.done, !_b)) return [3 /*break*/, 6];
                    _d = diffLineGenerator_1_1.value;
                    _a = false;
                    diffLine = _d;
                    return [4 /*yield*/, __await(__assign(__assign({}, diffLine), { line: indentation + diffLine.line }))];
                case 3: return [4 /*yield*/, _e.sent()];
                case 4:
                    _e.sent();
                    _e.label = 5;
                case 5:
                    _a = true;
                    return [3 /*break*/, 1];
                case 6: return [3 /*break*/, 13];
                case 7:
                    e_1_1 = _e.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 13];
                case 8:
                    _e.trys.push([8, , 11, 12]);
                    if (!(!_a && !_b && (_c = diffLineGenerator_1.return))) return [3 /*break*/, 10];
                    return [4 /*yield*/, __await(_c.call(diffLineGenerator_1))];
                case 9:
                    _e.sent();
                    _e.label = 10;
                case 10: return [3 /*break*/, 12];
                case 11:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 12: return [7 /*endfinally*/];
                case 13: return [2 /*return*/];
            }
        });
    });
}
function modelIsInept(model) {
    return !(model.includes("gpt") || model.includes("claude"));
}
function streamDiffLines(options, llm, abortController, overridePrompt, rulesToInclude) {
    return __asyncGenerator(this, arguments, function streamDiffLines_1() {
        var type, prefix, highlighted, suffix, input, language, oldLines, prompt, systemMessage, curSysMsg, inept, prediction, completion, lines, diffLines, line, indentation, _a, diffLines_1, diffLines_1_1, diffLine, e_2_1;
        var _b, e_2, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    type = options.type, prefix = options.prefix, highlighted = options.highlighted, suffix = options.suffix, input = options.input, language = options.language;
                    void posthog_1.Telemetry.capture("inlineEdit", {
                        model: llm.model,
                        provider: llm.providerName,
                    }, true);
                    oldLines = highlighted.length > 0
                        ? highlighted.split("\n")
                        : // When highlighted is empty, we need to combine last line of prefix and first line of suffix to determine the line being edited
                            [(prefix + suffix).split("\n")[prefix.split("\n").length - 1]];
                    // But if that line is empty, we can assume we are insertion-only
                    if (oldLines.length === 1 && oldLines[0].trim() === "") {
                        oldLines = [];
                    }
                    prompt = overridePrompt !== null && overridePrompt !== void 0 ? overridePrompt : (type === "apply"
                        ? constructApplyPrompt(oldLines.join("\n"), options.newCode, llm)
                        : constructEditPrompt(prefix, highlighted, suffix, llm, input, language));
                    systemMessage = rulesToInclude || llm.baseChatSystemMessage
                        ? (0, getSystemMessageWithRules_1.getSystemMessageWithRules)({
                            availableRules: rulesToInclude !== null && rulesToInclude !== void 0 ? rulesToInclude : [],
                            userMessage: typeof prompt === "string"
                                ? {
                                    role: "user",
                                    content: prompt,
                                }
                                : (0, findLast_1.findLast)(prompt, function (msg) { return msg.role === "user" || msg.role === "tool"; }),
                            baseSystemMessage: llm.baseChatSystemMessage,
                            contextItems: [],
                        }).systemMessage
                        : undefined;
                    if (systemMessage) {
                        if (typeof prompt === "string") {
                            prompt = [
                                {
                                    role: "system",
                                    content: systemMessage,
                                },
                                {
                                    role: "user",
                                    content: prompt,
                                },
                            ];
                        }
                        else {
                            curSysMsg = prompt.find(function (msg) { return msg.role === "system"; });
                            if (curSysMsg) {
                                curSysMsg.content = systemMessage + "\n\n" + curSysMsg.content;
                            }
                            else {
                                prompt.unshift({
                                    role: "system",
                                    content: systemMessage,
                                });
                            }
                        }
                    }
                    inept = modelIsInept(llm.model);
                    prediction = {
                        type: "content",
                        content: highlighted,
                    };
                    completion = (0, recursiveStream_1.recursiveStream)(llm, abortController, type, prompt, prediction);
                    lines = (0, util_1.streamLines)(completion);
                    lines = (0, lineStream_1.filterEnglishLinesAtStart)(lines);
                    lines = (0, lineStream_1.filterCodeBlockLines)(lines);
                    lines = (0, lineStream_1.stopAtLines)(lines, function () { });
                    lines = (0, lineStream_1.skipLines)(lines);
                    lines = (0, lineStream_1.removeTrailingWhitespace)(lines);
                    if (inept) {
                        // lines = fixCodeLlamaFirstLineIndentation(lines);
                        lines = (0, lineStream_1.filterEnglishLinesAtEnd)(lines);
                    }
                    diffLines = (0, streamDiff_1.streamDiff)(oldLines, lines);
                    diffLines = (0, lineStream_1.filterLeadingAndTrailingNewLineInsertion)(diffLines);
                    if (highlighted.length === 0) {
                        line = prefix.split("\n").slice(-1)[0];
                        indentation = line.slice(0, line.length - line.trimStart().length);
                        diffLines = addIndentation(diffLines, indentation);
                    }
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 8, 9, 14]);
                    _a = true, diffLines_1 = __asyncValues(diffLines);
                    _e.label = 2;
                case 2: return [4 /*yield*/, __await(diffLines_1.next())];
                case 3:
                    if (!(diffLines_1_1 = _e.sent(), _b = diffLines_1_1.done, !_b)) return [3 /*break*/, 7];
                    _d = diffLines_1_1.value;
                    _a = false;
                    diffLine = _d;
                    return [4 /*yield*/, __await(diffLine)];
                case 4: return [4 /*yield*/, _e.sent()];
                case 5:
                    _e.sent();
                    _e.label = 6;
                case 6:
                    _a = true;
                    return [3 /*break*/, 2];
                case 7: return [3 /*break*/, 14];
                case 8:
                    e_2_1 = _e.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 14];
                case 9:
                    _e.trys.push([9, , 12, 13]);
                    if (!(!_a && !_b && (_c = diffLines_1.return))) return [3 /*break*/, 11];
                    return [4 /*yield*/, __await(_c.call(diffLines_1))];
                case 10:
                    _e.sent();
                    _e.label = 11;
                case 11: return [3 /*break*/, 13];
                case 12:
                    if (e_2) throw e_2.error;
                    return [7 /*endfinally*/];
                case 13: return [7 /*endfinally*/];
                case 14: return [2 /*return*/];
            }
        });
    });
}
