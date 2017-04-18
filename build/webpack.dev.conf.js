var webpack = require('webpack');
var merge = require('webpack-merge');
var baseConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// css不需要在打包时抽出和prd的区别
baseConfig.module.loaders.push({
    test: /\.css$/,
    loaders: ['style', 'css']
});

// 整体配置
module.exports = merge(baseConfig, {
    entry: {
        demo: ["./demo/dev"],
        demoJs: ["./demo/test"]
    },

    output: {
        path: "./dist",
        publicPath: "dist",
        filename: "[name].js"
    },
    plugins: [
        // 生成 html 文件
        new HtmlWebpackPlugin({
            template: './demo/index.html', // html模版
            hash: false, // 文件名是否 hash
            filename: 'index.html', // 文件名
            inject: 'body', // 静态文件注入的位置
            minify: {
                collapseWhitespace: true // 压缩空白
            }
        })
    ]
});
