const { body, validationResult } = require('express-validator');
const User = require('../models/userModel');
const express = require('express');
const router = express.Router();

// Get all users
router.get('/', (req, res) => {
    User.find({}).exec(function (err, docs) {
        res.json(docs);
    });
});

// create a new user
router.post(
  '/',
  // must be an email
  body('email').isEmail(),
  // password must be at least 5 chars long
  body('password').isLength({ min: 6 }),
  (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    User.create({
      email: req.body.email,
      password: req.body.password,
    }).then(user => res.json(user));
  },
);

module.exports = router;