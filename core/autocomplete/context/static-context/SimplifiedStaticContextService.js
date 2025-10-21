"use strict";
// Simplified static context service without web-tree-sitter dependency
// Provides basic static analysis for autocomplete context
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
exports.SimplifiedStaticContextService = void 0;
var SimplifiedStaticContextService = /** @class */ (function () {
    function SimplifiedStaticContextService(ide) {
        this.ide = ide;
    }
    SimplifiedStaticContextService.prototype.getStaticContext = function (filepath, position) {
        return __awaiter(this, void 0, void 0, function () {
            var content, language, context, error_1;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 8, , 9]);
                        return [4 /*yield*/, this.ide.readFile(filepath)];
                    case 1:
                        content = _b.sent();
                        return [4 /*yield*/, this.ide.getLanguage(filepath)];
                    case 2:
                        language = _b.sent();
                        _a = {
                            definitions: []
                        };
                        return [4 /*yield*/, this.extractImports(content)];
                    case 3:
                        _a.imports = _b.sent();
                        return [4 /*yield*/, this.extractExports(content)];
                    case 4:
                        _a.exports = _b.sent();
                        return [4 /*yield*/, this.extractFunctions(content, language)];
                    case 5:
                        _a.functions = _b.sent();
                        return [4 /*yield*/, this.extractClasses(content, language)];
                    case 6:
                        _a.classes = _b.sent();
                        return [4 /*yield*/, this.extractVariables(content, language)];
                    case 7:
                        context = (_a.variables = _b.sent(),
                            _a);
                        return [2 /*return*/, context];
                    case 8:
                        error_1 = _b.sent();
                        console.warn('[Conti] Failed to get static context:', error_1);
                        return [2 /*return*/, {
                                definitions: [],
                                imports: [],
                                exports: [],
                                functions: [],
                                classes: [],
                                variables: [],
                            }];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    SimplifiedStaticContextService.prototype.extractImports = function (content) {
        return __awaiter(this, void 0, void 0, function () {
            var imports, patterns;
            return __generator(this, function (_a) {
                imports = [];
                patterns = [
                    // ES6 imports
                    /import\s+.*?\s+from\s+['"]([^'"]+)['"]/g,
                    // CommonJS require
                    /(?:const|let|var)\s+.*?=\s*require\(['"]([^'"]+)['"]\)/g,
                    // Python imports
                    /from\s+([^\s]+)\s+import/g,
                    /import\s+([^\s]+)/g,
                ];
                patterns.forEach(function (pattern) {
                    var match;
                    while ((match = pattern.exec(content)) !== null) {
                        imports.push({
                            module: match[1],
                            type: 'import',
                            line: content.substring(0, match.index).split('\n').length,
                        });
                    }
                });
                return [2 /*return*/, imports];
            });
        });
    };
    SimplifiedStaticContextService.prototype.extractExports = function (content) {
        return __awaiter(this, void 0, void 0, function () {
            var exports, patterns;
            return __generator(this, function (_a) {
                exports = [];
                patterns = [
                    // ES6 exports
                    /export\s+(?:default\s+)?(?:class|function|const|let|var)\s+(\w+)/g,
                    // CommonJS exports
                    /module\.exports\s*=\s*(\w+)/g,
                    /exports\.(\w+)/g,
                ];
                patterns.forEach(function (pattern) {
                    var match;
                    while ((match = pattern.exec(content)) !== null) {
                        exports.push({
                            name: match[1],
                            type: 'export',
                            line: content.substring(0, match.index).split('\n').length,
                        });
                    }
                });
                return [2 /*return*/, exports];
            });
        });
    };
    SimplifiedStaticContextService.prototype.extractFunctions = function (content, language) {
        return __awaiter(this, void 0, void 0, function () {
            var functions, pattern, match;
            return __generator(this, function (_a) {
                functions = [];
                // Language-specific function patterns
                switch (language) {
                    case 'typescript':
                    case 'javascript':
                        pattern = /(?:function\s+(\w+)|(\w+)\s*=\s*(?:function|\([^)]*\)\s*=>))/g;
                        break;
                    case 'python':
                        pattern = /def\s+(\w+)\s*\(/g;
                        break;
                    case 'java':
                        pattern = /(?:public|private|protected)?\s*(?:static\s+)?(?:\w+\s+)*(\w+)\s*\([^)]*\)\s*(?:throws\s+[\w\s,]+)?\s*{/g;
                        break;
                    default:
                        pattern = /(?:function|def)\s+(\w+)\s*\(/g;
                }
                while ((match = pattern.exec(content)) !== null) {
                    functions.push({
                        name: match[1],
                        type: 'function',
                        line: content.substring(0, match.index).split('\n').length,
                    });
                }
                return [2 /*return*/, functions];
            });
        });
    };
    SimplifiedStaticContextService.prototype.extractClasses = function (content, language) {
        return __awaiter(this, void 0, void 0, function () {
            var classes, pattern, match;
            return __generator(this, function (_a) {
                classes = [];
                // Language-specific class patterns
                switch (language) {
                    case 'typescript':
                    case 'javascript':
                    case 'python':
                        pattern = /class\s+(\w+)/g;
                        break;
                    case 'java':
                        pattern = /(?:public\s+)?class\s+(\w+)/g;
                        break;
                    default:
                        pattern = /class\s+(\w+)/g;
                }
                while ((match = pattern.exec(content)) !== null) {
                    classes.push({
                        name: match[1],
                        type: 'class',
                        line: content.substring(0, match.index).split('\n').length,
                    });
                }
                return [2 /*return*/, classes];
            });
        });
    };
    SimplifiedStaticContextService.prototype.extractVariables = function (content, language) {
        return __awaiter(this, void 0, void 0, function () {
            var variables, patterns;
            return __generator(this, function (_a) {
                variables = [];
                // Language-specific variable patterns
                switch (language) {
                    case 'typescript':
                    case 'javascript':
                        patterns = [
                            /(?:const|let|var)\s+(\w+)\s*=/g,
                            /(\w+)\s*:\s*\w+/g, // TypeScript type annotations
                        ];
                        break;
                    case 'python':
                        patterns = [
                            /(\w+)\s*=/g,
                        ];
                        break;
                    default:
                        patterns = [
                            /(?:const|let|var)\s+(\w+)\s*=/g,
                        ];
                }
                patterns.forEach(function (pattern) {
                    var match;
                    while ((match = pattern.exec(content)) !== null) {
                        // Filter out common keywords
                        var name_1 = match[1];
                        if (!['function', 'class', 'if', 'else', 'for', 'while', 'return'].includes(name_1)) {
                            variables.push({
                                name: name_1,
                                type: 'variable',
                                line: content.substring(0, match.index).split('\n').length,
                            });
                        }
                    }
                });
                return [2 /*return*/, variables];
            });
        });
    };
    SimplifiedStaticContextService.prototype.getDefinitionsAtPosition = function (filepath, position) {
        return __awaiter(this, void 0, void 0, function () {
            var content, line, wordUnderCursor_1, context, definitions, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.ide.readFile(filepath)];
                    case 1:
                        content = _a.sent();
                        line = content.split('\n')[position.line];
                        wordUnderCursor_1 = this.extractWordAtPosition(line, position.character);
                        if (!wordUnderCursor_1) {
                            return [2 /*return*/, []];
                        }
                        return [4 /*yield*/, this.getStaticContext(filepath, position)];
                    case 2:
                        context = _a.sent();
                        definitions = __spreadArray(__spreadArray(__spreadArray([], context.functions.filter(function (f) { return f.name === wordUnderCursor_1; }), true), context.classes.filter(function (c) { return c.name === wordUnderCursor_1; }), true), context.variables.filter(function (v) { return v.name === wordUnderCursor_1; }), true);
                        return [2 /*return*/, definitions];
                    case 3:
                        error_2 = _a.sent();
                        console.warn('[Conti] Failed to get definitions at position:', error_2);
                        return [2 /*return*/, []];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SimplifiedStaticContextService.prototype.extractWordAtPosition = function (line, character) {
        // Simple word extraction
        var words = line.match(/\w+/g) || [];
        var charCount = 0;
        for (var _i = 0, words_1 = words; _i < words_1.length; _i++) {
            var word = words_1[_i];
            var wordIndex = line.indexOf(word, charCount);
            if (wordIndex <= character && character < wordIndex + word.length) {
                return word;
            }
            charCount = wordIndex + word.length;
        }
        return null;
    };
    return SimplifiedStaticContextService;
}());
exports.SimplifiedStaticContextService = SimplifiedStaticContextService;
