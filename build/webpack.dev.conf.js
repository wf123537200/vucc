var webpack = require('webpack');
var merge = require('webpack-merge');
var baseConfig = require('./webpack.base.conf');

baseConfig.module.loaders.push({
    test: /\.css$/,
    loaders: ['style', 'css']
});

module.exports = merge(baseConfig, {
    entry: {
        demo: "./src/dev"
    },
    output: {
        path: "./dist",
        publicPath: "dist",
        filename: "[name].js"
    }
});
