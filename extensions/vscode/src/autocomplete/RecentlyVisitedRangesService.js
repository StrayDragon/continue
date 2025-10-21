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
exports.RecentlyVisitedRangesService = void 0;
var types_1 = require("core/autocomplete/snippets/types");
var ignore_1 = require("core/indexing/ignore");
var posthog_1 = require("core/util/posthog");
var lru_cache_1 = require("lru-cache");
var vscode = require("vscode");
/**
 * Service to keep track of recently visited ranges in files.
 */
var RecentlyVisitedRangesService = /** @class */ (function () {
    function RecentlyVisitedRangesService(ide) {
        var _this = this;
        this.ide = ide;
        // Default value, we override in initWithPostHog
        this.numSurroundingLines = 20;
        this.maxRecentFiles = 3;
        this.maxSnippetsPerFile = 3;
        this.isEnabled = true;
        this.cacheCurrentSelectionContext = function (event) { return __awaiter(_this, void 0, void 0, function () {
            var fsPath, filepath, line, startLine, endLine, fileContents, lines, relevantLines, snippet, existing, newSnippets, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fsPath = event.textEditor.document.fileName;
                        if ((0, ignore_1.isSecurityConcern)(fsPath)) {
                            return [2 /*return*/];
                        }
                        filepath = event.textEditor.document.uri.toString();
                        line = event.selections[0].active.line;
                        startLine = Math.max(0, line - this.numSurroundingLines);
                        endLine = Math.min(line + this.numSurroundingLines, event.textEditor.document.lineCount - 1);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.ide.readFile(filepath)];
                    case 2:
                        fileContents = _a.sent();
                        lines = fileContents.split("\n");
                        relevantLines = lines
                            .slice(startLine, endLine + 1)
                            .join("\n")
                            .trim();
                        snippet = {
                            filepath: filepath,
                            content: relevantLines,
                            type: types_1.AutocompleteSnippetType.Code,
                            timestamp: Date.now(),
                        };
                        existing = this.cache.get(filepath) || [];
                        newSnippets = __spreadArray(__spreadArray([], existing, true), [snippet], false).sort(function (a, b) { return b.timestamp - a.timestamp; })
                            .slice(0, this.maxSnippetsPerFile);
                        this.cache.set(filepath, newSnippets);
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        console.error("Error caching recently visited ranges for autocomplete: ", err_1);
                        return [2 /*return*/];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.cache = new lru_cache_1.LRUCache({
            max: this.maxRecentFiles,
        });
        void this.initWithPostHog();
    }
    RecentlyVisitedRangesService.prototype.initWithPostHog = function () {
        return __awaiter(this, void 0, void 0, function () {
            var recentlyVisitedRangesNumSurroundingLines;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, posthog_1.Telemetry.getValueForFeatureFlag(posthog_1.PosthogFeatureFlag.RecentlyVisitedRangesNumSurroundingLines)];
                    case 1:
                        recentlyVisitedRangesNumSurroundingLines = _a.sent();
                        if (recentlyVisitedRangesNumSurroundingLines) {
                            this.isEnabled = true;
                            this.numSurroundingLines = recentlyVisitedRangesNumSurroundingLines;
                        }
                        vscode.window.onDidChangeTextEditorSelection(this.cacheCurrentSelectionContext);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Returns up to {@link maxSnippetsPerFile} snippets from the {@link maxRecentFiles} most recently visited files.
     * Excludes snippets from the currently active file.
     * @returns Array of code snippets from recently visited files
     */
    RecentlyVisitedRangesService.prototype.getSnippets = function () {
        var _a;
        if (!this.isEnabled) {
            return [];
        }
        var currentFilepath = (_a = vscode.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.document.uri.toString();
        var allSnippets = [];
        // Get most recent snippets from each file in cache
        for (var _i = 0, _b = Array.from(this.cache.keys()); _i < _b.length; _i++) {
            var filepath = _b[_i];
            var snippets = (this.cache.get(filepath) || [])
                .sort(function (a, b) { return b.timestamp - a.timestamp; })
                .slice(0, this.maxSnippetsPerFile);
            allSnippets = __spreadArray(__spreadArray([], allSnippets, true), snippets, true);
        }
        return allSnippets
            .filter(function (s) {
            return !currentFilepath ||
                (s.filepath !== currentFilepath &&
                    // Exclude Continue's own output as it makes it super-hard for users to test the autocomplete feature
                    // while looking at the prompts in the Continue's output
                    !s.filepath.startsWith("output:extension-output-Continue.continue"));
        })
            .sort(function (a, b) { return b.timestamp - a.timestamp; })
            .map(function (_a) {
            var timestamp = _a.timestamp, snippet = __rest(_a, ["timestamp"]);
            return snippet;
        });
    };
    return RecentlyVisitedRangesService;
}());
exports.RecentlyVisitedRangesService = RecentlyVisitedRangesService;
