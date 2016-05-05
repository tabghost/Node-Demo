var gulp = require('gulp'),
	less = require('gulp-less'),
	concat = require('gulp-concat'),
	minifycss = require('gulp-minify-css'),
	rename = require('gulp-rename');

// 编译less
gulp.task('build-less', function() {
	gulp.src('./public/less/*.less')
		.pipe(less({ compress: true }))
		.on('error', function(e) {console.log(e);})
		.pipe(gulp.dest('./public/pre_css/'));
});

// 合并压缩
gulp.task('min-concat', ['build-less'], function() {
	gulp.src(['./public/pre_css/*.css'])
		// 合并为all.css并输出
		.pipe(concat('all.css'))
		.pipe(gulp.dest('./public/css/'))
		// 重命名为all.min.css并输出
		.pipe(rename({suffix: '.min'}))
		.pipe(minifycss())
		.pipe(gulp.dest('./public/css/'));
});

gulp.task('dev', function() {
	gulp.watch('./public/less/*.less', ['build-less', 'min-concat']);
});