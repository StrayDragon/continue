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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFullLanguageName = exports.IGNORE_PATH_PATTERNS = exports.supportedLanguages = exports.LanguageName = void 0;
exports.getParserForFile = getParserForFile;
exports.getLanguageForFile = getLanguageForFile;
exports.getQueryForFile = getQueryForFile;
exports.getSymbolsForFile = getSymbolsForFile;
exports.getSymbolsForManyFiles = getSymbolsForManyFiles;
var node_fs_1 = require("node:fs");
var path_1 = require("path");
var web_tree_sitter_1 = require("web-tree-sitter");
var uri_1 = require("./uri");
var LanguageName;
(function (LanguageName) {
    LanguageName["CPP"] = "cpp";
    LanguageName["C_SHARP"] = "c_sharp";
    LanguageName["C"] = "c";
    LanguageName["CSS"] = "css";
    LanguageName["PHP"] = "php";
    LanguageName["BASH"] = "bash";
    LanguageName["JSON"] = "json";
    LanguageName["TYPESCRIPT"] = "typescript";
    LanguageName["TSX"] = "tsx";
    LanguageName["ELM"] = "elm";
    LanguageName["JAVASCRIPT"] = "javascript";
    LanguageName["PYTHON"] = "python";
    LanguageName["ELISP"] = "elisp";
    LanguageName["ELIXIR"] = "elixir";
    LanguageName["GO"] = "go";
    LanguageName["EMBEDDED_TEMPLATE"] = "embedded_template";
    LanguageName["HTML"] = "html";
    LanguageName["JAVA"] = "java";
    LanguageName["LUA"] = "lua";
    LanguageName["OCAML"] = "ocaml";
    LanguageName["QL"] = "ql";
    LanguageName["RESCRIPT"] = "rescript";
    LanguageName["RUBY"] = "ruby";
    LanguageName["RUST"] = "rust";
    LanguageName["SYSTEMRDL"] = "systemrdl";
    LanguageName["TOML"] = "toml";
    LanguageName["SOLIDITY"] = "solidity";
})(LanguageName || (exports.LanguageName = LanguageName = {}));
exports.supportedLanguages = {
    cpp: LanguageName.CPP,
    hpp: LanguageName.CPP,
    cc: LanguageName.CPP,
    cxx: LanguageName.CPP,
    hxx: LanguageName.CPP,
    cp: LanguageName.CPP,
    hh: LanguageName.CPP,
    inc: LanguageName.CPP,
    // Depended on this PR: https://github.com/tree-sitter/tree-sitter-cpp/pull/173
    // ccm: LanguageName.CPP,
    // c++m: LanguageName.CPP,
    // cppm: LanguageName.CPP,
    // cxxm: LanguageName.CPP,
    cs: LanguageName.C_SHARP,
    c: LanguageName.C,
    h: LanguageName.C,
    css: LanguageName.CSS,
    php: LanguageName.PHP,
    phtml: LanguageName.PHP,
    php3: LanguageName.PHP,
    php4: LanguageName.PHP,
    php5: LanguageName.PHP,
    php7: LanguageName.PHP,
    phps: LanguageName.PHP,
    "php-s": LanguageName.PHP,
    bash: LanguageName.BASH,
    sh: LanguageName.BASH,
    json: LanguageName.JSON,
    ts: LanguageName.TYPESCRIPT,
    mts: LanguageName.TYPESCRIPT,
    cts: LanguageName.TYPESCRIPT,
    tsx: LanguageName.TSX,
    // vue: LanguageName.VUE,  // tree-sitter-vue parser is broken
    // The .wasm file being used is faulty, and yaml is split line-by-line anyway for the most part
    // yaml: LanguageName.YAML,
    // yml: LanguageName.YAML,
    elm: LanguageName.ELM,
    js: LanguageName.JAVASCRIPT,
    jsx: LanguageName.JAVASCRIPT,
    mjs: LanguageName.JAVASCRIPT,
    cjs: LanguageName.JAVASCRIPT,
    py: LanguageName.PYTHON,
    // ipynb: LanguageName.PYTHON, // It contains Python, but the file format is a ton of JSON.
    pyw: LanguageName.PYTHON,
    pyi: LanguageName.PYTHON,
    el: LanguageName.ELISP,
    emacs: LanguageName.ELISP,
    ex: LanguageName.ELIXIR,
    exs: LanguageName.ELIXIR,
    go: LanguageName.GO,
    eex: LanguageName.EMBEDDED_TEMPLATE,
    heex: LanguageName.EMBEDDED_TEMPLATE,
    leex: LanguageName.EMBEDDED_TEMPLATE,
    html: LanguageName.HTML,
    htm: LanguageName.HTML,
    java: LanguageName.JAVA,
    lua: LanguageName.LUA,
    luau: LanguageName.LUA,
    ocaml: LanguageName.OCAML,
    ml: LanguageName.OCAML,
    mli: LanguageName.OCAML,
    ql: LanguageName.QL,
    res: LanguageName.RESCRIPT,
    resi: LanguageName.RESCRIPT,
    rb: LanguageName.RUBY,
    erb: LanguageName.RUBY,
    rs: LanguageName.RUST,
    rdl: LanguageName.SYSTEMRDL,
    toml: LanguageName.TOML,
    sol: LanguageName.SOLIDITY,
    // jl: LanguageName.JULIA,
    // swift: LanguageName.SWIFT,
    // kt: LanguageName.KOTLIN,
    // scala: LanguageName.SCALA,
};
exports.IGNORE_PATH_PATTERNS = (_a = {},
    _a[LanguageName.TYPESCRIPT] = [/.*node_modules/],
    _a[LanguageName.JAVASCRIPT] = [/.*node_modules/],
    _a);
