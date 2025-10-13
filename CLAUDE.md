# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Continue is an open-source AI code assistant that provides chat, autocomplete, and code editing capabilities. The project is structured as a multi-package TypeScript monorepo with support for VS Code, JetBrains, and CLI extensions.

## Common Development Commands

### Environment Setup
```bash
# Install all dependencies across the project
npm run install-all-dependencies
# Or use VS Code Tasks: Run Task > install-all-dependencies

# Ensure Node.js 20.19.0+ is installed
nvm use
```

### Development
```bash
# Watch all TypeScript compilation (core, GUI, VS Code, binary)
npm run tsc:watch

# Start development servers for VS Code extension
# Use VS Code Tasks: Run Task > vscode-extension:build
# This will start TypeScript watchers, GUI dev server, and extension builder

# Start GUI development server only
cd gui && npm run dev

# Start documentation server
cd docs && npm run start
# Or use VS Code Tasks: Run Task > docs:start
```

### Building
```bash
# Build VS Code extension
cd extensions/vscode && npm run package

# Build all packages
npm run continue-packages:build

# Build with dependencies
npm run vscode-extension:build-with-packages

# Build CLI
cd extensions/cli && npm run build
```

### Testing
```bash
# Run tests for core
cd core && npm test

# Run tests for GUI
cd gui && npm test

# Run CLI tests
cd extensions/cli && npm test

# Run E2E tests (VS Code)
cd extensions/vscode && npm run e2e:all
```

### Linting and Formatting
```bash
# Format code across project
npm run format

# Check formatting
npm run format:check

# Lint core
cd core && npm run lint

# Lint and fix core
cd core && npm run lint:fix
```

## Architecture

### Core Components

- **`core/`**: Shared core functionality including LLM providers, model management, and protocol handling
  - LLM providers in `core/llm/llms/` (OpenAI, Anthropic, Ollama, etc.)
  - Protocol messages in `core/protocol/`
  - Core orchestration in `core/core.ts`

- **`gui/`**: React-based web interface using Vite, Tailwind CSS, and Redux
  - Main GUI components in `gui/src/components/`
  - Pages in `gui/src/pages/`
  - Uses React Router for navigation
  - Redux for state management

- **`extensions/vscode/`**: VS Code extension built with esbuild
  - Extension entry point in `extensions/vscode/src/extension.ts`
  - WebView integration for GUI
  - VS Code-specific commands and keybindings

- **`extensions/cli/`**: Command-line interface
  - CLI commands and server implementation
  - Built with esbuild

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
2. **GUI changes**: Work in `gui/` with hot-reload via Vite dev server
3. **VS Code extension**: Use VS Code debugging tasks (`Tasks: Run Task > vscode-extension:build`)
4. **Adding new LLM providers**: Create provider class in `core/llm/llms/` and register in index

## Important Rules

### Protocol Messages
When adding new protocol messages:
- Define types in `core/protocol/`
- Add to `core/protocol/passThrough.ts` for webview-core communication
- Add to JetBrains constants: `extensions/intellij/src/main/kotlin/com/github/continuedev/continueintellijextension/constants/MessageTypes.kt`
- Implement in appropriate handler (core.ts, useWebviewListener, or IDE messengers)

### LLM Providers
To add new LLM providers:
1. Create provider class extending `BaseLLM` in `core/llm/llms/`
2. Add to `LLMs` array in `core/llm/llms/index.ts`
3. Update `PROVIDER_SUPPORTS_IMAGES` in `core/llm/autodetect.ts` if supports images
4. Add documentation in `docs/customize/model-providers/more/`

### GUI Links
For links to `hub.continue.dev`, use:
```typescript
ideMessenger.request("controlPlane/openUrl", { path, orgSlug: undefined });
```
Instead of direct `href` links.

### Theme Colors
- Use Tailwind colors with theme variables from `gui/src/styles/theme.ts`
- Avoid hardcoded colors like `text-yellow-400`
- Test changes with Theme Test Page (Settings > Help > Theme Test Page)

## Testing

The project uses multiple testing frameworks:
- **Jest** for unit tests in core
- **Vitest** for GUI component tests
- **E2E tests** for VS Code extension using vscode-extension-tester

Run relevant tests before submitting PRs. Tests run automatically on CI.

## Configuration

Continue supports both JSON and YAML configuration:
- JSON: `.continue/config.json` or `.continuerc.json`
- YAML: `config.yaml`
- Schema validation provided for both formats

## Debugging

- **VS Code Extension**: Use `Launch extension` debug configuration
- **Core**: Breakpoints work in core and VS Code extension code
- **GUI**: Hot-reload enabled - changes reflect without rebuilding
- **Reload**: Use `Ctrl/Cmd+Shift+P > Developer: Reload Window` after changes