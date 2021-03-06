const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const del = require('del');

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
});

gulp.task('concat-css',function(){
    return gulp.src([paths.css + 'grid.css', paths.css + 'basic.css'])
    .pipe(concat('grid-basic.css'))
    .pipe(gulp.dest(paths.css))
    .pipe(browserSync.reload({
        stream: true
    }))
});

gulp.task('del-css',function(){
    return del(paths.css + '*.css');
});

gulp.task('del-mini-css',function(){
    return del(paths.css + '*.min.css');
});

gulp.task('mini-css', gulp.series('del-mini-css', function(){
    return gulp.src(globs.css)
    .pipe(cleanCSS())
    .pipe(rename({
            suffix: '.min'
        }))
    .pipe(gulp.dest(paths.css))
}));

gulp.task('css', gulp.series(['sass','concat-css','mini-css']));

function reload(done){
    browserSync.reload();
    done();
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
    gulp.watch(globs.html, (done)=>{reload(done)} );
    gulp.watch(globs.scss, gulp.series('css', (cb)=>{ reload(cb)}) );
}

gulp.task('watch',
        gulp.series( serve, watcher )
);

gulp.task('default',
    gulp.series(['css','watch'])
);
