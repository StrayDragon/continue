import * as vscode from "vscode";
import { ContiConfigManager } from "../config/ContiConfigManager";
import { MemoryOptimizer } from "../optimization/MemoryOptimizer";

/**
 * Simplified completion provider for Conti
 * Focuses on lightweight tab autocomplete functionality
 */
export class ContiCompletionProvider implements vscode.InlineCompletionItemProvider {
  private configManager: ContiConfigManager;
  private memoryOptimizer: MemoryOptimizer;
  private debounceTimeout: NodeJS.Timeout | undefined;
  private lastCompletionTime = 0;

  constructor(configManager: ContiConfigManager) {
    this.configManager = configManager;
    this.memoryOptimizer = MemoryOptimizer.getInstance();
  }

  async provideInlineCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
    context: vscode.InlineCompletionContext,
    token: vscode.CancellationToken,
  ): Promise<vscode.InlineCompletionItem[] | vscode.InlineCompletionList | undefined> {
    // Check if autocomplete is enabled
    if (!this.configManager.isTabAutocompleteEnabled()) {
      return undefined;
    }

    // Debounce rapid requests
    if (this.shouldDebounce()) {
      return undefined;
    }

    try {
      // Check cancellation
      if (token.isCancellationRequested) {
        return undefined;
      }

      // Don't autocomplete in certain files
      if (this.shouldSkipFile(document)) {
        return undefined;
      }

      // Get completion suggestion
      const completion = await this.getCompletionSuggestion(document, position, context);

      if (completion && completion.text) {
        const item = new vscode.InlineCompletionItem(
          completion.text,
          completion.range || new vscode.Range(position, position),
          {
            title: "Conti Autocomplete",
            command: "conti.acceptCompletion",
          },
        );

        // Enable bracket pair completion
        (item as any).completeBracketPairs = true;

        return [item];
      }

      return undefined;
    } catch (error) {
      console.error("Error in Conti completion provider:", error);
      return undefined;
    }
  }

  private shouldDebounce(): boolean {
    const now = Date.now();
    const timeSinceLastCompletion = now - this.lastCompletionTime;

    if (timeSinceLastCompletion < 200) { // 200ms debounce
      return true;
    }

    this.lastCompletionTime = now;
    return false;
  }

  private shouldSkipFile(document: vscode.TextDocument): boolean {
    // Skip certain file types
    const skipPatterns = [
      /\.min\.js$/, // Minified JavaScript
      /\.map$/, // Source maps
      /node_modules/, // Node modules
      /\.git/, // Git files
      /\.vscode/, // VS Code settings
    ];

    const filePath = document.uri.fsPath;
    return skipPatterns.some(pattern => pattern.test(filePath));
  }

  private async getCompletionSuggestion(
    document: vscode.TextDocument,
    position: vscode.Position,
    context: vscode.InlineCompletionContext,
  ): Promise<{ text: string; range?: vscode.Range } | undefined> {
    try {
      // Get context around cursor
      const linePrefix = document.lineAt(position.line).text.substring(0, position.character);
      const lineSuffix = document.lineAt(position.line).text.substring(position.character);

      // Get a few lines before and after for context
      const startLine = Math.max(0, position.line - 5);
      const endLine = Math.min(document.lineCount, position.line + 5);
      const contextLines = [];

      for (let i = startLine; i <= endLine; i++) {
        contextLines.push(document.lineAt(i).text);
      }

      // Use memory optimizer to cache completions
      const cacheKey = `${document.uri.fsPath}:${position.line}:${position.character}:${linePrefix}`;

      return await this.memoryOptimizer.get(
        cacheKey,
        async () => {
          // This is where you would integrate with your LLM provider
          // For now, we'll return a simple placeholder
          return this.generateSimpleCompletion(linePrefix, lineSuffix, contextLines);
        },
        30000 // 30 second cache
      );
    } catch (error) {
      console.error("Error getting completion suggestion:", error);
      return undefined;
    }
  }

  private generateSimpleCompletion(
    prefix: string,
    suffix: string,
    contextLines: string[],
  ): { text: string; range?: vscode.Range } | undefined {
    // Simple rule-based completions for common patterns
    const trimmedPrefix = prefix.trim();

    // Simple completions for common patterns
    const completions: Record<string, string> = {
      // JavaScript/TypeScript
      "console.": "log()",
      "Array.": "from()",
      "Object.": "keys()",
      "Promise.": "resolve()",
      "Math.": "max()",

      // Python
      "print(": ")",
      "len(": ")",
      "range(": ")",
      "str(": ")",
      "list(": ")",

      // HTML
      "<div>": "</div>",
      "<span>": "</span>",
      "<p>": "</p>",
      "<h1>": "</h1>",

      // CSS
      "display: ": "block",
      "position: ": "relative",
      "color: ": "#000",
      "background-": "color: #fff",
    };

    // Check for exact matches
    for (const [key, value] of Object.entries(completions)) {
      if (trimmedPrefix.endsWith(key)) {
        return { text: value };
      }
    }

    // Check for partial matches
    for (const [key, value] of Object.entries(completions)) {
      if (key.startsWith(trimmedPrefix) && key !== trimmedPrefix) {
        return { text: key.substring(trimmedPrefix.length) + value };
      }
    }

    // Simple bracket completion
    const openBrackets = ['(', '[', '{', '"', "'", '`'];
    const closeBrackets = [')', ']', '}', '"', "'", '`'];

    for (let i = 0; i < openBrackets.length; i++) {
      if (trimmedPrefix.endsWith(openBrackets[i]) && !suffix.startsWith(closeBrackets[i])) {
        return { text: closeBrackets[i] };
      }
    }

    return undefined;
  }
}