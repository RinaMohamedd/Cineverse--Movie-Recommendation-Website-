const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const authenticate = require('../middleware/auth');
const User = require('../models/user');
const Movie = require('../models/movie'); 
router.post('/add', authenticate, async (req, res) => {
    console.log('WATCHLIST ADD ROUTE HIT!');
    const userId = req.user.user.id;
    const { movieId } = req.body;
     
    try {
        if (!movieId || !mongoose.Types.ObjectId.isValid(movieId)) {
            console.error('Invalid or missing movieId');
            return res.status(400).json({ success: false, message: "Invalid or missing movieId." });
        }

        const user = await User.findById(userId);
        if (!user) {
            console.error('User not found:', userId);
            return res.status(404).json({ success: false, message: "User not found." });
        }

        // Use .some() for ObjectId comparison
        if (!user.watchlist.some(id => id.equals(movieId))) {
            user.watchlist.push(movieId);
            await user.save();
            console.log('Movie added to watchlist.');
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
        const user = await User.findById(req.user.userId).populate('watchlist');
        if (!user) return res.status(404).json({ message: "User not found." });

        res.json({ watchlist: user.watchlist });
    } catch (err) {
        res.status(500).json({ message: "Error fetching watchlist" });
    }
});


router.get('/', (req, res) => {
  console.log("Watchlist route hit");
  res.render('watchlist'); 
});

module.exports = router;