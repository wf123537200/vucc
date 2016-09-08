var webpack = require('webpack');
var merge = require('webpack-merge');
var baseConfig = require('./webpack.base.conf');
var BuildAll = require("./build-all");
var fs = require("fs");
var path = require('path');
var SOURCE_MAP = true;
var pkg = require(path.join(__dirname, '../package.json'))


// 文件配置部分
module.exports = merge(baseConfig, {
    entry: {
        index: path.resolve(__dirname, '../src/index.js')
    },
    devtool: SOURCE_MAP ? '#source-map' : false,
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: "[name].js"
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new BuildAll({
            dist: path.resolve(__dirname, '../dist/index.js')
        }),
        new webpack.BannerPlugin(`Vucc v${pkg.version}\n(https://wf123537200.github.io/vucc.com/index.html)\nLicensed under the ${pkg.license} license`, {
            entryOnly: true
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
