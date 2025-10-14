/**
 * Performance Analyzer - Advanced performance analysis and optimization recommendations
 *
 * This component provides deep analysis of performance metrics and generates
 * actionable recommendations for optimizing the Conti extension.
 */

import { ContiMetrics, PerformanceMetrics } from './ContiMetrics';

export interface PerformanceIssue {
  type: 'startup' | 'autocomplete' | 'memory' | 'llm' | 'system';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  recommendation: string;
  metrics: Record<string, number>;
  timestamp: string;
}

export interface OptimizationRecommendation {
  category: 'performance' | 'memory' | 'configuration' | 'architecture';
  priority: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  implementation: string;
  expectedImpact: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface PerformanceReport {
  timestamp: string;
  overallScore: number; // 0-100
  issues: PerformanceIssue[];
  recommendations: OptimizationRecommendation[];
  trends: {
    startup: 'improving' | 'stable' | 'degrading';
    autocomplete: 'improving' | 'stable' | 'degrading';
    memory: 'improving' | 'stable' | 'degrading';
    llm: 'improving' | 'stable' | 'degrading';
  };
  summary: {
    startupGrade: 'A' | 'B' | 'C' | 'D' | 'F';
    autocompleteGrade: 'A' | 'B' | 'C' | 'D' | 'F';
    memoryGrade: 'A' | 'B' | 'C' | 'D' | 'F';
    llmGrade: 'A' | 'B' | 'C' | 'D' | 'F';
  };
}

export class PerformanceAnalyzer {
  private metrics: ContiMetrics;
  private historicalData: PerformanceMetrics[] = [];
  private issues: PerformanceIssue[] = [];

  constructor(metrics: ContiMetrics) {
    this.metrics = metrics;
  }

  public analyzePerformance(): PerformanceReport {
    const currentMetrics = this.metrics.getMetrics();
    this.historicalData = this.metrics.getMetricsHistory();

    const issues = this.identifyIssues(currentMetrics);
    const recommendations = this.generateRecommendations(currentMetrics, issues);
    const trends = this.analyzeTrends();
    const summary = this.generateSummary(currentMetrics);
    const overallScore = this.calculateOverallScore(currentMetrics, issues);

    return {
      timestamp: new Date().toISOString(),
      overallScore,
      issues,
      recommendations,
      trends,
      summary,
    };
  }

