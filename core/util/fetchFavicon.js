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
exports.findFaviconPath = findFaviconPath;
exports.getFaviconBase64 = getFaviconBase64;
exports.fetchFavicon = fetchFavicon;
var jsdom_1 = require("jsdom");
function findFaviconPath(url) {
    return __awaiter(this, void 0, void 0, function () {
        var baseUrl, response, html, dom, document_1, linkTags, _i, linkTags_1, link, href, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    baseUrl = "".concat(url.protocol, "//").concat(url.hostname);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(baseUrl)];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("HTTP error! status: ".concat(response.status));
                    }
                    return [4 /*yield*/, response.text()];
                case 3:
                    html = _a.sent();
                    dom = new jsdom_1.JSDOM(html);
                    document_1 = dom.window.document;
                    linkTags = document_1.querySelectorAll('link[rel*="icon"]');
                    for (_i = 0, linkTags_1 = linkTags; _i < linkTags_1.length; _i++) {
                        link = linkTags_1[_i];
                        href = link.getAttribute("href");
                        if (href) {
                            return [2 /*return*/, new URL(href, baseUrl).toString()];
                        }
                    }
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.debug("Failed to fetch favicon for ".concat(baseUrl, ": ").concat(error_1));
                    return [3 /*break*/, 5];
                case 5:
                    console.debug("Failed to find favicon for ".concat(baseUrl));
                    return [2 /*return*/, undefined];
            }
        });
    });
}
function getFaviconBase64(faviconUrl) {
    return __awaiter(this, void 0, void 0, function () {
        var response, arrayBuffer, base64, mimeType, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch(faviconUrl)];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("HTTP error! status: ".concat(response.status));
                    }
                    return [4 /*yield*/, response.arrayBuffer()];
                case 2:
                    arrayBuffer = _a.sent();
                    base64 = btoa(new Uint8Array(arrayBuffer).reduce(function (data, byte) { return data + String.fromCharCode(byte); }, ""));
                    mimeType = response.headers.get("content-type") || "image/x-icon";
                    return [2 /*return*/, "data:".concat(mimeType, ";base64,").concat(base64)];
                case 3:
                    error_2 = _a.sent();
                    console.debug("Failed to fetch favicon from ".concat(faviconUrl, ": ").concat(error_2));
                    return [2 /*return*/, undefined];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function fetchFavicon(url) {
    return __awaiter(this, void 0, void 0, function () {
        var faviconPath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, findFaviconPath(url)];
                case 1:
                    faviconPath = _a.sent();
                    if (faviconPath) {
                        return [2 /*return*/, getFaviconBase64(faviconPath)];
                    }
                    return [2 /*return*/, undefined];
            }
        });
    });
}
