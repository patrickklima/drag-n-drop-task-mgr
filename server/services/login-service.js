const passport = require('passport');
const {User} = require('../data/models');

module.exports = (app) => {
  app.post('/login', 
    passport.authenticate('local'), 
    (req, res, next) => {
      User.findOne({'username': req.body.username})
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