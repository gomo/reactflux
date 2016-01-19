var gulp = require('gulp');
var babel = require('gulp-babel');
var webserver = require('gulp-webserver');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

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

gulp.task('watch-src', function() {
  gulp.watch('src/*', ['build-src']);
});

gulp.task('default', ['watch-src']);

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
  browserify('example/todo/src/app.jsx', {
      debug: true,
      extensions: ['.jsx', '.es6']
    })
    .transform("babelify", {presets: ["es2015", "react"]}).bundle()
    .on("error", function (err) {
      console.log('');
      console.log(err.message);
      console.log('' + err.codeFrame)
    })
    .pipe(source('todo.js'))
    .pipe(gulp.dest('example/todo/public'));
});

gulp.task('watch-example', function() {
  gulp.watch(['example/todo/src/*', 'example/todo/src/**/*'], ['build-example']);
});

gulp.task('example', ['watch-example', 'webserver']);