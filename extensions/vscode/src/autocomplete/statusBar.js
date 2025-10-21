"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStatusBarStatusFromQuickPickItemLabel = exports.quickPickStatusText = exports.StatusBarStatus = void 0;
exports.stopStatusBarLoading = stopStatusBarLoading;
exports.setupStatusBar = setupStatusBar;
exports.getStatusBarStatus = getStatusBarStatus;
exports.monitorBatteryChanges = monitorBatteryChanges;
exports.getAutocompleteStatusBarDescription = getAutocompleteStatusBarDescription;
exports.getAutocompleteStatusBarTitle = getAutocompleteStatusBarTitle;
exports.getNextEditMenuItems = getNextEditMenuItems;
exports.isNextEditToggleLabel = isNextEditToggleLabel;
exports.handleNextEditToggle = handleNextEditToggle;
var env_1 = require("core/control-plane/env");
var vscode = require("vscode");
var util_1 = require("../util/util");
var workspaceConfig_1 = require("../util/workspaceConfig");
var StatusBarStatus;
(function (StatusBarStatus) {
    StatusBarStatus[StatusBarStatus["Disabled"] = 0] = "Disabled";
    StatusBarStatus[StatusBarStatus["Enabled"] = 1] = "Enabled";
    StatusBarStatus[StatusBarStatus["Paused"] = 2] = "Paused";
})(StatusBarStatus || (exports.StatusBarStatus = StatusBarStatus = {}));
var quickPickStatusText = function (status) {
    switch (status) {
        case undefined:
        case StatusBarStatus.Disabled:
            return "$(circle-slash) Disable autocomplete";
        case StatusBarStatus.Enabled:
            return "$(check) Enable autocomplete";
        case StatusBarStatus.Paused:
            return "$(debug-pause) Pause autocomplete";
    }
};
exports.quickPickStatusText = quickPickStatusText;
var getStatusBarStatusFromQuickPickItemLabel = function (label) {
    switch (label) {
        case "$(circle-slash) Disable autocomplete":
            return StatusBarStatus.Disabled;
        case "$(check) Enable autocomplete":
            return StatusBarStatus.Enabled;
        case "$(debug-pause) Pause autocomplete":
            return StatusBarStatus.Paused;
        default:
            return undefined;
    }
};
exports.getStatusBarStatusFromQuickPickItemLabel = getStatusBarStatusFromQuickPickItemLabel;
var statusBarItemText = function (status, loading, error) {
    var _a;
    if (error) {
        return "$(alert) Continue (config error)";
    }
    var text;
    switch (status) {
        case undefined:
            if (loading) {
                text = "$(loading~spin) Continue";
            }
            else {
                text = "Continue";
            }
            break;
        case StatusBarStatus.Disabled:
            text = "$(circle-slash) Continue";
            break;
        case StatusBarStatus.Enabled:
            text = "$(check) Continue";
            break;
        case StatusBarStatus.Paused:
            text = "$(debug-pause) Continue";
            break;
        default:
            text = "Continue";
    }
    // Append Next Edit indicator if enabled.
    var config = vscode.workspace.getConfiguration(env_1.EXTENSION_NAME);
    var nextEditEnabled = (_a = config.get("enableNextEdit")) !== null && _a !== void 0 ? _a : false;
    if (nextEditEnabled) {
        text += " (NE)";
    }
    return text;
};
var statusBarItemTooltip = function (status) {
    var _a;
    switch (status) {
        case undefined:
        case StatusBarStatus.Disabled:
            return "Click to enable tab autocomplete";
        case StatusBarStatus.Enabled:
            var config = vscode.workspace.getConfiguration(env_1.EXTENSION_NAME);
            var nextEditEnabled = (_a = config.get("enableNextEdit")) !== null && _a !== void 0 ? _a : false;
            return nextEditEnabled
                ? "Next Edit is enabled"
                : "Tab autocomplete is enabled";
        case StatusBarStatus.Paused:
            return "Tab autocomplete is paused";
    }
};
var statusBarStatus = undefined;
var statusBarItem = undefined;
var statusBarFalseTimeout = undefined;
var statusBarError = false;
function stopStatusBarLoading() {
    statusBarFalseTimeout = setTimeout(function () {
        setupStatusBar(StatusBarStatus.Enabled, false);
    }, 100);
}
/**
 * TODO: We should clean up how status bar is handled.
 * Ideally, there should be a single 'status' value without
 * 'loading' and 'error' booleans.
 */
