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
};

ListSchema.statics.updateOne = (id, data) => {
  return List.findByIdAndUpdate(id, data);
};
ListSchema.statics.addCard = (id, newCardId) => {
  console.log("addCard", id, newCardId);
  return List.findById(id)
  .then(list => {
    list.cards = [...list.cards, newCardId];
    return list.save();
  });
};
ListSchema.statics.removeCard = (id, removedCardId) => {
  console.log("removeCard", id, removedCardId);
  return List.findById(id)
  .then(list => {
    list.cards = list.cards.filter(thisCardId => {
      console.log("thisCardId", thisCardId, "removedCardId", removedCardId, thisCardId != removedCardId); 
      return thisCardId != removedCardId;
    });
    console.log("List after filter", list.listTitle, list.cards);
    return list.save();
  });
};


var List = mongoose.model('List', ListSchema);

module.exports = List;