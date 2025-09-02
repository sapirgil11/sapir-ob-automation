export class TestData {
    // Test user data
    public static readonly TEST_USER = {
        email: 'testuser@example.com',
        password: 'TestPassword123!',
        firstName: 'Test',
        lastName: 'User',
        company: 'Test Company Inc.',
        address: '123 Test Street',
        city: 'Test City',
        zipCode: '12345',
        country: 'United States',
        phone: '+1-555-123-4567'
    };

    // Test product data
    public static readonly TEST_PRODUCT = {
        name: 'Test Product',
        price: '29.99',
        category: 'Electronics',
        description: 'This is a test product description'
    };

    // Test order data
    public static readonly TEST_ORDER = {
        orderNumber: 'ORD-001',
        totalAmount: '29.99',
        status: 'Pending'
    };

    // API endpoints
    public static readonly API_ENDPOINTS = {
        base: 'https://api.example.com',
        users: '/users',
        products: '/products',
        orders: '/orders'
    };

    // Test environment URLs
    public static readonly TEST_URLS = {
        dev: 'http://dev.example.com',
        staging: 'http://staging.example.com',
        production: 'https://example.com'
    };

    // Timeout values
    public static readonly TIMEOUTS = {
        short: 5000,
        medium: 15000,
        long: 30000,
        veryLong: 60000
    };

    // Browser configurations
    public static readonly BROWSER_CONFIG = {
        viewport: { width: 1920, height: 1080 },
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        locale: 'en-US',
        timezoneId: 'America/New_York'
    };
}
