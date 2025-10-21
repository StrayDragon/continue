"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.localPathToUri = localPathToUri;
exports.localPathOrUriToPath = localPathOrUriToPath;
var url_1 = require("url");
var URI = require("uri-js");
// CAN ONLY BE USED IN CORE
// Converts a local path to a file:/// URI
function localPathToUri(path) {
    // This may incidentally solve bugs, but it is primarily here to warn us if we accidentally try to double-convert. It doesn't handle other URI schemes.
    if (path.startsWith("file://")) {
        console.warn("localPathToUri: path already starts with file://");
        return path;
    }
    var url = (0, url_1.pathToFileURL)(path);
    return URI.normalize(url.toString());
}
function localPathOrUriToPath(localPathOrUri) {
    try {
        return (0, url_1.fileURLToPath)(localPathOrUri);
    }
    catch (e) {
        // console.log("Received local filepath", localPathOrUri);
        return localPathOrUri;
    }
}
