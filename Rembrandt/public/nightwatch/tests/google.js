module.exports = {
    'Demo test Google': function (browser) {
        "use strict";
        browser
            .maximizeWindow()
            .url('http://apinvent.com')
            .waitForElementVisible('#lblTrademark', 1000)
            .saveScreenshot(browser.globals.screenshotPath + '/screenshot1.' + browser.globals.browserName + '.png')
            .click('#lnkBlog')
            .window_handles(function (result) {
                var handle = result.value[1];
                browser.switchWindow(handle);
            })
            .waitForElementVisible("a[rel='category tag']", 1000)
            .saveScreenshot(browser.globals.screenshotPath + '/screenshot2.' + browser.globals.browserName + '.png')
            .end();
    }
};