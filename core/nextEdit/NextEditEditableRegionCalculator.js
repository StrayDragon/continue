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
exports.EditableRegionStrategy = void 0;
exports.getNextEditableRegion = getNextEditableRegion;
var ast_1 = require("../autocomplete/util/ast");
var DocumentHistoryTracker_1 = require("./DocumentHistoryTracker");
var constants_1 = require("./constants");
var EditableRegionStrategy;
(function (EditableRegionStrategy) {
    EditableRegionStrategy["Naive"] = "naive";
    EditableRegionStrategy["Sliding"] = "sliding";
    EditableRegionStrategy["Rerank"] = "rerank";
    EditableRegionStrategy["StaticRerank"] = "staticRerank";
    EditableRegionStrategy["Static"] = "static";
})(EditableRegionStrategy || (exports.EditableRegionStrategy = EditableRegionStrategy = {}));
/**
 * This was an attempt to find next edit locations deterministically.
 * I was intending to use this in tandem with the prefetching logic, but we are not using it anymore.
 */
function getNextEditableRegion(strategy, ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = strategy;
                    switch (_a) {
                        case EditableRegionStrategy.Naive: return [3 /*break*/, 1];
                        case EditableRegionStrategy.Sliding: return [3 /*break*/, 2];
                        case EditableRegionStrategy.Rerank: return [3 /*break*/, 3];
                        case EditableRegionStrategy.StaticRerank: return [3 /*break*/, 5];
                        case EditableRegionStrategy.Static: return [3 /*break*/, 7];
                    }
                    return [3 /*break*/, 9];
                case 1: return [2 /*return*/, naiveJump(ctx)];
                case 2: return [2 /*return*/, slidingJump(ctx)];
                case 3: return [4 /*yield*/, rerankJump(ctx)];
                case 4: return [2 /*return*/, _b.sent()];
                case 5: return [4 /*yield*/, staticRerankJump(ctx)];
                case 6: return [2 /*return*/, _b.sent()];
                case 7: return [4 /*yield*/, staticJump(ctx)];
                case 8: return [2 /*return*/, _b.sent()];
                case 9: return [2 /*return*/, null];
            }
        });
    });
}
// Naive assumes that the entire file is editable.
// This relies on the next edit model to figure out where to jump next.
function naiveJump(ctx) {
    var fileLines = ctx.fileLines, filepath = ctx.filepath;
    if (!fileLines || !filepath) {
        console.warn("Missing required context for naive jump");
        return null;
    }
    return [
        {
            filepath: filepath,
            range: {
                start: { line: 0, character: 0 },
                end: {
                    line: fileLines.length - 1,
                    character: fileLines.at(-1).length,
                },
            },
        },
    ];
}
// Sliding splits the file using into sliding window.
function slidingJump(ctx) {
    var fileLines = ctx.fileLines, filepath = ctx.filepath, modelName = ctx.modelName, currentCursorPos = ctx.currentCursorPos;
    if (!fileLines || !filepath || !modelName || !currentCursorPos) {
        console.warn("Missing required context for sliding jump");
        return null;
    }
    var topMargin = constants_1.MODEL_WINDOW_SIZES[modelName].topMargin;
    var bottomMargin = constants_1.MODEL_WINDOW_SIZES[modelName].bottomMargin;
    var windowSize = topMargin + bottomMargin + 1; // 1 for current line
    if (fileLines.length <= windowSize) {
        return [
            {
                filepath: filepath,
                range: {
                    start: { line: 0, character: 0 },
                    end: {
                        line: fileLines.length - 1,
                        character: fileLines[fileLines.length - 1].length,
                    },
                },
            },
        ];
    }
    var ranges = [];
    var cursorLine = currentCursorPos.line;
    // Create the first window centered around the cursor position
    var firstWindowStart = Math.max(0, cursorLine - topMargin);
    var firstWindowEnd = Math.min(fileLines.length - 1, cursorLine + bottomMargin);
    ranges.push({
        filepath: filepath,
        range: {
            start: { line: firstWindowStart, character: 0 },
            end: {
                line: firstWindowEnd,
                character: fileLines[firstWindowEnd].length,
            },
        },
    });
    // Alternating pattern: down once, up once, repeat
    var slidingStep = Math.max(1, Math.floor(windowSize / 2));
    var currentStartDown = firstWindowEnd + 1;
    var currentStartUp = firstWindowStart - slidingStep;
    while (currentStartDown < fileLines.length || currentStartUp >= 0) {
        // Go down once
        if (currentStartDown < fileLines.length) {
            var windowStart = currentStartDown;
            var windowEnd = Math.min(windowStart + windowSize - 1, fileLines.length - 1);
            ranges.push({
                filepath: filepath,
                range: {
                    start: { line: windowStart, character: 0 },
                    end: {
                        line: windowEnd,
                        character: fileLines[windowEnd].length,
                    },
                },
            });
            currentStartDown += slidingStep;
        }
        // Go up once
        if (currentStartUp >= 0) {
            var windowStart = Math.max(0, currentStartUp);
            var windowEnd = Math.min(windowStart + windowSize - 1, fileLines.length - 1);
            ranges.push({
                filepath: filepath,
                range: {
                    start: { line: windowStart, character: 0 },
                    end: {
                        line: windowEnd,
                        character: fileLines[windowEnd].length,
                    },
                },
            });
            currentStartUp -= slidingStep;
        }
    }
    return ranges;
}
// A rerank jump splits the current file into chunks.
// Then it uses a rerank model to get the most relevant chunks and their positions.
function rerankJump(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var fileContent, query, filepath, reranker, _a, chunkSize, lines, chunks_1, i, endLine, chunkContent, scores_1, chunkIndex, mostRelevantChunk, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    fileContent = ctx.fileContent, query = ctx.query, filepath = ctx.filepath, reranker = ctx.reranker, _a = ctx.chunkSize, chunkSize = _a === void 0 ? 5 : _a;
                    if (!fileContent || !query || !filepath || !reranker) {
                        console.warn("Missing required context for rerank jump:", !fileContent, !query, !filepath, !reranker);
                        return [2 /*return*/, null];
                    }
                    lines = fileContent.split("\n");
                    chunks_1 = [];
                    // Create chunks from the file.
                    for (i = 0; i < lines.length; i += Math.floor(chunkSize / 2)) {
                        endLine = Math.min(i + chunkSize - 1, lines.length - 1);
                        chunkContent = lines.slice(i, endLine + 1).join("\n");
                        if (chunkContent === "")
                            continue; // Voyager throws an error if there are empty strings in its document field in the body.
                        chunks_1.push({
                            content: chunkContent,
                            startLine: i,
                            endLine: endLine,
                            digest: "chunk-".concat(i, "-").concat(endLine),
                            filepath: filepath,
                            index: i,
                        });
                    }
                    return [4 /*yield*/, reranker.rerank(query, chunks_1)];
                case 1:
                    scores_1 = _b.sent();
                    // Sort by score in descending order and get the highest scoring chunk.
                    chunks_1.sort(function (a, b) { return scores_1[chunks_1.indexOf(b)] - scores_1[chunks_1.indexOf(a)]; });
                    chunkIndex = Math.min(2, chunks_1.length - 1);
                    mostRelevantChunk = chunks_1[chunkIndex];
                    // Return the range of the most relevant chunk.
                    // NOTE: It might be better to return a list of chunks,
                    // because it's very difficult to gauge when to stop the model.
                    // We could argue that we should always try to jump until the user says no.
                    return [2 /*return*/, [
                            {
                                filepath: filepath,
                                range: {
                                    start: { line: mostRelevantChunk.startLine, character: 0 },
                                    end: {
                                        line: mostRelevantChunk.endLine,
                                        character: lines[mostRelevantChunk.endLine].length,
                                    },
                                },
                            },
                        ]];
                case 2:
                    error_1 = _b.sent();
                    console.error("Error in rerank jump:", error_1);
                    return [2 /*return*/, null];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// A static rerank jump runs a lightweight static analysis on the file
// and uses the reranker to jump to relevant locations.
function staticRerankJump(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var oldFileContent, newFileContent, completionRange_1, filepath_1, ide, oldAst, newAst, changedNodes, nodeQueue, targetNode, candidate, nodeText, references, nodePosition, symbols, filteredSymbols, symbolChunks_1, scores_2, mostRelevantSymbol_1, originalSymbol, e_1, currentFileReferences, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 9, , 10]);
                    oldFileContent = ctx.oldFileContent, newFileContent = ctx.newFileContent, completionRange_1 = ctx.completionRange, filepath_1 = ctx.filepath, ide = ctx.ide;
                    if (!oldFileContent ||
                        !newFileContent ||
                        !completionRange_1 ||
                        !filepath_1 ||
                        !ide) {
                        console.warn("Missing required context for static rerank jump:", !oldFileContent, !newFileContent, !completionRange_1, !filepath_1, !ide);
                        return [2 /*return*/, null];
                    }
                    return [4 /*yield*/, (0, ast_1.getAst)(filepath_1, oldFileContent)];
                case 1:
                    oldAst = _a.sent();
                    if (!oldAst)
                        return [2 /*return*/, null];
                    return [4 /*yield*/, (0, ast_1.getAst)(filepath_1, newFileContent)];
                case 2:
                    newAst = _a.sent();
                    if (!newAst)
                        return [2 /*return*/, null];
                    changedNodes = compareAsts(oldAst, newAst);
                    if (!changedNodes || changedNodes.length === 0)
                        return [2 /*return*/, null];
                    nodeQueue = changedNodes.sort(function (a, b) { return a.depth - b.depth; });
                    console.log("nodeQueue:", nodeQueue.map(function (node) {
                        var _a, _b, _c, _d;
                        return ({
                            oldText: ((_a = node.oldNode) === null || _a === void 0 ? void 0 : _a.text) || "",
                            newText: ((_b = node.newNode) === null || _b === void 0 ? void 0 : _b.text) || "",
                            oldType: ((_c = node.oldNode) === null || _c === void 0 ? void 0 : _c.type) || "",
                            newType: ((_d = node.newNode) === null || _d === void 0 ? void 0 : _d.type) || "",
                            depth: node.depth,
                        });
                    }));
                    targetNode = null;
                    while (nodeQueue.length > 0 && !targetNode) {
                        candidate = nodeQueue.shift();
                        if (candidate &&
                            candidate.oldNode &&
                            candidate.oldNode.type !== "program") {
                            targetNode = candidate.oldNode;
                        }
                    }
                    if (!targetNode)
                        return [2 /*return*/, null];
                    nodeText = getNodeText(targetNode);
                    if (!nodeText || nodeText.trim() === "")
                        return [2 /*return*/, null];
                    references = [];
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 7, , 8]);
                    nodePosition = getNodePosition(targetNode);
                    if (!nodePosition) return [3 /*break*/, 6];
                    return [4 /*yield*/, ide.getDocumentSymbols(filepath_1)];
                case 4:
                    symbols = _a.sent();
                    filteredSymbols = symbols.filter(function (symbol) {
                        // Check if the symbol's range is outside of the completion range
                        return !doRangesOverlap(symbol.range, completionRange_1);
                    });
                    // Use the reranker to rank the filtered symbols against the node text.
                    if (!ctx.reranker) {
                        console.warn("No reranker available for static jump symbol ranking");
                        return [2 /*return*/, null];
                    }
                    symbolChunks_1 = filteredSymbols.map(function (symbol) { return ({
                        content: symbol.name,
                        startLine: symbol.range.start.line,
                        endLine: symbol.range.end.line,
                        digest: "symbol-".concat(symbol.name, "-").concat(symbol.range.start.line),
                        filepath: filepath_1,
                        index: symbol.range.start.line,
                    }); });
                    if (symbolChunks_1.length === 0) {
                        console.warn("No symbols found for ranking");
                        return [2 /*return*/, null];
                    }
                    return [4 /*yield*/, ctx.reranker.rerank(nodeText, symbolChunks_1)];
                case 5:
                    scores_2 = _a.sent();
                    symbolChunks_1.sort(function (a, b) {
                        return scores_2[symbolChunks_1.indexOf(b)] - scores_2[symbolChunks_1.indexOf(a)];
                    });
                    mostRelevantSymbol_1 = symbolChunks_1[0];
                    originalSymbol = filteredSymbols.find(function (symbol) {
                        return symbol.range.start.line === mostRelevantSymbol_1.startLine &&
                            symbol.range.end.line === mostRelevantSymbol_1.endLine;
                    });
                    if (originalSymbol) {
                        references = [
                            {
                                filepath: filepath_1,
                                range: originalSymbol.range,
                            },
                        ];
                    }
                    _a.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7:
                    e_1 = _a.sent();
                    console.warn("Failed to use IDE references, falling back to text search:", e_1);
                    return [3 /*break*/, 8];
                case 8:
                    // If IDE reference finding failed or returned no results, fall back to text search.
                    if (references.length === 0) {
                        references = findTextOccurrences(oldFileContent, nodeText).map(function (range) { return ({ filepath: filepath_1, range: range }); });
                    }
                    currentFileReferences = references.filter(function (ref) { return ref.filepath === filepath_1; });
                    // Return the first reference if any found.
                    if (currentFileReferences.length > 0) {
                        return [2 /*return*/, [currentFileReferences[0]]];
                        // return currentFileReferences;
                    }
                    return [2 /*return*/, null];
                case 9:
                    error_2 = _a.sent();
                    console.error("Error in static jump:", error_2);
                    return [2 /*return*/, null];
                case 10: return [2 /*return*/];
            }
        });
    });
}
// Static jump relies purely on static analysis
// to determine where to edit next.
function staticJump(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var cursorPosition, filepath, ide, tree, point, nodeAtCursor, identifierNode, references, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    cursorPosition = ctx.cursorPosition, filepath = ctx.filepath, ide = ctx.ide;
                    if (!cursorPosition || !filepath || !ide) {
                        console.warn("Missing required context for static jump:", !cursorPosition, !filepath, !ide);
                        return [2 /*return*/, null];
                    }
                    return [4 /*yield*/, DocumentHistoryTracker_1.DocumentHistoryTracker.getInstance().getMostRecentAst(filepath)];
                case 1:
                    tree = _a.sent();
                    // const tree = await getAst(filepath, fileContent);
                    if (!tree)
                        return [2 /*return*/, null];
                    point = {
                        row: cursorPosition.line,
                        column: cursorPosition.character,
                    };
                    nodeAtCursor = tree.rootNode.descendantForPosition(point);
                    if (!nodeAtCursor) {
                        console.log("No node found at cursor position");
                        return [2 /*return*/, null];
                    }
                    identifierNode = findClosestIdentifierNode(nodeAtCursor);
                    if (!identifierNode) {
                        console.log("No identifier node found near cursor position");
                        return [2 /*return*/, null];
                    }
                    return [4 /*yield*/, ide.getReferences({
                            filepath: filepath,
                            position: {
                                line: identifierNode.startPosition.row,
                                character: identifierNode.startPosition.column,
                            },
                        })];
                case 2:
                    references = _a.sent();
                    if (!references || references.length === 0) {
                        console.log("No references found for identifier: ".concat(identifierNode.text));
                        return [2 /*return*/, null];
                    }
                    // console.log(
                    //   "references:",
                    //   JSON.stringify(
                    //     references.map((ref) => ({
                    //       line: ref.range.start.line,
                    //       character: ref.range.start.character,
                    //     })),
                    //     null,
                    //     2,
                    //   ),
                    // );
                    return [2 /*return*/, references.length > 1 ? references.slice(1) : null];
                case 3:
                    error_3 = _a.sent();
                    console.error("Error in staticJump:", error_3);
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/];
            }
        });
    });
}
/* AST HELPER FUNCTIONS */
// Helper function to find the closest identifier node.
function findClosestIdentifierNode(node) {
    if (!node)
        return null;
    if (isIdentifierNode(node))
        return node;
    if (isDeclarationNode(node))
        return findLeftmostIdentifier(node);
    // Check if the parent is an identifier.
    // NOTE: This will probably never get triggered.
    // Most identifiers are leaf nodes.
    var parent = node.parent;
    if (parent && isIdentifierNode(parent)) {
        return parent;
    }
    if (parent) {
        if (isDeclarationNode(parent))
            return findLeftmostIdentifier(parent);
        // Check if one of the siblings is an identifier.
        for (var i = 0; i < parent.childCount; ++i) {
            // const sibling = node.child(i);
            var sibling = parent.child(i);
            if (sibling && isIdentifierNode(sibling)) {
                // Get the leftmost identifier sibling.
                return sibling;
            }
        }
    }
    return findClosestIdentifierNode(parent);
}
function findLeftmostIdentifier(node) {
    if (isIdentifierNode(node))
        return node;
    for (var i = 0; i < node.childCount; ++i) {
        var child = node.child(i);
        if (child) {
            var result = findLeftmostIdentifier(child);
            if (result)
                return result;
        }
    }
    return null;
}
// Helper function to check if a node is an identifier.
function isIdentifierNode(node) {
    var nodeType = node.type;
    if (nodeType === "identifier")
        return true;
    if (nodeType.includes("identifier"))
        return true;
    // Most language grammars will use the term "identifier".
    // However some might not.
    // Update this as they come.
    var specialIdentifiers = ["name", "constant"];
    return specialIdentifiers.includes(nodeType);
}
// Helper function to check if a node is a declaration.
function isDeclarationNode(node) {
    var nodeType = node.type;
    // Common declaration patterns.
    if (nodeType.endsWith("_declaration"))
        return true;
    if (nodeType.endsWith("_definition"))
        return true;
    if (nodeType.endsWith("_item"))
        return true; // Rust.
    // Language-specific patterns.
    var declarationTypes = [
        // Python.
        "function_definition",
        "class_definition",
        "async_function_definition",
        "decorated_definition",
        // Ruby.
        "method",
        "class",
        "module",
        "singleton_method",
        // Java.
        "variable_declarator",
        "local_variable_declaration",
        // Go.
        "short_var_declaration",
        // General
        "method_definition",
    ];
    return declarationTypes.includes(nodeType);
}
// // Helper function to find the closest identifier node.
// function findClosestIdentifierNode(
//   node: Parser.SyntaxNode | undefined,
// ): Parser.SyntaxNode | undefined {
//   if (!node) return undefined;
//   // Check if the current node is an identifier
//   if (isIdentifierLike(node)) {
//     return node;
//   }
//   // Check if the parent is an identifier
//   const parent = node.parent;
//   if (parent && isIdentifierLike(parent)) {
//     return parent;
//   }
//   // Check if any of the node's children are identifiers
//   // Return the leftmost identifier child if found
//   for (let i = 0; i < node.childCount; i++) {
//     const child = node.child(i);
//     if (child && isIdentifierLike(child)) {
//       return child;
//     }
//   }
//   // Check if any of the parent's children are identifiers
//   if (parent) {
//     for (let i = 0; i < parent.childCount; i++) {
//       const sibling = parent.child(i);
//       if (sibling && isIdentifierLike(sibling)) {
//         return sibling;
//       }
//     }
//   }
//   // Recurse on the parent if we haven't found anything yet
//   return findClosestIdentifierNode(parent);
// }
// // Helper function to determine if a node is identifier-like
// function isIdentifierLike(node: Parser.SyntaxNode): boolean {
//   // Common identifier node types across languages
//   const commonIdentifierTypes = [
//     "identifier",
//     "property_identifier",
//     "type_identifier",
//     "field_identifier",
//     "variable_identifier",
//     "constant",
//     "symbol",
//   ];
//   if (commonIdentifierTypes.includes(node.type)) {
//     return true;
//   }
//   // Check for common identifier patterns in node types
//   return /identifier$|^identifier|_identifier/.test(node.type);
// }
// Helper function to compare ASTs and find changed nodes.
function compareAsts(oldAst, newAst) {
    var changedNodes = [];
    // This is a simplified implementation.
    // In practice, you would traverse both ASTs in parallel
    // and identify nodes that differ.
    function traverse(oldNode, newNode, depth) {
        if (depth === void 0) { depth = 0; }
        if (!oldNode && !newNode)
            return;
        // If one node exists and the other doesn't, or they're different types.
        if ((!oldNode && newNode) ||
            (oldNode && !newNode) ||
            (oldNode === null || oldNode === void 0 ? void 0 : oldNode.type) !== (newNode === null || newNode === void 0 ? void 0 : newNode.type)) {
            changedNodes.push({ oldNode: oldNode, newNode: newNode, depth: depth });
            return;
        }
        // Compare properties.
        if ((oldNode === null || oldNode === void 0 ? void 0 : oldNode.text) !== (newNode === null || newNode === void 0 ? void 0 : newNode.text)) {
            changedNodes.push({ oldNode: oldNode, newNode: newNode, depth: depth });
        }
        // Recursively compare children.
        var oldChildCount = (oldNode === null || oldNode === void 0 ? void 0 : oldNode.childCount) || 0;
        var newChildCount = (newNode === null || newNode === void 0 ? void 0 : newNode.childCount) || 0;
        var maxLength = Math.max(oldChildCount, newChildCount);
        for (var i = 0; i < maxLength; i++) {
            var oldChild = i < oldChildCount ? (oldNode === null || oldNode === void 0 ? void 0 : oldNode.child(i)) || null : null;
            var newChild = i < newChildCount ? (newNode === null || newNode === void 0 ? void 0 : newNode.child(i)) || null : null;
            traverse(oldChild, newChild, depth + 1);
        }
    }
    traverse(oldAst.rootNode, newAst.rootNode);
    return changedNodes;
}
// Helper function to get a node's text.
function getNodeText(node) {
    if (!node)
        return "";
    return node.text;
}
// Helper function to get a node's position.
function getNodePosition(node) {
    if (!node)
        return null;
    // Tree-sitter nodes have startPosition property that contains row and column.
    return {
        line: node.startPosition.row,
        character: node.startPosition.column,
    };
}
/* OTHER HELPER FUNCTIONS */
// Helper function to find all occurrences of text in a string.
function findTextOccurrences(text, searchText) {
    var results = [];
    var lines = text.split("\n");
    for (var lineIndex = 0; lineIndex < lines.length; lineIndex++) {
        var line = lines[lineIndex];
        var charIndex = 0;
        while (charIndex < line.length) {
            var foundIndex = line.indexOf(searchText, charIndex);
            if (foundIndex === -1)
                break;
            results.push({
                start: { line: lineIndex, character: foundIndex },
                end: { line: lineIndex, character: foundIndex + searchText.length },
            });
            charIndex = foundIndex + 1;
        }
    }
    return results;
}
// Helper function to check if a range is within another range.
function isRangeWithin(innerRange, outerRange) {
    // Check if the inner range's start position is after or equal to the outer range's start.
    var startWithin = innerRange.start.line > outerRange.start.line ||
        (innerRange.start.line === outerRange.start.line &&
            innerRange.start.character >= outerRange.start.character);
    // Check if the inner range's end position is before or equal to the outer range's end.
    var endWithin = innerRange.end.line < outerRange.end.line ||
        (innerRange.end.line === outerRange.end.line &&
            innerRange.end.character <= outerRange.end.character);
    return startWithin && endWithin;
}
// Helper function to check if two ranges overlap.
function doRangesOverlap(range1, range2) {
    // Check if one range starts after the other ends
    var range1StartsAfterRange2Ends = range1.start.line > range2.end.line ||
        (range1.start.line === range2.end.line &&
            range1.start.character > range2.end.character);
    var range2StartsAfterRange1Ends = range2.start.line > range1.end.line ||
        (range2.start.line === range1.end.line &&
            range2.start.character > range1.end.character);
    // If either condition is true, the ranges don't overlap
    return !(range1StartsAfterRange2Ends || range2StartsAfterRange1Ends);
}
// Helper function to check if the upper part of range1 overlaps with range2.
function doesUpperPartOverlap(range1, range2) {
    // Check if range1 starts before range2 ends
    var range1StartsBeforeRange2Ends = range1.start.line < range2.end.line ||
        (range1.start.line === range2.end.line &&
            range1.start.character <= range2.end.character);
    // Check if range1 starts before range2 starts (meaning it's "upper" than range2)
    var range1StartsBeforeRange2Starts = range1.start.line < range2.start.line ||
        (range1.start.line === range2.start.line &&
            range1.start.character < range2.start.character);
    // The upper part overlaps if range1 starts before range2 ends
    // AND range1 starts before range2 starts
    return range1StartsBeforeRange2Ends && range1StartsBeforeRange2Starts;
}
// Helper function to check if the lower part of range1 overlaps with range2.
function doesLowerPartOverlap(range1, range2) {
    // Check if range1 starts inside range2
    var range1StartsInsideRange2 = (range1.start.line > range2.start.line ||
        (range1.start.line === range2.start.line &&
            range1.start.character >= range2.start.character)) &&
        (range1.start.line < range2.end.line ||
            (range1.start.line === range2.end.line &&
                range1.start.character < range2.end.character));
    // Check if range1 ends after range2 ends
    var range1EndsAfterRange2 = range1.end.line > range2.end.line ||
        (range1.end.line === range2.end.line &&
            range1.end.character > range2.end.character);
    // The lower part overlaps if range1 starts inside range2
    // AND range1 ends after range2 ends
    return range1StartsInsideRange2 && range1EndsAfterRange2;
}
// Helper function to check if a range overlaps with another range from either end
function doesRangePartiallyOverlap(range1, range2) {
    // Upper part overlap: range1 starts before range2 starts but ends inside range2
    var upperPartOverlap = (range1.start.line < range2.start.line ||
        (range1.start.line === range2.start.line &&
            range1.start.character < range2.start.character)) &&
        (range1.end.line > range2.start.line ||
            (range1.end.line === range2.start.line &&
                range1.end.character > range2.start.character)) &&
        (range1.end.line < range2.end.line ||
            (range1.end.line === range2.end.line &&
                range1.end.character <= range2.end.character));
    // Lower part overlap: range1 starts inside range2 but ends after range2 ends
    var lowerPartOverlap = (range1.start.line > range2.start.line ||
        (range1.start.line === range2.start.line &&
            range1.start.character >= range2.start.character)) &&
        (range1.start.line < range2.end.line ||
            (range1.start.line === range2.end.line &&
                range1.start.character < range2.end.character)) &&
        (range1.end.line > range2.end.line ||
            (range1.end.line === range2.end.line &&
                range1.end.character > range2.end.character));
    return upperPartOverlap || lowerPartOverlap;
}
// Utility function to print chunks.
function printChunks(chunks) {
    console.log("chunks:", JSON.stringify(chunks.map(function (chunk) { return ({
        content: chunk.content,
        startLine: chunk.startLine,
        endLine: chunk.endLine,
    }); }), null, 2));
}
