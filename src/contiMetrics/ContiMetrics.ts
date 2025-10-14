/**
 * ContiMetrics - Performance monitoring and metrics collection for Conti extension
 *
 * This module provides comprehensive performance tracking including:
 * - Startup time monitoring
 * - Autocomplete latency tracking
 * - Memory usage monitoring
 * - LLM response time tracking
 * - Performance analytics
 */

import * as vscode from 'vscode';

export interface PerformanceMetrics {
  startup: {
    extensionActivation: number;
    firstCompletion: number;
    totalStartup: number;
  };
  autocomplete: {
    averageLatency: number;
    minLatency: number;
    maxLatency: number;
    totalCompletions: number;
    successRate: number;
  };
  memory: {
    currentUsage: number;
    peakUsage: number;
    averageUsage: number;
    leakDetection: number[];
  };
  llm: {
    averageResponseTime: number;
    timeoutRate: number;
    errorRate: number;
    tokensProcessed: number;
  };
  system: {
    cpuUsage?: number;
    diskUsage?: number;
    networkLatency?: number;
  };
}

export interface PerformanceConfig {
  enabled: boolean;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
  maxMetricsHistory: number;
  reportInterval: number;
  enableMemoryTracking: boolean;
  enableStartupTracking: boolean;
  enableAutocompleteTracking: boolean;
  enableLLMTracking: boolean;
  enableSystemTracking: boolean;
  alertThresholds: {
    startupTime: number; // ms
    autocompleteLatency: number; // ms
    memoryUsage: number; // MB
    llmResponseTime: number; // ms
  };
}

export class ContiMetrics {
  private static instance: ContiMetrics;
  private config: PerformanceConfig;
  private metrics: PerformanceMetrics;
  private metricsHistory: PerformanceMetrics[] = [];
  private timers: Map<string, NodeJS.Timeout> = new Map();
  private performanceTimers: Map<string, number> = new Map();
  private outputChannel: vscode.OutputChannel;
  private startTime: number;

  private constructor(config?: Partial<PerformanceConfig>) {
    this.startTime = Date.now();
    this.outputChannel = vscode.window.createOutputChannel('Conti Performance');

    this.config = {
      enabled: true,
      logLevel: 'info',
      maxMetricsHistory: 100,
      reportInterval: 30000, // 30 seconds
      enableMemoryTracking: true,
      enableStartupTracking: true,
      enableAutocompleteTracking: true,
      enableLLMTracking: true,
      enableSystemTracking: false,
      alertThresholds: {
        startupTime: 500,
        autocompleteLatency: 300,
        memoryUsage: 50,
        llmResponseTime: 1000,
      },
      ...config,
    };

    this.metrics = this.initializeMetrics();

    if (this.config.enabled) {
      this.startMonitoring();
    }
  }

  public static getInstance(config?: Partial<PerformanceConfig>): ContiMetrics {
    if (!ContiMetrics.instance) {
      ContiMetrics.instance = new ContiMetrics(config);
    }
    return ContiMetrics.instance;
  }

  private initializeMetrics(): PerformanceMetrics {
    return {
      startup: {
        extensionActivation: 0,
        firstCompletion: 0,
        totalStartup: 0,
      },
      autocomplete: {
        averageLatency: 0,
        minLatency: Infinity,
        maxLatency: 0,
        totalCompletions: 0,
        successRate: 1,
      },
      memory: {
        currentUsage: 0,
        peakUsage: 0,
        averageUsage: 0,
        leakDetection: [],
      },
      llm: {
        averageResponseTime: 0,
        timeoutRate: 0,
        errorRate: 0,
        tokensProcessed: 0,
      },
      system: {
        cpuUsage: 0,
        diskUsage: 0,
        networkLatency: 0,
      },
    };
  }

  private startMonitoring(): void {
    this.log('Starting performance monitoring...', 'info');

    // Track extension startup time
    if (this.config.enableStartupTracking) {
      this.trackStartup();
    }

    // Start periodic memory monitoring
    if (this.config.enableMemoryTracking) {
      this.startMemoryMonitoring();
    }

    // Start periodic reporting
    this.startPeriodicReporting();
  }

  private trackStartup(): void {
    const activationStart = this.startTime;

    // Track activation time
    process.nextTick(() => {
      const activationEnd = Date.now();
      this.metrics.startup.extensionActivation = activationEnd - activationStart;
      this.log(`Extension activation: ${this.metrics.startup.extensionActivation}ms`, 'info');

      // Alert if startup is too slow
      if (this.metrics.startup.extensionActivation > this.config.alertThresholds.startupTime) {
        this.warn(`Slow startup detected: ${this.metrics.startup.extensionActivation}ms > ${this.config.alertThresholds.startupTime}ms`);
      }
    });
  }

