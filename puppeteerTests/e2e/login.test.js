const { selectors, urls, loginDetails } = require('../support/constants');
const puppeteer = require('puppeteer');

describe('User Login', () => {
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
        await page.goto(urls.loginPage);
    });

    afterEach(async () => {
        await page.close();
        page = await browser.newPage();
    });

    it('should show an error message for invalid credentials', async () => {
        let dialogAppeared = false;
        let dialogMessage = '';

        // Set up a listener for the dialog event
        page.once('dialog', async dialog => {
            dialogAppeared = true;
            dialogMessage = dialog.message();
            await dialog.accept();
        });

        // Perform login action with invalid credentials
        await page.type(selectors.login.emailInput, 'invalid@example.com');
        await page.type(selectors.login.passwordInput, 'invalidpassword');
        await page.click(selectors.login.loginButton);

        // Wait for a short period to ensure the dialog is triggered
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Assert that the dialog appeared and check its message
        expect(dialogAppeared).toBe(true);
        expect(dialogMessage).toBe('Failed to Login: Username or password aren\'t correct');
    });


    it('should show error messages for invalid email, missing email, and missing password', async () => {
        // 1. Enter empty email and empty password
        await page.click(selectors.login.emailInput);
        await page.click(selectors.login.passwordInput);
        await page.click(selectors.login.emailInput);

        // Wait for and check the missing email error message
        await page.waitForSelector('input[name="email"] ~ .error-message');
        let emailErrorMessage = await page.$eval('input[name="email"] ~ .error-message', el => el.textContent);
        expect(emailErrorMessage).toBe('אימייל נדרש');

        // Wait for and check the missing password error message
        await page.waitForSelector('input[name="password"] ~ .error-message');
        let passwordErrorMessage = await page.$eval('input[name="password"] ~ .error-message', el => el.textContent);
        expect(passwordErrorMessage).toBe('סיסמה נדרשת');

        // 2. Write invalid email to trigger the email error
        await page.type(selectors.login.emailInput, 'invalid'); // Type invalid email
        await page.click('body'); // Click elsewhere on the screen to trigger validation

        // Wait for and check the invalid email error message
        await page.waitForSelector('input[name="email"] ~ .error-message');
        emailErrorMessage = await page.$eval('input[name="email"] ~ .error-message', el => el.textContent);
        expect(emailErrorMessage).toBe('אימייל לא תקין');
    }, 60000); // Increase timeout to 60 seconds for this test


    it('should redirect to the signup page when the signup link is clicked', async () => {
        await page.click(selectors.login.signupLink);
        await page.waitForNavigation();
        expect(page.url()).toBe(urls.signup);
    });

    describe.each([
        ['Volunteer', loginDetails.validVolunteer],
        ['Team Owner', loginDetails.validTeamOwner],
        ['Area Manager', loginDetails.validAreaManager],
        ['City Manager', loginDetails.validCityManager],
        ['Admin', loginDetails.validAdmin]
    ])('Login tests for %s', (role, credentials) => {
        it(`should login successfully as ${role} with valid credentials`, async () => {
            await page.goto(urls.loginPage);

            // Wait for the email input to be visible
            await page.waitForSelector(selectors.login.emailInput);

            // Type in the email and password
            await page.type(selectors.login.emailInput, credentials.email);
            await page.type(selectors.login.passwordInput, credentials.password);

            // Click the login button
            await page.click(selectors.login.loginButton);

            // Wait for navigation to the home page
            await page.waitForNavigation();

            // Assert the URL is the home page
            expect(page.url()).toBe(urls.home);
        });
    });
});
