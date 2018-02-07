const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ListSchema = new Schema({
  listTitle: String,
  description: String,
  cards: [{type: Schema.Types.ObjectId, ref: 'Card'}]
}, {
  timestamps: true
});

ListSchema.statics.getListAndCards = (id) => {
  return List.find({_id: id}).populate('cards');
}

var List = mongoose.model('List', ListSchema);

module.exports = List;