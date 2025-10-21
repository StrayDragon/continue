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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startProxy = startProxy;
var cors_1 = require("cors");
var express_1 = require("express");
var follow_redirects_1 = require("follow-redirects");
var PROXY_PORT = 65433;
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(function (req, res, next) {
    // Proxy the request
    var _a = req.headers, origin = _a.origin, host = _a.host, headers = __rest(_a, ["origin", "host"]);
    var url = req.headers["x-continue-url"];
    var parsedUrl = new URL(url);
    var protocolString = url.split("://")[0];
    var protocol = protocolString === "https" ? follow_redirects_1.https : follow_redirects_1.http;
    var proxy = protocol.request(url, {
        method: req.method,
        headers: __assign(__assign({}, headers), { host: parsedUrl.host }),
    });
    proxy.on("response", function (response) {
        res.status(response.statusCode || 500);
        for (var i = 1; i < response.rawHeaders.length; i += 2) {
            if (response.rawHeaders[i - 1].toLowerCase() ===
                "access-control-allow-origin") {
                continue;
            }
            res.setHeader(response.rawHeaders[i - 1], response.rawHeaders[i]);
        }
        response.pipe(res);
    });
    proxy.on("error", function (error) {
        console.error(error);
        res.sendStatus(500);
    });
    req.pipe(proxy);
});
// http-middleware-proxy
// app.use("/", (req, res, next) => {
//   // Extract the target from the request URL
//   const target = req.headers["x-continue-url"] as string;
//   const { origin, ...headers } = req.headers;
//   // Create a new proxy middleware for this request
//   const proxy = createProxyMiddleware({
//     target,
//     ws: true,
//     headers: {
//       origin: "",
//     },
//   });
//   // Call the middleware
//   proxy(req, res, next);
// });
function startProxy() {
    var server = app.listen(PROXY_PORT, function () {
        console.log("Proxy server is running on port ".concat(PROXY_PORT));
    });
    server.on("error", function (e) {
        // console.log("Proxy server already running on port 65433");
    });
}
