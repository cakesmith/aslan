/* jshint node: true */
'use strict';

var gulp = require('gulp'),
    g = require('gulp-load-plugins')({lazy: false}),
    noop = g.util.noop,
    es = require('event-stream'),
    bowerFiles = require('main-bower-files'),
    rimraf = require('rimraf'),
    queue = require('streamqueue'),
    lazypipe = require('lazypipe'),
    stylish = require('jshint-stylish'),
    bower = require('./bower'),
    spawn = require('child_process').spawn,
    isWatching = false;

var htmlminOpts = {
  removeComments           : true,
  collapseWhitespace       : true,
  removeEmptyAttributes    : false,
  collapseBooleanAttributes: true,
  removeRedundantAttributes: true
};


/**
 * Image compression
 */

gulp.task('imagemin', function () {

  var imgblob = './src/app/assets/**/*.{JPG,GIF,PNG}';
  var ignoreblob = './src/app/assets/**/~*.{JPG,GIF,PNG}';

  return es.merge(gulp.src([imgblob, '!'.concat(ignoreblob)], {buffer: false})

      .pipe(g.spawn({
        cmd : 'convert',
        args: [
          '-',
          '-strip',
          '-interlace',
          'Plane',
          '-gaussian-blur',
          '0.05',
          '-quality',
          '85%',
          '-'
        ]})),

    gulp.src(ignoreblob)

      .pipe(g.rename(function (path) {
        path.basename = path.basename.slice(1);
      })))

    .pipe(gulp.dest('./.tmp/assets/'))
    .pipe(gulp.dest('./dist/assets/'));

});


/**
 * Divshot
 */

gulp.task('divshot', ['build-dist'], function () {

  function log(data) {
    return console.log('[Divshot] ' + data.toString().trim());
  }

  var push = spawn('divshot', ['push']);

  push.on('error', function (error) {
    console.log(error.stack);
    return;
  });

  push.stdout.on('data', log);
  push.stderr.on('data', log);

  gulp.start('bump-patch');

});


/**
 * Bump
 */

function bumpFiles() {
  return gulp.src([
    './*.json',
    '!./divshot.json'
  ]);
}

gulp.task('bump-major', function () {
  bumpFiles()
    .pipe(g.bump({type: 'major'}))
    .pipe(gulp.dest('./'));
});
gulp.task('bump-minor', function () {
  bumpFiles()
    .pipe(g.bump({type: 'minor'}))
    .pipe(gulp.dest('./'));
});
gulp.task('bump-patch', function () {
  bumpFiles()
    .pipe(g.bump({type: 'patch'}))
    .pipe(gulp.dest('./'));
});


/**
 * JS Hint
 */
gulp.task('jshint', function () {
  return gulp.src([
    './gulpfile.js',
    './src/app/**/*.js'
  ])
    .pipe(g.cached('jshint'))
    .pipe(jshint('./.jshintrc'))
    .pipe(livereload());
});

/**
 * CSS
 */
gulp.task('clean-css', function (done) {
  rimraf('./.tmp/css', done);
});

gulp.task('styles', ['clean-css'], function () {
  return gulp.src([
    './src/app/**/*.scss',
    '!./src/app/**/_*.scss'
  ])
    .pipe(g.sass())
    .pipe(gulp.dest('./.tmp/css/'))
    .pipe(g.cached('built-css'))
    .pipe(livereload());
});

gulp.task('styles-dist', ['styles'], function () {
  return cssFiles().pipe(dist('css', bower.name));
});

gulp.task('csslint', ['styles'], function () {
  return cssFiles()
    .pipe(g.cached('csslint'))
    .pipe(g.csslint('./.csslintrc'))
    .pipe(g.csslint.reporter());
});

/**
 * Scripts
 */
gulp.task('scripts-dist', ['templates-dist'], function () {
  return appFiles().pipe(dist('js', bower.name, {ngAnnotate: true}));
});

/**
 * Templates
 */
gulp.task('templates', function () {
  return templateFiles().pipe(buildTemplates());
});

gulp.task('templates-dist', function () {
  return templateFiles({min: true}).pipe(buildTemplates());
});

/**
 * All AngularJS templates/partials as a stream
 */