function getParserForFile(filepath) {
    return __awaiter(this, void 0, void 0, function () {
        var parser, language, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, web_tree_sitter_1.default.init()];
                case 1:
                    _a.sent();
                    parser = new web_tree_sitter_1.default();
                    return [4 /*yield*/, getLanguageForFile(filepath)];
                case 2:
                    language = _a.sent();
                    if (!language) {
                        return [2 /*return*/, undefined];
                    }
                    parser.setLanguage(language);
                    return [2 /*return*/, parser];
                case 3:
                    e_1 = _a.sent();
                    console.debug("Unable to load language for file", filepath, e_1);
                    return [2 /*return*/, undefined];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Loading the wasm files to create a Language object is an expensive operation and with
// sufficient number of files can result in errors, instead keep a map of language name
// to Language object
var nameToLanguage = new Map();
function getLanguageForFile(filepath) {
    return __awaiter(this, void 0, void 0, function () {
        var extension, languageName, language, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, web_tree_sitter_1.default.init()];
                case 1:
                    _a.sent();
                    extension = (0, uri_1.getUriFileExtension)(filepath);
                    languageName = exports.supportedLanguages[extension];
                    if (!languageName) {
                        return [2 /*return*/, undefined];
                    }
                    language = nameToLanguage.get(languageName);
                    if (!!language) return [3 /*break*/, 3];
                    return [4 /*yield*/, loadLanguageForFileExt(extension)];
                case 2:
                    language = _a.sent();
                    nameToLanguage.set(languageName, language);
                    _a.label = 3;
                case 3: return [2 /*return*/, language];
                case 4:
                    e_2 = _a.sent();
                    console.debug("Unable to load language for file", filepath, e_2);
                    return [2 /*return*/, undefined];
                case 5: return [2 /*return*/];
            }
        });
    });
}
var getFullLanguageName = function (filepath) {
    var extension = (0, uri_1.getUriFileExtension)(filepath);
    return exports.supportedLanguages[extension];
};
exports.getFullLanguageName = getFullLanguageName;
function getQueryForFile(filepath, queryPath) {
    return __awaiter(this, void 0, void 0, function () {
        var language, sourcePath, querySource, query;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getLanguageForFile(filepath)];
                case 1:
                    language = _a.sent();
                    if (!language) {
                        return [2 /*return*/, undefined];
                    }
                    sourcePath = path_1.default.join.apply(path_1.default, __spreadArray(__spreadArray([process.env.NODE_ENV === "test" ? process.cwd() : __dirname,
                        ".."], (process.env.NODE_ENV === "test"
                        ? ["extensions", "vscode", "tree-sitter"]
                        : ["tree-sitter"]), false), [queryPath], false));
                    if (!node_fs_1.default.existsSync(sourcePath)) {
                        return [2 /*return*/, undefined];
                    }
                    querySource = node_fs_1.default.readFileSync(sourcePath).toString();
                    query = language.query(querySource);
                    return [2 /*return*/, query];
            }
        });
    });
}
function loadLanguageForFileExt(fileExtension) {
    return __awaiter(this, void 0, void 0, function () {
        var wasmPath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    wasmPath = path_1.default.join.apply(path_1.default, __spreadArray(__spreadArray([process.env.NODE_ENV === "test" ? process.cwd() : __dirname], (process.env.NODE_ENV === "test"
                        ? ["node_modules", "tree-sitter-wasms", "out"]
                        : ["tree-sitter-wasms"]), false), ["tree-sitter-".concat(exports.supportedLanguages[fileExtension], ".wasm")], false));
                    return [4 /*yield*/, web_tree_sitter_1.default.Language.load(wasmPath)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
// See https://tree-sitter.github.io/tree-sitter/using-parsers
var GET_SYMBOLS_FOR_NODE_TYPES = [
    "class_declaration",
    "class_definition",
    "function_item", // function name = first "identifier" child
    "function_definition",
    "method_declaration", // method name = first "identifier" child
    "method_definition",
    "generator_function_declaration",
    // property_identifier
    // field_declaration
    // "arrow_function",
];
function getSymbolsForFile(filepath, contents) {
    return __awaiter(this, void 0, void 0, function () {
        function findNamedNodesRecursive(node) {
            // console.log(`node: ${node.type}, ${node.text}`);
            if (GET_SYMBOLS_FOR_NODE_TYPES.includes(node.type)) {
                // console.log(`parent: ${node.type}, ${node.text.substring(0, 200)}`);
                // node.children.forEach((child) => {
                //   console.log(`child: ${child.type}, ${child.text}`);
                // });
                // Empirically, the actual name is the last identifier in the node
                // Especially with languages where return type is declared before the name
                // TODO use findLast in newer version of node target
                var identifier = undefined;
                for (var i = node.children.length - 1; i >= 0; i--) {
                    if (node.children[i].type === "identifier" ||
                        node.children[i].type === "property_identifier") {
                        identifier = node.children[i];
                        break;
                    }
                }
                if (identifier === null || identifier === void 0 ? void 0 : identifier.text) {
                    symbols.push({
                        filepath: filepath,
                        type: node.type,
                        name: identifier.text,
                        range: {
                            start: {
                                character: node.startPosition.column,
                                line: node.startPosition.row,
                            },
                            end: {
                                character: node.endPosition.column + 1,
                                line: node.endPosition.row + 1,
                            },
                        },
                        content: node.text,
                    });
                }
            }
            node.children.forEach(findNamedNodesRecursive);
        }
        var parser, tree, symbols;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getParserForFile(filepath)];
                case 1:
                    parser = _a.sent();
                    if (!parser) {
                        return [2 /*return*/];
                    }
                    try {
                        tree = parser.parse(contents);
                    }
                    catch (e) {
                        console.log("Error parsing file: ".concat(filepath));
                        return [2 /*return*/];
                    }
                    symbols = [];
                    findNamedNodesRecursive(tree.rootNode);
                    return [2 /*return*/, symbols];
            }
        });
    });
}
function getSymbolsForManyFiles(uris, ide) {
    return __awaiter(this, void 0, void 0, function () {
        var filesAndSymbols;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.all(uris.map(function (uri) { return __awaiter(_this, void 0, void 0, function () {
                        var contents, symbols, e_3;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, ide.readFile(uri)];
                                case 1:
                                    contents = _a.sent();
                                    symbols = undefined;
                                    _a.label = 2;
                                case 2:
                                    _a.trys.push([2, 4, , 5]);
                                    return [4 /*yield*/, getSymbolsForFile(uri, contents)];
                                case 3:
                                    symbols = _a.sent();
                                    return [3 /*break*/, 5];
                                case 4:
                                    e_3 = _a.sent();
                                    console.error("Failed to get symbols for ".concat(uri, ":"), e_3);
                                    return [3 /*break*/, 5];
                                case 5: return [2 /*return*/, [uri, symbols !== null && symbols !== void 0 ? symbols : []]];
                            }
                        });
                    }); }))];
                case 1:
                    filesAndSymbols = _a.sent();
                    return [2 /*return*/, Object.fromEntries(filesAndSymbols)];
            }
        });
    });
}
