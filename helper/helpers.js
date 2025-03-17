const { faker } = require('@faker-js/faker'); // Importing from @faker-js/faker
const fs = require('fs');
const { test, expect } = require('@playwright/test');

module.exports = {
  async verifyHomePageLoads(page) {
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    await expect(page).toHaveURL(/parabank/);
    await expect(page.locator('body')).toBeVisible();
  },

  async registrationPage(page) {
    await page.goto('https://parabank.parasoft.com/parabank/register.htm');
  },

  async homePageVisible(page) {
    await expect(page).toHaveURL(/parabank/);
    await expect(page.locator('body')).toBeVisible();
  },

  async fillRegistrationForm(page) {
    const password = faker.internet.password();
    const username = faker.internet.userName();

    await page.locator('input[name="customer.firstName"]').fill(faker.person.firstName());
    await page.locator('input[name="customer.lastName"]').fill(faker.person.lastName());
    await page.locator('input[name="customer.address.street"]').fill(faker.location.streetAddress());
    await page.locator('input[name="customer.address.city"]').fill(faker.location.city());
    await page.locator('input[name="customer.address.state"]').fill(faker.location.state());
    await page.locator('input[name="customer.address.zipCode"]').fill(faker.location.zipCode());
    await page.locator('input[name="customer.phoneNumber"]').fill(faker.phone.number());
    await page.locator('input[name="customer.ssn"]').fill(faker.string.numeric(9));

    await page.locator("input[id='customer.username']").fill(username);
    await page.locator("input[id='customer.password']").fill(password);
    await page.locator("input[id='repeatedPassword']").fill(password);

    await page.locator("input[value='Register']").click();
    await expect(page.locator('div#bodyPanel div h1.title')).toBeVisible();
    await expect(page.locator('div#bodyPanel div h1.title')).toHaveText('Welcome ' + username);

    await page.locator("a[href='logout.htm']").click();
    await expect(page).toHaveURL(/parabank/);
    await expect(page.locator('body')).toBeVisible();
  },

  async longRegForm(page) {
    const username = faker.internet.userName() + 'looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong';
    const password = faker.internet.password(20) + 'looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong';

    await page.locator('input[name="customer.firstName"]').fill(faker.person.firstName());
    await page.locator('input[name="customer.lastName"]').fill(faker.person.lastName());
    await page.locator('input[name="customer.address.street"]').fill(faker.location.streetAddress());
    await page.locator('input[name="customer.address.city"]').fill(faker.location.city());
    await page.locator('input[name="customer.address.state"]').fill(faker.location.state());
    await page.locator('input[name="customer.address.zipCode"]').fill(faker.location.zipCode());
    await page.locator('input[name="customer.phoneNumber"]').fill(faker.phone.number());
    await page.locator('input[name="customer.ssn"]').fill(faker.string.numeric(9));

    await page.locator("input[id='customer.username']").fill(username);
    await page.locator("input[id='customer.password']").fill(password);
    await page.locator("input[id='repeatedPassword']").fill(password);

    await page.locator("input[value='Register']").click();
  },

  async registrationNoName(page) {
    const password = faker.internet.password();
    const username = faker.internet.userName();

    await page.locator('input[name="customer.lastName"]').fill(faker.person.lastName());
    await page.locator('input[name="customer.address.street"]').fill(faker.location.streetAddress());
    await page.locator('input[name="customer.address.city"]').fill(faker.location.city());
    await page.locator('input[name="customer.address.state"]').fill(faker.location.state());
    await page.locator('input[name="customer.address.zipCode"]').fill(faker.location.zipCode());
    await page.locator('input[name="customer.phoneNumber"]').fill(faker.phone.number());
    await page.locator('input[name="customer.ssn"]').fill(faker.string.numeric(9));

    await page.locator("input[id='customer.username']").fill(username);
    await page.locator("input[id='customer.password']").fill(password);
    await page.locator("input[id='repeatedPassword']").fill(password);

    await page.locator("input[value='Register']").click();

    const errorMsg = await page.locator('table.form2 tbody tr').nth(0).locator('td').nth(2).locator('span');
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toHaveText('First name is required.');
  },

  async registrationWithWrongPass(page) {
    const password = faker.internet.password();
    const username = faker.internet.userName();

    await page.locator('input[name="customer.firstName"]').fill(faker.person.firstName());
    await page.locator('input[name="customer.lastName"]').fill(faker.person.lastName());
    await page.locator('input[name="customer.address.street"]').fill(faker.location.streetAddress());
    await page.locator('input[name="customer.address.city"]').fill(faker.location.city());
    await page.locator('input[name="customer.address.state"]').fill(faker.location.state());
    await page.locator('input[name="customer.address.zipCode"]').fill(faker.location.zipCode());
    await page.locator('input[name="customer.phoneNumber"]').fill(faker.phone.number());
    await page.locator('input[name="customer.ssn"]').fill(faker.string.numeric(9));

    await page.locator("input[id='customer.username']").fill(username);
    await page.locator("input[id='customer.password']").fill(password);
    await page.locator("input[id='repeatedPassword']").fill("badPass");

    await page.locator("input[value='Register']").click();

    const errorMsg = await page.locator('table.form2 tbody tr').nth(11).locator('td').nth(2).locator('span');
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toHaveText('Passwords did not match.');
  },

  async registrationAlreadyExist(page) {
    const userData = require('../parabank.json');  // Assuming this is a valid JSON file

    await page.locator('input[name="customer.firstName"]').fill(userData.firstName);
    await page.locator('input[name="customer.lastName"]').fill(userData.lastName);
    await page.locator('input[name="customer.address.street"]').fill(userData.address);
    await page.locator('input[name="customer.address.city"]').fill(userData.city);
    await page.locator('input[name="customer.address.state"]').fill(userData.state);
    await page.locator('input[name="customer.address.zipCode"]').fill(userData.zipCode);
    await page.locator('input[name="customer.phoneNumber"]').fill(userData.phoneNumber);
    await page.locator('input[name="customer.ssn"]').fill(userData.SSN);

    await page.locator("input[id='customer.username']").fill(userData.userName);
    await page.locator("input[id='customer.password']").fill(userData.userPassword);
    await page.locator("input[id='repeatedPassword']").fill(userData.userPassword);

    await page.locator("input[value='Register']").click();

    const errorMsg = await page.locator('table.form2 tbody tr').nth(9).locator('td').nth(2).locator('span');
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toHaveText('This username already exists.');
  },

  async logIn(page) {
    const userData = require('../fixtures/parabank.json');  // Assuming this is a valid JSON file

    await expect(page.locator("div[id='leftPanel'] h2")).toBeVisible();
    await expect(page.locator("div[id='leftPanel'] h2")).toHaveText('Customer Login');
    await page.fill("input[name='username']", userData.userName);
    await page.fill("input[name='password']", userData.userPassword);
    await page.click("input[value='Log In']");
  },

  async wrongLogIn(page) {
    await expect(page.locator("div[id='leftPanel'] h2")).toHaveText('Customer Login');
    await page.locator("input[name='username']").fill(faker.person.firstName());
    await page.locator("input[name='password']").fill(faker.internet.password());
    await page.locator("input[value='Log In']").click();
    await expect(page.locator('.error')).toBeVisible();
    await expect(page.locator('.error')).toHaveText('The username and password could not be verified.');
  },

  async payeeInfo(page) {
    const userData = require('../fixtures/parabank.json');  // Assuming this is a valid JSON file

    await page.locator("input[name='payee.name']").fill(userData.firstName);
    await page.locator("input[name='payee.address.street']").fill(userData.address);
    await page.locator("input[name='payee.address.city']").fill(userData.city);
    await page.locator("input[name='payee.address.state']").fill(userData.state);
    await page.locator("input[name='payee.address.zipCode']").fill(userData.zipCode);
    await page.locator('input[name="payee.phoneNumber"]').fill(userData.phoneNumber);

    await page.locator("input[name='payee.accountNumber']").fill(userData.accountNumber);
    await page.locator("input[name='verifyAccount']").fill(userData.verifyAccountNumber);
    await page.locator("input[name='amount']").fill(userData.amount);

    await page.locator("input[value='Send Payment']").click();
  },

  async missingPayeeInfo(page) {
    const userData = require('../fixtures/parabank.json');  // Assuming this is a valid JSON file

    await page.locator("input[name='payee.address.street']").fill(userData.address);
    await page.locator("input[name='payee.address.city']").fill(userData.city);
    await page.locator("input[name='payee.address.state']").fill(userData.state);
    await page.locator("input[name='payee.address.zipCode']").fill(userData.zipCode);
    await page.locator('input[name="payee.phoneNumber"]').fill(userData.phoneNumber);

    await page.locator("input[name='amount']").fill(userData.amount);

    await page.locator("input[value='Send Payment']").click();
  },
  
async updateProfile(page) {
    await page.fill("input[id='customer.address.street']", 'updatedAdress');
    await page.fill("input[id='customer.address.city']", 'updatedCity');
    await page.fill("input[id='customer.address.state']", 'updatedState');
    await page.fill("input[id='customer.address.zipCode']", '505165');
    await page.click("input[value='Update Profile']");
  },

  async updateProfile2(page) {
    await page.fill("input[id='customer.firstName']", 'updatedName2');
    await page.fill("input[id='customer.lastName']", 'updatedLastName2');
    await page.fill("input[id='customer.phoneNumber']", '55584452');
    await page.click("input[value='Update Profile']");
  },
  
  async emptyProfile(page) {
    await page.fill("input[id='customer.firstName']", '');
    await page.fill("input[id='customer.address.state']", '');
    await page.fill("input[id='customer.address.zipCode']", '');
    await page.click("input[value='Update Profile']");
  },
  
  async customerCareForm(page) {
    await page.fill("#name", 'Peter');
    await page.fill("#email", 'Peter123@gmail.com');
    await page.fill("#phone", '16516216516');
    await page.fill("#message", 'help me fix this website');
    await page.locator("input[value='Send to Customer Care']").click();
  },
  
  async findLogInInfo(page) {
    const userData = require('../fixtures/parabank.json');
    await page.fill("#firstName", userData.firstName);
    await page.fill('#lastName', userData.lastName);
    await page.fill("input[id='address.street']", userData.address);
    await page.fill("input[id='address.city']", userData.city);
    await page.fill("input[id='address.state']", userData.state);
    await page.fill("input[id='address.zipCode']", userData.zipCode);
    await page.fill('#ssn', userData.SSN);
    await page.click("input[value='Find My Login Info']");
  },
  
  async weakPassword(page) {
    await page.fill('input[name="customer.firstName"]', 'Tester');
    await page.fill('input[name="customer.lastName"]', 'User');
    await page.fill('input[name="customer.address.street"]', '123 Test St');
    await page.fill('input[name="customer.address.city"]', 'Test City');
    await page.fill('input[name="customer.address.state"]', 'TS');
    await page.fill('input[name="customer.address.zipCode"]', '12345');
    await page.fill('input[name="customer.phoneNumber"]', '123-456-7890');
    await page.fill('input[name="customer.ssn"]', '123-45-6789');
    await page.fill('input[name="customer.username"]', faker.internet.userName());
    await page.fill('input[name="customer.password"]', '12');
    await page.fill('input[name="repeatedPassword"]', '12');
    await page.click('input[value="Register"]');
  
    const passwordError = await page.locator('#passwordError');
    await expect(passwordError).toBeVisible();
    await expect(passwordError).toContainText('Password must be at least 8 characters long, contain at least one uppercase letter, and one number.');
  },
  
  async differentPassword(page) {

    await page.fill('input[name="customer.firstName"]', 'Tester');
    await page.fill('input[name="customer.lastName"]', 'User');
    await page.fill('input[name="customer.address.street"]', '123 Test St');
    await page.fill('input[name="customer.address.city"]', 'Test City');
    await page.fill('input[name="customer.address.state"]', 'TS');
    await page.fill('input[name="customer.address.zipCode"]', '12345');
    await page.fill('input[name="customer.phoneNumber"]', '123-456-7890');
    await page.fill('input[name="customer.ssn"]', '123-45-6789');
    await page.fill('input[name="customer.username"]', faker.internet.userName());
    await page.fill('input[name="customer.password"]', '12');
    await page.fill('input[name="repeatedPassword"]', '12qqwqw');
    await page.click('input[value="Register"]');
  }
  
};
