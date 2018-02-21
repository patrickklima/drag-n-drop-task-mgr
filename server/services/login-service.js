const passport = require('passport');
const {getFullUserById, getFullUserByUserName} = require('./data-service');

module.exports = (app) => {
  app.post('/login', 
    passport.authenticate('local'), 
    (req, res, next) => {
      getFullUserByUserName(req.body.username)
      .then(user => {
        res.json(JSON.stringify(user))
      })
      .catch(err => next(err));
    }
  )
  
  app.get('/authenticate', 
    passport.authenticate('local'),
    (req, res, next) => res.sendStatus(200));


}