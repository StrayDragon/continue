"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
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
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function () { return this; }, i;
    function awaitReturn(f) { return function (v) { return Promise.resolve(v).then(f, reject); }; }
    function verb(n, f) { if (g[n]) { i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; if (f) i[n] = f(i[n]); } }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BUFFER_LINES_BELOW = void 0;
exports.getReplacementByMatching = getReplacementByMatching;
exports.getReplacementWithLlm = getReplacementWithLlm;
var lineStream_1 = require("../../autocomplete/filtering/streamTransforms/lineStream");
var util_1 = require("../../diff/util");
var util_2 = require("../../util");
exports.BUFFER_LINES_BELOW = 3;
var MATCH_LINES_ABOVE = 1;
function getReplacementByMatching(oldCode, linesBefore, linesAfter) {
    var oldLines = oldCode.split("\n");
    var linesToMatchAbove = MATCH_LINES_ABOVE;
    var linesToMatchBelow = Math.min(exports.BUFFER_LINES_BELOW, linesAfter.length);
    // Get surrounding lines around the gap
    var beforeContext = linesBefore.slice(-linesToMatchAbove).join("\n");
    var afterContext = linesAfter.slice(0, linesToMatchBelow).join("\n");
    // Find the start index in the old code
    var startIndex = oldLines.findIndex(function (line, index) {
        var chunk = oldLines.slice(index, index + linesToMatchAbove).join("\n");
        return chunk === beforeContext;
    });
    if (startIndex === -1) {
        return undefined; // Couldn't find matching start
    }
    // Find the end index in the old code
    var endIndex = oldLines.findIndex(function (line, index) {
        if (index <= startIndex + linesToMatchBelow) {
            return false;
        }
        var chunk = oldLines.slice(index, index + linesToMatchBelow).join("\n");
        return chunk === afterContext;
    });
    if (endIndex === -1) {
        return undefined; // Couldn't find matching end
    }
    // Extract the replacement code
    var replacement = oldLines
        .slice(startIndex + linesToMatchAbove, endIndex)
        .join("\n");
    return replacement;
}
var REPLACE_HERE = "// REPLACE HERE //";
function getReplacementWithLlm(oldCode, linesBefore, linesAfter, llm, abortController) {
    return __asyncGenerator(this, arguments, function getReplacementWithLlm_1() {
        var userPrompt, assistantPrompt, completion, lines, _a, lines_1, lines_1_1, line, e_1_1;
        var _b, e_1, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    userPrompt = (0, util_2.dedent)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    ORIGINAL CODE:\n    ```\n    ", "\n    ```\n\n    UPDATED CODE:\n    ```\n    ", "\n    ", "\n    ", "\n    ```\n\n    Above is an original version of a file, followed by a newer version that is in the process of being written. The new version contains a section which is exactly the same as in the original code, and has been marked with \"", "\". Your task is to give the exact snippet of code from the original code that should replace \"", "\" in the new version.\n\n    Your output should be a single code block. We will paste the contents of that code block directly into the new version, so make sure that it has correct indentation.\n  "], ["\n    ORIGINAL CODE:\n    \\`\\`\\`\n    ", "\n    \\`\\`\\`\n\n    UPDATED CODE:\n    \\`\\`\\`\n    ", "\n    ", "\n    ", "\n    \\`\\`\\`\n\n    Above is an original version of a file, followed by a newer version that is in the process of being written. The new version contains a section which is exactly the same as in the original code, and has been marked with \"", "\". Your task is to give the exact snippet of code from the original code that should replace \"", "\" in the new version.\n\n    Your output should be a single code block. We will paste the contents of that code block directly into the new version, so make sure that it has correct indentation.\n  "])), oldCode, linesBefore.join("\n"), REPLACE_HERE, linesAfter.join("\n"), REPLACE_HERE, REPLACE_HERE);
                    assistantPrompt = (0, util_2.dedent)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    Here is the snippet of code that will replace \"", "\" in the new version:\n    ```\n  "], ["\n    Here is the snippet of code that will replace \"", "\" in the new version:\n    \\`\\`\\`\n  "])), REPLACE_HERE);
                    return [4 /*yield*/, __await(llm.streamChat([
                            { role: "user", content: userPrompt },
                            { role: "assistant", content: assistantPrompt },
                        ], abortController.signal, {
                            raw: true,
                            prediction: undefined,
                            reasoning: false,
                        }))];
                case 1:
                    completion = _e.sent();
                    lines = (0, util_1.streamLines)(completion);
                    lines = (0, lineStream_1.filterLeadingNewline)(lines);
                    _e.label = 2;
                case 2:
                    _e.trys.push([2, 9, 10, 15]);
                    _a = true, lines_1 = __asyncValues(lines);
                    _e.label = 3;
                case 3: return [4 /*yield*/, __await(lines_1.next())];
                case 4:
                    if (!(lines_1_1 = _e.sent(), _b = lines_1_1.done, !_b)) return [3 /*break*/, 8];
                    _d = lines_1_1.value;
                    _a = false;
                    line = _d;
                    return [4 /*yield*/, __await(line)];
                case 5: return [4 /*yield*/, _e.sent()];
                case 6:
                    _e.sent();
                    _e.label = 7;
                case 7:
                    _a = true;
                    return [3 /*break*/, 3];
                case 8: return [3 /*break*/, 15];
                case 9:
                    e_1_1 = _e.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 15];
                case 10:
                    _e.trys.push([10, , 13, 14]);
                    if (!(!_a && !_b && (_c = lines_1.return))) return [3 /*break*/, 12];
                    return [4 /*yield*/, __await(_c.call(lines_1))];
                case 11:
                    _e.sent();
                    _e.label = 12;
                case 12: return [3 /*break*/, 14];
                case 13:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 14: return [7 /*endfinally*/];
                case 15: return [2 /*return*/];
            }
        });
    });
}
var templateObject_1, templateObject_2;
