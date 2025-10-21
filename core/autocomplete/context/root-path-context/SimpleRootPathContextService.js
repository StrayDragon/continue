"use strict";
// Simplified root path context service without web-tree-sitter dependency
// Provides basic file path context for autocomplete
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
exports.SimpleRootPathContextService = void 0;
var SimpleRootPathContextService = /** @class */ (function () {
    function SimpleRootPathContextService(ide) {
        this.ide = ide;
    }
    SimpleRootPathContextService.prototype.getRootPathContext = function (filepath) {
        return __awaiter(this, void 0, void 0, function () {
            var workspaceDirs, projectRoot, maxCommonPath, _i, workspaceDirs_1, workspaceDir, relativePath, language, isTestFile, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.ide.getWorkspaceDirs()];
                    case 1:
                        workspaceDirs = _a.sent();
                        if (workspaceDirs.length === 0) {
                            return [2 /*return*/, null];
                        }
                        projectRoot = workspaceDirs[0];
                        maxCommonPath = '';
                        for (_i = 0, workspaceDirs_1 = workspaceDirs; _i < workspaceDirs_1.length; _i++) {
                            workspaceDir = workspaceDirs_1[_i];
                            if (filepath.startsWith(workspaceDir)) {
                                if (workspaceDir.length > maxCommonPath.length) {
                                    maxCommonPath = workspaceDir;
                                    projectRoot = workspaceDir;
                                }
                            }
                        }
                        relativePath = filepath.replace(projectRoot, '').replace(/^[\/\\]/, '');
                        return [4 /*yield*/, this.ide.getLanguage(filepath)];
                    case 2:
                        language = _a.sent();
                        isTestFile = this.isTestFile(filepath);
                        return [2 /*return*/, {
                                filepath: filepath,
                                projectRoot: projectRoot,
                                relativePath: relativePath,
                                language: language,
                                isTestFile: isTestFile,
                            }];
                    case 3:
                        error_1 = _a.sent();
                        console.warn('[Conti] Failed to get root path context:', error_1);
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SimpleRootPathContextService.prototype.isTestFile = function (filepath) {
        var testPatterns = [
            /\.test\./,
            /\.spec\./,
            /test\./,
            /spec\./,
            /__tests__/,
            /test[s]?/,
        ];
        return testPatterns.some(function (pattern) { return pattern.test(filepath); });
    };
    SimpleRootPathContextService.prototype.getRelatedFiles = function (filepath_1) {
        return __awaiter(this, arguments, void 0, function (filepath, maxFiles) {
            var context_1, workspaceDirs, projectRoot, allFiles, relatedFiles, error_2;
            var _this = this;
            if (maxFiles === void 0) { maxFiles = 10; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.getRootPathContext(filepath)];
                    case 1:
                        context_1 = _a.sent();
                        if (!context_1) {
                            return [2 /*return*/, []];
                        }
                        return [4 /*yield*/, this.ide.getWorkspaceDirs()];
                    case 2:
                        workspaceDirs = _a.sent();
                        projectRoot = workspaceDirs[0];
                        return [4 /*yield*/, this.ide.listDirectoryContents(projectRoot)];
                    case 3:
                        allFiles = _a.sent();
                        relatedFiles = allFiles
                            .filter(function (file) { return _this.isRelatedFile(file, context_1); })
                            .slice(0, maxFiles);
                        return [2 /*return*/, relatedFiles];
                    case 4:
                        error_2 = _a.sent();
                        console.warn('[Conti] Failed to get related files:', error_2);
                        return [2 /*return*/, []];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    SimpleRootPathContextService.prototype.isRelatedFile = function (filepath, context) {
        // Same directory
        var contextDir = context.filepath.substring(0, context.filepath.lastIndexOf('/'));
        var fileDir = filepath.substring(0, filepath.lastIndexOf('/'));
        if (contextDir === fileDir) {
            return true;
        }
        // Same file extension (language)
        var contextExt = context.filepath.split('.').pop();
        var fileExt = filepath.split('.').pop();
        if (contextExt === fileExt && !this.isTestFile(filepath)) {
            return true;
        }
        return false;
    };
    SimpleRootPathContextService.prototype.getFileStructure = function (filepath) {
        return __awaiter(this, void 0, void 0, function () {
            var context, structure, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.getRootPathContext(filepath)];
                    case 1:
                        context = _a.sent();
                        if (!context) {
                            return [2 /*return*/, null];
                        }
                        structure = {
                            projectRoot: context.projectRoot,
                            relativePath: context.relativePath,
                            language: context.language,
                            isTest: context.isTestFile,
                        };
                        return [2 /*return*/, structure];
                    case 2:
                        error_3 = _a.sent();
                        console.warn('[Conti] Failed to get file structure:', error_3);
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return SimpleRootPathContextService;
}());
exports.SimpleRootPathContextService = SimpleRootPathContextService;
