// Jest setup file
import * as vscode from 'vscode';

// Mock vscode module
jest.mock('vscode', () => ({
  window: {
    createTextEditorDecorationType: jest.fn(),
    showInformationMessage: jest.fn(),
    showErrorMessage: jest.fn(),
    showWarningMessage: jest.fn(),
    createOutputChannel: jest.fn(),
  },
  commands: {
    registerCommand: jest.fn(),
    executeCommand: jest.fn(),
  },
  workspace: {
    getConfiguration: jest.fn(() => ({
      get: jest.fn(),
      update: jest.fn(),
      has: jest.fn(),
      inspect: jest.fn(),
    })),
    onDidChangeConfiguration: jest.fn(),
    getWorkspaceFolder: jest.fn(),
    workspaceFolders: [],
    textDocuments: [],
  },
  languages: {
    registerCompletionItemProvider: jest.fn(),
    registerCodeActionsProvider: jest.fn(),
  },
  Uri: {
    file: jest.fn(),
    parse: jest.fn(),
  },
  Range: jest.fn(),
  Position: jest.fn(),
  CompletionItem: jest.fn(),
  CompletionItemKind: {
    Text: 1,
    Method: 2,
    Function: 3,
    Constructor: 4,
    Field: 5,
    Variable: 6,
    Class: 7,
    Interface: 8,
    Module: 9,
    Property: 10,
    Unit: 11,
    Value: 12,
    Enum: 13,
    Keyword: 14,
    Snippet: 15,
    Color: 16,
    File: 17,
    Reference: 18,
    Folder: 19,
    EnumMember: 20,
    Constant: 21,
    Struct: 22,
    Event: 23,
    Operator: 24,
    TypeParameter: 25,
  },
  Disposable: {
    from: jest.fn(),
  },
  EventEmitter: jest.fn(),
  CodeAction: jest.fn(),
  CodeActionKind: {
    QuickFix: 'quickfix',
  },
  StatusBarAlignment: {
    Left: 1,
    Right: 2,
  },
  ExtensionContext: jest.fn(),
  extensions: {
    getExtension: jest.fn(),
    all: [],
  },
  env: {
    appName: 'VS Code Test',
    appHost: 'desktop',
    language: 'en',
    uriScheme: 'vscode',
    extensionDevelopmentPath: undefined,
    extensionTelemetry: {
      configuration: {},
    },
  },
  debug: {
    registerDebugConfigurationProvider: jest.fn(),
  },
}), { virtual: true });

// Mock timers for async operations
jest.useFakeTimers();

// Global test utilities
global.createMockContext = () => ({
  subscriptions: [],
  workspaceState: {
    get: jest.fn(),
    update: jest.fn(),
  },
  globalState: {
    get: jest.fn(),
    update: jest.fn(),
  },
  extensionPath: '/test/extension/path',
  extensionUri: {
    fsPath: '/test/extension/path',
    scheme: 'file',
    path: '/test/extension/path',
    query: '',
    fragment: '',
  },
  asAbsolutePath: jest.fn((relativePath) => `/test/extension/path/${relativePath}`),
  storagePath: '/test/storage/path',
  globalStoragePath: '/test/global/storage/path',
  logPath: '/test/log/path',
  environmentVariableCollection: {
    persistent: true,
    replace: jest.fn(),
    append: jest.fn(),
    prepend: jest.fn(),
    get: jest.fn(),
    forEach: jest.fn(),
    delete: jest.fn(),
    clear: jest.fn(),
  },
  secrets: {
    get: jest.fn(),
    store: jest.fn(),
    delete: jest.fn(),
  },
});

// Clean up after each test
afterEach(() => {
  jest.clearAllMocks();
  jest.clearAllTimers();
});