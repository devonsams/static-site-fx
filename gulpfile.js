var path = require('path');
var gulp = require('gulp');
var less = require('gulp-less');
var webserver = require('gulp-webserver');
var fileinclude = require('gulp-file-include');
var cmq = require('gulp-combine-media-queries');
var replace = require('gulp-replace');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var md5 = require("gulp-md5-assets");
var imagemin = require('gulp-imagemin');
var del = require('del');
var wiredep = require('wiredep').stream;
var inject = require('gulp-inject');
var watch = require('gulp-watch');

gulp.task('build:base', function () {
  var assets = useref.assets({
    searchPath: ['./.tmp', './src']
  });

  return gulp.src('./.tmp/index.html')
    .pipe(assets)
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(gulp.dest('./dist'));
});

gulp.task('build:js', function(){
  return gulp.src('dist/js/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./dist/js'))
    .pipe(rev.manifest('dist/rev-manifest.json', {
        base: process.cwd() + '/dist',
        merge: true
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('build:images', function() {
  return gulp.src('./src/images/**')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./dist/images'))
    .pipe(rev.manifest('dist/rev-manifest.json', {
        base: process.cwd() + '/dist',
        merge: true
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('build:css', function(){
  var manifest = gulp.src('./dist/rev-manifest.json');

  return gulp.src('dist/styles/*.css')
    .pipe(revReplace({manifest: manifest}))
    .pipe(minifyCss())
    .pipe(rev())
    .pipe(gulp.dest('./dist/styles/'))
    .pipe(rev.manifest('dist/rev-manifest.json', {
        base: process.cwd() + '/dist',
        merge: true
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('build:html', function() {
  var manifest = gulp.src('./dist/rev-manifest.json');

  return gulp.src('./dist/index.html')
    .pipe(revReplace({manifest: manifest}))
    .pipe(minifyHtml({
      empty: true,
      conditionals: true,
      quotes: true
    }))
    .pipe(gulp.dest('./dist'));
});

// Copy all static assets
gulp.task('build:assets', function() {
  gulp.src([
    './src/fonts/**',
  ]).pipe(gulp.dest('./dist/fonts'));

  gulp.src([
    './src/videos/**',
  ]).pipe(gulp.dest('./dist/videos'));
});

gulp.task('build:bower_components', function() {
  return gulp.src([
    './src/client/bower_components/**',
  ]).pipe(gulp.dest('./dist/bower_components'));
});

gulp.task('build:clean', function () {
  return del([
    './dist/styles/app.min.css', 
    './dist/styles/vendor.min.css', 
    './dist/js/app.min.js',
    './dist/js/vendor.min.js', 
  ]);
});

gulp.task('inject:html', function () {
  return gulp.src('./src/index.html')
    .pipe(wiredep({
      // we are importing this stuff in client/styles/app.less
      exclude: ['bootstrap/dist', 'font-awesome/css'],
      ignorePath: /^(\.\.\/)*\.\./
     }))
    .pipe(gulp.dest('./src'));
});

gulp.task('inject:less', function() {
  var lessFiles = gulp.src([
    './src/styles/**/*.less',
    '!./src/styles/app.less'
  ], { read: false })

  var options = {
    starttag: '/* inject:less */',
    endtag: '/* endinject */',
    removeTags: false,
    transform: function (filepath) {
      filepath = filepath.replace('./src/', '');
      return '@import ".' + filepath + '";';
    }
  };

  return gulp.src('./src/styles/app.less')
    .pipe(inject(lessFiles, options))
    .pipe(gulp.dest('./src/styles'));
});

gulp.task('compile:less', function () {
  return gulp.src('./src/styles/app.less')
    .pipe(less({ paths: [      
      path.join(__dirname, 'src/client/bower_components'),
      path.join(__dirname, 'src/styles'),
    ]}))
    .pipe(cmq())
    .pipe(gulp.dest('./.tmp/styles'));
});

gulp.task('compile:html', function() {
  return gulp.src(['src/index.html'])
    .pipe(fileinclude({
      prefix: '@@',
    }))
    .pipe(gulp.dest('./.tmp/'));
});
 
gulp.task('serve:dev', function() {
  return gulp.src(['./.tmp', './src'])
    .pipe(webserver({
      livereload: true,
      open: false,
      fallback: 'index.html'
    }));
});

gulp.task('serve:build', function() {
  return gulp.src('./dist')
    .pipe(webserver({
      livereload: false,
      open: true,
      fallback: 'index.html'
    }));
});

gulp.task('watch:less', function () {
  watch('src/styles/**/*.less', function(vinyl) {
    if (vinyl.event === 'change') {
      gulp.series('compile:less');
    } else {
      gulp.series('inject:less');
    }
  });
});

gulp.task('watch:html', function () {
  watch(['src/**/*.html'], function(vinyl) {
    gulp.series('compile:html');
  });
});

gulp.task('watch:js', function () {
  watch(['src/js/**/*.js'], function(vinyl) {
    if (vinyl.event === 'add') {
      gulp.series('inject:html');
    }
  });
});
 
gulp.task('clean', function () {
  return del([
    './.tmp',
    './dist'
  ]);
});

gulp.task('watch', gulp.parallel('watch:less', 'watch:html', 'watch:js'));

gulp.task('inject', gulp.parallel('inject:html', 'inject:less'));

gulp.task('compile', gulp.parallel('compile:html', 'compile:less'));

gulp.task('build', gulp.series(
    'clean',
    'inject',
    'compile',
    gulp.parallel(
      'build:assets', 
      'build:bower_components',
      gulp.series(
        'build:base', 
        'build:js', 
        'build:images', 
        'build:css', 
        'build:html', 
        'build:clean'
      )
    )
));

gulp.task('default', gulp.series(
  'inject',
  'compile',
  gulp.parallel(
    'serve:dev', 
    'watch'
  )
));