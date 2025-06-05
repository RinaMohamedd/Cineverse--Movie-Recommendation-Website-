const express = require('express'); //import express
const router = express.Router(); //it's like a miniapp to handle routes

// Show signup page
router.get('/', (req, res) => {
  console.log('Signup page loaded');
  res.render('signup'); // renders signup.ejs
});

module.exports = router;