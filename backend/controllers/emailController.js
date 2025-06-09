const jwt = require('jsonwebtoken');
const User = require('../models/user');

const verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    //decode the token
    const decoded = jwt.verify(token, process.env.EMAIL_SECRET);
    const userId = decoded.userId;

    //find the user and update
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.verified) {
      return res.status(200).send('Email already verified');
    }

    user.verified = true;
    await user.save();

    res.status(200).send('Email verified successfully!');
  } catch (err) {
    res.status(400).send('Invalid or expired token');
  }
};
