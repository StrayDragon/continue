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
exports.getDefinitionsFromLsp = void 0;
exports.executeGotoProvider = executeGotoProvider;
exports.getDefinitionsForNode = getDefinitionsForNode;
exports.executeSignatureHelpProvider = executeSignatureHelpProvider;
exports.executeSymbolProvider = executeSymbolProvider;
var types_1 = require("core/autocomplete/snippets/types");
var ast_1 = require("core/autocomplete/util/ast");
var code_1 = require("core/indexing/chunk/code");
var ranges_1 = require("core/util/ranges");
var URI = require("uri-js");
var vscode = require("vscode");
function gotoInputKey(input) {
    return "".concat(input.name).concat(input.uri.toString()).concat(input.line).concat(input.character);
}
function signatureHelpKey(input) {
    return "".concat(input.name).concat(input.uri.toString()).concat(input.line).concat(input.character);
}
var MAX_CACHE_SIZE = 500;
var gotoCache = new Map();
var signatureHelpCache = new Map();
function executeGotoProvider(input) {
    return __awaiter(this, void 0, void 0, function () {
        var cacheKey, cached, definitions, results, oldestKey, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cacheKey = gotoInputKey(input);
                    cached = gotoCache.get(cacheKey);
                    if (cached) {
                        return [2 /*return*/, cached];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, vscode.commands.executeCommand(input.name, input.uri, new vscode.Position(input.line, input.character))];
                case 2:
                    definitions = (_a.sent());
                    results = definitions
                        .filter(function (d) { return (d.targetUri || d.uri) && (d.targetRange || d.range); })
                        .map(function (d) { return ({
                        filepath: (d.targetUri || d.uri).toString(),
                        range: d.targetRange || d.range,
                    }); });
                    // Add to cache
                    if (gotoCache.size >= MAX_CACHE_SIZE) {
                        oldestKey = gotoCache.keys().next().value;
                        if (oldestKey) {
                            gotoCache.delete(oldestKey);
                        }
                    }
                    gotoCache.set(cacheKey, results);
                    return [2 /*return*/, results];
                case 3:
                    e_1 = _a.sent();
                    console.warn("Error executing ".concat(input.name, ":"), e_1);
                    return [2 /*return*/, []];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function isRifWithContents(rif) {
    return typeof rif.contents === "string";
}
function findChildren(node, predicate, firstN) {
    var matchingNodes = [];
    if (firstN && firstN <= 0) {
        return [];
    }
    // Check if the current node's type is in the list of types we're interested in
    if (predicate(node)) {
        matchingNodes.push(node);
    }
    // Recursively search for matching types in all children of the current node
    for (var _i = 0, _a = node.children; _i < _a.length; _i++) {
        var child = _a[_i];
        matchingNodes = matchingNodes.concat(findChildren(child, predicate, firstN ? firstN - matchingNodes.length : undefined));
    }
    return matchingNodes;
}
function findTypeIdentifiers(node) {
    return findChildren(node, function (childNode) {
        var _a, _b;
        return childNode.type === "type_identifier" ||
            (["ERROR"].includes((_b = (_a = childNode.parent) === null || _a === void 0 ? void 0 : _a.type) !== null && _b !== void 0 ? _b : "") &&
                childNode.type === "identifier" &&
                childNode.text[0].toUpperCase() === childNode.text[0]);
    });
}
function crawlTypes(rif_1, ide_1) {
    return __awaiter(this, arguments, void 0, function (rif, ide, depth, results, searchedLabels) {
        var contents, _a, ast, astLineCount, identifierNodes, definitions, _i, identifierNodes_1, node, typeDef, contents_1, _loop_1, _b, definitions_1, definition, _c, _d, result;
        if (depth === void 0) { depth = 1; }
        if (results === void 0) { results = []; }
        if (searchedLabels === void 0) { searchedLabels = new Set(); }
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    if (!isRifWithContents(rif)) return [3 /*break*/, 1];
                    _a = rif.contents;
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, ide.readFile(rif.filepath)];
                case 2:
                    _a = _e.sent();
                    _e.label = 3;
                case 3:
                    contents = _a;
                    return [4 /*yield*/, (0, ast_1.getAst)(rif.filepath, contents)];
                case 4:
                    ast = _e.sent();
                    if (!ast) {
                        return [2 /*return*/, results];
                    }
                    astLineCount = ast.rootNode.text.split("\n").length;
                    identifierNodes = findTypeIdentifiers(ast.rootNode).filter(function (node) { return !searchedLabels.has(node.text); });
                    // Don't search for the same type definition more than once
                    // We deduplicate below to be sure, but this saves calls to the LSP
                    identifierNodes.forEach(function (node) { return searchedLabels.add(node.text); });
                    definitions = [];
                    _i = 0, identifierNodes_1 = identifierNodes;
                    _e.label = 5;
                case 5:
                    if (!(_i < identifierNodes_1.length)) return [3 /*break*/, 9];
                    node = identifierNodes_1[_i];
                    return [4 /*yield*/, executeGotoProvider({
                            uri: vscode.Uri.parse(rif.filepath),
                            // TODO: tree-sitter is zero-indexed, but there seems to be an off-by-one
                            // error at least with the .ts parser sometimes
                            line: rif.range.start.line +
                                Math.min(node.startPosition.row, astLineCount - 1),
                            character: rif.range.start.character + node.startPosition.column,
                            name: "vscode.executeDefinitionProvider",
                        })];
                case 6:
                    typeDef = (_e.sent())[0];
                    if (!typeDef) {
                        definitions.push(undefined);
                        return [3 /*break*/, 8];
                    }
                    return [4 /*yield*/, ide.readRangeInFile(typeDef.filepath, typeDef.range)];
                case 7:
                    contents_1 = _e.sent();
                    definitions.push(__assign(__assign({}, typeDef), { contents: contents_1 }));
                    _e.label = 8;
                case 8:
                    _i++;
                    return [3 /*break*/, 5];
                case 9:
                    _loop_1 = function (definition) {
                        if (!definition ||
                            results.some(function (result) {
                                return URI.equal(result.filepath, definition.filepath) &&
                                    (0, ranges_1.intersection)(result.range, definition.range) !== null;
                            })) {
                            return "continue";
                        }
                        results.push(definition);
                    };
                    // TODO: Filter out if not in our code?
                    // Filter out duplicates
                    for (_b = 0, definitions_1 = definitions; _b < definitions_1.length; _b++) {
                        definition = definitions_1[_b];
                        _loop_1(definition);
                    }
                    if (!(depth > 0)) return [3 /*break*/, 13];
                    _c = 0, _d = __spreadArray([], results, true);
                    _e.label = 10;
                case 10:
                    if (!(_c < _d.length)) return [3 /*break*/, 13];
                    result = _d[_c];
                    return [4 /*yield*/, crawlTypes(result, ide, depth - 1, results, searchedLabels)];
                case 11:
                    _e.sent();
                    _e.label = 12;
                case 12:
                    _c++;
                    return [3 /*break*/, 10];
                case 13: return [2 /*return*/, results];
            }
        });
    });
}
function getDefinitionsForNode(uri, node, ide, lang) {
    return __awaiter(this, void 0, void 0, function () {
        var ranges, _a, funDef, funcText, truncated, funRootAst, funNode, statementBlockNode, typeDefs, classNameNode, classDef, contents, definitions;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    ranges = [];
                    _a = node.type;
                    switch (_a) {
                        case "call_expression": return [3 /*break*/, 1];
                        case "variable_declarator": return [3 /*break*/, 7];
                        case "impl_item": return [3 /*break*/, 8];
                        case "new_expression": return [3 /*break*/, 9];
                        case "": return [3 /*break*/, 13];
                    }
                    return [3 /*break*/, 14];
                case 1: return [4 /*yield*/, executeGotoProvider({
                        uri: uri,
                        line: node.startPosition.row,
                        character: node.startPosition.column,
                        name: "vscode.executeDefinitionProvider",
                    })];
                case 2:
                    funDef = (_b.sent())[0];
                    if (!funDef) {
                        return [2 /*return*/, []];
                    }
                    return [4 /*yield*/, ide.readRangeInFile(funDef.filepath, funDef.range)];
                case 3:
                    funcText = _b.sent();
                    if (!(funcText.split("\n").length > 15)) return [3 /*break*/, 5];
                    truncated = false;
                    return [4 /*yield*/, (0, ast_1.getAst)(funDef.filepath, funcText)];
                case 4:
                    funRootAst = _b.sent();
                    if (funRootAst) {
                        funNode = findChildren(funRootAst === null || funRootAst === void 0 ? void 0 : funRootAst.rootNode, function (node) { return code_1.FUNCTION_DECLARATION_NODE_TYPEs.includes(node.type); }, 1)[0];
                        if (funNode) {
                            statementBlockNode = findChildren(funNode, function (node) { return code_1.FUNCTION_BLOCK_NODE_TYPES.includes(node.type); }, 1)[0];
                            if (statementBlockNode) {
                                funcText = funRootAst.rootNode.text
                                    .slice(0, statementBlockNode.startIndex)
                                    .trim();
                                truncated = true;
                            }
                        }
                    }
                    if (!truncated) {
                        funcText = funcText.split("\n")[0];
                    }
                    _b.label = 5;
                case 5:
                    ranges.push(funDef);
                    return [4 /*yield*/, crawlTypes(__assign(__assign({}, funDef), { contents: funcText }), ide)];
                case 6:
                    typeDefs = _b.sent();
                    ranges.push.apply(ranges, typeDefs);
                    return [3 /*break*/, 14];
                case 7: 
                // variable assignment -> variable definition/type
                // usages of the var that appear after the declaration
                return [3 /*break*/, 14];
                case 8: 
                // impl of trait -> trait definition
                return [3 /*break*/, 14];
                case 9:
                    classNameNode = node.children.find(function (child) { return child.type === "identifier"; });
                    return [4 /*yield*/, executeGotoProvider({
                            uri: uri,
                            line: (classNameNode !== null && classNameNode !== void 0 ? classNameNode : node).endPosition.row,
                            character: (classNameNode !== null && classNameNode !== void 0 ? classNameNode : node).endPosition.column,
                            name: "vscode.executeDefinitionProvider",
                        })];
                case 10:
                    classDef = (_b.sent())[0];
                    if (!classDef) {
                        return [3 /*break*/, 14];
                    }
                    return [4 /*yield*/, ide.readRangeInFile(classDef.filepath, classDef.range)];
                case 11:
                    contents = _b.sent();
                    ranges.push(__assign(__assign({}, classDef), { contents: "".concat((classNameNode === null || classNameNode === void 0 ? void 0 : classNameNode.text)
                            ? "".concat(lang.singleLineComment, " ").concat(classNameNode.text, ":\n")
                            : "").concat(contents.trim()) }));
                    return [4 /*yield*/, crawlTypes(__assign(__assign({}, classDef), { contents: contents }), ide)];
                case 12:
                    definitions = _b.sent();
                    ranges.push.apply(ranges, definitions.filter(Boolean));
                    return [3 /*break*/, 14];
                case 13: 
                // function definition -> implementations?
                return [3 /*break*/, 14];
                case 14: return [4 /*yield*/, Promise.all(ranges.map(function (rif) { return __awaiter(_this, void 0, void 0, function () {
                        var range, _a;
                        var _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    range = {
                                        start: {
                                            line: rif.range.start.line,
                                            character: rif.range.start.character,
                                        },
                                        end: {
                                            line: rif.range.end.line,
                                            character: rif.range.end.character,
                                        },
                                    };
                                    rif.range = range;
                                    if (!!isRifWithContents(rif)) return [3 /*break*/, 2];
                                    _a = [__assign({}, rif)];
                                    _b = {};
                                    return [4 /*yield*/, ide.readRangeInFile(rif.filepath, rif.range)];
                                case 1: return [2 /*return*/, __assign.apply(void 0, _a.concat([(_b.contents = _c.sent(), _b)]))];
                                case 2: return [2 /*return*/, rif];
                            }
                        });
                    }); }))];
                case 15: return [2 /*return*/, _b.sent()];
            }
        });
    });
}
/**
 * and other stuff not directly on the path:
 * - variables defined on line above
 * ...etc...
 */
