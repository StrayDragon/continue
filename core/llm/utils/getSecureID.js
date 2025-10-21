"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSecureID = getSecureID;
var uuid_1 = require("uuid");
// Utility function to get or generate UUID for LLM prompts
function getSecureID() {
    // Adding a type declaration for the static property
    if (!getSecureID.uuid) {
        getSecureID.uuid = (0, uuid_1.v4)();
    }
    return "<!-- SID: ".concat(getSecureID.uuid, " -->");
}
