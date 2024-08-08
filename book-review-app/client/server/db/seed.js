const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Seed data
const seedData = async () => {
  try {
    await pool.connect();

    // Drop and recreate the books table
    await pool.query(`
      DROP TABLE IF EXISTS books;
      CREATE TABLE books (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL,
        rating DECIMAL DEFAULT 0,
        review_count INTEGER DEFAULT 0
      );
    `);

    // Insert sample books
    await pool.query(`
      INSERT INTO books (title, author, rating, review_count) VALUES
      ('Book One', 'Author One', 4.5, 10),
      ('Book Two', 'Author Two', 4.0, 8),
      ('Book Three', 'Author Three', 3.5, 15);
    `);

    console.log('Database seeded successfully');
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    await pool.end();
  }
};

// Run the seed function
seedData();
