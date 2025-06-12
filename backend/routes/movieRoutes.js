const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');//authentication middleware bey protect certain routes
const {createMovie, deleteMovie, updateMovie} = require('../controllers/movieController');
//const admin = require('../middleware/admin');

router.post('/admin/movies/add', createMovie);
router.delete('/admin/movies/:id', deleteMovie);
//router.post('/admin/movies/update/:id', updateMovie);
router.put('/admin/movies/:id', updateMovie);

module.exports = router;


/*router.get('/', movieController.getMovies); //calls el getmovies function 3shan te return el list of all movies w di 3ady accessible by kol el users 3ady
router.get('/:id', movieController.getMovieById);//return info 3an movie specific b el ID w di public bardo

router.post('/', auth, admin, movieController.createMovie); //beytcheck lw el user logged in w admin w b3deen beynady 3ala el function
router.put('/:id', auth, admin, movieController.updateMovie); 
router.delete('/:id', auth, admin, movieController.deleteMovie);*/
//el put w el delete nafs el 7aga bas betcall different functions