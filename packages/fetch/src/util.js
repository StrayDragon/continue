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
exports.getProxyFromEnv = getProxyFromEnv;
exports.getProxy = getProxy;
exports.getEnvNoProxyPatterns = getEnvNoProxyPatterns;
exports.getReqOptionsNoProxyPatterns = getReqOptionsNoProxyPatterns;
exports.patternMatchesHostname = patternMatchesHostname;
exports.shouldBypassProxy = shouldBypassProxy;
/**
 * Gets the proxy settings from environment variables
 * @param protocol The URL protocol (http: or https:)
 * @returns The proxy URL if available, otherwise undefined
 */
function getProxyFromEnv(protocol) {
    if (protocol === "https:") {
        return (process.env.HTTPS_PROXY ||
            process.env.https_proxy ||
            process.env.HTTP_PROXY ||
            process.env.http_proxy);
    }
    else {
        return process.env.HTTP_PROXY || process.env.http_proxy;
    }
}
// Note that request options proxy (per model) takes precedence over environment variables
function getProxy(protocol, requestOptions) {
    if (requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.proxy) {
        return requestOptions.proxy;
    }
    return getProxyFromEnv(protocol);
}
function getEnvNoProxyPatterns() {
    var envValue = process.env.NO_PROXY || process.env.no_proxy;
    if (envValue) {
        return envValue
            .split(",")
            .map(function (item) { return item.trim().toLowerCase(); })
            .filter(function (i) { return !!i; });
    }
    else {
        return [];
    }
}
function getReqOptionsNoProxyPatterns(options) {
    var _a, _b;
    return ((_b = (_a = options === null || options === void 0 ? void 0 : options.noProxy) === null || _a === void 0 ? void 0 : _a.map(function (i) { return i.trim().toLowerCase(); }).filter(function (i) { return !!i; })) !== null && _b !== void 0 ? _b : []);
}
function patternMatchesHostname(hostname, pattern) {
    // Split hostname and pattern to separate hostname and port
    var _a = hostname.toLowerCase().split(":"), hostnameWithoutPort = _a[0], hostnamePort = _a[1];
    var _b = pattern.toLowerCase().split(":"), patternWithoutPort = _b[0], patternPort = _b[1];
    // If pattern specifies a port but hostname doesn't match it, no match
    if (patternPort && (!hostnamePort || hostnamePort !== patternPort)) {
        return false;
    }
    // Now compare just the hostname parts
    // exact match
    if (patternWithoutPort === hostnameWithoutPort) {
        return true;
    }
    // wildcard domain match (*.example.com)
    if (patternWithoutPort.startsWith("*.") &&
        hostnameWithoutPort.endsWith(patternWithoutPort.substring(1))) {
        return true;
    }
    // Domain suffix match (.example.com)
    if (patternWithoutPort.startsWith(".") &&
        hostnameWithoutPort.endsWith(patternWithoutPort.slice(1))) {
        return true;
    }
    // TODO IP address ranges
    // TODO CIDR notation
    return false;
}
/**
 * Checks if a hostname should bypass proxy based on NO_PROXY environment variable
 * @param hostname The hostname to check
 * @returns True if the hostname should bypass proxy
 */
function shouldBypassProxy(hostname, requestOptions) {
    var ignores = __spreadArray(__spreadArray([], getEnvNoProxyPatterns(), true), getReqOptionsNoProxyPatterns(requestOptions), true);
    var hostLowerCase = hostname.toLowerCase();
    return ignores.some(function (ignore) {
        return patternMatchesHostname(hostLowerCase, ignore);
    });
}