  private identifyIssues(currentMetrics: PerformanceMetrics): PerformanceIssue[] {
    const issues: PerformanceIssue[] = [];

    // Startup issues
    if (currentMetrics.startup.totalStartup > 500) {
      issues.push({
        type: 'startup',
        severity: currentMetrics.startup.totalStartup > 1000 ? 'critical' : 'high',
        title: 'Slow Extension Startup',
        description: `Extension startup time is ${currentMetrics.startup.totalStartup}ms, which exceeds the target of 500ms.`,
        recommendation: 'Consider lazy loading non-essential components and optimizing initialization code.',
        metrics: { startupTime: currentMetrics.startup.totalStartup },
        timestamp: new Date().toISOString(),
      });
    }

    // Autocomplete latency issues
    if (currentMetrics.autocomplete.averageLatency > 300) {
      issues.push({
        type: 'autocomplete',
        severity: currentMetrics.autocomplete.averageLatency > 500 ? 'critical' : 'high',
        title: 'High Autocomplete Latency',
        description: `Average autocomplete latency is ${currentMetrics.autocomplete.averageLatency.toFixed(2)}ms, exceeding the target of 300ms.`,
        recommendation: 'Implement better caching, optimize LLM requests, and consider edge computing.',
        metrics: { averageLatency: currentMetrics.autocomplete.averageLatency },
        timestamp: new Date().toISOString(),
      });
    }

    // Memory usage issues
    if (currentMetrics.memory.currentUsage > 50) {
      issues.push({
        type: 'memory',
        severity: currentMetrics.memory.currentUsage > 100 ? 'critical' : 'high',
        title: 'High Memory Usage',
        description: `Current memory usage is ${currentMetrics.memory.currentUsage}MB, exceeding the target of 50MB.`,
        recommendation: 'Implement memory pooling, optimize data structures, and add garbage collection hints.',
        metrics: { memoryUsage: currentMetrics.memory.currentUsage },
        timestamp: new Date().toISOString(),
      });
    }

    // Memory leak detection
    if (this.detectMemoryLeak(currentMetrics)) {
      issues.push({
        type: 'memory',
        severity: 'high',
        title: 'Potential Memory Leak',
        description: 'Memory usage shows an upward trend over time, indicating a potential memory leak.',
        recommendation: 'Review event listeners, closures, and circular references. Add memory profiling.',
        metrics: { leakScore: this.calculateLeakScore(currentMetrics) },
        timestamp: new Date().toISOString(),
      });
    }

    // LLM performance issues
    if (currentMetrics.llm.averageResponseTime > 1000) {
      issues.push({
        type: 'llm',
        severity: currentMetrics.llm.averageResponseTime > 2000 ? 'critical' : 'high',
        title: 'High LLM Response Time',
        description: `Average LLM response time is ${currentMetrics.llm.averageResponseTime.toFixed(2)}ms, exceeding the target of 1000ms.`,
        recommendation: 'Consider model selection, prompt optimization, or implementing request batching.',
        metrics: { responseTime: currentMetrics.llm.averageResponseTime },
        timestamp: new Date().toISOString(),
      });
    }

    // Error rate issues
    if (currentMetrics.llm.errorRate > 0.1) {
      issues.push({
        type: 'llm',
        severity: currentMetrics.llm.errorRate > 0.3 ? 'critical' : 'high',
        title: 'High LLM Error Rate',
        description: `LLM error rate is ${(currentMetrics.llm.errorRate * 100).toFixed(1)}%, exceeding the acceptable threshold of 10%.`,
        recommendation: 'Implement better error handling, retry logic, and fallback mechanisms.',
        metrics: { errorRate: currentMetrics.llm.errorRate },
        timestamp: new Date().toISOString(),
      });
    }

    // Autocomplete success rate issues
    if (currentMetrics.autocomplete.successRate < 0.9) {
      issues.push({
        type: 'autocomplete',
        severity: 'medium',
        title: 'Low Autocomplete Success Rate',
        description: `Autocomplete success rate is ${(currentMetrics.autocomplete.successRate * 100).toFixed(1)}%, below the target of 90%.`,
        recommendation: 'Improve context gathering, error handling, and user interaction detection.',
        metrics: { successRate: currentMetrics.autocomplete.successRate },
        timestamp: new Date().toISOString(),
      });
    }

    this.issues = issues;
    return issues;
  }

