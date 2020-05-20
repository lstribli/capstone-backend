const express = require('express');
const usersService = require('../../services/users/usersService');
const usersRouter = express.Router();
const dataParser = express.json();
const bcrypt = require('bcryptjs');

usersRouter
  .route('/')
  .post(dataParser, (req, res, next) => {
    const { user_name, password: passwordToHash } = req.body;
    const password = bcrypt.hashSync(passwordToHash, 10);

    const newUser = {
      user_name,
      password
    };

    if (!user_name) {
      return res.status(400).json({ error: 'Username is required' });
    }
    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }
    usersService.addUser(req.app.get('db'), newUser)
      .then(user => res.status(201).json(user))
      .catch(error => next(error));
  });

module.exports = usersRouter;