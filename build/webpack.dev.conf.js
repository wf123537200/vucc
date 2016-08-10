var webpack = require('webpack');
var merge = require('webpack-merge');
var baseConfig = require('./webpack.base.conf');

// css不需要在打包时抽出和prd的区别
baseConfig.module.loaders.push({
    test: /\.css$/,
    loaders: ['style', 'css']
});

// 整体配置
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
