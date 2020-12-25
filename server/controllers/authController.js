const User = require('../models/user');

module.exports.signUp = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signUp(email, password);
    req.session.userID = user._id;
    res.send(user);
  } catch (err) {
    if (err.message === 'Email is already in use') {
      res.status(409).json(err.message);
    } else {
      res.status(500).json('Something went wrong. Please try again later');
    }
  }
};

module.exports.logIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    req.session.userID = user._id;
    res.send(user);
  } catch (err) {
    if (err.message === 'Incorrect email or password') {
      res.status(401).json(err.message);
    } else {
      res.status(500).json('Something went wrong. Please try again later');
    }
  }
};
