const Movie = require('../models/movie');
const User = require('../models/user');
const Review = require('../models/review');

const getAdmin = async (req, res) => {
    try {
        //get the count of users, movies, and reviews
        const [userCount, movieCount, reviewCount] = await Promise.all([
            User.countDocuments(),
            Movie.countDocuments(),
            Review.countDocuments()
        ]);
        //render the admin page with the counts
        res.render('admin', {
            userCount,
            movieCount,
            reviewCount
        });
    } catch (err) {
        console.error('Error rendering admin page:', err);
        res.status(500).send('Internal Server Error');
    }
};

// Get all users
const getAllUsers = async (req, res) => {
    try {
        console.log('Fetching all users...');
        const users = await User.find().select('-password');
        console.log(`Found ${users.length} users`);
        res.status(200).json(users);
    } catch (err) {
        console.error('Error in getAllUsers:', err);
        res.status(500).json({ 
            message: 'Error fetching users', 
            error: err.message,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        });
    }
};

// Get single user by ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        console.error('Error in getUserById:', err);
        res.status(500).json({ 
            message: 'Error fetching user', 
            error: err.message,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        });
    }
};

// Update user
const updateUser = async (req, res) => {
    try {
        const { fullname, username, email, isAdmin } = req.body;
        const user = await User.findById(req.params.id);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user fields
        if (fullname) user.fullname = fullname;
        if (username) user.username = username;
        if (email) user.email = email;
        if (typeof isAdmin === 'boolean') user.isAdmin = isAdmin;

        await user.save();
        res.status(200).json({ 
            message: 'User updated successfully', 
            user: user.toObject({ select: '-password' }) 
        });
    } catch (err) {
        console.error('Error in updateUser:', err);
        res.status(500).json({ 
            message: 'Error updating user', 
            error: err.message,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        });
    }
};

// Delete user
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error('Error in deleteUser:', err);
        res.status(500).json({ 
            message: 'Error deleting user', 
            error: err.message,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        });
    }
};

module.exports = {
    getAdmin,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
}; 