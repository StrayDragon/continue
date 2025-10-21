"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appendPathToUrlIfNotPresent = appendPathToUrlIfNotPresent;
function appendPathToUrlIfNotPresent(urlString, pathWithoutSlash) {
    var url = new URL(urlString);
    if (!url.pathname.endsWith("/")) {
        url.pathname += "/";
    }
    if (!url.pathname.endsWith(pathWithoutSlash + "/")) {
        url.pathname += pathWithoutSlash + "/";
    }
    if (url.search) {
        return url.toString();
    }
    // append slash at the end
    return url.toString();
}
