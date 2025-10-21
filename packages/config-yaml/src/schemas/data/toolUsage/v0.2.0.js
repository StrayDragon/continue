"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toolUsageEventSchema_0_2_0_noCode = exports.toolUsageEventSchema_0_2_0 = void 0;
var index_js_1 = require("./index.js");
exports.toolUsageEventSchema_0_2_0 = index_js_1.toolUsageEventAllSchema.pick({
    // base
    timestamp: true,
    userId: true,
    userAgent: true,
    selectedProfileId: true,
    eventName: true,
    schema: true,
    // tool-usage-specific
    toolCallId: true,
    functionName: true,
    functionParams: true,
    toolCallArgs: true,
    accepted: true,
    succeeded: true,
    output: true,
});
exports.toolUsageEventSchema_0_2_0_noCode = exports.toolUsageEventSchema_0_2_0.omit({
    functionParams: true,
    toolCallArgs: true,
    output: true,
});
