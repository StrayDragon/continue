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
exports.isLazyText = isLazyText;
exports.deterministicApplyLazyEdit = deterministicApplyLazyEdit;
var path_1 = require("path");
var fastest_levenshtein_1 = require("fastest-levenshtein");
var AutocompleteLanguageInfo_1 = require("../../autocomplete/constants/AutocompleteLanguageInfo");
var myers_1 = require("../../diff/myers");
var treeSitter_1 = require("../../util/treeSitter");
var findInAst_1 = require("./findInAst");
var LAZY_COMMENT_REGEX = /\.{3}\s*(.+?)\s*\.{3}/;
function isLazyText(text) {
    return LAZY_COMMENT_REGEX.test(text);
}
function reconstructNewFile(oldFile, newFile, lazyBlockReplacements) {
    var _a;
    // Sort acc by reverse line number
    lazyBlockReplacements
        .sort(function (a, b) { return a.nodeToReplace.startIndex - b.nodeToReplace.startIndex; })
        .reverse();
    // Reconstruct entire file by replacing lazy blocks with the replacement nodes
    var oldFileLines = oldFile.split("\n");
    var newFileChars = newFile.split("");
    for (var _i = 0, lazyBlockReplacements_1 = lazyBlockReplacements; _i < lazyBlockReplacements_1.length; _i++) {
        var _b = lazyBlockReplacements_1[_i], lazyBlockNode = _b.nodeToReplace, replacementNodes = _b.replacementNodes;
        // Get the full string from the replacement nodes
        var replacementText = "";
        if (replacementNodes.length > 0) {
            var startPosition = replacementNodes[0].startPosition;
            var endPosition = replacementNodes[replacementNodes.length - 1].endPosition;
            var replacementLines = oldFileLines.slice(startPosition.row, endPosition.row + 1);
            replacementLines[0] = replacementLines[0].slice(startPosition.column);
            replacementLines[replacementLines.length - 1] = replacementLines[replacementLines.length - 1].slice(0, endPosition.column);
            replacementText = replacementLines.join("\n");
            // Replace the lazy block
            newFileChars.splice(lazyBlockNode.startIndex, lazyBlockNode.text.length, replacementText);
        }
        else {
            // If there are no replacements, then we want to strip the surrounding whitespace
            // The example in calculator-exp.js.diff is a test where this is necessary
            var lazyBlockStart = lazyBlockNode.startIndex;
            var lazyBlockEnd = lazyBlockNode.endIndex - 1;
            // Remove leading whitespace up to two new lines
            var startIndex = lazyBlockStart;
            var newLinesFound = 0;
            while (startIndex > 0 &&
                ((_a = newFileChars[startIndex - 1]) === null || _a === void 0 ? void 0 : _a.trim()) === "" &&
                newLinesFound < 2) {
                startIndex--;
                if (newFileChars[startIndex - 1] === "\n") {
                    newLinesFound++;
                }
            }
            // Remove trailing whitespace up to two new lines
            var charAfter = newFileChars[lazyBlockEnd + 1];
            var secondCharAfter = newFileChars[lazyBlockEnd + 2];
            var endIndex = lazyBlockEnd;
            if (charAfter === "\n") {
                endIndex++;
                if (secondCharAfter === "\n") {
                    endIndex++;
                }
            }
            // Remove the lazy block
            newFileChars.splice(startIndex, endIndex - startIndex + 1);
        }
    }
    return newFileChars.join("");
}
var REMOVAL_PERCENTAGE_THRESHOLD = 0.3;
function shouldRejectDiff(diff) {
    var numRemovals = diff.filter(function (line) { return line.type === "old"; }).length;
    if (numRemovals / diff.length > REMOVAL_PERCENTAGE_THRESHOLD) {
        return true;
    }
    return false;
}
function nodeSurroundedInLazyBlocks(parser, file, filename) {
    var ext = path_1.default.extname(filename).slice(1);
    var language = AutocompleteLanguageInfo_1.LANGUAGES[ext];
    if (language) {
        var newFile = "".concat(language.singleLineComment, " ... existing code ...\n\n").concat(file, "\n\n").concat(language.singleLineComment, " ... existing code...");
        var newTree = parser.parse(newFile);
        return { newTree: newTree, newFile: newFile };
    }
    return undefined;
}
// TODO: If we don't have high confidence, return undefined to fall back to slower methods
function deterministicApplyLazyEdit(_a) {
    return __awaiter(this, arguments, void 0, function (_b) {
        var parser, oldTree, newTree, reconstructedNewFile, diff_1, firstSimilarNode, result, newCodeNumLines_1, matchingNode, startIndex, endIndex, oldText, replacements, diff;
        var _c;
        var oldFile = _b.oldFile, newLazyFile = _b.newLazyFile, filename = _b.filename, 
        /**
         * Using this as a flag to slowly reintroduce lazy applies.
         * With this set, we will only attempt to deterministically apply
         * when there are no lazy blocks and then just replace the whole file,
         * and otherwise never use instant apply
         */
        _d = _b.onlyFullFileRewrite, 
        /**
         * Using this as a flag to slowly reintroduce lazy applies.
         * With this set, we will only attempt to deterministically apply
         * when there are no lazy blocks and then just replace the whole file,
         * and otherwise never use instant apply
         */
        onlyFullFileRewrite = _d === void 0 ? false : _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0: return [4 /*yield*/, (0, treeSitter_1.getParserForFile)(filename)];
                case 1:
                    parser = _e.sent();
                    if (!parser) {
                        return [2 /*return*/, undefined];
                    }
                    oldTree = parser.parse(oldFile);
                    newTree = parser.parse(newLazyFile);
                    reconstructedNewFile = undefined;
                    if (onlyFullFileRewrite) {
                        if (!isLazyText(newTree.rootNode.text)) {
                            diff_1 = (0, myers_1.myersDiff)(oldFile, newLazyFile);
                            if (shouldRejectDiff(diff_1)) {
                                return [2 /*return*/, undefined];
                            }
                            return [2 /*return*/, diff_1];
                        }
                        else {
                            return [2 /*return*/, undefined];
                        }
                    }
                    // If there is no lazy block anywhere, we add our own to the outsides
                    // so that large chunks of the file don't get removed
                    if (!(0, findInAst_1.findInAst)(newTree.rootNode, isLazyBlock)) {
                        firstSimilarNode = (0, findInAst_1.findInAst)(oldTree.rootNode, function (node) {
                            return nodesAreSimilar(node, newTree.rootNode.children[0]);
                        });
                        if ((_c = firstSimilarNode === null || firstSimilarNode === void 0 ? void 0 : firstSimilarNode.parent) === null || _c === void 0 ? void 0 : _c.equals(oldTree.rootNode)) {
                            result = nodeSurroundedInLazyBlocks(parser, newLazyFile, filename);
                            if (result) {
                                newLazyFile = result.newFile;
                                newTree = result.newTree;
                            }
                        }
                        else {
                            newCodeNumLines_1 = newTree.rootNode.text.split("\n").length;
                            matchingNode = (0, findInAst_1.findInAst)(oldTree.rootNode, function (node) { return programNodeIsSimilar(newTree.rootNode, node); }, 
                            // This isn't perfect—we want the length of the matching code in the old tree
                            // and the new version could have more lines, or fewer. But should work a lot.
                            function (node) { return node.text.split("\n").length >= newCodeNumLines_1; });
                            if (matchingNode) {
                                startIndex = matchingNode.startIndex;
                                endIndex = matchingNode.endIndex;
                                oldText = oldTree.rootNode.text;
                                reconstructedNewFile =
                                    oldText.slice(0, startIndex) +
                                        newTree.rootNode.text +
                                        oldText.slice(endIndex);
                            }
                            else {
                                console.warn("No matching node found for lazy block");
                                return [2 /*return*/, undefined];
                            }
                        }
                    }
                    if (!reconstructedNewFile) {
                        replacements = [];
                        findLazyBlockReplacements(oldTree.rootNode, newTree.rootNode, replacements);
                        reconstructedNewFile = reconstructNewFile(oldFile, newLazyFile, replacements);
                    }
                    diff = (0, myers_1.myersDiff)(oldFile, reconstructedNewFile);
                    // If the diff is too messy and seems likely borked, we fall back to LLM strategy
                    if (shouldRejectDiff(diff)) {
                        return [2 /*return*/, undefined];
                    }
                    return [2 /*return*/, diff];
            }
        });
    });
}
function isLazyBlock(node) {
    // Special case for "{/* ... existing code ... */}"
    if (node.type === "jsx_expression" &&
        node.namedChildCount === 1 &&
        isLazyBlock(node.namedChildren[0])) {
        return true;
    }
    return node.type.includes("comment") && isLazyText(node.text);
}
function stringsWithinLevDistThreshold(a, b, threshold) {
    var dist = (0, fastest_levenshtein_1.distance)(a, b);
    return dist / Math.min(a.length, b.length) <= threshold;
}
function programNodeIsSimilar(programNode, otherNode) {
    // Check purely based on whether they are similar strings
    var newLines = programNode.text.split("\n");
    var oldLines = otherNode.text.split("\n");
    // Check that there is a line that matches the start of the old range
    var oldFirstLine = oldLines[0].trim();
    var matchForOldFirstLine = -1;
    for (var i = 0; i < newLines.length; i++) {
        if (newLines[i].trim() === oldFirstLine) {
            matchForOldFirstLine = i;
            break;
        }
    }
    if (matchForOldFirstLine < 0) {
        return false;
    }
    // Check that the last lines match each other
    var oldLastLine = oldLines[oldLines.length - 1].trim();
    var newLastLine = newLines[newLines.length - 1].trim();
    if (oldLastLine !== newLastLine) {
        return false;
    }
    // Check that the number of matching lines is at least half of the shorter length
    var matchingLines = 0;
    for (var i = 0; i < Math.min(newLines.length, oldLines.length); i++) {
        if (oldLines[i].trim() === newLines[matchForOldFirstLine + i].trim()) {
            matchingLines += 1;
        }
    }
    if (matchingLines >= Math.max(newLines.length, oldLines.length) / 2) {
        return true;
    }
    return false;
}
/**
 * Determine whether two nodes are similar
 * @param a
 * @param b
 * @returns
 */
