const { selectors, urls, loginDetails } = require('../support/constants');
const puppeteer = require('puppeteer');

describe('areaManager Open House', () => {
    let browser;
    let page;

    beforeAll(async () => {
        const screenWidth = 1420; // Your screen width
        const screenHeight = 880; // Your screen height

        browser = await puppeteer.launch({
            headless: false,
            slowMo: 80,
            args: [
                `--window-size=${screenWidth / 2},${screenHeight}`,
                `--window-position=0,0`
            ],
        });

        page = await browser.newPage();
        await page.setViewport({ width: screenWidth / 2, height: screenHeight });
    });

    afterAll(async () => {
        await browser.close();
    });

    beforeEach(async () => {
        await page.goto(urls.loginPage);
        await page.waitForSelector(selectors.login.emailInput);
        await page.type(selectors.login.emailInput, loginDetails.validAreaManager.email);
        await page.type(selectors.login.passwordInput, loginDetails.validAreaManager.password);
        await page.locator(selectors.login.loginButton).click();

        await page.waitForNavigation();
        expect(page.url()).toBe(urls.home);

        await page.locator(selectors.tabs.burgerMenu).click();

        await page.locator(selectors.tabs.staff.groups).click();

        await page.waitForNavigation();
        expect(page.url()).toBe(urls.allGroups);
    });

    afterEach(async () => {
        await page.close();
        page = await browser.newPage();
    });

    it('should insert the volunteer to a group if there is space', async () => {
        // Click the first group from the list
        await page.waitForSelector(selectors.group.joinGroupButton);
        await page.click(selectors.group.joinGroupButton);
        await page.waitForSelector('.confirmation-message'); // Adjust this selector based on actual confirmation message element
        const confirmationMessage = await page.$eval('.confirmation-message', el => el.textContent);
        expect(confirmationMessage).toContain('You have successfully joined the group');
    }, 60000);
    //
    //it('should not insert the volunteer to a group if there is no space', async () => {
    //    // Simulate no space scenario (this might require setting up test data for no space in a group)
    //    await page.waitForSelector(selectors.group.joinGroupButton);
    //    await page.click(selectors.group.joinGroupButton);
    //    await page.waitForSelector('.error-message'); // Adjust this selector based on actual error message element
    //    const errorMessage = await page.$eval('.error-message', el => el.textContent);
    //    expect(errorMessage).toContain('No space available in the group');
    //}, 60000);
});
