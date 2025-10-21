"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.MercuryCoderProvider = void 0;
var constants_js_1 = require("../../llm/constants.js");
var constants_js_2 = require("../constants.js");
var mercuryCoderNextEdit_js_1 = require("../templating/mercuryCoderNextEdit.js");
var NextEditPromptEngine_js_1 = require("../templating/NextEditPromptEngine.js");
var BaseNextEditProvider_js_1 = require("./BaseNextEditProvider.js");
var MercuryCoderProvider = /** @class */ (function (_super) {
    __extends(MercuryCoderProvider, _super);
    function MercuryCoderProvider() {
        var _this = _super.call(this, constants_js_1.NEXT_EDIT_MODELS.MERCURY_CODER) || this;
        var template = NextEditPromptEngine_js_1.NEXT_EDIT_MODEL_TEMPLATES[constants_js_1.NEXT_EDIT_MODELS.MERCURY_CODER];
        _this.templateRenderer = new NextEditPromptEngine_js_1.PromptTemplateRenderer(template.template);
        return _this;
    }
    MercuryCoderProvider.prototype.getSystemPrompt = function () {
        return constants_js_2.MERCURY_SYSTEM_PROMPT;
    };
    MercuryCoderProvider.prototype.getWindowSize = function () {
        return { topMargin: 0, bottomMargin: 5 };
    };
    MercuryCoderProvider.prototype.shouldInjectUniqueToken = function () {
        return true;
    };
    MercuryCoderProvider.prototype.getUniqueToken = function () {
        return constants_js_2.UNIQUE_TOKEN;
    };
    MercuryCoderProvider.prototype.extractCompletion = function (message) {
        // Extract the code between the markdown code blocks.
        return message.slice(message.indexOf("```\n") + "```\n".length, message.lastIndexOf("\n\n```"));
    };
    MercuryCoderProvider.prototype.buildPromptContext = function (context) {
        var _a;
        return {
            recentlyViewedCodeSnippets: (_a = context.snippetPayload.recentlyVisitedRangesSnippets.map(function (snip) { return ({
                filepath: snip.filepath,
                content: snip.content,
            }); })) !== null && _a !== void 0 ? _a : [],
            currentFileContent: context.helper.fileContents,
            editableRegionStartLine: context.editableRegionStartLine,
            editableRegionEndLine: context.editableRegionEndLine,
            editDiffHistory: context.diffContext,
            currentFilePath: context.helper.filepath,
        };
    };
    MercuryCoderProvider.prototype.generatePrompts = function (context) {
        return __awaiter(this, void 0, void 0, function () {
            var promptCtx, templateVars, userPromptContent;
            return __generator(this, function (_a) {
                promptCtx = this.buildPromptContext(context);
                templateVars = {
                    recentlyViewedCodeSnippets: (0, mercuryCoderNextEdit_js_1.recentlyViewedCodeSnippetsBlock)(promptCtx.recentlyViewedCodeSnippets),
                    currentFileContent: (0, mercuryCoderNextEdit_js_1.currentFileContentBlock)(promptCtx.currentFileContent, promptCtx.editableRegionStartLine, promptCtx.editableRegionEndLine, context.helper.pos),
                    editDiffHistory: (0, mercuryCoderNextEdit_js_1.editHistoryBlock)(promptCtx.editDiffHistory),
                    currentFilePath: promptCtx.currentFilePath,
                };
                userPromptContent = this.templateRenderer.render(templateVars);
                return [2 /*return*/, [
                        {
                            role: "system",
                            content: this.getSystemPrompt(),
                        },
                        {
                            role: "user",
                            content: userPromptContent,
                        },
                    ]];
            });
        });
    };
    MercuryCoderProvider.prototype.buildPromptMetadata = function (context) {
        var promptCtx = this.buildPromptContext(context);
        var templateVars = {
            recentlyViewedCodeSnippets: (0, mercuryCoderNextEdit_js_1.recentlyViewedCodeSnippetsBlock)(promptCtx.recentlyViewedCodeSnippets),
            currentFileContent: (0, mercuryCoderNextEdit_js_1.currentFileContentBlock)(promptCtx.currentFileContent, promptCtx.editableRegionStartLine, promptCtx.editableRegionEndLine, context.helper.pos),
            editDiffHistory: (0, mercuryCoderNextEdit_js_1.editHistoryBlock)(promptCtx.editDiffHistory),
            currentFilePath: promptCtx.currentFilePath,
        };
        var userPromptContent = this.templateRenderer.render(templateVars);
        return {
            prompt: {
                role: "user",
                content: userPromptContent,
            },
            userEdits: promptCtx.editDiffHistory.join("\n"),
            userExcerpts: templateVars.currentFileContent,
        };
    };
    MercuryCoderProvider.prototype.calculateEditableRegion = function (helper, usingFullFileDiff) {
        if (usingFullFileDiff) {
            return this.calculateOptimalEditableRegion(helper, 512, "tokenizer");
        }
        else {
            var _a = this.getWindowSize(), topMargin = _a.topMargin, bottomMargin = _a.bottomMargin;
            return {
                editableRegionStartLine: Math.max(helper.pos.line - topMargin, 0),
                editableRegionEndLine: Math.min(helper.pos.line + bottomMargin, helper.fileLines.length - 1),
            };
        }
    };
    return MercuryCoderProvider;
}(BaseNextEditProvider_js_1.BaseNextEditModelProvider));
exports.MercuryCoderProvider = MercuryCoderProvider;
