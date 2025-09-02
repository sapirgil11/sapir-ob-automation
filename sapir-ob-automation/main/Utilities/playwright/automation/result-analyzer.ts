import { TestResult, TestAnalysis, PerformanceMetrics } from '../scripts/types';

export class ResultAnalyzer {
    
    /**
     * Analyze test results and provide insights
     */
    analyzeResults(results: TestResult[]): TestAnalysis {
        console.log('🔍 Analyzing test results...');
        
        const analysis = this.calculateBasicMetrics(results);
        const enhancedAnalysis = this.enhanceWithInsights(analysis, results);
        
        console.log('✅ Analysis completed');
        return enhancedAnalysis;
    }

    /**
     * Calculate basic metrics from results
     */
    private calculateBasicMetrics(results: TestResult[]): TestAnalysis {
        const totalTests = results.length;
        const passedTests = results.filter(r => r.status === 'passed').length;
        const failedTests = results.filter(r => r.status === 'failed').length;
        const skippedTests = results.filter(r => r.status === 'skipped').length;
        
        const totalDuration = results.reduce((sum, r) => sum + r.duration, 0);
        const averageDuration = totalTests > 0 ? totalDuration / totalTests : 0;
        const successRate = totalTests > 0 ? (passedTests / totalTests) * 100 : 0;

        const failedTestsList = results
            .filter(r => r.status === 'failed')
            .map(r => r.testFile);

        const performanceMetrics = this.calculatePerformanceMetrics(results);

        return {
            totalTests,
            passedTests,
            failedTests,
            skippedTests,
            totalDuration,
            averageDuration,
            successRate,
            failedTestsList,
            performanceMetrics
        };
    }

    /**
     * Calculate performance metrics
     */
    private calculatePerformanceMetrics(results: TestResult[]): PerformanceMetrics {
        if (results.length === 0) {
            return {
                slowestTest: { testFile: 'N/A', status: 'skipped', duration: 0, error: null, timestamp: new Date() },
                fastestTest: { testFile: 'N/A', status: 'skipped', duration: 0, error: null, timestamp: new Date() }
            };
        }

        const sortedByDuration = [...results].sort((a, b) => a.duration - b.duration);
        const fastestTest = sortedByDuration[0];
        const slowestTest = sortedByDuration[sortedByDuration.length - 1];

        return {
            slowestTest,
            fastestTest
        };
    }

    /**
     * Enhance analysis with insights and recommendations
     */
    private enhanceWithInsights(analysis: TestAnalysis, results: TestResult[]): TestAnalysis {
        // Add performance insights
        const performanceInsights = this.generatePerformanceInsights(analysis);
        
        // Add failure analysis
        const failureInsights = this.generateFailureInsights(results);
        
        // Add recommendations
        const recommendations = this.generateRecommendations(analysis, results);
        
        // Log insights
        this.logInsights(performanceInsights, failureInsights, recommendations);
        
        return analysis;
    }

    /**
     * Generate performance insights
     */
    private generatePerformanceInsights(analysis: TestAnalysis): string[] {
        const insights: string[] = [];
        
        if (analysis.performanceMetrics.slowestTest.duration > 10000) {
            insights.push('⚠️ Some tests are taking longer than 10 seconds - consider optimizing');
        }
        
        if (analysis.performanceMetrics.fastestTest.duration < 100) {
            insights.push('✅ Fastest test completed in under 100ms - excellent performance');
        }
        
        if (analysis.averageDuration > 5000) {
            insights.push('⚠️ Average test duration is high - review test efficiency');
        }
        
        return insights;
    }

    /**
     * Generate failure insights
     */
    private generateFailureInsights(results: TestResult[]): string[] {
        const insights: string[] = [];
        const failedResults = results.filter(r => r.status === 'failed');
        
        if (failedResults.length === 0) {
            insights.push('🎉 All tests passed! No failures to analyze');
            return insights;
        }
        
        // Group failures by error type
        const errorGroups = this.groupFailuresByError(failedResults);
        
        errorGroups.forEach((tests, error) => {
            if (tests.length > 1) {
                insights.push(`🔍 Multiple tests failed with same error: "${error}" (${tests.length} tests)`);
            } else {
                insights.push(`❌ Test "${tests[0].testFile}" failed: ${error}`);
            }
        });
        
        return insights;
    }

