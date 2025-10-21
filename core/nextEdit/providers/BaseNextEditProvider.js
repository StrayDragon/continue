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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseNextEditModelProvider = void 0;
var path = require("path");
var uuid_1 = require("uuid");
var myers_js_1 = require("../../diff/myers.js");
var countTokens_js_1 = require("../../llm/countTokens.js");
var diff_js_1 = require("../diff/diff.js");
var NextEditPrefetchQueue_js_1 = require("../NextEditPrefetchQueue.js");
var utils_js_1 = require("../utils.js");
/**
 * This class is used as an abstract base class for model-specific providers.
 * This and its children are responsible for pre/post processing of prompts and outcomes.
 * Different next edit models have very different requirements.
 */
var BaseNextEditModelProvider = /** @class */ (function () {
    function BaseNextEditModelProvider(modelName) {
        this.modelName = modelName;
    }
    // Methods that can be used as default fallback.
    BaseNextEditModelProvider.prototype.handlePartialFileDiff = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var helper, editableRegionStartLine, editableRegionEndLine, startTime, llm, nextCompletion, promptMetadata, ide, profileType, oldEditRangeSlice, finalCursorPos, outcome;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        helper = params.helper, editableRegionStartLine = params.editableRegionStartLine, editableRegionEndLine = params.editableRegionEndLine, startTime = params.startTime, llm = params.llm, nextCompletion = params.nextCompletion, promptMetadata = params.promptMetadata, ide = params.ide, profileType = params.profileType;
                        oldEditRangeSlice = helper.fileContents
                            .split("\n")
                            .slice(editableRegionStartLine, editableRegionEndLine + 1)
                            .join("\n");
                        finalCursorPos = (0, diff_js_1.calculateFinalCursorPosition)(helper.pos, editableRegionStartLine, oldEditRangeSlice, nextCompletion);
                        return [4 /*yield*/, this.createNextEditOutcome({
                                helper: helper,
                                startTime: startTime,
                                llm: llm,
                                promptContent: promptMetadata.prompt.content,
                                completion: nextCompletion,
                                finalCursorPosition: finalCursorPos,
                                editableRegionStartLine: editableRegionStartLine,
                                editableRegionEndLine: editableRegionEndLine,
                                userEdits: promptMetadata.userEdits,
                                userExcerpts: promptMetadata.userExcerpts,
                                originalEditableRange: oldEditRangeSlice,
                                diffLines: [],
                                ide: ide,
                                profileType: profileType,
                            })];
                    case 1:
                        outcome = _a.sent();
                        return [2 /*return*/, outcome];
                }
            });
        });
    };
    BaseNextEditModelProvider.prototype.handleFullFileDiff = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var helper, editableRegionStartLine, editableRegionEndLine, startTime, llm, nextCompletion, promptMetadata, ide, profileType, fileSlice, diffLines, diffGroups, currentLine, prefetchQueue, cursorLocalDiffGroup;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        helper = params.helper, editableRegionStartLine = params.editableRegionStartLine, editableRegionEndLine = params.editableRegionEndLine, startTime = params.startTime, llm = params.llm, nextCompletion = params.nextCompletion, promptMetadata = params.promptMetadata, ide = params.ide, profileType = params.profileType;
                        fileSlice = helper.fileLines
                            .slice(editableRegionStartLine, editableRegionEndLine + 1)
                            .join("\n");
                        diffLines = (0, myers_js_1.myersDiff)(fileSlice, nextCompletion);
                        diffGroups = (0, diff_js_1.groupDiffLines)(diffLines, editableRegionStartLine, 5).filter(function (group) { return !(0, utils_js_1.isWhitespaceOnlyDeletion)(group.lines); });
                        currentLine = helper.pos.line;
                        prefetchQueue = NextEditPrefetchQueue_js_1.PrefetchQueue.getInstance();
                        return [4 /*yield*/, this.processDiffGroups({
                                diffGroups: diffGroups,
                                currentLine: currentLine,
                                helper: helper,
                                startTime: startTime,
                                llm: llm,
                                prefetchQueue: prefetchQueue,
                                promptMetadata: promptMetadata,
                                ide: ide,
                                profileType: profileType,
                            })];
                    case 1:
                        cursorLocalDiffGroup = _a.sent();
                        if (!cursorLocalDiffGroup) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.createOutcomeFromDiffGroup({
                                diffGroup: cursorLocalDiffGroup,
                                helper: helper,
                                startTime: startTime,
                                llm: llm,
                                completionId: helper.input.completionId,
                                isCurrentCursorGroup: true,
                                promptMetadata: promptMetadata,
                                ide: ide,
                                profileType: profileType,
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3: return [2 /*return*/, undefined];
                }
            });
        });
    };
    /**
     * Process diff groups and find the one containing the cursor.
     */
    BaseNextEditModelProvider.prototype.processDiffGroups = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var diffGroups, currentLine, helper, startTime, llm, prefetchQueue, promptMetadata, ide, profileType, cursorGroup, _i, diffGroups_1, group;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        diffGroups = params.diffGroups, currentLine = params.currentLine, helper = params.helper, startTime = params.startTime, llm = params.llm, prefetchQueue = params.prefetchQueue, promptMetadata = params.promptMetadata, ide = params.ide, profileType = params.profileType;
                        _i = 0, diffGroups_1 = diffGroups;
                        _a.label = 1;
                    case 1:
                        if (!(_i < diffGroups_1.length)) return [3 /*break*/, 5];
                        group = diffGroups_1[_i];
                        if (!(currentLine >= group.startLine && currentLine <= group.endLine)) return [3 /*break*/, 2];
                        cursorGroup = group;
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.addDiffGroupToPrefetchQueue({
                            group: group,
                            helper: helper,
                            startTime: startTime,
                            llm: llm,
                            prefetchQueue: prefetchQueue,
                            promptMetadata: promptMetadata,
                            ide: ide,
                            profileType: profileType,
                        })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/, cursorGroup];
                }
            });
        });
    };
    BaseNextEditModelProvider.prototype.addDiffGroupToPrefetchQueue = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var group, helper, startTime, llm, prefetchQueue, promptMetadata, ide, profileType, groupContent, rangeInFile, originalContent, groupOutcome;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        group = params.group, helper = params.helper, startTime = params.startTime, llm = params.llm, prefetchQueue = params.prefetchQueue, promptMetadata = params.promptMetadata, ide = params.ide, profileType = params.profileType;
                        groupContent = group.lines
                            .filter(function (l) { return l.type !== "old"; })
                            .map(function (l) { return l.line; })
                            .join("\n");
                        rangeInFile = {
                            filepath: helper.filepath,
                            range: {
                                start: { line: group.startLine, character: 0 },
                                end: {
                                    line: group.endLine,
                                    character: group.lines[group.lines.length - 1].line.length,
                                },
                            },
                        };
                        originalContent = group.lines
                            .filter(function (l) { return l.type !== "new"; })
                            .map(function (l) { return l.line; })
                            .join("\n");
                        return [4 /*yield*/, this.createNextEditOutcome({
                                helper: helper,
                                startTime: startTime,
                                llm: llm,
                                promptContent: promptMetadata.prompt.content,
                                completion: groupContent,
                                finalCursorPosition: {
                                    line: group.endLine,
                                    character: group.lines[group.lines.length - 1].line.length,
                                },
                                editableRegionStartLine: group.startLine,
                                editableRegionEndLine: group.endLine,
                                userEdits: promptMetadata.userEdits,
                                userExcerpts: promptMetadata.userExcerpts,
                                originalEditableRange: originalContent,
                                cursorPosition: { line: group.startLine, character: 0 },
                                completionId: (0, uuid_1.v4)(), // Generate a new ID for this prefetched item.
                                diffLines: group.lines,
                                ide: ide,
                                profileType: profileType,
                            })];
                    case 1:
                        groupOutcome = _a.sent();
                        prefetchQueue.enqueueProcessed({
                            location: rangeInFile,
                            outcome: groupOutcome,
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    BaseNextEditModelProvider.prototype.createOutcomeFromDiffGroup = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var diffGroup, helper, startTime, llm, completionId, isCurrentCursorGroup, promptMetadata, ide, profileType, groupContent, originalContent, cursorPos, finalCursorPos, outcomeNext;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        diffGroup = params.diffGroup, helper = params.helper, startTime = params.startTime, llm = params.llm, completionId = params.completionId, isCurrentCursorGroup = params.isCurrentCursorGroup, promptMetadata = params.promptMetadata, ide = params.ide, profileType = params.profileType;
                        groupContent = diffGroup.lines
                            .filter(function (l) { return l.type !== "old"; })
                            .map(function (l) { return l.line; })
                            .join("\n");
                        originalContent = diffGroup.lines
                            .filter(function (l) { return l.type !== "new"; })
                            .map(function (l) { return l.line; })
                            .join("\n");
                        cursorPos = isCurrentCursorGroup
                            ? helper.pos
                            : { line: diffGroup.startLine, character: 0 };
                        finalCursorPos = (0, diff_js_1.calculateFinalCursorPosition)(cursorPos, diffGroup.startLine, originalContent, groupContent);
                        return [4 /*yield*/, this.createNextEditOutcome({
                                helper: helper,
                                startTime: startTime,
                                llm: llm,
                                promptContent: promptMetadata.prompt.content,
                                completion: groupContent,
                                finalCursorPosition: finalCursorPos,
                                editableRegionStartLine: diffGroup.startLine,
                                editableRegionEndLine: diffGroup.endLine,
                                userEdits: promptMetadata.userEdits,
                                userExcerpts: promptMetadata.userExcerpts,
                                originalEditableRange: originalContent,
                                cursorPosition: cursorPos,
                                completionId: completionId,
                                diffLines: diffGroup.lines,
                                ide: ide,
                                profileType: profileType,
                            })];
                    case 1:
                        outcomeNext = _a.sent();
                        return [2 /*return*/, outcomeNext];
                }
            });
        });
    };
    BaseNextEditModelProvider.prototype.createNextEditOutcome = function (outcomeCtx) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            var _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _a = { elapsed: Date.now() - outcomeCtx.startTime, modelProvider: outcomeCtx.llm.underlyingProviderName, modelName: outcomeCtx.llm.model, completionOptions: null, completionId: outcomeCtx.completionId || outcomeCtx.helper.input.completionId };
                        return [4 /*yield*/, outcomeCtx.ide.getRepoName(outcomeCtx.helper.filepath)];
                    case 1:
                        _a.gitRepo = _f.sent();
                        return [4 /*yield*/, outcomeCtx.ide.getUniqueId()];
                    case 2: return [2 /*return*/, __assign.apply(void 0, [(_a.uniqueId = _f.sent(), _a.requestId = outcomeCtx.llm.lastRequestId, _a.timestamp = Date.now(), _a.fileUri = outcomeCtx.helper.filepath, _a.workspaceDirUri = (_b = outcomeCtx.helper.workspaceUris[0]) !== null && _b !== void 0 ? _b : path.dirname(outcomeCtx.helper.filepath), _a.prompt = outcomeCtx.promptContent, _a.userEdits = (_c = outcomeCtx.userEdits) !== null && _c !== void 0 ? _c : "", _a.userExcerpts = (_d = outcomeCtx.userExcerpts) !== null && _d !== void 0 ? _d : "", _a.originalEditableRange = (_e = outcomeCtx.originalEditableRange) !== null && _e !== void 0 ? _e : "", _a.completion = outcomeCtx.completion, _a.cursorPosition = outcomeCtx.cursorPosition || outcomeCtx.helper.pos, _a.finalCursorPosition = outcomeCtx.finalCursorPosition, _a.editableRegionStartLine = outcomeCtx.editableRegionStartLine, _a.editableRegionEndLine = outcomeCtx.editableRegionEndLine, _a.diffLines = outcomeCtx.diffLines, _a.profileType = outcomeCtx.profileType, _a), outcomeCtx.helper.options])];
                }
            });
        });
    };
    // Shared utility for calculating editable regions.
    BaseNextEditModelProvider.prototype.calculateOptimalEditableRegion = function (helper, maxTokens, heuristic) {
        if (maxTokens === void 0) { maxTokens = 512; }
        if (heuristic === void 0) { heuristic = "tokenizer"; }
        var cursorLine = helper.pos.line;
        var fileLines = helper.fileLines;
        var editableRegionStartLine = cursorLine;
        var editableRegionEndLine = cursorLine;
        var currentContent = fileLines[cursorLine];
        var totalTokens = heuristic === "tokenizer"
            ? (0, countTokens_js_1.countTokens)(currentContent, helper.modelName)
            : Math.ceil(currentContent.length / 4);
        var addingAbove = true;
        while (totalTokens < maxTokens) {
            var addedLine = false;
            if (addingAbove) {
                if (editableRegionStartLine > 0) {
                    editableRegionStartLine--;
                    var lineContent = fileLines[editableRegionStartLine];
                    var lineTokens = heuristic === "tokenizer"
                        ? (0, countTokens_js_1.countTokens)(lineContent, helper.modelName)
                        : Math.ceil(lineContent.length / 4);
                    totalTokens += lineTokens;
                    addedLine = true;
                }
            }
            else {
                if (editableRegionEndLine < fileLines.length - 1) {
                    editableRegionEndLine++;
                    var lineContent = fileLines[editableRegionEndLine];
                    var lineTokens = heuristic === "tokenizer"
                        ? (0, countTokens_js_1.countTokens)(lineContent, helper.modelName)
                        : Math.ceil(lineContent.length / 4);
                    totalTokens += lineTokens;
                    addedLine = true;
                }
            }
            if (!addedLine) {
                if (editableRegionStartLine === 0 &&
                    editableRegionEndLine === fileLines.length - 1) {
                    break;
                }
                addingAbove = !addingAbove;
                continue;
            }
            if (totalTokens > maxTokens) {
                if (addingAbove) {
                    editableRegionStartLine++;
                }
                else {
                    editableRegionEndLine--;
                }
                break;
            }
            addingAbove = !addingAbove;
        }
        return {
            editableRegionStartLine: editableRegionStartLine,
            editableRegionEndLine: editableRegionEndLine,
        };
    };
    // Optional methods with defaults.
    BaseNextEditModelProvider.prototype.shouldInjectUniqueToken = function () {
        return false;
    };
    BaseNextEditModelProvider.prototype.getUniqueToken = function () {
        return null;
    };
    return BaseNextEditModelProvider;
}());
exports.BaseNextEditModelProvider = BaseNextEditModelProvider;
