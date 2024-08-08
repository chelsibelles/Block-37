require('dotenv').config(); // Load environment variables from .env file
const app = require('./app'); // Import the Express app
const { connectDB } = require('../db');

const port = process.env.PORT || 3001;

const startServer = async () => {
  try {
    // Connect to the database
    await connectDB();
    
    // Start the Express server
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error('Error starting server:', err);
  }
};

startServer();
