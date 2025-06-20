//const jwt = require('jsonwebtoken');//imports the jsonwwentoken library so we can verify the JWT tokens

module.exports = (req, res, next) => {
    console.log('Auth middleware - Session:', req.session);
    console.log('Auth middleware - User:', req.session.user);
    
    if (!req.session || !req.session.user || !req.session.user.id) {
        console.log('Auth middleware - Unauthorized: No user session');
        return res.status(401).json({ success: false, message: 'Unauthorized. Please log in.' });
    }

    // Set user info in req.user for consistency
    req.user = {
        id: req.session.user.id,
        username: req.session.user.username
    };
    
    console.log('Auth middleware - Authorized user:', req.user);
    next();
};

/*module.exports = (req, res, next) => {//exports el middleware function so it can be used in the routes
    const token = req.header('Authorization')?.replace('Bearer ', '');//reads the authentication header from the incoming request
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });//if no token el user required eno ye log in
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);//verify token using secret key from .env
        console.log('DECODED JWT:', decoded);
        req.user = decoded;//add the decoded user info to the request object 3shan tosta5dam f req.user b3d kda
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired, please log in again' });
        }
        res.status(401).json({ message: 'Token is not valid' });
    }
};*/
//it checks whetehr the user is logged in or not, that is done by verifying a JWT token sent from the fronend 
//if the user isnt logged in ,the request is blocked and an error message is sent