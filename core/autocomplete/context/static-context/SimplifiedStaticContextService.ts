// Simplified static context service without web-tree-sitter dependency
// Provides basic static analysis for autocomplete context

import { IDE, Position } from "../../..";

export interface StaticContext {
  definitions: any[];
  imports: any[];
  exports: any[];
  functions: any[];
  classes: any[];
  variables: any[];
}

export class SimplifiedStaticContextService {
  constructor(private ide: IDE) {}

  async getStaticContext(filepath: string, position: Position): Promise<StaticContext> {
    try {
      const content = await this.ide.readFile(filepath);
      const language = await this.ide.getLanguage(filepath);

      const context: StaticContext = {
        definitions: [],
        imports: await this.extractImports(content),
        exports: await this.extractExports(content),
        functions: await this.extractFunctions(content, language),
        classes: await this.extractClasses(content, language),
        variables: await this.extractVariables(content, language),
      };

      return context;
    } catch (error) {
      console.warn('[Conti] Failed to get static context:', error);
      return {
        definitions: [],
        imports: [],
        exports: [],
        functions: [],
        classes: [],
        variables: [],
      };
    }
  }

  private async extractImports(content: string): Promise<any[]> {
    const imports: any[] = [];

    // Common import patterns
    const patterns = [
      // ES6 imports
      /import\s+.*?\s+from\s+['"]([^'"]+)['"]/g,
      // CommonJS require
      /(?:const|let|var)\s+.*?=\s*require\(['"]([^'"]+)['"]\)/g,
      // Python imports
      /from\s+([^\s]+)\s+import/g,
      /import\s+([^\s]+)/g,
    ];

    patterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        imports.push({
          module: match[1],
          type: 'import',
          line: content.substring(0, match.index).split('\n').length,
        });
      }
    });

    return imports;
  }

  private async extractExports(content: string): Promise<any[]> {
    const exports: any[] = [];

    // Common export patterns
    const patterns = [
      // ES6 exports
      /export\s+(?:default\s+)?(?:class|function|const|let|var)\s+(\w+)/g,
      // CommonJS exports
      /module\.exports\s*=\s*(\w+)/g,
      /exports\.(\w+)/g,
    ];

    patterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        exports.push({
          name: match[1],
          type: 'export',
          line: content.substring(0, match.index).split('\n').length,
        });
      }
    });

    return exports;
  }

  private async extractFunctions(content: string, language: string): Promise<any[]> {
    const functions: any[] = [];
    let pattern;

    // Language-specific function patterns
    switch (language) {
      case 'typescript':
      case 'javascript':
        pattern = /(?:function\s+(\w+)|(\w+)\s*=\s*(?:function|\([^)]*\)\s*=>))/g;
        break;
      case 'python':
        pattern = /def\s+(\w+)\s*\(/g;
        break;
      case 'java':
        pattern = /(?:public|private|protected)?\s*(?:static\s+)?(?:\w+\s+)*(\w+)\s*\([^)]*\)\s*(?:throws\s+[\w\s,]+)?\s*{/g;
        break;
      default:
        pattern = /(?:function|def)\s+(\w+)\s*\(/g;
    }

    let match;
    while ((match = pattern.exec(content)) !== null) {
      functions.push({
        name: match[1],
        type: 'function',
        line: content.substring(0, match.index).split('\n').length,
      });
    }

    return functions;
  }

  private async extractClasses(content: string, language: string): Promise<any[]> {
    const classes: any[] = [];
    let pattern;

    // Language-specific class patterns
    switch (language) {
      case 'typescript':
      case 'javascript':
      case 'python':
        pattern = /class\s+(\w+)/g;
        break;
      case 'java':
        pattern = /(?:public\s+)?class\s+(\w+)/g;
        break;
      default:
        pattern = /class\s+(\w+)/g;
    }

    let match;
    while ((match = pattern.exec(content)) !== null) {
      classes.push({
        name: match[1],
        type: 'class',
        line: content.substring(0, match.index).split('\n').length,
      });
    }

    return classes;
  }

  private async extractVariables(content: string, language: string): Promise<any[]> {
    const variables: any[] = [];
    let patterns: RegExp[];

    // Language-specific variable patterns
    switch (language) {
      case 'typescript':
      case 'javascript':
        patterns = [
          /(?:const|let|var)\s+(\w+)\s*=/g,
          /(\w+)\s*:\s*\w+/g, // TypeScript type annotations
        ];
        break;
      case 'python':
        patterns = [
          /(\w+)\s*=/g,
        ];
        break;
      default:
        patterns = [
          /(?:const|let|var)\s+(\w+)\s*=/g,
        ];
    }

    patterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        // Filter out common keywords
        const name = match[1];
        if (!['function', 'class', 'if', 'else', 'for', 'while', 'return'].includes(name)) {
          variables.push({
            name,
            type: 'variable',
            line: content.substring(0, match.index).split('\n').length,
          });
        }
      }
    });

    return variables;
  }

  async getDefinitionsAtPosition(filepath: string, position: Position): Promise<any[]> {
    try {
      const content = await this.ide.readFile(filepath);
      const line = content.split('\n')[position.line];
      const wordUnderCursor = this.extractWordAtPosition(line, position.character);

      if (!wordUnderCursor) {
        return [];
      }

      const context = await this.getStaticContext(filepath, position);

      // Search for definitions of the word under cursor
      const definitions = [
        ...context.functions.filter(f => f.name === wordUnderCursor),
        ...context.classes.filter(c => c.name === wordUnderCursor),
        ...context.variables.filter(v => v.name === wordUnderCursor),
      ];

      return definitions;
    } catch (error) {
      console.warn('[Conti] Failed to get definitions at position:', error);
      return [];
    }
  }

  private extractWordAtPosition(line: string, character: number): string | null {
    // Simple word extraction
    const words = line.match(/\w+/g) || [];
    let charCount = 0;

    for (const word of words) {
      const wordIndex = line.indexOf(word, charCount);
      if (wordIndex <= character && character < wordIndex + word.length) {
        return word;
      }
      charCount = wordIndex + word.length;
    }

    return null;
  }
}