const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const path = require('path');
// const config = require(path.resolve(__dirname, '..','..','src-client','config','webpack.config.js'));
// const compiler = webpack(config);
const webpackConfig = require(path.resolve(__dirname,'..','..','src-client-hot','webpack.config.multientry.js'));
const compiler = webpack(webpackConfig);

module.exports = function (app) {
  // let instance = webpackDevMiddleware(compiler, {
  //   publicPath: config.output.publicPath,
  //   stats: {
  //     colors: true,
  //     assets: true,
  //     children: false,
  //     chunks: false,
  //     hash: false,
  //     timings: false,
  //     version: false
  //   }
  // })
  let instance = webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    noInfo: true
  })
  app.use(instance);
  instance.waitUntilValid(() => {
    console.log('Package is in a valid state');
  });
  app.use(webpackHotMiddleware(compiler, {
    log: console.log, path: '/__webpack_hmr',
    heartbeat: 10 * 1000
  }));

};
