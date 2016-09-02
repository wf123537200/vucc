var webpack = require('webpack');
var merge = require('webpack-merge');
var baseConfig = require('./webpack.base.conf');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var fs = require("fs");
var path = require('path');
var SOURCE_MAP = false;

// css 打包时抽出
baseConfig.module.loaders.push({
    test: /\.css$/,
    loader: ExtractTextPlugin.extract("style-loader", "css-loader")
});

// 入口文件集合函数,每个文件进行打包
function getEntry() {
    var fileList = [];
    var res = {};
    var srcPath = './src/components';

    function walk(path){
        var dirList = fs.readdirSync(path);
        dirList.forEach(function(item){
            if(fs.statSync(path + '/' + item).isDirectory()){
                walk(path + '/' + item);
            }else{
                fileList.push(path + '/' + item);
            }
        });
    }

    walk(srcPath);

    // 公共入口

    fileList = fileList.filter(function(it) {
        return it.match(/index\.vue/);
    });

    //console.log(fileList);

    res['app'] = ['./src/index.js'];
    fileList.forEach(function(it) {
        var path = it.substr(srcPath.length);
        res[path.substr(0, path.length - 4)] = [it];
        if(path.substr(0, path.length - 4) === 'message-box') {
            // message-box 有一个单独的打包文件
            res['message-box'].push('./src/components/message-box/wrap.js');
        }
    });

    console.log(res);

    return res;
};

// 文件配置部分
module.exports = merge(baseConfig, {
    entry: getEntry(),
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
    ],
    resolve: {
        extensions: ['', '.js', '.vue'],
        alias: {
            'src': path.resolve(__dirname, '/src'),
            components: path.resolve(__dirname, '../src/components')
        }
    }
});
