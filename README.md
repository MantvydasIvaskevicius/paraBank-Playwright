# 🏦 ParaBank Playwright Tests

![Playwright](https://img.shields.io/badge/Playwright-Testing-green) ![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow) ![Automated Testing](https://img.shields.io/badge/Automated-Testing-blue)

This project contains automated UI tests for the ParaBank website using [Playwright](https://playwright.dev/).

## 🚀 Getting Started

### 📌 Prerequisites
- Node.js (>= 16.x)
- Playwright installed globally or locally in the project

### 📥 Installation
```sh
npm install
npx playwright install
```

## 🔥 Running Tests

### Run all tests
```sh
npx playwright test
```

### Run tests in headed mode (UI visible)
```sh
npx playwright test --ui
```

## 🛠️ Test Structure

### Implemented Functionalities 🏠
- ✅ Verify homepage loads correctly
- ✅ Verify left column contains expected elements
- ✅ Verify ATM Services and Online Services sections
- ✅ Verify registration page elements
- ✅ Register with valid details
- ❌ Error cases: missing name, mismatched passwords, existing username
- ✅ Successful login
- ❌ Invalid credentials handling
- ✅ Login & logout workflow
- 🛑 CAPTCHA validation after multiple failed attempts
- ✅ Bill payments
- ✅ Money transfers
- ✅ Open new accounts
- ✅ Profile updates

## 📂 File Structure
```
📁 tests
 ├── paraBank.spec.js
📁 helper
 ├── helpers.js
📁 support
 ├── selectors.js
📁 fixtures
 ├── parabank.json
```

## 🔗 Resources
- [Playwright Documentation](https://playwright.dev/)
- [ParaBank Website](https://parabank.parasoft.com/parabank/index.htm)



