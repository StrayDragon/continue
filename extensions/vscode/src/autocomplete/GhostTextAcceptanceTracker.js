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
exports.GhostTextAcceptanceTracker = void 0;
var vscode = require("vscode");
var SelectionChangeManager_1 = require("../activation/SelectionChangeManager");
/**
 * This singleton tracks whether a given ghost text is accepted or not.
 * We need this because there is no clean way of determining if a ghost text has been accepted outside of vscode command callback.
 * The above mentioned callback is not viable because it's too slow.
 * We need a way to reject model predictions on cursor movement, but cursor can move due to many reasons -- one being accepting a ghost text.
 * We need to differentiate the ghost text acceptance from a deliberate cursor movement to reject the completion.
 * The cursor movement event listener fires much before the vscode command callback, so the chain of edits often breaks when cursor moves due to accepting a ghost text.
 * This is not what we want, as we want to keep the current chain of edits alive when the user accepts the completion.
 */
var GhostTextAcceptanceTracker = /** @class */ (function () {
    function GhostTextAcceptanceTracker() {
        this.expectedAcceptance = null;
    }
    GhostTextAcceptanceTracker.getInstance = function () {
        if (!GhostTextAcceptanceTracker.instance) {
            GhostTextAcceptanceTracker.instance = new GhostTextAcceptanceTracker();
        }
        return GhostTextAcceptanceTracker.instance;
    };
    GhostTextAcceptanceTracker.clearInstance = function () {
        GhostTextAcceptanceTracker.instance = undefined;
    };
    GhostTextAcceptanceTracker.prototype.setExpectedGhostTextAcceptance = function (document, text, startPosition) {
        // Calculate end position
        var lines = text.split("\n");
        var endLine;
        var endCharacter;
        if (lines.length > 1) {
            endLine = startPosition.line + lines.length - 1;
            endCharacter = lines[lines.length - 1].length;
        }
        else {
            endLine = startPosition.line;
            endCharacter = startPosition.character + text.length;
        }
        this.expectedAcceptance = {
            documentUri: document.uri.toString(),
            documentVersion: document.version,
            text: text,
            startLine: startPosition.line,
            startCharacter: startPosition.character,
            endLine: endLine,
            endCharacter: endCharacter,
        };
    };
    GhostTextAcceptanceTracker.prototype.checkGhostTextWasAccepted = function (document, newPosition) {
        if (!this.expectedAcceptance)
            return false;
        // Check document match.
        if (this.expectedAcceptance.documentUri !== document.uri.toString()) {
            return false;
        }
        // Check document version (must be newer).
        if (document.version <= this.expectedAcceptance.documentVersion) {
            return false;
        }
        // Check if cursor is at expected end position.
        var expectedEndPos = new vscode.Position(this.expectedAcceptance.endLine, this.expectedAcceptance.endCharacter);
        if (newPosition.isEqual(expectedEndPos)) {
            // The cursor is where we'd expect after accepting the ghost text.
            // Verify text was inserted (optional additional check).
            var startPos = new vscode.Position(this.expectedAcceptance.startLine, this.expectedAcceptance.startCharacter);
            var expectedText = this.expectedAcceptance.text;
            try {
                var actualRange = new vscode.Range(startPos, expectedEndPos);
                var actualText = document.getText(actualRange);
                if (actualText === expectedText) {
                    // Clear the expectation.
                    this.expectedAcceptance = null;
                    return true;
                }
            }
            catch (error) {
                // Range might be invalid, just fall through.
            }
        }
        return false;
    };
    GhostTextAcceptanceTracker.prototype.registerSelectionChangeHandler = function () {
        var _this = this;
        var manager = SelectionChangeManager_1.SelectionChangeManager.getInstance();
        manager.registerListener("ghostTextTracker", function (e, state) { return __awaiter(_this, void 0, void 0, function () {
            var wasGhostTextAccepted;
            return __generator(this, function (_a) {
                if (!state.document || !state.cursorPosition) {
                    return [2 /*return*/, false];
                }
                wasGhostTextAccepted = this.checkGhostTextWasAccepted(state.document, state.cursorPosition);
                if (wasGhostTextAccepted) {
                    console.debug("GhostTextAcceptanceTracker: ghost text was accepted, preserving chain");
                    return [2 /*return*/, true];
                }
                return [2 /*return*/, false];
            });
        }); }, SelectionChangeManager_1.HandlerPriority.HIGH);
    };
    return GhostTextAcceptanceTracker;
}());
exports.GhostTextAcceptanceTracker = GhostTextAcceptanceTracker;
