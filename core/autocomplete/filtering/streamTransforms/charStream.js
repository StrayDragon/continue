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
exports.onlyWhitespaceAfterEndOfLine = onlyWhitespaceAfterEndOfLine;
exports.noFirstCharNewline = noFirstCharNewline;
exports.stopAtStopTokens = stopAtStopTokens;
exports.stopAtStartOf = stopAtStartOf;
/**
 * Asynchronous generator that yields characters from the input stream until it encounters
 * an end-of-line character followed by a non-whitespace character.
 *
 * @param {AsyncGenerator<string>} stream - The input stream of characters.
 * @param {string[]} endOfLine - An array of characters considered as end-of-line markers.
 * @param {() => void} fullStop - A function to be called when the generator stops.
 * @yields {string} Characters from the input stream.
 * @returns {AsyncGenerator<string>} An async generator that yields characters.
 */
function onlyWhitespaceAfterEndOfLine(stream, endOfLine, fullStop) {
    return __asyncGenerator(this, arguments, function onlyWhitespaceAfterEndOfLine_1() {
        var pending, _a, stream_1, stream_1_1, chunk, i, e_1_1;
        var _b, e_1, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    pending = "";
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 17, 18, 23]);
                    _a = true, stream_1 = __asyncValues(stream);
                    _e.label = 2;
                case 2: return [4 /*yield*/, __await(stream_1.next())];
                case 3:
                    if (!(stream_1_1 = _e.sent(), _b = stream_1_1.done, !_b)) return [3 /*break*/, 16];
                    _d = stream_1_1.value;
                    _a = false;
                    chunk = _d;
                    chunk = pending + chunk;
                    pending = "";
                    i = 0;
                    _e.label = 4;
                case 4:
                    if (!(i < chunk.length - 1)) return [3 /*break*/, 9];
                    if (!(endOfLine.includes(chunk[i]) &&
                        chunk[i + 1].trim() === chunk[i + 1])) return [3 /*break*/, 8];
                    return [4 /*yield*/, __await(chunk.slice(0, i + 1))];
                case 5: return [4 /*yield*/, _e.sent()];
                case 6:
                    _e.sent();
                    fullStop();
                    return [4 /*yield*/, __await(void 0)];
                case 7: return [2 /*return*/, _e.sent()];
                case 8:
                    i++;
                    return [3 /*break*/, 4];
                case 9:
                    if (!endOfLine.includes(chunk[chunk.length - 1])) return [3 /*break*/, 12];
                    pending = chunk[chunk.length - 1];
                    return [4 /*yield*/, __await(chunk.slice(0, chunk.length - 1))];
                case 10: return [4 /*yield*/, _e.sent()];
                case 11:
                    _e.sent();
                    return [3 /*break*/, 15];
                case 12: return [4 /*yield*/, __await(chunk)];
                case 13: return [4 /*yield*/, _e.sent()];
                case 14:
                    _e.sent();
                    _e.label = 15;
                case 15:
                    _a = true;
                    return [3 /*break*/, 2];
                case 16: return [3 /*break*/, 23];
                case 17:
                    e_1_1 = _e.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 23];
                case 18:
                    _e.trys.push([18, , 21, 22]);
                    if (!(!_a && !_b && (_c = stream_1.return))) return [3 /*break*/, 20];
                    return [4 /*yield*/, __await(_c.call(stream_1))];
                case 19:
                    _e.sent();
                    _e.label = 20;
                case 20: return [3 /*break*/, 22];
                case 21:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 22: return [7 /*endfinally*/];
                case 23: return [4 /*yield*/, __await(pending)];
                case 24: return [4 /*yield*/, _e.sent()];
                case 25:
                    _e.sent();
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * Yields characters from the stream, stopping if the first character is a newline.
 * @param {AsyncGenerator<string>} stream - The input character stream.
 * @yields {string} Characters from the stream.
 */
