'use strict';

//Import required gulp file libraries
var clean = require('gulp-clean'),
	cleanhtml = require('gulp-cleanhtml'),
	concat = require('gulp-concat'),
	del = require('del'),
	gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	minifycss = require('gulp-minify-css'),
	mocha = require('gulp-mocha'),
	replace = require('gulp-replace'),
	run = require('gulp-run'),
	stripdebug = require('gulp-strip-debug'),
	uglify = require('gulp-uglify-es').default,
	webserver = require('gulp-webserver'),
	zip = require('gulp-zip');
	
//clean build directory
gulp.task('clean-build', function() {
	return gulp.src('build', {read: false})
		.pipe(clean());
});

//clean dist directory
gulp.task('clean-dist', function(){
	return gulp.src('dist', {read: false})
		.pipe(clean());
})

//copy static folders to build directory
gulp.task('copy-images-and-manifest', function() {
	gulp.src('src/images/**')
		.pipe(gulp.dest('build/images'));
	return gulp.src('src/manifest.json')
		.pipe(gulp.dest('build'));
});

//copy and compress HTML files
gulp.task('clean-html', function() {
	return gulp.src('src/*.html')
		.pipe(cleanhtml())
		.pipe(gulp.dest('build'));
});

//minify styles
gulp.task('minify-css', function() {
	return gulp.src('src/styles/*.css')
		.pipe(minifycss({root: 'src/styles', keepSpecialComments: 0}))
		.pipe(gulp.dest('build/styles'));
});

//concat all module files and strip import and export statements out
gulp.task('concat-modules', function(){
	return gulp.src(['src/scripts/modules/*.js']) // Put all modules in this array
		.pipe(replace(/exports\.\w* = \w*;/g, " "))
		.pipe(replace(/var \{\w*\} = require\(\S*\);/g, " "))
		.pipe(concat('translationAlgorithm.js'))
    	.pipe(gulp.dest('src/scripts'));	
})

//copy, debug and clean all files
gulp.task('copy-scripts', ['concat-modules'], function() {
	return gulp.src(['src/scripts/*.js'])
		.pipe(jshint({asi: "true", browser: "true"}))
		.pipe(jshint.reporter('default'))
		.pipe(gulp.dest('build/scripts'));
});

//delete concatenated files from src dir
gulp.task('delete-generated-files', ['copy-scripts'], function(){
	return gulp.src(['src/scripts/translationAlgorithm.js'], {read: false})
		.pipe(clean());
});

//build ditributable after all other tasks are completed
gulp.task('zip-dist', ['clean-html', 'copy-scripts', 'minify-css', 'copy-images-and-manifest','delete-generated-files'], function() {
	var manifest = require('./src/manifest'),
		distFileName = manifest.name + ' v' + manifest.version + '.zip';

	return gulp.src(['build/**'])
		.pipe(zip(distFileName))
		.pipe(gulp.dest('dist'));
});

//run mocha tests 
gulp.task('test', function(){
	var stream = gulp.src('./')
		.pipe(run('npm start'))
		.on('close', () => {console.log('EXITED')})
    gulp.src(['test/*.js'], {read: false})
        .pipe(mocha({reporter: 'spec', exit: true}))
		.on('error', console.error)
		.on('end', function(){ stream.emit('end')})
});


//GATHERED TASKS

//build the project without running tests
gulp.task('build', ['clean-build', 'clean-dist'], function() {
	gulp.start('zip-dist');
});

//clean build and dist directorys
gulp.task('clean', function() {
	gulp.start('clean-build');
	gulp.start('clean-dist');
});

//default: run by using command 'gulp'
//clean the directory, build, and then run the tests
gulp.task('default', ['clean-build', 'clean-dist'], function() {
	gulp.start('zip-dist');
	gulp.start('test');
});
