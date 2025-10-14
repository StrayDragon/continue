import * as vscode from "vscode";
import { ContiConfigManager } from "../config/ContiConfigManager";
import { MemoryOptimizer, MemoryUsageTracker } from "../optimization/MemoryOptimizer";

/**
 * Command to show Conti extension status and configuration information
 */
export async function showStatusCommand(
  configHandler: any,
  context: vscode.ExtensionContext
): Promise<void> {
  try {
    const contiConfigManager = ContiConfigManager.getInstance(configHandler);
    const memoryOptimizer = MemoryOptimizer.getInstance();
    const memoryTracker = MemoryUsageTracker.getInstance();

    // Get configuration summary
    const configSummary = await contiConfigManager.getConfigSummary();
    const validation = await contiConfigManager.validateConfiguration();

    // Get memory statistics
    const memoryStats = memoryOptimizer.getCacheStats();
    const memoryUsage = memoryTracker.getUsageInMB();

    // Create status message
    const statusMessage = createStatusMessage(
      configSummary,
      validation,
      memoryStats,
      memoryUsage
    );

    // Show status in a webview panel
    const panel = vscode.window.createWebviewPanel(
      "contiStatus",
      "Conti Status",
      vscode.ViewColumn.One,
      {
        enableScripts: true,
        localResourceRoots: [context.extensionUri],
      }
    );

    panel.webview.html = statusMessage;

    // Handle panel disposal
    panel.onDidDispose(() => {
      // Clean up resources
    });
  } catch (error) {
    vscode.window.showErrorMessage(`Failed to show status: ${error}`);
  }
}

/**
 * Create HTML status message
 */
function createStatusMessage(
  configSummary: any,
  validation: any,
  memoryStats: any,
  memoryUsage: any
): string {
  const configStatus = validation.valid ? "✅ Valid" : "❌ Invalid";
  const configErrors = validation.errors.length > 0
    ? `<ul>${validation.errors.map((e: string) => `<li>${e}</li>`).join('')}</ul>`
    : "<p>No configuration errors</p>";

  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Conti Status</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 10px;
            margin-bottom: 30px;
            text-align: center;
        }
        .section {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
            border-left: 4px solid #667eea;
        }
        .section h2 {
            margin-top: 0;
            color: #667eea;
            border-bottom: 2px solid #667eea;
            padding-bottom: 10px;
        }
        .status-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 20px;
        }
        .status-item {
            background: white;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .status-item h3 {
            margin-top: 0;
            color: #495057;
        }
        .status-value {
            font-size: 1.2em;
            font-weight: bold;
            color: #667eea;
        }
        .error-list {
            background: #f8d7da;
            border: 1px solid #f5c6cb;
            padding: 15px;
            border-radius: 5px;
            margin-top: 10px;
        }
        .memory-bar {
            background: #e9ecef;
            height: 20px;
            border-radius: 10px;
            overflow: hidden;
            margin: 10px 0;
        }
        .memory-fill {
            background: linear-gradient(90deg, #28a745 0%, #ffc107 70%, #dc3545 100%);
            height: 100%;
            transition: width 0.3s ease;
        }
        .button {
            background: #667eea;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            margin: 5px;
            font-size: 14px;
        }
        .button:hover {
            background: #5a6fd8;
        }
        .config-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }
        .config-table th,
        .config-table td {
            padding: 8px 12px;
            text-align: left;
            border-bottom: 1px solid #dee2e6;
        }
        .config-table th {
            background: #f8f9fa;
            font-weight: 600;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🚀 Conti Status</h1>
        <p>Lightweight AI Tab Autocomplete Extension</p>
    </div>

    <div class="section">
        <h2>📊 Extension Status</h2>
        <div class="status-grid">
            <div class="status-item">
                <h3>Configuration</h3>
                <div class="status-value">${configStatus}</div>
                ${!validation.valid ? `<div class="error-list">${configErrors}</div>` : ''}
            </div>
            <div class="status-item">
                <h3>Cache Size</h3>
                <div class="status-value">${memoryStats.size} items</div>
                <small>Active cache entries</small>
            </div>
            <div class="status-item">
                <h3>Memory Usage</h3>
                <div class="status-value">${memoryUsage.heapUsed.toFixed(1)} MB</div>
                <div class="memory-bar">
                    <div class="memory-fill" style="width: ${(memoryUsage.heapUsed / memoryUsage.heapTotal) * 100}%"></div>
                </div>
                <small>Heap: ${memoryUsage.heapUsed.toFixed(1)} / ${memoryUsage.heapTotal.toFixed(1)} MB</small>
            </div>
        </div>
    </div>

    <div class="section">
        <h2>⚙️ Configuration Details</h2>
        <table class="config-table">
            <tr>
                <th>Setting</th>
                <th>Value</th>
            </tr>
            <tr>
                <td>Configuration Mode</td>
                <td>${configSummary.mode}</td>
            </tr>
            <tr>
                <td>Provider</td>
                <td>${configSummary.provider || 'Not configured'}</td>
            </tr>
            <tr>
                <td>Model</td>
                <td>${configSummary.model || 'Not configured'}</td>
            </tr>
            <tr>
                <td>API Key</td>
                <td>${configSummary.hasApiKey ? '✅ Configured' : '❌ Missing'}</td>
            </tr>
        </table>
    </div>

    <div class="section">
        <h2>💾 Memory Statistics</h2>
        <div class="status-grid">
            <div class="status-item">
                <h3>RSS Memory</h3>
                <div class="status-value">${memoryUsage.rss.toFixed(1)} MB</div>
                <small>Resident Set Size</small>
            </div>
            <div class="status-item">
                <h3>External Memory</h3>
                <div class="status-value">${memoryUsage.external.toFixed(1)} MB</div>
                <small>C++ objects</small>
            </div>
            <div class="status-item">
                <h3>Array Buffers</h3>
                <div class="status-value">${memoryUsage.arrayBuffers.toFixed(1)} MB</div>
                <small>Shared memory</small>
            </div>
        </div>
    </div>

    <div class="section">
        <h2>🔧 Quick Actions</h2>
        <button class="button" onclick="clearCache()">Clear Cache</button>
        <button class="button" onclick="validateConfig()">Validate Configuration</button>
        <button class="button" onclick="reloadConfig()">Reload Configuration</button>
    </div>

    <script>
        function clearCache() {
            // Send message to extension to clear cache
            const message = {
                command: 'clearCache'
            };
            vscode.postMessage(message);
        }

        function validateConfig() {
            // Send message to extension to validate configuration
            const message = {
                command: 'validateConfig'
            };
            vscode.postMessage(message);
        }

        function reloadConfig() {
            // Send message to extension to reload configuration
            const message = {
                command: 'reloadConfig'
            };
            vscode.postMessage(message);
        }

        // Listen for messages from the extension
        window.addEventListener('message', event => {
            const message = event.data;
            switch (message.command) {
                case 'cacheCleared':
                    alert('Cache cleared successfully!');
                    break;
                case 'configValidated':
                    alert('Configuration validated: ' + message.valid);
                    break;
                case 'configReloaded':
                    alert('Configuration reloaded successfully!');
                    break;
            }
        });
    </script>
</body>
</html>
  `;
}