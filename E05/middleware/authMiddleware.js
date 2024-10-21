const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');

const protect = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer token

    if (!token) {
        return next(new AppError('Not authorized to access this route.', 401));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return next(new AppError('Invalid token.', 401));
        }
        req.user = decoded; // Store user information in req.user
        next();
    });
};

module.exports = protect;
