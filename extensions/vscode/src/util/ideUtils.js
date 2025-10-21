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
exports.VsCodeIdeUtils = void 0;
var env_1 = require("core/control-plane/env");
var uri_1 = require("core/util/uri");
var lodash_1 = require("lodash");
var URI = require("uri-js");
var vscode = require("vscode");
var debug_1 = require("../debug/debug");
var VsCodeExtension_1 = require("../extension/VsCodeExtension");
var suggestions_1 = require("../suggestions");
var vscode_1 = require("./vscode");
var util = require("node:util");
var asyncExec = util.promisify(require("node:child_process").exec);
var NO_FS_PROVIDER_ERROR = "ENOPRO";
var UNSUPPORTED_SCHEMES = new Set();
var VsCodeIdeUtils = /** @class */ (function () {
    function VsCodeIdeUtils() {
        this.visibleMessages = new Set();
        this._workspaceDirectories = undefined;
        this._repoWasNone = false;
        this.repoCache = new Map();
    }
    VsCodeIdeUtils.prototype.gotoDefinition = function (uri, position) {
        return __awaiter(this, void 0, void 0, function () {
            var locations;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, vscode.commands.executeCommand("vscode.executeDefinitionProvider", uri, position)];
                    case 1:
                        locations = _a.sent();
                        return [2 /*return*/, locations];
                }
            });
        });
    };
    VsCodeIdeUtils.prototype.documentSymbol = function (uri) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, vscode.commands.executeCommand("vscode.executeDocumentSymbolProvider", uri)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    VsCodeIdeUtils.prototype.references = function (uri, position) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, vscode.commands.executeCommand("vscode.executeReferenceProvider", uri, position)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    VsCodeIdeUtils.prototype.foldingRanges = function (uri) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, vscode.commands.executeCommand("vscode.executeFoldingRangeProvider", uri)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    VsCodeIdeUtils.prototype.getWorkspaceDirectories = function () {
        var _a;
        if (this._workspaceDirectories === undefined) {
            this._workspaceDirectories =
                ((_a = vscode.workspace.workspaceFolders) === null || _a === void 0 ? void 0 : _a.map(function (folder) { return folder.uri; })) || [];
        }
        return this._workspaceDirectories;
    };
    VsCodeIdeUtils.prototype.setWokspaceDirectories = function (dirs) {
        this._workspaceDirectories = dirs;
    };
    VsCodeIdeUtils.prototype.getUniqueId = function () {
        return (0, vscode_1.getUniqueId)();
    };
    VsCodeIdeUtils.prototype.showSuggestion = function (uri, range, suggestion) {
        (0, suggestions_1.showSuggestion)(uri, new vscode.Range(range.start.line, range.start.character, range.end.line, range.end.character), suggestion);
    };
    VsCodeIdeUtils.prototype.openFile = function (uri, range) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, vscode_1.openEditorAndRevealRange)(uri, range, vscode.ViewColumn.One, false)];
                    case 1: 
                    // vscode has a builtin open/get open files
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    VsCodeIdeUtils.prototype.fileExists = function (uri) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.stat(uri)];
                    case 1: return [2 /*return*/, (_b.sent()) !== null];
                    case 2:
                        _a = _b.sent();
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Read the entire contents of a file from the given URI.
     * If there are unsaved changes in an open editor, returns those instead of the file on disk.
     *
     * @param uri - The URI of the file to read.
     * @param ignoreMissingProviders - Optional flag to ignore missing file system providers for unsupported schemes.
     *                                 Defaults to `true`.
     * @returns A promise that resolves to the file content as a `Uint8Array`, or `null` if the scheme is unsupported
     *          or the provider is missing and `ignoreMissingProviders` is `true`.
     *          If `ignoreMissingProviders` is `false`, it will throw an error for unsupported schemes or missing providers.
     * @throws Will rethrow any error that is not related to missing providers or unsupported schemes.
     */
    VsCodeIdeUtils.prototype.readFile = function (uri_2) {
        return __awaiter(this, arguments, void 0, function (uri, ignoreMissingProviders) {
            var openDocuments, _i, openDocuments_1, document_1, docText;
            var _this = this;
            if (ignoreMissingProviders === void 0) { ignoreMissingProviders = true; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        openDocuments = vscode.workspace.textDocuments;
                        for (_i = 0, openDocuments_1 = openDocuments; _i < openDocuments_1.length; _i++) {
                            document_1 = openDocuments_1[_i];
                            if (document_1.uri.toString() === uri.toString()) {
                                docText = document_1.getText();
                                return [2 /*return*/, Buffer.from(docText, "utf8")];
                            }
                        }
                        return [4 /*yield*/, this.fsOperation(uri, function (u) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, vscode.workspace.fs.readFile(u)];
                                        case 1: return [2 /*return*/, _a.sent()];
                                    }
                                });
                            }); }, ignoreMissingProviders)];
                    case 1: 
                    // If no open document found or if it's not dirty, fall back to reading from disk.
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Retrieve metadata about a file from the given URI.
     *
     * @param uri - The URI of the file or directory to retrieve metadata about.
     * @param ignoreMissingProviders - Optional. If `true`, missing file system providers will be ignored. Defaults to `true`.
     * @returns A promise that resolves to a `vscode.FileStat` object containing the file metadata,
     *          or `null` if the scheme is unsupported or the provider is missing and `ignoreMissingProviders` is `true`.
     */
    VsCodeIdeUtils.prototype.stat = function (uri_2) {
        return __awaiter(this, arguments, void 0, function (uri, ignoreMissingProviders) {
            var _this = this;
            if (ignoreMissingProviders === void 0) { ignoreMissingProviders = true; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fsOperation(uri, function (u) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, vscode.workspace.fs.stat(uri)];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            });
                        }); }, ignoreMissingProviders)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Retrieve all entries of a directory from the given URI.
     *
     * @param uri - The URI of the directory to read.
     * @param ignoreMissingProviders - Optional. If `true`, missing file system providers will be ignored. Defaults to `true`.
     * @returns A promise that resolves to an array of tuples, where each tuple contains the name of a directory entry
     *          and its type (`vscode.FileType`), or `null` if the scheme is unsupported or the provider is missing and `ignoreMissingProviders` is `true`.
     */
    VsCodeIdeUtils.prototype.readDirectory = function (uri_2) {
        return __awaiter(this, arguments, void 0, function (uri, ignoreMissingProviders) {
            var _this = this;
            if (ignoreMissingProviders === void 0) { ignoreMissingProviders = true; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fsOperation(uri, function (u) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, vscode.workspace.fs.readDirectory(uri)];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            });
                        }); }, ignoreMissingProviders)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Performs a file system operation on the given URI using the provided delegate function.
     *
     * @template T The type of the result returned by the delegate function.
     * @param uri The URI on which the file system operation is to be performed.
     * @param delegate A function that performs the desired operation on the given URI.
     * @param ignoreMissingProviders Whether to ignore errors caused by missing file system providers. Defaults to `true`.
     * @returns A promise that resolves to the result of the delegate function, or `null` if the operation is skipped due to unsupported schemes or missing providers.
     * @throws Re-throws any error encountered during the operation, except for missing provider errors when `ignoreMissingProviders` is `true`.
     */
    VsCodeIdeUtils.prototype.fsOperation = function (uri_2, delegate_1) {
        return __awaiter(this, arguments, void 0, function (uri, delegate, ignoreMissingProviders) {
            var scheme, err_1;
            var _a;
            if (ignoreMissingProviders === void 0) { ignoreMissingProviders = true; }
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        scheme = uri.scheme;
                        if (ignoreMissingProviders && UNSUPPORTED_SCHEMES.has(scheme)) {
                            return [2 /*return*/, null];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, delegate(uri)];
                    case 2: return [2 /*return*/, _b.sent()];
                    case 3:
                        err_1 = _b.sent();
                        if (ignoreMissingProviders &&
                            //see https://github.com/microsoft/vscode/blob/c9c54f9e775e5f57d97bef796797b5bc670c8150/src/vs/workbench/api/common/extHostFileSystemConsumer.ts#L230
                            (err_1.name === NO_FS_PROVIDER_ERROR ||
                                ((_a = err_1.message) === null || _a === void 0 ? void 0 : _a.includes(NO_FS_PROVIDER_ERROR)))) {
                            UNSUPPORTED_SCHEMES.add(scheme);
                            console.log("Ignoring missing provider error:", err_1.message);
                            return [2 /*return*/, null];
                        }
                        throw err_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    VsCodeIdeUtils.prototype.showVirtualFile = function (name, contents) {
        vscode.workspace
            .openTextDocument(vscode.Uri.parse("".concat(VsCodeExtension_1.VsCodeExtension.continueVirtualDocumentScheme, ":").concat(encodeURIComponent(name), "?").concat(encodeURIComponent(contents))))
            .then(function (doc) {
            vscode.window.showTextDocument(doc, { preview: false });
        });
    };
    VsCodeIdeUtils.prototype.getUserSecret = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var secret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        secret = vscode.workspace.getConfiguration(env_1.EXTENSION_NAME).get(key);
                        if (typeof secret !== "undefined" && secret !== null) {
                            return [2 /*return*/, secret];
                        }
                        return [4 /*yield*/, vscode.window.showInputBox({
                                prompt: "Either enter secret for ".concat(key, " or press enter to try Continue for free."),
                                password: true,
                            })];
                    case 1:
                        // If not, ask user for secret
                        secret = _a.sent();
                        // Add secret to VS Code settings
                        vscode.workspace
                            .getConfiguration(env_1.EXTENSION_NAME)
                            .update(key, secret, vscode.ConfigurationTarget.Global);
                        return [2 /*return*/, secret];
                }
            });
        });
    };
    // ------------------------------------ //
    // Initiate Request
    VsCodeIdeUtils.prototype.acceptRejectSuggestion = function (accept, key) {
        if (accept) {
            (0, suggestions_1.acceptSuggestionCommand)(key);
        }
        else {
            (0, suggestions_1.rejectSuggestionCommand)(key);
        }
    };
    // ------------------------------------ //
    // Respond to request
    // Checks to see if the editor is a code editor.
    // In some cases vscode.window.visibleTextEditors can return non-code editors
    // e.g. terminal editors in side-by-side mode
    VsCodeIdeUtils.prototype.documentIsCode = function (uri) {
        return uri.scheme === "file" || uri.scheme === "vscode-remote";
    };
    VsCodeIdeUtils.prototype.getOpenFiles = function () {
        var _this = this;
        return vscode.window.tabGroups.all
            .flatMap(function (group) { return group.tabs; })
            .filter(function (tab) {
            return tab.input instanceof vscode.TabInputText &&
                _this.documentIsCode(tab.input.uri);
        })
            .map(function (tab) { return tab.input.uri; });
    };
    VsCodeIdeUtils.prototype.saveFile = function (uri) {
        var _this = this;
        vscode.window.visibleTextEditors
            .filter(function (editor) { return _this.documentIsCode(editor.document.uri); })
            .forEach(function (editor) {
            if (URI.equal(editor.document.uri.toString(), uri.toString())) {
                editor.document.save();
            }
        });
    };
    VsCodeIdeUtils.prototype.readRangeInFile = function (uri, range) {
        return __awaiter(this, void 0, void 0, function () {
            var buffer, contents, lines;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.readFile(uri)];
                    case 1:
                        buffer = _a.sent();
                        if (buffer === null) {
                            return [2 /*return*/, ""];
                        }
                        contents = new TextDecoder().decode(buffer);
                        lines = contents.split("\n");
                        return [2 /*return*/, "".concat(lines
                                .slice(range.start.line, range.end.line)
                                .join("\n"), "\n").concat(lines[range.end.line < lines.length - 1 ? range.end.line : lines.length - 1].slice(0, range.end.character))];
                }
            });
        });
    };
    VsCodeIdeUtils.prototype.getTerminalContents = function () {
        return __awaiter(this, arguments, void 0, function (commands) {
            var tempCopyBuffer, i, terminalContents, lines, lastLine, i;
            var _a;
            if (commands === void 0) { commands = -1; }
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, vscode.env.clipboard.readText()];
                    case 1:
                        tempCopyBuffer = _b.sent();
                        if (!(commands < 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, vscode.commands.executeCommand("workbench.action.terminal.selectAll")];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 7];
                    case 3:
                        i = 0;
                        _b.label = 4;
                    case 4:
                        if (!(i < commands)) return [3 /*break*/, 7];
                        return [4 /*yield*/, vscode.commands.executeCommand("workbench.action.terminal.selectToPreviousCommand")];
                    case 5:
                        _b.sent();
                        _b.label = 6;
                    case 6:
                        i++;
                        return [3 /*break*/, 4];
                    case 7: return [4 /*yield*/, vscode.commands.executeCommand("workbench.action.terminal.copySelection")];
                    case 8:
                        _b.sent();
                        return [4 /*yield*/, vscode.commands.executeCommand("workbench.action.terminal.clearSelection")];
                    case 9:
                        _b.sent();
                        return [4 /*yield*/, vscode.env.clipboard.readText()];
                    case 10:
                        terminalContents = (_b.sent()).trim();
                        return [4 /*yield*/, vscode.env.clipboard.writeText(tempCopyBuffer)];
                    case 11:
                        _b.sent();
                        if (tempCopyBuffer === terminalContents) {
                            // This means there is no terminal open to select text from
                            return [2 /*return*/, ""];
                        }
                        lines = terminalContents.split("\n");
                        lastLine = (_a = lines.pop()) === null || _a === void 0 ? void 0 : _a.trim();
                        if (lastLine) {
                            i = lines.length - 1;
                            while (i >= 0 && !lines[i].trim().startsWith(lastLine)) {
                                i--;
                            }
                            terminalContents = lines.slice(Math.max(i, 0)).join("\n");
                        }
                        return [2 /*return*/, terminalContents];
                }
            });
        });
    };
    VsCodeIdeUtils.prototype._getThreads = function (session) {
        return __awaiter(this, void 0, void 0, function () {
            var threadsResponse, threads;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, session.customRequest("threads")];
                    case 1:
                        threadsResponse = _a.sent();
                        threads = threadsResponse.threads.filter(function (thread) {
                            return debug_1.threadStopped.get(thread.id);
                        });
                        threads.sort(function (a, b) { return a.id - b.id; });
                        threadsResponse.threads = threads;
                        return [2 /*return*/, threadsResponse];
                }
            });
        });
    };
    VsCodeIdeUtils.prototype.getAvailableThreads = function () {
        return __awaiter(this, void 0, void 0, function () {
            var session, threadsResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        session = vscode.debug.activeDebugSession;
                        if (!session) {
                            return [2 /*return*/, []];
                        }
                        return [4 /*yield*/, this._getThreads(session)];
                    case 1:
                        threadsResponse = _a.sent();
                        return [2 /*return*/, threadsResponse.threads];
                }
            });
        });
    };
    VsCodeIdeUtils.prototype.getDebugLocals = function () {
        return __awaiter(this, arguments, void 0, function (threadIndex) {
            var session, variablesResponse, variableContext;
            if (threadIndex === void 0) { threadIndex = 0; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        session = vscode.debug.activeDebugSession;
                        if (!session) {
                            vscode.window.showWarningMessage("No active debug session found, therefore no debug context will be provided for the llm.");
                            return [2 /*return*/, ""];
                        }
                        return [4 /*yield*/, session
                                .customRequest("stackTrace", {
                                threadId: threadIndex,
                                startFrame: 0,
                            })
                                .then(function (traceResponse) {
                                return session.customRequest("scopes", {
                                    frameId: traceResponse.stackFrames[0].id,
                                });
                            })
                                .then(function (scopesResponse) {
                                return session.customRequest("variables", {
                                    variablesReference: scopesResponse.scopes[0].variablesReference,
                                });
                            })];
                    case 1:
                        variablesResponse = _a.sent();
                        variableContext = variablesResponse.variables
                            .filter(function (variable) { return variable.type !== "global"; })
                            .reduce(function (acc, variable) {
                            return "".concat(acc, "\nname: ").concat(variable.name, ", type: ").concat(variable.type, ", ") +
                                "value: ".concat(variable.value);
                        }, "");
                        return [2 /*return*/, variableContext];
                }
            });
        });
    };
    VsCodeIdeUtils.prototype.getTopLevelCallStackSources = function (threadIndex_1) {
        return __awaiter(this, arguments, void 0, function (threadIndex, stackDepth) {
            var session, sourcesPromises;
            var _this = this;
            if (stackDepth === void 0) { stackDepth = 3; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        session = vscode.debug.activeDebugSession;
                        if (!session) {
                            return [2 /*return*/, []];
                        }
                        return [4 /*yield*/, session
                                .customRequest("stackTrace", {
                                threadId: threadIndex,
                                startFrame: 0,
                            })
                                .then(function (traceResponse) {
                                return traceResponse.stackFrames
                                    .slice(0, stackDepth)
                                    .map(function (stackFrame) { return __awaiter(_this, void 0, void 0, function () {
                                    var scopeResponse, scope;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, session.customRequest("scopes", {
                                                    frameId: stackFrame.id,
                                                })];
                                            case 1:
                                                scopeResponse = _a.sent();
                                                scope = scopeResponse.scopes[0];
                                                return [4 /*yield*/, this.retrieveSource(scope.source && !lodash_1.default.isEmpty(scope.source) ? scope : stackFrame)];
                                            case 2: return [2 /*return*/, _a.sent()];
                                        }
                                    });
                                }); });
                            })];
                    case 1:
                        sourcesPromises = _a.sent();
                        return [2 /*return*/, Promise.all(sourcesPromises)];
                }
            });
        });
    };
    VsCodeIdeUtils.prototype.retrieveSource = function (sourceContainer) {
        return __awaiter(this, void 0, void 0, function () {
            var sourceRef, sourceResponse;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!sourceContainer.source) {
                            return [2 /*return*/, ""];
                        }
                        sourceRef = sourceContainer.source.sourceReference;
                        if (!(sourceRef && sourceRef > 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, ((_a = vscode.debug.activeDebugSession) === null || _a === void 0 ? void 0 : _a.customRequest("source", {
                                source: sourceContainer.source,
                                sourceReference: sourceRef,
                            }))];
                    case 1:
                        sourceResponse = _b.sent();
                        return [2 /*return*/, sourceResponse.content];
                    case 2:
                        if (!(sourceContainer.line && sourceContainer.endLine)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.readRangeInFile(sourceContainer.source.path, new vscode.Range(sourceContainer.line - 1, // The line number from scope response starts from 1
                            sourceContainer.column, sourceContainer.endLine - 1, sourceContainer.endColumn))];
                    case 3: return [2 /*return*/, _b.sent()];
                    case 4:
                        if (!sourceContainer.line) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.readRangeInFile(sourceContainer.source.path, new vscode.Range(Math.max(0, sourceContainer.line - 3), 0, sourceContainer.line + 2, 0))];
                    case 5: 
                    // fall back to 5 line of context
                    return [2 /*return*/, _b.sent()];
                    case 6: return [2 /*return*/, "unavailable"];
                }
            });
        });
    };
    VsCodeIdeUtils.prototype._getRepo = function (forDirectory) {
        return __awaiter(this, void 0, void 0, function () {
            var extension, git;
            var _a;
            return __generator(this, function (_b) {
                extension = vscode.extensions.getExtension("vscode.git");
                if (typeof extension === "undefined" ||
                    !extension.isActive ||
                    typeof vscode.workspace.workspaceFolders === "undefined") {
                    return [2 /*return*/, undefined];
                }
                try {
                    git = extension.exports.getAPI(1);
                    return [2 /*return*/, (_a = git.getRepository(forDirectory)) !== null && _a !== void 0 ? _a : undefined];
                }
                catch (e) {
                    this._repoWasNone = true;
                    console.warn("Git not found: ", e);
                    return [2 /*return*/, undefined];
                }
                return [2 /*return*/];
            });
        });
    };
    VsCodeIdeUtils.prototype._getRepositories = function () {
        var extension = vscode.extensions.getExtension("vscode.git");
        if (typeof extension === "undefined" ||
            !extension.isActive ||
            typeof vscode.workspace.workspaceFolders === "undefined") {
            return undefined;
        }
        try {
            var git = extension.exports.getAPI(1);
            return git.repositories;
        }
        catch (e) {
            this._repoWasNone = true;
            console.warn("Git not found: ", e);
            return undefined;
        }
    };
    VsCodeIdeUtils.prototype.getRepo = function (forDirectory) {
        return __awaiter(this, void 0, void 0, function () {
            var workspaceDirs, foundInDir, cachedRepo, repo, i;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        workspaceDirs = this.getWorkspaceDirectories().map(function (dir) {
                            return dir.toString();
                        });
                        foundInDir = (0, uri_1.findUriInDirs)(forDirectory.toString(), workspaceDirs).foundInDir;
                        if (foundInDir) {
                            cachedRepo = this.repoCache.get(foundInDir);
                            if (cachedRepo) {
                                return [2 /*return*/, cachedRepo];
                            }
                        }
                        return [4 /*yield*/, this._getRepo(forDirectory)];
                    case 1:
                        repo = _c.sent();
                        i = 0;
                        _c.label = 2;
                    case 2:
                        if (!!((_b = (_a = repo === null || repo === void 0 ? void 0 : repo.state) === null || _a === void 0 ? void 0 : _a.HEAD) === null || _b === void 0 ? void 0 : _b.name)) return [3 /*break*/, 5];
                        if (this._repoWasNone) {
                            return [2 /*return*/, undefined];
                        }
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                    case 3:
                        _c.sent();
                        i++;
                        if (i >= VsCodeIdeUtils.secondsToWaitForGitToLoad) {
                            this._repoWasNone = true;
                            return [2 /*return*/, undefined];
                        }
                        return [4 /*yield*/, this._getRepo(forDirectory)];
                    case 4:
                        repo = _c.sent();
                        return [3 /*break*/, 2];
                    case 5:
                        if (foundInDir) {
                            // Cache the repository for the parent directory
                            this.repoCache.set(foundInDir, repo);
                        }
                        return [2 /*return*/, repo];
                }
            });
        });
    };
    VsCodeIdeUtils.prototype.getGitRoot = function (forDirectory) {
        return __awaiter(this, void 0, void 0, function () {
            var repo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getRepo(forDirectory)];
                    case 1:
                        repo = _a.sent();
                        return [2 /*return*/, repo === null || repo === void 0 ? void 0 : repo.rootUri];
                }
            });
        });
    };
    VsCodeIdeUtils.prototype.getBranch = function (forDirectory) {
        return __awaiter(this, void 0, void 0, function () {
            var repo, stdout, e_1;
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, this.getRepo(forDirectory)];
                    case 1:
                        repo = _e.sent();
                        if (!(((_b = (_a = repo === null || repo === void 0 ? void 0 : repo.state) === null || _a === void 0 ? void 0 : _a.HEAD) === null || _b === void 0 ? void 0 : _b.name) === undefined)) return [3 /*break*/, 5];
                        _e.label = 2;
                    case 2:
                        _e.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, asyncExec("git rev-parse --abbrev-ref HEAD", {
                                cwd: forDirectory.fsPath,
                            })];
                    case 3:
                        stdout = (_e.sent()).stdout;
                        return [2 /*return*/, (stdout === null || stdout === void 0 ? void 0 : stdout.trim()) || "NONE"];
                    case 4:
                        e_1 = _e.sent();
                        return [2 /*return*/, "NONE"];
                    case 5: return [2 /*return*/, ((_d = (_c = repo === null || repo === void 0 ? void 0 : repo.state) === null || _c === void 0 ? void 0 : _c.HEAD) === null || _d === void 0 ? void 0 : _d.name) || "NONE"];
                }
            });
        });
    };
    VsCodeIdeUtils.prototype.splitDiff = function (diffString) {
        var fileDiffHeaderRegex = /(?=diff --git a\/.* b\/.*)/;
        var diffs = diffString.split(fileDiffHeaderRegex);
        if (diffs[0].trim() === "") {
            diffs.shift();
        }
        return diffs;
    };
    VsCodeIdeUtils.prototype.getDiff = function (includeUnstaged) {
        return __awaiter(this, void 0, void 0, function () {
            var diffs, repos, _i, repos_1, repo, staged, unstaged, e_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        diffs = [];
                        repos = this._getRepositories();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, , 8]);
                        if (!repos) return [3 /*break*/, 6];
                        _i = 0, repos_1 = repos;
                        _a.label = 2;
                    case 2:
                        if (!(_i < repos_1.length)) return [3 /*break*/, 6];
                        repo = repos_1[_i];
                        return [4 /*yield*/, repo.diff(true)];
                    case 3:
                        staged = _a.sent();
                        diffs.push(staged);
                        if (!includeUnstaged) return [3 /*break*/, 5];
                        return [4 /*yield*/, repo.diff(false)];
                    case 4:
                        unstaged = _a.sent();
                        diffs.push(unstaged);
                        _a.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 2];
                    case 6: return [2 /*return*/, diffs.flatMap(function (diff) { return _this.splitDiff(diff); })];
                    case 7:
                        e_2 = _a.sent();
                        console.error(e_2);
                        return [2 /*return*/, []];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    VsCodeIdeUtils.secondsToWaitForGitToLoad = process.env.NODE_ENV === "test" ? 1 : 20;
    return VsCodeIdeUtils;
}());
exports.VsCodeIdeUtils = VsCodeIdeUtils;
