"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokensGeneratedEventSchema_0_1_0_noCode = exports.tokensGeneratedEventSchema_0_1_0 = void 0;
var index_js_1 = require("./index.js");
exports.tokensGeneratedEventSchema_0_1_0 = index_js_1.tokensGeneratedEventAllSchema.pick({
    model: true,
    provider: true,
    promptTokens: true,
    generatedTokens: true,
});
exports.tokensGeneratedEventSchema_0_1_0_noCode = exports.tokensGeneratedEventSchema_0_1_0;
