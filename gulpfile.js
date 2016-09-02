var gulp = require('gulp'),
		connect = require('gulp-connect'),
		concat = require('gulp-concat'),
		watch = require('gulp-watch'),
		sass = require('gulp-ruby-sass'),
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
	return sass( './sass/*.sass', {
		style: 'compressed'
	})
		.pipe(gulp.dest('./dist/css'));
});

gulp.task('mustache', function() {
	gulp.src('./templates/*.mustache')
		.pipe(mustache({}, {}, {
			head: './templates/layout/head.mustache',
			header: './templates/modules/header.mustache',
			footer: './templates/modules/footer.mustache'
		}))
		.pipe(gulp.dest('./dist/html/'));
});

gulp.task('htmlmin', function() {
	return gulp.src('./dist/html/*.html')
		.pipe(htmlmin({
			collapseWhitespace: true
		}))
		.pipe(gulp.dest('./dist/'))
})

gulp.task('concat', function() {
	return gulp.src('./dist/css/*.css')
		.pipe(concat('style.min.css'))
		.pipe(gulp.dest('./dist/'));
});

gulp.task('watch', function() {
	gulp.watch('./sass/*.sass', ['sass']);
	gulp.watch('./templates/*.mustache', ['mustache', 'htmlmin']);
	gulp.watch('./templates/*/*.mustache', ['mustache', 'htmlmin']);
});

gulp.task('default', ['connect', 'sass', 'concat', 'mustache', 'htmlmin', 'watch']);