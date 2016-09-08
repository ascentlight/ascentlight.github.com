var gulp = require('gulp'),
		connect = require('gulp-connect'),
		concat = require('gulp-concat'),
		watch = require('gulp-watch'),
		sass = require('gulp-ruby-sass'),
		autoprefixer = require('gulp-autoprefixer'),
		mustache = require('gulp-mustache-plus'),
		htmlmin = require('gulp-htmlmin'),
		uglify = require('gulp-uglify'),
		clean = require('gulp-clean');

// *****************SERVER***************** //
gulp.task('connect', function() {
	connect.server({
		port: 1337,
		livereload: true,
		root: './dist'
	});
});

// *****************STYLES***************** //
gulp.task('sass', function() {
	return sass('./sass/*.*', {
		style: 'compressed'
	})
		.pipe(gulp.dest('./dist/css'));
});

gulp.task('sass-media', function() {
	return sass('./sass/media/*.sass', {
		style: 'compressed'
	})
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('./dist/css/media'));
});

gulp.task('concat', function() {
	return gulp.src([
		'./dist/css/normalize.css',
		'./dist/css/base.css',
		'./dist/css/nav.css',
		'./dist/css/footer.css',
		'./dist/css/index.css',
		'./dist/css/contacts-register-forms.css',
		'./dist/css/about.css'
		])
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(concat('style.min.css'))
		.pipe(gulp.dest('./dist/'));
});

gulp.task('concat-media', function() {
	return gulp.src('./dist/css/media/*.css')
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(concat('media.min.css'))
		.pipe(gulp.dest('./dist/'));
});

// *****************TEMPLATES***************** //
gulp.task('mustache', function() {
	gulp.src('./templates/*.mustache')
		.pipe(mustache({
			// siteURL: 'http://localhost:1337',
			siteURL: 'http://ascentlight.com',
			formEmail: 'https://formspree.io/info@ascentlight.com'
		}, {}, {
			head: './templates/layout/head.mustache',
			nav: './templates/layout/nav.mustache',
			mobilenav: './templates/layout/mobilenav.mustache',
			footer: './templates/layout/footer.mustache'
		}))
		.pipe(gulp.dest('./dist/html/'));
});

gulp.task('htmlmin', function() {
	return gulp.src('./dist/html/*.html')
		.pipe(htmlmin({
			collapseWhitespace: true
		}))
		.pipe(gulp.dest('./dist/'));
});

// *****************SCRIPTS***************** //
gulp.task('scripts', function() {
	return gulp.src('./js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('./dist/js/'));
});

// *****************WATCH***************** //
gulp.task('watch', function() {
	gulp.watch('./sass/*.sass', ['sass']);
	gulp.watch('./sass/media/*.sass', ['sass-media']);
	gulp.watch('./dist/css/*.css', ['concat']);
	gulp.watch('./dist/css/media/*.css', ['concat-media']);
	gulp.watch('./templates/*.mustache', ['mustache', 'htmlmin']);
	gulp.watch('./templates/layout/*.mustache', ['mustache']);
	gulp.watch('./dist/html/*.html', ['htmlmin']);
});

// *****************CLEAN***************** //
gulp.task('clean', function() {
	return gulp.src([
			'./dist/css',
			'./dist/html'
		])
		.pipe(clean());
});

// *****************DEFAULT***************** //
gulp.task('default', ['connect', 'sass', 'sass-media', 'concat', 'concat-media', 'mustache', 'htmlmin', 'scripts', 'watch']);