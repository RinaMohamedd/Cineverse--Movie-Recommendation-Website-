const Movie = require('../models/movie');
const User = require('../models/user');
const Review = require('../models/review');
const UserActivity = require('../models/userActivity');

const getAdmin = async (req, res) => {
    try {
        //get the count of users, movies, and reviews
        const [userCount, movieCount, reviewCount, recentActivities] = await Promise.all([
            User.countDocuments(),
            Movie.countDocuments(),
            Review.countDocuments(),
            UserActivity.find()
                .populate('user', 'fullname email')
                .sort({ timestamp: -1 })
                .limit(5)
        ]);

        //render the admin page with the counts and recent activities
        res.render('admin', {
            userCount,
            movieCount,
            reviewCount,
            recentActivities: recentActivities || [] // Ensure recentActivities is always defined
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

// Get recent activities
const getRecentActivities = async (req, res) => {
    try {
        const activities = await UserActivity.find()
            .populate('user', 'fullname email')
            .sort({ timestamp: -1 })
            .limit(10);
        res.status(200).json(activities);
    } catch (err) {
        console.error('Error in getRecentActivities:', err);
        res.status(500).json({ 
            message: 'Error fetching recent activities', 
            error: err.message 
        });
    }
};

module.exports = {
    getAdmin,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getRecentActivities
}; 