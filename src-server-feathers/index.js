/* eslint-disable no-console */
const winston = require('winston');
const app = require('./app');
const port = app.get('port');
const server = app.listen(port);

const loggerConfig = {
  levels: {
    error: 0,
    debug: 1,
    warn: 2,
    data: 3,
    info: 4,
    verbose: 5,
    silly: 6
  },
  colors: {
    error: 'red',
    debug: 'blue',
    warn: 'yellow',
    data: 'grey',
    info: 'green',
    verbose: 'cyan',
    silly: 'magenta'
  }
};

const logger = module.exports = winston.createLogger({
  levels: loggerConfig.levels,
  format: winston.format.combine(
    // winston.format.colorize(),
    winston.format.simple(),
    winston.format.splat()
  ),
  transports: [
    new winston.transports.Console()
  ]
});

process.on('unhandledRejection', (reason, p) => {
  console.log('unhandledRejection')
  logger.error('Unhandled Rejection at: Promise ', p, reason)
});

server.on('listening', () => {
  let startmsg = `Feathers application started at ${app.get('host')}:${port}`
  logger.log('info', 'test message %s', 'my string');
  logger.info(startmsg,{ 'foo': 'bar' })
});
