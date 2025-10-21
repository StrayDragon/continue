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
exports.VsCodeMessenger = void 0;
var passThrough_1 = require("core/protocol/passThrough");
var vscode = require("vscode");
var errorHandling_1 = require("../util/errorHandling");
/**
 * A simplified messenger class for autocomplete-only extension
 */
var VsCodeMessenger = /** @class */ (function () {
    function VsCodeMessenger(inProcessMessenger, webviewProtocol, ide, verticalDiffManagerPromise, configHandlerPromise, workOsAuthProvider, editDecorationManager, context, vsCodeExtension) {
        var _this = this;
        this.inProcessMessenger = inProcessMessenger;
        this.webviewProtocol = webviewProtocol;
        this.ide = ide;
        this.verticalDiffManagerPromise = verticalDiffManagerPromise;
        this.configHandlerPromise = configHandlerPromise;
        this.workOsAuthProvider = workOsAuthProvider;
        this.editDecorationManager = editDecorationManager;
        this.context = context;
        this.vsCodeExtension = vsCodeExtension;
        /** WEBVIEW ONLY LISTENERS - Simplified for autocomplete **/
        this.onWebview("showFile", function (msg) {
            _this.ide.openFile(msg.data.filepath);
        });
        this.onWebview("toggleDevTools", function (msg) {
            vscode.commands.executeCommand("workbench.action.toggleDevTools");
        });
        this.onWebview("reloadWindow", function (msg) {
            vscode.commands.executeCommand("workbench.action.reloadWindow");
        });
        this.onWebview("focusEditor", function (msg) {
            vscode.commands.executeCommand("workbench.action.focusActiveEditorGroup");
        });
        this.onWebview("insertAtCursor", function (msg) { return __awaiter(_this, void 0, void 0, function () {
            var editor;
            return __generator(this, function (_a) {
                editor = vscode.window.activeTextEditor;
                if (editor === undefined || !editor.selection) {
                    return [2 /*return*/];
                }
                editor.edit(function (editBuilder) {
                    editBuilder.replace(new vscode.Range(editor.selection.start, editor.selection.end), msg.data.text);
                });
                return [2 /*return*/];
            });
        }); });
        this.onWebview("openUrl", function (msg) {
            vscode.env.openExternal(vscode.Uri.parse(msg.data));
        });
        /** PASS THROUGH FROM WEBVIEW TO CORE AND BACK **/
        passThrough_1.WEBVIEW_TO_CORE_PASS_THROUGH.forEach(function (messageType) {
            _this.onWebview(messageType, function (msg) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.inProcessMessenger.externalRequest(messageType, msg.data, msg.messageId)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            }); });
        });
        /** PASS THROUGH FROM CORE TO WEBVIEW AND BACK **/
        passThrough_1.CORE_TO_WEBVIEW_PASS_THROUGH.forEach(function (messageType) {
            _this.onCore(messageType, function (msg) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.webviewProtocol.request(messageType, msg.data)];
                });
            }); });
        });
        /** BOTH CORE AND WEBVIEW **/
        this.onWebviewOrCore("getIdeSettings", function (msg) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, ide.getIdeSettings()];
            });
        }); });
        this.onWebviewOrCore("getDiff", function (msg) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, ide.getDiff(msg.data.includeUnstaged)];
            });
        }); });
        this.onWebviewOrCore("getWorkspaceDirs", function (msg) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, ide.getWorkspaceDirs()];
            });
        }); });
        this.onWebviewOrCore("writeFile", function (msg) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, ide.writeFile(msg.data.path, msg.data.contents)];
            });
        }); });
        this.onWebviewOrCore("showVirtualFile", function (msg) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, ide.showVirtualFile(msg.data.name, msg.data.content)];
            });
        }); });
        this.onWebviewOrCore("openFile", function (msg) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, ide.openFile(msg.data.path)];
            });
        }); });
        this.onWebviewOrCore("runCommand", function (msg) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ide.runCommand(msg.data.command)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        this.onWebviewOrCore("getSearchResults", function (msg) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, ide.getSearchResults(msg.data.query, msg.data.maxResults)];
            });
        }); });
        this.onWebviewOrCore("getFileResults", function (msg) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, ide.getFileResults(msg.data.pattern, msg.data.maxResults)];
            });
        }); });
        this.onWebviewOrCore("getProblems", function (msg) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, ide.getProblems(msg.data.filepath)];
            });
        }); });
        this.onWebviewOrCore("getBranch", function (msg) { return __awaiter(_this, void 0, void 0, function () {
            var dir;
            return __generator(this, function (_a) {
                dir = msg.data.dir;
                return [2 /*return*/, ide.getBranch(dir)];
            });
        }); });
        this.onWebviewOrCore("getOpenFiles", function (msg) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, ide.getOpenFiles()];
            });
        }); });
        this.onWebviewOrCore("getCurrentFile", function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, ide.getCurrentFile()];
            });
        }); });
        this.onWebviewOrCore("showLines", function (msg) { return __awaiter(_this, void 0, void 0, function () {
            var _a, filepath, startLine, endLine;
            return __generator(this, function (_b) {
                _a = msg.data, filepath = _a.filepath, startLine = _a.startLine, endLine = _a.endLine;
                return [2 /*return*/, ide.showLines(filepath, startLine, endLine)];
            });
        }); });
        this.onWebviewOrCore("showToast", function (msg) {
            var _a;
            (_a = _this.ide).showToast.apply(_a, msg.data);
        });
        this.onWebviewOrCore("saveFile", function (msg) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ide.saveFile(msg.data.filepath)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); });
        this.onWebviewOrCore("readFile", function (msg) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ide.readFile(msg.data.filepath)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); });
        this.onWebviewOrCore("fileExists", function (msg) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ide.fileExists(msg.data.filepath)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); });
        this.onWebviewOrCore("gotoDefinition", function (msg) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ide.gotoDefinition(msg.data.location)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); });
        this.onWebviewOrCore("getReferences", function (msg) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ide.getReferences(msg.data.location)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); });
        this.onWebviewOrCore("getDocumentSymbols", function (msg) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ide.getDocumentSymbols(msg.data.textDocumentIdentifier)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); });
        this.onWebviewOrCore("getFileStats", function (msg) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ide.getFileStats(msg.data.files)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); });
        this.onWebviewOrCore("getGitRootPath", function (msg) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ide.getGitRootPath(msg.data.dir)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); });
        this.onWebviewOrCore("listDir", function (msg) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ide.listDir(msg.data.dir)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); });
        this.onWebviewOrCore("getRepoName", function (msg) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ide.getRepoName(msg.data.dir)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); });
        this.onWebviewOrCore("getIdeInfo", function (msg) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ide.getIdeInfo()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); });
        this.onWebviewOrCore("isTelemetryEnabled", function (msg) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ide.isTelemetryEnabled()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); });
        this.onWebviewOrCore("getUniqueId", function (msg) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ide.getUniqueId()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); });
        this.onWebviewOrCore("reportError", function (msg) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, errorHandling_1.handleLLMError)(msg.data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    }
    VsCodeMessenger.prototype.onWebview = function (messageType, handler) {
        void this.webviewProtocol.on(messageType, handler);
    };
    VsCodeMessenger.prototype.onCore = function (messageType, handler) {
        this.inProcessMessenger.externalOn(messageType, handler);
    };
    VsCodeMessenger.prototype.onWebviewOrCore = function (messageType, handler) {
        this.onWebview(messageType, handler);
        this.onCore(messageType, handler);
    };
    return VsCodeMessenger;
}());
exports.VsCodeMessenger = VsCodeMessenger;
