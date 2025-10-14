import * as vscode from "vscode";

let statusBar: vscode.StatusBarItem;
let isEnabled: boolean = true;

/**
 * Setup status bar for Conti extension
 */
export function setupContiStatusBar(
  context?: vscode.ExtensionContext,
  enabled?: boolean,
): void {
  if (enabled !== undefined) {
    isEnabled = enabled;
  }

  if (!statusBar) {
    statusBar = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Right,
      100,
    );
    statusBar.text = "$(light-bulb) Conti";
    statusBar.tooltip = "Conti Tab Autocomplete";
    statusBar.command = "conti.toggleTabAutocompleteEnabled";

    if (context) {
      context.subscriptions.push(statusBar);
    }
  }

  updateStatusBar();
}

/**
 * Update status bar appearance based on current state
 */
function updateStatusBar(): void {
  if (!statusBar) return;

  if (isEnabled) {
    statusBar.text = "$(light-bulb) Conti";
    statusBar.backgroundColor = undefined;
    statusBar.tooltip = "Conti Tab Autocomplete Enabled";
  } else {
    statusBar.text = "$(light-bulb-off) Conti";
    statusBar.backgroundColor = new vscode.ThemeColor("statusBarItem.errorBackground");
    statusBar.tooltip = "Conti Tab Autocomplete Disabled";
  }

  statusBar.show();
}

/**
 * Get current status
 */
export function getContiStatus(): boolean {
  return isEnabled;
}