var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	minifyCSS = require('gulp-minify-css')

gulp.Gulp.prototype.__runTask = gulp.Gulp.prototype._runTask
gulp.Gulp.prototype._runTask = function (task) {
	this.currentTask = task
	this.__runTask(task)
}

gulp.task('platform-cash', function () {
	// gulp
	// 	.src([
	// 		'./resource/static/platform-cash/bootstrap/css/bootstrap.css',
	// 		'./resource/static/platform-cash/bootstrap/css/bootstrap.offcanvas.min.css',
	// 		'./resource/static/platform-cash/plugins/fancyBox/jquery.fancybox.css',
	// 		'./resource/static/platform-cash/css/mystyle.css',
	// 		'./static/style/bootstrap-select.min.css',
	// 		'./resource/static/platform-cash/css/animate.css'
	// 	])
	// 	.pipe(minifyCSS())
	// 	.pipe(concat(this.currentTask.name + '.css'))
	// 	.pipe(gulp.dest(`./static/${this.currentTask.name}/css/`))
	return gulp
		.src([
			'./resource/static/platform-cash/plugins/jquery.min.js',
			'./resource/static/platform-cash/bootstrap/js/bootstrap.min.js',
			// './node_modules/bootstrap/dist/js/bootstrap.min.js',
			'./resource/static/platform-cash/bootstrap/js/bootstrap.offcanvas.js',
			'./resource/static/platform-cash/plugins/modernizr.js',
			'./resource/static/platform-cash/plugins/wow.js',
			'./resource/static/platform-cash/plugins/imgLiquid-min.js',
			'./resource/static/platform-cash/plugins/fancyBox/jquery.fancybox.pack.js',
			'./resource/static/platform-cash/js/bootstrap-select.min.js',
			// './node_modules/bootstrap-select/dist/js/bootstrap-select.min.js',
			'./resource/static/platform-cash/js/script.js'
		])
		.pipe(uglify())
		.pipe(concat(this.currentTask.name + '.js'))
		.pipe(gulp.dest('./static/script/'))
})

gulp.task('platform-cash-mobile', function () {
	// gulp
	// 	.src([
	// 		'./resource/static/platform-cash-mobile/bootstrap/css/bootstrap.css',
	// 		'./resource/static/platform-cash-mobile/bootstrap/css/bootstrap.offcanvas.min.css',
	// 		'./resource/static/platform-cash-mobile/fonts/font-awesome/css/font-awesome.css',
	// 		'./resource/static/platform-cash-mobile/plugins/fancyBox/jquery.fancybox.css',
	// 		'./resource/static/platform-cash-mobile/css/mystyle.css',
	// 		'./resource/static/platform-cash-mobile/css/animate.css'
	// 	])
	// 	.pipe(minifyCSS())
	// 	.pipe(concat(this.currentTask.name + '.css'))
	// 	.pipe(gulp.dest(`./static/${this.currentTask.name}/css/`))
	return gulp
		.src([
			'./resource/static/platform-cash-mobile/plugins/jquery.min.js',
			'./resource/static/platform-cash-mobile/bootstrap/js/bootstrap.min.js',
			'./resource/static/platform-cash-mobile/bootstrap/js/bootstrap.offcanvas.js',
			'./resource/static/platform-cash-mobile/plugins/modernizr.js',
			'./resource/static/platform-cash-mobile/plugins/wow.js',
			'./resource/static/platform-cash-mobile/plugins/fancyBox/jquery.fancybox.pack.js',
			'./resource/static/platform-cash-mobile/js/script.js'
		])
		.pipe(uglify())
		.pipe(concat(this.currentTask.name + '.js'))
		.pipe(gulp.dest('./static/script/'))
})

