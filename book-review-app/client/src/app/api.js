const express = require('express');
const booksRouter = require('./api/books');
const authRouter = require('./api/auth');

const router = express.Router();

// Use routers for different API endpoints
router.use('/books', booksRouter);
router.use('/auth', authRouter);

module.exports = router;
