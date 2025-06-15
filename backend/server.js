require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors'); //cross-origin resource sharing
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
const adminMiddleware = require('./middleware/admin');
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

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../frontend/pages'));
app.use(express.static(path.join(__dirname, '../frontend/public')));
app.use('/uploads', express.static(path.join(__dirname, '../frontend/public/uploads')));

app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

// Request logging middleware
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// API Routes - Put these before the page routes
/*app.use('/api/users', userRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/watchlist', watchlistRoutes);
app.use('/api/recommendation', recommendationRoutes);
app.use("/watchlist", watchlistRoutes);*/
//this gets all the different routes we created so they could be used on the app
app.use("/api/watchlist", watchlistRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/users', userRoutes);
app.use('/api/recommendation', recommendationRoutes);

app.use("/", homeRoutes);
app.use('/', profileRoutes);
app.use('/', movieRoutes);

app.use("/login", loginRoutes);
app.use("/signup", signupRoutes);
app.use('/admin', adminRoutes);
app.use('/recommendations', recomRoutes);
app.use("/watchlist", watchlistRoutes);

app.get('/admin', adminMiddleware, (req, res) => {
    res.render('admin'); 
});


//app.use('/api/recommendation', recomRoutes);


/*
my routes now are:
http://localhost:5000/api/users/signup
http://localhost:5000/api/users/login
http://localhost:5000/api/recommendation/recommendations
http://localhost:5000/api/movies/
*/

/*app.listen(process.env.PORT, () => {
    console.log(`Server is on http://localhost:${process.env.PORT}`);
});*/

// MongoDB connection and server start
mongoose.connect(uri)
.then(() => { 
    console.log('MongoDB Connected')
    app.listen(process.env.PORT, '0.0.0.0', () => {
    console.log(`Server is on http://localhost:${process.env.PORT}`);
    });
})
.catch((err) => console.error('MongoDB Connection Error: ', err));
//app.use(express.static('public')); 

/*app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');*/

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({message: 'Something broke!', error: err.message});
});