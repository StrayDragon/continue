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
exports.RecentlyEditedTracker = void 0;
var ranking_1 = require("core/autocomplete/context/ranking");
var vscode = require("vscode");
var RecentlyEditedTracker = /** @class */ (function () {
    function RecentlyEditedTracker(ideUtils) {
        var _this = this;
        this.ideUtils = ideUtils;
        this.recentlyEditedRanges = [];
        this.recentlyEditedDocuments = [];
        vscode.workspace.onDidChangeTextDocument(function (event) {
            event.contentChanges.forEach(function (change) {
                var editedRange = {
                    uri: event.document.uri,
                    range: new vscode.Range(new vscode.Position(change.range.start.line, 0), new vscode.Position(change.range.end.line + 1, 0)),
                    timestamp: Date.now(),
                };
                _this.insertRange(editedRange);
            });
            _this.insertDocument(event.document.uri);
        });
        setInterval(function () {
            _this.removeOldEntries();
        }, 1000 * 15);
    }
    RecentlyEditedTracker.prototype.insertRange = function (editedRange) {
        return __awaiter(this, void 0, void 0, function () {
            var i, range, union, contents_1, contents, newLength;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (editedRange.uri.scheme !== "file") {
                            return [2 /*return*/];
                        }
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < this.recentlyEditedRanges.length)) return [3 /*break*/, 4];
                        range = this.recentlyEditedRanges[i];
                        if (!range.range.intersection(editedRange.range)) return [3 /*break*/, 3];
                        union = range.range.union(editedRange.range);
                        return [4 /*yield*/, this._getContentsForRange(__assign(__assign({}, range), { range: union }))];
                    case 2:
                        contents_1 = _a.sent();
                        range = __assign(__assign({}, range), { range: union, lines: contents_1.split("\n"), symbols: (0, ranking_1.getSymbolsForSnippet)(contents_1) });
                        this.recentlyEditedRanges[i] = range;
                        return [2 /*return*/];
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [4 /*yield*/, this._getContentsForRange(editedRange)];
                    case 5:
                        contents = _a.sent();
                        newLength = this.recentlyEditedRanges.unshift(__assign(__assign({}, editedRange), { lines: contents.split("\n"), symbols: (0, ranking_1.getSymbolsForSnippet)(contents) }));
                        if (newLength >= RecentlyEditedTracker.maxRecentlyEditedRanges) {
                            this.recentlyEditedRanges = this.recentlyEditedRanges.slice(0, RecentlyEditedTracker.maxRecentlyEditedRanges);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    RecentlyEditedTracker.prototype.insertDocument = function (uri) {
        // Don't add a duplicate
        if (this.recentlyEditedDocuments.some(function (doc) { return doc.uri === uri; })) {
            return;
        }
        var newLength = this.recentlyEditedDocuments.unshift({
            uri: uri,
            timestamp: Date.now(),
        });
        if (newLength >= RecentlyEditedTracker.maxRecentlyEditedDocuments) {
            this.recentlyEditedDocuments = this.recentlyEditedDocuments.slice(0, RecentlyEditedTracker.maxRecentlyEditedDocuments);
        }
    };
    RecentlyEditedTracker.prototype.removeOldEntries = function () {
        this.recentlyEditedRanges = this.recentlyEditedRanges.filter(function (entry) { return entry.timestamp > Date.now() - RecentlyEditedTracker.staleTime; });
    };
    RecentlyEditedTracker.prototype._getContentsForRange = function (entry) {
        return __awaiter(this, void 0, void 0, function () {
            var content;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ideUtils.readFile(entry.uri)];
                    case 1:
                        content = _a.sent();
                        if (content === null) {
                            return [2 /*return*/, ""];
                        }
                        return [2 /*return*/, content
                                .toString()
                                .split("\n")
                                .slice(entry.range.start.line, entry.range.end.line + 1)
                                .join("\n")];
                }
            });
        });
    };
    RecentlyEditedTracker.prototype.getRecentlyEditedRanges = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.recentlyEditedRanges.map(function (entry) {
                        return __assign(__assign({}, entry), { filepath: entry.uri.toString() });
                    })];
            });
        });
    };
    RecentlyEditedTracker.prototype.getRecentlyEditedDocuments = function () {
        return __awaiter(this, void 0, void 0, function () {
            var results;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(this.recentlyEditedDocuments.map(function (entry) { return __awaiter(_this, void 0, void 0, function () {
                            var contents, lines, e_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, vscode.workspace.fs
                                                .readFile(entry.uri)
                                                .then(function (content) { return content.toString(); })];
                                    case 1:
                                        contents = _a.sent();
                                        lines = contents.split("\n");
                                        return [2 /*return*/, {
                                                filepath: entry.uri.toString(),
                                                contents: contents,
                                                range: {
                                                    start: { line: 0, character: 0 },
                                                    end: {
                                                        line: lines.length - 1,
                                                        character: lines[lines.length - 1].length,
                                                    },
                                                },
                                            }];
                                    case 2:
                                        e_1 = _a.sent();
                                        return [2 /*return*/, null];
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); }))];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, results.filter(function (result) { return result !== null; })];
                }
            });
        });
    };
    RecentlyEditedTracker.staleTime = 1000 * 60 * 2;
    RecentlyEditedTracker.maxRecentlyEditedRanges = 3;
    RecentlyEditedTracker.maxRecentlyEditedDocuments = 10;
    return RecentlyEditedTracker;
}());
exports.RecentlyEditedTracker = RecentlyEditedTracker;
