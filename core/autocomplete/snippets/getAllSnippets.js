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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllSnippetsWithoutRace = exports.getAllSnippets = void 0;
var uri_1 = require("../../util/uri");
var openedFilesLruCache_1 = require("../util/openedFilesLruCache");
var gitDiffCache_1 = require("./gitDiffCache");
var types_1 = require("./types");
var IDE_SNIPPETS_ENABLED = false; // ideSnippets is not used, so it's temporarily disabled
function racePromise(promise, timeout) {
    if (timeout === void 0) { timeout = 100; }
    var timeoutPromise = new Promise(function (resolve) {
        setTimeout(function () { return resolve([]); }, timeout);
    });
    return Promise.race([promise, timeoutPromise]);
}
// Some IDEs might have special ways of finding snippets (e.g. JetBrains and VS Code have different "LSP-equivalent" systems,
// or they might separately track recently edited ranges)
function getIdeSnippets(helper, ide, getDefinitionsFromLsp) {
    return __awaiter(this, void 0, void 0, function () {
        var ideSnippets, workspaceDirs_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getDefinitionsFromLsp(helper.input.filepath, helper.fullPrefix + helper.fullSuffix, helper.fullPrefix.length, ide, helper.lang)];
                case 1:
                    ideSnippets = _a.sent();
                    if (!helper.options.onlyMyCode) return [3 /*break*/, 3];
                    return [4 /*yield*/, ide.getWorkspaceDirs()];
                case 2:
                    workspaceDirs_1 = _a.sent();
                    return [2 /*return*/, ideSnippets.filter(function (snippet) {
                            return workspaceDirs_1.some(function (dir) { return !!(0, uri_1.findUriInDirs)(snippet.filepath, [dir]).foundInDir; });
                        })];
                case 3: return [2 /*return*/, ideSnippets];
            }
        });
    });
}
function getSnippetsFromRecentlyEditedRanges(helper) {
    if (helper.options.useRecentlyEdited === false) {
        return [];
    }
    return helper.input.recentlyEditedRanges.map(function (range) {
        return {
            filepath: range.filepath,
            content: range.lines.join("\n"),
            type: types_1.AutocompleteSnippetType.Code,
        };
    });
}
var getClipboardSnippets = function (ide) { return __awaiter(void 0, void 0, void 0, function () {
    var content;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ide.getClipboardContent()];
            case 1:
                content = _a.sent();
                return [2 /*return*/, [content].map(function (item) {
                        return {
                            content: item.text,
                            copiedAt: item.copiedAt,
                            type: types_1.AutocompleteSnippetType.Clipboard,
                        };
                    })];
        }
    });
}); };
var getDiffSnippets = function (ide) { return __awaiter(void 0, void 0, void 0, function () {
    var diffs;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, gitDiffCache_1.getDiffsFromCache)(ide)];
            case 1:
                diffs = _a.sent();
                return [2 /*return*/, diffs.map(function (item) {
                        return {
                            content: item,
                            type: types_1.AutocompleteSnippetType.Diff,
                        };
                    })];
        }
    });
}); };
var getSnippetsFromRecentlyOpenedFiles = function (helper, ide) { return __awaiter(void 0, void 0, void 0, function () {
    var currentFileUri_1, fileUrisToRead, fileReadPromises, results, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (helper.options.useRecentlyOpened === false) {
                    return [2 /*return*/, []];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                currentFileUri_1 = "".concat(helper.filepath);
                fileUrisToRead = __spreadArray([], openedFilesLruCache_1.openedFilesLruCache.entriesDescending(), true).filter(function (_a) {
                    var fileUri = _a[0], _ = _a[1];
                    return fileUri !== currentFileUri_1;
                })
                    .map(function (_a) {
                    var fileUri = _a[0], _ = _a[1];
                    return fileUri;
                });
                fileReadPromises = fileUrisToRead.map(function (fileUri) {
                    // Create a promise that resolves to a snippet or null
                    var readPromise = new Promise(function (resolve) {
                        ide
                            .readFile(fileUri)
                            .then(function (fileContent) {
                            if (!fileContent || fileContent.trim() === "") {
                                resolve(null);
                                return;
                            }
                            resolve({
                                filepath: fileUri,
                                content: fileContent,
                                type: types_1.AutocompleteSnippetType.Code,
                            });
                        })
                            .catch(function (e) {
                            console.error("Failed to read file ".concat(fileUri, ":"), e);
                            resolve(null);
                        });
                    });
                    // Cut off at 80ms via racing promises
                    return Promise.race([
                        readPromise,
                        new Promise(function (resolve) { return setTimeout(function () { return resolve(null); }, 80); }),
                    ]);
                });
                return [4 /*yield*/, Promise.all(fileReadPromises)];
            case 2:
                results = _a.sent();
                // Filter out null results
                return [2 /*return*/, results.filter(Boolean)];
            case 3:
                e_1 = _a.sent();
                console.error("Error processing opened files cache:", e_1);
                return [2 /*return*/, []];
            case 4: return [2 /*return*/];
        }
    });
}); };
var getAllSnippets = function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var recentlyEditedRangeSnippets, _c, rootPathSnippets, importDefinitionSnippets, ideSnippets, diffSnippets, clipboardSnippets, recentlyOpenedFileSnippets, staticSnippet;
    var helper = _b.helper, ide = _b.ide, getDefinitionsFromLsp = _b.getDefinitionsFromLsp, contextRetrievalService = _b.contextRetrievalService;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                recentlyEditedRangeSnippets = getSnippetsFromRecentlyEditedRanges(helper);
                return [4 /*yield*/, Promise.all([
                        racePromise(contextRetrievalService.getRootPathSnippets(helper)),
                        racePromise(contextRetrievalService.getSnippetsFromImportDefinitions(helper)),
                        IDE_SNIPPETS_ENABLED
                            ? racePromise(getIdeSnippets(helper, ide, getDefinitionsFromLsp))
                            : [],
                        [], // racePromise(getDiffSnippets(ide)) // temporarily disabled, see https://github.com/continuedev/continue/pull/5882,
                        racePromise(getClipboardSnippets(ide)),
                        racePromise(getSnippetsFromRecentlyOpenedFiles(helper, ide)), // giving this one a little more time to complete
                        helper.options.experimental_enableStaticContextualization
                            ? racePromise(contextRetrievalService.getStaticContextSnippets(helper))
                            : [],
                    ])];
            case 1:
                _c = _d.sent(), rootPathSnippets = _c[0], importDefinitionSnippets = _c[1], ideSnippets = _c[2], diffSnippets = _c[3], clipboardSnippets = _c[4], recentlyOpenedFileSnippets = _c[5], staticSnippet = _c[6];
                return [2 /*return*/, {
                        rootPathSnippets: rootPathSnippets,
                        importDefinitionSnippets: importDefinitionSnippets,
                        ideSnippets: ideSnippets,
                        recentlyEditedRangeSnippets: recentlyEditedRangeSnippets,
                        diffSnippets: diffSnippets,
                        clipboardSnippets: clipboardSnippets,
                        recentlyVisitedRangesSnippets: helper.input.recentlyVisitedRanges,
                        recentlyOpenedFileSnippets: recentlyOpenedFileSnippets,
                        staticSnippet: staticSnippet,
                    }];
        }
    });
}); };
exports.getAllSnippets = getAllSnippets;
var getAllSnippetsWithoutRace = function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var recentlyEditedRangeSnippets, _c, rootPathSnippets, importDefinitionSnippets, ideSnippets, diffSnippets, clipboardSnippets, recentlyOpenedFileSnippets, staticSnippet;
    var helper = _b.helper, ide = _b.ide, getDefinitionsFromLsp = _b.getDefinitionsFromLsp, contextRetrievalService = _b.contextRetrievalService;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                recentlyEditedRangeSnippets = getSnippetsFromRecentlyEditedRanges(helper);
                return [4 /*yield*/, Promise.all([
                        contextRetrievalService.getRootPathSnippets(helper),
                        contextRetrievalService.getSnippetsFromImportDefinitions(helper),
                        IDE_SNIPPETS_ENABLED
                            ? getIdeSnippets(helper, ide, getDefinitionsFromLsp)
                            : [],
                        [], // racePromise(getDiffSnippets(ide)) // temporarily disabled, see https://github.com/continuedev/continue/pull/5882,
                        getClipboardSnippets(ide),
                        getSnippetsFromRecentlyOpenedFiles(helper, ide),
                        helper.options.experimental_enableStaticContextualization
                            ? contextRetrievalService.getStaticContextSnippets(helper)
                            : [],
                    ])];
            case 1:
                _c = _d.sent(), rootPathSnippets = _c[0], importDefinitionSnippets = _c[1], ideSnippets = _c[2], diffSnippets = _c[3], clipboardSnippets = _c[4], recentlyOpenedFileSnippets = _c[5], staticSnippet = _c[6];
                return [2 /*return*/, {
                        rootPathSnippets: rootPathSnippets,
                        importDefinitionSnippets: importDefinitionSnippets,
                        ideSnippets: ideSnippets,
                        recentlyEditedRangeSnippets: recentlyEditedRangeSnippets,
                        diffSnippets: diffSnippets,
                        clipboardSnippets: clipboardSnippets,
                        recentlyVisitedRangesSnippets: helper.input.recentlyVisitedRanges,
                        recentlyOpenedFileSnippets: recentlyOpenedFileSnippets,
                        staticSnippet: staticSnippet,
                    }];
        }
    });
}); };
exports.getAllSnippetsWithoutRace = getAllSnippetsWithoutRace;
