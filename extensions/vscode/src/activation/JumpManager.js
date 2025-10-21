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
exports.JumpManager = void 0;
var NextEditProvider_1 = require("core/nextEdit/NextEditProvider");
// @ts-ignore
var svg_builder_1 = require("svg-builder");
var vscode = require("vscode");
var getTheme_1 = require("../util/getTheme");
var SelectionChangeManager_1 = require("./SelectionChangeManager");
// Instead of getters that execute immediately, use methods or lazy properties
var SVG_CONFIG = {
    stroke: "#999998",
    strokeWidth: 1,
    shortcutColor: "#999998",
    filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.2))",
    radius: 3,
    leftMargin: 40,
    debounceDelay: 500,
    label: "📍 Press Tab to jump, Esc to cancel",
    // Convert getters to methods that are called when needed
    getFontSize: function () {
        var _a;
        return Math.ceil(((_a = vscode.workspace.getConfiguration("editor").get("fontSize")) !== null && _a !== void 0 ? _a : 14) * 0.8);
    },
    getFontFamily: function () {
        return (vscode.workspace.getConfiguration("editor").get("fontFamily") ||
            "helvetica");
    },
    getPaddingX: function () {
        return Math.ceil(this.getEstimatedTextWidth(" "));
    },
    getGap: function () {
        return this.getFontSize() * 0.5;
    },
    getTipWidth: function () {
        return this.getEstimatedTextWidth(this.label) + this.getPaddingX();
    },
    getTipHeight: function () {
        return this.getFontSize();
    },
    getTextY: function () {
        return (this.getTipHeight() + this.getFontSize()) / 2;
    },
    getEstimatedTextWidth: function (text) {
        return text.length * this.getFontSize() * 0.6;
    },
};
/**
 * This is how we handle jumps and manage decoration object lifetime.
 * There are mainly three states the user can be in: not jumping, jumping in progress, and just jumped.
 * This can potentially be an enum for better readability, but there is logic here that relies on
 * the _jumpAccepted flag to determine whether we should delete chains.
 */
