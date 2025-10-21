"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var url_1 = require("url");
var zod_to_json_schema_1 = require("zod-to-json-schema");
var index_js_1 = require("../schemas/index.js");
// Get the directory name of the current module
var __dirname = path_1.default.dirname((0, url_1.fileURLToPath)(import.meta.url));
// Convert Zod schema to JSON schema
var jsonSchema = (0, zod_to_json_schema_1.zodToJsonSchema)(index_js_1.configYamlSchema, {
    $refStrategy: "none",
    name: "ConfigYaml",
});
// Output directory and file path
var outDir = path_1.default.resolve(__dirname, "../../schema");
var outFile = path_1.default.join(outDir, "config-yaml-schema.json");
// Ensure output directory exists
if (!fs_1.default.existsSync(outDir)) {
    fs_1.default.mkdirSync(outDir, { recursive: true });
}
// Write the JSON schema to file
fs_1.default.writeFileSync(outFile, JSON.stringify(jsonSchema, null, 2));
console.log("JSON schema has been written to ".concat(outFile));
