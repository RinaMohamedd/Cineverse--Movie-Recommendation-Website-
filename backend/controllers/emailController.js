const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();
const nodemailer = require('nodemailer');

// Validation functions
const validateName = (name) => {
    // 2-50 characters, letters and spaces only
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    return nameRegex.test(name);
};

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validateMessage = (message) => {
    return typeof message === 'string' && message.length >= 1 && message.length <= 1000;
};

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

// Create reusable transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'cineverseproj@gmail.com',
        pass: 'cmcm lxre hnng iplg'  // Using the new App Password
    },
    tls: {
        rejectUnauthorized: false
    }
});

const contact = async (req, res) => {
    const { name, email, message } = req.body;

    // Input validation
    if (!name || !email || !message) {
        return res.status(400).json({message: 'All fields are required'});
    }

    if (!validateName(name)) {
        return res.status(400).json({
            message: 'Name must be 2-50 characters long and contain only letters and spaces'
        });
    }

    if (!validateEmail(email)) {
        return res.status(400).json({message: 'Invalid email format'});
    }

    if (!validateMessage(message)) {
        return res.status(400).json({
            message: 'Message must be between 10 and 1000 characters'
        });
    }

    // Log the incoming request
    console.log('Contact form submission received:', { name, email, message });

    try {
        // Verify transporter configuration
        await transporter.verify();
        console.log('Email transporter verified successfully');

        // Email content with better formatting
        const mailOptions = {
            from: '"Cineverse Contact Form" <cineverseproj@gmail.com>',
            to: 'cineverseproj@gmail.com',
            replyTo: email,
            subject: `New Contact Form Message from ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px;">New Contact Form Message</h2>
                    
                    <div style="margin: 20px 0;">
                        <p style="margin: 10px 0;"><strong style="color: #555;">From:</strong> ${name}</p>
                        <p style="margin: 10px 0;"><strong style="color: #555;">Email:</strong> ${email}</p>
                    </div>

                    <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <h3 style="color: #444; margin-top: 0;">Message:</h3>
                        <p style="white-space: pre-wrap; margin: 0;">${message}</p>
                    </div>

                    <div style="color: #666; font-size: 12px; margin-top: 30px; padding-top: 10px; border-top: 1px solid #eee;">
                        <p>This message was sent from the Cineverse contact form.</p>
                        <p>You can reply directly to this email to respond to ${name}.</p>
                    </div>
                </div>
            `
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.response);
        
        res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', {
            message: error.message,
            code: error.code,
            command: error.command,
            responseCode: error.responseCode,
            response: error.response
        });
        
        res.status(500).json({ 
            message: 'Failed to send message. Please try again later.',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

module.exports = {
    verifyEmail,
    contact
};