function templateFiles(opt) {
  return gulp.src(['./src/app/**/*.html', '!./src/app/index.html'], opt)
    .pipe(opt && opt.min ? g.htmlmin(htmlminOpts) : noop());
}

/**
 * Build AngularJS templates/partials
 */
function buildTemplates() {
  return lazypipe()
    .pipe(g.ngHtml2js, {
      moduleName : bower.name + '-templates',
      prefix     : '/' + bower.name + '/',
      stripPrefix: '/src/app'
    })
    .pipe(g.concat, bower.name + '-templates.js')
    .pipe(gulp.dest, './.tmp')
    .pipe(livereload)();
}

/**
 * Fonts
 */

gulp.task('fonts', function () {
  return gulp.src(bowerFiles())
    .pipe(g.filter(['*', '!**/*.js', '!**/*.css']))
    .pipe(gulp.dest('./dist/fonts'));
});

/**
 * Vendors
 */

gulp.task('vendors', ['fonts'], function () {
  var bowerStream = gulp.src(bowerFiles());
  return es.merge(
    bowerStream.pipe(g.filter('**/*.css'))
      .pipe(g.replace('../fonts/', '/fonts/'))
      .pipe(dist('css', 'vendors')),
    bowerStream.pipe(g.filter('**/*.js')).pipe(dist('js', 'vendors'))
  );
});

//gulp.task('vendors', ['fonts'], function () {
//  var bowerStream = gulp.src(bowerFiles());
//  return es.merge(
//    bowerStream.pipe(g.filter('**/*.css')).pipe(dist('css', 'vendors')),
//    bowerStream.pipe(g.filter('**/*.js')).pipe(dist('js', 'vendors'))
//  );
//});


/**
 * Index
 */
gulp.task('index', index);
gulp.task('build-all', ['styles', 'templates'], index);

function index() {
  var opt = {read: false};
  return gulp.src('./src/app/index.html')
    .pipe(g.inject(gulp.src(bowerFiles(), opt), {ignorePath: 'bower_components', starttag: '<!-- inject:vendor:{{ext}} -->'}))
    .pipe(g.inject(es.merge(appFiles(), cssFiles(opt)), {ignorePath: ['.tmp', 'src/app']}))
    .pipe(g.inject(contentFiles(), {starttag: '<!-- inject:content -->', transform: extractContent}))
    .pipe(gulp.dest('./src/app/'))
    .pipe(g.embedlr())
    .pipe(gulp.dest('./.tmp/'))
    .pipe(livereload());
}

function contentFiles() {
  return es.merge(gulp.src(['./src/app/templates/**/*.md'])
      .pipe(g.markdown()),
    gulp.src(['./src/app/templates/**/*.html']))
}

function extractContent(filePath, file) {
  // return file contents as string
  return file.contents.toString('utf8');
}

/**
 * Assets
 */
gulp.task('assets', function () {
  return gulp.src('./src/app/assets/**')
    .pipe(g.rename(function (path) {
      if (path.basename.indexOf('~') === 0) {
        path.basename = path.basename.slice(1);
      }
    }))
    .pipe(gulp.dest('./dist/assets/'));
});

/**
 * Dist
 */

gulp.task('clean', ['clean-dist'], function (done) {
  rimraf('./.tmp', done);
});

gulp.task('clean-dist', function (done) {
  rimraf('./dist', done);
});

gulp.task('dist', ['clean-dist'], function () {
  gulp.start('build-dist');
});


gulp.task('build-dist', ['vendors', 'styles-dist', 'scripts-dist', 'imagemin'], function () {
  return gulp.src('./src/app/index.html')
    .pipe(g.inject(gulp.src('./dist/vendors.min.{js,css}'), {ignorePath: 'dist', starttag: '<!-- inject:vendor:{{ext}} -->'}))
    .pipe(g.inject(gulp.src('./dist/' + bower.name + '.min.{js,css}'), {ignorePath: 'dist'}))
    .pipe(g.htmlmin(htmlminOpts))
    .pipe(gulp.dest('./dist/'));
});

/**
 * Static file server
 */
gulp.task('statics', g.serve({
  port: 3000,
  root: ['./.tmp', './.tmp/src/app', './src/app', './bower_components']
}));

/**
 * Watch
 */

