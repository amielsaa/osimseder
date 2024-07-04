const { selectors, urls, loginDetails } = require('../support/constants');
const puppeteer = require('puppeteer');

// BEFORE ALL - VERIFY STUDENT1 isnt in any group
describe('Volunteer Group Management', () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 50,
            args: [
                '--window-size=1620,980',
                '--window-position=0,0'
            ]
        });
        page = await browser.newPage();
        await page.setViewport({ width: 810, height: 980 });
    });

    afterAll(async () => {
        await browser.close();
    });

    beforeEach(async () => {
        await page.goto(urls.loginPage);
        await page.type(selectors.volunteer.login.emailInput, loginDetails.validVolunteer.email);
        await page.type(selectors.volunteer.login.passwordInput, loginDetails.validVolunteer.password);
        await page.locator(selectors.volunteer.login.loginButton).click();
        await page.waitForNavigation();
        await page.locator(selectors.volunteer.tabs.burgerMenu).click();
        await page.locator(selectors.volunteer.tabs.volunteer.groups).click();
        await page.waitForNavigation();
    });

    afterEach(async () => {
        await page.close();
        page = await browser.newPage();
    });

    
    it('should not see group 3', async () => {
        const group3Exists = await page.$(selectors.volunteer.groups.joinGroup3Button_invalid) !== null;
        expect(group3Exists).toBe(false);
    });

    it('should join group 1 successfully', async () => {
        await page.locator(selectors.volunteer.groups.joinGroup1Button).click();
        await page.locator(selectors.volunteer.groups.verifyJoinGroupButton).click();
        // Verify the user is now in group 1
        await page.waitForNavigation();
        expect(page.url()).toBe(urls.group1Page);
    });
    

    it('should see group 1 house', async () => {
        await page.locator(selectors.volunteer.tabs.burgerMenu).click();
        await page.locator(selectors.volunteer.tabs.volunteer.myGroup).click();
        // Verify the user is now in group 1
        await page.waitForNavigation();
        expect(page.url()).toBe(urls.group1Page);
        await page.click(selectors.volunteer.myGroup.navigateToHouse1);

        await page.waitForNavigation();
        expect(page.url()).toBe(urls.house1Page);
    });
    
    it('should not join group 2 as it is full', async () => {
        await page.locator(selectors.volunteer.groups.joinGroup2Button).click();
        await page.locator(selectors.volunteer.groups.verifyJoinGroupButton).click();
        // Verify the user is now in group 1
        expect(page.url()).toBe(urls.allGroups);
    });

});
