# Conti Architecture

## Overview

Conti is a lightweight VS Code extension designed specifically for AI-powered tab autocomplete functionality. It's built on a simplified version of the Continue core architecture, focusing only on the essential components needed for autocomplete.

## Core Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        VS Code Extension                         │
├─────────────────────────────────────────────────────────────────┤
│  src/extension.ts (Entry Point)                                  │
│  ├── Extension Activation                                        │
│  ├── Configuration Management                                   │
│  ├── Command Registration                                       │
│  └── Autocomplete Provider Setup                                │
├─────────────────────────────────────────────────────────────────┤
│  src/autocomplete/ (VS Code Integration)                         │
│  ├── CompletionProvider.ts                                      │
│  ├── NextEditProvider.ts                                       │
│  └── utils/                                                     │
├─────────────────────────────────────────────────────────────────┤
│                      Core Engine                                │
│  core/autocomplete/                                             │
│  ├── CompletionProvider.ts (Core Logic)                         │
│  ├── ContextRetrievalService.ts                                │
│  ├── CompletionStreamer.ts                                      │
│  └── Caching/Debouncing                                        │
├─────────────────────────────────────────────────────────────────┤
│                    LLM Integration                              │
│  core/llm/                                                      │
│  ├── llms/ (Provider implementations)                          │
│  ├── autodetect.ts                                              │
│  └── utils/                                                     │
├─────────────────────────────────────────────────────────────────┤
│                   Configuration                                  │
│  src/config/                                                    │
│  ├── ConfigManager.ts                                           │
│  ├── Settings.ts                                                │
│  └── Validation.ts                                              │
└─────────────────────────────────────────────────────────────────┘
```

## Key Components

### 1. Extension Entry Point (`src/extension.ts`)

The main entry point that:
- Registers the extension with VS Code
- Sets up configuration management
- Registers commands and keybindings
- Initializes autocomplete providers
- Manages extension lifecycle

```typescript
export function activate(context: vscode.ExtensionContext) {
  // Initialize configuration
  const configManager = new ConfigManager();

  // Register commands
  registerCommands(context, configManager);

  // Setup autocomplete providers
  const completionProvider = new CompletionProvider(configManager);
  const nextEditProvider = new NextEditProvider(configManager);

  // Register providers
  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider(
      { pattern: '**' },
      completionProvider,
      '\t', '\n', '.', ' ', '(', '[', '{', '"', "'"
    )
  );
}
```

### 2. Autocomplete Provider (`src/autocomplete/`)

VS Code-specific integration that:
- Handles VS Code completion item requests
- Manages completion item presentation
- Handles user interactions with completions
- Provides real-time suggestions

### 3. Core Autocomplete Engine (`core/autocomplete/`)

The heart of the autocomplete system:
- **CompletionProvider**: Main logic for generating completions
- **ContextRetrievalService**: Gathers code context
- **CompletionStreamer**: Manages streaming responses from LLMs
- **Caching**: Efficient caching of previous completions
- **Debouncing**: Prevents excessive API calls

### 4. LLM Integration (`core/llm/`)

Handles communication with language models:
- **Provider abstraction**: Unified interface for different LLMs
- **Supported providers**: OpenAI, Anthropic, Ollama, and more
- **Streaming support**: Real-time completion streaming
- **Error handling**: Robust error handling and retries

### 5. Configuration Management (`src/config/`)

Manages extension settings:
- **ConfigManager**: Central configuration handler
- **Settings**: TypeScript interfaces for configuration
- **Validation**: Zod-based configuration validation
- **Schema**: VS Code configuration schema

## Data Flow

```
User Types → VS Code → CompletionProvider → Core Engine → LLM Provider → LLM
    ↑                                                                      ↓
    └─────────── Display Completion ← Process Response ← CompletionStreamer ←┘
