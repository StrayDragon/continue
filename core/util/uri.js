"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pathToUriPathSegment = pathToUriPathSegment;
exports.getCleanUriPath = getCleanUriPath;
exports.findUriInDirs = findUriInDirs;
exports.getUriPathBasename = getUriPathBasename;
exports.getFileExtensionFromBasename = getFileExtensionFromBasename;
exports.getUriFileExtension = getUriFileExtension;
exports.getLastNUriRelativePathParts = getLastNUriRelativePathParts;
exports.joinPathsToUri = joinPathsToUri;
exports.joinEncodedUriPathSegmentToUri = joinEncodedUriPathSegmentToUri;
exports.getShortestUniqueRelativeUriPaths = getShortestUniqueRelativeUriPaths;
exports.getLastNPathParts = getLastNPathParts;
exports.getUriDescription = getUriDescription;
var URI = require("uri-js");
/** Converts any OS path to cleaned up URI path segment format with no leading/trailing slashes
   e.g. \path\to\folder\ -> path/to/folder
        \this\is\afile.ts -> this/is/afile.ts
        is/already/clean -> is/already/clean
  **/
function pathToUriPathSegment(path) {
    var clean = path.replace(/[\\]/g, "/"); // backslashes -> forward slashes
    clean = clean.replace(/^\//, ""); // remove start slash
    clean = clean.replace(/\/$/, ""); // remove end slash
    return clean
        .split("/")
        .map(function (part) { return encodeURIComponent(part); })
        .join("/");
}
function getCleanUriPath(uri) {
    var _a;
    var path = (_a = URI.parse(uri).path) !== null && _a !== void 0 ? _a : "";
    var clean = path.replace(/^\//, ""); // remove start slash
    clean = clean.replace(/\/$/, ""); // remove end slash
    return clean;
}
function findUriInDirs(uri, dirUriCandidates) {
    var uriComps = URI.parse(uri);
    if (!uriComps.scheme) {
        throw new Error("Invalid uri: ".concat(uri));
    }
    var uriPathParts = getCleanUriPath(uri).split("/");
    for (var _i = 0, dirUriCandidates_1 = dirUriCandidates; _i < dirUriCandidates_1.length; _i++) {
        var dir = dirUriCandidates_1[_i];
        var dirComps = URI.parse(dir);
        if (!dirComps.scheme) {
            throw new Error("Invalid uri: ".concat(dir));
        }
        if (uriComps.scheme !== dirComps.scheme) {
            continue;
        }
        // Can't just use startsWith because e.g.
        // file:///folder/file is not within file:///fold
        // At this point we break the path up and check if each dir path part matches
        var dirPathParts = getCleanUriPath(dir).split("/");
        if (uriPathParts.length < dirPathParts.length) {
            continue;
        }
        var allDirPartsMatch = true;
        for (var i = 0; i < dirPathParts.length; i++) {
            if (dirPathParts[i] !== uriPathParts[i]) {
                allDirPartsMatch = false;
            }
        }
        if (allDirPartsMatch) {
            var relativePath = uriPathParts
                .slice(dirPathParts.length)
                .map(decodeURIComponent)
                .join("/");
            return {
                uri: uri,
                relativePathOrBasename: relativePath,
                foundInDir: dir,
            };
        }
    }
    // Not found
    return {
        uri: uri,
        relativePathOrBasename: getUriPathBasename(uri),
        foundInDir: null,
    };
}
/*
  Returns just the file or folder name of a URI
*/
function getUriPathBasename(uri) {
    var path = getCleanUriPath(uri);
    var basename = path.split("/").pop() || "";
    return decodeURIComponent(basename);
}
function getFileExtensionFromBasename(basename) {
    var _a;
    var parts = basename.split(".");
    if (parts.length < 2) {
        return "";
    }
    return ((_a = parts.slice(-1)[0]) !== null && _a !== void 0 ? _a : "").toLowerCase();
}
/*
  Returns the file extension of a URI
*/
function getUriFileExtension(uri) {
    var baseName = getUriPathBasename(uri);
    return getFileExtensionFromBasename(baseName);
}
function getLastNUriRelativePathParts(dirUriCandidates, uri, n) {
    var relativePathOrBasename = findUriInDirs(uri, dirUriCandidates).relativePathOrBasename;
    return getLastNPathParts(relativePathOrBasename, n);
}
function joinPathsToUri(uri) {
    var pathSegments = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        pathSegments[_i - 1] = arguments[_i];
    }
    var baseUri = uri;
    if (baseUri.at(-1) !== "/") {
        baseUri += "/";
    }
    var segments = pathSegments.map(function (segment) { return pathToUriPathSegment(segment); });
    return URI.resolve(baseUri, segments.join("/"));
}
function joinEncodedUriPathSegmentToUri(uri, pathSegment) {
    var baseUri = uri;
    if (baseUri.at(-1) !== "/") {
        baseUri += "/";
    }
    return URI.resolve(baseUri, pathSegment);
}
function getShortestUniqueRelativeUriPaths(uris, dirUriCandidates) {
    // Split all URIs into segments and count occurrences of each suffix combination
    var segmentCombinationsMap = new Map();
    var segmentsInfo = uris.map(function (uri) {
        var relativePathOrBasename = findUriInDirs(uri, dirUriCandidates).relativePathOrBasename;
        var segments = relativePathOrBasename.split("/");
        var suffixes = [];
        // Generate all possible suffix combinations, starting from the shortest (basename)
        for (var i = segments.length - 1; i >= 0; i--) {
            var suffix = segments.slice(i).join("/");
            suffixes.push(suffix); // Now pushing in order from shortest to longest
            // Count occurrences of each suffix
            segmentCombinationsMap.set(suffix, (segmentCombinationsMap.get(suffix) || 0) + 1);
        }
        return { uri: uri, segments: segments, suffixes: suffixes, relativePathOrBasename: relativePathOrBasename };
    });
    // Find shortest unique path for each URI
    return segmentsInfo.map(function (_a) {
        var _b;
        var uri = _a.uri, suffixes = _a.suffixes, relativePathOrBasename = _a.relativePathOrBasename;
        // Since suffixes are now ordered from shortest to longest,
        // the first unique one we find will be the shortest
        var uniquePath = (_b = suffixes.find(function (suffix) { return segmentCombinationsMap.get(suffix) === 1; })) !== null && _b !== void 0 ? _b : relativePathOrBasename; // fallback to full path if no unique suffix found
        return { uri: uri, uniquePath: uniquePath };
    });
}
// Only used when working with system paths and relative paths
// Since doesn't account for URI segements before workspace
function getLastNPathParts(filepath, n) {
    if (n <= 0) {
        return "";
    }
    return filepath.split(/[\\/]/).slice(-n).join("/");
}
function getUriDescription(uri, dirUriCandidates) {
    var _a = findUriInDirs(uri, dirUriCandidates), relativePathOrBasename = _a.relativePathOrBasename, foundInDir = _a.foundInDir;
    var baseName = getUriPathBasename(uri);
    var extension = getFileExtensionFromBasename(baseName);
    var last2Parts = getLastNUriRelativePathParts(dirUriCandidates, uri, 2);
    return {
        uri: uri,
        relativePathOrBasename: relativePathOrBasename,
        foundInDir: foundInDir,
        last2Parts: last2Parts,
        baseName: baseName,
        extension: extension,
    };
}