function noFirstCharNewline(stream) {
    return __asyncGenerator(this, arguments, function noFirstCharNewline_1() {
        var first, _a, stream_2, stream_2_1, char, e_2_1;
        var _b, e_2, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    first = true;
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 10, 11, 16]);
                    _a = true, stream_2 = __asyncValues(stream);
                    _e.label = 2;
                case 2: return [4 /*yield*/, __await(stream_2.next())];
                case 3:
                    if (!(stream_2_1 = _e.sent(), _b = stream_2_1.done, !_b)) return [3 /*break*/, 9];
                    _d = stream_2_1.value;
                    _a = false;
                    char = _d;
                    if (!first) return [3 /*break*/, 5];
                    first = false;
                    if (!(char.startsWith("\n") || char.startsWith("\r"))) return [3 /*break*/, 5];
                    return [4 /*yield*/, __await(void 0)];
                case 4: return [2 /*return*/, _e.sent()];
                case 5: return [4 /*yield*/, __await(char)];
                case 6: return [4 /*yield*/, _e.sent()];
                case 7:
                    _e.sent();
                    _e.label = 8;
                case 8:
                    _a = true;
                    return [3 /*break*/, 2];
                case 9: return [3 /*break*/, 16];
                case 10:
                    e_2_1 = _e.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 16];
                case 11:
                    _e.trys.push([11, , 14, 15]);
                    if (!(!_a && !_b && (_c = stream_2.return))) return [3 /*break*/, 13];
                    return [4 /*yield*/, __await(_c.call(stream_2))];
                case 12:
                    _e.sent();
                    _e.label = 13;
                case 13: return [3 /*break*/, 15];
                case 14:
                    if (e_2) throw e_2.error;
                    return [7 /*endfinally*/];
                case 15: return [7 /*endfinally*/];
                case 16: return [2 /*return*/];
            }
        });
    });
}
/**
 * Asynchronously yields characters from the input stream, stopping if a stop token is encountered.
 *
 * @param {AsyncGenerator<string>} stream - The input stream of characters.
 * @param {string[]} stopTokens - Array of tokens that signal when to stop yielding.
 * @yields {string} Characters from the input stream.
 * @returns {AsyncGenerator<string>} An async generator that yields characters until a stop condition is met.
 * @description
 * 1. If no stop tokens are provided, yields all characters from the stream.
 * 2. Otherwise, buffers incoming chunks and checks for stop tokens.
 * 3. Yields characters one by one if no stop token is found at the start of the buffer.
 * 4. Stops yielding and returns if a stop token is encountered.
 * 5. After the stream ends, filters encountered stop tokens in remaining buffer.
 * 6. Yields any remaining buffered characters.
 */
