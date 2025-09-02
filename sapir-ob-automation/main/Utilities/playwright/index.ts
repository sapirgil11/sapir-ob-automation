// Main automation orchestrator
export { AutomationOrchestrator } from './automation/automation-orchestrator';

// Test execution components
export { TestRunner } from './scripts/test-runner';
export { ReportGenerator } from './scripts/report-generator';

// Analysis and notification components
export { ResultAnalyzer } from './automation/result-analyzer';
export { NotificationService } from './automation/notification-service';

// Type definitions
export type {
    TestResult,
    TestAnalysis,
    TestReport,
    TestStatus,
    PerformanceMetrics,
    BrowserConfig,
    TestEnvironment,
    NotificationConfig
} from './scripts/types';

// Configuration
export { testEnvironments, getEnvironment, getRecommendedEnvironment } from './config/test-environments';
export { default as enhancedPlaywrightConfig } from './config/enhanced-playwright.config';

// CI/CD configurations
export { default as githubActionsConfig } from './ci-cd/github-actions.yml';
export { default as dockerConfig } from './ci-cd/docker-setup.yml';

/**
 * Quick start automation functions
 */

/**
 * Run automation with default settings
 */
export async function runAutomation(environment?: string): Promise<void> {
    const orchestrator = new AutomationOrchestrator(environment);
    
    try {
        console.log('🚀 Starting Lili Test Automation...');
        
        // Run full suite
        const report = await orchestrator.runFullSuite(['chromium']);
        
        console.log('✅ Automation completed successfully!');
        console.log(`📊 Report generated: ${report.summary.totalTests} tests executed`);
        
    } catch (error) {
        console.error('❌ Automation failed:', error);
        throw error;
    } finally {
        await orchestrator.cleanup();
    }
}

/**
 * Run smoke tests only
 */
export async function runSmokeTests(environment?: string): Promise<void> {
    const orchestrator = new AutomationOrchestrator(environment);
    
    try {
        console.log('💨 Running Lili Smoke Tests...');
        
        const report = await orchestrator.runSmokeTests();
        
        console.log('✅ Smoke tests completed!');
        console.log(`📊 Results: ${report.summary.passedTests}/${report.summary.totalTests} passed`);
        
    } catch (error) {
        console.error('❌ Smoke tests failed:', error);
        throw error;
    } finally {
        await orchestrator.cleanup();
    }
}

/**
 * Run specific test file
 */
export async function runTestFile(testFile: string, environment?: string): Promise<void> {
    const orchestrator = new AutomationOrchestrator(environment);
    
    try {
        console.log(`🎯 Running test file: ${testFile}`);
        
        const report = await orchestrator.runTestFile(testFile);
        
        console.log('✅ Test file execution completed!');
        console.log(`📊 Results: ${report.summary.passedTests}/${report.summary.totalTests} passed`);
        
    } catch (error) {
        console.error(`❌ Test file execution failed:`, error);
        throw error;
    } finally {
        await orchestrator.cleanup();
    }
}

/**
 * Get automation status and configuration
 */
export function getAutomationStatus(environment?: string): any {
    const orchestrator = new AutomationOrchestrator(environment);
    
    return {
        environment: orchestrator.getCurrentEnvironmentInfo(),
        availableEnvironments: orchestrator.getAvailableEnvironments(),
        validation: orchestrator.validateEnvironment()
    };
}

/**
 * Change automation environment
 */
export function changeAutomationEnvironment(newEnvironment: string): void {
    const orchestrator = new AutomationOrchestrator();
    orchestrator.changeEnvironment(newEnvironment);
}

/**
 * Default automation configuration
 */
export const defaultConfig = {
    environment: 'integration',
    browsers: ['chromium'],
    headless: true,
    timeout: 60000,
    retries: 1,
    viewport: { width: 1920, height: 1080 }
};

/**
 * Automation utilities
 */
export const utils = {
    /**
     * Format test duration
     */
    formatDuration: (ms: number): string => {
        if (ms < 1000) return `${ms}ms`;
        if (ms < 60000) return `${(ms / 1000).toFixed(2)}s`;
        return `${(ms / 60000).toFixed(2)}m`;
    },
    
    /**
     * Format file size
     */
    formatFileSize: (bytes: number): string => {
        if (bytes < 1024) return `${bytes}B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)}KB`;
        if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)}MB`;
        return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)}GB`;
    },
    
    /**
     * Generate test ID
     */
    generateTestId: (): string => {
        return `test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    },
    
    /**
     * Validate email format
     */
    isValidEmail: (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    
    /**
     * Wait for specified time
     */
    wait: (ms: number): Promise<void> => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
};

/**
 * Automation constants
 */
export const constants = {
    TIMEOUTS: {
        SHORT: 5000,
        MEDIUM: 15000,
        LONG: 30000,
        EXTENDED: 60000
    },
    
    VIEWPORTS: {
        DESKTOP: { width: 1920, height: 1080 },
        TABLET: { width: 768, height: 1024 },
        MOBILE: { width: 375, height: 667 }
    },
    
    BROWSERS: {
        CHROMIUM: 'chromium',
        FIREFOX: 'firefox',
        WEBKIT: 'webkit'
    },
    
    ENVIRONMENTS: {
        LOCAL: 'local',
        INTEGRATION: 'integration',
        STAGING: 'staging',
        PRODUCTION: 'production'
    },
    
    STATUS: {
        PASSED: 'passed',
        FAILED: 'failed',
        SKIPPED: 'skipped',
        PENDING: 'pending'
    }
};
