const express = require('express'); //import express
const router = express.Router(); //it's like a miniapp to handle routes
const {signupUser, loginUser} = require('../controllers/userController'); //import sifnupUser and loginUser from the controller

//we define routes using router.METHOD(PATH, HANDLER)
//method: post, path: /signup, handler: signupUser
router.post('/signup', signupUser);
//mathod: post, path: /login, handler: loginUser
router.post('/login', loginUser);

module.exports = router;

