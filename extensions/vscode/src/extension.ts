/**
 * This is the entry point for the autocomplete extension.
 */

import * as vscode from "vscode";

async function dynamicImportAndActivate(context: vscode.ExtensionContext) {
  const { activateExtension } = await import("./activation/activate");
  return await activateExtension(context);
}

export function activate(context: vscode.ExtensionContext) {
  return dynamicImportAndActivate(context).catch((e) => {
    console.error("Error activating autocomplete extension: ", e);
    vscode.window
      .showErrorMessage(
        "Error activating the Conti autocomplete extension.",
        "Retry",
      )
      .then((selection) => {
        if (selection === "Retry") {
          // Reload VS Code window
          vscode.commands.executeCommand("workbench.action.reloadWindow");
        }
      });
  });
}

export function deactivate() {
  // Cleanup if needed
}