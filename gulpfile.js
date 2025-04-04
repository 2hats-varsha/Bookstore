const gulp = require('gulp');
const fileinclude = require('gulp-file-include');
const browserSync = require('browser-sync').create();
const postcss = require('gulp-postcss');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const prettier = require('prettier');
const through2 = require('through2');

// File paths
const paths = {
    html: {
        src: 'src/**/*.html',
        dest: 'dist/'
    },
    css: {
        src: 'src/assets/css/style.css',
        dest: 'dist/assets/css/'
    },
    js: {
        src: 'src/assets/js/**/*.js',
        dest: 'dist/assets/js/'
    },
    assets: {
        src: ['src/assets/**/*', '!src/assets/css/**', '!src/assets/js/**'],
        dest: 'dist/assets/'
    },
    robots: {
        src: 'src/robots.txt',
        dest: 'dist/'
    }
};

// HTML task - compile HTML files with includes and format
function html() {
    return gulp.src(['src/*.html', '!src/layout/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(through2.obj(async function(file, enc, cb) {
            if (file.isBuffer()) {
                const formatted = await prettier.format(file.contents.toString(), {
                    parser: 'html',
                    printWidth: 120,
                    tabWidth: 2,
                    useTabs: false,
                    htmlWhitespaceSensitivity: 'css',
                    bracketSameLine: true
                });
                file.contents = Buffer.from(formatted);
            }
            cb(null, file);
        }))
        .pipe(gulp.dest(paths.html.dest))
        .pipe(browserSync.stream());
}

// CSS task - compile Tailwind CSS
function css() {
    const plugins = [
        require('postcss-import'),
        tailwindcss('./tailwind.config.js'),
        autoprefixer(),
        cssnano()
    ];

    return gulp.src(paths.css.src)
        .pipe(postcss(plugins))
        .pipe(gulp.dest(paths.css.dest))
        .pipe(browserSync.stream());
}

// JavaScript task - copy and process JS files
function javascript() {
    return gulp.src(paths.js.src)
        .pipe(gulp.dest(paths.js.dest))
        .pipe(browserSync.stream());
}

// Copy assets (excluding CSS)
function assets() {
    return gulp.src(paths.assets.src)
        .pipe(gulp.dest(paths.assets.dest));
}

// Add new task for robots.txt
function robots() {
    return gulp.src(paths.robots.src)
        .pipe(gulp.dest(paths.robots.dest));
}

// Watch files
function watch() {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });

    // Watch HTML files and trigger both html and css tasks
    gulp.watch('src/**/*.html', gulp.series(html, css, javascript));
    
    // Watch CSS files
    gulp.watch('src/**/*.css', css);
    
    // Watch JS files
    gulp.watch('src/**/*.js', javascript);
    
    // Watch Tailwind config
    gulp.watch('tailwind.config.js', css);
    
    // Watch assets
    gulp.watch(paths.assets.src, assets);
}

// Clean dist folder
function clean(cb) {
    require('del')(['dist']).then(() => cb());
}

// Define complex tasks
const build = gulp.series(clean, gulp.parallel(html, css, javascript, assets, robots));
const dev = gulp.series(build, watch);

// Export tasks
exports.html = html;
exports.css = css;
exports.javascript = javascript;
exports.assets = assets;
exports.robots = robots;
exports.clean = clean;
exports.build = build;
exports.default = dev; 