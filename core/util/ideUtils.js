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
exports.resolveRelativePathInDir = resolveRelativePathInDir;
exports.inferResolvedUriFromRelativePath = inferResolvedUriFromRelativePath;
var uri_1 = require("./uri");
/*
  This function takes a relative (to workspace) filepath
  And checks each workspace for if it exists or not
  Only returns fully resolved URI if it exists
*/
function resolveRelativePathInDir(path, ide, dirUriCandidates) {
    return __awaiter(this, void 0, void 0, function () {
        var dirs, _a, _i, dirs_1, dirUri, fullUri;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!(dirUriCandidates !== null && dirUriCandidates !== void 0)) return [3 /*break*/, 1];
                    _a = dirUriCandidates;
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, ide.getWorkspaceDirs()];
                case 2:
                    _a = (_b.sent());
                    _b.label = 3;
                case 3:
                    dirs = _a;
                    _i = 0, dirs_1 = dirs;
                    _b.label = 4;
                case 4:
                    if (!(_i < dirs_1.length)) return [3 /*break*/, 7];
                    dirUri = dirs_1[_i];
                    fullUri = (0, uri_1.joinPathsToUri)(dirUri, path);
                    return [4 /*yield*/, ide.fileExists(fullUri)];
                case 5:
                    if (_b.sent()) {
                        return [2 /*return*/, fullUri];
                    }
                    _b.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 4];
                case 7: return [2 /*return*/, undefined];
            }
        });
    });
}
/*
  Same as above but in this case the relative path does not need to exist (e.g. file to be created, etc)
  Checks closes match with the dirs, path segment by segment
  and based on which workspace has the closest matching path, returns resolved URI
  If no meaninful path match just concatenates to first dir's uri
*/
function inferResolvedUriFromRelativePath(_relativePath, ide, dirCandidates) {
    return __awaiter(this, void 0, void 0, function () {
        var relativePath, dirs, _a, segments, suffixes, i, _loop_1, _i, suffixes_1, suffix, state_1, activeFile;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    relativePath = _relativePath.trim().replaceAll("\\", "/");
                    if (!(dirCandidates !== null && dirCandidates !== void 0)) return [3 /*break*/, 1];
                    _a = dirCandidates;
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, ide.getWorkspaceDirs()];
                case 2:
                    _a = (_b.sent());
                    _b.label = 3;
                case 3:
                    dirs = _a;
                    if (dirs.length === 0) {
                        throw new Error("inferResolvedUriFromRelativePath: no dirs provided");
                    }
                    segments = (0, uri_1.pathToUriPathSegment)(relativePath).split("/");
                    suffixes = [];
                    for (i = segments.length - 1; i >= 0; i--) {
                        suffixes.push(segments.slice(i).join("/"));
                    }
                    _loop_1 = function (suffix) {
                        var uris, promises, existenceChecks, existingUris;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    uris = dirs.map(function (dir) { return ({
                                        dir: dir,
                                        partialUri: (0, uri_1.joinEncodedUriPathSegmentToUri)(dir, suffix),
                                    }); });
                                    promises = uris.map(function (_a) { return __awaiter(_this, [_a], void 0, function (_b) {
                                        var exists;
                                        var partialUri = _b.partialUri, dir = _b.dir;
                                        return __generator(this, function (_c) {
                                            switch (_c.label) {
                                                case 0: return [4 /*yield*/, ide.fileExists(partialUri)];
                                                case 1:
                                                    exists = _c.sent();
                                                    return [2 /*return*/, {
                                                            dir: dir,
                                                            partialUri: partialUri,
                                                            exists: exists,
                                                        }];
                                            }
                                        });
                                    }); });
                                    return [4 /*yield*/, Promise.all(promises)];
                                case 1:
                                    existenceChecks = _c.sent();
                                    existingUris = existenceChecks.filter(function (_a) {
                                        var exists = _a.exists;
                                        return exists;
                                    });
                                    // If exactly one directory matches, use it
                                    if (existingUris.length === 1) {
                                        return [2 /*return*/, { value: (0, uri_1.joinEncodedUriPathSegmentToUri)(existingUris[0].dir, segments.join("/")) }];
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0, suffixes_1 = suffixes;
                    _b.label = 4;
                case 4:
                    if (!(_i < suffixes_1.length)) return [3 /*break*/, 7];
                    suffix = suffixes_1[_i];
                    return [5 /*yield**/, _loop_1(suffix)];
                case 5:
                    state_1 = _b.sent();
                    if (typeof state_1 === "object")
                        return [2 /*return*/, state_1.value];
                    _b.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 4];
                case 7: return [4 /*yield*/, ide.getCurrentFile()];
                case 8:
                    activeFile = _b.sent();
                    if (activeFile && activeFile.path.endsWith(relativePath)) {
                        return [2 /*return*/, activeFile.path];
                    }
                    // If no unique match found, use the first directory
                    return [2 /*return*/, (0, uri_1.joinPathsToUri)(dirs[0], relativePath)];
            }
        });
    });
}
