// ✅ STEP 1: BACKEND ROUTE FOR GOOGLE + GITHUB LOGIN
// File: server/routes/authGoogle.js
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Google OAuth
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
  const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET);
  res.redirect(`${process.env.CLIENT_URL}/dashboard?token=${token}`);
});

// GitHub OAuth
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github/callback', passport.authenticate('github', { session: false }), (req, res) => {
  const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET);
  res.redirect(`${process.env.CLIENT_URL}/dashboard?token=${token}`);
});

module.exports = router;


// ✅ STEP 2: FRONTEND OAUTH BUTTONS (JSX snippets to use in Login/Register component render)
// File: client/src/pages/Login.js or Register.js
// JSX for OAuth buttons:
// Replace 'your-backend.onrender.com' with your actual backend URL

/* JSX Example:
  <a href="https://your-backend.onrender.com/auth/google" className="oauth-btn google">
    <FaGoogle style={{ marginRight: '8px' }} /> Sign in with Google
  </a>
  <a href="https://your-backend.onrender.com/auth/github" className="oauth-btn github">
    <FaGithub style={{ marginRight: '8px' }} /> Sign in with GitHub
  </a>
*/

// ✅ STEP 3: HANDLE OAUTH REDIRECT TOKEN (Dashboard.jsx)
// At the top of useEffect in client/src/pages/Dashboard.jsx
/*
useEffect(() => {
  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get('token');
  if (token) {
    localStorage.setItem('token', token);
    queryParams.delete('token');
    window.history.replaceState(null, '', window.location.pathname);
  }
  fetchTasks();
}, []);
*/

// ✅ STEP 4: Install React Icons
// Run in client root directory:
// npm install react-icons

// Then import in your component:
// import { FaGoogle, FaGithub } from 'react-icons/fa';

// ✅ STEP 5: Backend .env example
/*
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_secret
CLIENT_URL=https://your-vercel-url.vercel.app
*/

// ✅ STEP 6: Render Setup
// - Open your Render backend service
// - Go to Environment tab
// - Add all OAuth keys shown above
// - Click Redeploy from dashboard

// ✅ FINAL
// - After login via Google/GitHub, you’ll be redirected to dashboard
// - Token will be saved to localStorage and used for further API calls

// ✅ Optional: Want logout button, profile avatar, or ZIP export? Let me know!
