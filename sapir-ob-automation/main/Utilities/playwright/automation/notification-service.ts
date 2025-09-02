import { TestAnalysis, NotificationConfig } from '../scripts/types';
import * as nodemailer from 'nodemailer';

export class NotificationService {
    private config: NotificationConfig;

    constructor(config?: NotificationConfig) {
        this.config = config || {};
    }

    /**
     * Send test results notifications
     */
    async sendResults(analysis: TestAnalysis): Promise<void> {
        console.log('📧 Sending test result notifications...');
        
        try {
            const promises: Promise<void>[] = [];
            
            // Send email notification if configured
            if (this.config.email) {
                promises.push(this.sendEmailNotification(analysis));
            }
            
            // Send Slack notification if configured
            if (this.config.slack) {
                promises.push(this.sendSlackNotification(analysis));
            }
            
            // Send Teams notification if configured
            if (this.config.teams) {
                promises.push(this.sendTeamsNotification(analysis));
            }
            
            // Wait for all notifications to be sent
            await Promise.all(promises);
            
            console.log('✅ All notifications sent successfully!');
            
        } catch (error) {
            console.error('❌ Failed to send notifications:', error);
        }
    }

    /**
     * Send email notification
     */
    private async sendEmailNotification(analysis: TestAnalysis): Promise<void> {
        if (!this.config.email) return;
        
        try {
            const transporter = nodemailer.createTransporter({
                host: this.config.email.smtp,
                port: this.config.email.port,
                secure: this.config.email.port === 465,
                auth: {
                    user: this.config.email.user,
                    pass: this.config.email.password
                }
            });

            const subject = this.generateEmailSubject(analysis);
            const htmlContent = this.generateEmailContent(analysis);
            
            const mailOptions = {
                from: this.config.email.user,
                to: this.config.email.to.join(', '),
                subject,
                html: htmlContent
            };

            await transporter.sendMail(mailOptions);
            console.log('📧 Email notification sent successfully');
            
        } catch (error) {
            console.error('❌ Failed to send email notification:', error);
            throw error;
        }
    }

