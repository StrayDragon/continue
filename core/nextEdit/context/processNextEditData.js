"use strict";
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
exports.processNextEditData = void 0;
var log_1 = require("../../data/log");
var NextEditProvider_1 = require("../NextEditProvider");
var autocompleteContextFetching_1 = require("./autocompleteContextFetching");
var diffFormatting_1 = require("./diffFormatting");
var prevEditLruCache_1 = require("./prevEditLruCache");
var randomNumberBetween = function (min, max) {
    min = Math.ceil(min); // Ensure min is an integer
    max = Math.floor(max); // Ensure max is an integer
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
var processNextEditData = function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var modelName, modelProvider, maxPromptTokens, autocompleteContext, filenamesAndDiffs, timestamp, prevEdits, thisEdit;
    var filePath = _b.filePath, beforeContent = _b.beforeContent, afterContent = _b.afterContent, cursorPosBeforeEdit = _b.cursorPosBeforeEdit, cursorPosAfterPrevEdit = _b.cursorPosAfterPrevEdit, ide = _b.ide, configHandler = _b.configHandler, getDefinitionsFromLsp = _b.getDefinitionsFromLsp, recentlyEditedRanges = _b.recentlyEditedRanges, recentlyVisitedRanges = _b.recentlyVisitedRanges, workspaceDir = _b.workspaceDir, modelNameOrInstance = _b.modelNameOrInstance;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                modelName = "Codestral";
                modelProvider = "mistral";
                maxPromptTokens = randomNumberBetween(500, 12000);
                return [4 /*yield*/, (0, autocompleteContextFetching_1.getAutocompleteContext)(filePath, cursorPosBeforeEdit, ide, configHandler, getDefinitionsFromLsp, recentlyEditedRanges, recentlyVisitedRanges, maxPromptTokens, beforeContent, modelName)];
            case 1:
                autocompleteContext = _c.sent();
                NextEditProvider_1.NextEditProvider.getInstance().addAutocompleteContext(autocompleteContext);
                filenamesAndDiffs = [];
                timestamp = Date.now();
                prevEdits = (0, prevEditLruCache_1.getPrevEditsDescending)();
                if (prevEdits.length > 0) {
                    // if last edit was 10+ minutes ago or the workspace changed, forget previous edits
                    if (timestamp - prevEdits[0].timestamp >= 1000 * 60 * 10 ||
                        workspaceDir !== prevEdits[0].workspaceUri) {
                        prevEditLruCache_1.prevEditLruCache.clear();
                        prevEdits = [];
                    }
                    // extract filenames and diffs for logging
                    filenamesAndDiffs = prevEdits.map(function (edit) {
                        return ({
                            // filename relative to workspace dir
                            filename: edit.fileUri
                                .replace(edit.workspaceUri, "")
                                .replace(/^[/\\]/, ""),
                            // diff without the first 4 lines (the file header)
                            diff: edit.unidiff.split("\n").slice(4).join("\n"),
                        });
                    });
                }
                if (filenamesAndDiffs.length > 0) {
                    // if there are previous edits, log
                    void log_1.DataLogger.getInstance().logDevData({
                        name: "nextEditWithHistory",
                        data: {
                            previousEdits: filenamesAndDiffs,
                            fileURI: filePath,
                            workspaceDirURI: workspaceDir,
                            beforeContent: beforeContent,
                            afterContent: afterContent,
                            beforeCursorPos: cursorPosBeforeEdit,
                            afterCursorPos: cursorPosAfterPrevEdit,
                            context: autocompleteContext,
                            modelProvider: modelProvider,
                            modelName: modelName,
                            modelTitle: modelName,
                        },
                    });
                }
                thisEdit = {
                    unidiff: (0, diffFormatting_1.createDiff)({
                        beforeContent: beforeContent,
                        afterContent: afterContent,
                        filePath: filePath,
                        diffType: diffFormatting_1.DiffFormatType.Unified,
                        contextLines: 25, // storing many context lines for downstream trimming
                        workspaceDir: workspaceDir,
                    }),
                    fileUri: filePath,
                    workspaceUri: workspaceDir,
                    timestamp: timestamp,
                };
                (0, prevEditLruCache_1.setPrevEdit)(thisEdit);
                return [2 /*return*/];
        }
    });
}); };
exports.processNextEditData = processNextEditData;
