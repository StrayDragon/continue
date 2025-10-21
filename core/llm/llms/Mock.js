"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var index_js_1 = require("../index.js");
var MockLLM = /** @class */ (function (_super) {
    __extends(MockLLM, _super);
    function MockLLM(options) {
        var _a, _b;
        var _this = _super.call(this, options) || this;
        _this.completion = "Test Completion";
        _this.templateMessages = undefined;
        _this.chatStreams = (_b = (_a = options.requestOptions) === null || _a === void 0 ? void 0 : _a.extraBodyProperties) === null || _b === void 0 ? void 0 : _b.chatStream;
        return _this;
    }
    MockLLM.prototype._streamComplete = function (prompt, signal, options) {
        return __asyncGenerator(this, arguments, function _streamComplete_1() {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, __await(this.completion)];
                    case 1: return [4 /*yield*/, _a.sent()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MockLLM.prototype._streamChat = function (messages, signal, options) {
        return __asyncGenerator(this, arguments, function _streamChat_1() {
            var chatStream, _i, chatStream_1, message, _a, _b, _c, char;
            var _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        if (!this.chatStreams) return [3 /*break*/, 15];
                        chatStream = (_d = this.chatStreams) === null || _d === void 0 ? void 0 : _d[messages.filter(function (m) { return m.role === "user" || m.role === "tool"; })
                            .length - 1];
                        if (!chatStream) return [3 /*break*/, 13];
                        _i = 0, chatStream_1 = chatStream;
                        _f.label = 1;
                    case 1:
                        if (!(_i < chatStream_1.length)) return [3 /*break*/, 13];
                        message = chatStream_1[_i];
                        _a = message;
                        switch (_a) {
                            case "REPEAT_LAST_MSG": return [3 /*break*/, 2];
                            case "REPEAT_SYSTEM_MSG": return [3 /*break*/, 5];
                            case "ERROR": return [3 /*break*/, 8];
                        }
                        return [3 /*break*/, 9];
                    case 2: return [4 /*yield*/, __await({
                            role: "assistant",
                            content: messages[messages.length - 1].content,
                        })];
                    case 3: return [4 /*yield*/, _f.sent()];
                    case 4:
                        _f.sent();
                        return [3 /*break*/, 12];
                    case 5: return [4 /*yield*/, __await({
                            role: "assistant",
                            content: ((_e = messages.find(function (m) { return m.role === "system"; })) === null || _e === void 0 ? void 0 : _e.content) || "",
                        })];
                    case 6: return [4 /*yield*/, _f.sent()];
                    case 7:
                        _f.sent();
                        return [3 /*break*/, 12];
                    case 8: throw new Error("Intentional error");
                    case 9: return [4 /*yield*/, __await(message)];
                    case 10: return [4 /*yield*/, _f.sent()];
                    case 11:
                        _f.sent();
                        _f.label = 12;
                    case 12:
                        _i++;
                        return [3 /*break*/, 1];
                    case 13: return [4 /*yield*/, __await(void 0)];
                    case 14: return [2 /*return*/, _f.sent()];
                    case 15:
                        _b = 0, _c = this.completion;
                        _f.label = 16;
                    case 16:
                        if (!(_b < _c.length)) return [3 /*break*/, 20];
                        char = _c[_b];
                        return [4 /*yield*/, __await({
                                role: "assistant",
                                content: char,
                            })];
                    case 17: return [4 /*yield*/, _f.sent()];
                    case 18:
                        _f.sent();
                        _f.label = 19;
                    case 19:
                        _b++;
                        return [3 /*break*/, 16];
                    case 20: return [2 /*return*/];
                }
            });
        });
    };
    MockLLM.providerName = "mock";
    return MockLLM;
}(index_js_1.BaseLLM));
exports.default = MockLLM;
