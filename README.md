# Playwright Automation Project

This is a Playwright-based automation project that mirrors the structure of a Java Selenium project, converted to use modern TypeScript and Playwright for web automation.

## Project Structure

```
sapir-ob-automation/
├── main/
│   ├── PageObjects/          # Page Object Model classes
│   │   └── DirectOnBoarding/ # Direct onboarding page objects
│   ├── Utilities/            # Utility classes and helpers
│   │   └── playwright/       # Advanced automation system
│   └── Extensions/           # Extended functionality (verifications, etc.)
├── test/
│   ├── SanityTests/          # Main test suites
│   ├── Helpers/              # Test helper classes
│   └── Resources/            # Test resources and data
├── imageRepository/          # Image assets for visual testing
├── test-results/             # Test execution results
└── screenshots/              # Screenshots from test runs
```

## Features

- **Page Object Model**: Clean separation of page elements and test logic
- **Workflow Classes**: Business logic encapsulation for complex test scenarios
- **Utility Classes**: Reusable helper methods and common operations
- **Verification Methods**: Built-in verification and assertion methods
- **TypeScript Support**: Full TypeScript support with type safety
- **Single Browser Execution**: Runs tests on a single browser as requested
- **1920x1080 Resolution**: Fixed viewport size for consistent testing
- **Allure Reporting**: Integrated test reporting with Allure
- **Screenshot Capture**: Automatic screenshot capture on test failures

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd playwright-automation-project
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npm run install-browsers
```

## Configuration

The project is configured with the following settings in `playwright.config.ts`:

- **Single Browser**: Tests run on Chromium only
- **Resolution**: Fixed 1920x1080 viewport
- **Parallel Execution**: Disabled (single worker)
- **Reporting**: HTML and Allure reporters
- **Screenshots**: Captured on test failures
- **Videos**: Retained on test failures

## Running Tests

### Basic Test Execution
```bash
npm test
```

### Headed Mode (with browser UI)
```bash
npm run test:headed
```

### Debug Mode
```bash
npm run test:debug
```

### UI Mode (Playwright Test UI)
```bash
npm run test:ui
```

### View Test Report
```bash
npm run report
```

## Test Structure

### Page Objects
Page objects encapsulate the elements and actions for specific pages:

```typescript
export class PreLoginScreen extends Base {
    public readonly imgLogo: Locator;
    public readonly elem_heading_01: Locator;
    
    async clickCreateAccount(): Promise<void> {
        await this.btnCreateAccount.click();
        await this.waitForPageLoad();
    }
}
```

### Workflows
Workflow classes contain business logic and orchestrate test steps:

```typescript
export class RegistrationPageFlow extends Base {
    async createAccount(email: string): Promise<void> {
        await this.preLoginScreen.clickCreateAccount();
        // Additional logic...
    }
}
```

### Verifications
Built-in verification methods for common assertions:

```typescript
await verifications.headlineCheck(headingLocator, Constants.HEADING_01);
await verifications.visualElements(logoLocator, 'PreLoginLogo');
```

## Constants and Configuration

Test data and configuration values are stored in `src/main/Utilities/constants.ts`:

```typescript
export class Constants {
    public static readonly EMAIL = 'test@example.com';
    public static readonly FIRST_NAME = 'John';
    public static readonly VIEWPORT_WIDTH = 1920;
    public static readonly VIEWPORT_HEIGHT = 1080;
}
```

## Adding New Tests

1. **Create Page Objects**: Add new page object classes in `src/main/PageObjects/`
2. **Create Workflows**: Add business logic in `src/main/WorkFlows/`
3. **Create Tests**: Add test files in `src/test/SanityTests/`
4. **Update Constants**: Add new test data in `src/main/Utilities/constants.ts`

## Example Test

```typescript
test('Test_02: Opening new account', async ({ page }) => {
    // Verify logo is visible
    const logoLocator = page.locator('img[alt="Logo"]');
    await verifications.visualElements(logoLocator, 'PreLoginLogo');

    // Verify heading
    const headingLocator = page.locator('h1:has-text("Welcome")');
    await verifications.headlineCheck(headingLocator, Constants.HEADING_01);

    // Create account
    await registrationPageFlow.createAccount(Constants.EMAIL);
});
```

## Best Practices

- **Page Object Model**: Keep page objects focused on element locators and basic actions
- **Workflow Classes**: Use workflows for complex business logic and test orchestration
- **Constants**: Store all test data and configuration in the constants file
- **Verifications**: Use built-in verification methods for consistent assertions
- **Error Handling**: Implement proper error handling and logging
- **Screenshots**: Take screenshots on failures for debugging

## Troubleshooting

### Common Issues

1. **Browser Installation**: If browsers aren't installed, run `npm run install-browsers`
2. **TypeScript Errors**: Ensure all imports are correct and types match
3. **Element Locators**: Verify element selectors are correct for your application
4. **Timeout Issues**: Adjust timeout values in constants if needed

### Debug Mode

Use debug mode to step through tests:
```bash
npm run test:debug
```

## Contributing

1. Follow the existing project structure
2. Use TypeScript for all new code
3. Implement proper error handling
4. Add appropriate logging and verifications
5. Update documentation as needed

## License

MIT License - see LICENSE file for details
