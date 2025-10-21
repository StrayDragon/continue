"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prevFilepaths = exports.openedFilesLruCache = void 0;
var quick_lru_1 = require("quick-lru");
// maximum number of open files that can be cached
var MAX_NUM_OPEN_CONTEXT_FILES = 20;
// stores which files are currently open in the IDE, in viewing order
exports.openedFilesLruCache = new quick_lru_1.default({
    maxSize: MAX_NUM_OPEN_CONTEXT_FILES,
});
// used in core/core.ts to handle removals from the cache
exports.prevFilepaths = {
    filepaths: [],
};
