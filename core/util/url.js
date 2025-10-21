"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.canParseUrl = canParseUrl;
function canParseUrl(url) {
    if (URL === null || URL === void 0 ? void 0 : URL.canParse) {
        return URL.canParse(url);
    }
    try {
        new URL(url);
        return true;
    }
    catch (e) {
        return false;
    }
}
