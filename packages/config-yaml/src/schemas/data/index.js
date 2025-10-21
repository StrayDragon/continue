"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.allDevEventNames = exports.devDataVersionedSchemas = exports.dataSchema = void 0;
var zod_1 = require("zod");
var models_js_1 = require("../models.js");
var index_js_1 = require("./autocomplete/index.js");
var v0_1_0_js_1 = require("./autocomplete/v0.1.0.js");
var v0_2_0_js_1 = require("./autocomplete/v0.2.0.js");
var index_js_2 = require("./chatFeedback/index.js");
var v0_1_0_js_2 = require("./chatFeedback/v0.1.0.js");
var v0_2_0_js_2 = require("./chatFeedback/v0.2.0.js");
var index_js_3 = require("./chatInteraction/index.js");
var v0_2_0_js_3 = require("./chatInteraction/v0.2.0.js");
var index_js_4 = require("./editInteraction/index.js");
var v0_2_0_js_4 = require("./editInteraction/v0.2.0.js");
var index_js_5 = require("./editOutcome/index.js");
var v0_2_0_js_5 = require("./editOutcome/v0.2.0.js");
var index_js_6 = require("./nextEditOutcome/index.js");
var v0_2_0_js_6 = require("./nextEditOutcome/v0.2.0.js");
var index_js_7 = require("./nextEditWithHistory/index.js");
var v0_2_0_js_7 = require("./nextEditWithHistory/v0.2.0.js");
var index_js_8 = require("./quickEdit/index.js");
var v0_1_0_js_3 = require("./quickEdit/v0.1.0.js");
var index_js_9 = require("./tokensGenerated/index.js");
var v0_1_0_js_4 = require("./tokensGenerated/v0.1.0.js");
var v0_2_0_js_8 = require("./tokensGenerated/v0.2.0.js");
var index_js_10 = require("./toolUsage/index.js");
var v0_2_0_js_9 = require("./toolUsage/v0.2.0.js");
var semverRegex = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9A-Za-z-][0-9A-Za-z-]*)(?:\.(?:0|[1-9A-Za-z-][0-9A-Za-z-]*))*))?(?:\+([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?$/;
var dataLevel = zod_1.z.union([zod_1.z.literal("all"), zod_1.z.literal("noCode")]);
exports.dataSchema = zod_1.z.object({
    name: zod_1.z.string(),
    destination: zod_1.z.string(),
    schema: zod_1.z.string().regex(semverRegex, {
        message: "Version must follow semver format, e.g. 0.2.0",
    }),
    level: dataLevel.optional(),
    events: zod_1.z.array(zod_1.z.string()).optional(), // Could do literals e.g. "autocomplete", "chat" but want to allow some flexibility later
    requestOptions: models_js_1.requestOptionsSchema.optional(),
    apiKey: zod_1.z.string().optional(),
});
// Schemas for data that the log function should have
// In order to build event bodies for ALL versions of an event
var devEventAllVersionDataSchemas = zod_1.z.object({
    autocomplete: index_js_1.autocompleteEventAllSchema,
    quickEdit: index_js_8.quickEditEventAllSchema,
    chatFeedback: index_js_2.chatFeedbackEventAllSchema,
    tokensGenerated: index_js_9.tokensGeneratedEventAllSchema,
    chatInteraction: index_js_3.chatInteractionEventAllSchema,
    editInteraction: index_js_4.editInteractionEventAllSchema,
    editOutcome: index_js_5.editOutcomeEventAllSchema,
    nextEditOutcome: index_js_6.nextEditOutcomeEventAllSchema,
    nextEditWithHistory: index_js_7.nextEditEventAllSchema,
    toolUsage: index_js_10.toolUsageEventAllSchema,
});
// Version and level specific schemas are organized here
exports.devDataVersionedSchemas = (_a = {},
    _a["0.1.0"] = {
        all: {
            autocomplete: v0_1_0_js_1.autocompleteEventSchema_0_1_0,
            quickEdit: v0_1_0_js_3.quickEditEventSchema_0_1_0,
            chatFeedback: v0_1_0_js_2.chatFeedbackEventSchema_0_1_0,
            tokensGenerated: v0_1_0_js_4.tokensGeneratedEventSchema_0_1_0,
        },
        noCode: {
            autocomplete: v0_1_0_js_1.autocompleteEventSchema_0_1_0_noCode,
            quickEdit: v0_1_0_js_3.quickEditEventSchema_0_1_0_noCode,
            chatFeedback: v0_1_0_js_2.chatFeedbackEventSchema_0_1_0_noCode,
            tokensGenerated: v0_1_0_js_4.tokensGeneratedEventSchema_0_1_0_noCode,
        },
    },
    _a["0.2.0"] = {
        all: {
            autocomplete: v0_2_0_js_1.autocompleteEventSchema_0_2_0,
            chatFeedback: v0_2_0_js_2.chatFeedbackEventSchema_0_2_0,
            tokensGenerated: v0_2_0_js_8.tokensGeneratedEventSchema_0_2_0,
            chatInteraction: v0_2_0_js_3.chatInteractionEventSchema_0_2_0,
            editInteraction: v0_2_0_js_4.editInteractionEventSchema_0_2_0,
            editOutcome: v0_2_0_js_5.editOutcomeEventSchema_0_2_0,
            nextEditOutcome: v0_2_0_js_6.nextEditOutcomeEventSchema_0_2_0,
            nextEditWithHistory: v0_2_0_js_7.nextEditEventSchema_0_2_0,
            toolUsage: v0_2_0_js_9.toolUsageEventSchema_0_2_0,
        },
        noCode: {
            autocomplete: v0_2_0_js_1.autocompleteEventSchema_0_2_0_noCode,
            chatFeedback: v0_2_0_js_2.chatFeedbackEventSchema_0_2_0_noCode,
            tokensGenerated: v0_2_0_js_8.tokensGeneratedEventSchema_0_2_0_noCode,
            chatInteraction: v0_2_0_js_3.chatInteractionEventSchema_0_2_0_noCode,
            editInteraction: v0_2_0_js_4.editInteractionEventSchema_0_2_0_noCode,
            editOutcome: v0_2_0_js_5.editOutcomeEventSchema_0_2_0_noCode,
            nextEditOutcome: v0_2_0_js_6.nextEditOutcomeEventSchema_0_2_0_noCode,
            nextEditWithHistory: v0_2_0_js_7.nextEditEventSchema_0_2_0_noCode,
            toolUsage: v0_2_0_js_9.toolUsageEventSchema_0_2_0_noCode,
        },
    },
    _a);
exports.allDevEventNames = Object.keys(devEventAllVersionDataSchemas.shape);
