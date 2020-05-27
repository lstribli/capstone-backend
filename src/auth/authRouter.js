const express = require('express');
const jsonBodyParser = express.json();
const authRouter = express.Router();
const AuthService = require('./authService');

authRouter
  .post('/login', jsonBodyParser, (req, res, next) => {
    const { user_name, password } = req.body;
    const loginUser = { user_name, password };

    for (const [key, value] of Object.entries(loginUser))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        });

    AuthService.getUserWithUserName(
      req.app.get('db'),
      loginUser.user_name
    )
      .then(dbUser => {
        console.log('DB USER:', dbUser);
        if (!dbUser)
          return res.status(400).json({
            error: 'Incorrect user_name or password',
          });
        console.log('DBUSER:', dbUser);
        return AuthService.comparePasswords(loginUser.password, dbUser.password)
          .then(compareMatch => {
            console.log(compareMatch);
            if (!compareMatch) {
              return res.status(401).json({

                error: 'Incorrect user_name or password',
              });

            }


            const sub = dbUser.user_name;
            const payload = { id: dbUser.id };
            // console.log(sub, payload);
            res.send({
              authToken: AuthService.createJwt(sub, payload),
            });
          });
      })
      .catch(next);
  });

module.exports = authRouter;