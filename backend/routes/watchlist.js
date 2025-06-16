const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const authenticate = require('../middleware/auth');
const User = require('../models/user');
const Movie = require('../models/movie');
const UserActivity = require('../models/userActivity');

// API Routes
router.post('/add', authenticate, async (req, res) => {
    console.log('WATCHLIST ADD ROUTE HIT!');
    const userId = req.user.id;
    const { movieId } = req.body;
     
    try {
        if (!movieId) {
            console.error('Missing movieId');
            return res.status(400).json({ success: false, message: "Missing movie ID." });
        }

        const user = await User.findById(userId);
        if (!user) {
            console.error('User not found:', userId);
            return res.status(404).json({ success: false, message: "User not found." });
        }

        // Check if movie is already in watchlist using ObjectId comparison
        if (!user.watchlist.some(id => id.equals(movieId))) {
            user.watchlist.push(movieId);
            await user.save();
            console.log('Movie added to watchlist.');

            // Create watchlist addition activity
            await new UserActivity({
                user: userId,
                action: 'ADD_TO_WATCHLIST',
                details: `Added movie ${movieId} to watchlist`
            }).save();
        } else {
            console.log('Movie already in watchlist.');
        }
        res.json({ success: true });
    } catch (err) {
        console.error('Error adding to watchlist:', err);
        res.status(500).json({ success: false, message: "Error adding to watchlist." });
    }
});

router.get('/list', authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('watchlist');
        if (!user) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        res.json({ success: true, watchlist: user.watchlist });
    } catch (err) {
        console.error('Error fetching watchlist:', err);
        res.status(500).json({ success: false, message: "Error fetching watchlist" });
       
        
    }
});

router.post('/remove', authenticate, async (req, res) => {
    console.log('WATCHLIST REMOVE ROUTE HIT!');
    const userId = req.user.id;
    const { movieId } = req.body;

    try {
        if (!movieId) {
            console.error('Missing movieId');
            return res.status(400).json({ success: false, message: "Missing movie ID." });
        }

        const user = await User.findById(userId);
        if (!user) {
            console.error('User not found:', userId);
            return res.status(404).json({ success: false, message: "User not found." });
        }

        // Remove movie from watchlist
        user.watchlist = user.watchlist.filter(id => !id.equals(movieId));
        await user.save();

        // Create watchlist removal activity
        await new UserActivity({
            user: userId,
            action: 'REMOVE_FROM_WATCHLIST',
            details: `Removed movie ${movieId} from watchlist`
        }).save();

        res.json({ success: true, message: "Movie removed from watchlist." });
    } catch (err) {
        console.error('Error removing from watchlist:', err);
        res.status(500).json({ success: false, message: "Error removing from watchlist." });
    }
});

// Page Routes
router.get('/', (req, res) => {
    console.log("Watchlist page route hit");
    res.render('watchlist'); 
});

module.exports = router;