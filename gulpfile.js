var gulp = require('gulp');
var webserver = require('gulp-webserver');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var babel = require('gulp-babel');
var replace = require('gulp-replace');

function buildSrc(exclude){
  var task = gulp.src('src/*');
  var dir = 'lib/include';
  if(exclude){
    task
      .pipe(replace("import React from 'react';", ''))
      .pipe(replace("import ReactDOM from 'react-dom';", ''));

    dir = 'lib/exclude';
  }

  task
    .pipe(babel({
      presets: ['es2015', 'react']
    }))
    .on("error", function (err) {
      console.log('');
      console.log(err.message);
      console.log('' + err.codeFrame);
      this.emit('end');
    })
    .pipe(gulp.dest(dir));

  return task;
}

gulp.task('build-src', () => {
  buildSrc(false);
  buildSrc(true);
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
  browserify('example/todo/src/app.jsx', {
      debug: true,
      extensions: ['.jsx', '.es6']
    })
    // .exclude('react', 'react-dom')
    // .transform("browserify-replace", {replace: [
    //   {from: "import ReactFlux from '../../../../';", to: "import ReactFlux from '../../../../exclude-react';"},
    //   {from: "import React from 'react';", to: ""},
    //   {from: "import ReactDOM from 'react-dom';", to: ""}
    // ]})
    .transform("babelify", {presets: ["es2015", "react"]})
    .bundle()
    .on("error", function (err) {
      console.log('');
      console.log(err.message);
      console.log('' + err.codeFrame)
    })
    .pipe(source('todo.js'))
    .pipe(gulp.dest('example/todo/public'));
});

gulp.task('watch-example', function() {
  gulp.watch(['example/todo/src/*', 'example/todo/src/**/*', 'src/*'], ['build-src', 'build-example']);
});

gulp.task('example', ['build-src', 'build-example', 'watch-example', 'webserver']);