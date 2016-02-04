var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var path  = require('path');
var del = require('del');
var args = require('yargs').argv;
var _ = require('lodash');
var KarmaServer = require('karma').Server;
var protractor = require("gulp-protractor").protractor;
var serverAddress = require('./tools/server/server-address');

var webpack = require('webpack');
var webpackConfig = require('./tools/webpack.config.js');

var nodemon = require('nodemon');
var browserSync = require('browser-sync').create();

gulp.task('clean', clean);

gulp.task('build:html', buildHtml);
gulp.task('build:css', buildCss);
gulp.task('build:js', buildJs);
gulp.task('build', gulp.series(
    'clean',
    gulp.parallel(
        'build:html',
        'build:css',
        'build:js'
    )
));

gulp.task('watch:html', watchHtml);
gulp.task('watch:css', watchCss);
gulp.task('watch', gulp.parallel('watch:html', 'watch:css'));

gulp.task('start', gulp.series(
    'build',
    startServer,
    openBrowser
));

gulp.task('test:unit', testUnit);
gulp.task('test:e2e', gulp.series(
    'build',
    testE2e
));
gulp.task('test', gulp.series(
    'test:unit',
    'test:e2e'
));

gulp.task('release', gulp.series(
    'test',
    'build'
));

gulp.task('dev', gulp.series(
    enableDev,
    'build',
    gulp.parallel(
        'test:unit',
        'watch',
        gulp.series(
            startServer,
            startBrowserSync
        )
    )
));

function clean() {
    return del('dist');
}

function buildHtml() {
    return gulp.src('src/index.html')
        .pipe(gulp.dest('dist'));
}

function buildCss() {
    var options;

    if(!args.dev) {
        options = {
            outputStyle: 'compressed'
        };
    }

    return gulp.src('src/**/*.scss')
        .pipe($.sass(options))
        .pipe($.flatten())
        .pipe(gulp.dest('dist/css'));
}

function buildJs(done) {
    buildVendorsJs();
    buildBundleJs(done);

    function buildVendorsJs() {
        var jsFiles = [
            'node_modules/jquery/dist/jquery.js',
            'node_modules/bootstrap-sass/assets/javascripts/bootstrap.js'
        ];
        var stream = gulp.src(jsFiles)
            .pipe($.concat('vendors.js'));

        if(!args.dev) {
            stream.pipe($.uglify());
        }

        stream.pipe(gulp.dest('dist'));
    }

    function buildBundleJs(done) {
        var build = webpackBuild(done);

        if(!args.dev) {
            webpack(webpackProdConfig(webpackConfig)).run(build);

            return;
        }

        webpack(webpackDevConfig(webpackConfig))
            .watch(100, build);

        function webpackBuild(done) {
            return function(err, stats) {
                if(err) {
                    throw new Error('Build failed');
                }

                done();
            };
        }

        function webpackDevConfig(webpackConfig) {
            webpackConfig = _.cloneDeep(webpackConfig);
            webpackConfig.devtool = 'source-map';
            webpackConfig.entry = ['./config/dev.config.js'].concat(webpackConfig.entry);

            return webpackConfig;
        }

        function webpackProdConfig(webpackConfig) {
            webpackConfig = _.cloneDeepWith(webpackConfig);
            webpackConfig.entry = ['./config/prod.config.js'].concat(webpackConfig.entry);
            webpackConfig.plugins = [
                new webpack.optimize.UglifyJsPlugin()
            ];

            return webpackConfig;
        }
    }
}

function watchHtml() {
    gulp.watch('src/**/*.html', gulp.series('build:html'));
}

function watchCss() {
    gulp.watch('src/**/*.scss', gulp.series('build:css'));
}

function testUnit(done) {
    new KarmaServer({
        configFile: path.resolve('./tools/karma.conf.js'),
        singleRun: !args.dev
    }, function(error) {
        if(error) {
            throw new Error('Unit tests failed');
        }
        done();
    }).start();
}

function testE2e() {
    var protractorConf = require('./tools/protractor.conf.js').config;

    return gulp.src(protractorConf.specs)
        .pipe(protractor({
            configFile: './tools/protractor.conf.js'
        }))
        .on('error', function(e) {
            throw new Error('e2e tests failed');
        });
}

function enableDev(done) {
    args.dev = true;
    done();
}

function startServer(done) {
    nodemon({
        script: 'tools/server/server.js'
    }).once('start', done)
        .on('restart', browserSync.reload);
}

function startBrowserSync(done) {
    var config = {
        files: ['dist/**/*.*'],
        notify: false,
        port: 5000,
        proxy: serverAddress
    };

    browserSync.init(config, done);
}

function openBrowser(done) {
    var opn = require('opn');

    opn(serverAddress);
    done();
}