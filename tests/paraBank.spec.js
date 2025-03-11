const selectors = {
    homePageLogo: "[title='ParaBank']",
    leftMenu: ".leftmenu",
    services: "ul[class='services']",
    onlineServices: ".servicestwo",
    events: ".events",
    firstReadmeTitle: "body > div:nth-child(1) > div:nth-child(3) > div:nth-child(2) > span:nth-child(4)",
    secondReadme: "ul.events",
    secondReadmeTitle: ".title",

    signUpTitle: ".title",

    customerLogin: "div[id='leftPanel'] h2",
    logInInput: "input[name='username']",
    passwordInput: "input[name='password']",
    LogInBtn: "input[value='Log In']",

    billPay: "a[href='billpay.htm']",
    billPayVsbl: "div[id='billpayForm'] h1[class='title']",
    payCompletevsbl: "div[id='billpayResult'] h1[class='title']",
    accOverview: "a[href='overview.htm']",
    accOverviewVsbl: "a[href='overview.htm']",
    newAcc: "a[href='openaccount.htm']",
    newAccVsbl: "div[id='openAccountForm'] h1[class='title']",
    savings: "#type",
    openNewAccBtn: 'input[type="button"]',
    successMsg: "body > div:nth-child(1) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > p:nth-child(2)",

    tranfersFundsVsbl: "div[id='showForm'] h1[class='title']",
    tranfersFunds: "a[href='transfer.htm']",
    amount: "#amount",
    toAccId: "#toAccountId",
    tranferBtn: "input[value='Transfer']",
    sendAmount: "#amountResult",
    toAcc: "#toAccountIdResult",
    fromAcc: "#fromAccountIdResult",

    accnmbr: "a[href='activity.htm?id=13344']",
    accDetailsVsbl: "div[id='accountDetails",
    transactionVsbl: "body > div:nth-child(1) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > table:nth-child(5) > tbody:nth-child(2) > tr:nth-child(1)",
    updateContact: "a[href='updateprofile.htm']",
    updatePrflVsbl: "div[id='updateProfileForm'] h1[class='title']",

    successUpdt: "div[id='updateProfileResult'] p",
    namereq: "#firstName-error",
    statereq: "#state-error",
    zipreq: "#zipCode-error",

    reqLoanClk: "a[href='requestloan.htm']",
    downPayment: "#downPayment",
    applyNow: "input[value='Apply Now']",
    loanResult: "div[id='requestLoanResult'] h1[class='title']",
    customerCareBtn: "body > div:nth-child(1) > div:nth-child(2) > ul:nth-child(2) > li:nth-child(3) > a:nth-child(1)",
    customerVsbl: ".title",
    succesupportMsg: "body > div:nth-child(1) > div:nth-child(3) > div:nth-child(2) > p:nth-child(3)",

    lookup: ".title",
    recoveraccsuccs: "body > div:nth-child(1) > div:nth-child(3) > div:nth-child(2) > p:nth-child(2)",
    logOut: "a[href='logout.htm']",
    errormsg: "div[id='showError'] p[class='error']",
    payeerror: "#validationModel-name",
    accNmrError: "#validationModel-account-empty",
    accNmrError2: "#validationModel-account-empty",
};

import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('ParaBank homePage functionalities', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://parabank.parasoft.com/parabank/index.htm');
        await expect(page).toHaveURL(/parabank/);
        await expect(page.locator('body')).toBeVisible();
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

    // test('Verify first "Read More" link navigates to expected page', async ({ page }) => {
    //     await page.locator('a', { hasText: 'Read More' }).click();
    //     await expect(page.locator(selectors.firstReadmeTitle)).toBeVisible();
    //     await expect(page.locator(selectors.firstReadmeTitle)).toHaveText('Available Bookstore SOAP services:');
    // });

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
    });

});

