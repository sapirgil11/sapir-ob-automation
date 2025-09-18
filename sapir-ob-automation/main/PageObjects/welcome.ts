import { Page, Locator } from '@playwright/test';

/**
 * 🚨 FUTURE WORK ITEMS - ELEMENTS THAT STILL DON'T WORK:
 * 
 * 1. Password Requirements Tooltip - ❌ NOT VISIBLE
 *    - Even after hover, focus, click on password field
 *    - Need to investigate different trigger methods
 * 
 * 2. Password Error Container - ❌ NOT VISIBLE  
 *    - Even after typing weak password and blur
 *    - Need to investigate validation triggers
 * 
 * 3. Email Label - ❌ NOT VISIBLE
 *    - Text selector not working
 * 
 * 4. Password Label - ❌ NOT VISIBLE
 *    - Text selector not working
 * 
 * 5. Get Started Text - ❌ NOT VISIBLE
 *    - Text selector not working
 * 
 * 6. Log In Link (old version) - ❌ NOT VISIBLE
 *    - Text selector not working
 * 
 * STATUS: 3/8 non-working elements fixed so far! 🎯
 */

export class Welcome {
    private page: Page;
    
    // ===== CORE LILI ELEMENTS (PRODUCTION-USED) =====
    // --Form Inputs--
    public emailInput!: Locator;                     // ID: "#EMAIL" | Placeholder: "Enter your email address"
    public passwordInput!: Locator;                  // ID: "#PASSWORD" | Placeholder: "Enter your password"
    public emailClearButton!: Locator;               // ID: "#ClearInput" | Text: "×"
    
    // --Primary Action Button--
    public getStartedButton!: Locator;               // ID: "#get-started-button" | Text: "GET STARTED" (Real Lili)
    
    // --Error Messages--
    public emailError!: Locator;                     // ID: "#EMAIL-error-container" 
    public passwordError!: Locator;                  // ID: "#PASSWORD-error-container"
    public emailErrorContainer!: Locator;            // "#EMAIL-error-container"
    public passwordErrorContainer!: Locator;          // "#PASSWORD-error-container"
    
    // --Legal Links--
    public termsOfUseLink!: Locator;                 // Terms of Use link
    public privacyPolicyLink!: Locator;              // Privacy Policy link
    
    // --Account Related Text--
    public alreadyHaveAccountText!: Locator;         // ID: "#already-account-text" | Text: "Already have an account?"
    public logInButton!: Locator;                    // "text=Log In"
    public logInLink!: Locator;                      // "text=Log In" (old version)
    
    // --Content Elements--
    public liliLogo!: Locator;                       // "img[alt='Lili logo']"
    public trustPilotLogo!: Locator;                 // "img[alt='Trust Pilot']"
    public welcomeHeading!: Locator;                 // ID: "#welcome-heading" | Text: "Welcome to Lili,"
    public businessGrowthText!: Locator;             // ID: "#business-growth-text" | Text: "Powering your business growth"
    
    // --Password Strength Elements--
    public passwordStrengthIndicator!: Locator;      // ID: "#password-strength"
    public showHidePasswordButton!: Locator;         // ID: "#showHidePassword-PASSWORD" | Text: "Show/Hide"
    public passwordRequirementsTooltip!: Locator;   // ID: "#password-tooltip"
    
    // --Form Container--
    public formContainer!: Locator;                  // "form"
    
    // --Invalid Email Error--
    public invalidEmailError!: Locator;              // ID: "#EMAIL-error" 

    constructor(page: Page) {
        this.page = page;
        this.initializeAllLocators();
    }

    private initializeAllLocators(): void {
        // Initialize all locators with their selectors
        this.initializeCoreElements();
        this.initializeLiliSpecificElements();
    }

