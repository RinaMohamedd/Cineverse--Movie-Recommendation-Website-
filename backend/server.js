require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors'); //cross-origin resource sharing
const path = require('path');
const session = require('express-session');
const User = require('./models/user'); //needed for profile pic lookup

//routes imports
const homeRoutes = require("./routes/home");
const loginRoutes = require("./routes/login");
const movieRoutes = require("./routes/movieRoutes");
const recomRoutes = require("./routes/recommendations");
const signupRoutes = require("./routes/signup");
const userRoutes = require("./routes/userRoutes");
const watchlistRoutes = require("./routes/watchlist");
const recommendationRoutes = require('./routes/recommendationRoutes');
const adminRoutes = require('./routes/adminRoutes');
const profileRoutes = require("./routes/profile");
const reviewRoutes = require('./routes/reviewRoutes');
const adminMiddleware = require('./middleware/admin');

const uri = process.env.MONGODB_URI;

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS setup
app.use(cors({
    origin: ["http://localhost:5000", "http://localhost:3000"],
    credentials: true //allows sending cookies
}));

// Session middleware setup
app.use(session({
    secret: 'super-secret-code', //should be changed to some actual code that we'll store in .env
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, //true only if using https
        httpOnly: true,
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24 * 2 //2 days
    }
}));

// EJS & Static
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../frontend/pages'));
app.use(express.static(path.join(__dirname, '../frontend/public')));
app.use('/uploads', express.static(path.join(__dirname, '/public/uploads')));

//global profile pic middleware
app.use(async (req, res, next) => {
    if (req.session.user && req.session.user.id) {
        try {
            const user = await User.findById(req.session.user.id).lean();
            res.locals.profilePic = user?.profilePic || '/images/profile1.jpg';
        } catch (err) {
            console.error('Error loading user profile pic:', err);
            res.locals.profilePic = '/images/profile1/jpg';
        }
    } else {
        res.locals.profilePic = '/images/profile1.jpg';
    }
    next();
});

//add req.user to locals if needed
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// API Routes - Must be before page routes
app.use('/api/watchlist', watchlistRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/users', userRoutes);
app.use('/api/recommendation', recommendationRoutes);
app.use('/api/reviews', reviewRoutes);

// Page routes
app.use('/', homeRoutes);
app.use('/', profileRoutes);
app.use('/', movieRoutes);
app.use('/login', loginRoutes);
app.use('/signup', signupRoutes);
app.use('/admin', adminRoutes);
app.use('/recommendations', recomRoutes);
app.use('/watchlist', watchlistRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    if (req.path.startsWith('/api/')) {
        res.status(500).json({ success: false, message: 'Something broke!', error: err.message });
    } else {
        res.status(500).send('Something broke!');
    }
});

// 404 handler - Must be after all routes
app.use((req, res) => {
    if (req.path.startsWith('/api/')) {
        res.status(404).json({ success: false, message: 'Not Found' });
    } else {
        res.status(404).send('Page not found');
    }
});

// MongoDB connection and server start
mongoose.connect(uri)
.then(() => { 
    console.log('MongoDB Connected')
    app.listen(process.env.PORT, '0.0.0.0', () => {
    console.log(`Server is on http://localhost:${process.env.PORT}`);
    });
})
.catch((err) => console.error('MongoDB Connection Error: ', err));