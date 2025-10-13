# Continue Tab智能补全分离实施计划

## 项目目标
将Continue项目中的tab智能补全功能分离为独立的"conti"插件，专注于高效、可观测、可测试的代码自动补全体验。

## 核心组件分析结果

### 必须保留的核心组件
1. **core/autocomplete/** - 完整的tab补全实现
   - `CompletionProvider.ts` - 核心补全引擎
   - `context/ContextRetrievalService.ts` - 上下文检索
   - `generation/CompletionStreamer.ts` - 流式生成
   - `util/AutocompleteLruCache.ts` - LRU缓存
   - `filtering/` - 结果过滤和处理

2. **core/nextEdit/** - 高级预测功能（可选但推荐保留）

3. **core/llm/llms/** - LLM提供者实现

4. **extensions/vscode/src/autocomplete/** - VS Code集成
   - `completionProvider.ts` - InlineCompletionItemProvider实现
   - `statusBar.ts` - 状态管理

5. **基础配置和工具**
   - `core/config/` 中的tab补全相关配置
   - `core/util/parameters.ts` - 默认参数
   - 基础的类型定义

### 可以移除的组件
- 完整的GUI界面（gui/目录）
- 聊天功能（core/chat/）
- 代码索引（大部分core/indexing/）
- 大部分上下文提供者
- 文档搜索功能
- VS Code扩展中的非补全命令和界面

## 执行任务列表

### 第一步：在当前项目中精简代码
1. **分析现有测试套件**
   - 运行现有测试确认基线
   - 识别与tab补全相关的测试

2. **移除非核心依赖**
   - 清理package.json中的React、Redux等GUI依赖
   - 移除不必要的npm包

3. **精简扩展配置**
   - 简化package.json中的VS Code命令和配置
   - 保留补全相关的contribution points

4. **重构代码结构**
   - 移除或注释掉非核心功能
   - 简化配置加载逻辑
   - 清理协议消息定义

### 第二步：创建独立的conti项目
1. **初始化项目结构**
   ```
   conti/
   ├── src/
   │   ├── core/           # 从Continue迁移的核心代码
   │   ├── vscode/         # VS Code特定集成
   │   ├── config/         # 简化的配置系统
   │   └── types/          # 类型定义
   ├── package.json
   ├── tsconfig.json
   └── webpack.config.js
   ```

2. **迁移核心代码**
   - 复制并适配autocomplete相关代码
   - 简化依赖关系
   - 移除Continue特定的依赖

3. **实现基础监控**
   - 添加性能指标收集
   - 实现错误追踪
   - 添加基本的统计功能

### 第三步：测试和验证
1. **单元测试**
   - 核心补全逻辑测试
   - 缓存机制测试
   - 配置解析测试

2. **集成测试**
   - VS Code API集成测试
   - 不同LLM provider测试

3. **性能测试**
   - 延迟测量
   - 内存使用监控
   - 缓存效率验证

## 具体执行项目

### 配置简化
创建最小化的配置结构：
```typescript
interface ContiConfig {
  model: string;
  apiKey?: string;
  apiBase?: string;
  debounceDelay?: number;
  maxPromptTokens?: number;
  enableCache?: boolean;
  multilineCompletions?: "always" | "never" | "auto";
}
```

### 监控实现
添加基础的指标收集：
```typescript
class ContiMetrics {
  private metrics = {
    requestCount: 0,
    acceptCount: 0,
    cacheHits: 0,
    averageLatency: 0,
    errorCount: 0
  };

  recordRequest(duration: number, accepted: boolean, fromCache: boolean) {
    // 记录请求指标
  }

  getStats() {
    // 返回统计信息
  }
}
```

### 测试框架
创建关键测试用例：
- 补全触发和接受流程
- 不同代码场景的补全质量
- 错误处理和恢复机制

## 开始实施

### 立即执行任务
1. 创建PLAN.md ✅
2. 运行现有测试基线
3. 识别需要移除的依赖和文件
4. 开始精简当前项目

## 成功指标
- 插件启动时间 < 500ms
- 平均补全延迟 < 300ms
- 内存占用 < 50MB
- 缓存命中率 > 60%
- 用户接受率 > 40%