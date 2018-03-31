const passport = require('passport');
const {getFullUserById, getFullUserByUserName} = require('../services/get-data-service');
const {makeToken} = require('../services/jwt-service');
const {comparePasswords} = require('../services/password-service');

module.exports = (app) => {
  app.post('/login', (req, res, next) => {
    return getFullUserByUserName(req.body.username)
    .then(userData => {
      let user = userData[0];
      const isAuthorizedUser = comparePasswords(req.body.password, user.password);
      if (isAuthorizedUser) {
        const token = makeToken({id: user._id})
        return res.json([{user, token}]);
      } else {
        let err = new Error("Invalid password. User login failed.")
        err.response = {
          status: 401
        };
        throw err;
      }
    })
    .catch(err => next(err));
  });
    
  app.get('/authenticate', 
    passport.authenticate('local'),
    (req, res, next) => res.sendStatus(200));


}