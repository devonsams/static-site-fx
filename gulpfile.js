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
var clean = require('gulp-clean');
var wiredep = require('wiredep').stream;
var inject = require('gulp-inject');
var watch = require('gulp-watch');

gulp.task('build:base', function () {
  var assets = useref.assets({
    searchPath: ['./.tmp', './client']
  });

  return gulp.src('./.tmp/index.html')
    .pipe(assets)
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(gulp.dest('./dist/public'));
});

gulp.task('build:js', function(){
  return gulp.src('dist/public/app/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./dist/public/app'))
    .pipe(rev.manifest('dist/public/rev-manifest.json', {
        base: process.cwd() + '/dist/public',
        merge: true
    }))
    .pipe(gulp.dest('./dist/public'));
});

gulp.task('build:images', function() {
  return gulp.src('./client/assets/images/**')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./dist/public/assets/images'))
    .pipe(rev.manifest('dist/public/rev-manifest.json', {
        base: process.cwd() + '/dist/public',
        merge: true
    }))
    .pipe(gulp.dest('./dist/public'));
});

gulp.task('build:css', function(){
  var manifest = gulp.src('./dist/public/rev-manifest.json');

  return gulp.src('dist/public/app/*.css')
    .pipe(revReplace({manifest: manifest}))
    .pipe(minifyCss())
    .pipe(rev())
    .pipe(gulp.dest('./dist/public/app'))
    .pipe(rev.manifest('dist/public/rev-manifest.json', {
        base: process.cwd() + '/dist/public',
        merge: true
    }))
    .pipe(gulp.dest('./dist/public'));
});

gulp.task('build:html', function() {
  var manifest = gulp.src('./dist/public/rev-manifest.json');

  return gulp.src('./dist/public/index.html')
    .pipe(revReplace({manifest: manifest}))
    .pipe(minifyHtml({
      empty: true,
      conditionals: true,
      quotes: true
    }))
    .pipe(gulp.dest('./dist/public'));
});

// Copy all static assets
gulp.task('build:assets', function() {
  return gulp.src([
    './client/assets/**',
    '!./client/assets/images/**'
  ]).pipe(gulp.dest('./dist/public/assets'));
});

gulp.task('build:bower_components', function() {
  return gulp.src([
    './client/bower_components/**',
  ]).pipe(gulp.dest('./dist/public/bower_components'));
});

gulp.task('build:clean', function () {
  var src = [
    './dist/public/app/app.min.css', 
    './dist/public/app/vendor.min.css', 
    './dist/public/app/app.min.js',
    './dist/public/app/vendor.min.js', 
  ];

  var opts = { read: false };

  return gulp.src(src, opts)
    .pipe(clean());
});

gulp.task('inject:html', function () {
  return gulp.src('./client/index.html')
    .pipe(wiredep({
      // we are importing this stuff in client/styles/app.less
      exclude: ['bootstrap/dist', 'font-awesome/css'],
      ignorePath: /^(\.\.\/)*\.\./
     }))
    .pipe(gulp.dest('./client'));
});

gulp.task('inject:less', function() {
  var lessFiles = gulp.src([
    './client/app/**/*.less',
    './client/components/**/*.less',
    '!./client/app/app.less'
  ], { read: false })

  var options = {
    starttag: '/* inject:less */',
    endtag: '/* endinject */',
    transform: function (filepath) {
      filepath = filepath.replace('./client/app/', '');
      filepath = filepath.replace('./client/components/', '');
      return '@import ".' + filepath + '";';
    }
  };

  return gulp.src('./client/app/app.less')
    .pipe(inject(lessFiles, options))
    .pipe(gulp.dest('./client/app'));
});

gulp.task('less', function () {
  return gulp.src('./client/app/app.less')
    .pipe(less({ paths: [      
      path.join(__dirname, 'client/bower_components'),
      path.join(__dirname, 'client/app'),
      path.join(__dirname, 'client/components')
    ]}))
    .pipe(cmq())
    .pipe(gulp.dest('./.tmp/app'));
});

gulp.task('compile:html', function() {
  return gulp.src(['client/index.html'])
    .pipe(fileinclude({
      prefix: '@@',
    }))
    .pipe(gulp.dest('./.tmp/'));
});
 
gulp.task('serve:dev', function() {
  return gulp.src(['./.tmp', './client'])
    .pipe(webserver({
      livereload: true,
      open: true,
      fallback: 'index.html'
    }));
});

gulp.task('serve:build', function() {
  return gulp.src('./dist/public')
    .pipe(webserver({
      livereload: false,
      open: true,
      fallback: 'index.html'
    }));
});

gulp.task('watch:less', function () {
  watch('client/**/*.less', function(vinyl) {
    if (vinyl.event === 'change') {
      gulp.series('less');
    } else {
      gulp.series('inject:less');
    }
  });

});

gulp.task('watch:html', function () {
  watch(['client/**/*.html'], function(vinyl) {
    gulp.series('compile:html');
  });
});

gulp.task('watch:js', function () {
  watch(['client/**/*.js'], function(vinyl) {
    if (vinyl.event === 'add') {
      gulp.series('inject:html');
    }
  });
});
 
gulp.task('clean', function () {
  return gulp.src(['./.tmp', './dist'], {read: false})
    .pipe(clean());
});

gulp.task('build', gulp.series(
    'clean',
    gulp.parallel('inject:html', 'inject:less'),
    gulp.parallel('compile:html', 'less'),
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

gulp.task('watch', gulp.parallel('watch:less', 'watch:html', 'watch:js'));
//gulp.task('default', ['serve:dev', 'watch']);