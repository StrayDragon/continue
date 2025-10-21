#!/bin/bash

echo "🚀 创建最小可用的 Conti VSIX 包"
echo "================================="

cd extensions/vscode

# 1. 创建最小化的包结构
echo "📁 1. 创建最小化结构..."
mkdir -p dist-minimal
mkdir -p dist-minimal/out

# 2. 复制必要的文件
echo "📋 2. 复制必要文件..."
# 复制 package.json
cp package.json dist-minimal/

# 创建最小化的扩展主文件
echo "📝 3. 创建最小化扩展..."
cat > dist-minimal/out/extension.js << 'EOF'
// Conti - 轻量级 AI 自动补全扩展
// 最小化版本

const vscode = require('vscode');

function activate(context) {
    console.log('Conti 自动补全扩展已激活');

    // 创建状态栏项
    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.text = '$(code) Conti';
    statusBarItem.tooltip = 'Conti AI 自动补全';
    statusBarItem.show();

    // 注册命令
    const toggleCommand = vscode.commands.registerCommand('conti.toggleTabAutocompleteEnabled', () => {
        vscode.window.showInformationMessage('Conti 自动补全切换功能（占位符）');
    });

    const forceCommand = vscode.commands.registerCommand('conti.forceAutocomplete', () => {
        vscode.window.showInformationMessage('Conti 强制补全功能（占位符）');
    });

    const settingsCommand = vscode.commands.registerCommand('conti.openConfigPage', () => {
        vscode.window.showInformationMessage('Conti 设置页面（占位符）');
    });

    context.subscriptions.push(statusBarItem, toggleCommand, forceCommand, settingsCommand);
}

function deactivate() {
    console.log('Conti 扩展已停用');
}

module.exports = {
    activate,
    deactivate
};
EOF

# 创建 package.json（VSIX 需要）
echo "📦 4. 创建 VSIX package.json..."
cat > dist-minimal/package.json << 'EOF'
{
  "name": "conti",
  "displayName": "Conti - AI Tab Autocomplete",
  "description": "Lightweight AI-powered tab autocomplete extension",
  "version": "1.0.0",
  "publisher": "Continue",
  "engines": {
    "vscode": "^1.70.0"
  },
  "categories": [
    "AI",
    "Programming Languages",
    "Machine Learning",
    "Snippets"
  ],
  "keywords": [
    "autocomplete",
    "ai",
    "copilot",
    "claude",
    "tab",
    "completion",
    "fim"
  ],
  "main": "./out/extension.js",
  "contributes": {
    "configuration": {
      "title": "Conti",
      "properties": {
        "conti.enableTabAutocomplete": {
          "type": "boolean",
          "default": true,
          "description": "Enable tab autocomplete feature."
        },
        "conti.enableNextEdit": {
          "type": "boolean",
          "default": true,
          "description": "Enable next edit prediction feature."
        },
        "conti.model": {
          "type": "string",
          "default": "gpt-4",
          "description": "Default model to use for autocomplete."
        },
        "conti.apiKey": {
          "type": "string",
          "default": "",
          "description": "API key for the selected model."
        }
      }
    },
    "commands": [
      {
        "command": "conti.toggleTabAutocompleteEnabled",
        "category": "Conti",
        "title": "Toggle Autocomplete"
      },
      {
        "command": "conti.forceAutocomplete",
        "title": "Conti: Force Autocomplete"
      },
      {
        "command": "conti.toggleNextEditEnabled",
        "title": "Conti: Toggle Next Edit"
      },
      {
        "command": "conti.openConfigPage",
        "category": "Conti",
        "title": "Settings",
        "icon": "$(gear)"
      }
    ],
    "keybindings": [
      {
        "command": "conti.toggleTabAutocompleteEnabled",
        "mac": "cmd+k cmd+a",
        "key": "ctrl+k ctrl+a"
      },
      {
        "command": "conti.forceAutocomplete",
        "key": "ctrl+alt+space",
        "mac": "cmd+alt+space"
      },
      {
        "command": "conti.toggleNextEditEnabled",
        "key": "ctrl+k ctrl+n"
      }
    ]
  },
  "activationEvents": [
    "onStartupFinished"
  ]
}
EOF

# 5. 安装 vsce 工具（如果未安装）
echo "🔧 5. 检查 vsce 工具..."
if ! command -v vsce &> /dev/null; then
    echo "📦 安装 vsce 工具..."
    npm install -g @vscode/vsce
fi

# 6. 打包 VSIX
echo "📦 6. 打包 VSIX..."
cd dist-minimal
vsce package --out conti-minimal.vsix

# 7. 检查结果
echo ""
echo "🔍 7. 检查生成的文件..."
ls -la *.vsix

echo ""
echo "✅ 最小化 VSIX 包创建完成！"
echo ""
echo "📋 文件位置: $(pwd)/conti-minimal.vsix"
echo ""
echo "🚀 安装方法:"
echo "1. VS Code: 扩展 -> 从 VSIX 安装 -> 选择 conti-minimal.vsix"
echo "2. 命令行: code --install-extension conti-minimal.vsix"
echo ""
echo "⚠️  注意: 这是最小化版本，包含基本框架，"
echo "   完整功能需要后续开发实现。"