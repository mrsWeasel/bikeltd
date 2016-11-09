var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var runSequence = require('run-sequence');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

var productionFiles = ''

gulp.task('browser-sync', function() {
	browserSync.init({
	server: {
		baseDir: './'
	}

	});
});

gulp.task('scripts', function() {
	return gulp.src('js/src/*.js')
	.pipe(concat('scripts.js'))
	.pipe(gulp.dest('./js/'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('sass', function() {
	return gulp.src('sass/**.scss')
		.pipe(sass(sassOptions).on('error', sass.logError))
		.pipe(sourcemaps.write('.'))
		.pipe(autoprefixer())
		.pipe(rename('styles.css'))
		.pipe(gulp.dest('css'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('html', function() {
	return gulp.src('index.html')
		.pipe(browserSync.stream());
});

gulp.task('watch', ['browser-sync', 'sass', 'scripts'], function() {
	gulp.watch('**/*.scss', ['sass']);
	gulp.watch('**/*.js', ['scripts']);
	gulp.watch('index.html', ['html']);
});

gulp.task('default', ['watch']);

// production

gulp.task('rootfiles', function() {
	return gulp.src('*.html')
	.pipe(gulp.dest('./dist'));
})

gulp.task('js', function() {
	return gulp.src('js/*.js')
	.pipe(rename('scripts.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('./dist/js'));
});

gulp.task('css', function() {
	return gulp.src('css/*.css')
	.pipe(gulp.dest('./dist/css'));
});

gulp.task('icons', function() {
	return gulp.src('assets/icons/*.+(svg)')
	.pipe(gulp.dest('./dist/assets/icons'));
});

gulp.task('images', function() {
	return gulp.src('assets/images/*.+(svg|png|jpeg|jpg)')
	.pipe(gulp.dest('./dist/assets/images'));
});

gulp.task('build', function(callback) {
	runSequence('sass', 'scripts', ['rootfiles', 'js', 'css', 'icons', 'images']), callback
});
