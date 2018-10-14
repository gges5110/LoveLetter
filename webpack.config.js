var path = require('path');
var webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.bundle.js'
  },
  devServer: {
    hot: true,
    publicPath: '/build/',
    historyApiFallback: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_compontents)/,
        query: {
          presets: ['env', 'stage-0']
        }
      }
    ]
  },
  stats: {
    colors: true
  },
  devtool: 'inline-source-map'
};