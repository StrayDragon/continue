# 构建修复指南

## 🚨 当前构建错误分析

### 主要问题类型

1. **缺失模块导入** - 删除了模块但代码中仍在引用
2. **类型声明缺失** - 缺少 npm 包的类型定义
3. **依赖路径错误** - 模块路径需要更新
4. **未使用的变量** - 删除功能后遗留的代码

## 🔧 修复策略

### 第一阶段：核心依赖修复

#### 1. 修复 AutocompleteLoggingService
```typescript
// core/autocomplete/util/AutocompleteLoggingService.ts
// 删除对 ../../data/log 和 ../../util/posthog 的引用
// 简化为本地日志记录
```

#### 2. 修复 AutocompleteLruCache
```typescript
// core/autocomplete/util/AutocompleteLruCache.ts
// 删除对 sqlite、sqlite3 的依赖
// 改为内存缓存
```

#### 3. 简化 ContextRetrievalService
```typescript
// core/autocomplete/context/ContextRetrievalService.ts
// 删除复杂的索引功能
// 保留基本的上下文获取
```

### 第二阶段：VS Code 扩展修复

#### 1. 简化 VsCodeExtension
```typescript
// extensions/vscode/src/extension/VsCodeExtension.ts
// 删除 webview 协议相关代码
// 简化为核心自动补全功能
```

#### 2. 修复激活流程
```typescript
// extensions/vscode/src/activation/activate.ts
// 简化激活逻辑
// 移除不必要的初始化步骤
```

### 第三阶段：依赖清理

#### 需要移除的依赖
```json
{
  "remove": [
    "web-tree-sitter",      // 复杂的语法树解析
    "sqlite", "sqlite3",    // 数据库存储
    "async-mutex",         // 异步锁（简化版不需要）
    "handlebars",          // 模板引擎（简化版不需要）
    "puppeteer",           // 浏览器自动化
    "systeminformation",   // 系统信息获取
    "ws",                  // WebSocket（简化版不需要）
    "cors",                // CORS（服务器功能不需要）
    "express"              // Express 服务器
  ]
}
```

#### 需要保留的核心依赖
```json
{
  "keep": [
    "uuid",                // 唯一ID生成
    "axios",               // HTTP 客户端
    "diff",                // 文本差异
    "ignore",              // 文件忽略规则
    "lru-cache",           // LRU 缓存
    "node-fetch",          // Node.js fetch
    "vscode-languageclient" // VS Code 语言客户端
  ]
}
```

## 🛠️ 自动修复脚本

### 创建修复脚本
```bash
#!/bin/bash
# build-fix.sh

echo "🔧 开始修复构建问题..."

# 1. 修复 TypeScript 编译问题
echo "修复 TypeScript 导入..."
find core -name "*.ts" -exec sed -i 's|from.*indexing.*||g' {} \;

# 2. 删除问题文件
echo "删除问题文件..."
rm -f core/autocomplete/util/AutocompleteLoggingService.ts
rm -f core/autocomplete/util/AutocompleteLruCache.ts

# 3. 创建简化版本
echo "创建简化版本..."
# 脚本内容...

echo "✅ 修复完成！"
```

## 📋 手动修复清单

### ✅ 已修复
- [x] 删除测试文件
- [x] 删除聊天功能
- [x] 简化核心模块
- [x] 更新 package.json
- [x] 简化类型定义

### 🔄 进行中
- [ ] 修复 AutocompleteLoggingService
- [ ] 修复 AutocompleteLruCache
- [ ] 简化 ContextRetrievalService
- [ ] 修复 VS Code 扩展

### ⏳ 待修复
- [ ] 清理 npm 依赖
- [ ] 修复所有导入错误
- [ ] 测试编译
- [ ] 测试功能

## 🎯 最小可行产品 (MVP)

### MVP 功能范围
1. **基础自动补全** - 单行和多行补全
2. **OpenAI 集成** - 支持 GPT-4/3.5
3. **基础配置** - API 密钥和模型选择
4. **VS Code 集成** - 状态栏和快捷键

### MVP 技术栈
```
Core:
- CompletionProvider (简化版)
- ConfigHandler (简化版)
- LLM (仅 OpenAI)

VS Code:
- InlineCompletionProvider
- Status Bar
- Settings

Dependencies:
- uuid
- axios
- diff
- lru-cache
```

## 🚀 快速构建命令

```bash
# 1. 清理
npm run clean

# 2. 安装依赖
npm install --production

# 3. 编译
npm run compile

# 4. 打包
npm run package
```

## 📚 下一步计划

1. **立即修复** - 解决编译错误
2. **功能测试** - 确保自动补全工作
3. **性能优化** - 减少包大小
4. **文档完善** - 更新使用指南