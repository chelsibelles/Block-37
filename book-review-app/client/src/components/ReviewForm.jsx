import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function ReviewForm() {
  const { bookId } = useParams();
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(1);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit review to API
    fetch(`/api/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookId, review, rating }),
    })
      .then(response => response.json())
      .then(data => {
        // Handle successful review submission
      })
      .catch(error => console.error('Error submitting review:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Write your review here..."
      />
      <input
        type="number"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        min="1"
        max="5"
      />
      <button type="submit">Submit Review</button>
    </form>
  );
}

export default ReviewForm;
