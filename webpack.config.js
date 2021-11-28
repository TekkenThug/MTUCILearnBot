const path = require('path');
const Dotenv = require('dotenv-webpack');
const NodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: './src/app.ts',
  externalsPresets: {
    node: true
  },
  externals: [
    NodeExternals()
  ],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src')
    },
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new Dotenv(),
    new NodemonPlugin()
  ]
};
