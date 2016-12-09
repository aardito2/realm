'use strict';

const webpack = require('webpack');

module.exports = {
  entry: './example/example.js',
  output: {
    path: __dirname,
    filename: './example/bundle.js',
  },
  context: __dirname,
  module: {
    loaders: [
      {
        test: /jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-2'],
        },
      },
      {
        test: /\.elm$/,
        exclude: [/elm-stuff/, /node_modules/],
        loader: 'elm-webpack'
      },
    ],
  },
};
