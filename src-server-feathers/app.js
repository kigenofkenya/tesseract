const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('winston');

const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');


const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');
const channels = require('./channels');

const authentication = require('./authentication');

const app = express(feathers());

// Load app configuration
app.configure(configuration());
// Enable CORS, security, compression, favicon and body parsing
app.use(cors());
app.use(helmet());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));

if (process.env.NODE_ENV !== 'production') {
  app.get("/", function(req, res) {
    res.sendFile(path.resolve(__dirname,'..','static','index-multientry.html'));
  });
}
// Host the public folder n static paths
app.use('/', express.static(app.get('public')));
app.use('/vendor', express.static(path.join(__dirname, '../vendor')));
app.use('/static', express.static(path.join(__dirname, '../static')));
app.use('/content', express.static(path.join(__dirname, '../content')));

// special static path
let optionsDevCliStatic = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  // index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now())
  }
}
// app.use('/dev-client', express.static( path.join(__dirname, '../dev-client'),optionsDevCliStatic ));
app.use('/build-client-vue', express.static( path.join(__dirname, '../build-client-vue'),optionsDevCliStatic ));
app.use('/build-client-react', express.static( path.join(__dirname, '../build-client-react'),optionsDevCliStatic ));

// Set up Plugins and providers
app.configure(express.rest());
app.configure(socketio());

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
app.configure(authentication);
// Set up our services (see `services/index.js`)
app.configure(services);
// Set up event channels (see channels.js)
app.configure(channels);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));

app.hooks(appHooks);



module.exports = app;
