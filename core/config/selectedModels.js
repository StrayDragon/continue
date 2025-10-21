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
Object.defineProperty(exports, "__esModule", { value: true });
exports.rectifySelectedModelsFromGlobalContext = rectifySelectedModelsFromGlobalContext;
var constants_1 = require("../llm/constants");
var GlobalContext_1 = require("../util/GlobalContext");
function rectifySelectedModelsFromGlobalContext(continueConfig, profileId) {
    var _a;
    var _b, _c, _d;
    var configCopy = __assign({}, continueConfig);
    var globalContext = new GlobalContext_1.GlobalContext();
    var currentSelectedModels = globalContext.get("selectedModelsByProfileId");
    var currentForProfile = (_b = currentSelectedModels === null || currentSelectedModels === void 0 ? void 0 : currentSelectedModels[profileId]) !== null && _b !== void 0 ? _b : {};
    var fellBack = false;
    // summarize not implemented yet
    var roles = [
        "autocomplete",
        "apply",
        "edit",
        "embed",
        "rerank",
        "chat",
    ];
    var _loop_1 = function (role) {
        var newModel = null;
        var currentSelection = (_c = currentForProfile[role]) !== null && _c !== void 0 ? _c : null;
        if (currentSelection) {
            var match = continueConfig.modelsByRole[role].find(function (m) { return m.title === currentSelection; });
            if (match) {
                newModel = match;
            }
        }
        if (!newModel && continueConfig.modelsByRole[role].length > 0) {
            newModel = continueConfig.modelsByRole[role][0];
        }
        if (!(currentSelection === ((_d = newModel === null || newModel === void 0 ? void 0 : newModel.title) !== null && _d !== void 0 ? _d : null))) {
            fellBack = true;
        }
        // Currently only check for configuration status for apply
        if (role === "apply" &&
            (newModel === null || newModel === void 0 ? void 0 : newModel.getConfigurationStatus()) !== constants_1.LLMConfigurationStatuses.VALID) {
            return "continue";
        }
        configCopy.selectedModelByRole[role] = newModel;
    };
    for (var _i = 0, roles_1 = roles; _i < roles_1.length; _i++) {
        var role = roles_1[_i];
        _loop_1(role);
    }
    // In the case shared config wasn't respected,
    // Rewrite the shared config
    if (fellBack) {
        globalContext.update("selectedModelsByProfileId", __assign(__assign({}, currentSelectedModels), (_a = {}, _a[profileId] = Object.fromEntries(Object.entries(configCopy.selectedModelByRole).map(function (_a) {
            var _b;
            var key = _a[0], value = _a[1];
            return [
                key,
                (_b = value === null || value === void 0 ? void 0 : value.title) !== null && _b !== void 0 ? _b : null,
            ];
        })), _a)));
    }
    return configCopy;
}
