const path = require('path');
const webpack = require('webpack');

const config =  {
  mode: 'development',
  // Each entry will be loaded into webpage via <script> tags
  entry: [
    'webpack/hot/poll?1000',
    '@babel/polyfill',
    path.resolve(path.join(__dirname, 'src/entry.js'))
  ],
  output: {
    filename: '[name].bundle.js',
    // Need to do this because path must be absolute
    path: path.resolve(__dirname, 'dist')
  },
  // Q: useful on server?
  devtool: false,
  watch: true,

  target: 'node',

  resolve: {
    extensions: ['.js'],
    modules: ['node_modules'],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
          // Use Babel to get ES6 syntax
            loader: 'babel-loader'
          },
          // {
          //   loader: 'eslint-loader'
          // }
        ]
      },
    ]
  }
};

module.exports = config;
