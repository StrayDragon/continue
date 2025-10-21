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
exports.NextEditWindowManager = exports.ACCEPT_NEXT_EDIT_SUGGESTION_COMMAND = exports.HIDE_NEXT_EDIT_SUGGESTION_COMMAND = void 0;
exports.default = setupNextEditWindowManager;
/* eslint-disable @typescript-eslint/naming-convention */
var env_1 = require("core/control-plane/env");
// @ts-ignore
var vscode = require("vscode");
var CodeRenderer_1 = require("core/codeRenderer/CodeRenderer");
var myers_1 = require("core/diff/myers");
var diff_1 = require("core/nextEdit/diff/diff");
var NextEditLoggingService_1 = require("core/nextEdit/NextEditLoggingService");
var NextEditProvider_1 = require("core/nextEdit/NextEditProvider");
var getTheme_1 = require("../util/getTheme");
var SelectionChangeManager_1 = require("./SelectionChangeManager");
var SVG_CONFIG = {
    // stroke: "#999998",
    stroke: "#666667",
    strokeWidth: 1,
    textColor: "#999998",
    purple: "rgba(112, 114, 209)",
    blue: "rgba(107, 166, 205)",
    green: "rgba(136 194 163)",
    // filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.2))",
    // filter: "drop-shadow(0 2px 2px rgba(255,255,255,0.2))",
    // filter:
    //   "drop-shadow(0 2px 4px rgb(112, 114, 209)) drop-shadow(0 4px 8px rgb(136, 194, 163)) drop-shadow(0 6px 12px rgb(107, 166, 205));",
    // filter:
    //   "drop-shadow(0 3px 6px rgba(112, 114, 209, 0.4)) drop-shadow(0 3px 6px rgba(136, 194, 163, 0.4)) drop-shadow(0 3px 6px rgba(107, 166, 205, 0.4));",
    // filter: `drop-shadow(4px 4px 0px rgba(112, 114, 209, 0.4))
    //       drop-shadow(8px 8px 0px rgba(107, 166, 205, 0.3))
    //       drop-shadow(12px 12px 0px rgba(136, 194, 163, 0.2));`,
    // filter: `drop-shadow(4px 4px 0px rgba(112, 114, 209, 0.4))
    //       drop-shadow(-2px 4px 0px rgba(107, 166, 205, 0.3))
    //       drop-shadow(4px -2px 0px rgba(136, 194, 163, 0.2))
    //       drop-shadow(-2px -2px 0px rgba(112, 114, 209, 0.2));`,
    filter: "none",
    radius: 3,
    leftMargin: 40,
    defaultText: "",
    lineSpacing: 1.3, // Line spacing multiplier
    cursorOffset: 4, // Spaces to offset from cursor
    get fontSize() {
        var _a;
        return Math.ceil((_a = vscode.workspace.getConfiguration("editor").get("fontSize")) !== null && _a !== void 0 ? _a : 14);
    },
    get fontFamily() {
        return (vscode.workspace.getConfiguration("editor").get("fontFamily") ||
            "helvetica");
    },
    get paddingX() {
        return Math.ceil(this.getEstimatedTextWidth(" "));
    },
    get paddingY() {
        return Math.ceil(this.fontSize * 0.3);
    },
    get lineHeight() {
        return Math.ceil(this.fontSize * this.lineSpacing);
    },
    getEstimatedTextWidth: function (text) {
        return text.length * this.fontSize * 0.6;
    },
    getTipWidth: function (text) {
        // Find the longest line
        var lines = text.split("\n");
        var longestLine = lines.reduce(function (longest, line) { return (line.length > longest.length ? line : longest); }, "");
        return this.getEstimatedTextWidth(longestLine) + this.paddingX * 2;
    },
    getTipHeight: function (text) {
        // Count the number of lines
        var lineCount = text.split("\n").length;
        return this.lineHeight * lineCount + this.paddingY * 2;
    },
};
// Command ID - can be used in package.json
exports.HIDE_NEXT_EDIT_SUGGESTION_COMMAND = "continue.nextEditWindow.hideNextEditSuggestion";
exports.ACCEPT_NEXT_EDIT_SUGGESTION_COMMAND = "continue.nextEditWindow.acceptNextEditSuggestion";
/**
 * This is where we create SVG windows and deletion decorations for non-FIM next edit suggestions.
 * This class controls the decoration object lifetime.
 * The syntax highlighting and the actual building of SVG happens inside core/codeRenderer/CodeRenderer.ts.
 */
