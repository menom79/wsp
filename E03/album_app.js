const mongoose = require('mongoose');
const Album = require('./models/album');
const express = require('express');  
mongoose.connect('mongodb://127.0.0.1:27017/album_app?retryWrites=true&w=majority');

const app = express(); 

app.use(express.json());

// Example route to get all albums
app.get('/albums', async (req, res) => {
  try {
    const albums = await Album.find();
    res.json(albums);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Example route to add a new album
app.post('/albums', async (req, res) => {
  const { title, artist, year } = req.body;
  const newAlbum = new Album({ title, artist, year });
  try {
    await newAlbum.save();
    res.status(201).json(newAlbum);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Example route to update an album
app.put('/albums/:id', async (req, res) => {
  const { id } = req.params;
  const { title, artist, year } = req.body;
  try {
    const updatedAlbum = await Album.findByIdAndUpdate(id, { title, artist, year }, { new: true });
    res.json(updatedAlbum);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Example route to delete an album
app.delete('/albums/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Album.findByIdAndDelete(id);
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err);
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});