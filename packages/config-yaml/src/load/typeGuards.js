"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBlockItemWrapper = void 0;
var z = require("zod");
var index_js_1 = require("../schemas/index.js");
var isBlockItemWrapper = function (block) {
    var baseSchema = z.object({});
    var schema = (0, index_js_1.blockItemWrapperSchema)(baseSchema);
    return schema.safeParse(block).success;
};
exports.isBlockItemWrapper = isBlockItemWrapper;
