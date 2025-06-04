require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const app = express();
const path = require('path');
const homeRouter = require("./routes/home")
const watchlistRouter = require("./routes/watchlist")
const loginRouter = require("./routes/login")
const recomRouter = require("./routes/recommendations")

const uri = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs'); // Set template engine

app.set('views', path.join(__dirname, '../frontend/pages'));
app.use(express.static(path.join(__dirname, '../frontend/public')));
//middleware to parse JSON files and it's important for APIs
app.use(express.json());

//to test that the server is alive
app.use("/", homeRouter);
app.use("/watchlist", watchlistRouter);
app.use("/login", loginRouter);
app.use("/recommendations", recomRouter);

/*mongoose.connect(uri)
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.error('MongoDB Connection Error: ', err));*/

app.listen(PORT, () => {
console.log(`Server is on http://localhost:${PORT}`);
});