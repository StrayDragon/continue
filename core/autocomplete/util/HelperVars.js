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
exports.HelperVars = void 0;
var countTokens_1 = require("../../llm/countTokens");
var AutocompleteLanguageInfo_1 = require("../constants/AutocompleteLanguageInfo");
var constructPrefixSuffix_1 = require("../templating/constructPrefixSuffix");
var ast_1 = require("./ast");
/**
 * A collection of variables that are often accessed throughout the autocomplete pipeline
 * It's noisy to re-calculate all the time or inject them into each function
 */
var HelperVars = /** @class */ (function () {
    function HelperVars(input, options, modelName, ide) {
        this.input = input;
        this.options = options;
        this.modelName = modelName;
        this.ide = ide;
        this.workspaceUris = [];
        this.lang = (0, AutocompleteLanguageInfo_1.languageForFilepath)(input.filepath);
    }
    HelperVars.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, fullPrefix, fullSuffix, _e, prunedPrefix, prunedSuffix, ast, _f, e_1;
            var _g;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        // Don't do anything if already initialized
                        if (this._fileContents !== undefined) {
                            return [2 /*return*/];
                        }
                        _a = this;
                        return [4 /*yield*/, this.ide.getWorkspaceDirs()];
                    case 1:
                        _a.workspaceUris = _h.sent();
                        _b = this;
                        if (!((_g = this.input.manuallyPassFileContents) !== null && _g !== void 0)) return [3 /*break*/, 2];
                        _c = _g;
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.ide.readFile(this.filepath)];
                    case 3:
                        _c = (_h.sent());
                        _h.label = 4;
                    case 4:
                        _b._fileContents = _c;
                        this._fileLines = this._fileContents.split("\n");
                        return [4 /*yield*/, (0, constructPrefixSuffix_1.constructInitialPrefixSuffix)(this.input, this.ide)];
                    case 5:
                        _d = _h.sent(), fullPrefix = _d.prefix, fullSuffix = _d.suffix;
                        this._fullPrefix = fullPrefix;
                        this._fullSuffix = fullSuffix;
                        _e = this.prunePrefixSuffix(), prunedPrefix = _e.prunedPrefix, prunedSuffix = _e.prunedSuffix;
                        this._prunedPrefix = prunedPrefix;
                        this._prunedSuffix = prunedSuffix;
                        _h.label = 6;
                    case 6:
                        _h.trys.push([6, 10, , 11]);
                        return [4 /*yield*/, (0, ast_1.getAst)(this.filepath, fullPrefix + fullSuffix)];
                    case 7:
                        ast = _h.sent();
                        if (!ast) return [3 /*break*/, 9];
                        _f = this;
                        return [4 /*yield*/, (0, ast_1.getTreePathAtCursor)(ast, fullPrefix.length)];
                    case 8:
                        _f.treePath = _h.sent();
                        _h.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        e_1 = _h.sent();
                        console.error("Failed to parse AST", e_1);
                        return [3 /*break*/, 11];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    HelperVars.create = function (input, options, modelName, ide) {
        return __awaiter(this, void 0, void 0, function () {
            var instance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        instance = new HelperVars(input, options, modelName, ide);
                        return [4 /*yield*/, instance.init()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, instance];
                }
            });
        });
    };
    HelperVars.prototype.prunePrefixSuffix = function () {
        // Construct basic prefix
        var maxPrefixTokens = this.options.maxPromptTokens * this.options.prefixPercentage;
        var prunedPrefix = (0, countTokens_1.pruneLinesFromTop)(this.fullPrefix, maxPrefixTokens, this.modelName);
        // Construct suffix
        var maxSuffixTokens = Math.min(this.options.maxPromptTokens - (0, countTokens_1.countTokens)(prunedPrefix, this.modelName), this.options.maxSuffixPercentage * this.options.maxPromptTokens);
        var prunedSuffix = (0, countTokens_1.pruneLinesFromBottom)(this.fullSuffix, maxSuffixTokens, this.modelName);
        return {
            prunedPrefix: prunedPrefix,
            prunedSuffix: prunedSuffix,
        };
    };
    Object.defineProperty(HelperVars.prototype, "filepath", {
        // Fast access
        get: function () {
            return this.input.filepath;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HelperVars.prototype, "pos", {
        get: function () {
            return this.input.pos;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HelperVars.prototype, "prunedCaretWindow", {
        get: function () {
            return this.prunedPrefix + this.prunedSuffix;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HelperVars.prototype, "fileContents", {
        // Getters for lazy access
        get: function () {
            if (this._fileContents === undefined) {
                throw new Error("HelperVars must be initialized before accessing fileContents");
            }
            return this._fileContents;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HelperVars.prototype, "fileLines", {
        get: function () {
            if (this._fileLines === undefined) {
                throw new Error("HelperVars must be initialized before accessing fileLines");
            }
            return this._fileLines;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HelperVars.prototype, "fullPrefix", {
        get: function () {
            if (this._fullPrefix === undefined) {
                throw new Error("HelperVars must be initialized before accessing fullPrefix");
            }
            return this._fullPrefix;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HelperVars.prototype, "fullSuffix", {
        get: function () {
            if (this._fullSuffix === undefined) {
                throw new Error("HelperVars must be initialized before accessing fullSuffix");
            }
            return this._fullSuffix;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HelperVars.prototype, "prunedPrefix", {
        get: function () {
            if (this._prunedPrefix === undefined) {
                throw new Error("HelperVars must be initialized before accessing prunedPrefix");
            }
            return this._prunedPrefix;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HelperVars.prototype, "prunedSuffix", {
        get: function () {
            if (this._prunedSuffix === undefined) {
                throw new Error("HelperVars must be initialized before accessing prunedSuffix");
            }
            return this._prunedSuffix;
        },
        enumerable: false,
        configurable: true
    });
    return HelperVars;
}());
exports.HelperVars = HelperVars;
