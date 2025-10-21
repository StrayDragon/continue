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
Object.defineProperty(exports, "__esModule", { value: true });
exports.editOutcomeTracker = void 0;
var EditOutcomeTracker = /** @class */ (function () {
    function EditOutcomeTracker() {
        this.pendingEdits = new Map();
    }
    EditOutcomeTracker.getInstance = function () {
        if (!EditOutcomeTracker.instance) {
            EditOutcomeTracker.instance = new EditOutcomeTracker();
        }
        return EditOutcomeTracker.instance;
    };
    /**
     * Store a pending edit interaction for later outcome tracking
     */
    EditOutcomeTracker.prototype.trackEditInteraction = function (data) {
        this.pendingEdits.set(data.streamId, data);
    };
    /**
     * Record the outcome of an edit interaction and emit the editOutcome event
     */
    EditOutcomeTracker.prototype.recordEditOutcome = function (streamId, accepted, dataLogger) {
        return __awaiter(this, void 0, void 0, function () {
            var pendingEdit;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pendingEdit = this.pendingEdits.get(streamId);
                        if (!pendingEdit) {
                            console.warn("No pending edit found for streamId: ".concat(streamId));
                            return [2 /*return*/];
                        }
                        // Emit the editOutcome event
                        return [4 /*yield*/, dataLogger.logDevData({
                                name: "editOutcome",
                                data: {
                                    modelProvider: pendingEdit.modelProvider,
                                    modelName: pendingEdit.modelName,
                                    modelTitle: pendingEdit.modelName,
                                    prompt: pendingEdit.prompt,
                                    completion: pendingEdit.completion,
                                    previousCode: pendingEdit.previousCode,
                                    newCode: pendingEdit.newCode,
                                    previousCodeLines: pendingEdit.previousCodeLines,
                                    newCodeLines: pendingEdit.newCodeLines,
                                    lineChange: pendingEdit.lineChange,
                                    accepted: accepted,
                                    filepath: pendingEdit.filepath,
                                },
                            })];
                    case 1:
                        // Emit the editOutcome event
                        _a.sent();
                        // Clean up the pending edit
                        this.pendingEdits.delete(streamId);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Clean up pending edits that might have been abandoned
     */
    EditOutcomeTracker.prototype.cleanupOldPendingEdits = function (maxAgeMs) {
        if (maxAgeMs === void 0) { maxAgeMs = 30 * 60 * 1000; }
        var now = Date.now();
        for (var _i = 0, _a = this.pendingEdits.entries(); _i < _a.length; _i++) {
            var _b = _a[_i], streamId = _b[0], edit = _b[1];
            var editTime = new Date(edit.timestamp).getTime();
            if (now - editTime > maxAgeMs) {
                this.pendingEdits.delete(streamId);
            }
        }
    };
    /**
     * Get count of pending edits (for debugging/monitoring)
     */
    EditOutcomeTracker.prototype.getPendingEditCount = function () {
        return this.pendingEdits.size;
    };
    return EditOutcomeTracker;
}());
exports.editOutcomeTracker = EditOutcomeTracker.getInstance();
