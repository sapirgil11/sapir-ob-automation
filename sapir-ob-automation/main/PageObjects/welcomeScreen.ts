import { Page, Locator } from '@playwright/test';

export class WelcomeScreen {
    private page: Page;
    
    // ===== HEADER SECTION (Top of Page) =====
    public readonly headerContainer: Locator;
    public readonly headerLogo: Locator;
    public readonly headerBrandName: Locator;
    public readonly headerNavigation: Locator;
    public readonly headerMenuButton: Locator;
    public readonly headerLanguageSelector: Locator;
    public readonly headerAccessibilityToggle: Locator;
    public readonly headerDarkModeToggle: Locator;
    public readonly headerHelpButton: Locator;
    public readonly headerContactButton: Locator;

    // ===== MAIN HERO SECTION (Center Top) =====
    public readonly heroContainer: Locator;
    public readonly heroTitle: Locator;
    public readonly heroSubtitle: Locator;
    public readonly heroDescription: Locator;
    public readonly heroImage: Locator;
    public readonly heroBackground: Locator;
    public readonly heroVideo: Locator;

    // ===== PRIMARY ACTION BUTTONS =====
    public readonly primaryGetStartedButton: Locator;
    public readonly primarySignInButton: Locator;
    public readonly primaryCreateAccountButton: Locator;
    public readonly primaryLearnMoreButton: Locator;
    public readonly primaryDemoButton: Locator;
    public readonly primaryContactSalesButton: Locator;

    // ===== SECONDARY ACTION BUTTONS =====
    public readonly secondarySkipButton: Locator;
    public readonly secondaryBackButton: Locator;
    public readonly secondaryHelpButton: Locator;
    public readonly secondarySupportButton: Locator;
    public readonly secondaryFAQButton: Locator;

    // ===== FEATURES SECTION =====
    public readonly featuresContainer: Locator;
    public readonly featuresTitle: Locator;
    public readonly featuresSubtitle: Locator;
    public readonly featuresList: Locator;
    public readonly featureItem1: Locator;
    public readonly featureItem2: Locator;
    public readonly featureItem3: Locator;
    public readonly featureItem4: Locator;
    public readonly featureIcons: Locator;
    public readonly featureDescriptions: Locator;

    // ===== BENEFITS SECTION =====
    public readonly benefitsContainer: Locator;
    public readonly benefitsTitle: Locator;
    public readonly benefitsSubtitle: Locator;
    public readonly benefitsList: Locator;
    public readonly benefitItem1: Locator;
    public readonly benefitItem2: Locator;
    public readonly benefitItem3: Locator;
    public readonly benefitItem4: Locator;

    // ===== FORM ELEMENTS (Real Lili Elements) =====
    public readonly formContainer: Locator;
    public readonly emailInput: Locator;
    public readonly passwordInput: Locator;
    public readonly confirmPasswordInput: Locator;
    public readonly firstNameInput: Locator;
    public readonly lastNameInput: Locator;
    public readonly phoneInput: Locator;
    public readonly companyInput: Locator;
    public readonly industrySelect: Locator;
    public readonly agreeTermsCheckbox: Locator;
    public readonly marketingCheckbox: Locator;
    public readonly formSubmitButton: Locator;
    public readonly formResetButton: Locator;

    // ===== VALIDATION & ERROR MESSAGES (Real Lili Elements) =====
    public readonly emailError: Locator;
    public readonly passwordError: Locator;
    public readonly confirmPasswordError: Locator;
    public readonly firstNameError: Locator;
    public readonly lastNameError: Locator;
    public readonly phoneError: Locator;
    public readonly companyError: Locator;
    public readonly termsError: Locator;
    public readonly generalError: Locator;
    public readonly successMessage: Locator;
    public readonly warningMessage: Locator;
    public readonly infoMessage: Locator;

    // ===== PROGRESS & STEP INDICATORS =====
    public readonly progressContainer: Locator;
    public readonly progressBar: Locator;
    public readonly progressPercentage: Locator;
    public readonly stepIndicator: Locator;
    public readonly currentStep: Locator;
    public readonly totalSteps: Locator;
    public readonly step1: Locator;
    public readonly step2: Locator;
    public readonly step3: Locator;
    public readonly step4: Locator;

