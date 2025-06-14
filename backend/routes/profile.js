const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const User = require('../models/user');
const upload = require('../middleware/upload');

router.get('/profile', authMiddleware, async (req, res) => {
  console.log('Profile page loaded');
  console.log('Session user:', req.session.user);

  const sessionUser = req.session.user;

  if (!sessionUser || !sessionUser.id) {
    return res.redirect('/login');
  }

  try {
    const user = await User.findById(sessionUser.id).lean(); //lean makes it plain JS object

    if (!user) {
        return res.redirect('login');
    }

    res.render('profile', {
        fullname: user.fullname || "Unknown",
        username: user.username,
        email: user.email || "No email",
        profilePic: user.profilePic || '/images/profile1.jpg'
    });
    console.log("Profile req.session:", req.session);
  } catch (err) {
    console.log("Error fetching user from profile page:", err);
    res.status(500).send("Something went wrong");
  }
});

router.post('/upload-profile-pic', authMiddleware, upload.single('profilePic'), async (req, res) => {
    try {
        const filePath = `/uploads/${req.file.filename}`;
        await User.findByIdAndUpdate(req.session.user.id, {profilePic: filePath});

        res.redirect('/profile');
    } catch (err) {
        console.log('Error uploading profile picture:', err);
        res.status(500).send("Upload failed");
    }
});

router.post('/remove-profile-pic', authMiddleware, async (req, res) => {
    const sessionUser = req.session.user;
    if (!sessionUser || !sessionUser.id) return res.redirect('login');

    try {
        await User.findByIdAndUpdate(sessionUser.id, {profilePic: '/images/profile1.jpg'});
        res.redirect('/profile');
    } catch (err) {
        console.error('Error removing profile pic:', err);
        res.status(500).send("Error");
    }
});

module.exports = router;