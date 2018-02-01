const paxton = require('./paxton');
module.exports = function (app) {
  app.use(paxton());
};
