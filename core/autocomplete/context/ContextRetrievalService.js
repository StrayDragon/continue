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
exports.ContextRetrievalService = void 0;
var types_1 = require("../snippets/types");
var ImportDefinitionsService_1 = require("./ImportDefinitionsService");
var ranking_1 = require("./ranking");
var RootPathContextService_1 = require("./root-path-context/RootPathContextService");
var StaticContextService_1 = require("./static-context/StaticContextService");
var ContextRetrievalService = /** @class */ (function () {
    function ContextRetrievalService(ide) {
        this.ide = ide;
        this.importDefinitionsService = new ImportDefinitionsService_1.ImportDefinitionsService(this.ide);
        this.rootPathContextService = new RootPathContextService_1.RootPathContextService(this.importDefinitionsService, this.ide);
        this.staticContextService = new StaticContextService_1.StaticContextService(this.ide);
    }
    ContextRetrievalService.prototype.getSnippetsFromImportDefinitions = function (helper) {
        return __awaiter(this, void 0, void 0, function () {
            var importSnippets, fileInfo, imports, textAroundCursor, symbols, _i, symbols_1, symbol, rifs, snippets;
            return __generator(this, function (_a) {
                if (helper.options.useImports === false) {
                    return [2 /*return*/, []];
                }
                importSnippets = [];
                fileInfo = this.importDefinitionsService.get(helper.filepath);
                if (fileInfo) {
                    imports = fileInfo.imports;
                    textAroundCursor = helper.fullPrefix.split("\n").slice(-5).join("\n") +
                        helper.fullSuffix.split("\n").slice(0, 3).join("\n");
                    symbols = Array.from((0, ranking_1.getSymbolsForSnippet)(textAroundCursor)).filter(function (symbol) { return !helper.lang.topLevelKeywords.includes(symbol); });
                    for (_i = 0, symbols_1 = symbols; _i < symbols_1.length; _i++) {
                        symbol = symbols_1[_i];
                        rifs = imports[symbol];
                        if (Array.isArray(rifs)) {
                            snippets = rifs.map(function (rif) {
                                return {
                                    filepath: rif.filepath,
                                    content: rif.contents,
                                    type: types_1.AutocompleteSnippetType.Code,
                                };
                            });
                            importSnippets.push.apply(importSnippets, snippets);
                        }
                    }
                }
                return [2 /*return*/, importSnippets];
            });
        });
    };
    ContextRetrievalService.prototype.getRootPathSnippets = function (helper) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!helper.treePath) {
                    return [2 /*return*/, []];
                }
                return [2 /*return*/, this.rootPathContextService.getContextForPath(helper.filepath, helper.treePath)];
            });
        });
    };
    ContextRetrievalService.prototype.getStaticContextSnippets = function (helper) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.staticContextService.getContext(helper)];
            });
        });
    };
    /**
     * Initialize the import definitions cache for a file.
     * This is normally done automatically when the active text editor changes,
     * but needs to be called manually when using context fetching outside the normal flow.
     */
    ContextRetrievalService.prototype.initializeForFile = function (filepath) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.importDefinitionsService.cache.initKey(filepath)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.warn("Failed to initialize import definitions cache for ".concat(filepath, ":"), e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return ContextRetrievalService;
}());
exports.ContextRetrievalService = ContextRetrievalService;
