import * as vscode from "vscode";
import { ContiConfigManager } from "../config/ContiConfigManager";
import { MemoryOptimizer } from "../optimization/MemoryOptimizer";
import { showStatusCommand } from "./showStatus";

/**
 * Register all Conti-specific commands
 */
export function registerContiCommands(
  context: vscode.ExtensionContext,
  configManager: ContiConfigManager,
  memoryOptimizer: MemoryOptimizer,
): void {
  // Toggle tab autocomplete
  context.subscriptions.push(
    vscode.commands.registerCommand("conti.toggleTabAutocompleteEnabled", async () => {
      const config = vscode.workspace.getConfiguration("conti");
      const enabled = config.get<boolean>("enableTabAutocomplete", true);

      await config.update(
        "enableTabAutocomplete",
        !enabled,
        vscode.ConfigurationTarget.Global,
      );

      const message = !enabled ? "Tab autocomplete enabled" : "Tab autocomplete disabled";
      vscode.window.showInformationMessage(message);
    }),
  );

  // Force autocomplete
  context.subscriptions.push(
    vscode.commands.registerCommand("conti.forceAutocomplete", async () => {
      // Hide existing suggestions
      await vscode.commands.executeCommand("editor.action.inlineSuggest.hide");

      // Trigger new suggestion
      await vscode.commands.executeCommand("editor.action.inlineSuggest.trigger");
    }),
  );

  // Show settings
  context.subscriptions.push(
    vscode.commands.registerCommand("conti.openConfigPage", () => {
      vscode.commands.executeCommand("workbench.action.openSettings", "conti");
    }),
  );

  // Show status
  context.subscriptions.push(
    vscode.commands.registerCommand("conti.showStatus", () => {
      showStatusCommand(configManager, context);
    }),
  );

  // Clear cache
  context.subscriptions.push(
    vscode.commands.registerCommand("conti.clearCache", async () => {
      memoryOptimizer.clearCache();
      configManager.clearCache();
      vscode.window.showInformationMessage("Conti cache cleared");
    }),
  );

  // Validate configuration
  context.subscriptions.push(
    vscode.commands.registerCommand("conti.validateConfig", async () => {
      const validation = await configManager.validateConfiguration();

      if (validation.valid) {
        vscode.window.showInformationMessage("Configuration is valid");
      } else {
        const errorMessage = `Configuration errors:\n${validation.errors.join("\n")}`;
        vscode.window.showErrorMessage(errorMessage);
      }
    }),
  );
}