import * as vscode from "vscode";

/**
 * Simplified configuration manager for Conti tab autocomplete
 * Provides a streamlined interface for VS Code settings-based configuration
 */
export class ContiConfigManager {
  private static instance: ContiConfigManager;
  private configHandler: any;
  private modelCache: Map<string, any> = new Map();

  private constructor(configHandler: any) {
    this.configHandler = configHandler;
  }

  public static getInstance(configHandler: any): ContiConfigManager {
    if (!ContiConfigManager.instance) {
      ContiConfigManager.instance = new ContiConfigManager(configHandler);
    }
    return ContiConfigManager.instance;
  }

  /**
   * Get simplified tab autocomplete model configuration
   * Returns model configuration based on VS Code settings
   */
  public async getTabModel(): Promise<any> {
    const config = vscode.workspace.getConfiguration("conti");
    const enableAdvanced = config.get<boolean>("enableAdvancedConfig", false);

    if (enableAdvanced) {
      // Use full config system if advanced mode is enabled
      return this.getAdvancedTabModel();
    }

    // Use simplified VS Code settings
    const tabModel = config.get<string>("tabModel", "gpt-4");
    const provider = config.get<string>("tabModelProvider", "openai");
    const apiKey = config.get<string>("apiKey", "");
    const apiBase = config.get<string>("tabApiBase", "");

    const cacheKey = `${provider}:${tabModel}:${apiBase}`;

    if (this.modelCache.has(cacheKey)) {
      return this.modelCache.get(cacheKey)!;
    }

    const modelProvider = this.createModelProvider(provider, tabModel, apiKey, apiBase);
    this.modelCache.set(cacheKey, modelProvider);

    return modelProvider;
  }

  /**
   * Create model provider based on simplified settings
   */
  private createModelProvider(
    provider: string,
    model: string,
    apiKey: string,
    apiBase: string
  ): any {
    // Simple model provider interface for now
    return {
      provider,
      model,
      apiKey,
      apiBase: apiBase || undefined,
      autocomplete: async (prompt: string) => {
        // Placeholder for actual LLM integration
        // This would integrate with the selected provider
        console.log(`Would call ${provider} model ${model} with prompt: ${prompt.substring(0, 100)}...`);
        return null;
      },
    };
  }

  /**
   * Get tab model from advanced configuration system
   */
  private async getAdvancedTabModel(): Promise<any> {
    // Placeholder for advanced config system
    return this.createModelProvider("openai", "gpt-4", "", "");
  }

  /**
   * Check if tab autocomplete is enabled
   */
  public isTabAutocompleteEnabled(): boolean {
    const config = vscode.workspace.getConfiguration("conti");
    return config.get<boolean>("enableTabAutocomplete", true);
  }

  /**
   * Check if next edit prediction is enabled
   */
  public isNextEditEnabled(): boolean {
    const config = vscode.workspace.getConfiguration("conti");
    return config.get<boolean>("enableNextEdit", true);
  }

  /**
   * Get API key from settings
   */
  public getApiKey(): string {
    const config = vscode.workspace.getConfiguration("conti");
    return config.get<string>("apiKey", "");
  }

  /**
   * Clear model cache (useful when settings change)
   */
  public clearCache(): void {
    this.modelCache.clear();
  }

  /**
   * Validate current configuration
   */
  public async validateConfiguration(): Promise<{ valid: boolean; errors: string[] }> {
    const errors: string[] = [];

    try {
      const config = vscode.workspace.getConfiguration("conti");
      const enableAdvanced = config.get<boolean>("enableAdvancedConfig", false);

      if (!enableAdvanced) {
        // Validate simplified settings
        const apiKey = config.get<string>("apiKey", "");
        const provider = config.get<string>("tabModelProvider", "openai");

        if (!apiKey && provider !== "ollama") {
          errors.push("API key is required for this provider");
        }

        const tabModel = config.get<string>("tabModel", "");
        if (!tabModel) {
          errors.push("Tab model must be specified");
        }
      } else {
        // Validate advanced configuration
        // Placeholder for advanced config validation
      }
    } catch (error) {
      errors.push(`Configuration validation failed: ${error}`);
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Get configuration summary for display
   */
  public async getConfigSummary(): Promise<{
    mode: "simplified" | "advanced";
    provider?: string;
    model?: string;
    hasApiKey: boolean;
  }> {
    const config = vscode.workspace.getConfiguration("conti");
    const enableAdvanced = config.get<boolean>("enableAdvancedConfig", false);

    if (enableAdvanced) {
      return {
        mode: "advanced",
        model: "gpt-4", // Placeholder
        provider: "openai", // Placeholder
        hasApiKey: true, // Placeholder
      };
    } else {
      return {
        mode: "simplified",
        provider: config.get<string>("tabModelProvider", "openai"),
        model: config.get<string>("tabModel", "gpt-4"),
        hasApiKey: !!config.get<string>("apiKey", ""),
      };
    }
  }
}