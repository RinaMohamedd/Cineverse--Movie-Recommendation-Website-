const express = require('express'); //import express
const router = express.Router(); //it's like a miniapp to handle routes

// Show login page
router.get('/', (req, res) => {
  console.log('Login page loaded');
  res.render('login'); // renders login.ejs
});

module.exports = router;