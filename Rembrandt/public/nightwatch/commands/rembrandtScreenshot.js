var index = 1;

exports.command = function () {
    "use strict";
    this.saveScreenshot(this.globals.screenshotPath + '/screenshot' + index + '.' + this.globals.browserName + '.png');
    index = index + 1;
};