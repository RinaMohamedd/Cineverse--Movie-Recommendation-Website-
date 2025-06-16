const express = require('express');
const router = express.Router();
const { addReview, getMovieReviews } = require('../controllers/reviewController');
const auth = require('../middleware/auth');

// Protect all review routes with auth middleware
router.use(auth);

// Review routes
router.post('/', addReview);
router.get('/movie/:movieId', getMovieReviews);

module.exports = router; 