function stopAtStopTokens(stream, stopTokens) {
    return __asyncGenerator(this, arguments, function stopAtStopTokens_1() {
        var _a, stream_3, stream_3_1, char, e_3_1, maxStopTokenLength, buffer, _b, stream_4, stream_4_1, chunk, found, _i, stopTokens_1, stopToken, e_4_1, _c, buffer_1, char;
        var _d, e_3, _e, _f, _g, e_4, _h, _j;
        return __generator(this, function (_k) {
            switch (_k.label) {
                case 0:
                    if (!(stopTokens.length === 0)) return [3 /*break*/, 16];
                    _k.label = 1;
                case 1:
                    _k.trys.push([1, 8, 9, 14]);
                    _a = true, stream_3 = __asyncValues(stream);
                    _k.label = 2;
                case 2: return [4 /*yield*/, __await(stream_3.next())];
                case 3:
                    if (!(stream_3_1 = _k.sent(), _d = stream_3_1.done, !_d)) return [3 /*break*/, 7];
                    _f = stream_3_1.value;
                    _a = false;
                    char = _f;
                    return [4 /*yield*/, __await(char)];
                case 4: return [4 /*yield*/, _k.sent()];
                case 5:
                    _k.sent();
                    _k.label = 6;
                case 6:
                    _a = true;
                    return [3 /*break*/, 2];
                case 7: return [3 /*break*/, 14];
                case 8:
                    e_3_1 = _k.sent();
                    e_3 = { error: e_3_1 };
                    return [3 /*break*/, 14];
                case 9:
                    _k.trys.push([9, , 12, 13]);
                    if (!(!_a && !_d && (_e = stream_3.return))) return [3 /*break*/, 11];
                    return [4 /*yield*/, __await(_e.call(stream_3))];
                case 10:
                    _k.sent();
                    _k.label = 11;
                case 11: return [3 /*break*/, 13];
                case 12:
                    if (e_3) throw e_3.error;
                    return [7 /*endfinally*/];
                case 13: return [7 /*endfinally*/];
                case 14: return [4 /*yield*/, __await(void 0)];
                case 15: return [2 /*return*/, _k.sent()];
                case 16:
                    maxStopTokenLength = Math.max.apply(Math, stopTokens.map(function (token) { return token.length; }));
                    buffer = "";
                    _k.label = 17;
                case 17:
                    _k.trys.push([17, 30, 31, 36]);
                    _b = true, stream_4 = __asyncValues(stream);
                    _k.label = 18;
                case 18: return [4 /*yield*/, __await(stream_4.next())];
                case 19:
                    if (!(stream_4_1 = _k.sent(), _g = stream_4_1.done, !_g)) return [3 /*break*/, 29];
                    _j = stream_4_1.value;
                    _b = false;
                    chunk = _j;
                    buffer += chunk;
                    _k.label = 20;
                case 20:
                    if (!(buffer.length >= maxStopTokenLength)) return [3 /*break*/, 28];
                    found = false;
                    _i = 0, stopTokens_1 = stopTokens;
                    _k.label = 21;
                case 21:
                    if (!(_i < stopTokens_1.length)) return [3 /*break*/, 24];
                    stopToken = stopTokens_1[_i];
                    if (!buffer.startsWith(stopToken)) return [3 /*break*/, 23];
                    found = true;
                    return [4 /*yield*/, __await(void 0)];
                case 22: return [2 /*return*/, _k.sent()];
                case 23:
                    _i++;
                    return [3 /*break*/, 21];
                case 24:
                    if (!!found) return [3 /*break*/, 27];
                    return [4 /*yield*/, __await(buffer[0])];
                case 25: return [4 /*yield*/, _k.sent()];
                case 26:
                    _k.sent();
                    buffer = buffer.slice(1);
                    _k.label = 27;
                case 27: return [3 /*break*/, 20];
                case 28:
                    _b = true;
                    return [3 /*break*/, 18];
                case 29: return [3 /*break*/, 36];
                case 30:
                    e_4_1 = _k.sent();
                    e_4 = { error: e_4_1 };
                    return [3 /*break*/, 36];
                case 31:
                    _k.trys.push([31, , 34, 35]);
                    if (!(!_b && !_g && (_h = stream_4.return))) return [3 /*break*/, 33];
                    return [4 /*yield*/, __await(_h.call(stream_4))];
                case 32:
                    _k.sent();
                    _k.label = 33;
                case 33: return [3 /*break*/, 35];
                case 34:
                    if (e_4) throw e_4.error;
                    return [7 /*endfinally*/];
                case 35: return [7 /*endfinally*/];
                case 36:
                    // Filter out the possible stop tokens from remaining buffer
                    stopTokens.forEach(function (token) {
                        buffer = buffer.replace(token, "");
                    });
                    _c = 0, buffer_1 = buffer;
                    _k.label = 37;
                case 37:
                    if (!(_c < buffer_1.length)) return [3 /*break*/, 41];
                    char = buffer_1[_c];
                    return [4 /*yield*/, __await(char)];
                case 38: return [4 /*yield*/, _k.sent()];
                case 39:
                    _k.sent();
                    _k.label = 40;
                case 40:
                    _c++;
                    return [3 /*break*/, 37];
                case 41: return [2 /*return*/];
            }
        });
    });
}
/**
 * Asynchronously yields characters from the input stream.
 * Stops if the beginning of the suffix is detected in the stream.
 */
