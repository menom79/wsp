// app.js or server.js
const express = require('express');
require('express-async-errors');
const mongoose = require('mongoose');
const albumRouter = require('./routes/albumRouter');
const userRouter = require('./routes/userRouter'); // Create this file for user routes
const AppError = require('./utils/AppError'); // Custom error class

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // For parsing application/json

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/album_app?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Use the album and user routers
app.use('/api/albums', albumRouter);
app.use('/api/users', userRouter); // Add user routes

// Error handling middleware
app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        message: err.message || 'Internal Server Error',
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
