// Simplified in-memory LRU cache for autocomplete
// Replaces the complex SQLite-based implementation

interface CacheEntry {
  completion: string;
  timestamp: number;
}

export class AutocompleteLruCache {
  private cache = new Map<string, CacheEntry>();
  private maxSize: number;
  private ttl: number; // Time to live in milliseconds

  constructor(maxSize = 1000, ttl = 3600000) { // 1 hour default TTL
    this.maxSize = maxSize;
    this.ttl = ttl;
  }

  private cleanExpired(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > this.ttl) {
        this.cache.delete(key);
      }
    }
  }

  private ensureSize(): void {
    if (this.cache.size > this.maxSize) {
      // Delete oldest entries
      const entries = Array.from(this.cache.entries());
      const toDelete = entries.slice(0, this.cache.size - this.maxSize);
      toDelete.forEach(([key]) => this.cache.delete(key));
    }
  }

  async get(key: string): Promise<string | undefined> {
    this.cleanExpired();
    const entry = this.cache.get(key);
    if (entry) {
      // Move to end (LRU behavior)
      this.cache.delete(key);
      this.cache.set(key, entry);
      return entry.completion;
    }
    return undefined;
  }

  async put(key: string, completion: string): Promise<void> {
    this.cleanExpired();
    this.ensureSize();

    this.cache.set(key, {
      completion,
      timestamp: Date.now(),
    });
  }

  async clear(): Promise<void> {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }

  // Static method to get singleton instance
  private static instance: AutocompleteLruCache | null = null;

  static get(): Promise<AutocompleteLruCache> {
    if (!AutocompleteLruCache.instance) {
      AutocompleteLruCache.instance = new AutocompleteLruCache();
    }
    return Promise.resolve(AutocompleteLruCache.instance);
  }

  static reset(): void {
    AutocompleteLruCache.instance = null;
  }
}