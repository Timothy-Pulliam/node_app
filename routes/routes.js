const express = require('express');
const router = express.Router();
const User = require('../models/models.js');
var bcrypt = require('bcrypt');
const saltRounds = 10;


router.get(['/', '/index'], (req, res) => {
  res.render('index.njk');
});

router.get('/login', (req, res) => {
  res.render('login.njk');
});

router.post('/login', (req, res) => {
    User.findOne({email: req.body.email}).exec(function (err, user) {
        console.log(user); // returns json
        var hashedPassword = user.password;

        bcrypt.compare(req.body.password, hashedPassword, function(err, result) {
            if(result == true) {
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
    bcrypt.hash(password, saltRounds, function(err, hash) {
        // Store hash in your password DB.
        var user = new User({username: username, email: email, password: hash});

        user.save(function (err, user) {
            if (err) return handleError(err);
        })

    res.redirect('/');
});

router.get('/home', (req, res) => {
  res.render('home.njk');
});

// pattern matching in URL
router.get('/user/:name/:commentId', (req, res) => {
  res.send('User: ' + req.params.name + ' comment: ' + req.params.commentId);
});

router.get('/user/:id([0-9]{5})', (req, res) => {
  res.send('id: ' + req.params.id);
});

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

// Match all other urls
router.get('*', function(req, res) {
  res.send('Sorry, this is an invalid URL.');
});

// export router to main app
module.exports = router;