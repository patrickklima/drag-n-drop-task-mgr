const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: String,
}, {
  timestamps: true
});

var User = mongoose.model('User', UserSchema);

module.exports = User;