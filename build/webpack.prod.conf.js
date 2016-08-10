var webpack = require('webpack');
var merge = require('webpack-merge');
var baseConfig = require('./webpack.base.conf');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var SOURCE_MAP = false;

// css 打包时抽出
baseConfig.module.loaders.push({
    test: /\.css$/,
    loader: ExtractTextPlugin.extract("style-loader", "css-loader")
});

// 文件配置部分
module.exports = merge(baseConfig, {
    entry: {
        app: './src/index'
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
