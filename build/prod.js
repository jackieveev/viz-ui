const path = require('path')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const base = require('./base')

module.exports = merge(base, {
  mode: 'production',
  entry: './demo/index.js',
  output: {
    path: path.resolve(__dirname, '..', 'viz'),
    filename: '[name].bundle.js',
    publicPath: '/viz/'
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './demo/index.html',
      filename: './index.html'
    })
  ]
})