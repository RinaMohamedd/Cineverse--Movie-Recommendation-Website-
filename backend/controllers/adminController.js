const Movie = require('../models/movie');
const User = require('../models/user');
const Review = require('../models/review');

const getAdmin = async (req, res) => {
    try {
        //get the count of users, movies, and reviews
        const [userCount, movieCount, reviewCount] = await Promise.all([
            User.countDocuments(),
            Movie.countDocuments(),
            Review.countDocuments()
        ]);
        //render the admin page with the counts
        res.render('admin', {
            userCount,
            movieCount,
            reviewCount
        });
    } catch (err) {
        console.error('Error rendering admin page:', err);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    getAdmin
}; 