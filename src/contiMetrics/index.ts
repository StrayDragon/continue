/**
 * ContiMetrics - Performance monitoring and analysis module for Conti extension
 *
 * This module provides comprehensive performance monitoring, analysis, and optimization
 * capabilities for the Conti autocomplete extension.
 */

export { ContiMetrics, type PerformanceConfig, type PerformanceMetrics } from './ContiMetrics';
export {
  PerformanceAnalyzer,
  type PerformanceIssue,
  type OptimizationRecommendation,
  type PerformanceReport
} from './PerformanceAnalyzer';

// Re-export commonly used types and utilities
export type {
  PerformanceConfig,
  PerformanceMetrics,
  PerformanceIssue,
  OptimizationRecommendation,
  PerformanceReport,
} from './ContiMetrics';

// Factory functions for easy setup
export function createContiMetrics(config?: Partial<PerformanceConfig>): ContiMetrics {
  return ContiMetrics.getInstance(config);
}

export function createPerformanceAnalyzer(metrics: ContiMetrics): PerformanceAnalyzer {
  return new PerformanceAnalyzer(metrics);
}

// Performance utility functions
export function measurePerformance<T>(
  name: string,
  operation: () => T,
  metrics?: ContiMetrics
): T {
  if (metrics) {
    return metrics.measureSyncOperation(name, operation);
  }

  const start = performance.now();
  const result = operation();
  const duration = performance.now() - start;
  console.log(`[Performance] ${name}: ${duration.toFixed(2)}ms`);
  return result;
}

export async function measureAsyncPerformance<T>(
  name: string,
  operation: () => Promise<T>,
  metrics?: ContiMetrics
): Promise<T> {
  if (metrics) {
    return metrics.measureAsyncOperation(name, operation);
  }

  const start = performance.now();
  const result = await operation();
  const duration = performance.now() - start;
  console.log(`[Performance] ${name}: ${duration.toFixed(2)}ms`);
  return result;
}

// Performance monitoring decorator
export function monitorPerformance(
  target: any,
  propertyName: string,
  descriptor: TypedPropertyDescriptor<any>
) {
  const method = descriptor.value!;

  descriptor.value = function(...args: any[]) {
    const metrics = (this as any).metrics as ContiMetrics;
    const timer = metrics?.createPerformanceTimer(`${target.constructor.name}.${propertyName}`);

    try {
      const result = method.apply(this, args);
      timer?.();
      return result;
    } catch (error) {
      timer?.();
      throw error;
    }
  };
}

// Async performance monitoring decorator
export function monitorAsyncPerformance(
  target: any,
  propertyName: string,
  descriptor: TypedPropertyDescriptor<any>
) {
  const method = descriptor.value!;

  descriptor.value = async function(...args: any[]) {
    const metrics = (this as any).metrics as ContiMetrics;
    const timer = metrics?.createPerformanceTimer(`${target.constructor.name}.${propertyName}`);

    try {
      const result = await method.apply(this, args);
      timer?.();
      return result;
    } catch (error) {
      timer?.();
      throw error;
    }
  };
}