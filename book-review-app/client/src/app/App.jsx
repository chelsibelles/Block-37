import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import BookList from './BookList';
import BookDetail from './BookDetail';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import ReviewForm from './ReviewForm';
import CommentForm from './CommentForm';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<Homepage />} />
        <Route path="/" element={<BookList />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/review/:bookId" element={<ReviewForm />} />
        <Route path="/comment/:reviewId" element={<CommentForm />} />
      </Routes>
    </Router>
  );
}

export default App;