gulp.task('platform-credit', function () {
	// gulp
	// 	.src([
	// 		'./resource/static/platform-credit/bootstrap/css/bootstrap.css',
	// 		'./resource/static/platform-credit/css/style.css',
	// 		'./resource/static/platform-credit/css/media.css',
	// 		'./resource/static/platform-credit/css/icons.css',
	// 		'./resource/static/platform-credit/css/tabs.css',
	// 		'./resource/static/platform-credit/css/tabstyles.css',
	// 		'./resource/static/platform-credit/css/table.css',
	// 		'./resource/static/platform-credit/css/calendar.css'
	// 	])
	// 	.pipe(minifyCSS())
	// 	.pipe(concat(this.currentTask.name + '.css'))
	// 	.pipe(gulp.dest(`./static/${this.currentTask.name}/css/`))
	return gulp
		.src([
			'./resource/static/platform-cash/plugins/jquery.min.js',
			'./resource/static/platform-cash/bootstrap/js/bootstrap.js',
			'./resource/static/platform-credit/ja/login.js',
			'./resource/static/platform-credit/js/jquery.smartmenus.js',
			'./resource/static/platform-credit/js/jquery.smartmenus.bootstrap.js'
		])
		.pipe(uglify())
		.pipe(concat(this.currentTask.name + '.js'))
		.pipe(gulp.dest('./static/script/'))
})

gulp.task('platform-credit-mobile', function () {
	// gulp
	// 	.src([
	// 		'./resource/static/platform-credit-mobile/css/main.css',
	// 		'./resource/static/platform-credit-mobile/bootstrap/css/bootstrap.min.css',
	// 		'./resource/static/platform-credit-mobile/css/slider.css',
	// 		'./resource/static/platform-credit-mobile/css/icon.css',
	// 		'./resource/static/platform-credit-mobile/font/css/font-awesome.min.css',
	// 		'./resource/static/platform-credit-mobile/css/panel.css'
	// 	])
	// 	.pipe(minifyCSS())
	// 	.pipe(concat(this.currentTask.name + '.css'))
	// 	.pipe(gulp.dest(`./static/${this.currentTask.name}/css/`))
	return gulp
		.src([
			'./resource/static/platform-cash/plugins/jquery.min.js',
			'./resource/static/platform-cash/bootstrap/js/bootstrap.js',
			'./resource/static/platform-credit-mobile/js/calender.js'
		])
		.pipe(uglify())
		.pipe(concat(this.currentTask.name + '.js'))
		.pipe(gulp.dest('./static/script/'))
})

gulp.task('sport', function () {
	// gulp
	// 	.src([
	// 		'./resource/static/sport/bootstrap/css/bootstrap.css',
	// 		'./resource/static/sport/fonts/fontello/css/fontello.css',
	// 		'./resource/static/sport/fonts/font-awesome/css/font-awesome.css',
	// 		'./resource/static/sport/css/animations.css',
	// 		'./resource/static/sport/dist/css/sb-admin-2.css',
	// 		'./resource/static/sport/css/mystyles.css',
	// 		'./static/style/font-awesome.min.css'
	// 	])
	// 	.pipe(minifyCSS())
	// 	.pipe(concat(this.currentTask.name + '.css'))
	// 	.pipe(gulp.dest(`./static/${this.currentTask.name}/css/`))
	return gulp
		.src([
			'./resource/static/sport/js/jquery.min.js',
			'./resource/static/sport/bootstrap/js/bootstrap.min.js',
			// './resource/static/sport/dist/js/sb-admin-2.js',
			// './resource/static/sport/js/bootstrap-select.min.js',
			// './node_modules/bootstrap-select/dist/js/bootstrap-select.min.js',
			'./resource/static/sport/js/scripts.js'
		])
		.pipe(uglify())
		.pipe(concat(this.currentTask.name + '.js'))
		.pipe(gulp.dest('./static/script/'))
})

