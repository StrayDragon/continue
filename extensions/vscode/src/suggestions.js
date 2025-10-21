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
exports.currentSuggestion = exports.editorToSuggestions = void 0;
exports.rerenderDecorations = rerenderDecorations;
exports.suggestionDownCommand = suggestionDownCommand;
exports.suggestionUpCommand = suggestionUpCommand;
exports.acceptSuggestionCommand = acceptSuggestionCommand;
exports.acceptAllSuggestionsCommand = acceptAllSuggestionsCommand;
exports.rejectAllSuggestionsCommand = rejectAllSuggestionsCommand;
exports.rejectSuggestionCommand = rejectSuggestionCommand;
exports.showSuggestion = showSuggestion;
var URI = require("uri-js");
var vscode = require("vscode");
var vscode_1 = require("./util/vscode");
/* Keyed by editor.document.uri.toString() */
exports.editorToSuggestions = new Map();
exports.currentSuggestion = new Map(); // Map from editor URI to index of current SuggestionRanges in editorToSuggestions
// When tab is reopened, rerender the decorations:
vscode.window.onDidChangeActiveTextEditor(function (editor) {
    if (!editor) {
        return;
    }
    rerenderDecorations(editor.document.uri.toString());
});
vscode.workspace.onDidOpenTextDocument(function (doc) {
    rerenderDecorations(doc.uri.toString());
});
var newDecorationType = vscode.window.createTextEditorDecorationType({
    backgroundColor: "rgb(0, 255, 0, 0.1)",
    isWholeLine: true,
});
var oldDecorationType = vscode.window.createTextEditorDecorationType({
    backgroundColor: "rgb(255, 0, 0, 0.1)",
    isWholeLine: true,
    cursor: "pointer",
});
var newSelDecorationType = vscode.window.createTextEditorDecorationType({
    backgroundColor: "rgb(0, 255, 0, 0.25)",
    isWholeLine: true,
    // after: {
    //   contentText: "Press ctrl+shift+enter to accept",
    //   margin: "0 0 0 1em",
    // },
});
var oldSelDecorationType = vscode.window.createTextEditorDecorationType({
    backgroundColor: "rgb(255, 0, 0, 0.25)",
    isWholeLine: true,
    // after: {
    //   contentText: "Press ctrl+shift+enter to reject",
    //   margin: "0 0 0 1em",
    // },
});
function rerenderDecorations(editorUri) {
    var suggestions = exports.editorToSuggestions.get(editorUri);
    var idx = exports.currentSuggestion.get(editorUri);
    var editor = vscode.window.visibleTextEditors.find(function (editor) {
        return URI.equal(editor.document.uri.toString(), editorUri);
    });
    if (!suggestions || !editor) {
        return;
    }
    var rangesWithoutEmptyLastLine = function (ranges) {
        var newRanges = [];
        for (var i = 0; i < ranges.length; i++) {
            var range = ranges[i];
            if (range.start.line === range.end.line &&
                range.start.character === 0 &&
                range.end.character === 0) {
                // Empty range, don't show it
                continue; // is great
            }
            newRanges.push(new vscode.Range(range.start.line, range.start.character, 
            // Don't include the last line if it is empty
            range.end.line - (range.end.character === 0 ? 1 : 0), range.end.character));
        }
        return newRanges;
    };
    var olds = [];
    var news = [];
    var oldSels = [];
    var newSels = [];
    for (var i = 0; i < suggestions.length; i++) {
        var suggestion = suggestions[i];
        if (typeof idx !== "undefined" && idx === i) {
            if (suggestion.newSelected) {
                olds.push(suggestion.oldRange);
                newSels.push(suggestion.newRange);
            }
            else {
                oldSels.push(suggestion.oldRange);
                news.push(suggestion.newRange);
            }
        }
        else {
            olds.push(suggestion.oldRange);
            news.push(suggestion.newRange);
        }
    }
    // Don't highlight the last line if it is empty
    olds = rangesWithoutEmptyLastLine(olds);
    news = rangesWithoutEmptyLastLine(news);
    oldSels = rangesWithoutEmptyLastLine(oldSels);
    newSels = rangesWithoutEmptyLastLine(newSels);
    editor.setDecorations(oldDecorationType, olds);
    editor.setDecorations(newDecorationType, news);
    editor.setDecorations(oldSelDecorationType, oldSels);
    editor.setDecorations(newSelDecorationType, newSels);
    // Reveal the range in the editor
    if (idx === undefined) {
        return;
    }
    editor.revealRange(suggestions[idx].newRange, vscode.TextEditorRevealType.Default);
    // if (extensionContext) {
    //   registerAllCodeLensProviders(extensionContext);
    // }
}
function suggestionDownCommand() {
    var editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }
    var editorUri = editor.document.uri.toString();
    var uriString = editorUri.toString();
    var suggestions = exports.editorToSuggestions.get(editorUri);
    var idx = exports.currentSuggestion.get(editorUri);
    if (!suggestions || idx === undefined) {
        return;
    }
    var suggestion = suggestions[idx];
    if (!suggestion.newSelected) {
        suggestion.newSelected = true;
    }
    else if (idx + 1 < suggestions.length) {
        exports.currentSuggestion.set(editorUri, idx + 1);
    }
    else {
        return;
    }
    rerenderDecorations(editorUri);
}
function suggestionUpCommand() {
    var editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }
    var editorUri = editor.document.uri.toString();
    var suggestions = exports.editorToSuggestions.get(editorUri);
    var idx = exports.currentSuggestion.get(editorUri);
    if (!suggestions || idx === undefined) {
        return;
    }
    var suggestion = suggestions[idx];
    if (suggestion.newSelected) {
        suggestion.newSelected = false;
    }
    else if (idx > 0) {
        exports.currentSuggestion.set(editorUri, idx - 1);
    }
    else {
        return;
    }
    rerenderDecorations(editorUri);
}
function selectSuggestion(accept, key) {
    if (key === void 0) { key = null; }
    var editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }
    var editorUri = editor.document.uri.toString();
    var suggestions = exports.editorToSuggestions.get(editorUri);
    if (!suggestions) {
        return;
    }
    var idx;
    if (key) {
        // Use the key to find a specific suggestion
        for (var i = 0; i < suggestions.length; i++) {
            if (suggestions[i].newRange === key.newRange &&
                suggestions[i].oldRange === key.oldRange) {
                // Don't include newSelected in the comparison, because it can change
                idx = i;
                break;
            }
        }
    }
    else {
        // Otherwise, use the current suggestion
        idx = exports.currentSuggestion.get(editorUri);
    }
    if (idx === undefined) {
        return;
    }
    var suggestion = suggestions.splice(idx, 1)[0];
    var rangeToDelete;
    switch (accept) {
        case "old":
            rangeToDelete = suggestion.newRange;
            break;
        case "new":
            rangeToDelete = suggestion.oldRange;
            break;
        case "selected":
            rangeToDelete = suggestion.newSelected
                ? suggestion.oldRange
                : suggestion.newRange;
    }
    rangeToDelete = new vscode.Range(rangeToDelete.start, new vscode.Position(rangeToDelete.end.line, 0));
    editor.edit(function (edit) {
        edit.delete(rangeToDelete);
    });
    // Shift the below suggestions up
    var linesToShift = rangeToDelete.end.line - rangeToDelete.start.line;
    for (var _i = 0, suggestions_1 = suggestions; _i < suggestions_1.length; _i++) {
        var below = suggestions_1[_i];
        // Assumes there should be no crossover between suggestions. Might want to enforce this.
        if (below.oldRange.union(below.newRange).start.line >
            suggestion.oldRange.union(suggestion.newRange).start.line) {
            below.oldRange = (0, vscode_1.translate)(below.oldRange, -linesToShift);
            below.newRange = (0, vscode_1.translate)(below.newRange, -linesToShift);
        }
    }
    if (suggestions.length === 0) {
        exports.currentSuggestion.delete(editorUri);
    }
    else {
        exports.currentSuggestion.set(editorUri, Math.min(idx, suggestions.length - 1));
    }
    rerenderDecorations(editorUri);
    exports.editorToSuggestions.set(editorUri, suggestions);
}
function acceptSuggestionCommand(key) {
    if (key === void 0) { key = null; }
    selectSuggestion("selected", key);
}
function handleAllSuggestions(accept) {
    var editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }
    var editorUri = editor.document.uri.toString();
    var suggestions = exports.editorToSuggestions.get(editorUri);
    if (!suggestions) {
        return;
    }
    while (suggestions.length > 0) {
        selectSuggestion(accept ? "new" : "old", suggestions[0]);
    }
}
function acceptAllSuggestionsCommand() {
    handleAllSuggestions(true);
}
function rejectAllSuggestionsCommand() {
    handleAllSuggestions(false);
}
function rejectSuggestionCommand() {
    return __awaiter(this, arguments, void 0, function (key) {
        if (key === void 0) { key = null; }
        return __generator(this, function (_a) {
            selectSuggestion("old", key);
            return [2 /*return*/];
        });
    });
}
function showSuggestion(editorUri, range, suggestion) {
    return __awaiter(this, void 0, void 0, function () {
        var editor;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // Check for empty suggestions:
                    if (suggestion === "" &&
                        range.start.line === range.end.line &&
                        range.start.character === range.end.character) {
                        return [2 /*return*/, Promise.resolve(false)];
                    }
                    return [4 /*yield*/, (0, vscode_1.openEditorAndRevealRange)(editorUri, range)];
                case 1:
                    editor = _a.sent();
                    if (!editor) {
                        return [2 /*return*/, Promise.resolve(false)];
                    }
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            editor
                                .edit(function (edit) {
                                edit.insert(new vscode.Position(range.end.line, 0), suggestion + (suggestion === "" ? "" : "\n"));
                            }, { undoStopBefore: false, undoStopAfter: false })
                                .then(function (success) {
                                if (success) {
                                    var suggestionLinesLength = suggestion === "" ? 0 : suggestion.split("\n").length;
                                    var suggestionRange = new vscode.Range(new vscode.Position(range.end.line, 0), new vscode.Position(range.end.line + suggestionLinesLength, 0));
                                    var content = editor.document.getText(suggestionRange);
                                    var uriString = editor.document.uri.toString();
                                    if (exports.editorToSuggestions.has(uriString)) {
                                        var suggestions = exports.editorToSuggestions.get(uriString);
                                        suggestions.push({
                                            oldRange: range,
                                            newRange: suggestionRange,
                                            newSelected: true,
                                            newContent: content,
                                        });
                                        exports.editorToSuggestions.set(uriString, suggestions);
                                        exports.currentSuggestion.set(uriString, suggestions.length - 1);
                                    }
                                    else {
                                        exports.editorToSuggestions.set(uriString, [
                                            {
                                                oldRange: range,
                                                newRange: suggestionRange,
                                                newSelected: true,
                                                newContent: content,
                                            },
                                        ]);
                                        exports.currentSuggestion.set(uriString, 0);
                                    }
                                    rerenderDecorations(uriString);
                                }
                                resolve(success);
                            }, function (reason) { return reject(reason); });
                        })];
            }
        });
    });
}
