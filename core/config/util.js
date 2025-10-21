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
exports.addModel = addModel;
exports.deleteModel = deleteModel;
exports.getModelByRole = getModelByRole;
exports.isSupportedLanceDbCpuTargetForLinux = isSupportedLanceDbCpuTargetForLinux;
exports.serializePromptTemplates = serializePromptTemplates;
var fs_1 = require("fs");
var os_1 = require("os");
var GlobalContext_1 = require("../util/GlobalContext");
var paths_1 = require("../util/paths");
function stringify(obj, indentation) {
    return JSON.stringify(obj, function (key, value) {
        return value === null ? undefined : value;
    }, indentation);
}
function addModel(model, role) {
    (0, paths_1.editConfigFile)(function (config) {
        var _a, _b;
        if ((_a = config.models) === null || _a === void 0 ? void 0 : _a.some(function (m) { return stringify(m) === stringify(model); })) {
            return config;
        }
        var numMatches = (_b = config.models) === null || _b === void 0 ? void 0 : _b.reduce(function (prev, curr) { return (curr.title.startsWith(model.title) ? prev + 1 : prev); }, 0);
        if (numMatches !== undefined && numMatches > 0) {
            model.title = "".concat(model.title, " (").concat(numMatches, ")");
        }
        config.models.push(model);
        // Set the role for the model
        if (role) {
            if (!config.experimental) {
                config.experimental = {};
            }
            if (!config.experimental.modelRoles) {
                config.experimental.modelRoles = {};
            }
            config.experimental.modelRoles[role] = model.title;
        }
        return config;
    }, function (config) {
        var _a;
        var numMatches = (_a = config.models) === null || _a === void 0 ? void 0 : _a.reduce(function (prev, curr) {
            return "name" in curr && curr.name.startsWith(model.title) ? prev + 1 : prev;
        }, 0);
        if (numMatches !== undefined && numMatches > 0) {
            model.title = "".concat(model.title, " (").concat(numMatches, ")");
        }
        if (!config.models) {
            config.models = [];
        }
        var desc = {
            name: model.title,
            provider: model.provider,
            model: model.model,
            apiKey: model.apiKey,
            apiBase: model.apiBase,
            maxStopWords: model.maxStopWords,
            defaultCompletionOptions: model.completionOptions,
        };
        config.models.push(desc);
        return config;
    });
}
function deleteModel(title) {
    (0, paths_1.editConfigFile)(function (config) {
        config.models = config.models.filter(function (m) { return m.title !== title; });
        return config;
    }, function (config) {
        var _a;
        config.models = (_a = config.models) === null || _a === void 0 ? void 0 : _a.filter(function (m) { return m.name !== title; });
        return config;
    });
}
function getModelByRole(config, role) {
    var _a, _b;
    var roleTitle = (_b = (_a = config.experimental) === null || _a === void 0 ? void 0 : _a.modelRoles) === null || _b === void 0 ? void 0 : _b[role];
    if (!roleTitle) {
        return undefined;
    }
    var matchingModel = config.modelsByRole.chat.find(function (model) { return model.title === roleTitle; });
    return matchingModel;
}
/**
 * This check is to determine if the user is on an unsupported CPU
 * target for our Lance DB binaries.
 *
 * See here for details: https://github.com/continuedev/continue/issues/940
 */
function isSupportedLanceDbCpuTargetForLinux(ide) {
    var CPU_FEATURES_TO_CHECK = ["avx2", "fma"];
    var globalContext = new GlobalContext_1.GlobalContext();
    var globalContextVal = globalContext.get("isSupportedLanceDbCpuTargetForLinux");
    // If we've already checked the CPU target, return the cached value
    if (globalContextVal !== undefined) {
        return globalContextVal;
    }
    var arch = os_1.default.arch();
    // This check only applies to x64
    //https://github.com/lancedb/lance/issues/2195#issuecomment-2057841311
    if (arch !== "x64") {
        globalContext.update("isSupportedLanceDbCpuTargetForLinux", true);
        return true;
    }
    try {
        var cpuFlags_1 = fs_1.default.readFileSync("/proc/cpuinfo", "utf-8").toLowerCase();
        var isSupportedLanceDbCpuTargetForLinux_1 = cpuFlags_1
            ? CPU_FEATURES_TO_CHECK.every(function (feature) { return cpuFlags_1.includes(feature); })
            : true;
        // If it's not a supported CPU target, and it's the first time we are checking,
        // show a toast to inform the user that we are going to disable indexing.
        if (!isSupportedLanceDbCpuTargetForLinux_1 && ide) {
            // We offload our async toast to `showUnsupportedCpuToast` to prevent making
            // our config loading async upstream of `isSupportedLanceDbCpuTargetForLinux`
            void showUnsupportedCpuToast(ide);
        }
        globalContext.update("isSupportedLanceDbCpuTargetForLinux", isSupportedLanceDbCpuTargetForLinux_1);
        return isSupportedLanceDbCpuTargetForLinux_1;
    }
    catch (error) {
        // If we can't determine CPU features, default to true
        return true;
    }
}
function showUnsupportedCpuToast(ide) {
    return __awaiter(this, void 0, void 0, function () {
        var shouldOpenLink;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ide.showToast("warning", "Codebase indexing disabled - Your Linux system lacks required CPU features (AVX2, FMA)", "Learn more")];
                case 1:
                    shouldOpenLink = _a.sent();
                    if (shouldOpenLink) {
                        void ide.openUrl("https://docs.continue.dev/troubleshooting#i-received-a-codebase-indexing-disabled---your-linux-system-lacks-required-cpu-features-avx2-fma-notification");
                    }
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * This is required because users are only able to define prompt templates as a
 * string, while internally we also allow prompt templates to be functions
 * @param templates
 * @returns
 */
function serializePromptTemplates(templates) {
    if (!templates)
        return undefined;
    return Object.fromEntries(Object.entries(templates).map(function (_a) {
        var key = _a[0], template = _a[1];
        var serialized = typeof template === "function" ? "" : template;
        return [key, serialized];
    }));
}
