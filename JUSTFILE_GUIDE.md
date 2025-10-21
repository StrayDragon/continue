# Justfile 使用指南

## 🚀 快速开始

Conti 项目使用 `just` 来管理所有的构建和开发任务。`just` 是一个现代化的命令运行器，比 Make 更简单易用。

## 📦 安装 Just

### macOS
```bash
brew install just
```

### Linux (Ubuntu/Debian)
```bash
sudo apt install just
```

### 从源码安装
```bash
cargo install just
```

## 🎯 基本使用

### 查看所有可用命令
```bash
just          # 显示默认信息和帮助
just help     # 显示所有可用命令列表
just -l       # 详细命令列表
```

### 常用命令
```bash
just setup    # 初始化项目环境
just build    # 构建扩展
just dev      # 开发模式
just test     # 运行测试
just package  # 打包 VSIX
```

## 📋 命令分类

### 🔧 环境管理
```bash
just check-node     # 检查 Node.js 版本
just install        # 安装生产依赖
just install-dev    # 安装所有依赖
just setup          # 完整环境初始化
```

### 🧹 清理任务
```bash
just clean          # 清理构建文件
just clean-all      # 深度清理（包括 node_modules）
just reset          # 完全重置项目
```

### 🏗️ 构建任务
```bash
just compile        # 编译 TypeScript
just compile-fast   # 快速编译（跳过错误检查）
just check-errors   # 检查编译错误
just build          # 完整构建
just package        # 打包 VSIX 文件
```

### 👨‍💻 开发任务
```bash
just dev            # 开发模式（监听文件变化）
just test           # 运行测试
just lint           # 代码检查
just lint-fix       # 修复代码格式
```

### 🔍 检查任务
```bash
just status         # 项目状态概览
just deps-status    # 依赖状态检查
just build-status   # 构建状态检查
just version-check  # 版本信息
```

### 🛠️ 修复任务
```bash
just fix            # 修复构建问题
just fix-types      # 修复类型定义
just fix-deps       # 修复依赖问题
just fix-all        # 全部修复
```

### 📊 实用工具
```bash
just backup         # 备份当前状态
just count-lines    # 统计代码行数
just find-file <pattern>  # 查找文件
just docs           # 查看文档列表
```

## 🚀 工作流程示例

### 新项目设置
```bash
just setup      # 一键初始化
just status     # 检查状态
just build      # 构建项目
```

### 开发流程
```bash
just dev        # 启动开发模式
# 修改代码...
just lint-fix   # 修复格式
just test       # 运行测试
just build      # 构建验证
```

### 发布流程
```bash
just clean-all  # 清理环境
just setup      # 重新初始化
just build      # 构建
just test       # 测试
just package    # 打包
just pre-release # 发布前检查
```

### 问题排查
```bash
just status         # 检查状态
just check-errors   # 查看编译错误
just fix            # 自动修复
just deps-status    # 检查依赖
just backup         # 备份当前状态
```

## 🎯 高级用法

### 参数传递
```bash
just find-file ts    # 查找包含 'ts' 的文件
just find-file config  # 查找包含 'config' 的文件
```

### 命令组合
```bash
just clean && just build && just test
```

### 条件执行
```bash
just check-errors || echo "编译失败，需要修复"
```

## 🔧 自定义命令

如果需要添加新的命令，可以编辑 `justfile` 文件：

```makefile
# 自定义命令示例
custom-task:
    @echo "执行自定义任务..."
    # 你的命令在这里
```

## 🆘 故障排除

### Just 未找到
```bash
# 确保 just 已安装
which just

# 如果未找到，添加到 PATH
export PATH="$HOME/.cargo/bin:$PATH"
```

### 权限问题
```bash
chmod +x justfile  # 确保 justfile 有执行权限
```

### 命令执行失败
```bash
just --verbose  # 显示详细执行信息
just --dry-run   # 预览命令但不执行
```

## 📝 最佳实践

1. **开发前**: `just setup` → `just status`
2. **开发中**: `just dev` → `just lint-fix` → `just test`
3. **提交前**: `just clean` → `just build` → `just test`
4. **发布前**: `just pre-release`

## 🎉 优势

- **简单易用**: 语法比 Make 更直观
- **功能强大**: 支持参数、条件、循环等
- **跨平台**: 在 macOS、Linux、Windows 上都能运行
- **可维护**: 所有命令集中在一个文件中
- **自动化**: 减少重复的手动操作

使用 `just` 可以大大提高开发效率，减少命令行操作的复杂性！