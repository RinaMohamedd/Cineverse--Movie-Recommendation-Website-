require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const session = require('express-session');
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
const uri = process.env.MONGODB_URI;

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS setup
app.use(cors({
    origin: ["http://localhost:5000", "http://localhost:3000"],
    credentials: true
}));

// Session middleware setup
app.use(session({
    secret: 'super-secret-code',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24 * 2
    }
}));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../frontend/pages'));
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Request logging middleware
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// API Routes - Put these before the page routes
app.use('/api/users', userRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/watchlist', watchlistRoutes);
app.use('/api/recommendation', recommendationRoutes);

// Admin routes - Put these before other page routes
app.use('/admin', adminRoutes);

// Page Routes
app.use('/login', loginRoutes);
app.use('/signup', signupRoutes);
app.use('/recommendations', recomRoutes);
app.use('/watchlist', watchlistRoutes);
app.use('/profile', profileRoutes);
app.use('/', homeRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({message: 'Something broke!'});
});

// MongoDB connection and server start
mongoose.connect(uri)
.then(() => { 
    console.log('MongoDB Connected');
    app.listen(process.env.PORT, () => {
        console.log(`Server is on http://localhost:${process.env.PORT}`);
    });
})
.catch((err) => console.error('MongoDB Connection Error: ', err));