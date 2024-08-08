const express = require('express');
const router = express.Router();

// Example data (in a real application, you'd fetch this from a database)
let users = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' }
  // More users...
];

// Helper function to find a user by username
const findUserByUsername = (username) => users.find(user => user.username === username);

// Helper function to find a user by ID
const findUserById = (id) => users.find(user => user.id === id);

// Route to sign up a new user
router.post('/signup', (req, res) => {
  const { username, password } = req.body;
  const userExists = findUserByUsername(username);
  if (userExists) {
    return res.status(400).json({ error: 'Username already exists' });
  }
  const newUser = { id: users.length + 1, username, password };
  users.push(newUser);
  res.status(201).json({ message: 'User registered', user: newUser });
});

// Route to log in a user
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = findUserByUsername(username);
  if (user && user.password === password) {
    res.status(200).json({ message: 'Login successful', userId: user.id });
  } else {
    res.status(400).json({ error: 'Invalid username or password' });
  }
});

// Route to get user details (for testing purposes)
router.get('/user/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = findUserById(userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

module.exports = router;
