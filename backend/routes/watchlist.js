const express = require('express');
const router = express.Router()


router.get('/', (req, res) => {
  console.log("Watchlist route hit");
  res.render('watchlist'); 
});

module.exports = router;