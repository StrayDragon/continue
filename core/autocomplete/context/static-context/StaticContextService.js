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
exports.StaticContextService = void 0;
var fs = require("fs/promises");
var path_1 = require("path");
var url_1 = require("url");
var pathToUri_1 = require("../../../util/pathToUri");
var treeSitter_1 = require("../../../util/treeSitter");
var types_1 = require("../../snippets/types");
var ast_1 = require("../../util/ast");
var tree_sitter_utils_1 = require("./tree-sitter-utils");
var StaticContextService = /** @class */ (function () {
    function StaticContextService(ide) {
        this.insertAtPosition = function (contents, cursorPosition, insertText) {
            var lines = contents.split(/\r?\n/); // Handle both LF and CRLF line endings
            var line = cursorPosition.line, character = cursorPosition.character;
            if (line < 0 || line >= lines.length) {
                throw new Error("Invalid line number");
            }
            var targetLine = lines[line];
            if (character < 0 || character > targetLine.length) {
                throw new Error("Invalid character index");
            }
            // Insert the text
            lines[line] =
                targetLine.slice(0, character) + insertText + targetLine.slice(character);
            return lines.join("\n"); // Reconstruct the file
        };
        this.ide = ide;
    }
    StaticContextService.prototype.logAutocompleteStaticSnippet = function (ctx, label) {
        if (label === void 0) { label = "Static Snippet"; }
        console.log("=== ".concat(label, " ==="));
        console.log("Hole Type:", ctx.holeType);
        console.log("\nRelevant Types (".concat(ctx.relevantTypes.size, " files):"));
        ctx.relevantTypes.forEach(function (types, filepath) {
            console.log("  \uD83D\uDCC1 ".concat(filepath));
            types.forEach(function (type) { return console.log("    \u2022 ".concat(type)); });
        });
        console.log("\nRelevant Headers (".concat(ctx.relevantHeaders.size, " files):"));
        ctx.relevantHeaders.forEach(function (headers, filepath) {
            console.log("  \uD83D\uDCC1 ".concat(filepath));
            headers.forEach(function (header) { return console.log("    \u2022 ".concat(header)); });
        });
    };
    StaticContextService.formatAutocompleteStaticSnippet = function (ctx) {
        var output = "AutocompleteStaticSnippet:\n";
        output += "  holeType: ".concat(ctx.holeType, "\n");
        output += "  relevantTypes:\n";
        if (ctx.relevantTypes.size === 0) {
            output += "    (none)\n";
        }
        else {
            ctx.relevantTypes.forEach(function (types, filepath) {
                output += "    ".concat(filepath, ": [").concat(types.join(", "), "]\n");
            });
        }
        output += "  relevantHeaders:\n";
        if (ctx.relevantHeaders.size === 0) {
            output += "    (none)\n";
        }
        else {
            ctx.relevantHeaders.forEach(function (headers, filepath) {
                output += "    ".concat(filepath, ": [").concat(headers.join(", "), "]\n");
            });
        }
        return output;
    };
    StaticContextService.prototype.getContext = function (helper) {
        return __awaiter(this, void 0, void 0, function () {
            var start, tsFiles, holeContext, relevantTypes, relevantHeaders, relevantTypesToReturn, relevantHeadersToReturn, ctx, end, snippets, _i, _a, _b, filepath, typs, _c, _d, _e, filepath, headers;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        start = Date.now();
                        return [4 /*yield*/, this.getTypeScriptFilesFromWorkspaces(helper.workspaceUris)];
                    case 1:
                        tsFiles = _f.sent();
                        return [4 /*yield*/, this.getHoleContext(helper.fileContents, helper.filepath, helper.pos)];
                    case 2:
                        holeContext = _f.sent();
                        return [4 /*yield*/, this.extractRelevantTypes(holeContext.fullHoverResult, holeContext.functionName, holeContext.range.start.line, holeContext.source, new Map())];
                    case 3:
                        relevantTypes = _f.sent();
                        return [4 /*yield*/, this.extractRelevantHeaders(tsFiles, relevantTypes, holeContext.functionTypeSpan, helper.pos, holeContext.returnTypeIsAny)];
                    case 4:
                        relevantHeaders = _f.sent();
                        relevantTypesToReturn = new Map();
                        relevantTypes.forEach(function (_a, _) {
                            var v = _a.typeSpan, src = _a.sourceFile;
                            if (relevantTypesToReturn.has(src)) {
                                var updated = relevantTypesToReturn.get(src);
                                updated.push(v);
                                relevantTypesToReturn.set(src, updated);
                            }
                            else {
                                relevantTypesToReturn.set(src, [v]);
                            }
                        });
                        relevantHeadersToReturn = new Map();
                        relevantHeaders.forEach(function (_a) {
                            var v = _a.typeSpan, src = _a.sourceFile;
                            if (relevantHeadersToReturn.has(src)) {
                                var updated = relevantHeadersToReturn.get(src);
                                if (!updated.includes(v)) {
                                    updated.push(v);
                                }
                                relevantHeadersToReturn.set(src, updated);
                            }
                            else {
                                relevantHeadersToReturn.set(src, [v]);
                            }
                        });
                        ctx = {
                            holeType: holeContext.functionTypeSpan,
                            relevantTypes: relevantTypesToReturn,
                            relevantHeaders: relevantHeadersToReturn,
                        };
                        end = Date.now();
                        this.logAutocompleteStaticSnippet(ctx);
                        snippets = [];
                        snippets.push({
                            type: types_1.AutocompleteSnippetType.Static,
                            filepath: (0, url_1.pathToFileURL)(path_1.default.resolve(holeContext.source)).toString(),
                            content: holeContext.fullHoverResult,
                        });
                        for (_i = 0, _a = ctx.relevantTypes.entries(); _i < _a.length; _i++) {
                            _b = _a[_i], filepath = _b[0], typs = _b[1];
                            snippets.push({
                                type: types_1.AutocompleteSnippetType.Static,
                                filepath: (0, url_1.pathToFileURL)(path_1.default.resolve(filepath)).toString(),
                                content: typs.join("\n"),
                            });
                        }
                        for (_c = 0, _d = ctx.relevantHeaders.entries(); _c < _d.length; _c++) {
                            _e = _d[_c], filepath = _e[0], headers = _e[1];
                            snippets.push({
                                type: types_1.AutocompleteSnippetType.Static,
                                filepath: (0, url_1.pathToFileURL)(path_1.default.resolve(filepath)).toString(),
                                content: headers.join("\n"),
                            });
                        }
                        return [2 /*return*/, snippets];
                }
            });
        });
    };
    StaticContextService.prototype.getHoleContext = function (sketchFileContent, sketchFilePath, cursorPosition) {
        return __awaiter(this, void 0, void 0, function () {
            var injectedContent, ast, language, query, captures, res, paramsTypes, _i, captures_1, c, name_1, node;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // We need to inject the hole @ to trigger a treesitter error node.
                        sketchFilePath = (0, pathToUri_1.localPathOrUriToPath)(sketchFilePath);
                        injectedContent = this.insertAtPosition(sketchFileContent, cursorPosition, "@;");
                        return [4 /*yield*/, (0, ast_1.getAst)(sketchFilePath, injectedContent)];
                    case 1:
                        ast = _a.sent();
                        if (!ast) {
                            throw new Error("failed to get ast");
                        }
                        language = (0, treeSitter_1.getFullLanguageName)(sketchFilePath);
                        return [4 /*yield*/, (0, treeSitter_1.getQueryForFile)(sketchFilePath, "static-context-queries/hole-queries/".concat(language, ".scm"))];
                    case 2:
                        query = _a.sent();
                        if (!query) {
                            throw new Error("getHoleContext: failed to get query for file ".concat(sketchFilePath, " and language ").concat(language));
                        }
                        captures = query.captures(ast.rootNode);
                        res = {
                            fullHoverResult: "",
                            functionName: "",
                            functionTypeSpan: "",
                            returnTypeIsAny: false,
                            range: {
                                start: { line: 0, character: 0 },
                                end: { line: 0, character: 0 },
                            },
                            source: "file://".concat(sketchFilePath),
                        };
                        paramsTypes = "";
                        for (_i = 0, captures_1 = captures; _i < captures_1.length; _i++) {
                            c = captures_1[_i];
                            name_1 = c.name, node = c.node;
                            // console.log(`${name} →`, node.text, node.startPosition, node.endPosition);
                            switch (name_1) {
                                case "function.decl": {
                                    res.fullHoverResult = node.text;
                                    break;
                                }
                                case "function.name": {
                                    res.functionName = node.text;
                                    break;
                                }
                                case "function.params": {
                                    paramsTypes = node.text;
                                    res.range = {
                                        start: {
                                            line: node.startPosition.row,
                                            character: node.startPosition.column,
                                        },
                                        end: {
                                            line: node.endPosition.row,
                                            character: node.endPosition.column,
                                        },
                                    };
                                    break;
                                }
                                case "function.type": {
                                    res.functionTypeSpan = node.text;
                                    res.range = {
                                        start: {
                                            line: node.startPosition.row,
                                            character: node.startPosition.column,
                                        },
                                        end: {
                                            line: node.endPosition.row,
                                            character: node.endPosition.column,
                                        },
                                    };
                                    break;
                                }
                            }
                        }
                        if (res.functionTypeSpan === "") {
                            res.functionTypeSpan = "".concat(paramsTypes, " => any");
                            res.returnTypeIsAny = true;
                        }
                        return [2 /*return*/, res];
                }
            });
        });
    };
    StaticContextService.prototype.extractRelevantTypes = function (declText, typeName, startLine, currentFile, foundContents) {
        return __awaiter(this, void 0, void 0, function () {
            var foundSoFar;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        foundSoFar = new Map();
                        return [4 /*yield*/, this.extractRelevantTypesHelper(declText, typeName, startLine, foundSoFar, currentFile, foundContents)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, foundSoFar];
                }
            });
        });
    };
    StaticContextService.prototype.extractRelevantTypesHelper = function (declText, typeName, startLine, foundSoFar, // identifier -> [full hover result, source]
    currentFile, foundContents) {
        return __awaiter(this, void 0, void 0, function () {
            var ast, language, query, identifiers, _i, identifiers_1, _a, name_2, node, typeDefinitionResult, tdLocation, content, ast_2, decl, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!foundSoFar.has(typeName)) return [3 /*break*/, 15];
                        return [4 /*yield*/, (0, ast_1.getAst)(currentFile, declText)];
                    case 1:
                        ast = _b.sent();
                        if (!ast) {
                            throw new Error("failed to get ast for file ".concat(currentFile));
                        }
                        foundSoFar.set(typeName, {
                            typeSpan: declText,
                            sourceFile: currentFile.slice(7),
                            ast: ast,
                        });
                        language = (0, treeSitter_1.getFullLanguageName)(currentFile);
                        return [4 /*yield*/, (0, treeSitter_1.getQueryForFile)(currentFile, "static-context-queries/relevant-types-queries/".concat(language, "-extract-identifiers.scm"))];
                    case 2:
                        query = _b.sent();
                        if (!query) {
                            throw new Error("failed to get query for file ".concat(currentFile, " and language ").concat(language));
                        }
                        identifiers = query.captures(ast.rootNode);
                        _i = 0, identifiers_1 = identifiers;
                        _b.label = 3;
                    case 3:
                        if (!(_i < identifiers_1.length)) return [3 /*break*/, 15];
                        _a = identifiers_1[_i], name_2 = _a.name, node = _a.node;
                        if (foundSoFar.has(node.text))
                            return [3 /*break*/, 14];
                        _b.label = 4;
                    case 4:
                        _b.trys.push([4, 13, , 14]);
                        return [4 /*yield*/, this.ide.gotoTypeDefinition({
                                filepath: currentFile,
                                position: {
                                    character: node.startPosition.column,
                                    line: startLine + node.startPosition.row,
                                },
                            })];
                    case 5:
                        typeDefinitionResult = _b.sent();
                        if (!(typeDefinitionResult.length > 0)) return [3 /*break*/, 12];
                        tdLocation = typeDefinitionResult[0];
                        content = "";
                        if (!foundContents.has(tdLocation.filepath)) return [3 /*break*/, 6];
                        content = foundContents.get(tdLocation.filepath);
                        return [3 /*break*/, 8];
                    case 6: return [4 /*yield*/, fs.readFile((0, pathToUri_1.localPathOrUriToPath)(tdLocation.filepath), "utf8")];
                    case 7:
                        content = _b.sent();
                        foundContents.set(tdLocation.filepath, content);
                        _b.label = 8;
                    case 8: return [4 /*yield*/, (0, ast_1.getAst)(tdLocation.filepath, content)];
                    case 9:
                        ast_2 = _b.sent();
                        if (!ast_2) {
                            throw new Error("failed to get ast for file ".concat(tdLocation.filepath));
                        }
                        decl = (0, tree_sitter_utils_1.findEnclosingTypeDeclaration)(content, tdLocation.range.start.line, tdLocation.range.start.character, ast_2);
                        if (!decl) {
                            // throw new Error(`failed to get decl for file ${tdLocation.uri}`);
                            console.error("failed to get decl for file ".concat(tdLocation.filepath));
                        }
                        if (!decl) return [3 /*break*/, 11];
                        return [4 /*yield*/, this.extractRelevantTypesHelper(decl.fullText, node.text, tdLocation.range.start.line, foundSoFar, tdLocation.filepath, foundContents)];
                    case 10:
                        _b.sent();
                        return [3 /*break*/, 11];
                    case 11: return [3 /*break*/, 12];
                    case 12: return [3 /*break*/, 14];
                    case 13:
                        err_1 = _b.sent();
                        console.log(err_1);
                        return [3 /*break*/, 14];
                    case 14:
                        _i++;
                        return [3 /*break*/, 3];
                    case 15: return [2 /*return*/];
                }
            });
        });
    };
    StaticContextService.prototype.extractRelevantHeaders = function (sources, relevantTypes, holeType, cursorPosition, returnTypeIsAny) {
        return __awaiter(this, void 0, void 0, function () {
            // TODO: This only works for TypeScript.
            function convertToArrowType(signature) {
                // Handle various function declaration formats.
                var patterns = [
                    // Standard: functionName(params): returnType.
                    /^(\w+)\s*\((.*?)\)\s*:\s*(.+)$/,
                    // With generics: functionName<T>(params): returnType.
                    /^(\w+)\s*<[^>]*>\s*\((.*?)\)\s*:\s*(.+)$/,
                    // With modifiers: export function functionName(params): returnType.
                    /^(?:export\s+)?(?:function\s+)?(\w+)\s*\((.*?)\)\s*:\s*(.+)$/,
                ];
                for (var _i = 0, patterns_1 = patterns; _i < patterns_1.length; _i++) {
                    var pattern = patterns_1[_i];
                    var match = signature.match(pattern);
                    if (match) {
                        var parameters = match[2], returnType = match[3];
                        return "(".concat(parameters, ") => ").concat(returnType);
                    }
                }
                return signature;
            }
            var relevantContext, relevantContextMap, foundNormalForms, targetTypes, _i, sources_1, source, topLevelDecls, _a, topLevelDecls_1, tld, originalDeclText, funcType, err_2, sigHelp, wrapped, ast, alias, valueNode, baseNode, varTypNode, _b, _c, v;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        relevantContext = new Set();
                        if (returnTypeIsAny)
                            return [2 /*return*/, relevantContext];
                        relevantContextMap = new Map();
                        foundNormalForms = new Map();
                        return [4 /*yield*/, this.generateTargetTypes(relevantTypes, holeType)];
                    case 1:
                        targetTypes = _d.sent();
                        _i = 0, sources_1 = sources;
                        _d.label = 2;
                    case 2:
                        if (!(_i < sources_1.length)) return [3 /*break*/, 15];
                        source = sources_1[_i];
                        return [4 /*yield*/, (0, tree_sitter_utils_1.extractTopLevelDecls)(source)];
                    case 3:
                        topLevelDecls = _d.sent();
                        _a = 0, topLevelDecls_1 = topLevelDecls;
                        _d.label = 4;
                    case 4:
                        if (!(_a < topLevelDecls_1.length)) return [3 /*break*/, 14];
                        tld = topLevelDecls_1[_a];
                        originalDeclText = tld.pattern === 2
                            ? tld.captures.find(function (d) { return d.name === "top.fn.decl"; }).node.text
                            : tld.captures.find(function (d) { return d.name === "top.var.decl"; }).node.text;
                        if (!(tld.pattern === 2)) return [3 /*break*/, 11];
                        funcType = "";
                        _d.label = 5;
                    case 5:
                        _d.trys.push([5, 6, , 8]);
                        funcType = (0, tree_sitter_utils_1.extractFunctionTypeFromDecl)(tld);
                        return [3 /*break*/, 8];
                    case 6:
                        err_2 = _d.sent();
                        return [4 /*yield*/, this.ide.getSignatureHelp({
                                filepath: source,
                                position: cursorPosition,
                            })];
                    case 7:
                        sigHelp = _d.sent();
                        if (!sigHelp)
                            return [3 /*break*/, 13];
                        funcType = sigHelp.signatures[0].label;
                        funcType = convertToArrowType(funcType);
                        return [3 /*break*/, 8];
                    case 8:
                        wrapped = "type __TMP = ".concat(funcType, ";");
                        return [4 /*yield*/, (0, ast_1.getAst)("file.ts", wrapped)];
                    case 9:
                        ast = _d.sent();
                        if (!ast) {
                            throw new Error("failed to generate ast for ".concat(wrapped));
                        }
                        alias = ast.rootNode.namedChild(0);
                        // console.log(alias);
                        if (!alias || alias.type !== "type_alias_declaration") {
                            throw new Error("extractRelevantHeaders: Failed to parse type alias");
                        }
                        valueNode = alias.childForFieldName("value");
                        if (!valueNode)
                            throw new Error("No type value found");
                        baseNode = (0, tree_sitter_utils_1.unwrapToBaseType)(valueNode);
                        return [4 /*yield*/, this.extractRelevantHeadersHelper(originalDeclText, baseNode, targetTypes, relevantTypes, relevantContext, relevantContextMap, foundNormalForms, source)];
                    case 10:
                        _d.sent();
                        return [3 /*break*/, 13];
                    case 11:
                        varTypNode = tld.captures.find(function (d) { return d.name === "top.var.type"; }).node;
                        return [4 /*yield*/, this.extractRelevantHeadersHelper(originalDeclText, varTypNode, targetTypes, relevantTypes, relevantContext, relevantContextMap, foundNormalForms, source)];
                    case 12:
                        _d.sent();
                        _d.label = 13;
                    case 13:
                        _a++;
                        return [3 /*break*/, 4];
                    case 14:
                        _i++;
                        return [3 /*break*/, 2];
                    case 15:
                        for (_b = 0, _c = relevantContextMap.values(); _b < _c.length; _b++) {
                            v = _c[_b];
                            relevantContext.add(v);
                        }
                        return [2 /*return*/, relevantContext];
                }
            });
        });
    };
    StaticContextService.prototype.extractRelevantHeadersHelper = function (originalDeclText, node, targetTypes, relevantTypes, relevantContext, relevantContextMap, foundNormalForms, source) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, targetTypes_1, typ, ctx, retTypeNode, _a, _b, c;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _i = 0, targetTypes_1 = targetTypes;
                        _c.label = 1;
                    case 1:
                        if (!(_i < targetTypes_1.length)) return [3 /*break*/, 10];
                        typ = targetTypes_1[_i];
                        return [4 /*yield*/, this.isTypeEquivalent(node, typ, relevantTypes, foundNormalForms)];
                    case 2:
                        if (_c.sent()) {
                            ctx = { typeSpan: originalDeclText, sourceFile: source };
                            relevantContextMap.set(JSON.stringify(ctx), ctx);
                        }
                        if (!(node.type === "function_type")) return [3 /*break*/, 5];
                        retTypeNode = node.namedChildren.find(function (c) { return c && c.type === "return_type"; });
                        if (!retTypeNode) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.extractRelevantHeadersHelper(originalDeclText, retTypeNode, targetTypes, relevantTypes, relevantContext, relevantContextMap, foundNormalForms, source)];
                    case 3:
                        _c.sent();
                        _c.label = 4;
                    case 4: return [3 /*break*/, 9];
                    case 5:
                        if (!(node.type === "tuple_type")) return [3 /*break*/, 9];
                        _a = 0, _b = node.namedChildren;
                        _c.label = 6;
                    case 6:
                        if (!(_a < _b.length)) return [3 /*break*/, 9];
                        c = _b[_a];
                        return [4 /*yield*/, this.extractRelevantHeadersHelper(originalDeclText, c, targetTypes, relevantTypes, relevantContext, relevantContextMap, foundNormalForms, source)];
                    case 7:
                        _c.sent();
                        _c.label = 8;
                    case 8:
                        _a++;
                        return [3 /*break*/, 6];
                    case 9:
                        _i++;
                        return [3 /*break*/, 1];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    StaticContextService.prototype.generateTargetTypes = function (relevantTypes, holeType) {
        return __awaiter(this, void 0, void 0, function () {
            var targetTypes, ast, alias, valueNode, baseNode;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        targetTypes = new Set();
                        return [4 /*yield*/, (0, ast_1.getAst)("file.ts", "type T = ".concat(holeType, ";"))];
                    case 1:
                        ast = _a.sent();
                        if (!ast) {
                            throw new Error("failed to generate ast for ".concat(holeType));
                        }
                        alias = ast.rootNode.namedChild(0);
                        if (!alias || alias.type !== "type_alias_declaration") {
                            throw new Error("generateTargetTypes: Failed to parse type alias");
                        }
                        valueNode = alias.childForFieldName("value");
                        if (!valueNode)
                            throw new Error("No type value found");
                        baseNode = (0, tree_sitter_utils_1.unwrapToBaseType)(valueNode);
                        targetTypes.add(baseNode);
                        return [4 /*yield*/, this.generateTargetTypesHelper(relevantTypes, holeType, targetTypes, baseNode)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, targetTypes];
                }
            });
        });
    };
    StaticContextService.prototype.generateTargetTypesHelper = function (relevantTypes, currType, targetTypes, node) {
        return __awaiter(this, void 0, void 0, function () {
            var returnType, _i, _a, child, typeSpan, ast, alias, valueNode, baseNode;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!node)
                            return [2 /*return*/];
                        if (!(node.type === "function_type")) return [3 /*break*/, 2];
                        returnType = node.childForFieldName("return_type");
                        if (!returnType) return [3 /*break*/, 2];
                        targetTypes.add(returnType);
                        return [4 /*yield*/, this.generateTargetTypesHelper(relevantTypes, currType, targetTypes, returnType)];
                    case 1:
                        _c.sent();
                        _c.label = 2;
                    case 2:
                        if (!(node.type === "tuple_type")) return [3 /*break*/, 6];
                        _i = 0, _a = node.namedChildren;
                        _c.label = 3;
                    case 3:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        child = _a[_i];
                        if (!child) return [3 /*break*/, 5];
                        targetTypes.add(child);
                        return [4 /*yield*/, this.generateTargetTypesHelper(relevantTypes, currType, targetTypes, child)];
                    case 4:
                        _c.sent();
                        _c.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6:
                        if (!relevantTypes.has(node.text)) return [3 /*break*/, 9];
                        typeSpan = (_b = relevantTypes.get(node.text)) === null || _b === void 0 ? void 0 : _b.typeSpan;
                        return [4 /*yield*/, (0, ast_1.getAst)("file.ts", typeSpan)];
                    case 7:
                        ast = _c.sent();
                        if (!ast) {
                            throw new Error("failed to generate ast for ".concat(typeSpan));
                        }
                        alias = ast.rootNode.namedChild(0);
                        if (!alias || alias.type !== "type_alias_declaration") {
                            console.error("generateTargetTypesHelper: Failed to parse type alias");
                            return [2 /*return*/];
                            // throw new Error(
                            //   "generateTargetTypesHelper: Failed to parse type alias",
                            // );
                        }
                        valueNode = alias.childForFieldName("value");
                        if (!valueNode)
                            throw new Error("No type value found");
                        baseNode = (0, tree_sitter_utils_1.unwrapToBaseType)(valueNode);
                        return [4 /*yield*/, this.generateTargetTypesHelper(relevantTypes, currType, targetTypes, baseNode)];
                    case 8:
                        _c.sent();
                        _c.label = 9;
                    case 9: 
                    // if (node.type === "type_identifier" || node.type === "predefined_type") {
                    //   return [node.text];
                    // }
                    return [2 /*return*/];
                }
            });
        });
    };
    StaticContextService.prototype.isTypeEquivalent = function (node, typ, relevantTypes, foundNormalForms) {
        return __awaiter(this, void 0, void 0, function () {
            var normT1, normT2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!node || !typ) {
                            return [2 /*return*/, false];
                        }
                        normT1 = "";
                        normT2 = "";
                        if (!foundNormalForms.has(node.text)) return [3 /*break*/, 1];
                        // console.log("found t1", true)
                        normT1 = foundNormalForms.get(node.text);
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.normalize(node, relevantTypes)];
                    case 2:
                        // console.log("not found t1", false)
                        normT1 = _a.sent();
                        foundNormalForms.set(node.text, normT1);
                        _a.label = 3;
                    case 3:
                        if (!foundNormalForms.has(typ.text)) return [3 /*break*/, 4];
                        // console.log("found t2", true)
                        normT2 = foundNormalForms.get(typ.text);
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, this.normalize(typ, relevantTypes)];
                    case 5:
                        // console.log("not found t2", false)
                        normT2 = _a.sent();
                        foundNormalForms.set(typ.text, normT2);
                        _a.label = 6;
                    case 6: 
                    // const normT1 = foundNormalForms.has(t1) ? foundNormalForms.get(t1) : this.normalize2(t1, relevantTypes);
                    // const normT2 = foundNormalForms.has(t2) ? foundNormalForms.get(t2) : this.normalize2(t2, relevantTypes);
                    // console.log(`normal forms: ${normT1} {}{} ${normT2}`)
                    return [2 /*return*/, normT1 === normT2];
                }
            });
        });
    };
    StaticContextService.prototype.normalize = function (node, relevantTypes) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, params, returnType, paramTypes, ret, elements, parts, alias, wrapped, tree, valueNode;
            var _this = this;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!node)
                            return [2 /*return*/, ""];
                        _a = node.type;
                        switch (_a) {
                            case "function_type": return [3 /*break*/, 1];
                            case "tuple_type": return [3 /*break*/, 2];
                            case "union_type": return [3 /*break*/, 3];
                            case "type_identifier": return [3 /*break*/, 4];
                            case "predefined_type": return [3 /*break*/, 6];
                            case "number": return [3 /*break*/, 6];
                            case "string": return [3 /*break*/, 6];
                        }
                        return [3 /*break*/, 7];
                    case 1:
                        {
                            params = node.child(0);
                            returnType = node.childForFieldName("type") || node.namedChildren[1];
                            paramTypes = (params === null || params === void 0 ? void 0 : params.namedChildren.map(function (param) {
                                return _this.normalize(param.childForFieldName("type") ||
                                    param.namedChildren.at(-1), relevantTypes);
                            }).join(", ")) || "";
                            ret = this.normalize(returnType, relevantTypes);
                            return [2 /*return*/, "(".concat(paramTypes, ") => ").concat(ret)];
                        }
                        _c.label = 2;
                    case 2:
                        {
                            elements = node.namedChildren.map(function (c) {
                                return _this.normalize(c, relevantTypes);
                            });
                            return [2 /*return*/, "[".concat(elements.join(", "), "]")];
                        }
                        _c.label = 3;
                    case 3:
                        {
                            parts = node.namedChildren.map(function (c) {
                                return _this.normalize(c, relevantTypes);
                            });
                            return [2 /*return*/, parts.join(" | ")];
                        }
                        _c.label = 4;
                    case 4:
                        alias = relevantTypes.get(node.text);
                        if (!alias)
                            return [2 /*return*/, node.text];
                        wrapped = "type __TMP = ".concat(alias, ";");
                        return [4 /*yield*/, (0, ast_1.getAst)("file.ts", wrapped)];
                    case 5:
                        tree = _c.sent();
                        valueNode = (_b = tree.rootNode
                            .descendantsOfType("type_alias_declaration")[0]) === null || _b === void 0 ? void 0 : _b.childForFieldName("value");
                        return [2 /*return*/, this.normalize(valueNode, relevantTypes)];
                    case 6: return [2 /*return*/, node.text];
                    case 7: 
                    // Fallback for types like array, etc.
                    return [2 /*return*/, node.text];
                }
            });
        });
    };
    StaticContextService.prototype.getTypeScriptFilesFromWorkspaces = function (workspaceUris) {
        return __awaiter(this, void 0, void 0, function () {
            var tsExtensions, allTsFiles, _i, workspaceUris_1, workspaceUri, folderPath, tsFiles, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tsExtensions = [".ts"];
                        allTsFiles = [];
                        _i = 0, workspaceUris_1 = workspaceUris;
                        _a.label = 1;
                    case 1:
                        if (!(_i < workspaceUris_1.length)) return [3 /*break*/, 6];
                        workspaceUri = workspaceUris_1[_i];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        folderPath = workspaceUri.startsWith("file://")
                            ? new URL(workspaceUri).pathname
                            : workspaceUri;
                        return [4 /*yield*/, this.scanDirectoryForTypeScriptFiles(folderPath, tsExtensions)];
                    case 3:
                        tsFiles = _a.sent();
                        allTsFiles.push.apply(allTsFiles, tsFiles);
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        console.error("Error scanning workspace ".concat(workspaceUri, ":"), error_1);
                        return [3 /*break*/, 5];
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6: return [2 /*return*/, allTsFiles];
                }
            });
        });
    };
    StaticContextService.prototype.scanDirectoryForTypeScriptFiles = function (dirPath, tsExtensions) {
        return __awaiter(this, void 0, void 0, function () {
            function scanRecursively(currentPath) {
                return __awaiter(this, void 0, void 0, function () {
                    var entries, _i, entries_1, entry, fullPath, extension, error_2;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 8, , 9]);
                                return [4 /*yield*/, fs.readdir(currentPath, {
                                        withFileTypes: true,
                                    })];
                            case 1:
                                entries = _a.sent();
                                _i = 0, entries_1 = entries;
                                _a.label = 2;
                            case 2:
                                if (!(_i < entries_1.length)) return [3 /*break*/, 7];
                                entry = entries_1[_i];
                                fullPath = (0, pathToUri_1.localPathOrUriToPath)(path_1.default.join(currentPath, entry.name));
                                if (!entry.isDirectory()) return [3 /*break*/, 5];
                                if (!!shouldSkipDirectory(entry.name)) return [3 /*break*/, 4];
                                return [4 /*yield*/, scanRecursively(fullPath)];
                            case 3:
                                _a.sent();
                                _a.label = 4;
                            case 4: return [3 /*break*/, 6];
                            case 5:
                                if (entry.isFile()) {
                                    extension = path_1.default.extname(entry.name).toLowerCase();
                                    if (tsExtensions.includes(extension)) {
                                        tsFiles.push(fullPath);
                                    }
                                }
                                _a.label = 6;
                            case 6:
                                _i++;
                                return [3 /*break*/, 2];
                            case 7: return [3 /*break*/, 9];
                            case 8:
                                error_2 = _a.sent();
                                console.error("Error reading directory ".concat(currentPath, ":"), error_2);
                                return [3 /*break*/, 9];
                            case 9: return [2 /*return*/];
                        }
                    });
                });
            }
            var tsFiles, shouldSkipDirectory;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tsFiles = [];
                        shouldSkipDirectory = function (dirName) {
                            var skipDirs = [
                                "node_modules",
                                ".git",
                                ".vscode",
                                "dist",
                                "build",
                                "out",
                                ".next",
                                "coverage",
                                ".nyc_output",
                                "tmp",
                                "temp",
                                ".cache",
                            ];
                            return skipDirs.includes(dirName) || dirName.startsWith(".");
                        };
                        return [4 /*yield*/, scanRecursively(dirPath)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, tsFiles];
                }
            });
        });
    };
    return StaticContextService;
}());
exports.StaticContextService = StaticContextService;
