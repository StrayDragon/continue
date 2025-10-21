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
exports.findEnclosingTypeDeclaration = findEnclosingTypeDeclaration;
exports.extractTopLevelDecls = extractTopLevelDecls;
exports.extractTopLevelDeclsWithFormatting = extractTopLevelDeclsWithFormatting;
exports.extractFunctionTypeFromDecl = extractFunctionTypeFromDecl;
exports.unwrapToBaseType = unwrapToBaseType;
var fs = require("fs/promises");
var treeSitter_1 = require("../../../util/treeSitter");
var ast_1 = require("../../util/ast");
function findEnclosingTypeDeclaration(sourceCode, cursorLine, cursorColumn, ast) {
    var _a;
    var point = { row: cursorLine, column: cursorColumn };
    var node = ast.rootNode.descendantForPosition(point);
    while (node &&
        ![
            "type_alias_declaration",
            "interface_declaration",
            "enum_declaration",
        ].includes(node.type)) {
        if (!node.parent)
            return null;
        node = node.parent;
    }
    if (!node)
        return null;
    var nameNode = node.childForFieldName("name");
    var name = (_a = nameNode === null || nameNode === void 0 ? void 0 : nameNode.text) !== null && _a !== void 0 ? _a : "<anonymous>";
    var fullText = sourceCode.slice(node.startIndex, node.endIndex);
    return {
        name: name,
        fullText: fullText,
        startLine: node.startPosition.row,
        startColumn: node.startPosition.column,
        endLine: node.endPosition.row,
        endColumn: node.endPosition.column,
        kind: node.type,
    };
}
function extractTopLevelDecls(currentFile, givenParser) {
    return __awaiter(this, void 0, void 0, function () {
        var ast, _a, _b, language, query;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = ast_1.getAst;
                    _b = [currentFile];
                    return [4 /*yield*/, fs.readFile(currentFile, "utf8")];
                case 1: return [4 /*yield*/, _a.apply(void 0, _b.concat([_c.sent()]))];
                case 2:
                    ast = _c.sent();
                    if (!ast) {
                        throw new Error("failed to get ast for file ".concat(currentFile));
                    }
                    if (givenParser) {
                        language = givenParser.getLanguage();
                    }
                    else {
                        language = (0, treeSitter_1.getFullLanguageName)(currentFile);
                    }
                    return [4 /*yield*/, (0, treeSitter_1.getQueryForFile)(currentFile, "static-context-queries/relevant-headers-queries/".concat(language, "-get-toplevel-headers.scm"))];
                case 3:
                    query = _c.sent();
                    if (!query) {
                        throw new Error("failed to get query for file ".concat(currentFile, " and language ").concat(language));
                    }
                    return [2 /*return*/, query.matches(ast.rootNode)];
            }
        });
    });
}
function extractTopLevelDeclsWithFormatting(currentFile, givenParser) {
    return __awaiter(this, void 0, void 0, function () {
        var ast, _a, _b, language, query, matches, results, _i, matches_1, match, item, _c, _d, _e, name_1, node, typeNode, returnTypeNode, nameNode;
        var _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    _a = ast_1.getAst;
                    _b = [currentFile];
                    return [4 /*yield*/, fs.readFile(currentFile, "utf8")];
                case 1: return [4 /*yield*/, _a.apply(void 0, _b.concat([_g.sent()]))];
                case 2:
                    ast = _g.sent();
                    if (!ast) {
                        throw new Error("failed to get ast for file ".concat(currentFile));
                    }
                    if (givenParser) {
                        language = givenParser.getLanguage();
                    }
                    else {
                        language = (0, treeSitter_1.getFullLanguageName)(currentFile);
                    }
                    return [4 /*yield*/, (0, treeSitter_1.getQueryForFile)(currentFile, "static-context-queries/relevant-headers-queries/".concat(language, "-get-toplevel-headers.scm"))];
                case 3:
                    query = _g.sent();
                    if (!query) {
                        throw new Error("failed to get query for file ".concat(currentFile, " and language ").concat(language));
                    }
                    matches = query.matches(ast.rootNode);
                    results = [];
                    for (_i = 0, matches_1 = matches; _i < matches_1.length; _i++) {
                        match = matches_1[_i];
                        item = {
                            declaration: "",
                            nodeType: "",
                            name: "",
                            declaredType: "",
                        };
                        for (_c = 0, _d = match.captures; _c < _d.length; _c++) {
                            _e = _d[_c], name_1 = _e.name, node = _e.node;
                            if (name_1 === "top.var.decl") {
                                item.nodeType = "variable";
                                item.declaration = node.text;
                                typeNode = node.descendantsOfType("type_annotation")[0];
                                if (typeNode) {
                                    item.declaredType = typeNode.text.replace(/^:\s*/, "");
                                }
                            }
                            else if (name_1 === "top.var.name" || name_1 === "top.fn.name") {
                                item.name = node.text;
                            }
                            else if (name_1 === "top.fn.decl") {
                                item.nodeType = "function";
                                item.declaration = node.text;
                                returnTypeNode = node.childForFieldName("return_type");
                                if (returnTypeNode) {
                                    item.returnType = returnTypeNode.text.replace(/^:\s*/, "");
                                }
                                nameNode = node.childForFieldName("name");
                                if (nameNode && ((_f = nameNode.nextSibling) === null || _f === void 0 ? void 0 : _f.type) === "type_annotation") {
                                    item.declaredType = nameNode.nextSibling.text.replace(/^:\s*/, "");
                                }
                            }
                        }
                        if (item.name && item.declaration) {
                            results.push(item);
                        }
                    }
                    return [2 /*return*/, results];
            }
        });
    });
}
function extractFunctionTypeFromDecl(match) {
    var paramsNode = undefined;
    var returnNode = undefined;
    for (var _i = 0, _a = match.captures; _i < _a.length; _i++) {
        var capture = _a[_i];
        if (capture.name === "top.fn.param.type") {
            paramsNode = capture.node;
        }
        else if (capture.name === "top.fn.type") {
            returnNode = capture.node;
        }
    }
    if (!paramsNode) {
        console.error("extractFunctionTypeFromDecl: paramsNode ".concat(paramsNode, " not found"));
        throw new Error("extractFunctionTypeFromDecl: paramsNode ".concat(paramsNode, " not found"));
    }
    if (!returnNode) {
        console.error("extractFunctionTypeFromDecl: returnNode ".concat(returnNode, " not found"));
        throw new Error("extractFunctionTypeFromDecl: returnNode ".concat(returnNode, " not found"));
    }
    return "(".concat(paramsNode.text, ") => ").concat(returnNode.text);
}
function unwrapToBaseType(node) {
    if ([
        "function_type",
        "tuple_type",
        "type_identifier",
        "predefined_type",
    ].includes(node.type)) {
        return node;
    }
    for (var _i = 0, _a = node.namedChildren; _i < _a.length; _i++) {
        var child = _a[_i];
        var unwrapped = unwrapToBaseType(child);
        if (unwrapped !== child ||
            [
                "function_type",
                "tuple_type",
                "type_identifier",
                "predefined_type",
            ].includes(unwrapped.type)) {
            return unwrapped;
        }
    }
    return node;
}
