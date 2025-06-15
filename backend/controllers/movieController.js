const Movie = require('../models/movie');

// Validation functions
const validateYear = (year) => {
    const currentYear = new Date().getFullYear();
    return year >= 1888 && year <= currentYear + 5; // First movie was made in 1888
};

const validateURL = (url) => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

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

const createMovie = async (req, res) => {
    const {name, genres, releaseYear, ageRating, image, trailer, description} = req.body;
    //if(!req.user.isAdmin) return res.status(403).json({ message: 'Access denied: Admins only'});//only allows admins

    // Input validation
    if (!name || !genres || !releaseYear || !ageRating || !image || !trailer || !description) {
        return res.status(400).json({message: 'All fields are required'});
    }

    if (typeof name !== 'string' || name.length < 1 || name.length > 100) {
        return res.status(400).json({message: 'Movie name must be between 1 and 100 characters'});
    }

    if (!validateGenres(genres)) {
        return res.status(400).json({message: 'Invalid genres provided'});
    }

    if (!validateYear(releaseYear)) {
        return res.status(400).json({message: 'Invalid release year'});
    }

    if (!validateURL(image)) {
        return res.status(400).json({message: 'Invalid image URL'});
    }

    if (!validateURL(trailer)) {
        return res.status(400).json({message: 'Invalid trailer URL'});
    }

    if (typeof description !== 'string' || description.length < 10 || description.length > 1000) {
        return res.status(400).json({message: 'Description must be between 10 and 1000 characters'});
    }

    try {
        const existingMovie = await Movie.findOne({name});
        if (existingMovie) return res.status(400).json({message: 'Movie already exists'});

        const newMovie = new Movie ({
            name,
            genres,
            releaseYear,
            ageRating,
            image,
            trailer, 
            description
        });
        await newMovie.save();

        res.status(201).json({message: 'Movie added successfully'});
    } catch (err) {
        res.status(500).json({message: 'Server error', error: err.message});
    }
};

const getMovies = async (req, res) => {
    try {
        const movies = await Movie.find();//find all the movies in the database
        res.json(movies);//the response is the array of movies
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getMovieById = async (req, res) => {//gets a single movie by its ID
    try {
        const movie = await Movie.findById(req.params.id);//find el movie mn el database using the id mn el url
        if (!movie) return res.status(404).json({ message: 'Movie not found' });
        res.json(movie);//respond with the movie data
    } catch (err) {
        res.status(400).json({ message: 'Invalid movie ID' });
    }
};

const updateMovie = async (req, res) => {
    const {name, genres, releaseYear, ageRating, image, trailer, description} = req.body;
    const {id} = req.params;
    //if (!req.user.isAdmin) return res.status(403).json({ message: 'Access denied: Admins only.' });//allows only admins to do the operation

    // Input validation
    if (!name || !genres || !releaseYear || !ageRating || !image || !trailer || !description) {
        return res.status(400).json({message: 'All fields are required'});
    }

    if (typeof name !== 'string' || name.length < 1 || name.length > 100) {
        return res.status(400).json({message: 'Movie name must be between 1 and 100 characters'});
    }

    if (!validateGenres(genres)) {
        return res.status(400).json({message: 'Invalid genres provided'});
    }

    if (!validateYear(releaseYear)) {
        return res.status(400).json({message: 'Invalid release year'});
    }

    if (!validateURL(image)) {
        return res.status(400).json({message: 'Invalid image URL'});
    }

    if (!validateURL(trailer)) {
        return res.status(400).json({message: 'Invalid trailer URL'});
    }

    if (typeof description !== 'string' || description.length < 10 || description.length > 1000) {
        return res.status(400).json({message: 'Description must be between 10 and 1000 characters'});
    }

    try {
        const movie = await Movie.findByIdAndUpdate(
            id,
            {name, genres, releaseYear, ageRating, image, trailer, description},
            {new: true, runValidators: true}
        );
        if (!movie) return res.status(400).json({message: 'Movie not found'});
        res.status(201).json({message: 'Movie updated successfully'});
    } catch (err) {
        res.status(500).json({message: 'Server error', error: err.message});
    }
};

const deleteMovie = async (req, res) => {
    //const {name} = req.body;
    const {id} = req.params;
    //if (!req.user.isAdmin) return res.status(403).json({ message: 'Access denied: Admins only.' });

    try {
        const movie = await Movie.findByIdAndDelete(id);
        if (!movie) return res.status(400).json({message: 'Movie not found'});
        res.status(200).json({message: 'Movie deleted successfully'});
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const searchMovies = async (req, res) => {
    try {
        const searchTerm = req.query.q || "";
        const movies = await Movie.find({ name: { $regex: searchTerm, $options: "i" } });
        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
module.exports = {createMovie, getMovies, getMovieById, updateMovie, deleteMovie,searchMovies};