var JumpManager = /** @class */ (function () {
    function JumpManager() {
        var _this = this;
        this._jumpDecorationVisible = false;
        this._disposables = [];
        this._theme = (0, getTheme_1.getTheme)();
        this._jumpInProgress = false;
        this._jumpAccepted = false;
        this._completionAfterJump = null;
        // Build the first SVG icon
        this._createSvgJumpIcon();
        // Re‑build when the colour theme changes
        vscode.workspace.onDidChangeConfiguration(function (e) {
            if (e.affectsConfiguration("workbench.colorTheme")) {
                _this._theme = (0, getTheme_1.getTheme)();
                _this._createSvgJumpIcon();
            }
        });
    }
    JumpManager.prototype.initialize = function () { };
    JumpManager.getInstance = function () {
        if (!JumpManager._instance) {
            JumpManager._instance = new JumpManager();
        }
        return JumpManager._instance;
    };
    JumpManager.clearInstance = function () {
        if (JumpManager._instance) {
            JumpManager._instance.dispose();
            JumpManager._instance = undefined;
        }
    };
    JumpManager.prototype.dispose = function () {
        // Dispose current decoration.
        this._disposables.forEach(function (d) {
            if (d)
                d.dispose();
        });
        this._disposables = [];
    };
    JumpManager.prototype._createSvgJumpIcon = function () {
        var _a, _b;
        var baseTextConfig = {
            y: SVG_CONFIG.getTextY(),
            "font-family": SVG_CONFIG.getFontFamily(),
            "font-size": SVG_CONFIG.getFontSize(),
        };
        try {
            // NOTE: it's critical to use svgBuilder.newInstance.
            // svgBuilder holds state of previously created SVGs,
            // so you end up with SVGs stacking on top of each other and being interleaved.
            var builder = svg_builder_1.default.newInstance
                ? svg_builder_1.default.newInstance()
                : svg_builder_1.default;
            var svgContent = builder
                .width(SVG_CONFIG.getTipWidth())
                .height(SVG_CONFIG.getTipHeight())
                .text(__assign(__assign({}, baseTextConfig), { x: 4, fill: (_b = (_a = this._theme) === null || _a === void 0 ? void 0 : _a.colors["editor.foreground"]) !== null && _b !== void 0 ? _b : SVG_CONFIG.stroke }), SVG_CONFIG.label)
                .render();
            var dataUri = "data:image/svg+xml;base64,".concat(Buffer.from(svgContent).toString("base64"));
            this._jumpIcon = vscode.Uri.parse(dataUri);
            // Dispose the old decoration (if any) and create a fresh one.
            if (this._jumpDecoration) {
                this._jumpDecoration.dispose();
            }
            this._jumpDecoration = this._createSvgJumpDecoration();
        }
        catch (err) {
            console.error("Error creating SVG jump tooltip:", err);
        }
    };
    JumpManager.prototype._createSvgJumpDecoration = function () {
        var _a, _b;
        var backgroundColour = (_b = (_a = this._theme) === null || _a === void 0 ? void 0 : _a.colors["editor.background"]) !== null && _b !== void 0 ? _b : "#333333";
        return vscode.window.createTextEditorDecorationType({
            after: {
                contentIconPath: this._jumpIcon,
                border: ";box-shadow: inset 0 0 0 ".concat(SVG_CONFIG.strokeWidth, "px ").concat(SVG_CONFIG.stroke, ", inset 0 0 0 ").concat(SVG_CONFIG.getTipHeight(), "px ").concat(backgroundColour, ";\n                  border-radius: ").concat(SVG_CONFIG.radius, "px;\n                  filter: ").concat(SVG_CONFIG.filter),
                margin: "0 0 0 ".concat(SVG_CONFIG.leftMargin, "px"),
                width: "".concat(SVG_CONFIG.getTipWidth(), "px"),
            },
        });
    };
    JumpManager.prototype.suggestJump = function (currentPosition, nextJumpLocation, completionContent) {
        return __awaiter(this, void 0, void 0, function () {
            var editor_1, completionLines, document_1, startLine, endLine, contentMatches, i, documentLine, lineText, editor, visibleRanges, visibleRange, topLineNumber, bottomLineNumber, decorationLine;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Deduplication logic.
                        // If the content at the next jump location is
                        // identical to the completion content,
                        // then we don't have to jump.
                        if (completionContent !== undefined) {
                            console.debug("completionContent is not null");
                            editor_1 = vscode.window.activeTextEditor;
                            if (editor_1) {
                                try {
                                    completionLines = completionContent.split("\n");
                                    console.debug("completionLines:", completionLines);
                                    document_1 = editor_1.document;
                                    startLine = nextJumpLocation.line;
                                    endLine = Math.min(startLine + completionLines.length - 1, document_1.lineCount - 1);
                                    // First check if we have enough lines in the document
                                    if (endLine - startLine + 1 < completionLines.length) {
                                        // Not enough lines in document, so content can't be identical.
                                        // Proceed to jump!
                                        console.debug("Not enough lines in document to match completion content");
                                    }
                                    else {
                                        contentMatches = true;
                                        // Check all lines for match.
                                        for (i = 0; i < completionLines.length && contentMatches; i++) {
                                            documentLine = startLine + i;
                                            lineText = document_1.lineAt(documentLine).text;
                                            if (lineText !== completionLines[i]) {
                                                contentMatches = false;
                                                console.debug("Line ".concat(i + 1, " doesn't match"));
                                            }
                                        }
                                        if (contentMatches) {
                                            console.debug("Skipping jump as content is identical at jump location");
                                            return [2 /*return*/, false]; // Exit early, don't suggest jump.
                                        }
                                    }
                                }
                                catch (error) {
                                    console.error("Error checking content at jump location:", error);
                                    // Continue with jump even if there's an error checking content.
                                }
                            }
                        }
                        console.debug("this._jumpInProgress");
                        this._jumpInProgress = true;
                        this._oldCursorPosition = currentPosition;
                        editor = vscode.window.activeTextEditor;
                        if (!editor) {
                            console.debug("No active editor, cannot suggest jump");
                            this._jumpInProgress = false;
                            return [2 /*return*/, false];
                        }
                        visibleRanges = editor.visibleRanges;
                        if (visibleRanges.length === 0) {
                            console.debug("No visible ranges in editor, cannot suggest jump");
                            this._jumpInProgress = false;
                            return [2 /*return*/, false];
                        }
                        visibleRange = visibleRanges[0];
                        topLineNumber = visibleRange.start.line;
                        bottomLineNumber = visibleRange.end.line;
                        decorationLine = nextJumpLocation.line;
                        if (!(decorationLine < topLineNumber)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.renderTabToJumpDecoration(editor, topLineNumber, nextJumpLocation)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 2:
                        if (!(decorationLine > bottomLineNumber)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.renderTabToJumpDecoration(editor, bottomLineNumber, nextJumpLocation)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 4: 
                    // No suggestion is made when the decoration is within visibleRange.
                    return [4 /*yield*/, this.renderTabToJumpDecoration(editor, decorationLine, nextJumpLocation)];
                    case 5:
                        // No suggestion is made when the decoration is within visibleRange.
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/, true];
                }
            });
        });
    };
    JumpManager.prototype.renderTabToJumpDecoration = function (editor, lineToRenderOn, jumpPosition) {
        return __awaiter(this, void 0, void 0, function () {
            var lastIndexOfLine;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Clean up any existing decoration beforehand.
                    return [4 /*yield*/, this.clearJumpDecoration()];
                    case 1:
                        // Clean up any existing decoration beforehand.
                        _a.sent();
                        // Create a decoration for jump.
                        if (!this._jumpDecoration) {
                            this._createSvgJumpIcon(); // makes both the icon & decoration
                        }
                        lastIndexOfLine = editor.document.lineAt(lineToRenderOn).text.length;
                        editor.setDecorations(this._jumpDecoration, [
                            new vscode.Range(lineToRenderOn, lastIndexOfLine, lineToRenderOn, lastIndexOfLine),
                        ]);
                        // Set the context key to enable tab/esc shortcuts.
                        return [4 /*yield*/, vscode.commands.executeCommand("setContext", "continue.jumpDecorationVisible", true)];
                    case 2:
                        // Set the context key to enable tab/esc shortcuts.
                        _a.sent();
                        this._jumpDecorationVisible = true;
                        // Register the key listeners.
                        return [4 /*yield*/, this.registerKeyListeners(editor, jumpPosition)];
                    case 3:
                        // Register the key listeners.
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    JumpManager.prototype.clearJumpDecoration = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this._jumpDecoration) {
                            this._jumpDecoration.dispose();
                            this._jumpDecoration = undefined;
                        }
                        // Dispose any active listeners.
                        this.dispose();
                        // Reset the context.
                        return [4 /*yield*/, vscode.commands.executeCommand("setContext", "continue.jumpDecorationVisible", false)];
                    case 1:
                        // Reset the context.
                        _a.sent();
                        this._jumpDecorationVisible = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    JumpManager.prototype.registerKeyListeners = function (editor, jumpPosition) {
        return __awaiter(this, void 0, void 0, function () {
            var acceptJumpCommand, rejectJumpCommand, selectionChangeListener;
            var _this = this;
            return __generator(this, function (_a) {
                acceptJumpCommand = vscode.commands.registerCommand("continue.acceptJump", function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!this._jumpDecorationVisible) return [3 /*break*/, 2];
                                this._jumpAccepted = true;
                                // Scroll to show the jump location.
                                editor.revealRange(new vscode.Range(jumpPosition.line, 0, jumpPosition.line, 0), vscode.TextEditorRevealType.InCenter);
                                // Move cursor to the jump position.
                                editor.selection = new vscode.Selection(jumpPosition, jumpPosition);
                                return [4 /*yield*/, this.clearJumpDecoration()];
                            case 1:
                                _a.sent();
                                this._jumpAccepted = false;
                                vscode.commands.executeCommand("editor.action.inlineSuggest.trigger");
                                _a.label = 2;
                            case 2: return [2 /*return*/];
                        }
                    });
                }); });
                rejectJumpCommand = vscode.commands.registerCommand("continue.rejectJump", function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!this._jumpDecorationVisible) return [3 /*break*/, 2];
                                console.debug("deleteChain from JumpManager.ts: rejectJump and decoration visible");
                                NextEditProvider_1.NextEditProvider.getInstance().deleteChain();
                                return [4 /*yield*/, this.clearJumpDecoration()];
                            case 1:
                                _a.sent();
                                _a.label = 2;
                            case 2: return [2 /*return*/];
                        }
                    });
                }); });
                selectionChangeListener = vscode.window.onDidChangeTextEditorSelection(function (e) {
                    // If jump decoration isn't visible, nothing to do.
                    if (!_this._jumpDecorationVisible) {
                        return;
                    }
                    var currentPosition = e.selections[0].active;
                    // If cursor moved to jump position, this is likely the result of acceptJump.
                    if (currentPosition.isEqual(jumpPosition)) {
                        return;
                    }
                    // If cursor position changed for any other reason, reject the jump.
                    if (_this._oldCursorPosition &&
                        !currentPosition.isEqual(_this._oldCursorPosition)) {
                        vscode.commands.executeCommand("continue.rejectJump");
                    }
                });
                // This allows us to dispose the command after a jump is completed.
                this._disposables.push(acceptJumpCommand, rejectJumpCommand, selectionChangeListener);
                return [2 /*return*/];
            });
        });
    };
    JumpManager.prototype.isJumpInProgress = function () {
        return this._jumpInProgress;
    };
    JumpManager.prototype.setJumpInProgress = function (jumpInProgress) {
        this._jumpInProgress = jumpInProgress;
    };
    JumpManager.prototype.wasJumpJustAccepted = function () {
        return this._jumpAccepted;
    };
    JumpManager.prototype.setCompletionAfterJump = function (completionData) {
        this._completionAfterJump = completionData;
    };
    JumpManager.prototype.clearCompletionAfterJump = function () {
        this._completionAfterJump = null;
    };
    Object.defineProperty(JumpManager.prototype, "completionAfterJump", {
        get: function () {
            return this._completionAfterJump;
        },
        enumerable: false,
        configurable: true
    });
    JumpManager.prototype.registerSelectionChangeHandler = function () {
        var _this = this;
        var manager = SelectionChangeManager_1.SelectionChangeManager.getInstance();
        manager.registerListener("jumpManager", function (e, state) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (state.jumpInProgress || state.jumpJustAccepted) {
                    console.debug("JumpManager: jump in progress or just accepted, preserving chain");
                    return [2 /*return*/, true];
                }
                return [2 /*return*/, false];
            });
        }); }, SelectionChangeManager_1.HandlerPriority.HIGH);
    };
    return JumpManager;
}());
exports.JumpManager = JumpManager;