test.describe('Successful Registration', () => {

    test.beforeEach(async ({ page }) => {
        
        await page.goto('https://parabank.parasoft.com/parabank/register.htm');
    });

    test('Verify registration page displays the "Signing up is easy!" message', async ({ page }) => {
     
        await expect(page.locator(selectors.signUpTitle)).toBeVisible();
        await expect(page.locator(selectors.signUpTitle)).toHaveText('Signing up is easy!');

    });
    test('Successfully create a user account with valid inputs', async ({ page }) => {
        const password = faker.internet.password();
        const username = faker.internet.userName();

        await page.fill('input[name="customer.firstName"]', faker.person.firstName());
        await page.fill('input[name="customer.lastName"]', faker.person.lastName());
        await page.fill('input[name="customer.address.street"]', faker.location.streetAddress());
        await page.fill('input[name="customer.address.city"]', faker.location.city());
        await page.fill('input[name="customer.address.state"]', faker.location.state());
        await page.fill('input[name="customer.address.zipCode"]', faker.location.zipCode());
        await page.fill('input[name="customer.phoneNumber"]', faker.phone.number());
        await page.fill('input[name="customer.ssn"]', faker.string.numeric(9));

        await page.fill("input[id='customer.username']", username);
        await page.fill("input[id='customer.password']", password);
        await page.fill("input[id='repeatedPassword']", password);

        await page.click("input[value='Register']");
        const welcomeText = await page.locator('div#bodyPanel div').nth(1).locator('h1.title');
        await expect(welcomeText).toBeVisible();
        await expect(welcomeText).toHaveText('Welcome ' + username);

        await page.click("a[href='logout.htm']");
        await expect(page).toHaveURL(/parabank/);
        await expect(page.locator('body')).toBeVisible();
    });



    test('Show error when first name is missing in registration form', async ({ page }) => {
        const password = faker.internet.password();
        const username = faker.internet.userName();

      
        // page.fill('input[name="customer.firstName"]', faker.person.firstName()); // First name is omitted
        await page.fill('input[name="customer.lastName"]', faker.person.lastName());
        await page.fill('input[name="customer.address.street"]', faker.location.streetAddress());
        await page.fill('input[name="customer.address.city"]', faker.location.city());
        await page.fill('input[name="customer.address.state"]', faker.location.state());
        await page.fill('input[name="customer.address.zipCode"]', faker.location.zipCode());
        await page.fill('input[name="customer.phoneNumber"]', faker.phone.number());
        await page.fill('input[name="customer.ssn"]', faker.string.numeric(9));

        await page.fill("input[id='customer.username']", username);
        await page.fill("input[id='customer.password']", password);
        await page.fill("input[id='repeatedPassword']", password);

    
        await page.click("input[value='Register']");

      
        const errorMessage = await page.locator('table.form2 tbody tr').nth(0).locator('td').nth(2).locator('span');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveText('First name is required.');
    });



    test('Show error when password did not match in registration form', async ({ page }) => {
        const password = faker.internet.password();
        const username = faker.internet.userName();

    
        await page.fill('input[name="customer.firstName"]', faker.person.firstName());
        await page.fill('input[name="customer.lastName"]', faker.person.lastName());
        await page.fill('input[name="customer.address.street"]', faker.location.streetAddress());
        await page.fill('input[name="customer.address.city"]', faker.location.city());
        await page.fill('input[name="customer.address.state"]', faker.location.state());
        await page.fill('input[name="customer.address.zipCode"]', faker.location.zipCode());
        await page.fill('input[name="customer.phoneNumber"]', faker.phone.number());
        await page.fill('input[name="customer.ssn"]', faker.string.numeric(9));

        await page.fill("input[id='customer.username']", username);
        await page.fill("input[id='customer.password']", password);
        await page.fill("input[id='repeatedPassword']", "badPass");

  
        await page.click("input[value='Register']");


        const errorMessage = await page.locator('table.form2 tbody tr').nth(11).locator('td').nth(2).locator('span');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveText('Passwords did not match.');
    });



    test('Show error when using a pre-registered username', async ({ page }) => {
        const userData = require('../fixtures/parabank.json'); 

      
        await page.fill('input[name="customer.firstName"]', userData.firstName);
        await page.fill('input[name="customer.lastName"]', userData.lastName);
        await page.fill('input[name="customer.address.street"]', userData.address);
        await page.fill('input[name="customer.address.city"]', userData.city);
        await page.fill('input[name="customer.address.state"]', userData.state);
        await page.fill('input[name="customer.address.zipCode"]', userData.zipCode);
        await page.fill('input[name="customer.phoneNumber"]', userData.phoneNumber);
        await page.fill('input[name="customer.ssn"]', userData.SSN);

        await page.fill("input[id='customer.username']", userData.userName);
        await page.fill("input[id='customer.password']", userData.userPassword);
        await page.fill("input[id='repeatedPassword']", userData.userPassword);


        await page.click("input[value='Register']");

     
        const errorMessage = await page.locator('table.form2 tbody tr').nth(9).locator('td').nth(2).locator('span');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveText('This username already exists.');
    });



test('registering with an extremely long username or password.', async ({ page }) => {

    const username = faker.internet.userName() + 'looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong';
    const password = faker.internet.password(20) + 'looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong';

 
    await page.fill('input[name="customer.firstName"]', faker.person.firstName());
    await page.fill('input[name="customer.lastName"]', faker.person.lastName());
    await page.fill('input[name="customer.address.street"]', faker.location.streetAddress());
    await page.fill('input[name="customer.address.city"]', faker.location.city());
    await page.fill('input[name="customer.address.state"]', faker.location.state());
    await page.fill('input[name="customer.address.zipCode"]', faker.location.zipCode());
    await page.fill('input[name="customer.phoneNumber"]', faker.phone.number());
    await page.fill('input[name="customer.ssn"]', faker.string.numeric(9));

    await page.fill("input[id='customer.username']", username);
    await page.fill("input[id='customer.password']", password);
    await page.fill("input[id='repeatedPassword']", password);


    await page.click("input[value='Register']");

    await expect(page.locator("div[id='showError'] p[class='error']")).toBeVisible();


});

});

