const Song = require('../models/song');
const User = require('../models/user');
const path = require('path');

module.exports.getSong = async (req, res) => {
  const song = await Song.getSong(req.params.id);
  const { title, artist, description, _id } = song;
  res.status(200).json({ song: { title, artist, description, songID: _id } });
};
module.exports.fetchSongs = async (req, res) => {
  const songs = await Song.find().sort('-date');
  res.json(songs);
};
module.exports.sendSong = (req, res) => {
  res.sendFile(
    path.join(__dirname, '../public/song_files/' + req.params.songfilename)
  );
};
module.exports.sendArtwork = (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      '../public/artwork_files/' + req.params.artworkfilename
    )
  );
};
module.exports.uploadSong = async (req, res) => {
  try {
    const { title, artist, description, duration, author } = req.body;
    await Song.create({
      title,
      artist,
      description,
      duration,
      date: new Date(),
      author,
      songFilename: req.files.songFile[0].filename.replace(/ /g, ''),
      artworkFilename: req.files.artworkFile[0].filename.replace(/ /g, '')
    });

    res.sendStatus(201);
  } catch (err) {
    res.status(500).json('Something went wrong');
  }
};
module.exports.editSong = async (req, res) => {
  const songs = await Song.editSong(req.body.song);
  res.status(200).json({ songs });
};
module.exports.addToFavorites = async (req, res) => {
  const { song, userID } = req.body;
  const user = await User.addToFavorites(song, userID);
  res.status(200).json({
    user: {
      userID: user._id,
      email: user.email,
      username: user.username,
      favoriteSongs: user.favoriteSongs
    }
  });
};
module.exports.deleteSong = async (req, res) => {
  const songs = await Song.deleteSong(req.params.id);
  res.status(200).json({ songs });
};
