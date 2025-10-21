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
Object.defineProperty(exports, "__esModule", { value: true });
exports.InlineTipManager = void 0;
exports.default = setupInlineTips;
/* eslint-disable @typescript-eslint/naming-convention */
var env_1 = require("core/control-plane/env");
// @ts-ignore
var svg_builder_1 = require("svg-builder");
var vscode = require("vscode");
var getTheme_1 = require("../util/getTheme");
var util_1 = require("../util/util");
var SVG_CONFIG = {
    stroke: "#999998",
    strokeWidth: 1,
    shortcutColor: "#999998",
    filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.2))",
    radius: 3,
    leftMargin: 40,
    debounceDelay: 500,
    chatLabel: "Chat",
    chatShortcut: "".concat((0, util_1.getMetaKeyLabel)(), "+L"),
    editLabel: "Edit",
    editShortcut: "".concat((0, util_1.getMetaKeyLabel)(), "+I"),
    get fontSize() {
        var _a;
        return Math.ceil(((_a = vscode.workspace.getConfiguration("editor").get("fontSize")) !== null && _a !== void 0 ? _a : 14) * 0.8);
    },
    get fontFamily() {
        return (vscode.workspace.getConfiguration("editor").get("fontFamily") ||
            "helvetica");
    },
    get paddingX() {
        return Math.ceil(this.getEstimatedTextWidth(" "));
    },
    get gap() {
        return this.fontSize * 0.5;
    },
    get tipWidth() {
        return (this.editShortcutX +
            this.getEstimatedTextWidth(this.editShortcut) +
            this.paddingX);
    },
    get tipHeight() {
        return this.fontSize;
    },
    get textY() {
        return (this.tipHeight + this.fontSize) / 2;
    },
    get chatLabelX() {
        return this.paddingX;
    },
    get chatShortcutX() {
        return this.chatLabelX + this.getEstimatedTextWidth(this.chatLabel + " ");
    },
    get editLabelX() {
        return (this.chatShortcutX +
            this.getEstimatedTextWidth(this.chatShortcut) +
            this.gap);
    },
    get editShortcutX() {
        return this.editLabelX + this.getEstimatedTextWidth(this.editLabel + " ");
    },
    getEstimatedTextWidth: function (text) {
        return text.length * this.fontSize * 0.6;
    },
};
var InlineTipManager = /** @class */ (function () {
    function InlineTipManager() {
        this.excludedURIPrefixes = ["output:", "vscode://inline-chat"];
        this.hideCommand = "continue.hideInlineTip";
        this.svgTooltip = undefined;
        this.theme = (0, getTheme_1.getTheme)();
        this.svgTooltipDecoration = this.createSvgTooltipDecoration();
        this.emptyFileTooltipDecoration = this.createEmptyFileTooltipDecoration();
        this.createSvgTooltip();
        this.setupSvgTipListeners();
    }
    InlineTipManager.getInstance = function () {
        if (!InlineTipManager.instance) {
            InlineTipManager.instance = new InlineTipManager();
        }
        return InlineTipManager.instance;
    };
    InlineTipManager.prototype.setupInlineTips = function (context) {
        var _this = this;
        context.subscriptions.push(vscode.window.onDidChangeTextEditorSelection(function (e) {
            _this.handleSelectionChange(e);
        }));
        this.setupEmptyFileTips(context);
        context.subscriptions.push(this);
    };
    InlineTipManager.prototype.handleSelectionChange = function (e) {
        var selection = e.selections[0];
        var editor = e.textEditor;
        if (selection.isEmpty || !this.shouldRenderTip(editor.document.uri)) {
            editor.setDecorations(this.svgTooltipDecoration, []);
            return;
        }
        this.debouncedSelectionChange(editor, selection);
    };
    InlineTipManager.prototype.dispose = function () {
        this.svgTooltipDecoration.dispose();
        this.emptyFileTooltipDecoration.dispose();
        if (this.debounceTimer) {
            clearTimeout(this.debounceTimer);
        }
    };
    InlineTipManager.prototype.debouncedSelectionChange = function (editor, selection) {
        var _this = this;
        if (this.debounceTimer) {
            clearTimeout(this.debounceTimer);
        }
        this.debounceTimer = setTimeout(function () {
            // Clear decoration from previous editor
            if (_this.lastActiveEditor && _this.lastActiveEditor !== editor) {
                _this.lastActiveEditor.setDecorations(_this.svgTooltipDecoration, []);
            }
            _this.lastActiveEditor = editor;
            _this.updateTooltipPosition(editor, selection);
        }, SVG_CONFIG.debounceDelay);
    };
    InlineTipManager.prototype.setupSvgTipListeners = function () {
        var _this = this;
        vscode.workspace.onDidChangeConfiguration(function (e) {
            if (e.affectsConfiguration("workbench.colorTheme")) {
                _this.theme = (0, getTheme_1.getTheme)();
                _this.createSvgTooltip();
            }
        });
        vscode.workspace.onDidChangeConfiguration(function (e) {
            if (e.affectsConfiguration("editor.fontSize")) {
                _this.createSvgTooltip();
            }
        });
    };
    InlineTipManager.prototype.shouldRenderTip = function (uri) {
        var isAllowedUri = !this.excludedURIPrefixes.some(function (prefix) {
            return uri.toString().startsWith(prefix);
        }) && uri.scheme !== "comment";
        var isEnabled = !!vscode.workspace
            .getConfiguration(env_1.EXTENSION_NAME)
            .get("showInlineTip") === true;
        return isAllowedUri && isEnabled;
    };
    InlineTipManager.prototype.setupEmptyFileTips = function (context) {
        var _this = this;
        context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(function (editor) {
            if ((editor === null || editor === void 0 ? void 0 : editor.document.getText()) === "" &&
                _this.shouldRenderTip(editor.document.uri)) {
                editor.setDecorations(_this.emptyFileTooltipDecoration, [
                    {
                        range: new vscode.Range(new vscode.Position(0, Number.MAX_VALUE), new vscode.Position(0, Number.MAX_VALUE)),
                    },
                ]);
            }
        }));
        context.subscriptions.push(vscode.workspace.onDidChangeTextDocument(function (e) {
            if (e.document.getText() === "" &&
                _this.shouldRenderTip(e.document.uri)) {
                vscode.window.visibleTextEditors.forEach(function (editor) {
                    editor.setDecorations(_this.emptyFileTooltipDecoration, [
                        {
                            range: new vscode.Range(new vscode.Position(0, Number.MAX_VALUE), new vscode.Position(0, Number.MAX_VALUE)),
                        },
                    ]);
                });
            }
            else {
                vscode.window.visibleTextEditors.forEach(function (editor) {
                    editor.setDecorations(_this.emptyFileTooltipDecoration, []);
                });
            }
        }));
    };
    InlineTipManager.prototype.createEmptyFileTooltipDecoration = function () {
        return vscode.window.createTextEditorDecorationType({
            after: {
                contentText: "Use ".concat((0, util_1.getMetaKeyName)(), " + I to generate code"),
                color: "#888",
                margin: "2em 0 0 0",
                fontStyle: "italic",
            },
        });
    };
    InlineTipManager.prototype.createSvgTooltipDecoration = function () {
        var backgroundColour = "#333333";
        if (this.theme) {
            backgroundColour = this.theme.colors["editor.background"];
        }
        return vscode.window.createTextEditorDecorationType({
            after: {
                contentIconPath: this.svgTooltip,
                border: ";box-shadow: inset 0 0 0 ".concat(SVG_CONFIG.strokeWidth, "px ").concat(SVG_CONFIG.stroke, ", inset 0 0 0 ").concat(SVG_CONFIG.tipHeight, "px ").concat(backgroundColour, ";\n                  border-radius: ").concat(SVG_CONFIG.radius, "px;\n                  filter: ").concat(SVG_CONFIG.filter),
                margin: "0 0 0 ".concat(SVG_CONFIG.leftMargin, "px"),
                width: "".concat(SVG_CONFIG.tipWidth, "px"),
            },
        });
    };
    InlineTipManager.prototype.createSvgTooltip = function () {
        var _a, _b, _c, _d;
        var baseTextConfig = {
            y: SVG_CONFIG.textY,
            "font-family": SVG_CONFIG.fontFamily,
            "font-size": SVG_CONFIG.fontSize,
        };
        // if (!this.theme) {
        //   return;
        // }
        try {
            var builder = svg_builder_1.default.newInstance
                ? svg_builder_1.default.newInstance()
                : svg_builder_1.default;
            var svgContent = builder
                .width(SVG_CONFIG.tipWidth)
                .height(SVG_CONFIG.tipHeight)
                // Chat
                .text(__assign(__assign({}, baseTextConfig), { x: SVG_CONFIG.chatLabelX, fill: (_b = (_a = this.theme) === null || _a === void 0 ? void 0 : _a.colors["editor.foreground"]) !== null && _b !== void 0 ? _b : SVG_CONFIG.stroke }), SVG_CONFIG.chatLabel)
                .text(__assign(__assign({}, baseTextConfig), { x: SVG_CONFIG.chatShortcutX, fill: SVG_CONFIG.shortcutColor }), SVG_CONFIG.chatShortcut)
                // Edit
                .text(__assign(__assign({}, baseTextConfig), { x: SVG_CONFIG.editLabelX, fill: (_d = (_c = this.theme) === null || _c === void 0 ? void 0 : _c.colors["editor.foreground"]) !== null && _d !== void 0 ? _d : SVG_CONFIG.stroke }), SVG_CONFIG.editLabel)
                .text(__assign(__assign({}, baseTextConfig), { x: SVG_CONFIG.editShortcutX, fill: SVG_CONFIG.shortcutColor }), SVG_CONFIG.editShortcut)
                .render();
            var dataUri = "data:image/svg+xml;base64,".concat(Buffer.from(svgContent).toString("base64"));
            this.svgTooltip = vscode.Uri.parse(dataUri);
            this.svgTooltipDecoration.dispose();
            this.svgTooltipDecoration = this.createSvgTooltipDecoration();
        }
        catch (error) {
            console.error("Error creating SVG for inline tip:", error);
        }
    };
    InlineTipManager.prototype.buildHideTooltipHoverMsg = function () {
        var hoverMarkdown = new vscode.MarkdownString("[Disable](command:".concat(this.hideCommand, ")"));
        hoverMarkdown.isTrusted = true;
        hoverMarkdown.supportHtml = true;
        return hoverMarkdown;
    };
    /**
     * Calculates tooltip position using these rules:
     * 1. For single-line selection: Place after the line's content
     * 2. For multi-line selection: Place after the longer line between:
     *    - The first non-empty selected line
     *    - The line above the selection
     * Returns null if selection is empty or contains only empty lines
     */
    InlineTipManager.prototype.calculateTooltipPosition = function (editor, selection) {
        var document = editor.document;
        // Get selection info
        var startLine = selection.start.line;
        var endLine = selection.end.line;
        var isFullLineSelection = selection.start.character === 0 &&
            (selection.end.line > selection.start.line
                ? selection.end.character === 0
                : selection.end.character ===
                    document.lineAt(selection.end.line).text.length);
        // Helper functions
        var isLineEmpty = function (lineNumber) {
            return document.lineAt(lineNumber).text.trim().length === 0;
        };
        var getLineEndChar = function (lineNumber) {
            return document.lineAt(lineNumber).text.trimEnd().length;
        };
        // If single empty line selected and not full line selection, return null
        if (startLine === endLine &&
            isLineEmpty(startLine) &&
            !isFullLineSelection) {
            return null;
        }
        // Find topmost non-empty line
        var topNonEmptyLine = startLine;
        while (topNonEmptyLine <= endLine && isLineEmpty(topNonEmptyLine)) {
            topNonEmptyLine++;
        }
        // If all lines empty, return null
        if (topNonEmptyLine > endLine) {
            return null;
        }
        var OFFSET = 4; // Characters to offset from end of line
        // Single line or full line selection
        if (isFullLineSelection || startLine === endLine) {
            return new vscode.Position(topNonEmptyLine, getLineEndChar(topNonEmptyLine) + OFFSET);
        }
        // Check line above selection
        var lineAboveSelection = Math.max(0, startLine - 1);
        // Get end positions
        var topNonEmptyEndChar = getLineEndChar(topNonEmptyLine);
        var lineAboveEndChar = getLineEndChar(lineAboveSelection);
        var baseEndChar = Math.max(topNonEmptyEndChar, lineAboveEndChar);
        return new vscode.Position(topNonEmptyLine, baseEndChar + OFFSET);
    };
    InlineTipManager.prototype.updateTooltipPosition = function (editor, selection) {
        var position = this.calculateTooltipPosition(editor, selection);
        if (!position) {
            editor.setDecorations(this.svgTooltipDecoration, []);
            return;
        }
        editor.setDecorations(this.svgTooltipDecoration, [
            {
                range: new vscode.Range(position, position),
                hoverMessage: [this.buildHideTooltipHoverMsg()],
            },
        ]);
    };
    return InlineTipManager;
}());
exports.InlineTipManager = InlineTipManager;
function setupInlineTips(context) {
    InlineTipManager.getInstance().setupInlineTips(context);
}