function setupStatusBar(status, loading, error) {
    if (loading !== false) {
        clearTimeout(statusBarFalseTimeout);
        statusBarFalseTimeout = undefined;
    }
    // If statusBarItem hasn't been defined yet, create it
    if (!statusBarItem) {
        statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right);
    }
    if (error !== undefined) {
        statusBarError = error;
        if (status === undefined) {
            status = statusBarStatus;
        }
        if (loading === undefined) {
            loading = loading;
        }
    }
    statusBarItem.text = statusBarItemText(status, loading, statusBarError);
    statusBarItem.tooltip = statusBarItemTooltip(status !== null && status !== void 0 ? status : statusBarStatus);
    statusBarItem.command = "continue.openTabAutocompleteConfigMenu";
    statusBarItem.show();
    if (status !== undefined) {
        statusBarStatus = status;
    }
    vscode.workspace.onDidChangeConfiguration(function (event) {
        if (event.affectsConfiguration(workspaceConfig_1.CONTINUE_WORKSPACE_KEY)) {
            var enabled = (0, workspaceConfig_1.getContinueWorkspaceConfig)().get("enableTabAutocomplete");
            if (enabled && statusBarStatus === StatusBarStatus.Paused) {
                return;
            }
            setupStatusBar(enabled ? StatusBarStatus.Enabled : StatusBarStatus.Disabled);
        }
    });
}
function getStatusBarStatus() {
    return statusBarStatus;
}
function monitorBatteryChanges(battery) {
    return battery.onChangeAC(function (acConnected) {
        var config = vscode.workspace.getConfiguration(env_1.EXTENSION_NAME);
        var enabled = config.get("enableTabAutocomplete");
        if (!!enabled) {
            var pauseOnBattery = config.get("pauseTabAutocompleteOnBattery");
            setupStatusBar(acConnected || !pauseOnBattery
                ? StatusBarStatus.Enabled
                : StatusBarStatus.Paused);
        }
    });
}
function getAutocompleteStatusBarDescription(selected, _a) {
    var title = _a.title, apiKey = _a.apiKey, providerName = _a.providerName;
    if (title !== selected) {
        return undefined;
    }
    var description = "Current autocomplete model";
    // Only set for Mistral since our default config includes Codestral without
    // an API key
    if ((apiKey === undefined || apiKey === "") && providerName === "mistral") {
        description += " (Missing API key)";
    }
    return description;
}
function getAutocompleteStatusBarTitle(selected, _a) {
    var title = _a.title;
    if (!title) {
        return "Unnamed Model";
    }
    if (title === selected) {
        return "$(check) ".concat(title);
    }
    return title;
}
var USE_FIM_MENU_ITEM_LABEL = "$(export) Use FIM autocomplete over Next Edit";
var USE_NEXT_EDIT_MENU_ITEM_LABEL = "$(sparkle) Use Next Edit over FIM autocomplete";
// Shows what items get rendered in the autocomplete menu.
function getNextEditMenuItems(currentStatus, nextEditEnabled) {
    if (currentStatus !== StatusBarStatus.Enabled)
        return [];
    return [
        {
            label: nextEditEnabled
                ? USE_FIM_MENU_ITEM_LABEL
                : USE_NEXT_EDIT_MENU_ITEM_LABEL,
            description: (0, util_1.getMetaKeyLabel)() + " + K, " + (0, util_1.getMetaKeyLabel)() + " + N",
        },
    ];
}
// Checks if the current selected option is a Next Edit toggle label.
function isNextEditToggleLabel(label) {
    return (label === USE_FIM_MENU_ITEM_LABEL || label === USE_NEXT_EDIT_MENU_ITEM_LABEL);
}
// Updates the config once Next Edit is toggled.
function handleNextEditToggle(label, config) {
    var isEnabling = label === USE_NEXT_EDIT_MENU_ITEM_LABEL;
    config.update("enableNextEdit", isEnabling, vscode.ConfigurationTarget.Global);
}
