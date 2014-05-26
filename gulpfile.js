var gulp = require('gulp'),
    jade = require('gulp-jade'),
    coffee = require('gulp-coffee'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    notify = require("gulp-notify"),
    csso = require('gulp-csso'),
    rename = require("gulp-rename"),
    newer = require('gulp-newer'),
    gzip = require('gulp-gzip'),
    clean = require('gulp-clean');

// Компиляция Jade
gulp.task('jade', function() {
    gulp.src('templates/**/*.jade')
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('./'))
        //.pipe(notify("Все Jade файлы скомпилированны!"));
});

// Компиляция Sass/Scss
gulp.task('scss', function() {
    gulp.src('scss/**/*.scss')//search files
        .pipe(newer('css'))
        .pipe(sass())
        .pipe(prefix("last 15 version")) //autoprefix
        .pipe(gulp.dest('css'));//output folder
//        .pipe(notify("Scss compile!"));
});

//css оптимизация
gulp.task('css-opt', function() {
    gulp.src('css/main.css')
        .pipe(rename("main.min.css"))
        .pipe(csso()) // css min
        .pipe(gulp.dest("css"));
//        .pipe(notify("Css min!"));
// Если в Brackets включен плагин копиляции Sass
//    gulp.src('scss/*_*.css*', {read: false})
//        .pipe(clean());
//        .pipe(notify("Scss folder clean!"));
});

//gzip css
gulp.task('gzip-css', function() {
    gulp.src('css/*.min.css')
    .pipe(gzip())
    .pipe(gulp.dest('css'));
//    .pipe(notify("Css gziped!"));
});

// Компиялция CoffeeScript
gulp.task('coffee', function() {
    gulp.src('coffee/**/*.coffee')
        .pipe(coffee()) //coffee compile
        .pipe(newer('js'))
        .pipe(gulp.dest('js'));
//        .pipe(notify("CoffeeScript compile!"))
});
//js оптимизация
gulp.task('js-opt', function() {
    gulp.src('js/*.js')
//        .pipe(newer('js'))
        .pipe(concat('main.min.js'))//js concat
//        .pipe(rename("main.min.js"))
        .pipe(uglify())//js min
        .pipe(gulp.dest('js/min'));
//        .pipe(notify("JS min!"));
});

//gzip js
gulp.task('gzip-js', function() {
    gulp.src('js/min/*.min.js')
        .pipe(gzip())
        .pipe(gulp.dest('js'));
//        .pipe(notify("Js gziped!"));
});

gulp.task('watch', function() {
    gulp.watch('templates/**/*.jade', ['jade']);
    gulp.watch('scss/**/*.scss', ['scss']);
    gulp.watch('css/main.css', ['css-opt']);
    gulp.watch('css/*.min.css', ['gzip-css']);
    gulp.watch('coffee/*.coffee', ['coffee']);
    gulp.watch('js/*.js', ['js-opt']);
    gulp.watch('js/min/*.min.js', ['gzip-js']);
});

gulp.task('default', ['jade', 'scss', 'css-opt', 'gzip-css' ,'coffee', 'js-opt', 'gzip-js', 'watch']); //run tasks
