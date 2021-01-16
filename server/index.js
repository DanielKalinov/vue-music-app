const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const session = require('express-session');
const authRoutes = require('./routes/authRoutes');
const MongoStore = require('connect-mongo')(session);
const multer = require('multer');
const path = require('path');
const Song = require('./models/song');

const sessionStore = new MongoStore({
  mongooseConnection: mongoose.connection,
  collection: 'sessions'
});

const storage = multer.diskStorage({
  destination: './public/song_files',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname.replace(/ /g, ''));
  }
});

const upload = multer({
  storage: storage
}).single('songFile');

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
app.post('/uploadsong', (req, res) => {
  upload(req, res, (err) => {
    if (!err) {
      const { title, artist, description, duration } = req.body;
      Song.create({
        title,
        artist,
        description,
        duration,
        songFilename: req.file.filename.replace(/ /g, ''),
        path: req.file.path
      }).then(() => res.sendStatus(201));
    } else {
      res.status(500).json('Something went wrong');
    }
  });
});
app.get('/songs', async (req, res) => {
  const songs = await Song.find();
  res.json(songs);
});

app.get('/stream/:songfilename', (req, res) => {
  res.sendFile(
    path.join(__dirname, './public/song_files/' + req.params.songfilename)
  );
});

mongoose.connect(
  process.env.MONGODB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => console.log('Connected to MongoDB')
);

app.listen(3000, () => console.log('Server listening on port 3000'));
