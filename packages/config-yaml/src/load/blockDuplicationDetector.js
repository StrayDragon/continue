"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockDuplicationDetector = void 0;
var getBlockType_js_1 = require("./getBlockType.js");
var BlockDuplicationDetector = /** @class */ (function () {
    function BlockDuplicationDetector() {
        this.records = new Map();
        for (var _i = 0, BLOCK_TYPES_1 = getBlockType_js_1.BLOCK_TYPES; _i < BLOCK_TYPES_1.length; _i++) {
            var blockType = BLOCK_TYPES_1[_i];
            this.records.set(blockType, new Set());
        }
    }
    BlockDuplicationDetector.prototype.isRuleDuplicated = function (rule) {
        if (typeof rule === "string") {
            return this.check(rule, "rules");
        }
        else {
            return this.check(rule.name, "rules");
        }
    };
    BlockDuplicationDetector.prototype.isContextDuplicated = function (context) {
        return this.check(context.provider, "context");
    };
    BlockDuplicationDetector.prototype.isCommonBlockDuplicated = function (block, blockType) {
        return this.check(block.name, blockType);
    };
    BlockDuplicationDetector.prototype.check = function (identifier, blockType) {
        if (this.records.get(blockType).has(identifier)) {
            return true;
        }
        else {
            this.records.get(blockType).add(identifier);
            return false;
        }
    };
    // Check if the name is duplicated within the same blockType
    BlockDuplicationDetector.prototype.isDuplicated = function (block, blockType) {
        // Not checking any null or undefined object
        if (block === null || block === undefined) {
            return false;
        }
        switch (blockType) {
            case "rules":
                if (this.isRuleDuplicated(block)) {
                    return true;
                }
                return false;
            case "context":
                if (this.isContextDuplicated(block)) {
                    return true;
                }
                return false;
            default:
                if (this.isCommonBlockDuplicated(block, blockType)) {
                    return true;
                }
                return false;
        }
    };
    return BlockDuplicationDetector;
}());
exports.BlockDuplicationDetector = BlockDuplicationDetector;
