"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ollama = void 0;
var os_js_1 = require("./os.js");
exports.Ollama = {
    models: os_js_1.OsLlms,
    id: "ollama",
    displayName: "Ollama",
};
