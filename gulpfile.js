var gulp = require('gulp');
var sass = require('gulp-sass');
var browserify = require('browserify')
var uglify = require('gulp-uglify')
var gulpif = require('gulp-if');
var rename = require('gulp-rename');
var minifyCss = require('gulp-minify-css');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var minimist = require('minimist');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

var config = require('./config.js');

var knownOptions = {
    string: 'env',
    default: {
        env: process.env.NODE_ENV || 'production'
    }
};

var options = minimist(process.argv.slice(2) || knownOptions);

// 处理完JS文件后返回流
gulp.task('js', function () {
    return gulp.src(config.jsFiles)
        //.pipe(browserify())
        .pipe(jshint())
        .pipe(jshint.reporter())
        .pipe(gulpif(options.env === 'production', uglify()))
        .pipe(gulp.dest(config.jsPath));
});

// 创建一个任务确保JS任务完成之前能够继续响应
// 浏览器重载
gulp.task('js-watch', ['js'], reload);

gulp.task('sassTest', function () { 
    gulp.src(config.sassFiles)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            remove:true
        }))
        .pipe(gulp.dest(config.cssPath))
        .pipe(gulpif(options.env === 'production', minifyCss()))
        .pipe(gulp.dest(config.minCssPath))
        //.pipe(browserSync.reload({stream: true}));
 });
 

gulp.task('default', ['server']);


gulp.task('server', function(){
    browserSync.init({
        server: {
            baseDir: config.baseDir
        }
    });

    // gulp.watch('./src/sass/*.scss', ['sassTest']);
    // gulp.watch('./dist/css/*.css').on('change', reload);
    // gulp.watch('./**/*.html').on('change', reload);
    // gulp.watch('./src/js/*.js', ['js-watch']);
    gulp.watch(config.sassFiles, ['sassTest']);
    gulp.watch(config.cssPath + '*.css').on('change', reload);
    gulp.watch(config.htmlFiles).on('change', reload);
    gulp.watch(config.jsFiles, ['js-watch']);
});