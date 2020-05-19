const AuthService = require('../auth/authService');

function requireAuth(req, res, next) {
  const authToken = req.get('Authorization') || '';

  let bearerToken;
  if (!authToken.toLowerCase().startsWith('bearer ')) {
    return res.status(401).json({ error: 'Missing bearer token' });
  } else {
    bearerToken = authToken.slice(7, authToken.length);
  }
  // console.log(bearerToken);

  try {
    const payload = AuthService.verifyJwt(bearerToken);
    // console.log(payload);


    AuthService.getUserWithUserName(
      req.app.get('db'),
      payload.sub
    )
      .then(user => {
        // console.log(user);
        if (!user)
          return res.status(401).json({ error: 'Unauthorized request' });
        //MOST important thing -- req.user = user goes into the database and retrieves ALL the user info so you could do user.password
        req.user = user;
        next();
      })
      .catch(err => {
        // console.error(err);
        next(err);
      });
  } catch (error) {
    // console.log(error);
    res.status(401).json({ error: 'Unauthorized request' });
  }
}

module.exports = {
  requireAuth,
};