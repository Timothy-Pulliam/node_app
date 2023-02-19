const express = require('express');
const router = express.Router();

// Get all streams
router.get('/', (req, res) => {
    res.json('streams');
});

module.exports = router;