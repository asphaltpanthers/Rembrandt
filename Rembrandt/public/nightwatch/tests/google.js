module.exports = {
    'Demo test Google': function (browser) {
        "use strict";
        browser
            .maximizeWindow()
            .url('http://www.google.com')
            .waitForElementVisible('body', 1000)
            .saveScreenshot(browser.globals.screenshotPath + '/screenshot1.' + browser.globals.browserName + '.png')
            .setValue('input[type=text]', 'nightwatch')
            .waitForElementVisible('button[name=btnG]', 1000)
            .click('button[name=btnG]')
            .pause(1000)
            .assert.containsText('#main', 'Night Watch')
            .saveScreenshot(browser.globals.screenshotPath + '/screenshot2.' + browser.globals.browserName + '.png')
            .end();
    }
};