var path = require('path');
var utils = require('./utils');
var pathToBourbon = require('node-bourbon').includePaths;

module.exports = {
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.jsx$/,
        loader: 'babel'
      },
      {
        test: /\.js/,
        loader: 'babel',
        query: {
          "presets": ["es2015"],
          "plugins": ["transform-vue-jsx"]
        },
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test: /\.(png|jpg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: '[name].[ext]?[hash:7]'
        }
      },
      {
        test   : /\.woff|\.woff2|\.svg|.eot|\.ttf/,
        loader : 'url'
      },
      {
        test: /\.(scss|sass)$/,
        loaders: ["style", "css", "sass"]
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.vue'],
    alias: {
      'src': path.resolve(__dirname, '/src'),
      components: path.resolve(__dirname, '/src/components'),
      vue: 'vue/dist/vue.js'
    }
  },
  vue: {
    vue: {
      loaders: Object.assign({}, {
        js: 'babel?presets[]=es2015'
      }, utils.cssLoaders())
    }
  },
  sassLoader: {
    includePaths: [pathToBourbon, path.join(__dirname, '../src')]
  }
};