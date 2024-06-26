const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      console.log('auth callback')
      res.redirect('http://localhost:3000/blogs');
    }
  );

  app.get('/auth/logout', (req, res) => {
    req.logout();
    console.log('logout callback')
    res.redirect('http://localhost:3000/express-logout');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
