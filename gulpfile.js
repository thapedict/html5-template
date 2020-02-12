const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

const paths = {
    app: './app/',
    devCSS: './src/scss/',
    css: './app/css/',
    devJS: './src/js/',
    js: './app/js/'
};

const globs = {
    scss: paths.devCSS + '*.scss',
    css: paths.css + '*.css',
    html: paths.app + '*.html',
    js: paths.js + '*.js'
};

gulp.task('sass',function(){
    return gulp.src(paths.devCSS + '*.scss')
    .pipe(sass())
    .pipe(gulp.dest(paths.css))
    .pipe(browserSync.reload({
        stream: true
    }))
});

function reload(done){
    browserSync.reload();
    //done();
}

function serve( done ){
    browserSync.init({
        server: {
            baseDir: paths.app
        }
    });
    done();
};

function watcher() {
    gulp.watch(globs.html).on('change', reload);
    gulp.watch(globs.scss,gulp.series('sass'));
}

gulp.task('watch',
        gulp.series( serve, watcher )
);