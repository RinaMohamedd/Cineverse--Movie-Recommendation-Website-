const express = require('express');
const router = express.Router()


router.get('/', (req, res) => {
  res.render('home'); 
});

/*router.get('/watchlist', (req, res) => {
  console.log("Watchlist route hit");
  res.render('watchlist'); 
});*/

/*router.get('/login', (req, res) => {
  console.log("Login route hit");
  res.render('login'); 
});*/

module.exports = router;