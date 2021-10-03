const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

var User = mongoose.model('User', UserSchema);

// Save a user

// var tim = new User({ name: 'tim' });
// tim.save(function (err) {
//  if (err) return handleError(err);
//  saved!
//});