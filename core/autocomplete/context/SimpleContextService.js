"use strict";
// Simplified context service that replaces complex tree-sitter based context retrieval
// This provides basic context without the heavy dependency
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
exports.SimpleContextService = void 0;
var SimpleContextService = /** @class */ (function () {
    function SimpleContextService(ide) {
        this.ide = ide;
    }
    SimpleContextService.prototype.getDefinitions = function (filepath, position) {
        return __awaiter(this, void 0, void 0, function () {
            var definitions, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.ide.getDefinitions(filepath, position)];
                    case 1:
                        definitions = _a.sent();
                        return [2 /*return*/, definitions.map(function (def) { return ({
                                filepath: def.filepath || filepath,
                                range: def.range || { start: position, end: position },
                                content: def.content || '',
                                type: 'definition',
                            }); })];
                    case 2:
                        error_1 = _a.sent();
                        console.warn('[Conti] Failed to get definitions:', error_1);
                        return [2 /*return*/, []];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SimpleContextService.prototype.getImports = function (filepath) {
        return __awaiter(this, void 0, void 0, function () {
            var content, imports, importRegex, match, importPath, lineNumber, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.ide.readFile(filepath)];
                    case 1:
                        content = _a.sent();
                        imports = [];
                        importRegex = /(?:import|require|from)\s+['"]([^'"]+)['"]/g;
                        match = void 0;
                        while ((match = importRegex.exec(content)) !== null) {
                            importPath = match[1];
                            lineNumber = content.substring(0, match.index).split('\n').length - 1;
                            imports.push({
                                filepath: filepath,
                                range: {
                                    start: { line: lineNumber, character: 0 },
                                    end: { line: lineNumber, character: match[0].length }
                                },
                                content: match[0],
                                type: 'import',
                            });
                        }
                        return [2 /*return*/, imports];
                    case 2:
                        error_2 = _a.sent();
                        console.warn('[Conti] Failed to get imports:', error_2);
                        return [2 /*return*/, []];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SimpleContextService.prototype.getRecentFiles = function () {
        return __awaiter(this, arguments, void 0, function (maxFiles) {
            if (maxFiles === void 0) { maxFiles = 5; }
            return __generator(this, function (_a) {
                try {
                    // This would need to be implemented based on IDE capabilities
                    // For now, return empty array
                    return [2 /*return*/, []];
                }
                catch (error) {
                    console.warn('[Conti] Failed to get recent files:', error);
                    return [2 /*return*/, []];
                }
                return [2 /*return*/];
            });
        });
    };
    SimpleContextService.prototype.getContextForCompletion = function (filepath_1, position_1) {
        return __awaiter(this, arguments, void 0, function (filepath, position, options) {
            var contextItems, definitions, imports, recentFiles;
            if (options === void 0) { options = {}; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        contextItems = [];
                        if (!(options.useDefinitions !== false)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getDefinitions(filepath, position)];
                    case 1:
                        definitions = _a.sent();
                        contextItems.push.apply(contextItems, definitions);
                        _a.label = 2;
                    case 2:
                        if (!(options.useImports !== false)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.getImports(filepath)];
                    case 3:
                        imports = _a.sent();
                        contextItems.push.apply(contextItems, imports.slice(0, options.maxImports || 10));
                        _a.label = 4;
                    case 4:
                        if (!(options.useRecentFiles !== false)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.getRecentFiles(options.maxRecentFiles || 3)];
                    case 5:
                        recentFiles = _a.sent();
                        contextItems.push.apply(contextItems, recentFiles);
                        _a.label = 6;
                    case 6: return [2 /*return*/, contextItems];
                }
            });
        });
    };
    return SimpleContextService;
}());
exports.SimpleContextService = SimpleContextService;
