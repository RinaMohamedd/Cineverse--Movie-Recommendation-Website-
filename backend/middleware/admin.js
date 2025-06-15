/*module.exports = (req, res, next) => {//middleware function beta5od el request w el response w el next callback
    if (!req.user || !req.user.isAdmin) {//checks lw el user msh logged in aw lw msh admin
        return res.status(403).json({ message: 'Access denied: Admins only.' });
    }
    next();//if the user is an admin b call next() 3shan a continue le el next middleware or router handler
};*/
const User = require('../models/user');

module.exports = async (req, res, next) => {
    try {
        // Check if user is logged in
        if (!req.session || !req.session.user || !req.session.user.id) {
            console.log('No session or user found');
            // For API routes, send JSON response
            if (req.path.startsWith('/api/')) {
                return res.status(403).json({ message: 'Access denied: Admins only.' });
            }
            // For web routes, redirect to login
            return res.redirect('/login');
        }

        // Check if user is admin
        const user = await User.findById(req.session.user.id);
        if (!user) {
            console.log('User not found in database');
            // Clear invalid session
            req.session.destroy();
            return res.redirect('/login');
        }

        if (!user.isAdmin) {
            console.log('User is not an admin');
            // For API routes, send JSON response
            if (req.path.startsWith('/api/')) {
                return res.status(403).json({ message: 'Access denied: Admins only.' });
            }
            // For web routes, redirect to home page
            return res.redirect('/');
        }

        // User is admin, proceed
        console.log('Admin access granted');
        next();
    } catch (err) {
        console.error('Admin middleware error:', err);
        // For API routes, send JSON response
        if (req.path.startsWith('/api/')) {
            return res.status(500).json({ message: 'Server error.' });
        }
        // For web routes, redirect to home page
        res.redirect('/');
    }
};