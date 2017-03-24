//////////////////////////////////////////
// Required
//////////////////////////////////////////
var gulp = require("gulp"),
	concat = require("gulp-concat"),
	watch = require("gulp-watch"),
	plumber = require("gulp-plumber"),
	rename = require("gulp-rename"),
	uglify = require("gulp-uglify"),
	autoprefixer = require("gulp-autoprefixer"),
	sass = require("gulp-sass"),
	cleancss = require("gulp-clean-css");
	imageop = require('gulp-image'),
	imageResize = require('gulp-image-resize'),
	jade = require('gulp-jade'),
	del = require("del"),
	browserSync = require('browser-sync').create();

//////////////////////////////////////////
// Script Tasks
//////////////////////////////////////////
gulp.task('mergeJs', function (cb) {
	gulp.src([""])
		.pipe(plumber())
		.pipe(concat({
			path: "main.js",
			stat: {
				mode: 0666
			}
		}))
		.pipe(gulp.dest("app/static/js"), cb);
});

gulp.task("minifyJs", function () {
	gulp.src(['app/static/js/*.js', '!app/static/js/*.min.js'])
		.pipe(plumber())
		.pipe(rename({
			suffix: ".min"
		}))
		.pipe(uglify())
		.pipe(gulp.dest("app/static/js"));
});

gulp.task("watchJs", ["minifyJs"], function(done) {
	browserSync.reload();
	done();
});

//////////////////////////////////////////
// CSS Tasks
//////////////////////////////////////////
gulp.task("compileSass", function () {
	gulp.src(["app/src/sass/main.sass"])
		.pipe(plumber())
		.pipe(sass())
		.pipe(autoprefixer("last 2 versions"))
		.pipe(gulp.dest("app/static/css"));
});

gulp.task("minifyCss", function() {
	gulp.src(['app/static/css/*.css', '!app/static/css/*.min.css'])
		.pipe(plumber())
		.pipe(rename({
			suffix: ".min"
		}))
		.pipe(cleancss({compatibility: 'ie8'}))
		.pipe(gulp.dest("app/static/css"))
		.pipe(browserSync.stream());
});

//////////////////////////////////////////
// Image Optization Task
//////////////////////////////////////////
gulp.task('opImages', function () {
	gulp.src(['app/static/img/**/*'])
		.pipe(plumber())
		.pipe(imageop({
			pngquant: true,
			optipng: true,
			zopflipng: true,
			jpegRecompress: true,
			jpegoptim: true,
			mozjpeg: true,
			gifsicle: true,
			svgo: true,
			concurrent: 10
		}))
		.pipe(imageResize({
			width : 800,
			height : 600,
			flatten: true,
			imageMagick: true
		}))
		.pipe(gulp.dest('app/static/img'));
});

//////////////////////////////////////////
// Html Tasks
//////////////////////////////////////////
gulp.task("compileJade", function (){
	gulp.src(['app/src/jade/*.jade', '!app/src/jade/_*.jade'])
		.pipe(plumber())
		.pipe(jade({pretty: true}))
		.pipe(gulp.dest('app/'));
});

gulp.task("watchHtml", function(done) {
	browserSync.reload();
	done();
});

//////////////////////////////////////////
// Build Tasks
//////////////////////////////////////////
// task to clear out all files and folders from build folder
gulp.task("build:clean", function (cb) {
	del(["build/**"], cb);
});

// task to create build directory for all files
gulp.task("build:copy", ["build:clean"], function () {
	return gulp.src("app/**/*")
		.pipe(gulp.dest("build"));
});

// task to remove unwanted build files
gulp.task("build:remove", ["build:copy"], function (cb) {
	del([
		"build/bower_components/",
		"build/src/",
		"build/static/js/!(*.min.js)",
		"build/static/css/!(*.min.css)",
	], cb);
});

gulp.task("build", ["build:copy", "build:remove"]);

//////////////////////////////////////////
// BrowserSync Tasks
//////////////////////////////////////////
gulp.task("browser-sync", function () {
	browserSync.init({
		server: "./app/"
	});
});

gulp.task("build:serve", function () {
	browserSync.init({
		server: "./build/"
	});
});

//////////////////////////////////////////
//Watch Task
//////////////////////////////////////////
gulp.task("watch", function () {
	gulp.watch(['app/static/js/*.js', '!app/static/js/*.min.js'], ["watchJs"]);
	gulp.watch("app/src/sass/*.sass", ["compileSass"]);
	gulp.watch(["app/static/css/*.css", "!app/static/css/*.min.css"], ["minifyCss"]);
	gulp.watch("app/src/jade/*.jade", ["compileJade"]);
	gulp.watch("app/*.html", ["watchHtml"]);
});

//////////////////////////////////////////
//Default Task
//////////////////////////////////////////
gulp.task("default", ["minifyJs", "minifyCss", "compileJade", "browser-sync", "watch"]);