test.describe('Login User with Correct Email and Password', () => {

    test.beforeEach(async ({ page }) => {
  
        await page.goto('https://parabank.parasoft.com/parabank/index.htm');
        await expect(page).toHaveURL(/parabank/);
        await expect(page.locator('body')).toBeVisible();
    
    });


test('Verify successful login with valid credentials', async ({ page }) => {
    const userData = require('../fixtures/parabank.json');


    await expect(page.locator("div[id='leftPanel'] h2")).toBeVisible();
    await expect(page.locator("div[id='leftPanel'] h2")).toHaveText('Customer Login');


    await page.locator("input[name='username']").fill(userData.userName);
    await page.locator("input[name='password']").fill(userData.userPassword);
    await page.locator("input[value='Log In']").click();
});

test('Verify error message appears for incorrect email and password', async ({ page }) => {

    await expect(page.locator("div[id='leftPanel'] h2")).toBeVisible();
    await expect(page.locator("div[id='leftPanel'] h2")).toHaveText('Customer Login');

 
    await page.fill("input[name='username']", faker.person.firstName());
    await page.fill("input[name='password']", faker.internet.password());

 
    await page.click("input[value='Log In']");


    const errorMessage = page.locator('.error');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText('The username and password could not be verified.');
});

test('Successful login and logout', async ({ page }) => {
    const userData = require('../fixtures/parabank.json');

    await page.locator("input[name='username']").fill(userData.userName);
    await page.locator("input[name='password']").fill(userData.userPassword);
    await page.locator("input[value='Log In']").click();

    await page.locator("a[href='logout.htm']").click();


    await expect(page).toHaveURL(/parabank/);
    
   
    await expect(page.locator('body')).toBeVisible();
});



});

// test.describe('Login User with Correct Email and Password', () => {

//     test.beforeEach(async ({ page }) => {
  
//         await page.goto('https://parabank.parasoft.com/parabank/index.htm');
//         await expect(page).toHaveURL(/parabank/);
//         await expect(page.locator('body')).toBeVisible();
    
//     });










// });
