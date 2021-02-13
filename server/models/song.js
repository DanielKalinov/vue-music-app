const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
	title: String,
	artist: String,
	description: String,
	duration: String,
	date: Date,
	author: String,
	songFilename: String,
	artworkFilename: String
});

songSchema.statics.getSong = async function (songID) {
	const song = await this.findById({ _id: songID });
	return song;
};

songSchema.statics.editSong = async function (song) {
	const { songID, title, artist, description } = song;
	await this.findByIdAndUpdate(
		{ _id: mongoose.Types.ObjectId(songID) },
		{ $set: { title, artist, description } }
	);

	const songs = await this.find();
	return songs;
};

songSchema.statics.deleteSong = async function (songID) {
	await this.findByIdAndDelete({ _id: mongoose.Types.ObjectId(songID) });
	const songs = await this.find();
	return songs;
};

const Song = mongoose.model('song', songSchema);

module.exports = Song;
