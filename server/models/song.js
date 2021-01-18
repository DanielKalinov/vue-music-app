const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: String,
  artist: String,
  description: String,
  duration: String,
  songFilename: String,
  artworkFilename: String
});

const Song = mongoose.model('song', songSchema);

module.exports = Song;
