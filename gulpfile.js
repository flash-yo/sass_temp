/**
 * Created by y_ogawa on 2017/03/07.
 */
var gulp = require('gulp');
var sass = require('gulp-sass');
var scssLint = require('gulp-scss-lint');
var webserver = require('gulp-webserver');


// Sassコンパイルタスク
gulp.task('sass', function(){
	gulp.src('src/sass/**/*.scss')
		.pipe(sass({outputStyle: 'expanded'}))
		.pipe(gulp.dest('public/css/'));
});

// watchタスク(**/*.scss変更時に実行するタスク)
gulp.task('sass-watch', ['scss-lint','sass','webserver'], function(){
	var watcher = gulp.watch('src/sass/**/*.scss', ['scss-lint','sass']);
	watcher.on('change', function(event) {
		console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
	});
});

//sass-lint
gulp.task('scss-lint', function(){
	return gulp.src('src/sass/**/*.scss')
		.pipe(scssLint());
});


//web sever
gulp.task('webserver', function () {
	gulp.src('') // 公開したい静的ファイルを配置したディレクトリを指定する
		.pipe(webserver({
			host: 'localhost',
			port: 8000,
			browser: 'Google Chrome',
			livereload: true
		}));
});

// gulpのデフォルト動作としてsass-watchを実行
gulp.task('default', ['sass-watch']);