/*module.exports = (req, res, next) => {//middleware function beta5od el request w el response w el next callback
    if (!req.user || !req.user.isAdmin) {//checks lw el user msh logged in aw lw msh admin
        return res.status(403).json({ message: 'Access denied: Admins only.' });
    }
    next();//if the user is an admin b call next() 3shan a continue le el next middleware or router handler
};*/
const User = require('../models/user');

module.exports = (req, res, next) => {
    if (!req.session.user || !req.session.user.id) {
        return res.status(403).json({ message: 'Access denied: Admins only.' });
    }
    User.findById(req.session.user.id).then(user => {
        if (!user || !user.isAdmin) {
            return res.status(403).json({ message: 'Access denied: Admins only.' });
        }
        next();
    }).catch(() => {
        res.status(500).json({ message: 'Server error.' });
    });
};