    // ===== CONTENT SECTIONS (Real Lili Sections) =====
    public readonly howItWorksSection: Locator;
    public readonly testimonialsSection: Locator;
    public readonly pricingSection: Locator;
    public readonly securitySection: Locator;
    public readonly complianceSection: Locator;
    public readonly integrationSection: Locator;
    public readonly bankingSection: Locator;
    public readonly accountingSection: Locator;
    public readonly creditBuildingSection: Locator;

    // ===== FOOTER SECTION (Bottom of Page) =====
    public readonly footerContainer: Locator;
    public readonly footerLogo: Locator;
    public readonly footerCompanyInfo: Locator;
    public readonly footerLinks: Locator;
    public readonly footerPrivacyLink: Locator;
    public readonly footerTermsLink: Locator;
    public readonly footerSupportLink: Locator;
    public readonly footerContactLink: Locator;
    public readonly footerHelpLink: Locator;
    public readonly footerFAQLink: Locator;
    public readonly footerSocialLinks: Locator;
    public readonly footerCopyright: Locator;

    // ===== LOADING & STATE INDICATORS =====
    public readonly loadingSpinner: Locator;
    public readonly loadingText: Locator;
    public readonly skeletonLoader: Locator;
    public readonly contentPlaceholder: Locator;

    // ===== MODAL & OVERLAY ELEMENTS =====
    public readonly modalContainer: Locator;
    public readonly modalTitle: Locator;
    public readonly modalContent: Locator;
    public readonly modalCloseButton: Locator;
    public readonly modalConfirmButton: Locator;
    public readonly modalCancelButton: Locator;
    public readonly overlayBackground: Locator;

    // ===== REAL LILI SPECIFIC ELEMENTS =====
    public readonly liliLogo: Locator;
    public readonly welcomeHeading: Locator;
    public readonly businessGrowthText: Locator;
    public readonly emailLabel: Locator;
    public readonly passwordLabel: Locator;
    public readonly getStartedText: Locator;
    public readonly termsOfUseLink: Locator;
    public readonly privacyPolicyLink: Locator;
    public readonly alreadyHaveAccountText: Locator;
    public readonly logInLink: Locator;
    public readonly trustPilotLogo: Locator;
    public readonly passwordStrengthIndicator: Locator;
    public readonly showHidePasswordButton: Locator;
    public readonly passwordRequirementsTooltip: Locator;
    public readonly invalidEmailError: Locator;
    public readonly emailErrorContainer: Locator;
    public readonly passwordErrorContainer: Locator;

    constructor(page: Page) {
        this.page = page;
        this.initializeAllLocators();
    }

