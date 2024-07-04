const { selectors, urls } = require('../support/constants');
const puppeteer = require('puppeteer');

describe('Staff Signup', () => {
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
        await page.type(selectors.staff.signup.emailInput, 'validstaff@example.com');
        await page.type(selectors.staff.signup.firstNameInput, 'John');
        await page.type(selectors.staff.signup.lastNameInput, 'Doe');
        await page.type(selectors.staff.signup.passwordInput, 'validP1!');
        await page.type(selectors.staff.signup.confirmPasswordInput, 'validP1!');
        await page.type(selectors.staff.signup.phoneNumberInput, '0505050505');
        await page.select(selectors.staff.signup.genderSelect, 'זכר');
        await page.select(selectors.staff.signup.roleSelect, 'מנהל עיר'); // Replace 'schoolOption' with the actual value of a valid school
        await page.select(selectors.staff.signup.citySelect, 'ירושלים');
    };

    it('should show a confirmation message after a successful signup', async () => {
        await fillFormWithValidDetails(page);
        await page.click(selectors.staff.signup.signupButton);

        await page.waitForSelector('.confirm-modal', { timeout: 30000 });
        const confirmationMessage = await page.$eval('.confirm-modal p', el => el.textContent);
        expect(confirmationMessage).toContain('validstaff@example.com');
    }, 30000);

    it('should show error messages for all required fields when hitting register with empty fields', async () => {
        await page.click(selectors.staff.signup.signupButton);

        await page.waitForSelector(selectors.staff.signup.errorMessage, { timeout: 30000 });

        const emailErrorMessage = await page.$eval(`${selectors.staff.signup.emailInput} ~ ${fieldErrorMessage}`, el => el.textContent);
        expect(emailErrorMessage).toBe('אימייל נדרש');

        const firstNameErrorMessage = await page.$eval(`${selectors.staff.signup.firstNameInput} ~ ${fieldErrorMessage}`, el => el.textContent);
        expect(firstNameErrorMessage).toBe('שם פרטי נדרש');

        const lastNameErrorMessage = await page.$eval(`${selectors.staff.signup.lastNameInput} ~ ${fieldErrorMessage}`, el => el.textContent);
        expect(lastNameErrorMessage).toBe('שם משפחה נדרש');

        const phoneNumberErrorMessage = await page.$eval(`${selectors.staff.signup.phoneNumberInput} ~ ${fieldErrorMessage}`, el => el.textContent);
        expect(phoneNumberErrorMessage).toBe('מספר נייד נדרש');

        const passwordErrorMessage = await page.$eval(`${ selectors.staff.signup.emailInput } ~ ${fieldErrorMessage}`, el => el.textContent);
        expect(passwordErrorMessage).toBe('סיסמה נדרשת');

        const confirmPasswordErrorMessage = await page.$eval(`${ selectors.staff.signup.emailInput } ~ ${fieldErrorMessage}`, el => el.textContent);
        expect(confirmPasswordErrorMessage).toBe('אישור סיסמה נדרש או סיסמאות לא תואמות');

        const genderErrorMessage = await page.$eval(`${ selectors.staff.signup.emailInput } ~ ${fieldErrorMessage}`, el => el.textContent);
        expect(genderErrorMessage).toBe('מין נדרש');

        const parentPhoneNumberErrorMessage = await page.$eval(`${selectors.staff.signup.roleSelect} ~ ${fieldErrorMessage}`, el => el.textContent);
        expect(parentPhoneNumberErrorMessage).toBe('תפקיד נדרש');

        const cityErrorMessage = await page.$eval(`${ selectors.staff.signup.cityInput } ~ ${fieldErrorMessage}`, el => el.textContent);
        expect(cityErrorMessage).toBe('עיר נדרשת');
    }, 10000);

}); 