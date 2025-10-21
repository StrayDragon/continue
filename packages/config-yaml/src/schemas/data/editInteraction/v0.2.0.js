"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editInteractionEventSchema_0_2_0_noCode = exports.editInteractionEventSchema_0_2_0 = void 0;
var index_js_1 = require("./index.js");
exports.editInteractionEventSchema_0_2_0 = index_js_1.editInteractionEventAllSchema.pick({
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
    filepath: true,
});
exports.editInteractionEventSchema_0_2_0_noCode = exports.editInteractionEventSchema_0_2_0.omit({
    prompt: true,
    completion: true,
});
