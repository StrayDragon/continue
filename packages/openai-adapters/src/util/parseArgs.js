"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeParseArgs = safeParseArgs;
function safeParseArgs(args, errorId) {
    try {
        return JSON.parse((args === null || args === void 0 ? void 0 : args.trim()) || "{}");
    }
    catch (e) {
        var identifier = errorId ? "Call: ".concat(errorId, "\nArgs:").concat(args, "\n") : "";
        console.error("Failed to parse tool call arguments\n".concat(identifier, "Error:"), e);
        return {};
    }
}
