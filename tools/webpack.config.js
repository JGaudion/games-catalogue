var path = require('path');

module.exports = {
    context: path.resolve('src'),
    entry: './boot.js',
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.html$/, exclude: /node_modules/, loader: 'raw!html-minify' }
        ]
    }
};