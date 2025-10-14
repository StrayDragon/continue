import * as vscode from "vscode";

/**
 * Memory optimization utilities for Conti extension
 * Implements lazy loading, caching strategies, and memory cleanup
 */
export class MemoryOptimizer {
  private static instance: MemoryOptimizer;
  private cache: Map<string, { data: any; timestamp: number; ttl: number }> = new Map();
  private disposables: vscode.Disposable[] = [];
  private memoryPressureThreshold: number = 0.8; // 80% memory usage threshold

  private constructor() {
    this.setupMemoryMonitoring();
    this.setupPeriodicCleanup();
  }

  public static getInstance(): MemoryOptimizer {
    if (!MemoryOptimizer.instance) {
      MemoryOptimizer.instance = new MemoryOptimizer();
    }
    return MemoryOptimizer.instance;
  }

  /**
   * Set up memory usage monitoring
   */
  private setupMemoryMonitoring(): void {
    // Monitor memory usage and trigger cleanup when needed
    const interval = setInterval(() => {
      this.checkMemoryUsage();
    }, 30000); // Check every 30 seconds

    this.disposables.push(
      new vscode.Disposable(() => clearInterval(interval))
    );
  }

  /**
   * Set up periodic cache cleanup
   */
  private setupPeriodicCleanup(): void {
    // Clean up expired cache entries every 5 minutes
    const interval = setInterval(() => {
      this.cleanupExpiredCache();
    }, 300000); // 5 minutes

    this.disposables.push(
      new vscode.Disposable(() => clearInterval(interval))
    );
  }

  /**
   * Check memory usage and trigger cleanup if needed
   */
  private checkMemoryUsage(): void {
    if (process.memoryUsage) {
      const usage = process.memoryUsage();
      const heapUsed = usage.heapUsed;
      const heapTotal = usage.heapTotal;
      const ratio = heapUsed / heapTotal;

      if (ratio > this.memoryPressureThreshold) {
        console.warn(`Memory usage high: ${(ratio * 100).toFixed(1)}%`);
        this.performAggressiveCleanup();
      }
    }
  }

  /**
   * Clean up expired cache entries
   */
  private cleanupExpiredCache(): void {
    const now = Date.now();
    const keysToDelete: string[] = [];

    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > entry.ttl) {
        keysToDelete.push(key);
      }
    }

    keysToDelete.forEach(key => this.cache.delete(key));

    if (keysToDelete.length > 0) {
      console.debug(`Cleaned up ${keysToDelete.length} expired cache entries`);
    }
  }

  /**
   * Perform aggressive memory cleanup
   */
  private performAggressiveCleanup(): void {
    console.log("Performing aggressive memory cleanup");

    // Clear all cache
    this.cache.clear();

    // Trigger garbage collection if available
    if (global.gc) {
      global.gc();
    }

    // Notify user about cleanup
    vscode.window.showInformationMessage(
      "Conti performed memory cleanup to maintain performance",
      "OK"
    );
  }

  /**
   * Get cached data with lazy loading
   */
  public async get<T>(
    key: string,
    loader: () => Promise<T>,
    ttl: number = 300000 // 5 minutes default TTL
  ): Promise<T> {
    const cached = this.cache.get(key);

    if (cached && Date.now() - cached.timestamp < ttl) {
      return cached.data;
    }

    // Load data if not cached or expired
    const data = await loader();
    this.cache.set(key, { data, timestamp: Date.now(), ttl });

    return data;
  }

  /**
   * Store data in cache
   */
  public set<T>(key: string, data: T, ttl: number = 300000): void {
    this.cache.set(key, { data, timestamp: Date.now(), ttl });
  }

  /**
   * Remove specific cache entry
   */
  public delete(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Clear all cache
   */
  public clearCache(): void {
    this.cache.clear();
  }

  /**
   * Get cache statistics
   */
  public getCacheStats(): {
    size: number;
    keys: string[];
    memoryUsage: NodeJS.MemoryUsage | undefined;
  } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
      memoryUsage: process.memoryUsage(),
    };
  }

  /**
   * Create a lazy-loaded property
   */
  public createLazyProperty<T>(
    target: any,
    propertyName: string,
    loader: () => Promise<T>
  ): void {
    let loaded = false;
    let value: T;

    Object.defineProperty(target, propertyName, {
      get: async function(): Promise<T> {
        if (!loaded) {
          value = await loader();
          loaded = true;
        }
        return value;
      },
      configurable: true,
    });
  }

  /**
   * Optimize array by removing duplicates and sorting
   */
  public optimizeArray<T>(array: T[], comparator?: (a: T, b: T) => number): T[] {
    // Remove duplicates
    const unique = Array.from(new Set(array));

    // Sort if comparator provided
    if (comparator) {
      unique.sort(comparator);
    }

    return unique;
  }

  /**
   * Debounce function to prevent rapid repeated calls
   */
  public debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;

    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }

  /**
   * Throttle function to limit execution rate
   */
  public throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): (...args: Parameters<T>) => void {
    let inThrottle: boolean;

    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  /**
   * Clean up all resources
   */
  public dispose(): void {
    this.cache.clear();
    this.disposables.forEach(disposable => disposable.dispose());
    this.disposables.length = 0;
    MemoryOptimizer.instance = undefined as any;
  }
}

