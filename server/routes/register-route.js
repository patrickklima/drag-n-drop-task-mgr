const passport = require('passport');
const {createUser} = require('../services/create-data-service');
const {getFullUserById} = require('../services/get-data-service');
const {makeToken} = require('../services/jwt-service');

const errorCatch = (err, next) => next(err);

module.exports = (app) => {
  app.post('/register', (req, res, next) => {
    const {username, password} = req.body;
    return createUser(username, password)
    .then(newUser => getFullUserById(newUser._id))
    .then(userData => {
      const user = userData[0];
      const token = makeToken({id: user._id});
      console.log("user", user);
      console.log("token", token);
      return res.json([{user, token}]);
    })
    .catch(err => next(err));
  });
};

