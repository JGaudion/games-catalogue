var _ = require('lodash');
var webpackConfig = require('./webpack.config');
var webpack = karmConfigWebpack(webpackConfig);

module.exports = function(config) {
    var src = '../src/';
    config.set({
        browsers: ['Chrome'],
        files: [
            '../src/app/app.js',
            '../node_modules/angular-mocks/angular-mocks.js',
            '../src/**/*.spec.js'
        ],
        frameworks: ['jasmine'],
        preprocessors: {
            '../src/app/app.js': ['webpack']
        },
        webpack: webpack
    });
};

function karmConfigWebpack(webpackConfig) {
    webpackConfig = _.cloneDeep(webpackConfig);
    webpackConfig.entry = undefined;
    webpackConfig.devtool = 'inline-source-map';

    return webpackConfig;
}