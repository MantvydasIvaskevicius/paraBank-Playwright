import { test, expect } from '@playwright/test';
const helper = require('../helper/helpers');
import selectors from '../support/selectors';

test.describe('ParaBank homePage functionalities', () => {
    test.beforeEach(async ({ page }) => {
        await helper.verifyHomePageLoads(page);
    });
    test('Verifying the top left column contains 5 elements', async ({ page }) => {
        await page.locator(selectors.leftMenu).isVisible();
        const leftMenuItems = await page.locator(selectors.leftMenu).locator('li').count();
        expect(leftMenuItems).toBe(6);
    });

    test('Verify ATM Services section displays correct options', async ({ page }) => {
        const atmServicesItems = await page.locator(selectors.services).locator('li').count();
        expect(atmServicesItems).toBe(5);
        const expectedTexts = ['ATM Services', 'Withdraw Funds', 'Transfer Funds', 'Check Balances', 'Make Deposits'];
        for (let index = 0; index < expectedTexts.length; index++) {
            const item = page.locator(selectors.services).locator('li').nth(index);
            await expect(item).toHaveText(expectedTexts[index]);
            await item.hover();
            await expect(item).toHaveCSS('cursor', 'auto');
        }
    });

    test('Verify Online Services section displays correct options', async ({ page }) => {
        const onlineServicesItems = await page.locator(selectors.onlineServices).locator('li').count();
        expect(onlineServicesItems).toBe(4);
        const expectedTexts = ['Online Services', 'Bill Pay', 'Account History', 'Transfer Funds'];
        for (let index = 0; index < expectedTexts.length; index++) {
            const item = page.locator(selectors.onlineServices).locator('li').nth(index);
            await expect(item).toHaveText(expectedTexts[index]);
            await item.hover();
            await expect(item).toHaveCSS('cursor', 'auto');
        }
    });

    test('Verify the third column contains 4 elements', async ({ page }) => {
        const eventItems = await page.locator(selectors.events).locator('li').count();
        expect(eventItems).toBe(4);
    });

    test('Verify second "Read More" link navigates to expected page', async ({ page }) => {
        await page.locator(selectors.secondReadme).click();
        await expect(page.locator(selectors.secondReadmeTitle)).toBeVisible();
        await expect(page.locator(selectors.secondReadmeTitle)).toHaveText('ParaBank News');
    });

    test('Verify "Register" link is visible', async ({ page }) => {
        await expect(page.locator('text=Register')).toBeVisible();
    });

    test('Verify clicking "Register" link navigates to the registration page', async ({ page }) => {
        await page.locator('text=Register').click();
        await helper.registrationPage(page);
    });

});

test.describe('Successful Registration', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://parabank.parasoft.com/parabank/register.htm');
    });

    test('Verify registration page displays the "Signing up is easy!" message', async ({ page }) => {
        await expect(page.locator('h1')).toHaveText('Signing up is easy!');
    });

    test('Successfully create a user account with valid inputs', async ({ page }) => {
        await helper.fillRegistrationForm(page);
    });

    test('Show error when first name is missing in registration form', async ({ page }) => {
        await helper.registrationNoName(page);
    });

    test('Show error when password did not match in registration form', async ({ page }) => {
        await helper.registrationWithWrongPass(page);
    });

    test('Show error when using a pre-registered username', async ({ page }) => {
        await helper.registrationAlreadyExist(page);
    });

    test('Registering with an extremely long username or password', async ({ page }) => {
        await helper.longRegForm(page);
    });

});

test.describe('Login User with Correct Email and Password', () => {

    test.beforeEach(async ({ page }) => {

        await page.goto('https://parabank.parasoft.com/parabank/index.htm');
        await expect(page).toHaveURL(/parabank/);
        await expect(page.locator('body')).toBeVisible();

    });


    test('Verify successful login with valid credentials', async ({ page }) => {
        await helper.logIn(page);

    });

    test('Verify error message appears for incorrect email and password', async ({ page }) => {

        await expect(page.locator("div[id='leftPanel'] h2")).toBeVisible();
        await expect(page.locator("div[id='leftPanel'] h2")).toHaveText('Customer Login');


        await helper.wrongLogIn(page);
        const errorMessage = page.locator('.error');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveText('The username and password could not be verified.');
    });

    test('Successful login and logout', async ({ page }) => {

        await helper.logIn(page);
        await expect(page).toHaveURL(/parabank/);
        await expect(page.locator('body')).toBeVisible();
    });

});

