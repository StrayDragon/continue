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
exports.mergePackages = mergePackages;
exports.mergeUnrolledAssistants = mergeUnrolledAssistants;
exports.mergeConfigYamlRequestOptions = mergeConfigYamlRequestOptions;
function mergePackages(current, incoming) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    return __assign(__assign({}, current), { models: __spreadArray(__spreadArray([], ((_a = current.models) !== null && _a !== void 0 ? _a : []), true), ((_b = incoming.models) !== null && _b !== void 0 ? _b : []), true), context: __spreadArray(__spreadArray([], ((_c = current.context) !== null && _c !== void 0 ? _c : []), true), ((_d = incoming.context) !== null && _d !== void 0 ? _d : []), true), data: __spreadArray(__spreadArray([], ((_e = current.data) !== null && _e !== void 0 ? _e : []), true), ((_f = incoming.data) !== null && _f !== void 0 ? _f : []), true), mcpServers: __spreadArray(__spreadArray([], ((_g = current.mcpServers) !== null && _g !== void 0 ? _g : []), true), ((_h = incoming.mcpServers) !== null && _h !== void 0 ? _h : []), true), rules: __spreadArray(__spreadArray([], ((_j = current.rules) !== null && _j !== void 0 ? _j : []), true), ((_k = incoming.rules) !== null && _k !== void 0 ? _k : []), true), prompts: __spreadArray(__spreadArray([], ((_l = current.prompts) !== null && _l !== void 0 ? _l : []), true), ((_m = incoming.prompts) !== null && _m !== void 0 ? _m : []), true), docs: __spreadArray(__spreadArray([], ((_o = current.docs) !== null && _o !== void 0 ? _o : []), true), ((_p = incoming.docs) !== null && _p !== void 0 ? _p : []), true), env: __assign(__assign({}, current.env), incoming.env), requestOptions: mergeConfigYamlRequestOptions(current.requestOptions, incoming.requestOptions) });
}
function mergeUnrolledAssistants(current, incoming) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    return __assign(__assign({}, current), { rules: __spreadArray(__spreadArray([], ((_a = current.rules) !== null && _a !== void 0 ? _a : []), true), ((_b = incoming.rules) !== null && _b !== void 0 ? _b : []), true), models: __spreadArray(__spreadArray([], ((_c = current.models) !== null && _c !== void 0 ? _c : []), true), ((_d = incoming.models) !== null && _d !== void 0 ? _d : []), true), docs: __spreadArray(__spreadArray([], ((_e = current.docs) !== null && _e !== void 0 ? _e : []), true), ((_f = incoming.docs) !== null && _f !== void 0 ? _f : []), true), context: __spreadArray(__spreadArray([], ((_g = current.context) !== null && _g !== void 0 ? _g : []), true), ((_h = incoming.context) !== null && _h !== void 0 ? _h : []), true), data: __spreadArray(__spreadArray([], ((_j = current.data) !== null && _j !== void 0 ? _j : []), true), ((_k = incoming.data) !== null && _k !== void 0 ? _k : []), true), mcpServers: __spreadArray(__spreadArray([], ((_l = current.mcpServers) !== null && _l !== void 0 ? _l : []), true), ((_m = incoming.mcpServers) !== null && _m !== void 0 ? _m : []), true), prompts: __spreadArray(__spreadArray([], ((_o = current.prompts) !== null && _o !== void 0 ? _o : []), true), ((_p = incoming.prompts) !== null && _p !== void 0 ? _p : []), true), env: __assign(__assign({}, current.env), incoming.env), requestOptions: mergeConfigYamlRequestOptions(current.requestOptions, incoming.requestOptions) });
}
function mergeConfigYamlRequestOptions(base, global) {
    if (!base && !global) {
        return undefined;
    }
    if (!base) {
        return global;
    }
    if (!global) {
        return base;
    }
    var headers = __assign(__assign({}, global.headers), base.headers);
    return __assign(__assign(__assign({}, global), base), { headers: Object.keys(headers).length === 0 ? undefined : headers });
}
