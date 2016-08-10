var webpack = require('webpack');
var merge = require('webpack-merge');
var baseConfig = require('./webpack.base.conf');
var SOURCE_MAP = false;
var ExtractTextPlugin = require("extract-text-webpack-plugin");

baseConfig.module.loaders.push({
    test: /\.css$/,
    loader: ExtractTextPlugin.extract("style-loader", "css-loader")
});

module.exports = merge(baseConfig, {
    entry: {
        app: './src/index.js'
    },
    vue: {
        loaders: {
            css: ExtractTextPlugin.extract("css")
        }
    },
    devtool: SOURCE_MAP ? '#source-map' : false,
    output: {
        path: "./dist",
        filename: "[name].js"
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new ExtractTextPlugin("style.css", {
            allChunks: true,
            disable: false
        })
    ]
});
