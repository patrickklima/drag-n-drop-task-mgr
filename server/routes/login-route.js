const passport = require('passport');
const {getFullUserById, getFullUserByUserName} = require('../services/get-data-service');


module.exports = (app) => {
  app.post('/login', 
    passport.authenticate('local'), 
    (req, res, next) => {
      getFullUserByUserName(req.body.username)
      .then(user => {
        req.user.boards = user[0].boards;
        req.user.cards = user[0].cards;
        return res.json(user);
      })
      .catch(err => next(err));
    }
  )
  
  app.get('/authenticate', 
    passport.authenticate('local'),
    (req, res, next) => res.sendStatus(200));


}