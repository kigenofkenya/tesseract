module.exports = function (options = {}) {
  return function paxton(req, res, next) {
    console.log('paxton middleware is running');
    next();
  };
};
