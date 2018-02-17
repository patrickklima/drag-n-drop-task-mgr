const passport = require('passport');
const {User} = require('../data/models');

module.exports = (app) => {
  app.post('/register', (req, res, next) => {
    User.register(
      new User({username : req.body.username}), req.body.password
    ).then((user) => {
      passport.authenticate('local');
      return user;
    }).then((user) => res.json(JSON.stringify(user))
    ).catch(err => next(err));
  });
}