    private initializeAllLocators(): void {
        // ===== HEADER SECTION INITIALIZATION =====
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

        // ===== MAIN HERO SECTION INITIALIZATION =====
        this.heroContainer = this.page.locator('.hero, .hero-section, [data-testid="hero"], .main-hero');
        this.heroTitle = this.page.locator('h1:has-text("Welcome"), h1:has-text("Lili"), .hero-title, [data-testid="hero-title"]');
        this.heroSubtitle = this.page.locator('h2:has-text("Welcome"), h2:has-text("Get Started"), .hero-subtitle, [data-testid="hero-subtitle"]');
        this.heroDescription = this.page.locator('.hero-description, .hero-text, [data-testid="hero-description"], p:has-text("Welcome")');
        this.heroImage = this.page.locator('img[alt*="Hero"], img[alt*="Welcome"], .hero-image, [data-testid="hero-image"]');
        this.heroBackground = this.page.locator('.hero-background, .hero-bg, [data-testid="hero-background"]');
        this.heroVideo = this.page.locator('video, .hero-video, [data-testid="hero-video"]');

        // ===== PRIMARY ACTION BUTTONS INITIALIZATION =====
        this.primaryGetStartedButton = this.page.locator('button:has-text("Get Started"), button:has-text("Start"), button:has-text("Begin"), [data-testid="get-started-btn"], .primary-btn');
        this.primarySignInButton = this.page.locator('button:has-text("Sign In"), button:has-text("Login"), button:has-text("Sign In"), [data-testid="signin-btn"]');
        this.primaryCreateAccountButton = this.page.locator('button:has-text("Create Account"), button:has-text("Sign Up"), button:has-text("Register"), [data-testid="create-account-btn"]');
        this.primaryLearnMoreButton = this.page.locator('button:has-text("Learn More"), button:has-text("Learn"), button:has-text("More Info"), [data-testid="learn-more-btn"]');
        this.primaryDemoButton = this.page.locator('button:has-text("Demo"), button:has-text("Try Demo"), button:has-text("Watch Demo"), [data-testid="demo-btn"]');
        this.primaryContactSalesButton = this.page.locator('button:has-text("Contact Sales"), button:has-text("Talk to Sales"), [data-testid="contact-sales-btn"]');

        // ===== SECONDARY ACTION BUTTONS INITIALIZATION =====
        this.secondarySkipButton = this.page.locator('button:has-text("Skip"), button:has-text("Skip for now"), button:has-text("Later"), [data-testid="skip-btn"]');
        this.secondaryBackButton = this.page.locator('button:has-text("Back"), button:has-text("Previous"), button:has-text("Go Back"), [data-testid="back-btn"]');
        this.secondaryHelpButton = this.page.locator('button:has-text("Help"), button:has-text("Support"), button:has-text("?"), [data-testid="help-btn"]');
        this.secondarySupportButton = this.page.locator('button:has-text("Support"), button:has-text("Get Help"), [data-testid="support-btn"]');
        this.secondaryFAQButton = this.page.locator('button:has-text("FAQ"), button:has-text("Questions"), [data-testid="faq-btn"]');

        // ===== FEATURES SECTION INITIALIZATION =====
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

        // ===== BENEFITS SECTION INITIALIZATION =====
        this.benefitsContainer = this.page.locator('.benefits, .benefits-section, [data-testid="benefits"], .benefits-container');
        this.benefitsTitle = this.page.locator('h2:has-text("Benefits"), h3:has-text("Benefits"), .benefits-title, [data-testid="benefits-title"]');
        this.benefitsSubtitle = this.page.locator('.benefits-subtitle, .benefits-description, [data-testid="benefits-subtitle"]');
        this.benefitsList = this.page.locator('.benefits-list, .benefits-grid, [data-testid="benefits-list"]');
        this.benefitItem1 = this.page.locator('.benefit-item:first-child, .benefit:first-child, [data-testid="benefit-1"]');
        this.benefitItem2 = this.page.locator('.benefit-item:nth-child(2), .benefit:nth-child(2), [data-testid="benefit-2"]');
        this.benefitItem3 = this.page.locator('.benefit-item:nth-child(3), .benefit:nth-child(3), [data-testid="benefit-3"]');
        this.benefitItem4 = this.page.locator('.benefit-item:nth-child(4), .benefit:nth-child(4), [data-testid="benefit-4"]');

        // ===== FORM ELEMENTS INITIALIZATION (Real Lili Elements) =====
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

        // ===== VALIDATION & ERROR MESSAGES INITIALIZATION (Real Lili Elements) =====
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

        // ===== PROGRESS & STEP INDICATORS INITIALIZATION =====
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

        // ===== CONTENT SECTIONS INITIALIZATION (Real Lili Sections) =====
        this.howItWorksSection = this.page.locator('.how-it-works, [data-testid="how-it-works"]');
        this.testimonialsSection = this.page.locator('.testimonials, [data-testid="testimonials"]');
        this.pricingSection = this.page.locator('.pricing, [data-testid="pricing"]');
        this.securitySection = this.page.locator('.security, [data-testid="security"]');
        this.complianceSection = this.page.locator('.compliance, [data-testid="compliance"]');
        this.integrationSection = this.page.locator('.integration, [data-testid="integration"]');
        this.bankingSection = this.page.locator('h2:has-text("Open your business checking"), [data-testid="banking-section"]');
        this.accountingSection = this.page.locator('h2:has-text("Accounting & Tax Preparation"), [data-testid="accounting-section"]');
        this.creditBuildingSection = this.page.locator('h2:has-text("Credit Building"), [data-testid="credit-building-section"]');

        // ===== FOOTER SECTION INITIALIZATION =====
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

        // ===== LOADING & STATE INDICATORS INITIALIZATION =====
        this.loadingSpinner = this.page.locator('.loading-spinner, .spinner, [data-testid="loading-spinner"]');
        this.loadingText = this.page.locator('.loading-text, .loading-message, [data-testid="loading-text"]');
        this.skeletonLoader = this.page.locator('.skeleton, .skeleton-loader, [data-testid="skeleton-loader"]');
        this.contentPlaceholder = this.page.locator('.placeholder, .content-placeholder, [data-testid="content-placeholder"]');

        // ===== MODAL & OVERLAY ELEMENTS INITIALIZATION =====
        this.modalContainer = this.page.locator('.modal, .modal-container, [data-testid="modal"]');
        this.modalTitle = this.page.locator('.modal-title, .modal-header h2, [data-testid="modal-title"]');
        this.modalContent = this.page.locator('.modal-content, .modal-body, [data-testid="modal-content"]');
        this.modalCloseButton = this.page.locator('.modal-close, .close-button, [data-testid="modal-close"]');
        this.modalConfirmButton = this.page.locator('.modal-confirm, .confirm-button, [data-testid="modal-confirm"]');
        this.modalCancelButton = this.page.locator('.modal-cancel, .cancel-button, [data-testid="modal-cancel"]');
        this.overlayBackground = this.page.locator('.modal-overlay, .overlay, [data-testid="modal-overlay"]');

        // ===== REAL LILI SPECIFIC ELEMENTS INITIALIZATION =====
        this.liliLogo = this.page.locator('img[alt="Lili logo"]');
        this.welcomeHeading = this.page.locator('h1:has-text("Welcome to Lili,")');
        this.businessGrowthText = this.page.locator('h2:has-text("Powering your business growth")');
        this.emailLabel = this.page.locator('text=Email');
        this.passwordLabel = this.page.locator('text=Password');
        this.getStartedText = this.page.locator('text=By clicking GET STARTED you');
        this.termsOfUseLink = this.page.locator('a:has-text("Terms of Use")');
        this.privacyPolicyLink = this.page.locator('a:has-text("Privacy Policy")');
        this.alreadyHaveAccountText = this.page.locator('h2:has-text("Already have an account?")');
        this.logInLink = this.page.locator('text=Log In');
        this.trustPilotLogo = this.page.locator('img[alt="Trust Pilot"]');
        this.passwordStrengthIndicator = this.page.locator('text=Too Weak, text=Weak, text=Strong');
        this.showHidePasswordButton = this.page.locator('#showHidePassword-PASSWORD');
        this.passwordRequirementsTooltip = this.page.locator('[role="tooltip"]:has-text("• Minimum 8 characters • At")');
        this.invalidEmailError = this.page.locator('text=Invalid email');
        this.emailErrorContainer = this.page.locator('#EMAIL-error-container');
        this.passwordErrorContainer = this.page.locator('#PASSWORD-error-container');
    }

