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
const fs = require('fs');
const Song = require('./models/song');

const sessionStore = new MongoStore({
  mongooseConnection: mongoose.connection,
  collection: 'sessions'
});

const storage = multer.diskStorage({
  destination: './public/song_files',
  filename: (req, file, cb) => {
    cb(null, Date.now() + ' - ' + file.originalname);
  }
});

const upload = multer({
  storage: storage
}).single('file');

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
      const { title, artist, duration, path } = req.body;
      Song.create({
        title,
        artist,
        duration,
        path: req.file.path
      }).then((res) => console.log(res));
    } else {
      res.status(500).json('Something went wrong');
    }
  });
});
app.get('/songs', async (req, res) => {
  const songs = await Song.find();
  res.json(songs);
});

// app.get('/stream', (req, res) => {
//   const path = './public/songs/silent_running.mp3';
//   const stat = fs.statSync(path);
//   const fileSize = stat.size;
//   const range = req.headers.range;
//   if (range) {
//     const parts = range.replace(/bytes=/, '').split('-');
//     const start = parseInt(parts[0], 10);
//     const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
//     const chunksize = end - start + 1;
//     const file = fs.createReadStream(path, { start, end });
//     const head = {
//       'Content-Range': `bytes ${start} - ${end}/${fileSize}`,
//       'Content-Length': chunksize,
//       'Content-Type': 'audio/mpeg',
//       'Accept-Ranges': 'bytes'
//     };
//     res.writeHead(206, head);
//     file.pipe(res);
//   } else {
//     const head = {
//       'Content-Length': fileSize,
//       'Content-Type': 'audio/mpeg'
//     };
//     res.writeHead(200, head);
//     fs.createReadStream(path).pipe(res);
//   }
// });

mongoose.connect(
  process.env.MONGODB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => console.log('Connected to MongoDB')
);

app.listen(3000, () => console.log('Server listening on port 3000'));