function nodesAreSimilar(a, b) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    if (a.type !== b.type) {
        return false;
    }
    // Check if they have the same name
    if (a.childForFieldName("name") !== null &&
        ((_a = a.childForFieldName("name")) === null || _a === void 0 ? void 0 : _a.text) === ((_b = b.childForFieldName("name")) === null || _b === void 0 ? void 0 : _b.text)) {
        return true;
    }
    if (((_c = a.namedChildren[0]) === null || _c === void 0 ? void 0 : _c.text) === ((_d = b.namedChildren[0]) === null || _d === void 0 ? void 0 : _d.text) &&
        ((_e = a.children[1]) === null || _e === void 0 ? void 0 : _e.text) === ((_f = b.children[1]) === null || _f === void 0 ? void 0 : _f.text)) {
        return true;
    }
    // Matching jsx_elements needs to be different because they have such a minimal first line
    if (a.type === "jsx_element" &&
        b.type === "jsx_element" &&
        // Check that the tag names match
        ((_h = (_g = a.namedChildren[0]) === null || _g === void 0 ? void 0 : _g.children[1]) === null || _h === void 0 ? void 0 : _h.text) ===
            ((_k = (_j = b.namedChildren[0]) === null || _j === void 0 ? void 0 : _j.children[1]) === null || _k === void 0 ? void 0 : _k.text)) {
        if (stringsWithinLevDistThreshold(a.text, b.text, 0.3)) {
            return true;
        }
    }
    var lineOneA = a.text.split("\n")[0];
    var lineOneB = b.text.split("\n")[0];
    return stringsWithinLevDistThreshold(lineOneA, lineOneB, 0.2);
}
function nodesAreExact(a, b) {
    return a.text === b.text;
}
/**
 * Should be like Myers diff, but lazy blocks consume all nodes until the next match
 * @param newNode
 * @param oldNode
 * @returns
 */