/**
 * Memory usage tracker for monitoring and reporting
 */
export class MemoryUsageTracker {
  private static instance: MemoryUsageTracker;
  private measurements: Array<{ timestamp: number; usage: NodeJS.MemoryUsage }> = [];
  private maxMeasurements: number = 100;

  private constructor() {
    this.startPeriodicMeasurement();
  }

  public static getInstance(): MemoryUsageTracker {
    if (!MemoryUsageTracker.instance) {
      MemoryUsageTracker.instance = new MemoryUsageTracker();
    }
    return MemoryUsageTracker.instance;
  }

  /**
   * Start periodic memory measurement
   */
  private startPeriodicMeasurement(): void {
    setInterval(() => {
      this.recordMeasurement();
    }, 60000); // Measure every minute
  }

  /**
   * Record current memory usage
   */
  private recordMeasurement(): void {
    if (process.memoryUsage) {
      const usage = process.memoryUsage();
      this.measurements.push({
        timestamp: Date.now(),
        usage,
      });

      // Keep only recent measurements
      if (this.measurements.length > this.maxMeasurements) {
        this.measurements = this.measurements.slice(-this.maxMeasurements);
      }
    }
  }

  /**
   * Get memory usage statistics
   */
  public getStatistics(): {
    current: NodeJS.MemoryUsage | undefined;
    average: NodeJS.MemoryUsage | undefined;
    peak: NodeJS.MemoryUsage | undefined;
    measurements: Array<{ timestamp: number; usage: NodeJS.MemoryUsage }>;
  } {
    if (this.measurements.length === 0) {
      return {
        current: process.memoryUsage?.(),
        average: undefined,
        peak: undefined,
        measurements: [],
      };
    }

    const current = process.memoryUsage?.();
    const sum = this.measurements.reduce((acc, measurement) => ({
      rss: acc.rss + measurement.usage.rss,
      heapTotal: acc.heapTotal + measurement.usage.heapTotal,
      heapUsed: acc.heapUsed + measurement.usage.heapUsed,
      external: acc.external + measurement.usage.external,
      arrayBuffers: acc.arrayBuffers + measurement.usage.arrayBuffers,
    }), { rss: 0, heapTotal: 0, heapUsed: 0, external: 0, arrayBuffers: 0 });

    const count = this.measurements.length;
    const average = {
      rss: sum.rss / count,
      heapTotal: sum.heapTotal / count,
      heapUsed: sum.heapUsed / count,
      external: sum.external / count,
      arrayBuffers: sum.arrayBuffers / count,
    };

    const peak = this.measurements.reduce((max, measurement) => ({
      rss: Math.max(max.rss, measurement.usage.rss),
      heapTotal: Math.max(max.heapTotal, measurement.usage.heapTotal),
      heapUsed: Math.max(max.heapUsed, measurement.usage.heapUsed),
      external: Math.max(max.external, measurement.usage.external),
      arrayBuffers: Math.max(max.arrayBuffers, measurement.usage.arrayBuffers),
    }), { rss: 0, heapTotal: 0, heapUsed: 0, external: 0, arrayBuffers: 0 });

    return {
      current,
      average,
      peak,
      measurements: [...this.measurements],
    };
  }

  /**
   * Get memory usage in MB
   */
  public getUsageInMB(): {
    rss: number;
    heapTotal: number;
    heapUsed: number;
    external: number;
    arrayBuffers: number;
  } {
    const usage = process.memoryUsage?.();
    if (!usage) {
      return { rss: 0, heapTotal: 0, heapUsed: 0, external: 0, arrayBuffers: 0 };
    }

    const toMB = (bytes: number) => bytes / 1024 / 1024;

    return {
      rss: toMB(usage.rss),
      heapTotal: toMB(usage.heapTotal),
      heapUsed: toMB(usage.heapUsed),
      external: toMB(usage.external),
      arrayBuffers: toMB(usage.arrayBuffers),
    };
  }
}