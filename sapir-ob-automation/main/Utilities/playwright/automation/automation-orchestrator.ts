import { TestRunner } from '../scripts/test-runner';
import { ReportGenerator } from '../scripts/report-generator';
import { ResultAnalyzer } from './result-analyzer';
import { NotificationService } from './notification-service';
import { TestResult, TestAnalysis, TestReport } from '../scripts/types';
import { getEnvironment, getRecommendedEnvironment } from '../config/test-environments';

/**
 * Main automation orchestrator that coordinates all components
 */
export class AutomationOrchestrator {
    private testRunner: TestRunner;
    private reportGenerator: ReportGenerator;
    private resultAnalyzer: ResultAnalyzer;
    private notificationService: NotificationService;
    private currentEnvironment: string;

    constructor(environment?: string) {
        this.currentEnvironment = environment || getRecommendedEnvironment();
        this.testRunner = new TestRunner();
        this.reportGenerator = new ReportGenerator();
        this.resultAnalyzer = new ResultAnalyzer();
        this.notificationService = new NotificationService();
        
        console.log(`🚀 Automation Orchestrator initialized for environment: ${this.currentEnvironment}`);
    }

    /**
     * Run full automation suite
     */
    async runFullSuite(browsers: ('chromium' | 'firefox' | 'webkit')[] = ['chromium']): Promise<TestReport> {
        console.log('🎯 Starting full automation suite...');
        
        try {
            // Get environment configuration
            const envConfig = getEnvironment(this.currentEnvironment);
            console.log(`🌍 Environment: ${envConfig.name} (${envConfig.baseUrl})`);
            
            // Run tests on all specified browsers
            const allResults: TestResult[] = [];
            
            for (const browser of browsers) {
                console.log(`\n🌐 Running tests on ${browser}...`);
                const results = await this.testRunner.runTests(browser, true);
                allResults.push(...results);
            }
            
            // Analyze results
            console.log('\n🔍 Analyzing test results...');
            const analysis = this.resultAnalyzer.analyzeResults(allResults);
            
            // Generate comprehensive report
            console.log('\n📊 Generating comprehensive report...');
            const report = await this.reportGenerator.generateReport(
                allResults,
                this.currentEnvironment,
                browsers.join(', ')
            );
            
            // Send notifications
            console.log('\n📧 Sending notifications...');
            await this.notificationService.sendResults(analysis);
            
            // Log summary
            this.logExecutionSummary(analysis);
            
            return report;
            
        } catch (error) {
            console.error('❌ Full automation suite failed:', error);
            throw error;
        }
    }

    /**
     * Run specific test file
     */
    async runTestFile(testFile: string, browser: 'chromium' | 'firefox' | 'webkit' = 'chromium'): Promise<TestReport> {
        console.log(`🎯 Running specific test file: ${testFile}`);
        
        try {
            // Run test on specified browser
            const results = await this.testRunner.runTests(browser, false);
            
            // Filter results for specific file
            const fileResults = results.filter(r => r.testFile.includes(testFile));
            
            if (fileResults.length === 0) {
                throw new Error(`No test results found for file: ${testFile}`);
            }
            
            // Analyze results
            const analysis = this.resultAnalyzer.analyzeResults(fileResults);
            
            // Generate report
            const report = await this.reportGenerator.generateReport(
                fileResults,
                this.currentEnvironment,
                browser
            );
            
            // Send notifications if needed
            if (analysis.failedTests > 0) {
                await this.notificationService.sendResults(analysis);
            }
            
            return report;
            
        } catch (error) {
            console.error(`❌ Failed to run test file ${testFile}:`, error);
            throw error;
        }
    }

    /**
     * Run tests in parallel across multiple browsers
     */
    async runParallelTests(browsers: ('chromium' | 'firefox' | 'webkit')[] = ['chromium', 'firefox']): Promise<TestReport[]> {
        console.log(`🚀 Running tests in parallel across ${browsers.length} browsers...`);
        
        try {
            const parallelResults = await this.testRunner.runTestsParallel(browsers);
            const allResults = parallelResults.flat();
            
            // Analyze combined results
            const analysis = this.resultAnalyzer.analyzeResults(allResults);
            
            // Generate reports for each browser
            const reports: TestReport[] = [];
            for (let i = 0; i < browsers.length; i++) {
                const browserResults = parallelResults[i];
                const report = await this.reportGenerator.generateReport(
                    browserResults,
                    this.currentEnvironment,
                    browsers[i]
                );
                reports.push(report);
            }
            
            // Send combined notification
            await this.notificationService.sendResults(analysis);
            
            return reports;
            
        } catch (error) {
            console.error('❌ Parallel test execution failed:', error);
            throw error;
        }
    }

