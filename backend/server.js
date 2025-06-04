require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const app = express();
const path = require('path');

const uri = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs'); // Set template engine

app.set('views', path.join(__dirname, '../frontend/pages'));
app.use(express.static(path.join(__dirname, '../frontend/public')));
//middleware to parse JSON files and it's important for APIs
app.use(express.json());

//to test that the server is alive
app.get('/', (req, res) => {
  res.render('index'); // This looks for 'frontend/pages/index.ejs'
});

mongoose.connect(uri)
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.error('MongoDB Connection Error: ', err));

app.listen(PORT, () => {
console.log(`Server is on http://localhost:${PORT}`);
});