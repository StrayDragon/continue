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
exports.RootPathContextService = void 0;
var crypto_1 = require("crypto");
var lru_cache_1 = require("lru-cache");
var treeSitter_1 = require("../../../util/treeSitter");
var types_1 = require("../../snippets/types");
// function getSyntaxTreeString(
//   node: Parser.SyntaxNode,
//   indent: string = "",
// ): string {
//   let result = "";
//   const nodeInfo = `${node.type} [${node.startPosition.row}:${node.startPosition.column} - ${node.endPosition.row}:${node.endPosition.column}]`;
//   result += `${indent}${nodeInfo}\n`;
//   for (const child of node.children) {
//     result += getSyntaxTreeString(child, indent + "  ");
//   }
//   return result;
// }
var RootPathContextService = /** @class */ (function () {
    function RootPathContextService(importDefinitionsService, ide) {
        this.importDefinitionsService = importDefinitionsService;
        this.ide = ide;
        this.cache = new lru_cache_1.LRUCache({
            max: 100,
        });
    }
    RootPathContextService.getNodeId = function (node) {
        return "".concat(node.startIndex);
    };
    /**
     * Key comes from hash of parent key and node type and node id.
     */
    RootPathContextService.keyFromNode = function (parentKey, astNode) {
        return (0, crypto_1.createHash)("sha256")
            .update(parentKey)
            .update(astNode.type)
            .update(RootPathContextService.getNodeId(astNode))
            .digest("hex");
    };
    RootPathContextService.prototype.getSnippetsForNode = function (filepath, node) {
        return __awaiter(this, void 0, void 0, function () {
            var snippets, language, query, _a, queries;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        snippets = [];
                        language = (0, treeSitter_1.getFullLanguageName)(filepath);
                        _a = node.type;
                        switch (_a) {
                            case "program": return [3 /*break*/, 1];
                        }
                        return [3 /*break*/, 2];
                    case 1:
                        this.importDefinitionsService.get(filepath);
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, (0, treeSitter_1.getQueryForFile)(filepath, "root-path-context-queries/".concat(language, "/").concat(node.type, ".scm"))];
                    case 3:
                        // const type = node.type;
                        // console.log(getSyntaxTreeString(node));
                        query = _b.sent();
                        return [3 /*break*/, 4];
                    case 4:
                        if (!query) {
                            return [2 /*return*/, snippets];
                        }
                        queries = query.matches(node).map(function (match) { return __awaiter(_this, void 0, void 0, function () {
                            var _i, _a, item, endPosition, newSnippets, e_1;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _i = 0, _a = match.captures;
                                        _b.label = 1;
                                    case 1:
                                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                                        item = _a[_i];
                                        _b.label = 2;
                                    case 2:
                                        _b.trys.push([2, 4, , 5]);
                                        endPosition = item.node.endPosition;
                                        return [4 /*yield*/, this.getSnippets(filepath, endPosition, language)];
                                    case 3:
                                        newSnippets = _b.sent();
                                        snippets.push.apply(snippets, newSnippets);
                                        return [3 /*break*/, 5];
                                    case 4:
                                        e_1 = _b.sent();
                                        throw e_1;
                                    case 5:
                                        _i++;
                                        return [3 /*break*/, 1];
                                    case 6: return [2 /*return*/];
                                }
                            });
                        }); });
                        return [4 /*yield*/, Promise.all(queries)];
                    case 5:
                        _b.sent();
                        return [2 /*return*/, snippets];
                }
            });
        });
    };
    RootPathContextService.prototype.getSnippets = function (filepath, endPosition, language) {
        return __awaiter(this, void 0, void 0, function () {
            var definitions, newSnippets;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ide.gotoDefinition({
                            filepath: filepath,
                            position: {
                                line: endPosition.row,
                                character: endPosition.column,
                            },
                        })];
                    case 1:
                        definitions = _a.sent();
                        return [4 /*yield*/, Promise.all(definitions
                                .filter(function (definition) {
                                var _a;
                                var isIgnoredPath = (_a = treeSitter_1.IGNORE_PATH_PATTERNS[language]) === null || _a === void 0 ? void 0 : _a.some(function (pattern) { return pattern.test(definition.filepath); });
                                return !isIgnoredPath;
                            })
                                .map(function (def) { return __awaiter(_this, void 0, void 0, function () {
                                var _a;
                                var _b;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0:
                                            _a = [__assign({}, def)];
                                            _b = {};
                                            return [4 /*yield*/, this.ide.readRangeInFile(def.filepath, def.range)];
                                        case 1: return [2 /*return*/, (__assign.apply(void 0, _a.concat([(_b.contents = _c.sent(), _b)])))];
                                    }
                                });
                            }); }))];
                    case 2:
                        newSnippets = _a.sent();
                        return [2 /*return*/, newSnippets];
                }
            });
        });
    };
    RootPathContextService.prototype.getContextForPath = function (filepath, astPath) {
        return __awaiter(this, void 0, void 0, function () {
            var snippets, parentKey, _i, _a, astNode, key, foundInCache, newSnippets, _b, formattedSnippets;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        snippets = [];
                        parentKey = filepath;
                        _i = 0, _a = astPath.filter(function (node) {
                            return RootPathContextService.TYPES_TO_USE.has(node.type);
                        });
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        astNode = _a[_i];
                        key = RootPathContextService.keyFromNode(parentKey, astNode);
                        foundInCache = this.cache.get(key);
                        if (!(foundInCache !== null && foundInCache !== void 0)) return [3 /*break*/, 2];
                        _b = foundInCache;
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.getSnippetsForNode(filepath, astNode)];
                    case 3:
                        _b = (_c.sent());
                        _c.label = 4;
                    case 4:
                        newSnippets = _b;
                        formattedSnippets = newSnippets.map(function (item) { return ({
                            filepath: item.filepath,
                            content: item.contents,
                            type: types_1.AutocompleteSnippetType.Code,
                        }); });
                        snippets.push.apply(snippets, formattedSnippets);
                        if (!foundInCache) {
                            this.cache.set(key, newSnippets);
                        }
                        parentKey = key;
                        _c.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6: return [2 /*return*/, snippets];
                }
            });
        });
    };
    RootPathContextService.TYPES_TO_USE = new Set([
        "arrow_function",
        "generator_function_declaration",
        "program",
        "function_declaration",
        "function_definition",
        "method_definition",
        "method_declaration",
        "class_declaration",
        "class_definition",
    ]);
    return RootPathContextService;
}());
exports.RootPathContextService = RootPathContextService;
