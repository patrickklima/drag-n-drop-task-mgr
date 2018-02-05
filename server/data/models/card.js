var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CardSchema = new Schema({
  cardTitle: String,
  description: String,
  members: Array,
  changes: Array
}, {
  timestamps: true
});

var Card = mongoose.model('Card', CardSchema);

module.exports = Card;