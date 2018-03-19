// DOTENV
// ----------
require('dotenv').config();

// EXPRESS
// ----------
const Express = require('express');
const app = Express();

// CORS
// ----------
let cors = require('cors');
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000',
  credentials: true
}))

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
    name: 'Djello',
    secret: process.env.secret || "keyboard cat",
    saveUninitialized: false,
    resave: false,
    cookie: { secure: true }
  })
);



// PASSPORT-LOCAL STRATEGY & PASSPORT-LOCAL-MONGOOSE
// ----------
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
app.use(passport.initialize());
app.use(passport.session());


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