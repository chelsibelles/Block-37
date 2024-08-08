const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Connect to the database
const connectDB = async () => {
  try {
    await pool.connect();
    console.log('Connected to the database');
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
};

// Get all books
const getBooks = async () => {
  try {
    const result = await pool.query('SELECT * FROM books');
    return result.rows;
  } catch (err) {
    console.error('Error fetching books:', err);
    throw err;
  }
};

// Get a book by ID
const getBookById = async (id) => {
  try {
    const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
    return result.rows[0];
  } catch (err) {
    console.error('Error fetching book:', err);
    throw err;
  }
};

// Add a new book
const addBook = async (title, author) => {
  try {
    const result = await pool.query(
      'INSERT INTO books (title, author) VALUES ($1, $2) RETURNING *',
      [title, author]
    );
    return result.rows[0];
  } catch (err) {
    console.error('Error adding book:', err);
    throw err;
  }
};

// Update a book
const updateBook = async (id, title, author) => {
  try {
    const result = await pool.query(
      'UPDATE books SET title = $1, author = $2 WHERE id = $3 RETURNING *',
      [title, author, id]
    );
    return result.rows[0];
  } catch (err) {
    console.error('Error updating book:', err);
    throw err;
  }
};

// Delete a book
const deleteBook = async (id) => {
  try {
    const result = await pool.query('DELETE FROM books WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  } catch (err) {
    console.error('Error deleting book:', err);
    throw err;
  }
};

module.exports = {
  connectDB,
  getBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook
};
