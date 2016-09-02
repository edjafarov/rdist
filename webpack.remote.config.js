var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './remote.js',
  output: { path: __dirname, filename: 'RemoteJSX.js', library: "RemoteJSX", libraryTarget: "var" },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  }
};
