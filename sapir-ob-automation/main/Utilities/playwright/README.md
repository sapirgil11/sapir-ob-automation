# 🚀 Lili Test Automation System

A comprehensive automation framework built on top of Playwright with advanced features including CI/CD integration, multi-environment support, and intelligent reporting.

## 📁 Project Structure

```
src/main/Utilities/playwright/
├── automation/                    # Core automation components
│   ├── automation-orchestrator.ts # Main orchestrator
│   ├── result-analyzer.ts        # Test result analysis
│   └── notification-service.ts   # Email/Slack/Teams notifications
├── ci-cd/                        # CI/CD configurations
│   ├── github-actions.yml        # GitHub Actions workflow
│   └── docker-setup.yml          # Docker configuration
├── config/                       # Configuration files
│   ├── enhanced-playwright.config.ts # Enhanced Playwright config
│   └── test-environments.ts      # Environment configurations
├── scripts/                      # Test execution scripts
│   ├── test-runner.ts            # Automated test runner
│   ├── report-generator.ts       # Multi-format reporting
│   └── types.ts                  # TypeScript type definitions
├── demo/                         # Demo and examples
│   └── automation-demo.ts        # System demonstration
└── index.ts                      # Main export file
```

## 🎯 Key Features

### ✨ **Automation Capabilities**
- **Full Test Suite Execution** - Run all tests automatically
- **Smoke Testing** - Quick validation of critical functionality
- **Parallel Browser Testing** - Test across multiple browsers simultaneously
- **Performance Monitoring** - Track test execution times and resource usage
- **Intelligent Retry Logic** - Automatic retry of failed tests

### 🌍 **Multi-Environment Support**
- **Local Development** - Fast local testing
- **Integration** - Staging environment testing
- **Staging** - Pre-production validation
- **Production** - Live environment testing
- **Mobile** - Mobile device testing
- **Accessibility** - Accessibility-focused testing
- **Performance** - Performance-focused testing

### 📊 **Advanced Reporting**
- **HTML Reports** - Beautiful, interactive web reports
- **Excel Reports** - Detailed spreadsheet reports
- **JSON Reports** - Machine-readable data
- **Markdown Reports** - Documentation-friendly format
- **Performance Metrics** - Execution time analysis
- **Failure Analysis** - Detailed error investigation

### 🔔 **Smart Notifications**
- **Email Notifications** - SMTP-based email alerts
- **Slack Integration** - Real-time team notifications
- **Microsoft Teams** - Enterprise team communication
- **Urgent Alerts** - Critical failure notifications
- **Customizable Templates** - Branded notification messages

### 🔄 **CI/CD Integration**
- **GitHub Actions** - Automated testing on code changes
- **Docker Support** - Containerized test execution
- **Parallel Execution** - Sharded test execution
- **Artifact Management** - Test result storage
- **Environment Variables** - Flexible configuration

## 🚀 Quick Start

### 1. **Install Dependencies**
```bash
npm install
npm run install-browsers
```

### 2. **Run Demo**
```bash
npm run automation:demo
```

### 3. **Run Smoke Tests**
```bash
npm run automation:smoke
```

### 4. **Run Full Automation**
```bash
npm run automation:full
```

### 5. **Run Specific Test File**
```bash
npm run automation:file welcomeScreenTest
```

## 📋 Available Commands

| Command | Description |
|---------|-------------|
| `npm run automation:smoke` | Run critical smoke tests |
| `npm run automation:full` | Run complete test suite |
| `npm run automation:file` | Run specific test file |
| `npm run automation:status` | Show system status |
| `npm run automation:docker` | Run tests in Docker |
| `npm run automation:validate` | Validate configuration |
| `npm run automation:report` | Generate test reports |

## 🌍 Environment Configuration

