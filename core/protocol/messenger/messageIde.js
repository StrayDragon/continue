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
exports.MessageIde = void 0;
var MessageIde = /** @class */ (function () {
    function MessageIde(request, on) {
        var _this = this;
        this.request = request;
        this.on = on;
        this.showToast = function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            return _this.request("showToast", params);
        };
    }
    MessageIde.prototype.readSecrets = function (keys) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request("readSecrets", { keys: keys })];
            });
        });
    };
    MessageIde.prototype.writeSecrets = function (secrets) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request("writeSecrets", { secrets: secrets })];
            });
        });
    };
    MessageIde.prototype.fileExists = function (fileUri) {
        return this.request("fileExists", { filepath: fileUri });
    };
    MessageIde.prototype.gotoDefinition = function (location) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request("gotoDefinition", { location: location })];
            });
        });
    };
    MessageIde.prototype.gotoTypeDefinition = function (location) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request("gotoTypeDefinition", { location: location })];
            });
        });
    };
    MessageIde.prototype.getSignatureHelp = function (location) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request("getSignatureHelp", { location: location })];
            });
        });
    };
    MessageIde.prototype.getReferences = function (location) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request("getReferences", { location: location })];
            });
        });
    };
    MessageIde.prototype.getDocumentSymbols = function (textDocumentIdentifier) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request("getDocumentSymbols", { textDocumentIdentifier: textDocumentIdentifier })];
            });
        });
    };
    MessageIde.prototype.onDidChangeActiveTextEditor = function (callback) {
        this.on("didChangeActiveTextEditor", function (data) { return callback(data.filepath); });
    };
    MessageIde.prototype.getIdeSettings = function () {
        return this.request("getIdeSettings", undefined);
    };
    MessageIde.prototype.getFileStats = function (files) {
        return this.request("getFileStats", { files: files });
    };
    MessageIde.prototype.getGitRootPath = function (dir) {
        return this.request("getGitRootPath", { dir: dir });
    };
    MessageIde.prototype.listDir = function (dir) {
        return this.request("listDir", { dir: dir });
    };
    MessageIde.prototype.getRepoName = function (dir) {
        return this.request("getRepoName", { dir: dir });
    };
    MessageIde.prototype.getDebugLocals = function (threadIndex) {
        return this.request("getDebugLocals", { threadIndex: threadIndex });
    };
    MessageIde.prototype.getTopLevelCallStackSources = function (threadIndex, stackDepth) {
        return this.request("getTopLevelCallStackSources", {
            threadIndex: threadIndex,
            stackDepth: stackDepth,
        });
    };
    MessageIde.prototype.getAvailableThreads = function () {
        return this.request("getAvailableThreads", undefined);
    };
    MessageIde.prototype.getTags = function (artifactId) {
        return this.request("getTags", artifactId);
    };
    MessageIde.prototype.getIdeInfo = function () {
        return this.request("getIdeInfo", undefined);
    };
    MessageIde.prototype.readRangeInFile = function (filepath, range) {
        return this.request("readRangeInFile", { filepath: filepath, range: range });
    };
    MessageIde.prototype.isTelemetryEnabled = function () {
        return this.request("isTelemetryEnabled", undefined);
    };
    MessageIde.prototype.isWorkspaceRemote = function () {
        return this.request("isWorkspaceRemote", undefined);
    };
    MessageIde.prototype.getUniqueId = function () {
        return this.request("getUniqueId", undefined);
    };
    MessageIde.prototype.getDiff = function (includeUnstaged) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request("getDiff", { includeUnstaged: includeUnstaged })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MessageIde.prototype.getClipboardContent = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, {
                        text: "",
                        copiedAt: new Date().toISOString(),
                    }];
            });
        });
    };
    MessageIde.prototype.getTerminalContents = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request("getTerminalContents", undefined)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MessageIde.prototype.getWorkspaceDirs = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request("getWorkspaceDirs", undefined)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MessageIde.prototype.showLines = function (fileUri, startLine, endLine) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request("showLines", {
                            filepath: fileUri,
                            startLine: startLine,
                            endLine: endLine,
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MessageIde.prototype.writeFile = function (fileUri, contents) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request("writeFile", { path: fileUri, contents: contents })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MessageIde.prototype.showVirtualFile = function (title, contents) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request("showVirtualFile", { name: title, content: contents })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MessageIde.prototype.openFile = function (fileUri) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request("openFile", { path: fileUri })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MessageIde.prototype.openUrl = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request("openUrl", url)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MessageIde.prototype.runCommand = function (command, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request("runCommand", { command: command, options: options })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MessageIde.prototype.saveFile = function (fileUri) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request("saveFile", { filepath: fileUri })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MessageIde.prototype.readFile = function (fileUri) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request("readFile", { filepath: fileUri })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MessageIde.prototype.getOpenFiles = function () {
        return this.request("getOpenFiles", undefined);
    };
    MessageIde.prototype.getCurrentFile = function () {
        return this.request("getCurrentFile", undefined);
    };
    MessageIde.prototype.getPinnedFiles = function () {
        return this.request("getPinnedFiles", undefined);
    };
    MessageIde.prototype.getSearchResults = function (query, maxResults) {
        return this.request("getSearchResults", { query: query, maxResults: maxResults });
    };
    MessageIde.prototype.getFileResults = function (pattern) {
        return this.request("getFileResults", { pattern: pattern });
    };
    MessageIde.prototype.getProblems = function (fileUri) {
        return this.request("getProblems", { filepath: fileUri });
    };
    MessageIde.prototype.subprocess = function (command, cwd) {
        return this.request("subprocess", { command: command, cwd: cwd });
    };
    MessageIde.prototype.getBranch = function (dir) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request("getBranch", { dir: dir })];
            });
        });
    };
    return MessageIde;
}());
exports.MessageIde = MessageIde;
