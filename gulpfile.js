const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('build', () => {
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

gulp.task('default', function() {
  gulp.watch('src/*', ['build']);
});