  private startMemoryMonitoring(): void {
    const memoryInterval = setInterval(() => {
      const memUsage = process.memoryUsage();
      const heapUsedMB = Math.round(memUsage.heapUsed / 1024 / 1024);

      this.metrics.memory.currentUsage = heapUsedMB;
      this.metrics.memory.peakUsage = Math.max(this.metrics.memory.peakUsage, heapUsedMB);

      // Track for potential memory leaks
      this.metrics.memory.leakDetection.push(heapUsedMB);
      if (this.metrics.memory.leakDetection.length > 100) {
        this.metrics.memory.leakDetection.shift();
      }

      // Alert if memory usage is too high
      if (heapUsedMB > this.config.alertThresholds.memoryUsage) {
        this.warn(`High memory usage detected: ${heapUsedMB}MB > ${this.config.alertThresholds.memoryUsage}MB`);
      }

      // Check for memory leaks
      this.detectMemoryLeaks();

    }, 5000); // Check every 5 seconds

    this.timers.set('memory', memoryInterval);
  }

  private detectMemoryLeaks(): void {
    const samples = this.metrics.memory.leakDetection;
    if (samples.length < 20) return;

    const recent = samples.slice(-10);
    const older = samples.slice(-20, -10);

    const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length;
    const olderAvg = older.reduce((a, b) => a + b, 0) / older.length;

    // If recent average is 20% higher than older average, potential leak
    if (recentAvg > olderAvg * 1.2) {
      this.warn(`Potential memory leak detected. Recent average: ${recentAvg}MB, Older average: ${olderAvg}MB`);
    }
  }

  private startPeriodicReporting(): void {
    const reportInterval = setInterval(() => {
      this.generatePerformanceReport();
    }, this.config.reportInterval);

    this.timers.set('report', reportInterval);
  }

  // Public API for tracking various performance metrics

  public trackAutocompleteRequest(requestId: string): void {
    if (!this.config.enableAutocompleteTracking) return;

    this.performanceTimers.set(`autocomplete_${requestId}`, Date.now());
    this.metrics.autocomplete.totalCompletions++;
  }

  public trackAutocompleteResponse(requestId: string, success: boolean = true): void {
    if (!this.config.enableAutocompleteTracking) return;

    const startTime = this.performanceTimers.get(`autocomplete_${requestId}`);
    if (!startTime) return;

    const latency = Date.now() - startTime;
    this.performanceTimers.delete(`autocomplete_${requestId}`);

    // Update metrics
    this.metrics.autocomplete.minLatency = Math.min(this.metrics.autocomplete.minLatency, latency);
    this.metrics.autocomplete.maxLatency = Math.max(this.metrics.autocomplete.maxLatency, latency);

    // Calculate average latency
    const totalLatency = (this.metrics.autocomplete.averageLatency * (this.metrics.autocomplete.totalCompletions - 1)) + latency;
    this.metrics.autocomplete.averageLatency = totalLatency / this.metrics.autocomplete.totalCompletions;

    // Update success rate
    if (!success) {
      this.metrics.autocomplete.successRate = (this.metrics.autocomplete.totalCompletions - 1) / this.metrics.autocomplete.totalCompletions;
    }

    // Alert if latency is too high
    if (latency > this.config.alertThresholds.autocompleteLatency) {
      this.warn(`High autocomplete latency: ${latency}ms > ${this.config.alertThresholds.autocompleteLatency}ms`);
    }

    this.log(`Autocomplete latency: ${latency}ms (avg: ${this.metrics.autocomplete.averageLatency.toFixed(2)}ms)`, 'debug');
  }

  public trackLLMRequest(requestId: string): void {
    if (!this.config.enableLLMTracking) return;

    this.performanceTimers.set(`llm_${requestId}`, Date.now());
  }

  public trackLLMResponse(requestId: string, tokensProcessed: number, success: boolean = true): void {
    if (!this.config.enableLLMTracking) return;

    const startTime = this.performanceTimers.get(`llm_${requestId}`);
    if (!startTime) return;

    const responseTime = Date.now() - startTime;
    this.performanceTimers.delete(`llm_${requestId}`);

    // Update metrics
    this.metrics.llm.tokensProcessed += tokensProcessed;

    const totalRequests = this.metrics.llm.tokensProcessed / tokensProcessed; // Approximate
    const totalResponseTime = (this.metrics.llm.averageResponseTime * (totalRequests - 1)) + responseTime;
    this.metrics.llm.averageResponseTime = totalResponseTime / totalRequests;

    if (!success) {
      this.metrics.llm.errorRate = (this.metrics.llm.errorRate * (totalRequests - 1) + 1) / totalRequests;
    }

    // Alert if response time is too high
    if (responseTime > this.config.alertThresholds.llmResponseTime) {
      this.warn(`High LLM response time: ${responseTime}ms > ${this.config.alertThresholds.llmResponseTime}ms`);
    }

    this.log(`LLM response time: ${responseTime}ms (avg: ${this.metrics.llm.averageResponseTime.toFixed(2)}ms)`, 'debug');
  }

  public trackFirstCompletion(): void {
    if (!this.config.enableStartupTracking) return;

    const firstCompletionTime = Date.now() - this.startTime;
    this.metrics.startup.firstCompletion = firstCompletionTime;
    this.metrics.startup.totalStartup = firstCompletionTime;

    this.log(`First completion: ${firstCompletionTime}ms`, 'info');

    // Alert if first completion is too slow
    if (firstCompletionTime > this.config.alertThresholds.startupTime) {
      this.warn(`Slow first completion: ${firstCompletionTime}ms > ${this.config.alertThresholds.startupTime}ms`);
    }
  }

  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  public getMetricsHistory(): PerformanceMetrics[] {
    return [...this.metricsHistory];
  }

