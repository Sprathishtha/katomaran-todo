// server/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
require('dotenv').config();
require('./config/passport'); // Google/GitHub OAuth config

const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// Import routes
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const googleRoutes = require('./routes/authGoogle'); // ✅ INCLUDE THIS

// Connect to DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ Mongo Error:', err));

// Use routes BEFORE listen
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/auth', googleRoutes); // ✅ MOVE HERE

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
