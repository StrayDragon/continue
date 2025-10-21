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
var fs = require("node:fs");
var node_url_1 = require("node:url");
var FileSystemIde = /** @class */ (function () {
    function FileSystemIde(workspaceDir) {
        this.workspaceDir = workspaceDir;
    }
    FileSystemIde.prototype.readSecrets = function (keys) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, {}];
            });
        });
    };
    FileSystemIde.prototype.writeSecrets = function (secrets) {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    FileSystemIde.prototype.showToast = function (type, message) {
        var otherParams = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            otherParams[_i - 2] = arguments[_i];
        }
        return Promise.resolve();
    };
    FileSystemIde.prototype.fileExists = function (fileUri) {
        var filepath = (0, node_url_1.fileURLToPath)(fileUri);
        return Promise.resolve(fs.existsSync(filepath));
    };
    FileSystemIde.prototype.gotoDefinition = function (location) {
        return Promise.resolve([]);
    };
    FileSystemIde.prototype.gotoTypeDefinition = function (location) {
        return Promise.resolve([]);
    };
    FileSystemIde.prototype.getSignatureHelp = function (location) {
        return Promise.resolve(null);
    };
    FileSystemIde.prototype.getReferences = function (location) {
        return Promise.resolve([]);
    };
    FileSystemIde.prototype.getDocumentSymbols = function (fileUri) {
        return Promise.resolve([]);
    };
    FileSystemIde.prototype.onDidChangeActiveTextEditor = function (callback) {
        return;
    };
    FileSystemIde.prototype.isWorkspaceRemote = function () {
        return Promise.resolve(false);
    };
    FileSystemIde.prototype.getIdeSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, {
                        remoteConfigServerUrl: undefined,
                        remoteConfigSyncPeriod: 60,
                        userToken: "",
                        continueTestEnvironment: "none",
                        pauseCodebaseIndexOnStart: false,
                    }];
            });
        });
    };
    FileSystemIde.prototype.getFileStats = function (fileUris) {
        return __awaiter(this, void 0, void 0, function () {
            var result, _i, fileUris_1, uri, filepath, stats;
            return __generator(this, function (_a) {
                result = {};
                for (_i = 0, fileUris_1 = fileUris; _i < fileUris_1.length; _i++) {
                    uri = fileUris_1[_i];
                    try {
                        filepath = (0, node_url_1.fileURLToPath)(uri);
                        stats = fs.statSync(filepath);
                        result[uri] = {
                            lastModified: stats.mtimeMs,
                            size: stats.size,
                        };
                    }
                    catch (error) {
                        console.error("Error getting last modified time for ".concat(uri, ":"), error);
                    }
                }
                return [2 /*return*/, result];
            });
        });
    };
    FileSystemIde.prototype.getGitRootPath = function (dir) {
        return Promise.resolve(dir);
    };
    FileSystemIde.prototype.listDir = function (dir) {
        return __awaiter(this, void 0, void 0, function () {
            var filepath, all;
            return __generator(this, function (_a) {
                filepath = (0, node_url_1.fileURLToPath)(dir);
                all = fs
                    .readdirSync(filepath, { withFileTypes: true })
                    .map(function (dirent) { return [
                    dirent.name,
                    dirent.isDirectory()
                        ? 2
                        : dirent.isSymbolicLink()
                            ? 64
                            : 1,
                ]; });
                return [2 /*return*/, Promise.resolve(all)];
            });
        });
    };
    FileSystemIde.prototype.getRepoName = function (dir) {
        return Promise.resolve(undefined);
    };
    FileSystemIde.prototype.getTags = function (artifactId) {
        return __awaiter(this, void 0, void 0, function () {
            var directory;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getWorkspaceDirs()];
                    case 1:
                        directory = (_b.sent())[0];
                        _a = {
                            artifactId: artifactId
                        };
                        return [4 /*yield*/, this.getBranch(directory)];
                    case 2: return [2 /*return*/, [
                            (_a.branch = _b.sent(),
                                _a.directory = directory,
                                _a)
                        ]];
                }
            });
        });
    };
    FileSystemIde.prototype.getIdeInfo = function () {
        return Promise.resolve({
            ideType: "vscode",
            name: "na",
            version: "0.1",
            remoteName: "na",
            extensionVersion: "na",
            isPrerelease: false,
        });
    };
    FileSystemIde.prototype.readRangeInFile = function (fileUri, range) {
        return Promise.resolve("");
    };
    FileSystemIde.prototype.isTelemetryEnabled = function () {
        return Promise.resolve(true);
    };
    FileSystemIde.prototype.getUniqueId = function () {
        return Promise.resolve("NOT_UNIQUE");
    };
    FileSystemIde.prototype.getDiff = function (includeUnstaged) {
        return Promise.resolve([]);
    };
    FileSystemIde.prototype.getClipboardContent = function () {
        return Promise.resolve({ text: "", copiedAt: new Date().toISOString() });
    };
    FileSystemIde.prototype.getTerminalContents = function () {
        return Promise.resolve("");
    };
    FileSystemIde.prototype.getDebugLocals = function (threadIndex) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Promise.resolve("")];
            });
        });
    };
    FileSystemIde.prototype.getTopLevelCallStackSources = function (threadIndex, stackDepth) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Promise.resolve([])];
            });
        });
    };
    FileSystemIde.prototype.getAvailableThreads = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Promise.resolve([])];
            });
        });
    };
    FileSystemIde.prototype.showLines = function (fileUri, startLine, endLine) {
        return Promise.resolve();
    };
    FileSystemIde.prototype.getWorkspaceDirs = function () {
        return Promise.resolve([this.workspaceDir]);
    };
    FileSystemIde.prototype.writeFile = function (fileUri, contents) {
        var filepath = (0, node_url_1.fileURLToPath)(fileUri);
        return new Promise(function (resolve, reject) {
            fs.writeFile(filepath, contents, function (err) {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });
    };
    FileSystemIde.prototype.showVirtualFile = function (title, contents) {
        return Promise.resolve();
    };
    FileSystemIde.prototype.openFile = function (path) {
        return Promise.resolve();
    };
    FileSystemIde.prototype.openUrl = function (url) {
        return Promise.resolve();
    };
    FileSystemIde.prototype.runCommand = function (command, options) {
        return Promise.resolve();
    };
    FileSystemIde.prototype.saveFile = function (fileUri) {
        return Promise.resolve();
    };
    FileSystemIde.prototype.readFile = function (fileUri) {
        var filepath = (0, node_url_1.fileURLToPath)(fileUri);
        return new Promise(function (resolve, reject) {
            fs.readFile(filepath, "utf8", function (err, contents) {
                if (err) {
                    reject(err);
                }
                resolve(contents);
            });
        });
    };
    FileSystemIde.prototype.getCurrentFile = function () {
        return Promise.resolve(undefined);
    };
    FileSystemIde.prototype.getBranch = function (dir) {
        return Promise.resolve("");
    };
    FileSystemIde.prototype.getOpenFiles = function () {
        return Promise.resolve([]);
    };
    FileSystemIde.prototype.getPinnedFiles = function () {
        return Promise.resolve([]);
    };
    FileSystemIde.prototype.getSearchResults = function (query, maxResults) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, ""];
            });
        });
    };
    FileSystemIde.prototype.getFileResults = function (pattern, maxResults) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, []];
            });
        });
    };
    FileSystemIde.prototype.getProblems = function (fileUri) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Promise.resolve([])];
            });
        });
    };
    FileSystemIde.prototype.subprocess = function (command, cwd) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, ["", ""]];
            });
        });
    };
    return FileSystemIde;
}());
exports.default = FileSystemIde;
