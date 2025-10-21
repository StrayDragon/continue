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
var config_yaml_1 = require("@continuedev/config-yaml");
var paths_js_1 = require("../../util/paths.js");
var pathToUri_js_1 = require("../../util/pathToUri.js");
var uri_js_1 = require("../../util/uri.js");
var doLoadConfig_js_1 = require("./doLoadConfig.js");
var LocalProfileLoader = /** @class */ (function () {
    function LocalProfileLoader(ide, controlPlaneClient, llmLogger, overrideAssistantFile) {
        var _a, _b, _c;
        this.ide = ide;
        this.controlPlaneClient = controlPlaneClient;
        this.llmLogger = llmLogger;
        this.overrideAssistantFile = overrideAssistantFile;
        var description = {
            id: (_a = overrideAssistantFile === null || overrideAssistantFile === void 0 ? void 0 : overrideAssistantFile.path) !== null && _a !== void 0 ? _a : LocalProfileLoader.ID,
            profileType: "local",
            fullSlug: {
                ownerSlug: "",
                packageSlug: "",
                versionSlug: "",
            },
            iconUrl: "",
            title: (overrideAssistantFile === null || overrideAssistantFile === void 0 ? void 0 : overrideAssistantFile.path)
                ? (0, uri_js_1.getUriPathBasename)(overrideAssistantFile.path)
                : "Local Agent",
            errors: undefined,
            uri: (_b = overrideAssistantFile === null || overrideAssistantFile === void 0 ? void 0 : overrideAssistantFile.path) !== null && _b !== void 0 ? _b : (0, pathToUri_js_1.localPathToUri)((0, paths_js_1.getPrimaryConfigFilePath)()),
            rawYaml: undefined,
        };
        this.description = description;
        if (overrideAssistantFile === null || overrideAssistantFile === void 0 ? void 0 : overrideAssistantFile.content) {
            try {
                var parsedAssistant = (0, config_yaml_1.parseConfigYaml)((_c = overrideAssistantFile === null || overrideAssistantFile === void 0 ? void 0 : overrideAssistantFile.content) !== null && _c !== void 0 ? _c : "");
                this.description.title = parsedAssistant.name;
            }
            catch (e) {
                console.error("Failed to parse agent file: ", e);
            }
        }
    }
    LocalProfileLoader.prototype.doLoadConfig = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, (0, doLoadConfig_js_1.default)({
                            ide: this.ide,
                            controlPlaneClient: this.controlPlaneClient,
                            llmLogger: this.llmLogger,
                            profileId: this.description.id,
                            overrideConfigYamlByPath: (_a = this.overrideAssistantFile) === null || _a === void 0 ? void 0 : _a.path,
                            orgScopeId: null,
                            packageIdentifier: {
                                uriType: "file",
                                fileUri: (_c = (_b = this.overrideAssistantFile) === null || _b === void 0 ? void 0 : _b.path) !== null && _c !== void 0 ? _c : (0, paths_js_1.getPrimaryConfigFilePath)(),
                            },
                        })];
                    case 1:
                        result = _d.sent();
                        this.description.errors = result.errors;
                        return [2 /*return*/, result];
                }
            });
        });
    };
    LocalProfileLoader.prototype.setIsActive = function (isActive) { };
    LocalProfileLoader.ID = "local";
    return LocalProfileLoader;
}());
exports.default = LocalProfileLoader;
