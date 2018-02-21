const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const Board = require('./board');

var UserSchema = new Schema({
  username: String,
  password: String
}, {
  timestamps: true
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
    .populate('boards')
    .populate('cards');
}

UserSchema.statics.getFullUserByUserName = (username) => {
  return User
    .find({username})
    .populate('boards')
    .populate('cards');
}

UserSchema.plugin(passportLocalMongoose);

var User = mongoose.model('User', UserSchema);

module.exports = User;