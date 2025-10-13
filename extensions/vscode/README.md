# Conti - AI Tab Autocomplete

A lightweight VS Code extension focused on tab-based AI autocomplete functionality.

## Features

- Tab-based code completion
- Next Edit prediction
- Support for local LLM services
- Minimal resource usage

## Installation

This extension can be installed by downloading the `.vsix` file directly.

## Configuration

The extension can be configured through VS Code settings:

- `conti.enableTabAutocomplete`: Enable/disable tab autocomplete
- `conti.enableNextEdit`: Enable/disable next edit prediction
- `conti.model`: Default model for autocomplete
- `conti.apiKey`: API key for the selected model

## Commands

- `conti.toggleTabAutocompleteEnabled`: Toggle autocomplete
- `conti.forceAutocomplete`: Force autocomplete suggestion
- `conti.toggleNextEditEnabled`: Toggle Next Edit feature
- `conti.openConfigPage`: Open settings page

## Keybindings

- `Ctrl+K Ctrl+A` (macOS: `Cmd+K Cmd+A`): Toggle autocomplete
- `Ctrl+Alt+Space` (macOS: `Cmd+Alt+Space`): Force autocomplete
- `Ctrl+K Ctrl+N` (macOS: `Cmd+Cmd+N`): Toggle Next Edit

## License

Apache 2.0 © 2025 Continue Dev, Inc.