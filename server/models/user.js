const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

userSchema.statics.signUp = async function (email, password) {
  const userExists = await User.findOne({ email });

  if (userExists) {
    throw Error('Email is already in use');
  } else {
    const user = await User.create({ email, password });
    return user;
  }
};

userSchema.statics.login = async function (email, password) {
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

const User = mongoose.model('user', userSchema);

module.exports = User;
