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
exports.withExponentialBackoff = exports.RETRY_AFTER_HEADER = void 0;
exports.RETRY_AFTER_HEADER = "Retry-After";
var withExponentialBackoff = function (apiCall_1) {
    var args_1 = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args_1[_i - 1] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([apiCall_1], args_1, true), void 0, function (apiCall, maxTries, initialDelaySeconds) {
        var _loop_1, attempt, state_1;
        var _a, _b;
        if (maxTries === void 0) { maxTries = 5; }
        if (initialDelaySeconds === void 0) { initialDelaySeconds = 1; }
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _loop_1 = function (attempt) {
                        var result, error_1, retryAfter, delay_1;
                        return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0:
                                    _d.trys.push([0, 2, , 6]);
                                    return [4 /*yield*/, apiCall()];
                                case 1:
                                    result = _d.sent();
                                    return [2 /*return*/, { value: result }];
                                case 2:
                                    error_1 = _d.sent();
                                    if (!(((_a = error_1.response) === null || _a === void 0 ? void 0 : _a.status) === 429)) return [3 /*break*/, 4];
                                    retryAfter = (_b = error_1.response) === null || _b === void 0 ? void 0 : _b.headers.get(exports.RETRY_AFTER_HEADER);
                                    delay_1 = retryAfter
                                        ? parseInt(retryAfter, 10)
                                        : initialDelaySeconds * Math.pow(2, attempt);
                                    console.log("Hit rate limit. Retrying in ".concat(delay_1, " seconds (attempt ").concat(attempt + 1, ")"));
                                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, delay_1 * 1000); })];
                                case 3:
                                    _d.sent();
                                    return [3 /*break*/, 5];
                                case 4: throw error_1; // Re-throw other errors
                                case 5: return [3 /*break*/, 6];
                                case 6: return [2 /*return*/];
                            }
                        });
                    };
                    attempt = 0;
                    _c.label = 1;
                case 1:
                    if (!(attempt < maxTries)) return [3 /*break*/, 4];
                    return [5 /*yield**/, _loop_1(attempt)];
                case 2:
                    state_1 = _c.sent();
                    if (typeof state_1 === "object")
                        return [2 /*return*/, state_1.value];
                    _c.label = 3;
                case 3:
                    attempt++;
                    return [3 /*break*/, 1];
                case 4: throw new Error("Failed to make API call after ".concat(maxTries, " retries"));
            }
        });
    });
};
exports.withExponentialBackoff = withExponentialBackoff;
