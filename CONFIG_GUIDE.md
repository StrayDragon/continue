# Conti 自动补全配置指南

## 🚀 快速开始

Conti 是一个轻量级的 AI 自动补全 VS Code 扩展。本指南将帮助您快速配置和使用。

## 📋 系统要求

- VS Code 1.70.0 或更高版本
- Node.js 20.19.0 或更高版本（开发时）
- 支持的操作系统：Windows、macOS、Linux

## ⚙️ 基本配置

### 1. 安装扩展

```bash
# 从源码构建
cd extensions/vscode
npm install
npm run build
```

### 2. VS Code 设置

打开 VS Code 设置（Ctrl/Cmd + ,），搜索 "Conti"：

#### 基本配置项

```json
{
  "conti.enableTabAutocomplete": true,    // 启用自动补全
  "conti.enableNextEdit": false,         // 禁用预测编辑（实验性）
  "conti.model": "gpt-4",                // 使用的模型
  "conti.apiKey": ""                     // API 密钥
}
```

## 🔑 API 密钥配置

### OpenAI 配置

```json
{
  "conti.model": "gpt-4",
  "conti.apiKey": "sk-your-openai-api-key-here"
}
```

### Anthropic Claude 配置

```json
{
  "conti.model": "claude-3-sonnet-20240229",
  "conti.apiKey": "sk-ant-your-anthropic-api-key-here"
}
```

### 本地 Ollama 配置

```json
{
  "conti.model": "ollama:codellama:7b",
  "conti.apiKey": ""
}
```

## 📝 配置文件

### 项目级配置

在项目根目录创建 `.continue/config.json`：

```json
{
  "models": [
    {
      "title": "GPT-4",
      "provider": "openai",
      "model": "gpt-4",
      "apiKey": "sk-your-api-key"
    }
  ],
  "tabAutocompleteOptions": {
    "enabled": true,
    "debounceDelay": 300,
    "maxPromptTokens": 2000,
    "useCache": true
  }
}
```

### 全局配置

在用户设置中配置（推荐）：

```json
{
  "conti.model": "gpt-4",
  "conti.apiKey": "sk-your-api-key",
  "conti.enableTabAutocomplete": true
}
```

## 🎯 高级配置

### 自动补全选项

```json
{
  "tabAutocompleteOptions": {
    "enabled": true,                    // 是否启用
    "debounceDelay": 300,              // 防抖延迟（毫秒）
    "maxPromptTokens": 2000,           // 最大提示词 token 数
    "useCache": true,                  // 是否使用缓存
    "preventHotwordTriggers": false,   // 防止热词触发
    "disableFor": [                    // 禁用的文件类型
      "txt",
      "md"
    ],
    "enableFor": [                     // 启用的文件类型
      "ts",
      "js",
      "py",
      "java",
      "cpp",
      "c"
    ]
  }
}
```

### 模型特定配置

#### OpenAI 配置

```json
{
  "models": [
    {
      "title": "GPT-4",
      "provider": "openai",
      "model": "gpt-4",
      "apiKey": "sk-your-api-key",
      "apiBase": "https://api.openai.com/v1",
      "tabAutocompleteOptions": {
        "temperature": 0.01,
        "maxTokens": 128,
        "topP": 1.0,
        "frequencyPenalty": 0.0,
        "presencePenalty": 0.0
      }
    }
  ]
}
```

#### Azure OpenAI 配置

```json
{
  "models": [
    {
      "title": "Azure GPT-4",
      "provider": "azure",
      "model": "gpt-4",
      "apiKey": "your-azure-api-key",
      "apiBase": "https://your-resource.openai.azure.com",
      "deployment": "gpt-4-deployment-name",
      "apiVersion": "2023-07-01-preview"
    }
  ]
}
```

## 🔧 自定义配置

### 上下文配置

```json
{
  "contextProviders": [
    {
      "name": "diff",
      "params": {}
    },
    {
      "name": "open",
      "params": {
        "nFiles": 5
      }
    }
  ]
}
```

### 规则配置

在项目根目录创建 `.continue/rules/` 目录，添加规则文件：

```markdown
# 代码风格规则

请遵循以下代码风格：
- 使用 TypeScript 严格模式
- 函数名使用驼峰命名
- 常量使用大写字母和下划线
- 添加适当的注释
```

## 📊 性能优化

### 缓存配置

```json
{
  "tabAutocompleteOptions": {
    "useCache": true,
    "cacheSize": 10000,
    "cacheTTL": 3600000  // 1小时
  }
}
```

### Token 优化

```json
{
  "tabAutocompleteOptions": {
    "maxPromptTokens": 2000,
    "prefixLength": 256,
    "suffixLength": 256
  }
}
```

## 🚨 故障排除

### 常见问题

1. **自动补全不工作**
   - 检查 API 密钥是否正确
   - 确认模型是否支持
   - 检查网络连接

2. **响应慢**
   - 增加 `debounceDelay`
   - 减少 `maxPromptTokens`
   - 启用缓存

3. **建议质量差**
   - 调整 `temperature` 设置
   - 检查上下文配置
   - 尝试不同的模型

### 调试配置

```json
{
  "contidebug": {
    "showLogs": true,
    "logLevel": "info"
  }
}
```

## 🎨 自定义快捷键

在 VS Code 中打开快捷键设置（Ctrl/Cmd + K Ctrl/Cmd + S）：

```json
[
  {
    "key": "ctrl+k ctrl+a",
    "command": "conti.toggleTabAutocompleteEnabled",
    "when": "editorTextFocus"
  },
  {
    "key": "ctrl+alt+space",
    "command": "conti.forceAutocomplete",
    "when": "editorTextFocus"
  }
]
```

## 📚 配置模板

### 基础模板（推荐新手）

```json
{
  "models": [
    {
      "title": "GPT-4",
      "provider": "openai",
      "model": "gpt-4",
      "apiKey": "sk-your-api-key"
    }
  ],
  "tabAutocompleteOptions": {
    "enabled": true,
    "debounceDelay": 500,
    "maxPromptTokens": 1500
  }
}
```

### 高级模板（推荐有经验用户）

```json
{
  "models": [
    {
      "title": "GPT-4",
      "provider": "openai",
      "model": "gpt-4",
      "apiKey": "sk-your-api-key",
      "tabAutocompleteOptions": {
        "temperature": 0.01,
        "maxTokens": 128,
        "useCache": true
      }
    }
  ],
  "contextProviders": [
    {
      "name": "diff",
      "params": {}
    },
    {
      "name": "open",
      "params": {
        "nFiles": 3
      }
    }
  ],
  "tabAutocompleteOptions": {
    "debounceDelay": 300,
    "maxPromptTokens": 2000,
    "preventHotwordTriggers": false,
    "disableFor": ["txt", "md", "json"],
    "enableFor": ["ts", "js", "py", "java", "cpp", "c", "go", "rust"]
  }
}
```

## 🆘 获取帮助

- **GitHub Issues**: [项目地址](https://github.com/continuedev/continue)
- **文档**: [官方文档](https://docs.continue.dev/)
- **社区**: [Discord 社区](https://discord.gg/continue)

---

💡 **提示**: 开始时建议使用基础模板，熟悉后再根据需要调整高级配置。