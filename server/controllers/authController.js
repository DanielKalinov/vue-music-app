const User = require('../models/user');

module.exports.signUp = async (req, res) => {
  const { email, password } = req.body;

  await User.findOne({ email })
    .then((user) => {
      if (user) {
        throw Error('Email is already in use');
      } else {
        User.create({ email, password }).then((user) => {
          req.session.userID = user._id;
          res.send(user);
        });
      }
    })
    .catch((err) => {
      if (err.message === 'Email is already in use') {
        res.status(409).json(err.message);
      } else {
        res.status(500).json('Something went wrong. Please try again later');
      }
    });
};

module.exports.logIn = (req, res) => {
  const { email, password } = req.body;

  User.login(email, password)
    .then((user) => {
      req.session.userID = user._id;
      res.send(user);
    })
    .catch((err) => {
      if (err.message === 'Incorrect email or password') {
        res.status(401).json(err.message);
      } else {
        res.status(500).json('Something went wrong. Please try again later');
      }
    });
};
