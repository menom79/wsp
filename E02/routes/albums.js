const express = require('express');
const fs = require('fs');
const router = express.Router();
let albums = require('../data/albums.json').albums;

// Get all albums
router.get('/', (req, res) => {
  res.json(albums);
});

// Get a single album by ID
router.get('/:id', (req, res) => {
  const album = albums.find(a => a.id === parseInt(req.params.id));
  if (!album) return res.status(404).send('Album not found');
  res.json(album);
});

// Create a new album
router.post('/', (req, res) => {
  const newAlbum = {
    id: albums.length + 1,
    artist: req.body.artist,
    title: req.body.title,
    year: req.body.year,
    genre: req.body.genre,
    tracks: req.body.tracks
  };
  albums.push(newAlbum);
  res.status(201).json(newAlbum);
});

// Update an album by ID
router.put('/:id', (req, res) => {
  const album = albums.find(a => a.id === parseInt(req.params.id));
  if (!album) return res.status(404).send('Album not found');

  album.artist = req.body.artist;
  album.title = req.body.title;
  album.year = req.body.year;
  album.genre = req.body.genre;
  album.tracks = req.body.tracks;

  res.json(album);
});

// Delete an album by ID (with query string check)
router.delete('/:id', (req, res) => {
  if (!req.query.user) {
    return res.status(401).send('Unauthorized');
  }
  
  const albumIndex = albums.findIndex(a => a.id === parseInt(req.params.id));
  if (albumIndex === -1) return res.status(404).send('Album not found');
  
  albums.splice(albumIndex, 1);
  res.status(204).send();
});

module.exports = router;
