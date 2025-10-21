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
exports.constructInitialPrefixSuffix = constructInitialPrefixSuffix;
var ranges_1 = require("../../util/ranges");
var AutocompleteLanguageInfo_1 = require("../constants/AutocompleteLanguageInfo");
/**
 * We have to handle a few edge cases in getting the entire prefix/suffix for the current file.
 * This is entirely prior to finding snippets from other files
 */
function constructInitialPrefixSuffix(input, ide) {
    return __awaiter(this, void 0, void 0, function () {
        var lang, fileContents, _a, fileLines, prefix, lines, suffix;
        var _b, _c, _d, _e, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    lang = (0, AutocompleteLanguageInfo_1.languageForFilepath)(input.filepath);
                    if (!((_b = input.manuallyPassFileContents) !== null && _b !== void 0)) return [3 /*break*/, 1];
                    _a = _b;
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, ide.readFile(input.filepath)];
                case 2:
                    _a = (_g.sent());
                    _g.label = 3;
                case 3:
                    fileContents = _a;
                    fileLines = fileContents.split("\n");
                    prefix = (0, ranges_1.getRangeInString)(fileContents, {
                        start: { line: 0, character: 0 },
                        end: (_d = (_c = input.selectedCompletionInfo) === null || _c === void 0 ? void 0 : _c.range.start) !== null && _d !== void 0 ? _d : input.pos,
                    }) + ((_f = (_e = input.selectedCompletionInfo) === null || _e === void 0 ? void 0 : _e.text) !== null && _f !== void 0 ? _f : "");
                    if (input.injectDetails) {
                        lines = prefix.split("\n");
                        prefix = "".concat(lines.slice(0, -1).join("\n"), "\n").concat(lang.singleLineComment, " ").concat(input.injectDetails
                            .split("\n")
                            .join("\n".concat(lang.singleLineComment, " ")), "\n").concat(lines[lines.length - 1]);
                    }
                    suffix = (0, ranges_1.getRangeInString)(fileContents, {
                        start: input.pos,
                        end: { line: fileLines.length - 1, character: Number.MAX_SAFE_INTEGER },
                    });
                    return [2 /*return*/, { prefix: prefix, suffix: suffix }];
            }
        });
    });
}
