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
exports.ContinueHubClient = void 0;
var ContinueHubClient = /** @class */ (function () {
    function ContinueHubClient(options) {
        var _a;
        this.apiKey = options.apiKey;
        this.apiBase = (_a = options.apiBase) !== null && _a !== void 0 ? _a : "https://api.continue.dev";
        this.fetchOptions = options.fetchOptions;
    }
    ContinueHubClient.prototype.request = function (path, init) {
        return __awaiter(this, void 0, void 0, function () {
            var url, finalInit, resp, _a, _b, _c;
            var _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        url = new URL(path, this.apiBase).toString();
                        finalInit = __assign(__assign(__assign({}, this.fetchOptions), init), { headers: __assign(__assign({}, (_d = this.fetchOptions) === null || _d === void 0 ? void 0 : _d.headers), init.headers) });
                        if (this.apiKey) {
                            finalInit.headers = __assign(__assign({}, finalInit.headers), { Authorization: "Bearer ".concat(this.apiKey) });
                        }
                        return [4 /*yield*/, fetch(url, finalInit)];
                    case 1:
                        resp = _e.sent();
                        if (!!resp.ok) return [3 /*break*/, 3];
                        _a = Error.bind;
                        _c = (_b = "Control plane request failed: ".concat(resp.status, " ")).concat;
                        return [4 /*yield*/, resp.text()];
                    case 2: throw new (_a.apply(Error, [void 0, _c.apply(_b, [_e.sent()])]))();
                    case 3: return [2 /*return*/, resp];
                }
            });
        });
    };
    ContinueHubClient.prototype.resolveFQSNs = function (fqsns, orgScopeId) {
        return __awaiter(this, void 0, void 0, function () {
            var resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request("ide/sync-secrets", {
                            method: "POST",
                            body: JSON.stringify({ fqsns: fqsns, orgScopeId: orgScopeId }),
                        })];
                    case 1:
                        resp = _a.sent();
                        return [4 /*yield*/, resp.json()];
                    case 2: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    ContinueHubClient.prototype.listAssistants = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var organizationId, alwaysUseProxy, urlObj, url, resp, e_1;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        organizationId = options.organizationId;
                        alwaysUseProxy = (_a = options.alwaysUseProxy) !== null && _a !== void 0 ? _a : false;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        urlObj = new URL("ide/list-assistants", this.apiBase);
                        if (organizationId) {
                            urlObj.searchParams.set("organizationId", organizationId);
                        }
                        if (alwaysUseProxy) {
                            urlObj.searchParams.set("alwaysUseProxy", alwaysUseProxy.toString());
                        }
                        url = urlObj.toString();
                        return [4 /*yield*/, this.request(url, {
                                method: "GET",
                            })];
                    case 2:
                        resp = _b.sent();
                        return [4 /*yield*/, resp.json()];
                    case 3: return [2 /*return*/, (_b.sent())];
                    case 4:
                        e_1 = _b.sent();
                        return [2 /*return*/, []];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ContinueHubClient.prototype.listAssistantFullSlugs = function (organizationId) {
        return __awaiter(this, void 0, void 0, function () {
            var url, resp, fullSlugs, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = organizationId
                            ? "ide/list-assistant-full-slugs?organizationId=".concat(organizationId)
                            : "ide/list-assistant-full-slugs";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.request(url, {
                                method: "GET",
                            })];
                    case 2:
                        resp = _a.sent();
                        return [4 /*yield*/, resp.json()];
                    case 3:
                        fullSlugs = (_a.sent()).fullSlugs;
                        return [2 /*return*/, fullSlugs];
                    case 4:
                        e_2 = _a.sent();
                        return [2 /*return*/, null];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return ContinueHubClient;
}());
exports.ContinueHubClient = ContinueHubClient;
