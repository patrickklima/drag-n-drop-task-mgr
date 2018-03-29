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

// BODY-PARSER
// ----------
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// PASSPORT
// ----------
const passport = require("passport");


var User = require('./data/models/user');

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
require('./routes/register-route')(app);
require('./routes/login-route')(app);

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