    // ===== HEADER METHODS =====
    async clickHeaderLogo(): Promise<void> {
        if (await this.headerLogo.isVisible()) {
            await this.headerLogo.click();
            await this.waitForPageLoad();
            console.log('✅ Header logo clicked successfully');
        }
    }

    async selectLanguage(language: string): Promise<void> {
        if (await this.headerLanguageSelector.isVisible()) {
            await this.headerLanguageSelector.selectOption(language);
            console.log(`🌐 Language selected: ${language}`);
        }
    }

    async toggleAccessibility(): Promise<void> {
        if (await this.headerAccessibilityToggle.isVisible()) {
            await this.headerAccessibilityToggle.click();
            console.log('♿ Accessibility toggle clicked');
        }
    }

    async toggleDarkMode(): Promise<void> {
        if (await this.headerDarkModeToggle.isVisible()) {
            await this.headerDarkModeToggle.click();
            console.log('🌙 Dark mode toggle clicked');
        }
    }

    // ===== HERO SECTION METHODS =====
    async getHeroTitle(): Promise<string> {
        const title = await this.heroTitle.textContent();
        return title || 'Hero title not found';
    }

    async getHeroSubtitle(): Promise<string> {
        const subtitle = await this.heroSubtitle.textContent();
        return subtitle || 'Hero subtitle not found';
    }

    async getHeroDescription(): Promise<string> {
        const description = await this.heroDescription.textContent();
        return description || 'Hero description not found';
    }

    // ===== PRIMARY ACTION METHODS =====
    async clickGetStarted(): Promise<void> {
        if (await this.primaryGetStartedButton.isVisible()) {
            await this.primaryGetStartedButton.click();
            await this.waitForPageLoad();
            console.log('✅ Get Started button clicked successfully');
        } else {
            console.warn('⚠️ Get Started button not visible');
        }
    }

