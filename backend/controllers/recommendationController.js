const Movie = require('../models/movie');
const User = require('../models/user');

const recommendMovie = async (req, res) => {
    const {genres, ageRating, releaseYear} = req.body;
    try {
         //this is a MongoDB query object
         let query = {
            genres: {$in: genres}, //find movies where genres includes any of the selected genres
            ageRating: {$lte: ageRating} //find movies where ageRating is less than or equal to the user's age
         };

         //if the user didn't choose "Doesn't matter", do the following
         if (releaseYear !== "any") {
            const currentYear = new Date().getFullYear(); //gets the current year
            const minYear = currentYear - parseInt(releaseYear); //converst the string 10 for example to a number then subtracts it from the current year
            query.releaseYear = {$gte: minYear}; //this adds another filter to the MongoDB query which then gets movies where releaseYear is greater than on equal to minYear
         }

         //this returns an array of movies that match the conditions
         const movies = await Movie.find(query); 

         //if we found any movies then proceed
         if (movies.length > 0) {
            const randomIndex = Math.floor(Math.random() * movies.length); //we're picking a random index from the array
            const recommendedMovie = movies[randomIndex]; //using the random index to actually grab one of the movies from the list
            
            if (req.session.user?.id) {
                const user = await User.findById(req.session.user.id);
                if (user) {
                    user.recommendationHistory.push(recommendedMovie._id);
                    await user.save();
                }
            }

            res.json({success: true, movie: recommendedMovie}); //sends the movie back to the frontend in a JSON response
         } else { //if array is empty
            res.json({success: false, message: "No movie found based on your preferences"});
         }
    } catch (err) {
        console.error(err);
        res.status(500).json({success:false, message: "Server error"});
    }
};

module.exports = {recommendMovie};

/*const Movie = require('../models/movie');
const User = require('../models/user');

// Validation functions
const validateGenres = (genres) => {
    if (!Array.isArray(genres) || genres.length === 0) return false;
    const validGenres = [
        'Action',
        'Mystery',
        'Horror',
        'Family',
        'Thriller',
        'Musical',
        'Fantasy',
        'Crime',
        'Comedy',
        'Drama',
        'Sci-Fi',
        'Animation',
        'Romance',
        'Adventure'
    ];
    return genres.every(genre => validGenres.includes(genre));
};

const validateReleaseYear = (year) => {
    if (year === "any") return true;
    const currentYear = new Date().getFullYear();
    const yearNum = parseInt(year);
    return !isNaN(yearNum) && yearNum >= 1 && yearNum <= 100;
};

const recommendMovie = async (req, res) => {
    const {genres, ageRating, releaseYear} = req.body;

    // Input validation
    if (!genres || !ageRating || !releaseYear) {
        return res.status(400).json({message: 'All fields are required'});
    }

    if (!validateGenres(genres)) {
        return res.status(400).json({message: 'Invalid genres provided'});
    }

    if (!validateReleaseYear(releaseYear)) {
        return res.status(400).json({message: 'Invalid release year range'});
    }

    try {
        //this is a MongoDB query object
        let query = {
            genres: {$in: genres}, //find movies where genres includes any of the selected genres
            ageRating: {$lte: ageRating} //find movies where ageRating is less than or equal to the user's age
        };

        //if the user didn't choose "Doesn't matter", do the following
        if (releaseYear !== "any") {
            const currentYear = new Date().getFullYear(); //gets the current year
            const minYear = currentYear - parseInt(releaseYear); //converst the string 10 for example to a number then subtracts it from the current year
            query.releaseYear = {$gte: minYear}; //this adds another filter to the MongoDB query which then gets movies where releaseYear is greater than on equal to minYear
        }

        //this returns an array of movies that match the conditions
        const movies = await Movie.find(query);
        
        if (movies.length === 0) {
            return res.status(404).json({message: 'No movies found matching your criteria'});
        }

        res.status(200).json(movies);
    } catch (err) {
        console.error('Error in recommendMovie:', err);
        res.status(500).json({message: 'Server error', error: err.message});
    }
};

module.exports = {recommendMovie};*/