"use strict";
/**
 * If we wanted to run or use another language server from our extension, this is how we would do it.
 */
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
exports.startLanguageClient = startLanguageClient;
exports.makeRequest = makeRequest;
exports.deactivate = deactivate;
var path = require("node:path");
var vscode_1 = require("vscode");
var node_1 = require("vscode-languageclient/node");
var vscode_2 = require("../util/vscode");
var client;
function startLanguageClient(context) {
    return __awaiter(this, void 0, void 0, function () {
        var pythonLS;
        return __generator(this, function (_a) {
            pythonLS = startPythonLanguageServer(context);
            pythonLS.start();
            return [2 /*return*/];
        });
    });
}
function makeRequest(method, param) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (!client) {
                return [2 /*return*/];
            }
            else if (client.state === node_1.State.Starting) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var stateListener = client.onDidChangeState(function (e) {
                            if (e.newState === node_1.State.Running) {
                                stateListener.dispose();
                                resolve(client.sendRequest(method, param));
                            }
                            else if (e.newState === node_1.State.Stopped) {
                                stateListener.dispose();
                                reject(new Error("Language server stopped unexpectedly"));
                            }
                        });
                    })];
            }
            else {
                return [2 /*return*/, client.sendRequest(method, param)];
            }
            return [2 /*return*/];
        });
    });
}
function deactivate() {
    if (!client) {
        return undefined;
    }
    return client.stop();
}
function startPythonLanguageServer(context) {
    var extensionPath = (0, vscode_2.getExtensionUri)().fsPath;
    var command = "cd ".concat(path.join(extensionPath, "scripts"), " && source ").concat(path.join("env", "bin", "activate.fish"), " && python -m pyls");
    var serverOptions = {
        command: command,
        args: ["-vv"],
    };
    var clientOptions = {
        documentSelector: ["python"],
        synchronize: {
            configurationSection: "pyls",
        },
    };
    return new node_1.LanguageClient(command, serverOptions, clientOptions);
}
function startPylance(context) {
    return __awaiter(this, void 0, void 0, function () {
        var pylance, lsPath, serverModule, debugOptions, serverOptions, clientOptions;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pylance = vscode_1.extensions.getExtension("ms-python.vscode-pylance");
                    return [4 /*yield*/, (pylance === null || pylance === void 0 ? void 0 : pylance.activate())];
                case 1:
                    _a.sent();
                    if (!pylance) {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, pylance.exports.languageServerFolder()];
                case 2:
                    lsPath = (_a.sent()).path;
                    serverModule = context.asAbsolutePath(lsPath);
                    debugOptions = { execArgv: ["--nolazy", "--inspect=6009"] };
                    serverOptions = {
                        run: { module: serverModule, transport: node_1.TransportKind.ipc },
                        debug: {
                            module: serverModule,
                            transport: node_1.TransportKind.ipc,
                            options: debugOptions,
                        },
                    };
                    clientOptions = {
                        // Register the server for plain text documents
                        documentSelector: [{ scheme: "file", language: "python" }],
                        synchronize: {
                            // Notify the server about file changes to '.clientrc files contained in the workspace
                            fileEvents: vscode_1.workspace.createFileSystemWatcher("**/.clientrc"),
                        },
                    };
                    // Create the language client and start the client.
                    client = new node_1.LanguageClient("languageServerExample", "Language Server Example", serverOptions, clientOptions);
                    return [2 /*return*/, client];
            }
        });
    });
}
