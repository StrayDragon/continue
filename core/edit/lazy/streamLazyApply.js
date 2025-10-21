"use strict";
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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
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
exports.streamLazyApply = streamLazyApply;
var lineStream_js_1 = require("../../autocomplete/filtering/streamTransforms/lineStream.js");
var streamDiff_js_1 = require("../../diff/streamDiff.js");
var util_js_1 = require("../../diff/util.js");
var streamMarkdownUtils_js_1 = require("../../utils/streamMarkdownUtils.js");
var prompts_js_1 = require("./prompts.js");
var replace_js_1 = require("./replace.js");
function streamLazyApply(oldCode, filename, newCode, llm, abortController) {
    return __asyncGenerator(this, arguments, function streamLazyApply_1() {
        // Do find and replace over the lazy edit response
        function replacementFunction(oldCode, linesBefore, linesAfter) {
            return __asyncGenerator(this, arguments, function replacementFunction_1() {
                var _a, _b, _c, line, e_2_1;
                var _d, e_2, _e, _f;
                return __generator(this, function (_g) {
                    switch (_g.label) {
                        case 0:
                            _g.trys.push([0, 7, 8, 13]);
                            _a = true, _b = __asyncValues((0, replace_js_1.getReplacementWithLlm)(oldCode, linesBefore, linesAfter, llm, abortController));
                            _g.label = 1;
                        case 1: return [4 /*yield*/, __await(_b.next())];
                        case 2:
                            if (!(_c = _g.sent(), _d = _c.done, !_d)) return [3 /*break*/, 6];
                            _f = _c.value;
                            _a = false;
                            line = _f;
                            return [4 /*yield*/, __await(line)];
                        case 3: return [4 /*yield*/, _g.sent()];
                        case 4:
                            _g.sent();
                            _g.label = 5;
                        case 5:
                            _a = true;
                            return [3 /*break*/, 1];
                        case 6: return [3 /*break*/, 13];
                        case 7:
                            e_2_1 = _g.sent();
                            e_2 = { error: e_2_1 };
                            return [3 /*break*/, 13];
                        case 8:
                            _g.trys.push([8, , 11, 12]);
                            if (!(!_a && !_d && (_e = _b.return))) return [3 /*break*/, 10];
                            return [4 /*yield*/, __await(_e.call(_b))];
                        case 9:
                            _g.sent();
                            _g.label = 10;
                        case 10: return [3 /*break*/, 12];
                        case 11:
                            if (e_2) throw e_2.error;
                            return [7 /*endfinally*/];
                        case 12: return [7 /*endfinally*/];
                        case 13: return [2 /*return*/];
                    }
                });
            });
        }
        var promptFactory, promptMessages, lazyCompletion, lazyCompletionLines, lines, oldLines, diffLines, _a, diffLines_1, diffLines_1_1, diffLine, e_1_1;
        var _b, e_1, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    promptFactory = (0, prompts_js_1.lazyApplyPromptForModel)(llm.model, llm.providerName);
                    if (!promptFactory) {
                        throw new Error("Lazy apply not supported for model ".concat(llm.model));
                    }
                    promptMessages = promptFactory(oldCode, filename, newCode);
                    lazyCompletion = llm.streamChat(promptMessages, abortController.signal);
                    lazyCompletionLines = (0, util_js_1.streamLines)(lazyCompletion, true);
                    lazyCompletionLines = (0, streamMarkdownUtils_js_1.stopAtLinesWithMarkdownSupport)(lazyCompletionLines, filename);
                    lazyCompletionLines = (0, lineStream_js_1.filterLeadingNewline)(lazyCompletionLines);
                    lazyCompletionLines = (0, lineStream_js_1.removeTrailingWhitespace)(lazyCompletionLines);
                    lines = streamFillUnchangedCode(lazyCompletionLines, oldCode, replacementFunction);
                    oldLines = oldCode.split(/\r?\n/);
                    diffLines = (0, streamDiff_js_1.streamDiff)(oldLines, lines);
                    diffLines = (0, lineStream_js_1.filterLeadingAndTrailingNewLineInsertion)(diffLines);
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 8, 9, 14]);
                    _a = true, diffLines_1 = __asyncValues(diffLines);
                    _e.label = 2;
                case 2: return [4 /*yield*/, __await(diffLines_1.next())];
                case 3:
                    if (!(diffLines_1_1 = _e.sent(), _b = diffLines_1_1.done, !_b)) return [3 /*break*/, 7];
                    _d = diffLines_1_1.value;
                    _a = false;
                    diffLine = _d;
                    return [4 /*yield*/, __await(diffLine)];
                case 4: return [4 /*yield*/, _e.sent()];
                case 5:
                    _e.sent();
                    _e.label = 6;
                case 6:
                    _a = true;
                    return [3 /*break*/, 2];
                case 7: return [3 /*break*/, 14];
                case 8:
                    e_1_1 = _e.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 14];
                case 9:
                    _e.trys.push([9, , 12, 13]);
                    if (!(!_a && !_b && (_c = diffLines_1.return))) return [3 /*break*/, 11];
                    return [4 /*yield*/, __await(_c.call(diffLines_1))];
                case 10:
                    _e.sent();
                    _e.label = 11;
                case 11: return [3 /*break*/, 13];
                case 12:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 13: return [7 /*endfinally*/];
                case 14: return [2 /*return*/];
            }
        });
    });
}
function streamFillUnchangedCode(lines, oldCode, replacementFunction) {
    return __asyncGenerator(this, arguments, function streamFillUnchangedCode_1() {
        var newLines, buffer, waitingForBuffer, _a, lines_1, lines_1_1, line, replacementLines, replacement, _b, replacementLines_1, replacementLines_1_1, replacementLine, e_3_1, _i, buffer_1, bufferedLine, e_4_1, replacementLines, _c, replacementLines_2, replacementLines_2_1, replacementLine, e_5_1, _d, buffer_2, bufferedLine;
        var _e, e_4, _f, _g, _h, e_3, _j, _k, _l, e_5, _m, _o;
        return __generator(this, function (_p) {
            switch (_p.label) {
                case 0:
                    newLines = [];
                    buffer = [];
                    waitingForBuffer = false;
                    _p.label = 1;
                case 1:
                    _p.trys.push([1, 30, 31, 36]);
                    _a = true, lines_1 = __asyncValues(lines);
                    _p.label = 2;
                case 2: return [4 /*yield*/, __await(lines_1.next())];
                case 3:
                    if (!(lines_1_1 = _p.sent(), _e = lines_1_1.done, !_e)) return [3 /*break*/, 29];
                    _g = lines_1_1.value;
                    _a = false;
                    line = _g;
                    if (!waitingForBuffer) return [3 /*break*/, 24];
                    buffer.push(line);
                    if (!(buffer.length >= replace_js_1.BUFFER_LINES_BELOW)) return [3 /*break*/, 23];
                    replacementLines = replacementFunction(oldCode, newLines, buffer);
                    replacement = "";
                    _p.label = 4;
                case 4:
                    _p.trys.push([4, 11, 12, 17]);
                    _b = true, replacementLines_1 = (e_3 = void 0, __asyncValues(replacementLines));
                    _p.label = 5;
                case 5: return [4 /*yield*/, __await(replacementLines_1.next())];
                case 6:
                    if (!(replacementLines_1_1 = _p.sent(), _h = replacementLines_1_1.done, !_h)) return [3 /*break*/, 10];
                    _k = replacementLines_1_1.value;
                    _b = false;
                    replacementLine = _k;
                    return [4 /*yield*/, __await(replacementLine)];
                case 7: return [4 /*yield*/, _p.sent()];
                case 8:
                    _p.sent();
                    newLines.push(replacementLine);
                    replacement += replacementLine + "\n";
                    _p.label = 9;
                case 9:
                    _b = true;
                    return [3 /*break*/, 5];
                case 10: return [3 /*break*/, 17];
                case 11:
                    e_3_1 = _p.sent();
                    e_3 = { error: e_3_1 };
                    return [3 /*break*/, 17];
                case 12:
                    _p.trys.push([12, , 15, 16]);
                    if (!(!_b && !_h && (_j = replacementLines_1.return))) return [3 /*break*/, 14];
                    return [4 /*yield*/, __await(_j.call(replacementLines_1))];
                case 13:
                    _p.sent();
                    _p.label = 14;
                case 14: return [3 /*break*/, 16];
                case 15:
                    if (e_3) throw e_3.error;
                    return [7 /*endfinally*/];
                case 16: return [7 /*endfinally*/];
                case 17:
                    _i = 0, buffer_1 = buffer;
                    _p.label = 18;
                case 18:
                    if (!(_i < buffer_1.length)) return [3 /*break*/, 22];
                    bufferedLine = buffer_1[_i];
                    return [4 /*yield*/, __await(bufferedLine)];
                case 19: return [4 /*yield*/, _p.sent()];
                case 20:
                    _p.sent();
                    newLines.push(bufferedLine);
                    _p.label = 21;
                case 21:
                    _i++;
                    return [3 /*break*/, 18];
                case 22:
                    waitingForBuffer = false;
                    buffer = [];
                    return [3 /*break*/, 28];
                case 23: return [3 /*break*/, 28];
                case 24:
                    if (!line.includes(prompts_js_1.UNCHANGED_CODE)) return [3 /*break*/, 25];
                    // Buffer so we can give the context of BUFFER_LINES_BELOW lines below
                    waitingForBuffer = true;
                    return [3 /*break*/, 28];
                case 25: return [4 /*yield*/, __await(line)];
                case 26: return [4 /*yield*/, _p.sent()];
                case 27:
                    _p.sent();
                    newLines.push(line);
                    _p.label = 28;
                case 28:
                    _a = true;
                    return [3 /*break*/, 2];
                case 29: return [3 /*break*/, 36];
                case 30:
                    e_4_1 = _p.sent();
                    e_4 = { error: e_4_1 };
                    return [3 /*break*/, 36];
                case 31:
                    _p.trys.push([31, , 34, 35]);
                    if (!(!_a && !_e && (_f = lines_1.return))) return [3 /*break*/, 33];
                    return [4 /*yield*/, __await(_f.call(lines_1))];
                case 32:
                    _p.sent();
                    _p.label = 33;
                case 33: return [3 /*break*/, 35];
                case 34:
                    if (e_4) throw e_4.error;
                    return [7 /*endfinally*/];
                case 35: return [7 /*endfinally*/];
                case 36:
                    if (!waitingForBuffer) return [3 /*break*/, 55];
                    replacementLines = replacementFunction(oldCode, newLines, buffer);
                    _p.label = 37;
                case 37:
                    _p.trys.push([37, 44, 45, 50]);
                    _c = true, replacementLines_2 = __asyncValues(replacementLines);
                    _p.label = 38;
                case 38: return [4 /*yield*/, __await(replacementLines_2.next())];
                case 39:
                    if (!(replacementLines_2_1 = _p.sent(), _l = replacementLines_2_1.done, !_l)) return [3 /*break*/, 43];
                    _o = replacementLines_2_1.value;
                    _c = false;
                    replacementLine = _o;
                    return [4 /*yield*/, __await(replacementLine)];
                case 40: return [4 /*yield*/, _p.sent()];
                case 41:
                    _p.sent();
                    newLines.push(replacementLine);
                    _p.label = 42;
                case 42:
                    _c = true;
                    return [3 /*break*/, 38];
                case 43: return [3 /*break*/, 50];
                case 44:
                    e_5_1 = _p.sent();
                    e_5 = { error: e_5_1 };
                    return [3 /*break*/, 50];
                case 45:
                    _p.trys.push([45, , 48, 49]);
                    if (!(!_c && !_l && (_m = replacementLines_2.return))) return [3 /*break*/, 47];
                    return [4 /*yield*/, __await(_m.call(replacementLines_2))];
                case 46:
                    _p.sent();
                    _p.label = 47;
                case 47: return [3 /*break*/, 49];
                case 48:
                    if (e_5) throw e_5.error;
                    return [7 /*endfinally*/];
                case 49: return [7 /*endfinally*/];
                case 50:
                    _d = 0, buffer_2 = buffer;
                    _p.label = 51;
                case 51:
                    if (!(_d < buffer_2.length)) return [3 /*break*/, 55];
                    bufferedLine = buffer_2[_d];
                    return [4 /*yield*/, __await(bufferedLine)];
                case 52: return [4 /*yield*/, _p.sent()];
                case 53:
                    _p.sent();
                    newLines.push(bufferedLine);
                    _p.label = 54;
                case 54:
                    _d++;
                    return [3 /*break*/, 51];
                case 55: return [2 /*return*/];
            }
        });
    });
}
