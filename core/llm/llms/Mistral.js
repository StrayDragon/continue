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
Object.defineProperty(exports, "__esModule", { value: true });
var codestral_js_1 = require("../templates/edit/codestral.js");
var OpenAI_js_1 = require("./OpenAI.js");
var Mistral = /** @class */ (function (_super) {
    __extends(Mistral, _super);
    function Mistral(options) {
        var _a, _b;
        var _this = _super.call(this, options) || this;
        if (options.model.includes("codestral") &&
            !options.model.includes("mamba")) {
            _this.apiBase = (_a = options.apiBase) !== null && _a !== void 0 ? _a : "https://codestral.mistral.ai/v1/";
        }
        if (!((_b = _this.apiBase) === null || _b === void 0 ? void 0 : _b.endsWith("/"))) {
            _this.apiBase += "/";
        }
        // Unless the user explicitly specifies, we will autodetect the API key type and adjust the API base accordingly
        if (!options.apiBase) {
            _this.autodetectApiKeyType()
                .then(function (keyType) {
                switch (keyType) {
                    case "codestral":
                        _this.apiBase = "https://codestral.mistral.ai/v1/";
                        break;
                    case "mistral":
                        _this.apiBase = "https://api.mistral.ai/v1/";
                        break;
                }
                _this.openaiAdapter = _this.createOpenAiAdapter();
            })
                .catch(function (err) { });
        }
        return _this;
    }
    Mistral.prototype.autodetectApiKeyType = function () {
        return __awaiter(this, void 0, void 0, function () {
            var mistralResp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("https://api.mistral.ai/v1/models", {
                            method: "GET",
                            headers: this._getHeaders(),
                        })];
                    case 1:
                        mistralResp = _a.sent();
                        if (mistralResp.status === 401) {
                            return [2 /*return*/, "codestral"];
                        }
                        return [2 /*return*/, "mistral"];
                }
            });
        });
    };
    Mistral.prototype._convertModelName = function (model) {
        var _a;
        return (_a = Mistral.modelConversion[model]) !== null && _a !== void 0 ? _a : model;
    };
    Mistral.prototype._convertArgs = function (options, messages) {
        var finalOptions = _super.prototype._convertArgs.call(this, options, messages);
        var lastMessage = finalOptions.messages[finalOptions.messages.length - 1];
        if ((lastMessage === null || lastMessage === void 0 ? void 0 : lastMessage.role) === "assistant") {
            lastMessage.prefix = true;
        }
        return finalOptions;
    };
    Mistral.prototype.supportsFim = function () {
        return true;
    };
    Mistral.providerName = "mistral";
    Mistral.defaultOptions = {
        apiBase: "https://api.mistral.ai/v1/",
        model: "codestral-latest",
        promptTemplates: {
            edit: codestral_js_1.codestralEditPrompt,
        },
        maxEmbeddingBatchSize: 128,
    };
    Mistral.modelConversion = {
        "mistral-7b": "open-mistral-7b",
        "mistral-8x7b": "open-mixtral-8x7b",
    };
    return Mistral;
}(OpenAI_js_1.default));
exports.default = Mistral;