    /**
     * Run smoke tests (quick validation)
     */
    async runSmokeTests(): Promise<TestReport> {
        console.log('💨 Running smoke tests...');
        
        try {
            // Run only critical tests
            const results = await this.testRunner.runTests('chromium', true);
            
            // Filter for smoke test results (you can customize this logic)
            const smokeResults = results.filter(r => 
                r.testFile.includes('welcomeScreenTest') || 
                r.testFile.includes('loginPage')
            );
            
            const analysis = this.resultAnalyzer.analyzeResults(smokeResults);
            const report = await this.reportGenerator.generateReport(
                smokeResults,
                this.currentEnvironment,
                'chromium'
            );
            
            // Send urgent notification if smoke tests fail
            if (analysis.failedTests > 0) {
                await this.notificationService.sendUrgentNotification(
                    analysis,
                    'Smoke tests failed - immediate attention required'
                );
            }
            
            return report;
            
        } catch (error) {
            console.error('❌ Smoke tests failed:', error);
            throw error;
        }
    }

    /**
     * Run regression tests
     */
    async runRegressionTests(): Promise<TestReport> {
        console.log('🔄 Running regression tests...');
        
        try {
            // Run all tests with extended timeout
            const results = await this.testRunner.runTests('chromium', true);
            
            const analysis = this.resultAnalyzer.analyzeResults(results);
            const report = await this.reportGenerator.generateReport(
                results,
                this.currentEnvironment,
                'chromium'
            );
            
            // Send detailed notification for regression tests
            await this.notificationService.sendResults(analysis);
            
            return report;
            
        } catch (error) {
            console.error('❌ Regression tests failed:', error);
            throw error;
        }
    }

    /**
     * Run performance tests
     */
    async runPerformanceTests(): Promise<TestReport> {
        console.log('⚡ Running performance tests...');
        
        try {
            // Run tests with performance monitoring
            const startTime = Date.now();
            const results = await this.testRunner.runTests('chromium', true);
            const totalTime = Date.now() - startTime;
            
            // Add performance metrics
            const enhancedResults = results.map(result => ({
                ...result,
                performanceMetrics: {
                    executionTime: result.duration,
                    memoryUsage: process.memoryUsage(),
                    cpuUsage: process.cpuUsage()
                }
            }));
            
            const analysis = this.resultAnalyzer.analyzeResults(enhancedResults);
            const report = await this.reportGenerator.generateReport(
                enhancedResults,
                this.currentEnvironment,
                'chromium'
            );
            
            // Log performance insights
            console.log(`\n⚡ Performance Summary:`);
            console.log(`Total execution time: ${(totalTime / 1000).toFixed(2)}s`);
            console.log(`Average test time: ${analysis.averageDuration.toFixed(2)}ms`);
            console.log(`Memory usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`);
            
            return report;
            
        } catch (error) {
            console.error('❌ Performance tests failed:', error);
            throw error;
        }
    }

    /**
     * Change environment
     */
    changeEnvironment(newEnvironment: string): void {
        try {
            getEnvironment(newEnvironment); // Validate environment exists
            this.currentEnvironment = newEnvironment;
            console.log(`🔄 Environment changed to: ${newEnvironment}`);
        } catch (error) {
            console.error(`❌ Failed to change environment to ${newEnvironment}:`, error);
            throw error;
        }
    }

    /**
     * Get current environment info
     */
    getCurrentEnvironmentInfo(): any {
        const env = getEnvironment(this.currentEnvironment);
        return {
            name: env.name,
            baseUrl: env.baseUrl,
            timeout: env.timeout,
            retries: env.retries,
            browsers: env.browsers.map(b => b.name)
        };
    }

    /**
     * Get available environments
     */
    getAvailableEnvironments(): string[] {
        return Object.keys(getEnvironment(this.currentEnvironment));
    }

    /**
     * Validate current environment configuration
     */
    validateEnvironment(): string[] {
        const env = getEnvironment(this.currentEnvironment);
        return this.resultAnalyzer.validateEnvironment(env);
    }

    /**
     * Log execution summary
     */
    private logExecutionSummary(analysis: TestAnalysis): void {
        console.log('\n🎯 Execution Summary');
        console.log('==================');
        console.log(`Total Tests: ${analysis.totalTests}`);
        console.log(`Passed: ${analysis.passedTests} ✅`);
        console.log(`Failed: ${analysis.failedTests} ❌`);
        console.log(`Skipped: ${analysis.skippedTests} ⏭️`);
        console.log(`Success Rate: ${analysis.successRate.toFixed(2)}%`);
        console.log(`Total Duration: ${(analysis.totalDuration / 1000).toFixed(2)}s`);
        console.log(`Average Duration: ${analysis.averageDuration.toFixed(2)}ms`);
        
        if (analysis.failedTests > 0) {
            console.log('\n❌ Failed Tests:');
            analysis.failedTestsList.forEach(test => console.log(`  - ${test}`));
        }
        
        console.log('==================\n');
    }

    /**
     * Cleanup resources
     */
    async cleanup(): Promise<void> {
        console.log('🧹 Cleaning up automation resources...');
        
        try {
            // Cleanup test runner
            // Note: TestRunner handles its own cleanup
            
            // Cleanup report generator
            // Note: ReportGenerator handles its own cleanup
            
            console.log('✅ Cleanup completed');
        } catch (error) {
            console.error('⚠️ Cleanup error:', error);
        }
    }
}