var getDefinitionsFromLsp = function (filepath, contents, cursorIndex, ide, lang) { return __awaiter(void 0, void 0, void 0, function () {
    var ast, treePath, results, _i, _a, node, definitions, e_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 7, , 8]);
                return [4 /*yield*/, (0, ast_1.getAst)(filepath, contents)];
            case 1:
                ast = _b.sent();
                if (!ast) {
                    return [2 /*return*/, []];
                }
                return [4 /*yield*/, (0, ast_1.getTreePathAtCursor)(ast, cursorIndex)];
            case 2:
                treePath = _b.sent();
                if (!treePath) {
                    return [2 /*return*/, []];
                }
                results = [];
                _i = 0, _a = treePath.reverse();
                _b.label = 3;
            case 3:
                if (!(_i < _a.length)) return [3 /*break*/, 6];
                node = _a[_i];
                return [4 /*yield*/, getDefinitionsForNode(vscode.Uri.parse(filepath), node, ide, lang)];
            case 4:
                definitions = _b.sent();
                results.push.apply(results, definitions);
                _b.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 3];
            case 6: return [2 /*return*/, results.map(function (result) { return ({
                    filepath: result.filepath,
                    content: result.contents,
                    type: types_1.AutocompleteSnippetType.Code,
                }); })];
            case 7:
                e_2 = _b.sent();
                console.warn("Error getting definitions from LSP: ", e_2);
                return [2 /*return*/, []];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.getDefinitionsFromLsp = getDefinitionsFromLsp;