var NextEditWindowManager = /** @class */ (function () {
    function NextEditWindowManager() {
        var _a, _b;
        this.excludedURIPrefixes = ["output:", "vscode://inline-chat"];
        // Current active decoration
        this.currentDecoration = null;
        // A short-lived checker to determine if the cursor moved because of us accepting the next edit, or not.
        // Distinguishing the two is necessary to determine if we should log it as an accepted or rejected.
        this.accepted = false;
        // Track which editor has the active decoration
        this.activeEditor = null;
        // Store the current tooltip text for accepting
        this.currentTooltipText = null;
        this.mostRecentCompletionId = null;
        // Helps us skip redundant calculations. No need for cleanup because this always gets reassigned with new values at showNextEditWindow, and we don't reuse windows.
        this.editableRegionStartLine = 0;
        this.editableRegionEndLine = 0;
        // State tracking for key reservation.
        // By default it is set to free, and is only set to reserved when the transition is done.
        this.keyReservationState = "free";
        this.latestOperationId = 0;
        // Disposables
        this.disposables = [];
        this.textApplier = null;
        this.finalCursorPos = null;
        this.isLineDelete = false;
        this.context = null;
        this.theme = (0, getTheme_1.getThemeString)();
        console.debug("Next Edit Theme initialized:", this.theme
            ? "Theme exists: ".concat(JSON.stringify(this.theme))
            : "Theme is undefined");
        this.setupListeners();
        this.codeRenderer = CodeRenderer_1.CodeRenderer.getInstance();
        var editorConfig = vscode.workspace.getConfiguration("editor");
        this.fontSize = (_a = editorConfig.get("fontSize")) !== null && _a !== void 0 ? _a : 14;
        this.fontFamily = (_b = editorConfig.get("fontFamily")) !== null && _b !== void 0 ? _b : "monospace";
        this.loggingService = NextEditLoggingService_1.NextEditLoggingService.getInstance();
    }
    NextEditWindowManager.getInstance = function () {
        if (!NextEditWindowManager.instance) {
            NextEditWindowManager.instance = new NextEditWindowManager();
        }
        return NextEditWindowManager.instance;
    };
    NextEditWindowManager.isInstantiated = function () {
        return !!NextEditWindowManager.instance;
    };
    NextEditWindowManager.clearInstance = function () {
        if (NextEditWindowManager.instance) {
            NextEditWindowManager.instance.dispose();
            NextEditWindowManager.instance = undefined;
        }
    };
    // This is an implementation of last-action-wins.
    // For each action that fires setKeyReservation, it keeps its own operationId while incrementing latestOperationId.
    // When an action completes, checking for operationId === latestOperationId will determine which one came last.
    NextEditWindowManager.prototype.setKeyReservation = function (reserve) {
        return __awaiter(this, void 0, void 0, function () {
            var operationId, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operationId = ++this.latestOperationId;
                        // Return early when already in desired state.
                        if ((reserve && this.keyReservationState === "reserved") ||
                            (!reserve && this.keyReservationState === "free")) {
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.performKeyReservation(reserve)];
                    case 2:
                        _a.sent();
                        // Only update state if we're still the latest operation.
                        if (operationId === this.latestOperationId) {
                            this.keyReservationState = reserve ? "reserved" : "free";
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        console.error("Failed to set nextEditWindowActive to ".concat(reserve, ": ").concat(err_1));
                        // Only reset to free if we're still the latest operation.
                        if (operationId === this.latestOperationId) {
                            this.keyReservationState = "free";
                        }
                        throw err_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    NextEditWindowManager.prototype.resetKeyReservation = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Reset internal tracking.
                        this.keyReservationState = "free";
                        this.latestOperationId = 0;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.performKeyReservation(false)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _a.sent();
                        console.error("Failed to reset nextEditWindowActive context: ".concat(err_2));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    NextEditWindowManager.prototype.performKeyReservation = function (reserve) {
        return __awaiter(this, void 0, void 0, function () {
            var err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, vscode.commands.executeCommand("setContext", "nextEditWindowActive", reserve)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_3 = _a.sent();
                        console.error("Failed to set nextEditWindowActive to ".concat(reserve, ": ").concat(err_3));
                        throw err_3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    NextEditWindowManager.reserveTabAndEsc = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, NextEditWindowManager.getInstance().setKeyReservation(true)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NextEditWindowManager.freeTabAndEsc = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, NextEditWindowManager.getInstance().setKeyReservation(false)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * An async setup function to help us initialize the NextEditWindowManager.
     * This is necessary because we need some setup to be done asynchronously,
     * and constructors in TypeScript cannot be async.
     * Plus, it's generally not recommended to pass arguments to getInstance() of a singleton.
     * @param context The extension context.
     * @param textApplier Callback that lets us use external deps such as llms if needed.
     */
    NextEditWindowManager.prototype.setupNextEditWindowManager = function (context, textApplier) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.context = context;
                        // Set nextEditWindowActive to false to free esc and tab,
                        // letting them return to their original behaviors.
                        return [4 /*yield*/, this.resetKeyReservation()];
                    case 1:
                        // Set nextEditWindowActive to false to free esc and tab,
                        // letting them return to their original behaviors.
                        _a.sent();
                        // await NextEditWindowManager.freeTabAndEsc();
                        // Register HIDE_TOOLTIP_COMMAND and ACCEPT_NEXT_EDIT_COMMAND with their corresponding callbacks.
                        this.registerCommandSafely(exports.HIDE_NEXT_EDIT_SUGGESTION_COMMAND, function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        console.debug("deleteChain from NextEditWindowManager.ts: hide next edit command");
                                        NextEditProvider_1.NextEditProvider.getInstance().deleteChain();
                                        return [4 /*yield*/, this.hideAllNextEditWindowsAndResetCompletionId()];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        this.registerCommandSafely(exports.ACCEPT_NEXT_EDIT_SUGGESTION_COMMAND, function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.acceptNextEdit()];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); });
                        // Add this class to context disposables.
                        context.subscriptions.push(this);
                        if (textApplier) {
                            this.textApplier = textApplier;
                        }
                        return [4 /*yield*/, this.codeRenderer.setTheme(this.theme)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Update the most recent completion id.
     * @param completionId The id of current completion request.
     */
    NextEditWindowManager.prototype.updateCurrentCompletionId = function (completionId) {
        this.mostRecentCompletionId = completionId;
    };
    /**
     * Registers our two custom commands to the extension context.
     * @param commandId Custom commands to help set up next edit.
     * @param callback Function to run on command execution.
     */
    NextEditWindowManager.prototype.registerCommandSafely = function (commandId, callback) {
        if (!this.context) {
            console.log("Extension context is not yet set.");
            return;
        }
        try {
            var command = vscode.commands.registerCommand(commandId, callback);
            this.context.subscriptions.push(command);
        }
        catch (error) {
            console.log("Command ".concat(commandId, " already has an associated callback, skipping registration"));
        }
    };
    /**
     * Show a tooltip with the given text at the current cursor position.
     * @param editor The active text editor.
     * @param text Text to display in the tooltip.
     */
    NextEditWindowManager.prototype.showNextEditWindow = function (editor, currCursorPos, editableRegionStartLine, editableRegionEndLine, oldEditRangeSlice, newEditRangeSlice, diffLines) {
        return __awaiter(this, void 0, void 0, function () {
            var onlyDeletions, hasDeletedLine, line, oldLine, lineOffsetAtCursorPos, lineContentAtCursorPos, offset, prevLine, diffChars, error_1, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.shouldRenderTip(editor.document.uri)) {
                            return [2 /*return*/];
                        }
                        // Clear any existing decorations first (very important to prevent overlapping).
                        return [4 /*yield*/, this.hideAllNextEditWindows()];
                    case 1:
                        // Clear any existing decorations first (very important to prevent overlapping).
                        _a.sent();
                        this.activeEditor = editor;
                        this.editableRegionStartLine = editableRegionStartLine;
                        this.editableRegionEndLine = editableRegionEndLine;
                        // Store the current tooltip text for accepting later.
                        this.currentTooltipText = newEditRangeSlice;
                        // Determine if this is a line deletion case
                        // NOTE: A simpler approach might be to just delete the line when newEditRangeSlice is "".
                        // But we opt for the below in case the above note is too naive.
                        this.isLineDelete = false;
                        if (newEditRangeSlice === "" &&
                            editableRegionStartLine === editableRegionEndLine) {
                            onlyDeletions = diffLines.every(function (diff) { return diff.type === "old" || diff.type === "same"; });
                            hasDeletedLine = diffLines.some(function (diff) { return diff.type === "old"; });
                            if (onlyDeletions && hasDeletedLine) {
                                line = editor.document.lineAt(editableRegionStartLine).text;
                                oldLine = oldEditRangeSlice.trim();
                                if (line.trim() === oldLine || line.trim() === "") {
                                    this.isLineDelete = true;
                                }
                            }
                        }
                        lineOffsetAtCursorPos = currCursorPos.line - this.editableRegionStartLine;
                        lineContentAtCursorPos = newEditRangeSlice.split("\n")[lineOffsetAtCursorPos];
                        offset = (0, diff_1.getOffsetPositionAtLastNewLine)(diffLines, lineContentAtCursorPos, lineOffsetAtCursorPos);
                        // Calculate the final cursor position.
                        if (this.isLineDelete) {
                            // For line deletion, position cursor at the end of the previous line.
                            if (this.editableRegionStartLine > 0) {
                                prevLine = editor.document.lineAt(this.editableRegionStartLine - 1);
                                this.finalCursorPos = new vscode.Position(this.editableRegionStartLine - 1, prevLine.text.length);
                            }
                            else {
                                // If we're deleting the first line, position at the start of the document.
                                this.finalCursorPos = new vscode.Position(0, 0);
                            }
                        }
                        else {
                            // For normal edits, use the standard calculation.
                            this.finalCursorPos = new vscode.Position(this.editableRegionStartLine + offset.line, offset.character);
                        }
                        diffChars = (0, myers_1.myersCharDiff)(oldEditRangeSlice, newEditRangeSlice);
                        if (!(newEditRangeSlice !== "")) return [3 /*break*/, 6];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 6]);
                        return [4 /*yield*/, this.renderWindow(editor, currCursorPos, oldEditRangeSlice, newEditRangeSlice, this.editableRegionStartLine, diffLines, diffChars)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        error_1 = _a.sent();
                        console.error("Failed to render window:", error_1);
                        // Clean up and reset state.
                        return [4 /*yield*/, this.hideAllNextEditWindows()];
                    case 5:
                        // Clean up and reset state.
                        _a.sent();
                        return [2 /*return*/];
                    case 6:
                        this.renderDeletions(editor, diffChars);
                        _a.label = 7;
                    case 7:
                        _a.trys.push([7, 9, , 11]);
                        return [4 /*yield*/, NextEditWindowManager.reserveTabAndEsc()];
                    case 8:
                        _a.sent();
                        return [3 /*break*/, 11];
                    case 9:
                        err_4 = _a.sent();
                        console.error("Error reserving Tab/Esc after showing decorations: ".concat(err_4));
                        return [4 /*yield*/, this.hideAllNextEditWindows()];
                    case 10:
                        _a.sent();
                        return [2 /*return*/];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Hide all tooltips in all editors.
     */
    NextEditWindowManager.prototype.hideAllNextEditWindows = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_5;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, NextEditWindowManager.freeTabAndEsc()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_5 = _a.sent();
                        console.error("Error freeing Tab/Esc while hiding: ".concat(err_5));
                        return [3 /*break*/, 3];
                    case 3:
                        if (this.currentDecoration) {
                            vscode.window.visibleTextEditors.forEach(function (editor) {
                                editor.setDecorations(_this.currentDecoration, []);
                            });
                            // If we know which editor had the decoration, clear it specifically.
                            // This is a bit redundant but ensures we don't leave any decorations behind.
                            if (this.activeEditor) {
                                this.activeEditor.setDecorations(this.currentDecoration, []);
                                this.activeEditor = null;
                            }
                            // This prevents memory leaks.
                            this.currentDecoration.dispose();
                            this.currentDecoration = null;
                            // Clear the current tooltip text.
                            this.currentTooltipText = null;
                        }
                        if (this.disposables.length > 0) {
                            this.disposables.forEach(function (d) { return d.dispose(); });
                            this.disposables = [];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    NextEditWindowManager.prototype.hideAllNextEditWindowsAndResetCompletionId = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.hideAllNextEditWindows()];
                    case 1:
                        _a.sent();
                        // Log with accept = false.
                        return [4 /*yield*/, vscode.commands.executeCommand("continue.logNextEditOutcomeReject", this.mostRecentCompletionId, this.loggingService)];
                    case 2:
                        // Log with accept = false.
                        _a.sent();
                        this.mostRecentCompletionId = null;
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Accept the current next edit suggestion by inserting it at cursor position.
     */
    NextEditWindowManager.prototype.acceptNextEdit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var editor, text, position, success, startPos, endPosChar, endPos, editRange_1, lineDeleteRange_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.activeEditor === null || this.currentTooltipText === null) {
                            return [2 /*return*/];
                        }
                        this.accepted = true;
                        editor = this.activeEditor;
                        text = this.currentTooltipText;
                        position = editor.selection.active;
                        success = false;
                        // Hide windows first for a snappier feel.
                        return [4 /*yield*/, this.hideAllNextEditWindows()];
                    case 1:
                        // Hide windows first for a snappier feel.
                        _a.sent();
                        if (!this.textApplier) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.textApplier.applyText(editor, text, position, this.finalCursorPos)];
                    case 2:
                        success = _a.sent();
                        return [3 /*break*/, 7];
                    case 3:
                        startPos = new vscode.Position(this.editableRegionStartLine, 0);
                        endPosChar = editor.document.lineAt(this.editableRegionEndLine).text
                            .length;
                        endPos = new vscode.Position(this.editableRegionEndLine, endPosChar);
                        editRange_1 = new vscode.Range(startPos, endPos);
                        if (!this.isLineDelete) return [3 /*break*/, 5];
                        lineDeleteRange_1 = editRange_1;
                        // If this isn't the last line, extend to include the newline character.
                        if (this.editableRegionStartLine < editor.document.lineCount - 1) {
                            lineDeleteRange_1 = new vscode.Range(startPos, new vscode.Position(this.editableRegionStartLine + 1, 0));
                        }
                        return [4 /*yield*/, editor.edit(function (editBuilder) {
                                editBuilder.delete(lineDeleteRange_1);
                            })];
                    case 4:
                        success = _a.sent();
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, editor.edit(function (editBuilder) {
                            editBuilder.replace(editRange_1, text);
                        })];
                    case 6:
                        success = _a.sent();
                        _a.label = 7;
                    case 7:
                        if (success && this.finalCursorPos) {
                            // Move cursor to the final position if available.
                            editor.selection = new vscode.Selection(this.finalCursorPos, this.finalCursorPos);
                        }
                        // Log with accept = true.
                        return [4 /*yield*/, vscode.commands.executeCommand("continue.logNextEditOutcomeAccept", this.mostRecentCompletionId, this.loggingService)];
                    case 8:
                        // Log with accept = true.
                        _a.sent();
                        this.mostRecentCompletionId = null;
                        // Reset to false for future logging.
                        this.accepted = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Dispose of the NextEditWindowManager.
     */
    NextEditWindowManager.prototype.dispose = function () {
        void this.resetKeyReservation().catch(function (err) {
            return console.error("Failed to reset keys on dispose: ".concat(err));
        });
        // Dispose current decoration.
        if (this.currentDecoration) {
            this.currentDecoration.dispose();
            this.currentDecoration = null;
        }
        // Dispose all other disposables.
        this.disposables.forEach(function (d) { return d.dispose(); });
        this.disposables = [];
    };
    /**
     * Setup listeners for theme, font, and cursor position changes.
     */
    NextEditWindowManager.prototype.setupListeners = function () {
        var _this = this;
        // Theme change listener.
        vscode.workspace.onDidChangeConfiguration(function (e) { return __awaiter(_this, void 0, void 0, function () {
            var editorConfig;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(e.affectsConfiguration("workbench.colorTheme") ||
                            e.affectsConfiguration("editor.fontSize") ||
                            e.affectsConfiguration("editor.fontFamily") ||
                            e.affectsConfiguration("window.autoDetectColorScheme") ||
                            e.affectsConfiguration("window.autoDetectHighContrast") ||
                            e.affectsConfiguration("workbench.preferredDarkColorTheme") ||
                            e.affectsConfiguration("workbench.preferredLightColorTheme") ||
                            e.affectsConfiguration("workbench.preferredHighContrastColorTheme") ||
                            e.affectsConfiguration("workbench.preferredHighContrastLightColorTheme"))) return [3 /*break*/, 2];
                        this.theme = (0, getTheme_1.getThemeString)();
                        return [4 /*yield*/, this.codeRenderer.setTheme(this.theme)];
                    case 1:
                        _c.sent();
                        console.debug("Theme updated:", this.theme ? "Theme exists" : "Theme is undefined");
                        editorConfig = vscode.workspace.getConfiguration("editor");
                        this.fontSize = (_a = editorConfig.get("fontSize")) !== null && _a !== void 0 ? _a : 14;
                        this.fontFamily = (_b = editorConfig.get("fontFamily")) !== null && _b !== void 0 ? _b : "monospace";
                        _c.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
        // Listen for active color theme changes.
        vscode.window.onDidChangeActiveColorTheme(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.theme = (0, getTheme_1.getThemeString)();
                        return [4 /*yield*/, this.codeRenderer.setTheme(this.theme)];
                    case 1:
                        _a.sent();
                        console.debug("Active theme changed:", this.theme ? "Theme exists" : "Theme is undefined");
                        return [2 /*return*/];
                }
            });
        }); });
        // Listen for editor changes to clean up decorations when editor closes.
        vscode.window.onDidChangeVisibleTextEditors(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.activeEditor &&
                            !vscode.window.visibleTextEditors.includes(this.activeEditor))) return [3 /*break*/, 2];
                        if (this.mostRecentCompletionId) {
                            this.loggingService.cancelRejectionTimeout(this.mostRecentCompletionId);
                        }
                        return [4 /*yield*/, this.hideAllNextEditWindows()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
        // Listen for selection changes to hide tooltip when cursor moves.
        vscode.window.onDidChangeTextEditorSelection(function (e) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.activeEditor && e.textEditor === this.activeEditor)) return [3 /*break*/, 2];
                        // If the cursor moved because of something other than accepting next edit, stop logging it.
                        if (!this.accepted && this.mostRecentCompletionId) {
                            this.loggingService.cancelRejectionTimeout(this.mostRecentCompletionId);
                        }
                        return [4 /*yield*/, this.hideAllNextEditWindows()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
    };
    NextEditWindowManager.prototype.shouldRenderTip = function (uri) {
        var isAllowedUri = !this.excludedURIPrefixes.some(function (prefix) {
            return uri.toString().startsWith(prefix);
        }) && uri.scheme !== "comment";
        var isEnabled = !!vscode.workspace
            .getConfiguration(env_1.EXTENSION_NAME)
            .get("showInlineTip") === true;
        return isAllowedUri && isEnabled;
    };
    /**
     * Create a render of the given code, supporting multiple lines.
     */
    NextEditWindowManager.prototype.createCodeRender = function (text, currLineOffsetFromTop, newDiffLines, diffChars) {
        return __awaiter(this, void 0, void 0, function () {
            var tipWidth, tipHeight, dimensions, uri, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        tipWidth = SVG_CONFIG.getTipWidth(text);
                        tipHeight = SVG_CONFIG.getTipHeight(text);
                        dimensions = {
                            width: tipWidth,
                            height: tipHeight,
                        };
                        return [4 /*yield*/, this.codeRenderer.getDataUri(text, "typescript", {
                                imageType: "svg",
                                fontSize: this.fontSize,
                                fontFamily: this.fontFamily,
                                dimensions: dimensions,
                                lineHeight: SVG_CONFIG.lineHeight,
                            }, currLineOffsetFromTop, newDiffLines, diffChars)];
                    case 1:
                        uri = _a.sent();
                        return [2 /*return*/, {
                                uri: vscode.Uri.parse(uri),
                                dimensions: dimensions,
                            }];
                    case 2:
                        error_2 = _a.sent();
                        console.error("Error creating SVG tooltip:", error_2);
                        return [2 /*return*/, undefined];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Create a decoration type with the code render.
     * @param code: The code to render.
     * @returns The decoration.
     */
    NextEditWindowManager.prototype.createCodeRenderDecoration = function (originalCode, predictedCode, position, editableRegionStartLine, newDiffLines, diffChars) {
        return __awaiter(this, void 0, void 0, function () {
            var currLineOffsetFromTop, uriAndDimensions, uri, dimensions, tipWidth, tipHeight, offsetFromTop, marginLeft;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        currLineOffsetFromTop = position.line - editableRegionStartLine;
                        return [4 /*yield*/, this.createCodeRender(predictedCode, currLineOffsetFromTop, newDiffLines, diffChars)];
                    case 1:
                        uriAndDimensions = _a.sent();
                        if (!uriAndDimensions) {
                            return [2 /*return*/, undefined];
                        }
                        uri = uriAndDimensions.uri, dimensions = uriAndDimensions.dimensions;
                        tipWidth = dimensions.width;
                        tipHeight = dimensions.height;
                        offsetFromTop = (position.line - editableRegionStartLine) * SVG_CONFIG.lineHeight;
                        marginLeft = SVG_CONFIG.paddingX;
                        return [2 /*return*/, vscode.window.createTextEditorDecorationType({
                                before: {
                                    contentIconPath: uri,
                                    border: "transparent; position: absolute; z-index: 2147483647;        \n              filter: ".concat(SVG_CONFIG.filter, ";\n              margin-top: ").concat(-1 * offsetFromTop, "px;\n              margin-left: ").concat(marginLeft, "px;"),
                                    width: "".concat(tipWidth, "px"),
                                    height: "".concat(tipHeight, "px"),
                                },
                                rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
                            })];
                }
            });
        });
    };
    NextEditWindowManager.prototype.buildHideTooltipHoverMsg = function () {
        var hoverMarkdown = new vscode.MarkdownString("[Reject (Esc)](command:".concat(exports.HIDE_NEXT_EDIT_SUGGESTION_COMMAND, ") | [Accept (Tab)](command:").concat(exports.ACCEPT_NEXT_EDIT_SUGGESTION_COMMAND, ")"));
        hoverMarkdown.isTrusted = true;
        hoverMarkdown.supportHtml = true;
        return hoverMarkdown;
    };
    NextEditWindowManager.prototype.isValidRange = function (editor, range) {
        var doc = editor.document;
        // Check if line numbers are valid.
        if (range.start.line < 0 || range.start.line >= doc.lineCount) {
            console.debug("Invalid start line:", range.start.line, "doc lines:", doc.lineCount);
            return false;
        }
        if (range.end.line < 0 || range.end.line >= doc.lineCount) {
            console.debug("Invalid end line:", range.end.line, "doc lines:", doc.lineCount);
            return false;
        }
        // Check if character positions are valid.
        var startLine = doc.lineAt(range.start.line);
        var endLine = doc.lineAt(range.end.line);
        if (range.start.character < 0 ||
            range.start.character > startLine.text.length) {
            console.debug("Invalid start character:", range.start.character, "line length:", startLine.text.length);
            return false;
        }
        if (range.end.character < 0 || range.end.character > endLine.text.length) {
            console.debug("Invalid end character:", range.end.character, "line length:", endLine.text.length);
            return false;
        }
        return true;
    };
    /**
     * Calculate a position to the right of the cursor with the specified offset.
     */
    NextEditWindowManager.prototype.getDecorationOffsetPosition = function (editor, position) {
        // Place decoration at the end of the current line
        var line = editor.document.lineAt(position.line);
        return new vscode.Position(position.line, line.text.length);
    };
    /**
     * Render a window with the given text at the specified position.
     */
    NextEditWindowManager.prototype.renderWindow = function (editor, position, originalCode, predictedCode, editableRegionStartLine, newDiffLines, diffChars) {
        return __awaiter(this, void 0, void 0, function () {
            var docVersion, decoration, decorationOffsetPosition, range;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        docVersion = editor.document.version;
                        return [4 /*yield*/, this.createCodeRenderDecoration(originalCode, predictedCode, position, editableRegionStartLine, newDiffLines, diffChars)];
                    case 1:
                        decoration = _a.sent();
                        if (!decoration) {
                            console.error("Failed to create decoration for text:", predictedCode);
                            return [2 /*return*/];
                        }
                        // Check if document changed during async operation.
                        if (editor.document.version !== docVersion) {
                            console.debug("Document changed during decoration creation, aborting");
                            decoration.dispose();
                            return [2 /*return*/];
                        }
                        // Store the decoration and editor.
                        this.currentDecoration = decoration; // TODO: This might be redundant.
                        this.disposables.push(decoration);
                        decorationOffsetPosition = this.getDecorationOffsetPosition(editor, position);
                        range = new vscode.Range(decorationOffsetPosition, decorationOffsetPosition);
                        // Validate the range before applying.
                        if (!this.isValidRange(editor, range)) {
                            console.error("Invalid range detected, skipping decoration");
                            return [2 /*return*/];
                        }
                        // Apply the decoration at the calculated position.
                        editor.setDecorations(this.currentDecoration, [
                            {
                                range: new vscode.Range(decorationOffsetPosition, decorationOffsetPosition),
                                hoverMessage: [this.buildHideTooltipHoverMsg()],
                            },
                        ]);
                        // Clear the timeout while SVG is on the editor.
                        if (this.currentDecoration && this.mostRecentCompletionId)
                            this.loggingService.cancelRejectionTimeoutButKeepCompletionId(this.mostRecentCompletionId);
                        return [2 /*return*/];
                }
            });
        });
    };
    NextEditWindowManager.prototype.renderDeletions = function (editor, oldDiffChars) {
        var _this = this;
        var charsToDelete = [];
        // const diffChars = myersCharDiff(oldEditRangeSlice, newEditRangeSlice);
        oldDiffChars.forEach(function (diff) {
            // TODO: This check if technically redundant.
            if (diff.type === "old") {
                charsToDelete.push({
                    range: new vscode.Range(new vscode.Position(_this.editableRegionStartLine + diff.oldLineIndex, diff.oldCharIndexInLine), new vscode.Position(_this.editableRegionStartLine + diff.oldLineIndex, diff.oldCharIndexInLine + diff.char.length)),
                });
            }
        });
        var deleteDecorationType = vscode.window.createTextEditorDecorationType({
            backgroundColor: "rgba(255, 0, 0, 0.5)",
        });
        editor.setDecorations(deleteDecorationType, charsToDelete);
        this.disposables.push(deleteDecorationType);
    };
    NextEditWindowManager.prototype.getExactCharacterWidth = function () {
        return __awaiter(this, void 0, void 0, function () {
            var activeEditor, editorInstance, viewModel;
            return __generator(this, function (_a) {
                activeEditor = vscode.window.activeTextEditor;
                if (activeEditor) {
                    editorInstance = activeEditor;
                    if (editorInstance._modelData && editorInstance._modelData.viewModel) {
                        viewModel = editorInstance._modelData.viewModel;
                        return [2 /*return*/, (viewModel.getLineWidth(0) /
                                activeEditor.document.lineAt(0).text.length)];
                    }
                }
                // If all else fails, return a reasonable default
                return [2 /*return*/, SVG_CONFIG.fontSize * 0.6];
            });
        });
    };
    NextEditWindowManager.prototype.hasAccepted = function () {
        return this.accepted;
    };
    NextEditWindowManager.prototype.registerSelectionChangeHandler = function () {
        var _this = this;
        var manager = SelectionChangeManager_1.SelectionChangeManager.getInstance();
        manager.registerListener("nextEditWindowManager", function (e, state) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (state.nextEditWindowAccepted) {
                    console.debug("NextEditWindowManager: Edit was just accepted, preserving chain");
                    return [2 /*return*/, true];
                }
                return [2 /*return*/, false];
            });
        }); }, SelectionChangeManager_1.HandlerPriority.CRITICAL);
    };
    return NextEditWindowManager;
}());
exports.NextEditWindowManager = NextEditWindowManager;
function setupNextEditWindowManager(context, textApplier) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, NextEditWindowManager.getInstance().setupNextEditWindowManager(context, textApplier)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
