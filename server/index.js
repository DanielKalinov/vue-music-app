const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const User = require('./models/user');

const sessionStore = new MongoStore({
  mongooseConnection: mongoose.connection,
  collection: 'sessions'
});

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:8080',
    credentials: true
  })
);

app.use(
  session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: { httpOnly: true, secure: false, sameSite: 'lax' }
  })
);

app.post('/signup', (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
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
});

app.post('/login', (req, res) => {
  User.findOne({ email: req.body.email }).then(() => res.sendStatus(200));
});

mongoose.connect(
  process.env.MONGODB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => console.log('Connected to MongoDB')
);

app.listen(3000, () => console.log('Server listening on port 3000'));
