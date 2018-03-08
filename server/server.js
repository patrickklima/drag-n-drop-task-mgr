// DOTENV
// ----------
require('dotenv').config();

// EXPRESS
// ----------
const Express = require('express');
const app = Express();

// LOG-4JS LOGGER
// ----------
// const log4js = require('log4js');
// const logger = log4js.getLogger();
// logger.level = 'debug';
// log4js.configure({
//   appenders: {
//     everything: { type: 'file', filename: 'node.js.log' }
//   },
//   categories: {
//     default: { appenders: [ 'everything' ], level: 'debug' }
//   }
// });

// CORS
// ----------
let cors = require('cors');
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000',
  credentials: true
}))
// app.use((req, res, next) => {
//   // logger.debug('original request', req);
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, X-PINGOTHER, Content-Type, Accept');
//   res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE, OPTIONS');
  
//   next();
// });

// COOKIE-PARSER
// ----------
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// BODY-PARSER
// ----------
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// // EXPRESS-SESSION
// // ----------
// const expressSession = require("express-session");
// app.use(
//   expressSession({
//     name: 'Djello',
//     secret: process.env.secret || "keyboard cat",
//     saveUninitialized: false,
//     resave: false,
//     cookie: { secure: true }
//   })
// );

// COOKIE-SESSION
// ----------
const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: process.env.cookieSecret || ['secret'],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

// PASSPORT-LOCAL STRATEGY & PASSPORT-LOCAL-MONGOOSE
// ----------
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
app.use(passport.initialize());
console.log("did you get this far??");
app.use(passport.session());
console.log("how about here??");


var User = require('./data/models/user');
passport.use(User.createStrategy());
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
require('./services/login-service')(app);




// ROUTES
// ----------
const apiRoutes = require('./routes/api-routes');
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.send('hello world');
});



// ERROR HANDLING
// ----------
app.use((err, req, res, next) => {
  console.error("Error: ", err.message, err.stack);
  res.status(err.response ? err.response.status : 500);
  res.json({ error: err.message });
});

// SERVER START
// ----------
const port = 8080;
app.listen(port, () => console.log(port));