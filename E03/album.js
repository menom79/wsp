const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
  title: String,
  artist: String,
  releaseDate: Date,
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;