  private generateRecommendations(
    currentMetrics: PerformanceMetrics,
    issues: PerformanceIssue[]
  ): OptimizationRecommendation[] {
    const recommendations: OptimizationRecommendation[] = [];

    // Memory optimization recommendations
    if (issues.some(i => i.type === 'memory')) {
      recommendations.push({
        category: 'memory',
        priority: 'high',
        title: 'Implement Object Pooling',
        description: 'Reuse objects instead of creating new ones to reduce garbage collection pressure.',
        implementation: 'Create a pool manager for frequently allocated objects like completion items.',
        expectedImpact: '20-30% reduction in memory usage and GC pauses',
        difficulty: 'medium',
      });

      recommendations.push({
        category: 'memory',
        priority: 'medium',
        title: 'Optimize Data Structures',
        description: 'Replace arrays with more efficient data structures where appropriate.',
        implementation: 'Use Maps for key-value lookups, Sets for uniqueness, and typed arrays for numeric data.',
        expectedImpact: '10-15% reduction in memory usage',
        difficulty: 'easy',
      });
    }

    // Performance optimization recommendations
    if (issues.some(i => i.type === 'autocomplete' || i.type === 'startup')) {
      recommendations.push({
        category: 'performance',
        priority: 'high',
        title: 'Implement Smart Caching',
        description: 'Cache LLM responses and reuse them for similar code contexts.',
        implementation: 'Create a context-aware cache with intelligent invalidation strategies.',
        expectedImpact: '40-60% improvement in autocomplete latency',
        difficulty: 'medium',
      });

      recommendations.push({
        category: 'performance',
        priority: 'medium',
        title: 'Add Debouncing and Throttling',
        description: 'Reduce the frequency of expensive operations during rapid typing.',
        implementation: 'Implement debounce for autocomplete requests and throttle for memory monitoring.',
        expectedImpact: '20-30% reduction in CPU usage',
        difficulty: 'easy',
      });
    }

    // LLM optimization recommendations
    if (issues.some(i => i.type === 'llm')) {
      recommendations.push({
        category: 'configuration',
        priority: 'high',
        title: 'Optimize LLM Parameters',
        description: 'Adjust LLM parameters for better performance vs. quality trade-off.',
        implementation: 'Reduce max tokens, adjust temperature, and use smaller models for simple completions.',
        expectedImpact: '30-50% improvement in LLM response time',
        difficulty: 'easy',
      });

      recommendations.push({
        category: 'architecture',
        priority: 'medium',
        title: 'Implement Request Batching',
        description: 'Batch multiple LLM requests into single API calls when possible.',
        implementation: 'Create a request queue and batch similar requests together.',
        expectedImpact: '20-40% reduction in API calls and costs',
        difficulty: 'hard',
      });
    }

    // Architecture recommendations
    if (issues.some(i => i.severity === 'critical')) {
      recommendations.push({
        category: 'architecture',
        priority: 'high',
        title: 'Implement Lazy Loading',
        description: 'Load components only when they are actually needed.',
        implementation: 'Split the extension into modules and load them on demand.',
        expectedImpact: '30-50% improvement in startup time',
        difficulty: 'medium',
      });

      recommendations.push({
        category: 'architecture',
        priority: 'medium',
        title: 'Add Web Workers',
        description: 'Offload CPU-intensive tasks to background threads.',
        implementation: 'Move LLM processing and large computations to Web Workers.',
        expectedImpact: '20-30% improvement in UI responsiveness',
        difficulty: 'hard',
      });
    }

    return recommendations.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }

  private analyzeTrends(): PerformanceReport['trends'] {
    if (this.historicalData.length < 5) {
      return {
        startup: 'stable',
        autocomplete: 'stable',
        memory: 'stable',
        llm: 'stable',
      };
    }

    const recent = this.historicalData.slice(-5);
    const older = this.historicalData.slice(-10, -5);

    const analyzeTrend = (recentKey: keyof PerformanceMetrics, olderKey: keyof PerformanceMetrics) => {
      const recentAvg = this.calculateAverage(recent, recentKey);
      const olderAvg = this.calculateAverage(older, olderKey);
      const changePercent = ((recentAvg - olderAvg) / olderAvg) * 100;

      if (changePercent > 10) return 'degrading';
      if (changePercent < -10) return 'improving';
      return 'stable';
    };

    return {
      startup: analyzeTrend('startup', 'startup'),
      autocomplete: analyzeTrend('autocomplete', 'autocomplete'),
      memory: analyzeTrend('memory', 'memory'),
      llm: analyzeTrend('llm', 'llm'),
    };
  }

  private generateSummary(currentMetrics: PerformanceMetrics): PerformanceReport['summary'] {
    const calculateGrade = (value: number, excellent: number, good: number, fair: number, poor: number) => {
      if (value <= excellent) return 'A';
      if (value <= good) return 'B';
      if (value <= fair) return 'C';
      if (value <= poor) return 'D';
      return 'F';
    };

    return {
      startupGrade: calculateGrade(currentMetrics.startup.totalStartup, 200, 400, 600, 800),
      autocompleteGrade: calculateGrade(currentMetrics.autocomplete.averageLatency, 150, 250, 400, 600),
      memoryGrade: calculateGrade(currentMetrics.memory.currentUsage, 20, 35, 50, 75),
      llmGrade: calculateGrade(currentMetrics.llm.averageResponseTime, 500, 800, 1200, 2000),
    };
  }

