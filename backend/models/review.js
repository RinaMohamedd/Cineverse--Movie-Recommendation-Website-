const mongoose = require('mongoose');

const rebiewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', //our user model
        required: true,
    },

    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'movie',
        required: true,
    },

    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },

    //comments are not required
    comment: {
        type: String,
    },
}, { timestamps: true });

module.exports = mongoose.model('review', reviewSchema);