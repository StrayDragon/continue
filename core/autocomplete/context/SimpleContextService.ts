// Simplified context service that replaces complex tree-sitter based context retrieval
// This provides basic context without the heavy dependency

import { IDE } from "../..";
import { RangeInFile } from "../..";

export interface ContextItem {
  filepath: string;
  range: RangeInFile;
  content: string;
  type: 'definition' | 'reference' | 'import';
}

export class SimpleContextService {
  constructor(private ide: IDE) {}

  async getDefinitions(filepath: string, position: any): Promise<ContextItem[]> {
    try {
      const definitions = await this.ide.getDefinitions(filepath, position);
      return definitions.map((def: any) => ({
        filepath: def.filepath || filepath,
        range: def.range || { start: position, end: position },
        content: def.content || '',
        type: 'definition' as const,
      }));
    } catch (error) {
      console.warn('[Conti] Failed to get definitions:', error);
      return [];
    }
  }

  async getImports(filepath: string): Promise<ContextItem[]> {
    try {
      const content = await this.ide.readFile(filepath);
      const imports: ContextItem[] = [];

      // Simple regex-based import detection (language agnostic)
      const importRegex = /(?:import|require|from)\s+['"]([^'"]+)['"]/g;
      let match;

      while ((match = importRegex.exec(content)) !== null) {
        const importPath = match[1];
        const lineNumber = content.substring(0, match.index).split('\n').length - 1;

        imports.push({
          filepath,
          range: {
            start: { line: lineNumber, character: 0 },
            end: { line: lineNumber, character: match[0].length }
          },
          content: match[0],
          type: 'import' as const,
        });
      }

      return imports;
    } catch (error) {
      console.warn('[Conti] Failed to get imports:', error);
      return [];
    }
  }

  async getRecentFiles(maxFiles: number = 5): Promise<ContextItem[]> {
    try {
      // This would need to be implemented based on IDE capabilities
      // For now, return empty array
      return [];
    } catch (error) {
      console.warn('[Conti] Failed to get recent files:', error);
      return [];
    }
  }

  async getContextForCompletion(
    filepath: string,
    position: any,
    options: any = {}
  ): Promise<ContextItem[]> {
    const contextItems: ContextItem[] = [];

    // Get definitions if enabled
    if (options.useDefinitions !== false) {
      const definitions = await this.getDefinitions(filepath, position);
      contextItems.push(...definitions);
    }

    // Get imports if enabled
    if (options.useImports !== false) {
      const imports = await this.getImports(filepath);
      contextItems.push(...imports.slice(0, options.maxImports || 10));
    }

    // Get recent files if enabled
    if (options.useRecentFiles !== false) {
      const recentFiles = await this.getRecentFiles(options.maxRecentFiles || 3);
      contextItems.push(...recentFiles);
    }

    return contextItems;
  }
}