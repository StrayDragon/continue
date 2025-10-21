"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrevEditsDescending = exports.setPrevEdit = exports.prevEditLruCache = void 0;
var quick_lru_1 = require("quick-lru");
var maxPrevEdits = 5;
exports.prevEditLruCache = new quick_lru_1.default({
    maxSize: maxPrevEdits,
});
var setPrevEdit = function (edit) {
    var uniqueSuffix = Math.random().toString(36).substring(2, 8);
    var key = "".concat(edit.fileUri, ":").concat(edit.timestamp, ":").concat(uniqueSuffix);
    exports.prevEditLruCache.set(key, edit);
};
exports.setPrevEdit = setPrevEdit;
var getPrevEditsDescending = function () {
    var edits = [];
    for (var _i = 0, _a = exports.prevEditLruCache.entriesDescending(); _i < _a.length; _i++) {
        var _b = _a[_i], _ = _b[0], edit = _b[1];
        if (edits.length >= maxPrevEdits) {
            break;
        }
        edits.push(edit);
    }
    return edits;
};
exports.getPrevEditsDescending = getPrevEditsDescending;
