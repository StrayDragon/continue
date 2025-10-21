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
exports.getRangeInFileWithContents = getRangeInFileWithContents;
exports.addHighlightedCodeToContext = addHighlightedCodeToContext;
exports.addEntireFileToContext = addEntireFileToContext;
exports.isEmptyFile = isEmptyFile;
exports.addCodeToContextFromRange = addCodeToContextFromRange;
var os = require("node:os");
var vscode = require("vscode");
function getRangeInFileWithContents(allowEmpty, range) {
    var editor = vscode.window.activeTextEditor;
    if (editor) {
        var selection = editor.selection;
        var filepath = editor.document.uri.toString();
        if (range) {
            var contents_1 = editor.document.getText(range);
            return {
                range: {
                    start: {
                        line: range.start.line,
                        character: range.start.character,
                    },
                    end: {
                        line: range.end.line,
                        character: range.end.character,
                    },
                },
                filepath: filepath,
                contents: contents_1,
            };
        }
        if ((selection.isEmpty && !allowEmpty) || isEmptyFile(editor.document)) {
            return null;
        }
        var selectionRange = void 0;
        // if the selection is empty and document is not empty, select the whole document
        if (selection.isEmpty) {
            selectionRange = new vscode.Range(new vscode.Position(0, 0), new vscode.Position(editor.document.lineCount - 1, editor.document.lineAt(editor.document.lineCount - 1).range.end.character));
        }
        if (!selectionRange) {
            selectionRange = new vscode.Range(selection.start, selection.end);
            var document_1 = editor.document;
            // Select the context from the beginning of the selection start line to the selection start position
            var beginningOfSelectionStartLine = selection.start.with(undefined, 0);
            var textBeforeSelectionStart = document_1.getText(new vscode.Range(beginningOfSelectionStartLine, selection.start));
            // If there are only whitespace before the start of the selection, include the indentation
            if (textBeforeSelectionStart.trim().length === 0) {
                selectionRange = selectionRange.with({
                    start: beginningOfSelectionStartLine,
                });
            }
        }
        var contents = editor.document.getText(selectionRange);
        return {
            filepath: filepath,
            contents: contents,
            range: {
                start: {
                    line: selectionRange.start.line,
                    character: selectionRange.start.character,
                },
                end: {
                    line: selectionRange.end.line,
                    character: selectionRange.end.character,
                },
            },
        };
    }
    return null;
}
function addHighlightedCodeToContext(webviewProtocol) {
    return __awaiter(this, void 0, void 0, function () {
        var rangeInFileWithContents;
        return __generator(this, function (_a) {
            rangeInFileWithContents = getRangeInFileWithContents(true);
            if (rangeInFileWithContents) {
                webviewProtocol === null || webviewProtocol === void 0 ? void 0 : webviewProtocol.request("highlightedCode", {
                    rangeInFileWithContents: rangeInFileWithContents,
                });
            }
            return [2 /*return*/];
        });
    });
}
function addEntireFileToContext(uri, webviewProtocol, ideUtils) {
    return __awaiter(this, void 0, void 0, function () {
        var stat, files, _i, files_1, _a, filename, type, contents, rangeInFileWithContents;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, ideUtils.stat(uri)];
                case 1:
                    stat = _b.sent();
                    if (!((stat === null || stat === void 0 ? void 0 : stat.type) === vscode.FileType.Directory)) return [3 /*break*/, 3];
                    return [4 /*yield*/, ideUtils.readDirectory(uri)];
                case 2:
                    files = (_b.sent());
                    for (_i = 0, files_1 = files; _i < files_1.length; _i++) {
                        _a = files_1[_i], filename = _a[0], type = _a[1];
                        if (type === vscode.FileType.File) {
                            addEntireFileToContext(vscode.Uri.joinPath(uri, filename), webviewProtocol, ideUtils);
                        }
                    }
                    return [2 /*return*/];
                case 3: return [4 /*yield*/, vscode.workspace.fs.readFile(uri)];
                case 4:
                    contents = (_b.sent()).toString();
                    rangeInFileWithContents = {
                        filepath: uri.toString(),
                        contents: contents,
                        range: {
                            start: {
                                line: 0,
                                character: 0,
                            },
                            end: {
                                line: contents.split(os.EOL).length - 1,
                                character: 0,
                            },
                        },
                    };
                    webviewProtocol === null || webviewProtocol === void 0 ? void 0 : webviewProtocol.request("highlightedCode", {
                        rangeInFileWithContents: rangeInFileWithContents,
                    });
                    return [2 /*return*/];
            }
        });
    });
}
function isEmptyFile(document) {
    return document.lineCount === 1 && document.lineAt(0).range.isEmpty;
}
function addCodeToContextFromRange(range, webviewProtocol, prompt) {
    var _a;
    var document = (_a = vscode.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.document;
    if (!document) {
        return;
    }
    var rangeInFileWithContents = {
        filepath: document.uri.toString(),
        contents: document.getText(range),
        range: {
            start: {
                line: range.start.line,
                character: range.start.character,
            },
            end: {
                line: range.end.line,
                character: range.end.character,
            },
        },
    };
    webviewProtocol === null || webviewProtocol === void 0 ? void 0 : webviewProtocol.request("highlightedCode", {
        rangeInFileWithContents: rangeInFileWithContents,
        prompt: prompt,
        // Assume `true` since range selection is currently only used for quick actions/fixes
        shouldRun: true,
    });
}
