const express = require('express');
const session = require('express-session');
const passport = require('../auth/passport'); // Import the Passport configuration
const apiRouter = require('./api'); // Import the API router

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware for session handling
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));

// Initialize Passport and session
app.use(passport.initialize());
app.use(passport.session());

// Use the API router
app.use('/api', apiRouter);

module.exports = app;
