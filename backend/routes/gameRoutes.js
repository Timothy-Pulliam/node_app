const User = require('../models/userModel');
const router = express.Router();

// Get all games
router.get('/', (req, res) => {
    User.find({}).exec(function (err, docs) {
        res.json(docs);
    });
});