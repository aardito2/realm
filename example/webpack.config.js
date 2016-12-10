'use strict';

const webpack = require('webpack');

const env = process.env.NODE_ENV;
const config = {
  entry: './example.js',
  output: {
    path: __dirname,
    filename: './bundle.js',
  },
  context: __dirname,
  devtool: 'source-map',
  module: {
    loaders: [
      { test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/
      },
      { test: /\.elm$/, loaders: ['elm-webpack-loader'], exclude: [/node_modules/, /elm-stuff/] }
    ],
  },
};

module.exports = config;
