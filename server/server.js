// DOTENV
// ----------
require('dotenv').config();

// EXPRESS
// ----------
const Express = require('express');
const app = Express();

// CORS
// ----------
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

// BODY-PARSER
// ----------
const bodyParser = require('body-parser');
app.use(bodyParser.json());


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

// DATA
// ----------
const {getBoardAndLists, getListAndCards, updateAnyDoc} = require('./data/dataService');


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

app.get('/lists/:id', (req, res, next) => {
  getListAndCards(req.params.id)
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
  .catch(e => next(e));
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