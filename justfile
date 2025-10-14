# Justfile for Conti VS Code Extension

# Default recipe
default:
    @just --list

# Install all dependencies
install:
    npm install
    cd core && npm install
    cd extensions/vscode && npm install

# Build the extension
build:
    npm run build

# Build in development mode with watch
build-watch:
    npm run dev

# Package the extension as VSIX
package-vsix:
    npm run build:package

# Run tests
test:
    npm test

# Run tests in watch mode
test-watch:
    npm run test:watch

# Run tests with coverage
test-coverage:
    npm run test:coverage

# Format code
format:
    npm run format

# Check code formatting
format-check:
    npm run format:check

# Lint code
lint:
    npm run lint

# Fix linting issues
lint-fix:
    npm run lint:fix

# Clean build artifacts
clean:
    npm run clean

# Development setup (install dependencies and build)
setup: install build

# Start development server
dev:
    npm run dev

# Generate performance report
perf-report:
    echo "Performance report generation would go here"

# Build and package for release
release: clean build package-vsix

# Run all quality checks
ci: lint format-check test

# Update version and package
version version='patch':
    npm version {{version}}
    npm run build:package