    /**
     * Send Slack notification
     */
    private async sendSlackNotification(analysis: TestAnalysis): Promise<void> {
        if (!this.config.slack) return;
        
        try {
            const message = this.generateSlackMessage(analysis);
            
            const response = await fetch(this.config.slack.webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    channel: this.config.slack.channel,
                    text: message,
                    attachments: this.generateSlackAttachments(analysis)
                })
            });

            if (!response.ok) {
                throw new Error(`Slack API error: ${response.status} ${response.statusText}`);
            }

            console.log('💬 Slack notification sent successfully');
            
        } catch (error) {
            console.error('❌ Failed to send Slack notification:', error);
            throw error;
        }
    }

    /**
     * Send Teams notification
     */
    private async sendTeamsNotification(analysis: TestAnalysis): Promise<void> {
        if (!this.config.teams) return;
        
        try {
            const message = this.generateTeamsMessage(analysis);
            
            const response = await fetch(this.config.teams.webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(message)
            });

            if (!response.ok) {
                throw new Error(`Teams API error: ${response.status} ${response.statusText}`);
            }

            console.log('💬 Teams notification sent successfully');
            
        } catch (error) {
            console.error('❌ Failed to send Teams notification:', error);
            throw error;
        }
    }

    /**
     * Generate email subject
     */
    private generateEmailSubject(analysis: TestAnalysis): string {
        const status = analysis.successRate === 100 ? '✅ PASSED' : '❌ FAILED';
        return `[Lili Test Results] ${status} - ${analysis.passedTests}/${analysis.totalTests} Tests Passed`;
    }

    /**
     * Generate email HTML content
     */
    private generateEmailContent(analysis: TestAnalysis): string {
        const statusIcon = analysis.successRate === 100 ? '✅' : '❌';
        const statusColor = analysis.successRate === 100 ? '#28a745' : '#dc3545';
        
        return `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { background-color: ${statusColor}; color: white; padding: 20px; text-align: center; border-radius: 8px; }
        .summary { background-color: #f8f9fa; padding: 20px; margin: 20px 0; border-radius: 8px; }
        .metric { display: inline-block; margin: 10px; text-align: center; }
        .metric-value { font-size: 2em; font-weight: bold; color: ${statusColor}; }
        .metric-label { color: #666; }
        .details { margin: 20px 0; }
        .table { width: 100%; border-collapse: collapse; }
        .table th, .table td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
        .table th { background-color: #007bff; color: white; }
        .status-passed { color: #28a745; font-weight: bold; }
        .status-failed { color: #dc3545; font-weight: bold; }
    </style>
</head>
<body>
    <div class="header">
        <h1>${statusIcon} Lili Test Automation Results</h1>
        <p>Test execution completed on ${new Date().toLocaleString()}</p>
    </div>
    
    <div class="summary">
        <h2>📊 Test Summary</h2>
        <div class="metric">
            <div class="metric-value">${analysis.totalTests}</div>
            <div class="metric-label">Total Tests</div>
        </div>
        <div class="metric">
            <div class="metric-value" style="color: #28a745;">${analysis.passedTests}</div>
            <div class="metric-label">Passed</div>
        </div>
        <div class="metric">
            <div class="metric-value" style="color: #dc3545;">${analysis.failedTests}</div>
            <div class="metric-label">Failed</div>
        </div>
        <div class="metric">
            <div class="metric-value">${analysis.successRate.toFixed(1)}%</div>
            <div class="metric-label">Success Rate</div>
        </div>
        <div class="metric">
            <div class="metric-value">${(analysis.totalDuration / 1000).toFixed(1)}s</div>
            <div class="metric-label">Total Duration</div>
        </div>
    </div>
    
    <div class="details">
        <h2>📋 Test Details</h2>
        <table class="table">
            <thead>
                <tr>
                    <th>Test File</th>
                    <th>Status</th>
                    <th>Duration</th>
                    <th>Error</th>
                </tr>
            </thead>
            <tbody>
                ${analysis.failedTestsList.map(testFile => `
                    <tr>
                        <td>${testFile}</td>
                        <td class="status-failed">FAILED</td>
                        <td>N/A</td>
                        <td>See test logs for details</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    </div>
    
    <p><em>This email was sent automatically by the Lili Test Automation System.</em></p>
</body>
</html>`;
    }

    /**
     * Generate Slack message
     */
    private generateSlackMessage(analysis: TestAnalysis): string {
        const status = analysis.successRate === 100 ? '✅ All tests passed!' : '❌ Some tests failed';
        return `*Lili Test Results* - ${status}`;
    }

    /**
     * Generate Slack attachments
     */
    private generateSlackAttachments(analysis: TestAnalysis): any[] {
        const color = analysis.successRate === 100 ? 'good' : 'danger';
        
        return [{
            color,
            fields: [
                {
                    title: 'Total Tests',
                    value: analysis.totalTests.toString(),
                    short: true
                },
                {
                    title: 'Passed',
                    value: analysis.passedTests.toString(),
                    short: true
                },
                {
                    title: 'Failed',
                    value: analysis.failedTests.toString(),
                    short: true
                },
                {
                    title: 'Success Rate',
                    value: `${analysis.successRate.toFixed(1)}%`,
                    short: true
                },
                {
                    title: 'Duration',
                    value: `${(analysis.totalDuration / 1000).toFixed(1)}s`,
                    short: true
                }
            ],
            footer: 'Lili Test Automation System',
            ts: Math.floor(Date.now() / 1000)
        }];
    }

    /**
     * Generate Teams message
     */
    private generateTeamsMessage(analysis: TestAnalysis): any {
        const status = analysis.successRate === 100 ? '✅ All tests passed!' : '❌ Some tests failed';
        const color = analysis.successRate === 100 ? '00FF00' : 'FF0000';
        
        return {
            "@type": "MessageCard",
            "@context": "http://schema.org/extensions",
            "themeColor": color,
            "summary": `Lili Test Results - ${status}`,
            "sections": [
                {
                    "activityTitle": "🚀 Lili Test Automation Results",
                    "activitySubtitle": status,
                    "activityImage": "https://via.placeholder.com/64/007bff/ffffff?text=L",
                    "facts": [
                        {
                            "name": "Total Tests",
                            "value": analysis.totalTests.toString()
                        },
                        {
                            "name": "Passed",
                            "value": analysis.passedTests.toString()
                        },
                        {
                            "name": "Failed",
                            "value": analysis.failedTests.toString()
                        },
                        {
                            "name": "Success Rate",
                            "value": `${analysis.successRate.toFixed(1)}%`
                        },
                        {
                            "name": "Duration",
                            "value": `${(analysis.totalDuration / 1000).toFixed(1)}s`
                        }
                    ]
                }
            ]
        };
    }

    /**
     * Send urgent notification for critical failures
     */
    async sendUrgentNotification(analysis: TestAnalysis, error: string): Promise<void> {
        console.log('🚨 Sending urgent notification for critical failure...');
        
        // Add urgent prefix to subject
        const urgentAnalysis = {
            ...analysis,
            urgent: true
        };
        
        await this.sendResults(urgentAnalysis);
    }

    /**
     * Test notification configuration
     */
    async testConfiguration(): Promise<boolean> {
        console.log('🧪 Testing notification configuration...');
        
        try {
            const testAnalysis: TestAnalysis = {
                totalTests: 1,
                passedTests: 1,
                failedTests: 0,
                skippedTests: 0,
                totalDuration: 1000,
                averageDuration: 1000,
                successRate: 100,
                failedTestsList: [],
                performanceMetrics: {
                    slowestTest: { testFile: 'test.ts', status: 'passed', duration: 1000, error: null, timestamp: new Date() },
                    fastestTest: { testFile: 'test.ts', status: 'passed', duration: 1000, error: null, timestamp: new Date() }
                }
            };
            
            await this.sendResults(testAnalysis);
            console.log('✅ Notification configuration test successful');
            return true;
            
        } catch (error) {
            console.error('❌ Notification configuration test failed:', error);
            return false;
        }
    }
}
