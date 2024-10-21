const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  artist: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  trackCount: {
    type: Number,
    min: 1,
    max: 100,
  },
  releaseYear: {
    type: Number,
    required: true,
    min: 1900,
    max: new Date().getFullYear(), // Current year validation
  },
  genre: {
    type: String,
    enum: [
      'Rock',
      'Pop',
      'Jazz',
      'Hip-Hop',
      'Classical',
      'Electronic',
      'Folk',
      'Blues',
    ], // Predefined genres
    required: true,
  },
  updatedAt: {
    type: Date, // Adding the updatedAt field to the schema
    default: Date.now, // Set default value
  },
});

// Pre-save hook to set updatedAt before saving
albumSchema.pre('save', function (next) {
  this.updatedAt = new Date(); // Automatically set updatedAt before saving
  next();
});

const Album = mongoose.model('Album', albumSchema);
module.exports = Album;
