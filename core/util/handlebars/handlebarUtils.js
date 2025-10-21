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
exports.registerHelpers = registerHelpers;
exports.prepareTemplatedFilepaths = prepareTemplatedFilepaths;
exports.resolveHelperPromises = resolveHelperPromises;
var uuid_1 = require("uuid");
function convertToLetter(num) {
    var result = "";
    while (num > 0) {
        var remainder = (num - 1) % 26;
        result = String.fromCharCode(97 + remainder) + result;
        num = Math.floor((num - 1) / 26);
    }
    return result;
}
function registerHelpers(handlebars, helpers) {
    var promises = {};
    var _loop_1 = function (name_1, helper) {
        handlebars.registerHelper(name_1, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var id = (0, uuid_1.v4)();
            promises[id] = helper.apply(void 0, args);
            return "__".concat(id, "__");
        });
    };
    for (var _i = 0, helpers_1 = helpers; _i < helpers_1.length; _i++) {
        var _a = helpers_1[_i], name_1 = _a[0], helper = _a[1];
        _loop_1(name_1, helper);
    }
    return promises;
}
function prepareTemplatedFilepaths(handlebars, template, inputData, ctxProviderNames, readFile, getUriFromPath) {
    return __awaiter(this, void 0, void 0, function () {
        var ast, filepathLetters, requiredContextProviders, withLetterKeys, letterIndex, i, node, originalNodeVal, isFilepath, letter, templateData, _i, _a, _b, letter, filepath, uri, fileContents, e_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    ast = handlebars.parse(template);
                    filepathLetters = new Map();
                    requiredContextProviders = new Set();
                    withLetterKeys = template;
                    letterIndex = 1;
                    for (i in ast.body) {
                        node = ast.body[i];
                        if (node.type === "MustacheStatement") {
                            originalNodeVal = node.path.original;
                            if (originalNodeVal.toLowerCase() === "input") {
                                continue;
                            }
                            isFilepath = !ctxProviderNames.includes(originalNodeVal);
                            if (isFilepath) {
                                letter = convertToLetter(letterIndex);
                                filepathLetters.set(letter, originalNodeVal);
                                withLetterKeys = withLetterKeys.replace(new RegExp("{{\\s*".concat(originalNodeVal, "\\s*}}")), "{{".concat(letter, "}}"));
                                letterIndex++;
                            }
                            else {
                                requiredContextProviders.add(originalNodeVal);
                            }
                        }
                    }
                    templateData = __assign({}, inputData);
                    _i = 0, _a = filepathLetters.entries();
                    _c.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 9];
                    _b = _a[_i], letter = _b[0], filepath = _b[1];
                    _c.label = 2;
                case 2:
                    _c.trys.push([2, 7, , 8]);
                    return [4 /*yield*/, getUriFromPath(filepath)];
                case 3:
                    uri = _c.sent();
                    if (!uri) return [3 /*break*/, 5];
                    return [4 /*yield*/, readFile(uri)];
                case 4:
                    fileContents = _c.sent();
                    templateData[letter] = fileContents;
                    return [3 /*break*/, 6];
                case 5: throw new Error("File not found: ".concat(filepath));
                case 6: return [3 /*break*/, 8];
                case 7:
                    e_1 = _c.sent();
                    console.error("Error reading file in prompt file ".concat(filepath, ":"), e_1);
                    templateData[letter] = "[Error reading file \"".concat(filepath, "\"]");
                    return [3 /*break*/, 8];
                case 8:
                    _i++;
                    return [3 /*break*/, 1];
                case 9: return [2 /*return*/, { withLetterKeys: withLetterKeys, templateData: templateData, requiredContextProviders: requiredContextProviders }];
            }
        });
    });
}
function resolveHelperPromises(renderedString, promises) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c, _i, id, _d, _e, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0: return [4 /*yield*/, Promise.all(Object.values(promises))];
                case 1:
                    _g.sent();
                    _a = promises;
                    _b = [];
                    for (_c in _a)
                        _b.push(_c);
                    _i = 0;
                    _g.label = 2;
                case 2:
                    if (!(_i < _b.length)) return [3 /*break*/, 5];
                    _c = _b[_i];
                    if (!(_c in _a)) return [3 /*break*/, 4];
                    id = _c;
                    _e = (_d = renderedString).replace;
                    _f = ["__".concat(id, "__")];
                    return [4 /*yield*/, promises[id]];
                case 3:
                    renderedString = _e.apply(_d, _f.concat([_g.sent()]));
                    _g.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/, renderedString];
            }
        });
    });
}
