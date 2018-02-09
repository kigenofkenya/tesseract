const express = require('express');
const webpack = require('webpack');
const WebpackLoggingPlugin = require('webpack-logging-plugin');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const configs = require('./webpack//webpack.config.dev.js');

const multiCompiler = webpack(configs);

// apply pretty webpack status logging
multiCompiler.apply(new WebpackLoggingPlugin({
  formatError: (err) => err, 
  formatStats: (stats) => formatWebpackMessages(stats.toJson({}, true)),
  successCallback: () => console.log("App is running at: http://localhost:3000/")
}));

// init & start dev server
const app = express();
app.use(webpackDevMiddleware(multiCompiler, {
  stats: false,
  quiet: true,
  noInfo: true,
  serverSideRender: true,
}));
app.use(webpackHotMiddleware( multiCompiler.compilers.find(compiler => compiler.name === 'client'), {
  log: false,
}));
app.use(webpackHotServerMiddleware(multiCompiler));
app.listen(3000);