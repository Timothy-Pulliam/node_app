const express = require('express');
const router = express.Router();

// Get all games
router.get('/', (req, res) => {
    res.render('games.njk');
});

module.exports = router;