    /**
     * Group failures by error message
     */
    private groupFailuresByError(failedResults: TestResult[]): Map<string, TestResult[]> {
        const groups = new Map<string, TestResult[]>();
        
        failedResults.forEach(result => {
            const error = result.error || 'Unknown error';
            if (!groups.has(error)) {
                groups.set(error, []);
            }
            groups.get(error)!.push(result);
        });
        
        return groups;
    }

    /**
     * Generate recommendations based on analysis
     */
    private generateRecommendations(analysis: TestAnalysis, results: TestResult[]): string[] {
        const recommendations: string[] = [];
        
        // Success rate recommendations
        if (analysis.successRate < 80) {
            recommendations.push('🚨 Success rate below 80% - immediate attention required');
        } else if (analysis.successRate < 95) {
            recommendations.push('⚠️ Success rate below 95% - review failed tests');
        } else {
            recommendations.push('✅ Excellent success rate - maintain current quality');
        }
        
        // Performance recommendations
        if (analysis.averageDuration > 5000) {
            recommendations.push('⚡ Consider parallel test execution to reduce total time');
        }
        
        if (analysis.performanceMetrics.slowestTest.duration > 15000) {
            recommendations.push('🐌 Slowest test exceeds 15 seconds - investigate performance bottlenecks');
        }
        
        // Test coverage recommendations
        if (results.length < 5) {
            recommendations.push('📊 Consider adding more test cases for better coverage');
        }
        
        // Error pattern recommendations
        const commonErrors = this.findCommonErrorPatterns(results);
        if (commonErrors.length > 0) {
            recommendations.push(`🔧 Common error patterns detected: ${commonErrors.join(', ')}`);
        }
        
        return recommendations;
    }

    /**
     * Find common error patterns
     */
    private findCommonErrorPatterns(results: TestResult[]): string[] {
        const failedResults = results.filter(r => r.status === 'failed');
        const errorMessages = failedResults.map(r => r.error).filter(Boolean) as string[];
        
        const patterns: string[] = [];
        
        // Look for timeout patterns
        if (errorMessages.some(e => e.includes('timeout'))) {
            patterns.push('timeout issues');
        }
        
        // Look for element not found patterns
        if (errorMessages.some(e => e.includes('element') && e.includes('not found'))) {
            patterns.push('element locator issues');
        }
        
        // Look for network patterns
        if (errorMessages.some(e => e.includes('network') || e.includes('fetch'))) {
            patterns.push('network connectivity issues');
        }
        
        return patterns;
    }

    /**
     * Log all insights and recommendations
     */
    private logInsights(performanceInsights: string[], failureInsights: string[], recommendations: string[]): void {
        console.log('\n📊 Test Analysis Insights:');
        console.log('========================');
        
        if (performanceInsights.length > 0) {
            console.log('\n🚀 Performance Insights:');
            performanceInsights.forEach(insight => console.log(`  ${insight}`));
        }
        
        if (failureInsights.length > 0) {
            console.log('\n❌ Failure Insights:');
            failureInsights.forEach(insight => console.log(`  ${insight}`));
        }
        
        if (recommendations.length > 0) {
            console.log('\n💡 Recommendations:');
            recommendations.forEach(rec => console.log(`  ${rec}`));
        }
        
        console.log('\n========================\n');
    }

    /**
     * Get test execution summary
     */
    getExecutionSummary(results: TestResult[]): string {
        const total = results.length;
        const passed = results.filter(r => r.status === 'passed').length;
        const failed = results.filter(r => r.status === 'failed').length;
        const skipped = results.filter(r => r.status === 'skipped').length;
        
        return `📋 Execution Summary: ${total} total, ${passed} passed, ${failed} failed, ${skipped} skipped`;
    }

    /**
     * Check if tests need attention
     */
    needsAttention(results: TestResult[]): boolean {
        const failedCount = results.filter(r => r.status === 'failed').length;
        const totalCount = results.length;
        
        // Need attention if more than 20% failed or any critical failures
        return (failedCount / totalCount) > 0.2 || failedCount > 0;
    }
}
