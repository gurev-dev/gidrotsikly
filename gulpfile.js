let gulp = require('gulp'),
	sass = require('gulp-sass'),
	rename = require('gulp-rename'),
	browserSync = require('browser-sync').create(),
	autoprefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	cssmin = require('gulp-cssmin'),
	ttf2woff = require('gulp-ttf2woff'),
	ttf2woff2 = require('gulp-ttf2woff2'),
	imagemin = require('gulp-imagemin'),
	webp = require('gulp-webp'),
	fileinclide = require('gulp-file-include'),
	del = require('del'),
	gcmq = require('gulp-group-css-media-queries'),
	cleanCSS = require('gulp-clean-css'),
	webpHTML = require('gulp-webp-html'),
	webpCss = require('gulp-webp-css'),
	newer = require('gulp-newer');


gulp.task('browser-sync', function () {
	browserSync.init({
		server: {
			baseDir: "dist/"
		},
		notify: false,
	});
});

gulp.task('sass', function () {
	return gulp.src('#src/scss/**/*.scss')
		.pipe(sass({ outputStyle: 'expanded' }))
		.pipe(gcmq())
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 8 versions '],
			cascade: true
		}))
		.pipe(webpCss())
		.pipe(gulp.dest('dist/css'))
		.pipe(cleanCSS())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('html', function () {
	return gulp.src(['#src/*.html', '!#src/_*.html'])
		.pipe(fileinclide())
		.pipe(webpHTML())
		.pipe(gulp.dest('dist/'))
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('style', function () {
	return gulp.src([
		'node_modules/normalize.css/normalize.css',
		'node_modules/slick-carousel/slick/slick.css',
		'node_modules/animate.css/animate.css',
		'node_modules/jquery-form-styler/dist/jquery.formstyler.css',
		'node_modules/ion-rangeslider/css/ion.rangeSlider.css',
		'node_modules/rateyo/src/jquery.rateyo.css',

	])
		.pipe(concat('libs.min.css'))
		.pipe(cssmin())
		.pipe(gulp.dest('dist/css'))
});

gulp.task('js', function () {
	return gulp.src('#src/js/main.js')
		.pipe(fileinclide())
		// .pipe(gulp.dest('dist/js'))
		.pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('dist/js'))
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('script', function () {
	return gulp.src([
		'node_modules/slick-carousel/slick/slick.js',
		'node_modules/wow.js/dist/wow.js',
		'node_modules/jquery-form-styler/dist/jquery.formstyler.js',
		'node_modules/ion-rangeslider/js/ion.rangeSlider.js',
		'node_modules/rateyo/src/jquery.rateyo.js',


	])
		.pipe(concat('libs.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'))
});

gulp.task('imagemin', function () {
	return gulp.src('#src/images/**/*.{jpg,png,svg,gif,ico,webp}')
		.pipe(newer('dist/images/'))
		.pipe(imagemin({
			interlaced: true,
			progressive: true,
			svgoPlugins: [{ removeViewBox: false }],
			optimizationLevel: 3,  //0 or 7
		}))
		.pipe(gulp.dest('dist/images/'))
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('webp', function () {
	return gulp.src('#src/images/**/*.{jpg,png,gif,svg,ico,webp}')
		.pipe(webp({
			quality: 70
		}))
		.pipe(gulp.dest('dist/images/'))
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('ttf2woff', function () {
	return gulp.src(['#src/fonts/*.ttf'])
		.pipe(ttf2woff())
		.pipe(gulp.dest('dist/fonts/'));
});

gulp.task('ttf2woff2', function () {
	return gulp.src(['#src/fonts/*.ttf'])
		.pipe(ttf2woff2())
		.pipe(gulp.dest('dist/fonts/'));
});

gulp.task('fonts-icon', function () {
	return gulp.src(['#src/fonts-icon/*.*'])
		.pipe(gulp.dest('dist/fonts/'));
});

gulp.task('clean', function () {
	return del.sync('dist')
});

gulp.task('watch', function () {
	gulp.watch('#src/scss/**/*.scss', gulp.parallel('sass'));
	gulp.watch('#src/*.html', gulp.parallel('html'));
	gulp.watch('#src/js/*.js', gulp.parallel('js'));
	gulp.watch('#src/images/**/*.{jpg,png,svg,gif,ico,webp}', gulp.parallel('imagemin'));
	gulp.watch('#src/images/**/*.{jpg,png,gif,svg,ico}', gulp.parallel('webp'));
});

gulp.task('default', gulp.parallel('html', 'clean', 'script', 'js', 'style', 'sass', 'ttf2woff', 'ttf2woff2', 'fonts-icon', 'imagemin', 'webp', 'browser-sync', 'watch',))