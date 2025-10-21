"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOpenAISubclassTests = void 0;
var vitest_1 = require("vitest");
function createMockStream(mockStream) {
    var encoder = new TextEncoder();
    return new ReadableStream({
        start: function (controller) {
            for (var _i = 0, mockStream_1 = mockStream; _i < mockStream_1.length; _i++) {
                var chunk = mockStream_1[_i];
                controller.enqueue(encoder.encode("data: ".concat(typeof chunk === "string" ? chunk : JSON.stringify(chunk), "\n\n")));
            }
            controller.close();
        },
    });
}
function setupMockFetch(mockResponse, mockStream) {
    var mockFetch = vitest_1.vi.fn();
    if (mockStream) {
        var stream = createMockStream(mockStream);
        mockFetch.mockResolvedValue(new Response(stream, {
            headers: {
                "Content-Type": "text/event-stream",
            },
        }));
    }
    else {
        mockFetch.mockResolvedValue(new Response(JSON.stringify(mockResponse), {
            headers: { "Content-Type": "application/json" },
        }));
    }
    return mockFetch;
}
function setupReadableStreamPolyfill() {
    // This can be removed if https://github.com/nodejs/undici/issues/2888 is resolved
    // @ts-ignore
    var originalFrom = ReadableStream.from;
    // @ts-ignore
    ReadableStream.from = function (body) {
        if (body === null || body === void 0 ? void 0 : body.source) {
            return body;
        }
        return originalFrom(body);
    };
}
function executeLlmMethod(llm, methodToTest, params) {
    return __awaiter(this, void 0, void 0, function () {
        var result, _a, result_1, result_1_1, _, e_1_1;
        var _b;
        var _c, e_1, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    if (typeof llm[methodToTest] !== "function") {
                        throw new Error("Method ".concat(String(methodToTest), " does not exist on the LLM instance."));
                    }
                    return [4 /*yield*/, (_b = llm)[methodToTest].apply(_b, params)];
                case 1:
                    result = _f.sent();
                    if (!(result === null || result === void 0 ? void 0 : result.next)) return [3 /*break*/, 13];
                    _f.label = 2;
                case 2:
                    _f.trys.push([2, 7, 8, 13]);
                    _a = true, result_1 = __asyncValues(result);
                    _f.label = 3;
                case 3: return [4 /*yield*/, result_1.next()];
                case 4:
                    if (!(result_1_1 = _f.sent(), _c = result_1_1.done, !_c)) return [3 /*break*/, 6];
                    _e = result_1_1.value;
                    _a = false;
                    _ = _e;
                    _f.label = 5;
                case 5:
                    _a = true;
                    return [3 /*break*/, 3];
                case 6: return [3 /*break*/, 13];
                case 7:
                    e_1_1 = _f.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 13];
                case 8:
                    _f.trys.push([8, , 11, 12]);
                    if (!(!_a && !_c && (_d = result_1.return))) return [3 /*break*/, 10];
                    return [4 /*yield*/, _d.call(result_1)];
                case 9:
                    _f.sent();
                    _f.label = 10;
                case 10: return [3 /*break*/, 12];
                case 11:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 12: return [7 /*endfinally*/];
                case 13: return [2 /*return*/];
            }
        });
    });
}
function assertFetchCall(mockFetch, expectedRequest) {
    (0, vitest_1.expect)(mockFetch).toHaveBeenCalledTimes(1);
    var _a = mockFetch.mock.calls[0], url = _a[0], options = _a[1];
    (0, vitest_1.expect)(url.toString()).toBe(expectedRequest.url);
    (0, vitest_1.expect)(options.method).toBe(expectedRequest.method);
    if (expectedRequest.headers) {
        (0, vitest_1.expect)(options.headers).toEqual(vitest_1.expect.objectContaining(expectedRequest.headers));
    }
    if (expectedRequest.body) {
        var actualBody = JSON.parse(options.body);
        (0, vitest_1.expect)(actualBody).toEqual(expectedRequest.body);
    }
}
function runLlmTest(testCase) {
    return __awaiter(this, void 0, void 0, function () {
        var llm, methodToTest, params, expectedRequest, mockResponse, mockStream, mockFetch;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    llm = testCase.llm, methodToTest = testCase.methodToTest, params = testCase.params, expectedRequest = testCase.expectedRequest, mockResponse = testCase.mockResponse, mockStream = testCase.mockStream;
                    mockFetch = setupMockFetch(mockResponse, mockStream);
                    setupReadableStreamPolyfill();
                    llm.fetch = mockFetch;
                    // Disable OpenAI adapter to use our custom fetch mock
                    llm.useOpenAIAdapterFor = [];
                    return [4 /*yield*/, executeLlmMethod(llm, methodToTest, params)];
                case 1:
                    _a.sent();
                    assertFetchCall(mockFetch, expectedRequest);
                    return [2 /*return*/];
            }
        });
    });
}
function getExpectedUrl(config, endpoint, model) {
    if (model === void 0) { model = "gpt-4"; }
    var baseUrl = config.defaultApiBase || "https://api.openai.com/v1/";
    if (config.providerName === "azure") {
        return "".concat(baseUrl, "openai/deployments/").concat(model, "/").concat(endpoint, "?api-version=2023-07-01-preview");
    }
    else if (config.providerName === "ncompass") {
        return "".concat(baseUrl).concat(endpoint);
    }
    return "".concat(baseUrl).concat(endpoint);
}
var createOpenAISubclassTests = function (ProviderClass, config) {
    (0, vitest_1.describe)(config.providerName, function () {
        (0, vitest_1.afterEach)(function () {
            vitest_1.vi.clearAllMocks();
        });
        (0, vitest_1.test)("should have correct provider name", function () {
            (0, vitest_1.expect)(ProviderClass.providerName).toBe(config.providerName);
        });
        if (config.defaultApiBase) {
            (0, vitest_1.test)("should have correct default API base", function () {
                var _a;
                (0, vitest_1.expect)((_a = ProviderClass.defaultOptions) === null || _a === void 0 ? void 0 : _a.apiBase).toBe(config.defaultApiBase);
            });
        }
        (0, vitest_1.test)("streamChat should send a valid request", function () { return __awaiter(void 0, void 0, void 0, function () {
            var provider;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        provider = new ProviderClass({
                            apiKey: "test-api-key",
                            model: "gpt-4",
                            apiBase: config.defaultApiBase || "https://api.openai.com/v1/",
                        });
                        return [4 /*yield*/, runLlmTest({
                                llm: provider,
                                methodToTest: "streamChat",
                                params: [
                                    [{ role: "user", content: "hello" }],
                                    new AbortController().signal,
                                ],
                                expectedRequest: {
                                    url: getExpectedUrl(config, "chat/completions"),
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                        Authorization: "Bearer test-api-key",
                                        "api-key": "test-api-key",
                                    },
                                    body: __assign({ model: "gpt-4", messages: [{ role: "user", content: "hello" }], stream: true, max_tokens: 2048 }, config.customBodyOptions),
                                },
                                mockStream: [
                                    { choices: [{ delta: { content: "Hello" } }] },
                                    { choices: [{ delta: { content: " world" } }] },
                                ],
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        (0, vitest_1.test)("chat should send a valid request", function () { return __awaiter(void 0, void 0, void 0, function () {
            var provider;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        provider = new ProviderClass({
                            apiKey: "test-api-key",
                            model: "gpt-4",
                            apiBase: config.defaultApiBase || "https://api.openai.com/v1/",
                        });
                        return [4 /*yield*/, runLlmTest({
                                llm: provider,
                                methodToTest: "chat",
                                params: [
                                    [{ role: "user", content: "hello" }],
                                    new AbortController().signal,
                                ],
                                expectedRequest: {
                                    url: getExpectedUrl(config, "chat/completions"),
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                        Authorization: "Bearer test-api-key",
                                        "api-key": "test-api-key",
                                    },
                                    body: __assign({ model: "gpt-4", messages: [{ role: "user", content: "hello" }], stream: true, max_tokens: 2048 }, config.customBodyOptions),
                                },
                                mockStream: [
                                    { choices: [{ delta: { content: "Hello" } }] },
                                    { choices: [{ delta: { content: " world" } }] },
                                ],
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        (0, vitest_1.test)("streamComplete should send a valid request", function () { return __awaiter(void 0, void 0, void 0, function () {
            var provider;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        provider = new ProviderClass({
                            apiKey: "test-api-key",
                            model: "gpt-4",
                            apiBase: config.defaultApiBase || "https://api.openai.com/v1/",
                        });
                        return [4 /*yield*/, runLlmTest({
                                llm: provider,
                                methodToTest: "streamComplete",
                                params: ["Hello", new AbortController().signal],
                                expectedRequest: {
                                    url: getExpectedUrl(config, config.customStreamCompleteEndpoint || "chat/completions"),
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                        Authorization: "Bearer test-api-key",
                                        "api-key": "test-api-key",
                                    },
                                    body: config.customStreamCompleteEndpoint === "completions"
                                        ? __assign({ model: "gpt-4", prompt: "Hello", stream: true, max_tokens: 2048 }, config.customBodyOptions) : __assign({ model: "gpt-4", messages: [{ role: "user", content: "Hello" }], stream: true, max_tokens: 2048 }, config.customBodyOptions),
                                },
                                mockStream: [
                                    { choices: [{ delta: { content: "Hello" } }] },
                                    { choices: [{ delta: { content: " world" } }] },
                                ],
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        (0, vitest_1.test)("complete should send a valid request", function () { return __awaiter(void 0, void 0, void 0, function () {
            var provider;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        provider = new ProviderClass({
                            apiKey: "test-api-key",
                            model: "gpt-4",
                            apiBase: config.defaultApiBase || "https://api.openai.com/v1/",
                        });
                        return [4 /*yield*/, runLlmTest({
                                llm: provider,
                                methodToTest: "complete",
                                params: ["Hello", new AbortController().signal],
                                expectedRequest: {
                                    url: getExpectedUrl(config, "chat/completions"),
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                        Authorization: "Bearer test-api-key",
                                        "api-key": "test-api-key",
                                    },
                                    body: __assign({ model: "gpt-4", messages: [{ role: "user", content: "Hello" }], stream: true, max_tokens: 2048 }, config.customBodyOptions),
                                },
                                mockStream: [
                                    { choices: [{ delta: { content: "Hello" } }] },
                                    { choices: [{ delta: { content: " world" } }] },
                                ],
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        (0, vitest_1.test)("should handle embeddings", function () { return __awaiter(void 0, void 0, void 0, function () {
            var provider;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        provider = new ProviderClass({
                            apiKey: "test-api-key",
                            model: "text-embedding-ada-002",
                            apiBase: config.defaultApiBase || "https://api.openai.com/v1/",
                        });
                        // Skip test if provider doesn't support embeddings (e.g., ncompass with undefined endpoint)
                        if (config.providerName === "ncompass" && !config.customEmbeddingsUrl) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, runLlmTest({
                                llm: provider,
                                methodToTest: "embed",
                                params: [["Hello", "World"]],
                                expectedRequest: {
                                    url: config.customEmbeddingsUrl ||
                                        "".concat(config.defaultApiBase || "https://api.openai.com/v1/", "embeddings"),
                                    method: "POST",
                                    headers: config.customEmbeddingsHeaders || {
                                        Authorization: "Bearer test-api-key",
                                        "Content-Type": "application/json",
                                        "api-key": "test-api-key",
                                    },
                                    body: config.customEmbeddingsBody || {
                                        input: ["Hello", "World"],
                                        model: "text-embedding-ada-002",
                                    },
                                },
                                mockResponse: {
                                    data: [
                                        { embedding: [0.1, 0.2, 0.3] },
                                        { embedding: [0.4, 0.5, 0.6] },
                                    ],
                                },
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
};
exports.createOpenAISubclassTests = createOpenAISubclassTests;
