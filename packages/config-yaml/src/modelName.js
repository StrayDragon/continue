"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseProxyModelName = parseProxyModelName;
function parseProxyModelName(modelName) {
    var parts = modelName.split("/");
    var ownerSlug = parts[0], packageSlug = parts[1], provider = parts[2], modelParts = parts.slice(3);
    var model = modelParts.join("/");
    if (!provider || !model) {
        throw new Error("Invalid model format");
    }
    return { provider: provider, model: model, ownerSlug: ownerSlug, packageSlug: packageSlug };
}