function findLazyBlockReplacements(oldNode, newNode, replacements) {
    // Base case
    if (nodesAreExact(oldNode, newNode)) {
        return;
    }
    // Other base case: no lazy blocks => use line-by-line diff
    if (!(0, findInAst_1.findInAst)(newNode, isLazyBlock)) {
        return;
    }
    var leftChildren = oldNode.namedChildren;
    var rightChildren = newNode.namedChildren;
    var isLazy = false;
    var currentLazyBlockNode = undefined;
    var currentLazyBlockReplacementNodes = [];
    var _loop_1 = function () {
        var L = leftChildren[0];
        var R = rightChildren[0];
        // Consume lazy block
        if (isLazyBlock(R)) {
            // Enter "lazy mode"
            isLazy = true;
            currentLazyBlockNode = R;
            rightChildren.shift();
            return "continue";
        }
        // Look for the first match of L
        var index = rightChildren.findIndex(function (node) { return nodesAreSimilar(L, node); });
        if (index === -1) {
            // No match
            if (isLazy) {
                // Add to replacements if in lazy mode
                currentLazyBlockReplacementNodes.push(L);
            }
            // Consume
            leftChildren.shift();
        }
        else {
            // Match found, insert all right nodes before the match
            for (var i = 0; i < index; i++) {
                rightChildren.shift();
            }
            // then recurse at the match
            findLazyBlockReplacements(L, rightChildren[0], replacements);
            // then consume L and R
            leftChildren.shift();
            rightChildren.shift();
            // Exit "lazy mode"
            if (isLazy) {
                // Record the replacement lines
                replacements.push({
                    nodeToReplace: currentLazyBlockNode,
                    replacementNodes: __spreadArray([], currentLazyBlockReplacementNodes, true),
                });
                isLazy = false;
                currentLazyBlockReplacementNodes.length = 0;
                currentLazyBlockNode = undefined;
            }
        }
    };
    while (leftChildren.length > 0 && rightChildren.length > 0) {
        _loop_1();
    }
    if (isLazy) {
        replacements.push({
            nodeToReplace: currentLazyBlockNode,
            replacementNodes: __spreadArray(__spreadArray([], currentLazyBlockReplacementNodes, true), leftChildren, true),
        });
    }
    // Cut out any extraneous lazy blocks
    for (var _i = 0, rightChildren_1 = rightChildren; _i < rightChildren_1.length; _i++) {
        var R = rightChildren_1[_i];
        if (isLazyBlock(R)) {
            replacements.push({
                nodeToReplace: R,
                replacementNodes: [],
            });
        }
    }
}
