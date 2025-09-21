import { Page } from '@playwright/test';

/**
 * 🌐 NETWORK DEBUGGER EXTENSION
 * 
 * This utility provides centralized network debugging for all tests by:
 * 1. Capturing all network requests and responses
 * 2. Logging network failures and errors
 * 3. Providing detailed network analysis
 * 4. Can be easily enabled/disabled for any test
 */
export class NetworkDebugger {
    private page: Page;
    private isEnabled: boolean = false;
    private requestCount: number = 0;
    private responseCount: number = 0;
    private failureCount: number = 0;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * 🔧 Enable network debugging for the page
     */
    enable(): void {
        if (this.isEnabled) {
            console.log('🌐 Network debugging already enabled');
            return;
        }

        console.log('🌐 Enabling network debugging...');
        this.isEnabled = true;
        this.requestCount = 0;
        this.responseCount = 0;
        this.failureCount = 0;

        // Listen for network requests
        this.page.on('request', request => {
            this.requestCount++;
            console.log(`📤 REQUEST #${this.requestCount}: ${request.method()} ${request.url()}`);
            
            // Log request headers for debugging
            if (request.headers()) {
                const headers = request.headers();
                if (headers['content-type']) {
                    console.log(`   📋 Content-Type: ${headers['content-type']}`);
                }
                if (headers['authorization']) {
                    console.log(`   🔐 Authorization: ${headers['authorization'].substring(0, 20)}...`);
                }
            }
        });

        // Listen for network responses
        this.page.on('response', response => {
            this.responseCount++;
            const status = response.status();
            const statusIcon = status >= 200 && status < 300 ? '✅' : status >= 400 ? '❌' : '⚠️';
            console.log(`${statusIcon} RESPONSE #${this.responseCount}: ${response.status()} ${response.url()}`);
            
            if (status >= 400) {
                console.log(`   🔍 Error details: ${response.statusText()}`);
                
                // Try to get response body for error analysis
                response.text().then(body => {
                    if (body && body.length > 0) {
                        console.log(`   📄 Response body: ${body.substring(0, 200)}${body.length > 200 ? '...' : ''}`);
                    }
                }).catch(() => {
                    // Ignore errors when reading response body
                });
            }
        });

        // Listen for network failures
        this.page.on('requestfailed', request => {
            this.failureCount++;
            console.log(`💥 REQUEST FAILED #${this.failureCount}: ${request.url()}`);
            console.log(`   🚨 Error: ${request.failure()?.errorText}`);
        });

        // Listen for console errors
        this.page.on('console', msg => {
            if (msg.type() === 'error') {
                console.log(`🚨 CONSOLE ERROR: ${msg.text()}`);
            }
        });

        console.log('✅ Network debugging enabled successfully');
    }

    /**
     * 🔧 Disable network debugging for the page
     */
    disable(): void {
        if (!this.isEnabled) {
            console.log('🌐 Network debugging already disabled');
            return;
        }

        console.log('🌐 Disabling network debugging...');
        this.isEnabled = false;
        
        // Remove all listeners
        this.page.removeAllListeners('request');
        this.page.removeAllListeners('response');
        this.page.removeAllListeners('requestfailed');
        this.page.removeAllListeners('console');
        
        console.log('✅ Network debugging disabled');
    }

    /**
     * 📊 Get network statistics
     */
    getStats(): { requests: number; responses: number; failures: number } {
        return {
            requests: this.requestCount,
            responses: this.responseCount,
            failures: this.failureCount
        };
    }

    /**
     * 📋 Print network summary
     */
    printSummary(): void {
        const stats = this.getStats();
        console.log('\n📊 NETWORK SUMMARY:');
        console.log(`   📤 Total Requests: ${stats.requests}`);
        console.log(`   📥 Total Responses: ${stats.responses}`);
        console.log(`   💥 Total Failures: ${stats.failures}`);
        
        if (stats.failures > 0) {
            console.log(`   ⚠️  ${stats.failures} network failures detected!`);
        } else {
            console.log(`   ✅ No network failures detected`);
        }
    }

    /**
     * 🔍 Analyze page for network issues
     */
    async analyzePageForIssues(): Promise<{
        readyState: string;
        location: string;
        hasErrors: boolean;
        errorElements: number;
        networkErrors: string[];
    }> {
        console.log('🔍 Analyzing page for network issues...');
        
        const analysis = await this.page.evaluate(() => {
            const errorElements = document.querySelectorAll('[class*="error"], [class*="Error"], [class*="fail"], [class*="Fail"]');
            const networkErrors: string[] = [];
            
            // Check for common error indicators
            if (document.title.includes('Error') || document.title.includes('404') || document.title.includes('500')) {
                networkErrors.push('Page title indicates error');
            }
            
            if (document.body.textContent?.includes('Network Error') || document.body.textContent?.includes('Connection Error')) {
                networkErrors.push('Network error text found in page');
            }
            
            if (document.body.textContent?.includes('Timeout') || document.body.textContent?.includes('timeout')) {
                networkErrors.push('Timeout error text found in page');
            }
            
            return {
                readyState: document.readyState,
                location: window.location.href,
                hasErrors: errorElements.length > 0,
                errorElements: errorElements.length,
                networkErrors
            };
        });
        
        console.log(`📊 Page Analysis: ${JSON.stringify(analysis, null, 2)}`);
        
        if (analysis.networkErrors.length > 0) {
            console.log('🚨 Network issues detected:');
            analysis.networkErrors.forEach(error => {
                console.log(`   - ${error}`);
            });
        }
        
        return analysis;
    }

    /**
     * 🚀 Quick setup for tests - enable debugging and return stats function
     */
    static setupForTest(page: Page): { 
        networkDebugger: NetworkDebugger; 
        getStats: () => { requests: number; responses: number; failures: number };
        printSummary: () => void;
        analyzePage: () => Promise<any>;
    } {
        const networkDebugger = new NetworkDebugger(page);
        networkDebugger.enable();
        
        return {
            networkDebugger,
            getStats: () => networkDebugger.getStats(),
            printSummary: () => networkDebugger.printSummary(),
            analyzePage: () => networkDebugger.analyzePageForIssues()
        };
    }
}
