const User = require('../models/user'); //import user model
const bcrypt = require('bcrypt'); //for hashing passwords
//const jwt = require('jsonwebtoken'); //for making tokens for users that logged in before
const nodemailer = require('nodemailer');
const UserActivity = require('../models/userActivity');

// Validation functions
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validatePassword = (password) => {
    // Accept any non-empty password
    return typeof password === 'string' && password.length > 0;
};

const validateUsername = (username) => {
    // 3-20 characters, alphanumeric and underscore only
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
};

const validateFullname = (fullname) => {
    // 2-50 characters, letters and spaces only
    const fullnameRegex = /^[a-zA-Z\s]{2,50}$/;
    return fullnameRegex.test(fullname);
};

//for users that are registering for the first time
const signupUser = async (req, res) => {
    const {fullname, username, email, password} = req.body;

    // Input validation
    if (!fullname || !username || !email || !password) {
        return res.status(400).json({message: 'All fields are required'});
    }

    if (!validateEmail(email)) {
        return res.status(400).json({message: 'Invalid email format'});
    }

    if (!validateUsername(username)) {
        return res.status(400).json({
            message: 'Username must be 3-20 characters long and contain only letters, numbers, and underscores'
        });
    }

    if (!validateFullname(fullname)) {
        return res.status(400).json({
            message: 'Full name must be 2-50 characters long and contain only letters and spaces'
        });
    }

    try {
        //check if the email is already in use, if yes then throw an error
        const existingUser = await User.findOne({email});
        if (existingUser) return res.status(400).json({message: 'User already exists'});

        //check if username is already taken
        const existingUsername = await User.findOne({username});
        if (existingUsername) return res.status(400).json({message: 'Username already taken'});

        //encryps the password before saving it, 10 is the encryption level
        const hashedPassword = await bcrypt.hash(password, 10);

        //now we're creating a new user and saving it to the database
        const newUser = new User({
            fullname,
            username, 
            email, 
            password: hashedPassword,
            verified: false
        });
        await newUser.save();

        //this is a success response
        res.status(201).json({message: 'Signup successful. Please verify your email!'});
    } catch (err) {
        res.status(500).json({message: 'Server error', error: err.message});
    }
};


//for users that are already registered and what to login
const loginUser = async (req, res) => {
    const {email, password} = req.body;

    // Input validation
    if (!email || !password) {
        return res.status(400).json({message: 'Email and password are required'});
    }

    if (!validateEmail(email)) {
        return res.status(400).json({message: 'Invalid email format'});
    }

    try {
        // Find user and explicitly select the fields we need
        const user = await User.findOne({email}).select('_id email password fullname isAdmin username');
        if (!user) return res.status(400).json({message: 'User not found'});

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({message: 'Invalid password'});

        console.log("Found user:", user);
        console.log("Storing session:", user._id, user.username);

        //session
        req.session.user = {
            id: user._id,
            username: user.username
        };

        // Create login activity
        await new UserActivity({
            user: user._id,
            action: 'LOGIN',
            details: 'User logged in'
        }).save();

        //this returns the token plus basic user info to the frontend
        res.status(200).json({message: 'Login successful', userId: user._id, isAdmin: user.isAdmin});
    } catch (err) {
        res.status(500).json({message: 'Server error. Please try again later', error: err.message});
    }
};

const logoutUser = async (req, res) => {
    try {
        if (req.session.user && req.session.user.id) {
            // Create logout activity
            await new UserActivity({
                user: req.session.user.id,
                action: 'LOGOUT',
                details: 'User logged out'
            }).save();
        }

        req.session.destroy((err) => {
            if (err) return res.status(500).json({message: 'Logout failed'});
            res.clearCookie('connect.sid');
            res.json({message: 'Logged out'});
        });
    } catch (err) {
        console.error('Error in logoutUser:', err);
        res.status(500).json({message: 'Logout failed', error: err.message});
    }
};


const getProfile = async (req, res) => {
    try {
        if (!req.session.user || !req.session.user.id) {
        return res.status(401).json({ message: 'Not logged in' });
    }
        const user = await User.findById(req.session.user.id).select('-password');//this fetches all the fields except the password
        res.json(user);//sends the user data as a JSON response
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });//lw an error occurd send server error(500) and the error details
    }
};//this function gets the user profile and returns all the data except the password


const addToWatchlist = async (req, res) => {
    if (!req.session.user || !req.session.user.id) {
        return res.status(401).json({ message: 'Not logged in' });
    }
    const { movieId } = req.body;
    try {
        const user = await User.findById(req.session.user.id);//find the user usinf the ID
        if (!user) return res.status(404).json({ message: 'User not found' });//if user not found send 404 error
        if (!user.watchlist.includes(movieId)) {//adds the movie to the list if it isnt already there in order to pervent duplicatess
            user.watchlist.push(movieId);
            await user.save();

            // Create watchlist activity
            await new UserActivity({
                user: req.user.user.id,
                action: 'ADD_TO_WATCHLIST',
                details: `Added movie ${movieId} to watchlist`
            }).save();
        }
        res.json({ message: 'Added to watchlist' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};//just to let the user save movies they like or want to watch at a later time


const getWatchlist = async (req, res) => {
     if (!req.session.user || !req.session.user.id) {
        return res.status(401).json({ message: 'Not logged in' });
    }
    try {
        const user = await User.findById(req.session.user.id).populate('watchlist');//.populate('watchlist')di 3shan a get full ovie details not just IDs
        res.json(user.watchlist);//sends the watchlist (an array of movies) as a JSON response
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};//the user needs to be able to view their saved movies at anytime, so that's what this functtion does

const checkSession = async (req, res) => {
    if (req.session && req.session.user && req.session.user.id) {
        try {
            const user = await User.findById(req.session.user.id).select("username isAdmin");
            if (!user) {
                return res.json({loggedIn: false});
            }

            res.json({
                loggedIn: true,
                username: user.username,
                isAdmin: user.isAdmin
            });
        } catch (err) {
            console.error("Error fetching user in checkSession:", err);
            res.status(500).json({loggedIn: false});
        }
    } else {
        res.json({loggedIn: false});
    }
};

const changePassword = async (req, res) => {
    try {
        const userId = req.session.user.id;
        const {oldPassword, newPassword} = req.body;

        // Input validation
        if (!oldPassword || !newPassword) {
            return res.status(400).json({message: 'Both old and new passwords are required'});
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).json({message: 'User not found'});
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({message: 'Old password is incorrect'});
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        // Create password change activity
        await new UserActivity({
            user: userId,
            action: 'UPDATE_PROFILE',
            details: 'Changed password'
        }).save();
        
        res.status(200).json({message: 'Password updated successfully'});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Server error'});
    }
};

module.exports = {signupUser, loginUser, logoutUser, getProfile, addToWatchlist, getWatchlist, checkSession, changePassword};