const passport = require('passport');
const {User} = require('../data/models');

module.exports = (app) => {
  app.post('/register', (req, res, next) => {
    User.register(new User(
      {username : req.body.username}), 
      req.body.password,
      (err, user) => {
        if (err) {
          err.response.status == '403';
          return next(err);
        }
        passport.authenticate('local');
        res.json(JSON.stringify(user));
      }
    )
  });
  


}