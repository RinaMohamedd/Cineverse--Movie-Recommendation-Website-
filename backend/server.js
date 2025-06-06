require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors');//cross-origin resource sharing
const path = require('path');
const homeRoutes = require("./routes/home")
const watchlistRoutes = require("./routes/watchlist")
const recomRoutes = require("./routes/recommendations")
const loginRoutes = require("./routes/login");
const signupRoutes = require("./routes/signup");
const userRoutes = require("./routes/userRoutes");
const movieRoutes = require('./routes/movieRoutes');

const uri = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;

app.set('view engine', 'ejs'); // Set template engine

app.set('views', path.join(__dirname, '../frontend/pages'));
app.use(express.static(path.join(__dirname, '../frontend/public')));

//middleware to parse JSON files and it's important for APIs which let's you use req.body
app.use(cors());//middleware to allow cross origin requests (frontend-backend communication)
app.use(express.json());

//to test that the server is alive
/*app.get('/', (req, res) => {
    res.send('Server Is Alive!');
});*/

app.use("/", homeRoutes);
app.use("/watchlist", watchlistRoutes);
app.use("/recommendations", recomRoutes);
app.use("/login", loginRoutes);
app.use("/signup", signupRoutes);


//connecting to mongodb
mongoose.connect(uri)
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.error('MongoDB Connection Error: ', err));

//routes setup
app.use('/api/users', userRoutes);
app.use('/api/recommendation', recomRoutes);//endpoints
app.use('/api/movies', movieRoutes);
/*
my routes now are:
http://localhost:5000/api/users/signup
http://localhost:5000/api/users/login
*/

app.listen(PORT, () => {
console.log(`Server is on http://localhost:${PORT}`);
});