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
exports.getAst = getAst;
exports.getTreePathAtCursor = getTreePathAtCursor;
exports.getScopeAroundRange = getScopeAroundRange;
var treeSitter_1 = require("../../util/treeSitter");
function getAst(filepath, fileContents) {
    return __awaiter(this, void 0, void 0, function () {
        var parser, ast;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, treeSitter_1.getParserForFile)(filepath)];
                case 1:
                    parser = _a.sent();
                    if (!parser) {
                        return [2 /*return*/, undefined];
                    }
                    try {
                        ast = parser.parse(fileContents);
                        return [2 /*return*/, ast];
                    }
                    catch (e) {
                        return [2 /*return*/, undefined];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function getTreePathAtCursor(ast, cursorIndex) {
    return __awaiter(this, void 0, void 0, function () {
        var path, foundChild, _i, _a, child;
        return __generator(this, function (_b) {
            path = [ast.rootNode];
            while (path[path.length - 1].childCount > 0) {
                foundChild = false;
                for (_i = 0, _a = path[path.length - 1].children; _i < _a.length; _i++) {
                    child = _a[_i];
                    if (child.startIndex <= cursorIndex && child.endIndex >= cursorIndex) {
                        path.push(child);
                        foundChild = true;
                        break;
                    }
                }
                if (!foundChild) {
                    break;
                }
            }
            return [2 /*return*/, path];
        });
    });
}
function getScopeAroundRange(range) {
    return __awaiter(this, void 0, void 0, function () {
        var ast, _a, s, e, lines, startIndex, endIndex, node, foundChild, _i, _b, child;
        var _c, _d, _e, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0: return [4 /*yield*/, getAst(range.filepath, range.contents)];
                case 1:
                    ast = _g.sent();
                    if (!ast) {
                        return [2 /*return*/, undefined];
                    }
                    _a = range.range, s = _a.start, e = _a.end;
                    lines = range.contents.split("\n");
                    startIndex = lines.slice(0, s.line).join("\n").length +
                        ((_d = (_c = lines[s.line]) === null || _c === void 0 ? void 0 : _c.slice(s.character).length) !== null && _d !== void 0 ? _d : 0);
                    endIndex = lines.slice(0, e.line).join("\n").length +
                        ((_f = (_e = lines[e.line]) === null || _e === void 0 ? void 0 : _e.slice(0, e.character).length) !== null && _f !== void 0 ? _f : 0);
                    node = ast.rootNode;
                    while (node.childCount > 0) {
                        foundChild = false;
                        for (_i = 0, _b = node.children; _i < _b.length; _i++) {
                            child = _b[_i];
                            if (child.startIndex < startIndex && child.endIndex > endIndex) {
                                node = child;
                                foundChild = true;
                                break;
                            }
                        }
                        if (!foundChild) {
                            break;
                        }
                    }
                    return [2 /*return*/, {
                            contents: node.text,
                            filepath: range.filepath,
                            range: {
                                start: {
                                    line: node.startPosition.row,
                                    character: node.startPosition.column,
                                },
                                end: {
                                    line: node.endPosition.row,
                                    character: node.endPosition.column,
                                },
                            },
                        }];
            }
        });
    });
}
