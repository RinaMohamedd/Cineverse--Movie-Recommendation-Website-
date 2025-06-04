const express = require('express'); //import express
const router = express.Router(); //it's like a miniapp to handle routes
const {signupUser, loginUser} = require('../controllers/userController'); //import sifnupUser and loginUser from the controller

// Show login page
router.get('/login', (req, res) => {
  console.log('Login page loaded');
  res.render('login'); // renders login.ejs
});

// Show signup page
router.get('/signup', (req, res) => {
  console.log('Signup page loaded');
  res.render('signup'); // renders signup.ejs
});

//we define routes using router.METHOD(PATH, HANDLER)
//method: post, path: /signup, handler: signupUser
router.post('/signup', signupUser);
//mathod: post, path: /login, handler: loginUser
router.post('/login', loginUser);

module.exports = router;