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
exports.fetchwithRequestOptions = fetchwithRequestOptions;
var followRedirects = require("follow-redirects");
var http_proxy_agent_1 = require("http-proxy-agent");
var https_proxy_agent_1 = require("https-proxy-agent");
var node_fetch_1 = require("node-fetch");
var getAgentOptions_js_1 = require("./getAgentOptions.js");
var node_fetch_patch_js_1 = require("./node-fetch-patch.js");
var util_js_1 = require("./util.js");
var _a = followRedirects.default, http = _a.http, https = _a.https;
function logRequest(method, url, headers, body, proxy, shouldBypass) {
    console.log("=== FETCH REQUEST ===");
    console.log("Method: ".concat(method));
    console.log("URL: ".concat(url.toString()));
    // Log headers in curl format
    console.log("Headers:");
    for (var _i = 0, _a = Object.entries(headers); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        console.log("  -H '".concat(key, ": ").concat(value, "'"));
    }
    // Log proxy information
    if (proxy && !shouldBypass) {
        console.log("Proxy: ".concat(proxy));
    }
    // Log body
    if (body) {
        console.log("Body: ".concat(body));
    }
    // Generate equivalent curl command
    var curlCommand = "curl -X ".concat(method);
    for (var _c = 0, _d = Object.entries(headers); _c < _d.length; _c++) {
        var _e = _d[_c], key = _e[0], value = _e[1];
        curlCommand += " -H '".concat(key, ": ").concat(value, "'");
    }
    if (body) {
        curlCommand += " -d '".concat(body, "'");
    }
    if (proxy && !shouldBypass) {
        curlCommand += " --proxy '".concat(proxy, "'");
    }
    curlCommand += " '".concat(url.toString(), "'");
    console.log("Equivalent curl: ".concat(curlCommand));
    console.log("=====================");
}
function logResponse(resp) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log("=== FETCH RESPONSE ===");
            console.log("Status: ".concat(resp.status, " ").concat(resp.statusText));
            console.log("Response Headers:");
            resp.headers.forEach(function (value, key) {
                console.log("  ".concat(key, ": ").concat(value));
            });
            // TODO: For streamed responses, this caused the response to be consumed and the connection would just hang open
            // Clone response to read body without consuming it
            // const respClone = resp.clone();
            // try {
            //   const responseText = await respClone.text();
            //   console.log(`Response Body: ${responseText}`);
            // } catch (e) {
            //   console.log("Could not read response body:", e);
            // }
            console.log("======================");
            return [2 /*return*/];
        });
    });
}
function logError(error) {
    console.log("=== FETCH ERROR ===");
    console.log("Error: ".concat(error));
    console.log("===================");
}
function fetchwithRequestOptions(url_, init, requestOptions) {
    return __awaiter(this, void 0, void 0, function () {
        var url, agentOptions, proxy, shouldBypass, protocol, agent, headers, headersSource, _i, headersSource_1, _a, key, value, _b, _c, _d, key, value, updatedBody, parsedBody, finalBody, method, resp, requestId, error_1;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    url = typeof url_ === "string" ? new URL(url_) : url_;
                    if (url.host === "localhost") {
                        url.host = "127.0.0.1";
                    }
                    return [4 /*yield*/, (0, getAgentOptions_js_1.getAgentOptions)(requestOptions)];
                case 1:
                    agentOptions = _e.sent();
                    proxy = (0, util_js_1.getProxy)(url.protocol, requestOptions);
                    shouldBypass = (0, util_js_1.shouldBypassProxy)(url.hostname, requestOptions);
                    protocol = url.protocol === "https:" ? https : http;
                    agent = proxy && !shouldBypass
                        ? protocol === https
                            ? new https_proxy_agent_1.HttpsProxyAgent(proxy, agentOptions)
                            : new http_proxy_agent_1.HttpProxyAgent(proxy, agentOptions)
                        : new protocol.Agent(agentOptions);
                    headers = {};
                    // Handle different header formats
                    if (init === null || init === void 0 ? void 0 : init.headers) {
                        headersSource = init.headers;
                        // Check if it's a Headers-like object (OpenAI v5 HeadersList, standard Headers)
                        if (headersSource && typeof headersSource.forEach === "function") {
                            // Use forEach method which works reliably on Headers objects
                            headersSource.forEach(function (value, key) {
                                headers[key] = value;
                            });
                        }
                        else if (Array.isArray(headersSource)) {
                            // This is an array of [key, value] tuples
                            for (_i = 0, headersSource_1 = headersSource; _i < headersSource_1.length; _i++) {
                                _a = headersSource_1[_i], key = _a[0], value = _a[1];
                                headers[key] = value;
                            }
                        }
                        else if (headersSource && typeof headersSource === "object") {
                            // This is a plain object
                            for (_b = 0, _c = Object.entries(headersSource); _b < _c.length; _b++) {
                                _d = _c[_b], key = _d[0], value = _d[1];
                                headers[key] = value;
                            }
                        }
                    }
                    headers = __assign(__assign({}, headers), requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.headers);
                    // Replace localhost with 127.0.0.1
                    if (url.hostname === "localhost") {
                        url.hostname = "127.0.0.1";
                    }
                    updatedBody = undefined;
                    try {
                        if ((requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.extraBodyProperties) && typeof (init === null || init === void 0 ? void 0 : init.body) === "string") {
                            parsedBody = JSON.parse(init.body);
                            updatedBody = JSON.stringify(__assign(__assign({}, parsedBody), requestOptions.extraBodyProperties));
                        }
                    }
                    catch (e) {
                        console.log("Unable to parse HTTP request body: ", e);
                    }
                    finalBody = updatedBody !== null && updatedBody !== void 0 ? updatedBody : init === null || init === void 0 ? void 0 : init.body;
                    method = (init === null || init === void 0 ? void 0 : init.method) || "GET";
                    // Verbose logging for debugging - log request details
                    if (process.env.VERBOSE_FETCH) {
                        logRequest(method, url, headers, finalBody, proxy, shouldBypass);
                    }
                    _e.label = 2;
                case 2:
                    _e.trys.push([2, 6, , 7]);
                    return [4 /*yield*/, (0, node_fetch_patch_js_1.default)(url, __assign(__assign({}, init), { body: finalBody, headers: headers, agent: agent }))];
                case 3:
                    resp = _e.sent();
                    if (!process.env.VERBOSE_FETCH) return [3 /*break*/, 5];
                    return [4 /*yield*/, logResponse(resp)];
                case 4:
                    _e.sent();
                    _e.label = 5;
                case 5:
                    if (!resp.ok) {
                        requestId = resp.headers.get("x-request-id");
                        if (requestId) {
                            console.log("Request ID: ".concat(requestId, ", Status: ").concat(resp.status));
                        }
                    }
                    return [2 /*return*/, resp];
                case 6:
                    error_1 = _e.sent();
                    // Verbose logging for errors
                    if (process.env.VERBOSE_FETCH) {
                        logError(error_1);
                    }
                    if (error_1 instanceof Error && error_1.name === "AbortError") {
                        // Return a Response object that streamResponse etc can handle
                        return [2 /*return*/, new node_fetch_1.Response(null, {
                                status: 499, // Client Closed Request
                                statusText: "Client Closed Request",
                            })];
                    }
                    throw error_1;
                case 7: return [2 /*return*/];
            }
        });
    });
}
