const express = require('express');
const Album = require('./album');
const router = express.Router();

// Create a new album
router.post('/albums', async (req, res) => {
  const newAlbum = new Album(req.body);
  await newAlbum.save();
  res.status(201).send(newAlbum);
});

// Get all albums
router.get('/albums', async (req, res) => {
  const albums = await Album.find();
  res.send(albums);
});

// Update an album
router.put('/albums/:id', async (req, res) => {
  const album = await Album.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(album);
});

// Delete an album
router.delete('/albums/:id', async (req, res) => {
  await Album.findByIdAndDelete(req.params.id);
  res.send({ message: 'Album deleted' });
});

module.exports = router;
