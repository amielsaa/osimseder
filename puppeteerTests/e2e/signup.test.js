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
        await page.type(selectors.volunteer.signup.emailInput, 'validvolunteer@example.com');
        await page.type(selectors.volunteer.signup.firstNameInput, 'John');
        await page.type(selectors.volunteer.signup.lastNameInput, 'Doe');
        await page.type(selectors.volunteer.signup.passwordInput, 'validP1!');
        await page.type(selectors.volunteer.signup.confirmPasswordInput, 'validP1!');
        await page.type(selectors.volunteer.signup.phoneNumberInput, '0505050505');
        await page.select(selectors.volunteer.signup.genderSelect, 'זכר');
        await page.type(selectors.volunteer.signup.parentNameInput, 'Jane Doe');
        await page.type(selectors.volunteer.signup.parentPhoneNumberInput, '0505050505');
        await page.select(selectors.volunteer.signup.citySelect, 'ירושלים');
        await page.select('select[name="school"]', 'אורט ירושלים'); // Replace 'schoolOption' with the actual value of a valid school
        await page.select(selectors.volunteer.signup.languageSelect, 'ספרדית');
        await page.type(selectors.volunteer.signup.freeText, 'No special requirements.');
    };

    it('should show a confirmation message after a successful signup', async () => {
        await fillFormWithValidDetails(page);
        await page.click(selectors.volunteer.signup.signupButton);

        await page.waitForSelector('.confirm-modal', { timeout: 30000 });
        const confirmationMessage = await page.$eval('.confirm-modal p', el => el.textContent);
        expect(confirmationMessage).toContain('validvolunteer@example.com');
    }, 30000);

    it('should show error messages for all required fields when hitting register with empty fields', async () => {
        await page.click(selectors.volunteer.signup.signupButton);

        await page.waitForSelector(selectors.volunteer.signup.errorMessage, { timeout: 30000 });

        const emailErrorMessage = await page.$eval(`${selectors.volunteer.signup.emailInput} ~ ${fieldErrorMessage}`, el => el.textContent);
        expect(emailErrorMessage).toBe('אימייל נדרש');

        const firstNameErrorMessage = await page.$eval(`${selectors.volunteer.signup.firstNameInput} ~ ${fieldErrorMessage}`, el => el.textContent);
        expect(firstNameErrorMessage).toBe('שם פרטי נדרש');

        const lastNameErrorMessage = await page.$eval(`${selectors.volunteer.signup.lastNameInput} ~ ${fieldErrorMessage}`, el => el.textContent);
        expect(lastNameErrorMessage).toBe('שם משפחה נדרש');

        const phoneNumberErrorMessage = await page.$eval(`${selectors.volunteer.signup.phoneNumberInput} ~ ${fieldErrorMessage}`, el => el.textContent);
        expect(phoneNumberErrorMessage).toBe('מספר נייד נדרש');

        const passwordErrorMessage = await page.$eval(`${ selectors.volunteer.signup.emailInput } ~ ${fieldErrorMessage}`, el => el.textContent);
        expect(passwordErrorMessage).toBe('סיסמה נדרשת');

        const confirmPasswordErrorMessage = await page.$eval(`${ selectors.volunteer.signup.emailInput } ~ ${fieldErrorMessage}`, el => el.textContent);
        expect(confirmPasswordErrorMessage).toBe('אישור סיסמה נדרש או סיסמאות לא תואמות');

        const genderErrorMessage = await page.$eval(`${ selectors.volunteer.signup.emailInput } ~ ${fieldErrorMessage}`, el => el.textContent);
        expect(genderErrorMessage).toBe('מין נדרש');

        const parentNameErrorMessage = await page.$eval(`${ selectors.volunteer.signup.emailInput } ~ ${fieldErrorMessage}`, el => el.textContent);
        expect(parentNameErrorMessage).toBe('שם הורה נדרש');

        const parentPhoneNumberErrorMessage = await page.$eval(`${selectors.volunteer.signup.emailInput} ~ ${fieldErrorMessage}`, el => el.textContent);
        expect(parentPhoneNumberErrorMessage).toBe('מספר הורה נדרש');

        const cityErrorMessage = await page.$eval(`${ selectors.volunteer.signup.emailInput } ~ ${fieldErrorMessage}`, el => el.textContent);
        expect(cityErrorMessage).toBe('בית ספר נדרש');
    }, 10000);

}); 