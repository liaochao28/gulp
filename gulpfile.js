var gulp = require('gulp');
var sass = require('gulp-sass');
var browserify = require('browserify')
//var uglify = require('uglify')
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

//var config = require('./config.js');


// 处理完JS文件后返回流
gulp.task('js', function () {
    return gulp.src('./src/js/*.js')
        //.pipe(browserify())
        //.pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
});

// 创建一个任务确保JS任务完成之前能够继续响应
// 浏览器重载
gulp.task('js-watch', ['js'], reload);


gulp.task('sassTest', function () { 
    console.log("sass改变");
    gulp.src('./src/sass/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            remove:true
        }))
        .pipe(gulp.dest('./dist/css'))
        //.pipe(browserSync.reload({stream: true}));
 });

gulp.task('default', ['server']);


gulp.task('server', function(){
    browserSync.init({
        server: {
            baseDir: './'
        }
    });

    gulp.watch('./src/sass/*.scss', ['sassTest']);
    gulp.watch('./dist/css/*.css').on('change', reload);
    gulp.watch('./**/*.html').on('change', reload);
    gulp.watch('./src/js/*.js', ['js-watch']);
});