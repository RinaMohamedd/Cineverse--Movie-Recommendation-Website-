const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },

    password: {
        type: String,
        required: true,
    },

    isAdmin:  { 
        type: Boolean, 
        default: false 
    },

    //the use of square brakets is beacuse these are arrays and not a single value
    whatchlist: [
        {
            //this is so an id will be generated for each movie instead of taking the whole movie object
            type: mongoose.Schema.Types.ObjectId,
            //this is our movie model
            ref: 'movie',
        }
    ],

    recommendationHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'movie',
        }
    ]
}, { timestamps: true }); //this line automatically adds two fields to the schema which are createdAt and updatedAt

//this line is how we turn the schema into a usable model so you can require it in other files
module.exports = mongoose.model('user', userSchema);