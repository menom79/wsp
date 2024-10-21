const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const protect = require('../middleware/authMiddleware'); // Import auth middleware

const router = express.Router();

router.post('/login', protect, loginUser);
router.post('/register', protect, registerUser);

module.exports = router;