"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quickEditEventSchema_0_1_0_noCode = exports.quickEditEventSchema_0_1_0 = void 0;
var index_js_1 = require("./index.js");
exports.quickEditEventSchema_0_1_0 = index_js_1.quickEditEventAllSchema.pick({
    prompt: true,
    path: true,
    label: true,
    diffs: true,
    model: true,
});
exports.quickEditEventSchema_0_1_0_noCode = exports.quickEditEventSchema_0_1_0.omit({
    prompt: true,
    path: true,
    diffs: true,
});