function executeSignatureHelpProvider(input) {
    return __awaiter(this, void 0, void 0, function () {
        var cacheKey, cached, definitions, oldestKey, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cacheKey = signatureHelpKey(input);
                    cached = signatureHelpCache.get(cacheKey);
                    if (cached) {
                        return [2 /*return*/, cached];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, vscode.commands.executeCommand(input.name, input.uri, new vscode.Position(input.line, input.character))];
                case 2:
                    definitions = (_a.sent());
                    // Add to cache
                    if (signatureHelpCache.size >= MAX_CACHE_SIZE) {
                        oldestKey = signatureHelpCache.keys().next().value;
                        if (oldestKey) {
                            signatureHelpCache.delete(oldestKey);
                        }
                    }
                    signatureHelpCache.set(cacheKey, definitions);
                    return [2 /*return*/, definitions];
                case 3:
                    e_3 = _a.sent();
                    console.warn("Error executing ".concat(input.name, ":"), e_3);
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function symbolInputKey(input) {
    return "".concat(input.name).concat(input.uri.toString());
}
var MAX_SYMBOL_CACHE_SIZE = 100;
var symbolCache = new Map();
function executeSymbolProvider(input) {
    return __awaiter(this, void 0, void 0, function () {
        var cacheKey, cached, symbols, results, oldestKey, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cacheKey = symbolInputKey(input);
                    cached = symbolCache.get(cacheKey);
                    if (cached) {
                        return [2 /*return*/, cached];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, vscode.commands.executeCommand(input.name, input.uri)];
                case 2:
                    symbols = (_a.sent());
                    results = [];
                    // Handle both possible return types from the symbol provider
                    if (symbols.length > 0) {
                        // if ("location" in symbols[0]) {
                        //   // SymbolInformation type
                        //   results.push(
                        //     ...symbols.map((s: vscode.SymbolInformation) => ({
                        //       filepath: s.location.uri.toString(),
                        //       range: s.location.range,
                        //     })),
                        //   );
                        // } else {
                        // DocumentSymbol type - collect symbols recursively
                        function collectSymbols(symbols, uri) {
                            var result = [];
                            for (var _i = 0, symbols_1 = symbols; _i < symbols_1.length; _i++) {
                                var symbol = symbols_1[_i];
                                result.push({
                                    name: symbol.name,
                                    range: symbol.range,
                                    selectionRange: symbol.selectionRange,
                                    kind: symbol.kind,
                                });
                                if (symbol.children && symbol.children.length > 0) {
                                    result.push.apply(result, collectSymbols(symbol.children, uri));
                                }
                            }
                            return result;
                        }
                        results.push.apply(results, collectSymbols(symbols, input.uri));
                        // }
                    }
                    // Add to cache
                    if (symbolCache.size >= MAX_SYMBOL_CACHE_SIZE) {
                        oldestKey = symbolCache.keys().next().value;
                        if (oldestKey) {
                            symbolCache.delete(oldestKey);
                        }
                    }
                    symbolCache.set(cacheKey, results);
                    return [2 /*return*/, results];
                case 3:
                    e_4 = _a.sent();
                    console.warn("Error executing ".concat(input.name, ":"), e_4);
                    return [2 /*return*/, []];
                case 4: return [2 /*return*/];
            }
        });
    });
}