test.describe('User Registration Security Tests', () => {
    test('should show an error message when the password does not meet complexity requirements', async ({ page }) => {
        await page.goto('https://parabank.parasoft.com/parabank/register.htm');
        await helper.weakPassword(page);
    });
    test('should not allow SQL injection in the username or password fields', async ({ page }) => { 
        await page.goto('https://parabank.parasoft.com/parabank/register.htm');
        

        await page.fill(selectors.logInInput, "admin' OR 1=1 --");
        await page.fill(selectors.passwordInput, 'ValidPassword123!');
        await page.click(selectors.LogInBtn);
        
        await page.waitForTimeout(2000);
    });
    
    test('should show an error when passwords do not match', async ({ page }) => {
        await page.goto('https://parabank.parasoft.com/parabank/register.htm');
    
        await helper.differentPassword(page);
    
 
        const errorMessage = page.locator("span[id='repeatedPassword.errors']");
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveText('Passwords did not match.');
    });

});

test.describe('Account services functions', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://parabank.parasoft.com/parabank/index.htm');
        await expect(page).toHaveURL(/parabank/);
        await expect(page.locator('body')).toBeVisible();
    });

    test('Verify successful bill payment process', async ({ page }) => {
        await helper.logIn(page);

        await page.click(selectors.billPay);
        await expect(page.locator(selectors.billPayVsbl)).toBeVisible();
        await expect(page.locator(selectors.billPayVsbl)).toHaveText('Bill Payment Service');

        await helper.payeeInfo(page);

        await expect(page.locator(selectors.payCompletevsbl)).toBeVisible();
        await expect(page.locator(selectors.payCompletevsbl)).toHaveText('Bill Payment Complete');

        await page.click(selectors.accOverview);
        await expect(page.locator(selectors.accOverviewVsbl)).toBeVisible();
        await expect(page.locator(selectors.accOverviewVsbl)).toHaveText('Accounts Overview');
    });

    test('Try to pay a bill without entering payee details.', async ({ page }) => {
        await helper.logIn(page);

        await page.click(selectors.billPay);
        await expect(page.locator(selectors.billPayVsbl)).toBeVisible();
        await expect(page.locator(selectors.billPayVsbl)).toHaveText('Bill Payment Service');

        await helper.missingPayeeInfo(page);

        await expect(page.locator(selectors.payeerror)).toBeVisible();
        await expect(page.locator(selectors.payeerror)).toHaveText("Payee name is required.");

        await expect(page.locator(selectors.accNmrError)).toBeVisible();
        await expect(page.locator(selectors.accNmrError)).toHaveText("Account number is required.");
    });

    test('Open a new "CHECKING" account successfully', async ({ page }) => {
        await helper.logIn(page);

        await page.click(selectors.newAcc);
        await expect(page.locator(selectors.newAccVsbl)).toBeVisible();
        await expect(page.locator(selectors.newAccVsbl)).toHaveText('Open New Account');

        await page.selectOption(selectors.savings, { label: 'CHECKING' });
        await page.waitForTimeout(1000);

        await page.click(selectors.openNewAccBtn);

        await expect(page.locator(selectors.successMsg)).toBeVisible();
        await expect(page.locator(selectors.successMsg)).toHaveText('Congratulations, your account is now open.');
    });

    test('Transfer money between user accounts', async ({ page }) => {
        await helper.logIn(page);

        await page.click(selectors.tranfersFunds);
        await expect(page.locator(selectors.tranfersFundsVsbl)).toBeVisible();
        await page.waitForTimeout(2000);

        await page.fill(selectors.amount, "1");
        await page.click(selectors.tranferBtn);

        await expect(page.locator(selectors.sendAmount)).toBeVisible();
        await expect(page.locator(selectors.fromAcc)).toBeVisible();
        await expect(page.locator(selectors.toAcc)).toBeVisible();
    });

    test('Attempt to transfer more money than available balance.', async ({ page }) => {
        await helper.logIn(page);

        await page.click(selectors.tranfersFunds);
        await expect(page.locator(selectors.tranfersFundsVsbl)).toBeVisible();

        await page.waitForTimeout(2000);

        await page.fill(selectors.amount, "111223111111");
        await page.click(selectors.tranferBtn);

        await expect(page.locator(selectors.errormsg)).toBeVisible();
    });

    test('Update address, city, state, and zip code successfully', async ({ page }) => {
        await helper.logIn(page);

        await page.click(selectors.updateContact);
        await expect(page.locator(selectors.updatePrflVsbl)).toBeVisible();
        await expect(page.locator(selectors.updatePrflVsbl)).toHaveText('Update Profile');
        await page.waitForTimeout(1000);

        await helper.updateProfile(page);

        await expect(page.locator(selectors.successUpdt)).toBeVisible();
        await expect(page.locator(selectors.successUpdt)).toHaveText('Your updated address and phone number have been added to the system.');
    });

    test('Request credit successfully', async ({ page }) => {
        await helper.logIn(page);

        await page.click(selectors.reqLoanClk);

        await page.fill(selectors.amount, "2000");
        await page.fill(selectors.downPayment, "200");

        await page.click(selectors.applyNow);

        await expect(page.locator(selectors.loanResult)).toBeVisible();
        await expect(page.locator(selectors.loanResult)).toHaveText('Loan Request Processed');
    });

    test('Verify Customer Service Contact Form Submission', async ({ page }) => {
        await page.click(selectors.customerCareBtn);

        const title = await page.locator(selectors.customerVsbl);
        await expect(title).toBeVisible();
        await expect(title).toHaveText('Customer Care');

        await helper.customerCareForm(page);
        const successMessage = await page.locator(selectors.succesupportMsg);
        await expect(successMessage).toBeVisible();
        await expect(successMessage).toHaveText('A Customer Care Representative will be contacting you.');
    });

    test('Verify "Forgot Login Info" Functionality', async ({ page }) => {
        await page.click('a:has-text("Forgot login info?")');

        const title = await page.locator('.title');
        await expect(title).toBeVisible();
        await expect(title).toHaveText('Customer Lookup');

        await helper.findLogInInfo(page);

        const successMessage = await page.locator('body > div:nth-child(1) > div:nth-child(3) > div:nth-child(2) > p:nth-child(2)');
        await expect(successMessage).toBeVisible();
        await expect(successMessage).toHaveText('Your login information was located successfully. You are now logged in.');
    });
});
    test.describe('CAPTCHA Validation', () => { 
        ztest('should display CAPTCHA after multiple failed login attempts', async ({ page }) => {
        await page.goto('https://parabank.parasoft.com/parabank/index.htm');
        await expect(page).toHaveURL(/parabank/);
        await expect(page.locator('body')).toBeVisible();

        for (let i = 0; i < 5; i++) {
            await page.fill(selectors.logInInput, 'wrongUser35463456');
            await page.fill(selectors.passwordInput, 'wrongPass365356435');
            await page.click(selectors.LogInBtn);
            await page.waitForTimeout(1000);
        }

        const captcha = page.locator('#captcha');
        await expect(captcha).toBeVisible();
    });

    test('should prevent automated logins if CAPTCHA is present', async ({ page }) => {
        await page.goto('https://parabank.parasoft.com/parabank/index.htm');
        await expect(page).toHaveURL(/parabank/);
        await expect(page.locator('body')).toBeVisible();

        for (let i = 0; i < 5; i++) {
            await page.fill(selectors.logInInput, 'wrongUser345635636');
            await page.fill(selectors.passwordInput, 'wrongPass35634653');
            await page.click(selectors.LogInBtn);
            await page.waitForTimeout(1000);
        }
        
        const captcha = page.locator('#captcha');
        await expect(captcha).toBeVisible();
        await page.fill('#captcha-input', 'fakeCaptchaValue');
        await page.click('button[type="submit"]');

        await expect(page.locator('text=Incorrect CAPTCHA')).toBeVisible();
    });
});