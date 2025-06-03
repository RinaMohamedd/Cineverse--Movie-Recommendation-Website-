require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const app = express();

//const uri = process.env.MONGODB_URI;
//const PORT = process.env.PORT || 3000;

const uri = 'mongodb+srv://rina2301123:cineverse123@cluster0.qblxn66.mongodb.net/CineverseDB?retryWrites=true&w=majority&appName=Cluster0';
const PORT = 3000;


//middleware to parse JSON files and it's important for APIs
app.use(express.json());

//to test that the server is alive
app.get('/', (req, res) => {
    res.send('Server Is Alive!');
});

mongoose.connect(uri)
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.error('MongoDB Connection Error: ', err));

app.listen(PORT, () => {
console.log(`Server is on http://localhost:${PORT}`);
});