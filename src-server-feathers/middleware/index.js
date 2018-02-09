// const errors = require('@feathersjs/errors');
// const notFound = require('./not-found-handler');
// const logger = require('./logger');
const paxton = require('./paxton');

module.exports = function (app) {
  if (process.env.NODE_ENV !== 'production') {
    const webpackDev = require('./webpack-dev');
    webpackDev(app);
    // app.use('/expy', expy());
  }
  app.use(paxton());
  // app.use(notFound());
  // app.use(logger(app));
  // app.use(errors());
};
