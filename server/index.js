const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const session = require('express-session');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo')(session);
const multer = require('multer');
const path = require('path');

const sessionStore = new MongoStore({
  mongooseConnection: mongoose.connection,
  collection: 'sessions'
});

const storage = multer.diskStorage({
  destination: './public/songs',
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  }
});

const upload = multer({
  storage: storage
}).single('file');

app.use(express.static('./public'));
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:8080',
    credentials: true
  })
);
app.use(cookieParser());
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
      res.send('Done');
    } else {
      res.status(500).json('Something went wrong');
    }
  });
});

mongoose.connect(
  process.env.MONGODB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => console.log('Connected to MongoDB')
);

app.listen(3000, () => console.log('Server listening on port 3000'));
