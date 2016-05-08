var gulp = require('gulp');
var webserver = require('gulp-webserver');
var babel = require('gulp-babel');
var gutil = require("gulp-util");
var webpack = require("webpack");

gulp.task('build-src', () => {
  return gulp.src('src/*')
    .pipe(babel({
      presets: ['es2015', 'react']
    }))
    .on("error", function (err) {
      console.log('');
      console.log(err.message);
      console.log('' + err.codeFrame);
      this.emit('end');
    })
    .pipe(gulp.dest('lib'));
});

//for example
gulp.task('webserver', function() {
  gulp.src('example/todo/public')
    .pipe(webserver({
      host: 'localhost',
      port: '9999',
      middleware: function(req, res, next) {
        var routerName = './gulp/router';
        delete require.cache[require.resolve(routerName)];

        var router = require(routerName);
        router.route(req, res, next);
      }
    }));
});

gulp.task('build-example', function() {
  webpack(require('./example/todo/webpack.config.js'), function(err, stats) {
    if(err) throw new gutil.PluginError("webpack", err);
    gutil.log("[webpack]", stats.toString({}));
  });
});

gulp.task('watch-example', function() {
  gulp.watch(['example/todo/src/*', 'example/todo/src/**/*', 'src/*'], ['build-src']);
});

gulp.task('example', ['build-src', 'watch-example', 'build-example', 'webserver']);

gulp.task('default', function(){
  gulp.watch(['src/*'], ['build-src']);
});