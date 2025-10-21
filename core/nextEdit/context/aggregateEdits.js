"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditAggregator = void 0;
var diffFormatting_1 = require("./diffFormatting");
var EditAggregator = /** @class */ (function () {
    function EditAggregator(config, onComparisonFinalized) {
        if (config === void 0) { config = {}; }
        if (onComparisonFinalized === void 0) { onComparisonFinalized = function () { }; }
        var _a, _b, _c, _d, _e, _f;
        this.fileStates = new Map();
        this.lastProcessedFilePath = null;
        this.config = {
            deltaT: (_a = config.deltaT) !== null && _a !== void 0 ? _a : 1.0,
            deltaL: (_b = config.deltaL) !== null && _b !== void 0 ? _b : 5,
            maxEdits: (_c = config.maxEdits) !== null && _c !== void 0 ? _c : 500,
            maxDuration: (_d = config.maxDuration) !== null && _d !== void 0 ? _d : 100.0,
            contextSize: (_e = config.contextSize) !== null && _e !== void 0 ? _e : 5,
            contextLines: (_f = config.contextLines) !== null && _f !== void 0 ? _f : 3,
        };
        this.onComparisonFinalized = onComparisonFinalized;
        this.previousEditFinalCursorPosition = { line: 0, character: 0 };
    }
    EditAggregator.getInstance = function (config, onComparisonFinalized) {
        var _a, _b, _c, _d, _e, _f;
        // Create instance if it doesn't exist
        if (!EditAggregator._instance) {
            EditAggregator._instance = new EditAggregator(config, onComparisonFinalized);
        }
        // Update instance if new parameters are provided
        else if (config || onComparisonFinalized) {
            if (config) {
                EditAggregator._instance.config = {
                    deltaT: (_a = config.deltaT) !== null && _a !== void 0 ? _a : EditAggregator._instance.config.deltaT,
                    deltaL: (_b = config.deltaL) !== null && _b !== void 0 ? _b : EditAggregator._instance.config.deltaL,
                    maxEdits: (_c = config.maxEdits) !== null && _c !== void 0 ? _c : EditAggregator._instance.config.maxEdits,
                    maxDuration: (_d = config.maxDuration) !== null && _d !== void 0 ? _d : EditAggregator._instance.config.maxDuration,
                    contextSize: (_e = config.contextSize) !== null && _e !== void 0 ? _e : EditAggregator._instance.config.contextSize,
                    contextLines: (_f = config.contextLines) !== null && _f !== void 0 ? _f : EditAggregator._instance.config.contextLines,
                };
            }
            if (onComparisonFinalized) {
                EditAggregator._instance.onComparisonFinalized = onComparisonFinalized;
            }
        }
        return EditAggregator._instance;
    };
    EditAggregator.prototype.processEdit = function (edit_1) {
        return __awaiter(this, arguments, void 0, function (edit, timestamp) {
            var filePath, fileState, task;
            var _this = this;
            if (timestamp === void 0) { timestamp = Date.now(); }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filePath = edit.filepath;
                        if (!(this.lastProcessedFilePath && this.lastProcessedFilePath !== filePath)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.finalizeClustersForFile(this.lastProcessedFilePath)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        // Update the last processed file path
                        this.lastProcessedFilePath = filePath;
                        if (!this.fileStates.has(filePath)) {
                            this.fileStates.set(filePath, {
                                activeClusters: [],
                                currentContent: edit.fileContents,
                                priorComparisons: [],
                                processingQueue: [],
                                isProcessing: false,
                            });
                        }
                        fileState = this.fileStates.get(filePath);
                        task = function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this._processEditInternal(edit, timestamp, fileState)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); };
                        fileState.processingQueue.push(task);
                        if (!fileState.isProcessing) {
                            void this._processQueue(filePath);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    EditAggregator.prototype._processQueue = function (filePath) {
        return __awaiter(this, void 0, void 0, function () {
            var fileState, tasks, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fileState = this.fileStates.get(filePath);
                        if (!fileState)
                            return [2 /*return*/];
                        fileState.isProcessing = true;
                        _a.label = 1;
                    case 1:
                        if (!(fileState.processingQueue.length > 0)) return [3 /*break*/, 8];
                        tasks = fileState.processingQueue.splice(0, 5);
                        if (!(tasks.length > 0)) return [3 /*break*/, 7];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, Promise.all(tasks.map(function (task) { return task(); }))];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        console.error("Error processing edits in ".concat(filePath, ":"), error_1);
                        return [3 /*break*/, 5];
                    case 5: 
                    // Yield to the event loop to prevent blocking
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 0); })];
                    case 6:
                        // Yield to the event loop to prevent blocking
                        _a.sent();
                        _a.label = 7;
                    case 7: return [3 /*break*/, 1];
                    case 8:
                        fileState.isProcessing = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    EditAggregator.prototype._processEditInternal = function (edit, timestamp, fileState) {
        return __awaiter(this, void 0, void 0, function () {
            var filePath, editLine, currentFileLines, clustersToFinalize, _i, clustersToFinalize_1, cluster, suitableCluster, potentialMinLine, potentialMaxLine, potentialLineSpan, isWhitespaceOnly, isStructuralEdit, additionalClustersToFinalize, _a, additionalClustersToFinalize_1, cluster;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        filePath = edit.filepath;
                        editLine = edit.range.start.line;
                        currentFileLines = fileState.currentContent.split("\n");
                        clustersToFinalize = this.identifyClustersToFinalize(fileState, edit, timestamp, false);
                        _i = 0, clustersToFinalize_1 = clustersToFinalize;
                        _b.label = 1;
                    case 1:
                        if (!(_i < clustersToFinalize_1.length)) return [3 /*break*/, 4];
                        cluster = clustersToFinalize_1[_i];
                        return [4 /*yield*/, this.finalizeCluster(filePath, cluster, fileState)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        suitableCluster = this.findSuitableCluster(fileState, editLine, timestamp);
                        if (!suitableCluster) return [3 /*break*/, 6];
                        potentialMinLine = Math.min(suitableCluster.currentRange.minLine, Math.max(0, editLine - this.config.contextLines));
                        potentialMaxLine = Math.max(suitableCluster.currentRange.maxLine, Math.min(currentFileLines.length - 1, editLine + this.config.contextLines));
                        potentialLineSpan = potentialMaxLine - potentialMinLine + 1;
                        if (!(potentialLineSpan > this.config.deltaL * 2)) return [3 /*break*/, 6];
                        // Auto-finalize the current cluster before creating a new one
                        return [4 /*yield*/, this.finalizeCluster(filePath, suitableCluster, fileState)];
                    case 5:
                        // Auto-finalize the current cluster before creating a new one
                        _b.sent();
                        suitableCluster = null;
                        _b.label = 6;
                    case 6:
                        // initialize a cluster
                        if (!suitableCluster) {
                            suitableCluster = {
                                beforeState: fileState.currentContent,
                                startRange: {
                                    minLine: Math.max(0, editLine - this.config.contextLines),
                                    maxLine: Math.min(currentFileLines.length - 1, editLine + this.config.contextLines),
                                },
                                currentRange: {
                                    minLine: Math.max(0, editLine - this.config.contextLines),
                                    maxLine: Math.min(currentFileLines.length - 1, editLine + this.config.contextLines),
                                },
                                edits: [],
                                firstTimestamp: timestamp,
                                lastTimestamp: timestamp,
                                lastLine: editLine,
                                firstEditBeforeCursor: edit.beforeCursorPos,
                                lastEditAfterCursor: edit.afterCursorPos,
                            };
                            fileState.activeClusters.push(suitableCluster);
                        }
                        suitableCluster.edits.push(edit);
                        suitableCluster.lastTimestamp = timestamp;
                        suitableCluster.lastLine = editLine;
                        suitableCluster.lastEditAfterCursor = edit.afterCursorPos;
                        isWhitespaceOnly = this.isWhitespaceOnlyEdit(edit, fileState.currentContent);
                        if (!isWhitespaceOnly) {
                            suitableCluster.currentRange.minLine = Math.min(suitableCluster.currentRange.minLine, Math.max(0, editLine - this.config.contextLines));
                            suitableCluster.currentRange.maxLine = Math.max(suitableCluster.currentRange.maxLine, Math.min(currentFileLines.length - 1, editLine + this.config.contextLines));
                        }
                        fileState.currentContent = edit.fileContents;
                        isStructuralEdit = edit.editText.includes("\n") ||
                            edit.range.start.line !== edit.range.end.line;
                        if (!isStructuralEdit) return [3 /*break*/, 10];
                        additionalClustersToFinalize = fileState.activeClusters.filter(function (c) {
                            return c !== suitableCluster && _this.clustersOverlap(c, suitableCluster);
                        });
                        _a = 0, additionalClustersToFinalize_1 = additionalClustersToFinalize;
                        _b.label = 7;
                    case 7:
                        if (!(_a < additionalClustersToFinalize_1.length)) return [3 /*break*/, 10];
                        cluster = additionalClustersToFinalize_1[_a];
                        return [4 /*yield*/, this.finalizeCluster(filePath, cluster, fileState)];
                    case 8:
                        _b.sent();
                        _b.label = 9;
                    case 9:
                        _a++;
                        return [3 /*break*/, 7];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    EditAggregator.prototype.isWhitespaceOnlyEdit = function (edit, currentContent) {
        var lines = currentContent.split("\n");
        var line = edit.range.start.line;
        if (line >= lines.length)
            return false;
        if (edit.range.start.line === edit.range.end.line) {
            var beforeEdit = lines[line];
            var afterEdit = beforeEdit.substring(0, edit.range.start.character) +
                edit.editText +
                beforeEdit.substring(edit.range.end.character);
            return beforeEdit.trim() === afterEdit.trim();
        }
        return false;
    };
    EditAggregator.prototype.clustersOverlap = function (cluster1, cluster2) {
        return (cluster1.currentRange.minLine <=
            cluster2.currentRange.maxLine + this.config.deltaL &&
            cluster1.currentRange.maxLine >=
                cluster2.currentRange.minLine - this.config.deltaL);
    };
    EditAggregator.prototype.processEdits = function (edits) {
        return __awaiter(this, void 0, void 0, function () {
            var timestamp, _i, edits_1, edit;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        timestamp = Date.now();
                        if (!(this.getProcessingQueueSize() > 50)) return [3 /*break*/, 3];
                        if (!(edits.length > 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.processEdit(edits[edits.length - 1], timestamp)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                    case 3:
                        _i = 0, edits_1 = edits;
                        _a.label = 4;
                    case 4:
                        if (!(_i < edits_1.length)) return [3 /*break*/, 7];
                        edit = edits_1[_i];
                        return [4 /*yield*/, this.processEdit(edit, timestamp)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 4];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Finalizes all clusters for a specific file
     */
    EditAggregator.prototype.finalizeClustersForFile = function (filePath) {
        return __awaiter(this, void 0, void 0, function () {
            var fileState, clustersToFinalize, _i, clustersToFinalize_2, cluster;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fileState = this.fileStates.get(filePath);
                        if (!fileState)
                            return [2 /*return*/];
                        clustersToFinalize = __spreadArray([], fileState.activeClusters, true);
                        _i = 0, clustersToFinalize_2 = clustersToFinalize;
                        _a.label = 1;
                    case 1:
                        if (!(_i < clustersToFinalize_2.length)) return [3 /*break*/, 4];
                        cluster = clustersToFinalize_2[_i];
                        return [4 /*yield*/, this.finalizeCluster(filePath, cluster, fileState)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    EditAggregator.prototype.finalizeAllClusters = function () {
        return __awaiter(this, void 0, void 0, function () {
            var filePromises;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filePromises = [];
                        this.fileStates.forEach(function (fileState, filePath) {
                            var filePromise = _this.finalizeClustersForFile(filePath);
                            filePromises.push(filePromise);
                        });
                        return [4 /*yield*/, Promise.all(filePromises)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    EditAggregator.prototype.findSuitableCluster = function (fileState, editLine, timestamp) {
        var activeClusters = __spreadArray([], fileState.activeClusters, true);
        for (var _i = 0, activeClusters_1 = activeClusters; _i < activeClusters_1.length; _i++) {
            var cluster = activeClusters_1[_i];
            // If we're outside the line range but within the time window,
            // we should finalize the current cluster
            var isOutsideLineRange = editLine < cluster.currentRange.minLine - this.config.deltaL ||
                editLine > cluster.currentRange.maxLine + this.config.deltaL;
            var isWithinTimeWindow = (timestamp - cluster.lastTimestamp) / 1000 <= this.config.deltaT;
            // If user quickly jumped far away, finalize this cluster before continuing
            if (isOutsideLineRange && isWithinTimeWindow) {
                void this.finalizeCluster(cluster.edits[0].filepath, cluster, fileState);
            }
        }
        // Now look for a suitable cluster for the new edit
        for (var _a = 0, _b = fileState.activeClusters; _a < _b.length; _a++) {
            var cluster = _b[_a];
            var isOnSameLine = editLine === cluster.lastLine;
            var isWithinTimeWindow = (timestamp - cluster.lastTimestamp) / 1000 <= this.config.deltaT;
            var isWithinLineRange = editLine >= cluster.currentRange.minLine - this.config.deltaL &&
                editLine <= cluster.currentRange.maxLine + this.config.deltaL;
            var isWithinEditLimit = cluster.edits.length < this.config.maxEdits;
            var isWithinDurationLimit = (timestamp - cluster.firstTimestamp) / 1000 <= this.config.maxDuration;
            if ((isOnSameLine || (isWithinTimeWindow && isWithinLineRange)) &&
                isWithinEditLimit &&
                isWithinDurationLimit) {
                return cluster;
            }
        }
        return null;
    };
    EditAggregator.prototype.identifyClustersToFinalize = function (fileState, edit, timestamp, isStructuralEdit) {
        var _this = this;
        var clustersToFinalize = [];
        var editLine = edit.range.start.line;
        fileState.activeClusters.forEach(function (cluster) {
            var timeSinceLastEdit = (timestamp - cluster.lastTimestamp) / 1000;
            var isOnDifferentLineByNumber = cluster.lastLine !== editLine;
            var isOnDifferentLineByNewline = edit.editText.includes("\n");
            // Use different time thresholds for different types of line change detection
            var shouldFinalizeByLineNumber = isOnDifferentLineByNumber && timeSinceLastEdit > _this.config.deltaT;
            var shouldFinalizeByNewline = isOnDifferentLineByNewline &&
                timeSinceLastEdit > _this.config.deltaT * 1.5;
            // Finalize if we moved to a different line AND the time gap exceeds the respective threshold
            var shouldFinalizeByTime = shouldFinalizeByLineNumber || shouldFinalizeByNewline;
            var shouldFinalizeByCount = cluster.edits.length >= _this.config.maxEdits;
            var shouldFinalizeByDuration = (timestamp - cluster.firstTimestamp) / 1000 > _this.config.maxDuration;
            // For structural edits, use the combined line detection
            var isOnDifferentLine = isOnDifferentLineByNumber || isOnDifferentLineByNewline;
            var shouldFinalizeByStructuralEdit = isStructuralEdit && isOnDifferentLine;
            if (shouldFinalizeByTime ||
                shouldFinalizeByCount ||
                shouldFinalizeByDuration ||
                shouldFinalizeByStructuralEdit) {
                clustersToFinalize.push(cluster);
            }
        });
        return clustersToFinalize;
    };
    EditAggregator.prototype.finalizeCluster = function (filePath, cluster, fileState) {
        return __awaiter(this, void 0, void 0, function () {
            var beforeContent, afterContent, isWhitespaceOnlyDiff, diff, changedLineCount, fullFileVersionsDiff;
            return __generator(this, function (_a) {
                beforeContent = cluster.beforeState;
                afterContent = fileState.currentContent;
                isWhitespaceOnlyDiff = beforeContent.replace(/\s+/g, "") === afterContent.replace(/\s+/g, "");
                if (isWhitespaceOnlyDiff) {
                    fileState.activeClusters = fileState.activeClusters.filter(function (c) { return c !== cluster; });
                    return [2 /*return*/];
                }
                diff = (0, diffFormatting_1.createDiff)({
                    beforeContent: beforeContent,
                    afterContent: afterContent,
                    filePath: filePath,
                    diffType: diffFormatting_1.DiffFormatType.Unified,
                    contextLines: 3,
                });
                changedLineCount = this.countChangedLines(diff);
                if (changedLineCount > this.config.deltaL * 2) {
                    fileState.activeClusters = fileState.activeClusters.filter(function (c) { return c !== cluster; });
                    return [2 /*return*/];
                }
                fileState.priorComparisons.push(diff);
                if (fileState.priorComparisons.length > this.config.contextSize) {
                    fileState.priorComparisons.shift();
                }
                fileState.activeClusters = fileState.activeClusters.filter(function (c) { return c !== cluster; });
                fullFileVersionsDiff = (0, diffFormatting_1.createBeforeAfterDiff)(beforeContent, afterContent, filePath);
                // Store this cluster's final cursor position for future reference
                this.previousEditFinalCursorPosition = cluster.lastEditAfterCursor;
                this.onComparisonFinalized(fullFileVersionsDiff, cluster.firstEditBeforeCursor, this.previousEditFinalCursorPosition);
                return [2 /*return*/];
            });
        });
    };
    EditAggregator.prototype.countChangedLines = function (diff) {
        var count = 0;
        var addedLines = new Set();
        var removedLines = new Set();
        // Parse the diff lines
        var lines = diff.split("\n");
        for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
            var line = lines_1[_i];
            if (line.startsWith("+++ ") ||
                line.startsWith("--- ") ||
                line.startsWith("@@")) {
                continue; // Skip header lines
            }
            if (line.startsWith("+")) {
                addedLines.add(count);
                count++;
            }
            else if (line.startsWith("-")) {
                removedLines.add(count);
                count++;
            }
        }
        return Math.max(addedLines.size, removedLines.size);
    };
    EditAggregator.prototype.getActiveClusterCount = function () {
        var count = 0;
        this.fileStates.forEach(function (fileState) {
            count += fileState.activeClusters.length;
        });
        return count;
    };
    EditAggregator.prototype.getProcessingQueueSize = function () {
        var count = 0;
        this.fileStates.forEach(function (fileState) {
            count += fileState.processingQueue.length;
        });
        return count;
    };
    EditAggregator.prototype.resetState = function () {
        this.fileStates.clear();
        this.lastProcessedFilePath = null;
    };
    EditAggregator._instance = null;
    return EditAggregator;
}());
exports.EditAggregator = EditAggregator;
