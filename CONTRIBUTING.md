# Contributing to Conti

Thank you for your interest in contributing to Conti! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Reporting Issues](#reporting-issues)
- [Feature Requests](#feature-requests)

## Code of Conduct

This project and everyone participating in it is governed by the [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Getting Started

### Ways to Contribute

1. **Report bugs** - Help us identify and fix issues
2. **Suggest features** - Share your ideas for improvement
3. **Submit pull requests** - Fix bugs or add features directly
4. **Improve documentation** - Help make the project easier to understand
5. **Answer questions** - Help other users in our community

### First Steps

1. Fork the repository on GitHub
2. Clone your fork locally
3. Set up your development environment (see below)
4. Create a new branch for your changes
5. Make your changes
6. Submit a pull request

## Development Setup

### Prerequisites

- Node.js >= 20.19.0
- npm >= 8.19.0
- VS Code >= 1.70.0
- Git

### Environment Setup

1. **Install Node.js version:**
   ```bash
   nvm use  # If using nvm
   # or ensure you have Node.js 20.19.0+ installed
   ```

2. **Clone and setup the repository:**
   ```bash
   # Clone your fork
   git clone https://github.com/YOUR_USERNAME/conti.git
   cd conti

   # Add the original repository as upstream
   git remote add upstream https://github.com/continuedev/conti.git

   # Install dependencies
   npm install
   ```

3. **Verify the setup:**
   ```bash
   # Run the build
   npm run build

   # Run tests
   npm test

   # Check code formatting
   npm run format:check
   ```

### Development Workflow

1. **Start development mode:**
   ```bash
   npm run dev
   ```

2. **Make changes to the codebase**

3. **Test your changes:**
   ```bash
   npm test
   ```

4. **Format your code:**
   ```bash
   npm run format
   ```

5. **Lint your code:**
   ```bash
   npm run lint
   ```

### VS Code Setup

1. **Install recommended extensions:**
   - ESLint
   - Prettier
   - TypeScript and JavaScript Language Features

2. **Debugging:**
   - Open the project in VS Code
   - Go to the Run and Debug view
   - Select "Launch extension" configuration
   - Press F5 to start debugging

### Building the Extension

```bash
# Development build
npm run compile

# Production build
npm run build

# Package for VS Code marketplace
npm run build:package
```

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Structure

```
tests/
├── setup.ts              # Test setup and mocks
├── unit/                  # Unit tests
│   ├── autocomplete/      # Autocomplete functionality tests
│   ├── config/           # Configuration tests
│   └── utils/            # Utility function tests
├── integration/          # Integration tests
│   └── extension/        # Extension integration tests
└── e2e/                   # End-to-end tests
    └── vscode/           # VS Code specific tests
```

### Writing Tests

1. **Unit Tests:** Test individual functions and components
2. **Integration Tests:** Test interactions between components
3. **E2E Tests:** Test the entire extension workflow

### Test Guidelines

- Write tests for all new features
- Maintain test coverage above 80%
- Use descriptive test names
- Mock external dependencies
- Test both success and error cases

## Submitting Changes

### Pull Request Process

1. **Create a new branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
3. **Ensure tests pass**
4. **Format your code**
5. **Commit your changes:**
   ```bash
   git commit -m "feat: add new feature"
   ```

6. **Push to your fork:**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a pull request** on GitHub

### Pull Request Guidelines

- Use clear and descriptive titles
- Include a detailed description of changes
- Reference any related issues
- Include screenshots for UI changes
- List any breaking changes
- Ensure all CI checks pass

### Commit Message Format

Use the following format for commit messages:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Test changes
- `chore`: Build process or auxiliary tool changes

**Example:**
```
feat(autocomplete): add support for TypeScript interfaces

Add intelligent completion suggestions for TypeScript interfaces
including property suggestions and method completions.

Closes #123
```

## Reporting Issues

### Bug Reports

When reporting bugs, please include:

1. **Environment information:**
   - OS version
   - VS Code version
   - Node.js version
   - Conti version

2. **Steps to reproduce:**
   - What you were trying to do
   - What happened instead
   - Expected behavior

3. **Error messages:** Include any error messages or stack traces

4. **Screenshots:** Include screenshots if applicable

### Feature Requests

When requesting features, please include:

1. **Problem statement:** What problem are you trying to solve?
2. **Proposed solution:** How do you envision the feature working?
3. **Use cases:** How would this feature benefit users?
4. **Alternatives:** Are there any alternative solutions you've considered?

## Code Style and Quality

### Formatting

- Use Prettier for code formatting
- Run `npm run format` before committing
- Configure your editor to format on save

### TypeScript

- Use strict TypeScript settings
- Include type definitions for all functions
- Avoid `any` type when possible

### Performance

- Keep performance in mind for all changes
- Profile the extension for performance improvements
- Ensure autocomplete latency stays below 300ms
- Keep memory usage below 50MB

## Getting Help

- **Documentation:** Check the [docs](./docs/) folder
- **Issues:** Search [existing issues](https://github.com/continuedev/conti/issues)
- **Discussions:** Join our [Discord community](https://discord.gg/vapESyrFmJ)
- **Email:** Contact us at [hello@continuedev.io](mailto:hello@continuedev.io)

## Review Process

1. **Initial Review:** A maintainer will review your PR
2. **Feedback:** You may be asked to make changes
3. **Approval:** Once approved, your PR will be merged
4. **Release:** Changes will be included in the next release

## Contributor License Agreement (CLA)

We require all contributors to accept the CLA. When you submit a pull request, you'll need to sign the CLA by commenting:

```
I have read the CLA Document and I hereby sign the CLA
```

Thank you for contributing to Conti! 🎉