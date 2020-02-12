const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('sass',()=>{
    return gulp.src('src/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/css'));
});