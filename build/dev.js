const path = require('path')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack')

const base = require('./base')

module.exports = merge(base, {
  mode: 'development',
  entry: './demo/index.js',
  output: {
    path: path.resolve(__dirname, '..', 'demo-dist'),
    filename: '[name].bundle.js'
  },
  devServer: {
    contentBase: '/demo-dist',
    compress: true
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './demo/index.html',
      filename: './index.html'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
})