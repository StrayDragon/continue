"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editInteractionEventAllSchema = void 0;
var zod_1 = require("zod");
var base_js_1 = require("../base.js");
/**
 * The "editInteraction" event is sent whenever the user submits an input in edit mode and the model's response is completed
 */
exports.editInteractionEventAllSchema = base_js_1.baseDevDataAllSchema.extend({
    modelProvider: zod_1.z.string(),
    modelName: zod_1.z.string(),
    modelTitle: zod_1.z.string(),
    prompt: zod_1.z.string(),
    completion: zod_1.z.string(),
    filepath: zod_1.z.string(),
});
