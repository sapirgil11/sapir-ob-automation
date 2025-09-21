import { test, expect } from '@playwright/test';
import { PersonalDetailsFlow } from '../../../main/Flows/personalDetailsFlow';

test.use({ viewport: { width: 1880, height: 798 } });

test.describe('👤 Personal Details Flow Tests', () => {
    
    test('🎯 Complete Personal Details Flow', async ({ page }) => {
        test.setTimeout(300000); // 5 minutes timeout
        console.log('🚀 Starting Complete Personal Details Flow Test...');

        const personalDetailsFlow = new PersonalDetailsFlow(page);

        // Navigate to personal details page
        const navigated = await personalDetailsFlow.navigateToPersonalDetails('Filler1234');
        expect(navigated).toBe(true);

        // Verify page elements
        const elementsVisible = await personalDetailsFlow.verifyPageElements();
        expect(elementsVisible).toBe(true);

        // Complete the personal details flow
        const completed = await personalDetailsFlow.completePersonalDetailsFlow('John', 'Doe');
        expect(completed).toBe(true);

        console.log('✅ Complete Personal Details Flow Test passed!');
    });

    test('🧪 Personal Details Validation Tests', async ({ page }) => {
        test.setTimeout(300000); // 5 minutes timeout
        console.log('🚀 Starting Personal Details Validation Tests...');

        const personalDetailsFlow = new PersonalDetailsFlow(page);

        // Navigate to personal details page
        const navigated = await personalDetailsFlow.navigateToPersonalDetails('Filler1234');
        expect(navigated).toBe(true);

        // Test all validation scenarios
        const validationPassed = await personalDetailsFlow.testAllValidations();
        expect(validationPassed).toBe(true);

        console.log('✅ Personal Details Validation Tests passed!');
    });

    test('🔧 Personal Details Error Handling Tests', async ({ page }) => {
        test.setTimeout(300000); // 5 minutes timeout
        console.log('🚀 Starting Personal Details Error Handling Tests...');

        const personalDetailsFlow = new PersonalDetailsFlow(page);

        // Navigate to personal details page
        const navigated = await personalDetailsFlow.navigateToPersonalDetails('Filler1234');
        expect(navigated).toBe(true);

        // Test error clearing functionality
        const errorClearingPassed = await personalDetailsFlow.testErrorClearing();
        expect(errorClearingPassed).toBe(true);

        console.log('✅ Personal Details Error Handling Tests passed!');
    });

    test('📝 Personal Details Form Filling Tests', async ({ page }) => {
        test.setTimeout(300000); // 5 minutes timeout
        console.log('🚀 Starting Personal Details Form Filling Tests...');

        const personalDetailsFlow = new PersonalDetailsFlow(page);

        // Navigate to personal details page
        const navigated = await personalDetailsFlow.navigateToPersonalDetails('Filler1234');
        expect(navigated).toBe(true);

        // Test form filling
        const formFilled = await personalDetailsFlow.fillPersonalDetailsForm('Jane', 'Smith');
        expect(formFilled).toBe(true);

        // Verify form values
        const formValues = await personalDetailsFlow.getFormValues();
        expect(formValues.firstName).toBe('Jane');
        expect(formValues.lastName).toBe('Smith');

        // Check if form is ready for submission
        const isReady = await personalDetailsFlow.isFormReadyForSubmission();
        expect(isReady).toBe(true);

        console.log('✅ Personal Details Form Filling Tests passed!');
    });
});
