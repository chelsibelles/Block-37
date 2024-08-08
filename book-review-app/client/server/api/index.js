// Import necessary modules
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const { connectDB } = require('../db');

// Middleware to parse JSON bodies
app.use(express.json());

// Import routers
const booksRouter = require('./books');
const authRouter = require('./auth');

// Use routers
app.use('/api/books', booksRouter);
app.use('/api/auth', authRouter);

// Connect to the database and start the server
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
