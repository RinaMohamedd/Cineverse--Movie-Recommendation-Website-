const User = require('../models/user'); //import user model
const bcrypt = require('bcrypt'); //for hashing passwords
const jwt = require('jsonwebtoken'); //for making tokens for users that logged in before

//for users that are registering for the first time
const signupUser = async (req, res) => {
    //this reads what the user typed in the signup form
    const {username, email, password} = req.body; //grab from inputs

try {
    //check if the email is already in use, if yes then throw an error
    const existingUser = await User.findOne({email});
    if (existingUser) return res.status(400).json({message: 'User already exists'});

    //encryps the password before saving it, 10 is the encryption level
    const hashedPassword = await bcrypt.hash(password, 10);

    //now we're creating a new user and saving it to the database
    const newUser = new User({
        username, 
        email, 
        password: hashedPassword
    });
    await newUser.save();

    //this is a success response
    res.status(201).json({message: 'User signed up successfully'});
   } catch (err) { //this error means it wasn't a client error so it must've been a server error
    res.status(500).json({message: 'Server error', error: err.message});
   }
};


//for users that are already registered and what to login
const loginUser = async (req, res) => { //if you use async you can then use await() inside this function
    //read login form data
    const {email, password} = req.body;

    try {
        //checks if the user exists in the database by email and throws an error if they don't
        const user = await User.findOne({email});
        if (!user) return res.status(400).json({message: 'User not found'});

        //in case of existance then we'll compare the password entered with the saved one, throw an error if it's not a match
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({message: 'Invalid password'});

        //in case it was a match we'll move on to creating the token for that user
        const token = jwt.sign(
            {userId: user._id, isAdmin: user.isAdmin}, //stores id and admin info (whether it's an admin user or not)
            process.env.JWT_SECRET, //uses a secret key from our .env file
            {expiresIn: '1h'} //will be removed after 1h meaning the user will be required to login again
        );

        //this returns the token plus basic user info to the frontend
        res.status(200).json({message: 'Login successful', userId: user._id, isAdmin: user.isAdmin});
    } catch (err) { //server error
        res.status(500).json({message: 'Server error', error: err.message});
    }
};
const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
const addToWatchlist = async (req, res) => {
    const { movieId } = req.body;
    try {
        const user = await User.findById(req.user.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        if (!user.whatchlist.includes(movieId)) {
            user.whatchlist.push(movieId);
            await user.save();
        }
        res.json({ message: 'Added to watchlist' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
const getWatchlist = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).populate('whatchlist');
        res.json(user.whatchlist);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports = {signupUser, loginUser,getProfile,addToWatchlist,getWatchlist};