gulp.task('serve', ['clean'], function () {
  gulp.start('watch');
});

gulp.task('watch', ['statics', 'default', 'imagemin'], function () {
//  gulp.src('./src/app/assets/**/*.*').pipe(gulp.dest('.tmp/assets/'));
  isWatching = true;
  // Initiate livereload server:
  g.livereload.listen();
  gulp.watch('./src/app/**/*.js', ['jshint']).on('change', function (evt) {
    if (evt.type !== 'changed') {
      gulp.start('index');
    }
  });
  gulp.watch('./src/app/content/**/*', ['index']);
  gulp.watch('./src/app/index.html', ['index']);
  gulp.watch(['./src/app/**/*.html', '!./src/app/index.html'], ['templates']);
  gulp.watch(['./src/app/**/*.scss'], ['csslint']).on('change', function (evt) {
    if (evt.type !== 'changed') {
      gulp.start('index');
    }
  });
});

/**
 * Default task
 */
gulp.task('default', ['lint', 'build-all']);

/**
 * Lint everything
 */
gulp.task('lint', ['jshint', 'csslint']);

/**
 * Test
 */
gulp.task('test', ['templates'], function () {
  return testFiles()
    .pipe(g.karma({
      configFile: 'karma.conf.js',
      action    : 'run'
    }));
});


gulp.task('test-ci', ['test'], function () {
  gulp.watch([
    './src/app/**/*_test.js',
    './.tmp/src/app/**/*_test.js',
      './.tmp/' + bower.name + '-templates.js',
    './.tmp/src/app/**/*.js',
    './src/app/**/*.js'
  ], ['test']);
});

/**
 * Inject all files for tests into karma.conf.js
 * to be able to run `karma` without gulp.
 */
gulp.task('karma-conf', ['templates'], function () {
  return gulp.src('./karma.conf.js')
    .pipe(g.inject(testFiles(), {
      starttag    : 'files: [',
      endtag      : ']',
      addRootSlash: false,
      transform   : function (filepath, file, i, length) {
        return '  \'' + filepath + '\'' + (i + 1 < length ? ',' : '');
      }
    }))
    .pipe(gulp.dest('./'));
});

/**
 * Test files
 */
function testFiles() {
  return new queue({objectMode: true})
    .queue(gulp.src(bowerFiles())
      .pipe(g.filter('**/*.js')))
    .queue(gulp.src('./bower_components/angular-mocks/angular-mocks.js'))
    .queue(appFiles())
    .queue(gulp.src(['./src/app/**/*_test.js', './.tmp/src/app/**/*_test.js']))
    .done();
}

/**
 * All CSS files as a stream
 */
function cssFiles(opt) {
  return gulp.src('./.tmp/css/**/*.css', opt);
}

/**
 * All AngularJS application files as a stream
 */
function appFiles() {
  var files = [
      './.tmp/' + bower.name + '-templates.js',
    './.tmp/src/app/**/*.js',
    '!./.tmp/src/app/**/*_test.js',
    './src/app/**/*.js',
    '!./src/app/**/*_test.js'
  ];
  return gulp.src(files)
    .pipe(g.angularFilesort());
}


/**
 * Concat, rename, minify
 *
 * @param {String} ext
 * @param {String} name
 * @param {Object} opt
 */
function dist(ext, name, opt) {
  opt = opt || {};
  return lazypipe()
    .pipe(g.concat, name + '.' + ext)
    .pipe(gulp.dest, './dist')
    .pipe(opt.ngAnnotate ? g.ngAnnotate : noop)
    .pipe(opt.ngAnnotate ? g.rename : noop, name + '.annotated.' + ext)
    .pipe(opt.ngAnnotate ? gulp.dest : noop, './dist')
    .pipe(ext === 'js' ? g.uglify : g.minifyCss)
    .pipe(g.rename, name + '.min.' + ext)
    .pipe(gulp.dest, './dist')();
}

/**
 * Livereload (or noop if not run by watch)
 */
function livereload() {
  return lazypipe()
    .pipe(isWatching ? g.livereload : noop)();
}

/**
 * Jshint with stylish reporter
 */
function jshint(jshintfile) {
  return lazypipe()
    .pipe(g.jshint, jshintfile)
    .pipe(g.jshint.reporter, stylish)();
}
