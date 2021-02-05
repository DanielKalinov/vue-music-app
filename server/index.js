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
// app.post('/uploadsong', upload, async (req, res) => {
//   try {
//     const { title, artist, description, duration, author } = req.body;
//     await Song.create({
//       title,
//       artist,
//       description,
//       duration,
//       date: new Date(),
//       author,
//       songFilename: req.files.songFile[0].filename.replace(/ /g, ''),
//       artworkFilename: req.files.artworkFile[0].filename.replace(/ /g, '')
//     });

//     res.sendStatus(201);
//   } catch (err) {
//     res.status(500).json('Something went wrong');
//   }
// });
// app.get('/songs', async (req, res) => {
//   const songs = await Song.find();
//   res.json(songs);
// });

// app.get('/stream/:songfilename', (req, res) => {
//   res.sendFile(
//     path.join(__dirname, './public/song_files/' + req.params.songfilename)
//   );
// });

// app.get('/songimage/:artworkfilename', (req, res) => {
//   res.sendFile(
//     path.join(__dirname, './public/artwork_files/' + req.params.artworkfilename)
//   );
// });

// app.post('/addfavorite/:id', async (req, res) => {
//   const { song, userID } = req.body;
//   const user = await User.addToFavorites(song, userID);
//   res.status(200).json({
//     user: {
//       userID: user._id,
//       email: user.email,
//       username: user.username,
//       favoriteSongs: user.favoriteSongs
//     }
//   });
// });

// app.get('/getsong/:id', async (req, res) => {
//   const song = await Song.getSong(req.params.id);
//   const { title, artist, description, _id } = song;
//   res.status(200).json({ song: { title, artist, description, songID: _id } });
// });

// app.delete('/deletesong/:id', async (req, res) => {
//   const songs = await Song.deleteSong(req.params.id);
//   res.status(200).json({ songs });
// });

// app.put('/editsong/:id', async (req, res) => {
//   const songs = await Song.editSong(req.body.song);
//   res.status(200).json({ songs });
// });

mongoose.connect(
  process.env.MONGODB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  },
  () => console.log('Connected to MongoDB')
);

app.listen(3000, () => console.log('Server listening on port 3000'));
