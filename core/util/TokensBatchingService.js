"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokensBatchingService = void 0;
var posthog_js_1 = require("./posthog.js");
var TokensBatchingService = /** @class */ (function () {
    function TokensBatchingService() {
        this.batches = new Map();
        this.flushTimer = null;
        this.BATCH_SIZE_LIMIT = 25;
        this.FLUSH_INTERVAL_MS = 10 * 60 * 1000; // 10 minutes
        this.startFlushTimer();
    }
    TokensBatchingService.getInstance = function () {
        if (!TokensBatchingService.instance) {
            TokensBatchingService.instance = new TokensBatchingService();
        }
        return TokensBatchingService.instance;
    };
    TokensBatchingService.prototype.addTokens = function (model, provider, promptTokens, generatedTokens) {
        var key = "".concat(provider, ":").concat(model);
        if (!this.batches.has(key)) {
            this.batches.set(key, {
                model: model,
                provider: provider,
                count: 0,
                totalPromptTokens: 0,
                totalGeneratedTokens: 0,
                lastEventTime: Date.now(),
            });
        }
        var batch = this.batches.get(key);
        batch.count++;
        batch.totalPromptTokens += promptTokens;
        batch.totalGeneratedTokens += generatedTokens;
        batch.lastEventTime = Date.now();
        // Flush if batch is full
        if (batch.count >= this.BATCH_SIZE_LIMIT) {
            this.flushBatch(key, batch);
        }
    };
    TokensBatchingService.prototype.flushBatch = function (key, batch) {
        if (batch.count === 0)
            return;
        void posthog_js_1.Telemetry.capture("tokens_generated_batch", {
            model: batch.model,
            provider: batch.provider,
            eventCount: batch.count,
            totalPromptTokens: batch.totalPromptTokens,
            totalGeneratedTokens: batch.totalGeneratedTokens,
            avgPromptTokens: Math.round(batch.totalPromptTokens / batch.count),
            avgGeneratedTokens: Math.round(batch.totalGeneratedTokens / batch.count),
        }, true);
        this.batches.delete(key);
    };
    TokensBatchingService.prototype.startFlushTimer = function () {
        var _this = this;
        this.flushTimer = setInterval(function () {
            _this.flushAllBatches();
        }, this.FLUSH_INTERVAL_MS);
        // Allow the process to exit if this timer is the only thing keeping it alive
        // This prevents test hangs and allows graceful shutdown
        this.flushTimer.unref();
    };
    TokensBatchingService.prototype.flushAllBatches = function () {
        for (var _i = 0, _a = this.batches.entries(); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], batch = _b[1];
            this.flushBatch(key, batch);
        }
    };
    TokensBatchingService.prototype.shutdown = function () {
        if (this.flushTimer) {
            clearInterval(this.flushTimer);
            this.flushTimer = null;
        }
        this.flushAllBatches();
    };
    return TokensBatchingService;
}());
exports.TokensBatchingService = TokensBatchingService;
