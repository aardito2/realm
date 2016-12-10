'use strict';

const webpack = require('webpack');

const env = process.env.NODE_ENV;
const config = {
  module: {
    loaders: [
      { test: /\.js$/,
        loader: 'babel-loader',
        exclude: [/node_modules/, /example/, /elm-stuff/],
        presets: ['es2015', 'react', 'stage-0']
      },
    ],
  },
  output: {
    library: 'realm',
    libraryTarget: 'umd',
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    }),
  ],
};

if (env === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false,
        screw_ie8: false,
      },
      mangle: {
        screw_ie8: false,
      },
      output: {
        screw_ie8: false,
      },
    })
  );
};

module.exports = config;
