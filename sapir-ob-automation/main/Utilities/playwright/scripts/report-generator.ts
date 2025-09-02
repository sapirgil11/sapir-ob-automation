import { TestResult, TestAnalysis, TestReport } from './types';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as ExcelJS from 'exceljs';

export class ReportGenerator {
    private outputDir: string;
    private timestamp: string;

    constructor(outputDir: string = 'test-results/reports') {
        this.outputDir = outputDir;
        this.timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        this.ensureOutputDir();
    }

    /**
     * Generate comprehensive test report
     */
    async generateReport(results: TestResult[], environment: string = 'local', browser: string = 'chromium'): Promise<TestReport> {
        console.log('📊 Generating comprehensive test report...');
        
        const analysis = this.analyzeResults(results);
        const report: TestReport = {
            summary: analysis,
            details: results,
            timestamp: new Date(),
            environment,
            browser,
            metadata: {
                nodeVersion: process.version,
                platform: process.platform,
                arch: process.arch,
                memoryUsage: process.memoryUsage(),
                uptime: process.uptime()
            }
        };

        // Generate different report formats
        await Promise.all([
            this.generateHtmlReport(report),
            this.generateExcelReport(report),
            this.generateJsonReport(report),
            this.generateMarkdownReport(report)
        ]);

        console.log('✅ All report formats generated successfully!');
        return report;
    }

    /**
     * Generate HTML report
     */
    private async generateHtmlReport(report: TestReport): Promise<void> {
        const htmlContent = this.createHtmlContent(report);
        const filePath = path.join(this.outputDir, `test-report-${this.timestamp}.html`);
        
        await fs.writeFile(filePath, htmlContent, 'utf8');
        console.log(`📄 HTML report saved: ${filePath}`);
    }

    /**
     * Generate Excel report
     */
    private async generateExcelReport(report: TestReport): Promise<void> {
        const workbook = new ExcelJS.Workbook();
        
        // Summary sheet
        const summarySheet = workbook.addWorksheet('Summary');
        summarySheet.columns = [
            { header: 'Metric', key: 'metric', width: 20 },
            { header: 'Value', key: 'value', width: 15 }
        ];
        
        summarySheet.addRows([
            { metric: 'Total Tests', value: report.summary.totalTests },
            { metric: 'Passed Tests', value: report.summary.passedTests },
            { metric: 'Failed Tests', value: report.summary.failedTests },
            { metric: 'Success Rate', value: `${report.summary.successRate.toFixed(2)}%` },
            { metric: 'Total Duration', value: `${(report.summary.totalDuration / 1000).toFixed(2)}s` },
            { metric: 'Environment', value: report.environment },
            { metric: 'Browser', value: report.browser },
            { metric: 'Timestamp', value: report.timestamp.toISOString() }
        ]);

        // Details sheet
        const detailsSheet = workbook.addWorksheet('Test Details');
        detailsSheet.columns = [
            { header: 'Test File', key: 'testFile', width: 40 },
            { header: 'Status', key: 'status', width: 15 },
            { header: 'Duration (ms)', key: 'duration', width: 15 },
            { header: 'Error', key: 'error', width: 50 },
            { header: 'Timestamp', key: 'timestamp', width: 25 }
        ];

        report.details.forEach(result => {
            detailsSheet.addRow({
                testFile: result.testFile,
                status: result.status,
                duration: result.duration,
                error: result.error || 'N/A',
                timestamp: result.timestamp.toISOString()
            });
        });

        // Performance sheet
        const perfSheet = workbook.addWorksheet('Performance');
        perfSheet.columns = [
            { header: 'Metric', key: 'metric', width: 25 },
            { header: 'Value', key: 'value', width: 40 }
        ];

        perfSheet.addRows([
            { metric: 'Fastest Test', value: `${report.summary.performanceMetrics.fastestTest.testFile} (${report.summary.performanceMetrics.fastestTest.duration}ms)` },
            { metric: 'Slowest Test', value: `${report.summary.performanceMetrics.slowestTest.testFile} (${report.summary.performanceMetrics.slowestTest.duration}ms)` },
            { metric: 'Average Duration', value: `${(report.summary.averageDuration).toFixed(2)}ms` }
        ]);

        const filePath = path.join(this.outputDir, `test-report-${this.timestamp}.xlsx`);
        await workbook.xlsx.writeFile(filePath);
        console.log(`📊 Excel report saved: ${filePath}`);
    }

    /**
     * Generate JSON report
     */
    private async generateJsonReport(report: TestReport): Promise<void> {
        const filePath = path.join(this.outputDir, `test-report-${this.timestamp}.json`);
        await fs.writeJson(filePath, report, { spaces: 2 });
        console.log(`📋 JSON report saved: ${filePath}`);
    }

    /**
     * Generate Markdown report
     */
    private async generateMarkdownReport(report: TestReport): Promise<void> {
        const markdownContent = this.createMarkdownContent(report);
        const filePath = path.join(this.outputDir, `test-report-${this.timestamp}.md`);
        
        await fs.writeFile(filePath, markdownContent, 'utf8');
        console.log(`📝 Markdown report saved: ${filePath}`);
    }

