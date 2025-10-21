"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokensGeneratedEventAllSchema = void 0;
var zod_1 = require("zod");
var base_js_1 = require("../base.js");
exports.tokensGeneratedEventAllSchema = base_js_1.baseDevDataAllSchema.extend({
    model: zod_1.z.string(),
    provider: zod_1.z.string(),
    promptTokens: zod_1.z.number(),
    generatedTokens: zod_1.z.number(),
});
