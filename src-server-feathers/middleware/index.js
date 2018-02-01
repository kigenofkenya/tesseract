const paxton = require('./paxton');
module.exports = function (app) {
  if (process.env.NODE_ENV !== 'production') {
    const webpackDev = require('./webpack-dev');
    webpackDev(app);
    // app.use('/expy', expy());
  }
  app.use(paxton());
};
