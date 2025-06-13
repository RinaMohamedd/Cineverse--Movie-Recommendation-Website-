const express = require('express'); //import express
const router = express.Router(); //it's like a miniapp to handle routes
const {signupUser, loginUser, logoutUser, getProfile, addToWatchlist, getWatchlist, checkSession} = require('../controllers/userController'); //import the functions that handle signup,login,profile,and watchlist from the controller
const authMiddleware = require('../middleware/auth');

router.get('/check-session', checkSession);

//we define routes using router.METHOD(PATH, HANDLER)
//method: post, path: /signup, handler: signupUser
router.post('/signup', signupUser);
//mathod: post, path: /login, handler: loginUser
router.post('/login', loginUser);
//
router.post('/logout', logoutUser);

// Define a GET/POST route for "/profile", "/watchlist"  that is protected by the authMiddleware.
// This means only logged-in users can do the operation
router.get('/profile', authMiddleware, getProfile);
router.post('/watchlist', authMiddleware, addToWatchlist);
router.get('/watchlist', authMiddleware, getWatchlist);

module.exports = router;

