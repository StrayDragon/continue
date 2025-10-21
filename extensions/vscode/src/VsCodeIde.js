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
exports.VsCodeIde = void 0;
var child_process = require("node:child_process");
var node_child_process_1 = require("node:child_process");
var env_1 = require("core/control-plane/env");
var ignore_1 = require("core/indexing/ignore");
var URI = require("uri-js");
var vscode = require("vscode");
var lsp_1 = require("./autocomplete/lsp");
var SecretStorage_1 = require("./stubs/SecretStorage");
var ideUtils_1 = require("./util/ideUtils");
var vscode_1 = require("./util/vscode");
var util_1 = require("./util/util");
var VsCodeIde = /** @class */ (function () {
    function VsCodeIde(vscodeWebviewProtocolPromise, context) {
        var _this = this;
        this.vscodeWebviewProtocolPromise = vscodeWebviewProtocolPromise;
        this.context = context;
        this.showToast = function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            return __awaiter(_this, void 0, void 0, function () {
                var type, message, otherParams, _a, showErrorMessage, showWarningMessage, showInformationMessage;
                return __generator(this, function (_b) {
                    type = params[0], message = params[1], otherParams = params.slice(2);
                    _a = vscode.window, showErrorMessage = _a.showErrorMessage, showWarningMessage = _a.showWarningMessage, showInformationMessage = _a.showInformationMessage;
                    switch (type) {
                        case "error":
                            return [2 /*return*/, showErrorMessage(message, "Show logs").then(function (selection) {
                                    if (selection === "Show logs") {
                                        vscode.commands.executeCommand("workbench.action.toggleDevTools");
                                    }
                                })];
                        case "info":
                            return [2 /*return*/, showInformationMessage.apply(void 0, __spreadArray([message], otherParams, false))];
                        case "warning":
                            return [2 /*return*/, showWarningMessage.apply(void 0, __spreadArray([message], otherParams, false))];
                    }
                    return [2 /*return*/];
                });
            });
        };
        this.ideUtils = new ideUtils_1.VsCodeIdeUtils();
        this.secretStorage = new SecretStorage_1.SecretStorage(context);
    }
    VsCodeIde.prototype.readSecrets = function (keys) {
        return __awaiter(this, void 0, void 0, function () {
            var secretValuePromises, secretValues;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        secretValuePromises = keys.map(function (key) { return _this.secretStorage.get(key); });
                        return [4 /*yield*/, Promise.all(secretValuePromises)];
                    case 1:
                        secretValues = _a.sent();
                        return [2 /*return*/, keys.reduce(function (acc, key, index) {
                                if (secretValues[index] === undefined) {
                                    return acc;
                                }
                                acc[key] = secretValues[index];
                                return acc;
                            }, {})];
                }
            });
        });
    };
    VsCodeIde.prototype.writeSecrets = function (secrets) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, _b, key, value;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _i = 0, _a = Object.entries(secrets);
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        _b = _a[_i], key = _b[0], value = _b[1];
                        return [4 /*yield*/, this.secretStorage.store(key, value)];
                    case 2:
                        _c.sent();
                        _c.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    VsCodeIde.prototype.fileExists = function (uri) {
        return __awaiter(this, void 0, void 0, function () {
            var stat, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.ideUtils.stat(vscode.Uri.parse(uri))];
                    case 1:
                        stat = _a.sent();
                        return [2 /*return*/, stat !== null];
                    case 2:
                        error_1 = _a.sent();
                        if (error_1 instanceof vscode.FileSystemError) {
                            return [2 /*return*/, false];
                        }
                        throw error_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VsCodeIde.prototype.gotoDefinition = function (location) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, lsp_1.executeGotoProvider)({
                            uri: vscode.Uri.parse(location.filepath),
                            line: location.position.line,
                            character: location.position.character,
                            name: "vscode.executeDefinitionProvider",
                        })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    VsCodeIde.prototype.gotoTypeDefinition = function (location) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, lsp_1.executeGotoProvider)({
                            uri: vscode.Uri.parse(location.filepath),
                            line: location.position.line,
                            character: location.position.character,
                            name: "vscode.executeTypeDefinitionProvider",
                        })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    VsCodeIde.prototype.getSignatureHelp = function (location) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, lsp_1.executeSignatureHelpProvider)({
                            uri: vscode.Uri.parse(location.filepath),
                            line: location.position.line,
                            character: location.position.character,
                            name: "vscode.executeSignatureHelpProvider",
                        })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    VsCodeIde.prototype.getReferences = function (location) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, lsp_1.executeGotoProvider)({
                            uri: vscode.Uri.parse(location.filepath),
                            line: location.position.line,
                            character: location.position.character,
                            name: "vscode.executeReferenceProvider",
                        })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    VsCodeIde.prototype.getDocumentSymbols = function (textDocumentIdentifier) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, lsp_1.executeSymbolProvider)({
                            uri: vscode.Uri.parse(textDocumentIdentifier),
                            name: "vscode.executeDocumentSymbolProvider",
                        })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    VsCodeIde.prototype.onDidChangeActiveTextEditor = function (callback) {
        vscode.window.onDidChangeActiveTextEditor(function (editor) {
            if (editor) {
                callback(editor.document.uri.toString());
            }
        });
    };
    VsCodeIde.prototype.getRepoName = function (dir) {
        return __awaiter(this, void 0, void 0, function () {
            var repo, remotes, remote, ownerAndRepo;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.getRepo(dir)];
                    case 1:
                        repo = _c.sent();
                        remotes = repo === null || repo === void 0 ? void 0 : repo.state.remotes;
                        if (!remotes) {
                            return [2 /*return*/, undefined];
                        }
                        remote = (_a = remotes === null || remotes === void 0 ? void 0 : remotes.find(function (r) { return r.name === "origin"; })) !== null && _a !== void 0 ? _a : remotes === null || remotes === void 0 ? void 0 : remotes[0];
                        if (!remote) {
                            return [2 /*return*/, undefined];
                        }
                        ownerAndRepo = (_b = remote.fetchUrl) === null || _b === void 0 ? void 0 : _b.replace(".git", "").split("/").slice(-2);
                        return [2 /*return*/, ownerAndRepo === null || ownerAndRepo === void 0 ? void 0 : ownerAndRepo.join("/")];
                }
            });
        });
    };
    VsCodeIde.prototype.getTags = function (artifactId) {
        return __awaiter(this, void 0, void 0, function () {
            var workspaceDirs, branches, tags;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getWorkspaceDirs()];
                    case 1:
                        workspaceDirs = _a.sent();
                        return [4 /*yield*/, Promise.all(workspaceDirs.map(function (dir) { return _this.getBranch(dir); }))];
                    case 2:
                        branches = _a.sent();
                        tags = workspaceDirs.map(function (directory, i) { return ({
                            directory: directory,
                            branch: branches[i],
                            artifactId: artifactId,
                        }); });
                        return [2 /*return*/, tags];
                }
            });
        });
    };
    VsCodeIde.prototype.getIdeInfo = function () {
        return Promise.resolve({
            ideType: "vscode",
            name: vscode.env.appName,
            version: vscode.version,
            remoteName: vscode.env.remoteName || "local",
            extensionVersion: (0, util_1.getExtensionVersion)(),
            isPrerelease: (0, util_1.isExtensionPrerelease)(),
        });
    };
    VsCodeIde.prototype.readRangeInFile = function (fileUri, range) {
        return this.ideUtils.readRangeInFile(vscode.Uri.parse(fileUri), new vscode.Range(new vscode.Position(range.start.line, range.start.character), new vscode.Position(range.end.line, range.end.character)));
    };
    VsCodeIde.prototype.getFileStats = function (files) {
        return __awaiter(this, void 0, void 0, function () {
            var pathToLastModified;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pathToLastModified = {};
                        return [4 /*yield*/, Promise.all(files.map(function (file) { return __awaiter(_this, void 0, void 0, function () {
                                var stat;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.ideUtils.stat(vscode.Uri.parse(file), false /* No need to catch ENOPRO exceptions */)];
                                        case 1:
                                            stat = _a.sent();
                                            pathToLastModified[file] = {
                                                lastModified: stat.mtime,
                                                size: stat.size,
                                            };
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, pathToLastModified];
                }
            });
        });
    };
    VsCodeIde.prototype.getRepo = function (dir) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.ideUtils.getRepo(vscode.Uri.parse(dir))];
            });
        });
    };
    VsCodeIde.prototype.isTelemetryEnabled = function () {
        return __awaiter(this, void 0, void 0, function () {
            var globalEnabled, continueEnabled;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        globalEnabled = vscode.env.isTelemetryEnabled;
                        return [4 /*yield*/, vscode.workspace
                                .getConfiguration(env_1.EXTENSION_NAME)
                                .get("telemetryEnabled")];
                    case 1:
                        continueEnabled = (_a = (_b.sent())) !== null && _a !== void 0 ? _a : true;
                        return [2 /*return*/, globalEnabled && continueEnabled];
                }
            });
        });
    };
    VsCodeIde.prototype.isWorkspaceRemote = function () {
        return Promise.resolve(vscode.env.remoteName !== undefined);
    };
    VsCodeIde.prototype.getUniqueId = function () {
        return Promise.resolve(vscode.env.machineId);
    };
    VsCodeIde.prototype.getDiff = function (includeUnstaged) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ideUtils.getDiff(includeUnstaged)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    VsCodeIde.prototype.getClipboardContent = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = {};
                        return [4 /*yield*/, vscode.env.clipboard.readText()];
                    case 1: return [2 /*return*/, (_a.text = _b.sent(),
                            _a.copiedAt = new Date().toISOString(),
                            _a)];
                }
            });
        });
    };
    VsCodeIde.prototype.getTerminalContents = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ideUtils.getTerminalContents(1)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    VsCodeIde.prototype.getDebugLocals = function (threadIndex) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ideUtils.getDebugLocals(threadIndex)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    VsCodeIde.prototype.getTopLevelCallStackSources = function (threadIndex, stackDepth) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ideUtils.getTopLevelCallStackSources(threadIndex, stackDepth)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    VsCodeIde.prototype.getAvailableThreads = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ideUtils.getAvailableThreads()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    VsCodeIde.prototype.getWorkspaceDirs = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.ideUtils.getWorkspaceDirectories().map(function (uri) { return uri.toString(); })];
            });
        });
    };
    VsCodeIde.prototype.writeFile = function (fileUri, contents) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, vscode.workspace.fs.writeFile(vscode.Uri.parse(fileUri), Buffer.from(contents))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    VsCodeIde.prototype.showVirtualFile = function (title, contents) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.ideUtils.showVirtualFile(title, contents);
                return [2 /*return*/];
            });
        });
    };
    VsCodeIde.prototype.openFile = function (fileUri) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ideUtils.openFile(vscode.Uri.parse(fileUri))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    VsCodeIde.prototype.showLines = function (fileUri, startLine, endLine) {
        return __awaiter(this, void 0, void 0, function () {
            var range;
            return __generator(this, function (_a) {
                range = new vscode.Range(new vscode.Position(startLine, 0), new vscode.Position(endLine, 0));
                (0, vscode_1.openEditorAndRevealRange)(vscode.Uri.parse(fileUri), range).then(function (editor) {
                    // Select the lines
                    editor.selection = new vscode.Selection(new vscode.Position(startLine, 0), new vscode.Position(endLine, 0));
                });
                return [2 /*return*/];
            });
        });
    };
    VsCodeIde.prototype.runCommand = function (command_1) {
        return __awaiter(this, arguments, void 0, function (command, options) {
            var terminal;
            var _a;
            if (options === void 0) { options = { reuseTerminal: true }; }
            return __generator(this, function (_b) {
                if (vscode.window.terminals.length && options.reuseTerminal) {
                    if (options.terminalName) {
                        terminal = vscode.window.terminals.find(function (t) { return (t === null || t === void 0 ? void 0 : t.name) === options.terminalName; });
                    }
                    else {
                        terminal = (_a = vscode.window.activeTerminal) !== null && _a !== void 0 ? _a : vscode.window.terminals[0];
                    }
                }
                if (!terminal) {
                    terminal = vscode.window.createTerminal(options === null || options === void 0 ? void 0 : options.terminalName);
                }
                terminal.show();
                terminal.sendText(command, false);
                return [2 /*return*/];
            });
        });
    };
    VsCodeIde.prototype.saveFile = function (fileUri) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ideUtils.saveFile(vscode.Uri.parse(fileUri))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    VsCodeIde.prototype.readFile = function (fileUri) {
        return __awaiter(this, void 0, void 0, function () {
            var uri_1, notebook, _a, _b, openTextDocument, fileStats, bytes, truncatedBytes, contents, e_1;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 8, , 9]);
                        uri_1 = vscode.Uri.parse(fileUri);
                        if (!((_c = vscode.workspace.notebookDocuments.find(function (doc) {
                            return URI.equal(doc.uri.toString(), uri_1.toString());
                        })) !== null && _c !== void 0)) return [3 /*break*/, 1];
                        _a = _c;
                        return [3 /*break*/, 5];
                    case 1:
                        if (!uri_1.path.endsWith("ipynb")) return [3 /*break*/, 3];
                        return [4 /*yield*/, vscode.workspace.openNotebookDocument(uri_1)];
                    case 2:
                        _b = _d.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _b = undefined;
                        _d.label = 4;
                    case 4:
                        _a = (_b);
                        _d.label = 5;
                    case 5:
                        notebook = _a;
                        if (notebook) {
                            return [2 /*return*/, notebook
                                    .getCells()
                                    .map(function (cell) { return cell.document.getText(); })
                                    .join("\n\n")];
                        }
                        openTextDocument = vscode.workspace.textDocuments.find(function (doc) {
                            return URI.equal(doc.uri.toString(), uri_1.toString());
                        });
                        if (openTextDocument !== undefined) {
                            return [2 /*return*/, openTextDocument.getText()];
                        }
                        return [4 /*yield*/, this.ideUtils.stat(uri_1)];
                    case 6:
                        fileStats = _d.sent();
                        if (fileStats === null || fileStats.size > 10 * VsCodeIde.MAX_BYTES) {
                            return [2 /*return*/, ""];
                        }
                        return [4 /*yield*/, this.ideUtils.readFile(uri_1)];
                    case 7:
                        bytes = _d.sent();
                        if (bytes === null) {
                            return [2 /*return*/, ""];
                        }
                        truncatedBytes = bytes.slice(0, VsCodeIde.MAX_BYTES);
                        contents = new TextDecoder().decode(truncatedBytes);
                        return [2 /*return*/, contents];
                    case 8:
                        e_1 = _d.sent();
                        return [2 /*return*/, ""];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    VsCodeIde.prototype.openUrl = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, vscode.env.openExternal(vscode.Uri.parse(url))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    VsCodeIde.prototype.getExternalUri = function (uri) {
        return __awaiter(this, void 0, void 0, function () {
            var vsCodeUri, externalUri;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        vsCodeUri = vscode.Uri.parse(uri);
                        return [4 /*yield*/, vscode.env.asExternalUri(vsCodeUri)];
                    case 1:
                        externalUri = _a.sent();
                        return [2 /*return*/, externalUri.toString(true)];
                }
            });
        });
    };
    VsCodeIde.prototype.getOpenFiles = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.ideUtils.getOpenFiles().map(function (uri) { return uri.toString(); })];
            });
        });
    };
    VsCodeIde.prototype.getCurrentFile = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!vscode.window.activeTextEditor) {
                    return [2 /*return*/, undefined];
                }
                return [2 /*return*/, {
                        isUntitled: vscode.window.activeTextEditor.document.isUntitled,
                        path: vscode.window.activeTextEditor.document.uri.toString(),
                        contents: vscode.window.activeTextEditor.document.getText(),
                    }];
            });
        });
    };
    VsCodeIde.prototype.getPinnedFiles = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tabArray;
            return __generator(this, function (_a) {
                tabArray = vscode.window.tabGroups.all[0].tabs;
                return [2 /*return*/, tabArray
                        .filter(function (t) { return t.isPinned; })
                        .map(function (t) { return t.input.uri.toString(); })];
            });
        });
    };
    VsCodeIde.prototype.runRipgrepQuery = function (dirUri, args) {
        var relativeDir = vscode.Uri.parse(dirUri).fsPath;
        var ripGrepUri = vscode.Uri.joinPath((0, vscode_1.getExtensionUri)(), "out/node_modules/@vscode/ripgrep/bin/rg");
        var p = child_process.spawn(ripGrepUri.fsPath, args, {
            cwd: relativeDir,
        });
        var output = "";
        p.stdout.on("data", function (data) {
            output += data.toString();
        });
        return new Promise(function (resolve, reject) {
            p.on("error", reject);
            p.on("close", function (code) {
                if (code === 0) {
                    resolve(output);
                }
                else if (code === 1) {
                    // No matches
                    resolve("No matches found. Build, secrets, etc. dirs and files are not included.");
                }
                else {
                    reject(new Error("Process exited with code ".concat(code)));
                }
            });
        });
    };
    VsCodeIde.prototype.getFileResults = function (pattern, maxResults) {
        return __awaiter(this, void 0, void 0, function () {
            var ignoreFiles, ignoreGlobs_1, _i, DEFAULT_IGNORES_1, pattern_1, _loop_1, this_1, _a, ignoreFiles_1, file, ignoreGlobsArray, results, results, _b, _c, dir, dirResults, allResults;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!vscode.env.remoteName) return [3 /*break*/, 7];
                        return [4 /*yield*/, vscode.workspace.findFiles("**/.continueignore", null)];
                    case 1:
                        ignoreFiles = _d.sent();
                        ignoreGlobs_1 = new Set();
                        // Add default ignores from core
                        for (_i = 0, DEFAULT_IGNORES_1 = ignore_1.DEFAULT_IGNORES; _i < DEFAULT_IGNORES_1.length; _i++) {
                            pattern_1 = DEFAULT_IGNORES_1[_i];
                            ignoreGlobs_1.add(pattern_1);
                        }
                        _loop_1 = function (file) {
                            var content, filePath, fileDir, patterns;
                            return __generator(this, function (_e) {
                                switch (_e.label) {
                                    case 0: return [4 /*yield*/, this_1.ideUtils.readFile(file)];
                                    case 1:
                                        content = _e.sent();
                                        if (content === null) {
                                            return [2 /*return*/, "continue"];
                                        }
                                        filePath = vscode.workspace.asRelativePath(file);
                                        fileDir = filePath
                                            .replace(/\\/g, "/")
                                            .replace(/\/$/, "")
                                            .split("/")
                                            .slice(0, -1)
                                            .join("/");
                                        patterns = Buffer.from(content)
                                            .toString()
                                            .split("\n")
                                            .map(function (line) { return line.trim(); })
                                            .filter(function (line) { return line && !line.startsWith("#") && !pattern.startsWith("!"); });
                                        // VSCode does not support negations
                                        patterns
                                            // Handle prefix
                                            .map(function (pattern) {
                                            var normalizedPattern = pattern.replace(/\\/g, "/");
                                            if (normalizedPattern.startsWith("/")) {
                                                if (fileDir) {
                                                    return "{/,}".concat(normalizedPattern);
                                                }
                                                else {
                                                    return "".concat(fileDir, "/").concat(normalizedPattern.substring(1));
                                                }
                                            }
                                            else {
                                                if (fileDir) {
                                                    return "".concat(fileDir, "/").concat(normalizedPattern);
                                                }
                                                else {
                                                    return "**/".concat(normalizedPattern);
                                                }
                                            }
                                        })
                                            // Handle suffix
                                            .map(function (pattern) {
                                            return pattern.endsWith("/") ? "".concat(pattern, "**/*") : pattern;
                                        })
                                            .forEach(function (pattern) {
                                            ignoreGlobs_1.add(pattern);
                                        });
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _a = 0, ignoreFiles_1 = ignoreFiles;
                        _d.label = 2;
                    case 2:
                        if (!(_a < ignoreFiles_1.length)) return [3 /*break*/, 5];
                        file = ignoreFiles_1[_a];
                        return [5 /*yield**/, _loop_1(file)];
                    case 3:
                        _d.sent();
                        _d.label = 4;
                    case 4:
                        _a++;
                        return [3 /*break*/, 2];
                    case 5:
                        ignoreGlobsArray = Array.from(ignoreGlobs_1);
                        return [4 /*yield*/, vscode.workspace.findFiles(pattern, ignoreGlobs_1.size ? "{".concat(ignoreGlobsArray.join(","), "}") : null, maxResults)];
                    case 6:
                        results = _d.sent();
                        return [2 /*return*/, results.map(function (result) { return vscode.workspace.asRelativePath(result); })];
                    case 7:
                        results = [];
                        _b = 0;
                        return [4 /*yield*/, this.getWorkspaceDirs()];
                    case 8:
                        _c = _d.sent();
                        _d.label = 9;
                    case 9:
                        if (!(_b < _c.length)) return [3 /*break*/, 12];
                        dir = _c[_b];
                        return [4 /*yield*/, this.runRipgrepQuery(dir, __spreadArray([
                                "--files",
                                "--iglob",
                                pattern,
                                "--ignore-file",
                                ".continueignore",
                                "--ignore-file",
                                ".gitignore",
                                "--glob",
                                ignore_1.defaultIgnoresGlob
                            ], (maxResults ? ["--max-count", String(maxResults)] : []), true))];
                    case 10:
                        dirResults = _d.sent();
                        results.push(dirResults);
                        _d.label = 11;
                    case 11:
                        _b++;
                        return [3 /*break*/, 9];
                    case 12:
                        allResults = results.join("\n").split("\n");
                        if (maxResults) {
                            // In the case of multiple workspaces, maxResults will be applied to each workspace
                            // And then the combined results will also be truncated
                            return [2 /*return*/, allResults.slice(0, maxResults)];
                        }
                        else {
                            return [2 /*return*/, allResults];
                        }
                        _d.label = 13;
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    VsCodeIde.prototype.getSearchResults = function (query, maxResults) {
        return __awaiter(this, void 0, void 0, function () {
            var results, _i, _a, dir, dirResults, allResults, matches;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (vscode.env.remoteName) {
                            throw new Error("Ripgrep not supported, this workspace is remote");
                        }
                        results = [];
                        _i = 0;
                        return [4 /*yield*/, this.getWorkspaceDirs()];
                    case 1:
                        _a = _b.sent();
                        _b.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        dir = _a[_i];
                        return [4 /*yield*/, this.runRipgrepQuery(dir, __spreadArray(__spreadArray([
                                "-i", // Case-insensitive search
                                "--ignore-file",
                                ".continueignore",
                                "--ignore-file",
                                ".gitignore",
                                "-C",
                                "2", // Show 2 lines of context
                                "--heading", // Only show filepath once per result
                                // Use a single glob with all default ignores
                                "--glob",
                                ignore_1.defaultIgnoresGlob
                            ], (maxResults ? ["-m", maxResults.toString()] : []), true), [
                                "-e",
                                query, // Pattern to search for
                                ".", // Directory to search in
                            ], false))];
                    case 3:
                        dirResults = _b.sent();
                        results.push(dirResults);
                        _b.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5:
                        allResults = results.join("\n");
                        if (maxResults) {
                            matches = Array.from(allResults.matchAll(/(\n--|\n\.\/)/g));
                            if (matches.length > maxResults) {
                                return [2 /*return*/, allResults.substring(0, matches[maxResults].index)];
                            }
                            else {
                                return [2 /*return*/, allResults];
                            }
                        }
                        else {
                            return [2 /*return*/, allResults];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    VsCodeIde.prototype.getProblems = function (fileUri) {
        return __awaiter(this, void 0, void 0, function () {
            var uri;
            var _a;
            return __generator(this, function (_b) {
                uri = fileUri
                    ? vscode.Uri.parse(fileUri)
                    : (_a = vscode.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.document.uri;
                if (!uri) {
                    return [2 /*return*/, []];
                }
                return [2 /*return*/, vscode.languages.getDiagnostics(uri).map(function (d) {
                        return {
                            filepath: uri.toString(),
                            range: {
                                start: {
                                    line: d.range.start.line,
                                    character: d.range.start.character,
                                },
                                end: { line: d.range.end.line, character: d.range.end.character },
                            },
                            message: d.message,
                        };
                    })];
            });
        });
    };
    VsCodeIde.prototype.subprocess = function (command, cwd) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        (0, node_child_process_1.exec)(command, { cwd: cwd }, function (error, stdout, stderr) {
                            if (error) {
                                console.warn(error);
                                reject(stderr);
                            }
                            resolve([stdout, stderr]);
                        });
                    })];
            });
        });
    };
    VsCodeIde.prototype.getBranch = function (dir) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.ideUtils.getBranch(vscode.Uri.parse(dir))];
            });
        });
    };
    VsCodeIde.prototype.getGitRootPath = function (dir) {
        return __awaiter(this, void 0, void 0, function () {
            var root;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ideUtils.getGitRoot(vscode.Uri.parse(dir))];
                    case 1:
                        root = _a.sent();
                        return [2 /*return*/, root === null || root === void 0 ? void 0 : root.toString()];
                }
            });
        });
    };
    VsCodeIde.prototype.listDir = function (dir) {
        return __awaiter(this, void 0, void 0, function () {
            var entries;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ideUtils.readDirectory(vscode.Uri.parse(dir))];
                    case 1:
                        entries = _a.sent();
                        return [2 /*return*/, entries === null ? [] : entries];
                }
            });
        });
    };
    VsCodeIde.prototype.getIdeSettingsSync = function () {
        var settings = vscode.workspace.getConfiguration(env_1.EXTENSION_NAME);
        var remoteConfigServerUrl = settings.get("remoteConfigServerUrl", undefined);
        var ideSettings = {
            remoteConfigServerUrl: remoteConfigServerUrl,
            remoteConfigSyncPeriod: settings.get("remoteConfigSyncPeriod", 60),
            userToken: settings.get("userToken", ""),
            continueTestEnvironment: "production",
            pauseCodebaseIndexOnStart: settings.get("pauseCodebaseIndexOnStart", false),
        };
        return ideSettings;
    };
    VsCodeIde.prototype.getIdeSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ideSettings;
            return __generator(this, function (_a) {
                ideSettings = this.getIdeSettingsSync();
                return [2 /*return*/, ideSettings];
            });
        });
    };
    VsCodeIde.MAX_BYTES = 100000;
    return VsCodeIde;
}());
exports.VsCodeIde = VsCodeIde;
