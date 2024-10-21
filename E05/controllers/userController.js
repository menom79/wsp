const User = require('../models/User');
const AppError = require('../utils/AppError'); // Custom error class
const jwt = require('jsonwebtoken');

const registerUser = async (req, res, next) => {
    const { name, email, password, passwordConfirmation } = req.body;

    // Check for missing fields
    if (!name || !email || !password || !passwordConfirmation) {
        return next(new AppError('All fields are required.', 400));
    }

    // Check for duplicate email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return next(new AppError('Email already in use.', 400));
    }

    // Create new user
    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
};

const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    // Check for missing fields
    if (!email || !password) {
        return next(new AppError('Email and password are required.', 400));
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
        return next(new AppError('Invalid email or password.', 401));
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h', // Token expiration time
    });

    res.status(200).json({ token });
};

module.exports = { registerUser, loginUser };
