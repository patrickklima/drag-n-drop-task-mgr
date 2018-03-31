const jwt = require('jsonwebtoken');
const passport = require("passport");
const passportJWT = require("passport-jwt");
const {getFullUserByUserName} = require('./get-data-service');

const jwtOptions = {
  jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret'
};

const jwtService = {
  strategy: new passportJWT.Strategy(jwtOptions, (jwt_payload, next) => {
    console.log('payload received', jwt_payload);
    getFullUserByUserName(jwt_payload.username)
    .then(user => next(null, user))
    .catch(error => next(error));
  }),
  makeToken: (payload) => jwt.sign(payload, jwtOptions.secretOrKey),
};

module.exports = jwtService;