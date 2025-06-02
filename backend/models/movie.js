const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    genres: {
        type: [String], //this means that it'll be an array of strings
        required: true,
    },

    releaseYear: {
        type: Number,
        required: true,
    },

    ageRatinf: {
        type: String,
        required: true,
    },

    image: {
        type: String,
    },

    trailer: 
    {
        type: String,
    },

    description: {
        type: String,
        required: true,
    },

    averageRatinf: {
        type: String,
        required: true,
    },

    reviews: [{
        type: mongoose.Schema.Typer.ObjectId,
        ref: 'review',
    }],
}, { timestamps: true });

module.exports = mongoose.model('movie', movieSchema);