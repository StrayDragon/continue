/**
 * Simplified entry point for Conti extension
 * Lightweight tab autocomplete functionality only
 */

import * as vscode from "vscode";
import { ContiCompletionProvider } from "./autocomplete/contiCompletionProvider";
import { ContiConfigManager } from "./config/ContiConfigManager";
import { MemoryOptimizer } from "./optimization/MemoryOptimizer";
import { registerContiCommands } from "./commands/contiCommands";
import { setupContiStatusBar } from "./util/contiStatusBar";

let completionProvider: ContiCompletionProvider | undefined;
let configManager: ContiConfigManager | undefined;
let memoryOptimizer: MemoryOptimizer | undefined;

export function activate(context: vscode.ExtensionContext) {
  console.log("Conti extension is activating...");

  try {
    // Initialize core services
    configManager = ContiConfigManager.getInstance(undefined as any); // Will be properly initialized
    memoryOptimizer = MemoryOptimizer.getInstance();

    // Create completion provider
    completionProvider = new ContiCompletionProvider(configManager);

    // Register completion provider
    context.subscriptions.push(
      vscode.languages.registerInlineCompletionItemProvider(
        [{ pattern: "**" }],
        completionProvider,
      ),
    );

    // Register commands
    registerContiCommands(context, configManager, memoryOptimizer);

    // Setup status bar
    setupContiStatusBar(context);

    // Register configuration change listener
    context.subscriptions.push(
      vscode.workspace.onDidChangeConfiguration(async (event) => {
        if (event.affectsConfiguration("conti")) {
          await handleConfigurationChange();
        }
      }),
    );

    console.log("Conti extension activated successfully");
  } catch (error) {
    console.error("Failed to activate Conti extension:", error);
    vscode.window.showErrorMessage(`Failed to activate Conti extension: ${error}`);
  }
}

export function deactivate() {
  console.log("Conti extension is deactivating...");

  // Clean up resources
  if (memoryOptimizer) {
    memoryOptimizer.dispose();
  }

  if (configManager) {
    configManager.clearCache();
  }

  console.log("Conti extension deactivated");
}

async function handleConfigurationChange() {
  if (!configManager) return;

  // Clear cache when configuration changes
  configManager.clearCache();

  // Update status bar
  const config = vscode.workspace.getConfiguration("conti");
  const enabled = config.get<boolean>("enableTabAutocomplete", true);

  if (enabled) {
    setupContiStatusBar(undefined as any, true);
  } else {
    setupContiStatusBar(undefined as any, false);
  }
}