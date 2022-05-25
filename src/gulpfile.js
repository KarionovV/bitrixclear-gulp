'use strict';

let autoprefixerList = [
    'Chrome >= 45',
    'Firefox ESR',
    'Edge >= 12',
    'Explorer >= 10',
    'iOS >= 9',
    'Safari >= 9',
    'Android >= 4.4',
    'Opera >= 30'
];

let path = {
    build: {
        js: '../js/',
        css: '../css/',
        img: '../images/'
    },
    src: {
        js: 'js/**/*.js',
        style: 'css/**/*.sass',
        img: 'images/**/*.*'
    },
    watch: {
        js: 'js/**/*.js',
        css: 'css/**/*.sass',
        img: 'images/**/*.*',
        css_build: '../css/*.css',
        js_build: '../js/*.js'
    }
};


const gulp = require('gulp');
const plumber = require('gulp-plumber');
const rigger = require('gulp-rigger');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const jpegrecompress = require('imagemin-jpeg-recompress');
const pngquant = require('imagemin-pngquant');
const rename = require('gulp-rename');
const concat = require('gulp-concat');

/* Tasks */
gulp.task('css', function () {
    return gulp.src(path.src.style)
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: autoprefixerList
        }))
        .pipe(concat('build.css'))
        .pipe(gulp.dest(path.build.css))
        .pipe(cleanCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(path.build.css))
});

// сбор js
gulp.task('js', function () {
    return gulp.src(path.src.js)
        .pipe(plumber())
        .pipe(rigger())
        .pipe(concat('build.js'))
        .pipe(gulp.dest(path.build.js))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest(path.build.js))
});

gulp.task('image', function () {
    return gulp.src(path.src.img)
        .pipe(cache(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            jpegrecompress({
                progressive: true,
                max: 90,
                min: 80
            }),
            pngquant(),
            imagemin.svgo({ plugins: [{ removeViewBox: false }] })
        ])))
        .pipe(gulp.dest(path.build.img));
});


gulp.task('cache:clear', function () {
    cache.clearAll();
});


gulp.task('watch', function () {
    gulp.watch(path.watch.css, gulp.series('css'));
    gulp.watch(path.watch.js, gulp.series('js'));
    gulp.watch(path.watch.img, gulp.series('image'));
});


gulp.task('default', gulp.series(
    gulp.parallel('watch')
));
