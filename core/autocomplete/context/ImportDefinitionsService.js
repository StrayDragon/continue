"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.ImportDefinitionsService = void 0;
var LruCache_1 = require("../../util/LruCache");
var treeSitter_1 = require("../../util/treeSitter");
var uri_1 = require("../../util/uri");
var ImportDefinitionsService = /** @class */ (function () {
    function ImportDefinitionsService(ide) {
        var _this = this;
        this.ide = ide;
        this.cache = new LruCache_1.PrecalculatedLruCache(this._getFileInfo.bind(this), ImportDefinitionsService.N);
        ide.onDidChangeActiveTextEditor(function (filepath) {
            _this.cache
                .initKey(filepath)
                .catch(function (e) {
                return console.warn("Failed to initialize ImportDefinitionService: ".concat(e.message));
            });
        });
    }
    ImportDefinitionsService.prototype.get = function (filepath) {
        return this.cache.get(filepath);
    };
    ImportDefinitionsService.prototype._getFileInfo = function (filepath) {
        return __awaiter(this, void 0, void 0, function () {
            var parser, fileContents, foundInDir, _a, _b, err_1, ast, language, query, matches, fileInfo, _i, matches_1, match, startPosition, defs, _c, _d;
            var _this = this;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (filepath.endsWith(".ipynb")) {
                            // Commenting out this line was the solution to https://github.com/continuedev/continue/issues/1463
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, (0, treeSitter_1.getParserForFile)(filepath)];
                    case 1:
                        parser = _e.sent();
                        if (!parser) {
                            return [2 /*return*/, {
                                    imports: {},
                                }];
                        }
                        fileContents = undefined;
                        _e.label = 2;
                    case 2:
                        _e.trys.push([2, 7, , 8]);
                        _a = uri_1.findUriInDirs;
                        _b = [filepath];
                        return [4 /*yield*/, this.ide.getWorkspaceDirs()];
                    case 3:
                        foundInDir = _a.apply(void 0, _b.concat([_e.sent()])).foundInDir;
                        if (!!foundInDir) return [3 /*break*/, 4];
                        return [2 /*return*/, null];
                    case 4: return [4 /*yield*/, this.ide.readFile(filepath)];
                    case 5:
                        fileContents = _e.sent();
                        _e.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        err_1 = _e.sent();
                        // File removed
                        return [2 /*return*/, null];
                    case 8:
                        ast = parser.parse(fileContents, undefined, {
                            includedRanges: [
                                {
                                    startIndex: 0,
                                    endIndex: 10000,
                                    startPosition: { row: 0, column: 0 },
                                    endPosition: { row: 100, column: 0 },
                                },
                            ],
                        });
                        language = (0, treeSitter_1.getFullLanguageName)(filepath);
                        return [4 /*yield*/, (0, treeSitter_1.getQueryForFile)(filepath, "import-queries/".concat(language, ".scm"))];
                    case 9:
                        query = _e.sent();
                        if (!query) {
                            return [2 /*return*/, {
                                    imports: {},
                                }];
                        }
                        matches = query === null || query === void 0 ? void 0 : query.matches(ast.rootNode);
                        fileInfo = {
                            imports: {},
                        };
                        _i = 0, matches_1 = matches;
                        _e.label = 10;
                    case 10:
                        if (!(_i < matches_1.length)) return [3 /*break*/, 14];
                        match = matches_1[_i];
                        startPosition = match.captures[0].node.startPosition;
                        return [4 /*yield*/, this.ide.gotoDefinition({
                                filepath: filepath,
                                position: {
                                    line: startPosition.row,
                                    character: startPosition.column,
                                },
                            })];
                    case 11:
                        defs = _e.sent();
                        _c = fileInfo.imports;
                        _d = match.captures[0].node.text;
                        return [4 /*yield*/, Promise.all(defs.map(function (def) { return __awaiter(_this, void 0, void 0, function () {
                                var _a;
                                var _b;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0:
                                            _a = [__assign({}, def)];
                                            _b = {};
                                            return [4 /*yield*/, this.ide.readRangeInFile(def.filepath, def.range)];
                                        case 1: return [2 /*return*/, (__assign.apply(void 0, _a.concat([(_b.contents = _c.sent(), _b)])))];
                                    }
                                });
                            }); }))];
                    case 12:
                        _c[_d] = _e.sent();
                        _e.label = 13;
                    case 13:
                        _i++;
                        return [3 /*break*/, 10];
                    case 14: return [2 /*return*/, fileInfo];
                }
            });
        });
    };
    ImportDefinitionsService.N = 10;
    return ImportDefinitionsService;
}());
exports.ImportDefinitionsService = ImportDefinitionsService;
