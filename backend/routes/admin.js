/*const express = require('express');
const router = express.Router();
router.post('/movies/add', (req, res) => {
  const title = req.body['movie-title'];//retrieves the movie title from the form data
  const genres = Array.isArray(req.body.genre) ? req.body.genre : [req.body.genre];
  const year = req.body['movie-year'];
  const age = req.body['movie-age'];
  const image = req.body['movie-image'];
  const trailer = req.body['movie-trailer'];
  const description = req.body['movie-description'];//le8ayet hena ana ba3mel retrieve le data mn el form 
  res.send('Movie added: ' + title);//bab3at response eno el movie added
});
router.post('/movies/remove', (req, res) => {
  const title = req.body['movie-title'];
  res.send('Movie removed: ' + title);//ba retrieve el movie title w bab3at response eno etmasa7
});
router.post('/movies/update', (req, res) => {
  const title = req.body['movie-title'];
  const genres = Array.isArray(req.body.genre) ? req.body.genre : [req.body.genre];//ba retrieve el data ka array bas 
  const year = req.body['movie-year'];
  const age = req.body['movie-age'];
  const image = req.body['movie-image'];
  const trailer = req.body['movie-trailer'];
  const description = req.body['movie-description'];
  res.send('Movie updated: ' + title);
});//basically nafs el 7aga ba rtrieve mn el form w ab3at response

module.exports = router;*/