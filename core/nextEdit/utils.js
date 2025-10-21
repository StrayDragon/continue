"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNextEditTest = isNextEditTest;
exports.isWhitespaceOnlyDeletion = isWhitespaceOnlyDeletion;
exports.convertNextEditModelNameToEnum = convertNextEditModelNameToEnum;
var constants_1 = require("../llm/constants");
function isNextEditTest() {
    var enabled = process.env.NEXT_EDIT_TEST_ENABLED;
    if (enabled === "false") {
        return false;
    }
    if (enabled === "true") {
        return true;
    }
    return false;
}
function isWhitespaceOnlyDeletion(diffLines) {
    return diffLines.every(function (diff) {
        return diff.type === "old" &&
            (diff.line.trim() === "" || /^\s+$/.test(diff.line));
    });
}
function convertNextEditModelNameToEnum(modelName) {
    var nextEditModels = Object.values(constants_1.NEXT_EDIT_MODELS);
    return nextEditModels.find(function (model) { return modelName.includes(model); });
}
