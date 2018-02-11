const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var BoardSchema = new Schema({
  boardTitle: String,
  lists: [{type: Schema.Types.ObjectId, ref: 'List'}]
}, {
  timestamps: true
});

BoardSchema.statics.getBoardAndLists = (id) => {
  return Board
    .find({_id: id})
    .populate({
      path: 'lists',
      populate: {path: 'cards'}
    });
};

var Board = mongoose.model('Board', BoardSchema);

module.exports = Board;


// AnimalSchema.methods.findByType = function (cb) {
//   return this.model('Animal').find({ type: this.type }, cb);
// };

// dog.findByType(function (err, dogs) {
//   console.log(dogs);
// });

// AnimalSchema.statics.findAnimalsWithATail = function (cb) {
//   Animal.find({ hasTail: true }, cb);
// };


// Animal.findAnimalsWithATail(function (animals) {
//   console.log(animals);
// });