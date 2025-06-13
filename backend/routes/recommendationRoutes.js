const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const {recommendMovie} = require('../controllers/recommendationController');

router.post('/start_now', authMiddleware, recommendMovie);

module.exports = router;