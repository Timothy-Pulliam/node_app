const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
    {
        // first_name: {type: String, required: true},
        // last_name: {type: String, required: true},
        username: {
            type: String, 
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            min: 6,
        },
        date: {
            type: Date,
            default: Date.now()
        },
    },
    {
        timestamps: true,
    });

// TODO: understand this
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

// module.exports.getUsers = () => {
//     User.find({}).exec(function (err, docs) {
//         console.log(docs); // returns json
//     });
// };

var User = (module.exports = mongoose.model("User", UserSchema));


// var tim = new User({ name: 'tim' });
// tim.save(function (err) {
//  if (err) return handleError(err);
//  saved!
//});
