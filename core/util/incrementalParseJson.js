"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.incrementalParseJson = incrementalParseJson;
var partial_json_1 = require("partial-json");
function incrementalParseJson(raw) {
    try {
        return [true, JSON.parse(raw)];
    }
    catch (e) {
        try {
            return [false, (0, partial_json_1.parse)(raw)];
        }
        catch (e2) {
            return [false, {}];
        }
    }
}
