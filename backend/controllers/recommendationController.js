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

            if (req.session.userId) {
                const user = await User.findById(req.session.userId);
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