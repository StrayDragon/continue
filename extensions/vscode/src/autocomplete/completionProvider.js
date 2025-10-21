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
exports.ContinueCompletionProvider = void 0;
var CompletionProvider_1 = require("core/autocomplete/CompletionProvider");
var processSingleLineCompletion_1 = require("core/autocomplete/util/processSingleLineCompletion");
var URI = require("uri-js");
var uuid_1 = require("uuid");
var vscode = require("vscode");
var errorHandling_1 = require("../util/errorHandling");
var diff_1 = require("core/nextEdit/diff/diff");
var NextEditLoggingService_1 = require("core/nextEdit/NextEditLoggingService");
var NextEditPrefetchQueue_1 = require("core/nextEdit/NextEditPrefetchQueue");
var NextEditProvider_1 = require("core/nextEdit/NextEditProvider");
var JumpManager_1 = require("../activation/JumpManager");
var NextEditWindowManager_1 = require("../activation/NextEditWindowManager");
var GhostTextAcceptanceTracker_1 = require("./GhostTextAcceptanceTracker");
var lsp_1 = require("./lsp");
var recentlyEdited_1 = require("./recentlyEdited");
var RecentlyVisitedRangesService_1 = require("./RecentlyVisitedRangesService");
var statusBar_1 = require("./statusBar");
var ContinueCompletionProvider = /** @class */ (function () {
    function ContinueCompletionProvider(configHandler, ide, webviewProtocol, usingFullFileDiff) {
        this.configHandler = configHandler;
        this.ide = ide;
        this.webviewProtocol = webviewProtocol;
        this.isNextEditActive = false;
        this.usingFullFileDiff = true;
        this.usingFullFileDiff = usingFullFileDiff;
        this.recentlyEditedTracker = new recentlyEdited_1.RecentlyEditedTracker(ide.ideUtils);
        function getAutocompleteModel() {
            return __awaiter(this, void 0, void 0, function () {
                var config;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, configHandler.loadConfig()];
                        case 1:
                            config = (_b.sent()).config;
                            if (!config) {
                                return [2 /*return*/];
                            }
                            return [2 /*return*/, (_a = config.selectedModelByRole.autocomplete) !== null && _a !== void 0 ? _a : undefined];
                    }
                });
            });
        }
        this.completionProvider = new CompletionProvider_1.CompletionProvider(this.configHandler, this.ide, getAutocompleteModel, this.onError.bind(this), lsp_1.getDefinitionsFromLsp);
        // Logging service must be created first.
        this.nextEditLoggingService = NextEditLoggingService_1.NextEditLoggingService.getInstance();
        this.nextEditProvider = NextEditProvider_1.NextEditProvider.initialize(this.configHandler, this.ide, getAutocompleteModel, this.onError.bind(this), lsp_1.getDefinitionsFromLsp, "fineTuned");
        this.jumpManager = JumpManager_1.JumpManager.getInstance();
        this.prefetchQueue = NextEditPrefetchQueue_1.PrefetchQueue.getInstance();
        this.prefetchQueue.initialize(this.usingFullFileDiff);
        this.recentlyVisitedRanges = new RecentlyVisitedRangesService_1.RecentlyVisitedRangesService(ide);
    }
    ContinueCompletionProvider.prototype.onError = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, errorHandling_1.handleLLMError)(e)];
                    case 1:
                        if (_a.sent()) {
                            return [2 /*return*/];
                        }
                        message = "Continue Autocomplete Error";
                        if (e instanceof Error) {
                            message += ": ".concat(e.message);
                        }
                        vscode.window.showErrorMessage(message, "Documentation").then(function (val) {
                            if (val === "Documentation") {
                                vscode.env.openExternal(vscode.Uri.parse("https://docs.continue.dev/features/tab-autocomplete"));
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    ContinueCompletionProvider.prototype.activateNextEdit = function () {
        this.isNextEditActive = true;
    };
    ContinueCompletionProvider.prototype.deactivateNextEdit = function () {
        this.isNextEditActive = false;
    };
    ContinueCompletionProvider.prototype.getRerankModel = function () {
        return __awaiter(this, void 0, void 0, function () {
            var config;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.configHandler.loadConfig()];
                    case 1:
                        config = (_b.sent()).config;
                        if (!config) {
                            return [2 /*return*/];
                        }
                        return [2 /*return*/, (_a = config.selectedModelByRole.rerank) !== null && _a !== void 0 ? _a : undefined];
                }
            });
        });
    };
    /**
     * Updates this class and the prefetch queue's usingFullFileDiff flag.
     * @param usingFullFileDiff New value to set.
     */
    ContinueCompletionProvider.prototype.updateUsingFullFileDiff = function (usingFullFileDiff) {
        this.usingFullFileDiff = usingFullFileDiff;
        this.prefetchQueue.initialize(this.usingFullFileDiff);
    };
    /**
     * This is the entry point to the autocomplete and next edit logic.
     * @param document The text document containing the current cursor position.
     * @param position The current cursor position.
     * @param context Contextual information about the inline completion request.
     */
    ContinueCompletionProvider.prototype.provideInlineCompletionItems = function (document, position, context, token) {
        return __awaiter(this, void 0, ProviderResult, function () {
            var enableTabAutocomplete, editor, selectedCompletionInfo, text, range, typedText, typedLength, injectDetails, currCursorPos, abortController_1, signal, completionId_1, pos, manuallyPassFileContents, notebook, cells, _i, cells_1, cell, manuallyPassPrefix, wasManuallyTriggered, filepath, recentlyVisitedRanges, recentlyEditedRanges, ctx, outcome, isJumping, chainExists, processedCount, unprocessedCount, resetChainInFullFileDiff, savedCompletion, _a, _b, _c, isJumpSuggested, nextItemInQueue, _d, _e, _f, nextLocation, jumpPosition, input, willDisplay, startPos, range, completionText, isSingleLineCompletion, lastLineOfCompletionText, currentText, result, autocompleteCompletionItem, newEditRangeSlice, editableRegionStartLine, editableRegionEndLine, oldEditRangeSlice, relativeCursorPos, _g, isFim, fimText, nextEditCompletionItem, diffLines;
            var _h, _j;
            var _this = this;
            var _k, _l;
            return __generator(this, function (_m) {
                switch (_m.label) {
                    case 0:
                        enableTabAutocomplete = (0, statusBar_1.getStatusBarStatus)() === statusBar_1.StatusBarStatus.Enabled;
                        if (token.isCancellationRequested || !enableTabAutocomplete) {
                            return [2 /*return*/, null];
                        }
                        if (document.uri.scheme === "vscode-scm") {
                            return [2 /*return*/, null];
                        }
                        editor = vscode.window.activeTextEditor;
                        if (!editor) {
                            return [2 /*return*/, undefined];
                        }
                        // Don't autocomplete with multi-cursor
                        if (editor && editor.selections.length > 1) {
                            return [2 /*return*/, null];
                        }
                        selectedCompletionInfo = context.selectedCompletionInfo;
                        // This code checks if there is a selected completion suggestion in the given context and ensures that it is valid
                        // To improve the accuracy of suggestions it checks if the user has typed at least 4 characters
                        // This helps refine and filter out irrelevant autocomplete options
                        if (selectedCompletionInfo) {
                            text = selectedCompletionInfo.text, range = selectedCompletionInfo.range;
                            typedText = document.getText(range);
                            typedLength = range.end.character - range.start.character;
                            if (typedLength < 4) {
                                return [2 /*return*/, null];
                            }
                            if (!text.startsWith(typedText)) {
                                return [2 /*return*/, null];
                            }
                        }
                        injectDetails = undefined;
                        currCursorPos = editor.selection.active;
                        _m.label = 1;
                    case 1:
                        _m.trys.push([1, , 21, 22]);
                        abortController_1 = new AbortController();
                        signal = abortController_1.signal;
                        completionId_1 = (0, uuid_1.v4)();
                        if (this.isNextEditActive) {
                            this.nextEditLoggingService.trackPendingCompletion(completionId_1);
                        }
                        token.onCancellationRequested(function () {
                            abortController_1.abort();
                            if (_this.isNextEditActive) {
                                _this.nextEditLoggingService.handleAbort(completionId_1);
                            }
                        });
                        pos = {
                            line: position.line,
                            character: position.character,
                        };
                        manuallyPassFileContents = undefined;
                        if (document.uri.scheme === "vscode-notebook-cell") {
                            notebook = vscode.workspace.notebookDocuments.find(function (notebook) {
                                return notebook
                                    .getCells()
                                    .some(function (cell) {
                                    return URI.equal(cell.document.uri.toString(), document.uri.toString());
                                });
                            });
                            if (notebook) {
                                cells = notebook.getCells();
                                manuallyPassFileContents = cells
                                    .map(function (cell) {
                                    var text = cell.document.getText();
                                    if (cell.kind === vscode.NotebookCellKind.Markup) {
                                        return "\"\"\"".concat(text, "\"\"\"");
                                    }
                                    else {
                                        return text;
                                    }
                                })
                                    .join("\n\n");
                                for (_i = 0, cells_1 = cells; _i < cells_1.length; _i++) {
                                    cell = cells_1[_i];
                                    if (URI.equal(cell.document.uri.toString(), document.uri.toString())) {
                                        break;
                                    }
                                    else {
                                        pos.line += cell.document.getText().split("\n").length + 1;
                                    }
                                }
                            }
                        }
                        // Manually pass file contents for unsaved, untitled files
                        if (document.isUntitled) {
                            manuallyPassFileContents = document.getText();
                        }
                        manuallyPassPrefix = undefined;
                        wasManuallyTriggered = context.triggerKind === vscode.InlineCompletionTriggerKind.Invoke;
                        filepath = document.uri.toString();
                        recentlyVisitedRanges = this.recentlyVisitedRanges.getSnippets();
                        return [4 /*yield*/, this.recentlyEditedTracker.getRecentlyEditedRanges()];
                    case 2:
                        recentlyEditedRanges = _m.sent();
                        ctx = {
                            completionId: completionId_1,
                            manuallyPassFileContents: manuallyPassFileContents,
                            manuallyPassPrefix: manuallyPassPrefix,
                            selectedCompletionInfo: selectedCompletionInfo,
                            isUntitledFile: document.isUntitled,
                            recentlyVisitedRanges: recentlyVisitedRanges,
                            recentlyEditedRanges: recentlyEditedRanges,
                        };
                        outcome = void 0;
                        isJumping = this.jumpManager.isJumpInProgress();
                        chainExists = this.nextEditProvider.chainExists();
                        processedCount = this.prefetchQueue.processedCount;
                        unprocessedCount = this.prefetchQueue.unprocessedCount;
                        console.debug("isJumping:", isJumping, "/ chainExists:", chainExists);
                        this.prefetchQueue.peekThreeProcessed();
                        resetChainInFullFileDiff = false;
                        if (!(chainExists &&
                            this.usingFullFileDiff &&
                            processedCount === 0 &&
                            unprocessedCount === 0)) return [3 /*break*/, 4];
                        // Skipping jump logic due to empty queues while using full file diff
                        return [4 /*yield*/, this.nextEditProvider.deleteChain()];
                    case 3:
                        // Skipping jump logic due to empty queues while using full file diff
                        _m.sent();
                        chainExists = false;
                        resetChainInFullFileDiff = true;
                        _m.label = 4;
                    case 4:
                        if (!(isJumping && chainExists)) return [3 /*break*/, 8];
                        // Case 2: Jumping (chain exists, jump was taken)
                        console.debug("trigger reason: jumping");
                        // Reset jump state.
                        this.jumpManager.setJumpInProgress(false);
                        savedCompletion = this.jumpManager.completionAfterJump;
                        if (!savedCompletion) return [3 /*break*/, 5];
                        outcome = savedCompletion.outcome;
                        this.jumpManager.clearCompletionAfterJump();
                        return [3 /*break*/, 7];
                    case 5:
                        // Fall back to prefetch queue. This technically should not happen.
                        console.error("Fell back to prefetch queue even after jump was taken");
                        outcome = (_k = this.prefetchQueue.dequeueProcessed()) === null || _k === void 0 ? void 0 : _k.outcome;
                        if (!!this.usingFullFileDiff) return [3 /*break*/, 7];
                        _b = (_a = this.prefetchQueue).process;
                        _c = [__assign({}, ctx)];
                        _h = { recentlyVisitedRanges: this.recentlyVisitedRanges.getSnippets() };
                        return [4 /*yield*/, this.recentlyEditedTracker.getRecentlyEditedRanges()];
                    case 6:
                        _b.apply(_a, [__assign.apply(void 0, _c.concat([(_h.recentlyEditedRanges = _m.sent(), _h)]))]);
                        _m.label = 7;
                    case 7: return [3 /*break*/, 18];
                    case 8:
                        if (!chainExists) return [3 /*break*/, 14];
                        // Case 3: Accepting next edit outcome (chain exists, jump is not taken).
                        console.debug("trigger reason: accepting");
                        isJumpSuggested = false;
                        _m.label = 9;
                    case 9:
                        if (!(this.prefetchQueue.processedCount > 0 && !isJumpSuggested)) return [3 /*break*/, 13];
                        nextItemInQueue = this.prefetchQueue.dequeueProcessed();
                        if (!nextItemInQueue)
                            return [3 /*break*/, 9];
                        if (!!this.usingFullFileDiff) return [3 /*break*/, 11];
                        _e = (_d = this.prefetchQueue).process;
                        _f = [__assign({}, ctx)];
                        _j = { recentlyVisitedRanges: this.recentlyVisitedRanges.getSnippets() };
                        return [4 /*yield*/, this.recentlyEditedTracker.getRecentlyEditedRanges()];
                    case 10:
                        _e.apply(_d, [__assign.apply(void 0, _f.concat([(_j.recentlyEditedRanges = _m.sent(), _j)]))]);
                        _m.label = 11;
                    case 11:
                        nextLocation = nextItemInQueue.location;
                        outcome = nextItemInQueue.outcome;
                        jumpPosition = new vscode.Position(nextLocation.range.start.line, nextLocation.range.start.character);
                        return [4 /*yield*/, this.jumpManager.suggestJump(currCursorPos, jumpPosition, outcome.completion)];
                    case 12:
                        isJumpSuggested = _m.sent();
                        if (isJumpSuggested) {
                            // Store completion to be rendered after a jump.
                            this.jumpManager.setCompletionAfterJump({
                                completionId: completionId_1,
                                outcome: outcome,
                                currentPosition: jumpPosition,
                            });
                            // Don't display anything yet. This will be handled in Case 2.
                            // Recall from above that provideInlineCompletions runs on every cursor movement.
                            return [2 /*return*/, undefined];
                        }
                        return [3 /*break*/, 9];
                    case 13:
                        if (!isJumpSuggested) {
                            console.debug("No suitable jump location found after trying all positions");
                            this.nextEditProvider.deleteChain();
                            return [2 /*return*/, undefined];
                        }
                        return [3 /*break*/, 18];
                    case 14:
                        // Case 1: Typing (chain does not exist).
                        // if resetChainInFullFileDiff is true then we are Rebuilding next edit chain after clearing empty queues in full file diff mode
                        this.nextEditProvider.startChain();
                        input = __assign({ pos: pos, filepath: filepath }, ctx);
                        (0, statusBar_1.setupStatusBar)(undefined, true);
                        if (!this.isNextEditActive) return [3 /*break*/, 16];
                        return [4 /*yield*/, this.nextEditProvider.provideInlineCompletionItems(input, signal, { withChain: false, usingFullFileDiff: this.usingFullFileDiff })];
                    case 15:
                        outcome = _m.sent();
                        if (resetChainInFullFileDiff &&
                            (!outcome ||
                                (!outcome.completion && outcome.diffLines.length === 0))) {
                            // No next edit outcome after resetting chain; returning null
                            return [2 /*return*/, null];
                        }
                        // Start prefetching next edits if not using full file diff.
                        // NOTE: this is better off not awaited. fire and forget.
                        if (!this.usingFullFileDiff) {
                            this.prefetchQueue.process(ctx);
                        }
                        // If initial outcome is null, suggest a jump instead.
                        // Calling this method again will call it with chain active but jump not suggested yet.
                        if (!outcome ||
                            (!outcome.completion && outcome.diffLines.length === 0)) {
                            return [2 /*return*/, this.provideInlineCompletionItems(document, position, context, token)];
                        }
                        return [3 /*break*/, 18];
                    case 16: return [4 /*yield*/, this.completionProvider.provideInlineCompletionItems(input, signal, wasManuallyTriggered)];
                    case 17:
                        // Handle regular autocomplete request.
                        outcome = _m.sent();
                        _m.label = 18;
                    case 18:
                        // Return early if no valid outcome was found.
                        if (!outcome ||
                            (!this.isNextEditActive &&
                                !outcome.completion) ||
                            (this.isNextEditActive &&
                                !outcome.completion &&
                                outcome.diffLines.length === 0)) {
                            return [2 /*return*/, null];
                        }
                        // VS Code displays dependent on selectedCompletionInfo (their docstring below)
                        // We should first always make sure we have a valid completion, but if it goes wrong we
                        // want telemetry to be correct
                        /**
                         * Provides information about the currently selected item in the autocomplete widget if it is visible.
                         *
                         * If set, provided inline completions must extend the text of the selected item
                         * and use the same range, otherwise they are not shown as preview.
                         * As an example, if the document text is `console.` and the selected item is `.log` replacing the `.` in the document,
                         * the inline completion must also replace `.` and start with `.log`, for example `.log()`.
                         *
                         * Inline completion providers are requested again whenever the selected item changes.
                         */
                        if (selectedCompletionInfo) {
                            outcome.completion = selectedCompletionInfo.text + outcome.completion;
                        }
                        willDisplay = this.willDisplay(document, selectedCompletionInfo, signal, outcome);
                        if (!willDisplay) {
                            return [2 /*return*/, null];
                        }
                        // Marking the outcome as displayed saves the current outcome as a value of the key completionId.
                        // NOTE: It seems like autocomplete relies on this to be considered accepted.
                        if (this.isNextEditActive) {
                            this.nextEditProvider.markDisplayed(completionId_1, outcome);
                        }
                        else {
                            this.completionProvider.markDisplayed(completionId_1, outcome);
                        }
                        this._lastShownCompletion = outcome;
                        startPos = (_l = selectedCompletionInfo === null || selectedCompletionInfo === void 0 ? void 0 : selectedCompletionInfo.range.start) !== null && _l !== void 0 ? _l : position;
                        range = new vscode.Range(startPos, startPos);
                        completionText = outcome.completion;
                        isSingleLineCompletion = outcome.completion.split("\n").length <= 1;
                        if (isSingleLineCompletion) {
                            lastLineOfCompletionText = completionText.split("\n").pop() || "";
                            currentText = document
                                .lineAt(startPos)
                                .text.substring(startPos.character);
                            result = (0, processSingleLineCompletion_1.processSingleLineCompletion)(lastLineOfCompletionText, currentText, startPos.character);
                            if (result === undefined) {
                                return [2 /*return*/, undefined];
                            }
                            completionText = result.completionText;
                            if (result.range) {
                                range = new vscode.Range(new vscode.Position(startPos.line, result.range.start), new vscode.Position(startPos.line, result.range.end));
                            }
                        }
                        else {
                            // Extend the range to the end of the line for multiline completions
                            range = new vscode.Range(startPos, document.lineAt(startPos).range.end);
                        }
                        autocompleteCompletionItem = new vscode.InlineCompletionItem(completionText, range, {
                            title: "Log Autocomplete Outcome",
                            command: "continue.logAutocompleteOutcome",
                            arguments: [completionId_1, this.completionProvider],
                        });
                        autocompleteCompletionItem.completeBracketPairs = true;
                        // Handle autocomplete request.
                        if (!this.isNextEditActive) {
                            return [2 /*return*/, [autocompleteCompletionItem]];
                        }
                        newEditRangeSlice = completionText;
                        editableRegionStartLine = outcome
                            .editableRegionStartLine;
                        editableRegionEndLine = outcome
                            .editableRegionEndLine;
                        oldEditRangeSlice = editor.document
                            .getText()
                            .split("\n")
                            .slice(editableRegionStartLine, editableRegionEndLine + 1)
                            .join("\n");
                        // We don't need to show the next edit window if the predicted edits are identical to the previous version.
                        if (oldEditRangeSlice === newEditRangeSlice) {
                            this.nextEditLoggingService.cancelRejectionTimeout(completionId_1);
                            return [2 /*return*/, undefined];
                        }
                        relativeCursorPos = {
                            line: currCursorPos.line - editableRegionStartLine,
                            character: currCursorPos.character,
                        };
                        _g = (0, diff_1.checkFim)(oldEditRangeSlice, newEditRangeSlice, relativeCursorPos), isFim = _g.isFim, fimText = _g.fimText;
                        if (isFim) {
                            if (!fimText) {
                                console.debug("deleteChain from completionProvider.ts: !fimText");
                                this.nextEditProvider.deleteChain();
                                return [2 /*return*/, undefined];
                            }
                            // Track this ghost text for acceptance detection.
                            // Ghost text acceptance can *technically* be acted upon in the command handler for "continue.logNextEditOutcomeAccept".
                            // However, there is a substantial delay between accepting and logging, which introduces a lot of race conditions with different event handlers.
                            // Plus, separating these concerns seems to make sense logically as well.
                            GhostTextAcceptanceTracker_1.GhostTextAcceptanceTracker.getInstance().setExpectedGhostTextAcceptance(document, fimText, new vscode.Position(currCursorPos.line, currCursorPos.character));
                            nextEditCompletionItem = new vscode.InlineCompletionItem(fimText, new vscode.Range(new vscode.Position(currCursorPos.line, currCursorPos.character), new vscode.Position(currCursorPos.line, currCursorPos.character)), {
                                title: "Log Next Edit Outcome",
                                command: "continue.logNextEditOutcomeAccept",
                                arguments: [completionId_1, this.nextEditLoggingService],
                            });
                            return [2 /*return*/, [nextEditCompletionItem]];
                        }
                        diffLines = outcome.diffLines;
                        if (diffLines.length === 0) {
                            // At this point, there is no way that diffLines.length === 0.
                            // Only time we ever reach this point would be after the jump was taken, or if its after the very first repsonse.
                            // In case of jump, this is impossible, as the JumpManager wouldn't have suggested a jump here in the first place.
                            // In case of initial response, we suggested a jump.
                            console.debug("deleteChain from completionProvider.ts: diffLines.length === 0");
                            NextEditProvider_1.NextEditProvider.getInstance().deleteChain();
                        }
                        if (!NextEditWindowManager_1.NextEditWindowManager.isInstantiated()) return [3 /*break*/, 20];
                        NextEditWindowManager_1.NextEditWindowManager.getInstance().updateCurrentCompletionId(completionId_1);
                        return [4 /*yield*/, NextEditWindowManager_1.NextEditWindowManager.getInstance().showNextEditWindow(editor, currCursorPos, editableRegionStartLine, editableRegionEndLine, oldEditRangeSlice, newEditRangeSlice, diffLines)];
                    case 19:
                        _m.sent();
                        _m.label = 20;
                    case 20: return [2 /*return*/, undefined];
                    case 21:
                        (0, statusBar_1.stopStatusBarLoading)();
                        return [7 /*endfinally*/];
                    case 22: return [2 /*return*/];
                }
            });
        });
    };
    ContinueCompletionProvider.prototype.willDisplay = function (document, selectedCompletionInfo, abortSignal, outcome) {
        if (selectedCompletionInfo) {
            var text = selectedCompletionInfo.text, range = selectedCompletionInfo.range;
            if (!outcome.completion.startsWith(text)) {
                console.debug("Won't display completion because text doesn't match: ".concat(text, ", ").concat(outcome.completion), range);
                return false;
            }
        }
        if (abortSignal.aborted) {
            return false;
        }
        return true;
    };
    return ContinueCompletionProvider;
}());
exports.ContinueCompletionProvider = ContinueCompletionProvider;
