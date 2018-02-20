// DOTENV
// ----------
require('dotenv').config();

// EXPRESS
// ----------
const Express = require('express');
const app = Express();

// LOG-4JS LOGGER
// ----------
const log4js = require('log4js');
const logger = log4js.getLogger();
logger.level = 'debug';
log4js.configure({
  appenders: {
    everything: { type: 'file', filename: 'node.js.log' }
  },
  categories: {
    default: { appenders: [ 'everything' ], level: 'debug' }
  }
});

// CORS
// ----------
app.use(function(req, res, next) {
  logger.debug('original request', req);
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, X-PINGOTHER, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE, OPTIONS');
  next();
});

// COOKIE-PARSER
// ----------
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// BODY-PARSER
// ----------
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// EXPRESS-SESSION
// ----------
const expressSession = require("express-session");
app.use(
  expressSession({
    secret: process.env.secret || "keyboard cat",
    saveUninitialized: false,
    resave: false
  })
);

// PASSPORT-LOCAL STRATEGY
// ----------
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
app.use(passport.initialize());
app.use(passport.session());

var User = require('./data/models/user');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// MORGAN - LOGGING
// ----------
const morgan = require('morgan');
const morganToolkit = require('morgan-toolkit')(morgan);

app.use(morganToolkit());

// MONGOOSE
// ----------
const mongoose = require('mongoose');
app.use((req, res, next) => {
  if (mongoose.connection.readyState) {
    next();
  } else {
    require('./data/config/mongo-config')().then(() => next());
  }
});

// SERVICES
// ----------
require('./services/create-user-service')(app);
const {getBoardAndLists, updateAnyDoc} = require('./services/data-service');


// ROUTES
// ----------
app.get('/', (req, res) => {
  res.send('hello world');
});

app.get('/boards/:id', (req, res, next) => {
  console.log("boards - received request")
  getBoardAndLists(req.params.id)
  .then(data => {
    console.log("Boards - sending data",data)
    res.json(data)})
  .catch(e => next(e));
});

app.put('/:type/:id', (req, res, next) => {
  const {type, id} = req.params;
  const {data, boardId} = req.body;
  console.log("updateAnyDoc", updateAnyDoc);
  updateAnyDoc(type, id, data, boardId)
  .then(response => {
    console.log(`update ${type} - sending response`,response);
    return response;
  })
  .then(response => res.json(response))
  .catch(err => next(err));
});

// ERROR HANDLING
// ----------
app.use((err, req, res, next) => {
  console.error("Error: ", err.stack);
  res.status(err.response ? err.response.status : 500);
  res.json({ error: err.message });
});

// SERVER START
// ----------
const port = 8080;
app.listen(port, () => console.log(port));