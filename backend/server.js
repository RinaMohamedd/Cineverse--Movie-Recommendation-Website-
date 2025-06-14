require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors');//cross-origin resource sharing
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
const adminRoutes = require('./routes/adminRoutes');//adding the admin routes
const profileRoutes = require("./routes/profile");
//const bodyParser = require('body-parser');
//const adminRoutes = require('./routes/admin');
const uri = process.env.MONGODB_URI;

//app.use(bodyParser.urlencoded({ extended: true }));//parses incoming requests m3 el url encoded payload
app.use(cors());//middleware to allow cross origin requests (frontend-backend communication)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cors setup to allow frontend to send cookies
app.use(cors({
    origin: "http://localhost:5000",
    credentials: true //allows sending cookies
}));

//session middleware setup
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


app.set('view engine', 'ejs'); // Set template engine

app.set('views', path.join(__dirname, '../frontend/pages'));
app.use(express.static(path.join(__dirname, '../frontend/public')));

app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});
//middleware to parse JSON files and it's important for APIs which let's you use req.body

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//to test that the server is alive
/*app.get('/', (req, res) => {
    res.send('Server Is Alive!');
});*/

//this gets all the different routes we created so they could be used on the app
app.use("/", homeRoutes);
app.use("/api/watchlist", watchlistRoutes);
app.use("/login", loginRoutes);
app.use("/signup", signupRoutes);
app.use('/admin', adminRoutes);
app.use('/recommendations', recomRoutes);
<<<<<<< Updated upstream
app.use('/api/movies', movieRoutes);
=======
app.use('/', profileRoutes);
>>>>>>> Stashed changes
//routes setup
app.use('/api/users', userRoutes);
//app.use('/api/recommendation', recomRoutes);
app.use('/', movieRoutes);
app.use('/api/recommendation', recommendationRoutes);
app.use("/watchlist", watchlistRoutes);
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

//connecting to mongodb
mongoose.connect(uri)
.then(() => { 
    console.log('MongoDB Connected')
    app.listen(process.env.PORT, () => {
    console.log(`Server is on http://localhost:${process.env.PORT}`);
    });
})
.catch((err) => console.error('MongoDB Connection Error: ', err));
//app.use(express.static('public')); 

/*app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');*/

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({message: 'Something broke!'});
});