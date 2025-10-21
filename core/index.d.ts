// Simplified type definitions for Conti autocomplete extension

export interface Position {
  line: number;
  character: number;
}

export interface Range {
  start: Position;
  end: Position;
}

export interface RangeInFile extends Range {
  filepath: string;
}

export interface IDE {
  getIdeInfo(): Promise<IdeInfo>;
  getIdeSettings(): Promise<IdeSettings>;
  getWorkspaceDirs(): Promise<string[]>;
  openFile(path: string): Promise<void>;
  closeFile(path: string): Promise<void>;
  readFile(path: string): Promise<string>;
  writeFile(path: string, contents: string): Promise<void>;
  getRepoName(filepath: string): Promise<string | undefined>;
  getUniqueId(): Promise<string>;
  getLanguage(filepath: string): Promise<string>;
  getDefinitions(filepath: string, position: Position): Promise<any[]>;
  gotoDefinition(filepath: string, position: Position): Promise<any>;
  readRangeInFile(filepath: string, range: Range): Promise<string>;
  onDidChangeActiveTextEditor(callback: (filepath: any) => void): void;
  gotoTypeDefinition(filepath: string, position: Position): Promise<any>;
  getSignatureHelp(filepath: string, position: Position): Promise<any>;
  getClipboardContents(): Promise<string>;
  setClipboardContents(text: string): Promise<void>;
  showWarningMessage(message: string): Promise<void>;
  showErrorMessage(message: string): Promise<void>;
  showMessage(message: string): Promise<void>;
  listDirectoryContents(dirPath: string): Promise<string[]>;
  listWorkingDirectoryPaths(dirPath: string): Promise<string[]>;
  getTags(): Promise<string[]>;
  getDebugLocales(): Promise<any[]>;
  getBranches(dirPath: string): Promise<string[]>;
  getCurrentBranch(dirPath: string): Promise<string>;
  getCommits(dateRange: { start: number; end: number }, limit: number): Promise<any[]>;
  getDiff(dirPath: string): Promise<string>;
  getCommitDiff(sha: string, dirPath: string): Promise<string>;
  getGitHubRepoName(dirPath: string): Promise<string | undefined>;
  getGitBranches(dirPath: string): Promise<string[]>;
  getGitCurrentBranch(dirPath: string): Promise<string>;
  getGitRemotes(dirPath: string): Promise<string[]>;
  getGitStatus(dirPath: string): Promise<any[]>;
  getGitLogData(dirPath: string): Promise<any[]>;
  subprocess(command: string, cwd: string): Promise<{ stdout: string; stderr: string; exitCode: number }>;
  subprocessWithResult(command: string, cwd: string): Promise<any>;
  runCommand(command: string, cwd: string): Promise<string>;
  getStats(dirPath: string): Promise<any[]>;
  getEnvVar(name: string): Promise<string | undefined>;
  setEnvVar(name: string, value: string): Promise<void>;
  listEnvVars(): Promise<string[]>;
  getProcessId(): Promise<string>;
  getContinueFileName(): Promise<string>;
  listOpenTabs(): Promise<string[]>;
  runInTerminal(command: string, cwd: string, env: Record<string, string>): Promise<void>;
  getTerminalContents(): Promise<string>;
  openExternalUrl(url: string): Promise<void>;
  openPath(path: string): Promise<void>;
  saveFile(path: string, content: string): Promise<void>;
  isDirectory(path: string): Promise<boolean>;
  isUntitledFile(document: any): Promise<boolean>;
  getSearchPaths(query: string): Promise<string[]>;
  isTelemetryEnabled(): Promise<boolean>;
  getEnablementState(feature: string): Promise<boolean>;
  setEnablementState(feature: string, enabled: boolean): Promise<void>;
  getVirtualEnv(dirPath: string): Promise<string>;
  getLLMProviders(): Promise<any[]>;
  requestModel(model: string, messages: any[], options?: any): Promise<any>;
  requestCustomLLM(provider: string, model: string, messages: any[], options?: any): Promise<any>;
  getLLMTitleFromModelName(modelName: string): Promise<string>;
  pauseActiveTask(): Promise<void>;
  resumeActiveTask(): Promise<void>;
  cancelActiveTask(): Promise<void>;
  getActiveTask(): Promise<any>;
  hasActiveTask(): Promise<boolean>;
  addWorkspaceFolder(uri: string): Promise<void>;
  removeWorkspaceFolder(uri: string): Promise<void>;
  getWorkspaceFolders(): Promise<string[]>;
  getExtension(name: string): Promise<any>;
  getOpenDocuments(): Promise<any[]>;
  getDocument(uri: string): Promise<any>;
  getActiveDocument(): Promise<any>;
  setDocumentText(uri: string, text: string): Promise<void>;
  getDocumentText(uri: string): Promise<string>;
  getDocumentLanguage(uri: string): Promise<string>;
  getDocumentSelection(uri: string): Promise<Range>;
  getDocumentPath(uri: string): Promise<string>;
  showVirtualFileInput(title: string, defaultText: string): Promise<string>;
  showFileSelection(options: any): Promise<string>;
  showDiff(options: any): Promise<void>;
  showInputBox(options: any): Promise<string>;
  showQuickPick(items: string[], options?: any): Promise<string>;
  getContinueVersion(): Promise<string>;
  getContinueBrowserUrl(): Promise<string>;
  getContinueServerUrl(): Promise<string>;
  getContinueClientId(): Promise<string>;
  getContinueClientSecret(): Promise<string>;
  getContinueAuthUrl(): Promise<string>;
  getContinueToken(): Promise<string>;
  setContinueToken(token: string): Promise<void>;
  getContinueUser(): Promise<any>;
  getContinueWorkspace(): Promise<any>;
  getContinueOrg(): Promise<any>;
  getContinueProject(): Promise<any>;
  getContinueTeam(): Promise<any>;
  getContinueSubscription(): Promise<any>;
  getContinueUsage(): Promise<any>;
  getContinueLimits(): Promise<any>;
  getContinueQuota(): Promise<any>;
  getContinueBilling(): Promise<any>;
  getContinueInvoices(): Promise<any>;
  getContinuePaymentMethods(): Promise<any>;
  getContinuePlans(): Promise<any>;
  getContinuePlan(): Promise<any>;
  getContinueSubscriptionStatus(): Promise<any>;
  getContinueSubscriptionId(): Promise<any>;
  getContinueSubscriptionEndsAt(): Promise<any>;
  getContinueSubscriptionCanceledAt(): Promise<any>;
  getContinueSubscriptionCreatedAt(): Promise<any>;
  getContinueSubscriptionUpdatedAt(): Promise<any>;
  getContinueSubscriptionTrialEndsAt(): Promise<any>;
}

