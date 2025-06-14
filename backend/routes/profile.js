const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const User = require('../models/user');

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
    });
    console.log("Profile req.session:", req.session);
  } catch (err) {
    console.log("Error fetching user from profile page:", err);
    res.status(500).send("Something went wrong");
  }
});

module.exports = router;