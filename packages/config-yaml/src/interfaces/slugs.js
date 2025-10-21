"use strict";
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
exports.VirtualTags = void 0;
exports.packageIdentifierToDisplayName = packageIdentifierToDisplayName;
exports.encodePackageIdentifier = encodePackageIdentifier;
exports.decodePackageIdentifier = decodePackageIdentifier;
exports.encodePackageSlug = encodePackageSlug;
exports.decodePackageSlug = decodePackageSlug;
exports.encodeFullSlug = encodeFullSlug;
exports.packageSlugsEqual = packageSlugsEqual;
exports.decodeFullSlug = decodeFullSlug;
exports.encodeFQSN = encodeFQSN;
exports.decodeFQSN = decodeFQSN;
function getProcessEnv() {
    if (typeof process !== "undefined" &&
        process &&
        typeof process === "object") {
        return process.env;
    }
    if (typeof globalThis !== "undefined") {
        var maybeProcess = globalThis.process;
        return maybeProcess === null || maybeProcess === void 0 ? void 0 : maybeProcess.env;
    }
    return undefined;
}
function getHomeDirectory() {
    var _a, _b;
    var env = getProcessEnv();
    var fromHome = (_a = env === null || env === void 0 ? void 0 : env.HOME) === null || _a === void 0 ? void 0 : _a.trim();
    if (fromHome) {
        return fromHome;
    }
    var fromUserProfile = (_b = env === null || env === void 0 ? void 0 : env.USERPROFILE) === null || _b === void 0 ? void 0 : _b.trim();
    if (fromUserProfile) {
        return fromUserProfile;
    }
    return undefined;
}
function expandLeadingTilde(identifier) {
    var homeDirectory = getHomeDirectory();
    if (!homeDirectory) {
        return identifier;
    }
    // Only replace a leading ~ so relative paths like ../~file stay untouched
    return homeDirectory + identifier.slice(1);
}
function packageIdentifierToDisplayName(id) {
    switch (id.uriType) {
        case "file":
            return id.fileUri;
        case "slug":
            return id.fullSlug.packageSlug;
    }
}
function encodePackageIdentifier(identifier) {
    switch (identifier.uriType) {
        case "slug":
            return encodeFullSlug(identifier.fullSlug);
        case "file":
            // For file paths, just return the path directly without a prefix
            return identifier.fileUri;
        default:
            throw new Error("Unknown URI type: ".concat(identifier.uriType));
    }
}
function decodePackageIdentifier(identifier) {
    // Shorthand: if it starts with . or /, then it's a path
    if (identifier.startsWith(".") || identifier.startsWith("/")) {
        return {
            uriType: "file",
            fileUri: identifier,
        };
    }
    // Keep support for explicit file:// protocol
    else if (identifier.startsWith("file://")) {
        return {
            uriType: "file",
            fileUri: identifier.substring(7),
        };
    }
    // support ~ by replacing with home directory
    else if (identifier.startsWith("~")) {
        return {
            uriType: "file",
            fileUri: expandLeadingTilde(identifier),
        };
    }
    // Otherwise, it's a slug
    return {
        uriType: "slug",
        fullSlug: decodeFullSlug(identifier),
    };
}
var VirtualTags;
(function (VirtualTags) {
    VirtualTags["Latest"] = "latest";
})(VirtualTags || (exports.VirtualTags = VirtualTags = {}));
function encodePackageSlug(packageSlug) {
    return "".concat(packageSlug.ownerSlug, "/").concat(packageSlug.packageSlug);
}
function decodePackageSlug(pkgSlug) {
    var _a = pkgSlug.split("/"), ownerSlug = _a[0], packageSlug = _a[1];
    return {
        ownerSlug: ownerSlug,
        packageSlug: packageSlug,
    };
}
function encodeFullSlug(fullSlug) {
    return "".concat(fullSlug.ownerSlug, "/").concat(fullSlug.packageSlug, "@").concat(fullSlug.versionSlug);
}
function packageSlugsEqual(pkgSlug1, pkgSlug2) {
    return (pkgSlug1.ownerSlug === pkgSlug2.ownerSlug &&
        pkgSlug1.packageSlug === pkgSlug2.packageSlug);
}
function decodeFullSlug(fullSlug) {
    var _a = fullSlug.split(/[/@]/), ownerSlug = _a[0], packageSlug = _a[1], versionSlug = _a[2];
    return {
        ownerSlug: ownerSlug,
        packageSlug: packageSlug,
        versionSlug: versionSlug || VirtualTags.Latest,
    };
}
function encodeFQSN(fqsn) {
    var parts = __spreadArray(__spreadArray([], fqsn.packageSlugs.map(encodePackageSlug), true), [fqsn.secretName], false);
    return parts.join("/");
}
function decodeFQSN(fqsn) {
    var parts = fqsn.split("/");
    var secretName = parts.pop();
    var packageSlugs = [];
    // Process parts two at a time to decode package slugs
    for (var i = 0; i < parts.length; i += 2) {
        if (i + 1 >= parts.length) {
            throw new Error("Invalid FQSN format: package slug must have two parts");
        }
        packageSlugs.push({
            ownerSlug: parts[i],
            packageSlug: parts[i + 1],
        });
    }
    return { packageSlugs: packageSlugs, secretName: secretName };
}
