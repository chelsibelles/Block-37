const express = require('express');
const router = express.Router();
const { getBooks, getBookById, addBook, updateBook, deleteBook } = require('../db');

// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await getBooks();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

// Get a specific book by ID
router.get('/:id', async (req, res) => {
  try {
    const book = await getBookById(req.params.id);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch book' });
  }
});

// Add a new book (for admin purposes)
router.post('/', async (req, res) => {
  const { title, author } = req.body;
  try {
    const newBook = await addBook(title, author);
    res.status(201).json({ message: 'Book added', book: newBook });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add book' });
  }
});

// Update an existing book (for admin purposes)
router.put('/:id', async (req, res) => {
  const { title, author } = req.body;
  try {
    const updatedBook = await updateBook(req.params.id, title, author);
    if (updatedBook) {
      res.json({ message: 'Book updated', book: updatedBook });
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to update book' });
  }
});

// Delete a book (for admin purposes)
router.delete('/:id', async (req, res) => {
  try {
    const deletedBook = await deleteBook(req.params.id);
    if (deletedBook) {
      res.json({ message: 'Book deleted', book: deletedBook });
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete book' });
  }
});

module.exports = router;
