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
exports.LLMReranker = void 0;
var uri_js_1 = require("../../util/uri.js");
var index_js_1 = require("../index.js");
var RERANK_PROMPT = function (query, documentId, document) { return "You are an expert software developer responsible for helping detect whether the retrieved snippet of code is relevant to the query. For a given input, you need to output a single word: \"Yes\" or \"No\" indicating the retrieved snippet is relevant to the query.\n\n  Query: Where is the FastAPI server?\n  Snippet:\n  ```/Users/andrew/Desktop/server/main.py\n  from fastapi import FastAPI\n  app = FastAPI()\n  @app.get(\"/\")\n  def read_root():\n      return {{\"Hello\": \"World\"}}\n  ```\n  Relevant: Yes\n\n  Query: Where in the documentation does it talk about the UI?\n  Snippet:\n  ```/Users/andrew/Projects/bubble_sort/src/lib.rs\n  fn bubble_sort<T: Ord>(arr: &mut [T]) {{\n      for i in 0..arr.len() {{\n          for j in 1..arr.len() - i {{\n              if arr[j - 1] > arr[j] {{\n                  arr.swap(j - 1, j);\n              }}\n          }}\n      }}\n  }}\n  ```\n  Relevant: No\n\n  Query: ".concat(query, "\n  Snippet:\n  ```").concat(documentId, "\n  ").concat(document, "\n  ```\n  Relevant:\n  "); };
var LLMReranker = /** @class */ (function (_super) {
    __extends(LLMReranker, _super);
    function LLMReranker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LLMReranker.prototype.scoreChunk = function (chunk, query) {
        return __awaiter(this, void 0, void 0, function () {
            var completion, answer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.complete(RERANK_PROMPT(query, (0, uri_js_1.getUriPathBasename)(chunk.filepath), chunk.content), new AbortController().signal, {
                            maxTokens: 1,
                            model: this.providerName.startsWith("openai") &&
                                this.model.startsWith("gpt-4")
                                ? "gpt-3.5-turbo"
                                : this.model,
                        })];
                    case 1:
                        completion = _a.sent();
                        if (!completion) {
                            // TODO: Why is this happening?
                            return [2 /*return*/, 0.0];
                        }
                        answer = completion
                            .trim()
                            .toLowerCase()
                            .replace(/"/g, "")
                            .replace(/'/g, "");
                        if (answer === "yes") {
                            return [2 /*return*/, 1.0];
                        }
                        if (answer === "no") {
                            return [2 /*return*/, 0.0];
                        }
                        console.warn("Unexpected response from single token reranker: \"".concat(answer, "\". Expected \"yes\" or \"no\"."));
                        return [2 /*return*/, 0.0];
                }
            });
        });
    };
    LLMReranker.prototype.rerank = function (query, chunks) {
        return __awaiter(this, void 0, void 0, function () {
            var scores;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(chunks.map(function (chunk) { return _this.scoreChunk(chunk, query); }))];
                    case 1:
                        scores = _a.sent();
                        return [2 /*return*/, scores];
                }
            });
        });
    };
    LLMReranker.providerName = "llmReranker";
    return LLMReranker;
}(index_js_1.BaseLLM));
exports.LLMReranker = LLMReranker;
