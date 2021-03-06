﻿var gulp = require('gulp');
var nightwatch = require('gulp-nightwatch');
var jslint = require('gulp-jslint');
var resemble = require('node-resemble-js');
var fs = require('fs');
var path = require('path');
var sequence = require('run-sequence');
var del = require('del');
var paths = require('./paths.json');
var glob = require('glob');

gulp.task('test', function (callback) {
    "use strict";
    return sequence('lint', 'deleteScreenshots', 'takeScreenshots', 'compare', callback);
});

gulp.task('deleteScreenshots', function () {
    "use strict";
    return del([paths.screenshots + '*.png*']);
});

gulp.task('takeScreenshots', function () {
    "use strict";
    return gulp.src('')
        .pipe(nightwatch({
            configFile: 'nightwatch.json',
            cliArgs: ['--env default,firefox,ie']
        }));
});

gulp.task('compare', function () {
    "use strict";
    fs.readdir(paths.screenshots, function (err, files) {
        if (err) {
            return console.error(err);
        }
        files.forEach(function (file) {
            if (path.extname(file).indexOf('.png') > -1) {
                fs.readdir(paths.baseline, function (err, baselineFiles) {
                    if (err) {
                        return console.error(err);
                    }
                    var screenshotRegex = new RegExp(paths.screenshotRegex);
                    if (baselineFiles.map(function (f) { return f.replace(screenshotRegex, ""); }).indexOf(file.replace(screenshotRegex, "")) <= -1) {
                        return console.error('Baseline does not exist!');
                    }
                    fs.readFile(paths.screenshots + file, function (err, data) {
                        if (err) {
                            return console.error(err);
                        }
                        glob(paths.baseline + file.replace(screenshotRegex, "") + ".*", function (err, files) {
                            if (err) {
                                return console.error(err);
                            }
                            fs.readFile(files[0], function (err, baselineData) {
                                if (err) {
                                    return console.error(err);
                                }
                                resemble(data).compareTo(baselineData).ignoreAntialiasing().onComplete(function (comparisonData) {
                                    if (comparisonData.misMatchPercentage > 0) {
                                        return console.error('The screenshot \'' + file + '\' does not match the baseline! difference: ' + comparisonData.misMatchPercentage);
                                    }
                                    return console.log('The screenshot \'' + file + '\' matches the baseline.');
                                });
                            });
                        });
                    });
                });
            }
        });
    });
});

gulp.task('baseline', ['lint'], function () {
    "use strict";
    return gulp.src('')
        .pipe(nightwatch({
            configFile: 'nightwatch.json',
            cliArgs: [ '--env baseline' ]
        }));
});

gulp.task('lint', function () {
    "use strict";
    return gulp.src('**/*.js')
        .pipe(jslint({
            node: true,
            evil: true,
            nomen: true,
            global: [],
            predef: [],
            reporter: 'default',
            errorsOnly: false
        }))
        .on('error', function (error) {
            console.error(String(error));
        });
});