gulp.task('sport-mobile', function () {
	// gulp
	// 	.src([
	// 		'./resource/static/sport-mobile/bootstrap/css/bootstrap.css',
	// 		'./static/style/bootstrap-select.min.css',
	// 		'./resource/static/sport-mobile/fonts/font-awesome/css/font-awesome.css',
	// 		'./resource/static/sport-mobile/plugins/magnific/magnific-popup.css',
	// 		'./resource/static/sport-mobile/css/mystyle.css',
	// 		'./resource/static/sport-mobile/css/animate.css',
	// 		'./resource/static/sport-mobile/css/push.css'
	// 	])
	// 	.pipe(minifyCSS())
	// 	.pipe(concat(this.currentTask.name + '.css'))
	// 	.pipe(gulp.dest(`./static/${this.currentTask.name}/css/`))
	return gulp
		.src([
			'./resource/static/sport-mobile/plugins/jquery.min.js',
			'./resource/static/sport-mobile/bootstrap/js/bootstrap.min.js',
			'./resource/static/sport-mobile/js/push.js',
			'./resource/static/sport-mobile/plugins/magnific/jquery.magnific-popup.min.js',
			'./resource/static/sport-mobile/plugins/modernizr.js',
			'./resource/static/sport-mobile/js/script.js'
		])
		.pipe(uglify())
		.pipe(concat(this.currentTask.name + '.js'))
		.pipe(gulp.dest('./static/script/'))
})

gulp.task('platform-sin', function () {
	return gulp
		.src([
			'./resource/static/platform-sin/plugins/jquery.min.js',
			'./resource/static/platform-sin/bootstrap/js/bootstrap.min.js',
			'./resource/static/platform-sin/bootstrap/js/bootstrap.offcanvas.js',
			'./resource/static/platform-sin/plugins/modernizr.js',
			'./resource/static/platform-sin/plugins/wow.js',
			'./resource/static/platform-sin/plugins/imgLiquid-min.js',
			'./resource/static/platform-sin/plugins/fancyBox/jquery.fancybox.pack.js',
			//'./resource/static/platform-sin/js/bootstrap-select.min.js',
			'./resource/static/platform-sin/js/script.js'
			// './node_modules/bootstrap-select/dist/js/bootstrap-select.min.js',
		])
		.pipe(uglify())
		.pipe(concat(this.currentTask.name + '.js'))
		.pipe(gulp.dest('./static/script/'))
})

gulp.task('platform-sin-mobile', function () {
	return gulp
		.src([
			'./resource/static/platform-sin/plugins/jquery.min.js',
			'./resource/static/platform-sin-mobile/bootstrap/js/bootstrap.min.js'
		])
		.pipe(uglify())
		.pipe(concat(this.currentTask.name + '.js'))
		.pipe(gulp.dest('./static/script/'))
})

gulp.task('service', function () {
	return gulp
		.src([
			'./resource/static/rule/js/jquery.min.js',
			'./resource/static/rule/bootstrap/js/bootstrap.min.js',
			'./resource/static/rule/js/metisMenu.min.js',
			'./resource/static/rule/js/sb-admin-2.js'
		])
		.pipe(uglify())
		.pipe(concat(this.currentTask.name + '.js'))
		.pipe(gulp.dest('./static/script/'))
})

gulp.task('index-all', function () {
	gulp
		.src(['./static/style/video-js.min.css', './static/style/loading.css'])
		.pipe(minifyCSS())
		.pipe(concat(this.currentTask.name + '.css'))
		.pipe(gulp.dest(`./static/style/`))
	return gulp
		.src([
			'./static/script/admin-route.js',
			'./static/script/core.min.js',
			'./static/script/base64.js',
			'./static/script/video.min.js',
			'./static/script/videojs-flash.min.js',
			'./static/script/videojs-contrib-hls.min.js'
		])
		.pipe(uglify())
		.pipe(concat(this.currentTask.name + '.js'))
		.pipe(gulp.dest('./static/script/'))
})

gulp.task('default', [
	'platform-cash',
	'platform-cash-mobile',
	'platform-credit',
	'platform-credit-mobile',
	'sport',
	'sport-mobile',
	'platform-sin',
	'platform-sin-mobile',
	'service'
])
