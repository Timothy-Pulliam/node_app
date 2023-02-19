const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema(
    {
        // first_name: {type: String, required: true},
        // last_name: {type: String, required: true},
        name: {
            type: String,
            required: true,
            unique: true
        },
        img:
        {
            data: Buffer,
            contentType: String
        },
        platform: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now()
        },
    },
    {
        timestamps: true,
    });


// module.exports.getUsers = () => {
//     User.find({}).exec(function (err, docs) {
//         console.log(docs); // returns json
//     });
// };

var Game = (module.exports = mongoose.model("Game", GameSchema));


// var tim = new User({ name: 'tim' });
// tim.save(function (err) {
//  if (err) return handleError(err);
//  saved!
//});
