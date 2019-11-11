const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const FlowWebpackPlugin = require('flow-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');

const config =  {
  mode: 'development',
  // Each entry will be compiled into dist/ directory
  entry: {
    polyfill: '@babel/polyfill',
    server: path.resolve(path.join(__dirname, 'src/entry.js')),
    test: path.resolve(path.join(__dirname, 'test/test.bootstrap.js'))
  },

  output: {
    filename: '[name].bundle.js',
    // Need to do this because path must be absolute
    path: path.resolve(__dirname, 'dist')
  },

  devtool: 'inline-source-map',
  watch: false,

  target: 'node',
  externals: [nodeExternals()],

  resolve: {
    extensions: ['.js'],
    modules: ['node_modules'],
    alias: {

    }
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),

    // Run Flow on Webpack Compile
    new FlowWebpackPlugin({
      failOnError: false,
      failOnErrorWatch: false,
      reportingSeverity: 'error'
    }),


    new WebpackShellPlugin({
      onBuildExit: 'mocha --env.unit_test ./dist/test.bundle.js'
    }),
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'], // eslint will only run on files imported by the project
      },
      // Not sure this is what we want....
      // {
      //   test: /\.spec\.js$/,
      //   exclude: /node_modules/,
      //   use: [
      //     {
      //     // Run tests on compile
      //       loader: 'mocha-loader',
      //     },
      //   ]
      // }
    ]
  }
};

module.exports = config;
