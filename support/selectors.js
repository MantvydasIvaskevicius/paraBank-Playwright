const selectors = {
    homePageLogo: "[title='ParaBank']",
    leftMenu: ".leftmenu",
    services: "ul[class='services']",
    onlineServices: ".servicestwo",
    events:".events",
    firstReadmeTitle: "body > div:nth-child(1) > div:nth-child(3) > div:nth-child(2) > span:nth-child(4)",
    secondReadme: "ul.events",
    secondReadmeTitle: ".title",

    signUpTitle:".title",

    customerLogin:"div[id='leftPanel'] h2",
    logInInput:"input[name='username']",
    passwordInput:"input[name='password']",
    LogInBtn:"input[value='Log In']",

    billPay:"a[href='billpay.htm']",
    billPayVsbl:"div[id='billpayForm'] h1[class='title']",
    payCompletevsbl:"div[id='billpayResult'] h1[class='title']",
    accOverview:"a[href='overview.htm']",
    accOverviewVsbl:"a[href='overview.htm']",
    newAcc:"a[href='openaccount.htm']",
    newAccVsbl:"div[id='openAccountForm'] h1[class='title']",
    savings:"#type",
    openNewAccBtn:'input[type="button"]',
    successMsg:"body > div:nth-child(1) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > p:nth-child(2)",

    
    tranfersFundsVsbl:"div[id='showForm'] h1[class='title']",
    tranfersFunds:"a[href='transfer.htm']",
    amount:"#amount",
    toAccId:"#toAccountId",
    tranferBtn:"input[value='Transfer']",
    sendAmount:"#amountResult",
    toAcc:"#toAccountIdResult",
    fromAcc:"#fromAccountIdResult",

    accnmbr:"a[href='activity.htm?id=13344']",
    accDetailsVsbl:"div[id='accountDetails",
    transactionVsbl:"body > div:nth-child(1) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > table:nth-child(5) > tbody:nth-child(2) > tr:nth-child(1)",
    updateContact:"a[href='updateprofile.htm']",
    updatePrflVsbl:"div[id='updateProfileForm'] h1[class='title']",
 
    successUpdt:"div[id='updateProfileResult'] p",
    namereq:"#firstName-error",
    statereq:"#state-error",
    zipreq:"#zipCode-error",

    reqLoanClk:"a[href='requestloan.htm']",
    downPayment:"#downPayment",
    applyNow:"input[value='Apply Now']",
    loanResult:"div[id='requestLoanResult'] h1[class='title']",
    customerCareBtn:"body > div:nth-child(1) > div:nth-child(2) > ul:nth-child(2) > li:nth-child(3) > a:nth-child(1)",
    customerVsbl:".title",
    succesupportMsg:"body > div:nth-child(1) > div:nth-child(3) > div:nth-child(2) > p:nth-child(3)",
  
    lookup:".title",
    recoveraccsuccs:"body > div:nth-child(1) > div:nth-child(3) > div:nth-child(2) > p:nth-child(2)",
    logOut:"a[href='logout.htm']",
    errormsg:"div[id='showError'] p[class='error']",
    payeerror:"#validationModel-name",
    accNmrError:"#validationModel-account-empty",
    accNmrError2:"#validationModel-account-empty",
    loginUser:'input[name="customer.username"',
    loginPass:'input[name="customer.password"]',
    loginClick:'input[value="Register"]',
    homeLogin:"input[name='username']",
    homePass:"input[name='password']",
    homeBtn:"input[value='Log In']",
    submitClk:'button[type="submit"]'
};

export default selectors;