    /**
     * Create HTML content for report
     */
    private createHtmlContent(report: TestReport): string {
        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lili Test Report - ${report.timestamp.toLocaleDateString()}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background-color: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { text-align: center; border-bottom: 2px solid #007bff; padding-bottom: 20px; margin-bottom: 30px; }
        .summary-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .summary-card { background: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center; border-left: 4px solid #007bff; }
        .summary-card h3 { margin: 0 0 10px 0; color: #007bff; }
        .summary-card .value { font-size: 2em; font-weight: bold; color: #28a745; }
        .failed { color: #dc3545 !important; }
        .passed { color: #28a745 !important; }
        .table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        .table th, .table td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
        .table th { background-color: #007bff; color: white; }
        .status-passed { color: #28a745; font-weight: bold; }
        .status-failed { color: #dc3545; font-weight: bold; }
        .status-skipped { color: #ffc107; font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚀 Lili Test Automation Report</h1>
            <p>Generated on ${report.timestamp.toLocaleString()}</p>
            <p><strong>Environment:</strong> ${report.environment} | <strong>Browser:</strong> ${report.browser}</p>
        </div>
        
        <div class="summary-grid">
            <div class="summary-card">
                <h3>Total Tests</h3>
                <div class="value">${report.summary.totalTests}</div>
            </div>
            <div class="summary-card">
                <h3>Passed</h3>
                <div class="value passed">${report.summary.passedTests}</div>
            </div>
            <div class="summary-card">
                <h3>Failed</h3>
                <div class="value failed">${report.summary.failedTests}</div>
            </div>
            <div class="summary-card">
                <h3>Success Rate</h3>
                <div class="value">${report.summary.successRate.toFixed(2)}%</div>
            </div>
            <div class="summary-card">
                <h3>Total Duration</h3>
                <div class="value">${(report.summary.totalDuration / 1000).toFixed(2)}s</div>
            </div>
            <div class="summary-card">
                <h3>Avg Duration</h3>
                <div class="value">${report.summary.averageDuration.toFixed(2)}ms</div>
            </div>
        </div>
        
        <h2>📋 Test Details</h2>
        <table class="table">
            <thead>
                <tr>
                    <th>Test File</th>
                    <th>Status</th>
                    <th>Duration</th>
                    <th>Error</th>
                    <th>Timestamp</th>
                </tr>
            </thead>
            <tbody>
                ${report.details.map(result => `
                    <tr>
                        <td>${result.testFile}</td>
                        <td class="status-${result.status}">${result.status.toUpperCase()}</td>
                        <td>${result.duration}ms</td>
                        <td>${result.error || 'N/A'}</td>
                        <td>${result.timestamp.toLocaleString()}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    </div>
</body>
</html>`;
    }

    /**
     * Create Markdown content for report
     */
    private createMarkdownContent(report: TestReport): string {
        return `# 🚀 Lili Test Automation Report

**Generated:** ${report.timestamp.toLocaleString()}  
**Environment:** ${report.environment}  
**Browser:** ${report.browser}

## 📊 Summary

| Metric | Value |
|--------|-------|
| Total Tests | ${report.summary.totalTests} |
| Passed Tests | ${report.summary.passedTests} |
| Failed Tests | ${report.summary.failedTests} |
| Success Rate | ${report.summary.successRate.toFixed(2)}% |
| Total Duration | ${(report.summary.totalDuration / 1000).toFixed(2)}s |
| Average Duration | ${report.summary.averageDuration.toFixed(2)}ms |

## 📋 Test Details

| Test File | Status | Duration | Error | Timestamp |
|-----------|--------|----------|-------|-----------|
${report.details.map(result => `| ${result.testFile} | ${result.status.toUpperCase()} | ${result.duration}ms | ${result.error || 'N/A'} | ${result.timestamp.toLocaleString()} |`).join('\n')}

## 🎯 Performance Metrics

- **Fastest Test:** ${report.summary.performanceMetrics.fastestTest.testFile} (${report.summary.performanceMetrics.fastestTest.duration}ms)
- **Slowest Test:** ${report.summary.performanceMetrics.slowestTest.testFile} (${report.summary.performanceMetrics.slowestTest.duration}ms)

---
*Report generated automatically by Lili Test Automation System*`;
    }

    /**
     * Analyze test results
     */
    private analyzeResults(results: TestResult[]): TestAnalysis {
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

        const sortedByDuration = [...results].sort((a, b) => a.duration - b.duration);
        const fastestTest = sortedByDuration[0];
        const slowestTest = sortedByDuration[sortedByDuration.length - 1];

        return {
            totalTests,
            passedTests,
            failedTests,
            skippedTests,
            totalDuration,
            averageDuration,
            successRate,
            failedTestsList,
            performanceMetrics: {
                slowestTest,
                fastestTest
            }
        };
    }

    /**
     * Ensure output directory exists
     */
    private async ensureOutputDir(): Promise<void> {
        await fs.ensureDir(this.outputDir);
    }
}
