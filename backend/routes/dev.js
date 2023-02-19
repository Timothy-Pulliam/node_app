const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({'Express': express.verision});
});

module.exports = router;