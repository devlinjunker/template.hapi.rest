const path = require("path");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const FlowWebpackPlugin = require("flow-webpack-plugin");

const config =  {
  mode: "development",
  // Each entry will be loaded into webpage via <script> tags
  entry: {
    polyfill: "@babel/polyfill",
    server: path.resolve(path.join(__dirname, "src/entry.js"))
  },

  output: {
    filename: "[name].bundle.js",
    // Need to do this because path must be absolute
    path: path.resolve(__dirname, "dist")
  },
  // Q: useful on server?
  devtool: "inline-source-map",
  watch: true,

  target: "node",
  externals: [nodeExternals()],

  resolve: {
    extensions: [".js"],
    modules: ["node_modules"],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),

    // Run Flow on Webpack Compile
    new FlowWebpackPlugin({
      failOnError: false,
      failOnErrorWatch: false,
      reportingSeverity: "error"
    }),
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
          // Use Babel to get ES6 syntax
            loader: "babel-loader",
          },
          {
            loader: "eslint-loader"
          }
        ]
      },
    ]
  }
};

module.exports = config;
