const passport = require('passport');
const {getFullUserById, getFullUserByUserName} = require('./data-service');

// LOG-4JS LOGGER
// ----------
const log4js = require('log4js');
const logger = log4js.getLogger();
logger.level = 'debug';
log4js.configure({
  appenders: {
    everything: { type: 'file', filename: 'node.js.log' }
  },
  categories: {
    default: { appenders: [ 'everything' ], level: 'debug' }
  }
});

module.exports = (app) => {
  app.post('/login', 
    passport.authenticate('local'), 
    (req, res, next) => {
      getFullUserByUserName(req.body.username)
      .then(user => {
        // logger.debug("user", user, "\n boards", user[0].boards, "\n cards",user[0].cards);
        req.user.boards = user[0].boards;
        req.user.cards = user[0].cards;
        logger.debug("res", res);
        return res.json(user);
      })
      .catch(err => next(err));
    }
  )
  
  app.get('/authenticate', 
    passport.authenticate('local'),
    (req, res, next) => res.sendStatus(200));


}