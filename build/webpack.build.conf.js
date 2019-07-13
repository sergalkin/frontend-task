const merge = require('webpack-merge');
const baseWebPackConfig = require('./webpack.base.config');
const ExtractTextPlugin = require('css-fix-url-loader');

const path = require('path');
const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../public'),
  assets: 'assets/'
}

const buildWebPackConfig = merge(baseWebPackConfig, {
  mode: 'production',
  output: {
    publicPath: path.join(__dirname, "../public")
  },
  plugins: []
});

module.exports = new Promise((resolve, reject) => {
  resolve(buildWebPackConfig)
})