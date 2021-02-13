const User = require('../models/user');

module.exports.auth = async (req, res) => {
	try {
		const user = await User.findById(req.session.userID);
		res.json({
			user: {
				userID: user._id,
				email: user.email,
				username: user.username,
				favoriteSongs: user.favoriteSongs,
				uploadedSongs: user.uploadedSongs
			}
		});
	} catch (err) {
		res.status(401).json('User not authorized');
	}
};

module.exports.signUp = async (req, res) => {
	const { email, username, password } = req.body;

	try {
		const user = await User.signUp(email, username, password);
		req.session.userID = user._id;
		res.json({
			user: {
				userID: user._id,
				email: user.email,
				username: user.username,
				favoriteSongs: user.favoriteSongs,
				uploadedSongs: user.uploadedSongs
			}
		});
	} catch (err) {
		if (
			err.message === 'Email is already in use' ||
			err.message === 'Username is already in use'
		) {
			res.status(409).json(err.message);
		} else {
			res.status(500).json('Something went wrong');
		}
	}
};

module.exports.logIn = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.logIn(email, password);
		req.session.userID = user._id;
		res.json({
			user: {
				userID: user._id,
				email: user.email,
				username: user.username,
				favoriteSongs: user.favoriteSongs,
				uploadedSongs: user.uploadedSongs
			}
		});
	} catch (err) {
		if (err.message === 'Incorrect email or password') {
			res.status(401).json(err.message);
		} else {
			res.status(500).json('Something went wrong');
		}
	}
};

module.exports.logOut = (req, res) => {
	req.session.destroy();
	res.status(200).json('Logged Out');
};
