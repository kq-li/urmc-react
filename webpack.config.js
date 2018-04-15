const path = require('path');
const webpack = require('webpack');

const definePlugin = new webpack.DefinePlugin({
  // change to 'production' for production apps
  'process.env.NODE_ENV': JSON.stringify('development')
});
// Used in production
// const uglifyJsPlugin = new webpack.optimize.UglifyJsPlugin();

module.exports = {
  mode: 'development',
  // For showing line-numbers
  devtool: 'eval',
  // I/O of webpack
  entry: [path.join(__dirname, '/src/browser.js')],
  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '/',
    filename: 'js/bundle.js'
  },
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    historyApiFallback: true
  },
  module: {
    rules: [
      { // Use Babel for loading *.js files and such
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        query: { presets: ['env', 'react', 'stage-2'] }
      },
      { // Use the following loader for images and gifs
        test: /\.jpe?g$|\.gif$|\.png$/i,
        loader: 'file-loader?name=images/[name].[ext]'
      }
    ]
  },
  plugins: [
    definePlugin,
    // uglifyJsPlugin
  ],
  watchOptions: {
    ignored: /node_modules/
  },
  performance: {
    hints: false
  }
};
