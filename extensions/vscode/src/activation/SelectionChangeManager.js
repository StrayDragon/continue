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
exports.SelectionChangeManager = exports.HandlerPriority = void 0;
var NextEditEditableRegionCalculator_1 = require("core/nextEdit/NextEditEditableRegionCalculator");
var NextEditPrefetchQueue_1 = require("core/nextEdit/NextEditPrefetchQueue");
var NextEditProvider_1 = require("core/nextEdit/NextEditProvider");
var pathToUri_1 = require("core/util/pathToUri");
var JumpManager_1 = require("./JumpManager");
var NextEditWindowManager_1 = require("./NextEditWindowManager");
var HandlerPriority;
(function (HandlerPriority) {
    HandlerPriority[HandlerPriority["CRITICAL"] = 5] = "CRITICAL";
    HandlerPriority[HandlerPriority["HIGH"] = 4] = "HIGH";
    HandlerPriority[HandlerPriority["NORMAL"] = 3] = "NORMAL";
    HandlerPriority[HandlerPriority["LOW"] = 2] = "LOW";
    HandlerPriority[HandlerPriority["FALLBACK"] = 1] = "FALLBACK";
})(HandlerPriority || (exports.HandlerPriority = HandlerPriority = {}));
/**
 * SelectionChangeManager handles cursor movement events in a coordinated way
 * to prevent race conditions and ensure consistent behavior across features.
 *
 * Case 1: User just moves the cursor around.
 * - vscode fires onDidChangeTextEditorSelection.
 * - State is captured. All fields in StateSnapshot are false.
 * - All registered handlers return false.
 * - Fallback handler runs, deleting the chain.
 *
 * Case 2: User accepts a next edit suggestion from a window.
 * - vscode fires onDidChangeTextEditorSelection.
 * - State is captured. nextEditWindowAccepted is true.
 * - NextEditWindowManager's handler returns true.
 * - No other handlers run, and edit chain is preserved.
 *
 * Case 3: User accepts a next edit suggestion from a ghost text.
 * - vscode fires onDidChangeTextEditorSelection.
 * - State is captured with document and cursorPosition.
 * - GhostTextTracker's handler checks if ghost text was accepted at that position.
 * - If accepted, handler returns true and edit chain is preserved.
 *
 * Case 4: User is actively typing code.
 * - Each keystroke triggers documentChanged() to update lastDocumentChangeTime.
 * - When cursor moves due to typing, onDidChangeTextEditorSelection fires.
 * - State is captured with isTypingSession=true and recent lastDocumentChangeTime.
 * - Typing session handler detects time since last edit is < TYPING_DELAY.
 * - Handler returns true, preserving the edit chain during typing.
 *
 * Case 5: User performs a jump operation.
 * - Jump is initiated, setting jumpInProgress to true.
 * - When cursor position changes due to jump, onDidChangeTextEditorSelection fires.
 * - State is captured with jumpInProgress=true.
 * - JumpManager's handler returns true, preserving the edit chain.
 *
 * Case 6: User just completed a jump operation.
 * - Jump completes, setting jumpJustAccepted to true.
 * - onDidChangeTextEditorSelection fires for the final position.
 * - State is captured with jumpJustAccepted=true.
 * - JumpManager's handler returns true, preserving the edit chain.
 *
 * Case 7: Rapid cursor movements (debouncing).
 * - User rapidly moves cursor (e.g., holding an arrow key).
 * - Multiple onDidChangeTextEditorSelection events fire in quick succession.
 * - Events within DEBOUNCE_DELAY of each other are queued.
 * - Only the most recent event in a rapid sequence gets processed.
 * - Prevents performance issues from too many events.
 *
 * Case 8: Event processing timeout.
 * - An event handler takes longer than PROCESSING_TIMEOUT.
 * - The timeout promise resolves first, throwing an error.
 * - Error is caught, processing state is reset to prevent deadlocks.
 * - System can continue processing the next event.
 * - NOTE: At the current moment, there should not be any deadlocks, but I'm just making sure.
 *
 * Case 9: Error in handler.
 * - One of the handlers throws an exception.
 * - The error is caught and logged.
 * - Processing continues with the next handler rather than failing completely.
 * - Ensures stability even when individual handlers have problems.
 *
 * Case 10: Multiple queued events.
 * - An event is being processed when new events arrive.
 * - New events are added to eventQueue.
 * - After current event is processed, queued events are handled sequentially.
 * - Ensures all events are processed in the order they were received.
 * - NOTE: I'm not sure if we even want to queue these events...
 *
 * Case n: Other cases that I didn't catch.
 */
