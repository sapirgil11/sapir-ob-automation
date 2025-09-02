#!/usr/bin/env ts-node

import { 
    AutomationOrchestrator, 
    runAutomation, 
    runSmokeTests, 
    runTestFile,
    getAutomationStatus,
    changeAutomationEnvironment,
    utils,
    constants 
} from '../index';

/**
 * Demo script showing automation capabilities
 */
async function main() {
    console.log('🚀 Lili Test Automation Demo');
    console.log('=============================\n');
    
    try {
        // Show current status
        console.log('📊 Current Automation Status:');
        const status = getAutomationStatus();
        console.log(JSON.stringify(status, null, 2));
        console.log('');
        
        // Show available environments
        console.log('🌍 Available Environments:');
        console.log(Object.keys(constants.ENVIRONMENTS).map(env => `  - ${env}`).join('\n'));
        console.log('');
        
        // Show utility functions
        console.log('🛠️ Utility Functions Demo:');
        console.log(`  - Test ID: ${utils.generateTestId()}`);
        console.log(`  - Email valid: test@example.com -> ${utils.isValidEmail('test@example.com')}`);
        console.log(`  - Duration: 1500ms -> ${utils.formatDuration(1500)}`);
        console.log(`  - File size: 2048 bytes -> ${utils.formatFileSize(2048)}`);
        console.log('');
        
        // Show constants
        console.log('⚙️ Automation Constants:');
        console.log(`  - Timeouts: ${Object.keys(constants.TIMEOUTS).join(', ')}`);
        console.log(`  - Viewports: ${Object.keys(constants.VIEWPORTS).join(', ')}`);
        console.log(`  - Browsers: ${Object.keys(constants.BROWSERS).join(', ')}`);
        console.log('');
        
        // Initialize orchestrator
        console.log('🎯 Initializing Automation Orchestrator...');
        const orchestrator = new AutomationOrchestrator('integration');
        
        // Show environment info
        const envInfo = orchestrator.getCurrentEnvironmentInfo();
        console.log('🌍 Environment Info:');
        console.log(JSON.stringify(envInfo, null, 2));
        console.log('');
        
        // Validate environment
        console.log('✅ Validating Environment Configuration...');
        const validation = orchestrator.validateEnvironment();
        if (validation.length === 0) {
            console.log('✅ Environment configuration is valid');
        } else {
            console.log('❌ Environment validation errors:');
            validation.forEach(error => console.log(`  - ${error}`));
        }
        console.log('');
        
        // Show what automation can do
        console.log('🎭 Automation Capabilities:');
        console.log('  ✅ Run full test suite');
        console.log('  ✅ Run smoke tests');
        console.log('  ✅ Run specific test files');
        console.log('  ✅ Parallel browser testing');
        console.log('  ✅ Performance monitoring');
        console.log('  ✅ Comprehensive reporting');
        console.log('  ✅ Email/Slack/Teams notifications');
        console.log('  ✅ CI/CD integration');
        console.log('  ✅ Docker containerization');
        console.log('  ✅ Multiple environment support');
        console.log('');
        
        // Show usage examples
        console.log('📖 Usage Examples:');
        console.log('  npm run automation:smoke     # Run smoke tests');
        console.log('  npm run automation:full      # Run full automation suite');
        console.log('  npm run automation:file      # Run specific test file');
        console.log('  npm run automation:status    # Show automation status');
        console.log('  npm run automation:docker    # Run in Docker');
        console.log('  npm run automation:validate  # Validate configuration');
        console.log('');
        
        // Show CI/CD integration
        console.log('🔄 CI/CD Integration:');
        console.log('  ✅ GitHub Actions workflow');
        console.log('  ✅ Docker containerization');
        console.log('  ✅ Automated test execution');
        console.log('  ✅ Test result reporting');
        console.log('  ✅ Failure notifications');
        console.log('');
        
        console.log('🎉 Demo completed successfully!');
        console.log('🚀 Your automation system is ready to use!');
        
    } catch (error) {
        console.error('❌ Demo failed:', error);
        process.exit(1);
    }
}

/**
 * Run demo if this file is executed directly
 */
if (require.main === module) {
    main().catch(console.error);
}

export { main as runDemo };
