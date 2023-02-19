const User = require('../models/userModel');
const router = express.Router();

// Get all streams
router.get('/', (req, res) => {
    User.find({}).exec(function (err, docs) {
        res.json(docs);
    });
});