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
  node: {
    __dirname: true
  },

  resolve: {
    extensions: ['.js'],
    modules: ['node_modules'],
    alias: {

    }
  },

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
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),

    // Run Flow on Webpack Compile
    new FlowWebpackPlugin({
      failOnError: false,
      failOnErrorWatch: false,
      reportingSeverity: 'error'
    }),


    // TODO: Run tests only once on start-dev, rebuild and restart server on changes
    //    tests can be run again by the developer before commits, or on new npm run
    // IDEA: build once with webpack, start server with nodeman, start webpack watch?
    new WebpackShellPlugin({
      // whoa, why is this different than mocha.opts?
      // q: what is the difference between doing this and running spec individually?
      //    does this still pick up mocha.opts? does this add to it?
      //    how is output of this when exceptions thrown vs if we run the test files indidually? (mocha.opts)
      onBuildExit: 'mocha --env.unit_test ./dist/test.bundle.js'
    }),

    // TODO: look into this vs other way

    // Custom Script on end of Build process (this works in watch mode too)
    // {
    //   apply: (compiler) => {
    //     compiler.hooks.afterEmit.tap('AfterEmitPlugin', () => {
    //       exec('./node_modules/.bin/htmlhint public', (err, stdout, stderr) => {
    //         if (stdout) process.stdout.write(stdout);
    //         if (stderr) process.stderr.write(stderr);
    //       });
    //     });
    //   }
    // }
  ]
};

module.exports = config;
