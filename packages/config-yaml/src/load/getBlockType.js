"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blockTypeSchema = exports.BLOCK_TYPES = void 0;
exports.getBlockType = getBlockType;
var zod_1 = require("zod");
exports.BLOCK_TYPES = [
    "models",
    "context",
    "data",
    "mcpServers",
    "rules",
    "prompts",
    "docs",
];
exports.blockTypeSchema = zod_1.z.enum(exports.BLOCK_TYPES);
function getBlockType(block) {
    var _a, _b, _c, _d, _e, _f, _g;
    if ((_a = block.context) === null || _a === void 0 ? void 0 : _a.length) {
        return "context";
    }
    else if ((_b = block.models) === null || _b === void 0 ? void 0 : _b.length) {
        return "models";
    }
    else if ((_c = block.docs) === null || _c === void 0 ? void 0 : _c.length) {
        return "docs";
    }
    else if ((_d = block.mcpServers) === null || _d === void 0 ? void 0 : _d.length) {
        return "mcpServers";
    }
    else if ((_e = block.data) === null || _e === void 0 ? void 0 : _e.length) {
        return "data";
    }
    else if ((_f = block.rules) === null || _f === void 0 ? void 0 : _f.length) {
        return "rules";
    }
    else if ((_g = block.prompts) === null || _g === void 0 ? void 0 : _g.length) {
        return "prompts";
    }
    else {
        return undefined;
    }
}
