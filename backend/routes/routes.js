const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
var bcrypt = require('bcrypt');
const saltRounds = 10;


router.get(['/', '/index'], (req, res) => {
    res.render('index.njk');
});

router.get('/login', (req, res) => {
    res.render('login.njk');
});

router.post('/login', (req, res) => {
    User.findOne({ email: req.body.email }).exec(function (err, user) {
        console.log(user); // returns json
        var hashedPassword = user.password;

        bcrypt.compare(req.body.password, hashedPassword, function (err, result) {
            if (result == true) {
                console.log("authentication successful");
                // 
            }
        });
    });
});

// Registration page
router.get('/register', (req, res) => {
    res.render('register.njk');
});

router.post('/register', (req, res) => {

    var email = req.body.email;
    var password = req.body.password;
    var username = req.body.username;

    //THIS IS VERY IMPORTANT
    bcrypt.hash(password, saltRounds, function (err, hash) {
        // Store hash in your password DB.
        // User.init().then(() => {
        //     User.create({username: username, email: email, password: hash}, (err) => {
        //         console.log(err);
        //     });
        // })

        User.updateOne({ username: username, email: email }, // query
            { $setOnInsert: { username: username, email: email, password: hash } }, // insert if not exists
            { upsert: true });

        // var user = new User({username: username, email: email, password: hash}).init().then(() => {
        //     user.save(function (err, user) {
        //         if (err) return handleError(err);
        //     })
        // });

        res.redirect('/');
    });
});

router.get('/home', (req, res) => {
    res.render('home.njk');
});

// pattern matching in URL
// router.get('/user/:name/:commentId', (req, res) => {
//     res.send('User: ' + req.params.name + ' comment: ' + req.params.commentId);
// });

// router.get('/user/:id([0-9]{5})', (req, res) => {
//     res.send('id: ' + req.params.id);
// });

// router.get('/users', (req, res) => {
//     res.json(getUsers());
//   });

// pattern matching in URL
// router.get('/user/:email', (req, res) => {
//     console.log(req.params.email);
//     User.findOne({'email': req.params.email}).exec((err, item) => {
//         if (err) return handleError(err);
//         console.log(item);
//         res.send(item.password)
//     });
//   });


// const { body, validationResult } = require('express-validator');

// router.post(
//     '/user',
//     // must be an email
//     body('email').isEmail(),
//     // password must be at least 5 chars long
//     body('password').isLength({ min: 5 }),
//     (req, res) => {
//         // Finds the validation errors in this request and wraps them in an object with handy functions
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }

//         User.create({
//             username: req.body.username,
//             email: req.body.email,
//             password: req.body.password,
//         }).then(user => res.json(user));
//     },
// );

// router.get('/users', (req, res) => {
//     User.find({}).exec(function (err, docs) {
//         res.json(docs); // returns json
//     });
// });

// Match all other urls
router.get('*', function (req, res) {
    res.send('Sorry, this is an invalid URL.');
});

// export router to main app
module.exports = router;