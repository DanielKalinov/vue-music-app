const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: String,
  artist: String,
  duration: Number,
  filename: String
});

const Song = mongoose.model('song', songSchema);

module.exports = Song;
