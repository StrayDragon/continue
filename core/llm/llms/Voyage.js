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
var zod_1 = require("zod");
var OpenAI_js_1 = require("./OpenAI.js");
/**used to check a valid response from voyage is received
 * reference: https://docs.voyageai.com/reference/reranker-api
 */
var VoyageRerankSuccessResponseSchema = zod_1.z.object({
    data: zod_1.z.array(zod_1.z.object({
        index: zod_1.z.number(),
        relevance_score: zod_1.z.number(),
        document: zod_1.z.string(),
    })),
});
var Voyage = /** @class */ (function (_super) {
    __extends(Voyage, _super);
    function Voyage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Voyage.prototype.rerank = function (query, chunks) {
        return __awaiter(this, void 0, void 0, function () {
            var url, resp, _a, _b, _c, data, parsedData, results;
            var _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (!query || chunks.length === 0) {
                            return [2 /*return*/, []];
                        }
                        url = new URL("rerank", this.apiBase);
                        return [4 /*yield*/, this.fetch(url, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: "Bearer ".concat(this.apiKey),
                                },
                                body: JSON.stringify({
                                    query: query,
                                    documents: chunks.map(function (chunk) { return chunk.content; }),
                                    model: (_d = this.model) !== null && _d !== void 0 ? _d : "rerank-2",
                                }),
                            })];
                    case 1:
                        resp = _e.sent();
                        if (!(resp.status !== 200)) return [3 /*break*/, 3];
                        _a = Error.bind;
                        _c = (_b = "VoyageReranker API error ".concat(resp.status, ": ")).concat;
                        return [4 /*yield*/, resp.text()];
                    case 2: throw new (_a.apply(Error, [void 0, _c.apply(_b, [_e.sent()])]))();
                    case 3: return [4 /*yield*/, resp.json()];
                    case 4:
                        data = (_e.sent());
                        parsedData = VoyageRerankSuccessResponseSchema.parse(data);
                        results = parsedData.data.sort(function (a, b) { return a.index - b.index; });
                        return [2 /*return*/, results.map(function (result) { return result.relevance_score; })];
                }
            });
        });
    };
    Voyage.providerName = "voyage";
    Voyage.defaultOptions = {
        apiBase: "https://api.voyageai.com/v1/",
        maxEmbeddingBatchSize: 128,
    };
    return Voyage;
}(OpenAI_js_1.default));
exports.default = Voyage;
