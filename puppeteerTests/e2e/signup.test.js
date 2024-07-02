const { selectors, urls } = require('../support/constants');
const puppeteer = require('puppeteer');

describe('User Signup', () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 70
        });
        page = await browser.newPage();
    });

    afterAll(async () => {
        await browser.close();
    });

    beforeEach(async () => {
        await page.goto(urls.signup);
    });

    afterEach(async () => {
        await page.close();
        page = await browser.newPage();
    });

    const fillFormWithValidDetails = async (page) => {
        await page.type(selectors.signupVolunteer.emailInput, 'validvolunteer@example.com');
        await page.type(selectors.signupVolunteer.firstNameInput, 'John');
        await page.type(selectors.signupVolunteer.lastNameInput, 'Doe');
        await page.type(selectors.signupVolunteer.passwordInput, 'validP1!');
        await page.type(selectors.signupVolunteer.confirmPasswordInput, 'validP1!');
        await page.type(selectors.signupVolunteer.phoneNumberInput, '0505050505');
        await page.select(selectors.signupVolunteer.genderSelect, 'זכר');
        await page.type(selectors.signupVolunteer.parentNameInput, 'Jane Doe');
        await page.type(selectors.signupVolunteer.parentPhoneNumberInput, '0505050505');
        await page.select(selectors.signupVolunteer.citySelect, 'ירושלים');
        await page.select('select[name="school"]', 'אורט ירושלים'); // Replace 'schoolOption' with the actual value of a valid school
        await page.select(selectors.signupVolunteer.languageSelect, 'ספרדית');
        await page.type(selectors.signupVolunteer.freeText, 'No special requirements.');
    };

    it('should show a confirmation message after a successful signup', async () => {
        await fillFormWithValidDetails(page);
        await page.click(selectors.signupVolunteer.signupButton);

        await page.waitForSelector('.confirm-modal', { timeout: 30000 });
        const confirmationMessage = await page.$eval('.confirm-modal p', el => el.textContent);
        expect(confirmationMessage).toContain('validvolunteer@example.com');
    }, 30000);

    it('should show error messages for all required fields when hitting register with empty fields', async () => {
        await page.click(selectors.signupVolunteer.signupButton);

        await page.waitForSelector(selectors.signupVolunteer.errorMessage, { timeout: 30000 });

        const emailErrorMessage = await page.$eval('input[name="email"] ~ .error-message', el => el.textContent);
        expect(emailErrorMessage).toBe('אימייל נדרש');

        const firstNameErrorMessage = await page.$eval('input[name="firstName"] ~ .error-message', el => el.textContent);
        expect(firstNameErrorMessage).toBe('שם פרטי נדרש');

        const lastNameErrorMessage = await page.$eval('input[name="lastName"] ~ .error-message', el => el.textContent);
        expect(lastNameErrorMessage).toBe('שם משפחה נדרש');

        const phoneNumberErrorMessage = await page.$eval('input[name="phoneNumber"] ~ .error-message', el => el.textContent);
        expect(phoneNumberErrorMessage).toBe('מספר נייד נדרש');

        const passwordErrorMessage = await page.$eval('input[name="password"] ~ .error-message', el => el.textContent);
        expect(passwordErrorMessage).toBe('סיסמה נדרשת');

        const confirmPasswordErrorMessage = await page.$eval('input[name="confirmPassword"] ~ .error-message', el => el.textContent);
        expect(confirmPasswordErrorMessage).toBe('אישור סיסמה נדרש או סיסמאות לא תואמות');

        const genderErrorMessage = await page.$eval('select[name="gender"] ~ .error-message', el => el.textContent);
        expect(genderErrorMessage).toBe('מין נדרש');

        const parentNameErrorMessage = await page.$eval('input[name="parentName"] ~ .error-message', el => el.textContent);
        expect(parentNameErrorMessage).toBe('שם הורה נדרש');

        const parentPhoneNumberErrorMessage = await page.$eval('input[name="parentPhoneNumber"] ~ .error-message', el => el.textContent);
        expect(parentPhoneNumberErrorMessage).toBe('מספר הורה נדרש');

        const cityErrorMessage = await page.$eval('select[name="city"] ~ .error-message', el => el.textContent);
        expect(cityErrorMessage).toBe('בית ספר נדרש');
    }, 10000);

    /*
    describe('Field-specific invalid input tests', () => {
        const checkForErrorAndStayOnPage = async (fieldSelector, errorMessageSelector, errorMessage) => {
            const initialUrl = page.url();
            await page.click(selectors.signupVolunteer.signupButton);
            await page.waitForSelector(errorMessageSelector, { timeout: 30000 });
            const errorText = await page.$eval(errorMessageSelector, el => el.textContent);
            expect(errorText).toBe(errorMessage);
            const finalUrl = page.url();
            expect(finalUrl).toBe(initialUrl);
        };

        it('should prevent signup with invalid email', async () => {
            await fillFormWithValidDetails(page);
            await page.evaluate((selector) => {
                document.querySelector(selector).value = '';
            }, selectors.signupVolunteer.emailInput);
            await page.type(selectors.signupVolunteer.emailInput, 'invalid-email');
            await checkForErrorAndStayOnPage(selectors.signupVolunteer.emailInput, 'input[name="email"] ~ .error-message', 'אימייל לא תקין');
        }, 30000);

        it('should prevent signup with missing email', async () => {
            await fillFormWithValidDetails(page);
            await page.evaluate((selector) => {
                document.querySelector(selector).value = '';
            }, selectors.signupVolunteer.emailInput);
            await checkForErrorAndStayOnPage(selectors.signupVolunteer.emailInput, 'input[name="email"] ~ .error-message', 'אימייל נדרש');
        }, 30000);

        it('should prevent signup with invalid phone number', async () => {
            await fillFormWithValidDetails(page);
            await page.evaluate((selector) => {
                document.querySelector(selector).value = '';
            }, selectors.signupVolunteer.phoneNumberInput);
            await page.type(selectors.signupVolunteer.phoneNumberInput, 'invalid-phone');
            await checkForErrorAndStayOnPage(selectors.signupVolunteer.phoneNumberInput, 'input[name="phoneNumber"] ~ .error-message', 'מספר טלפון לא תקין');
        }, 30000);

        it('should prevent signup with short phone number', async () => {
            await fillFormWithValidDetails(page);
            await page.evaluate((selector) => {
                document.querySelector(selector).value = '';
            }, selectors.signupVolunteer.phoneNumberInput);
            await page.type(selectors.signupVolunteer.phoneNumberInput, '05');
            await checkForErrorAndStayOnPage(selectors.signupVolunteer.phoneNumberInput, 'input[name="phoneNumber"] ~ .error-message', 'מספר לא תקין');
        }, 30000);

        it('should prevent signup with missing phone number', async () => {
            await fillFormWithValidDetails(page);
            await page.evaluate((selector) => {
                document.querySelector(selector).value = '';
            }, selectors.signupVolunteer.phoneNumberInput);
            await checkForErrorAndStayOnPage(selectors.signupVolunteer.phoneNumberInput, 'input[name="phoneNumber"] ~ .error-message', 'מספר נייד נדרש');
        }, 30000);

        it('should prevent signup with missing password', async () => {
            await fillFormWithValidDetails(page);
            await page.evaluate((selector) => {
                document.querySelector(selector).value = '';
            }, selectors.signupVolunteer.passwordInput);
            await checkForErrorAndStayOnPage(selectors.signupVolunteer.passwordInput, 'input[name="password"] ~ .error-message', 'סיסמה נדרשת');
        }, 30000);

        it('should prevent signup with invalid password', async () => {
            await fillFormWithValidDetails(page);
            await page.evaluate((selector) => {
                document.querySelector(selector).value = '';
            }, selectors.signupVolunteer.passwordInput);
            await page.type(selectors.signupVolunteer.passwordInput, 'in');
            await checkForErrorAndStayOnPage(selectors.signupVolunteer.passwordInput, 'input[name="password"] ~ .error-message', 'סיסמה צריכה לכלול לפחות אות גדולה אחת, אות קטנה אחת, מספר אחד ולהיות באורך של 8 תווים לפחות');
        }, 30000);

    }); // Close the describe block
    */

}); // Close the main describe block