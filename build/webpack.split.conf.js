var webpack = require('webpack');
var merge = require('webpack-merge');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var fs = require("fs");
var path = require('path');
var SOURCE_MAP = true;
var baseConfig = require('./webpack.base.conf');
var BuildAll = require("./build-all");

// css 打包时抽出
baseConfig.module.loaders.push({
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract(
        "style",
        "css!sass"
    )
});

// 文件配置部分
module.exports = merge(baseConfig, {
    entry: {
        index: path.resolve(__dirname, '../src/index.js')
    },
    vue: {
        loaders: {
            // 必须和loader 配置一样
            scss: ExtractTextPlugin.extract("style", 'css!sass')
        }
    },
    devtool: SOURCE_MAP ? '#source-map' : false,
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: "split.js"
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
        }),
        new BuildAll({
            dist: path.resolve(__dirname, '../dist/split.js')
        })
    ],
    resolve: {
        extensions: ['', '.js', '.vue'],
        alias: {
            'src': path.resolve(__dirname, '/src'),
            components: path.resolve(__dirname, '../src/components')
        }
    }
});
