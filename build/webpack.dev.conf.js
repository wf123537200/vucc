var webpack = require('webpack');
var merge = require('webpack-merge');
var baseConfig = require('./webpack.base.conf');

module.exports = merge(baseConfig, {
    entry: {
        demo: "./src/dev"
    },
    output: {
        path: "./res",
        publicPath: "res",
        filename: "[name].js"
    }
});
