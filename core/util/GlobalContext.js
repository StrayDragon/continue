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
exports.GlobalContext = void 0;
var node_fs_1 = require("node:fs");
var sharedConfig_1 = require("../config/sharedConfig");
var paths_1 = require("./paths");
/**
 * A way to persist global state
 */
var GlobalContext = /** @class */ (function () {
    function GlobalContext() {
    }
    GlobalContext.prototype.update = function (key, value) {
        var _a, _b;
        var filepath = (0, paths_1.getGlobalContextFilePath)();
        if (!node_fs_1.default.existsSync(filepath)) {
            node_fs_1.default.writeFileSync(filepath, JSON.stringify((_a = {}, _a[key] = value, _a), null, 2));
        }
        else {
            var data = node_fs_1.default.readFileSync(filepath, "utf-8");
            var parsed = void 0;
            try {
                parsed = JSON.parse(data);
            }
            catch (e) {
                console.warn("Error updating global context, attempting to salvage security-sensitive values: ".concat(e));
                // Attempt to salvage security-sensitive values before deleting
                var salvaged = {};
                try {
                    // Try to partially parse the corrupted data to extract sharedConfig
                    var match = data.match(/"sharedConfig"\s*:\s*({[^}]*})/);
                    if (match) {
                        var sharedConfigObj = JSON.parse(match[1]);
                        var salvagedSharedConfig = (0, sharedConfig_1.salvageSharedConfig)(sharedConfigObj);
                        if (Object.keys(salvagedSharedConfig).length > 0) {
                            salvaged.sharedConfig = salvagedSharedConfig;
                        }
                    }
                }
                catch (_c) {
                    // If salvage fails, continue with empty salvaged object
                }
                // Delete the corrupted file and recreate it fresh
                try {
                    node_fs_1.default.unlinkSync(filepath);
                }
                catch (deleteError) {
                    console.warn("Error deleting corrupted global context file: ".concat(deleteError));
                }
                // Recreate the file with salvaged values plus the new value
                var newData = __assign(__assign({}, salvaged), (_b = {}, _b[key] = value, _b));
                node_fs_1.default.writeFileSync(filepath, JSON.stringify(newData, null, 2));
                return;
            }
            parsed[key] = value;
            node_fs_1.default.writeFileSync(filepath, JSON.stringify(parsed, null, 2));
        }
    };
    GlobalContext.prototype.get = function (key) {
        var filepath = (0, paths_1.getGlobalContextFilePath)();
        if (!node_fs_1.default.existsSync(filepath)) {
            return undefined;
        }
        var data = node_fs_1.default.readFileSync(filepath, "utf-8");
        try {
            var parsed = JSON.parse(data);
            return parsed[key];
        }
        catch (e) {
            console.warn("Error parsing global context, deleting corrupted file: ".concat(e));
            // Delete the corrupted file so it can be recreated fresh
            try {
                node_fs_1.default.unlinkSync(filepath);
            }
            catch (deleteError) {
                console.warn("Error deleting corrupted global context file: ".concat(deleteError));
            }
            return undefined;
        }
    };
    GlobalContext.prototype.getSharedConfig = function () {
        var _a;
        var sharedConfig = (_a = this.get("sharedConfig")) !== null && _a !== void 0 ? _a : {};
        var result = sharedConfig_1.sharedConfigSchema.safeParse(sharedConfig);
        if (result.success) {
            return result.data;
        }
        else {
            // in case of damaged shared config, repair it
            // Attempt to salvage any values that are security concerns
            console.error("Failed to load shared config, salvaging...", result.error);
            var salvagedConfig = (0, sharedConfig_1.salvageSharedConfig)(sharedConfig);
            this.update("sharedConfig", salvagedConfig);
            return salvagedConfig;
        }
    };
    GlobalContext.prototype.updateSharedConfig = function (newValues) {
        var currentSharedConfig = this.getSharedConfig();
        var updatedSharedConfig = __assign(__assign({}, currentSharedConfig), newValues);
        this.update("sharedConfig", updatedSharedConfig);
        return updatedSharedConfig;
    };
    GlobalContext.prototype.updateSelectedModel = function (profileId, role, title) {
        var _a, _b;
        var _c, _d;
        var currentSelections = (_c = this.get("selectedModelsByProfileId")) !== null && _c !== void 0 ? _c : {};
        var forProfile = (_d = currentSelections[profileId]) !== null && _d !== void 0 ? _d : {};
        var newSelections = __assign(__assign({}, forProfile), (_a = {}, _a[role] = title, _a));
        this.update("selectedModelsByProfileId", __assign(__assign({}, currentSelections), (_b = {}, _b[profileId] = newSelections, _b)));
        return newSelections;
    };
    return GlobalContext;
}());
exports.GlobalContext = GlobalContext;
