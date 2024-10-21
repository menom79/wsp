const Album = require('../models/Album');
const AppError = require('../utils/AppError'); // Custom error class

// Get albums with sorting, filtering, and searching
const getAlbums = async (req, res) => {
    const { sort, fields, startYear, endYear, artist, title } = req.query;

    let query = Album.find();

    // Sorting
    if (sort) {
        const sortBy = sort.split(',').join(' '); 
        query = query.sort(sortBy);
    }

    // Numeric filter for release year
    if (startYear || endYear) {
        const filters = {};
        if (startYear) filters.releaseYear = { $gte: startYear };
        if (endYear) filters.releaseYear = { $lte: endYear };
        query = query.find(filters);
    }

    // Search functionality for artist and title
    if (artist) {
        query = query.find({ artist: { $regex: artist, $options: 'i' } });
    }
    if (title) {
        query = query.find({ title: { $regex: title, $options: 'i' } });
    }

    // Fields filter
    if (fields) {
        const selectedFields = fields.split(',').join(' ');
        query = query.select(selectedFields);
    }

    const albums = await query.exec();
    res.status(200).json(albums);
};

// Create a new album
const createAlbum = async (req, res, next) => {
    const { title, artist, trackCount, releaseYear, genre } = req.body;

    // Check for missing fields
    if (!title || !artist || !releaseYear || !genre) {
        return next(new AppError('All fields are required.', 400));
    }

    // Create and save the new album
    const newAlbum = new Album({ title, artist, trackCount, releaseYear, genre });
    await newAlbum.save();

    res.status(201).json({ message: 'Album created successfully', album: newAlbum });
};

// Update an existing album
const updateAlbum = async (req, res, next) => {
    const { id } = req.params;
    const updates = req.body;

    // Check if album exists
    const album = await Album.findById(id);
    if (!album) {
        return next(new AppError('Album not found.', 404));
    }

    // Update album fields
    Object.assign(album, updates);
    await album.save();

    res.status(200).json({ message: 'Album updated successfully', album });
};

// Delete an album
const deleteAlbum = async (req, res, next) => {
    const { id } = req.params;

    // Check if album exists
    const album = await Album.findById(id);
    if (!album) {
        return next(new AppError('Album not found.', 404));
    }

    // Delete the album
    await album.remove();

    res.status(204).json({ message: 'Album deleted successfully' });
};

// Export the controller functions
module.exports = {
    getAlbums,
    createAlbum,
    updateAlbum,
    deleteAlbum,
};