### **Available Environments**
- **`local`** - Local development (http://localhost:3000)
- **`integration`** - Integration testing (https://lili-onboarding-integ.lili.co/)
- **`staging`** - Staging environment
- **`production`** - Production environment
- **`mobile`** - Mobile device testing
- **`accessibility`** - Accessibility testing
- **`performance`** - Performance testing

### **Change Environment**
```typescript
import { changeAutomationEnvironment } from './src/main/Utilities/playwright';

changeAutomationEnvironment('staging');
```

## 🔧 Configuration

### **Environment Variables**
```bash
export TEST_ENVIRONMENT=staging
export TEST_BROWSER=firefox
export TEST_HEADLESS=true
export TEST_TIMEOUT=60000
export TEST_RETRIES=2
```

### **Custom Configuration**
```typescript
import { AutomationOrchestrator } from './src/main/Utilities/playwright';

const orchestrator = new AutomationOrchestrator('custom-env');
await orchestrator.runFullSuite(['chromium', 'firefox']);
```

## 📊 Reporting

### **Report Formats**
- **HTML** - Interactive web reports with charts and graphs
- **Excel** - Detailed spreadsheet with multiple sheets
- **JSON** - Machine-readable data for integration
- **Markdown** - Documentation-friendly format

### **Report Location**
Reports are generated in `test-results/reports/` with timestamps.

### **Custom Reports**
```typescript
import { ReportGenerator } from './src/main/Utilities/playwright';

const generator = new ReportGenerator('custom-output-dir');
await generator.generateReport(results, 'staging', 'chromium');
```

## 🔔 Notifications

### **Email Configuration**
```typescript
const notificationConfig = {
    email: {
        smtp: 'smtp.gmail.com',
        port: 587,
        user: 'your-email@gmail.com',
        password: 'your-password',
        to: ['team@company.com']
    }
};

const notificationService = new NotificationService(notificationConfig);
```

### **Slack Configuration**
```typescript
const notificationConfig = {
    slack: {
        webhookUrl: 'https://hooks.slack.com/services/YOUR/WEBHOOK/URL',
        channel: '#test-results'
    }
};
```

## 🐳 Docker Support

### **Run in Docker**
```bash
npm run automation:docker
```

### **Stop Docker**
```bash
npm run automation:docker:down
```

### **Docker Compose**
```yaml
version: '3.8'
services:
  playwright-tests:
    image: mcr.microsoft.com/playwright:v1.40.0
    ports:
      - "9323:9323"  # Playwright UI mode
```

## 🔄 CI/CD Integration

### **GitHub Actions**
The system includes a complete GitHub Actions workflow that:
- Runs tests on multiple browsers
- Generates comprehensive reports
- Uploads test artifacts
- Sends notifications on failures

### **Automated Execution**
Tests run automatically on:
- **Push** to main/develop branches
- **Pull Requests** to main/develop branches
- **Manual triggers** via GitHub Actions

## 🧪 Testing Scenarios

### **Smoke Tests**
Quick validation of critical functionality:
```bash
npm run automation:smoke
```

### **Regression Tests**
Complete test suite execution:
```bash
npm run automation:full
```

### **Performance Tests**
Performance-focused testing:
```typescript
const orchestrator = new AutomationOrchestrator();
await orchestrator.runPerformanceTests();
```

### **Parallel Testing**
Test across multiple browsers simultaneously:
```typescript
const orchestrator = new AutomationOrchestrator();
await orchestrator.runParallelTests(['chromium', 'firefox', 'webkit']);
```

## 🛠️ Development

### **Adding New Environments**
```typescript
// In test-environments.ts
export const testEnvironments = {
    // ... existing environments
    custom: {
        name: 'Custom Environment',
        baseUrl: 'https://custom.example.com',
        timeout: 45000,
        retries: 1,
        browsers: [/* browser configs */]
    }
};
```

### **Custom Test Runner**
```typescript
import { TestRunner } from './src/main/Utilities/playwright';

const runner = new TestRunner();
const results = await runner.runTests('chromium', false);
```

### **Custom Report Generator**
```typescript
import { ReportGenerator } from './src/main/Utilities/playwright';

const generator = new ReportGenerator('custom-output');
await generator.generateReport(results, 'env', 'browser');
```

## 📈 Monitoring & Analytics

### **Performance Metrics**
- Test execution times
- Memory usage
- CPU utilization
- Browser performance

### **Failure Analysis**
- Error categorization
- Pattern recognition
- Root cause analysis
- Trend analysis

### **Success Metrics**
- Pass/fail rates
- Test coverage
- Execution efficiency
- Resource utilization

## 🔒 Security

### **Environment Variables**
- Sensitive data stored in environment variables
- No hardcoded credentials
- Secure notification configurations

### **Access Control**
- Environment-specific access
- Role-based permissions
- Audit logging

## 🚨 Troubleshooting

### **Common Issues**

#### **Browser Installation**
```bash
npm run install-browsers
```

#### **Permission Issues**
```bash
sudo npm run install-browsers
```

#### **Environment Configuration**
```bash
npm run automation:validate
```

#### **Docker Issues**
```bash
docker system prune -a
npm run automation:docker:down
npm run automation:docker
```

### **Debug Mode**
```bash
npm run test:debug
```

### **UI Mode**
```bash
npm run test:ui
```

## 📚 API Reference

### **Main Classes**

#### **AutomationOrchestrator**
Main orchestrator for all automation activities.

#### **TestRunner**
Handles test execution and browser management.

#### **ReportGenerator**
Creates comprehensive test reports.

#### **ResultAnalyzer**
Analyzes test results and provides insights.

#### **NotificationService**
Sends notifications via various channels.

### **Key Methods**

#### **runFullSuite()**
Execute complete test suite across specified browsers.

#### **runSmokeTests()**
Run critical smoke tests for quick validation.

#### **runTestFile()**
Execute specific test file.

#### **runParallelTests()**
Run tests in parallel across multiple browsers.

## 🤝 Contributing

### **Code Style**
- TypeScript with strict typing
- ESLint configuration
- Prettier formatting
- Comprehensive documentation

### **Testing**
- Unit tests for all components
- Integration tests for workflows
- End-to-end tests for automation

### **Documentation**
- Inline code documentation
- API reference documentation
- Usage examples and tutorials
- Troubleshooting guides

## 📄 License

MIT License - see LICENSE file for details.

## 🆘 Support

### **Documentation**
- This README
- Inline code comments
- API documentation
- Example implementations

### **Issues**
- GitHub Issues for bug reports
- Feature requests
- Documentation improvements

### **Community**
- Team collaboration
- Code reviews
- Knowledge sharing
- Best practices

---

**🚀 Your automation system is ready to revolutionize your testing workflow!**
