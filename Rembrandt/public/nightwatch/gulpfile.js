var gulp = require('gulp');
var nightwatch = require('gulp-nightwatch');
var jslint = require('gulp-jslint');

gulp.task('test', ['lint'], function () {
    "use strict";
    return gulp.src('')
        .pipe(nightwatch({
            configFile: 'nightwatch.json'
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