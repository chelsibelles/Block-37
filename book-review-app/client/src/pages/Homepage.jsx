import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import './App.css'; 

function Homepage() {
  return (
    <div className="homepage">
      <header className="homepage-header">
        <h1>Welcome to Book Review App</h1>
        <p>Your one-stop destination for book reviews and recommendations.</p>
      </header>
      
      <SearchBar />
      
      <nav className="homepage-nav">
        <ul>
          <li><Link to="/books">Browse Books</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Sign Up</Link></li>
        </ul>
      </nav>

      <footer className="homepage-footer">
        <p>&copy; 2024 Book Review App. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Homepage;
