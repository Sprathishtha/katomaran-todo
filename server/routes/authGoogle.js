const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
    session: false,
  }),
  (req, res) => {
    // Redirect to frontend with token
    const token = req.user.token; // generated in strategy
    res.redirect(`https://katomaran-todo-frontend.vercel.app/oauth-success?token=${token}`);
  }
);

module.exports = router;
