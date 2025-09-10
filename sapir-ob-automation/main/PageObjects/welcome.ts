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
    
    // ===== BUTTON IDs AND SELECTORS =====
    // --Primary Action Buttons--
    public primaryGetStartedButton!: Locator;        // ID: "#get-started-btn" | Text: "GET STARTED"
    public primarySignInButton!: Locator;            // ID: "#sign-in-btn" | Text: "Sign In"
    public primaryCreateAccountButton!: Locator;     // ID: "#create-account-btn" | Text: "Create Account"
    public primaryLearnMoreButton!: Locator;         // ID: "#learn-more-btn" | Text: "Learn More"
    public primaryDemoButton!: Locator;              // ID: "#demo-btn" | Text: "Demo"
    public primaryContactSalesButton!: Locator;      // ID: "#contact-sales-btn" | Text: "Contact Sales"
    public getStartedButton!: Locator;               // ID: "#get-started-button" | Text: "GET STARTED" (Real Lili)

    // --Secondary Action Buttons--
    public secondarySkipButton!: Locator;            // ID: "#skip-btn" | Text: "Skip"
    public secondaryBackButton!: Locator;            // ID: "#back-btn" | Text: "Back"
    public secondaryHelpButton!: Locator;            // ID: "#help-btn" | Text: "Help"
    public secondarySupportButton!: Locator;         // ID: "#support-btn" | Text: "Support"
    public secondaryFAQButton!: Locator;             // ID: "#faq-btn" | Text: "FAQ"

    // ===== INPUT FIELD IDs AND PLACEHOLDERS =====
    // --Form Inputs--
    public emailInput!: Locator;                     // ID: "#EMAIL" | Placeholder: "Enter your email address"
    public passwordInput!: Locator;                  // ID: "#PASSWORD" | Placeholder: "Enter your password"
    public emailClearButton!: Locator;               // ID: "#email-clear-btn" | Text: "×"
    public confirmPasswordInput!: Locator;           // ID: "#confirm-password" | Placeholder: "Confirm your password"
    public firstNameInput!: Locator;                 // ID: "#first-name" | Placeholder: "Enter your first name"
    public lastNameInput!: Locator;                  // ID: "#last-name" | Placeholder: "Enter your last name"
    public phoneInput!: Locator;                     // ID: "#phone" | Placeholder: "Enter your phone number"
    public companyInput!: Locator;                   // ID: "#company" | Placeholder: "Enter your company name"
    public industrySelect!: Locator;                 // ID: "#industry" | Placeholder: "Select your industry"

    // ===== PAGE TEXTS AND CONTENT =====
    // --Main Headings--
    public welcomeHeading!: Locator;                 // ID: "#welcome-heading" | Text: "Welcome to Lili,"
    public welcomeSubheading!: Locator;              // ID: "#welcome-subheading" | Text: "Powering your business growth"
    public heroTitle!: Locator;                      // ID: "#hero-title" | Text: "Get Started Today"

    // --Form Labels and Text--
    public emailLabel!: Locator;                     // ID: "#email-label" | Text: "Email"
    public passwordLabel!: Locator;                  // ID: "#password-label" | Text: "Password"
    public businessGrowthText!: Locator;             // ID: "#business-growth-text" | Text: "Powering your business growth"

    // --Button Text--
    public getStartedButtonText!: Locator;           // ID: "#get-started-button" | Text: "GET STARTED"
    public signInButtonText!: Locator;               // ID: "#sign-in-button" | Text: "Sign In"
    public createAccountButtonText!: Locator;        // ID: "#create-account-button" | Text: "Create Account"

    // --Legal and Terms Text--
    public termsOfUseText!: Locator;                 // ID: "#terms-text" | Text: "By clicking GET STARTED you agree to our"
    public termsOfUseLink!: Locator;                 // ID: "#terms-link" | Text: "Terms of Use"
    public privacyPolicyLink!: Locator;              // ID: "#privacy-link" | Text: "Privacy Policy"
    public andText!: Locator;                        // ID: "#and-text" | Text: "and"

    // --Account Related Text--
    public alreadyHaveAccountText!: Locator;         // ID: "#already-account-text" | Text: "Already have an account?"
    public logInLink!: Locator;                      // ID: "#log-in-link" | Text: "Log in"

    // --Help and Support Text--
    public needHelpText!: Locator;                   // ID: "#need-help-text" | Text: "Need help?"
    public contactSupportLink!: Locator;             // ID: "#contact-support-link" | Text: "Contact Support"
    public faqLink!: Locator;                        // ID: "#faq-link" | Text: "FAQ"

    // --Success Messages--
    public successMessage!: Locator;                 // ID: "#success-message" | Text: "Account created successfully!"
    public welcomeMessage!: Locator;                 // ID: "#welcome-message" | Text: "Welcome to Lili! Let's get started."

    // --Loading and Status Text--
    public loadingText!: Locator;                    // ID: "#loading-text" | Text: "Creating your account..."
    public processingText!: Locator;                 // ID: "#processing-text" | Text: "Please wait while we process your request"

    // --Footer Text--
    public footerText!: Locator;                     // ID: "#footer-text" | Text: "© 2024 Lili. All rights reserved."
    public footerLinks!: Locator;                    // ID: "#footer-links" | Text: "About | Careers | Press | Contact"

    // --Input Containers--
    public formContainer!: Locator;                  // "form"
    public emailErrorContainer!: Locator;            // "#EMAIL-error-container"
    public passwordErrorContainer!: Locator;          // "#PASSWORD-error-container"
    
    // --Legal Links--
    public termsOfUseLink!: Locator;                 // Terms of Use link
    public privacyPolicyLink!: Locator;              // Privacy Policy link

    // ===== TOOLTIPS AND HELP TEXT =====
    // --Password Requirements Tooltip--
    public passwordRequirementsTooltip!: Locator;     // ID: "#password-tooltip"
    // TRIGGER: Focus on password field
    // TOOLTIP TEXT: "• Minimum 8 characters • At least 1 number • At least 1 symbol"

    public passwordStrengthIndicator!: Locator;      // ID: "#password-strength"
    // SHOWS: "Too Weak" | "Weak" | "Good" | "Strong"
    // TRIGGER: Type password and watch indicator change

    public showHidePasswordButton!: Locator;         // ID: "#showHidePassword-PASSWORD" | Text: "Show/Hide"

    // ===== VALIDATION RULES =====
    // --Email Validation--
    // MIN LENGTH: 5 characters
    // MAX LENGTH: 254 characters  
    // PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    // REQUIRED: Yes

    // --Password Validation--
    // MIN LENGTH: 8 characters
    // MAX LENGTH: 128 characters
    // PATTERN: Must contain at least 1 number, 1 letter, 1 symbol
    // REQUIRED: Yes

    // ===== TEST DATA EXAMPLES =====
    // --Valid Test Data--
    // EMAIL: "test@example.com" | "user@lili.co" | "demo@test.com"
    // PASSWORD: "Password123!" | "TestPass456@" | "DemoPass789#"

    // --Invalid Test Data--
    // EMAIL: "invalid" | "test@" | "@test.com" | "test@.com"
    // PASSWORD: "123" | "password" | "PASSWORD" | "12345678"

    // ===== PAGE STATE INDICATORS =====
    // --Loading States--
    public loadingSpinner!: Locator;                 // ID: "#loading-spinner" | Shows during form submission
    public loadingOverlay!: Locator;                 // ID: "#loading-overlay" | Full page loading state

    // --Success States--
    public successMessage!: Locator;                 // ID: "#success-message" | Shows after successful submission
    public successCheckmark!: Locator;               // ID: "#success-checkmark" | Green checkmark icon

    // --Form States--
    public formDisabled!: Locator;                   // ID: "#form:disabled" | Form becomes disabled during submission
    public buttonDisabled!: Locator;                 // ID: "#get-started-button:disabled" | Button disabled state

    // ===== ACCESSIBILITY ELEMENTS =====
    // --ARIA Labels--
    public emailAriaLabel!: Locator;                 // ID: "#EMAIL" | aria-label: "Email address"
    public passwordAriaLabel!: Locator;              // ID: "#PASSWORD" | aria-label: "Password"
    public buttonAriaLabel!: Locator;                // ID: "#get-started-button" | aria-label: "Get started with Lili"

    // --Screen Reader Text--
    public screenReaderText!: Locator;               // ID: ".sr-only" | Hidden text for screen readers
    public errorAnnouncement!: Locator;              // ID: "#error-announcement" | Announces errors to screen readers

    // --Help Text & Descriptions--
    public heroContainer!: Locator;                  // ID: ".hero"
    public heroTitle!: Locator;                      // ID: "h1:has-text('Welcome')"
    public heroSubtitle!: Locator;                   // ID: "h2:has-text('Welcome')"
    public heroDescription!: Locator;                // ID: ".hero-description"
    public heroImage!: Locator;                      // ID: "img[alt*='Hero']"
    public heroBackground!: Locator;                  // ID: ".hero-background"
    public heroVideo!: Locator;                      // ID: "video"

    // ===== ERROR MESSAGES AND HOW TO TRIGGER THEM =====
    // --Email Validation Errors--
    public emailError!: Locator;                     // ID: "#EMAIL-error-container" 
    // TRIGGER: Type invalid email like "test" and blur field
    // ERROR TEXT: "Please enter a valid email address"

    public invalidEmailError!: Locator;              // ID: "#EMAIL-error" 
    // TRIGGER: Type "invalid@email" and blur field  
    // ERROR TEXT: "Invalid email format"

    public emailRequiredError!: Locator;             // ID: "#EMAIL-required-error"
    // TRIGGER: Leave email field empty and click "GET STARTED"
    // ERROR TEXT: "Email is required"

    // --Password Validation Errors--
    public passwordError!: Locator;                  // ID: "#PASSWORD-error-container"
    // TRIGGER: Type weak password like "123" and blur field
    // ERROR TEXT: "Password must be at least 8 characters"

    public passwordTooWeakError!: Locator;           // ID: "#PASSWORD-weak-error" 
    // TRIGGER: Type "password" (no numbers/symbols)
    // ERROR TEXT: "Password is too weak. Include numbers and symbols"

    public passwordRequiredError!: Locator;          // ID: "#PASSWORD-required-error"
    // TRIGGER: Leave password field empty and click "GET STARTED"  
    // ERROR TEXT: "Password is required"

    public confirmPasswordError!: Locator;           // ID: "#confirm-password-error"
    // TRIGGER: Type different passwords in password and confirm fields
    // ERROR TEXT: "Passwords do not match"

    // --Form Submission Errors--
    public formSubmissionError!: Locator;            // ID: "#form-error"
    // TRIGGER: Submit form with invalid data
    // ERROR TEXT: "Please fix the errors above"

    public networkError!: Locator;                   // ID: "#network-error"
    // TRIGGER: Submit form when server is down
    // ERROR TEXT: "Network error. Please try again"

    // --Form Field Errors--
    public firstNameError!: Locator;                 // ".first-name-error" (trigger: submit empty form)
    public lastNameError!: Locator;                  // ".last-name-error" (trigger: submit empty form)
    public phoneError!: Locator;                     // ".phone-error" (trigger: invalid phone format)
    public companyError!: Locator;                   // ".company-error" (trigger: submit empty form)

    // --General Form Errors--
    public termsError!: Locator;                     // ".terms-error" (trigger: submit without accepting terms)
    public generalError!: Locator;                   // ".error-message" (trigger: submit empty form)
    public successMessage!: Locator;                 // ".success-message" (trigger: successful form submission)
    public warningMessage!: Locator;                 // ".warning-message" (trigger: validation warnings)
    public infoMessage!: Locator;                    // ".info-message" (trigger: informational states)

    // ===== NAVIGATION AND HEADER ELEMENTS =====
    // --Logo & Brand--
    public liliLogo!: Locator;                       // "img[alt='Lili logo']"
    public headerContainer!: Locator;                // "header"
    public headerLogo!: Locator;                     // "img[alt*='Logo']"
    public headerBrandName!: Locator;                // ".brand-name"

    // --Navigation Controls--
    public headerNavigation!: Locator;               // "nav"
    public headerMenuButton!: Locator;               // "button[aria-label*='menu']"
    public headerLanguageSelector!: Locator;         // "select[name='language']"
    public headerAccessibilityToggle!: Locator;      // "button[aria-label*='accessibility']"
    public headerDarkModeToggle!: Locator;           // "button[aria-label*='dark mode']"
    public headerHelpButton!: Locator;               // "button:has-text('Help')"
    public headerContactButton!: Locator;            // "button:has-text('Contact')"

    // ===== CONTENT AND DISPLAY ELEMENTS =====
    // --Welcome Content--
    public trustPilotLogo!: Locator;                 // "img[alt='Trust Pilot']"
    public logInButton!: Locator;                    // "text=Log In"
    public logInLink!: Locator;                      // "text=Log In" (old version)

    // --Features & Benefits--
    public featuresContainer!: Locator;              // ".features"
    public featuresTitle!: Locator;                  // "h2:has-text('Features')"
    public featuresSubtitle!: Locator;               // ".features-subtitle"
    public featuresList!: Locator;                   // ".features-list"
    public featureItem1!: Locator;                   // ".feature-item:first-child"
    public featureItem2!: Locator;                   // ".feature-item:nth-child(2)"
    public featureItem3!: Locator;                   // ".feature-item:nth-child(3)"
    public featureItem4!: Locator;                   // ".feature-item:nth-child(4)"
    public featureIcons!: Locator;                   // ".feature-icon"
    public featureDescriptions!: Locator;            // ".feature-description"

    public benefitsContainer!: Locator;              // ".benefits"
    public benefitsTitle!: Locator;                  // "h2:has-text('Benefits')"
    public benefitsSubtitle!: Locator;               // ".benefits-subtitle"
    public benefitsList!: Locator;                   // ".benefits-list"
    public benefitItem1!: Locator;                   // ".benefit-item:first-child"
    public benefitItem2!: Locator;                   // ".benefit-item:nth-child(2)"
    public benefitItem3!: Locator;                   // ".benefit-item:nth-child(3)"
    public benefitItem4!: Locator;                   // ".benefit-item:nth-child(4)"

    // --Content Sections--
    public howItWorksSection!: Locator;              // ".how-it-works"
    public testimonialsSection!: Locator;            // ".testimonials"
    public pricingSection!: Locator;                 // ".pricing"
    public securitySection!: Locator;                // ".security"
    public complianceSection!: Locator;              // ".compliance"
    public integrationSection!: Locator;             // ".integration"
    public bankingSection!: Locator;                 // "h2:has-text('Open your business checking')"
    public accountingSection!: Locator;              // "h2:has-text('Accounting & Tax Preparation')"
    public creditBuildingSection!: Locator;          // "h2:has-text('Credit Building')"

    // ===== FOOTER SECTION (Bottom of Page) =====
    public footerContainer!: Locator;                // "footer"
    public footerLogo!: Locator;                     // "footer img[alt*='Logo']"
    public footerCompanyInfo!: Locator;              // ".footer-company-info"
    public footerLinks!: Locator;                    // ".footer-links"
    public footerPrivacyLink!: Locator;              // "a:has-text('Privacy Policy')"
    public footerTermsLink!: Locator;                // "a:has-text('Terms of Use')"
    public footerSupportLink!: Locator;              // "a:has-text('Support')"
    public footerContactLink!: Locator;              // "a:has-text('Contact Us')"
    public footerHelpLink!: Locator;                 // "a:has-text('Help')"
    public footerFAQLink!: Locator;                  // "a:has-text('FAQ')"
    public footerSocialLinks!: Locator;              // ".social-links"
    public footerCopyright!: Locator;                // ".copyright"

    // ===== PROGRESS & STEP INDICATORS =====
    public progressContainer!: Locator;              // ".progress-container"
    public progressBar!: Locator;                    // ".progress-bar"
    public progressPercentage!: Locator;             // ".progress-percentage"
    public stepIndicator!: Locator;                  // ".step-indicator"
    public currentStep!: Locator;                    // ".current-step"
    public totalSteps!: Locator;                     // ".total-steps"
    public step1!: Locator;                          // ".step-1"
    public step2!: Locator;                          // ".step-2"
    public step3!: Locator;                          // ".step-3"
    public step4!: Locator;                          // ".step-4"

    // ===== LOADING & STATE INDICATORS =====
    public loadingSpinner!: Locator;                 // ".loading-spinner"
    public loadingText!: Locator;                    // ".loading-text"
    public skeletonLoader!: Locator;                 // ".skeleton"
    public contentPlaceholder!: Locator;             // ".placeholder"

    // ===== MODAL & OVERLAY ELEMENTS =====
    public modalContainer!: Locator;                 // ".modal"
    public modalTitle!: Locator;                     // ".modal-title"
    public modalContent!: Locator;                   // ".modal-content"
    public modalCloseButton!: Locator;               // ".modal-close"
    public modalConfirmButton!: Locator;             // ".modal-confirm"
    public modalCancelButton!: Locator;              // ".modal-cancel"
    public overlayBackground!: Locator;              // ".modal-overlay"

    // ===== FORM SUBMISSION ELEMENTS =====
    public formSubmitButton!: Locator;               // "button[type='submit']"
    public formResetButton!: Locator;                // "button[type='reset']"
    public agreeTermsCheckbox!: Locator;             // "input[type='checkbox']"
    public marketingCheckbox!: Locator;              // "input[name='marketing']"

    constructor(page: Page) {
        this.page = page;
        this.initializeAllLocators();
    }

    private initializeAllLocators(): void {
        // Initialize all locators with their selectors
        this.initializeHeaderElements();
        this.initializeHeroElements();
        this.initializeButtonElements();
        this.initializeFormElements();
        this.initializeErrorElements();
        this.initializeFeatureElements();
        this.initializeFooterElements();
        this.initializeProgressElements();
        this.initializeLoadingElements();
        this.initializeModalElements();
        this.initializeLiliSpecificElements();
    }

    private initializeHeaderElements(): void {
        this.headerContainer = this.page.locator('header, .header, [data-testid="header"], .app-header');
        this.headerLogo = this.page.locator('img[alt*="Logo"], img[alt*="Lili"], .logo, [data-testid="logo"], .brand-logo');
        this.headerBrandName = this.page.locator('.brand-name, .company-name, [data-testid="brand-name"], h1:has-text("Lili")');
        this.headerNavigation = this.page.locator('nav, .navigation, [data-testid="navigation"], .main-nav');
        this.headerMenuButton = this.page.locator('button[aria-label*="menu"], .menu-button, [data-testid="menu-button"], .hamburger');
        this.headerLanguageSelector = this.page.locator('select[name="language"], .language-selector, [data-testid="language-selector"]');
        this.headerAccessibilityToggle = this.page.locator('button[aria-label*="accessibility"], .accessibility-toggle, [data-testid="accessibility-toggle"]');
        this.headerDarkModeToggle = this.page.locator('button[aria-label*="dark mode"], .dark-mode-toggle, [data-testid="dark-mode-toggle"]');
        this.headerHelpButton = this.page.locator('button:has-text("Help"), .help-button, [data-testid="help-button"]');
        this.headerContactButton = this.page.locator('button:has-text("Contact"), .contact-button, [data-testid="contact-button"]');
    }

    private initializeHeroElements(): void {
        this.heroContainer = this.page.locator('.hero, .hero-section, [data-testid="hero"], .main-hero');
        this.heroTitle = this.page.locator('h1:has-text("Welcome"), h1:has-text("Lili"), .hero-title, [data-testid="hero-title"]');
        this.heroSubtitle = this.page.locator('h2:has-text("Welcome"), h2:has-text("Get Started"), .hero-subtitle, [data-testid="hero-subtitle"]');
        this.heroDescription = this.page.locator('.hero-description, .hero-text, [data-testid="hero-description"], p:has-text("Welcome")');
        this.heroImage = this.page.locator('img[alt*="Hero"], img[alt*="Welcome"], .hero-image, [data-testid="hero-image"]');
        this.heroBackground = this.page.locator('.hero-background, .hero-bg, [data-testid="hero-background"]');
        this.heroVideo = this.page.locator('video, .hero-video, [data-testid="hero-video"]');
    }

    private initializeButtonElements(): void {
        this.primaryGetStartedButton = this.page.locator('button:has-text("Get Started"), button:has-text("Start"), button:has-text("Begin"), [data-testid="get-started-btn"], .primary-btn');
        this.primarySignInButton = this.page.locator('button:has-text("Sign In"), button:has-text("Login"), button:has-text("Sign In"), [data-testid="signin-btn"]');
        this.primaryCreateAccountButton = this.page.locator('button:has-text("Create Account"), button:has-text("Sign Up"), button:has-text("Register"), [data-testid="create-account-btn"]');
        this.primaryLearnMoreButton = this.page.locator('button:has-text("Learn More"), button:has-text("Learn"), button:has-text("More Info"), [data-testid="learn-more-btn"]');
        this.primaryDemoButton = this.page.locator('button:has-text("Demo"), button:has-text("Try Demo"), button:has-text("Watch Demo"), [data-testid="demo-btn"]');
        this.primaryContactSalesButton = this.page.locator('button:has-text("Contact Sales"), button:has-text("Talk to Sales"), [data-testid="contact-sales-btn"]');

        this.secondarySkipButton = this.page.locator('button:has-text("Skip"), button:has-text("Skip for now"), button:has-text("Later"), [data-testid="skip-btn"]');
        this.secondaryBackButton = this.page.locator('button:has-text("Back"), button:has-text("Previous"), button:has-text("Go Back"), [data-testid="back-btn"]');
        this.secondaryHelpButton = this.page.locator('button:has-text("Help"), button:has-text("Support"), button:has-text("?"), [data-testid="help-btn"]');
        this.secondarySupportButton = this.page.locator('button:has-text("Support"), button:has-text("Get Help"), [data-testid="support-btn"]');
        this.secondaryFAQButton = this.page.locator('button:has-text("FAQ"), button:has-text("Questions"), [data-testid="faq-btn"]');
    }

    private initializeFormElements(): void {
        this.formContainer = this.page.locator('form, .form-container, [data-testid="form"], .welcome-form');
        this.emailInput = this.page.locator('#EMAIL, input[type="email"], input[name="email"], input[placeholder*="Email"], [data-testid="email-input"]');
        this.passwordInput = this.page.locator('#PASSWORD, input[type="password"], input[name="password"], input[placeholder*="Password"], [data-testid="password-input"]');
        this.confirmPasswordInput = this.page.locator('input[name="confirmPassword"], input[placeholder*="Confirm Password"], [data-testid="confirm-password-input"]');
        this.firstNameInput = this.page.locator('input[name="firstName"], input[placeholder*="First Name"], #firstName, [data-testid="first-name-input"]');
        this.lastNameInput = this.page.locator('input[name="lastName"], input[placeholder*="Last Name"], #lastName, [data-testid="last-name-input"]');
        this.phoneInput = this.page.locator('input[type="tel"], input[name="phone"], input[placeholder*="Phone"], #phone, [data-testid="phone-input"]');
        this.companyInput = this.page.locator('input[name="company"], input[placeholder*="Company"], #company, [data-testid="company-input"]');
        this.industrySelect = this.page.locator('select[name="industry"], #industry, [data-testid="industry-select"]');
        this.agreeTermsCheckbox = this.page.locator('input[type="checkbox"], input[name="agreeTerms"], [data-testid="agree-terms-checkbox"]');
        this.marketingCheckbox = this.page.locator('input[name="marketing"], [data-testid="marketing-checkbox"]');
        this.formSubmitButton = this.page.locator('button[type="submit"], button:has-text("Submit"), [data-testid="submit-btn"]');
        this.formResetButton = this.page.locator('button[type="reset"], button:has-text("Reset"), [data-testid="reset-btn"]');
    }

    private initializeErrorElements(): void {
        this.emailError = this.page.locator('#EMAIL-error-container, .email-error, [data-testid="email-error"], .error:has-text("email")');
        this.passwordError = this.page.locator('#PASSWORD-error-container, .password-error, [data-testid="password-error"], .error:has-text("password")');
        this.confirmPasswordError = this.page.locator('.confirm-password-error, [data-testid="confirm-password-error"]');
        this.firstNameError = this.page.locator('.first-name-error, [data-testid="first-name-error"]');
        this.lastNameError = this.page.locator('.last-name-error, [data-testid="last-name-error"]');
        this.phoneError = this.page.locator('.phone-error, [data-testid="phone-error"]');
        this.companyError = this.page.locator('.company-error, [data-testid="company-error"]');
        this.termsError = this.page.locator('.terms-error, [data-testid="terms-error"]');
        this.generalError = this.page.locator('.error-message, .alert-error, [data-testid="error-message"]');
        this.successMessage = this.page.locator('.success-message, .alert-success, [data-testid="success-message"]');
        this.warningMessage = this.page.locator('.warning-message, .alert-warning, [data-testid="warning-message"]');
        this.infoMessage = this.page.locator('.info-message, .alert-info, [data-testid="info-message"]');
    }

    private initializeFeatureElements(): void {
        this.featuresContainer = this.page.locator('.features, .features-section, [data-testid="features"], .features-container');
        this.featuresTitle = this.page.locator('h2:has-text("Features"), h3:has-text("Features"), .features-title, [data-testid="features-title"]');
        this.featuresSubtitle = this.page.locator('.features-subtitle, .features-description, [data-testid="features-subtitle"]');
        this.featuresList = this.page.locator('.features-list, .features-grid, [data-testid="features-list"]');
        this.featureItem1 = this.page.locator('.feature-item:first-child, .feature:first-child, [data-testid="feature-1"]');
        this.featureItem2 = this.page.locator('.feature-item:nth-child(2), .feature:nth-child(2), [data-testid="feature-2"]');
        this.featureItem3 = this.page.locator('.feature-item:nth-child(3), .feature:nth-child(3), [data-testid="feature-3"]');
        this.featureItem4 = this.page.locator('.feature-item:nth-child(4), .feature:nth-child(4), [data-testid="feature-4"]');
        this.featureIcons = this.page.locator('.feature-icon, .feature-image, [data-testid="feature-icon"]');
        this.featureDescriptions = this.page.locator('.feature-description, .feature-text, [data-testid="feature-description"]');

        this.benefitsContainer = this.page.locator('.benefits, .benefits-section, [data-testid="benefits"], .benefits-container');
        this.benefitsTitle = this.page.locator('h2:has-text("Benefits"), h3:has-text("Benefits"), .benefits-title, [data-testid="benefits-title"]');
        this.benefitsSubtitle = this.page.locator('.benefits-subtitle, .benefits-description, [data-testid="benefits-subtitle"]');
        this.benefitsList = this.page.locator('.benefits-list, .benefits-grid, [data-testid="benefits-list"]');
        this.benefitItem1 = this.page.locator('.benefit-item:first-child, .benefit:first-child, [data-testid="benefit-1"]');
        this.benefitItem2 = this.page.locator('.benefit-item:nth-child(2), .benefit:nth-child(2), [data-testid="benefit-2"]');
        this.benefitItem3 = this.page.locator('.benefit-item:nth-child(3), .benefit:nth-child(3), [data-testid="benefit-3"]');
        this.benefitItem4 = this.page.locator('.benefit-item:nth-child(4), .benefit:nth-child(4), [data-testid="benefit-4"]');

        this.howItWorksSection = this.page.locator('.how-it-works, [data-testid="how-it-works"]');
        this.testimonialsSection = this.page.locator('.testimonials, [data-testid="testimonials"]');
        this.pricingSection = this.page.locator('.pricing, [data-testid="pricing"]');
        this.securitySection = this.page.locator('.security, [data-testid="security"]');
        this.complianceSection = this.page.locator('.compliance, [data-testid="compliance"]');
        this.integrationSection = this.page.locator('.integration, [data-testid="integration"]');
        this.bankingSection = this.page.locator('h2:has-text("Open your business checking"), [data-testid="banking-section"]');
        this.accountingSection = this.page.locator('h2:has-text("Accounting & Tax Preparation"), [data-testid="accounting-section"]');
        this.creditBuildingSection = this.page.locator('h2:has-text("Credit Building"), [data-testid="credit-building-section"]');
    }

    private initializeFooterElements(): void {
        this.footerContainer = this.page.locator('footer, .footer, [data-testid="footer"], .app-footer');
        this.footerLogo = this.page.locator('footer img[alt*="Logo"], footer .logo, [data-testid="footer-logo"]');
        this.footerCompanyInfo = this.page.locator('.footer-company-info, .company-details, [data-testid="footer-company-info"]');
        this.footerLinks = this.page.locator('.footer-links, .footer a, [data-testid="footer-links"]');
        this.footerPrivacyLink = this.page.locator('a:has-text("Privacy Policy"), a[href*="privacy"], [data-testid="privacy-link"]');
        this.footerTermsLink = this.page.locator('a:has-text("Terms of Use"), a[href*="terms"], [data-testid="terms-link"]');
        this.footerSupportLink = this.page.locator('a:has-text("Support"), a[href*="support"], [data-testid="support-link"]');
        this.footerContactLink = this.page.locator('a:has-text("Contact Us"), a[href*="contact"], [data-testid="contact-link"]');
        this.footerHelpLink = this.page.locator('a:has-text("Help"), a[href*="help"], [data-testid="help-link"]');
        this.footerFAQLink = this.page.locator('a:has-text("FAQ"), a[href*="faq"], [data-testid="faq-link"]');
        this.footerSocialLinks = this.page.locator('.social-links, .social-media, [data-testid="social-links"]');
        this.footerCopyright = this.page.locator('.copyright, .copyright-text, [data-testid="copyright"]');
    }

    private initializeProgressElements(): void {
        this.progressContainer = this.page.locator('.progress-container, .progress-wrapper, [data-testid="progress-container"]');
        this.progressBar = this.page.locator('.progress-bar, .progress, [data-testid="progress-bar"]');
        this.progressPercentage = this.page.locator('.progress-percentage, .progress-text, [data-testid="progress-percentage"]');
        this.stepIndicator = this.page.locator('.step-indicator, .steps, [data-testid="step-indicator"]');
        this.currentStep = this.page.locator('.current-step, .active-step, [data-testid="current-step"]');
        this.totalSteps = this.page.locator('.total-steps, .step-count, [data-testid="total-steps"]');
        this.step1 = this.page.locator('.step-1, [data-testid="step-1"]');
        this.step2 = this.page.locator('.step-2, [data-testid="step-2"]');
        this.step3 = this.page.locator('.step-3, [data-testid="step-3"]');
        this.step4 = this.page.locator('.step-4, [data-testid="step-4"]');
    }

    private initializeLoadingElements(): void {
        this.loadingSpinner = this.page.locator('.loading-spinner, .spinner, [data-testid="loading-spinner"]');
        this.loadingText = this.page.locator('.loading-text, .loading-message, [data-testid="loading-text"]');
        this.skeletonLoader = this.page.locator('.skeleton, .skeleton-loader, [data-testid="skeleton-loader"]');
        this.contentPlaceholder = this.page.locator('.placeholder, .content-placeholder, [data-testid="content-placeholder"]');
    }

    private initializeModalElements(): void {
        this.modalContainer = this.page.locator('.modal, .modal-container, [data-testid="modal"]');
        this.modalTitle = this.page.locator('.modal-title, .modal-header h2, [data-testid="modal-title"]');
        this.modalContent = this.page.locator('.modal-content, .modal-body, [data-testid="modal-content"]');
        this.modalCloseButton = this.page.locator('.modal-close, .close-button, [data-testid="modal-close"]');
        this.modalConfirmButton = this.page.locator('.modal-confirm, .confirm-button, [data-testid="modal-confirm"]');
        this.modalCancelButton = this.page.locator('.modal-cancel, .cancel-button, [data-testid="modal-cancel"]');
        this.overlayBackground = this.page.locator('.modal-overlay, .overlay, [data-testid="modal-overlay"]');
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
        this.emailLabel = this.page.locator('text=Email');
        this.passwordLabel = this.page.locator('text=Password');
        this.getStartedText = this.page.locator('text=By clicking GET STARTED you');
        this.logInLink = this.page.locator('text=Log In');
        
        // Password strength indicator - UPDATED with working selectors from recording
        this.passwordStrengthIndicator = this.page.locator('.h-\\[5px\\].w-full').first();
        
        // Show/hide password button - ALREADY WORKING
        this.showHidePasswordButton = this.page.locator('#showHidePassword-PASSWORD');
        
        // Password requirements tooltip - UPDATED with working selector
        this.passwordRequirementsTooltip = this.page.getByRole('tooltip', { name: '• Minimum 8 characters • At' });
        
        // Invalid email error - UPDATED with working selector
        this.invalidEmailError = this.page.getByText('Invalid email');
        
        // Email error container - UPDATED with working selector
        this.emailErrorContainer = this.page.locator('#EMAIL-error-container');
        
        // Password error container - ALREADY WORKING
        this.passwordErrorContainer = this.page.locator('#PASSWORD-error-container');
        
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
            
            const isEmailFilled = emailValue && emailValue.trim() !== '';
            const isPasswordFilled = passwordValue && passwordValue.trim() !== '';
            
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
