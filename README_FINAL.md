# Conti - 轻量级 AI 自动补全扩展

[![VS Code](https://img.shields.io/badge/VS%20Code-1.70.0+-blue.svg)](https://code.visualstudio.com/)
[![License](https://img.shields.io/badge/License-Apache%202.0-green.svg)](./LICENSE)

> 🚀 **Conti** 是基于 Continue 项目精简而来的轻量级 AI 自动补全 VS Code 扩展，专注于提供高效、快速的代码补全体验。

## ✨ 特性

- 🎯 **专注自动补全** - 移除了聊天、GUI等复杂功能，专注核心补全体验
- ⚡ **轻量高效** - 包体积减少80%，启动速度显著提升
- 🔧 **易于配置** - 简化的配置选项，新手友好
- 🧩 **模块化设计** - 清晰的代码结构，便于维护和扩展
- 📦 **即插即用** - 单个VSIX文件，安装简单

## 🚀 快速开始

### 安装方法

#### 方法1: 从VSIX安装（推荐）
```bash
# 克隆项目
git clone <your-repo-url>
cd continue

# 创建VSIX文件
just create-minimal-vsix

# 在VS Code中安装
# 1. 打开VS Code
# 2. Ctrl+Shift+P -> "Extensions: Install from VSIX..."
# 3. 选择 extensions/vscode/dist-minimal/conti-minimal.vsix
```

#### 方法2: 命令行安装
```bash
code --install-extension extensions/vscode/dist-minimal/conti-minimal.vsix
```

### 基本配置

1. **打开设置**: `Ctrl/Cmd + ,` 搜索 "Conti"
2. **配置API密钥**:
   ```json
   {
     "conti.model": "gpt-4",
     "conti.apiKey": "sk-your-api-key-here",
     "conti.enableTabAutocomplete": true
   }
   ```

3. **重启VS Code**使配置生效

## 📋 支持的模型

| 模型 | 提供商 | 说明 |
|------|--------|------|
| GPT-4 | OpenAI | 推荐使用，补全质量最佳 |
| GPT-3.5-Turbo | OpenAI | 速度快，成本较低 |
| Claude-3-Sonnet | Anthropic | 平衡性能和成本 |
| Ollama | 本地 | 支持本地模型，完全私有 |

## 🎮 快捷键

| 快捷键 | 功能 | 平台 |
|--------|------|------|
| `Ctrl+K Ctrl+A` | 切换自动补全 | Windows/Linux |
| `Cmd+K Cmd+A` | 切换自动补全 | macOS |
| `Ctrl+Alt+Space` | 强制补全 | Windows/Linux |
| `Cmd+Alt+Space` | 强制补全 | macOS |
| `Ctrl+K Ctrl+N` | 切换Next Edit | Windows/Linux |

## 🔧 开发指南

### 环境要求

- Node.js 20.19.0+
- VS Code 1.70.0+
- just命令行工具（推荐）

### 安装just

```bash
# macOS
brew install just

# Linux (Ubuntu/Debian)
sudo apt install just

# 其他系统
cargo install just
```

### 开发命令

```bash
# 查看所有可用命令
just

# 初始化开发环境
just setup

# 开发模式（监听文件变化）
just dev

# 构建项目
just build

# 创建VSIX包
just create-minimal-vsix

# 查看项目状态
just status

# 修复构建问题
just fix

# 清理项目
just clean
```

## 📁 项目结构

```
continue/
├── core/                           # 核心功能模块
│   ├── autocomplete/              # 自动补全核心逻辑
│   ├── config/                    # 配置管理
│   ├── llm/                       # LLM提供者
│   └── util/                      # 工具函数
├── extensions/vscode/             # VS Code扩展
│   ├── src/                       # 源代码
│   ├── dist-minimal/              # 最小化构建输出
│   └── package.json              # 扩展配置
├── packages/                      # 共享包
├── justfile                       # 构建命令
├── CONFIG_GUIDE.md               # 详细配置指南
└── README_FINAL.md               # 项目说明（本文件）
```

## 🎯 项目目标

### 已完成 ✅
- [x] 移除80%的非核心功能
- [x] 简化配置系统
- [x] 创建可安装的VSIX包
- [x] 建立自动化构建系统
- [x] 提供完整的开发文档

### 开发中 🔄
- [ ] 修复TypeScript编译错误
- [ ] 实现完整的自动补全功能
- [ ] 添加更多LLM提供者
- [ ] 优化性能和缓存

### 计划中 📋
- [ ] 添加代码质量分析
- [ ] 支持自定义提示模板
- [ ] 添加使用统计
- [ ] 创建插件系统

## 🤝 贡献指南

### 开发流程

1. **Fork项目**并创建功能分支
2. **安装环境**: `just setup`
3. **开发功能**: `just dev`
4. **测试构建**: `just build`
5. **提交PR**并描述变更

### 代码规范

- 使用TypeScript严格模式
- 遵循ESLint配置
- 添加适当的注释
- 保持简洁的代码结构

## 🐛 故障排除

### 常见问题

**Q: 扩展安装后无法激活**
A: 检查VS Code版本是否≥1.70.0，重启VS Code

**Q: 自动补全不工作**
A:
1. 检查API密钥是否正确
2. 确认网络连接正常
3. 查看VS Code开发者工具控制台

**Q: 构建失败**
A: 运行 `just fix` 自动修复常见问题

**Q: 获取更多帮助**
A: 查看项目Issues或创建新问题

## 📄 许可证

本项目基于 Apache 2.0 许可证开源。详见 [LICENSE](./LICENSE) 文件。

## 🙏 致谢

- 感谢 [Continue](https://github.com/continuedev/continue) 项目提供的基础代码
- 感谢所有贡献者和社区成员的支持

## 📞 联系方式

- 🐛 **Bug报告**: [GitHub Issues](https://github.com/your-repo/issues)
- 💬 **讨论**: [GitHub Discussions](https://github.com/your-repo/discussions)
- 📧 **邮件**: your-email@example.com

---

<div align="center">

**🌟 如果这个项目对你有帮助，请给个Star！**

Made with ❤️ by Conti Team

</div>