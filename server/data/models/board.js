var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BoardSchema = new Schema({
  boardTitle: String,
  listIds: Array
}, {
  timestamps: true
});

var Board = mongoose.model('Board', BoardSchema);

module.exports = Board;