var gulp = require('gulp'),
		connect = require('gulp-connect'),
		concat = require('gulp-concat'),
		watch = require('gulp-watch'),
		sass = require('gulp-ruby-sass'),
		autoprefixer = require('gulp-autoprefixer'),
		mustache = require('gulp-mustache-plus'),
		htmlmin = require('gulp-htmlmin');

gulp.task('connect', function() {
	connect.server({
		port: 1337,
		livereload: true,
		root: './dist'
	});
});

gulp.task('sass', function() {
	return sass('./sass/*.*', {
		style: 'compressed'
	})
		.pipe(gulp.dest('./dist/css'));
});

gulp.task('mustache', function() {
	gulp.src('./templates/*.mustache')
		.pipe(mustache({
			// siteURL: 'http://localhost:1337'
			siteURL: 'http://ascentlight.com'
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

gulp.task('concat', function() {
	return gulp.src([
		'./dist/css/normalize.css',
		'./dist/css/base.css',
		'./dist/css/nav.css',
		'./dist/css/footer.css',
		'./dist/css/index.css',
		'./dist/css/contacts.css'
		])
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(concat('style.min.css'))
		.pipe(gulp.dest('./dist/'));
});

gulp.task('sass-media', function() {
	return sass('./sass/media/*.sass', {
		style: 'compressed'
	})
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('./dist/'));
});

gulp.task('watch', function() {
	gulp.watch('./sass/*.sass', ['sass']);
	gulp.watch('./sass/media/*.sass', ['sass-media']);
	gulp.watch('./dist/css/*.css', ['concat']);
	gulp.watch('./templates/*.mustache', ['mustache', 'htmlmin']);
	gulp.watch('./templates/*/*.mustache', ['mustache', 'htmlmin']);
	gulp.watch('./dist/html/*.html', ['htmlmin']);
});

gulp.task('default', ['connect', 'sass', 'concat', 'sass-media', 'mustache', 'htmlmin', 'watch']);