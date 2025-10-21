# 简化项目结构

## 📁 当前精简后的结构

```
continue/
├── core/                          # 核心自动补全功能
│   ├── autocomplete/              # ✅ 保留 - 自动补全核心
│   │   ├── CompletionProvider.ts
│   │   ├── context/
│   │   ├── filtering/
│   │   ├── generation/
│   │   ├── postprocessing/
│   │   ├── prefiltering/
│   │   ├── snippets/
│   │   ├── templating/
│   │   ├── util/
│   │   └── types.ts
│   ├── config/                    # ✅ 保留 - 精简配置
│   │   ├── ConfigHandler.ts
│   │   ├── types.ts
│   │   ├── util.ts
│   │   └── validation.ts
│   ├── llm/                       # ✅ 保留 - LLM 支持
│   │   ├── llms/
│   │   ├── countTokens.ts
│   │   └── constants.ts
│   ├── protocol/                  # ✅ 保留 - 消息协议
│   │   ├── core.ts
│   │   └── messenger.ts
│   ├── util/                      # ✅ 保留 - 精简工具
│   │   ├── errors.ts
│   │   ├── Logger.ts
│   │   ├── paths.ts
│   │   └── index.ts
│   ├── core.ts                    # ✅ 重写 - 简化核心
│   └── index.d.ts                 # ✅ 需要简化
├── extensions/vscode/             # VS Code 扩展
│   ├── src/
│   │   ├── autocomplete/          # ✅ 保留 - VS Code 补全实现
│   │   ├── extension/             # ✅ 需要简化
│   │   ├── activation/            # ✅ 需要简化
│   │   ├── extension.ts           # ✅ 已简化
│   │   └── util/                  # ✅ 需要简化
│   ├── package.json               # ✅ 已更新
│   ├── tsconfig.json              # ✅ 已配置
│   └── out/                       # 构建输出
├── packages/                      # 共享包
│   ├── config-types/              # ✅ 保留 - 类型定义
│   ├── fetch/                     # ✅ 保留 - HTTP 工具
│   └── openai-adapters/           # ✅ 保留 - OpenAI 适配器
└── CONFIG_GUIDE.md               # ✅ 新增 - 配置指南
```

## 🚫 已删除的模块

- `core/commands/` - 斜杠命令功能
- `core/indexing/` - 代码索引和搜索
- `core/tools/` - 工具调用系统
- `core/context/` - 上下文提供者
- `core/promptFiles/` - 提示文件管理
- `core/control-plane/` - 控制平面
- `core/data/` - 数据存储
- `core/codeRenderer/` - 代码渲染
- `core/continueServer/` - 服务器功能
- `core/deploy/` - 部署相关
- 所有测试文件和配置

## 🎯 优化目标

1. **简化依赖** - 移除不必要的 npm 依赖
2. **修复编译错误** - 解决模块依赖问题
3. **精简类型定义** - 创建简化的 index.d.ts
4. **优化性能** - 减少包大小和启动时间
5. **改进配置** - 提供更简单的配置选项