"use strict";
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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function () { return this; }, i;
    function awaitReturn(f) { return function (v) { return Promise.resolve(v).then(f, reject); }; }
    function verb(n, f) { if (g[n]) { i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; if (f) i[n] = f(i[n]); } }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LANGUAGES = exports.Markdown = exports.Json = exports.YAML = exports.Lua = exports.Solidity = exports.Dart = exports.R = exports.FSharp = exports.Julia = exports.Clojure = exports.Ruby = exports.Kotlin = exports.Swift = exports.RubyOnRails = exports.PHP = exports.Haskell = exports.Rust = exports.Go = exports.Scala = exports.C = exports.CSharp = exports.Cpp = exports.Java = exports.Python = exports.JavaScript = exports.Typescript = void 0;
exports.languageForFilepath = languageForFilepath;
var uri_1 = require("../../util/uri");
var BracketMatchingService_1 = require("../filtering/BracketMatchingService");
// TypeScript
exports.Typescript = {
    name: "TypeScript",
    topLevelKeywords: ["function", "class", "module", "export", "import"],
    singleLineComment: "//",
    endOfLine: [";"],
};
// JavaScript
exports.JavaScript = {
    name: "JavaScript",
    topLevelKeywords: ["function", "class", "module", "export", "import"],
    singleLineComment: "//",
    endOfLine: [";"],
};
// Python
exports.Python = {
    name: "Python",
    // """"#" is for .ipynb files, where we add '"""' surrounding markdown blocks.
    // This stops the model from trying to complete the start of a new markdown block
    topLevelKeywords: ["def", "class", '"""#'],
    singleLineComment: "#",
    endOfLine: [],
};
// Java
exports.Java = {
    name: "Java",
    topLevelKeywords: ["class", "function"],
    singleLineComment: "//",
    endOfLine: [";"],
};
// C++
exports.Cpp = {
    name: "C++",
    topLevelKeywords: ["class", "namespace", "template"],
    singleLineComment: "//",
    endOfLine: [";"],
};
// C#
exports.CSharp = {
    name: "C#",
    topLevelKeywords: ["class", "namespace", "void"],
    singleLineComment: "//",
    endOfLine: [";"],
};
// C
exports.C = {
    name: "C",
    topLevelKeywords: ["if", "else", "while", "for", "switch", "case"],
    singleLineComment: "//",
    endOfLine: [";"],
};
// Scala
exports.Scala = {
    name: "Scala",
    topLevelKeywords: ["def", "val", "var", "class", "object", "trait"],
    singleLineComment: "//",
    endOfLine: [";"],
};
// Go
exports.Go = {
    name: "Go",
    topLevelKeywords: ["func", "package", "import", "type"],
    singleLineComment: "//",
    endOfLine: [],
};
// Rust
exports.Rust = {
    name: "Rust",
    topLevelKeywords: ["fn", "mod", "pub", "struct", "enum", "trait"],
    singleLineComment: "//",
    endOfLine: [";"],
};
// Haskell
exports.Haskell = {
    name: "Haskell",
    topLevelKeywords: [
        "data",
        "type",
        "newtype",
        "class",
        "instance",
        "let",
        "in",
        "where",
    ],
    singleLineComment: "--",
    endOfLine: [],
};
// PHP
exports.PHP = {
    name: "PHP",
    topLevelKeywords: ["function", "class", "namespace", "use"],
    singleLineComment: "//",
    endOfLine: [";"],
};
// Ruby on Rails
exports.RubyOnRails = {
    name: "Ruby on Rails",
    topLevelKeywords: ["def", "class", "module"],
    singleLineComment: "#",
    endOfLine: [],
};
// Swift
exports.Swift = {
    name: "Swift",
    topLevelKeywords: ["func", "class", "struct", "import"],
    singleLineComment: "//",
    endOfLine: [";"],
};
// Kotlin
exports.Kotlin = {
    name: "Kotlin",
    topLevelKeywords: ["fun", "class", "package", "import"],
    singleLineComment: "//",
    endOfLine: [";"],
};
// Ruby
exports.Ruby = {
    name: "Ruby",
    topLevelKeywords: ["class", "module", "def"],
    singleLineComment: "#",
    endOfLine: [],
};
// Clojure
exports.Clojure = {
    name: "Clojure",
    topLevelKeywords: ["def", "fn", "let", "do", "if", "defn", "ns", "defmacro"],
    singleLineComment: ";",
    endOfLine: [],
};
// Julia
exports.Julia = {
    name: "Julia",
    topLevelKeywords: [
        "function",
        "macro",
        "if",
        "else",
        "elseif",
        "while",
        "for",
        "begin",
        "end",
        "module",
    ],
    singleLineComment: "#",
    endOfLine: [";"],
};
// F#
exports.FSharp = {
    name: "F#",
    topLevelKeywords: [
        "let",
        "type",
        "module",
        "namespace",
        "open",
        "if",
        "then",
        "else",
        "match",
        "with",
    ],
    singleLineComment: "//",
    endOfLine: [],
};
// R
exports.R = {
    name: "R",
    topLevelKeywords: [
        "function",
        "if",
        "else",
        "for",
        "while",
        "repeat",
        "library",
        "require",
    ],
    singleLineComment: "#",
    endOfLine: [],
};
// Dart
exports.Dart = {
    name: "Dart",
    topLevelKeywords: ["class", "import", "void", "enum"],
    singleLineComment: "//",
    endOfLine: [";"],
};
// Solidity
exports.Solidity = {
    name: "Solidity",
    topLevelKeywords: [
        "contract",
        "event",
        "modifier",
        "function",
        "constructor",
        "for",
        "require",
        "emit",
        "interface",
        "error",
        "library",
        "struct",
        "enum",
        "type",
    ],
    singleLineComment: "//",
    endOfLine: [";"],
};
// Lua
exports.Lua = {
    name: "Lua",
    topLevelKeywords: ["function"],
    singleLineComment: "--",
    endOfLine: [],
};
// YAML
exports.YAML = {
    name: "YAML",
    topLevelKeywords: [],
    singleLineComment: "#",
    endOfLine: [],
    lineFilters: [
        // Only display one list item at a time
        function (_a) {
            return __asyncGenerator(this, arguments, function (_b) {
                var seenListItem, _c, lines_1, lines_1_1, line, e_1_1;
                var _d, e_1, _e, _f;
                var lines = _b.lines, fullStop = _b.fullStop;
                return __generator(this, function (_g) {
                    switch (_g.label) {
                        case 0:
                            seenListItem = false;
                            _g.label = 1;
                        case 1:
                            _g.trys.push([1, 8, 9, 14]);
                            _c = true, lines_1 = __asyncValues(lines);
                            _g.label = 2;
                        case 2: return [4 /*yield*/, __await(lines_1.next())];
                        case 3:
                            if (!(lines_1_1 = _g.sent(), _d = lines_1_1.done, !_d)) return [3 /*break*/, 7];
                            _f = lines_1_1.value;
                            _c = false;
                            line = _f;
                            if (line.trim().startsWith("- ")) {
                                if (seenListItem) {
                                    fullStop();
                                    return [3 /*break*/, 7];
                                }
                                else {
                                    seenListItem = true;
                                }
                            }
                            return [4 /*yield*/, __await(line)];
                        case 4: return [4 /*yield*/, _g.sent()];
                        case 5:
                            _g.sent();
                            _g.label = 6;
                        case 6:
                            _c = true;
                            return [3 /*break*/, 2];
                        case 7: return [3 /*break*/, 14];
                        case 8:
                            e_1_1 = _g.sent();
                            e_1 = { error: e_1_1 };
                            return [3 /*break*/, 14];
                        case 9:
                            _g.trys.push([9, , 12, 13]);
                            if (!(!_c && !_d && (_e = lines_1.return))) return [3 /*break*/, 11];
                            return [4 /*yield*/, __await(_e.call(lines_1))];
                        case 10:
                            _g.sent();
                            _g.label = 11;
                        case 11: return [3 /*break*/, 13];
                        case 12:
                            if (e_1) throw e_1.error;
                            return [7 /*endfinally*/];
                        case 13: return [7 /*endfinally*/];
                        case 14: return [2 /*return*/];
                    }
                });
            });
        },
        // Don't allow consecutive lines of same key
        function (_a) {
            return __asyncGenerator(this, arguments, function (_b) {
                var lastKey, _c, lines_2, lines_2_1, line, key, e_2_1;
                var _d, e_2, _e, _f;
                var lines = _b.lines;
                return __generator(this, function (_g) {
                    switch (_g.label) {
                        case 0:
                            lastKey = undefined;
                            _g.label = 1;
                        case 1:
                            _g.trys.push([1, 13, 14, 19]);
                            _c = true, lines_2 = __asyncValues(lines);
                            _g.label = 2;
                        case 2: return [4 /*yield*/, __await(lines_2.next())];
                        case 3:
                            if (!(lines_2_1 = _g.sent(), _d = lines_2_1.done, !_d)) return [3 /*break*/, 12];
                            _f = lines_2_1.value;
                            _c = false;
                            line = _f;
                            if (!line.includes(":")) return [3 /*break*/, 8];
                            key = line.split(":")[0];
                            if (!(key === lastKey)) return [3 /*break*/, 4];
                            return [3 /*break*/, 12];
                        case 4: return [4 /*yield*/, __await(line)];
                        case 5: return [4 /*yield*/, _g.sent()];
                        case 6:
                            _g.sent();
                            lastKey = key;
                            _g.label = 7;
                        case 7: return [3 /*break*/, 11];
                        case 8: return [4 /*yield*/, __await(line)];
                        case 9: return [4 /*yield*/, _g.sent()];
                        case 10:
                            _g.sent();
                            _g.label = 11;
                        case 11:
                            _c = true;
                            return [3 /*break*/, 2];
                        case 12: return [3 /*break*/, 19];
                        case 13:
                            e_2_1 = _g.sent();
                            e_2 = { error: e_2_1 };
                            return [3 /*break*/, 19];
                        case 14:
                            _g.trys.push([14, , 17, 18]);
                            if (!(!_c && !_d && (_e = lines_2.return))) return [3 /*break*/, 16];
                            return [4 /*yield*/, __await(_e.call(lines_2))];
                        case 15:
                            _g.sent();
                            _g.label = 16;
                        case 16: return [3 /*break*/, 18];
                        case 17:
                            if (e_2) throw e_2.error;
                            return [7 /*endfinally*/];
                        case 18: return [7 /*endfinally*/];
                        case 19: return [2 /*return*/];
                    }
                });
            });
        },
    ],
};
exports.Json = {
    name: "JSON",
    topLevelKeywords: [],
    singleLineComment: "//",
    endOfLine: [",", "}", "]"],
    charFilters: [
        function matchBrackets(_a) {
            var chars = _a.chars, prefix = _a.prefix, suffix = _a.suffix, filepath = _a.filepath, multiline = _a.multiline;
            var bracketMatchingService = new BracketMatchingService_1.BracketMatchingService();
            return bracketMatchingService.stopOnUnmatchedClosingBracket(chars, prefix, suffix, filepath, multiline);
        },
    ],
};
exports.Markdown = {
    name: "Markdown",
    topLevelKeywords: [],
    singleLineComment: "",
    endOfLine: [],
    useMultiline: function (_a) {
        var prefix = _a.prefix, suffix = _a.suffix;
        var singleLineStarters = ["- ", "* ", /^\d+\. /, "> ", "```", /^#{1,6} /];
        var currentLine = prefix.split("\n").pop();
        if (!currentLine) {
            return true;
        }
        currentLine = currentLine.trim();
        for (var _i = 0, singleLineStarters_1 = singleLineStarters; _i < singleLineStarters_1.length; _i++) {
            var starter = singleLineStarters_1[_i];
            if (typeof starter === "string"
                ? currentLine.startsWith(starter)
                : starter.test(currentLine)) {
                return false;
            }
        }
        return true;
    },
};
exports.LANGUAGES = {
    ts: exports.Typescript,
    js: exports.JavaScript,
    tsx: exports.Typescript,
    json: exports.Json,
    jsx: exports.Typescript,
    ipynb: exports.Python,
    py: exports.Python,
    pyi: exports.Python,
    java: exports.Java,
    cpp: exports.Cpp,
    cxx: exports.Cpp,
    h: exports.Cpp,
    hpp: exports.Cpp,
    cs: exports.CSharp,
    c: exports.C,
    scala: exports.Scala,
    sc: exports.Scala,
    go: exports.Go,
    rs: exports.Rust,
    hs: exports.Haskell,
    php: exports.PHP,
    rb: exports.Ruby,
    rails: exports.RubyOnRails,
    swift: exports.Swift,
    kt: exports.Kotlin,
    clj: exports.Clojure,
    cljs: exports.Clojure,
    cljc: exports.Clojure,
    jl: exports.Julia,
    fs: exports.FSharp,
    fsi: exports.FSharp,
    fsx: exports.FSharp,
    fsscript: exports.FSharp,
    r: exports.R,
    R: exports.R,
    dart: exports.Dart,
    sol: exports.Solidity,
    yaml: exports.YAML,
    yml: exports.YAML,
    md: exports.Markdown,
    lua: exports.Lua,
    luau: exports.Lua,
};
function languageForFilepath(fileUri) {
    var extension = (0, uri_1.getUriFileExtension)(fileUri);
    return exports.LANGUAGES[extension] || exports.Typescript;
}