var SelectionChangeManager = /** @class */ (function () {
    function SelectionChangeManager() {
        this.listeners = [];
        this.ide = null;
        this.usingFullFileDiff = true;
        // Event bus-related attributes.
        this.eventQueue = [];
        this.lastEventTime = 0;
        this.isProcessingEvent = false;
        this.processingTimeout = null;
        // Debounce settings.
        this.DEBOUNCE_DELAY = 50;
        this.PROCESSING_TIMEOUT = 500;
        // Track typing session state.
        this.isTypingSession = false;
        this.typingTimer = null;
        this.lastDocumentChangeTime = 0;
        this.TYPING_SESSION_TIMEOUT = 2000; // ms
    }
    SelectionChangeManager.getInstance = function () {
        if (!SelectionChangeManager.instance) {
            SelectionChangeManager.instance = new SelectionChangeManager();
        }
        return SelectionChangeManager.instance;
    };
    SelectionChangeManager.prototype.initialize = function (ide, usingFullFileDiff) {
        this.ide = ide;
        this.usingFullFileDiff = usingFullFileDiff;
        // After handling all other listeners, this will delete the chain.
        this.registerListener("defaultFallbackHandler", this.defaultFallbackHandler.bind(this), HandlerPriority.FALLBACK);
    };
    /**
     * Updates this class's usingFullFileDiff flag.
     * @param usingFullFileDiff New value to set.
     */
    SelectionChangeManager.prototype.updateUsingFullFileDiff = function (usingFullFileDiff) {
        this.usingFullFileDiff = usingFullFileDiff;
    };
    SelectionChangeManager.prototype.documentChanged = function () {
        this.isTypingSession = true;
        this.lastDocumentChangeTime = Date.now();
        this.resetTypingSession();
    };
    SelectionChangeManager.prototype.resetTypingSession = function () {
        var _this = this;
        if (this.typingTimer) {
            clearTimeout(this.typingTimer);
        }
        this.typingTimer = setTimeout(function () {
            _this.isTypingSession = false;
        }, this.TYPING_SESSION_TIMEOUT);
    };
    /**
     * Register a listener for the selection change event.
     * @param id Unique id for this handler.
     * @param handler Function to handle the event.
     * @param priority Higher priority runs first.
     * @returns Function to unregister this listener.
     */
    SelectionChangeManager.prototype.registerListener = function (id, handler, priority) {
        var _this = this;
        if (priority === void 0) { priority = HandlerPriority.NORMAL; }
        // Remove any existing handler with the same id.
        this.listeners = this.listeners.filter(function (l) { return l.id !== id; });
        // Add the new handler.
        this.listeners.push({ id: id, priority: priority, handler: handler });
        // Sort by desc priority.
        this.listeners.sort(function (a, b) { return b.priority - a.priority; });
        // Return the unregister function.
        return function () {
            _this.listeners = _this.listeners.filter(function (l) { return l.id !== id; });
        };
    };
    /**
     * Handle a given selection change event.
     * @param e THe selection change event.
     */
    SelectionChangeManager.prototype.handleSelectionChange = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var now, nextEvent, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        now = Date.now();
                        // Simple debouncing logic.
                        // Ignore events that come too quickly after the previous one.
                        // TODO: test this.
                        if (now - this.lastEventTime < this.DEBOUNCE_DELAY) {
                            // Replace the queued event with the most recent one.
                            if (this.eventQueue.length > 0) {
                                this.eventQueue[this.eventQueue.length - 1] = e;
                            }
                            else {
                                this.eventQueue.push(e);
                            }
                            return [2 /*return*/];
                        }
                        this.lastEventTime = now;
                        // Queue this event for later if the manager is already processing an event.
                        // NOTE: Depending on if we want an event bus or not, do an early return instead.
                        if (this.isProcessingEvent) {
                            this.eventQueue.push(e);
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        // Process this event first.
                        return [4 /*yield*/, this.processEventWithTimeout(e)];
                    case 2:
                        // Process this event first.
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        if (!(this.eventQueue.length > 0)) return [3 /*break*/, 5];
                        nextEvent = this.eventQueue.shift();
                        return [4 /*yield*/, this.processEventWithTimeout(nextEvent)];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        err_1 = _a.sent();
                        console.error("Error processing selection change event:", err_1);
                        this.isProcessingEvent = false;
                        if (this.processingTimeout) {
                            clearTimeout(this.processingTimeout);
                            this.processingTimeout = null;
                        }
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Process a given event with a timeout.
     * This is in attempt to prevent deadlocks between events.
     * @param e The selection change event.
     */
    SelectionChangeManager.prototype.processEventWithTimeout = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var timeoutPromise;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isProcessingEvent = true;
                        timeoutPromise = new Promise(function (_, reject) {
                            _this.processingTimeout = setTimeout(function () {
                                reject(new Error("Selection change event processing timed out"));
                            }, _this.PROCESSING_TIMEOUT);
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, , 3, 4]);
                        return [4 /*yield*/, Promise.race([this.processEvent(e), timeoutPromise])];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        // Clean up.
                        if (this.processingTimeout) {
                            clearTimeout(this.processingTimeout);
                            this.processingTimeout = null;
                        }
                        this.isProcessingEvent = false;
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Core event processing logic.
     * @param e The selection change event.
     */
    SelectionChangeManager.prototype.processEvent = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var snapshot, _i, _a, handler, err_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        snapshot = this.captureState(e);
                        _i = 0, _a = this.listeners;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        handler = _a[_i].handler;
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, handler(e, snapshot)];
                    case 3:
                        if (_b.sent()) {
                            return [2 /*return*/];
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        err_2 = _b.sent();
                        console.error("Error in selection change handler:", err_2);
                        return [3 /*break*/, 5];
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    SelectionChangeManager.prototype.captureState = function (e) {
        return {
            nextEditWindowAccepted: NextEditWindowManager_1.NextEditWindowManager.isInstantiated() &&
                NextEditWindowManager_1.NextEditWindowManager.getInstance().hasAccepted(),
            jumpInProgress: JumpManager_1.JumpManager.getInstance().isJumpInProgress(),
            jumpJustAccepted: JumpManager_1.JumpManager.getInstance().wasJumpJustAccepted(),
            lastDocumentChangeTime: this.lastDocumentChangeTime,
            isTypingSession: this.isTypingSession,
            document: e.textEditor.document,
            cursorPosition: e.selections[0].active,
        };
    };
    SelectionChangeManager.prototype.defaultFallbackHandler = function (e, state) {
        return __awaiter(this, void 0, void 0, function () {
            var nextEditableRegions;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.ide) {
                            console.error("IDE not initialized in SelectionChangeManager");
                            return [2 /*return*/, false];
                        }
                        console.debug("defaultFallbackHandler: deleteChain called from onDidChangeTextEditorSelection");
                        return [4 /*yield*/, NextEditProvider_1.NextEditProvider.getInstance().deleteChain()];
                    case 1:
                        _b.sent();
                        if (!!this.usingFullFileDiff) return [3 /*break*/, 3];
                        return [4 /*yield*/, (0, NextEditEditableRegionCalculator_1.getNextEditableRegion)(NextEditEditableRegionCalculator_1.EditableRegionStrategy.Static, {
                                cursorPosition: e.selections[0].anchor,
                                filepath: (0, pathToUri_1.localPathOrUriToPath)(e.textEditor.document.uri.toString()),
                                ide: this.ide,
                            })];
                    case 2:
                        nextEditableRegions = (_a = (_b.sent())) !== null && _a !== void 0 ? _a : [];
                        // (await getNextEditableRegion(EditableRegionStrategy.Sliding, {
                        //   filepath: localPathOrUriToPath(e.textEditor.document.uri.toString()),
                        //   fileLines: e.textEditor.document.getText().split("\n"),
                        // })) ?? [];
                        nextEditableRegions.forEach(function (region) {
                            NextEditPrefetchQueue_1.PrefetchQueue.getInstance().enqueueUnprocessed(region);
                        });
                        _b.label = 3;
                    case 3: return [2 /*return*/, true];
                }
            });
        });
    };
    return SelectionChangeManager;
}());
exports.SelectionChangeManager = SelectionChangeManager;