```

### 1. User Input
- User types in VS Code editor
- VS Code triggers completion request

### 2. Context Gathering
- **CompletionProvider** gathers current file context
- Retrieves cursor position and surrounding code
- Gets relevant files from workspace

### 3. LLM Request
- **Core Engine** formats request for LLM
- Sends request through **LLM Provider**
- Handles streaming responses

### 4. Response Processing
- **CompletionStreamer** processes streaming responses
- **Caching** stores results for future use
- Formats completions for VS Code

### 5. Display
- **CompletionProvider** presents completions to user
- Handles user selection and insertion

## Performance Optimizations

### 1. Caching Strategy
- **Memory cache**: LRU cache for recent completions
- **Persistent cache**: Optional disk-based caching
- **Context-aware**: Cache based on code context

### 2. Debouncing
- **Input debouncing**: Prevents excessive API calls
- **Request cancellation**: Cancels outdated requests
- **Smart throttling**: Adaptive request limits

### 3. Lazy Loading
- **On-demand initialization**: Components load only when needed
- **Provider initialization**: LLM providers initialize on first use
- **Configuration loading**: Settings load lazily

### 4. Memory Management
- **Resource cleanup**: Proper disposal of resources
- **Memory limits**: Enforce memory usage limits
- **Garbage collection**: Optimize for frequent GC

## Configuration System

### 1. Settings Schema
```typescript
interface ContiConfig {
  enableTabAutocomplete: boolean;
  enableNextEdit: boolean;
  model: string;
  apiKey: string;
  // Additional settings...
}
```

### 2. Configuration Flow
```
VS Code Settings → ConfigManager → Validation → Core Components
```

### 3. Runtime Updates
- **Hot reload**: Settings update without restart
- **Validation**: Real-time configuration validation
- **Fallbacks**: Graceful handling of invalid settings

## Error Handling

### 1. Error Types
- **Configuration errors**: Invalid settings
- **Network errors**: API call failures
- **LLM errors**: Model response issues
- **VS Code errors**: Extension API issues

### 2. Error Recovery
- **Retry logic**: Exponential backoff for retries
- **Fallback providers**: Alternative LLM providers
- **Graceful degradation**: Continue working with limited features
- **User feedback**: Clear error messages

### 3. Logging
- **Structured logging**: Consistent log format
- **Performance metrics**: Track latency and memory usage
- **Error tracking**: Detailed error reporting
- **Debug mode**: Verbose logging for development

## Security Considerations

### 1. API Key Management
- **Secure storage**: VS Code secret storage
- **Environment variables**: Support for env vars
- **Encryption**: Optional encryption of sensitive data

### 2. Code Privacy
- **Local processing**: Optional local-only processing
- **Data minimization**: Send only necessary code context
- **User control**: Clear privacy settings

### 3. Network Security
- **HTTPS**: All API calls over HTTPS
- **Certificate validation**: Proper certificate handling
- **Proxy support**: Support for corporate proxies

## Extension Lifecycle

### 1. Activation
- **Lazy activation**: Activates on first use
- **Fast startup**: Minimal initialization time
- **Dependency injection**: Clean component initialization

### 2. Runtime
- **Event-driven**: Responds to VS Code events
- **Resource management**: Proper resource cleanup
- **State management**: Consistent state handling

### 3. Deactivation
- **Cleanup**: Proper resource disposal
- **State persistence**: Save necessary state
- **Graceful shutdown**: Handle VS Code shutdown

## Testing Strategy

### 1. Unit Tests
- **Component testing**: Individual component tests
- **Service testing**: Business logic tests
- **Utility testing**: Helper function tests

### 2. Integration Tests
- **Provider integration**: LLM provider integration
- **Configuration testing**: Settings validation
- **VS Code integration**: Extension API tests

### 3. E2E Tests
- **User workflow**: Complete user scenarios
- **Performance testing**: Latency and memory tests
- **Compatibility testing**: VS Code version compatibility

## Development Workflow

### 1. Local Development
- **Hot reload**: Automatic extension reloading
- **Debug support**: VS Code debugging integration
- **Development tools**: Integrated development tools

### 2. Build Process
- **TypeScript compilation**: Strict type checking
- **Bundle optimization**: Optimized extension bundle
- **Package generation**: VSIX package generation

### 3. Quality Assurance
- **Code linting**: ESLint configuration
- **Code formatting**: Prettier formatting
- **Test coverage**: Comprehensive test coverage

## Future Enhancements

### 1. Performance
- **Web Workers**: Offload processing to workers
- **Incremental updates**: Partial context updates
- **Smart caching**: Machine learning-based caching

### 2. Features
- **Multi-line completions**: Complete code blocks
- **Context-aware suggestions**: Project-aware completions
- **Custom models**: Support for custom LLM models

### 3. Integration
- **Language servers**: Integration with language servers
- **Debugging integration**: Debug-aware completions
- **Collaborative features**: Multi-user features