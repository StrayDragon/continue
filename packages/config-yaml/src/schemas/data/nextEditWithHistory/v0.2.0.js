"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nextEditEventSchema_0_2_0_noCode = exports.nextEditEventSchema_0_2_0 = void 0;
var index_js_1 = require("./index.js");
exports.nextEditEventSchema_0_2_0 = index_js_1.nextEditEventAllSchema.pick({
    // base
    timestamp: true,
    userId: true,
    userAgent: true,
    selectedProfileId: true,
    eventName: true,
    schema: true,
    // nextedit-specific
    previousEdits: true,
    fileURI: true,
    workspaceDirURI: true,
    beforeContent: true,
    afterContent: true,
    beforeCursorPos: true,
    afterCursorPos: true,
    context: true,
    modelProvider: true,
    modelName: true,
    modelTitle: true,
});
exports.nextEditEventSchema_0_2_0_noCode = exports.nextEditEventSchema_0_2_0.omit({
    previousEdits: true,
    fileURI: true,
    workspaceDirURI: true,
    beforeContent: true,
    afterContent: true,
    context: true,
});
