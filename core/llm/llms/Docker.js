"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var async_mutex_1 = require("async-mutex");
var child_process_1 = require("child_process");
var OpenAI_js_1 = require("./OpenAI.js");
/**
 * Docker Model Runner provider
 *
 * Integrates with Docker Desktop's Model Runner feature (currently in beta)
 * that allows running local AI models through Docker.
 *
 * Docker Model Runner provides an OpenAI-compatible API endpoint, making it
 * easy to integrate with existing OpenAI-compatible code.
 *
 * More information at: https://docs.docker.com/desktop/features/model-runner/
 */
var Docker = /** @class */ (function (_super) {
    __extends(Docker, _super);
    function Docker(options) {
        var _this = _super.call(this, options) || this;
        _this.modelMap = {
            // Map of "continue model name" to Docker model name
            // Models can be pulled using: docker model pull <model_name>
            "llama3.3-70b": "ai/llama3.3:70B-Q4_K_M",
            "smollm2-360M-F4": "ai/smollm2:360M-Q4_K_M",
            "smollm2-360M-F16": "ai/ai/smollm2:360M-F16",
            "qwen2.5-7B-F16": "ai/qwen2.5:7B-F16",
            "qwen2.5-7B-F4": "ai/qwen2.5:7B-Q4_K_M",
            "phi4-14B-F16": "ai/phi4:14B-F16",
            "phi4-14B-F4": "ai/phi4:14B-Q4_K_M",
            "mistral-7B-F16": "ai/mistral:7B-F16",
            "mistral-7B-F4": "ai/mistral:7B-Q4_K_M",
            "mistral-nemo-12B": "ai/mistral-nemo:12B-Q4_K_M",
            "gemma3-4B-F16": "ai/gemma3:4B-F16",
            "gemma3-4B-F4": "ai/gemma3:4B-Q4_K_M",
            "llama3.2-3B-F16": "ai/llama3.2:3B-F16",
            "llama3.2-3B-F4": "ai/llama3.2:3B-Q4_K_M",
            "llama3.2-1B-F16": "ai/llama3.2:1B-F16",
            "llama3.2-1B-F8": "ai/llama3.2:1B-Q8_0",
            "qwq-32B-F16": "ai/qwq:32B-F16",
            "qwq-32B-F4": "ai/qwq:32B-Q4_K_M",
            "deepseek-r1-distill-llama-70B-F4": "ai/deepseek-r1-distill-llama:70B-Q4_K_M",
            "deepseek-r1-distill-llama-8B-F16": "ai/deepseek-r1-distill-llama:8B-F16",
            "deepseek-r1-distill-llama-8B-Q4": "ai/deepseek-r1-distill-llama:8B-Q4_K_M",
        };
        // Handle model name mapping
        if (_this.model && _this.modelMap[_this.model]) {
            _this.model = _this.modelMap[_this.model];
        }
        // Check if Docker Model Runner is active and enable it if needed
        _this.ensureModelRunnerEnabled().catch(function (e) { });
        return _this;
    }
    /**
     * Checks if Docker Model Runner is running at the expected port
     * and enables it if not running
     */
    Docker.prototype.ensureModelRunnerEnabled = function () {
        return __awaiter(this, void 0, void 0, function () {
            var isRunning, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.isPortBound(12434)];
                    case 1:
                        isRunning = _a.sent();
                        if (!!isRunning) return [3 /*break*/, 3];
                        console.log("Docker Model Runner not detected. Attempting to enable it...");
                        return [4 /*yield*/, this.executeDockerCommand([
                                "desktop",
                                "enable",
                                "model-runner",
                                "--tcp",
                                "12434",
                            ])];
                    case 2:
                        _a.sent();
                        console.log("Docker Model Runner has been enabled on port 12434");
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        console.warn("Failed to enable Docker Model Runner:", error_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Checks if a port is currently bound/in use
     */
    Docker.prototype.isPortBound = function (port) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.fetch("http://localhost:".concat(port), {
                                method: "HEAD",
                                signal: AbortSignal.timeout(1000),
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 2:
                        e_1 = _a.sent();
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Docker.prototype.executeDockerCommand = function (args, signal) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var proc = (0, child_process_1.spawn)("docker", args, { shell: true });
                        var stdout = "";
                        var stderr = "";
                        proc.stdout.on("data", function (data) {
                            stdout += data.toString();
                        });
                        proc.stderr.on("data", function (data) {
                            stderr += data.toString();
                        });
                        proc.on("close", function (code) {
                            if (code === 0) {
                                resolve({ stdout: stdout, stderr: stderr });
                            }
                            else {
                                reject(new Error("Docker command failed with code ".concat(code, ": ").concat(stderr)));
                            }
                        });
                        if (signal) {
                            signal.addEventListener("abort", function () {
                                proc.kill();
                                reject(new Error("Docker command was aborted"));
                            });
                        }
                    })];
            });
        });
    };
    Docker.prototype.listModels = function () {
        return __awaiter(this, void 0, void 0, function () {
            var stdout, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.executeDockerCommand([
                                "model",
                                "ls",
                                "--format",
                                "{{.Repository}}/{{.Tag}}",
                            ])];
                    case 1:
                        stdout = (_a.sent()).stdout;
                        return [2 /*return*/, stdout
                                .split("\n")
                                .map(function (line) { return line.trim(); })
                                .filter(Boolean)];
                    case 2:
                        error_2 = _a.sent();
                        console.error("Failed to list Docker models:", error_2);
                        return [2 /*return*/, Object.values(this.modelMap)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Docker.prototype.installModel = function (modelName, signal, progressReporter) {
        return __awaiter(this, void 0, void 0, function () {
            var targetModel, release, _a, stdout, stderr, error_3, errorMessage, release_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        targetModel = this.modelMap[modelName] || modelName;
                        return [4 /*yield*/, Docker.modelsBeingInstalledMutex.acquire()];
                    case 1:
                        release = _b.sent();
                        try {
                            if (Docker.modelsBeingInstalled.has(modelName)) {
                                throw new Error("Model '".concat(modelName, "' is already being installed."));
                            }
                            Docker.modelsBeingInstalled.add(modelName);
                        }
                        finally {
                            release();
                        }
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, 5, 7]);
                        // Report starting the installation
                        progressReporter === null || progressReporter === void 0 ? void 0 : progressReporter("Installing Docker model ".concat(targetModel), 0, 100);
                        return [4 /*yield*/, this.executeDockerCommand(["model", "pull", targetModel], signal)];
                    case 3:
                        _a = _b.sent(), stdout = _a.stdout, stderr = _a.stderr;
                        // Report completion
                        progressReporter === null || progressReporter === void 0 ? void 0 : progressReporter("Docker model ".concat(targetModel, " installed successfully"), 100, 100);
                        return [2 /*return*/, { success: true, stdout: stdout, stderr: stderr }];
                    case 4:
                        error_3 = _b.sent();
                        console.error("Failed to install Docker model ".concat(targetModel, ":"), error_3);
                        errorMessage = error_3 instanceof Error ? error_3.message : String(error_3);
                        throw new Error("Failed to install Docker model ".concat(targetModel, ": ").concat(errorMessage));
                    case 5: return [4 /*yield*/, Docker.modelsBeingInstalledMutex.acquire()];
                    case 6:
                        release_1 = _b.sent();
                        try {
                            Docker.modelsBeingInstalled.delete(modelName);
                        }
                        finally {
                            release_1();
                        }
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    Docker.prototype.isInstallingModel = function (modelName) {
        return __awaiter(this, void 0, void 0, function () {
            var release;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Docker.modelsBeingInstalledMutex.acquire()];
                    case 1:
                        release = _a.sent();
                        try {
                            return [2 /*return*/, Docker.modelsBeingInstalled.has(modelName)];
                        }
                        finally {
                            release();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Docker.providerName = "docker";
    Docker.defaultOptions = {
        apiBase: "http://localhost:12434/engines/v1/",
        model: "gemma3-4B-F4", // Default model
    };
    Docker.modelsBeingInstalled = new Set();
    Docker.modelsBeingInstalledMutex = new async_mutex_1.Mutex();
    return Docker;
}(OpenAI_js_1.default));
exports.default = Docker;
