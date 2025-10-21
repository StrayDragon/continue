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
var env_js_1 = require("../../control-plane/env.js");
var doLoadConfig_js_1 = require("./doLoadConfig.js");
var PlatformProfileLoader = /** @class */ (function () {
    function PlatformProfileLoader(_a) {
        var configResult = _a.configResult, ownerSlug = _a.ownerSlug, packageSlug = _a.packageSlug, iconUrl = _a.iconUrl, versionSlug = _a.versionSlug, controlPlaneClient = _a.controlPlaneClient, ide = _a.ide, llmLogger = _a.llmLogger, description = _a.description, orgScopeId = _a.orgScopeId;
        this.configResult = configResult;
        this.ownerSlug = ownerSlug;
        this.packageSlug = packageSlug;
        this.iconUrl = iconUrl;
        this.versionSlug = versionSlug;
        this.controlPlaneClient = controlPlaneClient;
        this.ide = ide;
        this.llmLogger = llmLogger;
        this.description = description;
        this.orgScopeId = orgScopeId;
    }
    PlatformProfileLoader.create = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var controlPlaneEnv, description;
            var _c, _d;
            var configResult = _b.configResult, ownerSlug = _b.ownerSlug, packageSlug = _b.packageSlug, iconUrl = _b.iconUrl, versionSlug = _b.versionSlug, controlPlaneClient = _b.controlPlaneClient, ide = _b.ide, llmLogger = _b.llmLogger, rawYaml = _b.rawYaml, orgScopeId = _b.orgScopeId;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, (0, env_js_1.getControlPlaneEnv)(ide.getIdeSettings())];
                    case 1:
                        controlPlaneEnv = _e.sent();
                        description = {
                            id: "".concat(ownerSlug, "/").concat(packageSlug),
                            profileType: "platform",
                            fullSlug: {
                                ownerSlug: ownerSlug,
                                packageSlug: packageSlug,
                                versionSlug: versionSlug,
                            },
                            title: (_d = (_c = configResult.config) === null || _c === void 0 ? void 0 : _c.name) !== null && _d !== void 0 ? _d : "".concat(ownerSlug, "/").concat(packageSlug),
                            errors: configResult.errors,
                            iconUrl: iconUrl,
                            uri: "".concat(controlPlaneEnv.APP_URL).concat(ownerSlug, "/").concat(packageSlug),
                            rawYaml: rawYaml,
                        };
                        return [2 /*return*/, new PlatformProfileLoader({
                                configResult: configResult,
                                ownerSlug: ownerSlug,
                                packageSlug: packageSlug,
                                iconUrl: iconUrl,
                                versionSlug: versionSlug,
                                controlPlaneClient: controlPlaneClient,
                                ide: ide,
                                llmLogger: llmLogger,
                                description: description,
                                orgScopeId: orgScopeId,
                            })];
                }
            });
        });
    };
    PlatformProfileLoader.prototype.doLoadConfig = function () {
        return __awaiter(this, void 0, void 0, function () {
            var results;
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if ((_a = this.configResult.errors) === null || _a === void 0 ? void 0 : _a.find(function (e) { return e.fatal; })) {
                            return [2 /*return*/, {
                                    config: undefined,
                                    errors: this.configResult.errors,
                                    configLoadInterrupted: false,
                                }];
                        }
                        return [4 /*yield*/, (0, doLoadConfig_js_1.default)({
                                ide: this.ide,
                                controlPlaneClient: this.controlPlaneClient,
                                llmLogger: this.llmLogger,
                                overrideConfigYaml: this.configResult.config,
                                profileId: this.description.id,
                                orgScopeId: this.orgScopeId,
                                packageIdentifier: {
                                    uriType: "slug",
                                    fullSlug: {
                                        ownerSlug: this.ownerSlug,
                                        packageSlug: this.packageSlug,
                                        versionSlug: this.versionSlug,
                                    },
                                },
                            })];
                    case 1:
                        results = _d.sent();
                        return [2 /*return*/, {
                                config: results.config,
                                errors: __spreadArray(__spreadArray([], ((_b = this.configResult.errors) !== null && _b !== void 0 ? _b : []), true), ((_c = results.errors) !== null && _c !== void 0 ? _c : []), true),
                                configLoadInterrupted: results.configLoadInterrupted,
                            }];
                }
            });
        });
    };
    PlatformProfileLoader.prototype.setIsActive = function (isActive) { };
    PlatformProfileLoader.RELOAD_INTERVAL = 1000 * 5; // 5 seconds
    return PlatformProfileLoader;
}());
exports.default = PlatformProfileLoader;