    async clickSignIn(): Promise<void> {
        if (await this.primarySignInButton.isVisible()) {
            await this.primarySignInButton.click();
            await this.waitForPageLoad();
            console.log('✅ Sign In button clicked successfully');
        }
    }

    async clickCreateAccount(): Promise<void> {
        if (await this.primaryCreateAccountButton.isVisible()) {
            await this.primaryCreateAccountButton.click();
            await this.waitForPageLoad();
            console.log('✅ Create Account button clicked successfully');
        }
    }

    async clickLearnMore(): Promise<void> {
        if (await this.primaryLearnMoreButton.isVisible()) {
            await this.primaryLearnMoreButton.click();
            await this.waitForPageLoad();
            console.log('✅ Learn More button clicked successfully');
        }
    }

    // ===== SECONDARY ACTION METHODS =====
    async clickSkip(): Promise<void> {
        if (await this.secondarySkipButton.isVisible()) {
            await this.secondarySkipButton.click();
            await this.waitForPageLoad();
            console.log('✅ Skip button clicked successfully');
        }
    }

    async clickBack(): Promise<void> {
        if (await this.secondaryBackButton.isVisible()) {
            await this.secondaryBackButton.click();
            await this.waitForPageLoad();
            console.log('✅ Back button clicked successfully');
        }
    }

    // ===== FEATURES & BENEFITS METHODS =====
    async getFeaturesCount(): Promise<number> {
        return await this.featureItem1.count();
    }

    async getBenefitsCount(): Promise<number> {
        return await this.benefitItem1.count();
    }

    // ===== FORM INTERACTION METHODS (Real Lili Elements) =====
    async enterEmail(email: string): Promise<void> {
        if (await this.emailInput.isVisible()) {
            await this.emailInput.fill(email);
            console.log(`📧 Email entered: ${email}`);
        }
    }

    async enterPassword(password: string): Promise<void> {
        if (await this.passwordInput.isVisible()) {
            await this.passwordInput.fill(password);
            console.log('🔒 Password entered');
        }
    }

    async enterFirstName(firstName: string): Promise<void> {
        if (await this.firstNameInput.isVisible()) {
            await this.firstNameInput.fill(firstName);
            console.log(`👤 First name entered: ${firstName}`);
        }
    }

    async enterLastName(lastName: string): Promise<void> {
        if (await this.lastNameInput.isVisible()) {
            await this.lastNameInput.fill(lastName);
            console.log(`👤 Last name entered: ${lastName}`);
        }
    }

    async enterPhone(phone: string): Promise<void> {
        if (await this.phoneInput.isVisible()) {
            await this.phoneInput.fill(phone);
            console.log(`📱 Phone entered: ${phone}`);
        }
    }

    async enterCompany(company: string): Promise<void> {
        if (await this.companyInput.isVisible()) {
            await this.companyInput.fill(company);
            console.log(`🏢 Company entered: ${company}`);
        }
    }

    async selectIndustry(industry: string): Promise<void> {
        if (await this.industrySelect.isVisible()) {
            await this.industrySelect.selectOption(industry);
            console.log(`🏭 Industry selected: ${industry}`);
        }
    }

    async checkAgreeTerms(): Promise<void> {
        if (await this.agreeTermsCheckbox.isVisible()) {
            await this.agreeTermsCheckbox.check();
            console.log('✅ Terms agreement checked');
        }
    }

    async checkMarketing(): Promise<void> {
        if (await this.marketingCheckbox.isVisible()) {
            await this.marketingCheckbox.check();
            console.log('✅ Marketing checkbox checked');
        }
    }

    async submitForm(): Promise<void> {
        if (await this.formSubmitButton.isVisible()) {
            await this.formSubmitButton.click();
            await this.waitForPageLoad();
            console.log('✅ Form submitted successfully');
        }
    }

    // ===== VALIDATION & ERROR CHECKING METHODS (Real Lili Elements) =====
    async hasEmailError(): Promise<boolean> {
        return await this.emailError.isVisible();
    }

    async hasPasswordError(): Promise<boolean> {
        return await this.passwordError.isVisible();
    }

    async hasGeneralError(): Promise<boolean> {
        return await this.generalError.isVisible();
    }

    async hasSuccessMessage(): Promise<boolean> {
        return await this.successMessage.isVisible();
    }

