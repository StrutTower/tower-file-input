/// <binding ProjectOpened='watch-html' />
var gulp = require('gulp'),
    sass = require('gulp-dart-sass'),
    cleanCss = require('gulp-clean-css'),
    terser = require('gulp-terser'),
    rename = require('gulp-rename'),
    fileInclude = require('gulp-file-include'),
    htmlBeautify = require('gulp-html-beautify');

var options = {
    js: {
        src: 'src/tower-file-input.js',
        dest: 'dist'
    },
    css: {
        src: 'src/tower-file-input.scss',
        dest: 'dist'
    },
    html: {
        files: 'demo-templates/*.html',
        watchFiles: 'demo-templates/**/*.html',
        dest: 'demo'
    }
};

gulp.task('build-css', function () {
    return gulp.src(options.css.src)
        .pipe(sass())
        .pipe(gulp.dest(options.css.dest))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cleanCss())
        .pipe(gulp.dest(options.css.dest));
});

gulp.task('build-html', function () {
    return gulp.src(options.html.files)
        .pipe(fileInclude())
        .pipe(htmlBeautify())
        .pipe(gulp.dest(options.html.dest));
});

gulp.task('process-js', function () {
    return gulp.src(options.js.src)
        .pipe(gulp.dest(options.js.dest))
        .pipe(terser())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(options.js.dest));
});

gulp.task('watch-sass', function () {
    return gulp.watch(options.css.src, gulp.parallel('build-css'));
});

gulp.task('watch-html', function () {
    return gulp.watch(options.html.watchFiles, gulp.parallel(['build-html']));
});

gulp.task('default', gulp.parallel('build-css', 'process-js', 'build-html'));