const express = require('express');
const router = express.Router();

router.get(['/', '/index'], (req, res) => {
  res.render('index.njk');
});

router.get('/login', (req, res) => {
  res.render('login.njk');
});

// router.post('/login', (req, res) => {
//   //res.redirect(302, '/home');
//   // Use connect method to connect to the Server
//   mongoClient.connect(function(err) {
//     //assert.equal(null, err);
//     console.log("Connected successfully to server");
//
//     const db = client.db('App');
//     db.collection('users').insertOne({
//       email: req.body.email,
//       password: req.body.password
//     });
//
//     client.close();
//   });
// });

router.get('/register', (req, res) => {
  res.render('register.njk');
});

router.post('')

router.get('/home', (req, res) => {
  res.render('home.njk');
});

router.get('/hello', (req, res) => {
  res.send('hello');
});

// pattern matching in URL
router.get('/user/:name/:commentId', (req, res) => {
  res.send('User: ' + req.params.name + ' comment: ' + req.params.commentId);
});

router.get('/user/:id([0-9]{5})', (req, res) => {
  res.send('id: ' + req.params.id);
});

// Match all other urls
router.get('*', function(req, res) {
  res.send('Sorry, this is an invalid URL.');
});

// export router to main app
module.exports = router;