    async getErrorMessage(): Promise<string> {
        if (await this.generalError.isVisible()) {
            return await this.generalError.textContent() || 'Error message not found';
        }
        return 'No error message visible';
    }

    async getSuccessMessage(): Promise<string> {
        if (await this.successMessage.isVisible()) {
            return await this.successMessage.textContent() || 'Success message not found';
        }
        return 'No success message visible';
    }

    // ===== PROGRESS & STEPS METHODS =====
    async getCurrentStepNumber(): Promise<string> {
        const stepText = await this.currentStep.textContent();
        return stepText || 'Step not found';
    }

    async getTotalSteps(): Promise<string> {
        const totalText = await this.totalSteps.textContent();
        return totalText || 'Total steps not found';
    }

    async getProgressPercentage(): Promise<string> {
        const progressText = await this.progressPercentage.textContent();
        return progressText || 'Progress not found';
    }

    // ===== FOOTER NAVIGATION METHODS =====
    async clickPrivacyPolicy(): Promise<void> {
        if (await this.footerPrivacyLink.isVisible()) {
            await this.footerPrivacyLink.click();
            await this.waitForPageLoad();
            console.log('✅ Privacy Policy link clicked');
        }
    }

    async clickTermsOfService(): Promise<void> {
        if (await this.footerTermsLink.isVisible()) {
            await this.footerTermsLink.click();
            await this.waitForPageLoad();
            console.log('✅ Terms of Use link clicked');
        }
    }

    async clickSupport(): Promise<void> {
        if (await this.footerSupportLink.isVisible()) {
            await this.footerSupportLink.click();
            await this.waitForPageLoad();
            console.log('✅ Support link clicked');
        }
    }

    async clickContactUs(): Promise<void> {
        if (await this.footerContactLink.isVisible()) {
            await this.footerContactLink.click();
            await this.waitForPageLoad();
            console.log('✅ Contact Us link clicked');
        }
    }

    // ===== REAL LILI SPECIFIC METHODS =====
    async clickLiliLogo(): Promise<void> {
        if (await this.liliLogo.isVisible()) {
            await this.liliLogo.click();
            await this.waitForPageLoad();
            console.log('✅ Lili logo clicked successfully');
        }
    }

    async getWelcomeHeading(): Promise<string> {
        const heading = await this.welcomeHeading.textContent();
        return heading || 'Welcome heading not found';
    }

    async getBusinessGrowthText(): Promise<string> {
        const text = await this.businessGrowthText.textContent();
        return text || 'Business growth text not found';
    }

    async clickTermsOfUse(): Promise<void> {
        if (await this.termsOfUseLink.isVisible()) {
            await this.termsOfUseLink.click();
            console.log('✅ Terms of Use link clicked');
        }
    }

    async clickPrivacyPolicy(): Promise<void> {
        if (await this.privacyPolicyLink.isVisible()) {
            await this.privacyPolicyLink.click();
            console.log('✅ Privacy Policy link clicked');
        }
    }

    async clickLogIn(): Promise<void> {
        if (await this.logInLink.isVisible()) {
            await this.logInLink.click();
            await this.waitForPageLoad();
            console.log('✅ Log In link clicked');
        }
    }

    async clickTrustPilotLogo(): Promise<void> {
        if (await this.trustPilotLogo.isVisible()) {
            await this.trustPilotLogo.click();
            console.log('✅ Trust Pilot logo clicked');
        }
    }

    async togglePasswordVisibility(): Promise<void> {
        if (await this.showHidePasswordButton.isVisible()) {
            await this.showHidePasswordButton.click();
            console.log('✅ Password visibility toggled');
        }
    }

    async getPasswordStrength(): Promise<string> {
        if (await this.passwordStrengthIndicator.isVisible()) {
            const strength = await this.passwordStrengthIndicator.textContent();
            return strength || 'Password strength not found';
        }
        return 'Password strength indicator not visible';
    }

    async getPasswordRequirements(): Promise<string> {
        if (await this.passwordRequirementsTooltip.isVisible()) {
            const requirements = await this.passwordRequirementsTooltip.textContent();
            return requirements || 'Password requirements not found';
        }
        return 'Password requirements not visible';
    }

    async getEmailErrorText(): Promise<string> {
        if (await this.emailErrorContainer.isVisible()) {
            const errorText = await this.emailErrorContainer.textContent();
            return errorText || 'Email error text not found';
        }
        return 'Email error container not visible';
    }

