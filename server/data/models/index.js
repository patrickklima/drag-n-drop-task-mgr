var mongoose = require('mongoose');
var bluebird = require('bluebird');

mongoose.Promise = bluebird;

var models = {
  User: require('./user'),
  Board: require('./board'),
  List: require('./list'),
  Card: require('./card'),
};

module.exports = models;