  private calculateOverallScore(currentMetrics: PerformanceMetrics, issues: PerformanceIssue[]): number {
    const weights = {
      startup: 0.2,
      autocomplete: 0.3,
      memory: 0.25,
      llm: 0.25,
    };

    const startupScore = Math.max(0, 100 - (currentMetrics.startup.totalStartup / 500) * 100);
    const autocompleteScore = Math.max(0, 100 - (currentMetrics.autocomplete.averageLatency / 300) * 100);
    const memoryScore = Math.max(0, 100 - (currentMetrics.memory.currentUsage / 50) * 100);
    const llmScore = Math.max(0, 100 - (currentMetrics.llm.averageResponseTime / 1000) * 100);

    const weightedScore =
      startupScore * weights.startup +
      autocompleteScore * weights.autocomplete +
      memoryScore * weights.memory +
      llmScore * weights.llm;

    // Deduct points for issues
    const issuePenalty = issues.reduce((total, issue) => {
      const penalties = { critical: 20, high: 10, medium: 5, low: 2 };
      return total + penalties[issue.severity];
    }, 0);

    return Math.max(0, weightedScore - issuePenalty);
  }

  private detectMemoryLeak(currentMetrics: PerformanceMetrics): boolean {
    const samples = currentMetrics.memory.leakDetection;
    if (samples.length < 10) return false;

    const trend = this.calculateTrend(samples);
    return trend > 0.1; // 10% upward trend
  }

  private calculateLeakScore(currentMetrics: PerformanceMetrics): number {
    const samples = currentMetrics.memory.leakDetection;
    if (samples.length < 10) return 0;

    const trend = this.calculateTrend(samples);
    return Math.min(100, trend * 100);
  }

  private calculateTrend(samples: number[]): number {
    if (samples.length < 2) return 0;

    const n = samples.length;
    const sumX = (n * (n - 1)) / 2;
    const sumY = samples.reduce((sum, val) => sum + val, 0);
    const sumXY = samples.reduce((sum, val, i) => sum + val * i, 0);
    const sumX2 = (n * (n - 1) * (2 * n - 1)) / 6;

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const avgY = sumY / n;

    return slope / avgY; // Normalize by average value
  }

  private calculateAverage(data: PerformanceMetrics[], key: keyof PerformanceMetrics): number {
    if (data.length === 0) return 0;

    const sum = data.reduce((total, metrics) => {
      const value = this.getNestedValue(metrics, key);
      return total + (typeof value === 'number' ? value : 0);
    }, 0);

    return sum / data.length;
  }

  private getNestedValue(obj: any, key: string): any {
    return key.split('.').reduce((current, k) => current?.[k], obj);
  }

  public getIssues(): PerformanceIssue[] {
    return [...this.issues];
  }

  public clearIssues(): void {
    this.issues = [];
  }

  public exportReport(): string {
    const report = this.analyzePerformance();
    return JSON.stringify(report, null, 2);
  }

  public generateMarkdownReport(): string {
    const report = this.analyzePerformance();

    return `# Performance Report

## Overall Score: ${report.overallScore.toFixed(0)}/100

## Summary
- **Startup**: ${report.summary.startupGrade}
- **Autocomplete**: ${report.summary.autocompleteGrade}
- **Memory**: ${report.summary.memoryGrade}
- **LLM**: ${report.summary.llmGrade}

## Trends
- **Startup**: ${report.trends.startup} ${this.getTrendEmoji(report.trends.startup)}
- **Autocomplete**: ${report.trends.autocomplete} ${this.getTrendEmoji(report.trends.autocomplete)}
- **Memory**: ${report.trends.memory} ${this.getTrendEmoji(report.trends.memory)}
- **LLM**: ${report.trends.llm} ${this.getTrendEmoji(report.trends.llm)}

## Issues
${report.issues.map(issue => `
### ${issue.title} (${issue.severity})
- **Type**: ${issue.type}
- **Description**: ${issue.description}
- **Recommendation**: ${issue.recommendation}
`).join('')}

## Recommendations
${report.recommendations.map(rec => `
### ${rec.title} (${rec.priority})
- **Category**: ${rec.category}
- **Description**: ${rec.description}
- **Implementation**: ${rec.implementation}
- **Expected Impact**: ${rec.expectedImpact}
- **Difficulty**: ${rec.difficulty}
`).join('')}

---
*Generated on ${new Date().toISOString()}*
`;
  }

  private getTrendEmoji(trend: string): string {
    switch (trend) {
      case 'improving': return '📈';
      case 'degrading': return '📉';
      default: return '➡️';
    }
  }
}