    async getPasswordErrorText(): Promise<string> {
        if (await this.passwordErrorContainer.isVisible()) {
            const errorText = await this.passwordErrorContainer.textContent();
            return errorText || 'Password error text not found';
        }
        return 'Password error container not visible';
    }

    // ===== VERIFICATION METHODS =====
    async isWelcomeScreenLoaded(): Promise<boolean> {
        const titleVisible = await this.heroTitle.isVisible();
        const getStartedVisible = await this.primaryGetStartedButton.isVisible();
        return titleVisible && getStartedVisible;
    }

    async verifyWelcomeElements(): Promise<boolean> {
        try {
            const title = await this.getHeroTitle();
            const subtitle = await this.getHeroSubtitle();
            const description = await this.getHeroDescription();
            
            console.log(`📄 Hero Title: ${title}`);
            console.log(`📝 Hero Subtitle: ${subtitle}`);
            console.log(`💬 Hero Description: ${description}`);
            
            return title.length > 0 && subtitle.length > 0;
        } catch (error) {
            console.error('❌ Welcome elements verification failed:', error);
            return false;
        }
    }

    async verifyAllSections(): Promise<boolean> {
        try {
            const headerVisible = await this.headerContainer.isVisible();
            const heroVisible = await this.heroContainer.isVisible();
            const footerVisible = await this.footerContainer.isVisible();
            
            console.log(`📱 Header visible: ${headerVisible}`);
            console.log(`🎯 Hero section visible: ${heroVisible}`);
            console.log(`📄 Footer visible: ${footerVisible}`);
            
            return headerVisible && heroVisible && footerVisible;
        } catch (error) {
            console.error('❌ Section verification failed:', error);
            return false;
        }
    }

    // ===== UTILITY METHODS =====
    async takeWelcomeScreenshot(name: string): Promise<void> {
        await this.takeScreenshot(`welcome-screen-${name}`);
    }

    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState('networkidle');
        console.log('✅ Page loaded successfully');
    }

    async scrollToSection(sectionName: string): Promise<void> {
        let section: Locator;
        
        switch (sectionName.toLowerCase()) {
            case 'header':
                section = this.headerContainer;
                break;
            case 'hero':
                section = this.heroContainer;
                break;
            case 'features':
                section = this.featuresContainer;
                break;
            case 'benefits':
                section = this.benefitsContainer;
                break;
            case 'footer':
                section = this.footerContainer;
                break;
            default:
                console.warn(`⚠️ Unknown section: ${sectionName}`);
                return;
        }
        
        if (await section.isVisible()) {
            await section.scrollIntoViewIfNeeded();
            console.log(`📜 Scrolled to ${sectionName} section`);
        }
    }

    async getAllVisibleElements(): Promise<string[]> {
        const visibleElements: string[] = [];
        
        // Check header elements
        if (await this.headerLogo.isVisible()) visibleElements.push('Header Logo');
        if (await this.headerBrandName.isVisible()) visibleElements.push('Header Brand Name');
        if (await this.primaryGetStartedButton.isVisible()) visibleElements.push('Get Started Button');
        if (await this.primarySignInButton.isVisible()) visibleElements.push('Sign In Button');
        if (await this.primaryCreateAccountButton.isVisible()) visibleElements.push('Create Account Button');
        
        // Check hero elements
        if (await this.heroTitle.isVisible()) visibleElements.push('Hero Title');
        if (await this.heroSubtitle.isVisible()) visibleElements.push('Hero Subtitle');
        if (await this.heroDescription.isVisible()) visibleElements.push('Hero Description');
        
        // Check form elements
        if (await this.emailInput.isVisible()) visibleElements.push('Email Input');
        if (await this.passwordInput.isVisible()) visibleElements.push('Password Input');
        if (await this.firstNameInput.isVisible()) visibleElements.push('First Name Input');
        if (await this.lastNameInput.isVisible()) visibleElements.push('Last Name Input');
        
        // Check footer elements
        if (await this.footerPrivacyLink.isVisible()) visibleElements.push('Privacy Policy Link');
        if (await this.footerTermsLink.isVisible()) visibleElements.push('Terms of Use Link');
        if (await this.footerSupportLink.isVisible()) visibleElements.push('Support Link');
        
        return visibleElements;
    }
}
