"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editOutcomeEventSchema_0_2_0_noCode = exports.editOutcomeEventSchema_0_2_0 = void 0;
var index_js_1 = require("./index.js");
exports.editOutcomeEventSchema_0_2_0 = index_js_1.editOutcomeEventAllSchema.pick({
    // base
    timestamp: true,
    userId: true,
    userAgent: true,
    selectedProfileId: true,
    eventName: true,
    schema: true,
    // other
    prompt: true,
    completion: true,
    modelName: true,
    modelTitle: true,
    modelProvider: true,
    accepted: true,
    previousCode: true,
    newCode: true,
    previousCodeLines: true,
    newCodeLines: true,
    lineChange: true,
    filepath: true,
});
exports.editOutcomeEventSchema_0_2_0_noCode = exports.editOutcomeEventSchema_0_2_0.omit({
    prompt: true,
    completion: true,
    previousCode: true,
    newCode: true,
});
