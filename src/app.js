require('dotenv').config();
const bcrypt = require('bcryptjs');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const meditationsRouter = require('./routes/meditations/meditationsRouter');
const notesRouter = require('./routes/notes/notesRouter');
const authRouter = require('./auth/authRouter');
const usersRouter = require('./routes/users/usersRouter');
const app = express();

app.use(morgan((NODE_ENV === 'production') ? 'tiny' : 'common', {
  skip: () => NODE_ENV === 'test',
}));
app.use(cors());
app.use(helmet());
app.use('/api/auth', authRouter);
app.use('/api/meditations', meditationsRouter);
app.use('/api/notes', notesRouter);
app.use('/api/users', usersRouter);
app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: 'Server error' };
  } else {
    console.log(error);
    console.error(error);
    response = { error: error.message, object: error };
  }
  res.status(500).json(response);
});

module.exports = app;
