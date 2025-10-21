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
exports.BracketMatchingService = exports.BRACKETS_REVERSE = exports.BRACKETS = void 0;
exports.BRACKETS = {
    "(": ")",
    "{": "}",
    "[": "]",
};
exports.BRACKETS_REVERSE = {
    ")": "(",
    "}": "{",
    "]": "[",
};
/**
 * We follow the policy of only completing bracket pairs that we started
 * But sometimes we started the pair in a previous autocomplete suggestion
 */
var BracketMatchingService = /** @class */ (function () {
    function BracketMatchingService() {
        this.openingBracketsFromLastCompletion = [];
        this.lastCompletionFile = undefined;
    }
    BracketMatchingService.prototype.handleAcceptedCompletion = function (completion, filepath) {
        this.openingBracketsFromLastCompletion = [];
        var stack = [];
        for (var i = 0; i < completion.length; i++) {
            var char = completion[i];
            if (Object.keys(exports.BRACKETS).includes(char)) {
                // It's an opening bracket
                stack.push(char);
            }
            else if (Object.values(exports.BRACKETS).includes(char)) {
                // It's a closing bracket
                if (stack.length === 0 || exports.BRACKETS[stack.pop()] !== char) {
                    break;
                }
            }
        }
        // Any remaining opening brackets in the stack are uncompleted
        this.openingBracketsFromLastCompletion = stack;
        this.lastCompletionFile = filepath;
    };
    BracketMatchingService.prototype.stopOnUnmatchedClosingBracket = function (stream, prefix, suffix, filepath, multiline) {
        return __asyncGenerator(this, arguments, function stopOnUnmatchedClosingBracket_1() {
            var stack, currentLine, i, char, i, openBracket, all, seenNonWhitespaceOrClosingBracket, _a, stream_1, stream_1_1, chunk, firstNonWhitespaceOrClosingBracketIndex, allLines, i, char, e_1_1;
            var _b, e_1, _c, _d;
            var _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        stack = [];
                        if (multiline) {
                            // Add opening brackets from the previous response
                            if (this.lastCompletionFile === filepath) {
                                stack = __spreadArray([], this.openingBracketsFromLastCompletion, true);
                            }
                            else {
                                this.lastCompletionFile = undefined;
                            }
                        }
                        else {
                            // If single line completion, then allow completing bracket pairs that are
                            // started on the current line but not finished on the current line
                            if (!multiline) {
                                currentLine = ((_e = prefix.split("\n").pop()) !== null && _e !== void 0 ? _e : "") + ((_f = suffix.split("\n")[0]) !== null && _f !== void 0 ? _f : "");
                                for (i = 0; i < currentLine.length; i++) {
                                    char = currentLine[i];
                                    if (Object.keys(exports.BRACKETS).includes(char)) {
                                        // It's an opening bracket
                                        stack.push(char);
                                    }
                                    else if (Object.values(exports.BRACKETS).includes(char)) {
                                        // It's a closing bracket
                                        if (stack.length === 0 || exports.BRACKETS[stack.pop()] !== char) {
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                        // Add corresponding open brackets from suffix to stack
                        // because we overwrite them and the diff is displayed, and this allows something to be edited after that
                        for (i = 0; i < suffix.length; i++) {
                            if (suffix[i] === " ") {
                                continue;
                            }
                            openBracket = exports.BRACKETS_REVERSE[suffix[i]];
                            if (!openBracket) {
                                break;
                            }
                            stack.unshift(openBracket);
                        }
                        all = "";
                        seenNonWhitespaceOrClosingBracket = false;
                        _g.label = 1;
                    case 1:
                        _g.trys.push([1, 22, 23, 28]);
                        _a = true, stream_1 = __asyncValues(stream);
                        _g.label = 2;
                    case 2: return [4 /*yield*/, __await(stream_1.next())];
                    case 3:
                        if (!(stream_1_1 = _g.sent(), _b = stream_1_1.done, !_b)) return [3 /*break*/, 21];
                        _d = stream_1_1.value;
                        _a = false;
                        chunk = _d;
                        if (!!seenNonWhitespaceOrClosingBracket) return [3 /*break*/, 9];
                        firstNonWhitespaceOrClosingBracketIndex = chunk.search(/[^\s\)\}\]]/);
                        if (!(firstNonWhitespaceOrClosingBracketIndex !== -1)) return [3 /*break*/, 6];
                        return [4 /*yield*/, __await(chunk.slice(0, firstNonWhitespaceOrClosingBracketIndex))];
                    case 4: return [4 /*yield*/, _g.sent()];
                    case 5:
                        _g.sent();
                        chunk = chunk.slice(firstNonWhitespaceOrClosingBracketIndex);
                        seenNonWhitespaceOrClosingBracket = true;
                        return [3 /*break*/, 9];
                    case 6: return [4 /*yield*/, __await(chunk)];
                    case 7: return [4 /*yield*/, _g.sent()];
                    case 8:
                        _g.sent();
                        return [3 /*break*/, 20];
                    case 9:
                        all += chunk;
                        allLines = all.split("\n");
                        i = 0;
                        _g.label = 10;
                    case 10:
                        if (!(i < chunk.length)) return [3 /*break*/, 17];
                        char = chunk[i];
                        if (!Object.values(exports.BRACKETS).includes(char)) return [3 /*break*/, 15];
                        if (!(stack.length === 0 || exports.BRACKETS[stack.pop()] !== char)) return [3 /*break*/, 14];
                        return [4 /*yield*/, __await(chunk.slice(0, i))];
                    case 11: 
                    // If the stack is empty or the top of the stack doesn't match the current closing bracket
                    return [4 /*yield*/, _g.sent()];
                    case 12:
                        // If the stack is empty or the top of the stack doesn't match the current closing bracket
                        _g.sent();
                        return [4 /*yield*/, __await(void 0)];
                    case 13: return [2 /*return*/, _g.sent()]; // Stop the generator if the closing bracket doesn't have a matching opening bracket in the stream
                    case 14: return [3 /*break*/, 16];
                    case 15:
                        if (Object.keys(exports.BRACKETS).includes(char)) {
                            // It's an opening bracket
                            stack.push(char);
                        }
                        _g.label = 16;
                    case 16:
                        i++;
                        return [3 /*break*/, 10];
                    case 17: return [4 /*yield*/, __await(chunk)];
                    case 18: return [4 /*yield*/, _g.sent()];
                    case 19:
                        _g.sent();
                        _g.label = 20;
                    case 20:
                        _a = true;
                        return [3 /*break*/, 2];
                    case 21: return [3 /*break*/, 28];
                    case 22:
                        e_1_1 = _g.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 28];
                    case 23:
                        _g.trys.push([23, , 26, 27]);
                        if (!(!_a && !_b && (_c = stream_1.return))) return [3 /*break*/, 25];
                        return [4 /*yield*/, __await(_c.call(stream_1))];
                    case 24:
                        _g.sent();
                        _g.label = 25;
                    case 25: return [3 /*break*/, 27];
                    case 26:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 27: return [7 /*endfinally*/];
                    case 28: return [2 /*return*/];
                }
            });
        });
    };
    return BracketMatchingService;
}());
exports.BracketMatchingService = BracketMatchingService;
