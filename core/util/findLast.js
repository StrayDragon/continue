"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findLastIndex = findLastIndex;
exports.findLast = findLast;
function findLastIndex(arr, criterion) {
    var lastIndex = -1;
    for (var i = arr.length - 1; i >= 0; i--) {
        if (criterion(arr[i])) {
            lastIndex = i;
            break;
        }
    }
    return lastIndex;
}
function findLast(arr, criterion) {
    for (var i = arr.length - 1; i >= 0; i--) {
        if (criterion(arr[i])) {
            return arr[i];
        }
    }
}
