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
exports.mergeJson = mergeJson;
function mergeJson(first, second, mergeBehavior, mergeKeys) {
    var copyOfFirst = JSON.parse(JSON.stringify(first));
    try {
        var _loop_1 = function (key) {
            var secondValue = second[key];
            if (!(key in copyOfFirst) || mergeBehavior === "overwrite") {
                // New value
                copyOfFirst[key] = secondValue;
                return "continue";
            }
            var firstValue = copyOfFirst[key];
            if (Array.isArray(secondValue) && Array.isArray(firstValue)) {
                // Array
                if (mergeKeys === null || mergeKeys === void 0 ? void 0 : mergeKeys[key]) {
                    // Merge keys are used to determine whether an item form the second object should override one from the first
                    var keptFromFirst_1 = [];
                    firstValue.forEach(function (item) {
                        if (!secondValue.some(function (item2) { return mergeKeys[key](item, item2); })) {
                            keptFromFirst_1.push(item);
                        }
                    });
                    copyOfFirst[key] = __spreadArray(__spreadArray([], keptFromFirst_1, true), secondValue, true);
                }
                else {
                    copyOfFirst[key] = __spreadArray(__spreadArray([], firstValue, true), secondValue, true);
                }
            }
            else if (typeof secondValue === "object" &&
                typeof firstValue === "object") {
                // Object
                copyOfFirst[key] = mergeJson(firstValue, secondValue, mergeBehavior);
            }
            else {
                // Other (boolean, number, string)
                copyOfFirst[key] = secondValue;
            }
        };
        for (var key in second) {
            _loop_1(key);
        }
        return copyOfFirst;
    }
    catch (e) {
        console.error("Error merging JSON", e, copyOfFirst, second);
        return __assign(__assign({}, copyOfFirst), second);
    }
}
exports.default = mergeJson;
