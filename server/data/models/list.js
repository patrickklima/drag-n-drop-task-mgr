var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ListSchema = new Schema({
  listTitle: String,
  description: String,
  cardIds: Array
}, {
  timestamps: true
});

var List = mongoose.model('List', ListSchema);

module.exports = List;