const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
	email: String,
	username: String,
	password: String,
	favoriteSongs: Array,
	uploadedSongs: Array
});

userSchema.pre('save', async function (next) {
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);

	next();
});

userSchema.statics.signUp = async function (email, username, password) {
	const emailExists = await User.findOne({ email });
	const usernameExists = await User.findOne({ username });

	if (emailExists) {
		throw Error('Email is already in use');
	}

	if (usernameExists) {
		throw Error('Username is already in use');
	}

	const user = await User.create({
		email,
		username,
		password,
		favoriteSongs: [],
		uploadedSongs: []
	});
	return user;
};

userSchema.statics.logIn = async function (email, password) {
	const user = await this.findOne({ email });
	if (user) {
		const auth = await bcrypt.compare(password, user.password);
		if (auth) {
			return user;
		} else {
			throw Error('Incorrect email or password');
		}
	} else {
		throw Error('Incorrect email or password');
	}
};

userSchema.statics.addToFavorites = async function (userID, song) {
	let user = await this.findOne({ _id: userID });
	const songIsFavorite = user.favoriteSongs.find(
		(favoriteSong) => favoriteSong._id === song._id
	);
	if (songIsFavorite) {
		await this.updateOne({ _id: userID }, { $pull: { favoriteSongs: song } });

		user = await this.findOne({ _id: userID });
		return user.favoriteSongs;
	} else {
		await this.updateOne(
			{ _id: userID },
			{ $push: { favoriteSongs: { $each: [song], $position: 0 } } }
		);

		user = await this.findOne({ _id: userID });
		return user.favoriteSongs;
	}
};

userSchema.statics.uploadSong = async function (userID, song) {
	await this.updateOne(
		{ _id: userID },
		{ $push: { uploadedSongs: { $each: [song], $position: 0 } } }
	);

	const user = await this.findOne({ _id: userID });
	return user.uploadedSongs;
};

userSchema.statics.deleteUploadedSong = async function (userID, song) {
	await this.updateOne(
		{ _id: userID },
		{ $pull: { uploadedSongs: { _id: mongoose.Types.ObjectId(song._id) } } }
	);

	const user = await this.findOne({ _id: userID });
	return user.uploadedSongs;
};

const User = mongoose.model('user', userSchema);

module.exports = User;
