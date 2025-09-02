export type TestStatus = 'passed' | 'failed' | 'skipped' | 'pending';

export interface TestResult {
    testFile: string;
    status: TestStatus;
    duration: number;
    error: string | null;
    timestamp: Date;
    screenshot?: string;
    video?: string;
    har?: string;
}

export interface TestAnalysis {
    totalTests: number;
    passedTests: number;
    failedTests: number;
    skippedTests: number;
    totalDuration: number;
    averageDuration: number;
    successRate: number;
    failedTestsList: string[];
    performanceMetrics: PerformanceMetrics;
}

export interface PerformanceMetrics {
    slowestTest: TestResult;
    fastestTest: TestResult;
    memoryUsage?: number;
    cpuUsage?: number;
}

export interface BrowserConfig {
    name: string;
    type: 'chromium' | 'firefox' | 'webkit';
    headless: boolean;
    viewport: {
        width: number;
        height: number;
    };
    args?: string[];
}

export interface TestEnvironment {
    name: string;
    baseUrl: string;
    timeout: number;
    retries: number;
    browsers: BrowserConfig[];
}

export interface NotificationConfig {
    email?: {
        smtp: string;
        port: number;
        user: string;
        password: string;
        to: string[];
    };
    slack?: {
        webhookUrl: string;
        channel: string;
    };
    teams?: {
        webhookUrl: string;
    };
}

export interface TestReport {
    summary: TestAnalysis;
    details: TestResult[];
    timestamp: Date;
    environment: string;
    browser: string;
    metadata: Record<string, any>;
}