    private initializeCoreElements(): void {
        // Core form elements
        this.formContainer = this.page.locator('form, .form-container, [data-testid="form"], .welcome-form');
        this.emailInput = this.page.locator('#EMAIL, input[type="email"], input[name="email"], input[placeholder*="Email"], [data-testid="email-input"]');
        this.passwordInput = this.page.locator('#PASSWORD, input[type="password"], input[name="password"], input[placeholder*="Password"], [data-testid="password-input"]');
        
        // Error elements
        this.emailError = this.page.locator('#EMAIL-error-container, .email-error, [data-testid="email-error"], .error:has-text("email")');
        this.passwordError = this.page.locator('#PASSWORD-error-container, .password-error, [data-testid="password-error"], .error:has-text("password")');
        this.emailErrorContainer = this.page.locator('#EMAIL-error-container');
        this.passwordErrorContainer = this.page.locator('#PASSWORD-error-container');
        
        // Legal links
        this.termsOfUseLink = this.page.locator('a:has-text("Terms of Use"), a[href*="terms"], [data-testid="terms-link"]');
        this.privacyPolicyLink = this.page.locator('a:has-text("Privacy Policy"), a[href*="privacy"], [data-testid="privacy-link"]');
        
        // Account related
        this.alreadyHaveAccountText = this.page.locator('#already-account-text, .already-account, [data-testid="already-account"]');
        this.logInButton = this.page.locator('text=Log In, button:has-text("Log In"), [data-testid="log-in-button"]');
        this.logInLink = this.page.locator('text=Log In, a:has-text("Log In"), [data-testid="log-in-link"]');
    }

    private initializeLiliSpecificElements(): void {
        // Real Lili specific elements
        this.liliLogo = this.page.getByRole('img', { name: 'Lili logo' });
        this.welcomeHeading = this.page.getByRole('heading', { name: 'Welcome to Lili,' });
        this.getStartedButton = this.page.getByRole('button', { name: 'GET STARTED' });
        this.emailInput = this.page.locator('#EMAIL');
        this.passwordInput = this.page.locator('#PASSWORD');
        this.termsOfUseLink = this.page.getByRole('link', { name: 'Terms of Use' });
        this.privacyPolicyLink = this.page.getByRole('link', { name: 'Privacy Policy' });
        this.alreadyHaveAccountText = this.page.getByText('Already have an account?');
        this.trustPilotLogo = this.page.getByRole('img', { name: 'Trust Pilot' });
        this.logInButton = this.page.getByText('Log In');

        // Additional Lili elements - UPDATED WITH WORKING SELECTORS
        this.businessGrowthText = this.page.getByRole('heading', { name: 'Powering your business growth' });
        
        // Password strength indicator - UPDATED with working selectors from recording
        this.passwordStrengthIndicator = this.page.locator('.h-\\[5px\\].w-full').first();
        
        // Show/hide password button - ALREADY WORKING
        this.showHidePasswordButton = this.page.locator('#showHidePassword-PASSWORD');
        
        // Password requirements tooltip - UPDATED with working selector
        this.passwordRequirementsTooltip = this.page.getByRole('tooltip', { name: '• Minimum 8 characters • At' });
        
        // Invalid email error - UPDATED with working selector
        this.invalidEmailError = this.page.getByText('Invalid email');
        
        // Legal links
        this.termsOfUseLink = this.page.locator('a[href="https://lili.co/legal-documents/lili-terms-of-use"]');
        this.privacyPolicyLink = this.page.locator('a[href="https://lili.co/legal-documents/lili-privacy-policy"]');
        
        // Email clear button (appears after typing)
        this.emailClearButton = this.page.locator('#ClearInput');
    }

    // ===== ELEMENT STATE METHODS =====
    async waitForElementToBeVisible(locator: Locator, timeout: number = 10000): Promise<boolean> {
        try {
            await locator.waitFor({ state: 'visible', timeout });
            return true;
        } catch (error) {
            console.log(`Element not visible within ${timeout}ms: ${error instanceof Error ? error.message : String(error)}`);
            return false;
        }
    }

