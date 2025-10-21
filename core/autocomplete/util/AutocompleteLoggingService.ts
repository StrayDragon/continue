// Simplified logging service for autocomplete
// Replaces complex telemetry and data logging with basic console logging

import { AutocompleteOutcome } from "./types";

export class AutocompleteLoggingService {
  // Key is completionId
  private _abortControllers = new Map<string, AbortController>();

  constructor() {}

  createAbortController(completionId: string): AbortController {
    const controller = new AbortController();
    this._abortControllers.set(completionId, controller);
    return controller;
  }

  deleteAbortController(completionId: string): void {
    this._abortControllers.delete(completionId);
  }

  accept(completionId: string): AutocompleteOutcome | undefined {
    // Simplified acceptance tracking - just log to console
    console.log(`[Conti] Autocomplete accepted: ${completionId}`);
    return undefined;
  }

  markDisplayed(completionId: string, outcome: AutocompleteOutcome): void {
    // Simplified display tracking
    console.log(`[Conti] Autocomplete displayed: ${completionId}`, {
      model: outcome.modelName,
      provider: outcome.modelProvider,
      time: outcome.time,
      cacheHit: outcome.cacheHit,
    });
  }

  cancel(): void {
    // Cancel all ongoing requests
    for (const controller of this._abortControllers.values()) {
      controller.abort();
    }
    this._abortControllers.clear();
    console.log("[Conti] All autocomplete requests cancelled");
  }

  trackPendingCompletion(completionId: string): void {
    console.log(`[Conti] Pending completion: ${completionId}`);
  }

  handleAbort(completionId: string): void {
    this._abortControllers.delete(completionId);
    console.log(`[Conti] Completion aborted: ${completionId}`);
  }

  cancelRejectionTimeout(completionId: string): void {
    // Simplified - just log
    console.log(`[Conti] Rejection timeout cancelled: ${completionId}`);
  }

  // Static methods for singleton pattern
  private static instance: AutocompleteLoggingService | null = null;

  static getInstance(): AutocompleteLoggingService {
    if (!AutocompleteLoggingService.instance) {
      AutocompleteLoggingService.instance = new AutocompleteLoggingService();
    }
    return AutocompleteLoggingService.instance;
  }

  static reset(): void {
    AutocompleteLoggingService.instance = null;
  }
}