  public generatePerformanceReport(): void {
    const report = {
      timestamp: new Date().toISOString(),
      uptime: Date.now() - this.startTime,
      metrics: this.metrics,
      alerts: this.checkForAlerts(),
    };

    // Add to history
    this.metricsHistory.push(this.metrics);
    if (this.metricsHistory.length > this.config.maxMetricsHistory) {
      this.metricsHistory.shift();
    }

    // Log report
    this.log('Performance Report:', 'info');
    this.log(`  Uptime: ${report.uptime}ms`, 'info');
    this.log(`  Startup: ${this.metrics.startup.totalStartup}ms`, 'info');
    this.log(`  Avg Autocomplete Latency: ${this.metrics.autocomplete.averageLatency.toFixed(2)}ms`, 'info');
    this.log(`  Memory Usage: ${this.metrics.memory.currentUsage}MB`, 'info');
    this.log(`  LLM Response Time: ${this.metrics.llm.averageResponseTime.toFixed(2)}ms`, 'info');

    // Show alerts if any
    if (report.alerts.length > 0) {
      this.log('Performance Alerts:', 'warn');
      report.alerts.forEach(alert => this.log(`  - ${alert}`, 'warn'));
    }

    // Update average memory usage
    if (this.metrics.memory.currentUsage > 0) {
      this.metrics.memory.averageUsage =
        (this.metrics.memory.averageUsage * (this.metricsHistory.length - 1) + this.metrics.memory.currentUsage) /
        this.metricsHistory.length;
    }
  }

  private checkForAlerts(): string[] {
    const alerts: string[] = [];

    if (this.metrics.startup.totalStartup > this.config.alertThresholds.startupTime) {
      alerts.push(`Slow startup: ${this.metrics.startup.totalStartup}ms`);
    }

    if (this.metrics.autocomplete.averageLatency > this.config.alertThresholds.autocompleteLatency) {
      alerts.push(`High autocomplete latency: ${this.metrics.autocomplete.averageLatency.toFixed(2)}ms`);
    }

    if (this.metrics.memory.currentUsage > this.config.alertThresholds.memoryUsage) {
      alerts.push(`High memory usage: ${this.metrics.memory.currentUsage}MB`);
    }

    if (this.metrics.llm.averageResponseTime > this.config.alertThresholds.llmResponseTime) {
      alerts.push(`High LLM response time: ${this.metrics.llm.averageResponseTime.toFixed(2)}ms`);
    }

    return alerts;
  }

  public updateConfig(newConfig: Partial<PerformanceConfig>): void {
    this.config = { ...this.config, ...newConfig };

    // Restart monitoring if needed
    if (this.config.enabled) {
      this.restartMonitoring();
    } else {
      this.stopMonitoring();
    }
  }

  private restartMonitoring(): void {
    this.stopMonitoring();
    this.startMonitoring();
  }

  public stopMonitoring(): void {
    this.log('Stopping performance monitoring...', 'info');

    // Clear all timers
    this.timers.forEach(timer => clearInterval(timer));
    this.timers.clear();

    // Clear performance timers
    this.performanceTimers.clear();
  }

  public dispose(): void {
    this.stopMonitoring();
    this.outputChannel.dispose();
  }

  private log(message: string, level: string = 'info'): void {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${level.toUpperCase()}: ${message}`;

    if (this.shouldLogLevel(level)) {
      this.outputChannel.appendLine(logMessage);

      // Also log to console for debugging
      if (level === 'error' || level === 'warn') {
        console.log(logMessage);
      }
    }
  }

  private warn(message: string): void {
    this.log(message, 'warn');
  }

  private error(message: string): void {
    this.log(message, 'error');
  }

  private debug(message: string): void {
    this.log(message, 'debug');
  }

  private shouldLogLevel(level: string): boolean {
    const levels = { debug: 0, info: 1, warn: 2, error: 3 };
    return levels[level] >= levels[this.config.logLevel];
  }

  // Utility methods for performance optimization

  public createPerformanceTimer(name: string): () => void {
    const startTime = Date.now();
    this.performanceTimers.set(name, startTime);

    return () => {
      const endTime = Date.now();
      const duration = endTime - startTime;
      this.performanceTimers.delete(name);
      this.debug(`Timer '${name}': ${duration}ms`);
      return duration;
    };
  }

  public async measureAsyncOperation<T>(
    name: string,
    operation: () => Promise<T>
  ): Promise<T> {
    const endTimer = this.createPerformanceTimer(name);
    try {
      const result = await operation();
      endTimer();
      return result;
    } catch (error) {
      endTimer();
      throw error;
    }
  }

  public measureSyncOperation<T>(name: string, operation: () => T): T {
    const endTimer = this.createPerformanceTimer(name);
    try {
      const result = operation();
      endTimer();
      return result;
    } catch (error) {
      endTimer();
      throw error;
    }
  }
}