export interface IdeInfo {
  ideType: string;
  name: string;
  version: string;
  remoteName?: string;
}

export interface IdeSettings {
  enableTabAutocomplete: boolean;
  enableNextEdit: boolean;
  model: string;
  apiKey: string;
}

export interface LLMOptions {
  providerName: string;
  model: string;
  apiKey?: string;
  apiBase?: string;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
  contextLength?: number;
  completionOptions?: any;
  autocompleteOptions?: Partial<TabAutocompleteOptions>;
  promptTemplates?: PromptTemplates;
  underlyingProviderName?: string;
}

export interface ILLM extends LLMOptions {
  get providerName(): string;
  get underlyingProviderName(): string;
  model?: string;
  completionOptions?: any;
  autocompleteOptions?: Partial<TabAutocompleteOptions>;
  promptTemplates?: PromptTemplates;
}

export interface CompletionOptions {
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
  stop?: string[];
}

export interface RangeInFileWithContents extends RangeInFile {
  contents: string;
}

export interface DiffLine {
  content: string;
  type: 'added' | 'removed' | 'unchanged';
}

export interface PromptTemplates {
  systemMessage?: string;
  userMessage?: string;
  autocomplete?: string;
}

export interface TabAutocompleteOptions {
  enabled?: boolean;
  debounceDelay?: number;
  maxPromptTokens?: number;
  useCache?: boolean;
  preventHotwordTriggers?: boolean;
  disableFor?: string[];
  enableFor?: string[];
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
  prefixLength?: number;
  suffixLength?: number;
  cacheSize?: number;
  cacheTTL?: number;
  // Additional properties from error messages
  multilineCompletions?: boolean;
  useImports?: boolean;
  slidingWindowSize?: number;
  slidingWindowPrefixPercentage?: number;
  modelTimeout?: number;
  transform?: boolean;
  disable?: boolean;
  disableInFiles?: string[];
}

export interface ModelDescription {
  title: string;
  provider: string;
  model: string;
  apiKey?: string;
  apiBase?: string;
  deployment?: string;
  apiVersion?: string;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
  contextLength?: number;
  completionOptions?: any;
  autocompleteOptions?: Partial<TabAutocompleteOptions>;
  promptTemplates?: PromptTemplates;
}

export interface ContinueConfig {
  models?: ModelDescription[];
  selectedModelByRole?: {
    chat?: string;
    edit?: string;
    autocomplete?: string;
    summarize?: string;
    apply?: string;
    rerank?: string;
  };
  tabAutocompleteOptions?: TabAutocompleteOptions;
  contextProviders?: any[];
  allowAnonymousTelemetry?: boolean;
  workspacePaths?: string[];
  shareSessions?: boolean;
  enableDebugLogs?: boolean;
  experimental?: {
    enableStaticContextualization?: boolean;
    enableNextEdit?: boolean;
    [key: string]: any;
  };
}

export interface AutocompleteInput {
  completionId: string;
  pos: Position;
  filepath: string;
  document: string;
  manuallyPassFileContents?: string;
  manuallyPassPrefix?: string;
  selectedCompletionInfo?: any;
  isUntitledFile?: boolean;
  recentlyVisitedRanges?: any[];
  recentlyEditedRanges?: any[];
}

export interface AutocompleteOutcome {
  completionId: string;
  completion: string;
  prefix: string;
  suffix: string;
  prompt: string;
  modelProvider: string;
  modelName: string;
  completionOptions: any;
  time: number;
  cacheHit: boolean;
  filepath: string;
  numLines: number;
  gitRepo?: string;
  uniqueId: string;
  timestamp: string;
  profileType?: string;
  range?: Range;
}

export type ContextItem = any;
export type ContextItemId = string;
export type ContextItemWithId = ContextItem & { id: ContextItemId };
export type ToolCall = any;

// Core class export
export class Core {
  configHandler: any;
  completionProvider: any;

  constructor(ide: IDE, messenger: any);
  reloadConfig(): Promise<void>;
  getIDEInfo(): Promise<IdeInfo>;
  dispose(): void;
}

// Protocol interfaces
export interface FromCoreProtocol {
  type: string;
  [key: string]: any;
}

export interface ToCoreProtocol {
  type: string;
  [key: string]: any;
}

export interface IMessenger<TFrom, TTo> {
  onRequest<T extends keyof TFrom>(command: T, handler: (request: TFrom[T]) => any): void;
  sendRequest<T extends keyof TTo>(command: T, request: TTo[T]): Promise<any>;
  sendError(message: string, reason?: any): void;
}

export interface Message {
  type: string;
  [key: string]: any;
}