    async waitForElementToBeEnabled(locator: Locator, timeout: number = 10000): Promise<boolean> {
        try {
            await locator.waitFor({ state: 'attached', timeout });
            const isEnabled = await locator.isEnabled();
            if (!isEnabled) {
                // Wait a bit more for element to become enabled
                await this.page.waitForTimeout(1000);
            }
            return true;
        } catch (error) {
            console.log(`Element not enabled within ${timeout}ms: ${error instanceof Error ? error.message : String(error)}`);
            return false;
        }
    }

    // ===== CONDITIONAL ELEMENTS =====
    async getPasswordStrengthIndicator(): Promise<string | null> {
        try {
            // Get all password strength bars using the correct selector from recording
            const strengthBars = this.page.locator('.h-\\[5px\\].w-full');
            const count = await strengthBars.count();
            
            if (count === 0) return null;
            
            // Check which bars are filled (have background color)
            const filledBars = await strengthBars.evaluateAll((bars) => {
                return bars.map(bar => {
                    const style = window.getComputedStyle(bar);
                    return style.backgroundColor !== 'rgba(0, 0, 0, 0)' && style.backgroundColor !== 'transparent';
                });
            });
            
            const filledCount = filledBars.filter(filled => filled).length;
            
            if (filledCount === 1) return 'Too Weak';
            if (filledCount === 2) return 'Weak';
            if (filledCount === 3) return 'Strong';
            
            return null;
        } catch (error) {
            console.log(`Error getting password strength: ${error instanceof Error ? error.message : String(error)}`);
            return null;
        }
    }

    async getPasswordRequirementsTooltip(): Promise<string | null> {
        try {
            const tooltip = this.page.locator('[role="tooltip"]:has-text("• Minimum 8 characters • At")');
            if (await tooltip.isVisible()) {
                return await tooltip.textContent();
            }
            return null;
        } catch (error) {
            console.log(`Error getting password tooltip: ${error instanceof Error ? error.message : String(error)}`);
            return null;
        }
    }

    async getBusinessGrowthText(): Promise<string | null> {
        try {
            const element = this.page.locator('h2:has-text("Powering your business growth")');
            if (await element.isVisible()) {
                return await element.textContent();
            }
            return null;
        } catch (error) {
            console.log(`Error getting business growth text: ${error instanceof Error ? error.message : String(error)}`);
            return null;
        }
    }

    async getEmailLabel(): Promise<string | null> {
        try {
            const element = this.page.locator('text=Email');
            if (await element.isVisible()) {
                return await element.textContent();
            }
            return null;
        } catch (error) {
            console.log(`Error getting email label: ${error instanceof Error ? error.message : String(error)}`);
            return null;
        }
    }

    async getPasswordLabel(): Promise<string | null> {
        try {
            const element = this.page.locator('text=Password');
            if (await element.isVisible()) {
                return await element.textContent();
            }
            return null;
        } catch (error) {
            console.log(`Error getting password label: ${error instanceof Error ? error.message : String(error)}`);
            return null;
        }
    }

    async getGetStartedText(): Promise<string | null> {
        try {
            const element = this.page.locator('text=By clicking GET STARTED you');
            if (await element.isVisible()) {
                return await element.textContent();
            }
            return null;
        } catch (error) {
            console.log(`Error getting get started text: ${error instanceof Error ? error.message : String(error)}`);
            return null;
        }
    }

    async getLogInLink(): Promise<string | null> {
        try {
            const element = this.page.locator('text=Log In');
            if (await element.isVisible()) {
                return await element.textContent();
            }
            return null;
        } catch (error) {
            console.log(`Error getting log in link: ${error instanceof Error ? error.message : String(error)}`);
            return null;
        }
    }

    async getShowHidePasswordButton(): Promise<Locator | null> {
        try {
            const button = this.page.locator('#showHidePassword-PASSWORD');
            if (await button.isVisible()) {
                return button;
            }
            return null;
        } catch (error) {
            console.log(`Error getting show/hide password button: ${error instanceof Error ? error.message : String(error)}`);
            return null;
        }
    }

