const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const session = require('express-session');
const authRoutes = require('./routes/authRoutes');
const songRoutes = require('./routes/songRoutes');
const MongoStore = require('connect-mongo')(session);
const multer = require('multer');
const path = require('path');
const Song = require('./models/song');
const User = require('./models/user');

const sessionStore = new MongoStore({
  mongooseConnection: mongoose.connection,
  collection: 'sessions'
});

app.use(express.static('public'));
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
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: 'strict'
    }
  })
);
app.use(authRoutes);
app.use(songRoutes);

const MONGODB_CONNECTION =
  'mongodb+srv://daniel:Xov9gsC7bIRERymc@cluster0.8uos6.mongodb.net/VueMusicApp?retryWrites=true&w=majority';

mongoose.connect(
  MONGODB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  },
  () => console.log('Connected to MongoDB')
);

app.listen(3000, () => console.log('Server listening on port 3000'));
