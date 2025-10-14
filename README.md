# Conti - AI Tab Autocomplete Extension

<div align="center">

![Conti Logo](media/readme.png)

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![VS Code](https://img.shields.io/badge/VS_Code-Marketplace-blue.svg)](https://marketplace.visualstudio.com/items?itemName=Continue.conti)
[![Node.js](https://img.shields.io/badge/node-%3E%3D20.19.0-brightgreen.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9%2B-blue.svg)](https://www.typescriptlang.org/)

</div>

## Overview

**Conti** is a lightweight, high-performance VS Code extension that provides AI-powered tab autocomplete and next edit prediction. It's the streamlined version of the full Continue project, focusing only on the essential autocomplete functionality.

## Features

### 🚀 **Lightweight & Fast**
- Startup time < 500ms
- Latency < 300ms
- Memory usage < 50MB
- Minimal dependencies

### ⚡ **Smart Autocomplete**
- Real-time code suggestions as you type
- Support for multiple programming languages
- Context-aware completions
- Integration with popular LLM providers

### 🔮 **Next Edit Prediction**
- Predictive edit suggestions
- Learn from your coding patterns
- Improve productivity with intelligent recommendations

### 🎯 **Simple Configuration**
- Easy setup with just 4 settings
- No complex configuration required
- Works out of the box with popular models

## Installation

### VS Code Marketplace
Coming soon to the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=Continue.conti)

### Manual Installation
```bash
# Clone the repository
git clone https://github.com/continuedev/conti.git
cd conti

# Install dependencies
npm install

# Build the extension
npm run build

# Package for VS Code
npm run build:package
```

## Quick Start

1. Install the extension in VS Code
2. Set your API key in settings:
   ```json
   {
     "conti.apiKey": "your-api-key-here"
   }
   ```
3. Choose your preferred model (default: gpt-4):
   ```json
   {
     "conti.model": "gpt-4"
   }
   ```
4. Start typing and enjoy AI-powered autocomplete!

## Configuration

Conti provides four simple configuration options:

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `conti.enableTabAutocomplete` | boolean | `true` | Enable tab autocomplete feature |
| `conti.enableNextEdit` | boolean | `true` | Enable next edit prediction feature |
| `conti.model` | string | `"gpt-4"` | Default model to use for autocomplete |
| `conti.apiKey` | string | `""` | API key for the selected model |

### Supported Models

- OpenAI: `gpt-4`, `gpt-3.5-turbo`
- Anthropic: `claude-3-opus`, `claude-3-sonnet`
- Local models via Ollama

## Development

### Prerequisites

- Node.js >= 20.19.0
- npm >= 8.19.0
- VS Code >= 1.70.0
- [Just](https://github.com/casey/just) (optional, for convenient build commands)

### Setup

```bash
# Install dependencies
npm install

# Start development mode
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Format code
npm run format

# Lint code
npm run lint
```

### Using Just (Recommended)

If you have [Just](https://github.com/casey/just) installed, you can use these convenient commands:

```bash
# Install all dependencies
just install

# Build the extension
just build

# Package as VSIX
just package-vsix

# Development mode with watch
just dev

# Run tests
just test

# Run tests with coverage
just test-coverage

# Run all quality checks
just ci

# Format and lint code
just format
just lint
just lint-fix

# Check formatting
just format-check

# Clean build artifacts
just clean

# Full development setup
just setup

# Build and package for release
just release
```

### Project Structure

```
conti/
├── src/                    # Main extension source
│   ├── extension.ts       # Extension entry point
│   ├── autocomplete/       # Autocomplete functionality
│   ├── config/           # Configuration management
│   └── utils/            # Utility functions
├── core/                  # Core autocomplete engine
├── packages/             # Shared packages
├── tests/                # Test files
├── scripts/              # Build and utility scripts
├── docs/                 # Documentation
└── extensions/vscode/    # VS Code specific files
```

## Commands

| Command | Keybinding | Description |
|---------|------------|-------------|
| `conti.toggleTabAutocompleteEnabled` | `Ctrl+K Ctrl+A` (Mac: `Cmd+K Cmd+A`) | Toggle autocomplete on/off |
| `conti.forceAutocomplete` | `Ctrl+Alt+Space` (Mac: `Cmd+Alt+Space`) | Force autocomplete at cursor |
| `conti.toggleNextEditEnabled` | `Ctrl+K Ctrl+N` | Toggle next edit prediction |
| `conti.openConfigPage` | - | Open configuration settings |

## Performance

Conti is optimized for performance with the following targets:

- **Startup Time**: < 500ms
- **Autocomplete Latency**: < 300ms
- **Memory Usage**: < 50MB
- **Bundle Size**: < 5MB

## Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) for details on how to:

- Report bugs
- Request features
- Submit pull requests
- Set up your development environment

## License

Apache License 2.0 © 2024 Continue Dev, Inc.

## Support

- 📖 [Documentation](https://docs.continue.dev)
- 🐛 [Issue Tracker](https://github.com/continuedev/conti/issues)
- 💬 [Discord Community](https://discord.gg/vapESyrFmJ)
- 📧 [Email Support](mailto:hello@continuedev.io)

---

**Built with ❤️ by the Continue team**