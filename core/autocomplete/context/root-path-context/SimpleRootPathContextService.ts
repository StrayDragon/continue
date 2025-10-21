// Simplified root path context service without web-tree-sitter dependency
// Provides basic file path context for autocomplete

import { IDE } from "../../../";
import { RangeInFile } from "../../../";

export interface RootPathContext {
  filepath: string;
  projectRoot: string;
  relativePath: string;
  language: string;
  isTestFile: boolean;
}

export class SimpleRootPathContextService {
  constructor(private ide: IDE) {}

  async getRootPathContext(filepath: string): Promise<RootPathContext | null> {
    try {
      const workspaceDirs = await this.ide.getWorkspaceDirs();
      if (workspaceDirs.length === 0) {
        return null;
      }

      // Find the most specific workspace root for this file
      let projectRoot = workspaceDirs[0];
      let maxCommonPath = '';

      for (const workspaceDir of workspaceDirs) {
        if (filepath.startsWith(workspaceDir)) {
          if (workspaceDir.length > maxCommonPath.length) {
            maxCommonPath = workspaceDir;
            projectRoot = workspaceDir;
          }
        }
      }

      const relativePath = filepath.replace(projectRoot, '').replace(/^[\/\\]/, '');
      const language = await this.ide.getLanguage(filepath);
      const isTestFile = this.isTestFile(filepath);

      return {
        filepath,
        projectRoot,
        relativePath,
        language,
        isTestFile,
      };
    } catch (error) {
      console.warn('[Conti] Failed to get root path context:', error);
      return null;
    }
  }

  private isTestFile(filepath: string): boolean {
    const testPatterns = [
      /\.test\./,
      /\.spec\./,
      /test\./,
      /spec\./,
      /__tests__/,
      /test[s]?/,
    ];

    return testPatterns.some(pattern => pattern.test(filepath));
  }

  async getRelatedFiles(filepath: string, maxFiles: number = 10): Promise<string[]> {
    try {
      const context = await this.getRootPathContext(filepath);
      if (!context) {
        return [];
      }

      const workspaceDirs = await this.ide.getWorkspaceDirs();
      const projectRoot = workspaceDirs[0];

      // Get all files in the project (simplified)
      const allFiles = await this.ide.listDirectoryContents(projectRoot);

      // Filter and prioritize related files
      const relatedFiles = allFiles
        .filter(file => this.isRelatedFile(file, context))
        .slice(0, maxFiles);

      return relatedFiles;
    } catch (error) {
      console.warn('[Conti] Failed to get related files:', error);
      return [];
    }
  }

  private isRelatedFile(filepath: string, context: RootPathContext): boolean {
    // Same directory
    const contextDir = context.filepath.substring(0, context.filepath.lastIndexOf('/'));
    const fileDir = filepath.substring(0, filepath.lastIndexOf('/'));

    if (contextDir === fileDir) {
      return true;
    }

    // Same file extension (language)
    const contextExt = context.filepath.split('.').pop();
    const fileExt = filepath.split('.').pop();

    if (contextExt === fileExt && !this.isTestFile(filepath)) {
      return true;
    }

    return false;
  }

  async getFileStructure(filepath: string): Promise<any> {
    try {
      const context = await this.getRootPathContext(filepath);
      if (!context) {
        return null;
      }

      // Simple structure based on directory hierarchy
      const structure = {
        projectRoot: context.projectRoot,
        relativePath: context.relativePath,
        language: context.language,
        isTest: context.isTestFile,
      };

      return structure;
    } catch (error) {
      console.warn('[Conti] Failed to get file structure:', error);
      return null;
    }
  }
}