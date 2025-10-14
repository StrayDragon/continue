# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Continue is an open-source AI code assistant that provides chat, autocomplete, and code editing capabilities. The project is structured as a multi-package TypeScript monorepo with support for VS Code, JetBrains, and CLI extensions.

## Important Notes

**This repository contains only the VS Code extension and core functionality** - it's been simplified from the original Continue project to focus on tab autocomplete functionality only. The full GUI and other extensions have been removed.

## Common Development Commands

### Environment Setup
```bash
# Ensure Node.js 20.19.0+ is installed
nvm use

# Install dependencies
npm install
```

### Building
```bash
# Build VS Code extension
npm run package

# Compile TypeScript
npm run compile
```

### Testing
```bash
# Run tests (if any)
npm test

# Linting
npm run lint

# Type checking
npm run tsc:check
```

## Architecture

### Core Components

- **`core/`**: Shared core functionality including LLM providers, model management, and protocol handling
  - LLM providers in `core/llm/llms/` (OpenAI, Anthropic, Ollama, etc.)
  - Protocol messages in `core/protocol/`
  - Core orchestration in `core/core.ts`

- **`extensions/vscode/`**: VS Code extension built with esbuild
  - Extension entry point in `extensions/vscode/src/extension.ts`
  - WebView integration for GUI
  - VS Code-specific commands and keybindings

- **`packages/`**: Shared packages
  - `config-types/`: TypeScript type definitions for configuration
  - `config-yaml/`: YAML configuration parsing
  - `fetch/`: HTTP fetch utilities
  - `continue-sdk/`: SDK for extending Continue
  - `openai-adapters/`: OpenAI API adapters
  - `terminal-security/`: Terminal security utilities

### Key Architecture Patterns

- **Protocol-based communication**: All components communicate via typed protocol messages in `core/protocol/`
- **LLM abstraction**: Core provides unified interface for multiple LLM providers
- **Plugin system**: Supports custom LLM providers via extensions
- **Multi-environment**: Same core runs in VS Code, JetBrains, CLI, and web environments

### Development Workflow

1. **Making changes to core**: Update `core/` - changes are automatically reflected in all extensions
2. **VS Code extension**: Use VS Code debugging tasks (`Tasks: Run Task > vscode-extension:build`)
3. **Adding new LLM providers**: Create provider class in `core/llm/llms/` and register in index

## Important Rules

### Protocol Messages
When adding new protocol messages:
- Define types in `core/protocol/`
- Add to `core/protocol/passThrough.ts` for webview-core communication
- Implement in appropriate handler (core.ts, useWebviewListener, or IDE messengers)

### LLM Providers
To add new LLM providers:
1. Create provider class extending `BaseLLM` in `core/llm/llms/`
2. Add to `LLMs` array in `core/llm/llms/index.ts`
3. Update `PROVIDER_SUPPORTS_IMAGES` in `core/llm/autodetect.ts` if supports images

## Configuration

Continue supports both JSON and YAML configuration:
- JSON: `.continue/config.json` or `.continuerc.json`
- YAML: `config.yaml`
- Schema validation provided for both formats

## Debugging

- **VS Code Extension**: Use `Launch extension` debug configuration
- **Core**: Breakpoints work in core and VS Code extension code
- **Reload**: Use `Ctrl/Cmd+Shift+P > Developer: Reload Window` after changes

## Extension Features

The VS Code extension provides:
- **Tab Autocomplete**: AI-powered code completions using Tab key
- **Next Edit**: Predictive edit suggestions
- **Configuration**: Model and API key management
- **Keybindings**:
  - `Ctrl+K Ctrl+A` (Cmd+K Cmd+A on Mac): Toggle autocomplete
  - `Ctrl+Alt+Space` (Cmd+Alt+Space on Mac): Force autocomplete
  - `Ctrl+K Ctrl+N`: Toggle next edit predictions

## Package Structure

```
├── core/                    # Core functionality
├── extensions/vscode/       # VS Code extension
├── packages/               # Shared packages
│   ├── config-types/       # Configuration types
│   ├── config-yaml/        # YAML parsing
│   ├── fetch/              # HTTP utilities
│   ├── continue-sdk/       # SDK
│   ├── openai-adapters/    # OpenAI adapters
│   └── terminal-security/  # Security utilities
└── .continue/             # Configuration directory
```