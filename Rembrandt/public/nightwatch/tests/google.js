module.exports = {
    'Demo test Google': function (browser) {
        "use strict";
        browser
            .url('http://www.google.com')
            .waitForElementVisible('body', 1000)
            .saveScreenshot(browser.globals.screenshotPath + '/screenshot1.png')
            .setValue('input[type=text]', 'nightwatch')
            .waitForElementVisible('button[name=btnG]', 1000)
            .click('button[name=btnG]')
            .pause(1000)
            .assert.containsText('#main', 'Night Watch')
            .saveScreenshot(browser.globals.screenshotPath + '/screenshot2.png')
            .end();
    }
};