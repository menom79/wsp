const express = require('express');
const { getAlbums, createAlbum, updateAlbum, deleteAlbum } = require('../controllers/albumController');
const protect = require('../middleware/authMiddleware'); // Import auth middleware

const router = express.Router();

// Public route to get all albums
router.get('/getAllAlbums', getAlbums); // Adjust as needed

// Protected routes
router.post('/', protect, createAlbum);
router.put('/:id', protect, updateAlbum);
router.delete('/:id', protect, deleteAlbum);

module.exports = router;