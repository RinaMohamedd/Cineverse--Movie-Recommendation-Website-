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

    ageRating: {
        type: Number,
        required: true,
    },

    image: {
        type: String,
        required: true,
    },

    trailer: 
    {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    averageRating: {
        type: String,
    },

    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'review',
    }],
}, { timestamps: true });

module.exports = mongoose.model('movie', movieSchema);