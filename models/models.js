const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    // first_name: {type: String, required: true},
    // last_name: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    date: {type: Date, default: Date.now()}  
});

var User = module.exports = mongoose.model("User", UserSchema);

module.exports.getUsers = () => {
    User.find({}).exec(function (err, docs) {
        console.log(docs); // returns json
    });
}

// var tim = new User({ name: 'tim' });
// tim.save(function (err) {
//  if (err) return handleError(err);
//  saved!
//});