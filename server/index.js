const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const sessionStore = new MongoStore({
  mongooseConnection: mongoose.connection,
  collection: 'sessions',
});

app.use(
  cors({
    origin: 'http://localhost:8080',
    credentials: true,
  })
);

app.use(
  session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: { httpOnly: true, secure: false, sameSite: 'none' },
  })
);

app.post('/signup', (req, res) => {
  res.sendStatus(200);
});

mongoose.connect(
  process.env.MONGODB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => console.log('Connected to MongoDB')
);

app.listen(3000, () => console.log('Server listening on port 3000'));
