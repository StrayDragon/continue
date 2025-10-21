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
var replicate_1 = require("replicate");
var index_js_1 = require("../index.js");
var Replicate = /** @class */ (function (_super) {
    __extends(Replicate, _super);
    function Replicate(options) {
        var _this = _super.call(this, options) || this;
        _this._replicate = new replicate_1.default({ auth: options.apiKey });
        return _this;
    }
    Replicate.prototype._convertArgs = function (options, prompt, signal) {
        return [
            Replicate.MODEL_IDS[options.model] || options.model,
            {
                input: { prompt: prompt, message: prompt },
                signal: signal,
            },
        ];
    };
    Replicate.prototype._complete = function (prompt, signal, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, model, args, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this._convertArgs(options, prompt, signal), model = _a[0], args = _a[1];
                        return [4 /*yield*/, this._replicate.run(model, args)];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, response[0]];
                }
            });
        });
    };
    Replicate.prototype._streamComplete = function (prompt, signal, options) {
        return __asyncGenerator(this, arguments, function _streamComplete_1() {
            var _a, model, args, _b, _c, _d, event_1, e_1_1;
            var _e, e_1, _f, _g;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        _a = this._convertArgs(options, prompt, signal), model = _a[0], args = _a[1];
                        _h.label = 1;
                    case 1:
                        _h.trys.push([1, 8, 9, 14]);
                        _b = true, _c = __asyncValues(this._replicate.stream(model, args));
                        _h.label = 2;
                    case 2: return [4 /*yield*/, __await(_c.next())];
                    case 3:
                        if (!(_d = _h.sent(), _e = _d.done, !_e)) return [3 /*break*/, 7];
                        _g = _d.value;
                        _b = false;
                        event_1 = _g;
                        if (!(event_1.event === "output")) return [3 /*break*/, 6];
                        return [4 /*yield*/, __await(event_1.data)];
                    case 4: return [4 /*yield*/, _h.sent()];
                    case 5:
                        _h.sent();
                        _h.label = 6;
                    case 6:
                        _b = true;
                        return [3 /*break*/, 2];
                    case 7: return [3 /*break*/, 14];
                    case 8:
                        e_1_1 = _h.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 14];
                    case 9:
                        _h.trys.push([9, , 12, 13]);
                        if (!(!_b && !_e && (_f = _c.return))) return [3 /*break*/, 11];
                        return [4 /*yield*/, __await(_f.call(_c))];
                    case 10:
                        _h.sent();
                        _h.label = 11;
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 13: return [7 /*endfinally*/];
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    Replicate.MODEL_IDS = {
        "codellama-7b": "meta/codellama-7b-instruct:aac3ab196f8a75729aab9368cd45ea6ad3fc793b6cda93b1ded17299df369332",
        "codellama-13b": "meta/codellama-13b-instruct:a5e2d67630195a09b96932f5fa541fe64069c97d40cd0b69cdd91919987d0e7f",
        "codellama-34b": "meta/codellama-34b-instruct:eeb928567781f4e90d2aba57a51baef235de53f907c214a4ab42adabf5bb9736",
        "codellama-70b": "meta/codellama-70b-instruct:a279116fe47a0f65701a8817188601e2fe8f4b9e04a518789655ea7b995851bf",
        "llama2-7b": "meta/llama-2-7b-chat",
        "llama2-13b": "meta/llama-2-13b-chat",
        "llama3-8b": "meta/meta-llama-3-8b-instruct",
        "llama3-70b": "meta/meta-llama-3-70b-instruct",
        "llama3.1-8b": "meta/meta-llama-3.1-8b-instruct",
        "llama3.1-70b": "meta/meta-llama-3.1-70b-instruct",
        "llama3.1-405b": "meta/meta-llama-3.1-405b-instruct",
        "zephyr-7b": "nateraw/zephyr-7b-beta:b79f33de5c6c4e34087d44eaea4a9d98ce5d3f3a09522f7328eea0685003a931",
        "mistral-7b": "mistralai/mistral-7b-instruct-v0.1:83b6a56e7c828e667f21fd596c338fd4f0039b46bcfa18d973e8e70e455fda70",
        "mistral-8x7b": "mistralai/mixtral-8x7b-instruct-v0.1",
        "wizardcoder-34b": "andreasjansson/wizardcoder-python-34b-v1-gguf:67eed332a5389263b8ede41be3ee7dc119fa984e2bde287814c4abed19a45e54",
        "neural-chat-7b": "tomasmcm/neural-chat-7b-v3-1:acb450496b49e19a1e410b50c574a34acacd54820bc36c19cbfe05148de2ba57",
        "deepseek-7b": "kcaverly/deepseek-coder-33b-instruct-gguf",
        "phind-codellama-34b": "kcaverly/phind-codellama-34b-v2-gguf",
    };
    Replicate.providerName = "replicate";
    return Replicate;
}(index_js_1.BaseLLM));
exports.default = Replicate;
