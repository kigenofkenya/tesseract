const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const path = require('path');
// const config = require(path.resolve(__dirname, '..','..','src-client','config','webpack.config.js'));
// const compiler = webpack(config);

let compilerRefs = {
  vanilla: {
    webpackConfig: 'src-client-hot',
    statsConfig: {
      colors: true
    }
  },
  vue: {
    webpackConfig: 'src-client-hot-vue',
    statsConfig: {
      colors: true,
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      timings: false,
      version: false
    }
  }
}

module.exports = function (app) {
  // console.log(`webpackmiddleware: compilermode:${app.get('compilerMode')}`);
  let compilerMode = app.get('compilerMode')
  let webpackConfig = require(path.resolve(__dirname,'..','..',compilerRefs[compilerMode]['webpackConfig'],'webpack.config.js'));
  let compiler = webpack(webpackConfig);
  let instance = webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    noInfo: true,
    stats: compilerRefs[compilerMode]['statsConfig']
    // stats: 'normal'
    // stats: {
    //   colors: true
    // }
  })
  app.use(instance);
  app.use(webpackHotMiddleware(compiler, {
    log: console.log, path: '/__webpack_hmr',
    heartbeat: 10 * 1000
  }));
  instance.waitUntilValid(() => {
    console.log('webpack application built and is valid!');
  });
};
