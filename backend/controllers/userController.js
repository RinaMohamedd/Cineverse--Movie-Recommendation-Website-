const User = require('../models/user'); //import user model
const bcrypt = require('bcrypt'); //for hashing passwords
//const jwt = require('jsonwebtoken'); //for making tokens for users that logged in before
const nodemailer = require('nodemailer');

//for users that are registering for the first time
const signupUser = async (req, res) => {
    //this reads what the user typed in the signup form
    const {fullname, username, email, password} = req.body; //grab from inputs

try {
    //check if the email is already in use, if yes then throw an error
    const existingUser = await User.findOne({email});
    if (existingUser) return res.status(400).json({message: 'User already exists'});

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


    //set up email transporter
    /*const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });*/

    //email content
    /*const mailOptions = {
        from: process.env.EMAIL_USER,
        to: newUser.email,
        subject: 'Verify Your Email',
        html: 
            `<h2>Hello ${newUser.fullname}!</h2>
            <p>Click the link below to verify your email:</p>
            <a href="http://localhost:5000/auth/verify/${token}">Verify Email</a>`
    };*/

    //send it
    //await transporter.sendMail(mailOptions);

    //this is a success response
    res.status(201).json({message: 'Signup successful. Please verify your email!'});
   } catch (err) { //this error means it wasn't a client error so it must've been a server error
    res.status(500).json({message: 'Server error', error: err.message});
   }
};


//for users that are already registered and what to login
const loginUser = async (req, res) => {
    const {email, password} = req.body;

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

        //this returns the token plus basic user info to the frontend
        res.status(200).json({message: 'Login successful', userId: user._id, isAdmin: user.isAdmin});
    } catch (err) { //server error
        res.status(500).json({message: 'Server error. Please try again later', error: err.message});
    }
};

const logoutUser = async (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).json({message: 'Logout failed'});
        res.clearCookie('connect.sid');
        res.json({message: 'Logged out'});
    });
};


const getProfile = async (req, res) => {
    try {
        if (!req.session.user || !req.session.user.id) {
        return res.status(401).json({ message: 'Not logged in' });
    }
        const user = await User.findById(req.user.user.id).select('-password');//this fetches all the fields except the password
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
        const user = await User.findById(req.user.user.id);//find the user usinf the ID
        if (!user) return res.status(404).json({ message: 'User not found' });//if user not found send 404 error
        if (!user.watchlist.includes(movieId)) {//adds the movie to the list if it isnt already there in order to pervent duplicatess
            user.watchlist.push(movieId);
            await user.save();
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
        const user = await User.findById(req.user.user.id).populate('watchlist');//.populate('watchlist')di 3shan a get full ovie details not just IDs
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

module.exports = {signupUser, loginUser, logoutUser, getProfile, addToWatchlist, getWatchlist, checkSession};