function stopAtStartOf(stream_5, suffix_1) {
    return __asyncGenerator(this, arguments, function stopAtStartOf_1(stream, suffix, sequenceLength) {
        var _a, stream_6, stream_6_1, chunk, e_5_1, targetPart, buffer, _b, stream_7, stream_7_1, chunk, e_6_1;
        var _c, e_5, _d, _e, _f, e_6, _g, _h;
        if (sequenceLength === void 0) { sequenceLength = 20; }
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    if (!(suffix.length < sequenceLength)) return [3 /*break*/, 16];
                    _j.label = 1;
                case 1:
                    _j.trys.push([1, 8, 9, 14]);
                    _a = true, stream_6 = __asyncValues(stream);
                    _j.label = 2;
                case 2: return [4 /*yield*/, __await(stream_6.next())];
                case 3:
                    if (!(stream_6_1 = _j.sent(), _c = stream_6_1.done, !_c)) return [3 /*break*/, 7];
                    _e = stream_6_1.value;
                    _a = false;
                    chunk = _e;
                    return [4 /*yield*/, __await(chunk)];
                case 4: return [4 /*yield*/, _j.sent()];
                case 5:
                    _j.sent();
                    _j.label = 6;
                case 6:
                    _a = true;
                    return [3 /*break*/, 2];
                case 7: return [3 /*break*/, 14];
                case 8:
                    e_5_1 = _j.sent();
                    e_5 = { error: e_5_1 };
                    return [3 /*break*/, 14];
                case 9:
                    _j.trys.push([9, , 12, 13]);
                    if (!(!_a && !_c && (_d = stream_6.return))) return [3 /*break*/, 11];
                    return [4 /*yield*/, __await(_d.call(stream_6))];
                case 10:
                    _j.sent();
                    _j.label = 11;
                case 11: return [3 /*break*/, 13];
                case 12:
                    if (e_5) throw e_5.error;
                    return [7 /*endfinally*/];
                case 13: return [7 /*endfinally*/];
                case 14: return [4 /*yield*/, __await(void 0)];
                case 15: return [2 /*return*/, _j.sent()];
                case 16:
                    targetPart = suffix
                        .trimStart()
                        .slice(0, Math.floor(sequenceLength * 1.5));
                    buffer = "";
                    _j.label = 17;
                case 17:
                    _j.trys.push([17, 26, 27, 32]);
                    _b = true, stream_7 = __asyncValues(stream);
                    _j.label = 18;
                case 18: return [4 /*yield*/, __await(stream_7.next())];
                case 19:
                    if (!(stream_7_1 = _j.sent(), _f = stream_7_1.done, !_f)) return [3 /*break*/, 25];
                    _h = stream_7_1.value;
                    _b = false;
                    chunk = _h;
                    buffer += chunk;
                    if (!(buffer.length >= sequenceLength && targetPart.includes(buffer))) return [3 /*break*/, 21];
                    return [4 /*yield*/, __await(void 0)];
                case 20: return [2 /*return*/, _j.sent()]; // Stop processing when the sequence is found
                case 21:
                    if (!(buffer.length > sequenceLength)) return [3 /*break*/, 24];
                    return [4 /*yield*/, __await(buffer[0])];
                case 22: return [4 /*yield*/, _j.sent()];
                case 23:
                    _j.sent();
                    buffer = buffer.slice(1);
                    return [3 /*break*/, 21];
                case 24:
                    _b = true;
                    return [3 /*break*/, 18];
                case 25: return [3 /*break*/, 32];
                case 26:
                    e_6_1 = _j.sent();
                    e_6 = { error: e_6_1 };
                    return [3 /*break*/, 32];
                case 27:
                    _j.trys.push([27, , 30, 31]);
                    if (!(!_b && !_f && (_g = stream_7.return))) return [3 /*break*/, 29];
                    return [4 /*yield*/, __await(_g.call(stream_7))];
                case 28:
                    _j.sent();
                    _j.label = 29;
                case 29: return [3 /*break*/, 31];
                case 30:
                    if (e_6) throw e_6.error;
                    return [7 /*endfinally*/];
                case 31: return [7 /*endfinally*/];
                case 32:
                    if (!(buffer.length > 0)) return [3 /*break*/, 35];
                    return [4 /*yield*/, __await(buffer)];
                case 33: return [4 /*yield*/, _j.sent()];
                case 34:
                    _j.sent();
                    _j.label = 35;
                case 35: return [2 /*return*/];
            }
        });
    });
}
