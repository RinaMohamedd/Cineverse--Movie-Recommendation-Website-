const mongoose = require('mongoose');

const userActivitySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    action: {
        type: String,
        required: true,
        enum: ['LOGIN', 'LOGOUT', 'RATE_MOVIE', 'ADD_TO_WATCHLIST', 'REMOVE_FROM_WATCHLIST', 'ADD_REVIEW', 'UPDATE_PROFILE']
    },
    details: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('userActivity', userActivitySchema); 