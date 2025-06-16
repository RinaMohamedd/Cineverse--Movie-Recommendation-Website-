const Review = require('../models/review');
const Movie = require('../models/movie');
const UserActivity = require('../models/userActivity');

// Add a review
const addReview = async (req, res) => {
    try {
        const { movieId, rating, comment } = req.body;
        const userId = req.session.user.id;

        if (!movieId || !rating) {
            return res.status(400).json({ message: 'Movie ID and rating are required' });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: 'Rating must be between 1 and 5' });
        }

        // Check if user has already reviewed this movie
        const existingReview = await Review.findOne({ user: userId, movie: movieId });
        if (existingReview) {
            return res.status(400).json({ message: 'You have already reviewed this movie' });
        }

        // Create the review
        const review = new Review({
            user: userId,
            movie: movieId,
            rating,
            comment
        });

        await review.save();

        // Update movie's average rating
        const movie = await Movie.findById(movieId);
        if (movie) {
            movie.reviews.push(review._id);
            const allReviews = await Review.find({ movie: movieId });
            const totalRating = allReviews.reduce((sum, r) => sum + r.rating, 0);
            movie.averageRating = (totalRating / allReviews.length).toFixed(1);
            await movie.save();
        }

        // Create review activity
        await new UserActivity({
            user: userId,
            action: 'ADD_REVIEW',
            details: `Added a ${rating}-star review for movie ${movieId}`
        }).save();

        res.status(201).json({ message: 'Review added successfully', review });
    } catch (err) {
        console.error('Error in addReview:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Get reviews for a movie
const getMovieReviews = async (req, res) => {
    try {
        const { movieId } = req.params;
        const reviews = await Review.find({ movie: movieId })
            .populate('user', 'fullname username')
            .sort({ createdAt: -1 });

        res.status(200).json(reviews);
    } catch (err) {
        console.error('Error in getMovieReviews:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports = {
    addReview,
    getMovieReviews
}; 