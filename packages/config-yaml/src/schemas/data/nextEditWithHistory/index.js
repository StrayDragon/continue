"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nextEditEventAllSchema = void 0;
var zod_1 = require("zod");
var base_js_1 = require("../base.js");
exports.nextEditEventAllSchema = base_js_1.baseDevDataAllSchema.extend({
    previousEdits: zod_1.z.array(zod_1.z.object({
        filename: zod_1.z.string(),
        diff: zod_1.z.string(),
    })),
    fileURI: zod_1.z.string(),
    workspaceDirURI: zod_1.z.string(),
    beforeContent: zod_1.z.string(),
    afterContent: zod_1.z.string(),
    beforeCursorPos: zod_1.z.object({ line: zod_1.z.number(), character: zod_1.z.number() }),
    afterCursorPos: zod_1.z.object({ line: zod_1.z.number(), character: zod_1.z.number() }),
    context: zod_1.z.string(),
    modelProvider: zod_1.z.string(),
    modelName: zod_1.z.string(),
    modelTitle: zod_1.z.string(),
});