    async getInvalidEmailError(): Promise<string | null> {
        try {
            const element = this.page.locator('text=Invalid email');
            if (await element.isVisible()) {
                return await element.textContent();
            }
            return null;
        } catch (error) {
            console.log(`Error getting invalid email error: ${error instanceof Error ? error.message : String(error)}`);
            return null;
        }
    }

    async getEmailErrorContainer(): Promise<Locator | null> {
        try {
            const container = this.page.locator('#EMAIL-error-container');
            if (await container.isVisible()) {
                return container;
            }
            return null;
        } catch (error) {
            console.log(`Error getting email error container: ${error instanceof Error ? error.message : String(error)}`);
            return null;
        }
    }

    async getPasswordErrorContainer(): Promise<Locator | null> {
        try {
            const container = this.page.locator('#PASSWORD-error-container');
            if (await container.isVisible()) {
                return container;
            }
            return null;
        } catch (error) {
            console.log(`Error getting password error container: ${error instanceof Error ? error.message : String(error)}`);
            return null;
        }
    }

    // ===== STANDARD PAGE OBJECT METHODS =====

    async verifyPageElements(): Promise<boolean> {
        console.log('🔍 Verifying Welcome page elements...');
        
        const elements = [
            { name: 'Email Input', locator: this.emailInput, required: true },
            { name: 'Password Input', locator: this.passwordInput, required: true },
            { name: 'Get Started Button', locator: this.getStartedButton, required: true }
        ];

        let allVisible = true;
        for (const element of elements) {
            const isVisible = await element.locator.isVisible();
            console.log(`📋 ${element.name}: ${isVisible ? '✅ Visible' : '❌ Not visible'}`);
            
            if (element.required && !isVisible) {
                allVisible = false;
            }
        }

        console.log(`🎯 Welcome page elements verification: ${allVisible ? '✅ PASSED' : '❌ FAILED'}`);
        return allVisible;
    }

    async isFormComplete(): Promise<boolean> {
        console.log('🔍 Checking if Welcome form is complete...');
        
        try {
            const emailValue = await this.emailInput.inputValue();
            const passwordValue = await this.passwordInput.inputValue();
            
            const isEmailFilled = Boolean(emailValue && emailValue.trim() !== '');
            const isPasswordFilled = Boolean(passwordValue && passwordValue.trim() !== '');
            
            const isComplete = isEmailFilled && isPasswordFilled;
            
            console.log(`📧 Email filled: ${isEmailFilled ? '✅' : '❌'} (${emailValue ? 'has value' : 'empty'})`);
            console.log(`🔒 Password filled: ${isPasswordFilled ? '✅' : '❌'} (${passwordValue ? 'has value' : 'empty'})`);
            console.log(`🎯 Form complete: ${isComplete ? '✅ YES' : '❌ NO'}`);
            
            return isComplete;
        } catch (error) {
            console.log(`⚠️ Error checking form completion: ${error instanceof Error ? error.message : String(error)}`);
            return false;
        }
    }

    async verifyNavigationToNextPage(): Promise<boolean> {
        console.log('🔍 Verifying navigation to next page...');
        
        try {
            // Wait a bit for navigation to complete
            await this.page.waitForTimeout(2000);
            
            const currentUrl = this.page.url();
            console.log(`📍 Current URL: ${currentUrl}`);
            
            // Check if we're no longer on the welcome page
            const isNotWelcomePage = !currentUrl.includes('/welcome');
            
            if (isNotWelcomePage) {
                console.log('✅ Navigation successful - no longer on welcome page');
                return true;
            } else {
                console.log('⚠️ Still on welcome page - navigation may have failed');
                return false;
            }
        } catch (error) {
            console.log(`⚠️ Error verifying navigation: ${error instanceof Error ? error.message : String(error)}`);
            return false;
        }
    }
}