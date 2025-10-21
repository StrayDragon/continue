"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplyAbortManager = void 0;
var ApplyAbortManager = /** @class */ (function () {
    function ApplyAbortManager() {
        this.controllers = new Map();
    }
    ApplyAbortManager.getInstance = function () {
        if (!ApplyAbortManager.instance) {
            ApplyAbortManager.instance = new ApplyAbortManager();
        }
        return ApplyAbortManager.instance;
    };
    ApplyAbortManager.prototype.get = function (id) {
        var controller = this.controllers.get(id);
        if (!controller) {
            controller = new AbortController();
            this.controllers.set(id, controller);
        }
        return controller;
    };
    ApplyAbortManager.prototype.abort = function (id) {
        var controller = this.controllers.get(id);
        if (controller) {
            controller.abort();
            this.controllers.delete(id);
        }
    };
    ApplyAbortManager.prototype.clear = function () {
        this.controllers.forEach(function (controller) { return controller.abort(); });
        this.controllers.clear();
    };
    return ApplyAbortManager;
}());
exports.ApplyAbortManager = ApplyAbortManager;
