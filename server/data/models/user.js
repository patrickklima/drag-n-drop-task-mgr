const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: String,
  password: String  //hashed by bcrypt
}, {
  timestamps: true,
  toJSON: { getters: true, virtuals: true },
  toObject: { getters: true, virtuals: true } 
});

UserSchema.virtual('boards', {
  ref: 'Board',
  localField: '_id',
  foreignField: 'members',
  justOne: false
});

UserSchema.virtual('cards', {
  ref: 'Card',
  localField: '_id',
  foreignField: 'members',
  justOne: false
});

UserSchema.statics.getFullUserById = (_id) => {
  return User
    .find({_id})
    .populate({path: 'boards', select: 'boardTitle'})
    .populate({path: 'cards', select: 'cardTitle'});
}

UserSchema.statics.getFullUserByUserName = (username) => {
  return User
    .find({username})
    // .populate('boards')
    // .populate('cards');
    .populate({path: 'boards', select: 'boardTitle'})
    .populate({path: 'cards', select: 'cardTitle'});
}

var User = mongoose.model('User', UserSchema);

module.exports = User;