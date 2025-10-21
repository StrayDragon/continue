import * as vscode from "vscode";

import { VsCodeExtension } from "../extension/VsCodeExtension";
import { getExtensionVersion, isUnsupportedPlatform } from "../util/util";

export async function activateExtension(context: vscode.ExtensionContext) {
  const platformCheck = isUnsupportedPlatform();

  if (platformCheck.isUnsupported) {
    const platformTarget = "windows-arm64";
    void vscode.window.showInformationMessage(
      `Conti detected that you are using ${platformTarget}. Due to native dependencies, Conti may not be able to start`,
    );
  }

  const vscodeExtension = new VsCodeExtension(context);

  try {
    await vscodeExtension.activate();

    // Show status bar item
    vscodeExtension.updateStatusBar();

    console.log("Conti autocomplete extension activated successfully");
  } catch (error) {
    console.error("Failed to activate Conti extension:", error);
    throw error;
  }

  return vscodeExtension;
}