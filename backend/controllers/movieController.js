const Movie = require('../models/movie');
exports.createMovie = async (req,res)=>{//to create a new movie (can be done by  the admin only)
    if(!req.user.isAdmin) return res.status(403).json({ message: 'Access denied: Admins only'});//only allows admins
    try{
        const movie = new Movie(req.body);//a movie instance is created b el data mn el request body
        await movie.save();
        res.status(201).json(movie);//respond with the newly created movie and status  201 el howa created

    }catch(err){
        res.status(400).json({message : err.message});
    }
};
exports.getMovies = async (req, res) => {
    try {
        const movies = await Movie.find();//find all the movies in the database
        res.json(movies);//the response is the array of movies
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.getMovieById = async (req, res) => {//gets a single movie by its ID
    try {
        const movie = await Movie.findById(req.params.id);//find el movie mn el database using the id mn el url
        if (!movie) return res.status(404).json({ message: 'Movie not found' });
        res.json(movie);//respond with the movie data
    } catch (err) {
        res.status(400).json({ message: 'Invalid movie ID' });
    }
};
exports.updateMovie = async (req, res) => {
    if (!req.user.isAdmin) return res.status(403).json({ message: 'Access denied: Admins only.' });//allows only admins to do the operation
    try {
        const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });//beyla2y el movie by el id w bene3melaha update b el new data el f el request
        //betreturn el updated movie w runValidators di b te3mel check le el schema rules
        if (!movie) return res.status(404).json({ message: 'Movie not found' });
        res.json(movie);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
exports.deleteMovie = async (req, res) => {
    if (!req.user.isAdmin) return res.status(403).json({ message: 'Access denied: Admins only.' });
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);
        if (!movie) return res.status(404).json({ message: 'Movie not found' });
        res.json({ message: 'Movie deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: 'Invalid movie ID' });
    }
};
