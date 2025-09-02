export class Constants {
    // Test Data
    public static readonly EMAIL = 'test@example.com';
    public static readonly FIRST_NAME = 'John';
    public static readonly LAST_NAME = 'Doe';
    public static readonly PASSWORD = 'Test123!';
    public static readonly COMPANY = 'Test Company';
    public static readonly ADDRESS = '123 Test Street';
    public static readonly CITY = 'Test City';
    public static readonly ZIP_CODE = '12345';
    public static readonly COUNTRY = 'United States';
    public static readonly OTHER = 'Additional Info';
    public static readonly HOME_PHONE = '+1-555-123-4567';
    public static readonly MOBILE_PHONE = '+1-555-987-6543';
    public static readonly ALIAS = 'Test Alias';

    // Headings and Text for Lili Onboarding
    public static readonly HEADING_01 = 'Welcome to Lili';
    public static readonly HEADING_02 = 'Personal Information';
    public static readonly HEADING_03 = 'My Account';
    public static readonly HEADING_04 = 'Product List';
    public static readonly HEADING_05 = 'Shopping Cart';
    public static readonly HEADING_06 = 'Order Confirmation';
    public static readonly HEADING_07 = 'Order Complete';

    // URLs - Updated for Lili Onboarding
    public static readonly BASE_URL = 'https://lili-onboarding-integ.lili.co/';
    public static readonly LOGIN_URL = '/login';
    public static readonly REGISTRATION_URL = '/register';
    public static readonly ACCOUNT_URL = '/account';
    public static readonly ONBOARDING_URL = 'https://lili-onboarding-integ.lili.co/';

    // Timeouts
    public static readonly DEFAULT_TIMEOUT = 30000;
    public static readonly SHORT_TIMEOUT = 5000;
    public static readonly LONG_TIMEOUT = 60000;

    // Browser Settings
    public static readonly VIEWPORT_WIDTH = 1920;
    public static readonly VIEWPORT_HEIGHT = 1080;
    public static readonly USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';

    // Lili Specific Constants
    public static readonly LILI_APP_NAME = 'Lili';
    public static readonly LILI_ENVIRONMENT = 'Integration';
    public static readonly LILI_DOMAIN = 'lili.co';
}
